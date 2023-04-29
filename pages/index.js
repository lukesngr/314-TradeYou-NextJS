import { useSession } from 'next-auth/react'
const HomePage = () => {
    const {data: session } = useSession()
    if (session) {
        return <h1>Signed in</h1>
    }

    return <h1>Not signed in</h1>
    
}

export default HomePage