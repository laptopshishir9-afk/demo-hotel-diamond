import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface TouchZoomImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
  onOpenLightbox?: () => void;
  aspectRatio?: string;
  priority?: boolean;
  children?: React.ReactNode;
  showExpandButton?: boolean;
  expandButtonLabel?: string;
}

export const TouchZoomImage: React.FC<TouchZoomImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  onClick,
  onOpenLightbox,
  aspectRatio,
  priority = false,
  children,
  showExpandButton = false,
  expandButtonLabel,
}) => {
  const [isTouchZoomed, setIsTouchZoomed] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartPos = useRef<{ x: number; y: number; time: number } | null>(null);
  const isScrolling = useRef<boolean>(false);

  // Close zoom on click or tap outside the image card
  useEffect(() => {
    if (!isTouchZoomed) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsTouchZoomed(false);
      }
    };

    // Use passive listener for performance
    window.addEventListener('touchstart', handleOutsideClick, { passive: true });
    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('touchstart', handleOutsideClick);
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isTouchZoomed]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartPos.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      };
      isScrolling.current = false;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPos.current || e.touches.length !== 1) return;
    const deltaX = Math.abs(e.touches[0].clientX - touchStartPos.current.x);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartPos.current.y);

    // If moved more than 8 pixels, user is actively scrolling, not tapping
    if (deltaX > 8 || deltaY > 8) {
      isScrolling.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const elapsed = Date.now() - touchStartPos.current.time;

    // Only handle if it was a quick, deliberate tap without scrolling
    if (!isScrolling.current && elapsed < 400) {
      // Toggle touch zoom on mobile
      setIsTouchZoomed((prev) => !prev);
    }

    touchStartPos.current = null;
    isScrolling.current = false;
  };

  const handleDesktopClick = (e: React.MouseEvent) => {
    // If an explicit onClick or lightbox handler is provided and on desktop, call it
    if (onClick) {
      onClick();
    } else if (onOpenLightbox) {
      onOpenLightbox();
    }
  };

  const handleExpandAction = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (onOpenLightbox) {
      onOpenLightbox();
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleDesktopClick}
      className={`group relative overflow-hidden select-none ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className={`w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform ${
          isTouchZoomed ? 'scale-[1.08] brightness-105' : 'group-hover:scale-105'
        } ${className}`}
      />

      {/* Touch Zoom Active Status Hint Pill for Mobile */}
      {isTouchZoomed && (
        <div className="absolute top-3 left-3 z-20 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md border border-[#c5a880]/40 text-[11px] text-[#c5a880] shadow-lg animate-fade-in sm:hidden">
          <ZoomOut className="w-3.5 h-3.5" />
          <span>Tap to reset</span>
        </div>
      )}

      {/* Optional Dedicated Fullscreen Lightbox Button if requested */}
      {showExpandButton && (onOpenLightbox || onClick) && (
        <button
          type="button"
          onClick={handleExpandAction}
          onTouchEnd={handleExpandAction}
          className="absolute top-3 right-3 z-20 px-2.5 py-1.5 rounded-lg bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
          title="Open Fullscreen Photo"
        >
          <Maximize2 className="w-3.5 h-3.5 text-[#c5a880]" />
          {expandButtonLabel && <span className="text-[11px] font-medium">{expandButtonLabel}</span>}
        </button>
      )}

      {/* Nested overlay elements like gradient scrims, badges, tags */}
      {children}
    </div>
  );
};
