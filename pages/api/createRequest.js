import {mydb} from '../../mymodules/prismaClientInstance';

export default async(req, res) => {
    let data = req.body;
    try {
        let myID = ""; 
        if(data.userType == "user") {
            myID = await mydb.tradeYouUser.findUnique({
                where: {
                    username: data.userName,
                },
                select: {
                    id: true,
                }
            });  
        }else{
            myID = await mydb.tradeYouProfessional.findUnique({
                where: {
                    username: data.userName,
                },
                select: {
                    id: true,
                }
            });  
        }

        delete data.userType;
        delete data.userName;

        data.user = { connect: {id: myID.id}};

        const result = await mydb.serviceRequest.create({
            data: {
                ...data,
            },
        });

        res.status(200).json(result);
    }catch (error) {   
        res.status(503).json({error: error.toString()});
    }
    
    
}