import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Receipt, Search, Plus, Trash2, Eye, Send, Check, X, FileText 
} from "lucide-react";
import { InvoiceItem } from "../types";

export default function InvoicingView() {
  const [customerSearch, setCustomerSearch] = useState("Elena Rodriguez");
  const [descInput, setDescInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "Premium Consulting", amount: 450.00 },
    { id: "2", description: "AI Content Pack", amount: 125.00 }
  ]);

  const [showInvoicePreview, setShowInvoicePreview] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const mockClients = ["Elena Rodriguez", "Marcus Chen", "Sarah Jenkins", "David Okoro"];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descInput.trim() || !amountInput) {
      alert("Please provide both a description and an amount.");
      return;
    }
    const val = parseFloat(amountInput);
    if (isNaN(val) || val <= 0) {
      alert("Please specify a valid numeric amount.");
      return;
    }
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: descInput,
      amount: val
    };
    setItems([...items, newItem]);
    setDescInput("");
    setAmountInput("");
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + tax;

  const handleSendInvoice = () => {
    if (!customerSearch.trim()) {
      alert("Please associate a customer with this invoice.");
      return;
    }
    if (items.length === 0) {
      alert("Please register at least one item before sending.");
      return;
    }
    alert(`Invoice sent successfully to ${customerSearch}!\nTotal Amount: $${grandTotal.toFixed(2)} (Tax Included)`);
  };

  const filteredClients = mockClients.filter(c => 
    c.toLowerCase().includes(customerSearch.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto space-y-6 pt-4 pb-12">
      {/* Header */}
      <section className="space-y-1">
        <h2 className="font-headline text-2xl font-bold text-white">New Invoice</h2>
        <p className="font-sans text-xs text-brand-on-surface-variant">Create professional invoices in seconds.</p>
      </section>

      {/* Customer Input Card */}
      <div className="glass-card rounded-2xl p-5 relative border border-brand-outline/10">
        <div className="space-y-1.5 relative">
          <label className="font-headline text-xs font-bold text-brand-primary block px-1">Customer Details</label>
          <div className="relative">
            <input
              id="invoice-input-customer"
              className="w-full bg-brand-surface-high/50 border border-brand-outline/15 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-brand-outline font-sans text-xs focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              placeholder="Search or add customer"
              type="text"
              value={customerSearch}
              onChange={(e) => {
                setCustomerSearch(e.target.value);
                setShowSearchSuggestions(true);
              }}
              onFocus={() => setShowSearchSuggestions(true)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-outline w-4.5 h-4.5" />
          </div>

          {/* Dynamic Suggestion Search list */}
          <AnimatePresence>
            {showSearchSuggestions && customerSearch && filteredClients.length > 0 && (
              <motion.ul 
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute z-30 left-0 right-0 top-full mt-2 bg-brand-surface-high border border-brand-outline/15 rounded-xl py-1 shadow-2xl"
              >
                {filteredClients.map((client) => (
                  <li 
                    key={client}
                    onClick={() => {
                      setCustomerSearch(client);
                      setShowSearchSuggestions(false);
                    }}
                    className="px-4 py-3 hover:bg-brand-surface-highest/60 text-xs font-medium text-white transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>{client}</span>
                    <span className="text-[10px] bg-brand-primary-container/10 text-brand-primary px-2 py-0.5 rounded-full">CRM Contact</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Item Form & Table Card */}
      <div className="glass-card rounded-2xl p-5 space-y-4 border border-brand-outline/10">
        <label className="font-headline text-xs font-bold text-brand-primary block px-1">Itemized Charges</label>

        {/* Input Add item block */}
        <form onSubmit={handleAddItem} className="space-y-3">
          <div className="space-y-1">
            <input
              id="invoice-item-desc"
              className="w-full bg-brand-surface-high/40 border border-brand-outline/15 rounded-xl py-3.5 px-4 text-white placeholder:text-brand-outline font-sans text-xs focus:outline-none focus:border-brand-primary focus:ring-1"
              placeholder="Item description (e.g. Consulting, Design Pack)"
              type="text"
              value={descInput}
              onChange={(e) => setDescInput(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <input
                id="invoice-item-amount"
                className="w-full bg-brand-surface-high/40 border border-brand-outline/15 rounded-xl py-3.5 pl-8 pr-4 text-white placeholder:text-brand-outline font-sans text-xs focus:outline-none focus:border-brand-primary focus:ring-1"
                placeholder="0.00"
                type="number"
                step="0.01"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-outline font-sans text-xs">$</span>
            </div>
            <button
              id="invoice-btn-add"
              type="submit"
              className="bg-brand-primary-container text-white font-headline text-xs font-semibold rounded-xl py-3.5 flex items-center justify-center gap-1 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Item</span>
            </button>
          </div>
        </form>

        {/* Dynamic Table items list */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-brand-outline/10 pb-2">
                <th className="pb-3 text-[10px] font-bold text-brand-outline uppercase tracking-wider">Item</th>
                <th className="pb-3 text-[10px] font-bold text-brand-outline uppercase tracking-wider text-right">Amount</th>
                <th className="pb-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-outline/5">
              {items.map((item) => (
                <tr key={item.id} className="group animate-fade-in text-xs font-semibold text-white">
                  <td className="py-3.5 pr-2 font-medium text-brand-on-surface truncate max-w-[200px]">{item.description}</td>
                  <td className="py-3.5 text-right font-mono">${item.amount.toFixed(2)}</td>
                  <td className="py-3.5 text-right pl-3">
                    <button
                      id={`invoice-remove-${item.id}`}
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-brand-outline hover:text-brand-error active:scale-90 transition-colors p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-xs text-brand-on-surface-variant font-medium">
                    No charges added yet. Register an item above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Calculation Block */}
      <div className="glass-card rounded-2xl p-5 space-y-3.5 border border-brand-outline/10">
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="text-brand-on-surface-variant">Subtotal</span>
          <span className="text-white font-mono">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="text-brand-on-surface-variant">Tax (8%)</span>
          <span className="text-brand-secondary font-mono">${tax.toFixed(2)}</span>
        </div>
        <div className="h-px bg-brand-outline/10 my-2"></div>
        <div className="flex justify-between items-center">
          <span className="font-headline text-sm font-bold text-white">Total</span>
          <span className="font-headline text-lg font-bold text-brand-primary font-mono">${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Action Block Buttons */}
      <div className="flex gap-4">
        <button
          id="invoice-btn-preview"
          type="button"
          onClick={() => setShowInvoicePreview(true)}
          className="flex-1 border border-brand-primary text-brand-primary font-headline text-xs font-semibold rounded-xl py-4 flex items-center justify-center gap-1.5 hover:bg-brand-primary/5 active:scale-95 transition-all cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          <span>Preview</span>
        </button>
        <button
          id="invoice-btn-send"
          type="button"
          onClick={handleSendInvoice}
          className="flex-1 bg-brand-primary-container text-white font-headline text-xs font-semibold rounded-xl py-4 flex items-center justify-center gap-1.5 hover:opacity-95 active:scale-95 transition-all glow-indigo cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Send Invoice</span>
        </button>
      </div>

      {/* Floating Graphic elements */}
      <div className="pt-2 flex justify-center opacity-25">
        <div className="w-32 h-32 bg-brand-primary blur-[80px] rounded-full absolute -z-10 bottom-40"></div>
      </div>

      {/* Invoice Modal Preview Popover */}
      <AnimatePresence>
        {showInvoicePreview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.93, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 15 }}
              className="bg-brand-surface border border-brand-outline/15 w-full max-w-sm rounded-2xl p-6 shadow-2xl space-y-5"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-headline text-xs font-bold text-white tracking-widest uppercase">INV-08842</h4>
                    <p className="font-sans text-[10px] text-brand-on-surface-variant font-medium">BusinessBoost AI</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowInvoicePreview(false)}
                  className="p-1 rounded-full text-brand-on-surface-variant hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* CRM Customer Profile summary */}
              <div className="bg-brand-surface-high/30 rounded-xl p-3.5 space-y-1 text-xs">
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider block">Billed To</span>
                <p className="font-bold text-white mb-0.5">{customerSearch || "Elena Rodriguez"}</p>
                <p className="font-medium text-brand-on-surface-variant text-[11px] font-sans">
                  {customerSearch === "Elena Rodriguez" ? "elena.rodriguez@techflow.ai" : "billing@client.com"}
                </p>
              </div>

              {/* Items Summary Preview */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-brand-outline uppercase tracking-wider block">Item Details</span>
                <div className="divide-y divide-brand-outline/5 max-h-44 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="py-2.5 flex justify-between items-center text-xs font-medium">
                      <span className="text-brand-on-surface">{item.description}</span>
                      <span className="text-white font-mono">${item.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total calculations list */}
              <div className="bg-brand-bg/60 border border-brand-outline/5 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-brand-on-surface-variant">Subtotal</span>
                  <span className="text-white font-mono">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-brand-on-surface-variant">Tax (8%)</span>
                  <span className="text-brand-secondary font-mono">${tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-brand-outline/10 my-1"></div>
                <div className="flex justify-between font-bold text-sm">
                  <span className="text-white">Amount Due</span>
                  <span className="text-brand-primary font-mono">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Close footer buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowInvoicePreview(false)}
                  className="flex-1 border border-brand-outline/15 text-white font-headline text-xs font-semibold py-3.5 rounded-xl hover:bg-brand-surface-high/40 transition-all cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowInvoicePreview(false);
                    handleSendInvoice();
                  }}
                  className="flex-1 bg-brand-primary-container text-white font-headline text-xs font-semibold py-3.5 rounded-xl hover:opacity-90 active:scale-95 transition-all text-center cursor-pointer"
                >
                  Confirm Send
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
