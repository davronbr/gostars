"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Language } from "@/app/page";
import { translations } from "@/app/page";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface GiftItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  lottieUrl?: string;
}

function GiftIcon({ gift }: { gift: GiftItem }) {
  const [animationData, setAnimationData] = useState<any>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (gift.lottieUrl) {
      // Telegram yoki LottieHost sovg'alari uchun animatsiya yuklash
      fetch(gift.lottieUrl)
        .then((res) => {
          if (!res.ok) throw new Error("Animatsiyani yuklab bo'lmadi");
          return res.json();
        })
        .then((data) => {
          setAnimationData(data);
          setHasError(false);
        })
        .catch((err) => {
          // Xatolik yuz bersa, fallback emoji ko'rsatiladi
          console.warn(`Lottie yuklashda xatolik (${gift.name}):`, err.message);
          setHasError(true);
        });
    }
  }, [gift.lottieUrl, gift.name]);

  if (gift.lottieUrl && animationData && !hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center scale-110 pointer-events-none">
        <Lottie 
          animationData={animationData} 
          loop={true} 
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center text-4xl mb-2 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 select-none">
      {gift.icon}
    </div>
  );
}

export function MyGifts({ lang }: { lang: Language }) {
  const t = translations[lang];

  const gifts: GiftItem[] = [
    { 
      id: "1", 
      name: "HEART GIFT", 
      price: 15, 
      icon: "💖", 
      lottieUrl: "https://nft.fragment.com/gift/Heart-5170145012310081615.lottie.json" 
    },
    { 
      id: "2", 
      name: "TEDDY BEAR", 
      price: 15, 
      icon: "🧸",
      lottieUrl: "https://lottie.host/6547aee4-3dd9-4b4b-93cb-7f0a25103582/5aSHKFW5zO.json"
    },
    { id: "3", name: "GIFT BOX", price: 25, icon: "🎁" },
    { id: "4", name: "ROSE", price: 25, icon: "🌹" },
    { id: "5", name: "LOVE BEAR", price: 50, icon: "🧸❤️" },
    { id: "6", name: "LOVE HEART", price: 50, icon: "💝" },
    { id: "7", name: "BIRTHDAY CAKE", price: 50, icon: "🎂" },
    { id: "8", name: "BOUQUET", price: 50, icon: "💐" },
    { id: "9", name: "SPACE ROCKET", price: 50, icon: "🚀" },
    { id: "10", name: "CHAMPAGNE", price: 50, icon: "🍾" },
    { id: "11", name: "XMAS TREE", price: 50, icon: "🎄" },
    { id: "12", name: "XMAS BEAR", price: 50, icon: "🧸🎅" },
  ];

  return (
    <div className="p-6 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h2 className="text-4xl font-black text-white tracking-tight mb-2">Gifts</h2>
        <p className="text-zinc-400 font-bold text-sm tracking-tight italic">
          {lang === 'uz' ? "Yaqinlaringizga quvonch ulashing" : 
           lang === 'ru' ? "Подарите радость своим близким" : 
           "Share joy with your loved ones"}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {gifts.map((gift) => (
          <div 
            key={gift.id} 
            className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-4 flex flex-col items-center justify-between aspect-[3/4] transition-all hover:scale-[1.02] active:scale-95 group shadow-[inset_0_1.5px_0_rgba(255,255,255,0.05)] overflow-hidden"
          >
            <div className="flex-1 w-full h-full relative">
              <GiftIcon gift={gift} />
            </div>

            <h3 className="text-[9px] font-black text-white/80 tracking-tighter mb-2 text-center uppercase mt-2 truncate w-full px-1">
              {gift.name}
            </h3>

            <Button size="sm" variant="default" className="w-full h-8 rounded-full gap-1">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span className="text-[11px] font-black text-yellow-500">{gift.price}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}