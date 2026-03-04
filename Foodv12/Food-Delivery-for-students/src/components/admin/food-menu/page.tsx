// // src/app/(admin)/food-menu/page.tsx

// "use client";

// import { useState, useEffect } from "react";
// import { DishesCategory } from "@/components/admin/food-menu/DishesCategory";
// import { fetchFoodsWithCategories } from "@/lib/services/get-foods-with-categories";
// import { AdminFoodsSection } from "@/components/admin/food-menu/AdminFoodsSection"; 

// interface AdminFoodsSectionProps {
//   foods: any[]; 
// }


// export default function AdminFoodMenu() {
//   const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
//   const [allFoods, setAllFoods] = useState<any[]>([]); 

//   useEffect(() => {
//     const loadFoods = async () => {
//       const response = await fetchFoodsWithCategories();
//       if (response?.data) {
//         setAllFoods(response.data);
//       }
//     };
//     loadFoods();
//   }, []);

//   const filteredFoods = selectedCategoryId 
//     ? allFoods.filter((food: any) => 
//         food.category?._id === selectedCategoryId || food.category === selectedCategoryId
//       )
//     : allFoods;

//   return (
//     <div className="p-8 flex flex-col gap-8">
//       <DishesCategory 
//         onCategorySelect={setSelectedCategoryId} 
//         selectedCategoryId={selectedCategoryId} 
//       />
//       {/* Одоо энэ хэсэг алдаа заахгүй */}
//       <AdminFoodsSection foods={filteredFoods} />
//     </div>
//   );
// }

