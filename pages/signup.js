import { Button, TextField, Card, Box, Typography, Stack, Grid, Switch, FormControlLabel } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import React, {useState} from "react";

import axios from "axios";
import {useRef} from "react"

export default function SignUp() {
    const formReference = useRef()
    async function createNewUser(params){
        const { username, password, email, phone, address, isProfessional} = formReference.current;
        const userName = username.value;
        const passwordToBeHashed = password.value;
        const userEmail = email.value;
        const phoneNumber = phone.value;
        const userAddress  = address.value;
        const professional = isProfessional.value;
        await axios.post("/api/createAccount", {userName, passwordToBeHashed, userEmail, phoneNumber, userAddress, professional});
        window.location.reload();
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
                            <Grid item xs={6}><TextField fullWidth="true" name="username" id="standard-basic" label="Username" variant="standard" /></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}><TextField fullWidth="true" name="password" id="standard-password-input" label="Password" type="password" variant="standard" /></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}><TextField fullWidth="true" name="email" id="standard-basic" label="Email" variant="standard" /></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}><TextField fullWidth="true" name="phone" id="standard-number" label="Phone Number" variant="standard"></TextField></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}><TextField fullWidth="true" name="address" id="standard-basic" label="Address" variant="standard"></TextField></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}><FormControlLabel fullWidth="true"  control={<Switch onChange={(event, val) => {
                                if (val) {
                                    setValue("professional")
                                }else{
                                    setValue("user")
                                }    
                            }} name="IsProfessional" value={value} color="primary" />} label="Professional" labelPlacement="start" /></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={6}><Button fullWidth="true" variant="contained" color="primary" onClick={()=> createNewUser()}>Create</Button></Grid>
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