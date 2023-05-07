import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Box, Chip, Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize} from '@mui/material';
import { useState, useRef } from 'react';
import axios from "axios";
import Rating from '@mui/material/Rating';



function UserAccordion(props) {
    const [profToGrantJobTo, setProfToGrantJobTo] = useState('0');
    const [rating, setRating] = useState(2);
    const [submittedReview, setSubmitted] = useState(false)
    const handleSelectChange = (event) => { setProfToGrantJobTo(event.target.value); };
    const handleRatingChange = (event, newRating) => {setRating(newRating); };
    const formReference = useRef();

    async function grantJobto() {
        try {
            let professionalUsername = props.acceptors[category].userName;
            await axios.post("/api/grantJobTo", {serviceRequestID: props.id, username: professionalUsername});
        }catch (error) {
            console.log(error);
        }
    }

    async function createReview() {
        try {
            const {reviewDescription, ratingOfServices} = formReference.current;
            await axios.post("/api/submitReview", {value: parseInt(ratingOfServices.value), description: reviewDescription.value, serviceRequest: { connect: {id: props.id}}});
        }catch (error) {
            console.log(error);
        }
    }

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{backgroundColor: "primary.main" }}>
                <Typography>{props.name}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{backgroundColor: "primary.main" }}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', backgroundColor: "primary.main" }} >
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexWrap: 'nowrap', alignContent: 'flex-start', mr: '4em'}}>
                        <Typography variant='body2'>{props.description}</Typography><br />
                        {props.paccepted && <>
                        <Button sx={{mb: 2}} variant="contained" color="success" onClick={() => grantJobto()}>Grant Job To</Button>       
                        <FormControl>
                            <InputLabel id="service-category-label">User</InputLabel>
                            <Select id="grantRequestTo" value={profToGrantJobTo} name="grantRequestTo" onChange={handleSelectChange}>                 
                                {props.acceptors.map((acceptor, index) => (
                                    <MenuItem value={index}>{acceptor.userName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        </>
                        }
                        {props.caccepted && <Typography variant="body1">Professional is now working on this</Typography>}
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'nowrap'}}>
                        <Chip label={props.category} variant="outlined" />
                        <Chip label={props.price} icon={<AttachMoneyIcon />} />
                    </Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}>
                
                    <TextareaAutosize name="reviewDescription" minRows={4} style={{flexGrow: 4, mr: 2}} placeholder="Review of job"></TextareaAutosize>
                    <Rating name="ratingOfServices" value={rating} onChange={handleRatingChange} />
                    
                    
                </Box>
                <Button variant="contained" onClick={()=> createReview()} color="success" >Submit</Button>
                
            </AccordionDetails>
        </Accordion>
    )
}

export default UserAccordion;