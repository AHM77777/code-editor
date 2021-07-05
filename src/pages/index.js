import  NavBar  from "../Components/NavBar/NavBar"
import Link from 'next/link'
import styles from '../Homepage.module.scss'
import { useSession } from 'next-auth/client'

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/files');
  const data = await res.json();

  return {
    props: { files: data }
  }
}

function HomePage({files}) {
  const [ session ] = useSession();

  return <>
  <NavBar />

  <div id={styles.mainContent}>
    <div>
      <h4>Online Code Editor</h4>
      <h6>Real-time code editing, to practice your skills and showoff your (simple) projects</h6>
    </div>
    <div>
      <p>Our code editor is able to handle your HTML/CSS/JS projects, rendering the output in an iframe, so you can see your changes as you type them.</p>
    </div>
  </div>
  {typeof session !== 'undefined' &&
  <div id={styles.projectManager}>
    <h5>Project Manager</h5>
    {session &&
    <ul>
    {files.length > 0 ? files.map((file) => (
      <li key={file._id}>
        {file.filename}
        <Link href={'/Editor/'+file._id}>[edit]</Link>
      </li>
    )) : ''}
    {files.length < 1 ? <li>No project created yet</li> : ''}
    <li><Link href={'/Editor/'}>Add new</Link></li>
    </ul>}
    {!session && <ul id={styles.loginNotice}><li>Please log in to use the app</li> </ul>}
  </div>}
  </>
}

export default HomePage