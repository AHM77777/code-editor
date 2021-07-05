import React from 'react'
import { useSession } from 'next-auth/client'
import NavBar from '../Components/NavBar/NavBar';

const LoginPage = () => {
    const [ session ] = useSession();

    return <>
        <NavBar />
        {!session && <p>PLEASE LOGIN!</p>}
        {session && <p>YOU ALREADY SIGNED IN</p>}
    </>
}
export default LoginPage;