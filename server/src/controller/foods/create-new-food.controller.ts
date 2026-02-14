
import { Request, Response } from "express";
import { FoodModel } from "../../models/food.model";

// export const createFoodItem = async (req: Request, res: Response) => {
//     try {
//         const { foodName, foodPrice, foodImage } = req.body;

//         const newFood = await FoodModel.create({foodName:foodName, foodPrice: foodPrice, foodImage: foodImage});

//         res.status(201).json({message: "Khool amjilttai burtgegdlee",data: newFood});
//     } catch (error: any) {
//         res.status(500).json({ message: "Aldaa garlaa", error: error.message });
//     }
// };

export const createFoodItem = async (req: Request, res: Response) => {
    try {
        // Postman-аас ирж буй нэрстэй яг ижилхэн destructure хийнэ
        const { foodName, foodPrice, foodImage, category, ingredients } = req.body;

        const newFood = await FoodModel.create({
            foodName,    // foodName: foodName-тэй ижил
            foodPrice,   // foodPrice: foodPrice-тэй ижил
            foodImage,   // Schema дээрх нэр нь 'foodImage' тул 'image' гэж бичиж болохгүй!
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