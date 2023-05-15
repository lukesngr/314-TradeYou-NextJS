import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export default async(req, res) => {
    let data = req.query;
    try{
        let details = {};
        if(data.userCategory == "professional") {
            details = await prisma.tradeYouProfessional.findUnique({
                where: { username: data.username}
            });
        }else if(data.userCategory == "user") {
            details = await prisma.tradeYouUser.findUnique({
                where: { username: data.username}
            });
        }

       res.status(200).json(details);
    }catch (err){   
       res.status(503).json({err: err.toString()});
    }
}