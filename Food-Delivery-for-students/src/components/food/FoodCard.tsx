"use client";

import { Card } from "@/components/ui/card";
import Image from "next/legacy/image";
import { FoodDetailModal } from "./FoodDetailModal";
import { MouseEventHandler, useContext, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { CartContext } from "@/app/(main)/context";
import { AddToCartAlert } from "./AddToCartAlert";
import { formatMoney } from "@/lib";

type FoodCardProps = {
  foodName: string;
  foodPrice: number;
  ingredients: string[];
  foodImage: string;
  _id: string;
  category: any;
};

export const FoodCard = ({
  foodName,
  foodPrice,
  ingredients,
  foodImage,
  _id,
  category,
}: FoodCardProps) => {
  const { addItem } = useContext(CartContext);

  const food = { _id, foodName, foodPrice, ingredients, foodImage, category };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const formattedPrice = formatMoney(foodPrice);

  const onToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    addItem({
      food: { _id, foodName, foodPrice, ingredients, foodImage, category },
      quantity: 1,
    });
    setShowAlert(true);
  };

  const handleAlertRemove = () => {
    setShowAlert(false);
  };

  const getFullImageUrl = (src: string) => {
    if (!src) return "/cake.png";
    if (src.startsWith("http")) return src;
    
    return `https://res.cloudinary.com/dzljgphud/image/upload/${src}`;
  };

  return (
    <div className="w-full">
      <div onClick={onToggleModal}>
        <Card className="flex flex-col gap-5 p-4 bg-white border-none shadow-none cursor-pointer w-99 h-86 rounded-3xl">
          <div className="relative flex items-end justify-end overflow-hidden h-52 rounded-3xl">
            {/* <Image src={foodImage} alt={foodName} objectFit="cover" layout="fill" /> */}
            <Image 
              src={getFullImageUrl(foodImage)} 
              alt={foodName} 
              objectFit="cover" 
              layout="fill" 
            />
            <Button
              className="absolute bg-white rounded-full w-11 h-11 bottom-5 right-5"
              onClick={handleAddToCart}
            >
              <Plus color="red" />
            </Button>
          </div>

          <div className="w-full">
            <div className="flex justify-between">
              <p className="text-2xl font-semibold text-red-500">{foodName}</p>
              <p className="text-lg font-semibold text-[#09090B]">
                {formattedPrice} ₮
              </p>
            </div>

            <div className="mt-2 text-sm text-[#09090B] font-normal">
              {ingredients}
            </div>
          </div>
        </Card>
      </div>
      <FoodDetailModal
        food={food}
        isModalOpen={isModalOpen}
        onToggleModal={onToggleModal}
      />
      <AddToCartAlert isVisible={showAlert} onHide={handleAlertRemove} />
    </div>
  );
};
