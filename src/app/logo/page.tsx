"use client";

import React, { useRef, useState, useEffect } from "react";
import { Download, Check, Sparkles, Image as ImageIcon, ShieldAlert, FileCode } from "lucide-react";
import { NavigationHeader } from "@/components/ui/navigation-header";
import { motion } from "motion/react";

export default function LogoBrandingPortal() {
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Raw SVG content to paint on HTML canvas for client-side rasterization to JPG/PNG
  const svgMarkup = `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A67C1E" />
      <stop offset="30%" stop-color="#F2D279" />
      <stop offset="70%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#805C10" />
    </linearGradient>
    <linearGradient id="lime-grad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#99B835" />
      <stop offset="50%" stop-color="#C8EB5F" />
      <stop offset="100%" stop-color="#E2FF85" />
    </linearGradient>
    <radialGradient id="bg-radial" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#14161F" />
      <stop offset="100%" stop-color="#050608" />
    </radialGradient>
    <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="300" height="300" rx="40" fill="url(#bg-radial)" />
  <rect width="298" height="298" x="1" y="1" rx="39" stroke="url(#gold-grad)" stroke-width="1.5" stroke-opacity="0.15" />
  <circle cx="150" cy="142" r="105" stroke="url(#gold-grad)" stroke-width="0.75" stroke-dasharray="2 4" stroke-opacity="0.25" />
  <circle cx="150" cy="142" r="95" stroke="url(#lime-grad)" stroke-width="0.5" stroke-opacity="0.15" />
  <g transform="translate(150, 142)">
    <path d="M 0,-115 L 4,-111 L 0,-107 L -4,-111 Z" fill="url(#gold-grad)" />
    <path d="M 0,115 L 4,111 L 0,107 L -4,111 Z" fill="url(#gold-grad)" />
    <path d="M -115,0 L -111,4 L -107,0 L -111,-4 Z" fill="url(#gold-grad)" />
    <path d="M 115,0 L 111,4 L 107,0 L 111,-4 Z" fill="url(#gold-grad)" />
  </g>
  <path d="M 150,172 C 122,172 90,148 70,115 C 85,110 110,125 150,140 Z" fill="url(#gold-grad)" fill-opacity="0.15" />
  <path d="M 150,172 C 178,172 210,148 230,115 C 215,110 190,125 150,140 Z" fill="url(#gold-grad)" fill-opacity="0.15" />
  <path d="M 150,165 C 115,165 85,138 65,110 C 85,108 112,122 148,136 C 149,136 150,145 150,165 Z" fill="url(#gold-grad)" />
  <path d="M 150,165 C 185,165 215,138 235,110 C 215,108 188,122 152,136 C 151,136 150,145 150,165 Z" fill="url(#gold-grad)" />
  <path d="M 68,100 C 105,75 195,75 232,100 C 210,75 90,75 68,100 Z" fill="url(#lime-grad)" />
  <path d="M 150,56 C 110,56 80,72 65,88 C 76,78 108,66 150,66 Z" fill="url(#lime-grad)" filter="url(#glow)" opacity="0.8" />
  <path d="M 150,56 C 190,56 220,72 235,88 C 224,78 192,66 150,66 Z" fill="url(#lime-grad)" filter="url(#glow)" opacity="0.8" />
  <path d="M 150,135 C 144,115 141,85 150,70 C 159,85 156,115 150,135 Z" fill="url(#lime-grad)" />
  <circle cx="150" cy="62" r="5" fill="url(#lime-grad)" />
  <text x="150" y="242" font-family="'Cormorant Garamond', serif, sans-serif" font-size="16" font-weight="bold" fill="url(#gold-grad)" letter-spacing="9" text-anchor="middle">TAJWEED</text>
  <text x="150" y="264" font-family="'Cormorant Garamond', serif, sans-serif" font-size="12" font-weight="normal" fill="url(#lime-grad)" letter-spacing="6" text-anchor="middle">PAGE</text>
  <line x1="85" y1="210" x2="215" y2="210" stroke="url(#lime-grad)" stroke-width="1.2" stroke-opacity="0.3" stroke-dasharray="30 4 4 4 30" />
</svg>`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const handleDownload = (format: "svg" | "png" | "jpeg") => {
    setDownloadingFormat(format);
    
    setTimeout(() => {
      if (format === "svg") {
        // Download raw vector
        const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "tajweedpage-logo-300px.svg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        // Draw to HTML Canvas & rasterize client-side
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        const svgBlob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
          ctx.clearRect(0, 0, 300, 300);
          ctx.drawImage(img, 0, 0, 300, 300);
          
          let downloadUrl = "";
          let filename = "";

          if (format === "png") {
            downloadUrl = canvas.toDataURL("image/png");
            filename = "tajweedpage-logo-300px.png";
          } else {
            downloadUrl = canvas.toDataURL("image/jpeg", 0.95);
            filename = "tajweedpage-logo-300px.jpg";
          }

          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        };

        img.src = url;
      }
      setDownloadingFormat(null);
    }, 800);
  };

  return (
    <div className="bg-black min-h-screen text-white relative font-sans">
      <NavigationHeader currentPage="branding" />
      
      {/* Background ambience */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-transparent via-[#C8EB5F]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      
      <main className="max-w-5xl mx-auto px-6 pt-36 pb-24 relative z-10 space-y-12">
        
        {/* Intro */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <p className="inline-flex items-center gap-2 bg-[#C8EB5F]/10 border border-[#C8EB5F]/20 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8EB5F] animate-pulse"></span>
            <span className="text-[9px] tracking-[0.25em] font-mono text-[#C8EB5F] uppercase font-bold">Brand Identity Hub</span>
          </p>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight font-serif uppercase text-white">
            TajweedPage Logo Portal
          </h1>
          <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed max-w-lg mx-auto">
            Rendered crisp and ready for publication. Easily export your 300 &times; 300px professional logos for application headers, portals, registers, and global systems.
          </p>
        </div>

        {/* Central Display */}
        <div className="grid md:grid-cols-12 gap-8 items-stretch pt-6">
          
          {/* Left panel: 300x300 Logo Preview */}
          <div className="md:col-span-5 flex flex-col justify-center items-center bg-zinc-950/80 border border-white/5 p-10 rounded-[32px] text-center space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500 font-bold block">
              1:1 Active Asset Preview
            </span>
            
            {/* The actual live interactive SVG */}
            <div className="w-[200px] h-[200px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative group bg-black">
              <div 
                className="w-full h-full transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-out"
                dangerouslySetInnerHTML={{ __html: svgMarkup }}
              />
            </div>
            
            <div>
              <span className="text-xs text-neutral-400 font-serif italic block">"Classical symmetry meets modern luxury"</span>
              <span className="text-[10px] font-mono text-[#C8EB5F] tracking-wider block mt-1">Recommended: 300 &times; 300px</span>
            </div>
          </div>

          {/* Right panel: Download Formats & Specifications */}
          <div className="md:col-span-7 bg-zinc-950/40 border border-white/5 p-8 rounded-[32px] flex flex-col justify-between space-y-8">
            
            {/* Download section */}
            <div className="space-y-4">
              <h3 className="text-lg font-serif text-white tracking-wide uppercase">
                Export Options
              </h3>
              <p className="text-neutral-400 text-xs font-light">
                Click any of our approved formats below to download a flawless 300 &times; 300px logo asset straight to your workspace device.
              </p>

              <div className="space-y-3 pt-2">
                {/* PNG option */}
                <button
                  onClick={() => handleDownload("png")}
                  disabled={downloadingFormat !== null}
                  className="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-850 border border-white/5 hover:border-white/15 rounded-2xl text-left group transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#C8EB5F]/10 flex items-center justify-center text-[#C8EB5F]">
                      <ImageIcon size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-bold font-mono tracking-wider text-white block">PNG Format (300px)</span>
                      <span className="text-[10px] text-neutral-500 block font-light">Lossless raster, ideal for dark/light websites and headers</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#C8EB5F] border border-[#C8EB5F]/20 px-2.5 py-1 rounded-full group-hover:bg-[#C8EB5F] group-hover:text-black transition-all">
                    {downloadingFormat === "png" ? "processing" : "download"}
                  </span>
                </button>

                {/* JPEG option */}
                <button
                  onClick={() => handleDownload("jpeg")}
                  disabled={downloadingFormat !== null}
                  className="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-850 border border-white/5 hover:border-white/15 rounded-2xl text-left group transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                      <ImageIcon size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-bold font-mono tracking-wider text-white block">JPEG Format (300px)</span>
                      <span className="text-[10px] text-neutral-500 block font-light">Universal compression, with luxurious solid black backing</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full group-hover:bg-amber-400 group-hover:text-black transition-all">
                    {downloadingFormat === "jpeg" ? "processing" : "download"}
                  </span>
                </button>

                {/* SVG option */}
                <button
                  onClick={() => handleDownload("svg")}
                  disabled={downloadingFormat !== null}
                  className="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-850 border border-white/5 hover:border-white/15 rounded-2xl text-left group transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <FileCode size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-bold font-mono tracking-wider text-white block">SVG Vector Source</span>
                      <span className="text-[10px] text-neutral-500 block font-light">Pristine infinite vector scaling, supports direct code placement</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full group-hover:bg-emerald-400 group-hover:text-black transition-all">
                    {downloadingFormat === "svg" ? "processing" : "download"}
                  </span>
                </button>
              </div>
            </div>

            {/* Design Spec palette details */}
            <div className="border-t border-white/5 pt-6 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500 font-bold block">
                Primary Brand Color Codes
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => copyToClipboard("#C8EB5F")}
                  className="bg-zinc-900/60 p-3 rounded-xl border border-white/5 hover:border-white/15 cursor-pointer flex justify-between items-center transition"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#C8EB5F] border border-white/10" />
                    <span className="text-xs font-mono text-white">#C8EB5F</span>
                  </div>
                  <span className="text-[9px] font-mono text-neutral-500">
                    {copiedColor === "#C8EB5F" ? "copied" : "copy"}
                  </span>
                </div>

                <div 
                  onClick={() => copyToClipboard("#D4AF37")}
                  className="bg-zinc-900/60 p-3 rounded-xl border border-white/5 hover:border-white/15 cursor-pointer flex justify-between items-center transition"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#D4AF37] border border-white/10" />
                    <span className="text-xs font-mono text-white">#D4AF37</span>
                  </div>
                  <span className="text-[9px] font-mono text-neutral-500">
                    {copiedColor === "#D4AF37" ? "copied" : "copy"}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Informational Guidance Notification */}
        <div className="bg-zinc-950 border border-white/5 p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center gap-4 text-left">
          <div className="p-3 bg-amber-500/10 rounded-full text-amber-300">
            <Sparkles size={20} />
          </div>
          <div className="space-y-1 flex-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Workspace Integration Recommendation
            </h4>
            <p className="text-neutral-400 text-xs font-light leading-relaxed">
              We have compiled this professional asset pack and successfully generated a real <strong className="text-white">logo.svg</strong> file inside your public folder. This file can be natively loaded by modern web layout engines, portals, metadata manifests, and index frames directly under <code className="text-[#C8EB5F] bg-white/5 px-1 rounded">/logo.svg</code>.
            </p>
          </div>
        </div>

        {/* Hidden Canvas used purely to render the SVG to raster image client-side */}
        <canvas 
          ref={canvasRef} 
          width="300" 
          height="300" 
          className="hidden"
        />

      </main>
    </div>
  );
}
