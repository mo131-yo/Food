// export default function AdminSettings() {
//   return <div>admin settings</div>;
// }


// app/(admin)/settings/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminSettings() {
  return (
    <div className="p-8 w-full max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Админ тохиргоо</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Админы мэдээлэл</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Нэр</Label>
              <Input id="name" defaultValue="Admin User" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Имэйл хаяг</Label>
              <Input id="email" type="email" defaultValue="admin@nomnom.mn" />
            </div>
            <Button className="bg-red-500 hover:bg-red-600 w-fit">
              Мэдээлэл шинэчлэх
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Системийн төлөв</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <div>
                <p className="font-medium text-green-800">Сервер ажиллаж байна</p>
                <p className="text-sm text-green-600">Бүх үйлчилгээ хэвийн</p>
              </div>
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}