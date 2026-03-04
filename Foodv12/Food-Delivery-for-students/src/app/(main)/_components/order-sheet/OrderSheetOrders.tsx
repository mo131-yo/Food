"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSheetOrderItem } from ".";
import { useState, useEffect } from "react";
import { getMyOrders } from "@/lib/services/get-order"; 
import { toast } from "sonner";

export const OrderSheetOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getMyOrders(); 
        
        if (Array.isArray(data)) {
          setOrders(data);
        }
      } catch (error: any) {
        console.error("Failed to fetch orders:", error);
        toast.error("Order history tataj chadsangui");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Card className="h-[87%] overflow-y-auto">
      <CardHeader className="p-4">
        <CardTitle>Order history</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        {loading ? (
          <p className="text-center text-muted-foreground italic">Unshij bn ...</p>
        ) : orders.length > 0 ? (
          orders.map((order: any) => (
            <OrderSheetOrderItem key={order._id} order={order} />
          ))
        ) : (
          <p className="text-center text-muted-foreground">Order oldsongui</p>
        )}
      </CardContent>
    </Card>
  );
};