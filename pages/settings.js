import { useSession } from 'next-auth/react';
import ProfessionalSettings from '../components/settings/ProfessionalSettings';
import Router from 'next/router';
import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";

function Settings(props) {
    let details = {Charges: [], ServiceRequest: [], Payments: []};
    const { status: getStatus, error, data: detailsData} = useQuery({
        queryKey: ['details'],
        queryFn: () => {
            return axios.get('https://tradeyou314.vercel.app/api/getSettingsInfo', {params: {username: props.username, userCategory: props.userCategory}}).then(res => res.data).catch(error => console.log(error));
        }
    })
    if(getStatus === "success") {
        details = detailsData;
        return <ProfessionalSettings {...details}></ProfessionalSettings>
    }else if(getStatus === "error") {
        console.log(error);
    }

    
}

export default function settings() {
    const {data: session, status } = useSession();

    if(status == "authenticated") {
        return <Settings username={session.user.username} userCategory={session.user.userCategory}></Settings>
    }else if(status == "loading") {
        return <Typography variant="h3">Loading...</Typography>
    }else if(status == "unauthenticated") {
        Router.push('/');
    }
}