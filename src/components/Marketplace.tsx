
"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dynamic from "next/dynamic";
import type { Language } from "@/app/page";
import { translations } from "@/app/page";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const WEBSITES: any[] = [];
const CATEGORIES = ["All", "SaaS", "E-com", "Tool", "Social", "Portfolio"];

export function Marketplace({ lang }: { lang: Language }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [animationData, setAnimationData] = useState<any>(null);

  const t = translations[lang];

  useEffect(() => {
    fetch("https://lottie.host/cf2036f9-0082-403e-b468-192acea5325e/u40R6Mla4A.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Market Lottie load error:", err));
  }, []);

  return (
    <div className="pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md pt-6 pb-4 px-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder={t.search} 
              className="pl-11 bg-secondary border-none rounded-full h-12 focus-visible:ring-primary font-bold text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="secondary" className="rounded-full h-12 w-12 bg-secondary border-none hover:bg-primary/20 hover:text-primary transition-all">
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-secondary border-white/10 rounded-2xl p-2">
              {CATEGORIES.map((category) => (
                <DropdownMenuItem 
                  key={category}
                  className="rounded-xl font-bold cursor-pointer hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary uppercase text-[10px] tracking-widest"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-4 flex items-center justify-between px-2">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            {t.categories}: <span className="text-primary">{activeCategory}</span>
          </p>
        </div>
      </header>

      <div className="px-4 mt-8">
        {WEBSITES.length === 0 ? (
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
              <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">{t.emptyMarket}</h3>
              <p className="text-muted-foreground text-sm font-bold max-w-[240px] mx-auto uppercase tracking-widest leading-relaxed">
                Be the first to list a premium digital asset on Build io.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {/* Website cards would go here */}
          </div>
        )}
      </div>
    </div>
  );
}
