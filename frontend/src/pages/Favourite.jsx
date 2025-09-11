import React from 'react'
import Header from '../components/Header.jsx'
import Breadcrumb from '../components/Breadcrums.jsx'
import Marquee from '../components/Marquee.jsx'

const Favourite = () => {
  return (

    <div className='flex flex-col  mt-[80px]  w-full absolute'>
      <Marquee />
      <div className="pl-10 pt-5 pb-5 w-full">
        <Breadcrumb Home="Home" Favourite="Favourite" />
      </div>
    </div>

  )
}

export default Favourite