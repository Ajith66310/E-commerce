import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

const Fashion = () => {
  const navigate = useNavigate()
  return (
     <>
     <button className='mt-20 ml-20 border-1 ' onClick={()=>{
    navigate(-1)
     }} >back</button>
     </>
  )
}

export default Fashion