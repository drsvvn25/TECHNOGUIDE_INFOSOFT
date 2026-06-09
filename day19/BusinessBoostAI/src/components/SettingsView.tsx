import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Edit2, Bolt, Bell, Mail, Sun, Moon, Laptop, LogOut, Cpu, Settings
} from "lucide-react";

interface SettingsViewProps {
  userName: string;
  userEmail: string;
  onLogout: () => void;
}

export default function SettingsView({ userName, userEmail, onLogout }: SettingsViewProps) {
  const [toggleGemini, setToggleGemini] = useState(true);
  const [toggleOpenAI, setToggleOpenAI] = useState(false);
  const [togglePush, setTogglePush] = useState(true);
  const [toggleWeekly, setToggleToggleWeekly] = useState(false);
  const [activeTheme, setActiveTheme] = useState<"light" | "dark" | "system">("dark");

  const handleToggleTheme = (theme: "light" | "dark" | "system") => {
    setActiveTheme(theme);
    const htmlElement = document.documentElement;

    if (theme === "dark") {
      htmlElement.classList.add("dark");
      alert("Dark Theme activated. Premium deep navy colors dominate the visual canvas.");
    } else if (theme === "light") {
      htmlElement.classList.remove("dark");
      alert("Light Theme configured. High-contrast grey-scale details and crisp whitespace applied.");
    } else {
      // System pref check
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
      }
      alert("System Default adaptive themes updated: Syncing color palettes automatically.");
    }
  };

  const handleManageKeys = () => {
    alert("API Keys Config: To configure custom workspace variables, declare process.env.GEMINI_API_KEY inside your local Secrets panel in AI Studio.");
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pt-4 pb-12">
      {/* Header */}
      <section className="flex flex-col gap-1">
        <h1 className="font-headline text-2xl font-bold text-brand-primary">Settings</h1>
        <p className="font-sans text-xs text-brand-on-surface-variant">Manage your account and AI configurations</p>
      </section>

      {/* Profile Section banner */}
      <div className="glass-card rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group border border-brand-outline/10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
        <div className="relative">
          <img
            alt={userName}
            className="w-16 h-16 rounded-full bg-brand-surface-high object-cover border-2 border-indigo-400/20"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-BN91bERL8f8NQeO2-bb6ctlR41wX6h8W-eSKjrVXLuAJWhIINuKt9ZbaiZZM7tgBVM7CFlVJ8xNjCBOsNkdFIcLdCohOl_kwzQPVOXqFiNQ40kYtHvd7SPsGvdmvjfXm8G5zXXZz4yCtw_6FWRKCH6bWQeG8CfbQwpiPk_ME24jtd-_z8c2Wg7ATJukjHGw5LK1-zdYRBXXiWRdqjk6b9lPMVKxQ1t0PdIzQOdVzb0vNQ2fgCDDmm8w1TfroR2nCmfLOWXev21g"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-0 right-0 w-4.5 h-4.5 bg-brand-secondary border-4 border-brand-surface rounded-full"></div>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-headline text-base font-bold text-white truncate">{userName}</span>
          <span className="font-headline text-xs font-semibold text-brand-secondary mt-0.5">Pro Plan Member</span>
        </div>
        <button 
          onClick={() => alert(`Edit profile requested for ${userName} (${userEmail})`)}
          className="ml-auto p-2 text-brand-on-surface-variant hover:text-white transition-colors cursor-pointer"
        >
          <Edit2 className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* AI Toggles & Key Settings */}
      <section className="flex flex-col gap-3">
        <h2 className="font-headline text-[10px] font-bold text-brand-outline uppercase tracking-widest px-1">AI Provider &amp; API Keys</h2>
        <div className="glass-card rounded-2xl overflow-hidden border border-brand-outline/10">
          
          {/* Gemini toggle */}
          <div className="p-4 flex items-center justify-between border-b border-brand-outline/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center text-brand-primary">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <p className="font-headline text-xs font-semibold text-white">Gemini Pro</p>
                <p className="font-sans text-[11px] text-brand-on-surface-variant">Default AI provider</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                id="setting-toggle-gemini"
                type="checkbox" 
                checked={toggleGemini} 
                onChange={() => setToggleGemini(!toggleGemini)} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-brand-surface-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* OpenAI toggle */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center text-brand-secondary">
                <Bolt className="w-5 h-5" />
              </div>
              <div>
                <p className="font-headline text-xs font-semibold text-white">OpenAI GPT-4</p>
                <p className="font-sans text-[11px] text-brand-on-surface-variant">Secondary model</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                id="setting-toggle-openai"
                type="checkbox" 
                checked={toggleOpenAI} 
                onChange={() => setToggleOpenAI(!toggleOpenAI)} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-brand-surface-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* API Key management */}
          <div className="px-4 pb-4">
            <div className="bg-brand-bg/50 border border-brand-outline/10 rounded-xl p-3 flex items-center justify-between font-mono text-[11px]">
              <span className="text-brand-on-surface-variant">sk-•••••••••••••a12b</span>
              <button 
                id="setting-api-manage"
                type="button"
                onClick={handleManageKeys}
                className="text-brand-primary font-headline font-bold text-xs hover:underline cursor-pointer"
              >
                Manage
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Notifications Block */}
      <section className="flex flex-col gap-3">
        <h2 className="font-headline text-[10px] font-bold text-brand-outline uppercase tracking-widest px-1">Notifications</h2>
        <div className="glass-card rounded-2xl border border-brand-outline/10">
          
          <div className="p-4 flex items-center justify-between border-b border-brand-outline/10">
            <div className="flex items-center gap-3 text-white">
              <Bell className="w-4.5 h-4.5 text-brand-on-surface-variant" />
              <span className="font-headline text-xs font-semibold">Push Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                id="setting-toggle-push"
                type="checkbox" 
                checked={togglePush} 
                onChange={() => setTogglePush(!togglePush)} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-brand-surface-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <Mail className="w-4.5 h-4.5 text-brand-on-surface-variant" />
              <span className="font-headline text-xs font-semibold">Weekly Analytics Report</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                id="setting-toggle-weekly"
                type="checkbox" 
                checked={toggleWeekly} 
                onChange={() => setToggleToggleWeekly(!toggleWeekly)} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-brand-surface-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </section>

      {/* Appearance theme picker */}
      <section className="flex flex-col gap-3">
        <h2 className="font-headline text-[10px] font-bold text-brand-outline uppercase tracking-widest px-1">Appearance</h2>
        <div className="grid grid-cols-3 gap-3">
          
          {/* Light Theme */}
          <button
            id="setting-theme-light"
            type="button"
            className={`glass-card rounded-2xl p-4 flex flex-col items-center gap-2 border-2 transition-all active:scale-95 cursor-pointer ${
              activeTheme === "light" ? "border-brand-primary-container bg-brand-primary-container/10" : "border-transparent"
            }`}
            onClick={() => handleToggleTheme("light")}
          >
            <Sun className={`w-5 h-5 ${activeTheme === "light" ? "text-brand-primary" : "text-brand-on-surface-variant"}`} />
            <span className={`font-headline text-[10px] font-bold uppercase tracking-wider ${activeTheme === "light" ? "text-brand-primary" : "text-brand-on-surface-variant"}`}>Light</span>
          </button>

          {/* Dark Theme */}
          <button
            id="setting-theme-dark"
            type="button"
            className={`glass-card rounded-2xl p-4 flex flex-col items-center gap-2 border-2 transition-all active:scale-95 cursor-pointer ${
              activeTheme === "dark" ? "border-brand-primary-container bg-brand-primary-container/10" : "border-transparent"
            }`}
            onClick={() => handleToggleTheme("dark")}
          >
            <Moon className={`w-5 h-5 ${activeTheme === "dark" ? "text-brand-primary" : "text-brand-on-surface-variant"}`} />
            <span className={`font-headline text-[10px] font-bold uppercase tracking-wider ${activeTheme === "dark" ? "text-brand-primary" : "text-brand-on-surface-variant"}`}>Dark</span>
          </button>

          {/* System theme check */}
          <button
            id="setting-theme-system"
            type="button"
            className={`glass-card rounded-2xl p-4 flex flex-col items-center gap-2 border-2 transition-all active:scale-95 cursor-pointer ${
              activeTheme === "system" ? "border-brand-primary-container bg-brand-primary-container/10" : "border-transparent"
            }`}
            onClick={() => handleToggleTheme("system")}
          >
            <Laptop className={`w-5 h-5 ${activeTheme === "system" ? "text-brand-primary" : "text-brand-on-surface-variant"}`} />
            <span className={`font-headline text-[10px] font-bold uppercase tracking-wider ${activeTheme === "system" ? "text-brand-primary" : "text-brand-on-surface-variant"}`}>System</span>
          </button>
        </div>
      </section>

      {/* Logout account section */}
      <section className="pt-4">
        <button
          id="setting-btn-logout"
          type="button"
          onClick={onLogout}
          className="w-full h-14 rounded-xl bg-brand-error/15 text-brand-error border border-brand-error/35 font-headline text-sm font-bold flex items-center justify-center gap-2 hover:bg-brand-error/25 active:scale-98 transition-all cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout Account</span>
        </button>
        <p className="text-center font-mono text-[9px] text-brand-outline mt-5 tracking-wide">BusinessBoost AI v2.4.0 (Enterprise)</p>
      </section>
    </div>
  );
}
