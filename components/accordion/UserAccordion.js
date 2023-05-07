import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Box, Chip, Button, FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import { useState, useRef } from 'react';
import axios from "axios";



function UserAccordion(props) {
    const [category, setCategory] = useState('0');
    const handleChange = (event) => { setCategory(event.target.value); };
    const selectReference = useRef()

    async function grantJobto() {
        try {
            let professionalUsername = props.acceptors[category].userName;
            await axios.post("/api/grantJobTo", {serviceRequestID: props.id, username: professionalUsername});
        }catch (error) {
            console.log(error);
        }
    }

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{backgroundColor: "primary.main" }}>
                <Typography>{props.name}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{display: 'flex', justifyContent: 'space-between', backgroundColor: "primary.main" }}>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexWrap: 'nowrap', alignContent: 'flex-start', mr: '4em'}}>
                    <Typography variant='body2'>{props.description}</Typography><br />
                    <Button sx={{mb: 2}} variant="contained" color="success" onClick={() => grantJobto()}>Grant Job To</Button>
                    <FormControl>
                        <InputLabel id="service-category-label">User</InputLabel>
                        <Select id="grantRequestTo" value={category} name="grantRequestTo" onChange={handleChange}>
                                                    
                            {props.acceptors.map((acceptor, index) => (
                                <MenuItem value={index}>{acceptor.userName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'nowrap'}}>
                    <Chip label={props.category} variant="outlined" />
                    <Chip label={props.price} icon={<AttachMoneyIcon />} />
                </Box>
                
            </AccordionDetails>
        </Accordion>
    )
}

export default UserAccordion;