import { useSession } from 'next-auth/react';
import SignedInUserNavbar from '../components/navbar/SignedInUserNavbar';
import { Box, Card, Stack, Typography} from '@mui/material';
import axios from "axios";
import { useState, useEffect } from 'react';
import UserAccordion from '../components/accordion/UserAccordion';
import Router from 'next/router';

const availableJobs = () => {
    const {data: session, status } = useSession();
    const [serviceRequests, setServiceRequests] = useState([]);

    useEffect(() => {
        
        const getRequests = async () => {
            let data = {data:{}};
            try {
                data = await axios.get('http://localhost:3000/api/getRelevantRequestsForUser', {params: {username: session.user.username}});
            }catch (error) {
                console.log(error)
            }
        
            if(data != undefined) {
                data = data.data;
                for (var i = 0; i < data.length; i++) {
                    data[i].paccepted = false;
                    data[i].caccepted = false;
                    data[i].done = false;
                    if(data[i].status == "done") {
                        data[i].done = true;
                    }else if(data[i].status == "caccept") {
                        data[i].caccepted = true;
                    }else if(data[i].status == "paccept") {
                        data[i].paccepted = true;
                    }
                }
            }

            setServiceRequests(data);
    
        }

        if(serviceRequests.length == 0 && status == "authenticated") {
            getRequests();
        }
    });

    if(status == "authenticated") {
        if(session.user.userCategory == "user") {
            return (
                <>
                    <SignedInUserNavbar></SignedInUserNavbar>
                    <Box sx={{display: 'flex', justifyContent: 'center'}} >
                        <Card sx={{p: 5, my: 10}}>
                            <Typography variant="h5">My Requests</Typography>
                            <Stack direction="column">
                                {serviceRequests.map(serviceRequest => (
                                    <UserAccordion {...serviceRequest}></UserAccordion>
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

export default availableJobs