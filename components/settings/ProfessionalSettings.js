import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Box, Paper, Typography, Grid, TextField, Stack } from "@mui/material";

function ProfessionalSettings(props) {

    return (
    <Box sx={{border: 1, borderRadius: 5, m: 1 }}>
        <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <Typography variant="h3" sx={{color: "black"}}>Settings</Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}>
        <Paper elevation={3} sx={{m: 5, p: 3 }}>
            <Typography variant="h6">Payment Type</Typography>
            <FormControl>
                <RadioGroup defaultValue="Membership" name="paymentType">
                    <FormControlLabel value="Membership" control={<Radio />} label="Membership - annual fee of $300 for no joining fee"></FormControlLabel>
                    <FormControlLabel value="Commission" control={<Radio />} label="Commission fee - commission fee of $25 off every job"></FormControlLabel>
                </RadioGroup>
                <Button variant="contained">Update all details</Button>
            </FormControl>
            
        </Paper>
        <Paper elevation={3} sx={{m: 5, p: 3, width: 500 }}>
            <Stack direction="column">
            <Typography variant="h6">Update Details</Typography>
            <TextField name="userName" label="Username" variant="standard" value={props.username}/>
            <TextField name="userPassword" label="Password" type="password" variant="standard" value="password" />
            <TextField name="userEmail" label="Email" variant="standard" value={props.email}/>
            <TextField name="userPhone"label="Phone Number" variant="standard" value={props.phone}></TextField>
            <TextField name="userAddress" label="Address" variant="standard" value={props.address}></TextField>
            <TextField name="userCardNumber"  label="Credit Card Number" variant="standard" value={props.creditCardNumber}></TextField>
            <TextField name="userCardCVV" label="CVV" variant="standard" value={props.creditCardCVV}></TextField>  
            </Stack>             
        </Paper>
        </Box>
        </Box>

    )
}

export default ProfessionalSettings;