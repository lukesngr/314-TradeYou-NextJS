import {mydb} from '../../mymodules/prismaClientInstance';

export default async(req, res) => {
    let data = req.query;
    try{
        let serviceRequests = await mydb.tradeYouProfessional.findUnique({
            where: { username: data.username},
            select: { ServiceRequest: true }
        });

        serviceRequests = serviceRequests.ServiceRequest;

       for (var i = 0; i < serviceRequests.length; i++) {
            if(serviceRequests[i].status != "complete") {
                serviceRequests.splice(i, 1);
                i -= 1;
            }

            const reviewsOfRequests = await mydb.serviceRequest.findUnique({
                where: {
                  id: serviceRequests[i].id
                },
                select: {
                    Review: true 
                }
            });

            serviceRequests[i].review = reviewsOfRequests.Review;
       }

       res.status(200).json(serviceRequests);
    }catch (error){   
       res.status(503).json({error: error.toString()});
    }
}