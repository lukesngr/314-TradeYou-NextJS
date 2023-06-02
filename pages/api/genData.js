import {mydb} from '../../mymodules/prismaClientInstance';
import Fakerator from 'fakerator';
const fakerator = Fakerator('en-AU');
const bcrypt = require("bcrypt");

export default async(req, res) => {
    let data = req.body;
    try {
        let result = "";

        const firstUser = await mydb.tradeYouUser.findFirst();

        var categories = ["Cleaning Services", "Home Repair and Maintenance", "Landscaping Services", "Moving and Storage Services ",
                        "Home Improvement Services", "Window Services ", "Painting Services", "Home Security Services ",
                        "Paving Services ", "Garage Services"];
        var titles = ["Request to clean my house", "Request to patch my walls up", "Request to trim my hedges", "Request to move my furniture to a new house",
                      "Request to pave the front of my house", "Request to fix my garage door", "Request to add CCTV to my house", "Request to clean my windows",
                      "Request to redesign house", "Request to clean house"]
          
        for(var i = data.start; i < data.finish; i++) {
            var category = categories[fakerator.random.number(9)];
            var title = titles[fakerator.random.number(9)];
            var description = fakerator.lorem.sentence()
            var price = fakerator.random.number(10000);
            result = await mydb.serviceRequest.create({
                data: {
                    name: title,
                    description: description,
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

        res.status(200).json(result);
    }catch (error) {   
        res.status(503).json({error: error.toString()});
    }
    
    
}