
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <nav className="bg-secondary/95 rounded-full py-3 px-6 flex items-center justify-between gap-2 shadow-2xl border border-white/5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as NavTab)}
              className={cn(
                "flex flex-col items-center justify-center transition-all duration-300 relative group",
                isActive ? "text-primary" : "text-muted-foreground hover:text-white"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all",
                isActive ? "bg-primary/10" : ""
              )}>
                <Icon className={cn("w-6 h-6", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
              </div>
              <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">{tab.label}</span>
              {isActive && (
                <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
