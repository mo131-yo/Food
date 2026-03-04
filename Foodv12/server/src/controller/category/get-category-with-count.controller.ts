import { Request, Response } from "express"; // Энийг заавал импортлоорой
import { FoodCategoryModel } from "../../models/food.category.model";

// server/src/controller/category/get-category-with-count.controller.ts

// server/src/controller/category/get-category-with-count.controller.ts

export const getCategoryWithCount = async (req: Request, res: Response) => {
  try {
    const categories = await FoodCategoryModel.aggregate([
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "category",
          as: "foods",
        },
      },
      {
        $addFields: {
          // Энэ мөр нь ID-г заавал байхыг баталгаажуулна
          categoryId: "$_id" 
        }
      },
      {
        $project: {
          _id: 1, 
          categoryName: 1,
          count: { $size: "$foods" },
          foods: 1,
        },
      },
    ]);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Алдаа гарлаа" });
  }
};