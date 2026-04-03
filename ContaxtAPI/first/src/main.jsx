import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

let mainobj=createContext()
// let data="special data for main component !"
let data={
  name:'jatin',
  clas:'BCA'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <mainobj.Provider value={data}>
    <App />
    </mainobj.Provider>
  </StrictMode>,
)
export {mainobj}
