import React, { useEffect, useState, useRef } from "react";
import ProductItem from "../components/ProductItem.jsx";
import Marquee from "../components/Marquee.jsx";
import Breadcrumb from "../components/Breadcrums.jsx";
import { IoFilter } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const Fashion = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("relevant");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/api/adminfetchproducts`
        );
        const data = res.data.products || [];
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle sorting
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);

    let sorted = [...filteredProducts];
    if (value === "low-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === "high-low") {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      sorted = [...products];
    }

    setFilteredProducts(sorted);
  };

  // Handle category filtering
  const handleCategoryChange = (e) => {
    const { checked, name } = e.target;
    let updatedCategories = [...selectedCategories];

    if (checked) {
      updatedCategories.push(name);
    } else {
      updatedCategories = updatedCategories.filter((c) => c !== name);
    }

    setSelectedCategories(updatedCategories);

    if (updatedCategories.length === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((item) =>
        updatedCategories.includes(item.category?.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setShowSidebar(false);
      }
    };

    if (showSidebar) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSidebar]);

  // Skeleton loading placeholders
  const skeletons = Array.from({ length: 8 });

  return (
    <div className="flex flex-col pt-[80px] w-full relative font-[Poppins] bg-gradient-to-b from-white to-gray-50">
      <Marquee />
      <div className="pl-6 md:pl-10 pt-5 pb-5 w-full">
        <Breadcrumb Home="Home" Fashion="Fashion" />
      </div>

      {/* Header */}
      <div className="w-full grid grid-cols-2 items-center px-6 md:px-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-[Playfair_Display] tracking-wide text-gray-900">
            All
            <span className="text-red-700 pl-2">Products</span>
          </h1>
        </div>

        <div className="flex justify-end items-center">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="flex items-center gap-2 px-5 py-2 text-sm md:text-base font-semibold text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300"
          >
            <IoFilter className="text-lg" />
            Filters & Sort
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 px-4 sm:px-6 md:px-12">
        {loading
          ? skeletons.map((_, i) => (
              <div
                key={i}
                className="flex flex-col bg-gray-100 rounded-2xl overflow-hidden animate-pulse shadow-sm"
              >
                <div className="w-full h-64 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded w-full mt-3"></div>
                </div>
              </div>
            ))
          : filteredProducts.map((item) => (
              <ProductItem
                key={item._id}
                title={item.title}
                id={item._id}
                img={item.images && item.images[0]}
                price={item.price}
                percentage={item.percentage}
                textColor="black"
                btnText="View"
              />
            ))}
      </div>

      {/* Sidebar Overlay */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm transition-opacity duration-300"></div>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 w-72 sm:w-80 bg-white z-50 transform transition-transform duration-500 ease-in-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } shadow-2xl rounded-r-2xl overflow-y-auto`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-50">
          <h2 className="text-xl font-bold text-gray-800 font-[Playfair_Display]">
            Filters & Sort
          </h2>
          <button
            onClick={() => setShowSidebar(false)}
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <RxCross2 className="text-2xl" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Category Filter */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800 font-[Playfair_Display]">
              Category
            </h3>
            <div className="space-y-3 text-gray-600">
              {["men", "women", "kids"].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center cursor-pointer hover:text-red-600 transition"
                >
                  <input
                    type="checkbox"
                    name={cat}
                    checked={selectedCategories.includes(cat)}
                    onChange={handleCategoryChange}
                    className="h-4 w-4 text-red-600 accent-red-500 border-gray-300 rounded focus:ring-red-500 mr-3"
                  />
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Sort Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800 font-[Playfair_Display]">
              Sort By
            </h3>
            <div className="relative">
              <select
                className="w-full px-5 py-3 border border-gray-300 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white text-gray-700 shadow-sm"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="relevant">Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
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
        </div>
      </div>
    </div>
  );
};

export default Fashion;
