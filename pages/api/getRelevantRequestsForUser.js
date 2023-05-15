import {mydb} from '../../mymodules/prismaClientInstance'

async function addMembershipChargeAfterYear(userID) {
    try {
        const membershipObject = await mydb.tradeYouUser.findUnique({
            where: {id: userID},
            select: {
                MembershipPlan: {
                    select: {dateStarted: true}
                }
            }
        })

        let membershipStartDateYear = membershipObject.MembershipPlan[0].dateStarted.getFullYear();
        let lastYear = new Date().getFullYear()-1;
        let userMembershipPricePerYear = 2000.0;

        if(lastYear == membershipStartDateYear) {
            await mydb.charges.create({
                data: {
                    amount: userMembershipPricePerYear,
                    dateTime: new Date(),
                    TradeYouUser: {connect: {id: userID}}
                }
            })
        }
    } catch(error) {
        console.log(error);
    }
}

export default async(req, res) => {
    let data = req.query;
    try {
        const currentUser = await mydb.tradeYouUser.findUnique({
            where: {
                username: data.username
            },
            select: {
                id: true,
                ServiceRequest: true
            }
        });

        await addMembershipChargeAfterYear(currentUser.id);

        let serviceRequests = currentUser.ServiceRequest
        
        for(var i = 0; i < serviceRequests.length; i++) {

            const currentServiceRequestInDb = await mydb.serviceRequest.findUnique({
                where: {
                    id: serviceRequests[i].id
                },
                select: {
                    Review: true,
                    ProfessionalsThatAcceptRequest: {
                        select: {userName: true}
                    } 
                }
            });
            
            serviceReqs[i].review = currentServiceRequestInDb.Review;

            if(serviceRequests[i].status == "paccept") { serviceRequests[i].acceptors = currentServiceRequestInDb.ProfessionalsThatAcceptRequest; }     
            
        }

        

        res.status(200).json(serviceReqs);
    }catch (error){   
        res.status(503).json({error: error.toString()});
    }
    
    
}