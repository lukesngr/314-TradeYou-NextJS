import {mydb} from '../../mymodules/prismaClientInstance';

export default async(req, res) => {
    let data = req.body;
    try {
        const result = await mydb.professionalsThatDenyRequest.create({
            data: {
                userName: data.userName,
                serviceRequest: { connect: {id: data.serviceRequestID}}
            }
        })

        res.status(200).json(result);
    } catch (error){   
        res.status(503).json({error: error.toString()});
    }
    
    
}