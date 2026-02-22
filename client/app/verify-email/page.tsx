"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState, Suspense } from 'react';
import toast from 'react-hot-toast';

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token'); // Линкнээс токеныг авна
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleFinish = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) return toast.error("Нууц үг зөрүүтэй байна!");

  //   setLoading(true);
  //   try {
  //     // Бэкэнд дээрх userRouter.post("/last-sign-up", ...) хаяг руу илгээнэ
  //     const res = await fetch('http://localhost:8000/users/verify-email', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ token, password }),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       toast.success("Бүртгэл амжилттай!");
  //       router.push('/login');
  //     } else {
  //       toast.error(data.message || "Алдаа гарлаа");
  //     }
  //   } catch (error) {
  //     toast.error("Сервертэй холбогдоход алдаа гарлаа");
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  // VerifyEmailForm доторх handleFinish функц
const handleFinish = async (e: React.FormEvent) => {
  e.preventDefault();
  if (password !== confirmPassword) return toast.error("Нууц үг зөрүүтэй байна!");

  setLoading(true);
  try {
    // АНХААР: Замаа '/users/last-sign-up' болгож засах (Render хаягаа ашиглаарай)
    const res = await fetch('https://food-ahv2.onrender.com/users/last-sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Бүртгэл амжилттай!");
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
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-10">
      <form onSubmit={handleFinish} className="bg-white p-10 rounded-[32px] shadow-2xl border w-full max-w-md">
        <h1 className="text-2xl font-black mb-2 text-center text-gray-800">Нууц үг тохируулах</h1>
        <p className="text-gray-400 text-sm mb-8 text-center">Та шинэ нууц үгээ зохиож бүртгэлээ дуусгана уу.</p>
        
        <div className="space-y-4">
          <input 
            type="password" 
            placeholder="Шинэ нууц үг"
            className="w-full p-4 border border-gray-100 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-red-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <input 
            type="password" 
            placeholder="Нууц үг давтах"
            className="w-full p-4 border border-gray-100 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-red-500 transition"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button 
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-white transition active:scale-95 mt-4 ${
              loading ? 'bg-gray-400' : 'bg-[#FF3838] hover:bg-red-600 shadow-lg shadow-red-200'
            }`}
          >
            {loading ? "Бүртгэж байна..." : "Бүртгэл дуусгах"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen font-bold">Уншиж байна...</div>}>
      <VerifyEmailForm />
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