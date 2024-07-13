import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { analytics } from './firebase/firebase.js'

if (analytics && typeof analytics.logEvent === 'function') {
  analytics.logEvent('homepage_visit') // Log an analytics event
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
