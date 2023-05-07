import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async(req, res) => {
    let data = req.body;
    try
        {
            const result = await prisma.professionalsThatAcceptRequest.create({
                data: {
                    userName: data.userName,
                    serviceRequest: { connect: {id: data.serviceRequestID}}
                }
            })

            const resultTwo = await prisma.serviceRequest.update({
                where: {
                    id: data.serviceRequestID
                },
                data: {
                    status: "paccept"
                }
            });

            res.status(200).json(result+resultTwo);
        }
        catch (err)
        {   
            res.status(503).json({err: err.toString()});
        }
    
    
}