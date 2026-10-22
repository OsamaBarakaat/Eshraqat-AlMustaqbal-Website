"use client";

import React from "react";
import { motion } from "framer-motion";

interface FloatingGoldenBubblesProps {
  className?: string;
}

export function FloatingGoldenBubbles({ className = "" }: FloatingGoldenBubblesProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden z-0 select-none ${className}`}
    >
      {/* ================= 1. Large Ambient Radiant Gold Glows ================= */}
      {/* Top Left Golden Glow */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.55, 0.8, 0.6, 0.55],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-20 -left-20 w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-[#C5A059]/35 via-[#E5C178]/25 to-transparent blur-[90px]"
      />

      {/* Top Right Golden Glow */}
      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -40, 0],
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.5, 0.75, 0.55, 0.5],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-40 -right-24 w-[520px] h-[520px] rounded-full bg-gradient-to-bl from-[#D4AF37]/35 via-[#997736]/20 to-transparent blur-[100px]"
      />

      {/* Mid-Center Golden Aura */}
      <motion.div
        animate={{
          x: [0, 40, -50, 0],
          y: [0, -35, 45, 0],
          scale: [0.95, 1.15, 1, 0.95],
          opacity: [0.45, 0.7, 0.5, 0.45],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-1/2 left-1/4 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#C5A059]/30 via-[#E6C687]/20 to-transparent blur-[95px]"
      />

      {/* ================= 2. Distinct Floating Golden Bubbles (Glass Spheres) ================= */}
      {/* Bubble 1: Big prominent bubble top-left */}
      <motion.div
        animate={{
          y: [0, -60, 20, 0],
          x: [0, 35, -25, 0],
          rotate: [0, 45, 90, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-28 left-[12%] w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-[#C5A059]/40 bg-gradient-to-br from-[#E5C178]/25 via-[#C5A059]/15 to-transparent backdrop-blur-[2px] shadow-[0_0_50px_rgba(197,160,89,0.35),inset_0_0_25px_rgba(255,225,150,0.25)]"
      />

      {/* Bubble 2: Medium floating bubble right-mid */}
      <motion.div
        animate={{
          y: [0, 70, -30, 0],
          x: [0, -40, 25, 0],
          rotate: [0, -60, -120, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/3 right-[15%] w-40 h-40 sm:w-52 sm:h-52 rounded-full border border-[#D4AF37]/45 bg-gradient-to-tl from-[#C5A059]/30 via-[#B38F44]/15 to-transparent backdrop-blur-[2px] shadow-[0_0_60px_rgba(212,175,55,0.4),inset_0_0_30px_rgba(255,230,160,0.3)]"
      />

      {/* Bubble 3: Floating bubble lower center */}
      <motion.div
        animate={{
          y: [0, -80, 40, 0],
          x: [0, 45, -35, 0],
        }}
        transition={{
          duration: 21,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute top-2/3 left-[20%] w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-[#C5A059]/40 bg-gradient-to-tr from-[#E5C178]/20 via-[#C5A059]/10 to-transparent backdrop-blur-[2px] shadow-[0_0_55px_rgba(197,160,89,0.3),inset_0_0_25px_rgba(255,225,150,0.2)]"
      />

      {/* Bubble 4: Smaller fast bubble top-right */}
      <motion.div
        animate={{
          y: [0, -50, 0],
          x: [0, -25, 0],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-16 right-[28%] w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-[#C5A059]/50 bg-gradient-to-b from-[#E5C178]/30 to-transparent shadow-[0_0_40px_rgba(197,160,89,0.35)]"
      />

      {/* Bubble 5: Small floating orb bottom-right */}
      <motion.div
        animate={{
          y: [0, 60, 0],
          x: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-40 right-[10%] w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-[#C5A059]/40 bg-gradient-to-br from-[#D4AF37]/25 via-transparent to-transparent shadow-[0_0_45px_rgba(212,175,55,0.35)]"
      />

      {/* Bubble 6: Glowing golden accent bubble mid-left */}
      <motion.div
        animate={{
          y: [0, -65, 0],
          x: [0, 20, 0],
          opacity: [0.6, 0.95, 0.6],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-[45%] left-[8%] w-28 h-28 rounded-full border border-[#E5C178]/60 bg-gradient-to-tr from-[#C5A059]/35 to-transparent shadow-[0_0_35px_rgba(229,193,120,0.5)]"
      />
    </div>
  );
}
