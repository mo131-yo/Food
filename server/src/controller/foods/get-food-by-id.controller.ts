import { Request, Response } from "express";
import { FoodModel } from "../../schema/food.schema";

export const getFoodByIdGet = async (req: Request, res: Response) => {
    try {
        const { foodId } = req.params; 
        const food = await (FoodModel as any).findById(foodId); 

        if (!food) {
            return res.status(404).json({ message: "Khool olsongui" });
        }

        res.status(200).json(food);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Aldaa garlaa" });
    }
}