import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./Swiper.css";
import { Pagination, Autoplay } from "swiper/modules";
import images from "../assets/images.js";

export default function App() {
  return (
    <div className="w-full">
      <Swiper
        pagination={{ dynamicBullets: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[85vh] lg:h-[100vh] overflow-hidden">
            <img
              src={images.hero_img2}
              alt="Fashion 1"
              className="w-full h-full object-cover object-top" 
            />
            <div className="absolute bottom-8 left-4 sm:left-10 text-white drop-shadow-lg">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">
                Men’s Collection
              </h2>
              <p className="text-sm sm:text-base md:text-lg">
                Shop the latest trends
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[85vh] lg:h-[100vh] overflow-hidden">
            <img
              src={images.hero_img4}
              alt="Fashion 2"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute bottom-8 left-4 sm:left-10 text-white drop-shadow-lg">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">
                Women’s Fashion
              </h2>
              <p className="text-sm sm:text-base md:text-lg">
                Discover your style
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[85vh] lg:h-[100vh] overflow-hidden">
            <img
              src={images.hero_img6}
              alt="Fashion 3"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute bottom-8 left-4 sm:left-10 text-white drop-shadow-lg">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">
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
