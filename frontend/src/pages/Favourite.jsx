import React from 'react'
import Header from '../components/Header.jsx'
import Breadcrumb from '../components/Breadcrums.jsx'
import Marquee from '../components/Marquee.jsx'

const Favourite = () => {
  return (

    <div className='flex flex-col  mt-[80px]  w-full absolute'>
      <div className='pl-10 w-full'>
        <Breadcrumb Home="Home" Favourite="Favourite" />
      </div>
       <Marquee/>   
    </div>

  )
}

export default Favourite