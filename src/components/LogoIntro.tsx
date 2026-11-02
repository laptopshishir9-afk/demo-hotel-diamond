import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DiamondShineLogo } from './DiamondShineLogo';

interface LogoIntroProps {
  onComplete: () => void;
}

export const LogoIntro: React.FC<LogoIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // 0: Initial dark navy canvas
    // 1: Diamond emblem appears with light reflection (0.3s)
    // 2: Letters assemble individually (0.8s)
    // 3: Full metallic logo glow (1.8s)
    // 4: Complete transition (2.8s)
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 850);
    const t3 = setTimeout(() => setPhase(3), 1800);
    const t4 = setTimeout(() => {
      setPhase(4);
      setTimeout(onComplete, 400);
    }, 2800);

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 3.8, 100));
    }, 100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearInterval(interval);
    };
  }, [onComplete]);

  const hotelLetters = ['H', 'O', 'T', 'E', 'L'];
  const diamondLetters = ['D', 'I', 'A', 'M', 'O', 'N', 'D'];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050b16] select-none overflow-hidden"
    >
      {/* Cinematic subtle navy & ruby ambient lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(214,31,38,0.18)_0%,rgba(14,34,63,0.35)_45%,transparent_75%)]" />

      {/* Skip button */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase text-neutral-300 bg-[#0e223f]/80 hover:bg-[#153159] hover:text-white border border-[#1b3a66] rounded-full transition-all duration-200 shadow-md"
        >
          <span>Skip Intro</span>
          <span className="text-[10px] opacity-60">→</span>
        </button>
      </div>

      {/* Center Cinematic Container */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl px-6 text-center">
        {/* Transparent Logo Reveal with Diamond-Shine effect */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ scale: 0.82, opacity: 0, filter: 'brightness(1.5)' }}
              animate={{ scale: 1, opacity: 1, filter: 'brightness(1)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6"
            >
              {/* Subtle gem gleam flare */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1.4, 1.8], rotate: 45 }}
                transition={{ duration: 1.1, delay: 0.2 }}
                className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-white/80 blur-md pointer-events-none"
              />

              {/* Verified Transparent Background Logo in Diamond-Shine presentation */}
              <div className="relative p-4 rounded-2xl bg-gradient-to-b from-white/10 to-[#0e223f]/40 border border-[#1b3a66]/80 backdrop-blur-md shadow-[0_0_60px_rgba(214,31,38,0.35)]">
                <DiamondShineLogo size="xl" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sequential Letter Assembly Matching Metallic Red & Silver Design */}
        <div className="flex flex-col items-center gap-1 mt-2">
          {/* Subtitle tag */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 8 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#c5a880] font-medium"
          >
            <span>Sandhikharka</span>
            <span className="w-1 h-1 rounded-full bg-[#c5a880]/60" />
            <span>Arghakhanchi, Nepal</span>
          </motion.div>

          {/* Letter Reveal Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2">
            {/* HOTEL */}
            <div className="flex items-center">
              {hotelLetters.map((char, index) => (
                <motion.span
                  key={`hotel-${index}`}
                  initial={{ opacity: 0, y: 14, scale: 0.85, filter: 'blur(4px)' }}
                  animate={{
                    opacity: phase >= 2 ? 1 : 0,
                    y: phase >= 2 ? 0 : 14,
                    scale: phase >= 2 ? 1 : 0.85,
                    filter: phase >= 2 ? 'blur(0px)' : 'blur(4px)',
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.1 + index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider font-serif bg-gradient-to-b from-[#ff4d4d] via-[#d61f26] to-[#7a0d11] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-[1px]"
                  style={{
                    WebkitTextStroke: '0.5px rgba(230, 230, 230, 0.7)',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* DIAMOND */}
            <div className="flex items-center">
              {diamondLetters.map((char, index) => (
                <motion.span
                  key={`diamond-${index}`}
                  initial={{ opacity: 0, y: 14, scale: 0.85, filter: 'blur(4px)' }}
                  animate={{
                    opacity: phase >= 2 ? 1 : 0,
                    y: phase >= 2 ? 0 : 14,
                    scale: phase >= 2 ? 1 : 0.85,
                    filter: phase >= 2 ? 'blur(0px)' : 'blur(4px)',
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.45 + index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider font-serif bg-gradient-to-b from-[#ff4d4d] via-[#d61f26] to-[#7a0d11] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-[1px]"
                  style={{
                    WebkitTextStroke: '0.5px rgba(230, 230, 230, 0.7)',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Warm Hospitality Caption */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 3 ? 0.95 : 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs sm:text-sm text-neutral-300 mt-3 font-light tracking-wide max-w-sm"
          >
            A Stay Worth Remembering
          </motion.p>
        </div>

        {/* Refined Bottom Progress Indicator */}
        <div className="mt-10 w-36 h-[2.5px] bg-[#0e223f] rounded-full overflow-hidden border border-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-[#d61f26] via-[#c5a880] to-white"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};
