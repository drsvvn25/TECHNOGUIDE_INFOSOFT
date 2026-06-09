import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Copy, Check, Lightbulb, RefreshCw } from "lucide-react";

interface AIStudioViewProps {
  onAddCredits: (amount: number) => void;
}

export default function AIStudioView({ onAddCredits }: AIStudioViewProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedTone, setSelectedTone] = useState<"Professional" | "Creative" | "Witty">("Professional");
  const [selectedPlatform, setSelectedPlatform] = useState<"LinkedIn" | "Twitter" | "Blog">("LinkedIn");
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generationResult, setGenerationResult] = useState<string>(
    `Artificial Intelligence isn't just a luxury for tech giants anymore; it's the ultimate growth lever for modern entrepreneurs. By automating repetitive tasks, BusinessBoost AI allows you to focus on high-impact strategy. 🚀\n\nReady to scale with precision? Let's unlock your potential today. #AI #BusinessGrowth #TechTrends`
  );

  const handleGenerate = async () => {
    const activePrompt = prompt.trim() || "Explain the benefits of AI for small business growth";
    setGenerating(true);
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: activePrompt,
          tone: selectedTone,
          platform: selectedPlatform,
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.text) {
        setGenerationResult(data.text);
        // Cost details: increase used credits
        onAddCredits(120);
      } else {
        alert(data.error || "Failed to generate AI content. Reverting to smart fallback.");
        setGenerationResult(
          `Accelerating startup growth with ${selectedTone} copywriting on ${selectedPlatform}:\n\nStartup velocity is the ultimate measure of success. Automate manual invoicing, create customer outreach pipelines, and leverage machine learning directly to build scalable workflows.\n\nLearn more on BusinessBoost AI today. #${selectedPlatform} #Automation #SaaS`
        );
        onAddCredits(80);
      }
    } catch (err) {
      console.error(err);
      setGenerationResult(
        `Accelerating startup growth with ${selectedTone} copywriting on ${selectedPlatform}:\n\nStartup velocity is the ultimate measure of success. Automate manual invoicing, create customer outreach pipelines, and leverage machine learning directly to build scalable workflows.\n\nLearn more on BusinessBoost AI today. #${selectedPlatform} #Automation #SaaS`
      );
      onAddCredits(80);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generationResult) return;
    navigator.clipboard.writeText(generationResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pt-4 pb-12">
      {/* Header */}
      <section className="space-y-1">
        <h2 className="font-headline text-2xl font-bold text-white">Content AI</h2>
        <p className="font-sans text-xs text-brand-on-surface-variant">Transform your ideas into high-converting posts in seconds.</p>
      </section>

      {/* Input Section Card */}
      <div className="glass-card rounded-2xl p-5 space-y-5 border border-brand-outline/10">
        {/* Prompt Input */}
        <div className="space-y-1.5 animate-fade-in">
          <label className="font-headline text-[10px] font-bold text-brand-primary uppercase tracking-wider block px-1">What's on your mind?</label>
          <textarea
            id="ai-textarea-prompt"
            className="w-full bg-brand-bg/50 border border-brand-outline/15 rounded-xl p-3.5 font-sans text-xs text-shading placeholder:text-brand-on-surface-variant/40 focus:ring-1 focus:ring-brand-primary focus:border-transparent transition-all outline-none resize-none h-28 focus:outline-none"
            placeholder="e.g., Explain the benefits of AI for small business growth..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        {/* Tone Picker */}
        <div className="space-y-2">
          <label className="font-headline text-[10px] font-bold text-brand-primary uppercase tracking-wider block px-1">Tone</label>
          <div className="flex flex-wrap gap-2">
            {(["Professional", "Creative", "Witty"] as const).map((tone) => (
              <button
                id={`ai-tone-${tone}`}
                key={tone}
                type="button"
                className={`px-4 py-2 rounded-full border text-xs font-semibold cursor-pointer transition-all active:scale-95 ${
                  selectedTone === tone
                    ? "bg-brand-primary-container text-white border-brand-primary-container shadow-md"
                    : "border-brand-outline/15 text-brand-on-surface-variant hover:bg-brand-surface-high/30"
                }`}
                onClick={() => setSelectedTone(tone)}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Picker */}
        <div className="space-y-2">
          <label className="font-headline text-[10px] font-bold text-brand-primary uppercase tracking-wider block px-1">Platform</label>
          <div className="flex flex-wrap gap-2">
            {(["LinkedIn", "Twitter", "Blog"] as const).map((platform) => (
              <button
                id={`ai-plat-${platform}`}
                key={platform}
                type="button"
                className={`px-4 py-2 rounded-full border text-xs font-semibold cursor-pointer transition-all active:scale-95 ${
                  selectedPlatform === platform
                    ? "bg-brand-primary-container text-white border-brand-primary-container shadow-md"
                    : "border-brand-outline/15 text-brand-on-surface-variant hover:bg-brand-surface-high/30"
                }`}
                onClick={() => setSelectedPlatform(platform)}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Trigger */}
        <button
          id="ai-btn-generate"
          type="button"
          disabled={generating}
          className="w-full py-4 bg-brand-primary-container text-white font-headline text-sm font-bold rounded-xl glow-indigo hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-85"
          onClick={handleGenerate}
        >
          {generating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-brand-secondary" />
              <span>Generate</span>
            </>
          )}
        </button>
      </div>

      {/* Result Section */}
      <AnimatePresence mode="wait">
        {generationResult && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center px-1">
              <h3 className="font-headline text-[10px] font-bold uppercase tracking-wider text-brand-secondary">Generated Content</h3>
              <button
                id="ai-btn-copy"
                type="button"
                onClick={handleCopy}
                className="text-brand-on-surface-variant hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-brand-secondary" />
                    <span className="font-headline text-xs text-brand-secondary">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-brand-primary" />
                    <span className="font-headline text-xs text-brand-primary">Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="glass-card rounded-2xl p-5 border-l-4 border-l-brand-secondary relative overflow-hidden">
              <p className="font-sans text-xs text-white leading-relaxed whitespace-pre-wrap select-all">
                {generationResult}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual Pro Tip Flare */}
      <div className="relative w-full h-40 rounded-xl overflow-hidden mt-2">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg to-transparent z-10" />
        <img
          className="w-full h-full object-cover opacity-60"
          alt="Neural Network glow"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlN4OmFRPHB_6rJzzFsHNB4aZT2-N0SJEpcAaanEXUY3sBN0qvNd4TgrfEsi3lpk0KHhmLOtfYPMGvVH5fDPu51i504qxMLiXDU3RANvELmZIFml-0lUSA50uzDpHUXpIYyjOnGc4u4HGsbvb6AqovwMszHLwSYn58i_Q5apqJzl40UcP74M6bz4ljuW4He3eJ47tCuaAP6OcpFLCp7l3ritNJsxD27SkgcyILFEruWRvYp5rAvW5VJOM5rAV80JI8nOx6yOf-Siw"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-4 left-4 z-20 space-y-0.5">
          <p className="font-headline text-[10px] font-bold text-brand-tertiary tracking-wider uppercase flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-brand-tertiary" />
            <span>PRO TIP</span>
          </p>
          <p className="font-sans text-[11px] text-white font-medium">Try 'Witty' tone for better engagement on Twitter.</p>
        </div>
      </div>
    </div>
  );
}
