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
    <div className='bg-[#FAF9F6] -mt-6  h-[200vh] pt-20'>

      <Title text1={'NEW ARRIVALS'} text2={'LATEST TRENDS,HANDPICKED JUST FOR YOU!'} />

      <div className=' grid grid-cols-2 gap-5 w-100 m-auto  md:grid-cols-3 md:w-180  lg:grid-cols-4 lg:w-[95%]'>
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