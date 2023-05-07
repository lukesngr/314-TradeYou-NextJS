import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async(req, res) => {
    let data = req.body;
    try
        {
            const selectedProfID = await prisma.tradeYouProfessional.findUnique({
                where: {
                    username: data.username
                },
                select: {
                    id: true
                }
            })

            const result = await prisma.serviceRequest.update({
                where: {
                    id: data.serviceRequestID
                },
                data: {
                    professional: {
                        connect: {id: selectedProfID.id}
                    },
                    status: "caccept"
                }
            });

            res.status(200).json(result);
        }
        catch (err)
        {   
            res.status(503).json({err: err.toString()});
        }
    
    
}