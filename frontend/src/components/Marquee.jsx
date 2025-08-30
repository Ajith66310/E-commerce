import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Marquee = () => {
  useGSAP(() => {
    function marqueAnimation() {
      window.addEventListener('wheel', function (dets) {
        if (dets.deltaY > 0) {
          gsap.to(".marque", {
            xPercent: -200,
            repeat: -1,
            duration: 8,
            ease: "none",
          })

          gsap.to(".marque img", {
            rotate: 180,
          })
        } else {
          gsap.to(".marque", {
            xPercent: 0,
            repeat: -1,
            duration: 8,
            ease: "none",
          })

          gsap.to(".marque img", {
            rotate: 0,
          })
        }
      })
    }
    marqueAnimation()
  }, [])

  return (
    <div id="page" className="h-20 mt-5 overflow-hidden">
      <div
        id="move"
        className="flex bg-red-50 gap-5 justify-start whitespace-nowrap items-center"
      >
        {Array(12).fill(null).map((_, i) => (
          <div
            key={i}
            className="marque flex gap-4 items-center shrink-0"
          >
            <h1 className="text-2xl text-red-900 font-[mono] font-extrabold">10% Discount On New Arrivals</h1>
            <img
              src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
              alt="arrow"
              className="w-5 h-5"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Marquee
