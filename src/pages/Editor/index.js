import Editor from '../../Components/Editor/Editor'
import 'codemirror/lib/codemirror.css'
import { useEffect, useState } from "react";
import styles from '../../Components/Files.module.scss'
import  NavBar  from "../../Components/NavBar/NavBar"
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';


const EditorPage = ({file}) => {
    const [html, setHtml] = useState(file ? file.html : '')
    const [css, setCss] = useState(file ? file.css : '')
    const [js, setJs] = useState(file ? file.js : '')
    const [projectName, setProjectName] = useState(file ? file.filename : 'New Project')

    const [srcDoc, setSrcDoc] = useState('')

    const [ session ] = useSession();
    const router = useRouter();

    const saveAction = async file => {
        if (!file) {
            const newFile = {
                "name" : projectName,
                "code" : {
                    "html" : html,
                    "css" : css,
                    "js" : js
                }
            }
    
            try {
                const response = await fetch(`http://localhost:3000/api/files/add`, {
                    method: 'POST' ,
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({
                        ...newFile,
                        owner_email: session.user.email
                    })
                })
                const data = await response.json()

                if (response.status === 200) {
                    window.alert(`New file created!`)
                    router.push('/Editor/'+ data.file_id.toString())
                } else {
                    throw new Error(data.message)
                }
            } catch (error) {
                window.alert(`Error: ${error}`)
            }
        } else {
            const updateFile = {
                "id" : file._id,
                "name" : projectName,
                "code" : {
                    "html" : html,
                    "css" : css,
                    "js" : js
                }
            }

            try {
                await fetch("http://localhost:3000/api/files/update", {
                    method: 'PUT',
                    headers: { "Content-Type" : "application/json"},
                    body: JSON.stringify(updateFile)
                })

                if (response.status === 200) {
                    window.alert('File updated!')
                } else {
                    throw new Error('There was an error updating the file')
                }
            } catch (error) {
                window.alert('Error: ' + error)
            }
        }
    }

    useEffect(() => {
        setSrcDoc(`
        <html>
            <head></head>
                <style>
                ${css}
                </style>
            </head>
            <body>${html}</body>
            <script>${js}</script>
        </html>
    `)
        
    }, [html, css, js])

    

    return ( <>
    <NavBar />
        <div className={styles.mainContainer}>
            
            <div className={styles.leftPage}>

            <div className={styles.editorContainer}>

                <div className={styles.editor}>
                    <Editor language="xml" value={html} onChange={setHtml} displayName="HTML"/>
                    <Editor language="css" value={css} onChange={setCss} displayName="CSS"/>
                    <Editor language="javascript" value={js} onChange={setJs} displayName="JS"/>
                </div>
                <div className={styles.setCol}>
                    <div className={styles.previewInfo}>
                        <button className={styles.saveButton} onClick={() => saveAction(file)}>Save</button>
                        <input className={styles.centerText} type="text"
					value={projectName} onChange={(e) => setProjectName(e.target.value)}></input>
                    </div>

                    <div className={styles.preview}>
                        <iframe
                            srcDoc={srcDoc}
                            title="output"
                            sandbox="allow-scripts"
                            frameBorder="0"
                            width="100%"
                            height="100%"
                        />
                    </div>
                </div>
                
            </div>
            </div>
        </div>
        </>
     );
}
 
export default EditorPage;