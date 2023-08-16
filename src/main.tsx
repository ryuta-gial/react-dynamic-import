import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import lectures from "./lectures";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App lectures={lectures} />
  </React.StrictMode>,
)
