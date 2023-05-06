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
            <Box>
            <NonSignedInNavbar></NonSignedInNavbar>
            <Grid container sx={{my: 10}} spacing={2}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <Card sx={{p: 10}}>
                        <Box>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={6}><Typography variant="h4">Welcome</Typography></Grid>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={6}><Link href="/login">Please Go To Login or Signup</Link></Grid>
                                <Grid item xs={3}></Grid>
                            </Grid>
                        </Box>
                    </Card>
                </Grid>
            <Grid item xs={4}></Grid>
        </Grid>
        </Box>
        )
    }

    
    
}

export default HomePage