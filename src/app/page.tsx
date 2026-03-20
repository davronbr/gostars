
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
  ChevronRight,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export type NavTab = "marketplace" | "global" | "directory" | "profile" | "listing";
export type Language = "en" | "ru" | "uz";

export const translations = {
  uz: {
    market: "Market",
    global: "Global",
    devs: "Dasturchilar",
    profile: "Profil",
    language: "Til",
    payment: "Hamyon usuli",
    help: "Yordam",
    news: "Yangiliklar",
    offer: "Ommaviy oferta",
    listAsset: "Asset qo'shish",
    foundry: "Foundry",
    online: "Onlayn",
    search: "Qidirish...",
    categories: "Kategoriyalar",
    emptyMarket: "Market bo'sh",
    emptyMarketDesc: "Build io-da birinchi bo'lib premium asset joylang.",
    contact: "Bog'lanish",
    portfolio: "Portfolio",
    vetted: "Tasdiqlangan dasturchilar",
    langName: "O'zbekcha",
    partners: "Build hamkorlari",
    communityGrowing: "Hamjamiyat o'smoqda",
    devDirectoryDesc: "Katalog hozirda tasdiqlangan mutaxassislar bilan to'ldirilmoqda.",
    welcomeChat: "Build io Global Hub-ga xush kelibsiz!",
    writeMessage: "Xabar yozish...",
    hub: "Hub",
    listingEntry: "Marketga kirish",
    listingDesc: "Saytingiz yoki raqamli vositangizni Build IO tarmog'ida soting.",
    assetName: "Asset nomi",
    price: "Narxi (USD)",
    techStack: "Texnik stek",
    features: "Asosiy funksiyalar (vergul bilan)",
    assetDesc: "Asset tavsifi",
    aiRefine: "AI Tahrirlash",
    publish: "E'lon berish",
    images: "Rasmlar",
    name: "Davron",
    chooseLang: "TILNI TANLASH",
    chooseLangDesc: "ILOVADA ISHLATMOQCHI BO'LGAN TILNI TANLANG.",
    confirm: "TASDIQLASH"
  },
  ru: {
    market: "Маркет",
    global: "Глобал",
    devs: "Разрабы",
    profile: "Профиль",
    language: "Язык",
    payment: "Метод кошелька",
    help: "Помощь",
    news: "Канал новостей",
    offer: "Публичная оферта",
    listAsset: "Добавить актив",
    foundry: "Foundry",
    online: "В сети",
    search: "Поиск...",
    categories: "Категории",
    emptyMarket: "Маркет пуст",
    emptyMarketDesc: "Будьте первым, кто разместит премиум-актив на Build io.",
    contact: "Связаться",
    portfolio: "Портфолио",
    vetted: "Проверенные специалисты",
    langName: "Русский",
    partners: "Партнеры Build",
    communityGrowing: "Сообщество растет",
    devDirectoryDesc: "Каталог в настоящее время наполняется проверенными специалистами.",
    welcomeChat: "Добро пожаловать в Build io Global Hub!",
    writeMessage: "Написать сообщение...",
    hub: "Хаб",
    listingEntry: "Вход в маркет",
    listingDesc: "Продайте свой сайт или цифровой инструмент в сети Build IO.",
    assetName: "Название актива",
    price: "Цена (USD)",
    techStack: "Тех стек",
    features: "Особенности (через запятую)",
    assetDesc: "Описание актива",
    aiRefine: "AI Улучшение",
    publish: "Опубликовать",
    images: "Изображения",
    name: "Даврон",
    chooseLang: "ВЫБЕРИТЕ ЯЗЫК",
    chooseLangDesc: "ВЫБЕРИТЕ ЯЗЫК, КОТОРЫЙ ВЫ ХОТИТЕ ИСПОЛЬЗОВАТЬ В ПРИЛОЖЕНИИ.",
    confirm: "ПОДТВЕРДИТЬ"
  },
  en: {
    market: "Market",
    global: "Global",
    devs: "Devs",
    profile: "Profile",
    language: "Language",
    payment: "Wallet Method",
    help: "Support",
    news: "News Channel",
    offer: "Public Offer",
    listAsset: "List Asset",
    foundry: "Foundry",
    online: "Online",
    search: "Search assets...",
    categories: "Categories",
    emptyMarket: "Market is Empty",
    emptyMarketDesc: "Be the first to list a premium digital asset on Build io.",
    contact: "Contact",
    portfolio: "Portfolio",
    vetted: "Vetted Developers",
    langName: "English",
    partners: "Build Partners",
    communityGrowing: "Community Growing",
    devDirectoryDesc: "The directory is currently being populated with vetted talent.",
    welcomeChat: "Welcome to the Build io Global Hub!",
    writeMessage: "Write a message...",
    hub: "Hub",
    listingEntry: "Marketplace Entry",
    listingDesc: "Sell your website or digital tool to the Build IO network.",
    assetName: "Asset Name",
    price: "Price (USD)",
    techStack: "Technical Stack",
    features: "Key Features (comma separated)",
    assetDesc: "Asset Description",
    aiRefine: "AI Refine",
    publish: "Publish Listing",
    images: "Images",
    name: "Davron",
    chooseLang: "CHOOSE LANGUAGE",
    chooseLangDesc: "SELECT THE LANGUAGE YOU WANT TO USE IN THE APPLICATION.",
    confirm: "CONFIRM"
  }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>("marketplace");
  const [lang, setLang] = useState<Language>("uz");
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

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
        return <ProfileView lang={lang} onOpenLangModal={() => setIsLangModalOpen(true)} />;
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
      
      <LanguageModal 
        isOpen={isLangModalOpen} 
        onClose={() => setIsLangModalOpen(false)} 
        currentLang={lang} 
        onSelectLang={setLang} 
      />
      
      <Toaster />
    </main>
  );
}

function ProfileView({ lang, onOpenLangModal }: { lang: Language, onOpenLangModal: () => void }) {
  const t = translations[lang];

  const settingsGroups = [
    {
      items: [
        { 
          icon: Globe, 
          label: t.language, 
          value: t.langName, 
          color: "bg-purple-500",
          onClick: onOpenLangModal
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
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">{t.name}</h2>
        <p className="text-muted-foreground text-sm font-bold tracking-tight opacity-70">@moglq</p>
      </div>

      <div className="space-y-4 px-2">
        {settingsGroups.map((group, gIdx) => (
          <div key={gIdx} className="bg-secondary/50 rounded-[2rem] overflow-hidden border border-white/5 divide-y divide-white/5 shadow-2xl">
            {group.items.map((item, iIdx) => (
              <button 
                key={iIdx} 
                onClick={item.onClick}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-all text-left group active:scale-[0.98]"
              >
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
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LanguageModal({ isOpen, onClose, currentLang, onSelectLang }: { 
  isOpen: boolean; 
  onClose: () => void; 
  currentLang: Language; 
  onSelectLang: (l: Language) => void;
}) {
  const [selected, setSelected] = useState<Language>(currentLang);
  const [animationData, setAnimationData] = useState<any>(null);
  const t = translations[currentLang];

  useEffect(() => {
    fetch("https://lottie.host/8a420129-88f0-4890-905f-f323d6248971/sbbuM0ZAkG.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  const handleConfirm = () => {
    onSelectLang(selected);
    onClose();
  };

  const languages = [
    { id: "uz", name: "UZBEK", sub: "O'ZBEK" },
    { id: "en", name: "ENGLISH", sub: "ENGLISH" },
    { id: "ru", name: "RUSSIAN", sub: "РУССКИЙ" },
  ] as const;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0D121D] border-none rounded-[2.5rem] p-0 overflow-hidden max-w-[90%] sm:max-w-[380px] shadow-2xl">
        <div className="relative p-6 flex flex-col items-center">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors z-20"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="w-40 h-40 mb-2 mt-4">
            {animationData && (
              <Lottie animationData={animationData} loop={true} />
            )}
          </div>

          <DialogHeader className="text-center space-y-2 mb-8">
            <DialogTitle className="text-xl font-black text-white uppercase tracking-tight">
              {t.chooseLang}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest leading-relaxed px-4">
              {t.chooseLangDesc}
            </DialogDescription>
          </DialogHeader>

          <div className="w-full space-y-3 mb-10">
            {languages.map((l) => (
              <button
                key={l.id}
                onClick={() => setSelected(l.id as Language)}
                className={cn(
                  "w-full flex items-center gap-4 p-5 rounded-[1.8rem] border-2 transition-all duration-300 group",
                  selected === l.id 
                    ? "border-primary bg-primary/5" 
                    : "border-white/5 bg-[#161C2A] hover:bg-white/5"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                  selected === l.id ? "border-primary" : "border-muted-foreground/30"
                )}>
                  {selected === l.id && <div className="w-3 h-3 rounded-full bg-primary" />}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-black text-white uppercase tracking-tight">{l.name}</span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{l.sub}</span>
                </div>
              </button>
            ))}
          </div>

          <Button 
            onClick={handleConfirm}
            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-tight text-base mb-2"
          >
            {t.confirm}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
