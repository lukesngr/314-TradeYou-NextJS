import { RadioGroup } from '@mui/material';
import {mydb} from '../../mymodules/prismaClientInstance';
const bcrypt = require("bcrypt");

export default async(req, res) => {
    let data = req.body;
    try{
            let updateResult = "";
            if(data.password != "password") {
                const newPassword = await bcrypt.hash(data.password, 10);  
                data.password = newPassword;
            }else{
                delete data.password;
            }
            
            if(data.category == "professional") {
                delete data.category;
                updateResult += await mydb.membershipPlan.update({
                    where: {id: data.membershipID},
                    data: {category: data.radioGroupValue}
                })

                delete data.membershipID;
                delete data.radioGroupValue;

                updateResult = await mydb.tradeYouProfessional.update({
                    where: {username: data.username},
                    data: {
                        ...data
                    }
                })

                
            }else{
                delete data.category;
                updateResult += await mydb.membershipPlan.update({
                    where: {id: data.membershipID},
                    data: {category: data.radioGroupValue}
                })

                delete data.membershipID;
                delete data.radioGroupValue;

                updateResult = await mydb.tradeYouUser.update({
                    where: {username: data.username},
                    data: {
                        ...data
                    }
                })
            }

        res.status(200).json(updateResult);
    }catch (error){   
        res.status(503).json({error: error.toString()});
    }
    
    
}