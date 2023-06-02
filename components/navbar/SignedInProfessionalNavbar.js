import React, {useState} from 'react';
import { Grid, Link, AppBar, Toolbar, IconButton, Menu, MenuItem } from "@mui/material";
import Image from 'next/image';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { signOut } from "next-auth/react";
import Router from 'next/router';

function SignedInProfessionalNavbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const goSettings = () => {
      Router.push('/settings');
    };

    return (<AppBar color="primary" positon="static">
                <Toolbar sx={{pl:0 }}>
                    <Grid container alignItems="right" spacing={1}>
                        <Grid item lg={1} xs={2}><Image src="/images/tradeYouIcon.PNG" sx={{p: 2, zIndex: 'left'}} height={50} width={70} alt="Trade You" /></Grid>
                        <Grid item lg={1} md={2} xs={3}><Link variant="h6" color="secondary" underline="none" href="/availableProf">Available Jobs</Link></Grid>
                        <Grid item lg={8} md={7} xs={5}><Link variant="h6" color="secondary" underline="none" href="/completedProf">Completed Jobs</Link></Grid>
                        <Grid item lg={1} onClick={handleProfileMenuOpen}><IconButton><AccountCircle /></IconButton></Grid>
                    </Grid>
                </Toolbar>
                <Menu anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}} open={isMenuOpen} onClose={handleMenuClose}>
                  <MenuItem onClick={goSettings}>Settings</MenuItem>
                  <MenuItem onClick={signOut}>Sign out</MenuItem>
                </Menu>
            </AppBar>)
}

export default SignedInProfessionalNavbar;