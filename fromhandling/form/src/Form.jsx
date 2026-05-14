import { useState } from "react"
function Form() {
    let [frmdata, setfrmdata] = useState({
        username: "", age: "", city: ""
    })

    function input(e) {
        let {name,value}=e.target
        setfrmdata({...frmdata,[name]:value})
        
    }
    function handle(e){
        e.preventDefault()
        console.log(frmdata);
        
    }
    return (
        <>
            <h1>form componenet</h1>
            <form action="" onSubmit={handle}>
                <label htmlFor="">name</label>
                <input type="text" name="username"  onChange={input}/><br /><br />
                <label htmlFor="">age</label>
                <input type="text" name="age" onChange={input} /><br /><br />
                <label htmlFor="">city</label>
                <input type="text" name="city" onChange={input} /><br /><br />
                <input type="submit" />
            </form>
        </>
    )
}
export default Form