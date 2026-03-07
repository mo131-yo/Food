"use client";

import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/app/(main)/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateAdminProfile } from "@/lib/services/admin-update";
import { api } from "@/lib/axios-instance";
import { toast } from "sonner";
import { Camera, Mail, MapPin, Lock } from "lucide-react";

export default function AdminSettings() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "", // Хаяг нэмэх
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
      });
    }
  }, [user]);

  // 1. Профайл шинэчлэх (Нэр, Хаяг)
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updatedUser = await updateAdminProfile(formData);
      if (setUser) setUser(updatedUser);
      toast.success("Мэдээлэл шинэчлэгдлээ");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Нууц үг сэргээх и-мэйл илгээх
  const handlePasswordResetRequest = async () => {
    setResetLoading(true);
    try {
      await api.post("/users/reset-password-request", { email: formData.email });
      toast.success("Нууц үг сэргээх линк и-мэйл рүү илгээгдлээ");
    } catch (error: any) {
      toast.error("И-мэйл илгээхэд алдаа гарлаа");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="p-8 w-full max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Тохиргоо</h1>

      <div className="grid gap-8">
        {/* ХЭСЭГ 1: ХУВИЙН МЭДЭЭЛЭЛ & ЗУРАГ */}
        <Card className="shadow-md border-t-4 border-t-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Camera className="w-5 h-5" /> Хувийн мэдээлэл
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="flex items-center gap-6 pb-4 border-b">
                <div className="relative h-20 w-20 rounded-full bg-gray-100 overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
                   {user?.profileImage ? (
                     <img src={user.profileImage} className="object-cover w-full h-full" />
                   ) : (
                     <Camera className="text-gray-400" />
                   )}
                </div>
                <Button variant="outline" size="sm">Зураг солих</Button>
             </div>

            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="space-y-2">
                <Label>Нэр</Label>
                <Input 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>И-мэйл</Label>
                <Input value={formData.email} disabled className="bg-gray-50 cursor-not-allowed" />
              </div>
            </div>

            <div className="space-y-2 text-left">
               <Label className="flex items-center gap-1"><MapPin className="w-4 h-4"/> Хүргэлтийн хаяг</Label>
               <Input 
                 placeholder="Дүүрэг, хороо, байр, тоот..."
                 value={formData.address}
                 onChange={(e) => setFormData({ ...formData, address: e.target.value })}
               />
            </div>

            <Button className="bg-red-500 hover:bg-red-600" onClick={handleUpdate} disabled={loading}>
              {loading ? "Хадгалж байна..." : "Өөрчлөлтийг хадгалах"}
            </Button>
          </CardContent>
        </Card>

        {/* ХЭСЭГ 2: АЮУЛГҮЙ БАЙДАЛ */}
        <Card className="shadow-md border-t-4 border-t-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lock className="w-5 h-5" /> Аюулгүй байдал
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between py-6">
            <div>
              <p className="font-semibold">Нууц үг шинэчлэх</p>
              <p className="text-sm text-gray-500 italic text-left">Нууц үгээ солихын тулд баталгаажуулах линк авна уу</p>
            </div>
            <Button 
              variant="outline" 
              className="border-gray-800 text-gray-800"
              onClick={handlePasswordResetRequest}
              disabled={resetLoading}
            >
              {resetLoading ? "Илгээж байна..." : "И-мэйл илгээх"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}