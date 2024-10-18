import React, { useContext } from "react";
import Auth from "./Auth";
import Home from "./Home"
import { Context } from './ContextProvider/Context'
import { Routes, Route, Navigate } from "react-router-dom"

function App(){

    const {token} = useContext(Context)

    return(
        <>
        <div id="app">
            <Routes>
                <Route path="/" element={token ? <Navigate to = "/home" /> :<Auth/>}/>
                <Route path="home" element={token ? <Home/> : <Navigate to = "/"/>}/>
            </Routes>
        </div>
        </>
    )
}

export default App