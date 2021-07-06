import  NavBar  from "../Components/NavBar/NavBar"
import Link from 'next/link'
import styles from '../Homepage.module.scss'
import { useSession } from 'next-auth/client'
import { useState } from "react";

export const getServerSideProps = async (context) => {
  // Get files for user
  //const res = await fetch('http://localhost:3000/api/files?user='+context.req.cookies['next-auth.session-token']);
  const res = await fetch('http://localhost:3000/api/files');
  const data = await res.json();

  return {
    props: {files: data}
  }
}

function HomePage({files}) {
  const [ session ] = useSession();

  return <>
  <NavBar />
  {!session && <div id={styles.loginNotice}><div>Please log in to use the app</div> </div>}
  <div id={styles.mainContent}>
    <div className={styles.separator}>
      <div>
        <h4 className={styles.codeHead}>Online Code Editor</h4>
        <h6 className={styles.codeSubHead}>Real-time code editing, to practice your skills and showoff your (simple) projects</h6>
      </div>
      <div>
        <p>Our code editor is able to handle your HTML/CSS/JS projects, rendering the output in an iframe, so you can see your changes as you type them.</p>
      </div>
    </div>
    {typeof session !== 'undefined' &&
    <div className={styles.projectMain}>
      <div id={styles.projectManager}>
        <h5>Project Manager</h5><br/>
        <Link href={'/Editor/'}><div className={styles.title}>Add new</div></Link>
        {session &&
        <div className={styles.showProjects}>
        {files.length > 0 ? files.map((file) => (
          
            <Link href={'/Editor/'+file._id}>
              <div className={styles.elementCreated} key={file._id}>
              {file.filename}
              </div>
            </Link>
          
        )) : ''}
        {files.length < 1 ? <div>No project created yet</div> : ''}
        
        </div>}
        
      </div>
    </div>}
  </div>
  
  </>
}

export default HomePage