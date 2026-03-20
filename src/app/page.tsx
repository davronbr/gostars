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
  Check,
  User as UserIcon,
  Info
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
import Image from "next/image";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export type NavTab = "marketplace" | "global" | "directory" | "profile" | "listing";
export type Language = "en" | "ru" | "uz";

declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}

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
    offerTitle: "Build io nima?",
    offerContent: "Build io — bu raqamli aktivlar (veb-saytlar, SaaS, skriptlar) va professional dasturchilar uchun mo'ljallangan premium platforma. Bizning maqsadimiz: tayyor bizneslarni sotish, sotib olish va tajribali mutaxassislar bilan xavfsiz bog'lanish uchun qulay Foundry markazini yaratishdir.",
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
    listingDesc: "Saytingiz yoki raqamli vositangizni Build io tarmog'ida soting.",
    assetName: "Asset nomi",
    price: "Narxi (USD)",
    techStack: "Texnik stek",
    features: "Asosiy funksiyalar (vergul bilan)",
    assetDesc: "Asset tavsifi",
    aiRefine: "AI tahrirlash",
    publish: "E'lon berish",
    images: "Rasmlar",
    name: "Anonim",
    chooseLang: "Tilni tanlash",
    chooseLangDesc: "Ilovada ishlatmoqchi bo'lgan tilni tanlang.",
    confirm: "Tasdiqlash",
    selectWallet: "Hamyon usulini tanlang",
    walletDesc: "Bu standart sifatida ishlatiladi",
    save: "Saqlash",
    anonymous: "Anonim"
  },
  ru: {
    market: "Маркет",
    global: "Глобал",
    devs: "Разработчики",
    profile: "Профиль",
    language: "Язык",
    payment: "Метод кошелька",
    help: "Помощь",
    news: "Канал новостей",
    offer: "Публичная оферта",
    offerTitle: "Что такое Build io?",
    offerContent: "Build io — это премиальная платформа для цифровых активов (сайты, SaaS, скрипты) и профессиональных разработчиков. Наша цель: создать удобный центр Foundry для покупки, продажи готового бизнеса и безопасного взаимодействия с опытными специалистами.",
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
    listingDesc: "Продайте свой сайт или цифровой инструмент в сети Build io.",
    assetName: "Название актива",
    price: "Цена (USD)",
    techStack: "Тех стек",
    features: "Особенности (через запятую)",
    assetDesc: "Описание актива",
    aiRefine: "AI улучшение",
    publish: "Опубликовать",
    images: "Изображения",
    name: "Аноним",
    chooseLang: "Выберите язык",
    chooseLangDesc: "Выберите язык, который вы хотите использовать в приложении.",
    confirm: "Подтвердить",
    selectWallet: "Выберите способ оплаты",
    walletDesc: "Это будет использоваться по умолчанию",
    save: "Сохранить",
    anonymous: "Аноним"
  },
  en: {
    market: "Market",
    global: "Global",
    devs: "Developers",
    profile: "Profile",
    language: "Language",
    payment: "Wallet method",
    help: "Support",
    news: "News channel",
    offer: "Public offer",
    offerTitle: "What is Build io?",
    offerContent: "Build io is a premium platform for digital assets (websites, SaaS, scripts) and professional developers. Our goal: to create a convenient Foundry hub for buying, selling ready-made businesses, and safe connection with experienced specialists.",
    listAsset: "List asset",
    foundry: "Foundry",
    online: "Online",
    search: "Search assets...",
    categories: "Categories",
    emptyMarket: "Market is empty",
    emptyMarketDesc: "Be the first to list a premium digital asset on Build io.",
    contact: "Contact",
    portfolio: "Portfolio",
    vetted: "Vetted developers",
    langName: "English",
    partners: "Build partners",
    communityGrowing: "Community growing",
    devDirectoryDesc: "The directory is currently being populated with vetted talent.",
    welcomeChat: "Welcome to the Build io Global Hub!",
    writeMessage: "Write a message...",
    hub: "Hub",
    listingEntry: "Marketplace entry",
    listingDesc: "Sell your website or digital tool to the Build io network.",
    assetName: "Asset name",
    price: "Price (USD)",
    techStack: "Technical stack",
    features: "Key features (comma separated)",
    assetDesc: "Asset description",
    aiRefine: "AI refine",
    publish: "Publish listing",
    images: "Images",
    name: "Anonymous",
    chooseLang: "Choose language",
    chooseLangDesc: "Select the language you want to use in the application.",
    confirm: "Confirm",
    selectWallet: "Select wallet method",
    walletDesc: "This will be used as default",
    save: "Save",
    anonymous: "Anonymous"
  }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>("marketplace");
  const [lang, setLang] = useState<Language>("uz");
  const [walletMethod, setWalletMethod] = useState("Payme");
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [tgUser, setTgUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const webapp = window.Telegram.WebApp;
      webapp.ready();
      webapp.expand();
      if (webapp.initDataUnsafe?.user) {
        setTgUser(webapp.initDataUnsafe.user);
      }
    }
  }, []);

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
            tgUser={tgUser}
            onOpenLangModal={() => setIsLangModalOpen(true)} 
            onOpenWalletModal={() => setIsWalletModalOpen(true)}
            onOpenOfferModal={() => setIsOfferModalOpen(true)}
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
    <main className="min-h-screen max-w-2xl mx-auto bg-black selection:bg-primary selection:text-white font-body">
      {!isFullScreenView && (
        <header className="px-6 pt-12 pb-6 flex justify-between items-center bg-transparent sticky top-0 z-40">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-white tracking-tighter leading-none">
              Build io
            </h1>
            <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em] mt-1">
              {t.foundry}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-11 px-5 flex items-center justify-center bg-zinc-900 border border-white/10 rounded-full shadow-[inset_0_1.5px_0_rgba(255,255,255,0.15)]">
              <span className="text-sm font-bold text-white tracking-tight">0 UZS</span>
            </div>
            
            <Button 
              size="icon" 
              variant="outline" 
              className="rounded-full"
              onClick={() => setActiveTab("listing")}
            >
              <Plus className="w-6 h-6 text-white" />
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              className="rounded-full"
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

      <OfferModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        lang={lang}
      />
      
      <Toaster />
    </main>
  );
}

function ProfileView({ lang, walletMethod, tgUser, onOpenLangModal, onOpenWalletModal, onOpenOfferModal }: { 
  lang: Language, 
  walletMethod: string,
  tgUser: any,
  onOpenLangModal: () => void,
  onOpenWalletModal: () => void,
  onOpenOfferModal: () => void 
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
        { 
          icon: FileText, 
          label: t.offer, 
          value: "", 
          color: "bg-green-500",
          onClick: onOpenOfferModal
        },
      ]
    }
  ];

  return (
    <div className="p-4 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col items-center mt-6 mb-10 text-center">
        <div className="relative w-24 h-24 mb-4">
          <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center border border-white/10 overflow-hidden shadow-[inset_0_1.5px_0_rgba(255,255,255,0.15)] relative">
            {tgUser?.photo_url ? (
              <Image 
                src={tgUser.photo_url} 
                alt="Profile" 
                fill 
                className="object-cover"
                unoptimized
              />
            ) : tgUser?.first_name ? (
              <div className="text-white font-bold text-3xl tracking-tighter uppercase opacity-80">
                {tgUser.first_name[0]}
              </div>
            ) : (
              <UserIcon className="w-10 h-10 text-white/20" />
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full border-2 border-black flex items-center justify-center shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {tgUser?.first_name ? `${tgUser.first_name} ${tgUser.last_name || ""}` : t.anonymous}
        </h2>
        <p className="text-white/40 text-xs font-bold tracking-widest mt-1">
          {tgUser?.username ? `@${tgUser.username}` : `@${t.anonymous.toLowerCase()}`}
        </p>
      </div>

      <div className="space-y-4 px-2">
        {settingsGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-2">
            {group.items.map((item, iIdx) => (
              <button 
                key={iIdx} 
                onClick={item.onClick}
                className="w-full flex items-center justify-between p-4 bg-zinc-900 border border-white/10 transition-all text-left group rounded-[1.5rem] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.15)] mb-1"
              >
                <div className="flex items-center gap-4">
                  <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shadow-lg", item.color)}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-sm text-white tracking-tight">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/50 font-bold tracking-tight">{item.value}</span>
                  <ChevronRight className="w-4 h-4 text-white/20 transition-colors" />
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
    { id: "uz", name: "Uzbek", sub: "O'zbek" },
    { id: "en", name: "English", sub: "English" },
    { id: "ru", name: "Russian", sub: "Русский" },
  ] as const;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-none rounded-[2.5rem] p-0 overflow-hidden max-w-[85%] sm:max-w-[310px] shadow-2xl backdrop-blur-xl">
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
            <DialogTitle className="text-lg font-bold text-white tracking-tight">
              {t.chooseLang}
            </DialogTitle>
            <DialogDescription className="text-white/60 text-[10px] font-bold tracking-widest leading-tight px-4">
              {t.chooseLangDesc}
            </DialogDescription>
          </DialogHeader>

          <div className="w-full space-y-2 mb-8">
            {languages.map((l) => (
              <button
                key={l.id}
                onClick={() => setSelected(l.id as Language)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 rounded-[1.5rem] border-2 transition-all duration-300 group shadow-[inset_0_1.5px_0_rgba(255,255,255,0.1)]",
                  selected === l.id 
                    ? "border-primary bg-primary/10" 
                    : "border-white/10 bg-black/30 hover:bg-white/10"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                  selected === l.id ? "border-primary" : "border-white/30"
                )}>
                  {selected === l.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs font-bold text-white tracking-tight">{l.name}</span>
                  <span className="text-[9px] font-bold text-white/50 tracking-widest">{l.sub}</span>
                </div>
              </button>
            ))}
          </div>

          <Button 
            onClick={handleConfirm}
            className="w-full"
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
      <DialogContent className="bg-zinc-900 border-none rounded-[2.5rem] p-0 overflow-hidden max-w-[90%] sm:max-w-[400px] shadow-2xl backdrop-blur-xl">
        <div className="p-6 flex flex-col">
          <DialogHeader className="text-center space-y-2 mb-8 mt-4">
            <DialogTitle className="text-xl font-bold text-white tracking-tight">
              {t.selectWallet}
            </DialogTitle>
            <DialogDescription className="text-white/40 text-[11px] font-bold tracking-widest">
              {t.walletDesc}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mb-10">
            {wallets.map((w) => (
              <button
                key={w.id}
                onClick={() => setSelected(w.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-[1.2rem] border-2 transition-all duration-300 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.1)]",
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
                      <span className="text-[10px] font-bold text-white italic tracking-tighter uppercase">{w.logoText}</span>
                    </div>
                    <span className="text-sm font-bold text-white tracking-tight">{w.name}</span>
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
            size="lg"
            className="w-full"
          >
            {t.save}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function OfferModal({ isOpen, onClose, lang }: {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}) {
  const t = translations[lang];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-none rounded-[2.5rem] p-0 overflow-hidden max-w-[90%] sm:max-w-[420px] shadow-2xl backdrop-blur-xl">
        <div className="p-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20">
            <Info className="w-8 h-8 text-primary" />
          </div>
          
          <DialogHeader className="text-center space-y-4 mb-8">
            <DialogTitle className="text-2xl font-bold text-white tracking-tight">
              {t.offerTitle}
            </DialogTitle>
            <DialogDescription className="text-white/70 text-sm font-bold leading-relaxed">
              {t.offerContent}
            </DialogDescription>
          </DialogHeader>

          <Button 
            onClick={onClose}
            size="lg"
            className="w-full"
          >
            {t.confirm}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
