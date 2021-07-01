import  Login  from "../Components/Login/Login"
import { useRouter } from 'next/router'

function HomePage() {
  const router = useRouter()

  return <>
  <Login />

  const handleClick = (e) => {
    e.preventDefault()
    router.push('/EditorPage')
  }

  <button onClick={handleClick}>Nuevo</button> <button>Cargar </button>
  </>
}

export default HomePage