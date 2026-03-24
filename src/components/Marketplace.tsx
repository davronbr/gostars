
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { Language, NavTab } from "@/app/page";
import { translations } from "@/app/page";
import dynamic from "next/dynamic";
import { Star, ChevronDown, X, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFirebase } from "@/firebase";
import { Input } from "@/components/ui/input";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface MarketplaceProps {
  lang: Language;
  subTab: "stars" | "premium";
  onTabChange?: (tab: NavTab) => void;
}

export function Marketplace({ lang, subTab, onTabChange }: MarketplaceProps) {
  const t = translations[lang];
  const [starsAnim, setStarsAnim] = useState<any>(null);
  const [premiumAnim, setPremiumAnim] = useState<any>(null);
  const [showPurchase, setShowPurchase] = useState(false);
  const { user } = useFirebase();

  useEffect(() => {
    fetch("https://lottie.host/fb94bf98-c523-488c-8ab6-df7218649653/al2EJYZN81.json")
      .then((res) => res.json())
      .then((data) => setStarsAnim(data))
      .catch((err) => console.error("Stars Lottie error:", err));

    fetch("https://lottie.host/361e7ecf-6af1-4413-9008-017aad9cd3c5/U1vvCnDPk3.json")
      .then((res) => res.json())
      .then((data) => setPremiumAnim(data))
      .catch((err) => console.error("Premium Lottie error:", err));
  }, []);

  if (showPurchase && subTab === "stars") {
    return (
      <StarsPurchaseView 
        lang={lang} 
        onBack={() => setShowPurchase(false)} 
        onGoToHistory={() => onTabChange?.("profile")}
        user={user}
        starsAnim={starsAnim}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-body animate-in fade-in duration-700 pb-32">
      <div className="px-6 pt-12 flex flex-col items-center">
        <div className="w-full max-sm bg-zinc-900 rounded-[2.8rem] border border-white/10 p-10 flex flex-col items-center text-center shadow-2xl relative overflow-hidden shadow-[inset_0_1.5px_0_rgba(255,255,255,0.15)]">
          
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
            onClick={() => subTab === "stars" && setShowPurchase(true)}
          >
            {subTab === "stars" ? t.buyStars : "Premium sotib olish"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function StarsPurchaseView({ lang, onBack, onGoToHistory, user, starsAnim }: { 
  lang: Language; 
  onBack: () => void; 
  onGoToHistory: () => void;
  user: any;
  starsAnim: any;
}) {
  const t = translations[lang];
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [showAllPackages, setShowAllPackages] = useState(false);
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const packages = [
    { stars: 50, price: "10 000", label: "50 Stars" },
    { stars: 75, price: "15 000", label: "75 Stars" },
    { stars: 100, price: "20 000", label: "100 Stars" },
    { stars: 150, price: "30 000", label: "150 Stars" },
    { stars: 250, price: "50 000", label: "250 Stars" },
    { stars: 350, price: "70 000", label: "350 Stars" },
    { stars: 500, price: "100 000", label: "500 Stars" },
    { stars: 750, price: "150 000", label: "750 Stars" },
    { stars: 1000, price: "200 000", label: "1K Stars" },
    { stars: 1500, price: "300 000", label: "1.5K Stars" },
    { stars: 2500, price: "500 000", label: "2.5K Stars" },
    { stars: 5000, price: "1 000 000", label: "5K Stars" },
    { stars: 10000, price: "2 000 000", label: "10K Stars" },
  ];

  const visiblePackages = showAllPackages ? packages : packages.slice(0, 3);

  const handleShowAll = () => {
    setShowAllPackages(true);
    setIsCustomAmount(false);
    setCustomValue("");
    if (selectedPackage === -1) setSelectedPackage(0);
  };

  const handleCustomToggle = () => {
    setIsCustomAmount(true);
    setShowAllPackages(false);
    setSelectedPackage(-1);
  };

  const calculateFinalPrice = () => {
    if (isCustomAmount) {
      const amount = parseInt(customValue) || 0;
      return (amount * 200).toLocaleString().replace(/,/g, ' ');
    }
    return packages[selectedPackage]?.price || "0";
  };

  const getButtonLabel = () => {
    if (isCustomAmount) {
      const amount = parseInt(customValue) || 0;
      return `${amount} Stars — ${calculateFinalPrice()} so'm`;
    }
    const pkg = packages[selectedPackage];
    return pkg ? `${pkg.label} — ${pkg.price} so'm` : "Tanlang";
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32 animate-in slide-in-from-right duration-500 overflow-y-auto no-scrollbar">
      <div className="flex flex-col items-center max-w-md mx-auto">
        
        <div className="w-full flex items-center mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="rounded-full bg-zinc-900 border border-white/5"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </Button>
        </div>

        <div className="w-24 h-24 relative mb-6 flex items-center justify-center">
            {starsAnim ? (
              <Lottie animationData={starsAnim} loop={true} className="w-full h-full scale-125" />
            ) : (
              <Star className="w-16 h-16 fill-yellow-400 text-yellow-400" />
            )}
        </div>

        <h2 className="text-2xl font-black mb-2 tracking-tight text-center px-4">
          Telegram Stars olish
        </h2>
        <p className="text-zinc-400 text-[11px] font-bold text-center leading-relaxed mb-10 px-6">
          Click, Payme yoki Paynet orqali Stars balansini to'ldiring — o'zingiz yoki yaqinlaringiz uchun.
        </p>

        <div className="w-full space-y-3 mb-8">
            <label className="text-xs font-black text-zinc-500 uppercase tracking-widest px-2">Kimga?</label>
            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-4 flex items-center justify-between shadow-[inset_0_1.5px_0_rgba(255,255,255,0.05)]">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center border border-white/10 shadow-lg">
                        <span className="text-white font-black text-sm">{user?.displayName?.[0] || 'A'}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white tracking-tight">{user?.displayName || t.name} <span className="text-zinc-500">(siz)</span></span>
                    </div>
                </div>
                <X className="w-5 h-5 text-zinc-600" />
            </div>
        </div>

        {isCustomAmount ? (
          <div className="w-full space-y-3 mb-8 animate-in fade-in slide-in-from-top-2">
            <label className="text-xs font-black text-zinc-500 uppercase tracking-widest px-2">Miqdorni kiriting</label>
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2">
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
              </div>
              <Input
                type="number"
                placeholder="50 — 10 000 oralig'ida"
                className="bg-zinc-900 border border-white/5 h-16 pl-14 rounded-2xl font-black text-white focus-visible:ring-blue-500 transition-all shadow-[inset_0_1.5px_0_rgba(255,255,255,0.05)]"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="w-full space-y-3 mb-8 animate-in fade-in slide-in-from-bottom-2">
            <label className="text-xs font-black text-zinc-500 uppercase tracking-widest px-2">To'plamni tanlang</label>
            <div className="space-y-2">
                {visiblePackages.map((pkg, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedPackage(idx)}
                        className={cn(
                            "w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all duration-300",
                            selectedPackage === idx 
                                ? "border-blue-500 bg-blue-500/5" 
                                : "border-white/5 bg-zinc-900/40 hover:bg-zinc-900"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                selectedPackage === idx ? "border-blue-500" : "border-white/20"
                            )}>
                                {selectedPackage === idx && <div className="w-3 h-3 rounded-full bg-blue-500" />}
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                                <span className="text-sm font-black text-white tracking-tight">{pkg.label}</span>
                            </div>
                        </div>
                        <span className="text-sm font-black text-white">{pkg.price} so'm</span>
                    </button>
                ))}
            </div>
          </div>
        )}

        <div className="w-full space-y-2 mb-10">
          {!showAllPackages && (
            <button 
              onClick={handleShowAll}
              className="w-full flex items-center justify-center gap-2 py-4 text-blue-500 text-xs font-black bg-zinc-900/40 rounded-2xl border border-white/5 transition-colors hover:bg-zinc-800"
            >
              Barcha to'plamlar <ChevronDown className="w-4 h-4" />
            </button>
          )}
          
          <button 
            onClick={handleCustomToggle}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-4 text-xs font-black rounded-2xl border transition-all duration-300",
              isCustomAmount 
                ? "text-blue-500 bg-blue-500/10 border-blue-500/20" 
                : "text-blue-500 bg-zinc-900/40 border-white/5 hover:bg-zinc-800"
            )}
          >
            Boshqa miqdor <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <Button 
            size="lg"
            disabled={isCustomAmount && (!customValue || parseInt(customValue) < 1)}
            className="w-full h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-[1.8rem] text-sm font-black border-none shadow-xl disabled:opacity-50"
        >
            {getButtonLabel()}
        </Button>

        <button 
            onClick={onGoToHistory}
            className="text-blue-500 text-xs font-black mt-6 hover:underline"
        >
            Xaridlar tarixi
        </button>

      </div>
    </div>
  );
}
