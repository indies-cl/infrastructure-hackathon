import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AgentationDev } from './components/AgentationDev.tsx'
import App from './App.tsx'
import Flag from './Flag.tsx'
import './index.css'

const path = window.location.pathname.replace(/\/$/, '') || '/'
const isFlag = path === '/flag'
const Page = isFlag ? Flag : App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
    {isFlag ? null : <AgentationDev />}
  </StrictMode>,
)
