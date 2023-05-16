import { useSession } from 'next-auth/react';
import SignedInProfessionalNavbar from '../components/navbar/SignedInProfessionalNavbar';
import { Box, Card, Stack, Typography} from '@mui/material';
import axios from "axios";
import { useState, useEffect } from 'react';
import ProfessionalAccordion from '../components/accordion/ProfessionalAccordion';
import Router from 'next/router';
import { useQuery } from '@tanstack/react-query';

function AvailableJobs(props) {
    let serviceRequests = [];
    const { status: getStatus, error, data: serviceRequestData} = useQuery({
        queryKey: ['profRequests'],
        queryFn: () => {
            return axios.get('http://localhost:3000/api/getAvailableJobs', {params: {username: props.username}}).then(res => res.data).catch(error => console.log(error));
        }
    })
    if(getStatus === "success") {
        serviceRequests = serviceRequestData;
    }else if(getStatus === "error") {
        console.log(error);
    }

    return (
        <>
            <SignedInProfessionalNavbar></SignedInProfessionalNavbar>
            <Box sx={{display: 'flex', justifyContent: 'center'}} >
                <Card sx={{p: 5, my: 10}}>
                    <Typography variant="h5">Available Jobs</Typography>
                    <Stack direction="column">
                        {serviceRequests?.map(serviceRequest => (
                            <ProfessionalAccordion {...serviceRequest} userName={props.username}></ProfessionalAccordion>
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
        if(session.user.userCategory == "professional") {
            return <AvailableJobs username={session.user.username}></AvailableJobs>
        }
    }else if(status == "loading") {
        return <Typography variant="h3">Loading...</Typography>
    }else if(status == "unauthenticated") {
        Router.push('/');
    }
}