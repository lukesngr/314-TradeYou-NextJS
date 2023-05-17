import {mydb} from '../../mymodules/prismaClientInstance';

export default async(req, res) => {
    let data = req.query;
    try{
        let details = {ServiceRequest: []};
        if(data.userCategory == "professional") {
            details = await mydb.tradeYouProfessional.findUnique({
                where: { username: data.username},
                select: {
                    username: true,
                    creditCardCVV: true,
                    creditCardNumber: true,
                    address: true,
                    email: true,
                    phone: true,
                    MembershipPlan: {
                        select: {category: true}
                    },
                    ServiceRequest: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            category: true,
                            price: true,
                            dateTime: true,
                            status: true,
                            user: {
                                select: {username: true}
                            }                          
                        }
                    }
                }
            });
        }else if(data.userCategory == "user") {
            details = await mydb.tradeYouUser.findUnique({
                where: { username: data.username},
                select: {
                    username: true,
                    creditCardCVV: true,
                    creditCardNumber: true,
                    address: true,
                    email: true,
                    phone: true,
                    MembershipPlan: {
                        select: {category: true}
                    },
                    ServiceRequest: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            category: true,
                            price: true,
                            dateTime: true,
                            status: true,
                            user: {
                                select: {username: true}
                            }                          
                        }
                    }

                }
            });
        }

        if(details.ServiceRequest != undefined) {
            for(var i = 0; i < details.ServiceRequest.length; i++) {
                details.ServiceRequest[i].userName = details.ServiceRequest[i].user.username
            }
        }

       res.status(200).json(details);
    }catch (err){   
       res.status(503).json({err: err.toString()});
    }
}