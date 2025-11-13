import { useState, useEffect } from "react";
import axios from "axios";
import Title from "./Title";
import ProductItem from "./ProductItem.jsx";

const Bestseller = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bestsellers directly from backend
  const fetchBestsellers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/api/bestsellers`);
      if (res.data.success && res.data.products) {
        setBestsellers(res.data.products.slice(0, 8)); 
      } else {
        setBestsellers([]);
      }
    } catch (err) {
      console.error("Error fetching bestsellers:", err);
      setBestsellers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBestsellers();
  }, []);

  const skeletons = Array.from({ length: 8 });

  return (
    <div className="bg-black py-10">
      {/* Section title */}
      <div className="text-center mb-8">
        <Title
          text1="Bestseller"
          text2="LATEST TRENDS, HANDPICKED JUST FOR YOU!"
          bgcolor="black"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-5 w-[95%] mx-auto md:grid-cols-3 lg:grid-cols-4 ">
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
          : bestsellers.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                title={item.title}
                img={item.images?.[0]}
                price={item.price}
                percentage={item.percentage}
                textColor="black"
                btnText="View"
              />
            ))}
      </div>
    </div>
  );
};

export default Bestseller;
