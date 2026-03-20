"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const WEBSITES: any[] = [];
const CATEGORIES = ["All", "SaaS", "E-com", "Tool", "Social", "Portfolio"];

export function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md pt-6 pb-4 px-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search assets..." 
              className="pl-10 bg-secondary border-none rounded-full h-12 focus-visible:ring-primary font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="secondary" className="rounded-full h-12 w-12 bg-secondary border-none hover:bg-primary/20 hover:text-primary transition-all">
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-secondary border-white/10 rounded-2xl p-2">
              {CATEGORIES.map((category) => (
                <DropdownMenuItem 
                  key={category}
                  className="rounded-xl font-bold cursor-pointer hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-4 flex items-center justify-between px-2">
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
            Filtering: <span className="text-primary">{activeCategory}</span>
          </p>
        </div>
      </header>

      <div className="px-4 mt-8">
        {WEBSITES.length === 0 ? (
          <div className="bg-secondary rounded-3xl p-16 text-center flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <PlusCircle className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Market is Empty</h3>
              <p className="text-muted-foreground text-sm font-bold max-w-[240px] mx-auto">Be the first to list a premium digital asset on Build io.</p>
            </div>
            <Button className="rounded-full px-10 h-12 font-black bg-primary text-white hover:bg-primary/80 transition-all">
              Create Listing
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {/* Website cards would go here */}
          </div>
        )}
      </div>
    </div>
  );
}