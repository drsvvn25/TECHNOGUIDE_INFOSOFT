import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, BarChart3, Lightbulb, ArrowRight, DollarSign, Users, Sparkles 
} from "lucide-react";

export default function FinancialHealthView() {
  const [hoveredDay, setHoveredDay] = useState<string | null>("THU");
  
  const dailyData: Record<string, { rev: string; exp: string }> = {
    MON: { rev: "$8.4k", exp: "$4.1k" },
    TUE: { rev: "$9.2k", exp: "$4.5k" },
    WED: { rev: "$11.0k", exp: "$5.2k" },
    THU: { rev: "$14.5k", exp: "$5.1k" },
    FRI: { rev: "$12.8k", exp: "$4.8k" },
    SAT: { rev: "$9.6k", exp: "$4.2k" },
    SUN: { rev: "$15.4k", exp: "$5.8k" },
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pt-4 pb-12">
      {/* Header */}
      <section className="space-y-1">
        <p className="font-headline text-xs font-bold text-brand-secondary uppercase tracking-widest">Analytics Overview</p>
        <h2 className="font-headline text-2xl font-bold text-white">Financial Health</h2>
      </section>

      {/* Growth Report Bento Card */}
      <div className="glass-card p-5 rounded-2xl flex items-center justify-between border border-brand-outline/10 animate-fade-in">
        <div className="space-y-1">
          <h3 className="font-headline text-[10px] font-bold text-brand-on-surface-variant tracking-wider uppercase">GROWTH REPORT</h3>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-2xl font-extrabold text-white">Up 15%</span>
            <span className="font-sans text-xs text-brand-secondary font-bold">this month</span>
          </div>
        </div>
        <div className="h-12 w-12 rounded-full bg-brand-secondary/15 flex items-center justify-center text-brand-secondary">
          <TrendingUp className="w-6 h-6" />
        </div>
      </div>

      {/* Interactive Spline Chart Card */}
      <div className="glass-card p-5 rounded-2xl border border-brand-outline/10 space-y-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-headline text-sm font-bold text-white">Revenue vs. Expenses</h3>
            <p className="font-sans text-xs text-brand-on-surface-variant font-medium mt-0.5">Last 7 days performance</p>
          </div>
          
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary-container inline-block"></span>
              <span className="text-[10px] text-brand-on-surface-variant font-bold">REV</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary inline-block"></span>
              <span className="text-[10px] text-brand-on-surface-variant font-bold">EXP</span>
            </div>
          </div>
        </div>

        {/* Custom SVG Graph Mockup */}
        <div className="relative h-44 w-full mt-4">
          <svg className="w-full h-full drop-shadow-md" viewBox="0 0 400 200">
            {/* Grid references */}
            <line x1="0" y1="40" x2="400" y2="40" stroke="rgba(145, 143, 161, 0.05)" strokeDasharray="4 4" />
            <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(145, 143, 161, 0.05)" strokeDasharray="4 4" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="rgba(145, 143, 161, 0.05)" strokeDasharray="4 4" />

            {/* Revenue Area details */}
            <path 
              d="M0,160 Q60,140 120,150 T240,80 T360,110 L400,110 L400,200 L0,200 Z" 
              fill="url(#revGrad)" 
              className="opacity-15"
            />

            {/* Revenue Path line */}
            <path 
              d="M0,160 Q60,140 120,150 T240,80 T360,110" 
              fill="none" 
              stroke="#4f46e5" 
              strokeLinecap="round" 
              strokeWidth="4"
              className="drop-shadow-lg"
            />

            {/* Expenses Path line */}
            <path 
              d="M0,180 Q60,170 120,165 T240,140 T360,148" 
              fill="none" 
              stroke="#4edea3" 
              strokeDasharray="6 4" 
              strokeLinecap="round" 
              strokeWidth="2.5"
            />

            {/* Vector Gradient patterns */}
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Hover Tooltip Indicator */}
            {hoveredDay && (
              <g>
                <circle 
                  cx={hoveredDay === "MON" ? 0 : hoveredDay === "TUE" ? 60 : hoveredDay === "WED" ? 120 : hoveredDay === "THU" ? 180 : hoveredDay === "FRI" ? 240 : hoveredDay === "SAT" ? 300 : 360} 
                  cy={hoveredDay === "THU" ? 80 : hoveredDay === "WED" ? 120 : 110} 
                  fill="#4f46e5" 
                  r="6" 
                  stroke="#ffffff" 
                  strokeWidth="2"
                  className="animate-pulse"
                />
              </g>
            )}
          </svg>

          {/* Left Y-Axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[9px] text-brand-on-surface-variant/40 font-mono font-medium">
            <span>$20k</span>
            <span>$10k</span>
            <span>$0</span>
          </div>
        </div>

        {/* Days of Week Highlights */}
        <div className="flex justify-between mt-2 px-1 text-[10px] text-brand-on-surface-variant/70 font-bold font-headline select-none">
          {Object.keys(dailyData).map((day) => (
            <span 
              key={day}
              onMouseEnter={() => setHoveredDay(day)}
              onTouchStart={() => setHoveredDay(day)}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                hoveredDay === day ? "text-brand-primary bg-brand-primary-container/10 font-black" : "hover:text-white"
              }`}
            >
              {day}
            </span>
          ))}
        </div>

        {/* Tooltip dynamic report details */}
        <AnimatePresence mode="wait">
          {hoveredDay && (
            <motion.div 
              key={hoveredDay}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-brand-surface-high/40 border border-brand-outline/10 rounded-xl p-3.5 flex justify-between items-center text-xs"
            >
              <div>
                <span className="font-headline text-[10px] font-bold text-brand-outline uppercase block tracking-wider">Metrics Highlights ({hoveredDay})</span>
                <span className="font-headline text-xs text-white font-bold inline-block mt-0.5">Custom performance data</span>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <span className="text-[10px] text-brand-outline block">Revenue</span>
                  <span className="font-bold text-brand-primary font-mono">{dailyData[hoveredDay].rev}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-brand-outline block">Expenses</span>
                  <span className="font-bold text-brand-secondary font-mono">{dailyData[hoveredDay].exp}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Insights Block Section */}
      <div className="bg-brand-primary-container/10 border border-brand-primary-container/20 p-5 rounded-2xl glow-indigo hover:border-brand-primary-container/40 transition-all relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 group-hover:scale-105 transition-all text-white">
          <Sparkles className="w-14 h-14" />
        </div>
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-xl bg-brand-primary-container text-white flex items-center justify-center shrink-0 shadow-md">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h3 className="font-headline text-[10px] font-bold text-brand-primary tracking-widest uppercase">AI INSIGHT</h3>
            <p className="font-sans text-xs text-brand-on-surface leading-relaxed">
              <span className="font-bold">Tip:</span> Focus on LinkedIn content for higher ROI. Your recent posts there converted at <span className="text-brand-secondary font-bold">3.2x</span> the rate of other channels.
            </p>
            <button 
              onClick={() => alert("Deep research ground analysis: Loading statistical charts...")}
              className="text-brand-primary font-headline text-xs font-bold flex items-center gap-1.5 hover:gap-2 transition-all cursor-pointer block pt-1"
            >
              <span>View Detailed Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 rounded-xl border border-brand-outline/10 text-white flex flex-col gap-1.5">
          <DollarSign className="w-4.5 h-4.5 text-brand-on-surface-variant" />
          <p className="text-[10px] text-brand-on-surface-variant font-bold uppercase tracking-wider">Net Profit</p>
          <p className="font-headline text-lg font-bold text-white font-mono">$12,450</p>
        </div>
        <div className="glass-card p-4 rounded-xl border border-brand-outline/10 text-white flex flex-col gap-1.5">
          <Users className="w-4.5 h-4.5 text-brand-on-surface-variant" />
          <p className="text-[10px] text-brand-on-surface-variant font-bold uppercase tracking-wider">New Leads</p>
          <p className="font-headline text-lg font-bold text-white font-mono">+124</p>
        </div>
      </div>
    </div>
  );
}
