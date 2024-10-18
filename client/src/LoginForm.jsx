import React, {useState} from 'react'

function LoginForm(props){

    const initState = {username: '', password: ''}

    const [formData, setFormData] = useState(initState)

    const {isMember, submit, errMsg} = props

    function handleChange(e){
        const {name, value} = e.target
        setFormData(prevData =>{
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        submit(formData)

    }


    return(
            <div className='auth-form'>
        <form  name = 'auth-form' id = 'auth-form' onSubmit={handleSubmit}>

            <h2>Welcome to the Budget Tracker!</h2>
            <input placeholder='username' name='username' value={formData.username} onChange={handleChange}/>
            <input placeholder='password' name='password' value={formData.password} onChange={handleChange}/>
            <button className='auth-button'>{isMember ? "Login" : "SignUp"}</button>
            <br/>
            <p style={{color:"red"}}>{errMsg}</p>
        </form>
        </div>
    )
}

export default LoginForm