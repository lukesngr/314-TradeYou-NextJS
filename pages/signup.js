import { Button, TextField, Card, Box, Typography, Stack, Grid, Switch, FormControlLabel, Alert, Link } from "@mui/material";
import React, {useState, useEffect} from "react";
import NonSignedInNavbar from "../components/navbar/NonSignedInNavbar";
import axios from "axios";
import {useRef} from "react";
import GlobalStyles from "@mui/material/GlobalStyles";

export default function SignUp() {
    const formReference = useRef()
    async function createNewUser(){
        const { userName, userPassword, userEmail, userPhone, userAddress, isProfessional} = formReference.current;
        const username = userName.value;
        const password = userPassword.value;
        const email = userEmail.value;
        const phone = userPhone.value;
        const address  = userAddress.value;
        const professional = isProfessional.value;
        try {
            const req = await axios.post("/api/createAccount", {username, password, email, phone, address, professional});
            if (req.status == 200) {
                setSuccAlertVisible(true);
            }else{
                setSuccAlertVisible(false);
                setErrAlertVisible(true);
                
            }
        }catch (error) {
            setErrAlertVisible(true);
        }
        
    }

    const [value, setValue] = useState("user");
    const [succAlertVisible, setSuccAlertVisible] = useState(false);
    const [errAlertVisible, setErrAlertVisible] = useState(false);

    return (
        <>
            <GlobalStyles styles={{body: { margin: 0 }}}/> 
            <NonSignedInNavbar></NonSignedInNavbar> 
            <Box sx={{display: 'flex', justifyContent: 'center', my: 10}} >
                    <Card>
                        <Box>
                            <form ref={formReference}>
                                <Box  sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', p: 5}}>
                                    <Typography variant="h4">Create account</Typography>
                                    <TextField fullWidth="true" name="userName" id="standard-basic" label="Username" variant="standard" />
                                    <TextField fullWidth="true" name="userPassword" id="standard-password-input" label="Password" type="password" variant="standard" />
                                    <TextField fullWidth="true" name="userEmail" id="standard-basic" label="Email" variant="standard" />
                                    <TextField fullWidth="true" name="userPhone" id="standard-number" label="Phone Number" variant="standard"></TextField>
                                    <TextField fullWidth="true" name="userAddress" id="standard-basic" label="Address" variant="standard"></TextField>       
                                    <FormControlLabel fullWidth="true"  control={<Switch onChange={(event, val) => {
                                        if (val) {
                                            setValue("professional")
                                        }else{
                                            setValue("user")
                                        }    
                                    }} name="isProfessional" value={value} color="primary" />} label="Professional" labelPlacement="start" />
                                    <Button fullWidth variant="contained" color="primary" onClick={()=> createNewUser()}>Create</Button>  
                                    {succAlertVisible && <Alert severity="success">Create account please proceed to <Link href="/">Login</Link></Alert>}
                                    {errAlertVisible && <Alert severity="warning">Error occurred, please contact developer at lukesngr@gmail.com</Alert>}  
                                </Box>
                            </form>
                        </Box>
                    </Card>
                </Box>
            </>
        
    );

}