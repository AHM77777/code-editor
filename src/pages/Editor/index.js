import Editor from '../../Components/Editor/Editor'
import 'codemirror/lib/codemirror.css'
import { useEffect, useState } from "react";
import styles from '../../Components/Files.module.scss'
import  NavBar  from "../../Components/NavBar/NavBar"


const EditorPage = ({file}) => {

    const [html, setHtml] = useState(file ? file.code.html : '')
    const [css, setCss] = useState(file ? file.code.css : '')
    const [js, setJs] = useState(file ? file.code.js : '')
    const [projectName, setProjectName] = useState(file ? file.name : 'New Project')

    const [srcDoc, setSrcDoc] = useState('')

    const saveAction = ()=> {

        const newFile = {
            "name" : projectName,
            "code" : {
                "html" : html,
                "css" : css,
                "js" : js
            }
        }
        try {
            fetch(`http://localhost:8000/files/${file ? file.id: ''}` , {
				method: file ? 'PUT' : 'POST' ,
				headers: { "Content-Type": "application/json"},
				body: JSON.stringify(newFile)
			})
            file ? window.alert(`File saved succesfully!`) : window.alert(`New file created!`)
        } catch (error) {
            window.alert(`Error: ${error}`)
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
                        <p className={styles.saveButton} onClick={saveAction}>Save</p>
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