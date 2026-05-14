import { useState } from "react"

function Login(){
let [loginval,set]=useState({email:"",password:""})

function login(e){
    let{name,value}=e.target
    set({...loginval,[name]:value})
}

function logins(e){
    e.preventDefault()
    let localdata=JSON.parse(localStorage.getItem("userdata"))
    if(loginval.email != localdata.email || loginval.password!=localdata.password){
        alert("not found")
    }
    else{
        alert("found")
    }
}
    return(
        <>
        <h1>helllo i am Login </h1>


        <form onSubmit={logins}>
              
                <label>Email</label>
                <input type="email" name="email" value={loginval.email} onChange={login} /><br /><br />

 
                <label>Password</label>
                <input type="password" name="password" value={loginval.password} onChange={login} /><br /><br />

                <input type="submit" value="login" />
            </form>
        </>

    )
}
export default Login