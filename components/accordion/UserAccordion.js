import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Box, Chip, Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize} from '@mui/material';
import { useState } from 'react';
import axios from "axios";
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UserAccordion(props) {
    let initialRating = 5;
    let initialReviewDescription = "Review of the job";

    if(props.review.length != 0) {
        initialRating = props.review[0].value;
        initialReviewDescription = props.review[0].description;
    }

    const [profToGrantJobTo, setProfToGrantJobTo] = useState('0');
    const [rating, setRating] = useState(initialRating);
    const [reviewDesc, setReviewDescription] = useState(initialReviewDescription);
    const [professionalAccepted, setProfessionalAccepted] = useState(props.status == "paccept");
    const [userAccepted, setUserAccepted] = useState(props.status == "caccept")
    const [jobComplete, setJobComplete] = useState(props.status == "complete");
    const [submittedReview, setSubmittedReview] = useState(props.review.length != 0);

    const handleSelectChange = (event) => { setProfToGrantJobTo(event.target.value); };
    const handleRatingChange = (event, newRating) => {setRating(newRating); };

    async function grantJobto() {
        try {
            let professionalUsername = props.acceptors[profToGrantJobTo].userName;
            await axios.post("/api/grantJobTo", {serviceRequestID: props.id, username: professionalUsername});
            setUserAccepted(true);
            setProfessionalAccepted(false);
            toast.success('Job granted');
        }catch (error) {
            console.log(error)
        }
    }

    async function createReview() {
        try {
            await axios.post("/api/submitReview", {value: rating, description: reviewDesc, serviceRequest: { connect: {id: props.id}}});
            setSubmittedReview(true);
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
                        {professionalAccepted && <>
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
                        {userAccepted && <Typography variant="body1">Professional is now working on this</Typography>}
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'nowrap'}}>
                        <Chip label={props.category} variant="outlined" />
                        <Chip label={props.price} icon={<AttachMoneyIcon />} />
                    </Box>
                </Box>
                {jobComplete && 
                <>
                    <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}>     
                        <TextareaAutosize name="reviewDescription" minRows={4} style={{flexGrow: 4, mr: 2}} value={reviewDesc} onChange={(event) => {setReviewDescription(event.target.value)}}></TextareaAutosize>
                        <Rating name="ratingOfServices" value={rating} onChange={handleRatingChange} />  
                    </Box>
                    {!submittedReview && <Button variant="contained" onClick={()=> createReview()} color="success" >Submit</Button> }
                    {submittedReview &&<Button variant="contained" onClick={()=> createReview()} color="success" >Change</Button> }
                </>
                }
                
            </AccordionDetails>
        </Accordion>
    )
}

export default UserAccordion;