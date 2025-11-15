import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Bestseller from "../components/Bestseller.jsx";
import Latestproducts from "../components/Latestproducts";
import SwiperSlider from "../components/SwiperSlider.jsx";
import Contact from "../components/Contact.jsx";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sliderRef.current,
      start: "top top",
      end: "+=150%", 
      pin: true,
      pinSpacing: false,
    });
  }, []);

  return (
    <div ref={containerRef} style={{ background: "#fff" }}>
      {/* PINNED SECTION */}
      <div ref={sliderRef}>
        <SwiperSlider />
      </div>

      {/* SECTIONS THAT WILL COVER SLIDER */}
      <div style={{ background: "#fff", position: "relative", zIndex: 10 }}>
        <Latestproducts />
        <Bestseller />
        <Contact />
      </div>
    </div>
  );
};

export default Home;
