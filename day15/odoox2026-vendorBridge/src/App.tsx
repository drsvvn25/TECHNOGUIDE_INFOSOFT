import React, { useState, useEffect } from 'react';
import { 
  Workflow, 
  LayoutDashboard, 
  Users, 
  FileText, 
  FileCheck, 
  TrendingUp, 
  Bell, 
  Search, 
  LogOut, 
  Settings, 
  HelpCircle,
  Plus,
  ShieldCheck,
  UserCheck2,
  Lock,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Modular component imports
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import DashboardView from './components/DashboardView';
import VendorsView from './components/VendorsView';
import RFQsView from './components/RFQsView';
import QuotationReviewView from './components/QuotationReviewView';
import AISupportChatbot from './components/AISupportChatbot';

// Seed static states
import { 
  INITIAL_VENDORS, 
  INITIAL_PURCHASE_ORDERS, 
  INITIAL_APPROVALS, 
  INITIAL_RFQS, 
  MOCK_QUOTATIONS 
} from './data';
import { Vendor, PurchaseOrder, ApprovalAction, RFQ, Quotation } from './types';

export default function App() {
  
  // Navigation States: 'landing' | 'login' | 'app'
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'login' | 'app'>('landing');
  
  // Custom user profile state
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; company?: string } | null>(null);

  // Active Sidebar Nav Tab inside app
  const [activeTab, setActiveTab] = useState<'Dashboard' | 'Vendors' | 'RFQs' | 'Quotations' | 'Approvals' | 'Reports'>('Dashboard');

  // Search filter query parameter
  const [globalSearch, setGlobalSearch] = useState('');

  // Sourcing collections synced dynamically
  const [vendors, setVendors] = useState<Vendor[]>(INITIAL_VENDORS);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(INITIAL_PURCHASE_ORDERS);
  const [approvals, setApprovals] = useState<ApprovalAction[]>(INITIAL_APPROVALS);
  const [rfqs, setRfqs] = useState<RFQ[]>(INITIAL_RFQS);
  const [quotations, setQuotations] = useState<Quotation[]>(MOCK_QUOTATIONS);

  // Load from local storage on initial load
  useEffect(() => {
    const savedVendors = localStorage.getItem('erp_vendors');
    const savedPurchaseOrders = localStorage.getItem('erp_purchase_orders');
    const savedApprovals = localStorage.getItem('erp_approvals');
    const savedRfqs = localStorage.getItem('erp_rfqs');
    const savedScreen = localStorage.getItem('erp_screen');
    const savedUser = localStorage.getItem('erp_current_user');

    if (savedVendors) setVendors(JSON.parse(savedVendors));
    if (savedPurchaseOrders) setPurchaseOrders(JSON.parse(savedPurchaseOrders));
    if (savedApprovals) setApprovals(JSON.parse(savedApprovals));
    if (savedRfqs) setRfqs(JSON.parse(savedRfqs));
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    } else {
      setCurrentUser({
        name: 'Alex Rivera',
        email: 'alex.rivera@vendorbridge.com',
        company: 'VendorBridge ERP'
      });
    }

    if (savedScreen) {
      const parsedScreen = savedScreen as 'landing' | 'login' | 'app';
      if (['landing', 'login', 'app'].includes(parsedScreen)) {
        setCurrentScreen(parsedScreen);
      }
    }
  }, [currentScreen]);

  // Save states helper definitions
  const saveVendors = (updatedVendors: Vendor[]) => {
    setVendors(updatedVendors);
    localStorage.setItem('erp_vendors', JSON.stringify(updatedVendors));
  };

  const savePurchaseOrders = (updatedPO: PurchaseOrder[]) => {
    setPurchaseOrders(updatedPO);
    localStorage.setItem('erp_purchase_orders', JSON.stringify(updatedPO));
  };


  const saveApprovals = (updatedApp: ApprovalAction[]) => {
    setApprovals(updatedApp);
    localStorage.setItem('erp_approvals', JSON.stringify(updatedApp));
  };

  const saveRfqs = (updatedRfq: RFQ[]) => {
    setRfqs(updatedRfq);
    localStorage.setItem('erp_rfqs', JSON.stringify(updatedRfq));
  };

  const navigateScreen = (screen: 'landing' | 'login' | 'app') => {
    setCurrentScreen(screen);
    localStorage.setItem('erp_screen', screen);
  };

  // State handlers
  const handleAddVendor = (nv: Omit<Vendor, 'id'>) => {
    const nextId = `V${vendors.length + 1}`;
    const vendorWithId: Vendor = { ...nv, id: nextId };
    const newList = [vendorWithId, ...vendors];
    saveVendors(newList);
  };

  const handleApproveAction = (id: string, response: 'approve' | 'reject') => {
    const updated = approvals.map(app => {
      if (app.id === id) {
        return { ...app, status: response === 'approve' ? 'approved' as const : 'rejected' as const };
      }
      return app;
    });
    saveApprovals(updated);

    // If approved, create a simulated Purchase order in PO History!
    if (response === 'approve') {
      const approvalItem = approvals.find(app => app.id === id);
      if (approvalItem) {
        const newPO: PurchaseOrder = {
          id: `PO-2024-0${Math.floor(813 + Math.random() * 900)}`,
          vendorName: approvalItem.vendorName,
          vendorCode: approvalItem.vendorName.substring(0, 2).toUpperCase(),
          amount: approvalItem.amount,
          status: 'Processing',
          date: new Date().toISOString().split('T')[0]
        };
        savePurchaseOrders([newPO, ...purchaseOrders]);
      }
    }
  };

  const handleAddRFQ = (newRFQ: RFQ) => {
    const updated = [newRFQ, ...rfqs];
    saveRfqs(updated);
  };

  const handleApproveQuotation = (id: string, decision: 'approve' | 'reject', remarksText: string) => {
    // If approved, append another PO representing the accepted quotation
    if (decision === 'approve') {
      const qtn = quotations.find(q => q.id === id);
      const name = qtn ? qtn.vendorName : 'Industrial Dynamics Ltd';
      const code = name.substring(0, 2).toUpperCase();
      const value = qtn ? qtn.totalValue : 1458230.00;

      const newItem: PurchaseOrder = {
        id: `PO-2024-0815`,
        vendorName: name,
        vendorCode: code,
        amount: value,
        status: 'In Transit',
        date: new Date().toISOString().split('T')[0]
      };
      
      savePurchaseOrders([newItem, ...purchaseOrders]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('erp_current_user');
    setCurrentUser({
      name: 'Alex Rivera',
      email: 'alex.rivera@vendorbridge.com',
      company: 'VendorBridge ERP'
    });
    navigateScreen('landing');
  };

  return (
    <div className="min-h-screen bg-background text-on-background relative flex flex-col font-sans">
      
      {/* LANDING PAGE ROUTING */}
      {currentScreen === 'landing' && (
        <LandingPage onEnterApp={() => navigateScreen('login')} />
      )}

      {/* LOGIN ROUTING */}
      {currentScreen === 'login' && (
        <LoginPage onLoginSuccess={() => navigateScreen('app')} />
      )}

      {/* SECURE INNER APP SHELL FRAMEWORK */}
      {currentScreen === 'app' && (
        <div className="flex h-screen overflow-hidden">
          
          {/* SIDEBAR NAVIGATION COLUMN */}
          <aside className="w-64 bg-surface-container border-r border-outline-variant/65 flex flex-col justify-between hidden md:flex select-none z-10">
            
            {/* Top Brand Area */}
            <div className="space-y-6 pt-6">
              
              <div className="flex items-center gap-3 px-6">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <Workflow className="text-on-primary w-4.5 h-4.5" />
                </div>
                <div>
                  <h2 className="font-sans font-bold text-md text-white tracking-tight">VendorBridge</h2>
                  <p className="font-mono text-[9px] text-primary uppercase tracking-widest leading-none">Global ERP Core</p>
                </div>
              </div>

              {/* Quick RFQ Trigger shortcut */}
              <div className="px-4">
                <button 
                  type="button" 
                  onClick={() => setActiveTab('RFQs')}
                  className="w-full bg-primary/10 border border-primary/25 hover:bg-primary/20 text-primary py-2.5 rounded-lg flex items-center justify-center gap-2 font-mono text-[10px] uppercase font-bold transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> New RFQ Sourcing
                </button>
              </div>

              {/* Navigation list items */}
              <nav className="space-y-0.5 px-2">
                
                {/* Dashboard Tab */}
                <button 
                  type="button"
                  onClick={() => setActiveTab('Dashboard')}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg font-mono text-[11px] font-bold uppercase transition-colors text-left cursor-pointer ${activeTab === 'Dashboard' ? 'bg-surface-variant/40 text-primary border-l-2 border-primary' : 'text-on-surface-variant hover:bg-surface-variant/20 hover:text-white'}`}
                >
                  <span className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </span>
                </button>

                {/* Vendors Tab */}
                <button 
                  type="button"
                  onClick={() => setActiveTab('Vendors')}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg font-mono text-[11px] font-bold uppercase transition-colors text-left cursor-pointer ${activeTab === 'Vendors' ? 'bg-surface-variant/40 text-primary border-l-2 border-primary' : 'text-on-surface-variant hover:bg-surface-variant/20 hover:text-white'}`}
                >
                  <span className="flex items-center gap-2.5">
                    <Users className="w-4 h-4" /> Vendors Database
                  </span>
                </button>

                {/* RFQs Tab */}
                <button 
                  type="button"
                  onClick={() => setActiveTab('RFQs')}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg font-mono text-[11px] font-bold uppercase transition-colors text-left cursor-pointer ${activeTab === 'RFQs' ? 'bg-surface-variant/40 text-primary border-l-2 border-primary' : 'text-on-surface-variant hover:bg-surface-variant/20 hover:text-white'}`}
                >
                  <span className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4" /> RFQs Dispatch
                  </span>
                </button>

                {/* Approvals tab representing review quotation comparison */}
                <button 
                  type="button"
                  onClick={() => setActiveTab('Quotations')}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg font-mono text-[11px] font-bold uppercase transition-colors text-left cursor-pointer ${activeTab === 'Quotations' ? 'bg-surface-variant/40 text-primary border-l-2 border-primary' : 'text-on-surface-variant hover:bg-surface-variant/20 hover:text-white'}`}
                >
                  <span className="flex items-center gap-2.5">
                    <FileCheck className="w-4 h-4" /> Compare Quotes
                  </span>
                  
                  {/* Indicator counter counts pending */}
                  <span className="bg-tertiary-container text-on-tertiary-container text-[8.5px] px-1.5 py-0.5 rounded-full font-bold">
                    NEW
                  </span>
                </button>

              </nav>

            </div>

            {/* Bottom Sourcing profile agent details block */}
            <div className="p-4 space-y-4 border-t border-outline-variant/50">
              
              <div className="flex items-center justify-between text-outline text-[10px] font-mono">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-primary" /> SECURE ROOT</span>
                <span>v4.2</span>
              </div>

              {/* Senior lead detail block */}
              <div className="p-3 bg-surface-container-low border border-outline-variant rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600/10 border border-primary flex items-center justify-center font-sans font-bold text-sm text-primary flex-shrink-0">
                  {currentUser?.name ? currentUser.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'AR'}
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-xs text-white block truncate leading-tight">{currentUser?.name || 'Alex Rivera'}</span>
                  <span className="text-[10px] text-on-surface-variant block truncate mt-0.5">{currentUser?.company || 'Procurement Lead'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono uppercase text-center text-outline">
                <button 
                  type="button" 
                  onClick={() => alert("VendorBridge Enterprise settings is synced server-side.")}
                  className="p-2 border border-outline-variant rounded hover:bg-surface-variant hover:text-white flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" /> Code
                </button>
                <button 
                  type="button" 
                  onClick={handleLogout}
                  className="p-2 border border-outline-variant rounded hover:bg-error/15 hover:text-error hover:border-error flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            </div>

          </aside>

          {/* MAIN PAGE SEGMENT FOR UPPER CONTAINER & CORE SCROLLER */}
          <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
            
            {/* TOP HEADER STATUS PANEL */}
            <header className="h-16 bg-surface-container/60 border-b border-outline-variant/50 px-6 flex items-center justify-between select-none">
              
              <div className="flex items-center gap-4">
                {/* Mobile visible branding */}
                <div className="flex items-center gap-2 md:hidden">
                  <Workflow className="text-primary w-5 h-5" />
                  <span className="font-sans font-bold text-sm text-white">VendorBridge</span>
                </div>
                
                {/* Top global searching component */}
                <div className="relative text-xs hidden sm:block w-70">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"><Search className="w-4 h-4" /></span>
                  <input 
                    type="text" 
                    placeholder="Search systems node parameters..." 
                    value={globalSearch}
                    onChange={(e) => setGlobalSearch(e.target.value)}
                    className="w-full h-9 pl-9 pr-4 text-xs bg-surface-container-low border border-outline-variant rounded-lg text-white focus:outline-none focus:border-secondary-container"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                
                <div className="hidden lg:flex items-center gap-1.5 p-1 px-3 bg-primary/10 border border-primary/20 text-primary rounded-full text-[10px] font-bold font-mono uppercase">
                  <UserCheck2 className="w-3.5 h-3.5" /> SECURED TERMINAL
                </div>

                {/* Notifications status trigger */}
                <button 
                  type="button" 
                  onClick={() => alert("Notification registers synced securely via ERP logs.")}
                  className="p-2 border border-outline-variant/60 bg-surface-container-low text-on-surface rounded-lg hover:border-primary transition-all cursor-pointer relative"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-[3px] right-[3px] w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                </button>

                {/* General Support indicator — opens AI chatbot */}
                <button 
                  type="button" 
                  onClick={() => {
                    const trigger = document.getElementById('ai-chatbot-trigger');
                    if (trigger) trigger.click();
                  }}
                  className="p-2 border border-outline-variant/60 bg-surface-container-low text-on-surface rounded-lg hover:border-primary transition-all cursor-pointer"
                  title="AI Support Chat"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>

            </header>

            {/* LIVE TABS WORKSPACE PANEL CONTAINER WITH INTERNAL SCROLLING */}
            <div className="flex-grow overflow-y-auto p-6 scroll-smooth grid-bg">
              
              {/* Active Tab Router rendering dynamic states */}
              {activeTab === 'Dashboard' && (
                <DashboardView 
                  purchaseOrders={purchaseOrders}
                  approvals={approvals}
                  onApproveAction={handleApproveAction}
                  onNavigateToTab={(tab) => {
                    if (['Dashboard', 'Vendors', 'RFQs', 'Quotations', 'Approvals'].includes(tab)) {
                      setActiveTab(tab as any);
                    }
                  }}
                />
              )}

              {activeTab === 'Vendors' && (
                <VendorsView 
                  vendors={vendors}
                  onAddVendor={handleAddVendor}
                />
              )}

              {activeTab === 'RFQs' && (
                <RFQsView 
                  vendors={vendors}
                  rfqs={rfqs}
                  onAddRFQ={handleAddRFQ}
                />
              )}

              {activeTab === 'Quotations' && (
                <QuotationReviewView 
                  quotations={quotations}
                  onApproveQuotation={handleApproveQuotation}
                />
              )}

            </div>

          </div>

        </div>
      )}

      {/* AI SUPPORT CHATBOT — Floating widget on all screens */}
      <AISupportChatbot />

    </div>
  );
}
