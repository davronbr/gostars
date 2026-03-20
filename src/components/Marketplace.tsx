"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Search, 
  Activity,
  Equal,
  ChevronDown,
  Filter,
  ArrowUpDown,
  ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";
import type { Language } from "@/app/page";
import { translations } from "@/app/page";
import { nftCollections, type NftCollectionItem } from "@/lib/collections";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const WEBSITES: any[] = [];

function CollectionItem({ item }: { item: NftCollectionItem }) {
  return (
    <button className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-zinc-900 transition-colors text-left">
      <Image 
        src={item.imageUrl} 
        alt={item.name} 
        width={40} 
        height={40} 
        className="rounded-lg"
        data-ai-hint={item.imageHint}
      />
      <div className="flex flex-col">
        <span className="font-bold text-sm text-white tracking-tight">{item.name}</span>
        {item.date && <span className="text-xs font-bold text-zinc-500 tracking-wide mt-0.5">{item.date}</span>}
      </div>
    </button>
  );
}

export function Marketplace({ lang }: { lang: Language }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("collections");
  const [animationData, setAnimationData] = useState<any>(null);

  const t = translations[lang];

  useEffect(() => {
    if (activeTab === 'items') {
      fetch("https://lottie.host/cf2036f9-0082-403e-b468-192acea5325e/u40R6Mla4A.json")
        .then((res) => res.json())
        .then((data) => setAnimationData(data))
        .catch((err) => console.error("Market Lottie load error:", err));
    }
  }, [activeTab]);

  const filteredCollections = nftCollections.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md pt-6 pb-4 px-4 border-b border-white/5">
        <div className="flex items-baseline gap-4 mb-4">
          <button onClick={() => setActiveTab("items")} className={`font-bold transition-colors ${activeTab === 'items' ? 'text-white text-2xl' : 'text-muted-foreground text-lg'}`}>
            {t.allItems}
          </button>
          <button onClick={() => setActiveTab("collections")} className={`font-bold transition-colors ${activeTab === 'collections' ? 'text-white text-2xl' : 'text-muted-foreground text-lg'}`}>
            {t.collections}
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input 
                placeholder={t.quickFind}
                className="pl-10 bg-zinc-900 border-white/10 rounded-full h-11 font-bold text-sm focus-visible:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button size="icon" variant="outline" className="rounded-full w-11 h-11 bg-zinc-900 border-white/10">
              <Activity className="w-5 h-5 text-zinc-400" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full w-11 h-11 bg-zinc-900 border-white/10">
              <Equal className="w-5 h-5 text-zinc-400" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full w-11 h-11 bg-zinc-900 border-white/10">
              <ChevronDown className="w-5 h-5 text-zinc-400" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" className="rounded-full w-11 h-11 bg-zinc-900 border-white/10">
              <Filter className="w-5 h-5 text-zinc-400" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full w-11 h-11 bg-zinc-900 border-white/10">
              <ArrowUpDown className="w-5 h-5 text-zinc-400" />
            </Button>
            <Separator orientation="vertical" className="h-6 bg-white/10 mx-1" />
            <Button variant="outline" className="h-11 px-5 flex-1 justify-between bg-zinc-900 border-white/10 rounded-full font-bold text-sm">
              <span>{t.collection}</span>
              <ChevronDown className="w-4 h-4 text-zinc-500" />
            </Button>
            <Button variant="outline" className="h-11 px-5 flex-1 justify-center bg-zinc-900 border-white/10 rounded-full font-bold text-sm">
              <span>{t.model}</span>
            </Button>
            <Button variant="outline" className="h-11 px-5 flex-1 justify-between bg-zinc-900 border-white/10 rounded-full font-bold text-sm">
              <span>{t.back}</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        {activeTab === 'collections' ? (
          <div className="px-4 space-y-1">
            {filteredCollections.map(item => (
              <CollectionItem key={item.id} item={item} />
            ))}
          </div>
        ) : WEBSITES.length === 0 ? (
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
                <h3 className="text-2xl font-black mb-2 tracking-tight">{t.emptyMarket}</h3>
                <p className="text-muted-foreground text-sm font-bold max-w-[240px] mx-auto tracking-widest leading-relaxed">
                  {t.emptyMarketDesc}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 px-4">
            {/* Website cards would go here */}
          </div>
        )}
      </div>
    </div>
  );
}
