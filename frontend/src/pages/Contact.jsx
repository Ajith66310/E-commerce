import React from 'react'
import { useState } from 'react'
import Breadcrumb from '../components/Breadcrums.jsx'

const Contact = () => {



  return (
    <div className='flex flex-col  mt-[80px]  w-full absolute'>
       <div className='pl-10 w-full  bg-red-50'>
          <Breadcrumb Home="Home" Contact="Contact" />
        </div>
    </div>
  )
}

export default Contact