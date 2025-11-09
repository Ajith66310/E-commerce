import React from 'react'


import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/src/ScrollTrigger'

const BonkersCornerAnimation = () => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.to("#hero #brand-name", {
      color: "red",
      ease: "power1.inOut",
      transform: "translate(-270%)",
      scrollTrigger: {
        trigger: "#hero",
        start: "top 0",
        end: "top -100%",
        scrub: true,
        pin: true,
      }
    })
  }, [])
  return (
    <div id="hero" className=" w-full h-[100vh] overflow-hidden  bg-[#FAF9F6] flex">
      <p id='brand-name' className='pt-[2vw] pl-10 text-[350px] font-extrabold w-[40vw] '>BONKERSCORNER</p>
    </div>
  )
}

export default BonkersCornerAnimation
