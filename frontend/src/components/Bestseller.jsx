import { useState, useEffect, } from 'react'
import Title from './Title'
import { products } from '../assets/images.js'
import ProductItem from './ProductItem.jsx'

const Bestseller = () => {
  
  
  const [Latestproduct, setLatestproduct] = useState([])
  
  
  useEffect(() => {
    setLatestproduct(products.slice(0, 6))
  }, [products]);


  return (
    <>
    <div id="container" className='bg-black -mt-6  h-[200vh] pt-20'>

<div className="title">
      <Title  text1={'Bestseller'} text2={'LATEST TRENDS,HANDPICKED JUST FOR YOU!'} />
</div>

      <div id="image-box" className=' grid grid-cols-2 gap-5 w-100 m-auto  md:grid-cols-3 md:w-180  lg:grid-cols-4 lg:w-[95%]'>
        {
          Latestproduct.map((item, index) => (
            <ProductItem key={index} title={item.title} img={item.img} price={item.price} percentage={item.percentage} textColor="white"  btnText="View" />            
          ))
        }
      </div>
        </div>
    </>

  )
}

export default Bestseller