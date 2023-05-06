import { Button, TextField, Card, Box, Typography, Stack, Grid, Switch, FormControlLabel, Alert, Link, AppBar, Container, Toolbar } from "@mui/material";
import {useRef} from "react";
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import App from "next/app";
import GlobalStyles from "@mui/material/GlobalStyles";
import NonSignedInNavbar from "../components/navbar/NonSignedInNavbar";

export default function Login() {
    const formReference = useRef();
    async function loginUser(){
        const {userName, userPassword} = formReference.current;
        const userNameToBeVerified = userName.value;
        const userPasswordToBeVerified = userPassword.value;
        const res = await signIn('credentials', {
                userName: userNameToBeVerified,
                userPassword: userPasswordToBeVerified,
                callbackUrl: '/',
            });
        

        if(res?.error) {
            console.log(res);
        }
        
    }

    return (
        <Box>
            <GlobalStyles styles={{body: { margin: 0 }}}/>
            <NonSignedInNavbar></NonSignedInNavbar>  
            <Grid container sx={{my: 10}} spacing={2}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <Card>
                        <Box>
                            <form ref={formReference}>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={6}><Typography variant="h4">Login</Typography></Grid>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={6}><TextField fullWidth="true" name="userName" id="standard-basic" label="Username" variant="standard" /></Grid>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={6}><TextField fullWidth="true" name="userPassword" id="standard-password-input" label="Password" type="password" variant="standard" /></Grid>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={6}><Button fullWidth variant="contained" color="primary" onClick={()=> loginUser()}>Sign In</Button></Grid>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={12}></Grid>
                            </Grid>
                            </form>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        </Box>
        
    );

}