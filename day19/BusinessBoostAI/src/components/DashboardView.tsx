import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { 
  TrendingUp, Users, Receipt, Sparkles, BookOpen, CheckCircle, Bell, ChevronRight 
} from "lucide-react";

interface DashboardViewProps {
  userName: string;
  onNavigate: (view: any) => void;
  creditsUsed: number;
}

export default function DashboardView({ userName, onNavigate, creditsUsed }: DashboardViewProps) {
  const [progressWidth, setProgressWidth] = useState("0%");

  useEffect(() => {
    // Elegant timing macro-animation
    const timer = setTimeout(() => {
      const percentage = Math.min(100, (creditsUsed / 10000) * 100);
      setProgressWidth(`${percentage}%`);
    }, 400);
    return () => clearTimeout(timer);
  }, [creditsUsed]);

  return (
    <div className="max-w-md mx-auto space-y-6 pt-4 pb-12">
      {/* Welcome & Badge */}
      <section className="flex flex-col gap-1">
        <p className="font-headline text-xs font-bold text-brand-secondary uppercase tracking-widest">Active • Pro Plan</p>
        <h2 className="font-headline text-2xl font-bold text-white">Hello, {userName}</h2>
      </section>

      {/* KPI Bento Grid */}
      <section className="grid grid-cols-2 gap-4">
        {/* Main Revenue Card */}
        <div 
          onClick={() => onNavigate("Bills")}
          className="col-span-2 glass-card rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden cursor-pointer hover:border-brand-primary/20 transition-all group"
        >
          <div className="absolute top-0 right-0 p-5 opacity-10 text-brand-primary group-hover:scale-105 transition-transform duration-300">
            <TrendingUp className="w-16 h-16" />
          </div>
          <div className="relative z-10">
            <p className="font-headline text-xs font-semibold text-brand-on-surface-variant">Total Revenue</p>
            <h3 className="font-headline text-4xl font-extrabold text-brand-primary mt-1">$25.4k</h3>
          </div>
          <div className="mt-4 flex items-center gap-1 relative z-10">
            <TrendingUp className="w-4 h-4 text-brand-secondary animate-pulse" />
            <span className="font-sans text-xs font-semibold text-brand-secondary">+12.5% vs last month</span>
          </div>
        </div>

        {/* Customers Card */}
        <div 
          onClick={() => onNavigate("CRM")}
          className="glass-card rounded-2xl p-5 flex flex-col gap-3 hover:border-brand-primary/20 transition-all cursor-pointer group"
        >
          <div className="bg-brand-primary-container/10 border border-brand-primary-container/20 w-10 h-10 rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary-container/20 transition-all">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="font-headline text-xs font-semibold text-brand-on-surface-variant">Customers</p>
            <h4 className="font-headline text-2xl font-bold text-white mt-0.5">142</h4>
          </div>
        </div>

        {/* Pending Invoices Card */}
        <div 
          onClick={() => onNavigate("Bills")}
          className="glass-card rounded-2xl p-5 flex flex-col gap-3 hover:border-brand-primary/20 transition-all cursor-pointer group"
        >
          <div className="bg-brand-error/10 border border-brand-error/20 w-10 h-10 rounded-xl flex items-center justify-center text-brand-error group-hover:bg-brand-error/20 transition-all">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <p className="font-headline text-xs font-semibold text-brand-on-surface-variant">Pending</p>
            <h4 className="font-headline text-2xl font-bold text-white mt-0.5">8</h4>
          </div>
        </div>
      </section>

      {/* AI Usage Progress */}
      <section className="glass-card rounded-2xl p-5 flex flex-col gap-4 border border-brand-outline/10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-tertiary" />
            <h5 className="font-headline text-xs font-bold text-white">AI Processing Units</h5>
          </div>
          <span className="font-mono text-xs text-brand-on-surface-variant">{creditsUsed.toLocaleString()} / 10k</span>
        </div>
        
        <div className="w-full bg-brand-surface-high h-3 rounded-full overflow-hidden">
          <div 
            id="dashboard-ai-progress"
            style={{ width: progressWidth }}
            className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-1000 ease-out"
          />
        </div>
        <p className="font-sans text-xs text-brand-on-surface-variant leading-relaxed">
          You've used {Math.round((creditsUsed / 10000) * 100)}% of your monthly generation credits. Refresh in 4 days.
        </p>
      </section>

      {/* Recent Activity */}
      <section className="flex flex-col gap-3.5">
        <div className="flex justify-between items-center">
          <h5 className="font-headline text-md font-bold text-white">Recent Activity</h5>
          <button 
            type="button" 
            onClick={() => alert("Activity list expands inside CRM & Invoicing dashboards. Search filters are dynamic on other tabs!")}
            className="text-brand-primary font-headline text-xs font-semibold hover:underline block cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {/* Custom Action 1: Blog future of AI */}
          <div 
            onClick={() => onNavigate("AI")}
            className="glass-card p-4 rounded-xl flex items-center gap-3 hover:bg-brand-surface-high/30 active:scale-99 transition-all cursor-pointer border border-brand-outline/5"
          >
            <div className="bg-brand-surface-highest w-12 h-12 rounded-xl flex items-center justify-center text-brand-tertiary">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-headline text-xs font-semibold text-white">Blog: Future of AI in SaaS</p>
              <p className="font-sans text-[11px] text-brand-on-surface-variant">AI Content • Generated 2h ago</p>
            </div>
            <ChevronRight className="w-4 h-4 text-brand-on-surface-variant" />
          </div>

          {/* Custom Action 2: Invoice paid */}
          <div 
            onClick={() => onNavigate("Bills")}
            className="glass-card p-4 rounded-xl flex items-center gap-3 hover:bg-brand-surface-high/30 active:scale-99 transition-all cursor-pointer border border-brand-outline/5"
          >
            <div className="bg-brand-surface-highest w-12 h-12 rounded-xl flex items-center justify-center text-brand-secondary">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-headline text-xs font-semibold text-white">Invoice #8842 Paid</p>
              <p className="font-sans text-[11px] text-brand-on-surface-variant">+$1,240.00 • 5h ago</p>
            </div>
            <ChevronRight className="w-4 h-4 text-brand-on-surface-variant" />
          </div>

          {/* Custom Action 3: High churn risk */}
          <div 
            onClick={() => onNavigate("CRM")}
            className="glass-card p-4 rounded-xl flex items-center gap-3 hover:bg-brand-surface-high/30 active:scale-99 transition-all cursor-pointer border border-brand-outline/5"
          >
            <div className="bg-brand-surface-highest w-12 h-12 rounded-xl flex items-center justify-center text-brand-error">
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-headline text-xs font-semibold text-white">High Churn Risk: Alex G.</p>
              <p className="font-sans text-[11px] text-brand-on-surface-variant">CRM Alert • 1d ago</p>
            </div>
            <ChevronRight className="w-4 h-4 text-brand-on-surface-variant" />
          </div>
        </div>
      </section>
    </div>
  );
}
