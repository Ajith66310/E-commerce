import { useState, useEffect } from 'react'
import Title from './Title'
import ProductItem from './ProductItem.jsx'
import axios from 'axios'

const Bestseller = () => {
  const [latestProduct, setLatestProduct] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/api/adminfetchproducts?limit=20`
        )
        if (res.data.products) {
          // take first 6 products for bestseller
          setLatestProduct(res.data.products.slice(0, 6))
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div id="container" className='bg-black -mt-6 h-[200vh] pt-20'>
      <div className="title">
        <Title text1={'Bestseller'} text2={'LATEST TRENDS,HANDPICKED JUST FOR YOU!'} />
      </div>

      <div id="image-box" className='grid grid-cols-2 gap-5 w-100 m-auto md:grid-cols-3 md:w-180 lg:grid-cols-4 lg:w-[95%]'>
        {latestProduct.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id} // _id from Mongo
            title={item.title}
            img={item.images?.[0]} // show first Cloudinary image
            price={item.price}
            percentage={item.percentage}
            textColor="white"
            btnText="View"
          />
        ))}
      </div>
    </div>
  )
}

export default Bestseller
