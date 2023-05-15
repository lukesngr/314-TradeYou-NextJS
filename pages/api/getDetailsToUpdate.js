import {mydb} from '../../mymodules/prismaClientInstance';

export default async(req, res) => {
    let data = req.query;
    try{
        let details = {};
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
                    }
                }
            });
        }

       res.status(200).json(details);
    }catch (err){   
       res.status(503).json({err: err.toString()});
    }
}