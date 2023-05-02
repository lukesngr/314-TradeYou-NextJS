import { useSession } from 'next-auth/react'
import Router from 'next/router'
import {useEffect } from 'react';


const HomePage = () => {
    const {data: session } = useSession()

    if(session) {
        return <h1>My sign in page</h1>
    }else{
        return <h1>Not working ay</h1>
    }

    
    
}

export default HomePage