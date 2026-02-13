"use client";
import React, { useEffect, useState } from 'react';
import api from './utils/axios';
import FoodCard from './components/FoodCard';
import { Appetizers } from './components/Appetizers';
import axios from './utils/axios';

export default function HomePage() {
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await api.get('/foods'); 
        setFoods(response.data.data); 
      } catch (error) {
        console.error("Aldaa garlaa", error);
      } finally {
        setLoading(false);
      }
    };

    getFoods();
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Unshij bn ...</p>;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://food-ahv2.onrender.com/foods"); 
        setFoods(response.data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='p-5'>
      <Appetizers />

      {foods.map((item) => (
        <div key={item._id} className="border p-4 rounded-lg">
          <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
          <h3 className="font-bold text-xl">{item.name}</h3>
          <p>{item.price}₮</p>
        </div>
      ))}
    </div>
  );
}
