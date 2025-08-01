import React, { useContext } from 'react'



const Title = ({text1,text2}) => {
  

  return (
    <>
<div className='text-center text-red-600   m-5'>
  <p className='font-extrabold text-3xl font-serif   animate-pulse' >{text1}</p>
  <p className='font-extrabold text-1xl font-mono'>{text2}</p>
</div>

    </>
  )
}

export default Title