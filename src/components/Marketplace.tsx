"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, SlidersHorizontal, ExternalLink, Code2, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const WEBSITES: any[] = [];

export function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md pt-6 pb-4 px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search websites..." 
              className="pl-10 glass border-none rounded-full h-12 focus-visible:ring-primary font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button size="icon" variant="secondary" className="rounded-full h-12 w-12 glass border-none">
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {["All", "SaaS", "E-com", "Tool", "Social", "Portfolio"].map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="px-4 py-1.5 rounded-full glass border-none cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors whitespace-nowrap font-bold"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <div className="px-4 mt-4">
        {WEBSITES.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <PlusCircle className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">No Listings Yet</h3>
              <p className="text-muted-foreground text-sm font-bold">Be the first to list a digital asset on the marketplace.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WEBSITES.map((site) => (
              <div 
                key={site.id} 
                className="glass rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="relative h-56 w-full bg-secondary/50">
                  <Image 
                    src={site.image} 
                    alt={site.name} 
                    fill 
                    className="object-cover"
                    data-ai-hint="3D technology interface"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white border-none px-3 py-1 rounded-full font-headline font-bold">
                      {site.price}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-headline font-bold text-foreground group-hover:text-primary transition-colors">
                        {site.name}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1 font-bold">
                        <Code2 className="w-3 h-3" />
                        {site.tech.join(" • ")}
                      </p>
                    </div>
                    <Badge variant="outline" className="rounded-full border-primary/30 text-primary bg-primary/5 font-bold">
                      {site.type}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="flex-1 rounded-full h-11 bg-primary text-white font-bold hover:bg-primary/80 transition-all">
                      Details
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full h-11 w-11 glass border-none">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}