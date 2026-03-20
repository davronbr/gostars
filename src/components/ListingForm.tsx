
"use client";

import { useState } from "react";
import { Sparkles, Loader2, Upload, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { generateListingDescription } from "@/ai/flows/ai-powered-listing-description";
import type { Language } from "@/app/page";
import { translations } from "@/app/page";

interface ListingFormProps {
  onBack?: () => void;
  lang: Language;
}

export function ListingForm({ onBack, lang }: ListingFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const t = translations[lang];

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    technicalDetails: "",
    features: "",
    targetAudience: "",
    description: "",
  });

  const handleAiSuggest = async () => {
    if (!formData.technicalDetails || !formData.features) {
      toast({
        title: "Missing Info",
        description: "Please provide technical details and features first.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await generateListingDescription({
        technicalDetails: formData.technicalDetails,
        features: formData.features.split(",").map(f => f.trim()),
        targetAudience: formData.targetAudience,
        currentDescription: formData.description,
      });
      setFormData({ ...formData, description: result.description });
      toast({
        title: "AI Optimized!",
        description: "Your description has been refined for conversion.",
      });
    } catch (error) {
      toast({
        title: "AI Error",
        description: "Failed to generate description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen animate-in fade-in duration-500 overflow-hidden bg-background">
      <div className="px-4 py-4 flex items-center border-b border-white/5 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            className="rounded-full text-white"
            onClick={onBack}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div className="flex flex-col">
            <h2 className="text-sm font-bold text-white uppercase tracking-tight">{t.listAsset}</h2>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{t.listingEntry}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        <div className="mb-6 mt-2">
          <p className="text-muted-foreground font-bold text-sm">{t.listingDesc}</p>
        </div>

        <div className="bg-secondary rounded-3xl p-6 space-y-6 mb-12">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-tight">{t.assetName}</Label>
              <Input 
                placeholder="CyberFlow SaaS" 
                className="bg-background border-none h-12 font-bold"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-tight">{t.price}</Label>
              <Input 
                type="number" 
                placeholder="0.00" 
                className="bg-background border-none h-12 font-bold"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-xs uppercase tracking-tight">{t.techStack}</Label>
            <Input 
              placeholder="Next.js, Tailwind, Postgres" 
              className="bg-background border-none h-12 font-bold"
              value={formData.technicalDetails}
              onChange={(e) => setFormData({...formData, technicalDetails: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-xs uppercase tracking-tight">{t.features}</Label>
            <Input 
              placeholder="Auth, Stripe, Admin Panel" 
              className="bg-background border-none h-12 font-bold"
              value={formData.features}
              onChange={(e) => setFormData({...formData, features: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
              <Label className="font-bold text-xs uppercase tracking-tight">{t.assetDesc}</Label>
              <Button 
                size="sm" 
                variant="outline" 
                className="rounded-full border-primary/30 text-primary gap-2 h-8 px-4"
                onClick={handleAiSuggest}
                disabled={loading}
              >
                {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                {t.aiRefine}
              </Button>
            </div>
            <Textarea 
              placeholder="..." 
              className="bg-background border-none min-h-[150px] resize-none font-bold"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-xs uppercase tracking-tight">{t.images}</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-square bg-background rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors border-dashed border-2 border-white/10 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.05)]">
                <Upload className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
          </div>

          <Button size="lg" className="w-full">
            {t.publish}
          </Button>
        </div>
      </div>
    </div>
  );
}
