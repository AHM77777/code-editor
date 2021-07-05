import  Login  from "../components/Login/Login"
function HomePage() {
import  NavBar  from "../Components/NavBar/NavBar"
import Link from 'next/link'

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:8000/files');
  const data = await res.json();

  return {
    props: { files: data }
  }
}

function HomePage({files}) {

const handleClick = () => {
  console.log('Fuera de servicio')
}

  return <>
  <NavBar />
  <Link href={'/Editor/'}>Nuevo</Link>

  {files.map((file) => (
    <Link href={'/Editor/'+file.id} key={file.id} onClick={() => goFile(file)}>
      {file.name}
    </Link>
  ))}
  </>
}

export default HomePage