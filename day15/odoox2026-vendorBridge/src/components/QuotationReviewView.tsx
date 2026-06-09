import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileSpreadsheet, 
  Star, 
  HelpCircle, 
  CheckCheck, 
  AlertTriangle, 
  ThumbsUp, 
  ThumbsDown,
  Info,
  ChevronDown
} from 'lucide-react';
import { Quotation } from '../types';

interface QuotationReviewViewProps {
  quotations: Quotation[];
  onApproveQuotation: (id: string, decision: 'approve' | 'reject', remarks: string) => void;
}

export default function QuotationReviewView({ quotations, onApproveQuotation }: QuotationReviewViewProps) {
  
  // Choose top bid as default: TechSource Solutions
  const [selectedQuoteId, setSelectedQuoteId] = useState(quotations[0]?.id || '');
  const [remarks, setRemarks] = useState('Recommended base tender. Meets all rigid geometric mechanical specifications with superior delivery dispatch terms.');
  const [completedDecision, setCompletedDecision] = useState<'approved' | 'rejected' | null>(null);

  const currentQuote = quotations.find(q => q.id === selectedQuoteId) || quotations[0];

  if (!currentQuote) {
    return <div className="p-6 text-center text-outline font-mono">No quotation bids dispatched for analysis.</div>;
  }

  // Calculate calculations for Heavy Machinery review
  // Since the user requested specific Indian Rupee values (₹14,58,230.00) for "Industrial Dynamics Ltd." (with Hydraulic Pump, Control Valve, Seal Kit, Piston Rod),
  // let's dynamically check if we should showcase specific Indian Rupee parameters or let the custom layout bind to selected quote!
  // Let's implement a toggle or default representation of the specific "Heavy Machinery Spares" (₹14,58,230.00) for a perfect screenshot-matching match!
  
  // Seed data specific to "Industrial Dynamics Ltd." (Heavy Machinery Spares, ₹14,58,230.00)
  const isIndustrialDynamics = selectedQuoteId === 'INDUSTRIAL-DYNAMICS' || selectedQuoteId === '';
  
  const indianRupeeQuote = {
    title: 'Heavy Machinery Spares',
    vendorName: 'Industrial Dynamics Ltd.',
    rating: 4.8,
    rfqId: 'RFQ-2024-A90',
    totalValue: 1458230.00,
    deliveryDays: '4-6 Days',
    items: [
      { name: 'Hydraulic Pump HP-440', sku: 'IND-HP-440', hsn: '8413', qty: 25, unit: 'Units', unitPrice: 42000.00, discountPercent: 5 },
      { name: 'Control Valve CV-92', sku: 'IND-CV-992', hsn: '8481', qty: 10, unit: 'Units', unitPrice: 28500.50, discountPercent: 0 },
      { name: 'Seal Kit SK-11', sku: 'IND-SK-112', hsn: '4016', qty: 105, unit: 'Units', unitPrice: 1200.00, discountPercent: 12 },
      { name: 'Piston Rod PR-88', sku: 'IND-PR-088', hsn: '7308', qty: 15, unit: 'Units', unitPrice: 18500.00, discountPercent: 3 }
    ],
    cgstPercent: 9,
    sgstPercent: 9,
    budgetCap: 1600000.00
  };

  const dataToRender = isIndustrialDynamics ? indianRupeeQuote : {
    title: 'Q3 Research Wing Refurbishment',
    vendorName: currentQuote.vendorName,
    rating: currentQuote.rating,
    rfqId: currentQuote.rfqId,
    totalValue: currentQuote.totalValue,
    deliveryDays: currentQuote.deliveryDays,
    items: currentQuote.lineItems.map(item => ({
      name: item.name,
      sku: item.sku,
      hsn: item.hsn,
      qty: item.qty,
      unit: item.unit,
      unitPrice: item.unitPrice,
      discountPercent: item.discountPercent
    })),
    cgstPercent: currentQuote.cgstPercent,
    sgstPercent: currentQuote.sgstPercent,
    budgetCap: currentQuote.budgetCap
  };

  // Detailed Mathematical calculations
  const calculateTotals = () => {
    let subtotal = 0;
    
    dataToRender.items.forEach(item => {
      const discountedPrice = item.unitPrice * (1 + (item.discountPercent / 100));
      subtotal += item.qty * discountedPrice;
    });

    const cgstValue = subtotal * (dataToRender.cgstPercent / 100);
    const sgstValue = subtotal * (dataToRender.sgstPercent / 100);
    const calculatedTotal = subtotal + cgstValue + sgstValue;

    return {
      subtotal,
      cgstValue,
      sgstValue,
      calculatedTotal
    };
  };

  const { subtotal, cgstValue, sgstValue, calculatedTotal } = calculateTotals();

  // Color matching budget thresholds
  const budgetRatio = Math.min((calculatedTotal / dataToRender.budgetCap) * 100, 100);
  const isOverBudget = calculatedTotal > dataToRender.budgetCap;

  const handleDecision = (decision: 'approve' | 'reject') => {
    onApproveQuotation(selectedQuoteId || 'INDUSTRIAL-DYNAMICS', decision, remarks);
    setCompletedDecision(decision === 'approve' ? 'approved' : 'rejected');
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-300">
      
      {/* Header Info Panel */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-outline-variant/30 pb-4 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">Quotation Review</h2>
          <nav className="flex items-center text-xs text-on-surface-variant font-mono mt-1">
            <span>Procurement Node</span>
            <span className="mx-2 text-outline-variant">/</span>
            <span>Comparative Quotations</span>
            <span className="mx-2 text-outline-variant">/</span>
            <span className="text-primary">{dataToRender.title}</span>
          </nav>
        </div>

        {/* Dynamic selector to toggle between Industrial Dynamics or standard mock test bids */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-outline">
          <span className="uppercase tracking-wider">Analyze Bid Sourcing:</span>
          <select 
            value={selectedQuoteId}
            onChange={(e) => {
              setSelectedQuoteId(e.target.value);
              setCompletedDecision(null);
            }}
            className="bg-surface-container-high border border-outline-variant rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-secondary transition-colors"
          >
            <option value="">Industrial Dynamics Ltd (Spares Bid)</option>
            {quotations.map(q => (
              <option key={q.id} value={q.id}>{q.vendorName} ({q.id})</option>
            ))}
          </select>
        </div>
      </div>

      {/* DETAILED BID OVERVIEW METRIC COLS */}
      <div className="bg-surface-container-low border border-outline-variant rounded-2xl p-6 shadow-xl relative overflow-hidden">
        
        {/* Glow accent bar top */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-primary"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-primary/10 border border-primary/20 text-primary px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase leading-none">
                {dataToRender.rfqId}
              </span>
              <span className="text-outline font-mono text-[10px] uppercase font-bold">• Category: Heavy Machinery</span>
            </div>

            <h3 className="text-2xl font-extrabold text-white tracking-tight">{dataToRender.title}</h3>
            
            <div className="flex items-center gap-2 pt-1">
              <span className="text-on-surface-variant font-medium text-xs">Proposed Sourcing Entity:</span>
              <span className="font-bold text-white text-xs underline">{dataToRender.vendorName}</span>
              
              <div className="flex items-center gap-0.5 text-tertiary ml-2">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-mono text-xs font-bold leading-none">{dataToRender.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-high border border-outline-variant rounded-xl p-4 flex flex-col justify-center min-w-[200px] text-right md:text-right">
            <span className="font-mono text-[9px] text-outline uppercase tracking-wider block">Estimated Quote Value (GRAND TOTAL)</span>
            <span className="text-white text-2xl font-extrabold block mt-1 font-sans">
              {isIndustrialDynamics ? '₹' : '$'}{calculatedTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="font-mono text-[9px] text-primary block mt-1">Delivery Time Spec: {dataToRender.deliveryDays}</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT TWO COLS: ITEMIZED CALCULATIONS MODULE */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            
            <div className="p-4 bg-surface-container-high/40 border-b border-outline-variant flex justify-between items-center">
              <span className="font-mono text-[10px] text-outline uppercase font-bold tracking-wider">Dispatched Line-Item Pricing (Direct quote comparison)</span>
              <span className="text-[10px] text-primary font-mono font-medium">HSN Classification Approved</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-surface-container-high/20 border-b border-outline-variant font-mono text-[9px] text-outline uppercase">
                    <th className="p-3 pl-4">Engineering Item description</th>
                    <th className="p-3">SKU Part ID</th>
                    <th className="p-3">HSN Code</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3 text-right">Unit Price</th>
                    <th className="p-3 text-right">Discount</th>
                    <th className="p-3 text-right pr-4">Total Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 font-sans text-xs">
                  {dataToRender.items.map((item, i) => {
                    const discountFactor = 1 + (item.discountPercent / 100);
                    const netTotal = item.qty * (item.unitPrice * discountFactor);
                    return (
                      <tr key={i} className="hover:bg-surface-variant/20 transition-colors">
                        <td className="p-3 pl-4 font-semibold text-white">{item.name}</td>
                        <td className="p-3 text-outline font-mono text-[11px]">{item.sku}</td>
                        <td className="p-3 text-outline font-mono text-[11px]">{item.hsn}</td>
                        <td className="p-3 text-on-surface font-mono">{item.qty} {item.unit}</td>
                        <td className="p-3 text-right font-mono text-on-surface-variant">
                          {isIndustrialDynamics ? '₹' : '$'}{item.unitPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="p-3 text-right font-mono text-tertiary">
                          {item.discountPercent !== 0 ? `${item.discountPercent > 0 ? '+' : ''}${item.discountPercent}%` : '0%'}
                        </td>
                        <td className="p-3 text-right pr-4 font-mono font-medium text-white">
                          {isIndustrialDynamics ? '₹' : '$'}{netTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>

          {/* BUDGET VS QUOTATION LIMIT COMPASS */}
          <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase text-outline">
              <span>RFQ Allocation Cap Comparison</span>
              <span className={isOverBudget ? 'text-error' : 'text-primary'}>
                {isOverBudget ? 'Cap Surtax Limit Exceeded' : 'Under Allocation Cap'}
              </span>
            </div>

            <div className="relative w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-700 ${isOverBudget ? 'bg-error' : 'bg-primary'}`}
                style={{ width: `${budgetRatio}%` }}
              ></div>
            </div>

            <div className="flex justify-between font-mono text-[10px] text-on-surface-variant">
              <span>Grand Total: {isIndustrialDynamics ? '₹' : '$'}{calculatedTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              <span>Budget Sourcing Cap: {isIndustrialDynamics ? '₹' : '$'}{dataToRender.budgetCap.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: DECISION ANALYSIS TERMINAL PANEL */}
        <div className="space-y-6">
          
          <div className="bg-surface-container-low border border-outline-variant p-5 rounded-2xl space-y-5">
            <h3 className="font-mono text-xs text-white uppercase font-bold tracking-wider">Sourcing Assessment Calculations</h3>

            <div className="space-y-3 text-xs font-sans divide-y divide-outline-variant/20">
              
              <div className="flex justify-between items-center pb-2">
                <span className="text-on-surface-variant">Calculated Item Subtotal:</span>
                <span className="font-mono text-white text-semibold">
                  {isIndustrialDynamics ? '₹' : '$'}{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center py-2.5">
                <span className="text-on-surface-variant flex items-center gap-1">
                  CGST Tax Allocation ({dataToRender.cgstPercent}%): <HelpCircle className="w-3.5 h-3.5 text-outline cursor-help" title="Central Goods and Services Tax standard percentage parameters" />
                </span>
                <span className="font-mono text-white">
                  {isIndustrialDynamics ? '₹' : '$'}{cgstValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center py-2.5">
                <span className="text-on-surface-variant flex items-center gap-1">
                  SGST Tax Allocation ({dataToRender.sgstPercent}%): <HelpCircle className="w-3.5 h-3.5 text-outline cursor-help" title="State Goods and Services Tax standard percentage parameters" />
                </span>
                <span className="font-mono text-white">
                  {isIndustrialDynamics ? '₹' : '$'}{sgstValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center pt-3 font-semibold text-white">
                <span className="text-md uppercase font-mono tracking-tight">Consolidated Value:</span>
                <p className="text-lg font-extrabold font-sans text-primary">
                  {isIndustrialDynamics ? '₹' : '$'}{calculatedTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

            </div>

            {/* Assessment Remarks Notes Textarea */}
            <div className="space-y-1.5 pt-2">
              <label className="font-mono text-[9px] text-outline uppercase font-bold tracking-wider">Assessment Remarks / Decision Notes</label>
              <textarea 
                rows={3}
                placeholder="Declare reasoning details backing your operational decision parameters..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant text-[11px] text-white p-3 rounded-lg focus:outline-none focus:border-secondary transition-colors"
              />
            </div>

            {/* Submit decisions actions triggers */}
            <div className="pt-2">
              <AnimatePresence mode="wait">
                {completedDecision === null ? (
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      type="button"
                      onClick={() => handleDecision('reject')}
                      className="bg-surface-container-highest cursor-pointer hover:bg-error/15 hover:text-error text-on-surface hover:border-error border border-outline-variant py-3 rounded-lg font-mono text-[10px] uppercase font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" /> Reject Tender
                    </button>
                    
                    <button 
                      type="button"
                      onClick={() => handleDecision('approve')}
                      className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white py-3 rounded-lg font-mono text-[10px] uppercase font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" /> Approve Bid
                    </button>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-xl text-center border font-mono text-xs ${completedDecision === 'approved' ? 'bg-primary/10 border-primary/40 text-primary' : 'bg-error/10 border-error/40 text-error'}`}
                  >
                    <CheckCheck className="w-5 h-5 mx-auto mb-1 animate-ping" />
                    <span>Decision Dispatched: <strong>{completedDecision.toUpperCase()}</strong></span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Informational tips helper block */}
          <div className="p-4 bg-surface-container-low border border-outline-variant rounded-xl flex items-start gap-3">
            <Info className="text-secondary w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-on-surface-variant leading-relaxed font-sans">
              Decisions on Quotations instantly trigger structured procurement dispatch notices to physical logistics networks for packing operations. Maintain caution.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
