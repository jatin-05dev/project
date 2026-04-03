import { createContext } from "react"
import Child1 from "./Child1"
import Child2 from "./Child2"
// let dataobj=createContext()
// // let name="react js..."
// let person={
// name:'jatin',
// class:'BCA'
// }
// 
function App() {

  return (
    <>

    <h1>this is app page</h1>
    {/* <dataobj.Provider value={person}> */}
    <Child2/>
    {/* </dataobj.Provider> */}
    
       
    </>
  )
}

export default App
// export {dataobj}