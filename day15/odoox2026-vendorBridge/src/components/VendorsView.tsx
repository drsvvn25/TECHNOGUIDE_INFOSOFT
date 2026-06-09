import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  RefreshCw, 
  Filter, 
  Star, 
  X, 
  User, 
  AlertTriangle,
  Mail,
  SlidersHorizontal,
  FileCheck2,
  BookmarkCheck
} from 'lucide-react';
import { Vendor } from '../types';

interface VendorsViewProps {
  vendors: Vendor[];
  onAddVendor: (vendor: Omit<Vendor, 'id'>) => void;
}

export default function VendorsView({ vendors, onAddVendor }: VendorsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('Any Status');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProfileVendor, setSelectedProfileVendor] = useState<Vendor | null>(null);

  // Form Fields State
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('IT Services');
  const [newGst, setNewGst] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newStatus, setNewStatus] = useState<'active' | 'inactive' | 'blacklisted'>('active');
  const [newRating, setNewRating] = useState(4.0);

  const categories = ['All Categories', 'IT Services', 'Logistics', 'Raw Materials', 'Hardware'];
  const statuses = ['Any Status', 'Active', 'Inactive', 'Blacklisted'];

  // Apply real-time dynamic filters
  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.gstNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || v.category === selectedCategory;
    const matchesStatus = selectedStatus === 'Any Status' || v.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedStatus('Any Status');
  };

  const handleCreateVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newGst || !newContact) return;

    onAddVendor({
      name: newName,
      code: newName.substring(0, 2).toUpperCase(),
      category: newCategory,
      gstNumber: newGst,
      contactName: newContact,
      contactEmail: newEmail || `${newContact.toLowerCase().replace(' ', '')}@company.com`,
      status: newStatus,
      rating: newRating
    });

    // Reset fields
    setNewName('');
    setNewGst('');
    setNewContact('');
    setNewEmail('');
    setNewStatus('active');
    setNewRating(4.0);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-300">
      
      {/* Screen Header row */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">Vendors</h2>
          <nav className="flex items-center text-xs text-on-surface-variant font-mono mt-1">
            <span>Directory</span>
            <span className="mx-2 text-outline-variant">/</span>
            <span className="text-primary">All Vendors</span>
          </nav>
        </div>
        
        <button 
          type="button"
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white px-5 py-3 rounded-lg flex items-center gap-2 font-mono text-xs font-bold shadow-md active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add New Vendor
        </button>
      </div>

      {/* SEARCH AND CONTROLS ROW PANEL */}
      <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl flex flex-wrap gap-4 items-center">
        
        {/* Input Text matched typing search */}
        <div className="flex-1 min-w-[250px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
          <input 
            type="text"
            placeholder="Search by name, contact, or GST..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant pl-10 pr-4 py-2.5 rounded-lg text-xs focus:ring-1 focus:ring-secondary-container focus:outline-none focus:border-secondary transition-colors text-white"
          />
        </div>

        {/* Category select dropdown */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-outline">
          <span className="uppercase tracking-wider">Category:</span>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-secondary transition-colors"
          >
            {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
          </select>
        </div>

        {/* Status select dropdown */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-outline">
          <span className="uppercase tracking-wider">Status:</span>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-secondary transition-colors"
          >
            {statuses.map((st, i) => <option key={i} value={st}>{st}</option>)}
          </select>
        </div>

        {/* Refresh / reset action trigger */}
        <button 
          type="button"
          onClick={handleResetFilters}
          className="bg-surface-container-highest/60 text-on-surface-variant border border-outline-variant p-2.5 rounded-lg hover:bg-surface-variant transition-colors cursor-pointer"
          title="Reset filters"
        >
          <RefreshCw className="w-4 h-4 text-on-surface" />
        </button>
      </div>

      {/* CORE SUPPLIERS DIRECTORY TABLE VIEW */}
      <div className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-surface-container-high border-b border-outline-variant font-mono text-[10px] text-outline uppercase tracking-wider">
                <th className="px-5 py-4">Company Name</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">GST Number</th>
                <th className="px-5 py-4">Contact Person</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Rating</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-sans text-xs">
              {filteredVendors.map((vendor) => {
                
                const statusStyles: Record<string, string> = {
                  'active': 'bg-primary/10 text-primary border-primary/20',
                  'inactive': 'bg-outline/10 text-outline border-outline/20',
                  'blacklisted': 'bg-error/10 text-error border-error/20'
                };

                return (
                  <tr key={vendor.id} className="hover:bg-surface-variant/20 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-secondary-container/20 border border-outline-variant flex items-center justify-center text-primary font-bold">
                          {vendor.code}
                        </div>
                        <span className="font-semibold text-white text-xs">{vendor.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-on-surface-variant font-medium">{vendor.category}</td>
                    <td className="px-5 py-4 text-outline font-mono text-[11px]">{vendor.gstNumber}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col">
                        <span className="text-white font-medium">{vendor.contactName}</span>
                        <span className="text-[10px] text-outline">{vendor.contactEmail}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${statusStyles[vendor.status]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${vendor.status === 'active' ? 'bg-primary animate-pulse' : vendor.status === 'inactive' ? 'bg-outline' : 'bg-error'}`}></span>
                        {vendor.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <div className="flex text-tertiary">
                          {Array.from({ length: 5 }).map((_, stIdx) => (
                            <Star 
                              key={stIdx} 
                              className="w-3.5 h-3.5 fill-current" 
                              style={{ fillOpacity: stIdx < Math.floor(vendor.rating) ? 1 : 0.15 }} 
                            />
                          ))}
                        </div>
                        <span className="ml-1 text-white text-[11px] font-bold">{vendor.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          type="button"
                          onClick={() => setSelectedProfileVendor(vendor)}
                          className="text-[10px] font-mono leading-none tracking-tight uppercase font-bold text-secondary border border-secondary/30 px-2.5 py-1.5 rounded hover:bg-secondary/10 transition-colors cursor-pointer"
                        >
                          View Profile
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredVendors.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center font-mono text-xs text-on-surface-variant">
                    No matching vendors found in directory. Modify your query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination simulated footer banner */}
        <div className="bg-surface-container px-5 py-3 border-t border-outline-variant flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
          <span>Showing {filteredVendors.length} of {vendors.length} vendors</span>
          <div className="flex gap-1">
            <button type="button" disabled className="px-2 py-1 bg-surface-container-high/40 rounded text-[10px] disabled:opacity-40">PREV</button>
            <button type="button" className="px-2.5 py-1 bg-primary text-on-primary rounded text-[10px] font-bold">1</button>
            <button type="button" disabled className="px-2 py-1 bg-surface-container-high/40 rounded text-[10px] disabled:opacity-40">NEXT</button>
          </div>
        </div>
      </div>

      {/* THREE BENTO INTEGRATED BLOCKS: QUICK ANALYSIS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Box 1 */}
        <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl flex flex-col justify-between">
          <h4 className="font-mono text-[10px] text-outline uppercase tracking-wider mb-2">Vendor Velocity</h4>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl text-primary font-bold font-mono">12</p>
              <p className="text-xs text-on-surface-variant font-sans">New applicants vetted this month</p>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center text-[10px] font-mono font-bold text-primary">
              +14%
            </div>
          </div>
        </div>

        {/* Box 2 */}
        <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl relative overflow-hidden group flex flex-col justify-between">
          <div className="relative z-10 space-y-1">
            <h4 className="font-mono text-[10px] text-outline uppercase tracking-wider mb-2">Sourcing Performance</h4>
            <p className="text-xs text-white font-medium flex items-center gap-1">
              <AlertTriangle className="w-4 h-4 text-error" /> 3 suppliers flagged under performance review
            </p>
            <div className="flex gap-1.5 pt-2">
              <span className="h-1 flex-1 bg-error rounded-full block"></span>
              <span className="h-1 flex-1 bg-error/35 rounded-full block"></span>
              <span className="h-1 flex-1 bg-error/15 rounded-full block"></span>
            </div>
          </div>
        </div>

        {/* Box 3 */}
        <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl flex flex-col justify-between h-28">
          <div>
            <h4 className="font-mono text-[9px] text-outline uppercase tracking-wider mb-0.5">Average Quality Index</h4>
            <p className="font-sans text-2xl text-white font-extrabold">98.2%</p>
          </div>
          <div className="h-8 flex items-end gap-[1px]">
            {Array.from({ length: 8 }).map((_, i) => (
              <span 
                key={i} 
                className={`flex-1 rounded-t-sm ${i === 7 ? 'bg-primary h-full' : 'bg-primary/40'}`} 
                style={{ height: `${30 + (i * 9)}%` }}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* POPUP MODAL: ADD SUPPLIER FORM */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-surface-container border border-outline-variant rounded-xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-4 bg-surface-container-high border-b border-outline-variant flex justify-between items-center">
                <span className="text-white font-bold text-xs uppercase font-mono">Introduce New Corporate Supplier</span>
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="p-1 hover:bg-surface-container-highest rounded text-on-surface-variant hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateVendor} className="p-6 space-y-4 text-xs font-sans">
                
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-outline uppercase">Company / Supplier Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Apex Industrial Steel Ltd" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 text-white text-xs focus:ring-1 focus:ring-secondary-container focus:outline-none focus:border-secondary transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-outline uppercase">Sourcing Category</label>
                    <select 
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 text-white text-xs"
                    >
                      <option value="IT Services">IT Services</option>
                      <option value="Logistics">Logistics</option>
                      <option value="Raw Materials">Raw Materials</option>
                      <option value="Hardware">Hardware</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-outline uppercase">GST Registration Number</label>
                    <input 
                      type="text" 
                      required
                      placeholder="GST-XX-ZZZZZZ-X" 
                      value={newGst}
                      onChange={(e) => setNewGst(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 text-white text-xs focus:ring-1 focus:ring-secondary-container"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-outline uppercase">Authorized Agent Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Liam Neeson" 
                      value={newContact}
                      onChange={(e) => setNewContact(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-outline uppercase">Agent Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g. liam@apexsteel.com" 
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 text-white text-xs focus:ring-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-outline uppercase">Initial Status Badge</label>
                    <select 
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as any)}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 text-white text-xs"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="blacklisted">Blacklisted</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-outline uppercase">Quality Rating (1.0 - 5.0)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      max="5.0" 
                      min="1.0" 
                      value={newRating}
                      onChange={(e) => setNewRating(parseFloat(e.target.value))}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 text-white text-xs focus:ring-1"
                    />
                  </div>
                </div>

                <div className="p-4 bg-surface-container-high/60 border-t border-outline-variant/60 flex justify-end gap-2 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 hover:bg-surface-container-highest text-on-surface rounded font-mono text-[10px] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2 bg-primary text-on-primary font-mono text-[10px] font-bold rounded hover:brightness-105 transition-all cursor-pointer"
                  >
                    Register Vendor
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DETAILED PROFILE POPUP VIEW MODAL */}
      <AnimatePresence>
        {selectedProfileVendor && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-surface-container border border-outline-variant rounded-xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Header profile */}
              <div className="p-4 bg-surface-container-high border-b border-outline-variant flex justify-between items-center">
                <span className="font-mono text-xs text-secondary font-bold uppercase">Vendor Audit Profile Card</span>
                <button 
                  type="button" 
                  onClick={() => setSelectedProfileVendor(null)}
                  className="p-1 hover:bg-surface-container-highest rounded text-on-surface-variant hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body stats */}
              <div className="p-6 space-y-4 text-xs font-sans">
                <div className="flex items-center gap-4 border-b border-outline-variant/35 pb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl text-primary font-bold text-xl flex items-center justify-center">
                    {selectedProfileVendor.code}
                  </div>
                  <div>
                    <h3 className="text-white text-md font-bold">{selectedProfileVendor.name}</h3>
                    <span className="text-on-surface-variant font-medium text-[11px] block">{selectedProfileVendor.category}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-outline uppercase block">Contact Representative</span>
                    <span className="text-white font-semibold flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-primary" /> {selectedProfileVendor.contactName}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-outline uppercase block">GST Registration</span>
                    <span className="text-white font-mono">{selectedProfileVendor.gstNumber}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-outline uppercase block">Communication Endpoint</span>
                    <span className="text-white font-mono break-all flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-secondary" /> {selectedProfileVendor.contactEmail}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-outline uppercase block">Live Sourcing Rating</span>
                    <span className="text-white font-bold flex items-center gap-1 bg-tertiary-container/10 px-2 py-0.5 rounded border border-tertiary-container/20 w-max">
                      <Star className="w-3.5 h-3.5 fill-tertiary text-tertiary" /> {selectedProfileVendor.rating.toFixed(1)} / 5.0
                    </span>
                  </div>
                </div>

                {/* Secure Compliance rating audit */}
                <div className="p-3 bg-surface-container-lowest border border-outline-variant/50 rounded-lg flex items-center gap-3">
                  <BookmarkCheck className="text-primary w-5 h-5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-white text-[11px] block">Verified Procurement Supplier</span>
                    <p className="text-[10px] text-on-surface-variant leading-relaxed">
                      This entity passes standard biometric and secure enterprise corporate auditing protocol validation tests.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions footer */}
              <div className="p-4 bg-surface-container-high/60 border-t border-outline-variant/60 flex justify-end">
                <button 
                  type="button" 
                  onClick={() => setSelectedProfileVendor(null)}
                  className="px-5 py-2 bg-primary text-on-primary font-mono text-[10px] font-bold rounded cursor-pointer"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
