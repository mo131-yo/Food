// export type Category = {
//   categoryName: string;
//   _id: string;
// };

// export const fetchCategories = async (): Promise<{
//   data: Category[];
//   error: boolean;
// }> => {
//   return { data: [], error: false };
// };



import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", 
});

export type Category = {
  categoryName: string;
  _id: string;
};

export const fetchCategories = async (): Promise<{
  data: Category[];
  error: boolean;
}> => {
  try {
    const response = await api.get("/foods-category/get-all-foods"); 

    return { 
      data: response.data.data,
      error: false 
    };
  } catch (error) {
    console.error("Axios Fetch Categories Error:", error);
    return { 
      data: [], 
      error: true 
    };
  }
};