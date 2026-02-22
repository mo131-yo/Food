"use client";
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        // Token-уудаа хадгалах
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        toast.success("Тавтай морил!");
        router.push('/'); // Нүүр хуудас руу шилжих
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Нэвтрэхэд алдаа гарлаа");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-xl rounded-2xl w-96 border">
        <h1 className="text-2xl font-bold mb-6 text-center">Нэвтрэх</h1>
        <input 
          type="email" 
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="password" 
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Нэвтрэх
        </button>
      </form>
    </div>
  );
}