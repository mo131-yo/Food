import { Request, Response, Router } from "express";
import { createOrder, oneOrderUpdate } from "../controller";
import { getAllOrder } from "../controller";
import { getOrderByIdGet } from "../controller/order/getBy-id-order.controller";
import { manyOrderUpdate } from "../controller/order/many-order-update.controller";
import { authentication } from "../middlewares/authentication";
import { UserRole } from "../schema/user.schema";
import { authorization } from "../middlewares/authorization";

export const orderRouter = Router();

orderRouter.post("/create-order",authentication, createOrder)

orderRouter.get("/all-order",authentication,authorization([UserRole.ADMIN]), getAllOrder);

orderRouter.get("/get-by-id-order/:userId",authentication , authorization([UserRole.USER , UserRole.ADMIN]),getOrderByIdGet);

orderRouter.patch("/many-order-update", authentication, authorization([UserRole.ADMIN]), manyOrderUpdate);
orderRouter.patch("/one-order-update/:orderId", authentication, authorization([UserRole.ADMIN]), oneOrderUpdate )