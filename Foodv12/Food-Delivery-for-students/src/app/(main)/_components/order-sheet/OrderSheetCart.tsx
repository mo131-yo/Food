import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSheetFoodItem } from "./OrderSheetFoodItem";
import { OrderSheetEmptyCard } from "./OrderSheetEmptyCard";
import { useContext } from "react";
import { CartContext } from "../../context";
import { OrderAddress } from "./OrderAddress";

export const OrderSheetCart = () => {
  const { cartData } = useContext(CartContext);

  return (
    <Card className="h-[500px] flex flex-col pb-4"> 
      <CardHeader className="p-4 flex-shrink-0">
        <CardTitle>My cart</CardTitle>
      </CardHeader>

      <CardContent className="p-4 overflow-y-auto flex-1 custom-scrollbar">
        {cartData?.length ? (
          <div className="flex flex-col gap-4">
            {cartData.map((item) => (
              <OrderSheetFoodItem
                key={item.food._id}
                food={item.food}
                quantity={item.quantity}
              />
            ))}
            <OrderAddress />
          </div>
        ) : (
          <OrderSheetEmptyCard />
        )}
      </CardContent>
    </Card>
  );
};