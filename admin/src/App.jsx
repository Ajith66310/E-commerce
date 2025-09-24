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

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-left" autoClose={2000} />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
