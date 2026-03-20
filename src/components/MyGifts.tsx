"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { Language } from "@/app/page";
import { translations } from "@/app/page";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export function MyGifts({ lang }: { lang: Language }) {
  const [animationData, setAnimationData] = useState<any>(null);
  const t = translations[lang];

  useEffect(() => {
    fetch("https://lottie.host/1e737479-5696-4179-a784-938b8132f80c/v3j9M4EO8I.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Gifts Lottie load error:", err));
  }, []);

  return (
    <div className="p-4 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="px-4 mt-8">
        <div className="bg-secondary rounded-[2.5rem] p-16 text-center flex flex-col items-center gap-6 border border-white/5 shadow-2xl">
          <div className="w-48 h-48 flex items-center justify-center">
            {animationData ? (
              <Lottie 
                animationData={animationData}
                loop={true} 
                autoplay={true}
                className="w-full h-full scale-125"
              />
            ) : (
              <div className="w-20 h-20 bg-primary/10 rounded-full animate-pulse" />
            )}
          </div>
          <div>
            <h3 className="text-2xl font-black mb-2 tracking-tight">{t.myGiftsTitle}</h3>
            <p className="text-muted-foreground text-sm font-bold max-w-[240px] mx-auto tracking-widest leading-relaxed">
              {t.myGiftsDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
