import { useSession } from 'next-auth/react'
import NonSignedInNavbar from '../components/navbar/NonSignedInNavbar';
import {Box, Card, Typography} from "@mui/material";
import Router from 'next/router';


const HomePage = () => {
    const {data: session, status } = useSession()
    if(status == "authenticated") {
        if(session.user.userCategory == "professional") {
            Router.push('/availableProf');
        }else if(session.user.userCategory == "user") {
            Router.push('/submitRequest');
        }
    }else if(status == "loading") {
        return <Typography variant="h3">Loading...</Typography>
    }else if(status == "unauthenticated") {
        return (
            <>
                <NonSignedInNavbar></NonSignedInNavbar>
                <Box>
                    <img src="/images/desktopgraphic.png" style={{width: "100%"}}></img>
                </Box>
                <Box sx={{position: "absolute", left: '33%', top: '50%'}} >
                        <Card sx={{p: 5, backgroundColor: "secondary.main", color: "black"}}>
                            <Typography variant="h4">Welcome to TradeYou</Typography>
                            <Typography variant="p">TradeYou is a site which helps you log requests to get tradies to do work for you</Typography>
                        </Card>
                </Box>
                <Box sx={{width: "100%", height: "100px", backgroundColor: "primary.main"}}></Box>
            </>
        )
    }
    
}

export default HomePage