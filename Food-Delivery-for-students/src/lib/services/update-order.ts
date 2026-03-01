// import { AllFoodOrders } from "@/types";

// export const updateOrder = async (
//   id: string,
//   payload: Partial<AllFoodOrders>
// ): Promise<AllFoodOrders | undefined> => {
//   const endPoint = `/food-order/${id}`;
//   const token = localStorage.getItem("token");
//   return undefined;
// };


import { AllFoodOrders } from "@/types";

const BASE_URL = "http://localhost:8000";

export const updateOrder = async (
  id: string,
  payload: Partial<AllFoodOrders>
): Promise<AllFoodOrders | undefined> => {
  const endPoint = `${BASE_URL}/foods-order/one-order-update/${id}`;
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(endPoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Update failed");

    const result = await response.json();
    return result.order;
  } catch (error) {
    console.error("Update Order Error:", error);
    return undefined;
  }
};