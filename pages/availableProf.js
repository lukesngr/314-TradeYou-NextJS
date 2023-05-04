import { useSession } from 'next-auth/react';
import SignedInProfessionalNavbar from '../components/SignedInProfessionalNavbar';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Box, Grid, Card, Stack, Chip, Button } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import axios from "axios";

export const getStaticProps = async() => {
    
    let data = {};
    try {
        data = await axios.get('http://localhost:3000/api/getAllRequests');
        if (data.status == 200) {
        }else{
            
            
        }
    }catch (error) {
        console.log(error)
    }

    if(data != {}) {
        data = data.data;
        for (var i = 0; i < data.length; i++) {
            data[i].submitted = false;
            data[i].paccepted = false;
            data[i].caccepted = false;
            if(data[i].status == "submitted") {
                data[i].submitted = true;
            }else if(data[i].status == "paccept") {
                data[i].paccepted = true;
            }else if(data[i].status == "caccept") {
                data[i].caccepted = true;
            }else{
                delete data[i];
            }
        }
    }

    console.log(data);

    return {props: {serviceRequests: data}}
}

async function acceptRequest(requestID) {

}

async function rejectRequest(requestID) {

}

async function completeRequest(requestID) {
    
}

const availableJobs = ({ serviceRequests }) => {
    const {data: session } = useSession();
    if(session) {
        if(session.user.userCategory == "professional") {
            return (
                <Box>
                    <SignedInProfessionalNavbar></SignedInProfessionalNavbar>
                        <Grid container sx={{my: 10}} spacing={2}>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Card sx={{p: 10}}>
                                        <Stack direction="column">
                                           {serviceRequests.map(serviceRequest => (
                                            <Box>
                                                    <Accordion fullWidth={true}>
                                                        <AccordionSummary sx={{backgroundColor: "primary.main" }}>
                                                            <Typography>{serviceRequest.name}</Typography>
                                                            {serviceRequest.submitted && <Button variant="contained" color="success" >Accept</Button>}
                                                            {serviceRequest.submitted && <Button variant="contained" color="error" >Reject</Button>}
                                                            {serviceRequest.paccepted && <Chip color="success" label="Submitted" />}
                                                            {serviceRequest.caccepted && <Button variant="contained" color="success" >Complete</Button>}
                                                        </AccordionSummary>
                                                        <AccordionDetails sx={{backgroundColor: "primary.main" }}>
                                                            <Stack direction="row" spacing={2}>
                                                                <Typography>{serviceRequest.description}</Typography>
                                                                <Chip label={serviceRequest.category} variant="outlined" />
                                                                <Chip icon={<AttachMoneyIcon />} label={serviceRequest.price} />
                                                            </Stack>
                                                        </AccordionDetails>
                                                    </Accordion>
                                            </Box>
                                            ))}
                                        </Stack>
                                </Card>
                            </Grid>
                            <Grid item xs={4}></Grid>
                        </Grid>
                </Box>
            )
        }
    }
}

export default availableJobs