import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export default async(req, res) => {
    const data = req.body;
    try
        {   
            let result = "";
            const newPassword = await bcrypt.hash(data.password, 10);  
            data.password = newPassword;
            if (data.professional == 'user') {
                delete data.professional;
                result = await prisma.tradeYouUser.create({
                    data: {
                        ...data,
                    },
                });
            }else {
                delete data.professional;
                result = await prisma.tradeYouProfessional.create({
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