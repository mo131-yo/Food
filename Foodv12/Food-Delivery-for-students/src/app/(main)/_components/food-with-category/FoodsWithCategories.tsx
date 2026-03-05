"use client";

import { FoodCategory } from "@/components/admin/food-menu/AdminFoodsSection";
import { FoodCard } from "@/components/food";
import { fetchFoodsWithCategories } from "@/lib/services/get-foods-with-categories";
import { useEffect, useState } from "react";

export const FoodsWithCategories = () => {
  const [foodsWithCategories, setFoodsWithCategories] = useState<
    FoodCategory[]
  >([]);
  const [loading, setLoading] = useState(true);

  const [loadingText, setLoadingText] = useState("Server asaj bn tur huleene uu...");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingText("Uuchlaarai, server udaj baival hzoohon huleej baigaad Refresh hiij uzeerei");
    }, 4000);

    const fetchData = async () => {
      const { data, error } = await fetchFoodsWithCategories();
      if (!error) setFoodsWithCategories(data);
      setLoading(false);
      clearTimeout(timer);
    };

    fetchData();

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchFoodsWithCategories();
      if (error) return;

      setFoodsWithCategories(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="pan-loader">
          <div className="loader-inside"></div>
          <div className="pan-container">
            <div className="pan"></div>
            <div className="handle"></div>
          </div>
          <div className="pan-shadow"></div>
        </div>
       <p className="mt-4 text-white font-medium animate-pulse">
        {loadingText}
      </p>
      </div>
    );

  if (!foodsWithCategories?.length) return null;

  const nonEmptyCategories = foodsWithCategories.filter(
    (category) => category?.foods?.length > 0
  );

  return (
    <div className="flex flex-col gap-6">
      {nonEmptyCategories?.map((category, index) => (
        <div key={index} className="flex flex-col gap-[54px] rounded-xl">
          <p className="text-3xl font-semibold text-white">
            {category?.categoryName}
          </p>
          <div className="grid grid-cols-1 mb-5 gap-9 sm:grid-cols-2 lg:grid-cols-3">
            {category?.foods.map((food) => {
              return (
                <div key={food?._id}>
                  <FoodCard
                    foodName={food?.foodName}
                    foodPrice={food?.foodPrice}
                    foodImage={food?.foodImage || ""}
                    ingredients={Array.isArray(food?.ingredients) ? food.ingredients : []}
                    _id={food?._id}
                    category={category}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};