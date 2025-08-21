import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/src/ScrollTrigger'
import React, { useContext } from 'react'



const Title = ({ text1, text2 }) => {

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from("#txt1 ", {
      opacity: 0,
      scrollTrigger:{
        trigger:"#headings-1",
        start:"top 95%",
        scrub:true,
      }
    })
  }, [])


  return (
    <>
      <div id="headings-1" className='text-center text-red-600   m-5'>
        <p id="txt1" className='font-extrabold text-3xl font-serif ' >{text1}</p>
        <p  className='font-extrabold text-1xl font-mono'>{text2}</p>
      </div>

    </>
  )
}

export default Title