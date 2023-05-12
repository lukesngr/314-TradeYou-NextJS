import { useSession } from 'next-auth/react';
import ProfessionalSettings from '../components/settings/ProfessionalSettings';
import UserSettings from '../components/settings/UserSettings';

export default function Settings() {
    const {data: session, status } = useSession();

    if(status == "authenticated") {
        if(session.user.userCategory == "user") {
            return <UserSettings></UserSettings>
        }else{
            return <ProfessionalSettings></ProfessionalSettings>
        }
    }else if(status == "loading") {
        return <Typography variant="h3">Loading...</Typography>
    }else if(status == "unauthenticated") {
        Router.push('/');
    }
}