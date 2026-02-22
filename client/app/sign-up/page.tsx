"use client";
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function SignUpStep1() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/users/first-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if (res.ok) {
        toast.success("Баталгаажуулах и-мэйл илгээлээ. Мэйлээ шалгана уу!");
      } else {
        toast.error(data.message || "Алдаа гарлаа");
      }
    } catch (error) {
      toast.error("Сервертэй холбогдоход алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-xl rounded-2xl w-96 border">
        <h1 className="text-2xl font-bold mb-4">Бүртгүүлэх</h1>
        <input 
          type="email" 
          placeholder="И-мэйл хаяг"
          className="w-full p-3 border rounded-lg mb-4 outline-none focus:ring-2 focus:ring-red-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button disabled={loading} className="w-full bg-red-500 text-white p-3 rounded-lg font-bold">
          {loading ? "Илгээж байна..." : "Үргэлжлүүлэх"}
        </button>
      </form>
    </div>
  );
}