import React from 'react';

interface DiamondShineLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'hero' | 'intro';
  onClick?: () => void;
}

export const DiamondShineLogo: React.FC<DiamondShineLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'default',
  onClick,
}) => {
  // Height configurations
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-14 sm:h-16 md:h-18',
    xl: 'h-16 sm:h-20 md:h-24',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center group overflow-hidden select-none cursor-pointer ${className}`}
      role="banner"
    >
      {/* Ambient background glow for navy/dark backgrounds */}
      <div className="absolute inset-0 bg-radial from-[#d61f26]/20 via-[#c5a880]/10 to-transparent blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* The authentic transparent Hotel Diamond logo */}
      <div className="relative">
        <img
          src="/assets/aistudio/hotel_diamond_logo_transparent.png"
          alt="Hotel Diamond"
          className={`${heightClasses} w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(214,31,38,0.35)] transition-transform duration-300 group-hover:scale-[1.03]`}
        />

        {/* Diagonal metallic light sheen sweep animation */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ mixBlendMode: 'screen' }}
        >
          <div
            className="w-16 h-[250%] bg-gradient-to-r from-transparent via-white/45 to-transparent -rotate-25 absolute -top-1/2 left-0 animate-shimmer"
            style={{
              animation: 'diamondLightSweep 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
            }}
          />
        </div>

        {/* Sparkling Glint 1 - Diamond Tip */}
        <div
          className="absolute -top-1 left-2 sm:left-3 pointer-events-none"
          style={{
            animation: 'diamondSparkle 3.8s ease-in-out infinite',
          }}
        >
          <svg
            className="w-3.5 h-3.5 text-white/90 drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>

        {/* Sparkling Glint 2 - Lettering Reflection Accent */}
        <div
          className="absolute -bottom-1 right-4 pointer-events-none"
          style={{
            animation: 'diamondSparkle 3.8s ease-in-out 1.9s infinite',
          }}
        >
          <svg
            className="w-2.5 h-2.5 text-[#e6cca0] drop-shadow-[0_0_5px_rgba(230,204,160,0.8)]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
