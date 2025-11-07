import { useEffect, useState } from 'react';
import Login from './pages/Login.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from './layout/AdminLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Users from './pages/Users.jsx';
import Products from './pages/Products.jsx';
import AddProduct from './pages/AddProduct.jsx'
import Orders from './pages/Orders.jsx'
import NotFound from '../../frontend/src/pages/NotFound.jsx';

function App() {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <BrowserRouter>
      <ToastContainer position="top-left" autoClose={2000} />
      <Routes>
        {
          token === '' ?
            (
              <Route path="login" element={<Login setToken={setToken} />} />
            ) :
            (
              <Route path="/" element={<AdminLayout setToken={setToken} />}>
                <Route path="dashboard" element={<Dashboard/>} />
                <Route path="add-product" element={<AddProduct/>} />
                <Route path="users" element={<Users />} />
                <Route path='*' element={<NotFound />} />
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<Orders/>} />
              </Route>
            )
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
