import { useSession } from 'next-auth/react'
import SignedInProfessionalNavbar from '../components/navbar/SignedInProfessionalNavbar';
import NonSignedInNavbar from '../components/navbar/NonSignedInNavbar';
import {Box, Card, Link, Typography} from "@mui/material"
import SignedInUserNavbar from '../components/navbar/SignedInUserNavbar';


const HomePage = () => {
    const {data: session, status } = useSession()
    if(status == "authenticated") {
        if(session.user.userCategory == "professional") {
            return (
                <SignedInProfessionalNavbar></SignedInProfessionalNavbar>)
        }else if(session.user.userCategory == "user") {
            return (
                <SignedInUserNavbar></SignedInUserNavbar>)
        }
    }else if(status == "loading") {
        return <Typography variant="h3">Loading...</Typography>
    }else if(status == "unauthenticated") {
        return (
            <>
                <NonSignedInNavbar></NonSignedInNavbar>
                <Box sx={{display: 'flex', justifyContent: 'center', mt: 10}} >
                    <Card sx={{p: 10}}>
                        <Box  sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', p: 5}}>
                            <Typography variant="h4">Welcome</Typography>
                        </Box>
                    </Card>
                </Box>
            </>
        )
    }
    
}

export default HomePage