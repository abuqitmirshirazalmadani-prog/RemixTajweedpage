"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

// Define the type for a single category item
export interface Category {
  id: string | number;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  featured?: boolean;
}

// Define the props for the CategoryList component
export interface CategoryListProps {
  title: string;
  subtitle?: string;
  categories: Category[];
  headerIcon?: React.ReactNode;
  className?: string;
}

export const CategoryList = ({
  title,
  subtitle,
  categories,
  headerIcon,
  className,
}: CategoryListProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | number | null>(null);

  return (
    <div id="courses-section" className={cn("w-full bg-black text-white p-8 md:py-24", className)}>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          {headerIcon && (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#C8EB5F]/20 to-[#C8EB5F]/80 mb-6 text-black">
              {headerIcon}
            </div>
          )}
          <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-2 uppercase">{title}</h2>
          {subtitle && (
            <h3 className="text-3xl md:text-4xl font-serif font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#C8EB5F] to-emerald-300">{subtitle}</h3>
          )}
        </div>

        {/* Categories List */}
        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group"
              onMouseEnter={() => setHoveredItem(category.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={category.onClick}
            >
              <div
                className={cn(
                  "relative overflow-hidden border bg-zinc-950/40 transition-all duration-500 ease-in-out cursor-pointer rounded-2xl",
                  // Hover state styles
                  hoveredItem === category.id
                    ? 'min-h-[140px] border-[#C8EB5F]/50 shadow-lg shadow-[#C8EB5F]/5 bg-[#C8EB5F]/5'
                    : 'min-h-[100px] border-white/5 hover:border-white/10'
                )}
              >
                {/* Corner brackets that appear on hover */}
                {hoveredItem === category.id && (
                  <>
                    <div className="absolute top-4 left-4 w-6 h-6">
                      <div className="absolute top-0 left-0 w-4 h-[1.5px] bg-[#C8EB5F]" />
                      <div className="absolute top-0 left-0 w-[1.5px] h-4 bg-[#C8EB5F]" />
                    </div>
                    <div className="absolute bottom-4 right-4 w-6 h-6">
                      <div className="absolute bottom-0 right-0 w-4 h-[1.5px] bg-[#C8EB5F]" />
                      <div className="absolute bottom-0 right-0 w-[1.5px] h-4 bg-[#C8EB5F]" />
                    </div>
                  </>
                )}

                {/* Content */}
                <div className="flex items-center justify-between min-h-[100px] py-6 px-6 md:px-10">
                  <div className="flex-1 pr-6">
                    <h3
                      className={cn(
                        "font-serif tracking-tight transition-colors duration-300 uppercase",
                        category.featured ? 'text-2xl md:text-3xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-[#C8EB5F]' : 'text-xl md:text-2xl font-light',
                        hoveredItem === category.id ? 'text-[#C8EB5F]' : 'text-white'
                      )}
                    >
                      {category.title}
                    </h3>
                    {category.subtitle && (
                      <p
                        className={cn(
                          "mt-2 transition-colors duration-300 text-xs md:text-sm font-sans font-light leading-relaxed",
                           hoveredItem === category.id ? 'text-neutral-300' : 'text-neutral-450'
                        )}
                      >
                        {category.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Icon appears on the right or guides */}
                  {category.icon && (
                    <div className={cn(
                      "transition-all duration-300 ease-in-out shrink-0",
                      hoveredItem === category.id 
                        ? "text-[#C8EB5F] opacity-100 scale-110 translate-x-0" 
                        : "text-neutral-500 opacity-40 translate-x-2"
                    )}>
                      {category.icon}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
