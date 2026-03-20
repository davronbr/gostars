
"use client";

import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Marketplace } from "@/components/Marketplace";
import { DeveloperDirectory } from "@/components/DeveloperDirectory";
import { ListingForm } from "@/components/ListingForm";
import { Toaster } from "@/components/ui/toaster";
import { ShoppingBag, Heart, User, Settings, LogOut, Package, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavTab = "marketplace" | "search" | "list" | "directory" | "profile";

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>("marketplace");

  const renderContent = () => {
    switch (activeTab) {
      case "marketplace":
      case "search":
        return <Marketplace />;
      case "directory":
        return <DeveloperDirectory />;
      case "list":
        return <ListingForm />;
      case "profile":
        return <ProfileView />;
      default:
        return <Marketplace />;
    }
  };

  return (
    <main className="min-h-screen max-w-2xl mx-auto bg-background selection:bg-primary selection:text-white">
      {/* App Header */}
      <header className="px-6 pt-8 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-headline font-bold text-primary flex items-center gap-2">
            BUILD IO
          </h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Digital Foundry</p>
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="secondary" className="glass rounded-full border-none">
            <Heart className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="secondary" className="glass rounded-full border-none relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-[10px] flex items-center justify-center rounded-full text-white font-bold neon-glow">
              2
            </span>
          </Button>
        </div>
      </header>

      {/* Main View Area */}
      <div className="relative">
        {renderContent()}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      <Toaster />
    </main>
  );
}

function ProfileView() {
  return (
    <div className="p-4 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="glass rounded-3xl p-8 mb-6 mt-4 text-center">
        <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-primary/50 p-1">
          <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center overflow-hidden">
             <User className="w-12 h-12 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-headline font-bold">John Doe</h2>
        <p className="text-primary text-sm font-medium">Verified Developer</p>
        
        <div className="flex justify-center gap-4 mt-6">
          <div className="text-center">
            <p className="text-xl font-bold font-headline">12</p>
            <p className="text-[10px] text-muted-foreground uppercase">Sales</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-xl font-bold font-headline">$4.2k</p>
            <p className="text-[10px] text-muted-foreground uppercase">Earned</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-xl font-bold font-headline">4.9</p>
            <p className="text-[10px] text-muted-foreground uppercase">Rating</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-headline font-bold px-2">Transactions</h3>
        <div className="glass rounded-3xl overflow-hidden divide-y divide-white/5">
          <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">Purchase: Nebula E-com</p>
                <p className="text-xs text-muted-foreground">Order #88241 • Completed</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm">$4,850</p>
              <ExternalLink className="w-3 h-3 ml-auto mt-1 text-muted-foreground" />
            </div>
          </div>
          
          <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">Sold: CyberFlow SaaS</p>
                <p className="text-xs text-muted-foreground">Order #88239 • Processing</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm text-primary">+$2,400</p>
              <div className="flex justify-end mt-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-4">
          <Button variant="outline" className="w-full h-12 rounded-2xl glass border-none justify-start gap-4 hover:bg-white/10">
            <Settings className="w-5 h-5" /> Account Settings
          </Button>
          <Button variant="outline" className="w-full h-12 rounded-2xl glass border-none justify-start gap-4 text-destructive hover:bg-destructive/10">
            <LogOut className="w-5 h-5" /> Logout Session
          </Button>
        </div>
      </div>
    </div>
  );
}
