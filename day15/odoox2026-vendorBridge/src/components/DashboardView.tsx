import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  CheckSquare, 
  DollarSign, 
  Users, 
  ShieldAlert, 
  Check, 
  X, 
  ExternalLink, 
  Clock, 
  AlertTriangle,
  Award,
  Zap,
  Info
} from 'lucide-react';
import { PurchaseOrder, ApprovalAction } from '../types';

interface DashboardViewProps {
  purchaseOrders: PurchaseOrder[];
  approvals: ApprovalAction[];
  onApproveAction: (id: string, response: 'approve' | 'reject') => void;
  onNavigateToTab: (tabName: string) => void;
}

export default function DashboardView({ 
  purchaseOrders, 
  approvals, 
  onApproveAction,
  onNavigateToTab
}: DashboardViewProps) {
  
  const [selectedBar, setSelectedBar] = useState<number | null>(null);
  const [showRiskReport, setShowRiskReport] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const weeklyDistribution = [
    { day: "MON", value: "h-[50%]", items: 12, percentage: "12%" },
    { day: "TUE", value: "h-[75%]", items: 24, percentage: "24%" },
    { day: "WED", value: "h-[100%]", items: 38, percentage: "38%" },
    { day: "THU", value: "h-[65%]", items: 19, percentage: "19%" },
    { day: "FRI", value: "h-[35%]", items: 8, percentage: "8%" },
    { day: "SAT", value: "h-[80%]", items: 31, percentage: "31%" },
    { day: "SUN", value: "h-[50%]", items: 15, percentage: "15%" },
  ];

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    onApproveAction(id, action);
    const item = approvals.find(app => app.id === id);
    if (item) {
      setFeedbackToast(`Action complete: ${item.title} has been ${action === 'approve' ? 'Approved' : 'Rejected'}.`);
      setTimeout(() => setFeedbackToast(null), 3500);
    }
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-300">
      
      {/* Toast Feedback */}
      <AnimatePresence>
        {feedbackToast && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-primary-container text-on-primary-container px-4 py-3 rounded-lg border border-primary/20 shadow-xl flex items-center gap-2 font-mono text-xs"
          >
            <Check className="w-4 h-4 text-white" />
            <span>{feedbackToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KPI STATS SECTION GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl hover:border-primary/50 transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="p-2 bg-primary/10 rounded text-primary">
              <FileText className="w-5 h-5" />
            </span>
            <span className="text-primary font-mono text-[9px] bg-primary/10 px-2 py-0.5 rounded font-bold">+2 this week</span>
          </div>
          <p className="text-on-surface-variant font-mono text-[10px] uppercase tracking-wider">Active RFQs</p>
          <h3 className="font-sans text-3xl font-extrabold text-white leading-none mt-1">12</h3>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl hover:border-tertiary/50 transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="p-2 bg-tertiary/10 rounded text-tertiary">
              <CheckSquare className="w-5 h-5" />
            </span>
            <span className="text-tertiary font-mono text-[9px] bg-tertiary/10 px-2 py-0.5 rounded font-bold">Critical</span>
          </div>
          <p className="text-on-surface-variant font-mono text-[10px] uppercase tracking-wider">Pending Approvals</p>
          <h3 className="font-sans text-3xl font-extrabold text-white leading-none mt-1">
            {approvals.filter(a => a.status === 'pending').length}
          </h3>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl hover:border-secondary/50 transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="p-2 bg-secondary/10 rounded text-secondary">
              <DollarSign className="w-5 h-5" />
            </span>
            <span className="text-secondary font-mono text-[9px] bg-secondary/10 px-2 py-0.5 rounded font-bold">vs $38k prev.</span>
          </div>
          <p className="text-on-surface-variant font-mono text-[10px] uppercase tracking-wider">Monthly Spend</p>
          <h3 className="font-sans text-3xl font-extrabold text-white leading-none mt-1">$45,200</h3>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl hover:border-outline/50 transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="p-2 bg-outline/10 rounded text-outline">
              <Users className="w-5 h-5" />
            </span>
            <span className="text-outline font-mono text-[9px] bg-outline/10 px-2 py-0.5 rounded font-bold">Global</span>
          </div>
          <p className="text-on-surface-variant font-mono text-[10px] uppercase tracking-wider">Active Vendors</p>
          <h3 className="font-sans text-3xl font-extrabold text-white leading-none mt-1">128</h3>
        </div>
      </section>

      {/* MAIN BENTO BOX GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT TWO-THIRD COLS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recent Purchase Orders Table */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Recent Purchase Orders
                <span className="bg-surface-container-high text-on-surface-variant text-[10px] px-2 py-0.5 rounded font-mono font-semibold">LAST 30 DAYS</span>
              </h2>
              <button 
                type="button"
                onClick={() => onNavigateToTab('Vendors')}
                className="text-primary font-mono text-xs hover:underline uppercase"
              >
                View Vendors
              </button>
            </div>

            <div className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-surface-container-high/40 border-b border-outline-variant font-mono text-[10px] text-on-surface-variant uppercase">
                      <th className="p-4">PO#</th>
                      <th className="p-4">Vendor</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="font-sans text-xs">
                    {purchaseOrders.map((po, index) => {
                      const statusColors: Record<string, string> = {
                        'Fulfilled': 'bg-primary text-primary',
                        'In Transit': 'bg-tertiary text-tertiary',
                        'Processing': 'bg-secondary text-secondary',
                        'Delayed': 'bg-error text-error'
                      };
                      return (
                        <tr key={index} className="border-b border-outline-variant/30 hover:bg-surface-variant/20 transition-colors">
                          <td className="p-4 text-primary font-mono font-medium">{po.id}</td>
                          <td className="p-4 flex items-center gap-2 font-medium text-white">
                            <span className="w-6 h-6 rounded bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-on-surface-variant">
                              {po.vendorCode}
                            </span>
                            {po.vendorName}
                          </td>
                          <td className="p-4 text-on-surface">${po.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${statusColors[po.status] || 'bg-outline text-outline'}`}></span>
                              <span className="font-medium text-[11px] leading-none" style={{ color: `var(--color-${statusColors[po.status]?.split(' ')[2]})` }}>
                                {po.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* LOWER ROW: RE-ACTIVE CHART + RISK ALERT BENTO COLS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Vendor Distribution chart */}
            <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl h-56 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
                <span className="font-mono text-[10px] uppercase text-on-surface-variant tracking-wider">Vendor distribution (Daily active)</span>
                <span className="text-outline hover:text-primary cursor-pointer transition-colors"><ExternalLink className="w-4 h-4" /></span>
              </div>
              
              {/* Dynamic Bar Charts */}
              <div className="flex items-end gap-2 h-28 mb-1 select-none">
                {weeklyDistribution.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex-1 flex flex-col items-center group relative cursor-pointer"
                    onMouseEnter={() => setSelectedBar(idx)}
                    onMouseLeave={() => setSelectedBar(null)}
                  >
                    <div className="w-full bg-primary/20 hover:bg-primary/45 rounded-t h-28 flex flex-col justify-end transition-colors overflow-hidden">
                      <div className={`w-full bg-primary rounded-t transition-all duration-500 ${item.value}`}></div>
                    </div>
                    
                    {/* Tooltip detail overlay */}
                    {selectedBar === idx && (
                      <div className="absolute top-[-30px] z-20 bg-surface-container-highest p-1 px-2 border border-outline-variant text-[9px] font-mono text-white rounded shadow-xl leading-none whitespace-nowrap">
                        {item.items} Nodes ({item.percentage})
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-[8px] font-mono text-outline">
                {weeklyDistribution.map((item, idx) => <span key={idx}>{item.day}</span>)}
              </div>
            </div>

            {/* Supply Risk Alert */}
            <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl relative overflow-hidden group flex flex-col justify-between h-56">
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-on-surface-variant">
                  <span>Supply Risk Status</span>
                  <ShieldAlert className="w-4 h-4 text-error animate-pulse" />
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-error font-bold flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> High Risk: Tier 2 Delay
                  </p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Global logistics strike impacting 12% of open shipments. Raw parts delay estimated: +4 days.
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-2 border-t border-outline-variant/30 flex justify-between items-center">
                <button 
                  type="button"
                  onClick={() => setShowRiskReport(true)}
                  className="text-[10px] font-bold text-on-surface border border-outline-variant px-3 py-1.5 rounded hover:bg-surface-variant cursor-pointer transition-colors"
                >
                  VIEW IMPACT REPORT
                </button>
                <span className="font-mono text-[9px] text-outline/60 italic">Updated 3h ago</span>
              </div>

              {/* Background abstract decoration warning icon */}
              <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none select-none">
                <AlertTriangle className="w-36 h-36" />
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: PENDING APPROVALS LIST VIEW CONTAINER */}
        <div className="space-y-6">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-md font-bold text-white uppercase tracking-tight font-mono">Pending Approvals</h2>
              <span className="bg-tertiary-container text-on-tertiary-container text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                {approvals.filter(a => a.status === 'pending').length} ACTIONS
              </span>
            </div>

            <div className="space-y-3">
              {approvals.filter(a => a.status === 'pending').map((app) => (
                <div 
                  key={app.id} 
                  className="bg-surface-container-low border border-outline-variant rounded-xl p-4 space-y-4 hover:bg-surface-container-high transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-sans font-bold text-white text-xs leading-snug">{app.title}</h4>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">Vendor: {app.vendorName}</p>
                    </div>
                    <span className="text-white font-mono font-bold text-xs">${app.amount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <img 
                      alt={app.requestedBy} 
                      className="w-5 h-5 rounded-full border border-outline-variant object-cover" 
                      src={app.avatarUrl} 
                    />
                    <p className="text-[10px] text-on-surface-variant">
                      Requested by <span className="text-on-surface underline">{app.requestedBy}</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button 
                      type="button"
                      onClick={() => handleAction(app.id, 'reject')}
                      className="bg-surface-container-highest cursor-pointer hover:bg-error/15 hover:text-error text-on-surface-variant py-2 rounded-lg font-mono text-[10px] uppercase font-bold border border-outline-variant transition-all"
                    >
                      Reject
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleAction(app.id, 'approve')}
                      className="bg-primary hover:brightness-105 active:scale-95 cursor-pointer text-on-primary py-2 rounded-lg font-mono text-[10px] uppercase font-bold transition-all"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))}

              {approvals.filter(a => a.status === 'pending').length === 0 && (
                <div className="p-6 bg-surface-container-low/50 border border-outline-variant border-dashed rounded-xl text-center">
                  <span className="font-mono text-xs text-on-surface-variant block">No pending approval actions.</span>
                </div>
              )}

              {/* Quick Summary Widget */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="text-primary w-5 h-5" />
                  <div>
                    <p className="text-white font-bold text-xs leading-tight">Approval Rating</p>
                    <p className="text-[10px] text-primary">98% compliance this month</p>
                  </div>
                </div>
                {/* Simulated rotating green spinner */}
                <span className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin duration-3000"></span>
              </div>

              {/* Upcoming milestone alert banner */}
              <div className="p-4 border-l-4 border-tertiary bg-surface-container-high/30 rounded-r-xl">
                <h4 className="font-mono text-[9px] text-tertiary uppercase font-bold mb-0.5">Next Deadline</h4>
                <p className="text-xs font-bold text-white">Q3 Vendor Audit</p>
                <p className="text-[10px] text-on-surface-variant mt-0.5">Due in 4 days • 12 vendors pending verified feedback</p>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* DISASTROUS RISK REPORT SLIDE-OVER MODAL DETAILS */}
      <AnimatePresence>
        {showRiskReport && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-surface-container border border-outline-variant rounded-xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-4 bg-surface-container-high border-b border-outline-variant flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-error">
                  <ShieldAlert className="w-4 h-4 animate-bounce" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">Detailed Logistics Risk Report</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => setShowRiskReport(false)}
                  className="p-1 hover:bg-surface-container-highest rounded text-on-surface-variant hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4 font-sans text-xs max-h-96 overflow-y-auto">
                <p className="text-white text-md font-semibold">Risk Exposure Analysis: Tier 2 Delays</p>
                
                <div className="p-3 bg-surface-container-lowest border border-outline-variant rounded-lg space-y-1">
                  <span className="font-mono text-[10px] uppercase text-outline block">Identified Root Cause:</span>
                  <span className="text-white font-medium">Pan-European shipping delays &amp; port congestion.</span>
                </div>

                <div className="space-y-3 pt-2 text-on-surface-variant">
                  <p>
                    A comprehensive scan of automated logistics indicates that 12% of open procurement items are impacted. High-density server hardware, chassis aggregates, and robotic motor arm components from EU vendors have experienced a schedule shift.
                  </p>
                  <p className="font-semibold text-white">Recommended Mitigations:</p>
                  <ul className="list-disc list-inside space-y-2 text-[11px]">
                    <li>Reroute priority items to alternative air logistics.</li>
                    <li>Sourcing redundant items locally (Swift Plastic Parts / Prime Tech).</li>
                    <li>Leveraging active local raw material lines.</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-surface-container-high/60 border-t border-outline-variant/60 flex justify-end">
                <button 
                  type="button"
                  onClick={() => setShowRiskReport(false)}
                  className="px-5 py-2 bg-primary text-on-primary font-mono text-[10px] font-bold rounded hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                >
                  Acknowledged
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
