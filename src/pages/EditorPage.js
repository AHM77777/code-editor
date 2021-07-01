import Editor from '../Components/Editor/Editor'
import 'codemirror/lib/codemirror.css'
import { useEffect, useState } from "react";
import styles from '../Components/Files.module.scss'
import  NavBar  from "../Components/NavBar/NavBar"

const EditorPage = () => {

    const [html, setHtml] = useState(null)
    const [css, setCss] = useState(null)
    const [js, setJs] = useState(null)


    const [srcDoc, setSrcDoc] = useState('')
    

    useEffect(() => {

        fetch('http://localhost:3000/api/files')
        .then((res) => res.json())
        .then((data) =>{
            setHtml(data.html)
            setCss(data.css)
            setJs(data.javascript)
        })

    }, [])

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
                    {!!html && <Editor language="xml" value={html} onChange={setHtml} displayName="HTML"/>}
                    {!!css && <Editor language="css" value={css} onChange={setCss} displayName="CSS"/>}
                    {!!js && <Editor language="javascript" value={js} onChange={setJs} displayName="JS"/>}
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
        </>
     );
}
 
export default EditorPage;