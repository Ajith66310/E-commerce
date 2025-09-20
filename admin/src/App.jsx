import AddProduct from './AddProduct.jsx'
import Login from './Login.jsx'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <BrowserRouter>
      <ToastContainer position="top-left" autoClose={2000} />
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='add-product' element={<AddProduct />} />
        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>

  )
}

export default App
