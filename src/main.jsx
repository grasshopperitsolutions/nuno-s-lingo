import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n'
import { SEOProvider } from './components/SEOMeta'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SEOProvider>
      <App />
    </SEOProvider>
  </React.StrictMode>,
)
