import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Box, Chip, Button, Rating, } from '@mui/material';
import axios from "axios";
import { useState } from 'react';

function ProfessionalAccordion(props) {

    const [submitted, setSubmitted] = useState(props.status == "submitted");
    const [caccepted, setCaccepted] = useState(props.status == "caccept");
    const [paccepted, setPaccepted] = useState(props.status == "paccept");
    const [jobComplete, setJobComplete] = useState(props.status == "complete");
    const [rating, setRating] = useState(props.review[0].value);

    async function acceptRequest() {
        try {
            await axios.post("/api/appendToRequest", {serviceRequestID: props.id, userName: props.userName});
            setSubmitted(false);
            setPaccepted(true);
        }catch (error) {
            console.log(error);
        }
    }
    
    async function completeRequest() {
        try {
            await axios.post("/api/modifyRequest", {serviceRequestID: props.id, status: "complete"});
            setPaccepted(false);
            setCaccepted(true);
        }catch (error) {
            console.log(error);
        }
    }

    console.log(props.review[0].value)

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{backgroundColor: "primary.main" }}>
                <Typography>{props.name}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{backgroundColor: "primary.main" }}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', backgroundColor: "primary.main" }} >
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexWrap: 'nowrap', alignContent: 'flex-start', mr: '4em'}}>
                        <Typography variant='body2'>{props.description}</Typography>
                        {submitted && <Button variant="contained" onClick={()=> acceptRequest()} color="success" >Accept</Button>}
                        {paccepted && <Chip color="success" label="Submitted" />}
                        {caccepted && <Button variant="contained" onClick={()=> completeRequest()} color="success" >Complete</Button>}
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'nowrap'}}>
                        <Chip label={props.category} variant="outlined" />
                        <Chip label={props.price} icon={<AttachMoneyIcon />} />
                    </Box>
                </Box>
                {jobComplete && 
                <>
                    <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}>     
                        <Typography name="reviewDescription"  sx={{flexGrow: 4, mr: 2}} >{props.review[0].description}</Typography>
                        <Rating name="ratingOfServices" value={rating} readOnly/>  
                    </Box>
                </>
                }
            </AccordionDetails>
        </Accordion>
    )
}

export default ProfessionalAccordion;