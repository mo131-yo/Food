"use client";

import { Textarea } from '@/components/ui/textarea'
import React, { useState, useContext, useEffect } from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { updateCurrentUser } from '@/lib/services/update-current-user'; 
import { toast } from 'sonner';
import { UserContext } from "../../context"; 
import { useRouter } from 'next/navigation';

export const OrderAddress = () => {
  const { user, setUser } = useContext(UserContext); 
  const [userLocation, setUserLocation] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user?.address) {
      setUserLocation(user.address);
    }
  }, [user?.address]);

  const handleUserAddressUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Ta ehleed login esvel sign-up hiine uu");
        router.push("/sign-up");
        return;
      }
      
      await updateCurrentUser({ address: userLocation });
      setUser?.((prev: any) => (prev ? { ...prev, address: userLocation } : prev));
      toast.success("Address amjilttai hadgagdlaa");
      
    } catch (error: any) {
      toast.error(error.message || "Address hadgalahad aldaa garlaa");
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserLocation(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4 mt-6 border-t pt-6">
      <h2 className="text-xl font-bold text-[#71717A]">Delivery location</h2>
      <div className="relative">
        <Textarea
          placeholder="Please share your complete address"
          className="min-h-[100px] rounded-xl border-slate-200 bg-white p-4 text-base focus-visible:ring-red-500 resize-none"
          value={userLocation}
          onChange={handleAddressChange}
        />
      </div>
      <div className="flex justify-end gap-3">
        <Button 
          onClick={handleUserAddressUpdate} 
          disabled={!userLocation}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full px-8 w-full md:w-auto"
        >
          Deliver here
        </Button>
      </div>
    </div>
  );
};