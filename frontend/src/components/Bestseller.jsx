import { useState, useEffect, useContext } from 'react'
import Title from './Title'
import ProductItem from './ProductItem.jsx'
import { UserContext } from '../context/UserContext.jsx'

const Bestseller = () => {
  const [latestProduct, setLatestProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const { fetchProducts } = useContext(UserContext)

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts(20)
      setLatestProduct(products.slice(0, 6))
      setLoading(false)
    }
    loadProducts()
  }, [fetchProducts])

  const skeletons = Array.from({ length: 6 })

  return (
    <div id="container" className='bg-black mt-5 h-auto'>
      <div className="title pt-10">
        <Title text1="Bestseller" text2="LATEST TRENDS, HANDPICKED JUST FOR YOU!" />
      </div>

      <div id="image-box" className='grid grid-cols-2  gap-5 w-100 m-auto md:grid-cols-3 md:w-180 lg:grid-cols-4 lg:w-[95%]'>
        {loading
          ? skeletons.map((_, i) => (
              <div
                key={i}
                className="flex flex-col bg-gray-800 rounded-lg animate-pulse"
              >
                <div className="w-full h-56 bg-gray-700 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-700 rounded w-full mt-3"></div>
                </div>
              </div>
            ))
          : latestProduct.map((item) => (
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
