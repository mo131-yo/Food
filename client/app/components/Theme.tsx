// npm install next-themes lucide-react

"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IoMdRestaurant } from "react-icons/io";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-[55px] h-[30px]" />;

  const isDark = theme === "dark";

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative inline-block w-[55px] h-[30px]">
        <input
          type="checkbox"
          id="switch"
          className="sr-only" 
          checked={isDark}
          onChange={() => setTheme(isDark ? "light" : "dark")}
        />
        <label
          htmlFor="switch"
          className={`
            block w-full h-full cursor-pointer rounded-full 
            transition-colors duration-[1000ms]
            ${isDark ? "bg-yellow-500" : "bg-red-500"}
          `}
        >
          <span
            className={`
              absolute top-[5px] left-[4px] w-[20px] h-[20px] bg-white rounded-full
              shadow-lg
              /* Шилжилтийн тохиргоо */
                transition-all duration-[800ms] 
              ${isDark ? "translate-x-[27px]" : "translate-x-0"}
            `}
          />
        </label>
      </div>
    </div>
  );
};