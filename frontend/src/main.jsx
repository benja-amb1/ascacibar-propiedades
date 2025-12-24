import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RoutingApp } from './routes/RoutingApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoutingApp />
  </StrictMode>,
)
