import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Lock, 
  Play, 
  ChevronRight, 
  Activity, 
  Cpu, 
  Terminal, 
  X, 
  Layers, 
  CheckCircle2, 
  Server,
  Workflow
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export default function LandingPage({ onEnterApp }: LandingPageProps) {
  const [showDemoLogs, setShowDemoLogs] = useState(false);
  const [activeCatalogMessage, setActiveCatalogMessage] = useState<string | null>(null);

  const logs = [
    "[SYSTEM] Initiating secure handshake with VendorBridge Neural Network...",
    "[OK] Connection established on PORT 3000.",
    "[SECURE] Protocol SSL_E2E_AES_256 active.",
    "[LOGISTICS] Monitoring 12 current high-priority RFQs.",
    "[AI] Running automatic predictive delivery algorithms for Tier 1 suppliers...",
    "[STATUS] Systems nominal. Global ERP synchronization completed."
  ];

  const handleCatalogLockedClick = (itemName: string) => {
    setActiveCatalogMessage(itemName);
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-sans selection:bg-primary selection:text-on-primary overflow-x-hidden relative flex flex-col">
      
      {/* HEADER NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-40 transition-all duration-300 bg-background/80 backdrop-blur-md border-b border-outline-variant/55">
        <nav className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded flex items-center justify-center">
              <Workflow className="text-on-primary w-5 h-5" />
            </div>
            <div>
              <span className="font-sans font-bold text-xl tracking-tight text-white block">VendorBridge</span>
              <span className="font-mono text-[9px] text-primary uppercase tracking-widest block leading-none">Procurement ERP</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <span className="font-mono text-[11px] text-on-surface-variant hover:text-primary cursor-pointer transition-colors">Technology</span>
            <span className="font-mono text-[11px] text-on-surface-variant hover:text-primary cursor-pointer transition-colors">Solutions</span>
            <span className="font-mono text-[11px] text-on-surface-variant hover:text-primary cursor-pointer transition-colors">Network</span>
          </div>
          
          <button 
            type="button"
            onClick={onEnterApp}
            className="px-5 py-2 hover:bg-surface-container-high/60 cursor-pointer bg-surface-container-low border border-outline-variant rounded-lg font-mono text-xs text-on-surface hover:border-primary transition-all duration-300"
          >
            Login to ERP
          </button>
        </nav>
      </header>

      {/* HERO SECTION */}
      <main className="flex-grow pt-20">
        <section className="relative min-h-[680px] h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden px-4">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Heavy procurement machinery warehouse background" 
              className="w-full h-full object-cover select-none pointer-events-none opacity-40" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB3qGN33zRJYzJUH_mWvaUAzY8YeB4tJh92w_Fbtr7e_RZ0Cf4UJQBkfAkihGpQZKCKYlFJkh6PzPgUbYUs5dn_hL7kiwjtbOmSCOBFbi_zXq-fTmZTFI-oKCGjuU6mlg-OYkleTFn6lzZjb3lFDJCEMWxP2amI3710m0wyUVv_15txo8Zqh5MKxr9OU57iHbCker6Ocx0tMm2bUa288OFOKqX8CKm7rPiJZhBsmeFTFZ5EM9E3uWoY4SqvK4OOJ4hrRzycug-MyRt"
            />
            {/* Cinematic Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/85 to-background"></div>
            <div className="absolute inset-0 grid-bg opacity-30 select-none pointer-events-none"></div>
            {/* Soft subtle green glow ambient circles */}
            <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-primary/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-secondary/10 blur-[120px] rounded-full"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 mt-8">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 bg-primary/10 border border-primary/25 px-4 py-1.5 rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-mono text-[11px] text-primary font-medium">System Online v4.2.0</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-sans text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight"
            >
              THE FUTURE OF <span className="text-primary font-bold">INDUSTRIAL</span> PROCUREMENT
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-sans text-base md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Intelligent vendor networks and automated procurement workflows engineered for the kinetic enterprise.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button 
                type="button"
                onClick={onEnterApp}
                className="w-full sm:w-auto bg-primary text-on-primary cursor-pointer px-8 py-4 rounded-xl font-mono text-xs font-bold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button 
                type="button"
                onClick={() => setShowDemoLogs(true)}
                className="w-full sm:w-auto bg-surface-container-low hover:bg-surface-container hover:text-white cursor-pointer text-on-surface border border-outline-variant px-8 py-4 rounded-xl font-mono text-xs transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 text-primary" />
                Watch Technical Demo
              </button>
            </motion.div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
            <span className="font-mono text-[10px] uppercase tracking-widest text-outline">Scroll to Explore</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent"></div>
          </div>
        </section>

        {/* VISUAL INVENTORY EXPOSITION SECTION */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-outline-variant pb-6">
            <div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">Visual Inventory</h2>
              <p className="text-on-surface-variant mt-1 text-sm">Authenticated hardware catalogue for global enterprise partners.</p>
            </div>
            <div 
              onClick={onEnterApp}
              className="mt-4 md:mt-0 font-mono text-xs text-primary flex items-center gap-1 cursor-pointer group hover:underline"
            >
              View Complete Database
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden aspect-square shadow-lg flex flex-col justify-between">
              <img 
                alt="Kinetic Arm robotic assembly" 
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYwMtJ6wSPR3NqKAt1Wd8cAR07nwaAcKrQJbAjzGJYAU9QWi42D_vhrXpYOHqd8PtVsvmDuGHyOn2j24rm9AKnY3KqUCOicW7WTSdZGf2eiotfEAGN-ocFWquA3NodeJTbgYcDBXIB2MHaeLTl8H_vl4dUxVLrecBwExgG0BlgR6b9XjTp-toejuPuZ7bZy5aO-ldqbqlGZmBi0b8cySppEiSW-4ctFqY4LeOOB576a9_t_3v3BPxFLsVBawN2fjNtm1-31NS2MbbH"
              />
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-3 bg-primary/20 rounded-full mb-3">
                  <Lock className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Restricted Access</h3>
                <p className="text-xs text-on-surface-variant text-center max-w-xs mb-4">
                  Login is required to view engineering diagrams, tolerances, and RFQ pricing models for the AX-Series Robotics.
                </p>
                <button 
                  type="button"
                  onClick={() => handleCatalogLockedClick('Kinetic Arm Unit v2')}
                  className="px-4 py-2 bg-primary/20 text-primary border border-primary/40 font-mono text-[10px] rounded hover:bg-primary/30 transition-all uppercase"
                >
                  Verify Credentials
                </button>
              </div>
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-surface-variant/80 backdrop-blur-md px-2 py-1 font-mono text-[10px] text-on-surface border border-outline-variant rounded">ID: 0092-B-ARM</span>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-background via-background/60 to-transparent z-10">
                <p className="font-bold text-white text-md">Kinetic Arm Unit v2</p>
                <p className="text-xs text-on-surface-variant leading-none mt-1">Industrial Hydraulic Arm Rig</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden aspect-square shadow-lg flex flex-col justify-between">
              <img 
                alt="Neural core racks servers setup" 
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2tZGwgu1qOLZboUWIwPZPLbZ5RyNBbGqq2LErR16WS2buvgMJ5ew9xTFOQGkFAJMqPR2MwZjjfE-ACmKIznMZi7rJ408R7pvN9nPB-bjEpr2v0MhnGXuUSIxQrhia4_dv3k4V6DFuTYBlbAUIP5suMWzqiVBulT4fnbISQ4emKhNlNEQZOJ5epquW5mRghVaelNOtfAtNx_20GwgJ35-IbGPt7ORIP0Gn0DMGwGBYBNotWZi2X05CdP3m8yUgqQv5qVMEz9n0-1fq"
              />
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-3 bg-primary/20 rounded-full mb-3">
                  <Lock className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Preview Restricted</h3>
                <p className="text-xs text-on-surface-variant text-center max-w-xs mb-4">
                  Data infrastructure components and raw processor rack telemetry are reserved for certified administrators.
                </p>
                <button 
                  type="button"
                  onClick={() => handleCatalogLockedClick('Neural Core Racks')}
                  className="px-4 py-2 bg-primary/20 text-primary border border-primary/40 font-mono text-[10px] rounded hover:bg-primary/30 transition-all uppercase"
                >
                  Verify Credentials
                </button>
              </div>
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-surface-variant/80 backdrop-blur-md px-2 py-1 font-mono text-[10px] text-on-surface border border-outline-variant rounded">ID: 884-X-SERVER</span>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-background via-background/60 to-transparent z-10">
                <p className="font-bold text-white text-md">Neural Core Racks</p>
                <p className="text-xs text-on-surface-variant leading-none mt-1">Supercomputing Mainframe Nodes</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden aspect-square shadow-lg flex flex-col justify-between">
              <img 
                alt="Modular PDU visual power supply" 
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKup8DGIlYGCkM_LsLVzRjZ2ypmAPFclwYNgBwM18WNm2R9V_WWvuk5lcHjwC3lLMt-YJK96KM5TevjZtK3mooKMhRiNipXhfrxkrc2OJcNXCzRILLS6muJ-p8jG9vc_NJrkby2eExE03fXoD71JkpXRObx0Po3qx66wiR8VQ6qtsR8danbK9C8IPNYvpA8l6hnid6Uk6mVFLb-gxNbnRuq6fesBvGVf8CXLiUkB4ORr932Z3I9IUPoH4Cgru5Pvr4W2JxURO_1sdT"
              />
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-3 bg-primary/20 rounded-full mb-3">
                  <Lock className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Restricted Module</h3>
                <p className="text-xs text-on-surface-variant text-center max-w-xs mb-4">
                  High-capacity power distribution systems require authenticated VendorBridge Tier 2 authorization credentials.
                </p>
                <button 
                  type="button"
                  onClick={() => handleCatalogLockedClick('Fusion Cell v4')}
                  className="px-4 py-2 bg-primary/20 text-primary border border-primary/40 font-mono text-[10px] rounded hover:bg-primary/30 transition-all uppercase"
                >
                  Verify Credentials
                </button>
              </div>
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-surface-variant/80 backdrop-blur-md px-2 py-1 font-mono text-[10px] text-on-surface border border-outline-variant rounded">ID: PW-550-MOD</span>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-background via-background/60 to-transparent z-10">
                <p className="font-bold text-white text-md">Fusion Cell v4</p>
                <p className="text-xs text-on-surface-variant leading-none mt-1">High-Density Solid Energy Bus</p>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE RUNNING SCROLL BAR */}
        <section className="py-8 bg-surface-container-low border-y border-outline-variant/60 overflow-hidden relative select-none">
          <div className="animate-marquee gap-24 items-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <React.Fragment key={i}>
                <span className="font-mono text-3xl font-extrabold tracking-widest text-outline/30 flex items-center gap-4">
                  SECURE ERP NETWORK <Activity className="w-5 h-5 text-primary" />
                </span>
                <span className="w-4 h-4 rounded-full border border-primary/60"></span>
                <span className="font-mono text-3xl font-extrabold tracking-widest text-outline/30 flex items-center gap-4">
                  AUTOMATED LOGISTICS <Cpu className="w-5 h-5 text-primary" />
                </span>
                <span className="w-4 h-4 rounded-full border border-primary/60"></span>
                <span className="font-mono text-3xl font-extrabold tracking-widest text-on-surface-variant/20 flex items-center gap-4">
                  REAL-TIME TELEMETRY <Server className="w-5 h-5 text-secondary" />
                </span>
                <span className="w-4 h-4 rounded-full border border-primary/60"></span>
              </React.Fragment>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-12 bg-surface-container-lowest border-t border-outline-variant px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-80">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Workflow className="text-on-primary w-3.5 h-3.5" />
            </div>
            <span className="font-mono text-[11px] tracking-tight text-white uppercase">VendorBridge ERP</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-on-surface-variant font-mono text-[10px]">
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Security Protocol</span>
            <span>•</span>
            <span className="hover:text-primary cursor-pointer transition-colors">System Status</span>
          </div>
          
          <div className="font-mono text-[10px] text-on-surface-variant/40">
            © 2026 VENDORBRIDGE PROCUREMENT ERP. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

      {/* MODAL / DRAWER FOR WATCH TECHNICAL DEMO */}
      <AnimatePresence>
        {showDemoLogs && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl bg-surface-container border border-outline-variant rounded-xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-4 bg-surface-container-high border-b border-outline-variant flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Terminal className="text-primary w-4 h-4 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-white">Interactive ERP Connection Log</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => setShowDemoLogs(false)}
                  className="p-1 hover:bg-surface-container-highest rounded text-on-surface-variant hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-6 bg-surface-container-lowest font-mono text-[11px] text-primary/95 space-y-3 leading-relaxed max-h-96 overflow-y-auto">
                <p className="text-on-surface-variant font-semibold">// Live telemetry simulated output</p>
                {logs.map((log, index) => (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                    key={index}
                  >
                    {log}
                  </motion.p>
                ))}
                
                <div className="pt-4 mt-4 border-t border-outline-variant/40 flex flex-col gap-2">
                  <p className="text-on-surface-variant font-semibold">// Authenticated session required for database querying</p>
                  <div className="flex items-center gap-2 p-2 bg-yellow-400/5 border border-yellow-400/20 text-yellow-300 rounded text-[10px]">
                    <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Access Restricted: Connect with a verified ERP login profile for live RFQ submission operations.</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-surface-container-high/60 border-t border-outline-variant/60 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setShowDemoLogs(false)}
                  className="px-4 py-2 hover:bg-surface-container-highest text-on-surface rounded font-mono text-[10px] transition-all cursor-pointer"
                >
                  Disconnect
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowDemoLogs(false);
                    onEnterApp();
                  }}
                  className="px-4 py-2 bg-primary text-on-primary hover:brightness-110 font-mono text-[10px] font-bold rounded flex items-center gap-1 transition-all cursor-pointer"
                >
                  Sign In to ERP <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DOCK ALERTS FOR CATALOG CLICK */}
      <AnimatePresence>
        {activeCatalogMessage && (
          <div className="fixed bottom-6 right-6 max-w-sm bg-surface-container-high border-2 border-primary/40 rounded-xl p-4 shadow-2xl z-50">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/20 rounded-lg text-primary">
                <Lock className="w-4 h-4 animate-bounce" />
              </div>
              <div className="flex-1">
                <span className="font-sans font-bold text-xs text-white block">Secure ERP Isolation</span>
                <p className="text-[11px] text-on-surface-variant mt-1 leading-relaxed">
                  The model <strong>{activeCatalogMessage}</strong> specifications, pricing sheets, and logistics matrices are encrypted. Please log in to your procurements panel to proceed.
                </p>
                <div className="mt-3 flex gap-2">
                  <button 
                    type="button"
                    onClick={() => {
                      setActiveCatalogMessage(null);
                      onEnterApp();
                    }}
                    className="px-3 py-1.5 bg-primary text-on-primary hover:brightness-105 font-mono text-[9px] font-bold rounded select-none cursor-pointer"
                  >
                    Authenticate
                  </button>
                  <button 
                    type="button"
                    onClick={() => setActiveCatalogMessage(null)}
                    className="px-3 py-1.5 hover:bg-surface-container text-on-surface-variant font-mono text-[9px] rounded select-none cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
