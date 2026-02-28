// import { FoodCategory } from "@/components/admin/food-menu/AdminFoodsSection";

// export const fetchFoodsWithCategories = async (): Promise<{
//   data: FoodCategory[];
//   error: boolean;
// }> => {
//   return { data: [], error: false };
// };

// import axios from "axios";
// import { FoodCategory } from "@/components/admin/food-menu/AdminFoodsSection";

// const api = axios.create({
//   baseURL: "http://localhost:8000",
// });

// export const fetchFoodsWithCategories = async (): Promise<{
//   data: FoodCategory[];
//   error: boolean;
// }> => {
//   try {
//     const response = await api.get("/foods/get-all-food"); 

//     return {
//       data: response.data.data, 
//       error: false,
//     };
//   } catch (error) {
//     console.error("Fetch Foods Error:", error);
//     return {
//       data: [],
//       error: true,
//     };
//   }
// };


import axios from "axios";
import { FoodCategory } from "@/components/admin/food-menu/AdminFoodsSection";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const fetchFoodsWithCategories = async (): Promise<{
  data: FoodCategory[];
  error: boolean;
}> => {
  try {
    const response = await api.get("/foods/get-all-food");
    const allFoods = response.data.data;

    const grouped = allFoods.reduce((acc: any, food: any) => {
      const catName = food.category?.categoryName || "other"; 
      
      if (!acc[catName]) {
        acc[catName] = { categoryName: catName, foods: [] };
      }
      acc[catName].foods.push(food);
      return acc;
    }, {});

    return {
      data: Object.values(grouped) as FoodCategory[],
      error: false,
    };
  } catch (error) {
    console.error("Fetch Foods Error:", error);
    return { data: [], error: true };
  }
};