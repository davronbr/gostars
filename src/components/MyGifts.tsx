"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { 
  Plus, 
  ArrowUp, 
  ShoppingCart, 
  Send, 
  Search, 
  Filter, 
  ArrowUpDown, 
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Language } from "@/app/page";
import { translations } from "@/app/page";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export function MyGifts({ lang }: { lang: Language }) {
  const t = translations[lang];
  const [animationData, setAnimationData] = useState<any>(null);
  const [activeHeaderTab, setActiveHeaderTab] = useState<"gifts" | "offers" | "activity">("gifts");
  const [activeSubTab, setActiveSubTab] = useState<"unlisted" | "listed">("unlisted");

  useEffect(() => {
    fetch("https://lottie.host/1e737479-5696-4179-a784-938b8132f80c/v3j9M4EO8I.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Gifts Lottie load error:", err));
  }, []);

  return (
    <div className="p-4 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Tabs */}
      <div className="flex items-center space-x-4 border-b border-zinc-800 mb-4">
        <TabButton
          label={t.gifts}
          isActive={activeHeaderTab === "gifts"}
          onClick={() => setActiveHeaderTab("gifts")}
        />
        <TabButton
          label={t.offers}
          isActive={activeHeaderTab === "offers"}
          onClick={() => setActiveHeaderTab("offers")}
        />
        <TabButton
          label={t.myActivity}
          isActive={activeHeaderTab === "activity"}
          onClick={() => setActiveHeaderTab("activity")}
        />
      </div>

      {/* Segmented Control */}
      <div className="bg-zinc-900 border border-white/10 p-1 rounded-full flex items-center mb-4 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.1)]">
        <PillButton
          label={`${t.unlisted} 0`}
          isActive={activeSubTab === "unlisted"}
          onClick={() => setActiveSubTab("unlisted")}
        />
        <PillButton
          label={`${t.listed} 0`}
          isActive={activeSubTab === "listed"}
          onClick={() => setActiveSubTab("listed")}
        />
      </div>

      {/* Action Buttons */}
      <div className="bg-zinc-900 border border-white/10 grid grid-cols-4 gap-2 p-3 rounded-2xl mb-4 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.1)]">
        <ActionButton icon={Plus} label={t.add} />
        <ActionButton icon={ArrowUp} label={t.withdraw} />
        <ActionButton icon={ShoppingCart} label={t.sell} />
        <ActionButton icon={Send} label={t.send} />
      </div>

      {/* Search and Filters */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input 
              placeholder={t.quickFind}
              className="pl-10 bg-zinc-900 border-white/10 rounded-full h-11 font-bold text-sm"
            />
          </div>
          <Button size="icon" variant="outline" className="rounded-full w-11 h-11 bg-zinc-900 border-white/10">
            <Filter className="w-5 h-5 text-zinc-400" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 px-3 bg-zinc-900 border-white/10 rounded-lg">
            <ArrowUpDown className="w-4 h-4 text-zinc-400" />
          </Button>
          <Button variant="outline" className="h-9 px-4 flex-1 justify-between bg-zinc-900 border-white/10 rounded-lg font-bold text-xs">
            <span>{t.collection}</span>
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          </Button>
          <Button variant="outline" className="h-9 px-4 flex-1 justify-between bg-zinc-900 border-white/10 rounded-lg font-bold text-xs">
            <span>{t.model}</span>
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          </Button>
        </div>
      </div>
      
      {/* Empty State Content */}
      <div className="text-center flex flex-col items-center gap-2 pt-8">
        <div className="w-40 h-40 flex items-center justify-center">
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
        <h3 className="text-xl font-bold tracking-tight mt-4">{t.anyTelegramGifts}</h3>
        <p className="text-zinc-500 text-sm font-bold max-w-[240px] mx-auto leading-relaxed">
          {t.addGiftsViaBot}
        </p>
        <Button className="mt-4 rounded-full h-11 bg-white text-black hover:bg-zinc-200 font-bold px-6">
          {t.howToAddGifts}
        </Button>
         <div className="flex items-center gap-1.5 mt-6">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-zinc-700 rounded-full"></div>
        </div>
      </div>

    </div>
  );
}

// Helper components
const TabButton = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void; }) => (
  <button onClick={onClick} className="relative pb-3 pt-2 group">
    <span className={cn(
      "font-bold text-base transition-colors",
      isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
    )}>
      {label}
    </span>
    {isActive && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full"></div>}
  </button>
);

const PillButton = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void; }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex-1 text-center py-2.5 rounded-full font-bold text-xs transition-colors duration-300",
      isActive ? "bg-white text-black shadow-md" : "text-zinc-400 hover:text-white"
    )}
  >
    {label}
  </button>
);

const ActionButton = ({ icon: Icon, label }: { icon: React.ElementType; label: string; }) => (
  <div className="flex flex-col items-center gap-2 group cursor-pointer">
    <div className="w-12 h-12 rounded-full bg-zinc-800 group-hover:bg-zinc-700 transition-colors flex items-center justify-center">
      <Icon className="w-5 h-5 text-white" />
    </div>
    <span className="text-[11px] font-bold text-zinc-400 group-hover:text-white transition-colors">{label}</span>
  </div>
);
