"use client";

import { useEffect, useState } from "react";
import { Category, fetchCategories } from "@/lib/services/get-categories";
import { FoodsWithCategories } from "./FoodsWithCategories";

export const FoodCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const [loadingText, setLoadingText] = useState("Server asaj bn tur huleene uu...");

   useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingText("Uuchlaarai, server udaj baival zoohon huleej baigaad Refresh hiij uzeerei");
    }, 4000);

    const fetchData = async () => {
      try {
        const { data, error } = await fetchCategories();
        if (!error && data) {
          setCategories(data);
        }
      } catch (err) {
        console.error("Aldaa garlaa", err);
      } finally {
        setLoading(false);
        clearTimeout(timer);
      }
    };

    fetchData();

    return () => clearTimeout(timer);
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

  if (!categories.length)
    return <p className="text-white">No categories found</p>  

    return (
      <div>
        <div className="flex flex-col my-8 gap-9">
          {/* <div className="text-3xl font-semibold text-white">Categories</div>
          <div className="flex gap-2 flex-nowrap">
            {categories?.map((category) => (
              <div
                key={category._id}
                className="flex items-center px-5 py-1 rounded-full bg-background"
              >
                <div>{category?.categoryName}</div>
              </div>
            ))}
          </div> */}
        </div>
        <FoodsWithCategories />
      </div>
    );
  };
