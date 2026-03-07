import { Request, Response } from "express";
import { OrderModel } from "../../models";

// export const getAllOrder = async (req: Request, res: Response) => {
//     try {
//         const orders = await OrderModel.find()
//             .populate("user", "name email") 
//             .populate({
//                 // path: "foodOrderItems.foodId", 
//                 path: "foods.food",
//                 model: "Food"
//             })
//             .sort({ createdAt: -1 }); 

//         return res.status(200).json({
//             message: "Success",
//             count: orders.length,
//             data: orders
//         });
//     } catch (error) {
//         console.error("GetAllOrder Error:", error);
//         return res.status(500).json({ message: "Server-д алдаа гарлаа" });
//     }
// };



export const getAllOrder = async (req: Request, res: Response) => {
    try {
        const orders = await OrderModel.find()
            .populate("user", "name email address") 
            .populate({
                path: "foodOrderItems.food", // Талбарын нэр 'foodOrderItems' байх ёстой
                model: "Food"
            })
            .sort({ createdAt: -1 }); 

        return res.status(200).json({
            message: "Success",
            count: orders.length,
            data: orders // Frontend response.data.data гэж авч байгаа тул энд 'data' байна
        });
    } catch (error) {
        console.error("GetAllOrder Error:", error);
        return res.status(500).json({ message: "Алдаа гарлаа" });
    }
};