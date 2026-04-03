// import { dataobj } from "./App"
import { useContext } from "react"
import { mainobj } from "./main"
function Child2(){
    // let strore=useContext(mainobj)
    // let data=useContext(mainobj)
    let {name,clas} = useContext(mainobj)
    

    return(
        <>
        {/* <dataobj.Consumer>
            {
                (data)=>{
                    return <h1>hi iam learning {data.class}</h1>
                }
            }
        </dataobj.Consumer> */}

        

         <h1>hi am child 2 {name}{clas}</h1>
        {/* <mainobj.Consumer>
            {
                (data)=>{
                    return <h1>hi iam learning {data}</h1>
                }
            }
        </mainobj.Consumer>
     */}
        </>
    )
}
export default Child2