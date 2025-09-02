import React, { useEffect, useState } from 'react'
import ProductItem from '../components/ProductItem.jsx'
import { products } from '../assets/images'
import Marquee from '../components/Marquee.jsx';
import Breadcrumb from '../components/Breadcrums.jsx'

const Fashion = () => {
  const [product, setProduct] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setProduct(products.slice(0, 6))
  }, [products])

  return (
    <div className='flex flex-col mt-[80px] w-full absolute'>

      <Marquee />
      <div className='pl-10 w-full h-0'>
        <Breadcrumb Home="Home" Fashion="Fashion" />
      </div>

      <div className='w-full grid grid-cols-2'>
        <div>
          <p className='text-black text-3xl pl-10 pt-10 font-[poppins]'>
            All<span className='text-red-800 pl-2 font-[poppins]'>Products</span>
          </p>
        </div>

        <div className='flex justify-end items-end font-[poppins] text-sm'>
          <select
            className='w-40 h-10 border mr-10 focus:outline-red-900'
            defaultValue="relavant"
          >
            <option value="relavant">Sort by: Relavant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
      </div>

         {/* Filter Section */}
      <div className="pl-10 mt-5">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="font-[poppins] text-lg text-red-800 border border-red-800 px-4 py-2 rounded-md hover:bg-red-800 hover:text-white transition-all duration-300"
        >
          Filters
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showFilter ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-2 text-black font-[poppins]">
            <label className="block"><input type="checkbox" className="mr-2" /> Men</label>
            <label className="block"><input type="checkbox" className="mr-2" /> Women</label>
            <label className="block"><input type="checkbox" className="mr-2" /> Top</label>
            <label className="block"><input type="checkbox" className="mr-2" /> Shirt</label>
            <label className="block"><input type="checkbox" className="mr-2" /> Pants</label>
          </div>
        </div>
      </div>

      
      {/* Product Grid */}
      <div className='grid grid-cols-2 gap-5 m-auto md:grid-cols-3 md:w-180 lg:grid-cols-4 lg:w-[95%]'>
        {product.map((item, index) => (
          <ProductItem
            key={index}
            title={item.title}
            id={item.id}
            img={item.img}
            price={item.price}
            percentage={item.percentage}
            textColor="black"
            btnText="Add to cart"
          />
        ))}
      </div>
    </div>
  )
}

export default Fashion
