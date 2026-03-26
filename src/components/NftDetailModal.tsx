
"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Eye, Share2 } from "lucide-react";
import type { Language } from "@/app/page";
import { translations } from "@/app/page";
import type { NftCollectionItem } from "@/lib/collections";
import { LottieAnimation } from "@/components/LottieAnimation";

interface NftDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  nft: NftCollectionItem | null;
  lang: Language;
}

export function NftDetailModal({ isOpen, onClose, nft, lang }: NftDetailModalProps) {
  const t = translations[lang];

  if (!nft) return null;

  const details = [
    { label: t.model, ...nft.model },
    { label: t.symbol, ...nft.symbol },
    { label: t.backdrop, ...nft.backdrop },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#18181b] border-zinc-800 p-0 fixed top-auto bottom-0 left-0 right-0 w-full translate-x-0 translate-y-0 rounded-t-3xl sm:top-1/2 sm:left-1/2 sm:bottom-auto sm:w-full sm:max-w-sm sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full duration-500 overflow-visible">
        
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 z-20">
          <div className="relative w-full h-full" style={{ background: 'radial-gradient(circle at 50% 40%, #2E3B6E 0%, #18181B 50%)'}}>
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <Button size="icon" variant="outline" className="bg-black/20 backdrop-blur-sm rounded-full h-10 w-10 border-white/10">
                      <Eye className="w-5 h-5 text-white" />
                  </Button>
                  <Button size="icon" variant="outline" className="bg-black/20 backdrop-blur-sm rounded-full h-10 w-10 border-white/10">
                      <Share2 className="w-5 h-5 text-white" />
                  </Button>
              </div>
              
              <button onClick={onClose} className="absolute top-4 left-4 p-2 bg-black/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors z-20">
                  <X className="w-5 h-5 text-white" />
              </button>
              
              <div className="w-full h-full">
                  {nft.lottieUrl && (
                    <LottieAnimation url={nft.lottieUrl} className="w-full h-full" />
                  )}
              </div>
          </div>
        </div>

        <div className="p-6 pt-28 flex flex-col bg-transparent break-words">
            <DialogTitle asChild>
                <div className="text-center mb-6 break-words">
                    <h2 className="text-3xl font-bold text-white tracking-tight">{nft.name}</h2>
                    <p className="text-white/50 font-bold text-sm">{nft.id}</p>
                </div>
            </DialogTitle>
            
            <div className="bg-zinc-800/50 border border-white/5 rounded-2xl p-4 mb-6 space-y-3">
                {details.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-zinc-400 font-bold">{item.label}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-400 font-bold">{item.value}</span>
                            <Badge variant="outline" className="border-blue-400/20 text-blue-400 text-[10px] font-bold bg-transparent px-1.5 py-0.5">{item.rarity}</Badge>
                        </div>
                    </div>
                ))}
                <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400 font-bold">{t.floorPrice}</span>
                    <span className="font-bold text-white">{nft.floorPrice}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button size="lg" variant="outline" className="h-14 bg-zinc-800 border-zinc-700">
                    <div className="flex flex-col items-center">
                    <span>{t.makeOffer}</span>
                    <span className="text-xs font-bold text-white/50">{nft.offerPrice}</span>
                    </div>
                </Button>
                <Button size="lg" className="h-14 bg-blue-600 hover:bg-blue-700 text-white">
                    <div className="flex flex-col items-center">
                    <span>{t.buyGift}</span>
                    <span className="text-xs font-bold text-white/70">{nft.price}</span>
                    </div>
                </Button>
            </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
