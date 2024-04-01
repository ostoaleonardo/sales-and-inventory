import React from 'react'
import ReactDOM from 'react-dom/client'
import Providers from './Providers.tsx'
import App from './App.tsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
)
