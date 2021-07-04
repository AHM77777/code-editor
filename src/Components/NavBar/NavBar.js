import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from './NavBar.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap'
import { useRouter } from 'next/router'

const NavBar = () => {
    const [ session, loading ] = useSession()
    const router = useRouter()
    const handleClick = (e) => {
      e.preventDefault()
      router.push('/HomePage')
    }
    // console.log(session)
  return <>
    {!session && <div className={styles.navBar}>
    <div><p className={styles.sessionInfo}>Not signed in!</p> <br/></div>
      <div className={styles.loginWrapper}>
        <p className={styles.homePage} onClick={handleClick}>Home</p>
        {/* <p className={styles.homePage} onClick={handleClickEditor}>Editor</p> */}
        <Button className={styles.buttonLog} variant="dark" onClick={() => signIn()}>Sign In</Button>
      </div>
    </div>}
    {session && loading && <div>
      <div className={styles.sessionInfo}>Loading...</div>
    </div>}
    {session &&<div className={styles.navBar}>
      <div><p className={styles.sessionInfo}>Welcome {session.user.name}</p> <br/></div>
      <div className={styles.loginWrapper}>
        <p className={styles.homePage} onClick={handleClick}>Home</p>
        {/* <p className={styles.homePage} onClick={handleClickEditor}>Editor</p> */}
        <Button className={styles.buttonLog} variant="dark" onClick={() => signOut()}>Sign out</Button>
      </div>

    </div>}
  </>
}
export default NavBar;