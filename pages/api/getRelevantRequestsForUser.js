import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function ifCurrentDateBeenAYearSinceMembershipAddCharge(userID) {
    try {
        const membershipStartDate = await prisma.tradeYouUser.findUnique({
            where: {id: userID},
            select: {
                MembershipPlan: {
                    select: {dateStarted: true}
                }
            }
        })

        if(new Date().getFullYear()-1 == membershipStartDate.dateStarted.getFullYear()) {
            await prisma.charges.create({
                data: {
                    amount: 2000.0,
                    dateTime: new Date(),
                    TradeYouUser: {connect: {id: userID}}
                }
            })
        }
    } catch(error) {
        console.log(error);
    }
}

export default async(req, res) => {
    let data = req.query;
    try{
            const currentUserID = await prisma.tradeYouUser.findUnique({
                where: {
                  username: data.username
                },
                select: {
                   id: true
                }
            });

            await ifCurrentDateBeenAYearSinceMembershipAddCharge(currentUserID.id);

            const serviceRequests = await prisma.tradeYouUser.findUnique({
                where: {
                    id: currentUserID.id
                },
                select: {
                    ServiceRequest: true
                }
            })
            
            let serviceReqs = serviceRequests.ServiceRequest;
            for(var i = 0; i < serviceReqs.length; i++) {
                if(serviceReqs[i].status == "paccept") {
                    const usernamesOfAcceptors = await prisma.serviceRequest.findUnique({
                        where: {
                          id: serviceReqs[i].id
                        },
                        select: {
                            ProfessionalsThatAcceptRequest: {
                                select: {userName: true}
                            }
                        }
                    });
                    serviceReqs[i].acceptors = usernamesOfAcceptors.ProfessionalsThatAcceptRequest; 
                }

                const reviewsOfRequests = await prisma.serviceRequest.findUnique({
                    where: {
                      id: serviceReqs[i].id
                    },
                    select: {
                        Review: true 
                    }
                });

                serviceReqs[i].review = reviewsOfRequests.Review;
                
            }

            

            res.status(200).json(serviceReqs);
        }
        catch (err)
        {   
            res.status(503).json({err: err.toString()});
        }
    
    
}