import { Button, TextField, Card, Box, Typography, Stack, Grid, Switch, FormControlLabel } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import React, {useState} from "react";
import { jsonc } from 'jsonc';
import axios from "axios";
import {useRef} from "react";

export default function SignUp() {
    const formReference = useRef()
    async function createNewUser(params){
        const { userName, userPassword, userEmail, userPhone, userAddress, isProfessional} = formReference.current;
        const username = userName.value;
        const password = userPassword.value;
        const email = userEmail.value;
        const phone = userPhone.value;
        const address  = userAddress.value;
        const professional = isProfessional.value;
        try {
            const req = await axios.post("/api/createAccount", {username, password, email, phone, address, professional});
            console.log(req);
        }catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }
        
    }

    const [value, setValue] = useState("");

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <Card>
                    <Box>
                        <form ref={formReference}>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}><Typography variant="h4">Create account</Typography></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}><TextField fullWidth="true" name="userName" id="standard-basic" label="Username" variant="standard" /></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}><TextField fullWidth="true" name="userPassword" id="standard-password-input" label="Password" type="password" variant="standard" /></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}><TextField fullWidth="true" name="userEmail" id="standard-basic" label="Email" variant="standard" /></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}><TextField fullWidth="true" name="userPhone" id="standard-number" label="Phone Number" variant="standard"></TextField></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}><TextField fullWidth="true" name="userAddress" id="standard-basic" label="Address" variant="standard"></TextField></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}><FormControlLabel fullWidth="true"  control={<Switch onChange={(event, val) => {
                                if (val) {
                                    setValue("professional")
                                }else{
                                    setValue("user")
                                }    
                            }} name="isProfessional" value={value} color="primary" />} label="Professional" labelPlacement="start" /></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}><Button fullWidth variant="contained" color="primary" onClick={()=> createNewUser()}>Create</Button></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={12}></Grid>
                        </Grid>
                        </form>
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={4}></Grid>
        </Grid>
        
    );

}