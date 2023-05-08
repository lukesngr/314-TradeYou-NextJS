import { useSession } from 'next-auth/react'
import Router from 'next/router'
import {useEffect } from 'react';
import SignedInProfessionalNavbar from '../components/navbar/SignedInProfessionalNavbar';
import NonSignedInNavbar from '../components/navbar/NonSignedInNavbar';
import {Box, Grid, Card, Link, Typography} from "@mui/material"
import SignedInUserNavbar from '../components/navbar/SignedInUserNavbar';
import GlobalStyles from "@mui/material/GlobalStyles";


const HomePage = () => {
    const {data: session } = useSession()
    if(session) {
        if(session.user.userCategory == "professional") {
            return (
                <SignedInProfessionalNavbar></SignedInProfessionalNavbar>)
        }else if(session.user.userCategory == "user") {
            return (
                <SignedInUserNavbar></SignedInUserNavbar>)
        }
    } else {
        return (
            <>
            <NonSignedInNavbar></NonSignedInNavbar>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 10}} >
                    <Card sx={{p: 10}}>
                        <Box  sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', p: 5}}>
                            <Typography variant="h4">Welcome</Typography>
                            <Link href="/login">Please Go To Login or Signup</Link>
                        </Box>
                    </Card>
            </Box>
        </>
        )
    }

    
    
}

export default HomePage