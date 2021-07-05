import EditorPage from './index'

export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:8000/files');
    const data = await res.json();
  
    const paths = data.map(file => {
        return {
            params: {id: file.id.toString()}
        }})

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch('http://localhost:8000/files/' + id);
    const data = await res.json();

    return {
        props: { file: data }
    }
}


const OpenProject = ({file}) => {

    return ( 
        <>
        <EditorPage file={file} />
        </>
    );
}

export default OpenProject;