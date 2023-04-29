import { Button, TextField, Card, Box, Typography, Stack, Grid } from "@mui/material";
import axios from "axios";
import {useRef} from "react"

export default function SignUp() {
    const formReference = useRef()
    async function createNewUser(params){
        const { username, email, password} = formReference.current;
        const userName = username.value;
        const passwordToBeHashed = password.value;
        const userEmail = email.value;
        await axios.post("/api/createAccount", {userName, passwordToBeHashed, userEmail});
        window.location.reload();
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <Card>
                    <Box>
                        <form ref={formReference}>
                        <Stack alignItems="center" direction="column" spacing={1}>
                            <Typography variant="h5">Create an account</Typography>
                            <TextField name="username" id="standard-basic" label="username" variant="standard" />
                            <TextField name="password" id="standard-password-input" label="password" type="password" variant="standard" />
                            <TextField name="email" id="standard-basic" label="email" variant="standard" />
                            <TextField name="phone" id="standard-number" label="phone number" variant="standard"></TextField>
                            <Button variant="contained" color="primary" onClick={()=> createNewUser()}>Create Account</Button>
                            </Stack>
                        </form>
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={4}></Grid>
        </Grid>
        
    );

}