// "use client"

// import Link from 'next/link'
// import { useTheme } from "next-themes"
// import { CiShoppingCart } from "react-icons/ci"
// import { MdOutlinePersonOutline } from "react-icons/md"
// import { ThemeToggle } from "./Theme"
// import { useState, useEffect } from 'react'
// import { AddressModal } from './AddressModal'
// import { useCart } from './CartProvider'
// import { useRouter } from 'next/navigation';

// export const Header = () => {

// const [isLoggedIn, setIsLoggedIn] = useState(false);

//  const { cart } = useCart();
//  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

//  const [user, setUser] = useState<{email: string} | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     // Хуудас ачаалагдах үед localStorage-оос токен шалгах
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleIconClick = () => {
//     if (isLoggedIn) {
//       // Хэрэв нэвтэрсэн бол Профайл эсвэл Хэрэглэгчийн тохиргоо руу
//       router.push('/profile'); 
//     } else {
//       // Хэрэв нэвтрээгүй бол Нэвтрэх хуудас руу
//       router.push('/login');
//     }
//   };

//   useEffect(() => {
//     // LocalStorage-оос хэрэглэгчийн мэдээллийг шалгах
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear(); // Бүх токеныг устгах
//     setUser(null);
//     router.push('/login');
//   };

//   return (
//     <div className='flex flex-col'>
//       <nav className="flex justify-between p-4 bg-white border-b">
//       <div className="font-bold cursor-pointer" onClick={() => router.push('/')}>FOOD APP</div>
//       <div>
//         {user ? (
//           <div className="flex gap-4 items-center">
//             <span className="text-sm font-medium">{user.email}</span>
//             <button onClick={handleLogout} className="text-red-500 text-sm">Гарах</button>
//           </div>
//         ) : (
//           <button onClick={() => router.push('/login')} className="bg-red-500 text-white px-4 py-2 rounded-lg">Нэвтрэх</button>
//         )}
//       </div>
//     </nav>
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
          
//           <Link href="/sign-up" className="group w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-red-600 dark:hover:bg-yellow-600">
//             <div className="text-[#595959] text-2xl transition-all duration-500 group-hover:rotate-360 group-hover:text-white">
//               <MdOutlinePersonOutline size={28} className={isLoggedIn ? "text-green-500" : "text-gray-400"} />
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



"use client"

import Link from 'next/link'
import { CiShoppingCart } from "react-icons/ci"
import { MdOutlinePersonOutline } from "react-icons/md"
import { ThemeToggle } from "./Theme"
import { useState, useEffect } from 'react'
import { useCart } from './CartProvider'
import { useRouter } from 'next/navigation';

export const Header = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const router = useRouter();

  useEffect(() => {
    // Хуудас ачаалагдах үед localStorage-оос хэрэглэгчийг шалгах
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleIconClick = () => {
    if (user) {
      // Хэрэв нэвтэрсэн бол шууд Profile руу үсэрнэ
      router.push('/profile');
    } else {
      // Нэвтрээгүй бол Login руу
      router.push('/login');
    }
  };

  return (
    <div className='flex flex-col'>
      <header className='fixed top-0 left-0 w-full bg-black/60 dark:bg-black backdrop-blur-md h-20 flex items-center justify-between px-10 z-50 shadow-lg'>
        
        {/* Лого хэсэг */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push('/')}> 
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

        {/* Баруун талын хэсэг */}
        <div className='flex gap-4 items-center'>
          
          {/* Сагс */}
          <Link href="/cart" className="relative group w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-red-600 dark:hover:bg-yellow-600">
            <div className="text-[#595959] text-2xl transition-all duration-500 group-hover:rotate-360 group-hover:text-white">
              <CiShoppingCart />
            </div>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          
          {/* Хэрэглэгчийн Icon - Дарахад шууд Profile эсвэл Login руу үсэрнэ */}
          <div 
            onClick={handleIconClick}
            className="group w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-red-600 dark:hover:bg-yellow-600 cursor-pointer"
          >
            <div className={`text-2xl transition-all duration-500 group-hover:rotate-360 
              ${user ? 'text-green-600' : 'text-[#595959] group-hover:text-white'}`}>
              <MdOutlinePersonOutline size={28} />
            </div>
          </div>

          <ThemeToggle/>
        </div>
      </header>

      {/* Background зураг */}
      <div className='pt-20'>
        <img src="BG.png" className='w-full h-auto dark:hidden' alt="Background" />
        <img src="BGy.png" className='w-full h-auto hidden dark:block' alt="Background" />
      </div>
    </div>
  )
}