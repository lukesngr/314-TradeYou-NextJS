import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async(req, res) => {
    let data = req.query;
    try{
        const currentProfessionalID = await prisma.tradeYouProfessional.findUnique({
            where: { username: data.username},
            select: { id: true }
        });

        const serviceRequests = await prisma.serviceRequest.findMany();

       for (var i = 0; i < serviceRequests.length; i++) {
            if(serviceRequests[i].status == "caccept") {
                if(serviceRequests[i].professionalID != currentProfessionalID.id) {
                    console.log(serviceRequests[i].professionalID)
                    console.log(currentProfessionalID.id)
                    delete serviceRequests[i];
                    
                }
            }
       }

       res.status(200).json(serviceRequests);
    }catch (err){   
       res.status(503).json({err: err.toString()});
    }
}