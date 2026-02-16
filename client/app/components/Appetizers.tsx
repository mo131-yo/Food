'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { getCloudinaryUrl } from '@/app/utils/cloudinary';

interface FoodItem {
  _id: string;
  name: string;
  image: string;
  price: number;
}
export const Appetizers = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('/foods/get-all-food'); 
        setFoods(response.data.data || response.data);
      } catch (error) {
        console.error("Aldaa garlaa", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) return <p className="text-white">Unshij bn</p>;

  return (
    <div className="p-4">
      <h2 className='font-semibold text-3xl text-white mb-6'>Appetizers</h2>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {foods.map((food) => (
          <div key={food._id} className='bg-zinc-900 p-4 rounded-xl border border-zinc-800'>
            <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
              <img 
                src={getCloudinaryUrl(food.image)} 
                alt={food.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <h3 className="text-white font-medium text-xl">{food.name}</h3>
            <p className="text-orange-500 font-bold mt-2">{food.price}₮</p>
          </div>
        ))}
      </div> 
    </div>
  );
};