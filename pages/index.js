import { useSession } from 'next-auth/react'
import Router from 'next/router'
import {useEffect } from 'react';
import SignedInProfessionalNavbar from '../components/SignedInProfessionalNavbar';


const HomePage = () => {
    const {data: session } = useSession()

    if(session) {
        return (
            <SignedInProfessionalNavbar></SignedInProfessionalNavbar>
            
            )
    }else{
        return <h1>Not working ay</h1>
    }

    
    
}

export default HomePage