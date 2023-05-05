import { useSession } from 'next-auth/react'
import {useEffect, useState, useRef } from 'react';
import {Box, Grid, Card, Link, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert} from "@mui/material"
import SignedInUserNavbar from '../components/SignedInUserNavbar';
import GlobalStyles from "@mui/material/GlobalStyles";
import axios from "axios";


const submitRequest = () => {
    const {data: session } = useSession();
    const formReference = useRef()
    const [category, setCategory] = useState('1');
    const [succAlertVisible, setSuccAlertVisible] = useState('');
    const handleChange = (event) => { setCategory(event.target.value); console.log(event.target.value); };

    async function submitNewRequest(){
        var categories = ["Cleaning Services", "Home Repair and Maintenance", "Landscaping Services", "Moving and Storage Services ",
                                                    "Home Improvement Services ",
                                                    "Window Services ", "Painting Services", "Home Security Services ",
                                                    "Paving Services ",
                                                    "Garage Services"]
        const {requestName, requestDescription, requestPrice, requestCategory} = formReference.current;
        const name = requestName.value;
        const description = requestDescription.value;
        const price = parseFloat(requestPrice.value);
        const category = categories[requestCategory.value];
        const dateTime= new Date();
        const status = "submitted";
        const userType = session.user.userCategory;
        const userName = session.user.username;
        try {
            const req = await axios.post("/api/createRequest", {name, description, category, price, dateTime, status, userType, userName});
            if (req.status == 200) {
                setSuccAlertVisible(true);
            }else{
                setSuccAlertVisible(false);
                
            }
        }catch (error) {
            console.log(error);
            console.log("I hurt myself today to see if I still feel try to throw all away but I remember everything");
        }
        
    }

    if(session) {
        if(session.user.userCategory == "user") {
            
            return (
            <Box>
                <GlobalStyles styles={{body: { margin: 0 }}}/> 
                <SignedInUserNavbar></SignedInUserNavbar> 
                <Grid container sx={{my: 10}} spacing={2}>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <Card>
                            <Box>
                                <form ref={formReference}>
                                    <Grid container alignItems="center" spacing={1}>
                                        <Grid item xs={3}></Grid>
                                            <Grid item xs={6}><Typography variant="h4">Submit a request</Typography></Grid>
                                            <Grid item xs={3}></Grid>
                                            <Grid item xs={3}></Grid>
                                            <Grid item xs={6}><TextField fullWidth={true} name="requestName" id="standard-basic" label="Name" variant="standard" /></Grid>
                                            <Grid item xs={3}></Grid>
                                            <Grid item xs={3}></Grid>
                                            <Grid item xs={6}><TextField fullWidth={true} name="requestDescription" id="standard-password-input" label="Description" variant="standard" /></Grid>
                                            <Grid item xs={3}></Grid>
                                            <Grid item xs={3}></Grid>
                                            <Grid item xs={6}>
                                                <TextField fullWidth={true} name="requestPrice" id="standard-number" label="Desired Price ($)"  variant="standard" /></Grid>
                                            <Grid item xs={3}></Grid>
                                            <Grid item xs={3}></Grid>
                                            <Grid item xs={6}><Box>
                                                <FormControl fullWidth>
                                                <InputLabel id="service-category-label">Service Category</InputLabel>
                                                <Select
                                                    id="service-category"
                                                    value={category}
                                                    name="requestCategory"
                                                    onChange={handleChange}
                                                    >
                                                    <MenuItem value={1}>Cleaning Services</MenuItem>
                                                    <MenuItem value={2}>Home Repair and Maintenance </MenuItem>
                                                    <MenuItem value={3}>Landscaping Services</MenuItem>
                                                    <MenuItem value={4}>Moving and Storage Services </MenuItem>
                                                    <MenuItem value={5}>Home Improvement Services </MenuItem>
                                                    <MenuItem value={6}>Window Services </MenuItem>
                                                    <MenuItem value={7}>Painting Services</MenuItem>
                                                    <MenuItem value={8}>Home Security Services </MenuItem>
                                                    <MenuItem value={9}>Paving Services </MenuItem>
                                                    <MenuItem value={10}>Garage Services</MenuItem>
                                                </Select>
                                                </FormControl>
                                            </Box></Grid>
                                            <Grid item xs={3}></Grid>
                                            <Grid item xs={3}></Grid>
                                            <Grid item xs={6}><Button fullWidth variant="contained" color="primary" onClick={()=> submitNewRequest()}>Submit</Button></Grid>
                                            <Grid item xs={3}></Grid>
                                            {succAlertVisible && <Alert severity="success">Submitted request</Alert>}
                                            <Grid item xs={12}></Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={4}></Grid>
                </Grid>
            </Box>
                
                )
        }
    }

    
    
}

export default submitRequest