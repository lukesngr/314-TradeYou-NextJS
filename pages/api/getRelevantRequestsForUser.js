import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
            }

            res.status(200).json(serviceReqs);
        }
        catch (err)
        {   
            res.status(503).json({err: err.toString()});
        }
    
    
}