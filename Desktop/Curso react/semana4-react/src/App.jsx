import { useEffect } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'

function App() {

  const url = 'https://rickandmortyapi.com/api/location/3'
  const [ location, getLocationById ] = useFetch(url)

  useEffect(() => {
    getLocationById()
  }, [])

  const [ user, getRandomUser ] = useFetch('https://randomuser.me/api/')

  useEffect(() => {
    getRandomUser()
  }, [])
  

  console.log(user)

  return (
      <div className='app'>
        <h1>Semana 04</h1>
      </div>
  )
}

export default App
