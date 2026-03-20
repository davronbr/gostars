"use client";

import { useState } from "react";
import { Send, MessageSquare, Shield, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    text: "Welcome to the Build io Global Hub! Ask questions, share ideas, or find your next partner here.",
    time: "10:00 AM",
    isAdmin: true,
  },
  {
    id: "2",
    user: "CyberNaut",
    text: "Anyone here experienced with Genkit and Next.js? Need some help with a flow.",
    time: "10:05 AM",
  },
  {
    id: "3",
    user: "DevMaster",
    text: "I can help! What exactly is the issue you're facing?",
    time: "10:07 AM",
  },
];

export function GlobalChat() {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState("");

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
    <div className="p-4 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col h-[75vh]">
      <div className="mb-6 mt-4">
        <h2 className="text-3xl font-bold mb-2 text-white">Global Hub</h2>
        <p className="text-muted-foreground font-bold">Community-wide discussion and collaboration space.</p>
      </div>

      <div className="flex-1 bg-secondary rounded-3xl border border-white/5 flex flex-col overflow-hidden">
        {/* Chat Info Header */}
        <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-widest">Live Channel</span>
          </div>
          <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.user === "You" ? "flex-row-reverse" : ""}`}>
              <Avatar className="w-8 h-8 rounded-full border border-white/10">
                <AvatarFallback className="bg-primary/20 text-primary text-[10px] font-bold">
                  {msg.user[0]}
                </AvatarFallback>
              </Avatar>
              <div className={`max-w-[80%] flex flex-col ${msg.user === "You" ? "items-end" : ""}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">{msg.user}</span>
                  {msg.isAdmin && <Shield className="w-3 h-3 text-primary" />}
                  <span className="text-[10px] text-muted-foreground/50">{msg.time}</span>
                </div>
                <div className={`p-3 rounded-2xl text-sm font-bold ${
                  msg.user === "You" 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "bg-background text-white rounded-tl-none border border-white/5"
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/5 border-t border-white/5">
          <div className="flex gap-2">
            <Input 
              placeholder="Message Global Hub..." 
              className="bg-background border-none rounded-2xl h-12 font-bold focus-visible:ring-primary"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button 
              size="icon" 
              className="h-12 w-12 rounded-2xl bg-primary text-white hover:bg-primary/80"
              onClick={handleSend}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
