"use client";
import React, { useEffect, useState } from 'react';
import FoodCard from './components/FoodCard';

export default function FoodListPage() {
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        // Зөв хаяг: /foods/get-all-food
        const response = await fetch('http://localhost:8000/foods/get-all-food');
        const result = await response.json();

        if (response.ok) {
          // Чиний дата result.data дотор ирж байна
          setFoods(result.data); 
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) return <div className="p-10 text-center">Уншиж байна...</div>;

  return (
    <div className="flex flex-wrap gap-5 p-5 bg-gray-50 min-h-screen">
      {foods.map((food) => (
        <FoodCard 
          key={food._id}
          foods={{
            name: food.foodName, // Backend-ийн foodName-ийг name руу
            price: food.foodPrice, // Backend-ийн foodPrice-ийг price руу
            image: food.foodImage, // foodImage
            ingredients: food.ingredients // Ene ni massiv (array)
          }} id={''}        />
      ))}
      
    </div>
    // npm install react-hot-toast
  );
}