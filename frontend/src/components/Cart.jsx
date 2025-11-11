import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { cartIcon, setCartIcon, setCartUpdated } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, [cartIcon]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

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

  const handleDeleteItem = (index) => {
    const newCart = [...cartItems];
    const removedItem = newCart[index];
    restoreStock(removedItem);
    newCart.splice(index, 1);
    setCartItems(newCart);
    setCartUpdated((prev) => !prev);
    toast.success("Item removed from cart");
  };

  const handleUnitChange = (index, newUnits) => {
    if (newUnits <= 0) return;

    const updatedCart = [...cartItems];
    const item = updatedCart[index];
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find((p) => p._id === item.id);

    if (!product || !product.sizes) return;

    const availableStock = product.sizes[item.size] ?? 0;
    const totalStock = availableStock + item.units;

    if (newUnits > totalStock) {
      toast.warn(`Only ${totalStock} units available for this size.`);
      return;
    }

    product.sizes[item.size] = totalStock - newUnits;
    localStorage.setItem("products", JSON.stringify(products));

    item.units = newUnits;
    setCartItems(updatedCart);
    setCartUpdated((prev) => !prev);
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
      toast.info("Please login to proceed to checkout!");
      navigate("/login");
      return;
    }
    setCartIcon(false);
    navigate("/Shipping");
  };

  useEffect(() => {
    document.body.style.overflow = cartIcon ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [cartIcon]);

  return (
    <>
      {cartIcon && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setCartIcon(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-screen bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 text-white z-50 shadow-2xl transition-all duration-500 flex flex-col border-l border-white/10 ${
          cartIcon ? "w-[90vw] sm:w-[70vw] md:w-[40vw] lg:w-[30vw]" : "w-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-white/20 bg-neutral-950/60 backdrop-blur-md">
          <p className="font-semibold text-lg tracking-wide">
            🛍️ Your Cart
          </p>
          <button
            onClick={() => setCartIcon(false)}
            className="text-2xl hover:text-red-400 transition-transform duration-200 hover:scale-110"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-400 mt-20">
              <p className="text-lg font-medium">Your cart is empty 🛒</p>
              <button
                onClick={() => setCartIcon(false)}
                className="mt-6 px-6 py-2 text-sm bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg text-black font-semibold hover:scale-105 transition-transform"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white/5 border border-white/10 p-3 sm:p-4 rounded-2xl hover:bg-white/10 transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-24 object-cover rounded-xl shadow-lg border border-white/10"
                />

                <div className="flex-1 flex flex-col justify-center">
                  <p className="font-medium text-gray-100 text-sm sm:text-base">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-400 mb-1">
                    Size: {item.size}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex justify-center sm:justify-start items-center mt-2">
                    <div className="flex items-center border border-white/10 rounded-lg overflow-hidden bg-white/5">
                      <button
                        onClick={() => handleUnitChange(index, item.units - 1)}
                        className="px-3 py-1 hover:bg-amber-500/30 text-lg text-white"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        className="w-12 text-center py-1 bg-transparent border-x border-white/10 outline-none text-sm text-white"
                        value={item.units}
                        onChange={(e) =>
                          handleUnitChange(index, parseInt(e.target.value, 10))
                        }
                        min="1"
                      />
                      <button
                        onClick={() => handleUnitChange(index, item.units + 1)}
                        className="px-3 py-1 hover:bg-amber-500/30 text-lg text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="mt-2 text-red-400 text-xs sm:text-sm hover:underline self-center sm:self-start"
                    onClick={() => handleDeleteItem(index)}
                  >
                    Remove
                  </button>
                </div>

                <p className="font-semibold text-amber-400 text-base sm:text-lg whitespace-nowrap">
                  ₹{item.offerPrice * item.units}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-neutral-950/70 backdrop-blur-xl rounded-t-2xl">
            <div className="flex justify-between mb-2 text-gray-300">
              <span>Subtotal</span>
              <span>₹{cartSubtotal}</span>
            </div>
            <div className="flex justify-between text-green-400 mb-2">
              <span>You Saved</span>
              <span>₹{savings}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-white/10 pt-2 text-white">
              <span>Total</span>
              <span>₹{cartSubtotal}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-yellow-400 hover:to-amber-400 text-black py-3 rounded-full font-semibold tracking-wide transition-transform hover:scale-105"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => setCartIcon(false)}
              className="w-full mt-3 border border-amber-500 text-amber-400 py-3 rounded-full hover:bg-amber-500/10 font-medium transition-all"
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
