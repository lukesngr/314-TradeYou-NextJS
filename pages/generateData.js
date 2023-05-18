import Fakerator from 'fakerator';
const fakerator = Fakerator('en-AU');
import { Button } from '@mui/material';
import axios from "axios";

export default function GenerateData() {
    async function generateData(){
        try{
            var uselessInformation = "uselessInformation";
            const request = await axios.post("/api/genData", {uselessInformation: uselessInformation});
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