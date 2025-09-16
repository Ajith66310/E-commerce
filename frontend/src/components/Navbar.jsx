import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { CiShoppingCart } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { CiLogin } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";


const Navbar = () => {


  const [userIcon, setUserIcon] = useState(false)
  const [cartIcon, setCartIcon] = useState(false)
  const navigate = useNavigate();


  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo("#brand-name,#nav-items", {
      opacity: 0,
      y: 20,
      ease: "power3.inOut",
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.5,
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


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const token = localStorage.getItem("token");
   
  return (
    <>
      <div className={`${userIcon ? 'hidden' : ' bg-[transparent] absolute z-50  md:h-20 w-full grid md:grid-cols-3  '}`} >

        <div id='brand-name' className=' flex items-center  lg:pl-10 md:pl-0'>
          <p className=' lg:text-3xl font-serif text-red-800  max-md:hidden font-extrabold md:text-[20px] '>BONKERS CORNER</p>
        </div>

        <div id='nav-links' className=' max-md:hidden flex max:md-20  justify-center  gap-3 items-center' >
          <NavLink to='/' className='flex flex-col items-center '>
            <p className=' font-serif hover:text-red-900 text-red-800   '>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-800 hidden' />
          </NavLink>
          <NavLink to='/fashion' className='flex flex-col items-center '>
            <p className=' font-serif hover:text-red-900 text-red-800 ' >FASHION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-800 hidden' />
          </NavLink>
          <NavLink to='/favourite' className='flex flex-col items-center '>
            <p className='font-serif hover:text-red-900 text-red-800 ' >FAVOURITE</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-800 hidden' />
          </NavLink>
          <NavLink to='/contact' className='flex flex-col items-center '>
            <p className='font-serif hover:text-red-900 text-red-800 ' >CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-800 hidden' />
          </NavLink>
        </div>

        <div id='nav-items' className='flex items-center max-md:hidden gap-3  justify-end text-2xl  pr-10'>
          {(
            token ?
            <IoIosLogOut className="cursor-pointer text-red-800 hover:text-red-900 " onClick={handleLogout} />
            :
            <NavLink to='/login'>
              <div className='bg-red-800 w-20 rounded-sm hover:rounded-lg flex items-center justify-center '>
              <button className=' text-white font-[poppins] cursor-pointer text-lg'>Login</button>
              </ div>
              </NavLink>
          )
        }
        <CiShoppingCart onClick={() => setCartIcon(true)} className='hover:text-red-900 text-3xl cursor-pointer text-red-800' />
{          token &&

          <NavLink to="/userprofile">
          <GoPerson className="cursor-pointer text-red-800 hover:text-red-900 " />
          </NavLink>
          }
      </div>
      </div>

      {/* sidebar small-screen */}
      <div className={` ${userIcon || cartIcon ? ' hidden' : 'md:hidden  items-center z-50 absolute w-full h-15 grid grid-cols-2 bg-transparent'}`}>
        <div className='font-sans text-xl   pl-5 '>
          {/* <img  alt=""  className='h-15 ' /> */}
          <p className=' text-2xl font-serif text-red-800 '>BONKERS CORNER</p>
        </div>
        <div className='pr-3 flex justify-end space-x-2 items-center text-sm'>
          <CiShoppingCart onClick={() => setCartIcon(true)} className='hover:text-red-900 text-3xl cursor-pointer text-red-800' />
            
          <GoPerson onClick={() => setUserIcon(true)} className="cursor-pointer hover:text-red-900 text text-red-800 text-2xl" />
        </div>
      </div>
      <div
        className={`fixed top-0 right-0 h-full bg-black/90 z-50 overflow-hidden transition-all duration-300 ease-in-out
    ${userIcon ? 'w-[50%]' : 'w-0'}
  `}
      >
        <div className='md:hidden flex flex-col text-white h-full'>
          <div onClick={() => setUserIcon(false)} className=' cursor-pointer'>
            <p className='text-white text-start p-3'>Back</p>
            {
              token ?
                <IoIosLogOut className=" absolute top-3 right-5 cursor-pointer text-2xl hover:text-red-900 " onClick={handleLogout} />
                :
                <NavLink to='/login'>
                  <CiLogin className=" absolute top-3 right-5 cursor-pointer text-2xl hover:text-green-900 " />
                </NavLink>
            }
          </div>
          <NavLink onClick={() => setUserIcon(false)} className='py-2 pl-6' to='/'>HOME</NavLink>
          <NavLink onClick={() => setUserIcon(false)} className='py-2 pl-6' to='/fashion'>FASHION</NavLink>
          <NavLink onClick={() => setUserIcon(false)} className='py-2 pl-6' to='/favourite'>FAVOURITE</NavLink>
          <NavLink onClick={() => setUserIcon(false)} className='py-2 pl-6' to='/contact'>CONTACT</NavLink>
        </div>
      </div>

      {/* sidebar Cart  */}
{/* sidebar Cart */}
<div
  className={`fixed bg-white z-50 text-black overflow-y-auto h-full top-0 right-0 transition-all ease-in-out duration-300 
    ${cartIcon ? 'w-[80vw] md:w-[35vw]' : 'w-0'}
  `}
>
  <div className="flex flex-col h-full">
    {/* Header */}
    <div className="flex justify-between items-center p-4 border-b">
      <p className="font-semibold text-lg">Your Bag</p>
      <button
        onClick={() => setCartIcon(false)}
        className="text-red-600 text-xl"
      >
        ✕
      </button>
    </div>

    {/* Cart Items */}
    <div className="flex-1 p-4 space-y-4">
      {/* Example Product */}
      <div className="flex gap-4 items-center border-b pb-4">
        {/* Product image */}

        <img
          
          alt="product"
          className="w-24 h-28 object-cover rounded"
        />

        <div className="flex-1">
          <p className="font-medium">Oversized T-shirt</p>
          <p className="text-sm text-gray-500">Black</p>

          {/* Size selector */}
          <div className="mt-2 flex gap-2">
            {['S', 'M', 'L', 'XL'].map((size) => (
              <button
                key={size}
                className="px-2 py-1 border rounded text-sm hover:bg-gray-100"
              >
                {size}
              </button>
            ))}
          </div>

          {/* Quantity selector */}
          <div className="mt-2 flex items-center gap-2">
            <button className="px-2 py-1 border rounded">-</button>
            <span className="px-3">1</span>
            <button className="px-2 py-1 border rounded">+</button>
          </div>
        </div>

        {/* Price */}
        <p className="font-semibold">₹999</p>
      </div>

      {/* More products here */}
    </div>

    {/* Cart Totals */}
    <div className="p-4 border-t">
      <div className="flex justify-between">
        <span className="font-medium">Cart Subtotal</span>
        <span>₹1,999</span>
      </div>
      <div className="flex justify-between text-green-600">
        <span>You Saved</span>
        <span>₹300</span>
      </div>
      <div className="flex justify-between font-bold text-lg mt-2">
        <span>Total</span>
        <span>₹1,699</span>
      </div>

      {/* Buttons */}
      <button className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800 transition mt-4">
        Proceed to Checkout
      </button>
      <button
        onClick={() => setCartIcon(false)}
        className="w-full border border-green-700 text-green-700 py-3 rounded hover:bg-green-50 transition mt-2"
      >
        Continue Shopping
      </button>
    </div>
  </div>
</div>


    </>
  )
}

export default Navbar