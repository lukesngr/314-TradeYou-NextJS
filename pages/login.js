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
        <>
            <GlobalStyles styles={{body: { margin: 0 }}}/>
            <NonSignedInNavbar></NonSignedInNavbar>  
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 10}} >
                    <Card>
                        <Box>
                            <form ref={formReference}>
                            <Box  sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', p: 5}}>
                                <Typography variant="h4">Login</Typography>
                                <TextField fullWidth="true" name="userName" id="standard-basic" label="Username" variant="standard" />
                                <TextField fullWidth="true" name="userPassword" id="standard-password-input" label="Password" type="password" variant="standard" />
                                <Button fullWidth variant="contained" color="primary" onClick={()=> loginUser()}>Sign In</Button>
                            </Box>
                            </form>
                        </Box>
                    </Card>
            </Box>
        </>
        
    );

}