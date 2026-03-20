
"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Shield, ChevronLeft, Smile, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import type { Language } from "@/app/page";
import { translations } from "@/app/page";

interface Message {
  id: string;
  user: string;
  text?: string;
  image?: string;
  sticker?: string;
  time: string;
  isAdmin?: boolean;
}

const TELEGRAM_EMOJIS = [
  "😂", "😭", "😋", "😘", "😄", "😔", "🙈", "😌", "😆", "😁", "😐", "🔥", "😕", "😍", "🐣", "🐥", 
  "👨‍💻", "🎗️", "🎀", "😢", "😮", "💧", "🏆", "💸", "🇺🇿", "🏇", "💀", "🥂", "😪", "❤️", "😊", "👍", 
  "☺️", "😅", "💋", "😒", "😳", "😜", "😉", "🥲", "😝", "😱", "😡", "😏", "😚", "👌", "😇", "🤔",
  "🤡", "🥳", "🤯", "🥶", "🥵", "🥺", "🤫", "🤥", "🤤", "🤢", "🤮", "🤧", "🤠", "🧐", "🤓", "😎",
  "✨", "🎉", "💯", "🙌", "🙏", "💪", "🚀", "⚡️", "🌈", "🍎", "🍕", "🚗", "💻", "📱", "🎮"
];

interface GlobalChatProps {
  onBack?: () => void;
  lang: Language;
}

export function GlobalChat({ onBack, lang }: GlobalChatProps) {
  const t = translations[lang];

  const MOCK_MESSAGES: Message[] = [
    {
      id: "1",
      user: "Admin",
      text: t.welcomeChat,
      time: "10:00 AM",
      isAdmin: true,
    },
    {
      id: "2",
      user: "CyberNaut",
      text: "Check out this UI kit I found!",
      image: "https://picsum.photos/seed/chat1/600/400",
      time: "10:05 AM",
    },
    {
      id: "3",
      user: "AlphaBuild",
      sticker: "🚀",
      time: "10:12 AM",
    },
  ];

  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text?: string, image?: string, sticker?: string) => {
    if (!text?.trim() && !image && !sticker) return;

    const msg: Message = {
      id: Date.now().toString(),
      user: "You",
      text: text,
      image: image,
      sticker: sticker,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
    setPendingImage(null);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPendingImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  return (
    <div className="flex flex-col h-screen animate-in fade-in duration-500 overflow-hidden bg-background">
      <div className="px-4 py-4 flex items-center border-b border-white/5 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            className="rounded-full text-white hover:bg-white/10"
            onClick={onBack}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div className="flex flex-col">
            <h2 className="text-sm font-bold text-white uppercase tracking-tight">{t.global} {t.hub}</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">1,248 {t.online}</p>
            </div>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar scroll-smooth"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.user === "You" ? "flex-row-reverse" : ""}`}>
            <Avatar className="w-8 h-8 rounded-full border border-white/5 flex-shrink-0">
              <AvatarFallback className="bg-secondary text-primary text-[10px] font-bold uppercase">
                {msg.user[0]}
              </AvatarFallback>
            </Avatar>
            <div className={`max-w-[75%] flex flex-col ${msg.user === "You" ? "items-end" : ""}`}>
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">{msg.user}</span>
                {msg.isAdmin && <Shield className="w-3 h-3 text-primary" />}
              </div>
              
              <div className={`flex flex-col gap-1 ${
                msg.user === "You" ? "items-end" : "items-start"
              }`}>
                {msg.image && (
                  <div className="relative w-64 aspect-video rounded-2xl overflow-hidden border border-white/5 shadow-xl mb-1">
                    <Image src={msg.image} alt="Shared content" fill className="object-cover" />
                  </div>
                )}
                
                {msg.sticker ? (
                  <div className="text-6xl py-2 animate-bounce-short select-none">
                    {msg.sticker}
                  </div>
                ) : msg.text ? (
                  <div className={`p-3 rounded-2xl text-sm font-bold leading-relaxed ${
                    msg.user === "You" 
                      ? "bg-primary text-white rounded-tr-none shadow-lg shadow-primary/10" 
                      : "bg-secondary text-white rounded-tl-none border border-white/5"
                  }`}>
                    {msg.text}
                    <div className="mt-1 flex justify-end">
                      <span className={`text-[9px] font-bold uppercase opacity-50 ${msg.user === "You" ? "text-white" : "text-muted-foreground"}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {pendingImage && (
        <div className="px-4 py-2 bg-secondary/30 flex items-center gap-4 border-t border-white/5">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-primary">
            <Image src={pendingImage} alt="Pending" fill className="object-cover" />
            <button 
              className="absolute top-1 right-1 bg-black/50 rounded-full p-1"
              onClick={() => setPendingImage(null)}
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Image attached</p>
        </div>
      )}

      <div className="p-4 bg-background border-t border-white/5 pb-8">
        <div className="flex items-center gap-2 bg-secondary p-2 rounded-2xl border border-white/5 focus-within:border-primary/50 transition-colors">
          <input 
            type="file" 
            hidden 
            ref={fileInputRef} 
            accept="image/*"
            onChange={onFileChange}
          />
          
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-2 rounded-xl text-muted-foreground hover:text-primary transition-colors">
                <Smile className="w-6 h-6" />
              </button>
            </PopoverTrigger>
            <PopoverContent side="top" align="start" className="w-[340px] bg-secondary/95 backdrop-blur-xl border-white/10 p-0 rounded-3xl overflow-hidden shadow-2xl mb-2">
              <ScrollArea className="h-[300px] p-4">
                <div className="grid grid-cols-7 gap-1">
                  {TELEGRAM_EMOJIS.map((emoji, index) => (
                    <button 
                      key={`${emoji}-${index}`} 
                      className="text-3xl hover:bg-white/10 p-2 rounded-xl transition-all active:scale-75 select-none"
                      onClick={() => handleSend(undefined, undefined, emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </ScrollArea>
              <div className="bg-white/5 p-3 flex justify-between items-center px-6">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">iPhone Emojis</p>
                <div className="flex gap-4">
                  <span className="text-primary text-xs font-bold">😊</span>
                  <span className="text-muted-foreground text-xs font-bold">🚀</span>
                  <span className="text-muted-foreground text-xs font-bold">⚡️</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Input 
            placeholder={t.writeMessage}
            className="bg-transparent border-none h-10 font-bold focus-visible:ring-0 shadow-none text-white placeholder:text-muted-foreground/50 text-base"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(newMessage, pendingImage || undefined)}
          />
          
          <div className="flex items-center gap-1">
            <Button 
              size="icon" 
              variant="ghost" 
              className={`rounded-xl transition-colors ${pendingImage ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={handleImageClick}
            >
              <ImageIcon className="w-5 h-5" />
            </Button>
            <Button 
              size="icon" 
              disabled={!newMessage.trim() && !pendingImage}
              className={`h-10 w-10 rounded-xl transition-all duration-300 ${
                (newMessage.trim() || pendingImage) ? "bg-primary text-white scale-100" : "bg-transparent text-muted-foreground scale-90 opacity-50"
              }`}
              onClick={() => handleSend(newMessage, pendingImage || undefined)}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
