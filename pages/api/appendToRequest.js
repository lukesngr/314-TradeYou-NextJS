import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async(req, res) => {
    let data = req.body;
    try
        {
            const originalValue = await prisma.serviceRequest.findUnique({
                where: {
                    id: data.serviceRequestID
                },
                select: {
                    status: true;
                }
            });

            const result = await prisma.serviceRequest.update({
                where: {
                    id: data.serviceRequestID
                },
                data: {
                    status: originalValue+data.status
                }
            });

            res.status(200).json(result);
        }
        catch (err)
        {   
            res.status(503).json({err: err.toString()});
        }
    
    
}