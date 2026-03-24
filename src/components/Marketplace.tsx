
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { Language } from "@/app/page";
import { translations } from "@/app/page";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface MarketplaceProps {
  lang: Language;
  subTab: "stars" | "premium";
}

export function Marketplace({ lang, subTab }: MarketplaceProps) {
  const t = translations[lang];
  const [starsAnim, setStarsAnim] = useState<any>(null);
  const [premiumAnim, setPremiumAnim] = useState<any>(null);

  useEffect(() => {
    // Stars animation
    fetch("https://lottie.host/fb94bf98-c523-488c-8ab6-df7218649653/al2EJYZN81.json")
      .then((res) => res.json())
      .then((data) => setStarsAnim(data))
      .catch((err) => console.error("Stars Lottie error:", err));

    // Premium animation
    fetch("https://lottie.host/361e7ecf-6af1-4413-9008-017aad9cd3c5/U1vvCnDPk3.json")
      .then((res) => res.json())
      .then((data) => setPremiumAnim(data))
      .catch((err) => console.error("Premium Lottie error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-body animate-in fade-in duration-700 pb-32">
      {/* Main Content */}
      <div className="px-6 pt-12 flex flex-col items-center">
        {/* Central Card */}
        <div className="w-full max-w-sm bg-zinc-900 rounded-[2.8rem] border border-white/10 p-10 flex flex-col items-center text-center shadow-2xl relative overflow-hidden shadow-[inset_0_1.5px_0_rgba(255,255,255,0.15)]">
          
          {/* Lottie Animation Display */}
          <div className="relative w-40 h-40 mb-10 flex items-center justify-center">
            {subTab === "stars" ? (
              starsAnim ? (
                <Lottie animationData={starsAnim} loop={true} className="w-full h-full scale-125" />
              ) : (
                <div className="w-24 h-24 bg-white/5 rounded-full animate-pulse" />
              )
            ) : (
              premiumAnim ? (
                <Lottie animationData={premiumAnim} loop={true} className="w-full h-full scale-150" />
              ) : (
                <div className="w-24 h-24 bg-white/5 rounded-full animate-pulse" />
              )
            )}
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
