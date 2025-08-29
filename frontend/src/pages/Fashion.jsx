import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductItem from '../components/ProductItem.jsx'
import { products } from '../assets/images'
import Breadcrumb from '../components/Breadcrums.jsx'

const Fashion = () => {
  const [product, setProduct] = useState([]);
  
  useEffect(() => {
    setProduct(products.slice(0, 6))
  }, [products])
 
  return (
    <div className='flex flex-col  mt-[80px]  w-full absolute'>
     
        <div className='pl-10 w-full  bg-red-50'>
          <Breadcrumb Home="Home" Fashion="Fashion" />
        </div>
 

      <div className='w-full grid grid-cols-2'>
        
        <div>
        <p className='text-black text-3xl pl-10 pt-10 font-[poppins]'>All<span className='text-red-800 pl-2 font-[poppins]'>Products</span></p>
        </div>

        <div className=' flex justify-end items-end font-[poppins] text-sm '>
          <select name=""  id=""  className='w-40 h-10 border mr-10  focus:outline-red-900' defaultValue="Relavant">
            <option value="relavant">Sort by: Relavant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
      </div>

      <div className=' grid grid-cols-2 gap-5 w-100 m-auto  md:grid-cols-3 md:w-180  lg:grid-cols-4 lg:w-[95%]'>
        {
          product.map((item, index) => (
            <ProductItem key={index} title={item.title} id={item.id} img={item.img} price={item.price} percentage={item.percentage} textColor="black" btnText="Add to cart"/>
          ))
        }
  
      </div>

    </div>
  )
}

export default Fashion