import {mydb} from '../../mymodules/prismaClientInstance';

export default async(req, res) => {
    let data = req.body;

    try{
        const result = await mydb.professionalsThatAcceptRequest.create({
            data: {
                userName: data.userName,
                serviceRequest: { connect: {id: data.serviceRequestID}}
            }
        })

        const resultTwo = await mydb.serviceRequest.update({
            where: {
                id: data.serviceRequestID
            },
            data: {
                status: "paccept"
            }
        });

        res.status(200).json(result+resultTwo);
    }catch (error) {   
        res.status(503).json({error: error.toString()});
    }
    
}