import React from 'react'
import ReactDom from 'react-dom'
import App from './App.jsx'
import './style.css'
import { BrowserRouter as Router } from "react-router-dom";
import { ContextProvider} from './ContextProvider/Context.jsx'

ReactDom.createRoot(document.getElementById('root')).render(
  <Router>
    <ContextProvider>
      <App/>
    </ContextProvider>
  </Router>
  
)