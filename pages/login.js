import { Button, TextField, Card, Box, Typography } from "@mui/material";
import {useRef} from "react";
import { signIn } from 'next-auth/react';
import GlobalStyles from "@mui/material/GlobalStyles";
import NonSignedInNavbar from "../components/navbar/NonSignedInNavbar";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Router from "next/router";

export default function Login() {
    const formReference = useRef();
    async function loginUser(){
        const {userName, userPassword} = formReference.current;
        const userNameToBeVerified = userName.value;
        const userPasswordToBeVerified = userPassword.value;
        const res = await signIn('credentials', {
                userName: userNameToBeVerified,
                userPassword: userPasswordToBeVerified,
                redirect: false
            });
        
        if(res.status == 200) {
            Router.push("/")
        }else{
            toast.error("Wrong username or password")
        }
        
    }

    return (
        <>
            <GlobalStyles styles={{body: { margin: 0 }}}/>
            <NonSignedInNavbar></NonSignedInNavbar>
            <ToastContainer />   
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 10}} >
                    <Card>
                        <Box>
                            <form ref={formReference}>
                            <Box  sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', p: 5}}>
                                <Typography variant="h4">Login</Typography>
                                <TextField fullWidth={true} name="userName" label="Username" variant="standard" />
                                <TextField fullWidth={true} name="userPassword" label="Password" type="password" variant="standard" />
                                <Button variant="contained" color="primary" onClick={()=> loginUser()}>Sign In</Button>
                            </Box>
                            </form>
                        </Box>
                    </Card>
            </Box>
        </>
        
    );

}