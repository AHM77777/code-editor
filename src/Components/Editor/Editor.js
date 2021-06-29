import styles from './Editor.module.scss'

let CodeMirror = null;
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  CodeMirror = 
  require('react-codemirror');
  require('codemirror/mode/xml/xml');
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
onChange(value)
}

return (  
    <div className={styles.editorContainer}>

        <div className={styles.editorTitle}>
            <h3>{displayName}</h3>
        </div>

        {CodeMirror && <CodeMirror
            OnBeforeChange={handleChange}
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