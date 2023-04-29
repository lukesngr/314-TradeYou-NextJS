import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async(request, response) => {
    const data = req.body;
    const result = await prisma.tradeYouUser.create({
        data: {
            ...data,
        },
    });
    response.status(200).json(result);
}