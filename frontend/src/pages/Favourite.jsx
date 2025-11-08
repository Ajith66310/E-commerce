import React, { useContext } from "react";
import Header from "../components/Header.jsx";
import Breadcrumb from "../components/Breadcrums.jsx";
import Marquee from "../components/Marquee.jsx";
import { UserContext } from "../context/UserContext.jsx";
import ProductItem from "../components/ProductItem.jsx";

const Favourite = () => {
  const { wishlist } = useContext(UserContext);

  return (
    <div className="flex flex-col mt-[80px] w-full absolute bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <Marquee />
      <div className="pl-10 pt-5 pb-5 w-full">
        <Breadcrumb Home="Home" Favourite="Favourite" />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold text-gray-800 tracking-wide">
          Your Favourites
        </h1>
        <p className="text-gray-600 mt-2 text-lg font-[Poppins]">
          Curated items you love — browse, revisit, or add to your cart anytime.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-10 pb-16">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div
              key={item._id}
              className="transform hover:scale-[1.03] transition-all duration-300"
            >
              <ProductItem
                id={item._id}
                title={item.title}
                img={item.img}
                price={item.price}
                percentage={item.percentage}
                textColor="black"
                btnText="View"
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center text-center py-20">
            <h2 className="text-2xl md:text-3xl font-[Playfair_Display] font-semibold text-gray-700 mb-3">
              Your favourites list is empty
            </h2>
            <p className="text-gray-500 text-lg font-[Poppins] max-w-xl">
              Explore our latest collections and add your most loved items to this list.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourite;
