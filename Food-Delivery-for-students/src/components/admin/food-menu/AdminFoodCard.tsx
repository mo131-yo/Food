import { Pencil } from "lucide-react";

type AdminFoodCardProps = {
  foodImage: string;
  foodName: string;
  ingredients: string;
  foodPrice: number;
};

export const AdminFoodCard = ({
  foodImage,
  foodName,
  ingredients,
  foodPrice,
}: AdminFoodCardProps) => {
  return (
    <div className="border rounded-[20px] p-4 border-border bg-background bg-blue-30 flex flex-col gap-5 min-w-full">
      <div
        className="bg-cover bg-center w-full h-[129px] rounded-xl flex justify-end items-end p-5"
        style={{
          backgroundImage: `url(${foodImage})`,
        }}
      >
        <button className="flex justify-center items-center rounded-full bg-background h-11 w-11">
          <Pencil color="#EF4444" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-[#EF4444] text-sm font-medium">{foodName}</p>
          <p className="text-xs">₮{foodPrice}</p>
        </div>
        <p className="text-xs">{ingredients}</p>
      </div>
    </div>
  );
};
