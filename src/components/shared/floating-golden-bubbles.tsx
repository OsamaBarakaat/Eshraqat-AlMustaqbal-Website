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
      className={`pointer-events-none absolute inset-0 overflow-hidden -z-10 ${className}`}
    >
      {/* 1. Primary Big Golden Orb - Top Left */}
      <motion.div
        animate={{
          x: [0, 45, -30, 0],
          y: [0, -40, 25, 0],
          scale: [1, 1.12, 0.96, 1],
          opacity: [0.35, 0.55, 0.4, 0.35],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-24 -left-20 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#C5A059]/20 via-[#E5C178]/15 to-transparent blur-[120px]"
      />

      {/* 2. Secondary Big Golden Orb - Middle Right */}
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 60, -35, 0],
          scale: [1, 1.18, 0.92, 1],
          opacity: [0.3, 0.5, 0.35, 0.3],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/3 -right-24 w-[520px] h-[520px] rounded-full bg-gradient-to-bl from-[#D4AF37]/25 via-[#997736]/15 to-transparent blur-[140px]"
      />

      {/* 3. Warm Ambient Center Orb - Subtle Glow */}
      <motion.div
        animate={{
          x: [0, 35, -40, 0],
          y: [0, -30, 45, 0],
          scale: [0.95, 1.1, 1, 0.95],
          opacity: [0.2, 0.4, 0.25, 0.2],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-2/3 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#C5A059]/15 via-[#B38F44]/10 to-transparent blur-[130px]"
      />

      {/* 4. Bottom Left Golden Orb */}
      <motion.div
        animate={{
          x: [0, 40, -25, 0],
          y: [0, -45, 30, 0],
          scale: [1, 1.15, 0.9, 1],
          opacity: [0.25, 0.45, 0.3, 0.25],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-28 left-10 w-[440px] h-[440px] rounded-full bg-gradient-to-br from-[#E5C178]/20 via-[#C5A059]/10 to-transparent blur-[125px]"
      />

      {/* Floating Sparkle Bubble 1 */}
      <motion.div
        animate={{
          y: [0, -70, 0],
          x: [0, 20, 0],
          opacity: [0.3, 0.7, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-28 h-28 rounded-full bg-[#C5A059]/25 blur-[40px]"
      />

      {/* Floating Sparkle Bubble 2 */}
      <motion.div
        animate={{
          y: [0, 80, 0],
          x: [0, -25, 0],
          opacity: [0.25, 0.65, 0.25],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-[#E5C178]/20 blur-[45px]"
      />

      {/* Floating Sparkle Bubble 3 */}
      <motion.div
        animate={{
          y: [0, -50, 0],
          x: [0, -15, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute bottom-1/3 left-1/2 w-24 h-24 rounded-full bg-[#C5A059]/20 blur-[35px]"
      />
    </div>
  );
}
