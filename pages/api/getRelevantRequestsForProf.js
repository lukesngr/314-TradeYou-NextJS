import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

//Using DistanceMatrixApi with my own API key
async function getDistanceBetweenTwoAddresses(userID, professionalObject) {
    let result = {}
    try {
        const addressForProfessional = professionalObject.address;

        const distanceHasBeenMemoed = await prisma.distanceMemoization.findMany({
            where: {
                professionalID: professionalObject.id,
                tradeYouUserId: userID
            },
            select: {
                distance: true
            }
        })

        console.log(distanceHasBeenMemoed)

        if(distanceHasBeenMemoed === undefined) {
            const addressForUser = await prisma.tradeYouUser.findUnique({
                where: {id: userID},
                select: {address: true}
            })
            let longAndLatitudeForAddressOne = await axios.get('https://geocode.maps.co/search?', {params: {q: encodeURIComponent(addressForUser)}});
            let longAndLatitudeForAddressTwo = await axios.get('https://geocode.maps.co/search?', {params: {q: encodeURIComponent(addressForProfessional)}});
            console.log(userID)
            let longitudeMinusLatitudeGivenToCos = Math.cos(longAndLatitudeForAddressTwo[0].long - longAndLatitudeForAddressOne[0].long);
            let latitudeOne = longAndLatitudeForAddressOne.lat;
            let latitudeTwo = longAndLatitudeForAddressTwo.lat
            //have no idea how this math works
            //splitting statement for readability purposes 
            let oneHalfOfDistanceCalc = Math.sin(latitudeOne)*Math.sin(latitudeTwo);
            let twoHalfOfDistanceCalc = Math.cos(lat1)*Math.cos(lat2)*longitudeMinusLatitudeGivenToCos;
            let distanceBetweenPoints = parseInt(Math.acos(oneHalfOfDistanceCalc+twoHalfOfDistanceCalc)*6371);

            await prisma.distanceMemoization.create({
                data: {
                    distance: distanceBetweenPoints,
                    TradeYouProfessional: {connect: {id: professionalObject.id, }},
                    TradeYouUser: {connect: {id: userID}},
                }
            })

            return distanceBetweenPoints;
        }else{
            return distanceHasBeenMemoed.distance;
        }
            
        
    }catch (error) {
        console.log(error)
    }
    return 10000;
}

async function ifCurrentDateBeenAYearSinceMembershipAddCharge(professionalID) {
    try {
        const membershipStartDate = await prisma.tradeYouProfessional.findUnique({
            where: {id: professionalID},
            select: {
                MembershipPlan: {
                    select: {dateStarted: true}
                }
            }
        })

        if(new Date().getFullYear()-1 == membershipStartDate.MembershipPlan[0].dateStarted.getFullYear()) {
            await prisma.charges.create({
                data: {
                    amount: 3000.0,
                    dateTime: new Date(),
                    TradeYouProfessional: {connect: {id: professionalID}}
                }
            })
        }
    } catch(error) {
        console.log(error);
    }
}

export default async(req, res) => {
    let data = req.query;
    try{
        const currentProfessionalID = await prisma.tradeYouProfessional.findUnique({
            where: { username: data.username},
            select: { id: true, address: true }
        });

        await ifCurrentDateBeenAYearSinceMembershipAddCharge(currentProfessionalID.id);

        const serviceRequests = await prisma.serviceRequest.findMany();

        const deniedRequestsForProfessional = await prisma.professionalsThatDenyRequest.findMany({
            where: {userName: data.username},
            select: {serviceRequestID: true}
        })

       for (var i = 0; i < serviceRequests.length; i++) {
            if(serviceRequests[i].status == "caccept") {
                if(serviceRequests[i].professionalID != currentProfessionalID.id) {
                    delete serviceRequests[i];
                }
            }


            if(deniedRequestsForProfessional.some(iter => iter.serviceRequestID == serviceRequests[i].id)) {
                delete serviceRequests[i];
            }else if(getDistanceBetweenTwoAddresses(serviceRequests[i].userID, currentProfessionalID) > 50) {
                delete serviceRequests[i];
            }

       }

       res.status(200).json(serviceRequests);
    }catch (err){   
       res.status(503).json({err: err.toString()});
    }
}