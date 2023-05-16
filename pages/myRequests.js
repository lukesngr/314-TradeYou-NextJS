import { useSession } from 'next-auth/react';
import SignedInUserNavbar from '../components/navbar/SignedInUserNavbar';
import { Box, Card, Stack, Typography} from '@mui/material';
import axios from "axios";
import UserAccordion from '../components/accordion/UserAccordion';
import Router from 'next/router';
import { useQuery } from '@tanstack/react-query';

function MyRequests(props) {
    
    let serviceRequests = [];
    const { status: getStatus, error, data: serviceRequestData} = useQuery({
        queryKey: ['userRequests'],
        queryFn: () => {
            return axios.get('http://localhost:3000/api/getRelevantRequestsForUser', {params: {username: props.username}}).then(res => res.data).catch(error => console.log(error));
        }
    })
    if(getStatus === "success") {
        serviceRequests = serviceRequestData;
    }else if(getStatus === "error") {
        console.log(error);
    }

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

export default function availableJobs() {
    const {data: session, status } = useSession();

    if(status == "authenticated") {
        if(session.user.userCategory == "user") {
            return <MyRequests username={session.user.username}></MyRequests>
        }
    }else if(status == "loading") {
        return <Typography variant="h3">Loading...</Typography>
    }else if(status == "unauthenticated") {
        Router.push('/');
    }
}