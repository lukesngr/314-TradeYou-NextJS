import { useSession } from 'next-auth/react'
import {useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from "react-toastify";
import {Box, Card, Link, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert} from "@mui/material"
import SignedInUserNavbar from '../components/navbar/SignedInUserNavbar';
import GlobalStyles from "@mui/material/GlobalStyles";
import axios from "axios";
import Router from 'next/router';
import 'react-toastify/dist/ReactToastify.css';


const submitRequest = () => {
    const {data: session, status } = useSession();
    const formReference = useRef()
    const [category, setCategory] = useState('1');
    const handleChange = (event) => { setCategory(event.target.value); console.log(event.target.value); };

    async function submitNewRequest(){
        var categories = ["Cleaning Services", "Home Repair and Maintenance", "Landscaping Services", "Moving and Storage Services ",
                        "Home Improvement Services", "Window Services ", "Painting Services", "Home Security Services ",
                        "Paving Services ", "Garage Services"]
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
                toast.success('Submitted request');
            }else{
                toast('Error occured please contact lukesngr@gmail.com', { hideProgressBar: true, autoClose: 2000, type: 'error' });
                
            }
        }catch (error) {
            console.log(error)
        }
        
    }

    if(status == "authenticated") {
        if(session.user.userCategory == "user") {
            return (
            <>
                <GlobalStyles styles={{body: { margin: 0 }}}/> 
                <ToastContainer />
                <SignedInUserNavbar></SignedInUserNavbar> 
                <Box sx={{display: 'flex', justifyContent: 'center', mt: 10}} >
                        <Card>
                            <Box>
                                <form ref={formReference}>
                                    <Box  sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', p: 5}}>
                                            <Typography variant="h4">Submit a request</Typography>
                                            <TextField fullWidth={true} name="requestName" id="standard-basic" label="Name" variant="standard" />
                                            <TextField fullWidth={true} name="requestDescription" id="standard-password-input" label="Description" variant="standard" />
                                                <TextField fullWidth={true} name="requestPrice" id="standard-number" label="Desired Price ($)"  variant="standard" />
                                            <Box>
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
                                            </Box>
                                            <Button fullWidth variant="contained" color="primary" onClick={()=> submitNewRequest()}>Submit</Button>
                                </Box>
                            </form>
                        </Box>
                    </Card>
                </Box>
            </>
                
                )
        }
    }else if(status == "loading") {
        return <Typography variant="h3">Loading...</Typography>
    }else if(status == "unauthenticated") {
        Router.push('/');
    }
}

export default submitRequest