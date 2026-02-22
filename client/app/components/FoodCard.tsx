// "use client";
// import React, { useState } from 'react';
// import toast from 'react-hot-toast';
// import { useCart } from './CartProvider';
// import { FaCheckSquare } from "react-icons/fa";

// interface FoodProps {
//   id: string; // ID заавал байх ёстой
//   foods: {
//     name: string;
//     price: number;
//     image: string; 
//     ingredients: string[];
//   };
// }

// const FoodCard = ({ foods, id }: FoodProps) => {
//   const [quantity, setQuantity] = useState(1);
//   const { addToCart } = useCart(); // Сагсны функцийг дуудах

//   const imageUrl = foods.image 
//     ? `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/${foods.image}` 
//     : "https://via.placeholder.com/150";

//   const increase = () => setQuantity(prev => prev + 1);
//   const decrease = () => {
//     if (quantity > 1) setQuantity(prev => prev - 1);
//   };

//   const handleAddToCart = () => {
//     addToCart({ 
//       id: id, 
//       name: foods.name, 
//       price: foods.price, 
//       image: foods.image, 
//       quantity: quantity 
//     });
    
//     toast.success('Food is being added to the cart!', {
//       style: {
//         background: '#333',
//         color: '#fff',
//         borderRadius: '8px',
//       },
//       icon: <FaCheckSquare />,
//     });
//   };

//   return (
//     <div className="border border-gray-200 rounded-2xl p-4 w-[280px] text-center shadow-lg bg-white flex flex-col justify-between">
//       <div>
//         <img 
//           src={imageUrl} 
//           alt={foods.name} 
//           className="w-full h-40 object-cover rounded-xl mb-3"
//         />
//         <h3 className="text-lg font-bold text-gray-800">{foods.name}</h3>
//         <p className="text-sm text-gray-500 h-10 overflow-hidden mb-2">
//           {foods.ingredients?.length > 0 ? foods.ingredients.join(", ") : "Орц тодорхойгүй"}
//         </p>
//         <p className="text-xl font-extrabold text-red-500 mb-4">
//           {(foods.price * quantity).toLocaleString()} ₮
//         </p>
//       </div>

//       <div className="flex flex-col gap-3">
//         <div className="flex items-center justify-center gap-4 bg-gray-100 rounded-full py-2">
//           <button onClick={decrease} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow font-bold">-</button>
//           <span className="text-lg font-semibold w-6 text-center">{quantity}</span>
//           <button onClick={increase} className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full shadow font-bold">+</button>
//         </div>

//         <button 
//           onClick={handleAddToCart} // Одоо энэ функц ажиллана
//           className="bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 transition active:scale-95"
//         >
//           Сагслах
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FoodCard;




"use client";
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useCart } from './CartProvider';
import { FaCheckSquare } from "react-icons/fa";
import FoodDetailModal from './FoodDetailModal'; // Импортлох

interface FoodProps {
  id: string;
  foods: {
    name: string;
    price: number;
    image: string; 
    ingredients: string[];
  };
}

const FoodCard = ({ foods, id }: FoodProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  const imageUrl = foods.image 
    ? `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/${foods.image}` 
    : "https://via.placeholder.com/150";

const handleAddToCart = (qty: number) => {
    addToCart({ 
      id: id, 
      name: foods.name, 
      price: foods.price, 
      image: foods.image, 
      quantity: qty,
      ingredients: foods.ingredients?.join(", ") || "Fresh ingredients" // Энэ мөрийг нэмж өгнө 👈
    });
    
    toast.success(`${foods.name} сагслагдлаа!`, {
      icon: <FaCheckSquare />,
    });
  };

  return (
    <>
      {/* Food Card */}
      <div 
        onClick={() => setIsModalOpen(true)} // Карт дээр дарахад модал нээгдэнэ
        className="group border border-gray-100 rounded-3xl p-4 w-[280px] shadow-sm hover:shadow-xl bg-white transition-all cursor-pointer"
      >
        <div className="overflow-hidden rounded-2xl mb-4">
          <img 
            src={imageUrl} 
            alt={foods.name} 
            className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{foods.name}</h3>
          <p className="text-lg font-bold text-red-500">{foods.price.toLocaleString()} ₮</p>
        </div>
        <p className="text-xs text-gray-400 line-clamp-2 mb-4">
          {foods.ingredients?.join(", ") || "Fresh ingredients"}
        </p>
        
        <button className="w-full py-2 bg-gray-50 text-gray-500 rounded-xl font-bold group-hover:bg-red-500 group-hover:text-white transition">
          Дэлгэрэнгүй
        </button>
      </div>

      {/* Detail Modal */}
      <FoodDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        food={foods}
        imageUrl={imageUrl}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default FoodCard;