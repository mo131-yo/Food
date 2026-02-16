import { Request, Response } from "express";
import { FoodModel, OrderModel } from "../../models";

export const createOrder = async (req: any, res: Response) => {


    ///
//     {
//        foods: [{
//         foodid:"hjasndhas",
//         quantity:2
//     },
// {
//         foodid:"hjasndhas",
//         quantity:2
//     }],
//     address:"hasndhasbdhabsdjhas",
// user:"jhabsjhabshjdbas"
//     }


    try {
        const { foods,  address } = req.body;
        const userId = req.user.userId;


        // const calculateTotalPrice = 
        // foodid -> find hiigeed price awchrana
        
        let totalPrice = 0;

        for (const item of foods) {
            const food = await FoodModel.findById(item.foodId);
            
            if (!food) {
                return res.status(404).json({ message: `Khool oldsongui: ${item.foodId}` });
            }
            totalPrice += food.foodPrice * item.quantity;
        }

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
