import  { useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'
import { FaCartShopping } from "react-icons/fa6";
const Navbar = () => {

  const [userIcon, setUserIcon] = useState(false)
  const [cartIcon, setCartIcon] = useState(false)

  return (
    <>
      <div className={`${userIcon ? 'hidden' : ' md:grid bg-[#FAF9F6]  z-50  w-full h-20  grid-cols-3 '}`} >

        <div className=' flex items-center pl-10  '>
          <p className=' text-3xl font-serif text-red-700  max-md:hidden '>CR7</p>
        </div>

        <div className=' max-md:hidden flex max:md-20   rounded-3xl   mt-2 justify-evenly items-center ' >
          <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p className=' font-serif hover:text-black text-red-700  '>Home</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink to='/fashion' className='flex flex-col items-center gap-1'>
            <p className=' font-serif hover:text-black text-red-700' >Fashion</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink to='/wishlist' className='flex flex-col items-center gap-1'>
            <p className='font-serif hover:text-black text-red-700 ' >Wishlist</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
          <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p className='font-serif hover:text-black text-red-700' >Contact</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
        </div>

          <div className='flex items-center max-md:hidden gap-3 justify-end text-lg pr-10'>
          <NavLink to='/login'>
            <FaUser  className="cursor-pointer text-red-700 hover:text-black " />
          </NavLink>
          
          <FaCartShopping onClick={() => setCartIcon(true)} className='hover:text-black  cursor-pointer text-red-700'/>
        </div>
      </div>

      {/* sidebar small-screen */}
      <div className={` ${userIcon || cartIcon ? ' hidden' : 'md:hidden  items-center z-50 fixed w-full h-15 grid grid-cols-2 bg-transparent'}`}>
        <div className='font-sans text-xl   pl-5 '>
          {/* <img  alt=""  className='h-15 ' /> */}
          <p className=' text-1xl font-serif text-red-700 '>CR7</p>
        </div>
        <div className='pr-3 flex justify-end space-x-2 items-center text-sm'>
          <FaUser onClick={() => setUserIcon(true)} className="cursor-pointer text text-red-700" />
            <FaCartShopping onClick={() => setCartIcon(true)} className='mt-1 cursor-pointer text-red-700'/>
        </div>
      </div>
      {/* user icon  */}
      <div
        className={`fixed top-0 right-0 h-full bg-black/90 z-50 overflow-hidden transition-all duration-300 ease-in-out
    ${userIcon ? 'w-[50%]' : 'w-0'}
  `}
      >
        <div className='md:hidden flex flex-col text-white h-full'>
          <div onClick={() => setUserIcon(false)} className=' cursor-pointer'>
            <p className='text-white text-start p-3'>Back</p>
          </div>
          <NavLink onClick={() => setUserIcon(false)} className='py-2 pl-6' to='/'>HOME</NavLink>
          <NavLink onClick={() => setUserIcon(false)} className='py-2 pl-6' to='/shop'>SHOP</NavLink>
          <NavLink onClick={() => setUserIcon(false)} className='py-2 pl-6' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setUserIcon(false)} className='py-2 pl-6' to='/contact'>CONTACT</NavLink>
        </div>
      </div>

      {/* sidebar Cart  */}
      <div className={` fixed bg-black/90 z-50 text-white overflow-hidden h-full top-0 right-0 transition-all ease-in-out duration-300  ${cartIcon ? 'w-[50vw] md:w-[35vw] ' : 'w-0 '}`}>
        <div className=' flex flex-col text-white h-full'>
          <div onClick={() => setCartIcon(false)} className=' gap-4 p-3 cursor-pointer'>
            <p className='text-white text-start '>Back</p>
          </div>

        </div>
      </div>


    </>
  )
}

export default Navbar