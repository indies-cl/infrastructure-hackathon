import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AgentationDev } from './components/AgentationDev.tsx'
import App from './App.tsx'
import Flag from './Flag.tsx'
import {
  cookieLocale,
  fromAcceptLanguage,
  pathLocale,
} from './i18n/locale.ts'
import './index.css'

const path = window.location.pathname.replace(/\/+$/, '') || '/'

if (path === '/flag') {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Flag />
    </StrictMode>,
  )
} else {
  const locale = pathLocale(path)
  if (!locale) {
    const dest =
      cookieLocale(document.cookie) ??
      fromAcceptLanguage(
        navigator.languages?.join(',') || navigator.language,
      )
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
