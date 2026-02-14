import React from 'react'
import Marquee from "react-fast-marquee";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const word = "Fresh fast delivered "
const repeatCount = 10;
const repeatWord = Array(repeatCount).fill(word);

export const Footer = () => {
  return (
    <div className='bg-black w-full relative overflow-hidden flex flex-col'>
        
        {/* Анимацын CSS */}
        <style>
          {`
            @keyframes myfirst {
              0% { left: -25%; }
              100% { left: 100%; }
            }
            .animate-ongots { animation: myfirst 18s linear infinite; }
            .animate-car { animation: myfirst 22s linear infinite; }
            .animate-bike { animation: myfirst 30s linear infinite; }
            .animate-moto { animation: myfirst 26s linear infinite; }
          `},
           {`

            @keyframes moving {

              0% { left: -25%; }

              100% { left: 100%; }

            }

            .animate-delivery-fast { animation: moving 15s linear infinite; }

            .animate-delivery-slow { animation: moving 25s linear infinite; }

            .animate-delivery-normal { animation: moving 20s linear infinite; }



            @keyframes ongots {
        0% { left: -30%; transform: translateY(0px); }
        50% { transform: translateY(-20px); } /* Нисэж байгаа мэт бага зэрэг дээш доош хөдөлгөөн */
        100% { left: 110%; transform: translateY(0px); }
      }



            /* Icon Rotate Animation - Bootstrap стилийг Tailwind-тэй хослуулав */

            .social-icon-box:hover i {

              transform: rotate(360deg);

              transition: all 0.6s ease;

              color: white !important;

            }

          `}
        </style>
         

        {/* 1. ДЭЭД ХЭСЭГ: Улаан дэвсгэртэй Marquee */}
        <div className='bg-red-500 w-full py-6 z-20'>
          <Marquee speed={100} gradient={false}>
            {repeatWord.map((item, index) => (
              <h2 key={index} className='text-white font-bold text-6xl md:text-8xl mx-10'> 
                {item} 
              </h2>
            ))}
          </Marquee>
        </div>

        {/* 2. ДООД ХЭСЭГ: Logo болон Анимац (Машин, дугуй) */}
        <div className='relative w-full h-[755px] bg-black'>
          
          {/* Logo Section - Анимацын дээр харагдахаар байрлууллаа */}
          <div className='relative z-10 flex p-10 items-center justify-center md:justify-start'>
            <img src="FoodIcon.png" className='w-12 h-10 mr-3' alt="Food Icon" />
            <div className='flex flex-col'>
              <div className='flex leading-tight text-3xl font-bold italic'>
                <p className='text-red-700'>Yam</p>
                <p className='text-black'>Yam</p>
              </div>
              <p className='text-gray-500 text-sm font-bold tracking-widest uppercase'>Food Delivery</p>
            </div>
          </div>

         {/* Меню болон Сошиал хэсэг */}
<div className='relative z-10 flex flex-col md:flex-row justify-between items-start p-10 gap-10'>
  
  {/* Link-үүд */}
  <div className='flex flex-col gap-3'>
      <p className='text-red-500 font-bold text-xl mb-2 tracking-tighter'>YAMYAM</p>
      <a href="#" className='text-white hover:text-red-500 transition-colors duration-300 font-medium'>Home</a>
      <a href="#" className='text-white hover:text-red-500 transition-colors duration-300 font-medium'>Contact us</a>
      <a href="#" className='text-white hover:text-red-500 transition-colors duration-300 font-medium'>Delivery zone</a>
  </div>
    <div className='flex flex-col gap-3'>
      <p className='text-red-500 font-bold text-xl mb-2 tracking-tighter'>MENU</p>
      <a href="#" className='text-white hover:text-red-500 transition-colors duration-300 font-medium'>Home</a>
      <a href="#" className='text-white hover:text-red-500 transition-colors duration-300 font-medium'>Contact us</a>
      <a href="#" className='text-white hover:text-red-500 transition-colors duration-300 font-medium'>Delivery zone</a>
  </div>

  {/* Сошиал иконууд */}
  <div className='flex flex-col gap-4 items-center md:items-end'>
    <h4 className='text-white font-bold uppercase text-xs tracking-[0.2em]'>Follow Us</h4>
    
    <div className='flex gap-4'>
      {/* Facebook */}
      <a href="#" className="social-icon-box w-12 h-12 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-[#3B5998] group">
        <i className="fa fa-facebook text-[#595959] text-xl transition-all duration-500 group-hover:rotate-[360deg] group-hover:text-white">
          <FaFacebook />
        </i>
      </a>
      {/* LinkedIn */}
      <a href="#" className="social-icon-box w-12 h-12 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-gray-500 group">
        <i className="fa fa-linkedin text-[#595959] text-xl transition-all duration-500 group-hover:rotate-[360deg] group-hover:text-white"><FaGithub /></i>
      </a>

      {/* Instagram */}
      <a href="#" className="social-icon-box w-12 h-12 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-[#E1306C] group">
        <i className="fa fa-instagram text-[#595959] text-xl transition-all duration-500 group-hover:rotate-[360deg] group-hover:text-white"><FaInstagram /></i>
      </a>
    </div>
  </div>
</div>

<div className='border-t border-white/30 mr-20 ml-20'></div>

          {/* Animation Area - Хамгийн доор байрлана */}
          <div className="absolute bottom-0 left-0 w-full h-[266px] pointer-events-none">
               <div className="absolute bottom-[250px] w-[288px] h-[160px] animate-ongots bg-no-repeat bg-contain z-0"
                  style={{ backgroundImage: "url('https://media2.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3azl6NzV2d2wzbmdtNTl4OHJibXU0NTNoeGYwZHpnbHRoYnN3aWdmbCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/dpgP3EIluED4FOXScQ/giphy.webp')" }}>
              </div>
            {/* Background (City) */}
            <div className="absolute inset-0 bg-repeat-x bg-bottom h-full w-full" 
              style={{ 
                backgroundImage: "url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigB8iI5tb8WSVBuVUGc9UjjB8O0708X7Fdic_4O1LT4CmLHoiwhanLXiRhe82yw0R7LgACQ2IhZaTY0hhmGi0gYp_Ynb49CVzfmXtYHUVKgXXpWvJ_oYT8cB4vzsnJLe3iCwuzj-w6PeYq_JaHmy_CoGoa6nw0FBo-2xLdOPvsLTh_fmYH2xhkaZ-OGQ/s16000/footer_bg.png')",
                backgroundSize: 'auto 100%'
              }}>
            </div>
            
            {/* Car Animation */}
            <div className="absolute bottom-0 w-[330px] h-[105px] animate-car bg-no-repeat bg-contain"
              style={{ backgroundImage: "url('https://media4.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NXZmMjA2MjVxdXJyc2dtNmUwcjRkajBwOXQ1cTQzMGhteW4xZ2x3ayZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/gKx8NdL6pZIcsGmJHL/200.webp')" }}>
            </div>

            {/* Bike Animation */}
            <div className="absolute bottom-0 w-[88px] h-[100px] animate-bike bg-no-repeat bg-contain"
              style={{ backgroundImage: "url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyLGwEUVwPK6Vi8xXMymsc-ZXVwLWyXhogZxbcXQYSY55REw_0D4VTQnsVzCrL7nsyjd0P7RVOI5NKJbQ75koZIalD8mqbMquP20fL3DxsWngKkOLOzoOf9sMuxlbyfkIBTsDw5WFUj-YJiI50yzgVjF8cZPHhEjkOP_PRTQXDHEq8AyWpBiJdN9SfQA/s16000/cyclist.gif')" }}>
            </div>
            

            <div className="absolute bottom-0 w-[168px] h-[120px] animate-moto bg-no-repeat bg-contain"
              style={{ backgroundImage: "url('https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTJ5ZDVkeWFlMjFqc2JxNHNqNWhnd3l0cjJxc3diMG10cm81OHl0bCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/LcCmLpLLF84xBvThSv/giphy.webp')" }}>
            </div>
          </div>

        </div>

        {/* 3. ХАМГИЙН ДООД ХЭСЭГ: Зохиогчийн эрх */}
        <div className='bg-black py-4 text-center text-gray-400 text-xs border-t border-gray-100 relative z-30'>
          © 2026 YamYam Food Delivery created by mo131-yo.
        </div>    
    </div>
  )
}