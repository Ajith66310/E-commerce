
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { userContextProvider } from './context/UserContext.jsx'



createRoot(document.getElementById('root')).render(
<userContextProvider>
    <App />
</userContextProvider>
  
)
