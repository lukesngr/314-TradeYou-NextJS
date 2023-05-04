import React, {useState} from 'react';
import { Grid, Link, AppBar, Toolbar, IconButton, Menu, MenuItem } from "@mui/material";
import Image from 'next/image';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

function SignedInProfessionalNavbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    return (<AppBar color="primary" positon="static">
                <Toolbar sx={{pl:0 }}>
                    <Grid container alignItems="right" spacing={1}>
                        <Grid item xs={1}><Image src="/images/tradeYouIcon.PNG" sx={{p: 2, zIndex: 'left'}} height={50} width={70} alt="Trade You" /></Grid>
                        <Grid item xs={1}><Link variant="h6" color="secondary" underline="none" href="/availableProf">Available Jobs</Link></Grid>
                        <Grid item xs={8}><Link variant="h6" color="secondary" underline="none" href="/completedProf">Completed Jobs</Link></Grid>
                        <Grid item xs={1}><IconButton size="large"><NotificationsIcon /></IconButton></Grid>
                        <Grid item xs={1} aria-controls="account-menu" aria-haspopup="true" onClick={handleProfileMenuOpen}><IconButton><AccountCircle /></IconButton></Grid>
                    </Grid>
                </Toolbar>
                <Menu
        id="account-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Manage membership</MenuItem>
    </Menu>
            </AppBar>
            )
}

export default SignedInProfessionalNavbar;