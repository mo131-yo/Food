// import Image from "next/legacy/image";

// type HeaderUserProfileIconProps = {
//   profileImage?: string;
// };

// export const HeaderUserProfileIcon = ({
//   profileImage = "https://i.pinimg.com/736x/b2/b1/97/b2b197e5f03fc839ce36ffef82cfcf80.jpg",
// }: HeaderUserProfileIconProps) => {
//   return (
//     <div className="cursor-pointer">
//       <div className="relative overflow-hidden rounded-full h-9 w-9">
//         <Image
//           src={profileImage}
//           alt="cover_img"
//           layout="fill"
//           objectFit="cover"
//           priority
//         />
//       </div>
//     </div>
//   );
// };


"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import { LogOut, User, Settings } from "lucide-react";

type HeaderUserProfileIconProps = {
  profileImage?: string;
  userName?: string;
};

export const HeaderUserProfileIcon = ({
  profileImage = "https://i.pinimg.com/736x/b2/b1/97/b2b197e5f03fc839ce36ffef82cfcf80.jpg",
  userName = "Хэрэглэгч",
}: HeaderUserProfileIconProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Гадна талд нь дарахад цэс хаагдах логик
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token"); // Токен устгах
    router.push("/login"); // Нэвтрэх рүү шилжих
    router.refresh();
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Профайл икон - Дарахад цэс нээгдэнэ */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer relative overflow-hidden rounded-full h-9 w-9 border-2 border-transparent hover:border-green-500 transition-all shadow-sm"
      >
        <Image
          src={profileImage}
          alt="profile"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Унждаг цэс (Custom Dropdown) */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden border border-gray-100">
          <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
            <p className="text-xs text-gray-500">Системд нэвтэрсэн</p>
          </div>

          <div className="py-1">
            <button
              onClick={() => { router.push("/user/profile"); setIsOpen(false); }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <User className="mr-3 h-4 w-4 text-gray-400" />
              Миний мэдээлэл
            </button>
            <button
              onClick={() => { router.push("/user/settings"); setIsOpen(false); }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <Settings className="mr-3 h-4 w-4 text-gray-400" />
              Тохиргоо
            </button>
          </div>

          <div className="border-t border-gray-100 py-1">
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-medium"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Гарах
            </button>
          </div>
        </div>
      )}
    </div>
  );
};