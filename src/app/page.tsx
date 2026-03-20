
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
  X,
  Check
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
    confirm: "TASDIQLASH",
    selectWallet: "To'lov usulini tanlang",
    walletDesc: "Bu standart sifatida ishlatiladi",
    save: "Saqlash"
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
    confirm: "ПОДТВЕРДИТЬ",
    selectWallet: "Выберите способ оплаты",
    walletDesc: "Это будет использоваться по умолчанию",
    save: "Сохранить"
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
    confirm: "CONFIRM",
    selectWallet: "Select payment method",
    walletDesc: "This will be used as default",
    save: "Save"
  }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>("marketplace");
  const [lang, setLang] = useState<Language>("uz");
  const [walletMethod, setWalletMethod] = useState("Payme");
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

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
        return (
          <ProfileView 
            lang={lang} 
            walletMethod={walletMethod}
            onOpenLangModal={() => setIsLangModalOpen(true)} 
            onOpenWalletModal={() => setIsWalletModalOpen(true)}
          />
        );
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
        <header className="px-6 pt-10 pb-6 flex justify-between items-center bg-background/50 backdrop-blur-sm sticky top-0 z-40">
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
              className="bg-secondary/80 rounded-full border-none h-11 w-11 hover:bg-primary/20 hover:text-primary transition-all backdrop-blur-md"
              onClick={() => setActiveTab("listing")}
            >
              <Plus className="w-6 h-6 text-white" />
            </Button>
            <Button 
              size="icon" 
              variant="secondary" 
              className="bg-secondary/80 rounded-full border-none h-11 w-11 hover:bg-primary/20 hover:text-primary transition-all backdrop-blur-md"
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

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        currentWallet={walletMethod}
        onSelectWallet={setWalletMethod}
        lang={lang}
      />
      
      <Toaster />
    </main>
  );
}

function ProfileView({ lang, walletMethod, onOpenLangModal, onOpenWalletModal }: { 
  lang: Language, 
  walletMethod: string,
  onOpenLangModal: () => void,
  onOpenWalletModal: () => void 
}) {
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
        { 
          icon: Wallet, 
          label: t.payment, 
          value: walletMethod, 
          color: "bg-blue-500",
          onClick: onOpenWalletModal
        },
        { 
          icon: MessageCircle, 
          label: t.help, 
          value: "@moglq", 
          color: "bg-orange-500",
          onClick: () => window.open("https://t.me/moglq", "_blank")
        },
        { 
          icon: Lightbulb, 
          label: t.news, 
          value: "@build_io", 
          color: "bg-yellow-500",
          onClick: () => window.open("https://t.me/build_io", "_blank")
        },
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
        <div className="w-24 h-24 bg-[#1e2a44]/50 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border-2 border-white/20 overflow-hidden shadow-xl">
           <div className="text-white font-black text-2xl italic tracking-tighter opacity-80">BIO</div>
        </div>
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">{t.name}</h2>
        <p className="text-white/70 text-sm font-bold tracking-tight opacity-70">@moglq</p>
      </div>

      <div className="space-y-4 px-2">
        {settingsGroups.map((group, gIdx) => (
          <div key={gIdx} className="bg-secondary/40 backdrop-blur-md rounded-[2rem] overflow-hidden border border-white/10 divide-y divide-white/5 shadow-2xl">
            {group.items.map((item, iIdx) => (
              <button 
                key={iIdx} 
                onClick={item.onClick}
                className="w-full flex items-center justify-between p-4 hover:bg-white/10 transition-all text-left group active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shadow-lg", item.color)}>
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-[13px] text-white uppercase tracking-tight">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-white font-black uppercase tracking-tight">{item.value}</span>
                  <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
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
      <DialogContent className="bg-card border-none rounded-[2.5rem] p-0 overflow-hidden max-w-[85%] sm:max-w-[310px] shadow-2xl backdrop-blur-xl">
        <div className="relative p-5 flex flex-col items-center">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-20"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="w-28 h-28 mb-1 mt-2">
            {animationData && (
              <Lottie animationData={animationData} loop={true} />
            )}
          </div>

          <DialogHeader className="text-center space-y-1 mb-6">
            <DialogTitle className="text-lg font-black text-white uppercase tracking-tight">
              {t.chooseLang}
            </DialogTitle>
            <DialogDescription className="text-white/60 text-[9px] font-bold uppercase tracking-widest leading-tight px-4">
              {t.chooseLangDesc}
            </DialogDescription>
          </DialogHeader>

          <div className="w-full space-y-2 mb-8">
            {languages.map((l) => (
              <button
                key={l.id}
                onClick={() => setSelected(l.id as Language)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 rounded-[1.5rem] border-2 transition-all duration-300 group",
                  selected === l.id 
                    ? "border-primary bg-primary/10" 
                    : "border-white/10 bg-background/30 hover:bg-white/10"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                  selected === l.id ? "border-primary" : "border-white/30"
                )}>
                  {selected === l.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs font-black text-white uppercase tracking-tight">{l.name}</span>
                  <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">{l.sub}</span>
                </div>
              </button>
            ))}
          </div>

          <Button 
            onClick={handleConfirm}
            className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-tight text-sm mb-1 shadow-lg"
          >
            {t.confirm}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function WalletModal({ isOpen, onClose, currentWallet, onSelectWallet, lang }: {
  isOpen: boolean;
  onClose: () => void;
  currentWallet: string;
  onSelectWallet: (w: string) => void;
  lang: Language;
}) {
  const [selected, setSelected] = useState(currentWallet);
  const t = translations[lang];

  const wallets = [
    { id: "Paynet", name: "Paynet", color: "bg-[#00B359]", logoText: "paynet" },
    { id: "Click", name: "Click", color: "bg-[#0067FF]", logoText: "C" },
    { id: "Payme", name: "Payme", color: "bg-[#15D1C5]", logoText: "payme" },
    { id: "Alif", name: "Alif", color: "bg-[#00C45C]", logoText: "alif" },
  ];

  const handleSave = () => {
    onSelectWallet(selected);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1c2733] border-none rounded-[2.5rem] p-0 overflow-hidden max-w-[90%] sm:max-w-[400px] shadow-2xl backdrop-blur-xl">
        <div className="p-6 flex flex-col">
          <DialogHeader className="text-center space-y-2 mb-8 mt-4">
            <DialogTitle className="text-xl font-bold text-white tracking-tight">
              {t.selectWallet}
            </DialogTitle>
            <DialogDescription className="text-white/40 text-[11px] font-bold uppercase tracking-widest">
              {t.walletDesc}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mb-10">
            {wallets.map((w) => (
              <button
                key={w.id}
                onClick={() => setSelected(w.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-[1.2rem] border-2 transition-all duration-300",
                  selected === w.id 
                    ? "border-primary bg-primary/5" 
                    : "border-white/5 bg-white/5 hover:bg-white/10"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                    selected === w.id ? "border-primary" : "border-white/20"
                  )}>
                    {selected === w.id && <div className="w-3 h-3 rounded-full bg-primary" />}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-8 rounded-lg flex items-center justify-center", w.color)}>
                      <span className="text-[10px] font-black text-white italic tracking-tighter uppercase">{w.logoText}</span>
                    </div>
                    <span className="text-sm font-bold text-white uppercase tracking-tight">{w.name}</span>
                  </div>
                </div>
                {selected === w.id && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </div>

          <Button 
            onClick={handleSave}
            className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-tight text-base mb-2 shadow-lg"
          >
            {t.save}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
