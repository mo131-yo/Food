// import { AllFoodOrders } from "@/types";

// export const updateMultipleOrder = async (
//   ids: string[],
//   updateData: Partial<AllFoodOrders>
// ): Promise<AllFoodOrders | undefined> => {
//   const endPoint = `/food-order`;
//   const token = localStorage.getItem("token");
//   return undefined;
// };


import { AllFoodOrders } from "@/types";

const BASE_URL = "http://localhost:8000";

export const updateMultipleOrder = async (
  ids: string[],
  newStatus: string 
): Promise<{ message: string; updatedCount: number } | undefined> => {
  const endPoint = `${BASE_URL}/foods-order/many-order-update`;
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(endPoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        orderIds: ids,
        newStatus: newStatus 
      }),
    });

    if (!response.ok) throw new Error("Update failed");

    return await response.json();
  } catch (error) {
    console.error("Update Multiple Order Error:", error);
    return undefined;
  }
};