import mongoose, { models, Schema } from "mongoose";


type Food = {
  _id: String;
  foodName: string;
  foodPrice: number;
  foodImage: string;
  quantity: number;
  category: mongoose.Types.ObjectId;
  ingredients: String;
};

export const FoodSchema = new Schema({
    foodName: { type: String, required: true },
    foodPrice: { type: Number, required: true },
    foodImage: { type: String },
    quantity: { type: Number, default: 1 },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    ingredients: {type: String }
}, { timestamps: true });

export const FoodModel = models["Food"] || mongoose.model("Food", FoodSchema);