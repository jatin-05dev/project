import axios  from 'axios'
import { useEffect, useState } from 'react'
function App(){
  let [apidata,set]=useState([])
useEffect(()=>{
 axios.get('https://jsonplaceholder.typicode.com/photos')
 .then((res)=>set(res.data)
 )
},[])

  return (
    <>

    <table border="">
      <tr>
      <th>id</th>
      <th>albumid</th>
      <th>tiltle</th>
      <th>url</th>
      <th>thumbnailurl</th>
      </tr>
      {
        apidata.map((e)=>{
         return <tr>
            <td>{e.id}</td>
            <td>{e.title}</td>
            <td>{e.albumId}</td>
            <td>{e.url}</td>
            <td>{e.thumbnailUrl}</td>
          </tr>
})
      }
    </table>
      
    </>
  )

}
export default App
