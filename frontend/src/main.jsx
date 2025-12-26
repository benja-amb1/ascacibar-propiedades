import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RoutingApp } from './routes/RoutingApp'
import { SessionProvider } from './context/SessionProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
      <RoutingApp />
    </SessionProvider>
  </StrictMode>,
)
