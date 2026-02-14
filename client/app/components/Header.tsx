// import Link from 'next/link';
// import React from 'react'
// import { CiShoppingCart } from "react-icons/ci";
// import { MdOutlinePersonOutline } from "react-icons/md";

// export const Header = () => {
//   return (
//        <div className='p-5 flex flex-col fixed top-0 left-0 z-50'>

//           <div className='bg-black w-full h-17 justify-around'>
//             <div className='flex'>
//               <img src="FoodIcon.png" className='w-11.5 h-9.25 mr-3' />
//               <div className='flex flex-col'>
//                 <div className='flex'>
//                   <p className='text-red-700 text-5 font-semibold'>Yam</p><p className='text-white text-5 font-semibold'>Yam</p>
//                 </div>
//                 <p className='text-white text-5 font-semibold'>Food Delivery</p>
//               </div>
//            <div className='flex gap-4 items-center'>
//               <a href="#" className="social-icon-box w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-gray-500 group">
//                 <i className="fa fa-linkedin text-[#595959] text-xl transition-all duration-500 group-hover:rotate-[360deg] group-hover:text-white"><CiShoppingCart /></i>
//               </a>
              
//               <a href="#" className="social-icon-box w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-gray-500 group">
//                 <i className="fa fa-linkedin text-[#595959] text-xl transition-all duration-500 group-hover:rotate-[360deg] group-hover:text-white"><MdOutlinePersonOutline /></i>
//               </a>

//            </div>
//           </div>
//             </div>
//           <img src="BG.png" className='w-full h-142.5' />
//       </div>
//   )
// }





// import Link from 'next/link';
// import React from 'react'
// import { CiShoppingCart } from "react-icons/ci";
// import { MdOutlinePersonOutline } from "react-icons/md";

// export const Header = () => {
//   return (
//     <div className='flex flex-col'>
//       {/* 1. Header хэсэг: fixed - бэхлэх, top-0 - дээд талд, 
//          z-50 - бүх зүйлийн дээр харагдуулах 
//       */}
//       <header className='fixed top-0 left-0 w-full bg-black/60 h-20 flex items-center justify-between px-10 z-50 shadow-lg'>
        
//         {/* Logo Section */}
//         <div className='flex items-center'>
//           <img src="FoodIcon.png" className='w-11 h-9 mr-3' alt="Logo" />
//           <div className='flex flex-col leading-tight'>
//             <div className='flex text-xl font-bold italic'>
//               <p className='text-red-700'>Yam</p>
//               <p className='text-white'>Yam</p>
//             </div>
//             <p className='text-white text-[10px] font-semibold tracking-widest uppercase'>Food Delivery</p>
//           </div>
//         </div>

//         {/* Icons Section */}
//         <div className='flex gap-4 items-center'>
          
//           {/* Shopping Cart Icon */}
//           <Link href="/cart" className="group w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-red-600">
//             <div className="text-[#595959] text-2xl transition-all duration-500 group-hover:rotate-[360deg] group-hover:text-white">
//               <CiShoppingCart />
//             </div>
//           </Link>
          
//           {/* Profile Icon */}
//           <Link href="/profile" className="group w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-red-600">
//             <div className="text-[#595959] text-2xl transition-all duration-500 group-hover:rotate-[360deg] group-hover:text-white">
//               <MdOutlinePersonOutline />
//             </div>
//           </Link>

//         </div>
//       </header>

//       {/* 2. Padding нэмэх: Header fixed болсон үед доорх контент нь 
//          header-ийнхээ ардуур орчихдог тул pt-20 (padding-top) нэмж өгнө.
//       */}
//       <div className='pt-20'>
//         <img src="BG.png" className='w-full h-auto' alt="Background" />
//       </div>
//     </div>
//   )
// }





"use client" // Client component гэдгийг зааж өгөх ёстой

import * as React from "react"
import Link from 'next/link'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes" // Theme-ийг удирдах hook
import { CiShoppingCart } from "react-icons/ci"
import { MdOutlinePersonOutline } from "react-icons/md"

// Shadcn UI компонентууд (Эдгээрийг суулгасан байх ёстой)
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const Header = () => {
  const { setTheme } = useTheme() // setTheme-ийг эндээс авна

  return (
    <div className='flex flex-col'>
      <header className='fixed top-0 left-0 w-full bg-black/60 dark:bg-zinc-900/80 backdrop-blur-md h-20 flex items-center justify-between px-10 z-50 shadow-lg'>
        
        {/* 1. Dark Mode Toggle */}
        <div className="flex items-center gap-4">

          {/* Logo Section */}
          <div className='flex items-center ml-4'>
            <img src="FoodIcon.png" className='w-11 h-9 mr-3' alt="Logo" />
            <div className='flex flex-col leading-tight'>
              <div className='flex text-xl font-bold italic'>
                <p className='text-red-700'>Yam</p>
                <p className='text-white'>Yam</p>
              </div>
              <p className='text-white text-[10px] font-semibold tracking-widest uppercase'>Food Delivery</p>
            </div>
          </div>
        </div>

        {/* 2. Right Icons Section */}
        <div className='flex gap-4 items-center'>
          <Link href="/cart" className="group w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-red-600">
            <div className="text-[#595959] text-2xl transition-all duration-500 group-hover:rotate-[360deg] group-hover:text-white">
              <CiShoppingCart />
            </div>
          </Link>
          
          <Link href="/profile" className="group w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-red-600">
            <div className="text-[#595959] text-2xl transition-all duration-500 group-hover:rotate-[360deg] group-hover:text-white">
              <MdOutlinePersonOutline />
            </div>
          </Link>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="bg-white/10 border-white/20 hover:bg-white/20">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-white" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className='pt-20'>
        <img src="BG.png" className='w-full h-auto' alt="Background" />
      </div>
    </div>
  )
}