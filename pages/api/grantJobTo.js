import {mydb} from '../../mymodules/prismaClientInstance'

export default async(req, res) => {
    let data = req.body;
    try {
        const selectedProfID = await mydb.tradeYouProfessional.findUnique({
            where: {
                username: data.username
            },
            select: {
                id: true
            }
        })

        const result = await mydb.serviceRequest.update({
            where: {
                id: data.serviceRequestID
            },
            data: {
                professional: {
                    connect: {id: selectedProfID.id}
                },
                status: "caccept"
            }
        });

        res.status(200).json(result);
    }catch (error){   
        res.status(503).json({error: error.toString()});
    }
    
    
}