import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Grid, Chip, Button} from '@mui/material';
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

function ProfessionalAccordion({props}) {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{backgroundColor: "primary.main" }}>
                <Typography>{props.name}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{backgroundColor: "primary.main" }}>
                <Grid container spacing={2}>
                    <Grid item xs={7}><Typography>{props.desc}</Typography></Grid>
                    <Grid item xs={5}>
                        <Chip label={props.category} variant="outlined" />
                        <Chip icon={<AttachMoneyIcon />} label={props.price} />
                    </Grid>
                    <Grid item xs={12}>
                        {props.submitted && <Button variant="contained" onClick={()=> acceptRequest(props.id, props.profID)} color="success" >Accept</Button>}
                        {props.paccepted && <Chip color="success" label="Submitted" />}
                        {props.caccepted && <Button variant="contained" onClick={()=> completeRequest(props.id)} color="success" >Complete</Button>}
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

export default ProfessionalAccordion;