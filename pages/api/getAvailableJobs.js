import {mydb} from '../../mymodules/prismaClientInstance';
import axios from "axios";

async function getDistanceBetweenTwoAddresses(userID, professionalObject) {
    let result = 10000;
    console.log("Yo");

    try {
        const professionalAddress = professionalObject.address;

        const distanceHasBeenMemoed = await mydb.distanceMemoization.findMany({
            where: {
                professionalID: professionalObject.id,
                tradeYouUserId: userID
            },
            select: {
                distance: true
            }
        })

        console.log(distanceHasBeenMemoed);

        if(distanceHasBeenMemoed === undefined) {
            const userAddress = await mydb.tradeYouUser.findUnique({
                where: {id: userID},
                select: {address: true}
            })

            let longAndLatitudeForAddressOne = await axios.get('https://geocode.maps.co/search?', {params: {q: encodeURIComponent(userAddress)}});
            let longAndLatitudeForAddressTwo = await axios.get('https://geocode.maps.co/search?', {params: {q: encodeURIComponent(professionalAddress)}});
            let longitudeMinusLatitudeGivenToCos = Math.cos(longAndLatitudeForAddressTwo[0].long - longAndLatitudeForAddressOne[0].long);
            let latitudeOne = longAndLatitudeForAddressOne.lat;
            let latitudeTwo = longAndLatitudeForAddressTwo.lat
            //have no idea how this math works
            //splitting statement for readability purposes 
            let oneHalfOfDistanceCalc = Math.sin(latitudeOne)*Math.sin(latitudeTwo);
            let twoHalfOfDistanceCalc = Math.cos(latitudeOne)*Math.cos(latitudeTwo)*longitudeMinusLatitudeGivenToCos;
            let distanceBetweenPoints = parseInt(Math.acos(oneHalfOfDistanceCalc+twoHalfOfDistanceCalc)*6371);

            await mydb.distanceMemoization.create({
                data: {
                    distance: distanceBetweenPoints,
                    TradeYouProfessional: {connect: {id: professionalObject.id, }},
                    TradeYouUser: {connect: {id: userID}},
                }
            })

            result =  distanceBetweenPoints;
        }else{
            result = distanceHasBeenMemoed.distance;
        }
            
        
    }catch (error) {
        console.log(error)
    }

    return result;
}

async function ifCurrentDateBeenAYearSinceMembershipAddCharge(professionalID) {
    try {
        const membershipStartDate = await mydb.tradeYouProfessional.findUnique({
            where: {id: professionalID},
            select: {
                MembershipPlan: {
                    select: {dateStarted: true}
                }
            }
        })

        if(new Date().getFullYear()-1 == membershipStartDate.MembershipPlan[0].dateStarted.getFullYear()) {
            await mydb.charges.create({
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
        const currentProfessionalID = await mydb.tradeYouProfessional.findUnique({
            where: { username: data.username},
            select: { id: true, address: true }
        });

        await ifCurrentDateBeenAYearSinceMembershipAddCharge(currentProfessionalID.id);

        const serviceRequests = await mydb.serviceRequest.findMany();

        const deniedRequestsForProfessional = await mydb.professionalsThatDenyRequest.findMany({
            where: {userName: data.username},
            select: {serviceRequestID: true}
        })

       for (var i = 0; i < serviceRequests.length; i++) {
            if(serviceRequests[i].status == "caccept") {
                if(serviceRequests[i].professionalID != currentProfessionalID.id) {
                    serviceRequests.splice(i, 1);
                    i -= 1;
                }
            }else if(serviceRequests[i].status == "complete") {
                serviceRequests.splice(i, 1);
                i -= 1;
            }else if(deniedRequestsForProfessional.some(iter => iter.serviceRequestID == serviceRequests[i].id)) {
                serviceRequests.splice(i, 1);
                i -= 1;
            }
            
            var distance = await getDistanceBetweenTwoAddresses(serviceRequests[i].userID, currentProfessionalID);

            if(distance > 50) {
                serviceRequests.splice(i, 1);
                i -= 1;
            }

       }

       res.status(200).json(serviceRequests);
    }catch (err){   
       res.status(503).json({err: err.toString()});
    }
}