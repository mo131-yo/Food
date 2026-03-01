  import { FoodCategory } from "./category";

  // export type Food = {
  //   _id: string;
  //   foodName: string;
  //   foodPrice: number;
  //   foodImage: string | null;
  //   ingredients: string;
  //   categoryId?: FoodCategory;
  // };


  export type Food = {
  _id: string;
  foodName: string;
  foodPrice: number;
  foodImage: string | null;
  ingredients: string[];
  category: string | any; 
  quantity?: number;
};