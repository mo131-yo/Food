import { Request, Response, Router } from "express";
import { createOrder } from "../controller";
import { foodOrderUpdate } from "../controller";
import { getAllFoodOrder } from "../controller";
import { getByIdOrder } from "../controller/order/getBy-id-order.controller";
import { manyOrderUpdate } from "../controller/order/many-order-update.controller";
import { authMiddleware } from "../middlewares";
import { UserRole } from "../schema/user.schema";
import { roleMiddleware } from "../middlewares/rolMiddleware";

export const orderRouter = Router();

orderRouter.post("/create-order", createOrder)

orderRouter.patch("/order-update/:orderId", foodOrderUpdate)


orderRouter.get("/get-order", getAllFoodOrder);

orderRouter.get("/getby-id-order/:userId", getByIdOrder);

orderRouter.patch("/many-order-update", authMiddleware, roleMiddleware([UserRole.ADMIN]), manyOrderUpdate);