// type Food = {
//   foodName: string;
//   price: number;
//   image: string;
//   ingredients: string;
//   category: string;
// };

// export const createFood = async (payload: Food) => {
//   const endPoint = "/food";
// };



import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

type Food = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
};

export const createFood = async (payload: Food) => {
  try {
    const response = await api.post("/food", payload);
    
    return response.data;
  } catch (error: any) {
    console.error("Axios Error:", error.response?.data || error.message);
    throw error;
  }
};