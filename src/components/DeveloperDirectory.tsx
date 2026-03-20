"use client";

import { Star, MessageCircle, ExternalLink, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DEVELOPERS: any[] = [];

export function DeveloperDirectory() {
  return (
    <div className="p-4 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 mt-4">
        <h2 className="text-3xl font-headline font-bold mb-2">Build Partners</h2>
        <p className="text-muted-foreground font-medium">Expert developers vetted for premium digital asset construction.</p>
      </div>

      <div className="space-y-6">
        {DEVELOPERS.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">No Developers Found</h3>
              <p className="text-muted-foreground text-sm font-medium">The developer directory is currently empty.</p>
            </div>
          </div>
        ) : (
          DEVELOPERS.map((dev) => (
            <div key={dev.id} className="glass rounded-3xl p-6 flex flex-col sm:flex-row gap-6 hover:border-primary/30 transition-all">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-secondary flex-shrink-0">
                <Image 
                  src={dev.avatar} 
                  alt={dev.name} 
                  fill 
                  className="object-cover" 
                  data-ai-hint="3D avatar person"
                />
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-headline font-bold">{dev.name}</h3>
                      {dev.verified && <ShieldCheck className="w-4 h-4 text-primary" />}
                    </div>
                    <p className="text-primary font-bold text-sm">{dev.role}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                    <Star className="w-4 h-4 fill-primary" />
                    {dev.rating}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 mb-6">
                  {dev.specialties.map((spec: string) => (
                    <Badge key={spec} variant="secondary" className="glass border-none text-[10px] uppercase tracking-wider font-bold">
                      {spec}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  <Button className="flex-1 rounded-full bg-primary text-white font-bold hover:bg-primary/80">
                    Contact
                  </Button>
                  <Button variant="outline" className="rounded-full glass border-none hover:bg-white/10 font-bold">
                    Portfolio
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
