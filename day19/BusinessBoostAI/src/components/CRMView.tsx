import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, Search, Filter, Phone, Mail, ChevronRight, X, MailOpen, History, Receipt, UserCheck 
} from "lucide-react";
import { Customer } from "../types";

export default function CRMView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Lead" | "Inactive">("All");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const mockCustomers: Customer[] = [
    {
      id: "1",
      name: "Elena Rodriguez",
      email: "elena.rodriguez@techflow.ai",
      status: "Active",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJyV1uAW5QRxrq5GEMGuUKoD1MpxV_KmAABu_o5-1jCkKA3FcnTHVytwr4Ce0IeneSBVj8Mqv32Ij8SxAoRDg5-VchzhSkLacOAajqDWuuJr4jXdD7Z_m23FXitUX2OYiUqphpAD_K49HdhRHlDsrO6ccz_v0COcc11yasyMdZk6AaWC6O9SOCIoChTxFJKNlVzrxXensBErLUFv0jFCD9chbvl02vXuxIOP8e0aKt5zhxhcglnmtqpKth1kTlB4WEtJNGHcwzZf0",
      phone: "+1 (555) 234-5678",
      interactionsCount: 14,
      totalSpent: 4200
    },
    {
      id: "2",
      name: "Marcus Chen",
      email: "marcus.chen@lunarscale.io",
      status: "Lead",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCyx6ZTlj_1DxBGqlbfmc30ympV8fz1NuyN55W24i0V4mWuyrSM2YU9YZzPQk7CJmmY_cHtXzFUB47t3V8GEI25Vc1aoZ17cnsjimVMQd-ECol6LbKQg3z6ZmNZ0kjlQJhTLbygBfAqgb_yedFHTlZHc6NZV78uCh1wJo5bh3dcsMbqAADi7tBSnC5JVZ3Z9ZRLT6u8FKL4adq9Gf7V2zU6iZATJcC9E8oUj0dKUcUyX6Aw8_-uOUqLjrnkYpN5JRNKkxUl74JmgQ",
      phone: "+1 (555) 765-4321",
      interactionsCount: 3,
      totalSpent: 0
    },
    {
      id: "3",
      name: "Sarah Jenkins",
      email: "sarah@creativepuls.com",
      status: "Inactive",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8y7vF5P8zvf6Mng-K1kcDETpEaon58iYUPY-oims9MwiwP1KKj5n0n5vnABBN1UG6IHjr9vDG76zhqSXpfUiqewYQLj6jGaYYNUGQEax_XQnZ6POc5UteDwYqZJXXOA46ULDjo3ICcYDGlhJsflYlgg8E-2Ntee3QWRD9mUt0VOjI4iE5R7OPrzRrVlJos6bLMAcyXP52jc4i5XlQcLn-3PeJ1Tovstu5vaLosvpspa6rbuvtCh4PEyIzkG8GuPGA_J0ajUjulRI",
      phone: "+1 (555) 890-1234",
      interactionsCount: 22,
      totalSpent: 8900
    },
    {
      id: "4",
      name: "David Okoro",
      email: "david.o@globalvision.com",
      status: "Active",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAm8ZcXrkssaHA7zBZn2qabIVmxUK-rFiGOrkvTTqaFKh5gX7kvSjnI3EuVQfBKIOYXUGrEjGN6pAB2QD8G5Nj7hR2AlWlR4KSjCKoFHbk_BxqrYZZLqHTWSeIY4cOpfVxOl7W3wM4N2RUplXOhtIAacp90QGdFmnKw8MLouVWEjpIwimJK7JpP02eGO64_p2LaonF72m4hCNs8mRXqZCPmms6U2drek7-uYo3pZ42sjy_SmGGknR4cCb1zKsLmZu7QCSuaVnjUP74",
      phone: "+1 (555) 345-6789",
      interactionsCount: 8,
      totalSpent: 2450
    }
  ];

  const handleMessageUser = (client: Customer) => {
    alert(`Composition channel: Direct SMTP message pipeline prepared for ${client.name} (${client.email}). Ready to ship content!`);
  };

  const handleCallUser = (client: Customer) => {
    alert(`Interaction logs: Calling ${client.name} at ${client.phone || "No phone listed"}... Connection established.`);
  };

  // Searching filter logic
  const filteredCustomers = mockCustomers.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-md mx-auto space-y-6 pt-4 pb-12">
      {/* Search and Filters Section */}
      <section className="flex flex-col gap-4">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-4 text-brand-on-surface-variant w-5 h-5 pointer-events-none" />
          <input
            id="crm-search-input"
            className="w-full pl-12 pr-4 py-4 bg-brand-surface-high border-none rounded-2xl text-white font-sans text-sm foc:outline-none focus:ring-1 focus:ring-brand-primary placeholder:text-brand-on-surface-variant/50 transition-all focus:outline-none"
            placeholder="Search customers..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <h2 className="font-headline text-lg font-bold text-white">Customer Directory</h2>
          
          {/* Interactive filter dropdown list toggle */}
          <div className="relative">
            <select
              id="crm-filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="appearance-none flex items-center gap-1.5 px-4 py-2 bg-brand-surface-highest/60 hover:bg-brand-surface-highest rounded-xl text-brand-primary font-headline text-xs font-semibold border-none cursor-pointer pr-8 focus:outline-none focus:ring-1 focus:ring-brand-primary"
            >
              <option value="All">All Contacts</option>
              <option value="Active">Active Only</option>
              <option value="Lead">Leads Only</option>
              <option value="Inactive">Inactive Only</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-primary pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Stats Bento Cards */}
      <section className="grid grid-cols-2 gap-4">
        <div 
          onClick={() => setStatusFilter("Active")}
          className={`glass-card p-5 rounded-2xl flex flex-col gap-1 cursor-pointer transition-all border ${
            statusFilter === "Active" ? "border-brand-secondary/35 bg-brand-secondary/5" : "border-brand-outline/10"
          }`}
        >
          <span className="font-headline text-[10px] font-bold uppercase tracking-widest text-brand-on-surface-variant">Active</span>
          <span className="font-headline text-2xl font-bold text-brand-secondary">1,284</span>
        </div>
        <div 
          onClick={() => setStatusFilter("Lead")}
          className={`glass-card p-5 rounded-2xl flex flex-col gap-1 cursor-pointer transition-all border ${
            statusFilter === "Lead" ? "border-brand-primary/35 bg-brand-primary/5" : "border-brand-outline/10"
          }`}
        >
          <span className="font-headline text-[10px] font-bold uppercase tracking-widest text-brand-on-surface-variant">Leads</span>
          <span className="font-headline text-2xl font-bold text-brand-primary">492</span>
        </div>
      </section>

      {/* Structured Customer List */}
      <section className="flex flex-col gap-3">
        {filteredCustomers.map((user) => {
          let badgeClass = "bg-brand-primary/10 text-brand-primary";
          if (user.status === "Active") badgeClass = "bg-brand-secondary/10 text-brand-secondary";
          if (user.status === "Inactive") badgeClass = "bg-brand-error/15 text-brand-error";

          return (
            <motion.div
              id={`crm-client-${user.id}`}
              layoutId={`client-card-${user.id}`}
              key={user.id}
              onClick={() => setSelectedCustomer(user)}
              className="glass-card p-4 rounded-2xl flex items-center justify-between hover:bg-brand-surface-high/20 active:scale-99 transition-all cursor-pointer border border-brand-outline/5"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    alt={user.name}
                    className="w-12 h-12 rounded-xl object-cover"
                    src={user.avatar}
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-brand-surface rounded-full ${
                    user.status === "Active" ? "bg-brand-secondary" : user.status === "Lead" ? "bg-brand-primary" : "bg-brand-error"
                  }`} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline text-xs font-bold text-white tracking-tight">{user.name}</span>
                  <span className="text-brand-on-surface-variant text-[11px] truncate max-w-[170px] font-sans mt-0.5">{user.email}</span>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full font-headline text-[10px] font-bold uppercase tracking-wide ${badgeClass}`}>
                {user.status}
              </span>
            </motion.div>
          );
        })}

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12 glass-card rounded-2xl">
            <Users className="w-8 h-8 text-brand-outline/40 mx-auto mb-2" />
            <p className="font-sans text-xs text-brand-on-surface-variant font-medium">No customers match your filtering query.</p>
          </div>
        )}
      </section>

      {/* Details Slide Sheet Drawer Modal */}
      <AnimatePresence>
        {selectedCustomer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end"
            onClick={() => setSelectedCustomer(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="bg-brand-surface border-t border-brand-outline/15 rounded-t-[32px] p-6 flex flex-col gap-5 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag Handle shape design */}
              <div 
                onClick={() => setSelectedCustomer(null)}
                className="w-12 h-1.5 bg-brand-outline/25 rounded-full self-center mb-2 cursor-pointer hover:bg-brand-outline/40 transition-colors" 
              />

              {/* Profile card metadata details */}
              <div className="flex items-center gap-4">
                <img
                  alt={selectedCustomer.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-brand-primary/20"
                  src={selectedCustomer.avatar}
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <h3 className="font-headline text-lg font-bold text-white">{selectedCustomer.name}</h3>
                  <p className="font-sans text-xs text-brand-on-surface-variant mt-0.5">{selectedCustomer.email}</p>
                  
                  <span className={`mt-2 font-headline text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit ${
                    selectedCustomer.status === "Active" 
                      ? "bg-brand-secondary/15 text-brand-secondary" 
                      : selectedCustomer.status === "Lead" 
                        ? "bg-brand-primary/15 text-brand-primary" 
                        : "bg-brand-error/15 text-brand-error"
                  }`}>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>

              {/* CRM interactive Buttons message call */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                <button
                  id="crm-btn-message"
                  type="button"
                  onClick={() => handleMessageUser(selectedCustomer)}
                  className="flex flex-col items-center gap-1 p-4 bg-brand-surface-high/40 rounded-2xl border border-brand-outline/5 hover:bg-brand-surface-high/60 transition-all cursor-pointer"
                >
                  <Mail className="w-5 h-5 text-brand-primary mb-1" />
                  <span className="font-headline text-xs font-semibold text-white">Message</span>
                </button>
                <button
                  id="crm-btn-call"
                  type="button"
                  onClick={() => handleCallUser(selectedCustomer)}
                  className="flex flex-col items-center gap-1 p-4 bg-brand-surface-high/40 rounded-2xl border border-brand-outline/5 hover:bg-brand-surface-high/60 transition-all cursor-pointer"
                >
                  <Phone className="w-5 h-5 text-brand-secondary mb-1" />
                  <span className="font-headline text-xs font-semibold text-white">Call</span>
                </button>
              </div>

              {/* Quick Actions List section */}
              <div className="flex flex-col gap-3">
                <h4 className="font-headline text-[10px] font-bold text-brand-primary uppercase tracking-widest px-1">Quick Actions</h4>
                
                <div className="flex flex-col gap-2">
                  <div 
                    onClick={() => alert(`Showing interaction history for ${selectedCustomer.name}... found 12 logged events.`)}
                    className="flex items-center justify-between p-4 bg-brand-surface-high/20 hover:bg-brand-surface-high/40 rounded-xl transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <History className="w-4 h-4 text-brand-tertiary" />
                      <span className="font-headline text-xs text-white">Interaction History</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-brand-on-surface-variant" />
                  </div>

                  <div 
                    onClick={() => alert(`Invoice list generated. Customers spent: $${selectedCustomer.totalSpent || 0} total.`)}
                    className="flex items-center justify-between p-4 bg-brand-surface-high/20 hover:bg-brand-surface-high/40 rounded-xl transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Receipt className="w-4 h-4 text-brand-secondary" />
                      <span className="font-headline text-xs text-white">Invoice History</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-brand-on-surface-variant" />
                  </div>

                  <div 
                    onClick={() => alert(`Edit profile trigger for ${selectedCustomer.name} activated.`)}
                    className="flex items-center justify-between p-4 bg-brand-surface-high/20 hover:bg-brand-surface-high/40 rounded-xl transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <UserCheck className="w-4 h-4 text-brand-primary" />
                      <span className="font-headline text-xs text-white">Edit Profile</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-brand-on-surface-variant" />
                  </div>
                </div>
              </div>

              {/* Close controls */}
              <button
                id="crm-sheet-close"
                type="button"
                className="mt-4 w-full py-4 bg-brand-primary-container text-white font-headline text-sm font-bold rounded-xl active:scale-98 transition-all cursor-pointer hover:opacity-90"
                onClick={() => setSelectedCustomer(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
