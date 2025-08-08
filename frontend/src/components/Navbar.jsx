import { useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'
import { FaCartShopping } from "react-icons/fa6";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { CiShoppingCart } from "react-icons/ci";
import { GoPerson } from "react-icons/go";

const Navbar = () => {

  const [userIcon, setUserIcon] = useState(false)
  const [cartIcon, setCartIcon] = useState(false)

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo("#brand-name,#nav-items", {
      opacity: 0,
      y: 20,
      ease: "power3.inOut",
    }, {
      opacity: 1,
      y: 0,
      stagger:0.5,
      delay: 0.2,
    })

    tl.fromTo("#nav-links", {
      opacity: 0,
      y: -20,
      ease: "power1.inOut",
    }, {
      opacity: 2,
      y: 0,
    })
  }, [])

  return (
    <>
      <div className={`${userIcon ? 'hidden' : ' bg-[#FAF9F6]  z-50   md:h-20 w-full grid md:grid-cols-3  '}`} >

        <div id='brand-name' className=' flex items-center  pl-10 '>
          <p className=' text-3xl font-serif text-red-500  max-md:hidden font-extrabold'>BONKERS CORNER</p>
        </div>

        <div id='nav-links' className=' max-md:hidden flex max:md-20  justify-center  gap-3 items-center' >
          <NavLink to='/' className='flex flex-col items-center '>
            <p className=' font-serif hover:text-black text-red-500   '>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-500 hidden' />
          </NavLink>
          <NavLink to='/fashion' className='flex flex-col items-center '>
            <p className=' font-serif hover:text-black text-red-500 ' >FASHION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-500 hidden' />
          </NavLink>
          <NavLink to='/wishlist' className='flex flex-col items-center '>
            <p className='font-serif hover:text-black text-red-500 ' >FAVOURITE</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-500 hidden' />
          </NavLink>
          <NavLink to='/contact' className='flex flex-col items-center '>
            <p className='font-serif hover:text-black text-red-500 ' >CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-500 hidden' />
          </NavLink>
        </div>

        <div id='nav-items' className='flex items-center max-md:hidden gap-3  justify-end text-2xl  pr-10'>
          <NavLink to='/login'>
            <GoPerson className="cursor-pointer text-red-500 hover:text-black " />
          </NavLink>
          <CiShoppingCart onClick={() => setCartIcon(true)} className='hover:text-black text-3xl cursor-pointer text-red-500' />
          {/* <FaCartShopping  /> */}
        </div>
      </div>

      {/* sidebar small-screen */}
      <div className={` ${userIcon || cartIcon ? ' hidden' : 'md:hidden  items-center z-50 fixed w-full h-15 grid grid-cols-2 bg-transparent'}`}>
        <div className='font-sans text-xl   pl-5 '>
          {/* <img  alt=""  className='h-15 ' /> */}
          <p className=' text-1xl font-serif text-red-500 '>CR7</p>
        </div>
        <div className='pr-3 flex justify-end space-x-2 items-center text-sm'>
          <GoPerson onClick={() => setUserIcon(true)} className="cursor-pointer text text-red-500" />
          <CiShoppingCart onClick={() => setCartIcon(true)} className='mt-1 cursor-pointer text-red-500' />
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