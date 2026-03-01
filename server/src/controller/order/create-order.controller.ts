import { Request, Response } from "express";
import { FoodModel, OrderModel } from "../../models";

export const createOrder = async (req: any, res: Response) => {

    try {
        const { foods,  address } = req.body;
        const userId = req.user.userId;
        
      const foodCalculations = await Promise.all(
            foods.map(async (item: any) => {
                const food = await FoodModel.findById(item.foodId);
                
                if (!food) {
                    throw new Error(`Food oldsongui: ${item.foodId}`);
                }

                return {
                    price: food.foodPrice,
                    quantity: item.quantity
                };
            })
        );
       const totalPrice = foodCalculations.reduce((sum, item) => {
        return sum + (Number(item.price || 0) * item.quantity);
        }, 0);

        const newOrder = await OrderModel.create({
            user: userId,
            foods: foods,
            totalPrice: totalPrice,
            address: address,
            status: "Pending"
        });

        res.status(201).json({
            message: "Amjilttai zahialgaa uusgegdlee",
            order: newOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Aldaa garlaa" });
    }
};
