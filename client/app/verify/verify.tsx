// // "use client";
// // import React, { useState } from 'react';
// // import toast from 'react-hot-toast';

// // export default function SignUpStep1() {
// //   const [email, setEmail] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     try {
// //       const res = await fetch('http://localhost:8000/users/first-signup', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email }),
// //       });
// //       const data = await res.json();
      
// //       if (res.ok) {
// //         toast.success(data.message);
// //       } else {
// //         toast.error(data.message);
// //       }
// //     } catch (error) {
// //       toast.error("Алдаа гарлаа");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
// //       <form onSubmit={handleSubmit} className="p-8 bg-white shadow-xl rounded-2xl w-96 border">
// //         <h1 className="text-2xl font-bold mb-6 text-center">Бүртгүүлэх</h1>
// //         <p className="text-sm text-gray-500 mb-4">Та и-мэйл хаягаа оруулна уу. Бид танд баталгаажуулах линк илгээх болно.</p>
// //         <input 
// //           type="email" 
// //           placeholder="Email address"
// //           className="w-full p-3 border rounded-lg mb-4 outline-none focus:ring-2 focus:ring-red-500"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           required
// //         />
// //         <button 
// //           disabled={loading}
// //           className="w-full bg-red-500 text-white p-3 rounded-lg font-bold hover:bg-red-600 transition"
// //         >
// //           {loading ? "Илгээж байна..." : "Үргэлжлүүлэх"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }


// "use client";
// import { useSearchParams, useRouter } from 'next/navigation';
// import React, { useState, Suspense } from 'react';
// import toast from 'react-hot-toast';

// function VerifyContent() {
//   const searchParams = useSearchParams();
//   const token = searchParams.get('token');
//   const router = useRouter();
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleFinalSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!token) return toast.error("Токен олдсонгүй!");

//     setLoading(true);
//     try {
//       const res = await fetch('http://localhost:8000/users/last-signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token, password }),
//       });
//       const data = await res.json();

//       if (res.ok) {
//         toast.success("Бүртгэл амжилттай! Одоо нэвтэрнэ үү.");
//         router.push('/login');
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("Алдаа гарлаа");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <form onSubmit={handleFinalSignUp} className="p-8 bg-white shadow-xl rounded-2xl w-96 border">
//         <h2 className="text-xl font-bold mb-4">Нууц үгээ тохируулна уу</h2>
//         <input 
//           type="password" 
//           placeholder="Шинэ нууц үг"
//           className="w-full p-3 border rounded-lg mb-4"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button disabled={loading} className="w-full bg-green-500 text-white p-3 rounded-lg font-bold">
//           {loading ? "Бүртгэж байна..." : "Бүртгэл дуусгах"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default function VerifyEmailPage() {
//   return (
//     <Suspense fallback={<div>Уншиж байна...</div>}>
//       <VerifyContent />
//     </Suspense>
//   );
// }


"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState, Suspense } from 'react';
import toast from 'react-hot-toast';

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // URL-аас ?token=... хэсгийг салгаж авна
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFinishSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Токен олдсонгүй эсвэл хүчингүй байна!");
      return;
    }

    setLoading(true);
    try {
      // Одоо Бэкэнд рүүгээ (Port 8000) эцсийн бүртгэлийг илгээнэ
      const res = await fetch('http://localhost:8000/users/last-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Бүртгэл амжилттай! Одоо нэвтэрнэ үү.");
        router.push('/login'); // Нэвтрэх хуудас руу шилжүүлнэ
      } else {
        toast.error(data.message || "Алдаа гарлаа");
      }
    } catch (error) {
      toast.error("Сервертэй холбогдож чадсангүй");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg border w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">Бүртгэл баталгаажуулах</h1>
        <p className="text-gray-500 text-sm mb-6 text-center">
          Та шинэ нууц үгээ зохиож бүртгэлээ дуусгана уу.
        </p>

        <form onSubmit={handleFinishSignUp} className="space-y-4">
          <input 
            type="password" 
            placeholder="Шинэ нууц үг"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-red-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-bold transition ${
              loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {loading ? "Бүртгэж байна..." : "Бүртгэл дуусгах"}
          </button>
        </form>
      </div>
    </div>
  );
}

// Next.js дээр useSearchParams ашиглахдаа заавал Suspense ашиглана
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Уншиж байна...</div>}>
      <VerifyEmailForm />
    </Suspense>
  );
}