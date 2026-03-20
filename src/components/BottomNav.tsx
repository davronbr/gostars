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

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-md">
      <nav className="bg-secondary/40 backdrop-blur-2xl rounded-[2.5rem] p-2 flex items-center justify-around gap-1 shadow-2xl border border-white/5 overflow-hidden">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as NavTab)}
              className={cn(
                "flex flex-col items-center justify-center transition-all duration-500 relative flex-1 py-3 px-1 rounded-[1.8rem]",
                isActive 
                  ? "bg-white/10 text-primary shadow-inner" 
                  : "text-muted-foreground hover:text-white"
              )}
            >
              <div className="relative">
                <Icon className={cn(
                  "w-6 h-6 transition-transform duration-300", 
                  isActive ? "scale-110 stroke-[2.5px]" : "scale-100 stroke-[2px]"
                )} />
                {isActive && (
                  <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full -z-10 animate-pulse" />
                )}
              </div>
              <span className={cn(
                "text-[10px] font-black mt-1.5 uppercase tracking-tighter transition-all",
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