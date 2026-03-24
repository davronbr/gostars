"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Language } from "@/app/page";
import { translations } from "@/app/page";
import { Button } from "@/components/ui/button";

interface GiftItem {
  id: string;
  name: string;
  price: number;
  icon: string;
}

export function MyGifts({ lang }: { lang: Language }) {
  const t = translations[lang];

  const gifts: GiftItem[] = [
    { id: "1", name: "HEART GIFT", price: 15, icon: "💖" },
    { id: "2", name: "TEDDY BEAR", price: 15, icon: "🧸" },
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
            className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-4 flex flex-col items-center justify-between aspect-[3/4] transition-all hover:scale-[1.02] active:scale-95 group shadow-[inset_0_1.5px_0_rgba(255,255,255,0.05)]"
          >
            <div className="flex-1 flex items-center justify-center text-5xl mb-2 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500">
              {gift.icon}
            </div>

            <h3 className="text-[9px] font-black text-white/80 tracking-tighter mb-2 text-center uppercase">
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
