
"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Shield, ChevronLeft, Smile, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const EMOJI_CATEGORIES = {
  faces: ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "🤯", "🤠", "🥳", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠️", "💩", "🤡", "👹", "👺", "👻", "👽", "👾", "🤖"],
  hands: ["👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️", "💅", "🤳", "💪", "🦾", "🦵", "🦿", "🦶", "👣", "👂", "🦻", "👃", "🧠", "🫀", "🫁", "🦷", "🦴", "👀", "👁️", "👅", "👄"],
  animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐻‍❄️", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🪱", "🐛", "🦋", "🐌", "🐞", "🐜", "🪰", "🪲", "🪳", "🦟", "🦗", "🕷️", "🕸️", "🦂", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞", "🦀", "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆", "🦓", "🦍", "🦧", "🦣", "🐘", "🦛", "🦏", "🐪", "🐫", "🦒", "🦘", "🦬", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🐐", "🦌", "🐕", "🐩", "🦮", "🐕‍🦺", "🐈", "🐈‍⬛", "🐓", "🦃", "🦚", "🦜", "🦢", "🦩", "🕊️", "🐇", "🦝", "🦨", "🦡", " beaver", "🦦", "🦥", "🐁", "🐀", "🐿️", "🦔"],
  food: ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶️", "🫑", "🌽", "🥕", "🫒", "🧄", "🧅", "🥔", "🍠", "🥐", "🥯", "🍞", "🥖", "🥨", "🧀", "🥚", "🍳", "🧈", "🥞", "🧇", "🥓", "🥩", "🍗", "🍖", "🌭", "🍔", "🍟", "🍕", "🫓", "🥪", "🥙", "🧆", "🌮", "🌯", "🫔", "🥗", "🥘", "🫕", "🥣", "🍝", "🍜", "🍲", "🍛", "🍣", "🍱", "🥟", "🦪", "🍤", "🍙", "🍚", "🍘", "🍥", "🥠", "🥮", "🍢", "🍡", "🍧", "🍨", "🍦", "🥧", "🧁", "🍰", "🎂", "🍮", "🍭", "🍬", "🍫", "🍿", "🍩", "🍪", "🌰", "🥜", "🍯", "🥛", "☕", "🫖", "🍵", "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃", "🥤", "🧋", "🧃", "🧉", "🧊"],
  activities: ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🎱", "🪄", "🪅", "🪆", "🎳", "🏏", "🏑", "🏒", "🥍", "🏓", "🏸", "🥊", "🥋", "🥅", "⛳", "⛸️", "🎣", "🤿", "🎽", "🎿", "🛷", "🥌", "🎯", "🪀", "🪁", "🎮", "🕹️", "🎰", "🎲", "🧩", "🧸", "🪟", "🪞", "🪠", "🪤", "🪒", "🧴", "🧷", "🧹", "🧺", "🧻", "🧼", "🧽", "🪣", "🪥", "🎭", "🖼️", "🎨", "🧵", "🪡", "🧶", "🪢"],
  objects: ["⌚", "📱", "📲", "💻", "⌨️", "🖱️", "🖲️", "🕹️", "🗜️", "💽", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥", "📽️", "🎞️", "📞", "☎️", "📟", "📠", "📺", "📻", "🎙️", "🎚️", "🎛️", "🧭", "⏱️", "⏲️", "⏰", "🕰️", "⌛", "⏳", "📡", "🔋", "🔌", "💡", "🔦", "🕯️", "🪔", "🧯", "🛢️", "💸", "💵", "💴", "💶", "💷", "🪙", "💰", "💳", "💎", "⚖️", "🪜", "🧰", "🪛", "🔧", "🔨", "⚒️", "🛠️", "⛏️", "🪚", "🔩", "⚙️", "🪝", "🧱", "⛓️", "🧲", "🔫", "💣", "🧨", "🪓", "🔪", "🗡️", "⚔️", "🛡️", "🚬", "⚰️", "🪦", "⚱️", "🏺", "🔮", "📿", "🧿", "💈", "⚗️", "🔭", "🔬", "🕳️", "🩹", "🩺", "💊", "💉", "🩸", "🧬", "🌡️", "🧹", "🧺", "🧻", "🧼", "🧽", "🪣", "🪥", "🔑", "🗝️", "🚪", "🪑", "🛋️", "🛏️", "🧸", "🖼️", "🛍️", "🛒", "🎁", "🎈", "🎏", "🎀", "🪄", "🪅", "🎊", "🎉", "🎎", "🏮", "🎐", "🧧", "✉️", "📩", "📨", "📧", "💌", "📥", "📤", "📦", "🏷️", "🪧", "📪", "📫", "📬", "📭", "📮", "📯", "📜", "📃", "📄", "📑", "📊", "📈", "📉", "🗒️", "🗓️", "📅", "🗑️", "📇", "🗃️", "🗳️", "🗄️", "📋", "📁", "📂", "🗂️", "🗞️", "📰", "📓", "📔", "📒", "📕", "📗", "📘", "📙", "📚", "📖", "🔖", "🧷", "🔗", "📎", "🖇️", "📐", "📏", "📌", "📍", "✂️", "🖊️", "🖋️", "✒️", "🖌️", "🖍️", "📝", "✏️", "🔍", "🔎", "🔏", "🔐", "🔒", "🔓"],
  travel: ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🛻", "🚚", "🚛", "🚜", "🏎️", "🏍️", "🛵", "🦽", "🦼", "🛺", "🚲", "🛴", "🛹", "🛼", "⛽", "🚨", "🚥", "🚦", "🛑", "🚧", "⚓", "⛵", "🛶", "🚤", "🛳️", "⛴️", " yachts", "🚢", "✈️", "🛩️", "🛫", "🛬", "🪂", "💺", "🚁", "🚟", "🚠", "🚡", "🛰️", "🚀", "🛸", "🪐", "🌠", "🌌", "⛱️", "🎆", "🎇", "🎑", "🏙️", "🌆", "🌅", "🌇", "🌉", "🌃", "🏔️", "⛰️", "🌋", "🗻", "🏕️", "⛺", "🛖", "🏠", "🏡", "🏘️", "🏚️", "🏗️", "🏭", "🏢", "🏬", "🏣", "🏤", "🏥", "🏦", "🏨", "🏪", "🏫", "🏩", "💒", "🏛️", "⛪", "🕌", "🕍", "🕋", "⛩️"]
};

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
    <div className="flex flex-col h-screen animate-in fade-in duration-500 overflow-hidden bg-black font-body">
      <div className="px-4 py-4 flex items-center bg-black/50 backdrop-blur-sm sticky top-0 z-10">
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
            <h2 className="text-sm font-black text-white uppercase tracking-tight italic">{t.global} {t.hub}</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">1,248 {t.online}</p>
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
            <Avatar className="w-8 h-8 rounded-full border border-white/5 flex-shrink-0 shadow-lg">
              <AvatarFallback className="bg-zinc-800 text-primary text-[10px] font-black uppercase italic">
                {msg.user[0]}
              </AvatarFallback>
            </Avatar>
            <div className={`max-w-[75%] flex flex-col ${msg.user === "You" ? "items-end" : ""}`}>
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tight">{msg.user}</span>
                {msg.isAdmin && <Shield className="w-3 h-3 text-primary" />}
              </div>
              
              <div className={`flex flex-col gap-1 ${
                msg.user === "You" ? "items-end" : "items-start"
              }`}>
                {msg.image && (
                  <div className="relative w-64 aspect-video rounded-2xl overflow-hidden border border-white/5 shadow-2xl mb-1">
                    <Image src={msg.image} alt="Shared content" fill className="object-cover" />
                  </div>
                )}
                
                {msg.sticker ? (
                  <div className="text-6xl py-2 animate-bounce-short select-none filter drop-shadow-xl" style={{ fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif' }}>
                    {msg.sticker}
                  </div>
                ) : msg.text ? (
                  <div className={`p-3 rounded-2xl text-sm font-black leading-relaxed shadow-xl border border-white/5 ${
                    msg.user === "You" 
                      ? "bg-primary text-white rounded-tr-none shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2)]" 
                      : "bg-zinc-900 text-white rounded-tl-none shadow-[inset_0_1.5px_0_rgba(255,255,255,0.1)]"
                  }`}>
                    {msg.text}
                    <div className="mt-1 flex justify-end">
                      <span className={`text-[9px] font-black uppercase opacity-50 ${msg.user === "You" ? "text-white" : "text-muted-foreground"}`}>
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
        <div className="px-4 py-2 bg-zinc-900/50 flex items-center gap-4 border-t border-white/5 backdrop-blur-md">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-primary shadow-lg">
            <Image src={pendingImage} alt="Pending" fill className="object-cover" />
            <button 
              className="absolute top-1 right-1 bg-black/50 rounded-full p-1 hover:bg-black/80 transition-colors"
              onClick={() => setPendingImage(null)}
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
          <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Image attached</p>
        </div>
      )}

      <div className="p-4 bg-black pb-8">
        <div className="flex items-center gap-2 bg-zinc-900/80 p-2 rounded-2xl border border-white/5 focus-within:border-primary/50 transition-all shadow-[inset_0_1.5px_0_rgba(255,255,255,0.05)]">
          <input 
            type="file" 
            hidden 
            ref={fileInputRef} 
            accept="image/*"
            onChange={onFileChange}
          />
          
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-2 rounded-xl text-muted-foreground hover:text-primary transition-all active:scale-90">
                <Smile className="w-6 h-6" />
              </button>
            </PopoverTrigger>
            <PopoverContent side="top" align="start" className="w-[340px] bg-zinc-900/95 backdrop-blur-2xl border-white/10 p-0 rounded-3xl overflow-hidden shadow-2xl mb-2">
              <Tabs defaultValue="faces" className="w-full">
                <ScrollArea className="h-[300px] p-4">
                  <TabsContent value="faces" className="mt-0">
                    <div className="grid grid-cols-6 gap-2">
                      {EMOJI_CATEGORIES.faces.map((emoji, idx) => (
                        <button 
                          key={`faces-${idx}`} 
                          className="text-3xl hover:bg-white/10 p-2 rounded-xl transition-all active:scale-75 select-none"
                          onClick={() => handleSend(undefined, undefined, emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="hands" className="mt-0">
                    <div className="grid grid-cols-6 gap-2">
                      {EMOJI_CATEGORIES.hands.map((emoji, idx) => (
                        <button 
                          key={`hands-${idx}`} 
                          className="text-3xl hover:bg-white/10 p-2 rounded-xl transition-all active:scale-75 select-none"
                          onClick={() => handleSend(undefined, undefined, emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="animals" className="mt-0">
                    <div className="grid grid-cols-6 gap-2">
                      {EMOJI_CATEGORIES.animals.map((emoji, idx) => (
                        <button 
                          key={`animals-${idx}`} 
                          className="text-3xl hover:bg-white/10 p-2 rounded-xl transition-all active:scale-75 select-none"
                          onClick={() => handleSend(undefined, undefined, emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="food" className="mt-0">
                    <div className="grid grid-cols-6 gap-2">
                      {EMOJI_CATEGORIES.food.map((emoji, idx) => (
                        <button 
                          key={`food-${idx}`} 
                          className="text-3xl hover:bg-white/10 p-2 rounded-xl transition-all active:scale-75 select-none"
                          onClick={() => handleSend(undefined, undefined, emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="activities" className="mt-0">
                    <div className="grid grid-cols-6 gap-2">
                      {EMOJI_CATEGORIES.activities.map((emoji, idx) => (
                        <button 
                          key={`activities-${idx}`} 
                          className="text-3xl hover:bg-white/10 p-2 rounded-xl transition-all active:scale-75 select-none"
                          onClick={() => handleSend(undefined, undefined, emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="objects" className="mt-0">
                    <div className="grid grid-cols-6 gap-2">
                      {EMOJI_CATEGORIES.objects.map((emoji, idx) => (
                        <button 
                          key={`objects-${idx}`} 
                          className="text-3xl hover:bg-white/10 p-2 rounded-xl transition-all active:scale-75 select-none"
                          onClick={() => handleSend(undefined, undefined, emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="travel" className="mt-0">
                    <div className="grid grid-cols-6 gap-2">
                      {EMOJI_CATEGORIES.travel.map((emoji, idx) => (
                        <button 
                          key={`travel-${idx}`} 
                          className="text-3xl hover:bg-white/10 p-2 rounded-xl transition-all active:scale-75 select-none"
                          onClick={() => handleSend(undefined, undefined, emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                </ScrollArea>
                <div className="bg-black/40 border-t border-white/5 p-2">
                  <TabsList className="grid grid-cols-7 bg-transparent h-auto p-0 gap-1">
                    <TabsTrigger value="faces" className="p-2 data-[state=active]:bg-white/10 rounded-xl transition-all">😊</TabsTrigger>
                    <TabsTrigger value="hands" className="p-2 data-[state=active]:bg-white/10 rounded-xl transition-all">👋</TabsTrigger>
                    <TabsTrigger value="animals" className="p-2 data-[state=active]:bg-white/10 rounded-xl transition-all">🐶</TabsTrigger>
                    <TabsTrigger value="food" className="p-2 data-[state=active]:bg-white/10 rounded-xl transition-all">🍔</TabsTrigger>
                    <TabsTrigger value="activities" className="p-2 data-[state=active]:bg-white/10 rounded-xl transition-all">⚽</TabsTrigger>
                    <TabsTrigger value="objects" className="p-2 data-[state=active]:bg-white/10 rounded-xl transition-all">💡</TabsTrigger>
                    <TabsTrigger value="travel" className="p-2 data-[state=active]:bg-white/10 rounded-xl transition-all">🚗</TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </PopoverContent>
          </Popover>

          <Input 
            placeholder={t.writeMessage}
            className="bg-transparent border-none h-10 font-black focus-visible:ring-0 shadow-none text-white placeholder:text-muted-foreground/50 text-base"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(newMessage, pendingImage || undefined)}
          />
          
          <div className="flex items-center gap-1">
            <Button 
              size="icon" 
              variant="ghost" 
              className={`rounded-xl transition-all ${pendingImage ? 'text-primary scale-110' : 'text-muted-foreground hover:text-white'}`}
              onClick={handleImageClick}
            >
              <ImageIcon className="w-5 h-5" />
            </Button>
            <Button 
              size="icon" 
              disabled={!newMessage.trim() && !pendingImage}
              className={`h-10 w-10 rounded-xl transition-all duration-300 shadow-lg ${
                (newMessage.trim() || pendingImage) 
                  ? "bg-primary text-white scale-100 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.3)]" 
                  : "bg-transparent text-muted-foreground scale-90 opacity-50"
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
