import React from 'react'
import Marquee from "react-fast-marquee";

const word= "Fresh fast delivered "
const repeatCount = 10;
  const repeatWord = Array(repeatCount).fill(word);

export const Footer = () => {
  return (
    <div className='bg-black w-full h-188.75'>
        <div className='bg-red-500 relative top-15 w-full h-23'>
          <Marquee speed={100} gradient={false}>
            {repeatWord.map((item, index) => (
              <h2 key={index} className='text-white font-semibold text-8xl mx-10'> 
                {item} 
              </h2>
            ))}
           </Marquee>
            <div className='flex p-5'>
              <img src="FoodIcon.png" className='w-11.5 h-9.25 mr-3' />
              <div className='flex flex-col'>
                <div className='flex'>
                  <p className='text-red-700 text-5 font-semibold'>Yam</p><p className='text-white text-5 font-semibold'>Yam</p>
                </div>
                <p className='text-white text-5 font-semibold'>Food Delivery</p>
              </div>
            </div>
        </div>
    </div>
  )
}
