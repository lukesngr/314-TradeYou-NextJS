import React from 'react';
import { Grid, Link, AppBar, Toolbar } from "@mui/material";
import Image from 'next/image';

function NonSignedInNavbar() {
    return (<AppBar color="primary" positon="static">
                <Toolbar sx={{pl:0 }}>
                    <Grid container spacing={1}>
                        <Grid item md={1} xs={1}><Image src="/images/tradeYouIcon.PNG" sx={{p: 2, zIndex: 'left'}} height={50} width={70} alt="Trade You" /></Grid>
                        <Grid item md={1} xs={1}><Link variant="h5" color="secondary" underline="none" href="/login">Login</Link></Grid>
                        <Grid item md={3} xs={1}><Link variant="h5" color="secondary" underline="none" href="/signup">Sign Up</Link></Grid>
                    </Grid>
                </Toolbar>
            </AppBar>)
}

export default NonSignedInNavbar;