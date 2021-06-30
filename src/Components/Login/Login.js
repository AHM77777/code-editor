import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from './Login.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap'

const Login = () => {
    const [ session, loading ] = useSession()
    // console.log(session)
  return <>
    {!session && <div className={styles.navBar}>
      <p className={styles.sessionInfo}>Not signed in</p> <br/>
      <Button className={styles.buttonLog} variant="dark" onClick={() => signIn()}>Sign in</Button>
    </div>}
    {session && loading && <div>
      <div className={styles.sessionInfo}>Loading...</div>
    </div>}
    {session &&<div className={styles.navBar}>
      <p className={styles.sessionInfo}>Welcome {session.user.name}</p> <br/>
      <Button className={styles.buttonLog} variant="dark" onClick={() => signOut()}>Sign out</Button>

    </div>}
  </>
}
export default Login;