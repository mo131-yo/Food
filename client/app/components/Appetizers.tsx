// import React from 'react';

// export const Appetizers = ({ foods = [] }: { foods: any[] }) => {
//   return (
//     <div className="py-10">
//       <h2 className='font-semibold text-3xl text-white mb-6'>Appetizers</h2>
//       <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
//         {foods.length > 0 ? (
//           foods.map((item) => {
//             // Зургийн замыг Senior түвшинд боловсруулах
//             // Хэрэв item.foodImage хоосон бол placeholder харуулна
//             const rawImage = item.foodImage || item.image; // Аль нэг нь байх магадлалтай
//             const imageUrl = rawImage?.startsWith('http') 
//               ? rawImage 
//               : `https://food-ahv2.onrender.com/${rawImage}`;

//             return (
//               <div key={item._id} className="bg-gray-900 border border-gray-800 p-4 rounded-2xl shadow-lg">
//                 <div className="relative h-48 w-full mb-4">
//                   <img 
//                     src={imageUrl} 
//                     alt={item.foodName} 
//                     className="w-full h-full object-cover rounded-xl"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src = "https://via.placeholder.com/300?text=No+Image"; 
//                     }}
//                   />
//                 </div>
//                 <h3 className="font-bold text-xl text-white">{item.foodName}</h3>
//                 <p className="text-red-500 font-bold text-lg mt-2">{item.foodPrice?.toLocaleString()}₮</p>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-gray-500 col-span-3 text-center py-10">Уншиж байна эсвэл хоол олдсонгүй...</p>
//         )}
//       </div> 
//     </div>
//   );
// };



// // components/Appetizers.tsx
// import React from 'react';

// export const Appetizers = ({ foods = [] }: { foods: any[] }) => {
//   return (
//     <div className="py-10">
//       <h2 className='font-semibold text-3xl text-white mb-6 uppercase tracking-wider'>Appetizers Menu</h2>
//       <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
//         {foods.length > 0 ? (
//           foods.map((item) => (
//             <div key={item._id} className="group bg-[#111] border border-gray-800 p-4 rounded-3xl transition-all hover:border-orange-500 shadow-2xl">
//               <div className="relative h-56 w-full mb-4 overflow-hidden rounded-2xl bg-gray-900">
//                 <img 
//                   // Хэрэв foodImage байхгүй бол default зураг харуулна
//                   src={item.foodImage || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"} 
//                   alt={item.foodName} 
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   onError={(e) => {
//                     // Хэрэв линк нь ажиллахгүй (Pinterest блоклуулсан) бол энийг харуулна
//                     (e.target as HTMLImageElement).src = "https://img.freepik.com/free-photo/delicious-food-isolated-white-background_1232-3532.jpg";
//                   }}
//                 />
//               </div>
//               <div className="flex justify-between items-center px-2">
//                 <div>
//                   <h3 className="font-bold text-xl text-white">{item.foodName}</h3>
//                   <p className="text-gray-400 text-sm">Deliciously prepared</p>
//                 </div>
//                 <p className="text-orange-500 font-black text-xl">
//                   {new Intl.NumberFormat('mn-MN').format(item.foodPrice)}₮
//                 </p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-3 text-center py-20 bg-gray-900 rounded-3xl border border-dashed border-gray-700">
//              <p className="text-gray-500 text-xl">Хоолны цэс ачаалж байна...</p>
//           </div>
//         )}
//       </div> 
//     </div>
//   );
// };



  import React from 'react';
  import { getCloudinaryUrl } from '../utils/cloudinary';

  export const Appetizers = ({ foods = [] }: { foods: any[] }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {foods.map((item) => {
          // Баазаас ирж буй Public ID-г URL болгон хувиргах
          const imageUrl = getCloudinaryUrl(item.foodImage);

          return (
            <div key={item._id} className="bg-[#121212] rounded-3xl overflow-hidden shadow-xl">
              <div className="h-56 w-full">
                <img 
                  src={imageUrl} 
                  alt={item.foodName} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/500?text=Check+Public+ID";
                  }}
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl text-white font-bold">{item.foodName}</h3>
                <p className="text-orange-500 font-bold">{item.foodPrice.toLocaleString()}₮</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };  