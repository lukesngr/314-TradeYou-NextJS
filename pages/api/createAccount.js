import {mydb} from '../../mymodules/prismaClientInstance';
const bcrypt = require("bcrypt");

export default async(req, res) => {
    const data = req.body;
    try {   
        let result = "";
        const newPassword = await bcrypt.hash(data.password, 10);  
        data.password = newPassword;
        //not the best code but uml design given to me was less than spectacular
            
        if (data.category == 'user') {
            delete data.category;
            result = await mydb.tradeYouUser.create({
                data: {
                    ...data,
                    MembershipPlan: {
                        create: {
                            category: "membership",
                            dateStarted: new Date(),
                        }
                    }
                },
                
            });
        }else {
            delete data.category;
            const userCount = await mydb.tradeYouUser.count({
                where: {username: data.username}
            })

            if(userCount != 0) {
                res.status(503).json({error: "User already exists"});
            }else{
                result = await mydb.tradeYouProfessional.create({
                    data: {
                        ...data,
                        MembershipPlan: {
                            create: {
                                category: "membership",
                                dateStarted: new Date(), 
                            }
                        }
                    },
                });
            }

        }

        res.status(200).json(result);
    }catch (error){   
        res.status(503).json({error: error.toString()});
    }
    
}