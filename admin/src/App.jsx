import AddProduct from './AddProduct.jsx'
import Login from './Login.jsx'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from './layout/AdminLayout.jsx';
import Dashboard from './Dashboard.jsx';
import Users from './Users.jsx';
import Products from './Products.jsx';
import NotFound from '../../frontend/src/pages/NotFound.jsx';
import { useEffect, useState } from 'react';

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
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="users" element={<Users />} />
                <Route path='*' element={<NotFound />} />
                <Route path="products" element={<Products />} />
              </Route>
            )
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
