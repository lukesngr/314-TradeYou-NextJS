import {mydb} from '../../mymodules/prismaClientInstance';

export default async(req, res) => {
    let data = req.body;
    try{
        let result = await mydb.serviceRequest.update({
            where: {
                id: data.serviceRequestID
            },
            data: {
                status: data.status
            }
        });

        const ids = await mydb.serviceRequest.findUnique({
            where: {
                id: data.serviceRequestID
            },
            select: {
                professional: {
                    select: {id: true}
                },
                user: {
                    select: {id: true}
                }
            }
        })

        const userMembershipCategory = await mydb.tradeYouUser.findUnique({
            where: {
                id: ids.user.id
            },
            select: {
                MembershipPlan: {
                    select: {category: true}
                }
            }
        })

        const profMembershipCategory = await mydb.tradeYouProfessional.findUnique({
            where: {
                id: ids.professional.id
            },
            select: {
                MembershipPlan: {
                    select: {category: true}
                }
            }
        })

        if(userMembershipCategory.MembershipPlan[0].category != "membership") {
            result += await mydb.payment.create({
                data: {
                    amount: 100.0,
                    dateTime: new Date(),
                    serviceRequest: {
                        connect: {id: data.serviceRequestID}
                    }
                }
            })
        }

        if(profMembershipCategory.MembershipPlan[0].category != "membership") {
            result += await mydb.charges.create({
                data: {
                    amount: 20.0,
                    dateTime: new Date(),
                    professional: { connect: {id: ids.professional.id}}
                }
            })
        }

        res.status(200).json(result);
    }catch (error){   
        res.status(503).json({error: error.toString()});
    }
    
    
}