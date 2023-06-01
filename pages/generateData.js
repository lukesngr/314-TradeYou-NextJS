import Fakerator from 'fakerator';
const fakerator = Fakerator('en-AU');
import { Button } from '@mui/material';
import axios from "axios";

export default function GenerateData() {
    async function generateData(){
        try{
            var testUserData = {username: "test1", password: "test1", email: "test@gmail.com", phone: "0333123111", address: "10 George Street Sydney", creditCardNumber: "24320192", creditCardCVV: "342", category: "user"};
            var testUserData2 = {username: "test2", password: "test2", email: "test2@gmail.com", phone: "0333123444", address: "11 George Street Sydney", creditCardNumber: "24320194", creditCardCVV: "344", category: "professional"};
            var possibleStreets = ["George Street", "Erskine Street", "Paramatta Road", "Rocky Point Road", "Clovelly Road", "Bronte Road", "Birrell Street", "Sydney Einfield Drive", 
            "Punchbowl Road", "Henry Lawson Drive", "Gladstone Avenue", "Princess Highway", "Keira Street", "Burelli Street", "Crown Street", "Mercury Street", "Robosons Road", "Mount Keira Road", "Church Street"];
            let request = await axios.post("/api/createAccount", testUserData);
            request = await axios.post("/api/createAccount", testUserData2);

            for(var i = 0; i < 19; i++) {
                var username = fakerator.internet.userName();
                var password = "123456";
                var email = fakerator.internet.email();
                var phone = fakerator.phone.number();
                var address = fakerator.random.number(11) + " " + possibleStreets[fakerator.random.number(19)];
                console.log(address);
                var creditCardNumber = fakerator.random.number(10000000).toString();
                var creditCardCVV = fakerator.random.number(1000).toString();
                request = await axios.post("/api/createAccount", {username, password, email, phone, address, creditCardNumber, creditCardCVV, category: "user"});
            }

            for(var i = 0; i < 19; i++) {
                var username = fakerator.internet.userName();
                var password = "123456";
                var email = fakerator.internet.email();
                var phone = fakerator.phone.number();
                var address =  fakerator.random.number(11) + " " + possibleStreets[fakerator.random.number(19)];
                var creditCardNumber = fakerator.random.number(10000000).toString();
                var creditCardCVV = fakerator.random.number(1000).toString();
                request = await axios.post("/api/createAccount", {username, password, email, phone, address, creditCardNumber, creditCardCVV, category: "professional"});
                
            }

            for(var x = 0; x < 5; x++) {  
                request = await axios.post("/api/genData", {start: 0, finish: 5});
                request = await axios.post("/api/genData", {start: 5, finish: 10});
                request = await axios.post("/api/genData", {start: 10, finish: 15});
                request = await axios.post("/api/genData", {start: 15, finish: 19});
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