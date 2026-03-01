import { Request, Response } from "express"; // Энийг заавал импортлоорой
import { FoodCategoryModel } from "../../models/food.category.model";

export const getCategoriesWithCount = async (req: Request, res: Response) => {
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
        $project: {
          categoryName: 1,
          count: { $size: "$foods" },
        },
      }
    ]);

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: "Дата авахад алдаа гарлаа", error });
  }
};