// src/pages/Favourite.jsx
import React, { useContext } from "react";
import Header from "../components/Header.jsx";
import Breadcrumb from "../components/Breadcrums.jsx";
import Marquee from "../components/Marquee.jsx";
import { UserContext } from "../context/UserContext.jsx";
import ProductItem from "../components/ProductItem.jsx";

const Favourite = () => {
  const { wishlist } = useContext(UserContext);

  return (
    <div className="flex flex-col mt-[80px] w-full absolute">
      <Marquee />
      <div className="pl-10 pt-5 pb-5 w-full">
        <Breadcrumb Home="Home" Favourite="Favourite" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-10 pb-10">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              title={item.title}
              img={item.img}
              price={item.price}
              percentage={item.percentage}
              textColor="black"
              btnText="View"
            />
          ))
        ) : (
          <p className="text-center w-full text-gray-500 text-lg col-span-full">
            No favourites yet ❤️
          </p>
        )}
      </div>
    </div>
  );
};

export default Favourite;
