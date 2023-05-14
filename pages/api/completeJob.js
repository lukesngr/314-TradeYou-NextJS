import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async(req, res) => {
    let data = req.body;
    try
        {
            const result = await prisma.serviceRequest.update({
                where: {
                    id: data.serviceRequestID
                },
                data: {
                    status: data.status
                }
            });

            const ids = await prisma.serviceRequest.findUnique({
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

            const userMembershipCategory = await prisma.tradeYouUser.findUnique({
                where: {
                    id: ids.TradeYouUser.id
                },
                select: {
                    MembershipPlan: {
                        select: {category: true}
                    }
                }
            })

            const profMembershipCategory = await prisma.tradeYouProfessional.findUnique({
                where: {
                    id: ids.TradeYouProfessional.id
                },
                select: {
                    MembershipPlan: {
                        select: {category: true}
                    }
                }
            })


            if(userMembershipCategory.category != "membership") {
                result += await prisma.payment.create({
                    data: {
                        amount: 100.0,
                        dateTime: new Date(),
                        ServiceRequest: {
                            connect: {id: data.serviceRequestID}
                        }
                    }
                })
            }

            if(profMembershipCategory != "membership") {
                result += await prisma.charges.create({
                    data: {
                        amount: 20.0,
                        dateTime: new Date(),
                        TradeYouProfessional: { connect: {id: ids.TradeYouProfessional.id}}
                    }
                })
            }

            res.status(200).json(result);
        }
        catch (err)
        {   
            res.status(503).json({err: err.toString()});
        }
    
    
}