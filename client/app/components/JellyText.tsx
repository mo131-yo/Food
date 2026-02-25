"use client";
import React, { useState } from "react";

interface JellyTextProps {
  text: string;
  className?: string;
  // Аль өнгийг ашиглахыг заах index (0 бол Strawberry, 1 бол Lime гэх мэт)
  flavorIndex?: number; 
}

// Ашиглах боломжтой өнгөнүүд
const FLAVORS = [
  { c: "oklch(72% 0.42 12  / 0.65)", cs: "oklch(22% 0.20 12  / 0.3)" }, // 0: Strawberry (Улаан)
  { c: "oklch(75% 0.40 138 / 0.65)", cs: "oklch(22% 0.18 138 / 0.3)" }, // 1: Lime (Ногоон)
  { c: "oklch(70% 0.38 232 / 0.65)", cs: "oklch(16% 0.15 232 / 0.3)" }, // 2: Blue Razz (Цэнхэр)
  { c: "oklch(70% 0.02 240 / 0.65)", cs: "oklch(30% 0.02 240 / 0.3)" }, // 3: Steel Grey (Саарал)
];

const JellyText: React.FC<JellyTextProps> = ({ text, className, flavorIndex = 0 }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const playJiggle = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const triggerLetter = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget;
    target.classList.remove("is-jiggling");
    void target.offsetWidth; 
    target.classList.add("is-jiggling");
  };

  // Сонгосон index-ийн дагуу өнгийг авах (Хэрэв байхгүй бол 0 буюу улааныг авна)
  const selectedFlavor = FLAVORS[flavorIndex] || FLAVORS[0];

  return (
    <h1 
      onClick={playJiggle}
      className={`jelly-hero ${isAnimating ? "force-jelly" : ""} ${className}`}
      style={{ fontFamily: "'Sour Gummy', sans-serif" }}
    >
      {text.split("").map((char, i) => {
        const isSpace = char === " ";
        
        return (
          <span
            key={i}
            className="jelly-letter"
            data-char={isSpace ? "\u00A0" : char}
            onMouseEnter={triggerLetter}
            style={{
              "--i": i,
              "--c": selectedFlavor.c,  // Сонгосон нэг өнгө
              "--cs": selectedFlavor.cs,
            } as React.CSSProperties}
          >
            {isSpace ? "\u00A0" : char}
          </span>
        );
      })}
    </h1>
  );
};

export default JellyText;