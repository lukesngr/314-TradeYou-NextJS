import { useSession } from 'next-auth/react';
import ProfessionalSettings from '../components/settings/ProfessionalSettings';
import UserSettings from '../components/settings/UserSettings';
import Router from 'next/router';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from "axios";

export default function Settings() {
    const {data: session, status } = useSession();
    const [details, setDetails] = useState({});

    useEffect(() => {
        
        const getDetails = async () => {
            let data = {};
            console.log(data)
            try {
                data = await axios.get('http://localhost:3000/api/getDetailsToUpdate', {params: {username: session.user.username, userCategory: session.user.userCategory}});
            }catch (error) {
                console.log(error)
            }
        
            if(data.data != undefined) {
                data = data.data;
            }else{
                data = {}
            }
    
            setDetails(data);
            console.log(data);
    
        }
    
        if(status == "authenticated") {
            getDetails();
        }
    }, []);

    if(status == "authenticated") {
        if(session.user.userCategory == "user") {
            return <UserSettings {...details}></UserSettings>
        }else{
            return <ProfessionalSettings {...details}></ProfessionalSettings>
        }
    }else if(status == "loading") {
        return <Typography variant="h3">Loading...</Typography>
    }else if(status == "unauthenticated") {
        Router.push('/');
    }
}