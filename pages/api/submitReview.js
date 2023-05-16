import {mydb} from '../../mymodules/prismaClientInstance';

export default async(req, res) => {
    let data = req.body;
    try {
        const reviewsForRequest = await mydb.serviceRequest.findUnique({
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
        });

        let result = [];

        if(reviewsForRequest.Review.length == 1 ) {
            result = await mydb.review.update({
                where: {
                    id: reviewsForRequest.Review[0].id
                },
                data: {
                    ...data
                }
            });
        }else{
            result = await mydb.review.create({
                data: {
                    ...data,
                },
            });
        }        

        res.status(200).json(result);
    }catch (error) {   
        res.status(503).json({error: error.toString()});
    }
    
    
}