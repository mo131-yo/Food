"use client"

import Link from 'next/link'
import { useTheme } from "next-themes"
import { CiShoppingCart } from "react-icons/ci"
import { MdOutlinePersonOutline } from "react-icons/md"
import { ThemeToggle } from "./Theme"
import { useState } from 'react'
import { AddressModal } from './AddressModal'
import { useCart } from './CartProvider'

export const Header = () => {
 const { cart } = useCart();
 const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
//   return (
//     <div className='flex flex-col'>
//     <style dangerouslySetInnerHTML={{ __html: `
//       .social-icon-box i, 
//       .social-icon-box svg {
//         transition: all 0.6s ease;
//       }

//       .social-icon-box:hover i,
//       .social-icon-box:hover svg {
//         transform: rotate(360deg);
//       }

//       .social-icon-box:hover i {
//         color: black !important;
//       }

//       .dark .social-icon-box:hover i {
//         color: white !important;
//       }
//     `}} />
//       <header className='fixed top-0 left-0 w-full bg-black/60 dark:bg-black backdrop-blur-md h-20 flex items-center justify-between px-10 z-50 shadow-lg'>
        
//         <div className="flex items-center gap-4"> 

//           <div className='flex items-center ml-4'>
//             <img src="FoodIcon.png" className='w-11 h-9 mr-3 dark:hidden' alt="Logo" />
//             <img src="yellow.png" className='w-19 h-14 mr-3 relative right-3 hidden dark:block' alt="Logo" />
//             <div className='flex flex-col leading-tight'>
//               <div className='flex text-xl font-bold italic'>
//                 <p className='text-red-700 dark:text-yellow-500'>Yam</p>
//                 <p className='text-white'>Yam</p>
//               </div>
//               <p className='text-white text-[10px] font-semibold tracking-widest uppercase'>Food Delivery</p>
//             </div>
//           </div>
//         </div>

//         <div className='flex gap-4 items-center'>
//           <Link href="#" className="group w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-red-600 dark:hover:bg-yellow-600">
//             <div className="text-[#595959] text-2xl transition-all duration-500 group-hover:rotate-360 group-hover:text-white">
//               <CiShoppingCart />
//             </div>
//           </Link>
          
//           <Link href="/login" className="group w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-red-600 dark:hover:bg-yellow-600">
//             <div className="text-[#595959] text-2xl transition-all duration-500 group-hover:rotate-360 group-hover:text-white">
//               <MdOutlinePersonOutline />
//             </div>
//           </Link>
//           <ThemeToggle/>
//         </div>
//       </header>

//       <div className='pt-20'>
//         <img src="BG.png" className='w-full h-auto dark:hidden' alt="Background" />
//         <img src="BGy.png"className='w-full h-auto hidden dark:block' alt="Background" />
//       </div>

//     </div>
//   )
// }



return (
    <header className="flex justify-between items-center p-4 bg-white border-b">
      <Link href="/" className="font-bold text-red-600 text-2xl">YamYam</Link>

      <div className="flex items-center gap-4">
        {/* Сагс */}
        <Link href="/cart" className="relative p-2 bg-gray-100 rounded-full">
          🛒 {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full px-1.5">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Профайл икон - Энд дарвал Sign Up эхний алхам руу үсэрнэ */}
        <Link href="/sign-up" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" 
            strokeWidth={1.5} stroke="currentColor" 
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </Link>
      </div>
    </header>
  );
};