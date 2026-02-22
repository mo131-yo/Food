import mongoose, { model, Model, models, Schema } from "mongoose";


export interface iFood  {
  foodName: string;
  foodPrice: number;
  foodImage: string | null;
  quantity: number;
  category: mongoose.Types.ObjectId;
  ingredients: String[],
};

export const FoodSchema = new Schema({
    foodName: { type: String, required: true },
    foodPrice: { type: Number, required: true },
    foodImage: { type: String, default: null},
    quantity: { type: Number, default: 1 },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    ingredients: [{type: String }]
}, { timestamps: true });

// export const FoodModel:Model<iFood> = models["Food"] || mongoose.model("Food", FoodSchema);
export const  FoodModel:Model<iFood> = models["Food"] || model<iFood>("Food", FoodSchema);