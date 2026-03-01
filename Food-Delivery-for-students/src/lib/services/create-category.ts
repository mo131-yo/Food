// import { toast } from "sonner";

// export const createCategory = async (payload: { categoryName: string }) => {
//   const endPoint = "/food-category";
//   const token = localStorage.getItem("token");

//   if (!token) {
//     toast.error("Token not found");
//     return undefined;
//   }
// };


import { toast } from "sonner";
import {api}  from "../axios-instance";

export const createCategory = async (payload: { categoryName: string; description?: string }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Нэвтрэх токен олдсонгүй. Дахин нэвтэрнэ үү.");
    return undefined;
  }

  try {
    const response = await api.post("/foods-category/create-food-category", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Ангилал амжилттай үүсгэгдлээ!");
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Ангилал үүсгэхэд алдаа гарлаа";
    toast.error(errorMessage);
    console.error("Create Category Error:", error);
    return undefined;
  }
};