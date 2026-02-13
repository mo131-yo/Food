import Link from 'next/link';
import React from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { MdOutlinePersonOutline } from "react-icons/md";

export const Header = () => {
  return (
       <div className='p-5 flex flex-col'>
          <div className='bg-black w-full h-17 justify-around'>
            <div className='flex'>
              <img src="FoodIcon.png" className='w-11.5 h-9.25 mr-3' />
              <div className='flex flex-col'>
                <div className='flex'>
                  <p className='text-red-700 text-5 font-semibold'>Yam</p><p className='text-white text-5 font-semibold'>Yam</p>
                </div>
                <p className='text-white text-5 font-semibold'>Food Delivery</p>
              </div>
           <div className='flex gap-4 items-center'>
             <div className='w-9 h-9 bg-white flex justify-center items-center rounded-3xl'>
              <CiShoppingCart  style={{width:"28px", height: "28px", color: "black"}}/>
             </div>
             <Link href={{}}>
                <div className='w-9 h-9 bg-white flex justify-center items-center rounded-3xl'>
                <MdOutlinePersonOutline  style={{width:"28px", height: "28px", color: "black"}} />
                </div>
             </Link>
           </div>
          </div>
            </div>
          <img src="BG.png" className='w-full h-142.5' />
      </div>
  )
}