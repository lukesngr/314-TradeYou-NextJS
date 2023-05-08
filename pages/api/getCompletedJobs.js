import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async(req, res) => {
    let data = req.query;
    try{
        let serviceRequests = await prisma.tradeYouProfessional.findUnique({
            where: { username: data.username},
            select: { ServiceRequest: true }
        });

        serviceRequests = serviceRequests.ServiceRequest;

       for (var i = 0; i < serviceRequests.length; i++) {
            if(serviceRequests[i].status != "complete") {
                delete serviceRequests[i];
            }

            const reviewsOfRequests = await prisma.serviceRequest.findUnique({
                where: {
                  id: serviceRequests[i].id
                },
                select: {
                    Review: true 
                }
            });

            serviceRequests[i].review = reviewsOfRequests.Review;
       }

       res.status(200).json(serviceRequests);
    }catch (err){   
       res.status(503).json({err: err.toString()});
    }
}