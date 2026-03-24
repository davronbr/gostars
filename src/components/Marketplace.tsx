
"use client";

import { Button } from "@/components/ui/button";
import type { Language } from "@/app/page";
import { translations } from "@/app/page";

interface MarketplaceProps {
  lang: Language;
  subTab: "stars" | "premium";
}

export function Marketplace({ lang, subTab }: MarketplaceProps) {
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-black text-white font-body animate-in fade-in duration-700 pb-32">
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

          <h2 className="text-3xl font-black mb-4 tracking-tight text-white">
            {subTab === "stars" ? t.starsTitle : "Telegram Premium"}
          </h2>
          
          <p className="text-zinc-400 text-sm font-bold leading-relaxed mb-12 px-4 tracking-tight">
            {subTab === "stars" ? t.starsDesc : "Telegram Premium xizmatini o'zingiz yoki yaqinlaringiz uchun sovg'a sifatida sotib oling."}
          </p>

          <Button 
            size="lg"
            className="w-full h-16 rounded-[1.8rem] text-base font-black border-none"
          >
            {subTab === "stars" ? t.buyStars : "Premium sotib olish"}
          </Button>
        </div>
      </div>
    </div>
  );
}
