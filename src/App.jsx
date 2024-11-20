
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import Otp from './components/Otp'
import Login from './components/Login'
import Home from './components/Home'

function App() {

  return (
    <>
     <div className='App'>
      <Routes>
        <Route path='/' element = {<Register/>} />        
        <Route path='/activate' element ={<Otp/>} />             
        <Route path='/login' element ={<Login/>} />
        <Route path='/home' element ={<Home/>} />
      </Routes>
     </div>
    </> 
  )
}

export default App
