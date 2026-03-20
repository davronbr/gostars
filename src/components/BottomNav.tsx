"use client";

import { Home, Gift, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavTab, Language } from "@/app/page";
import { translations } from "@/app/page";

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  lang: Language;
}

export function BottomNav({ activeTab, onTabChange, lang }: BottomNavProps) {
  const t = translations[lang];

  const tabs = [
    { id: "marketplace", icon: Home, label: t.market },
    { id: "gifts", icon: Gift, label: t.gifts },
    { id: "leaderboard", icon: Users, label: t.leaderboard },
    { id: "profile", icon: User, label: t.profile },
  ] as const;

  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-md">
      <nav className="bg-zinc-900/90 backdrop-blur-3xl rounded-[2.8rem] p-1.5 flex items-center relative shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/5 overflow-hidden h-20">
        <div 
          className="absolute h-[calc(100%-12px)] transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) bg-zinc-800/80 rounded-[2.2rem] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
          style={{ 
            width: `calc(25% - 8px)`,
            left: `calc(${activeIndex * 25}% + 4px)`,
            top: '6px'
          }}
        />

        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as NavTab)}
              className={cn(
                "flex flex-col items-center justify-center transition-all duration-300 relative z-10 flex-1 h-full rounded-[2.2rem] group",
                isActive ? "text-primary" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <div className="transition-transform duration-300 group-hover:-translate-y-1 flex flex-col items-center">
                <Icon className={cn(
                  "w-6 h-6 mb-1 transition-all duration-300", 
                  isActive ? "scale-110 stroke-[2.5px]" : "scale-100 stroke-[2px]"
                )} />
                <span className={cn(
                  "text-[10px] font-black tracking-tighter transition-all duration-300",
                  isActive ? "opacity-100" : "opacity-60"
                )}>
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
