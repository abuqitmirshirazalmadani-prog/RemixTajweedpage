"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PremiumMarqueeProps {
  items: string[];
  speed?: string; // e.g. "80s", "120s"
  variant?: "brand" | "subtle" | "dark" | "outline"; 
  direction?: "left" | "right";
  className?: string;
}

export function PremiumMarquee({
  items,
  speed = "80s",
  variant = "brand",
  direction = "left",
  className,
}: PremiumMarqueeProps) {
  if (!items || items.length === 0) return null;

  // Combine items with high-end luxury star/diamond symbols standard for fine editorial structures
  const marqueeText = items.map(item => item.trim()).join("  ✦  ") + "  ✦  ";

  // Defined styling palettes to contrast beautifully with full black and our lime branding
  const variantClasses = {
    brand: "bg-[#C8EB5F] text-black border-y border-[#C8EB5F]/50 py-3.5",
    subtle: "bg-neutral-950/60 text-neutral-300 border-y border-white/5 py-4 backdrop-blur-sm",
    dark: "bg-zinc-950 text-neutral-450 border-y border-white/5 py-3.5",
    outline: "bg-transparent text-white/50 border-y border-white/10 py-3",
  };

  const fontClasses = {
    brand: "font-mono text-xs uppercase font-semibold tracking-[0.15em]",
    subtle: "font-serif text-sm font-light tracking-wide uppercase",
    dark: "font-mono text-[11px] uppercase tracking-[0.18em]",
    outline: "font-serif text-xs font-light tracking-widest uppercase",
  };

  return (
    <div id="premium-editorial-ticker" className={cn("overflow-hidden relative z-20 w-full", variantClasses[variant], className)}>
      <div 
        className="flex w-max animate-marquee space-x-12" 
        style={{ 
          "--duration": speed,
          animationDirection: direction === "right" ? "reverse" : "normal"
        } as React.CSSProperties}
      >
        {/* Render multiple offsets to guarantee safe absolute loop coverage on any display resolution */}
        <span className={cn("whitespace-nowrap select-none", fontClasses[variant])}>
          {marqueeText} {marqueeText} {marqueeText} {marqueeText}
        </span>
      </div>
    </div>
  );
}
