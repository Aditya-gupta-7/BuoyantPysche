import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/clerk-react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Image from "./Image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => console.log(token));
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: "Mindfulness", path: "/mindfulness" },
    { name: "Self-Help", path: "/self-help" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div
      className="w-full h-16 md:h-20 flex items-center justify-between px-4 md:px-8 
      bg-gradient-to-r from-[#d6f3f0]/70 via-[#e8f7f4]/70 to-[#d4f0e3]/70 
      backdrop-blur-lg animate-gradient-x transition-all duration-1000 shadow-md rounded-full md:rounded-2xl"
    >
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 text-2xl font-serif font-bold text-gray-800"
      >
        <Image src="logo.png?v=2" alt="BuoyantPsyche logo" w={32} h={32} />
        <span className="hover:text-[#2f7c77] transition-colors duration-300">
          BuoyantPsyche
        </span>
      </Link>

      {/* Mobile Menu Button */}
      <div
        className="md:hidden text-2xl text-gray-800 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {open ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-16 right-0 w-2/3 h-screen 
        bg-gradient-to-b from-[#e8f7f4] via-[#d6f3f0] to-[#d4f0e3] 
        p-6 flex flex-col gap-6 transform transition-all duration-500 ease-in-out shadow-lg  
        ${open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
      >
        {navLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.path}
            className="text-lg font-medium text-gray-700 relative group"
            onClick={() => setOpen(false)}
          >
            {link.name}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#2f7c77] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-[#2f7c77] text-white hover:bg-[#256b66] transition">
              Join Us
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 font-medium">
        {navLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.path}
            className="relative group hover:text-[#2f7c77] transition-colors duration-300"
          >
            {link.name}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#2f7c77] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-[#2f7c77] text-white hover:bg-[#256b66] transition">
              Join Us
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
