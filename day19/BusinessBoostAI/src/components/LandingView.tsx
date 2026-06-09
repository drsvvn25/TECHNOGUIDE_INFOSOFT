import React from "react";
import { motion } from "motion/react";
import { Rocket, Sparkles, TrendingUp, Receipt, BarChart3, ChevronRight, Play } from "lucide-react";

interface LandingViewProps {
  onNavigate: (view: any) => void;
  onSetAuthTab: (tab: "login" | "signup") => void;
}

export default function LandingView({ onNavigate, onSetAuthTab }: LandingViewProps) {
  const handleGetStarted = () => {
    onSetAuthTab("signup");
    onNavigate("Auth");
  };

  const handleWatchDemo = () => {
    alert("Watch Demo Feature: In a production environment, this opens a video tour of BusinessBoost AI. Stream inside the interactive workspace now!");
  };

  return (
    <div className="hero-gradient min-h-screen pt-10 pb-20 px-4 md:px-8">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center flex flex-col items-center pt-8 pb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 mb-6 animate-pulse"
        >
          <Sparkles className="w-4 h-4 text-brand-secondary" />
          <span className="font-headline text-xs font-semibold uppercase tracking-wider">v2.0 Now Live</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-headline text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4"
        >
          AI-Powered Growth <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
            for Startups
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-sm md:text-lg text-brand-on-surface-variant max-w-xl mb-8 leading-relaxed"
        >
          Automate your entire operation from content generation to financial reporting. Scale faster with fluid intelligence.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center mb-16"
        >
          <button 
            id="landing-hero-get-started"
            onClick={handleGetStarted}
            className="flex-1 bg-brand-primary-container text-white font-headline text-sm font-semibold py-4 px-6 rounded-xl hover:opacity-90 active:scale-98 transition-all shadow-lg shadow-indigo-505/20 cursor-pointer"
          >
            Get Started Free
          </button>
          <button 
            id="landing-hero-watch-demo"
            onClick={handleWatchDemo}
            className="flex-1 border border-brand-outline/20 text-brand-on-surface font-headline text-sm font-semibold py-4 px-6 rounded-xl hover:bg-white/5 active:scale-98 transition-all backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 text-brand-primary" fill="currentColor" />
            Watch Demo
          </button>
        </motion.div>

        {/* Dashboard Visual Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden glass-card p-2 md:p-3"
        >
          <div className="w-full h-full rounded-xl overflow-hidden relative">
            <img 
              alt="Dashboard Preview" 
              className="w-full h-full object-cover opacity-85 hover:scale-101 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDixHYzYvcsGsIHq3gx1qgSIO_UBgfT8GwWwaX3yUpAbMIVI4OJcnmSOoKuDbZ-gzfyWw0lBoLg6_zDInbgUYs8f6ZH8ngRCp6MYX1QAWcaaDgUx4Il78uX6B5GfAekBZtNQyMzfPmzID8IBJSQL2If1pQ95VYh0z5R8J8I2S0A6B9KR8xaYhgfsLOrYaE9FOMvWUMrgAe4vMnAloh4qSkUFLeHnDmktGihHPOH6O7hjwk6Bw14rGu9bZ-K8JTy0TsRTyB2oE3DKCU"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent"></div>
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-xl mx-auto py-8">
        <div className="flex flex-col mb-6">
          <h2 className="font-headline text-xl md:text-2xl font-bold text-white mb-1">Core Intelligence</h2>
          <p className="font-sans text-xs md:text-sm text-brand-on-surface-variant">The pillars of your automated workspace.</p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Content AI Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="glass-card p-6 rounded-2xl relative overflow-hidden group border border-brand-outline/10"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand-primary-container/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-headline text-[10px] font-bold uppercase tracking-widest text-brand-primary">Content AI</span>
            </div>
            
            <h3 className="font-headline text-lg font-bold text-white mb-1">Generative Engine</h3>
            <p className="font-sans text-xs text-brand-on-surface-variant mb-4">
              Produce month-long marketing campaigns in seconds using your brand's unique voice and style.
            </p>
            
            <div className="h-32 rounded-xl bg-brand-surface overflow-hidden relative">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHUs-xwNGDYJpgbb8N_fkR0EbZct8RK3JClYANfyLqY3aMs4G075ba_aDo-GAJkdHtciIz4ef3PaM1E8a3PifecDT2e-ECuzwH97l61Z0yNzgj48WojhCIM9o8a9tJjk1N8luYAzmVH5opSaETXHWZQ4FU54D8bj9KYYhhDyIK2v1568F-jK2PHhoAnumWv_oK_yHpl_QfZTS4uiiAmfbGjHLP113dXEpRv9Ixw-HE_kZ9tyhxvyOwf_eWQkzU6a1v78kGl1L0fjk" 
                alt="AI text flows"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Invoices Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="glass-card p-6 rounded-2xl border border-brand-outline/10"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center text-brand-secondary">
                <Receipt className="w-5 h-5" />
              </div>
              <span className="font-headline text-[10px] font-bold uppercase tracking-widest text-brand-secondary">Invoices</span>
            </div>
            
            <h3 className="font-headline text-lg font-bold text-white mb-1">Smart Billing</h3>
            <p className="font-sans text-xs text-brand-on-surface-variant">
              AI-driven reconciliation and automated follow-ups that reduce payment cycles by 40%.
            </p>
          </motion.div>

          {/* Analytics Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="glass-card p-6 rounded-2xl bg-gradient-to-br from-brand-surface to-brand-bg border border-brand-outline/10"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand-tertiary/10 border border-brand-tertiary/20 flex items-center justify-center text-brand-tertiary">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="font-headline text-[10px] font-bold uppercase tracking-widest text-brand-tertiary">Analytics</span>
            </div>
            
            <h3 className="font-headline text-lg font-bold text-white mb-1">Predictive Ops</h3>
            <p className="font-sans text-xs text-brand-on-surface-variant mb-4">
              Forecast revenue and identify bottlenecks before they impact your bottom line.
            </p>
            
            {/* Custom Interactive Data Bar Chart */}
            <div className="flex gap-1.5 items-end h-16 px-1 mt-4">
              <div className="flex-1 bg-brand-secondary/30 rounded-t h-[25%] transition-all duration-300"></div>
              <div className="flex-1 bg-brand-secondary/45 rounded-t h-[50%] transition-all duration-300"></div>
              <div className="flex-1 bg-brand-secondary/60 rounded-t h-[75%] transition-all duration-300"></div>
              <div className="flex-1 bg-brand-secondary rounded-t h-full shadow-[0_0_15px_rgba(78,222,163,0.5)] transition-all duration-300"></div>
              <div className="flex-1 bg-brand-secondary/70 rounded-t h-[65%] transition-all duration-300"></div>
              <div className="flex-1 bg-brand-secondary/50 rounded-t h-[35%] transition-all duration-300"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-xl mx-auto py-12">
        <div className="p-8 rounded-3xl bg-brand-primary-container text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 text-center">
            <h2 className="font-headline text-2xl font-bold mb-3">Ready to scale?</h2>
            <p className="font-sans text-sm text-indigo-100 opacity-90 mb-6 font-medium">Join 2,500+ startups currently boosting their efficiency with AI.</p>
            <button 
              id="landing-cta-create-account"
              onClick={handleGetStarted}
              className="w-full bg-white text-brand-primary-container font-headline text-sm font-bold py-4 rounded-xl hover:bg-slate-50 hover:shadow-lg active:scale-98 transition-all cursor-pointer"
            >
              Create Your Account
            </button>
          </div>
          {/* Floating Neon Background blobs */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </section>
    </div>
  );
}
