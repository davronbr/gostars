"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Language } from "@/app/page";
import { translations } from "@/app/page";

interface MarketplaceProps {
  lang: Language;
  onOpenSettings: () => void;
}

export function Marketplace({ lang, onOpenSettings }: MarketplaceProps) {
  const [activeTab, setActiveTab] = useState<"stars" | "premium">("stars");
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-black text-white font-body animate-in fade-in duration-700 pb-32">
      {/* Custom Header */}
      <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-30">
        {/* Left Balance Display */}
        <div className="h-11 px-5 flex items-center justify-center bg-zinc-900 border border-white/10 rounded-full shadow-[inset_0_1.5px_0_rgba(255,255,255,0.15)]">
          <span className="text-sm font-bold text-white tracking-tight">0 UZS</span>
        </div>

        {/* Center Toggle */}
        <div className="bg-zinc-900 p-1 rounded-full flex items-center border border-white/5 shadow-inner mx-2">
          <button
            onClick={() => setActiveTab("stars")}
            className={cn(
              "px-6 py-1.5 rounded-full text-xs font-bold transition-all duration-300",
              activeTab === "stars" ? "bg-white text-black shadow-md" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {t.stars}
          </button>
          <button
            onClick={() => setActiveTab("premium")}
            className={cn(
              "px-6 py-1.5 rounded-full text-xs font-bold transition-all duration-300",
              activeTab === "premium" ? "bg-white text-black shadow-md" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {t.premium}
          </button>
        </div>

        {/* Right Settings */}
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full border-white/10"
          onClick={onOpenSettings}
        >
          <Settings className="w-5 h-5 text-white" />
        </Button>
      </header>

      {/* Main Content */}
      <div className="px-6 pt-12 flex flex-col items-center">
        {/* Central Card */}
        <div className="w-full max-w-sm bg-zinc-900 rounded-[2.8rem] border border-white/10 p-10 flex flex-col items-center text-center shadow-2xl relative overflow-hidden shadow-[inset_0_1.5px_0_rgba(255,255,255,0.15)]">
          
          {/* Star Icon */}
          <div className="relative w-36 h-36 mb-10">
             {/* Yellow Star Shape SVG */}
             <svg viewBox="0 0 100 100" className="w-full h-full">
                <path 
                  fill="#facc15" 
                  d="M50 5 L62 38 L95 38 L68 58 L78 91 L50 71 L22 91 L32 58 L5 38 L38 38 Z"
                />
             </svg>
          </div>

          <h2 className="text-3xl font-black mb-4 tracking-tight text-white">{t.starsTitle}</h2>
          
          <p className="text-zinc-400 text-sm font-bold leading-relaxed mb-12 px-4 tracking-tight">
            {t.starsDesc}
          </p>

          <Button 
            size="lg"
            className="w-full h-16 rounded-[1.8rem] text-base font-black border-none"
          >
            {t.buyStars}
          </Button>
        </div>
      </div>
    </div>
  );
}
