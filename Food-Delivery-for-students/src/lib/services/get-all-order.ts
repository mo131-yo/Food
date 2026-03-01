  import { FoodOrder } from "@/types";

  export const fetchAllOrders = async () : Promise<FoodOrder | undefined> => {
  try {
    const response = await fetch("/foods-order/all-order");
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};