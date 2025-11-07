import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Title = ({ text1, text2, bgcolor }) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const color = bgcolor ? "red" : "gray";

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      defaults: { ease: "power3.out" },
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1 }
    ).fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.4"
    );
  }, []);

  return (
    <div className="text-center mb-12 overflow-hidden">
      <h2
        ref={titleRef}
        className={`text-3xl md:text-4xl lg:text-5xl font-[Playfair_Display] font-bold text-${color}-900 tracking-tight`}
      >
        {text1}
      </h2>
      <p
        ref={subtitleRef}
        className="mt-3 text-gray-500 text-sm md:text-base uppercase tracking-wide"
      >
        {text2}
      </p>
    </div>
  );
};

export default Title;
