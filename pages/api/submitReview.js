import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async(req, res) => {
    let data = req.body;
    try
        {
            const reviewsForRequest = await prisma.serviceRequest.findUnique({
                where: {
                    id: data.serviceRequest.connect.id
                },
                select: {
                    Review: {
                        select: {
                            id: true
                        }
                    }
                }
            })

            let result = [];

            if(reviewsForRequest.Review.length == 1 ) {
                result = await prisma.review.update({
                    where: {
                        id: reviewsForRequest.Review[0].id
                    },
                    data: {
                        ...data
                    }
                });
            }else{
                result = await prisma.review.create({
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