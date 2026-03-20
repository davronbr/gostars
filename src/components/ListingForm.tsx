"use client";

import { useState } from "react";
import { Sparkles, Loader2, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { generateListingDescription } from "@/ai/flows/ai-powered-listing-description";

export function ListingForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
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
    <div className="p-4 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 mt-4">
        <h2 className="text-3xl font-headline font-bold mb-2">List Asset</h2>
        <p className="text-muted-foreground font-bold">Sell your website or digital tool to the Build IO network.</p>
      </div>

      <div className="bg-secondary rounded-3xl p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="font-bold">Asset Name</Label>
            <Input 
              placeholder="e.g. CyberFlow SaaS" 
              className="bg-background border-none h-12 font-bold"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label className="font-bold">Price (USD)</Label>
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
          <Label className="font-bold">Technical Stack</Label>
          <Input 
            placeholder="e.g. Next.js, Tailwind, Postgres" 
            className="bg-background border-none h-12 font-bold"
            value={formData.technicalDetails}
            onChange={(e) => setFormData({...formData, technicalDetails: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <Label className="font-bold">Key Features (comma separated)</Label>
          <Input 
            placeholder="e.g. Auth, Stripe, Admin Panel" 
            className="bg-background border-none h-12 font-bold"
            value={formData.features}
            onChange={(e) => setFormData({...formData, features: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <Label className="font-bold">Asset Description</Label>
            <Button 
              size="sm" 
              variant="outline" 
              className="rounded-full bg-background border-primary/30 text-primary gap-2 h-8 px-4 hover:bg-primary/10 font-bold"
              onClick={handleAiSuggest}
              disabled={loading}
            >
              {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
              AI Refine
            </Button>
          </div>
          <Textarea 
            placeholder="Describe your asset's value proposition..." 
            className="bg-background border-none min-h-[150px] resize-none font-bold"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <Label className="font-bold">Screenshots</Label>
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-square bg-background rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors border-dashed border-2 border-white/10">
              <Upload className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
        </div>

        <Button className="w-full h-14 rounded-full bg-primary text-white font-black text-lg mt-4">
          Publish Listing
        </Button>
      </div>
    </div>
  );
}