
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import type { Language, NavTab } from "@/app/page";
import { translations } from "@/app/page";
import dynamic from "next/dynamic";
import { ChevronDown, X, ChevronLeft, Loader2, Plus, Check, Gem } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFirebase, useFirestore, addDocumentNonBlocking } from "@/firebase";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { collection } from "firebase/firestore";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface MarketplaceProps {
  lang: Language;
  subTab: "stars" | "premium";
  onTabChange?: (tab: NavTab) => void;
}

function StarLottie({ className }: { className?: string }) {
  const [animationData, setAnimationData] = useState<any>(null);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    fetch("https://lottie.host/8d258075-f9c1-4be7-bc2e-7419c6ae0c2a/ZrCWgaAqMT.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Star Lottie error:", err));
  }, []);

  useEffect(() => {
    if (!animationData) return;

    const interval = setInterval(() => {
      if (lottieRef.current) {
        lottieRef.current.goToAndPlay(0);
      }
    }, 10000); // Har 10 soniyada

    return () => clearInterval(interval);
  }, [animationData]);

  if (!animationData) return <div className={cn("w-5 h-5 bg-yellow-500/20 rounded-full animate-pulse", className)} />;

  return (
    <div className={cn("w-5 h-5 flex items-center justify-center", className)}>
      <Lottie 
        lottieRef={lottieRef}
        animationData={animationData} 
        loop={false} 
        autoplay={true}
        className="w-full h-full scale-150" 
      />
    </div>
  );
}

export function Marketplace({ lang, subTab, onTabChange }: MarketplaceProps) {
  const t = translations[lang];
  const [starsAnim, setStarsAnim] = useState<any>(null);
  const [premiumAnim, setPremiumAnim] = useState<any>(null);
  const [showPurchase, setShowPurchase] = useState(false);
  const { user } = useFirebase();
  const firestore = useFirestore();
  const { toast } = useToast();

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
        firestore={firestore}
      />
    );
  }

  if (showPurchase && subTab === "premium") {
    return (
      <PremiumPurchaseView 
        lang={lang} 
        onBack={() => setShowPurchase(false)} 
        onGoToHistory={() => onTabChange?.("profile")}
        user={user}
        premiumAnim={premiumAnim}
        firestore={firestore}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-body animate-in fade-in duration-700 pb-40">
      <div className="px-6 pt-12 flex flex-col items-center">
        <div className="w-full max-w-sm bg-zinc-900 rounded-[2.8rem] border border-white/10 p-10 flex flex-col items-center text-center shadow-2xl relative overflow-hidden shadow-[inset_0_1.5px_0_rgba(255,255,255,0.15)]">
          
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
            className="w-full"
            onClick={() => setShowPurchase(true)}
          >
            {subTab === "stars" ? t.buyStars : "Premium sotib olish"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function StarsPurchaseView({ lang, onBack, onGoToHistory, user, starsAnim, firestore }: any) {
  const t = translations[lang as Language];
  const { toast } = useToast();
  const [selectedStars, setSelectedStars] = useState<number | "custom">(50);
  const [customAmount, setCustomAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAllPacks, setShowAllPacks] = useState(false);

  const starPacks = [
    { stars: 50, price: 10000 },
    { stars: 100, price: 20000 },
    { stars: 250, price: 50000 },
    { stars: 500, price: 100000 },
    { stars: 1000, price: 200000 },
  ];

  const currentPrice = selectedStars === "custom" 
    ? (Number(customAmount) || 0) * 200 
    : starPacks.find(p => p.stars === selectedStars)?.price || 0;

  const handlePurchase = async () => {
    if (!user) {
      toast({ title: t.error, description: t.loginToConnect, variant: "destructive" });
      return;
    }

    const starsToBuy = selectedStars === "custom" ? Number(customAmount) : selectedStars;
    if (!starsToBuy || starsToBuy <= 0) {
      toast({ title: t.error, description: "Miqdorni kiriting", variant: "destructive" });
      return;
    }

    setIsProcessing(true);
    const orderData = {
      buyerId: user.uid,
      websiteId: "TELEGRAM_STARS",
      sellerId: "SYSTEM",
      orderDate: new Date().toISOString(),
      status: "pending",
      amount: currentPrice,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const ordersRef = collection(firestore, 'orders');
      await addDocumentNonBlocking(ordersRef, orderData);
      toast({ title: t.success, description: t.orderCreated });
      setTimeout(() => {
        setIsProcessing(false);
        onGoToHistory();
      }, 1500);
    } catch (error) {
      console.error("Order error:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 animate-in slide-in-from-right duration-500 pb-64 overflow-y-auto no-scrollbar">
      <header className="flex items-center gap-4 mb-10 mt-6">
        <Button size="icon" variant="ghost" className="rounded-full" onClick={onBack}>
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h2 className="text-xl font-black tracking-tight">{t.buyStars}</h2>
      </header>

      <div className="flex flex-col items-center mb-10">
        <div className="w-32 h-32 mb-6">
          {starsAnim && <Lottie animationData={starsAnim} loop={true} className="w-full h-full scale-125" />}
        </div>
        <div className="bg-zinc-900 px-6 py-2 rounded-full border border-white/10 flex items-center gap-2 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.1)]">
          <StarLottie className="w-6 h-6" />
          <span className="text-2xl font-black tracking-tighter">
            {selectedStars === "custom" ? (customAmount || "0") : selectedStars}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between px-2 mb-2">
           <span className="text-xs font-black text-zinc-500 tracking-widest uppercase">Paketlar</span>
           <button 
             onClick={() => {
               setShowAllPacks(!showAllPacks);
               if (!showAllPacks) setSelectedStars(50);
             }} 
             className="text-[10px] font-black text-primary tracking-widest uppercase"
           >
             {showAllPacks ? "Yopish" : "Barcha to'plamlar"}
           </button>
        </div>

        {showAllPacks && (
          <div className="grid gap-2 animate-in fade-in zoom-in-95 duration-300">
            {starPacks.map((pack) => (
              <button
                key={pack.stars}
                onClick={() => setSelectedStars(pack.stars)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-2xl border transition-all shadow-[inset_0_1.5px_0_rgba(255,255,255,0.05)]",
                  selectedStars === pack.stars ? "bg-zinc-800 border-zinc-500" : "bg-zinc-900 border-white/5 hover:bg-zinc-800"
                )}
              >
                <div className="flex items-center gap-3">
                  <StarLottie className="w-6 h-6" />
                  <span className="font-bold">{pack.stars} Stars</span>
                </div>
                <span className="text-sm font-black text-zinc-400">{pack.price.toLocaleString()} UZS</span>
              </button>
            ))}
          </div>
        )}

        <div className="relative mt-4">
          <button
            onClick={() => {
              setSelectedStars("custom");
              setShowAllPacks(false);
            }}
            className={cn(
              "w-full flex items-center justify-between p-4 rounded-2xl border transition-all shadow-[inset_0_1.5px_0_rgba(255,255,255,0.05)]",
              selectedStars === "custom" ? "bg-zinc-800 border-zinc-500" : "bg-zinc-900 border-white/5 hover:bg-zinc-800"
            )}
          >
            <div className="flex items-center gap-3">
              <Plus className={cn("w-5 h-5", selectedStars === "custom" ? "text-primary" : "text-zinc-500")} />
              <span className="font-bold">Boshqa miqdor</span>
            </div>
          </button>
          
          {selectedStars === "custom" && (
            <div className="mt-3 animate-in slide-in-from-top-2 duration-300">
              <Input
                type="number"
                placeholder="Yulduzlar miqdorini kiriting..."
                className="bg-zinc-900 border-none h-14 font-black text-lg focus-visible:ring-primary rounded-2xl"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                autoFocus
              />
              <p className="text-[10px] text-zinc-500 font-bold px-2 mt-2 tracking-widest uppercase">1 Star = 200 UZS</p>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-32 left-0 right-0 px-6 max-w-2xl mx-auto z-50">
        <Button 
          size="lg" 
          className="w-full h-16 rounded-[2rem] bg-white text-black hover:bg-zinc-200 transition-all font-black shadow-2xl"
          disabled={isProcessing}
          onClick={handlePurchase}
        >
          {isProcessing ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            `${currentPrice.toLocaleString()} UZS TO'LASH`
          )}
        </Button>
      </div>
    </div>
  );
}

function PremiumPurchaseView({ lang, onBack, onGoToHistory, user, premiumAnim, firestore }: any) {
  const t = translations[lang as Language];
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState(3); // Months
  const [isProcessing, setIsProcessing] = useState(false);

  const premiumPlans = [
    { months: 3, price: 120000, label: "3 OY" },
    { months: 6, price: 180000, label: "6 OY" },
    { months: 12, price: 300000, label: "12 OY" },
  ];

  const currentPrice = premiumPlans.find(p => p.months === selectedPlan)?.price || 0;

  const handlePurchase = async () => {
    if (!user) {
      toast({ title: t.error, description: t.loginToConnect, variant: "destructive" });
      return;
    }

    setIsProcessing(true);
    const orderData = {
      buyerId: user.uid,
      websiteId: "TELEGRAM_PREMIUM",
      sellerId: "SYSTEM",
      orderDate: new Date().toISOString(),
      status: "pending",
      amount: currentPrice,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const ordersRef = collection(firestore, 'orders');
      await addDocumentNonBlocking(ordersRef, orderData);
      toast({ title: t.success, description: t.orderCreated });
      setTimeout(() => {
        setIsProcessing(false);
        onGoToHistory();
      }, 1500);
    } catch (error) {
      console.error("Order error:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 animate-in slide-in-from-right duration-500 pb-64 overflow-y-auto no-scrollbar">
      <header className="flex items-center gap-4 mb-10 mt-6">
        <Button size="icon" variant="ghost" className="rounded-full" onClick={onBack}>
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h2 className="text-xl font-black tracking-tight">Premium Sotib Olish</h2>
      </header>

      <div className="flex flex-col items-center mb-10">
        <div className="w-32 h-32 mb-6 flex items-center justify-center">
          {premiumAnim ? (
            <Lottie animationData={premiumAnim} loop={true} className="w-full h-full scale-150" />
          ) : (
            <div className="w-24 h-24 bg-white/5 rounded-full animate-pulse" />
          )}
        </div>
        <div className="bg-zinc-900 px-6 py-2 rounded-full border border-white/10 flex items-center gap-2 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.1)]">
          <Gem className="w-5 h-5 text-blue-400" />
          <span className="text-2xl font-black tracking-tighter uppercase">
            {selectedPlan} Oylik
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <div className="px-2 mb-2">
           <span className="text-xs font-black text-zinc-500 tracking-widest uppercase">Obuna Rejalari</span>
        </div>

        <div className="grid gap-3">
          {premiumPlans.map((plan) => (
            <button
              key={plan.months}
              onClick={() => setSelectedPlan(plan.months)}
              className={cn(
                "flex items-center justify-between p-5 rounded-[1.8rem] border transition-all shadow-[inset_0_1.5px_0_rgba(255,255,255,0.05)]",
                selectedPlan === plan.months ? "bg-zinc-800 border-blue-500/50" : "bg-zinc-900 border-white/5 hover:bg-zinc-800"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                  selectedPlan === plan.months ? "border-blue-500" : "border-white/20"
                )}>
                  {selectedPlan === plan.months && <div className="w-3 h-3 rounded-full bg-blue-500" />}
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-black text-white text-lg tracking-tight">{plan.label}</span>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Premium Obuna</span>
                </div>
              </div>
              <span className="text-base font-black text-white">{plan.price.toLocaleString()} UZS</span>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-32 left-0 right-0 px-6 max-w-2xl mx-auto z-50">
        <Button 
          size="lg" 
          className="w-full h-16 rounded-[2rem] bg-white text-black hover:bg-zinc-200 transition-all font-black shadow-2xl"
          disabled={isProcessing}
          onClick={handlePurchase}
        >
          {isProcessing ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            `${currentPrice.toLocaleString()} UZS TO'LASH`
          )}
        </Button>
      </div>
    </div>
  );
}
