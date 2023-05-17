import {mydb} from '../../mymodules/prismaClientInstance';
import Fakerator from 'fakerator';
const fakerator = Fakerator('en-AU');

export default async(req, res) => {
    let data = req.body;
    try {
        let firstUser = await mydb.tradeYouUser.findFirst({
            select: {id: true, username: true}
        });
        let firstProfessional = await mydb.tradeYouProfessional.findFirst({
            select: {username: true}
        })
        console.log("Example account to test with: "+firstUser.username);
        console.log("Example professional account to test with: "+firstProfessional.username)
        var categories = ["Cleaning Services", "Home Repair and Maintenance", "Landscaping Services", "Moving and Storage Services ",
                        "Home Improvement Services", "Window Services ", "Painting Services", "Home Security Services ",
                        "Paving Services ", "Garage Services"]  
        let result = "";
        for(var i = 0; i < 19; i++) {
            for(var x = 0; x < 5; i++) {
                var category = categories[fakerator.random.number(9)];
                var price = fakerator.random.number(10000);
                console.log(firstUser.id+i)
                 result = await mydb.serviceRequest.create({
                    data: {
                        name: "My Service Request",
                        description: "Service Request information is hard to randomly generate",
                        category: category,
                        price: price,
                        dateTime: new Date(),
                        status:  "submitted",
                        user: {
                            connect: {
                                id: firstUser.id+i
                            }
                        }
                    }
                });
            }
        }

        res.status(200).json(result);
    }catch (error) {   
        res.status(503).json({error: error.toString()});
    }
    
    
}