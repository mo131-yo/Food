"use client";
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('https://food-ahv2.onrender.com/users/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        // Токен болон хэрэглэгчийн мэдээллийг хадгалах
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        toast.success("Тавтай морил!");
        
        // Нүүр хуудас руу шилжүүлээд хуудсыг шинэчлэх (Төлөв өөрчлөхөд тустай)
        router.push('/');
        router.refresh();
      } else {
        toast.error(data.message || "И-мэйл эсвэл нууц үг буруу байна");
      }
    } catch (error) {
      toast.error("Сервертэй холбогдоход алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-10">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-[32px] shadow-2xl border w-full max-w-md">
        <h1 className="text-2xl font-black mb-6 text-center">Нэвтрэх</h1>
        
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="И-мэйл хаяг"
            className="w-full p-4 border border-gray-100 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-red-500 transition"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input 
            type="password" 
            placeholder="Нууц үг"
            className="w-full p-4 border border-gray-100 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-red-500 transition"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          
          <button 
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-white transition active:scale-95 mt-4 ${
              loading ? 'bg-gray-400' : 'bg-[#FF3838] hover:bg-red-600 shadow-lg shadow-red-200'
            }`}
          >
            {loading ? "Уншиж байна..." : "Нэвтрэх"}
          </button>
        </div>
      </form>
    </div>
  );
}