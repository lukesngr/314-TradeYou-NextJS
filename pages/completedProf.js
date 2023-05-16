import { useSession } from 'next-auth/react';
import SignedInProfessionalNavbar from '../components/navbar/SignedInProfessionalNavbar';
import { Box, Card, Stack, Typography} from '@mui/material';
import axios from "axios";
import ProfessionalAccordion from '../components/accordion/ProfessionalAccordion';
import Router from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@tanstack/react-query';

function CompletedJobs(props) {
    let serviceRequests = [];
    const { status: getStatus, error, data: serviceRequestData} = useQuery({
        queryKey: ['completedJobs'],
        queryFn: () => {
            return axios.get('http://localhost:3000/api/getCompletedJobs', {params: {username: props.username}}).then(res => res.data).catch(error => console.log(error));
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
                    <Typography variant="h5">Completed Jobs</Typography>
                    <Stack direction="column">
                        {serviceRequests.map(serviceRequest => (
                            <ProfessionalAccordion {...serviceRequest} userName={props.username}></ProfessionalAccordion>
                        ))}
                    </Stack>
                </Card>
            </Box>
        </>
    )
}

export default function completedJobs() {
    const {data: session, status } = useSession();

    if(status == "authenticated") {
        if(session.user.userCategory == "professional") {
            return <CompletedJobs username={session.user.username}></CompletedJobs>
        }
    }else if(status == "loading") {
        return <Typography variant="h3">Loading...</Typography>
    }else if(status == "unauthenticated") {
        Router.push('/');
    }
}