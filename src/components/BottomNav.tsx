
"use client";

import { Home, Search, PlusSquare, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";

type NavTab = "marketplace" | "search" | "list" | "directory" | "profile";

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "marketplace", icon: Home, label: "Market" },
    { id: "search", icon: Search, label: "Search" },
    { id: "list", icon: PlusSquare, label: "List" },
    { id: "directory", icon: Users, label: "Devs" },
    { id: "profile", icon: User, label: "Profile" },
  ] as const;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <nav className="glass rounded-full py-3 px-6 flex items-center justify-between gap-2 shadow-2xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as NavTab)}
              className={cn(
                "flex flex-col items-center justify-center transition-all duration-300 relative group",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all",
                isActive ? "bg-primary/10" : ""
              )}>
                <Icon className={cn("w-6 h-6", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
              </div>
              <span className="text-[10px] font-medium mt-1">{tab.label}</span>
              {isActive && (
                <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full neon-glow" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
