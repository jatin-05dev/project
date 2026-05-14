import { useState } from "react"
import Form from "./Form"
 function App() {
    let[frmdata,setfrm]=useState()
    let[frmdata1,setfrm1]=useState()
    let[frmdata2,setfrm2]=useState()
     function handledata(e) {
        console.log(e.target.value)
        setfrm(e.target.value)
        
      }
     
      function submit(e) {
        // return false
        e.preventDefault()
        console.log(frmdata,frmdata1,frmdata2);
        

      }
  return (
    <>
     <h1>{frmdata}</h1>
     <h1>{frmdata1}</h1>
     <h1>{frmdata2}</h1>
     <form action="" onSubmit={submit}>
      <label htmlFor="">NAME</label>
      <br />
      <label htmlFor="">password</label>
      <br />
      <label htmlFor="">contact</label>
      <br />
      <input type="text" onChange={(e)=>setfrm1(e.target.value)} />
      <input type="text" onChange={(e)=>setfrm2(e.target.value)} />
      <input type="text" onChange={handledata} />
      <input type='submit' />
      {/* <input type="text" onChange={(e)=>setfrm(e.target.value)} /> */}

     </form>

<Form/>
      
    </>
  )
}

export default App
