
"use client";

import { useState, useEffect } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Marketplace } from "@/components/Marketplace";
import { DeveloperDirectory } from "@/components/DeveloperDirectory";
import { GlobalChat } from "@/components/GlobalChat";
import { ListingForm } from "@/components/ListingForm";
import { Toaster } from "@/components/ui/toaster";
import { 
  Plus, 
  Settings, 
  Globe, 
  Wallet, 
  MessageCircle, 
  Lightbulb, 
  FileText, 
  Star, 
  Users,
  ChevronRight,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type NavTab = "marketplace" | "global" | "directory" | "profile" | "listing";
export type Language = "en" | "ru" | "uz";

export const translations = {
  uz: {
    market: "Market",
    global: "Global",
    devs: "Dasturchilar",
    profile: "Profil",
    language: "Til",
    payment: "To'lov usuli",
    help: "Yordam",
    news: "Yangiliklar",
    offer: "Ommaviy oferta",
    stars: "Bonus Stars",
    friends: "Do'stlar",
    listAsset: "Asset qo'shish",
    foundry: "Foundry",
    online: "Onlayn",
    search: "Qidirish...",
    categories: "Kategoriyalar",
    emptyMarket: "Market bo'sh",
    contact: "Bog'lanish",
    portfolio: "Portfolio",
    vetted: "Tasdiqlangan dasturchilar",
    langName: "O'zbekcha"
  },
  ru: {
    market: "Маркет",
    global: "Глобал",
    devs: "Разрабы",
    profile: "Профиль",
    language: "Язык",
    payment: "Способ оплаты",
    help: "Помощь",
    news: "Канал новостей",
    offer: "Публичная оферта",
    stars: "Бонусные звезды",
    friends: "Друзья",
    listAsset: "Добавить актив",
    foundry: "Foundry",
    online: "В сети",
    search: "Поиск...",
    categories: "Категории",
    emptyMarket: "Маркет пуст",
    contact: "Связаться",
    portfolio: "Портфолио",
    vetted: "Проверенные специалисты",
    langName: "Русский"
  },
  en: {
    market: "Market",
    global: "Global",
    devs: "Devs",
    profile: "Profile",
    language: "Language",
    payment: "Payment Method",
    help: "Support",
    news: "News Channel",
    offer: "Public Offer",
    stars: "Bonus Stars",
    friends: "Friends",
    listAsset: "List Asset",
    foundry: "Foundry",
    online: "Online",
    search: "Search assets...",
    categories: "Categories",
    emptyMarket: "Market is Empty",
    contact: "Contact",
    portfolio: "Portfolio",
    vetted: "Vetted Developers",
    langName: "English"
  }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>("marketplace");
  const [lang, setLang] = useState<Language>("uz");

  const t = translations[lang];

  const renderContent = () => {
    switch (activeTab) {
      case "marketplace":
        return <Marketplace lang={lang} />;
      case "directory":
        return <DeveloperDirectory lang={lang} />;
      case "global":
        return <GlobalChat onBack={() => setActiveTab("marketplace")} lang={lang} />;
      case "profile":
        return <ProfileView lang={lang} setLang={setLang} />;
      case "listing":
        return <ListingForm onBack={() => setActiveTab("marketplace")} lang={lang} />;
      default:
        return <Marketplace lang={lang} />;
    }
  };

  const isFullScreenView = activeTab === "global" || activeTab === "listing";

  return (
    <main className="min-h-screen max-w-2xl mx-auto bg-background selection:bg-primary selection:text-white font-body">
      {!isFullScreenView && (
        <header className="px-6 pt-10 pb-6 flex justify-between items-center bg-background">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white tracking-tighter leading-none uppercase">
              Build io
            </h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-[0.3em] mt-1">
              {t.foundry}
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              size="icon" 
              variant="secondary" 
              className="bg-secondary rounded-full border-none h-11 w-11 hover:bg-primary/20 hover:text-primary transition-all"
              onClick={() => setActiveTab("listing")}
            >
              <Plus className="w-6 h-6 text-white" />
            </Button>
            <Button 
              size="icon" 
              variant="secondary" 
              className="bg-secondary rounded-full border-none h-11 w-11 hover:bg-primary/20 hover:text-primary transition-all"
              onClick={() => setActiveTab("profile")}
            >
              <Settings className="w-5 h-5 text-white" />
            </Button>
          </div>
        </header>
      )}

      <div className="relative">
        {renderContent()}
      </div>

      {!isFullScreenView && (
        <BottomNav 
          activeTab={activeTab === "listing" ? "marketplace" : activeTab} 
          onTabChange={setActiveTab} 
          lang={lang}
        />
      )}
      <Toaster />
    </main>
  );
}

function ProfileView({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) {
  const t = translations[lang];

  const settingsGroups = [
    {
      items: [
        { 
          icon: Globe, 
          label: t.language, 
          value: t.langName, 
          color: "bg-purple-500",
          isLanguage: true 
        },
        { icon: Wallet, label: t.payment, value: "Payme", color: "bg-blue-500" },
        { icon: MessageCircle, label: t.help, value: "@tezstar_supp", color: "bg-orange-500" },
        { icon: Lightbulb, label: t.news, value: "@tezstar", color: "bg-yellow-500" },
      ]
    },
    {
      items: [
        { icon: FileText, label: t.offer, value: "", color: "bg-green-500" },
      ]
    }
  ];

  return (
    <div className="p-4 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col items-center mt-6 mb-8 text-center">
        <div className="w-24 h-24 bg-[#0B1E3B] rounded-full flex items-center justify-center mb-4 border-2 border-white/5 overflow-hidden">
           <div className="text-white font-black text-2xl italic tracking-tighter opacity-80">BIO</div>
        </div>
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Даврон</h2>
        <p className="text-muted-foreground text-sm font-bold tracking-tight opacity-70">@moglq</p>
      </div>

      <div className="space-y-4 px-2">
        {settingsGroups.map((group, gIdx) => (
          <div key={gIdx} className="bg-secondary/50 rounded-[2rem] overflow-hidden border border-white/5 divide-y divide-white/5 shadow-2xl">
            {group.items.map((item, iIdx) => (
              item.isLanguage ? (
                <DropdownMenu key={iIdx}>
                  <DropdownMenuTrigger asChild>
                    <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-all text-left group active:scale-[0.98]">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shadow-lg", item.color)}>
                          <item.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-[13px] text-white uppercase tracking-tight">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] text-primary font-black uppercase tracking-tight">{item.value}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-secondary border-white/10 rounded-2xl p-2" align="end">
                    {(['en', 'ru', 'uz'] as Language[]).map((l) => (
                      <DropdownMenuItem 
                        key={l} 
                        onClick={() => setLang(l)}
                        className="rounded-xl font-bold cursor-pointer hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary uppercase text-[10px] tracking-widest flex justify-between items-center"
                      >
                        {translations[l].langName}
                        {lang === l && <Check className="w-4 h-4 text-primary" />}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button key={iIdx} className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-all text-left group active:scale-[0.98]">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shadow-lg", item.color)}>
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-[13px] text-white uppercase tracking-tight">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-primary font-black uppercase tracking-tight">{item.value}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                  </div>
                </button>
              )
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
