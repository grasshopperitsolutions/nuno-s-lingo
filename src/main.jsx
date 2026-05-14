import React from 'react'
import { ViteSSG } from 'vite-ssg'
import App from './App.jsx'
import './index.css'
import './i18n.js'
import { SEOProvider } from './components/SEOMeta'

// Routes declared here so vite-ssg knows which paths to pre-render
export const createApp = ViteSSG(
  <SEOProvider>
    <App />
  </SEOProvider>,
  {
    routes: [
      { path: '/' },
      { path: '/login' },
      { path: '/terms' },
      { path: '/privacy' },
      { path: '/contact' },
      { path: '/dashboard' },
      { path: '/settings' },
    ],
  },
)
