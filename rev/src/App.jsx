import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Fun from './components/Home'
import r from './assets/react.svg'
import Nav from './components/Navbar'
function App() {
  let name="jatin"
 let color={
  color:'green'
 }
  return (
    <>
     {/* <h1 style={{backgroundColor:"red"}}>hello react</h1>
     <h1 style={color}>hello react</h1>
     <h1>{name}</h1>
     <h1 className='he'> external css</h1>
     <h1 id='h'> external </h1>
     <Fun/>
     <h1>and my img <img src="vite.svg" alt="" /></h1>
     <img src={r} alt="" /> */}
     <Nav/>

    </>
  )
}

export default App
