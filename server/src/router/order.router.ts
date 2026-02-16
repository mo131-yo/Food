import { Request, Response, Router } from "express";
import { createOrder, oneOrderUpdate } from "../controller";
import { getAllOrder } from "../controller";
import { getOrderByIdGet } from "../controller/order/getBy-id-order.controller";
import { manyOrderUpdate } from "../controller/order/many-order-update.controller";
import { authMiddleware } from "../middlewares";
import { UserRole } from "../schema/user.schema";
import { roleMiddleware } from "../middlewares/roleMiddleware";

export const orderRouter = Router();

orderRouter.post("/create-order",authMiddleware, createOrder)

orderRouter.get("/all-order",authMiddleware,roleMiddleware([UserRole.ADMIN]), getAllOrder);

orderRouter.get("/get-by-id-order/:userId",authMiddleware , roleMiddleware([UserRole.USER]),getOrderByIdGet);

orderRouter.patch("/many-order-update", authMiddleware, roleMiddleware([UserRole.ADMIN]), manyOrderUpdate);
orderRouter.patch("/one-order-update", authMiddleware, roleMiddleware([UserRole.ADMIN]), oneOrderUpdate )