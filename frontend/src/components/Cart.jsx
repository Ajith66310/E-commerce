import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { cartIcon, setCartIcon, setCartUpdated } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, [cartIcon]);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Restore stock when removing items
  const restoreStock = (item) => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = products.map((p) => {
      if (p._id === item.id) {
        p.sizes = p.sizes || {};
        p.sizes[item.size] = (p.sizes[item.size] || 0) + item.units;
      }
      return p;
    });
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // Delete item
  const handleDeleteItem = (index) => {
    const newCart = [...cartItems];
    const removedItem = newCart[index];
    restoreStock(removedItem);
    newCart.splice(index, 1);
    setCartItems(newCart);
    setCartUpdated((prev) => !prev);
    toast.success("Item removed from cart");
  };

  // Handle unit change (+ / −)
  const handleUnitChange = (index, newUnits) => {
    if (newUnits <= 0) return;

    const updatedCart = [...cartItems];
    console.log(updatedCart);
    
    const item = updatedCart[index];

    console.log(item);
    
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find((p) => p._id === item.id);

    if (!product || !product.sizes) return;

    const availableStock = product.sizes[item.size] ?? 0;
    const totalStock = availableStock + item.units;

    if (newUnits > totalStock) {
      toast.warn(`Only ${totalStock} units available for this size.`);
      return;
    }

    // Update stock
    product.sizes[item.size] = totalStock - newUnits;
    localStorage.setItem("products", JSON.stringify(products));

    item.units = newUnits;
    setCartItems(updatedCart);
    setCartUpdated((prev) => !prev);
  };

  // Totals
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.offerPrice * item.units,
    0
  );
  const cartOriginal = cartItems.reduce(
    (sum, item) => sum + item.price * item.units,
    0
  );
  const savings = cartOriginal - cartSubtotal;

  // Checkout
  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("Please login to proceed to checkout!");
      navigate("/login");
      return;
    }
    setCartIcon(false)
    navigate("/Shipping");
  };

  // Prevent scroll when cart open
  useEffect(() => {
    document.body.style.overflow = cartIcon ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [cartIcon]);

  return (
    <>
     

      {/* Overlay */}
      {cartIcon && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setCartIcon(false)}
        ></div>
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen bg-white z-50 text-gray-900 shadow-2xl transition-all duration-300 flex flex-col ${
          cartIcon ? "w-[90vw] sm:w-[70vw] md:w-[40vw] lg:w-[30vw]" : "w-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b bg-green-700 text-white">
          <p className="font-semibold text-lg">🛒 Your Cart</p>
          <button
            onClick={() => setCartIcon(false)}
            className="text-2xl hover:text-red-300 transition"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 ">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <p className="text-lg font-medium">Your cart is empty 🛍️</p>
              <button
                onClick={() => setCartIcon(false)}
                className="mt-4 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white  border-b  p-3 sm:p-4  transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-24 object-cover rounded-lg flex-shrink-0"
                />

                <div className="flex-1 flex flex-col justify-center">
                  <p className="font-medium text-gray-800 text-sm sm:text-base">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Size: {item.size}
                  </p>

                  {/* Quantity Controls (Centered) */}
                  <div className="flex justify-center sm:justify-start items-center mt-2">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => handleUnitChange(index, item.units - 1)}
                        className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-lg"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        className="w-12 text-center py-1 border-x outline-none text-sm"
                        value={item.units}
                        onChange={(e) =>
                          handleUnitChange(index, parseInt(e.target.value, 10))
                        }
                        min="1"
                      />
                      <button
                        onClick={() => handleUnitChange(index, item.units + 1)}
                        className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="mt-2 text-red-600 text-xs sm:text-sm hover:underline self-center sm:self-start"
                    onClick={() => handleDeleteItem(index)}
                  >
                    Remove
                  </button>
                </div>

                <p className="font-semibold text-green-700 text-base sm:text-lg whitespace-nowrap">
                  ₹{item.offerPrice * item.units}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t bg-white rounded-b-lg ">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{cartSubtotal}</span>
            </div>
            <div className="flex justify-between text-green-700 mb-2">
              <span>You Saved</span>
              <span>₹{savings}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>₹{cartSubtotal}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-medium transition"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => setCartIcon(false)}
              className="w-full mt-3 border border-green-700 text-green-700 py-3 rounded-lg hover:bg-green-50 font-medium transition"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
