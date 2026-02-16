import { Router } from "express";
import { createFoodItem } from "../controller/foods/create-new-food.controller";
import { deleteFood } from "../controller/foods/delete-food.controller";
import { updateFood } from "../controller/foods/update-food.controller";
import { authentication, authorization } from "../middlewares";
import { getFoodByIdGet } from "../controller/foods/get-food-by-id.controller";
import { getAllFood } from "../controller/foods/get-all-food.controller";

export const foodRouter = Router();

foodRouter.post("/create-food-item", authentication, authorization, createFoodItem);

foodRouter.delete("/delete-food/:foodId",authentication, authorization, deleteFood)
foodRouter.patch("/update-food/:foodId", authentication, authorization, updateFood)

foodRouter.get("/get-food-by-id/:foodId",authentication, authorization, getFoodByIdGet)
foodRouter.get("/get-all-food", getAllFood)