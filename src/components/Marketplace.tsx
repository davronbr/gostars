"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { 
  Search, 
  Activity,
  Equal,
  ChevronDown,
  Filter,
  ArrowUpDown,
  ChevronRight,
  ShoppingCart
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dynamic from "next/dynamic";
import type { Language } from "@/app/page";
import { translations } from "@/app/page";
import { nftCollections, type NftCollectionItem } from "@/lib/collections";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

function NftItemCard({ item, onSelect }: { item: NftCollectionItem; onSelect: () => void; }) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    if (item.lottieUrl) {
      fetch(item.lottieUrl)
        .then((res) => res.json())
        .then((data) => setAnimationData(data))
        .catch(console.error);
    }
  }, [item.lottieUrl]);

  return (
    <div onClick={onSelect} className="bg-secondary rounded-[1.5rem] p-3 border border-white/5 shadow-2xl flex flex-col gap-3 transition-all hover:border-primary/30 cursor-pointer">
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-zinc-800 flex items-center justify-center">
        {item.lottieUrl && animationData ? (
          <Lottie animationData={animationData} loop={true} />
        ) : item.imageUrl ? (
          <Image 
            src={item.imageUrl.replace('/64/64', '/400/400')}
            alt={item.name} 
            fill
            className="object-cover" 
            data-ai-hint={item.imageHint}
          />
        ) : (
           <div className="w-full h-full bg-zinc-900 animate-pulse" />
        )}
      </div>
      <div className="flex flex-col px-1 gap-1">
        <h3 className="font-bold text-white tracking-tight truncate">{item.name}</h3>
        <p className="text-xs text-zinc-400 font-bold tracking-tight">{item.id}</p>
        <div className="flex items-center gap-2 mt-2">
          <Button className="flex-1 h-10 text-sm">
            {item.price}
          </Button>
          <Button size="icon" variant="outline" className="h-10 w-10 flex-shrink-0">
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}


export function Marketplace({ lang, onNftSelect }: { lang: Language; onNftSelect: (nft: NftCollectionItem) => void; }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [collectionFilter, setCollectionFilter] = useState<string | null>(null);
  const [animationData, setAnimationData] = useState<any>(null);

  const t = translations[lang];

  useEffect(() => {
    fetch("https://lottie.host/cf2036f9-0082-403e-b468-192acea5325e/u40R6Mla4A.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Market Lottie load error:", err));
  }, []);

  const uniqueCollections = useMemo(
    () => [...new Set(nftCollections.map((item) => item.collection))],
    []
  );

  const filteredItems = useMemo(() => {
    return nftCollections
      .filter((item) => !collectionFilter || item.collection === collectionFilter)
      .filter(
        (item) =>
          !searchTerm ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [collectionFilter, searchTerm]);


  return (
    <div className="pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md pt-0 pb-4 px-4 border-b border-white/5">
        <div className="flex items-baseline gap-4 mb-4 pt-6">
          <h2 className="font-bold text-white text-2xl">{t.allItems}</h2>
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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-11 px-5 flex-1 justify-between bg-zinc-900 border-white/10 rounded-full font-bold text-sm">
                  <span className="truncate">{collectionFilter || t.collection}</span>
                  <ChevronDown className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-900 border-white/10 text-white w-[--radix-dropdown-menu-trigger-width]">
                <DropdownMenuItem onSelect={() => setCollectionFilter(null)}>
                  {t.collections}
                </DropdownMenuItem>
                {uniqueCollections.map(collection => (
                  <DropdownMenuItem key={collection} onSelect={() => setCollectionFilter(collection)}>
                    {collection}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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

      <div className="mt-4 px-4">
        {filteredItems.length === 0 ? (
          <div className="mt-8">
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
          <div className="grid grid-cols-2 gap-4">
            {filteredItems.map(item => (
              <NftItemCard key={item.id} item={item} onSelect={() => onNftSelect(item)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
