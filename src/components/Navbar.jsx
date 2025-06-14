import React, { useEffect } from 'react'
// import { IKImage } from 'imagekitio-react';
import Image from './Image'
import { Link } from 'react-router'
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";

export default function Navbar() {
    const [open, setOpen] = React.useState(false)


    const {getToken} = useAuth()

    useEffect(() => {
      getToken().then(token=>console.log(token))
    }, [])

    return (
    <div className='w-full h-16 md:h-20 flex items-center justify-between'>
      {/* Logo */}
      <Link to='\' className='flex items-center gap-2 text-xl font-bold'>
        <Image src='logo.png' alt='logo' w={32} h={32}/>
        <span>adulogo</span>
      </Link>
      {/* mobile menu */}
      <div className='md:hidden'>
        {/* BUTTON */}
        <div className='cursor-pointer text-2xl font-bold' 
             onClick={() => setOpen(!open)}
        >
            {open ? "X" : "O"}
        </div>
        {/* link list */}
        <div className={`w-full h-screen  flex flex-col items-center justify-center gap-8 font-medium absolute top-16  ${open ? '-right-0' : '-right-full'} transition-all duration-500`}>
        <Link to="" className='hover:text-red-500'>Home</Link>
        <Link to="#" className='hover:text-red-500'>Trending</Link>
        <Link to="#" className='hover:text-red-500'>Most popular</Link>
        <Link to="#" className='hover:text-red-500'>About</Link>
        <Link to="/">
        <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>
          Login
        </button>
        </Link>
        </div>
      </div>
      <div className='hidden md:flex'>D</div>

      {/* desktop menu */}
      <div className='hidden md:flex items-center gap-8 xl:gap-12 font-medium'>
        <Link to="#" className='hover:text-red-500'>Home</Link>
        <Link to="#" className='hover:text-red-500'>Trending</Link>
        <Link to="#" className='hover:text-red-500'>Most popular</Link>
        <Link to="#" className='hover:text-red-500'>About</Link>
        
        <SignedOut>
        <Link to="/login">
         <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>
            Login 
          </button>
        </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        
      </div>
    </div>
  )
}
