import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Rocket, Home, Sparkles, Receipt, Users, Settings, LogIn, LogOut, LayoutDashboard, FileText, Bell, BarChart3, HelpCircle 
} from "lucide-react";

import { ViewType } from "./types";
import LandingView from "./components/LandingView";
import AuthView from "./components/AuthView";
import DashboardView from "./components/DashboardView";
import AIStudioView from "./components/AIStudioView";
import InvoicingView from "./components/InvoicingView";
import CRMView from "./components/CRMView";
import SettingsView from "./components/SettingsView";
import FinancialHealthView from "./components/FinancialHealthView";

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>("Landing");
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  
  // Dynamic metrics state synced across modules
  const [creditsUsed, setCreditsUsed] = useState(8200);

  // Sub-tabs on Home tab (Overview vs Analytics)
  const [homeSubTab, setHomeSubTab] = useState<"overview" | "analytics">("overview");

  const handleLoginSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    setActiveView("Home");
  };

  const handleLogout = () => {
    setUser(null);
    setActiveView("Landing");
    alert("Session cleared: Logged out successfully.");
  };

  const handleAddCredits = (amount: number) => {
    setCreditsUsed(prev => Math.min(10000, prev + amount));
  };

  const handleNavigate = (view: ViewType) => {
    setActiveView(view);
  };

  // Quick guest login demo shortcut
  const handleQuickDemoLogin = () => {
    setUser({
      name: "Alex Rivera",
      email: "drsvvn25@gmail.com",
    });
    setActiveView("Home");
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-on-surface flex flex-col selection:bg-brand-primary/30">
      
      {/* Top Application Bar */}
      <header className="fixed top-0 w-full z-40 bg-[#0b1326]/80 backdrop-blur-xl border-b border-brand-outline/10 h-16">
        <div className="flex justify-between items-center px-4 md:px-8 h-full w-full max-w-5xl mx-auto">
          
          {/* Brand header details tailored relative to active view */}
          <div 
            onClick={() => handleNavigate(user ? "Home" : "Landing")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Rocket className="w-6 h-6 text-brand-primary group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-headline text-md md:text-lg font-extrabold text-brand-primary tracking-tight">
              {activeView === "CRM" ? "CRM" : "BusinessBoost AI"}
            </span>
          </div>

          {/* Dynamic header options */}
          <div className="flex items-center gap-4">
            <AnimatePresence mode="wait">
              {!user ? (
                <div key="anonymous-header-actions" className="flex items-center gap-3">
                  <button
                    id="header-btn-quick-login"
                    type="button"
                    onClick={handleQuickDemoLogin}
                    className="font-headline text-[10px] uppercase font-bold tracking-wider text-brand-primary hover:text-white transition-colors cursor-pointer px-3 py-1.5 h-full rounded-lg bg-indigo-505/10 border border-brand-primary/20"
                  >
                    Quick Demo
                  </button>
                  <button
                    id="header-btn-login"
                    type="button"
                    onClick={() => {
                      setAuthTab("login");
                      setActiveView("Auth");
                    }}
                    className="bg-brand-primary-container text-white py-2 px-4 rounded-xl font-headline text-xs font-semibold hover:opacity-90 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Login</span>
                  </button>
                </div>
              ) : (
                <div key="auth-header-actions" className="flex items-center gap-4">
                  {/* Active subpages headers decoration (e.g. download PDF for bills screen) */}
                  {activeView === "Bills" && (
                    <button 
                      onClick={() => alert("PDF exported compiled successfully! Saving Statement...")}
                      className="text-brand-on-surface-variant hover:text-white p-1.5 rounded-lg active:scale-95 transition-all cursor-pointer"
                      title="Export Statement as PDF"
                    >
                      <FileText className="w-5 h-5" />
                    </button>
                  )}

                  {activeView === "CRM" && (
                    <button 
                      onClick={() => alert("No new notifications currently logged inside the platform. Pipeline is completely clean.")}
                      className="text-brand-on-surface-variant hover:text-white p-1.5 rounded-lg active:scale-95 transition-all cursor-pointer relative"
                    >
                      <Bell className="w-5 h-5" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-brand-secondary rounded-full animate-ping"></span>
                    </button>
                  )}

                  {/* Initials badge or headshot */}
                  <div 
                    onClick={() => setActiveView("Settings")}
                    className="w-9 h-9 rounded-full overflow-hidden border border-brand-primary/20 bg-brand-primary-container/15 flex items-center justify-center font-headline text-xs font-bold text-brand-primary cursor-pointer hover:border-brand-primary transition-all relative"
                  >
                    {user.name === "Alex Rivera" ? (
                      <img 
                        alt="User" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-BN91bERL8f8NQeO2-bb6ctlR41wX6h8W-eSKjrVXLuAJWhIINuKt9ZbaiZZM7tgBVM7CFlVJ8xNjCBOsNkdFIcLdCohOl_kwzQPVOXqFiNQ40kYtHvd7SPsGvdmvjfXm8G5zXXZz4yCtw_6FWRKCH6bWQeG8CfbQwpiPk_ME24jtd-_z8c2Wg7ATJukjHGw5LK1-zdYRBXXiWRdqjk6b9lPMVKxQ1t0PdIzQOdVzb0vNQ2fgCDDmm8w1TfroR2nCmfLOWXev21g"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      user.name.split(" ").map(n => n[0]).join("")
                    )}
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-brand-secondary border-2 border-brand-bg rounded-full"></span>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Subnavigation Workspace menu bar only for Home (Overview and Analytics toggles) */}
      {user && activeView === "Home" && (
        <div className="fixed top-16 left-0 right-0 bg-[#0b1326]/60 backdrop-blur-md border-b border-brand-outline/5 z-30 h-12 flex items-center">
          <div className="flex gap-6 max-w-md mx-auto w-full px-4 h-full relative">
            <button
              id="subtab-overview"
              onClick={() => setHomeSubTab("overview")}
              className={`h-full text-xs font-headline font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                homeSubTab === "overview" ? "text-brand-primary border-brand-primary" : "text-brand-on-surface-variant border-transparent"
              }`}
            >
              Overview
            </button>
            <button
              id="subtab-analytics"
              onClick={() => setHomeSubTab("analytics")}
              className={`h-full text-xs font-headline font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                homeSubTab === "analytics" ? "text-brand-primary border-brand-primary" : "text-brand-on-surface-variant border-transparent"
              }`}
            >
              Analytics
            </button>
          </div>
        </div>
      )}

      {/* Main Container viewport */}
      <main className={`flex-grow h-full w-full ${user && activeView === "Home" ? "pt-28" : "pt-16"} pb-28 px-4 md:px-8`}>
        <div className="w-full max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView + (activeView === "Home" ? `_${homeSubTab}` : "")}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              {activeView === "Landing" && (
                <LandingView 
                  onNavigate={handleNavigate} 
                  onSetAuthTab={setAuthTab} 
                />
              )}

              {activeView === "Auth" && (
                <AuthView 
                  onLoginSuccess={handleLoginSuccess}
                  activeTab={authTab}
                  setActiveTab={setAuthTab}
                />
              )}

              {activeView === "Home" && (
                homeSubTab === "overview" ? (
                  <DashboardView 
                    userName={user?.name || "Guest User"} 
                    onNavigate={handleNavigate} 
                    creditsUsed={creditsUsed}
                  />
                ) : (
                  <FinancialHealthView />
                )
              )}

              {activeView === "AI" && (
                <AIStudioView onAddCredits={handleAddCredits} />
              )}

              {activeView === "Bills" && (
                <InvoicingView />
              )}

              {activeView === "CRM" && (
                <CRMView />
              )}

              {activeView === "Settings" && (
                <SettingsView 
                  userName={user?.name || "Alex Rivera"} 
                  userEmail={user?.email || "alex@company.ai"}
                  onLogout={handleLogout}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Global Navigation Dock */}
      {user && (
        <nav className="fixed bottom-0 w-full z-40 bg-[#0b1326]/95 backdrop-blur-xl border-t border-brand-outline/10 h-20 shadow-2xl safe-pb">
          <div className="flex justify-around items-center h-full max-w-md mx-auto px-4 gap-1">
            
            {/* Nav Home item */}
            <button
              id="dock-tab-home"
              onClick={() => handleNavigate("Home")}
              className={`flex flex-col items-center justify-center rounded-2xl py-1 px-3.5 transition-all text-center cursor-pointer ${
                activeView === "Home"
                  ? "bg-brand-primary-container text-white scale-102"
                  : "text-brand-on-surface-variant hover:text-white"
              }`}
            >
              <Home className="w-5 h-5 mb-0.5" />
              <span className="font-headline text-[9px] font-bold tracking-wide">Home</span>
            </button>

            {/* Nav AI item */}
            <button
              id="dock-tab-ai"
              onClick={() => handleNavigate("AI")}
              className={`flex flex-col items-center justify-center rounded-2xl py-1 px-3.5 transition-all text-center cursor-pointer ${
                activeView === "AI"
                  ? "bg-brand-primary-container text-white scale-102"
                  : "text-brand-on-surface-variant hover:text-white"
              }`}
            >
              <Sparkles className="w-5 h-5 mb-0.5" />
              <span className="font-headline text-[9px] font-bold tracking-wide">AI</span>
            </button>

            {/* Nav Bills/Invoices item */}
            <button
              id="dock-tab-bills"
              onClick={() => handleNavigate("Bills")}
              className={`flex flex-col items-center justify-center rounded-2xl py-1 px-3.5 transition-all text-center cursor-pointer ${
                activeView === "Bills"
                  ? "bg-brand-primary-container text-white scale-102"
                  : "text-brand-on-surface-variant hover:text-white"
              }`}
            >
              <Receipt className="w-5 h-5 mb-0.5" />
              <span className="font-headline text-[9px] font-bold tracking-wide">Bills</span>
            </button>

            {/* Nav CRM item */}
            <button
              id="dock-tab-crm"
              onClick={() => handleNavigate("CRM")}
              className={`flex flex-col items-center justify-center rounded-2xl py-1 px-3.5 transition-all text-center cursor-pointer ${
                activeView === "CRM"
                  ? "bg-brand-primary-container text-white scale-102"
                  : "text-brand-on-surface-variant hover:text-white"
              }`}
            >
              <Users className="w-5 h-5 mb-0.5" />
              <span className="font-headline text-[9px] font-bold tracking-wide">CRM</span>
            </button>

            {/* Nav Settings item */}
            <button
              id="dock-tab-settings"
              onClick={() => handleNavigate("Settings")}
              className={`flex flex-col items-center justify-center rounded-2xl py-1 px-3.5 transition-all text-center cursor-pointer ${
                activeView === "Settings"
                  ? "bg-brand-primary-container text-white scale-102"
                  : "text-brand-on-surface-variant hover:text-white"
              }`}
            >
              <Settings className="w-5 h-5 mb-0.5" />
              <span className="font-headline text-[9px] font-bold tracking-wide">Settings</span>
            </button>

          </div>
        </nav>
      )}

      {/* Landing footer only for Landing page screen */}
      {!user && activeView === "Landing" && (
        <footer className="w-full bg-[#060e20] border-t border-brand-outline/10 mt-auto">
          <div className="flex flex-col items-center justify-center py-10 px-4 max-w-md mx-auto gap-4 text-center">
            
            <div className="flex items-center gap-2 text-brand-primary">
              <Rocket className="w-5 h-5" />
              <span className="font-headline text-sm font-bold">BusinessBoost AI</span>
            </div>
            
            <p className="font-sans text-[11px] text-brand-on-surface-variant/80">
              Precision, Intelligence, and Velocity for the modern entrepreneur.
            </p>

            <nav className="flex flex-wrap justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-outline">
              <span className="hover:text-white cursor-pointer" onClick={() => alert("Privacy policy placeholder")}>Privacy</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer" onClick={() => alert("Terms of service placeholder")}>Terms</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer" onClick={() => alert("Support channels active")}>Support</span>
            </nav>

            <p className="font-sans text-[10px] text-brand-on-surface-variant/40 mt-2">
              © {new Date().getFullYear()} BusinessBoost AI. All rights reserved.
            </p>

          </div>
        </footer>
      )}

    </div>
  );
}
