import Fakerator from 'fakerator';
const fakerator = Fakerator('en-AU');
import { Button } from '@mui/material';
import axios from "axios";

export default function GenerateData() {
    async function generateData(){
        var categories = ["professional", "user"];
        for(var x = 0; x < 2; x++) {
            for(var i = 0; i < 20; i++) {
                var username = fakerator.internet.userName();
                var password = "123456";
                var email = fakerator.internet.email();
                var phone = fakerator.phone.number();
                var address = fakerator.address.street();
                var creditCardNumber = fakerator.random.number(10000000).toString();
                var creditCardCVV = fakerator.random.number(1000).toString();
                var category = categories[x];
                try{
                    const request = await axios.post("/api/createAccount", {username, password, email, phone, address, creditCardNumber, creditCardCVV, category});
                }catch (error) {
                    console.log(error)
                }
            }
        }

        var uselessInformation = "justtoPOST";

        try{
            const request = await axios.post("/api/generateRequests", {uselessInformation: uselessInformation});
        }catch (error) {
            console.log(error)
        }
        
    }

    return (
        <> 
            <Button variant="contained" color="primary" onClick={()=> generateData()}>Generate</Button>     
        </>
        
    );

}