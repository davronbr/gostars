
"use client";

import { useState, useEffect } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Marketplace } from "@/components/Marketplace";
import { Leaderboard } from "@/components/Leaderboard";
import { MyGifts } from "@/components/MyGifts";
import { ListingForm } from "@/components/ListingForm";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  Wallet, 
  MessageCircle, 
  Lightbulb, 
  FileText, 
  ChevronRight,
  X,
  Check,
  User as UserIcon,
  Info,
  Globe,
  Link,
  History,
  Star as StarIcon
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
import { NftDetailModal } from "@/components/NftDetailModal";
import type { NftCollectionItem } from "@/lib/collections";
import { useFirebase, initiateAnonymousSignIn, useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';


const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export type NavTab = "marketplace" | "gifts" | "leaderboard" | "profile" | "listing";
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
    market: "Go Stars",
    gifts: "Gifts",
    leaderboard: "Leaderboard",
    profile: "Tarix",
    language: "Til",
    payment: "Hamyon usuli",
    help: "Yordam",
    news: "Yangiliklar",
    offer: "Ommaviy taklif",
    offerTitle: "Tez Nft nima?",
    offerContent: "Tez Nft — bu raqamli aktivlar (veb-saytlar, SaaS, skriptlar) va professional dasturchilar uchun mo'ljallangan premium platforma.",
    listAsset: "Asset qo'shish",
    online: "Onlayn",
    search: "Qidirish...",
    categories: "Kategoriyalar",
    emptyMarket: "Market bo'sh",
    emptyMarketDesc: "Tez Nft-da birinchi bo'lib premium asset joylang.",
    contact: "Bog'lanish",
    portfolio: "Portfolio",
    vetted: "Tasdiqlangan dasturchilar",
    langName: "O'zbekcha",
    leaderboardTitle: "Eng yaxshi hamkorlar",
    communityGrowing: "Hamjamiyat o'smoqda",
    leaderboardDesc: "Leaderboard hozirda tasdiqlangan mutaxassislar bilan to'ldirilmoqda.",
    myGiftsTitle: "Telegram sovg'alari bormi?",
    myGiftsDesc: "Ularni bizning bot orqali qo'shishingiz mumkin.",
    listingEntry: "Marketga kirish",
    listingDesc: "Saytingiz yoki raqamli vositangizni Tez Nft tarmog'ida soting.",
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
    anonymous: "Anonim",
    offers: "Takliflar",
    myActivity: "Faoliyatim",
    unlisted: "Ro'yxatdan o'tmagan",
    listed: "Ro'yxatdagi",
    add: "Qo'shish",
    withdraw: "Yechib olish",
    sell: "Sotish",
    send: "Yuborish",
    quickFind: "Tezkor qidiruv",
    collection: "Kolleksiya",
    model: "Model",
    back: "Orqaga",
    anyTelegramGifts: "Telegram sovg'alari bormi?",
    addGiftsViaBot: "Ularni bizning bot orqali qo'shishingiz mumkin",
    howToAddGifts: "Sovg'alarni qanday qo'shaman?",
    allItems: "Barcha narsalar",
    collections: "Kolleksiyalar",
    symbol: "Simvol",
    backdrop: "Fon",
    floorPrice: "Minimal narx",
    makeOffer: "Taklif qilish",
    buyGift: "Sovg'ani sotib olish",
    connectTelegram: "Telegram'ni ulash",
    connected: "Ulangan",
    telegramConnected: "Telegram uladi!",
    telegramConnectedDesc: "Akkauntingiz muvaffaqiyatli ulandi.",
    error: "Xatolik",
    loginToConnect: "Telegram'ni ulash uchun tizimga kiring.",
    openInTelegram: "Ilovani Telegram orqali oching.",
    stars: "Stars",
    premium: "Premium",
    buyStars: "Stars sotib olish",
    starsTitle: "Telegram Stars",
    starsDesc: "Click, Payme yoki Paynet orqali Stars balansini to'ldiring — o'zingiz yoki yaqinlaringiz uchun.",
    historyTitle: "Buyurtmalar tarixi",
    all: "Hammasi",
    unpaid: "TO'LANMAGAN",
    expired: "MUDDATI O'TGAN",
    starsTab: "Stars",
    premiumTab: "Premium",
    settings: "Sozlamalar",
  },
  ru: {
    market: "Go Stars",
    gifts: "Gifts",
    leaderboard: "Leaderboard",
    profile: "Tarix",
    language: "Язык",
    payment: "Метод кошелька",
    help: "Помощь",
    news: "Канал новостей",
    offer: "Публичная оферта",
    offerTitle: "Что такое Tez Nft?",
    offerContent: "Tez Nft — это премиальная платформа для цифровых активов.",
    listAsset: "Добавить актив",
    online: "В сети",
    search: "Поиск...",
    categories: "Категории",
    emptyMarket: "Маркет пуст",
    emptyMarketDesc: "Будьте первым, кто разместит премиум-актив на Tez Nft.",
    contact: "Связаться",
    portfolio: "Портфолио",
    vetted: "Проверенные специалисты",
    langName: "Русский",
    leaderboardTitle: "Лучшие партнеры",
    communityGrowing: "Сообщество растет",
    leaderboardDesc: "Каталог в настоящее время наполняется проверенными специалистами.",
    myGiftsTitle: "Есть подарки из Telegram?",
    myGiftsDesc: "Вы можете добавить их через нашего бота.",
    listingEntry: "Вход в маркет",
    listingDesc: "Продайте свой сайт или цифровой инструмент в сети Tez Nft.",
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
    anonymous: "Аноним",
    offers: "Предложения",
    myActivity: "Моя активность",
    unlisted: "Не в списке",
    listed: "В списке",
    add: "Добавить",
    withdraw: "Вывести",
    sell: "Продать",
    send: "Отправить",
    quickFind: "Быстрый поиск",
    collection: "Коллекция",
    model: "Модель",
    back: "Назад",
    anyTelegramGifts: "Есть подарки из Telegram?",
    addGiftsViaBot: "Вы можете добавить их через нашего бота",
    howToAddGifts: "Как добавить подарки?",
    allItems: "Все товары",
    collections: "Коллекции",
    symbol: "Символ",
    backdrop: "Фон",
    floorPrice: "Минимальная цена",
    makeOffer: "Предложить цену",
    buyGift: "Купить подарок",
    connectTelegram: "Подключить Telegram",
    connected: "Подключено",
    telegramConnected: "Telegram подключен!",
    telegramConnectedDesc: "Ваш аккаунт успешно подключен.",
    error: "Ошибка",
    loginToConnect: "Войдите, чтобы подключить Telegram.",
    openInTelegram: "Откройте приложение в Telegram.",
    stars: "Stars",
    premium: "Premium",
    buyStars: "Купить Stars",
    starsTitle: "Telegram Stars",
    starsDesc: "Пополните баланс Stars через Click, Payme или Paynet — для себя или своих близких.",
    historyTitle: "История заказов",
    all: "Все",
    unpaid: "НЕ ОПЛАЧЕНО",
    expired: "ИСТЕКЛО",
    starsTab: "Stars",
    premiumTab: "Premium",
    settings: "Настройки",
  },
  en: {
    market: "Go Stars",
    gifts: "Gifts",
    leaderboard: "Leaderboard",
    profile: "Tarix",
    language: "Language",
    payment: "Wallet method",
    help: "Support",
    news: "News channel",
    offer: "Public offer",
    offerTitle: "What is Tez Nft?",
    offerContent: "Tez Nft is a premium platform for digital assets and professional developers.",
    listAsset: "List asset",
    online: "Online",
    search: "Search assets...",
    categories: "Categories",
    emptyMarket: "Market is empty",
    emptyMarketDesc: "Be the first to list a premium digital asset on Tez Nft.",
    contact: "Contact",
    portfolio: "Portfolio",
    vetted: "Vetted developers",
    langName: "English",
    leaderboardTitle: "Top Partners",
    communityGrowing: "Community growing",
    leaderboardDesc: "The leaderboard is currently being populated with vetted talent.",
    myGiftsTitle: "Any Telegram gifts?",
    myGiftsDesc: "You can add them through our bot.",
    listingEntry: "Marketplace entry",
    listingDesc: "Sell your website or digital tool to the Tez Nft network.",
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
    anonymous: "Anonymous",
    offers: "Offers",
    myActivity: "My activity",
    unlisted: "Unlisted",
    listed: "Listed",
    add: "Add",
    withdraw: "Withdraw",
    sell: "Sell",
    send: "Send",
    quickFind: "Quick find",
    collection: "Collection",
    model: "Model",
    back: "Back",
    anyTelegramGifts: "Any Telegram gifts?",
    addGiftsViaBot: "You can add them through our bot",
    howToAddGifts: "How do I add gifts?",
    allItems: "All items",
    collections: "Collections",
    symbol: "Symbol",
    backdrop: "Backdrop",
    floorPrice: "Floor Price",
    makeOffer: "Make an offer",
    buyGift: "Buy gift",
    connectTelegram: "Connect Telegram",
    connected: "Connected",
    telegramConnected: "Telegram Connected!",
    telegramConnectedDesc: "Your account has been successfully linked.",
    error: "Error",
    loginToConnect: "Please log in to connect Telegram.",
    openInTelegram: "Please open the app in Telegram.",
    stars: "Stars",
    premium: "Premium",
    buyStars: "Buy Stars",
    starsTitle: "Telegram Stars",
    starsDesc: "Top up your Stars balance via Click, Payme or Paynet — for yourself or your loved ones.",
    historyTitle: "Order history",
    all: "All",
    unpaid: "UNPAID",
    expired: "EXPIRED",
    starsTab: "Stars",
    premiumTab: "Premium",
    settings: "Settings",
  }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>("marketplace");
  const [marketSubTab, setMarketSubTab] = useState<"stars" | "premium">("stars");
  const [lang, setLang] = useState<Language>("uz");
  const [walletMethod, setWalletMethod] = useState("Payme");
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [tgUser, setTgUser] = useState<any>(null);
  const [selectedNft, setSelectedNft] = useState<NftCollectionItem | null>(null);

  const { auth, user, isUserLoading } = useFirebase();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const webapp = window.Telegram.WebApp;
      webapp.ready();
      webapp.expand();
      if (webapp.initDataUnsafe?.user) {
        setTgUser(webapp.initDataUnsafe.user);
      }
    }

    if (auth && !user && !isUserLoading) {
      initiateAnonymousSignIn(auth);
    }
  }, [auth, user, isUserLoading]);

  const t = translations[lang];

  const renderContent = () => {
    switch (activeTab) {
      case "marketplace":
        return <Marketplace lang={lang} subTab={marketSubTab} />;
      case "leaderboard":
        return <Leaderboard lang={lang} />;
      case "gifts":
        return <MyGifts lang={lang} />;
      case "profile":
        return (
          <HistoryView 
            lang={lang} 
          />
        );
      case "listing":
        return <ListingForm onBack={() => setActiveTab("marketplace")} lang={lang} />;
      default:
        return <Marketplace lang={lang} subTab={marketSubTab} />;
    }
  };

  return (
    <main className="min-h-screen max-w-2xl mx-auto bg-black selection:bg-primary selection:text-white font-body overflow-x-hidden relative">
      
      {/* Global Header */}
      <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-30">
        {/* Left Balance Display */}
        <div className="h-11 px-5 flex items-center justify-center bg-zinc-900 border border-white/10 rounded-full shadow-[inset_0_1.5px_0_rgba(255,255,255,0.15)]">
          <span className="text-sm font-bold text-white tracking-tight">0 UZS</span>
        </div>

        {/* Center Toggle (Only for Marketplace) */}
        <div className="flex-1 flex justify-center px-2">
          {activeTab === "marketplace" ? (
            <div className="bg-zinc-900 p-1 rounded-full flex items-center border border-white/5 shadow-inner">
              <button
                onClick={() => setMarketSubTab("stars")}
                className={cn(
                  "px-6 py-1.5 rounded-full text-xs font-bold transition-all duration-300",
                  marketSubTab === "stars" ? "bg-white text-black shadow-md" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {t.stars}
              </button>
              <button
                onClick={() => setMarketSubTab("premium")}
                className={cn(
                  "px-6 py-1.5 rounded-full text-xs font-bold transition-all duration-300",
                  marketSubTab === "premium" ? "bg-white text-black shadow-md" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {t.premium}
              </button>
            </div>
          ) : (
            <div className="h-11" /> // Spacer for non-marketplace tabs
          )}
        </div>

        {/* Right Settings */}
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full border-white/10"
          onClick={() => setIsSettingsModalOpen(true)}
        >
          <Settings className="w-5 h-5 text-white" />
        </Button>
      </header>

      <div className="relative">
        {renderContent()}
      </div>

      <BottomNav 
        activeTab={activeTab === "listing" ? "marketplace" : activeTab} 
        onTabChange={setActiveTab} 
        lang={lang}
      />
      
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

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        lang={lang}
        walletMethod={walletMethod}
        tgUser={tgUser}
        user={user}
        onOpenLangModal={() => { setIsSettingsModalOpen(false); setIsLangModalOpen(true); }}
        onOpenWalletModal={() => { setIsSettingsModalOpen(false); setIsWalletModalOpen(true); }}
        onOpenOfferModal={() => { setIsSettingsModalOpen(false); setIsOfferModalOpen(true); }}
      />

      <NftDetailModal
        isOpen={!!selectedNft}
        onClose={() => setSelectedNft(null)}
        nft={selectedNft}
        lang={lang}
      />
      
      <Toaster />
    </main>
  );
}

function HistoryView({ lang }: { lang: Language }) {
  const t = translations[lang];
  const [activeFilter, setActiveFilter] = useState<"all" | "stars" | "premium">("all");

  const orders = [
    {
      id: "1",
      user: "@moglq",
      stars: 50,
      method: "Paynet",
      date: "21 Mar 2026, 12:53",
      price: "12999 so'm",
      status: "expired",
      type: "stars"
    },
    {
      id: "2",
      user: "@Nullprime",
      stars: 100,
      method: "Click",
      date: "28 Dek 2025, 11:39",
      price: "23999 so'm",
      status: "unpaid",
      type: "stars"
    },
    {
      id: "3",
      user: "@nullprime",
      stars: 150,
      method: "Click",
      date: "07 Dek 2025, 23:44",
      price: "34999 so'm",
      status: "unpaid",
      type: "stars"
    }
  ];

  const filteredOrders = activeFilter === "all" 
    ? orders 
    : orders.filter(o => o.type === activeFilter);

  return (
    <div className="p-6 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">{t.historyTitle}</h2>

      <div className="flex gap-2 mb-8">
        <Button
          onClick={() => setActiveFilter("all")}
          variant={activeFilter === "all" ? "default" : "outline"}
          size="sm"
          className="rounded-full px-6"
        >
          {t.all}
        </Button>
        <Button
          onClick={() => setActiveFilter("stars")}
          variant={activeFilter === "stars" ? "default" : "outline"}
          size="sm"
          className="rounded-full px-6 flex items-center gap-2"
        >
          <StarIcon className="w-4 h-4 fill-yellow-500 text-yellow-500" />
          {t.starsTab}
        </Button>
        <Button
          onClick={() => setActiveFilter("premium")}
          variant={activeFilter === "premium" ? "default" : "outline"}
          size="sm"
          className="rounded-full px-6 flex items-center gap-2"
        >
          <StarIcon className="w-4 h-4 fill-blue-500 text-blue-500" />
          {t.premiumTab}
        </Button>
      </div>

      <div className="bg-zinc-900/40 border border-white/10 rounded-[2rem] p-4 space-y-4 mb-10">
        {filteredOrders.length === 0 ? (
          <p className="text-center py-10 text-zinc-500 font-bold text-sm uppercase tracking-widest">Bo'sh</p>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center border border-white/10 shadow-lg">
                  <StarIcon className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">{order.user}</span>
                    <span className="bg-yellow-500/10 text-yellow-500 text-[10px] font-black px-2 py-0.5 rounded-lg border border-yellow-500/20">
                      {order.stars} STARS
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500 font-bold mt-1">
                    {order.method} - {order.date}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5">
                <span className="font-bold text-white text-sm">{order.price}</span>
                <span className={cn(
                  "text-[10px] font-black px-2 py-1 rounded-lg",
                  order.status === "expired" ? "bg-zinc-800 text-zinc-500" : "bg-yellow-500/20 text-yellow-500"
                )}>
                  {order.status === "expired" ? t.expired : t.unpaid}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function SettingsModal({ isOpen, onClose, lang, walletMethod, tgUser, user, onOpenLangModal, onOpenWalletModal, onOpenOfferModal }: { 
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  walletMethod: string;
  tgUser: any;
  user: any;
  onOpenLangModal: () => void;
  onOpenWalletModal: () => void;
  onOpenOfferModal: () => void;
}) {
  const t = translations[lang];
  const { toast } = useToast();
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(() => 
    user ? doc(firestore, 'users', user.uid) : null, 
    [user, firestore]
  );
  const { data: userProfile } = useDoc<{telegramUserId?: string}>(userProfileRef);

  const isTelegramConnected = !!userProfile?.telegramUserId;

  const handleConnectTelegram = () => {
    if (user && tgUser?.id) {
      const userRef = doc(firestore, 'users', user.uid);
      setDocumentNonBlocking(userRef, { 
        telegramUserId: tgUser.id 
      }, { merge: true });
      
      toast({
          title: t.telegramConnected,
          description: t.telegramConnectedDesc,
      });
    } else if (!user) {
        toast({
            title: t.error,
            description: t.loginToConnect,
            variant: "destructive"
        });
    } else if (!tgUser?.id) {
         toast({
            title: t.error,
            description: t.openInTelegram,
            variant: "destructive"
        });
    }
  };

  const settingsGroups = [
    {
      items: [
        { 
          icon: Globe, 
          label: t.language, 
          value: t.langName, 
          color: "bg-purple-500",
          onClick: onOpenLangModal,
          disabled: false,
        },
        { 
          icon: Wallet, 
          label: t.payment, 
          value: walletMethod, 
          color: "bg-blue-500",
          onClick: onOpenWalletModal,
          disabled: false,
        },
        {
          icon: Link,
          label: t.connectTelegram,
          value: isTelegramConnected ? t.connected : "",
          color: "bg-sky-500",
          onClick: handleConnectTelegram,
          disabled: isTelegramConnected,
        },
        { 
          icon: MessageCircle, 
          label: t.help, 
          value: "@moglq", 
          color: "bg-orange-500",
          onClick: () => window.open("https://t.me/moglq", "_blank"),
          disabled: false,
        },
        { 
          icon: Lightbulb, 
          label: t.news, 
          value: "@tez_nft", 
          color: "bg-yellow-500",
          onClick: () => window.open("https://t.me/tez_nft", "_blank"),
          disabled: false,
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
          onClick: onOpenOfferModal,
          disabled: false,
        },
      ]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-950 border-none rounded-[2.5rem] p-0 overflow-hidden max-w-[95%] sm:max-w-[420px] shadow-2xl">
        <div className="p-6 pb-10">
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-xl font-bold text-white tracking-tight">{t.settings}</h2>
            <button onClick={onClose} className="p-2 bg-zinc-900 rounded-full border border-white/5">
              <X className="w-5 h-5 text-white/50" />
            </button>
          </div>

          <div className="flex flex-col items-center mb-10 text-center">
            <div className="relative w-24 h-24 mb-4">
              <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center border border-white/10 overflow-hidden shadow-[inset_0_1.5px_0_rgba(255,255,255,0.1)] relative">
                {tgUser?.photo_url ? (
                  <Image 
                    src={tgUser.photo_url} 
                    alt="Profile" 
                    fill 
                    className="object-cover"
                    unoptimized
                  />
                ) : tgUser?.first_name ? (
                  <div className="text-white font-bold text-3xl tracking-tighter">
                    {tgUser.first_name[0]}
                  </div>
                ) : (
                  <UserIcon className="w-10 h-10 text-white/20" />
                )}
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {tgUser?.first_name ? `${tgUser.first_name} ${tgUser.last_name || ""}`.trim() : t.name}
            </h2>
            <p className="text-white/40 text-xs font-bold tracking-widest mt-1">
              {tgUser?.username ? `@${tgUser.username}` : t.anonymous}
            </p>
          </div>

          <div className="space-y-4 px-2">
            {settingsGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-2">
                {group.items.map((item, iIdx) => (
                  <button 
                    key={iIdx} 
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className="w-full flex items-center justify-between p-4 bg-zinc-900 border border-white/10 transition-all text-left group rounded-[1.5rem] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.1)] mb-1 disabled:opacity-50 disabled:cursor-not-allowed"
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
      </DialogContent>
    </Dialog>
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
                  "w-full flex items-center gap-3 p-4 rounded-[1.5rem] border-2 transition-all duration-300 group shadow-[inset_0_1.5px_0_rgba(255,255,255,0.05)]",
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
                  "w-full flex items-center justify-between p-4 rounded-[1.2rem] border-2 transition-all duration-300 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.05)]",
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
