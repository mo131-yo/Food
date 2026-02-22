"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState, Suspense } from 'react';
import toast from 'react-hot-toast';

function VerifyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Бэкэнд замтайгаа яг ижилхэн /last-sign-up (зураастай) байх ёстой
      const res = await fetch('https://food-ahv2.onrender.com/users/last-sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Амжилттай! Одоо нэвтэрнэ үү.");
        router.push('/login');
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleFinish} className="p-10 bg-white shadow-2xl rounded-[32px] w-full max-w-md border">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Нууц үг тохируулах</h2>
        <input 
          type="password" 
          placeholder="Шинэ нууц үг"
          className="w-full p-4 border border-gray-200 rounded-2xl mb-4 outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button 
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-bold text-white transition active:scale-95 ${
            loading ? 'bg-gray-400' : 'bg-[#FF3838] hover:bg-red-600'
          }`}
        >
          {loading ? "Хадгалж байна..." : "Бүртгэл дуусгах"}
        </button>
      </form>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Уншиж байна...</div>}>
      <VerifyForm />
    </Suspense>
  );
}

// "use client";
// import { useSearchParams, useRouter } from 'next/navigation';
// import React, { useState, Suspense } from 'react';
// import toast from 'react-hot-toast';

// function VerifyEmailForm() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
  
//   // URL-аас ?token=... хэсгийг салгаж авна
//   const token = searchParams.get('token');
  
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleFinishSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!token) {
//       toast.error("Токен олдсонгүй эсвэл хүчингүй байна!");
//       return;
//     }

//     setLoading(true);
//     try {
//       // Одоо Бэкэнд рүүгээ (Port 8000) эцсийн бүртгэлийг илгээнэ
//       const res = await fetch('https://food-ahv2.onrender.com/users/last-signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success("Бүртгэл амжилттай! Одоо нэвтэрнэ үү.");
//         router.push('/login'); // Нэвтрэх хуудас руу шилжүүлнэ
//       } else {
//         toast.error(data.message || "Алдаа гарлаа");
//       }
//     } catch (error) {
//       toast.error("Сервертэй холбогдож чадсангүй");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg border w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">Бүртгэл баталгаажуулах</h1>
//         <p className="text-gray-500 text-sm mb-6 text-center">
//           Та шинэ нууц үгээ зохиож бүртгэлээ дуусгана уу.
//         </p>

//         <form onSubmit={handleFinishSignUp} className="space-y-4">
//           <input 
//             type="password" 
//             placeholder="Шинэ нууц үг"
//             className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-red-500 transition"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             minLength={6}
//           />
//           <button 
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 rounded-lg text-white font-bold transition ${
//               loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
//             }`}
//           >
//             {loading ? "Бүртгэж байна..." : "Бүртгэл дуусгах"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// // Next.js дээр useSearchParams ашиглахдаа заавал Suspense ашиглана
// export default function VerifyEmailPage() {
//   return (
//     <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Уншиж байна...</div>}>
//       <VerifyEmailForm />
//     </Suspense>
//   );
// }