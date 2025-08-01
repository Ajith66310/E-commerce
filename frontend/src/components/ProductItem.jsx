import React from 'react'
import {  FaCartArrowDown } from 'react-icons/fa'


const ProductItem = ({ title, img, price, percentage }) => {

 const offerPrice =   Math.round(price - (price * percentage / 100))
  

  return (
    <>
      <div>
        <img src={img} className='rounded-t-2xl   hover:scale-102  duration-200' alt="img" />
        <p className='text-1xl font-extrabold  ' >{title}</p>
        <div className='flex gap-3'>
          <p className=' line-through '>₹{Math.round(price)}</p>
          <p>₹{offerPrice}</p>
          <p className='text-red-600'>{percentage}%</p>
        </div>
        <button className='bg-black text-white w-full'>View</button>
      </div>
    </>
  )
}

export default ProductItem