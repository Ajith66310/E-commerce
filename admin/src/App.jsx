import AddProduct from './AddProduct.jsx'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/add-product' element={<AddProduct />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
