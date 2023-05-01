import { Button, TextField, Card, Box, Typography, Stack, Grid, Switch, FormControlLabel, Alert, Link } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import React, {useState, useEffect} from "react";
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
                            {succAlertVisible && <Alert severity="success">Create account please proceed to <Link href="/">Login</Link></Alert>}
                            {errAlertVisible && <Alert severity="warning">Error occurred, please contact developer at lukesngr@gmail.com</Alert>}
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