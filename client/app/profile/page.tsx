"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { MdOutlinePersonOutline, MdLogout, MdEmail } from "react-icons/md";

export default function ProfilePage() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // LocalStorage-оос хэрэглэгчийн мэдээллийг унших
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Хэрэв мэдээлэл байхгүй бол нэвтрэх хуудас руу буцаах
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    // Бүх мэдээллийг устгах
    localStorage.clear();
    toast.success("Амжилттай гарлаа");
    
    // Нүүр хуудас руу шилжүүлээд, төлвийг шинэчлэх
    router.push('/');
    router.refresh();
  };

  if (!user) return <div className="flex justify-center items-center min-h-screen">Уншиж байна...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-20 px-4">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-[32px] shadow-2xl border border-gray-100 dark:border-zinc-800 w-full max-w-md transition-all">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-red-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mb-4 border-2 border-red-500 dark:border-yellow-500">
            <MdOutlinePersonOutline size={48} className="text-red-500 dark:text-yellow-500" />
          </div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white">Миний Профайл</h1>
        </div>

        {/* User Info Card */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-zinc-700">
            <MdEmail size={24} className="text-gray-400" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">И-мэйл хаяг</span>
              <span className="text-gray-700 dark:text-gray-200 font-medium">{user.email}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button 
            onClick={() => router.push('/')}
            className="w-full py-4 rounded-2xl font-bold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition active:scale-95"
          >
            Нүүр хуудас руу буцах
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full py-4 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200 dark:shadow-none transition flex items-center justify-center gap-2 active:scale-95"
          >
            <MdLogout size={20} />
            Системээс гарах
          </button>
        </div>

      </div>
    </div>
  );
}