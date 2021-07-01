import  NavBar  from "../Components/NavBar/NavBar"
import { useRouter } from 'next/router'

function HomePage() {
  const router = useRouter()
  const handleClick = (e) => {
    e.preventDefault()
    router.push('/EditorPage')
  }
  return <>
  <NavBar />

  

  <button onClick={handleClick}>Nuevo</button> <button>Cargar </button>
  </>
}

export default HomePage