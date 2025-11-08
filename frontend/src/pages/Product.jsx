import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const { setCartIcon, cartUpdated } = useContext(UserContext);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/api/fetchproduct/${id}`);
      if (res.data.success) {
        let fetchedProduct = res.data.product;

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartItems = cart.filter((item) => item.id === fetchedProduct._id);

        if (cartItems.length > 0) {
          const newSizes = { ...fetchedProduct.sizes };
          cartItems.forEach((item) => {
            if (newSizes[item.size] !== undefined) {
              newSizes[item.size] = Math.max(0, newSizes[item.size] - item.units);
            }
          });
          fetchedProduct = { ...fetchedProduct, sizes: newSizes };
        }

        setProduct(fetchedProduct);
        if (fetchedProduct.images?.length) setSelectedImage(fetchedProduct.images[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id, cartUpdated]);

  useEffect(() => {
    const onStorageChange = (e) => {
      if (e.key === "cart") fetchProduct();
    };
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto pt-24 px-4 animate-pulse">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col gap-2 w-full lg:w-1/6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-28 h-28 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="w-full lg:w-2/3 h-[500px] bg-gray-200 rounded-xl"></div>
          <div className="w-full lg:w-1/3 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-10 bg-gray-300 rounded mt-4"></div>
            <div className="h-10 bg-gray-300 rounded mt-2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-center font-[Poppins]">
        <p>Product not found</p>
        <Link to="/fashion" className="text-red-600 font-medium">
          Back to products
        </Link>
      </div>
    );
  }

  const numericPrice = Number(product.price) || 0;
  const numericDiscount = Number(String(product.percentage).replace("%", "")) || 0;
  const offerPrice = Math.round(numericPrice - (numericPrice * numericDiscount) / 100);

  const sizeS = Number(product.sizes?.S) || 0;
  const sizeM = Number(product.sizes?.M) || 0;
  const sizeL = Number(product.sizes?.L) || 0;

  const maxForSelected =
    selectedSize === "S" ? sizeS : selectedSize === "M" ? sizeM : selectedSize === "L" ? sizeL : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast("Please select a size!");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex(
      (item) => item.id === product._id && item.size === selectedSize
    );

    if (existingIndex !== -1) {
      const existingItem = cart[existingIndex];
      existingItem.units += 1;
      cart[existingIndex] = existingItem;
    } else {
      cart.push({
        id: product._id,
        title: product.title,
        size: selectedSize,
        units: 1,
        price: numericPrice,
        percentage: product.percentage,
        offerPrice: offerPrice,
        image: product.images?.[0] || "",
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setCartIcon(true);

    const newSizes = { ...product.sizes };
    newSizes[selectedSize] = Math.max(0, newSizes[selectedSize] - 1);
    setProduct({ ...product, sizes: newSizes });
  };

  return (
    <div className="max-w-7xl mx-auto pt-20 px-4 font-[Poppins]">
      <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-2xl">

        {/* Left: Main Image + Thumbnails */}
        <div className="flex flex-col  lg:flex-row gap-4 w-full lg:w-2/3 items-center lg:items-start">
          {/* Thumbnails vertical on large screens */}
          <div className="hidden overflow-hidden lg:flex flex-col gap-3 w-34">
            {product.images?.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={product.title}
                onClick={() => setSelectedImage(imgUrl)}
                className={`w-35 h-35 object-cover rounded-lg cursor-pointer border transition-all duration-300
                  ${selectedImage === imgUrl ? "border-red-500 scale-105" : "border-gray-200"}
                `}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full max-w-[600px] h-auto lg:h-[80vh] object-contain rounded-xl"
            />
          </div>

          {/* Thumbnails horizontal on small screens */}
          <div className="flex lg:hidden gap-3 mt-4 overflow-hidden">
            {product.images?.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={product.title}
                onClick={() => setSelectedImage(imgUrl)}
                className={`w-28 h-28 object-cover rounded-lg cursor-pointer border transition-all duration-300
                  ${selectedImage === imgUrl ? "border-red-500 scale-105" : "border-gray-200"}
                `}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="w-full lg:w-1/3 flex flex-col justify-center">
        
          <h1 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900 tracking-tight">
            {product.title}
          </h1>
          <p className="text-gray-600 mt-3 text-sm md:text-base leading-relaxed">
            {product.description}
          </p>

          <div className="mt-4">
            {numericDiscount > 0 ? (
              <>
                <p className="text-sm text-gray-400 line-through">₹{numericPrice}</p>
                <p className="text-2xl font-semibold text-red-700">₹{offerPrice}</p>
                <p className="text-green-600 text-sm font-medium mt-1">
                  Save {numericDiscount}%!
                </p>
              </>
            ) : (
              <p className="text-2xl font-semibold text-gray-900">₹{numericPrice}</p>
            )}
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Select Size
            </label>
            <div className="flex gap-3">
              {["S", "M", "L"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-3 rounded-lg border font-medium transition-all duration-300
                    ${selectedSize === size
                      ? "bg-red-600 text-white border-red-600"
                      : "border-gray-300 hover:border-red-400"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Status */}
          <p
            className={`mt-4 text-sm font-medium ${
              selectedSize
                ? maxForSelected > 0
                  ? "text-green-600"
                  : "text-red-600"
                : "text-gray-500"
            }`}
          >
            {selectedSize
              ? maxForSelected > 0
                ? "In Stock"
                : "Out of Stock"
              : "Select a size to check stock"}
          </p>

          {/* Add to Cart */}
          <button
            disabled={maxForSelected <= 0 || !selectedSize}
            onClick={handleAddToCart}
            className={`mt-6 w-full py-3 rounded-xl text-lg font-semibold tracking-wide shadow-md transition-all duration-300
              ${
                maxForSelected > 0 && selectedSize
                  ? "bg-gradient-to-r from-red-700 to-red-500 text-white hover:from-gray-900 hover:to-gray-700"
                  : "bg-gray-300 text-gray-100 cursor-not-allowed"
              }`}
          >
            {maxForSelected > 0 ? "ADD TO CART" : "OUT OF STOCK"}
          </button>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={product.category}
        currentProductId={product._id}
      />
    </div>
  );
};

export default Product;
