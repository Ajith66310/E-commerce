import React from 'react'
import { useState } from 'react'
import Breadcrumb from '../components/Breadcrums.jsx'
import Marquee from '../components/Marquee.jsx'

const Contact = () => {



  return (
    <div className='flex flex-col  mt-[80px]  w-full absolute'>
       <div className='pl-10 w-full '>
          <Breadcrumb Home="Home" Contact="Contact" />
        </div>
         <Marquee/>   
    </div>
  )
}

export default Contact