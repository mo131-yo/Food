// import { toast } from "sonner";

import { toast } from "sonner";

// type FoodOrderItem = {
//   food: string;
//   quantity: number;
// };

// type FoodOrder = {
//   user?: string;
//   totalPrice: string;
//   foodOrderItems: FoodOrderItem[];
//   status?: string;
// };

// export const createOrder = async (payload: FoodOrder) => {
//   const endPoint = "/food-order";
// };


type OrderItem = {
  foodId: string;
  quantity: number;
};

type CreateOrderPayload = {
  foods: OrderItem[];
  address: string;
};

export const createOrder = async (payload: CreateOrderPayload) => {
  const BASE_URL = "http://localhost:8000";
  const endPoint = `${BASE_URL}/foods-order/create-order`;
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Захиалга үүсгэхэд алдаа гарлаа");
    }

    toast.success("Захиалга амжилттай баталгаажлаа!");
    return result.order;
  } catch (error: any) {
    toast.error(error.message);
    console.error("Create Order Error:", error);
    return undefined;
  }
};