"use client";

import React, { useEffect, useState } from 'react';
import api from './utils/axios';
import { Appetizers } from './components/Appetizers';

export default function HomePage() {
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await api.get('/foods'); 
        console.log("Бүх хоол:", response.data.data); 
        
        if (response.data && response.data.data) {
          setFoods(response.data.data); 
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    getFoods();
  }, []);

  if (loading) return <div className="text-white text-center p-20">Unshij bn</div>;

  return (
    <div className='p-5 bg-white dark:bg-black min-h-screen'>
      <Appetizers />

      <h2 className='text-white text-2xl mb-4 mt-10'>All Menu</h2>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {foods.map((item) => (
          <div key={item._id} className="bg-gray-800 p-4 rounded-xl">
            <img 
              src={item.foodImage || "https://via.placeholder.com/150"} 
              alt={item.foodName} 
              className="w-full h-40 object-cover rounded" 
            />
            <h3 className="font-bold text-white mt-2">{item.foodName}</h3>
            <p className="text-red-500">{item.foodPrice}₮</p>
          </div>
        ))}
      </div>
    </div>
  );
}