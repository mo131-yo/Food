import {api} from "@/lib/axios-instance"

export const fetchAllOrders = async () => {
  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

  try {
    const response = await api.get("/foods-order/all-order", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      allFoodOrders: response.data.data,
      count: response.data.count
    };
  } catch (error) {
    console.error("Fetch All Orders Error:", error);
    return { allFoodOrders: [] };
  }
};



// // src/lib/services/get-all-order.ts
// import { api } from "@/lib/axios-instance";

// export const fetchAllOrders = async () => {
//   const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

//   try {
//     const response = await api.get("/foods-order/all-order", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     // Дата ирээгүй тохиолдолд хоосон массив буцаах хамгаалалт
//     return {
//       allFoodOrders: response?.data?.data || [],
//       count: response?.data?.count || 0
//     };

//   } catch (error: any) {
//     console.error("Fetch All Orders Error:", error.response?.data || error.message);
//     // 500 алдаа гарвал апп-ыг гацаахгүйгээр хоосон утга буцаана
//     return { allFoodOrders: [], count: 0 };
//   }
// };