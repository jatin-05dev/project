 import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Sign(){
    const [sign, set] = useState({
        name: "",
        email: "",
        age: "",
        password: ""
    })
        
    const navigate = useNavigate()

    function inputdata(e){
        const { name, value } = e.target
        set({ ...sign, [name]: value })
    }

    function handle(e){
        e.preventDefault()
        localStorage.setItem("userdata", JSON.stringify(sign))
        navigate("/login")
    }

    return(
        <>
            <h1>Hello I am Sign Up</h1>

            <form onSubmit={handle}>
                <label>Name</label>
                <input type="text" name="name" value={sign.name} onChange={inputdata} /><br /><br />

                <label>Email</label>
                <input type="email" name="email" value={sign.email} onChange={inputdata} /><br /><br />

                <label>Age</label>
                <input type="number" name="age" value={sign.age} onChange={inputdata} /><br /><br />

                <label>Password</label>
                <input type="password" name="password" value={sign.password} onChange={inputdata} /><br /><br />

                <input type="submit" value="Sign Up" />
            </form>
        </>
    )
}

export default Sign
