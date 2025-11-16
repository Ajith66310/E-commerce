
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContextProvider from './context/UserContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { BrowserRouter } from 'react-router-dom'
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
<BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <UserContextProvider>
             <Provider store={store}>
            <App />
             </Provider>
        </UserContextProvider>
    </GoogleOAuthProvider>
</BrowserRouter>

)
