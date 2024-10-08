import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { analytics } from './firebase/firebase.js'

//change head title and meta tags
document.title = 'Portfolio'
document.head.innerHTML += '<meta name="description" content="Portfolio">';
document.head.innerHTML += '<meta name="keywords" content="Portfolio">';
document.head.innerHTML += '<meta name="author" content="Portfolio">';

//change favicon
document.head.innerHTML += '<link rel="icon" href="./favicon.ico">';

if (analytics && typeof analytics.logEvent === 'function') {
  analytics.logEvent('homepage_visit') // Log an analytics event
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
