import {mydb} from '../../mymodules/prismaClientInstance';

export default async(req, res) => {
    let data = req.query;
    try{
        let details = {ServiceRequest: []};
        if(data.userCategory == "professional") {
            details = await mydb.tradeYouProfessional.findUnique({
                where: { username: data.username},
                select: {
                    id: true,
                    username: true,
                    creditCardCVV: true,
                    creditCardNumber: true,
                    address: true,
                    email: true,
                    phone: true,
                    MembershipPlan: {
                        select: {id: true, category: true}
                    },
                    ServiceRequest: {
                        select: {
                            id: true,
                            dateTime: true,
                            name: true,
                            user: {
                                select: {username: true}
                            },
                            description: true,
                            price: true,
                            category: true,
                            status: true,
                            Payment: {
                                select: {
                                    dateTime: true,
                                    amount: true,
                                    serviceRequestID: true
                                }
                            }                          
                        }
                        
                    },
                    Charges: {
                        select: {
                            id: true,
                            amount: true,
                            dateTime: true
                        }
                    }
                    
                }
            });
        }else if(data.userCategory == "user") {
            details = await mydb.tradeYouUser.findUnique({
                where: { username: data.username},
                select: {
                    id: true,
                    username: true,
                    creditCardCVV: true,
                    creditCardNumber: true,
                    address: true,
                    email: true,
                    phone: true,
                    MembershipPlan: {
                        select: {id: true, category: true}
                    },
                    ServiceRequest: {
                        select: {
                            id: true,
                            dateTime: true,
                            name: true,
                            user: {
                                select: {username: true}
                            },
                            description: true,
                            price: true,
                            category: true,
                            status: true,
                            Payment: {
                                select: {
                                    id: true,
                                    dateTime: true,
                                    amount: true,
                                    serviceRequestID: true
                                }
                            }                          
                        }
                        
                    },
                    Charges: {
                        select: {
                            id: true,
                            amount: true,
                            dateTime: true
                        }
                    }
                    
                }
            });
        }

        if(details.ServiceRequest.length != 0) {
            for(var i = 0; i < details.ServiceRequest.length; i++) {
                details.ServiceRequest[i].user = details.ServiceRequest[i].user.username;
                details.Payments = details.ServiceRequest[i].Payment;
            }
        }else{
            details.Payments = []
        }

        details.category = data.userCategory;
        console.log(details)
       res.status(200).json(details);
    }catch (err){   
       res.status(503).json({err: err.toString()});
    }
}