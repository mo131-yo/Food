"use client";

import { useContext } from "react";
import { UserContext } from "@/app/(main)/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, ShieldCheck, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 italic">Хэрэглэгчийн мэдээлэл ачаалж байна...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Миний мэдээлэл</h1>

      <Card className="overflow-hidden border-none shadow-xl bg-white">
        <div className="h-32 bg-gradient-to-r from-red-500 to-orange-400"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6">
            <div className="inline-block p-1 bg-white rounded-full shadow-lg">
              <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white">
                <Image
                  src={user.profileImage || "https://i.pinimg.com/736x/b2/b1/97/b2b197e5f03fc839ce36ffef82cfcf80.jpg"}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-500">{user.role || "Хэрэглэгч"}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Mail className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">И-мэйл</p>
                  <p className="text-sm font-medium text-gray-700">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Статус</p>
                  <p className="text-sm font-medium text-gray-700">Идэвхтэй</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-100">
              <Button 
                variant="outline"
                className="mr-3"
                onClick={() => router.back()}
              >
                Буцах
              </Button>
              <Button 
                className="bg-red-500 hover:bg-red-600"
                onClick={() => router.push("/admin/settings")}
              >
                Мэдээлэл засах
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}