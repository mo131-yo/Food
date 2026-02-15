"use client"

import * as React from "react"
import Link from 'next/link'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { CiShoppingCart } from "react-icons/ci"
import { MdOutlinePersonOutline } from "react-icons/md"
import { ThemeToggle } from "./Theme"
import { FaConciergeBell } from "react-icons/fa";
import { FaHandHolding } from "react-icons/fa";

export const Header = () => {
  const { setTheme } = useTheme()

  return (
    <div className='flex flex-col'>
    <style dangerouslySetInnerHTML={{ __html: `
  /* Icon Rotate Animation */
  .social-icon-box i, 
  .social-icon-box svg {
    transition: all 0.6s ease;
  }

  .social-icon-box:hover i,
  .social-icon-box:hover svg {
    transform: rotate(360deg);
  }

  /* Light mode hover өнгө */
  .social-icon-box:hover i {
    color: black !important;
  }

  /* Dark mode hover өнгө (HTML tag дээр .dark класс байгаа үед) */
  .dark .social-icon-box:hover i {
    color: white !important;
  }
`}} />
      <header className='fixed top-0 left-0 w-full bg-black/60 dark:bg-black backdrop-blur-md h-20 flex items-center justify-between px-10 z-50 shadow-lg'>
        
        <div className="flex items-center gap-4"> 

          <div className='flex items-center ml-4'>
            <img src="FoodIcon.png" className='w-11 h-9 mr-3 dark:hidden' alt="Logo" />
            <img src="yellow.png" className='w-19 h-14 mr-3 relative right-3 hidden dark:block' alt="Logo" />
            <div className='flex flex-col leading-tight'>
              <div className='flex text-xl font-bold italic'>
                <p className='text-red-700 dark:text-yellow-500'>Yam</p>
                <p className='text-white'>Yam</p>
              </div>
              <p className='text-white text-[10px] font-semibold tracking-widest uppercase'>Food Delivery</p>
            </div>
          </div>
        </div>

        <div className='flex gap-4 items-center'>
          <Link href="/cart" className="group w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-red-600 dark:hover:bg-yellow-600">
            <div className="text-[#595959] text-2xl transition-all duration-500 group-hover:rotate-[360deg] group-hover:text-white">
              <CiShoppingCart />
            </div>
          </Link>
          
          <Link href="/profile" className="group w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-red-600 dark:hover:bg-yellow-600">
            <div className="text-[#595959] text-2xl transition-all duration-500 group-hover:rotate-[360deg] group-hover:text-white">
              <MdOutlinePersonOutline />
            </div>
          </Link>
          <ThemeToggle/>
        </div>
      </header>

      <div className='pt-20'>
        <img src="BG.png" className='w-full h-auto dark:hidden' alt="Background" />
        <img src="BGy.png"className='w-full h-auto hidden dark:block' alt="Background" />
      </div>
    </div>
  )
}