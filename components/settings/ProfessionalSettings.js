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
                <RadioGroup defaultValue={props.MembershipPlan[0].category} name="paymentType">
                    <FormControlLabel value="membership" control={<Radio />} label="Membership - annual fee of $300 for no joining fee"></FormControlLabel>
                    <FormControlLabel value="commission" control={<Radio />} label="Commission fee - commission fee of $25 off every job"></FormControlLabel>
                </RadioGroup>
                <Button variant="contained">Update all details</Button>
            </FormControl>
            
        </Paper>
        <Paper elevation={3} sx={{m: 5, p: 3, width: 500 }}>
            <Stack direction="column">
            <Typography variant="h6">Update Details</Typography>
            <TextField name="userName" variant="standard" value={props.username}/>
            <TextField name="userPassword" type="password" variant="standard" value="password" />
            <TextField name="userEmail" variant="standard" value={props.email}/>
            <TextField name="userPhone" variant="standard" value={props.phone}></TextField>
            <TextField name="userAddress" variant="standard" value={props.address}></TextField>
            <TextField name="userCardNumber" variant="standard" value={props.creditCardNumber}></TextField>
            <TextField name="userCardCVV" variant="standard" value={props.creditCardCVV}></TextField>  
            </Stack>             
        </Paper>
        </Box>
        </Box>

    )
}

export default ProfessionalSettings;