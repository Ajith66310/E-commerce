import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Swiper.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// ✅ Import your images
import images from '../assets/images.js';

export default function App() {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={images.hero_img} alt="Fashion 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={images.bglanding} alt="Fashion 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={images.hero_img2} alt="Fashion 2" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
