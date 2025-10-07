import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  const [selectedSize, setSelectedSize] = useState(null);
  const [units, setUnits] = useState(1);

  const { setCartIcon } = useContext(UserContext);

    const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/fetchproduct/${id}`
      );
      if (res.data.success) {
        let fetchedProduct = res.data.product;

        //  Adjust stock from localStorage cart
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartItems = cart.filter((item) => item.id === fetchedProduct._id);

        if (cartItems.length > 0) {
          const newSizes = { ...fetchedProduct.sizes };
          cartItems.forEach((item) => {
            if (newSizes[item.size] !== undefined) {
              newSizes[item.size] = Math.max(
                0,
                newSizes[item.size] - item.units
              );
            }
          });
          fetchedProduct = { ...fetchedProduct, sizes: newSizes };
        }

        setProduct(fetchedProduct);

        if (fetchedProduct.images?.length) {
          setSelectedImage(fetchedProduct.images[0]);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchProduct();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!product)
    return (
      <div className="p-6 text-center">
        <p>Product not found</p>
        <Link to="/fashion" className="text-blue-500">
          Back to products
        </Link>
      </div>
    );

  const numericPrice = Number(product.price) || 0;
  const numericDiscount =
    Number(String(product.percentage).replace("%", "")) || 0;
  const offerPrice = Math.round(
    numericPrice - (numericPrice * numericDiscount) / 100
  );

  const sizeS = Number(product.sizes?.S) || 0;
  const sizeM = Number(product.sizes?.M) || 0;
  const sizeL = Number(product.sizes?.L) || 0;
  const totalStock = sizeS + sizeM + sizeL;


  
  const maxForSelected =
    selectedSize === "S"
      ? sizeS
      : selectedSize === "M"
        ? sizeM
        : selectedSize === "L"
          ? sizeL
          : totalStock;

  const handleUnitsChange = (e) => {
    const val = Number(e.target.value);
    if (val > maxForSelected) setUnits(maxForSelected);
    else if (val < 1) setUnits(1);
    else setUnits(val);
  };

  // ✅ Updated handleAddToCart with stock update
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size!");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex(
      (item) => item.id === product._id && item.size === selectedSize
    );

    if (existingIndex !== -1) {
      const existingItem = cart[existingIndex];
      const maxStock =
        selectedSize === "S"
          ? sizeS
          : selectedSize === "M"
            ? sizeM
            : selectedSize === "L"
          ? sizeL
            : totalStock;
      existingItem.units = existingItem.units + units;
      cart[existingIndex] = existingItem;
      console.log("units="+existingItem.units)
      console.log(existingItem)
    } else {
      cart.push({
        id: product._id,
        title: product.title,
        size: selectedSize,
        units: units,
        price: numericPrice,
        percentage: product.percentage,
        offerPrice: offerPrice,
        image: product.images?.[0] || "",
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setCartIcon(true);

    const newSizes = { ...product.sizes };
    newSizes[selectedSize] = Math.max(0, newSizes[selectedSize] - units);
    setProduct({ ...product, sizes: newSizes });
  };

  return (
    <div className="max-w-7xl mx-auto pt-20 px-4">
      <div className="flex flex-col lg:flex-row gap-4 bg-white p-6">
        {/* Thumbnails */}
        <div className="order-2 lg:order-1 flex flex-row lg:flex-col gap-1 justify-center lg:justify-start w-full lg:w-1/6">
          {product.images?.map((imgUrl, idx) => (
            <img
              key={idx}
              src={imgUrl}
              alt={product.title}
              onClick={() => setSelectedImage(imgUrl)}
              className={`w-28 h-28 lg:w-32 lg:h-32 object-cover rounded cursor-pointer border ${selectedImage === imgUrl
                  ? "border-red-500"
                  : "border-gray-300"
                }`}
            />
          ))}
        </div>

        {/* Main image */}
        <div className="order-1 lg:order-2 flex-1 w-full lg:w-2/3 flex pr-30  justify-center">
          <img
            src={selectedImage}
            alt={product.title}
            className="w-[525px] md:w-[600px] lg:w-full max-w-2xl lg:max-w-none lg:h-[71vh] object-contain rounded"
          />
        </div>

        {/* Product details */}
        <div className="order-3 flex flex-col w-full lg:w-1/3 mt-4 pt-20 lg:mt-0">
          <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-3">
            {numericDiscount > 0 ? (
              <>
                <p className="text-sm text-gray-500 line-through">
                  ₹{numericPrice}
                </p>
                <p className="text-xl md:text-2xl font-semibold text-red-600">
                  ₹{offerPrice}
                </p>
                <p className="text-green-600 text-sm">
                  Save {numericDiscount}%!
                </p>
              </>
            ) : (
              <p className="text-xl md:text-2xl font-semibold">
                ₹{numericPrice}
              </p>
            )}
          </div>

          {/* Sizes */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Select Size</label>
            <div className="flex gap-3">
              {["S", "M", "L"].map((size) => (
                <div
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setUnits(1);
                  }}
                  className={`cursor-pointer border rounded px-3 py-2 ${selectedSize === size ? "bg-black text-white" : ""
                    }`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Units */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Units</label>
            <input
              type="number"
              min="1"
              max={maxForSelected}
              value={units}
              onChange={handleUnitsChange}
              className="border rounded px-3 py-2 w-20"
            />
          </div>

          {/* Stock */}
          <p
            className={`mt-3 text-sm font-medium ${maxForSelected > 0 ? "text-green-600" : "text-red-600"
              }`}
          >
            {selectedSize
              ? maxForSelected > 0
                ? "In Stock"
                : "Out of Stock"
              : totalStock > 0
                ? "In Stock"
                : "Out of Stock"}
          </p>

          {/* Add to cart */}
          <button
            disabled={totalStock <= 0 || !selectedSize}
            className={`mt-6 w-full py-3 rounded transition ${totalStock > 0 && selectedSize
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gray-400 text-gray-100 cursor-not-allowed"
              }`}
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
