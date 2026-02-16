import {Router} from "express";
import { createFoodCategory, deleteCategory, getAllFoodCategory, getFoodCategoryById } from "../controller/category";
import { updateCategory } from "../controller/category/update-category.controller";
import { roleMiddleware } from "../middlewares";
import { UserRole } from "../schema/user.schema";

export const foodCategoryRouter = Router();

foodCategoryRouter.post("/create-food-category", roleMiddleware([UserRole.ADMIN]), createFoodCategory);

foodCategoryRouter.get("/get-category/:categoryId",roleMiddleware([UserRole.ADMIN]),  getFoodCategoryById);

foodCategoryRouter.get("/get-all-foods", roleMiddleware([UserRole.ADMIN]),  getAllFoodCategory);

foodCategoryRouter.patch("/update-category/:categoryId",roleMiddleware([UserRole.ADMIN]),  updateCategory);

foodCategoryRouter.delete("/delete-category/:categoryId",roleMiddleware([UserRole.ADMIN]), deleteCategory)

