
"use client";

import { useState } from "react";
import { Globe, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Language } from "@/app/page";
import { translations } from "@/app/page";

interface MarketplaceProps {
  lang: Language;
  onOpenLangModal: () => void;
}

export function Marketplace({ lang, onOpenLangModal }: MarketplaceProps) {
  const [activeTab, setActiveTab] = useState<"stars" | "premium">("stars");
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#1a1f2e] text-white font-body animate-in fade-in duration-700 pb-32">
      {/* Custom Header */}
      <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-[#1a1f2e]/80 backdrop-blur-md z-30">
        {/* Left F1 Logo Style */}
        <div className="flex items-center gap-2 bg-[#00143a] p-1.5 rounded-full border border-white/5 pr-4 shadow-lg group cursor-pointer hover:bg-[#00205b] transition-all">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d="M21 16.5c0 .38-.21.71-.53.88l-7.97 4.19c-.32.17-.69.17-1.01 0l-7.97-4.19c-.32-.17-.53-.5-.53-.88V7.5c0-.38.21-.71.53-.88l7.97-4.19c.32-.17.69-.17 1.01 0l7.97 4.19c.32.17.53.5.53.88v9z"/>
            </svg>
          </div>
          <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
        </div>

        {/* Center Toggle */}
        <div className="bg-[#2c344a] p-1 rounded-full flex items-center shadow-inner">
          <button
            onClick={() => setActiveTab("stars")}
            className={cn(
              "px-6 py-1.5 rounded-full text-sm font-bold transition-all",
              activeTab === "stars" ? "bg-white text-black shadow-md" : "text-zinc-400 hover:text-white"
            )}
          >
            {t.stars}
          </button>
          <button
            onClick={() => setActiveTab("premium")}
            className={cn(
              "px-6 py-1.5 rounded-full text-sm font-bold transition-all",
              activeTab === "premium" ? "bg-white text-black shadow-md" : "text-zinc-400 hover:text-white"
            )}
          >
            {t.premium}
          </button>
        </div>

        {/* Right Globe */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-purple-600 hover:bg-purple-700 transition-colors shadow-lg"
          onClick={onOpenLangModal}
        >
          <Globe className="w-5 h-5 text-white" />
        </Button>
      </header>

      {/* Main Content */}
      <div className="px-6 pt-12 flex flex-col items-center">
        {/* Central Card */}
        <div className="w-full max-w-sm bg-[#242b3e] rounded-[2.5rem] border border-white/5 p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400/20 rounded-full blur-sm" />
          <div className="absolute bottom-20 right-10 w-3 h-3 bg-blue-400/20 rounded-full blur-sm" />

          {/* Star Icon */}
          <div className="relative w-32 h-32 mb-8 animate-bounce-short">
             {/* Yellow Star Shape SVG */}
             <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                <path 
                  fill="#facc15" 
                  d="M50 5 L62 38 L95 38 L68 58 L78 91 L50 71 L22 91 L32 58 L5 38 L38 38 Z"
                />
                <path 
                  fill="#ffffff33" 
                  d="M50 5 L62 38 L95 38 L68 58 L78 91 L50 71 L22 91 L32 58 L5 38 L38 38 Z"
                  className="animate-pulse"
                />
             </svg>
             {/* Small sparkle dots around the star */}
             <div className="absolute top-0 left-0 text-yellow-400 text-sm animate-pulse">✦</div>
             <div className="absolute bottom-4 right-2 text-yellow-400 text-xs animate-pulse delay-700">✦</div>
             <div className="absolute top-6 right-0 text-yellow-400 text-xs animate-pulse delay-300">✦</div>
          </div>

          <h2 className="text-3xl font-black mb-4 tracking-tight">{t.starsTitle}</h2>
          
          <p className="text-zinc-400 text-sm font-medium leading-relaxed mb-10 px-4">
            {t.starsDesc}
          </p>

          <Button 
            className="w-full h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-[1.5rem] text-base font-black shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            {t.buyStars}
          </Button>
        </div>
      </div>
    </div>
  );
}
