import React from 'react'
import Header from '../components/Header'
import { useState } from 'react'

const Contact = () => {

  const [visible, setVisible] = useState(false)

  return (
    <>
      <button onClick={() => {
        setVisible(true)
      }} className='border border-black'> make visible</button>
      {
        visible === true ?
          <div className=' flex justify-center items-center '>
            <form action=" " className='w-50 h-50 bg-yellow-200 m-5 '>
              <input type="text" className='border border-black ' />
              <input type="text" className='border border-black ' />
              <button onClick={() => {
                setVisible(false)
              }} className='border  border-black'>Submit</button>
            </form>
          </div> : ''
      }
    </>
  )
}

export default Contact