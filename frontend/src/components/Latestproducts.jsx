import { useState, useEffect, } from 'react'
import Title from './Title'
import { products } from '../assets/images.js'
import ProductItem from './ProductItem.jsx'

const Latestproducts = () => {


  const [Latestproduct, setLatestproduct] = useState([])

  useEffect(() => {
    setLatestproduct(products.slice(0, 6).reverse())
  }, [products]);

  return (
    <>
    <div className='bg-[#FAF9F6]  pt-10'>

      <Title text1={'New Arrivals'} text2={'latest trends,handpicked just for you!'} />

      <div className=' grid grid-cols-2 gap-5 w-100 m-auto  md:grid-cols-4 md:w-180  lg:grid-cols-6 lg:w-[95%]'>
        {
          Latestproduct.map((item, index) => (
            <ProductItem key={index} title={item.title} img={item.img} price={item.price} percentage={item.percentage} />
            
          ))
        }
      </div>
        </div>
    </>

  )
}

export default Latestproducts