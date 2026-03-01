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
  foodPrice: number;
  foodImage: string;
  ingredients: string;
  category: string;
};


export const createFood = async (payload: Food) => {
  const token = localStorage.getItem("token");
  console.log("Одоо ашиглаж буй токен:", token);

  if (!token) {
    throw new Error("Токен олдсонгүй, дахин нэвтэрнэ үү");
  }

  try {
    const response = await api.post("/foods/create-food-item", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};