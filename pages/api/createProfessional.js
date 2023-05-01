import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async(req, res) => {
    const data = req.body;
    try
        {   
            if (data.professional == 'user') {
                delete data.professional;
                const result = await prisma.tradeYouUser.create({
                    data: {
                        ...data,
                    },
                });
            }else {
                delete data.professional;
                const result = await prisma.tradeYouProfessional.create({
                    data: {
                        ...data,
                    },
                });
            }

            res.status(200).json(result);
        }
        catch (err)
        {   
            res.status(503).json({err: err.toString()});
        }
    
    
}