// import { CategoryWithCount } from "@/components/admin/food-menu/DishesCategory";

// export const fetchCategoriesWithCount = async () => {
//   return { data: [] as CategoryWithCount[], error: false };
// };



import axios from "axios";
import { CategoryWithCount } from "@/components/admin/food-menu/DishesCategory";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const fetchCategoriesWithCount = async (): Promise<{
  data: CategoryWithCount[];
  error: boolean;
}> => {
  try {
    const response = await api.get("/foods-category/get-all-food"); 
    
    const categories = response.data.data.map((cat: any) => ({
      _id: cat._id,
      categoryName: cat.categoryName,
      count: cat.foodCount || 0, 
    }));

    return { data: categories, error: false };
  } catch (error) {
    console.error("Fetch Categories With Count Error:", error);
    return { data: [], error: true };
  }
};