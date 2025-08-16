import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Swiper.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

// Import your images
import images from "../assets/images.js";

export default function App() {
  return (
    <div className="w-full">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative w-full h-[40vh] sm:h-[60vh] md:h-[80vh] lg:h-[100vh]">
            <img
              src={images.hero_img}
              alt="Fashion 1"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-10 left-5 sm:left-10 text-white">
              <h2 className="text-xl sm:text-3xl md:text-5xl font-bold">
                Men’s Collection
              </h2>
              <p className="text-sm sm:text-base md:text-lg">
                Shop the latest trends
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[40vh] sm:h-[60vh] md:h-[80vh] lg:h-[100vh]">
            <img
              src={images.bglanding}
              alt="Fashion 2"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-10 left-5 sm:left-10 text-white">
              <h2 className="text-xl sm:text-3xl md:text-5xl font-bold">
                Women’s Fashion
              </h2>
              <p className="text-sm sm:text-base md:text-lg">
                Discover your style
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[40vh] sm:h-[60vh] md:h-[80vh] lg:h-[100vh]">
            <img
              src={images.hero_img2}
              alt="Fashion 3"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-10 left-5 sm:left-10 text-white">
              <h2 className="text-xl sm:text-3xl md:text-5xl font-bold">
                New Arrivals
              </h2>
              <p className="text-sm sm:text-base md:text-lg">
                Fresh looks for every season
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
