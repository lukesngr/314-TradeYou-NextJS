import { useSession } from 'next-auth/react';
import SignedInProfessionalNavbar from '../components/navbar/SignedInProfessionalNavbar';
import { Box, Card, Stack, Typography} from '@mui/material';
import axios from "axios";
import { useState, useEffect } from 'react';
import ProfessionalAccordion from '../components/accordion/ProfessionalAccordion';
import Router from 'next/router';

const AvailableJobs = () => {
    const {data: session, status } = useSession();
    const [serviceRequests, setServiceRequests] = useState([]);
    requestsBeenGotten = false;

    useEffect(() => {
        
        const getRequests = async () => {
            let data = {};
            try {
                data = await axios.get('http://localhost:3000/api/getRelevantRequestsForProf', {params: {username: session.user.username}});
            }catch (error) {
                console.log(error)
            }

            if(data.data[0] === null) {
                data.data = undefined
            }
        
            if(data.data != undefined) {
                data = data.data;
                
                for (var i = 0; i < data.length; i++) {
                    if(data[i].status == "complete") {
                        delete data[i];
                    }
                }
            }else{
                data = []
            }

            setServiceRequests(data);
    
        }

        if(requestsBeenGotten && status == "authenticated") {
            getRequests();
            requestsBeenGotten = true;
        }
    });

    if(status == "authenticated") {
        if(session.user.userCategory == "professional") {
            return (
                <>
                    <SignedInProfessionalNavbar></SignedInProfessionalNavbar>
                    <Box sx={{display: 'flex', justifyContent: 'center'}} >
                        <Card sx={{p: 5, my: 10}}>
                            <Typography variant="h5">Available Jobs</Typography>
                            <Stack direction="column">
                                {serviceRequests?.map(serviceRequest => (
                                    <ProfessionalAccordion {...serviceRequest} userName={session.user.username}></ProfessionalAccordion>
                                ))}
                            </Stack>
                        </Card>
                    </Box>
                </>
            )
        }
    }else if(status == "loading") {
        return <Typography variant="h3">Loading...</Typography>
    }else if(status == "unauthenticated") {
        Router.push('/');
    }
}

export default AvailableJobs