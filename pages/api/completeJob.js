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
                TradeYouProfessional: {
                    select: {id: true}
                },
                TradeYouUser: {
                    select: {id: true}
                }
            }
        })

        const userMembershipCategory = await mydb.tradeYouUser.findUnique({
            where: {
                id: ids.TradeYouUser.id
            },
            select: {
                MembershipPlan: {
                    select: {category: true}
                }
            }
        })

        const profMembershipCategory = await mydb.tradeYouProfessional.findUnique({
            where: {
                id: ids.TradeYouProfessional.id
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
                    ServiceRequest: {
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
                    TradeYouProfessional: { connect: {id: ids.TradeYouProfessional.id}}
                }
            })
        }

        res.status(200).json(result);
    }catch (error){   
        res.status(503).json({error: error.toString()});
    }
    
    
}