import { Button, TextField, Card, Box, Typography, Stack, Grid, Switch, FormControlLabel, Alert, Link } from "@mui/material";
import React, {useState, useEffect} from "react";
import NonSignedInNavbar from "../components/navbar/NonSignedInNavbar";
import axios from "axios";
import {useRef} from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
    const formReference = useRef()
    async function createNewUser(){
        const { userName, userPassword, userEmail, userPhone, userAddress, userCardNumber, userCardCVV, isProfessional} = formReference.current;
        const username = userName.value;
        const password = userPassword.value;
        const email = userEmail.value;
        const phone = userPhone.value;
        const address  = userAddress.value;
        const category = isProfessional.value;
        const creditCardNumber = userCardNumber.value;
        const creditCardCVV = userCardCVV.value;
        try {
            const req = await axios.post("/api/createAccount", {username, password, email, phone, address, creditCardNumber, creditCardCVV, category});
            if (req.status == 200) {
                toast.success('Account created');
            }else{
                toast('Error occurred please contact lukesngr@gmail.com', { hideProgressBar: true, autoClose: 2000, type: 'error' });
            }
        }catch (error) {
            toast('Error: ' + error, { hideProgressBar: true, autoClose: 2000, type: 'error' });
            console.log(error)
        }
        
    }

    const [value, setValue] = useState("user");

    return (
        <>
            <GlobalStyles styles={{body: { margin: 0 }}}/> 
            <ToastContainer /> 
            <NonSignedInNavbar></NonSignedInNavbar>
            
            <Box sx={{display: 'flex', justifyContent: 'center', my: 10}} >
                    <Card>
                        <Box>
                            <form ref={formReference}>
                                <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', p: 5}}>
                                    <Typography variant="h4">Create account</Typography>
                                    <TextField fullWidth={true} name="userName" id="standard-basic" label="Username" variant="standard" />
                                    <TextField fullWidth={true} name="userPassword" id="standard-password-input" label="Password" type="password" variant="standard" />
                                    <TextField fullWidth={true} name="userEmail" id="standard-basic" label="Email" variant="standard" />
                                    <TextField fullWidth={true} name="userPhone" id="standard-number" label="Phone Number" variant="standard"></TextField>
                                    <TextField fullWidth={true} name="userAddress" id="standard-basic" label="Address" variant="standard"></TextField>
                                    <TextField fullWidth={true} name="userCardNumber" id="standard-number" label="Credit Card Number" variant="standard"></TextField>
                                    <TextField fullWidth={true} name="userCardCVV" id="standard-number" label="CVV" variant="standard"></TextField>   
                                    <FormControlLabel fullWidth={true}  control={<Switch onChange={(event, val) => {
                                        if (val) {
                                            setValue("professional")
                                        }else{
                                            setValue("user")
                                        }    
                                    }} name="isProfessional" value={value} color="primary" />} label="Professional" labelPlacement="start" />
                                    <Button  fullWidth={true} variant="contained" color="primary" onClick={()=> createNewUser()}>Create</Button>  
                                </Box>
                            </form>
                        </Box>
                    </Card>
                </Box>
            </>
        
    );

}