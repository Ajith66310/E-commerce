// src/components/Marquee.jsx
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const Marquee = () => {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const SPEED = 120; // px per second
    let resizeTimer = null;

    const createTween = () => {
      if (tweenRef.current) tweenRef.current.kill();
      gsap.set(track, { x: 0, force3D: true });

      const contentWidth = track.scrollWidth / 2 || 0;
      if (!contentWidth) return;

      track.style.willChange = "transform";
      const duration = Math.max(1, contentWidth / SPEED);

      tweenRef.current = gsap.to(track, {
        x: -contentWidth,
        ease: "none",
        duration,
        repeat: -1,
        force3D: true,
      });

      tweenRef.current.timeScale(1);
    };

    const images = track.querySelectorAll("img");
    const notLoaded = Array.from(images).filter((img) => !img.complete);

    if (notLoaded.length > 0) {
      let remaining = notLoaded.length;
      notLoaded.forEach((img) =>
        img.addEventListener(
          "load",
          () => {
            remaining -= 1;
            if (remaining === 0) requestAnimationFrame(createTween);
          },
          { once: true }
        )
      );
    } else {
      requestAnimationFrame(createTween);
    }

    const onWheel = (e) => {
      if (!tweenRef.current) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      gsap.to(tweenRef.current, { timeScale: dir, duration: 0.25, overwrite: "auto" });
      gsap.to(track.querySelectorAll(".marque img"), {
        rotation: dir > 0 ? 180 : 0,
        duration: 0.35,
        overwrite: "auto",
      });
    };

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        createTween();
      }, 200);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      if (tweenRef.current) tweenRef.current.kill();
      track.style.willChange = "";
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div className="relative w-full mt-5 selection:bg-red-600 selection:text-white">
      {/* Marquee container with hidden edges */}
      <div
        ref={wrapperRef}
        className="relative mx-[10px] h-14 overflow-hidden bg-red-50 flex items-center rounded"
      >
        {/* Left + right wall effect */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-red-50 to-transparent z-10" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-red-50 to-transparent z-10" />

        <div ref={trackRef} className="flex gap-5 whitespace-nowrap items-center">
          {[0, 1].map((rep) =>
            Array.from({ length: 12 }).map((_, i) => (
              <div key={`${rep}-${i}`} className="marque flex gap-4 items-center shrink-0">
                <h1 className="text-2xl text-red-900 font-[mono] font-extrabold">
                  10% Discount On New Arrivals
                </h1>
                <img
                  src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
                  alt="arrow"
                  className="w-5 h-5"
                  draggable="false"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
