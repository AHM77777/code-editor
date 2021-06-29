import Files from '../Components/Files/Files';
import Editor from '../Components/Editor/Editor'
import 'codemirror/lib/codemirror.css'
import { useState } from "react";

const EditorPage = () => {
    const [html, setHtml] = useState('')
    
    return ( 
        <>
            <div>
            <Files />
            </div>
            <div>
                <Editor language="xml" value={html} onChange={setHtml} displayName="HTML"/>
            </div>
            <div>
                <iframe
                    title="output"
                    sandbox="allow-scripts"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                />
            </div>
        </>
     );
}
 
export default EditorPage;