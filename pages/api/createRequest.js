import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async(req, res) => {
    let data = req.body;
    try
        {
            let myID = ""; 
            if(data.userType == "user") {
                myID = await prisma.tradeYouUser.findUnique({
                    where: {
                      username: data.userName,
                    },
                    select: {
                       id: true,
                    }
                });  
            }else{
                myID = await prisma.tradeYouProfessional.findUnique({
                    where: {
                      username: data.userName,
                    },
                    select: {
                       id: true,
                    }
                });  
            }

            delete data.userType;
            delete data.userName;

            data.user = { connect: {id: myID.id}};

            const result = await prisma.serviceRequest.create({
                data: {
                    ...data,
                },
            });

            res.status(200).json(result);
        }
        catch (err)
        {   
            res.status(503).json({err: err.toString()});
        }
    
    
}