import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartIcon, setCartIcon } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart.reverse());
  }, [cartIcon]);

  const restoreStock = (item) => {
    // Get all products from localStorage (the main product list stored when browsing)
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Find the product being restored
    const updatedProducts = products.map((p) => {
      if (p._id === item._id) {
        if (item.size === "S") {
          p.sizeS = (p.sizeS || 0) + item.units;
        } else if (item.size === "M") {
          p.sizeM = (p.sizeM || 0) + item.units;
        } else if (item.size === "L") {
          p.sizeL = (p.sizeL || 0) + item.units;
        }
      }
      return p;
    });

    // Save back the updated stock to localStorage
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };


  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (index, delta) => {
    const newCart = [...cartItems];
    const item = newCart[index];

    const maxStock =
      item.size === "S"
        ? item.sizeS
        : item.size === "M"
          ? item.sizeM
          : item.sizeL || 100;

    // If user decreases quantity, restore 1 unit of stock
    if (delta < 0 && item.units > 1) {
      const products = JSON.parse(localStorage.getItem("products")) || [];
      const updatedProducts = products.map((p) => {
        if (p._id === item._id) {
          if (item.size === "S") p.sizeS += 1;
          else if (item.size === "M") p.sizeM += 1;
          else if (item.size === "L") p.sizeL += 1;
        }
        return p;
      });
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    }

    item.units = Math.min(Math.max(item.units + delta, 1), maxStock);
    setCartItems(newCart);
  };


  const handleDeleteItem = (index) => {
    const newCart = [...cartItems];
    const removedItem = newCart[index];

    // Restore stock for the removed item
    restoreStock(removedItem);

    // Remove from cart
    newCart.splice(index, 1);
    setCartItems(newCart);
  };


  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.offerPrice * item.units,
    0
  );

  const cartOriginal = cartItems.reduce(
    (sum, item) => sum + item.price * item.units,
    0
  );

  const savings = cartOriginal - cartSubtotal;

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to proceed to checkout!");
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div
      className={`fixed bg-white z-50 text-black overflow-y-auto h-full top-0 right-0 transition-all ease-in-out duration-300 
        ${cartIcon ? "w-[80vw] md:w-[35vw]" : "w-0"}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <p className="font-semibold text-lg">Your Bag</p>
          <button
            onClick={() => setCartIcon(false)}
            className="text-red-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 p-4 space-y-4">
          {cartItems.length === 0 && <p className="text-center text-gray-500">Your cart is empty.</p>}
          {cartItems.map((item, index) => (
            <div key={index} className="flex gap-4 items-center border-b pb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-28 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">Size: {item.size}</p>

                {/* Quantity selector */}
                <div className="mt-2 flex items-center gap-2">
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => handleQuantityChange(index, -1)}
                  >
                    -
                  </button>
                  <span className="px-3">{item.units}</span>
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => handleQuantityChange(index, 1)}
                  >
                    +
                  </button>
                </div>

                {/* Delete button */}
                <button
                  className="mt-2 text-red-600 text-sm underline"
                  onClick={() => handleDeleteItem(index)}
                >
                  Remove
                </button>
              </div>
              <p className="font-semibold">₹{item.offerPrice * item.units}</p>
            </div>
          ))}
        </div>

        {/* Cart Totals */}
        <div className="p-4 border-t">
          <div className="flex justify-between">
            <span className="font-medium">Cart Subtotal</span>
            <span>₹{cartSubtotal}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>You Saved</span>
            <span>₹{savings}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total</span>
            <span>₹{cartSubtotal}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800 transition mt-4"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={() => setCartIcon(false)}
            className="w-full border border-green-700 text-green-700 py-3 rounded hover:bg-green-50 transition mt-2"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
