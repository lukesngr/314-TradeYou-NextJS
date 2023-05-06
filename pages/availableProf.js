import { useSession } from 'next-auth/react';
import SignedInProfessionalNavbar from '../components/navbar/SignedInProfessionalNavbar';
import { Box, Card, Stack} from '@mui/material';
import axios from "axios";
import { useState, useEffect } from 'react';

const availableJobs = () => {
    const {data: session, status } = useSession();
    const [serviceRequests, setServiceRequests] = useState([]);
    const [professionalID, setProfessionalID] = useState(0);

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
                <>
                    <SignedInProfessionalNavbar></SignedInProfessionalNavbar>
                    <Box sx={{alignSelf: 'center'}} >
                        <Card sx={{p: 10}}>
                            <Stack direction="column">
                                {serviceRequests.map(serviceRequest => (
                                    <ProfessionalAccordion id={serviceRequest.id} name={serviceRequest.name} desc={serviceRequest.description} 
                                    category={serviceRequest.category} price={serviceRequest.price} profID={professionalID}></ProfessionalAccordion>
                                ))}
                            </Stack>
                        </Card>
                    </Box>
                </>
            )
        }
    }
}

export default availableJobs