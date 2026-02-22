// "use client";
// import React, { useState } from 'react';
// import toast from 'react-hot-toast';

// export default function SignUpStep1() {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await fetch('https://food-ahv2.onrender.com/users/first-signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });
//       const data = await res.json();
      
//       if (res.ok) {
//         toast.success("Баталгаажуулах и-мэйл илгээлээ. Мэйлээ шалгана уу!");
//       } else {
//         toast.error(data.message || "Алдаа гарлаа");
//       }
//     } catch (error) {
//       toast.error("Сервертэй холбогдоход алдаа гарлаа");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <form onSubmit={handleSubmit} className="p-8 bg-white shadow-xl rounded-2xl w-96 border">
//         <h1 className="text-2xl font-bold mb-4">Бүртгүүлэх</h1>
//         <input 
//           type="email" 
//           placeholder="И-мэйл хаяг"
//           className="w-full p-3 border rounded-lg mb-4 outline-none focus:ring-2 focus:ring-red-500"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <button disabled={loading} className="w-full bg-red-500 text-white p-3 rounded-lg font-bold">
//           {loading ? "Илгээж байна..." : "Үргэлжлүүлэх"}
//         </button>
//       </form>
//     </div>
//   );
// }


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
      // localhost биш шууд Render-ийн хаягаа ашиглана
      const response = await fetch('http://localhost:8000/users/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Баталгаажуулах мэйл илгээлээ!");
      } else {
        // Серверээс ирсэн тодорхой алдааг харуулна (Жишээ нь: "Email бүртгэгдсэн байна")
        toast.error(data.message || "Алдаа гарлаа");
      }
    } catch (error) {
      // Хэрэв сервер унтсан эсвэл холболт тасарсан бол
      toast.error("Сервер сэрж байна, түр хүлээгээд дахин оролдоно уу (30 сек)");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-10 bg-white shadow-2xl rounded-[32px] w-96 border border-gray-100">
        <h1 className="text-2xl font-black mb-6 text-center">Бүртгүүлэх</h1>
        <input 
          type="email" 
          placeholder="И-мэйл хаяг"
          className="w-full p-4 border border-gray-200 rounded-2xl mb-4 outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button 
          disabled={loading} 
          className={`w-full py-4 rounded-2xl font-bold text-white transition active:scale-95 ${
            loading ? 'bg-gray-400' : 'bg-[#FF3838] hover:bg-red-600'
          }`}
        >
          {loading ? "Илгээж байна..." : "Үргэлжлүүлэх"}
        </button>
      </form>
    </div>
  );
} 