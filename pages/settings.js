import { useSession } from 'next-auth/react';

export default function Settings() {
    const {data: session, status } = useSession();

    if(status == "authenticated") {
        if(session.user.userCategory == "user") {
            return 
        }else{
            
        }
    }else if(status == "loading") {
        return <Typography variant="h3">Loading...</Typography>
    }else if(status == "unauthenticated") {
        Router.push('/');
    }
}