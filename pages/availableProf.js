import { useSession } from 'next-auth/react';
import SignedInProfessionalNavbar from '../components/SignedInProfessionalNavbar';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Box, Grid, Card, Stack, Chip, Button } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import { useState, useEffect } from 'react';

async function completeRequest(requestID) {
    try {
        await axios.post("/api/modifyRequest", {serviceRequestID: requestID, status: "complete"});
    }catch (error) {
        console.log
    }
}

const availableJobs = () => {
    const {data: session, status } = useSession();
    const [serviceRequests, setServiceRequests] = useState([]);
    const [professionalID, setProfessionalID] = useState(0);

    async function acceptRequest(requestID) {
        try {
            console.log(professionalID);
            await axios.post("/api/appendToRequest", {serviceRequestID: requestID, status: '#'+professionalID});
        }catch (error) {
            console.log
        }
    }

    useEffect(() => {
        
        const getRequests = async () => {
            let data = {data:{}};
            try {
                data = await axios.get('http://localhost:3000/api/getRelevantRequestsForProf', {params: {username: session.user.username}});
            }catch (error) {
                console.log(error)
            }
        
            if(data != undefined) {
                data = data.data;
                if(data[data.length-1].professionalID != null) {
                    setProfessionalID(data[data.length-1].professionalID);
                    delete data[data.length-1];
                }
                
                for (var i = 0; i < data.length-1; i++) {
                    data[i].submitted = false;
                    data[i].paccepted = false;
                    data[i].caccepted = false;
                    if(data[i].status == "submitted") {
                        data[i].submitted = true;
                    }else if(data[i].status == "done") {
                        delete data[i];
                    }else if(data[i].status == "caccept") {
                        data[i].caccepted = true;
                    }else{
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
                                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{backgroundColor: "primary.main" }}>
                                                            <Typography>{serviceRequest.name}</Typography>
                                                            
                                                        </AccordionSummary>
                                                        <AccordionDetails sx={{backgroundColor: "primary.main" }}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={7}><Typography>{serviceRequest.description}</Typography></Grid>
                                                                <Grid item xs={5}>
                                                                    <Chip label={serviceRequest.category} variant="outlined" />
                                                                    <Chip icon={<AttachMoneyIcon />} label={serviceRequest.price} />
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    {serviceRequest.submitted && <Button variant="contained" onClick={()=> acceptRequest(serviceRequest.id)} color="success" >Accept</Button>}
                                                                    {serviceRequest.paccepted && <Chip color="success" label="Submitted" />}
                                                                    {serviceRequest.caccepted && <Button variant="contained" onClick={()=> completeRequest(serviceRequest.id)} color="success" >Complete</Button>}
                                                                </Grid>
                                                            </Grid>
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