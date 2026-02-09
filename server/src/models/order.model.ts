import { models, model, Schema, Model } from "mongoose";

type Order = {
  title: string;
  price: number;
  product: string;
  foodImage: string;
  description: string;
};

const OrderSchema = new Schema<Order>(
  {
    title: { type: String, required: true },
    product: [{ type: String, required: true }],
    price: { type: Number, required: true },
    foodImage: { type: String},
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const OrderModel: Model<Order> =models["Order"] || model("Order", OrderSchema);
