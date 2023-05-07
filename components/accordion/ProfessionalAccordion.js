import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Box, Chip, Button} from '@mui/material';
import axios from "axios";

async function acceptRequest(requestID, professionalID) {
    try {
        console.log(professionalID);
        await axios.post("/api/appendToRequest", {serviceRequestID: requestID, status: '#'+professionalID});
    }catch (error) {
        console.log(error);
    }
}

async function completeRequest(requestID) {
    try {
        await axios.post("/api/modifyRequest", {serviceRequestID: requestID, status: "complete"});
    }catch (error) {
        console.log(error);
    }
}

function ProfessionalAccordion(props) {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{backgroundColor: "primary.main" }}>
                <Typography>{props.name}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{display: 'flex', justifyContent: 'space-between', width: 'min-content', backgroundColor: "primary.main" }}>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexWrap: 'wrap', alignContent: 'flex-start', mr: '4em'}}>
                    <Typography variant='body2'>{props.description}</Typography>
                    {props.submitted && <Button variant="contained" onClick={()=> acceptRequest(props.id, props.profID)} color="success" >Accept</Button>}
                    {props.paccepted && <Chip color="success" label="Submitted" />}
                    {props.caccepted && <Button variant="contained" onClick={()=> completeRequest(props.id)} color="success" >Complete</Button>}
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'nowrap'}}>
                    <Chip label={props.category} variant="outlined" />
                    <Chip label={props.price} icon={<AttachMoneyIcon />} />
                </Box>
                
            </AccordionDetails>
        </Accordion>
    )
}

export default ProfessionalAccordion;