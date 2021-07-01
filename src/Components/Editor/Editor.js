import styles from './Editor.module.scss'

let CodeMirror = null;
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
    CodeMirror = 
    require('react-codemirror');
    require('codemirror/mode/xml/xml');
    require('codemirror/mode/css/css');
    require('codemirror/mode/javascript/javascript');
    require('codemirror/theme/dracula.css');
}


const Editor = (props) => {

const{
    language,
    displayName,
    value,
    onChange
} = props;

function handleChange(editor, data, value){
    onChange(editor)
}

return (  
    <div className={styles.editorContainer}>

        <div className={styles.editorTitle}>
            <h3 className={styles.disName}>{displayName}</h3>
        </div>

        {CodeMirror && <CodeMirror
            onChange={handleChange}
            value={value}
            className= {styles.codeMirrorWrapper}
            options={{
                
                lineWrapping: true,
                lint: true,
                mode: language,
                theme: 'dracula',
                lineNumbers:true
            }}
        />}

    </div>
);
}

export default Editor;