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
