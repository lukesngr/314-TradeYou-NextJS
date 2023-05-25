import Fakerator from 'fakerator';
const fakerator = Fakerator('en-AU');
import { Button } from '@mui/material';
import axios from "axios";

export default function GenerateData() {
    async function generateData(){
        try{
            var testUserData = {username: "test1", password: "test1", email: "test@gmail.com", phone: "0333123111", address: "10 George Street Sydney", creditCardNumber: "24320192", creditCardCVV: "342", category: "user"};
            var testUserData2 = {username: "test2", password: "test2", email: "test2@gmail.com", phone: "0333123444", address: "11 George Street Sydney", creditCardNumber: "24320194", creditCardCVV: "344", category: "professional"};
            let request = await axios.post("/api/createAccount", testUserData);
            request = await axios.post("/api/createAccount", testUserData2);

            for(var i = 0; i < 19; i++) {
                var username = fakerator.internet.userName();
                var password = "123456";
                var email = fakerator.internet.email();
                var phone = fakerator.phone.number();
                var address = fakerator.address.street();
                var creditCardNumber = fakerator.random.number(10000000).toString();
                var creditCardCVV = fakerator.random.number(1000).toString();
                request = await axios.post("/api/createAccount", {username, password, email, phone, address, creditCardNumber, creditCardCVV, category: "user"});
            }

            for(var i = 0; i < 19; i++) {
                var username = fakerator.internet.userName();
                var password = "123456";
                var email = fakerator.internet.email();
                var phone = fakerator.phone.number();
                var address = fakerator.address.street();
                var creditCardNumber = fakerator.random.number(10000000).toString();
                var creditCardCVV = fakerator.random.number(1000).toString();
                request = await axios.post("/api/createAccount", {username, password, email, phone, address, creditCardNumber, creditCardCVV, category: "professional"});
                
            }

            var uselessInformation = "uselessInformation";
            for(var x = 0; x < 5; x++) {  
                request = await axios.post("/api/genData", {uselessInformation: uselessInformation});
             }
            
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