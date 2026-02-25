"use client";
import { motion, useAnimation } from "framer-motion";
import React, { useState } from "react";

const TextItem = ({ text, className }: { text: string; className?: string }) => {
  const controls = useAnimation();
  const [isHovering, setIsHovering] = useState(false);

  const letters = text.split("");

  const handleMouseEnter = async () => {
    if (isHovering) return; // Хэрэв аль хэдийн ажиллаж байвал дахин эхлүүлэхгүй
    
    setIsHovering(true);

    // 1. Анимацыг эхлүүлнэ (Хэдэн секунд үргэлжлэх вэ гэдгийг энд удирдана)
    // repeat: 2 гэвэл 2 удаа давталт хийнэ, эсвэл хугацаагаар удирдаж болно
    await controls.start((i) => ({
      y: [-10, 10, 0],
      opacity: [1, 0, 0, 1],
      transition: {
        duration: 0.5,
        delay: i * 0.04,
        ease: "easeInOut",
        repeat: 1, // Энд давталтын тоог зааж өгснөөр хэдэн секунд hover байхыг шийднэ
        repeatDelay: 0.1
      },
    }));

    // 2. Анимац дууссаны дараа эсвэл хэдэн секундын дараа төлөвийг буцаана
    setTimeout(() => {
      setIsHovering(false);
    }, 1000); // 2 секундын дараа дахин hover хийх боломжтой болно
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      className={`flex cursor-pointer overflow-hidden ${className} ${isHovering ? 'text-red-500' : ''}`}
      style={{ display: "inline-flex" }}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          custom={i}
          animate={controls}
          className="inline-block"
          style={{ whiteSpace: "pre" }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TextItem;