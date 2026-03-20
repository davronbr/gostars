
"use client";

import { useEffect, useState } from "react";
import { Star, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
import type { Language } from "@/app/page";
import { translations } from "@/app/page";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const DEVELOPERS: any[] = [];

export function DeveloperDirectory({ lang }: { lang: Language }) {
  const [animationData, setAnimationData] = useState<any>(null);
  const t = translations[lang];

  useEffect(() => {
    fetch("https://lottie.host/8a420129-88f0-4890-905f-f323d6248971/sbbuM0ZAkG.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Lottie load error:", err));
  }, []);

  return (
    <div className="p-4 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 mt-4 text-center sm:text-left">
        <h2 className="text-3xl font-bold mb-2 uppercase tracking-tighter">Build Partners</h2>
        <p className="text-muted-foreground font-bold text-sm uppercase tracking-tight">
          {t.vetted}
        </p>
      </div>

      <div className="space-y-6">
        {DEVELOPERS.length === 0 ? (
          <div className="bg-secondary rounded-[2.5rem] p-12 text-center flex flex-col items-center gap-6 border border-white/5 shadow-2xl">
            <div className="w-48 h-48 flex items-center justify-center">
              {animationData ? (
                <Lottie 
                  animationData={animationData}
                  loop={true} 
                  autoplay={true}
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-white/5 rounded-full animate-pulse" />
              )}
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black uppercase tracking-tight">Community Growing</h3>
              <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest max-w-[240px] mx-auto leading-relaxed">
                The directory is currently being populated with vetted talent.
              </p>
            </div>
          </div>
        ) : (
          DEVELOPERS.map((dev) => (
            <div key={dev.id} className="bg-secondary rounded-3xl p-6 flex flex-col sm:flex-row gap-6 hover:border-primary/30 transition-all border border-white/5">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-background flex-shrink-0 border border-white/5">
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
                      <h3 className="text-xl font-bold uppercase tracking-tight">{dev.name}</h3>
                      {dev.verified && <ShieldCheck className="w-4 h-4 text-primary" />}
                    </div>
                    <p className="text-primary font-bold text-xs uppercase tracking-widest">{dev.role}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black">
                    <Star className="w-3.5 h-3.5 fill-primary" />
                    {dev.rating}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 mb-6">
                  {dev.specialties.map((spec: string) => (
                    <Badge key={spec} variant="secondary" className="bg-background border-none text-[9px] uppercase tracking-widest font-black px-3 py-1">
                      {spec}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  <Button className="flex-1 rounded-2xl bg-primary text-white font-black uppercase tracking-tight hover:bg-primary/80 h-11 text-xs">
                    {t.contact}
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-2xl bg-secondary border-none hover:bg-white/10 font-black uppercase tracking-tight h-11 text-xs">
                    {t.portfolio}
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
