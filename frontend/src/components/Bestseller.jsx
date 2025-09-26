import { useState, useEffect, useContext } from 'react'
import Title from './Title'
import ProductItem from './ProductItem.jsx'
import { UserContext } from '../context/UserContext.jsx'

const Bestseller = () => {
  const [latestProduct, setLatestProduct] = useState([])
  const { fetchProducts } = useContext(UserContext)

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts(20)
      setLatestProduct(products.slice(0, 6))
    }
    loadProducts()
  }, [fetchProducts])

  return (
    <div id="container" className='bg-black -mt-6 h-[200vh] pt-20'>
      <div className="title">
        <Title text1="Bestseller" text2="LATEST TRENDS,HANDPICKED JUST FOR YOU!" />
      </div>

      <div id="image-box" className='grid grid-cols-2 gap-5 w-100 m-auto md:grid-cols-3 md:w-180 lg:grid-cols-4 lg:w-[95%]'>
        {latestProduct.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            title={item.title}
            img={item.images?.[0]}
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
