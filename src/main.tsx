import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AgentationDev } from './components/AgentationDev.tsx'
import App from './App.tsx'
import Home from './Home.tsx'
import Flag from './Flag.tsx'
import {
  cookieLocale,
  fromAcceptLanguage,
  homePathLocale,
  pathLocale,
} from './i18n/locale.ts'
import './index.css'

const path = window.location.pathname.replace(/\/+$/, '') || '/'

function negotiated() {
  return (
    cookieLocale(document.cookie) ??
    fromAcceptLanguage(navigator.languages?.join(',') || navigator.language)
  )
}

if (path === '/flag') {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Flag />
    </StrictMode>,
  )
} else if (path === '/' || path === '/home') {
  window.location.replace(
    `/${negotiated()}/home${window.location.search}${window.location.hash}`,
  )
} else if (homePathLocale(path)) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Home locale={homePathLocale(path)!} />
      <AgentationDev />
    </StrictMode>,
  )
} else {
  const locale = pathLocale(path)
  if (!locale) {
    const dest = negotiated()
    window.location.replace(
      `/${dest}${window.location.search}${window.location.hash}`,
    )
  } else {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App locale={locale} />
        <AgentationDev />
      </StrictMode>,
    )
  }
}
