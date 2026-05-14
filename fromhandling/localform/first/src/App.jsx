import  {Routes,Route} from "react-router-dom"
import Sign from "./Sign"
import Login from "./Login"
function App(){
  return(
    <>
     <Routes>
      <Route index element={<Sign/>}></Route>
      <Route path="/Login" element={<Login/>}></Route>
     </Routes>
    </>
  )
}
export default App