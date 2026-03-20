"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Shield, Paperclip, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  user: string;
  text: string;
  time: string;
  isAdmin?: boolean;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    user: "Admin",
    text: "Welcome to the Build io Global Hub! This is the official space for community collaboration.",
    time: "10:00 AM",
    isAdmin: true,
  },
  {
    id: "2",
    user: "CyberNaut",
    text: "Does anyone have a boilerplate for a Next.js 15 dashboard with Firebase?",
    time: "10:05 AM",
  },
  {
    id: "3",
    user: "DevMaster",
    text: "I'm working on one right now. I'll share the link once it's on the Marketplace!",
    time: "10:07 AM",
  },
  {
    id: "4",
    user: "AlphaBuild",
    text: "Need a React native expert for a fintech app project. DM me if interested.",
    time: "10:12 AM",
  },
];

interface GlobalChatProps {
  onBack?: () => void;
}

export function GlobalChat({ onBack }: GlobalChatProps) {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      user: "You",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen animate-in fade-in duration-500 overflow-hidden bg-background">
      {/* Simplified Full Screen Header */}
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
            <h2 className="text-sm font-bold text-white uppercase tracking-tight">Global Hub</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">1,248 Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar scroll-smooth"
      >
        <div className="flex justify-center mb-6">
          <span className="bg-secondary/50 text-[10px] font-bold text-muted-foreground px-4 py-1 rounded-full uppercase tracking-widest">Today</span>
        </div>

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
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Input Area */}
      <div className="p-4 bg-background border-t border-white/5 pb-8">
        <div className="flex items-center gap-2 bg-secondary/50 p-2 rounded-2xl border border-white/5 focus-within:border-primary/50 transition-colors">
          <Button size="icon" variant="ghost" className="rounded-xl text-muted-foreground hover:text-primary">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input 
            placeholder="Write a message..." 
            className="bg-transparent border-none h-10 font-bold focus-visible:ring-0 shadow-none text-white placeholder:text-muted-foreground/50"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button 
            size="icon" 
            disabled={!newMessage.trim()}
            className={`h-10 w-10 rounded-xl transition-all duration-300 ${
              newMessage.trim() ? "bg-primary text-white scale-100" : "bg-transparent text-muted-foreground scale-90 opacity-50"
            }`}
            onClick={handleSend}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
