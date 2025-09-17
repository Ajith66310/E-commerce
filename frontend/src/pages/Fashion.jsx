import React, { useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem.jsx';
import { products } from '../assets/images';
import Marquee from '../components/Marquee.jsx';
import Breadcrumb from '../components/Breadcrums.jsx';
import { IoFilter } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

const Fashion = () => {
  const [product, setProduct] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setProduct(products.slice(0, 6));
  }, [products]);

  return (
    <div className='flex flex-col pt-[80px] w-full relative'>

      <Marquee />
      <div className="pl-10 pt-5 pb-5 w-full">
        <Breadcrumb Home="Home" Fashion="Fashion" />
      </div>

      <div className='w-full grid grid-cols-2'>
        <div>
          <p className='text-black text-3xl pl-10  font-[poppins]'>
            All<span className='text-red-800 pl-2 font-[poppins]'>Products</span>
          </p>
        </div>

        <div className='flex justify-end items-end font-[poppins] text-sm'>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-gray-800 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-200 transition-all duration-300 mr-10"
          >
            <IoFilter className="text-lg" />
            Filters & Sort
          </button>
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

      {/* Filter Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-500 ease-in-out ${showSidebar ? 'translate-x-0' : '-translate-x-full'
          } shadow-lg`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Filters & Sort</h2>
          <button onClick={() => setShowSidebar(false)} className="text-gray-500 hover:text-gray-800">
            <RxCross2 className="text-2xl" />
          </button>
        </div>
        <div className="p-6">


          {/* Sort By */}
          
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-4 text-gray-700">Sort By</h3>
            <div className="relative">
              <select
                className="w-full px-5 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white shadow-sm"
                defaultValue="relevant"
              >
                <option value="relevant" className="py-2">Relevant</option>
                <option value="low-high" className="py-2">Price: Low to High</option>
                <option value="high-low" className="py-2">Price: High to Low</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                <svg
                  className="h-5 w-5 transition-transform duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>


          {/* Filter Options */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-700">Category</h3>
            <div className="space-y-3 text-gray-600">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="h-4 w-4 text-red-600 accent-red-500 border-gray-300 rounded focus:ring-red-500 mr-2" />
                Men
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="h-4 w-4 text-red-600 border-gray-300 accent-red-500 rounded focus:ring-red-500 mr-2" />
                Women
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="h-4 w-4 text-red-600 border-gray-300 rounded accent-red-500 focus:ring-red-500 mr-2" />
                Top
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="h-4 w-4 text-red-600 border-gray-300 rounded accent-red-500 focus:ring-red-500 mr-2" />
                Shirt
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="h-4 w-4 text-red-600 border-gray-300 rounded accent-red-500 focus:ring-red-500 mr-2" />
                Pants
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fashion;