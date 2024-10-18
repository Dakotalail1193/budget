import React, {useState, useContext} from "react";
import LoginForm from './LoginForm'
import { Context } from "./ContextProvider/Context";


function Auth(){

    const [isMember, setIsMember] = useState(false)

    const {login, signup, errMsg, resetAuthErr} = useContext(Context)

    const toggleForm = () => {
        setIsMember(!isMember)
        resetAuthErr()
    }
    return(      
        <div id='auth-div'>
        {
            isMember ?
            <>
            <LoginForm isMember = {isMember} submit = {login} errMsg = {errMsg}/>
            <button className="auth-button" onClick={toggleForm}>Create an Account?</button>
            
            </>

            :

            <>
            <LoginForm isMember = {isMember} submit = {signup} errMsg = {errMsg}/>
            <button className="auth-button" onClick={toggleForm}>Already a Member?</button>
            </>
        }
        </div>

        
    )
}

export default Auth