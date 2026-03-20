"use client";

import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Marketplace } from "@/components/Marketplace";
import { DeveloperDirectory } from "@/components/DeveloperDirectory";
import { GlobalChat } from "@/components/GlobalChat";
import { ListingForm } from "@/components/ListingForm";
import { Toaster } from "@/components/ui/toaster";
import { ShoppingBag, Plus, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export type NavTab = "marketplace" | "global" | "directory" | "profile" | "listing";

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>("marketplace");

  const renderContent = () => {
    switch (activeTab) {
      case "marketplace":
        return <Marketplace />;
      case "directory":
        return <DeveloperDirectory />;
      case "global":
        return <GlobalChat onBack={() => setActiveTab("marketplace")} />;
      case "profile":
        return <ProfileView />;
      case "listing":
        return <ListingForm onBack={() => setActiveTab("marketplace")} />;
      default:
        return <Marketplace />;
    }
  };

  // Views that should be full-screen (no main header, no bottom nav)
  const isFullScreenView = activeTab === "global" || activeTab === "listing";

  return (
    <main className="min-h-screen max-w-2xl mx-auto bg-background selection:bg-primary selection:text-white font-body">
      {/* App Header - Hidden on Full Screen Views */}
      {!isFullScreenView && (
        <header className="px-6 pt-10 pb-6 flex justify-between items-center bg-background">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white tracking-tighter leading-none uppercase">
              Build io
            </h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-[0.3em] mt-1">
              Foundry
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              size="icon" 
              variant="secondary" 
              className="bg-secondary rounded-full border-none h-11 w-11 hover:bg-primary/20 hover:text-primary transition-all"
              onClick={() => setActiveTab("listing")}
            >
              <Plus className="w-5 h-5 text-white" />
            </Button>
            <Button size="icon" variant="secondary" className="bg-secondary rounded-full border-none h-11 w-11 relative">
              <ShoppingBag className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-[10px] flex items-center justify-center rounded-full text-white font-bold">
                0
              </span>
            </Button>
          </div>
        </header>
      )}

      {/* Main View Area */}
      <div className="relative">
        {renderContent()}
      </div>

      {/* Hide Bottom Nav on Full Screen Views */}
      {!isFullScreenView && (
        <BottomNav activeTab={activeTab === "listing" ? "marketplace" : activeTab} onTabChange={setActiveTab} />
      )}
      <Toaster />
    </main>
  );
}

function ProfileView() {
  return (
    <div className="p-4 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-secondary rounded-3xl p-8 mb-6 mt-4 text-center border border-white/5">
        <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-primary/50 p-1">
          <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center overflow-hidden">
             <User className="w-12 h-12 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">User Profile</h2>
        <p className="text-primary text-sm font-bold uppercase tracking-widest">Member</p>
        
        <div className="flex justify-center gap-4 mt-6">
          <div className="text-center">
            <p className="text-xl font-bold text-white">0</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Sales</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-xl font-bold text-white">$0</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Earned</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-xl font-bold text-white">0.0</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Rating</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold px-2 text-white uppercase tracking-tight">Transactions</h3>
        <div className="bg-secondary rounded-3xl overflow-hidden border border-white/5 divide-y divide-white/5">
          <div className="p-12 text-center text-muted-foreground">
            <p className="text-sm font-bold uppercase tracking-widest">No transactions found</p>
          </div>
        </div>

        <div className="space-y-2 pt-4">
          <Button variant="outline" className="w-full h-12 rounded-2xl bg-secondary border-none justify-start gap-4 hover:bg-white/10 font-bold text-white uppercase tracking-tight text-xs">
            <Settings className="w-5 h-5" /> Account Settings
          </Button>
          <Button variant="outline" className="w-full h-12 rounded-2xl bg-secondary border-none justify-start gap-4 text-destructive hover:bg-destructive/10 font-bold uppercase tracking-tight text-xs">
            <LogOut className="w-5 h-5" /> Logout Session
          </Button>
        </div>
      </div>
    </div>
  );
}
