import { PrismaClient } from "@prisma/client";
import { URLPattern } from "next/server";
import axios from "axios";

const prisma = new PrismaClient();

//Using DistanceMatrixApi with my own API key
async function getDistanceBetweenTwoAddresses(addressOne, addressTwo) {
    let data = {}
    try {
        data = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {params: {destinations: encodeURIComponent(addressOne), origins: encodeURIComponent(addressTwo), units: 'metric', key: 'AIzaSyDDmoQPhC9jJvsTZf0URLKWb2vCRVD8wtI'}});
    }catch (error) {
        console.log(error)
    }
    return data.data.rows[0].elements[0].distance.value / 1000;
}

export default async(req, res) => {
    let data = req.query;
    try{
        const currentProfessionalID = await prisma.tradeYouProfessional.findUnique({
            where: { username: data.username},
            select: { id: true, address: true }
        });

        const serviceRequests = await prisma.serviceRequest.findMany();

       for (var i = 0; i < serviceRequests.length; i++) {
            if(serviceRequests[i].status == "caccept") {
                if(serviceRequests[i].professionalID != currentProfessionalID.id) {
                    delete serviceRequests[i];
                }
            }

            const addressForProfessional = currentProfessionalID.address;
            const addressForUser = await prisma.tradeYouUser.findUnique({
                where: {id: serviceRequests[i].userID},
                select: {address: true}
            })

            if(getDistanceBetweenTwoAddresses(addressForProfessional, addressForUser.address) > 50) {
                delete serviceRequests[i];
            }

       }

       res.status(200).json(serviceRequests);
    }catch (err){   
       res.status(503).json({err: err.toString()});
    }
}