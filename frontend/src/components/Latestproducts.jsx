import { useState, useEffect, useContext } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { Navigate, useNavigate } from "react-router-dom";

const Latestproducts = () => {
  const [latestProduct, setLatestProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchProducts } = useContext(UserContext);
  const navigate = useNavigate()
  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts(20);
      setLatestProduct(products.reverse().slice(0, 4));
      setLoading(false);
    };
    loadProducts();
  }, [fetchProducts]);

  const skeletons = Array.from({ length: 6 });

  return (
    <div
      id="container"
      className="min-h-screen py-16 px-5 md:px-10 bg-gradient-to-b bg-white font-[Inter]"
    >
      {/* Title Section */}
      <div className="text-center mb-12">
             <Title
          text1="Latest Products"
          text2="Latest Trends, Handpicked Just For You!"
        />
      </div>

      {/* Product Grid */}
      <div
        id="image-box"
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mx-auto max-w-7xl"
      >
        {loading
          ? skeletons.map((_, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl overflow-hidden shadow-md animate-pulse"
              >
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded w-full mt-3"></div>
                </div>
              </div>
            ))
          : latestProduct.map((item) => (
              <div
                key={item._id}
                className="transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl bg-white/90 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-100"
              >
                <ProductItem
                  id={item._id}
                  title={item.title}
                  img={item.images?.[0]}
                  price={item.price}
                  percentage={item.percentage}
                  textColor="black"
                  btnText="View"
                />
              </div>
            ))}
      </div>
<div className="flex justify-center items-center my-10 mt-20">
  <button
    className="relative px-10 py-2 text-lg animate-bounce font-semibold text-white rounded-2xl bg-black"
   onClick={()=>{navigate('/fashion')}}>
    Shop All
  </button>
</div>
    </div>
  );
};

export default Latestproducts;
