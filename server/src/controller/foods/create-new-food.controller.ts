
import { Request, Response } from "express";
import { FoodModel } from "../../models/food.model";


export const createFoodItem = async (req: Request, res: Response) => {
    try {
        const { foodName, foodPrice, foodImage, category, ingredients } = req.body;

        const newFood = await FoodModel.create({
            foodName,
            foodPrice,
            foodImage,
            category,
            ingredients
        });

        res.status(201).json({
            message: "Khool amjilttai burtgegdlee",
            data: newFood
        });
    } catch (error: any) {
        console.error("Backend Error:", error);
        res.status(500).json({ message: "Aldaa garlaa", error: error.message });
    }
};