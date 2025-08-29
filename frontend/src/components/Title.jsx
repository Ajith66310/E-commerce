
import React, { useContext } from 'react'



const Title = ({ text1, text2 }) => {

 


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