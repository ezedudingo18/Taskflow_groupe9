import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

// TODO: remove mocked user
import { useAuthStore } from './stores/auth.store'
useAuthStore.getState().setAuth(
  { id: 'dev-123', email: 'dev@test.com' },
  'fake-jwt-token'
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
