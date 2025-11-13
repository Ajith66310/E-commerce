import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import RelatedProducts from "../components/RelatedProducts";
import { useDispatch, useSelector } from "react-redux";
import { addItem, toggleCart } from "../redux/cartSlice";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_URL}/api/fetchproduct/${id}`);
        if (res.data.success) {
          const p = res.data.product;
          setProduct(p);
          if (p.images?.length) setSelectedImage(p.images[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [id]);


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

  const sizeStock = {
    S: Number(product.sizes?.S) || 0,
    M: Number(product.sizes?.M) || 0,
    L: Number(product.sizes?.L) || 0,
  };

  const maxForSelected = selectedSize ? sizeStock[selectedSize] : 0;

  const existingItem = cartItems.find(
    (item) => item.id === product._id && item.size === selectedSize
  );

  const currentUnits = existingItem ? existingItem.units : 0;
  const isOutOfStock =
    !selectedSize || maxForSelected <= 0 || currentUnits >= maxForSelected;

  const handleAddToCart = () => {


    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items");
      return;
    }


    if (isOutOfStock) return;

    const newItem = {
      id: product._id,
      title: product.title,
      size: selectedSize,
      units: 1,
      price: numericPrice,
      percentage: numericDiscount,
      offerPrice,
      image: product.images?.[0] || "",
      stock: maxForSelected,
    };

    dispatch(addItem(newItem));
    dispatch(toggleCart(true));
  };


  return (
    <div className="max-w-7xl mx-auto pt-20 px-4 font-[Poppins]">
      <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-2xl">
        {/* LEFT: Images */}
        <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-2/3 items-center lg:items-start">
          <div className="hidden lg:flex flex-col gap-3 w-34">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={product.title}
                onClick={() => setSelectedImage(img)}
                className={`w-35 h-35 object-cover rounded-lg cursor-pointer border transition-all duration-300 ${selectedImage === img ? "border-red-500 scale-105" : "border-gray-200"
                  }`}
              />
            ))}
          </div>

          <div className="flex-1 flex justify-center items-center">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full max-w-[600px] h-auto lg:h-[80vh] object-contain rounded-xl"
            />
          </div>

          <div className="flex lg:hidden gap-3 mt-4 overflow-hidden">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={product.title}
                onClick={() => setSelectedImage(img)}
                className={`w-28 h-28 object-cover rounded-lg cursor-pointer border transition-all duration-300 ${selectedImage === img ? "border-red-500 scale-105" : "border-gray-200"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Info */}
        <div className="w-full lg:w-1/3 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-[Playfair_Display] font-bold text-gray-900">
            {product.title}
          </h1>
          <p className="text-gray-600 mt-3 text-sm md:text-base">{product.description}</p>

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

          {/* SIZE OPTIONS */}
          <div className="mt-6">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Select Size
            </label>
            <div className="flex gap-3">
              {["S", "M", "L"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={sizeStock[size] <= 0}
                  className={`px-5 py-3 rounded-lg border font-medium transition-all duration-300 ${sizeStock[size] <= 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : selectedSize === size
                        ? "bg-red-600 text-white border-red-600"
                        : "border-gray-300 hover:border-red-400"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ADD TO CART BUTTON */}
          <button
            onClick={handleAddToCart}
            className={`mt-6 w-full py-3 rounded-xl text-lg font-semibold tracking-wide shadow-md transition-all duration-300 ${isOutOfStock
                ? "bg-gray-300 text-gray-100 cursor-not-allowed"
                : "bg-gradient-to-r from-red-700 to-red-500 text-white hover:from-gray-900 hover:to-gray-700"
              }`}
          >
            {!selectedSize
              ? "SELECT SIZE"
              : isOutOfStock
                ? "OUT OF STOCK"
                : "ADD TO CART"}
          </button>

        </div>
      </div>

      <RelatedProducts category={product.category} currentProductId={product._id} />
    </div>
  );
};

export default Product;
