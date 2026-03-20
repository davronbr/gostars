
"use client";

import { Home, Globe, Users, User } from "lucide-react";
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
    { id: "global", icon: Globe, label: t.global },
    { id: "directory", icon: Users, label: t.devs },
    { id: "profile", icon: User, label: t.profile },
  ] as const;

  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md">
      <nav className="bg-zinc-900/80 backdrop-blur-3xl rounded-[2.8rem] p-1.5 flex items-center relative shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden">
        {/* Sliding active background indicator */}
        <div 
          className="absolute h-[calc(100%-12px)] top-1.5 transition-all duration-500 ease-out bg-zinc-800/90 rounded-[2.2rem] border border-white/5 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.4)]"
          style={{ 
            width: `calc(25% - 6px)`,
            left: `calc(${activeIndex * 25}% + 6px)` 
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
                "flex flex-col items-center justify-center transition-all duration-300 relative z-10 flex-1 py-3 px-1 rounded-[2.2rem] group",
                isActive ? "text-primary" : "text-zinc-500 hover:text-white"
              )}
            >
              <div className="transition-transform duration-300 group-hover:-translate-y-1">
                <Icon className={cn(
                  "w-5.5 h-5.5 transition-all duration-300", 
                  isActive ? "scale-110 stroke-[2.5px]" : "scale-100 stroke-[2px]"
                )} />
              </div>
              <span className={cn(
                "text-[9px] font-black mt-1.5 uppercase tracking-tighter transition-all duration-300",
                isActive ? "opacity-100" : "opacity-60"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
