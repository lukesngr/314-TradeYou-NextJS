import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async(req, res) => {
    let data = req.body;
    try
        {
            const result = await prisma.professionalsThatDenyRequest.create({
                data: {
                    userName: data.userName,
                    serviceRequest: { connect: {id: data.serviceRequestID}}
                }
            })

            res.status(200).json(result);
        }
        catch (err)
        {   
            res.status(503).json({err: err.toString()});
        }
    
    
}