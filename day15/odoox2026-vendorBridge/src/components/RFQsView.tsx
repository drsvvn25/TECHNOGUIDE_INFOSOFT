import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Trash2, 
  Plus, 
  UploadCloud, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  CheckCircle, 
  X,
  FileSpreadsheet
} from 'lucide-react';
import { Vendor, RFQ, LineItem } from '../types';

interface RFQsViewProps {
  vendors: Vendor[];
  rfqs: RFQ[];
  onAddRFQ: (rfq: RFQ) => void;
}

export default function RFQsView({ vendors, rfqs, onAddRFQ }: RFQsViewProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('2024-06-30');
  const [currency, setCurrency] = useState('USD - United States Dollar');
  
  // Dynamic Line Items rows State
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', name: 'ThinkPad X1 Carbon Gen 11', description: 'i7-1355U, 16GB RAM, 512GB SSD', qty: 25, unit: 'Units' }
  ]);

  // Selected Vendors Assigned
  const [assignedVendors, setAssignedVendors] = useState<string[]>([]);
  
  // Attachments State
  const [attachments, setAttachments] = useState<{ name: string; size: string; status: 'uploading' | 'done' }[]>([
    { name: 'technical_specifications.docx', size: '1.2 MB', status: 'done' }
  ]);

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Stepper Header helper
  const steps = [
    { num: 1, label: 'Basic Info' },
    { num: 2, label: 'Line Items' },
    { num: 3, label: 'Supplier Sourcing' },
    { num: 4, label: 'Requirements File' }
  ];

  const handleAddRow = () => {
    const newId = (lineItems.length + 1).toString();
    setLineItems([...lineItems, { id: newId, name: '', description: '', qty: 1, unit: 'Units' }]);
  };

  const handleRemoveRow = (id: string) => {
    if (lineItems.length <= 1) return;
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const handleRowChange = (id: string, field: keyof LineItem, val: any) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        return { ...item, [field]: val };
      }
      return item;
    }));
  };

  const toggleVendorSelection = (vendorId: string) => {
    if (assignedVendors.includes(vendorId)) {
      setAssignedVendors(assignedVendors.filter(id => id !== vendorId));
    } else {
      setAssignedVendors([...assignedVendors, vendorId]);
    }
  };

  // Drag and Drop simulation handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
      
      const newFile = { 
        name: file.name, 
        size: `${sizeInMB} MB`, 
        status: 'uploading' as const 
      };
      
      setAttachments([...attachments, newFile]);

      // Simulate completion progression bar checkmark
      setTimeout(() => {
        setAttachments(prev => prev.map(f => f.name === file.name ? { ...f, status: 'done' } : f));
      }, 1500);
    }
  };

  const handlePublishRFQ = () => {
    if (!title) return;

    const newRFQ: RFQ = {
      id: `RFQ-${Math.floor(100 + Math.random() * 900)}`,
      title,
      description,
      status: 'Published',
      dateCreated: new Date().toISOString().split('T')[0],
      deadline,
      currency,
      lineItems,
      assignedVendors,
      attachments: attachments.map(a => ({ name: a.name, size: a.size }))
    };

    onAddRFQ(newRFQ);

    // Reset sequence views
    setTitle('');
    setDescription('');
    setLineItems([{ id: '1', name: 'ThinkPad X1 Carbon Gen 11', description: 'i7-1355U, 16GB RAM, 512GB SSD', qty: 25, unit: 'Units' }]);
    setAssignedVendors([]);
    setAttachments([{ name: 'technical_specifications.docx', size: '1.2 MB', status: 'done' }]);
    setActiveStep(1);

    // Fire success trigger feedback toast
    setIsToastOpen(true);
    setTimeout(() => setIsToastOpen(false), 4000);
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-300">
      
      {/* Toast alert */}
      <AnimatePresence>
        {isToastOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 border-primary/20 font-mono text-xs"
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>Success: Request for Quotation (RFQ) published and dispatched to suppliers!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-end border-b border-outline-variant/30 pb-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">Request for Quotations</h2>
          <p className="text-on-surface-variant text-sm mt-1">Configure and release public RFQs to vetted business vendors.</p>
        </div>
        
        <div className="bg-surface-container-high/60 border border-outline-variant px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold text-on-surface flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-primary" /> ACTIVE SYSTEM: {rfqs.length} PUBLISHED
        </div>
      </div>

      {/* STEP INDICATORS PROGRESS TIMELINE BAR */}
      <div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl flex items-center justify-between font-mono">
        {steps.map((st, i) => (
          <React.Fragment key={st.num}>
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${activeStep >= st.num ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container border-outline-variant text-outline'}`}>
                {st.num}
              </span>
              <span className={`text-[11px] font-semibold text-xs tracking-tight ${activeStep >= st.num ? 'text-white' : 'text-outline/40'}`}>
                {st.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-grow h-[1px] mx-4 transition-all ${activeStep > st.num ? 'bg-primary' : 'bg-outline-variant/35'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* STEP BODY WRAPPER FRAMEWORK */}
      <div className="bg-surface-container-low border border-outline-variant rounded-xl p-6 shadow-xl">
        
        {/* Step 1: Basic Info */}
        {activeStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="text-sm font-bold text-white uppercase font-mono mb-1">Step 1: RFQ Sourcing Scope</h3>
              <p className="text-on-surface-variant text-xs mb-4">Establish the formal intent, context documentation, and critical deadline metrics for compliance auditing.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-mono text-[10px] text-outline uppercase">RFQ Sourcing Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Q3 Laboratory Electronic Diagnostics Procurement"
                  className="w-full h-11 bg-surface-container-lowest border border-outline-variant text-on-surface font-sans text-xs rounded-lg px-4 focus:outline-none focus:border-secondary transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] text-outline uppercase">Sourcing Context &amp; Details</label>
                <textarea 
                  rows={4}
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide precise descriptions concerning regulatory approvals, dimensions, quality metrics, shipping conditions, packaging criteria..."
                  className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-sans text-xs rounded-lg p-4 focus:outline-none focus:border-secondary transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-outline uppercase">Submissions Deadline Date</label>
                  <input 
                    type="date" 
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full h-11 bg-surface-container-lowest border border-outline-variant text-on-surface font-sans text-xs rounded-lg px-4"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-outline uppercase">Accepted Currency Model</label>
                  <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full h-11 bg-surface-container-lowest border border-outline-variant text-on-surface font-sans text-xs rounded-lg px-4"
                  >
                    <option value="USD - United States Dollar">USD - United States Dollar</option>
                    <option value="INR - Indian Rupee">INR - Indian Rupee</option>
                    <option value="EUR - Euro Area">EUR - Euro Area</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Line Items Row additions */}
        {activeStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono mb-1">Step 2: Line Items Breakdown</h3>
                <p className="text-on-surface-variant text-xs">Define row aggregates of hardware components. Add as many rows as necessary.</p>
              </div>
              <button 
                type="button"
                onClick={handleAddRow}
                className="bg-primary/25 cursor-pointer hover:bg-primary/35 text-primary border border-primary/40 px-3.5 py-1.5 rounded-lg font-mono text-[10px] uppercase font-bold flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Add Row
              </button>
            </div>

            <div className="border border-outline-variant rounded-xl overflow-hidden shadow-md">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-container-high font-mono text-[9px] text-outline uppercase border-b border-outline-variant">
                    <th className="p-3 w-10 text-center">#</th>
                    <th className="p-3 text-left">Item Name / SKU</th>
                    <th className="p-3 text-left">Specification Description</th>
                    <th className="p-3 w-28 text-left">Quantity</th>
                    <th className="p-3 w-28 text-left">Unit</th>
                    <th className="p-3 w-12 text-center">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30 text-xs font-sans">
                  {lineItems.map((item, idx) => (
                    <tr key={item.id} className="bg-surface-container-lowest hover:bg-surface-variant/10 transition-colors">
                      <td className="p-3 text-center font-mono text-[10px] text-outline font-bold">{idx + 1}</td>
                      <td className="p-3">
                        <input 
                          type="text" 
                          required
                          value={item.name} 
                          onChange={(e) => handleRowChange(item.id, 'name', e.target.value)}
                          placeholder="ThinkPad Mouse Type-C"
                          className="w-full bg-transparent border-b border-outline-variant/60 focus:border-secondary py-1 px-1 text-white text-xs text-semibold focus:outline-none"
                        />
                      </td>
                      <td className="p-3">
                        <input 
                          type="text" 
                          value={item.description} 
                          onChange={(e) => handleRowChange(item.id, 'description', e.target.value)}
                          placeholder="Ergonomic Bluetooth, custom clicks..."
                          className="w-full bg-transparent border-b border-outline-variant/60 focus:border-secondary py-1 px-1 text-on-surface-variant text-xs focus:outline-none"
                        />
                      </td>
                      <td className="p-3">
                        <input 
                          type="number" 
                          value={item.qty} 
                          onChange={(e) => handleRowChange(item.id, 'qty', parseInt(e.target.value) || 1)}
                          className="w-full bg-transparent border-b border-outline-variant/60 focus:border-secondary py-1 px-1 text-white text-xs focus:outline-none"
                        />
                      </td>
                      <td className="p-3">
                        <select 
                          value={item.unit}
                          onChange={(e) => handleRowChange(item.id, 'unit', e.target.value)}
                          className="w-full bg-transparent border-b border-outline-variant/60 focus:border-secondary py-1 text-white text-xs focus:outline-none"
                        >
                          <option value="Units">Units</option>
                          <option value="Kgs">Kgs</option>
                          <option value="Boxes">Boxes</option>
                          <option value="Liters">Liters</option>
                        </select>
                      </td>
                      <td className="p-3 text-center">
                        <button 
                          type="button"
                          onClick={() => handleRemoveRow(item.id)}
                          className="text-on-surface-variant hover:text-error transition-colors p-1 rounded hover:bg-surface-container-highest flex items-center justify-center mx-auto cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Step 3: Sourcing and Selecting target Vendors */}
        {activeStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="text-sm font-bold text-white uppercase font-mono mb-1">Step 3: Dispatched Invite List</h3>
              <p className="text-on-surface-variant text-xs mb-4">Select which accredited suppliers from the global database will be invited to tender bids against this requirement.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {vendors.map((vendor) => {
                const isSelected = assignedVendors.includes(vendor.id);
                return (
                  <div 
                    key={vendor.id} 
                    onClick={() => toggleVendorSelection(vendor.id)}
                    className={`p-4 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${isSelected ? 'bg-primary/10 border-primary shadow-lg shadow-primary/5' : 'bg-surface-container-lowest border-outline-variant hover:border-outline'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-surface-container-highest border border-outline-variant flex items-center justify-center font-bold text-primary text-xs">
                        {vendor.code}
                      </div>
                      <div>
                        <span className="font-bold text-white text-xs block">{vendor.name}</span>
                        <span className="text-[10px] text-on-surface-variant italic font-medium">{vendor.category}</span>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${isSelected ? 'bg-primary border-primary text-on-primary' : 'bg-surface-container-high border-outline-variant'}`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-surface-container-highest/30 border border-outline-variant/60 rounded-xl flex items-center justify-between text-[11px] font-mono">
              <span className="text-on-surface-variant">Assigned Vendors Count:</span>
              <span className="text-primary font-bold">{assignedVendors.length} accredited companies</span>
            </div>
          </div>
        )}

        {/* Step 4: File Requirements Drag Drop Attachments */}
        {activeStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-sm font-bold text-white uppercase font-mono mb-1">Step 4: Supporting Attestation Files</h3>
              <p className="text-on-surface-variant text-xs mb-4">Attach diagrams, schedules, bill-of-materials, or technical plans for detailed pricing reviews.</p>
            </div>

            {/* Custom Interactive File Drag Box */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center transition-all ${isDragOver ? 'border-primary bg-primary/5 shadow-2xl scale-[0.99]' : 'border-outline-variant hover:border-outline'}`}
            >
              <div className="w-12 h-12 bg-primary/15 p-3 rounded-full text-primary mb-3">
                <UploadCloud className="w-6 h-6 animate-bounce" />
              </div>

              <span className="font-bold text-white text-xs block mb-1">Drag and drop technical files here</span>
              <p className="text-[10px] text-on-surface-variant max-w-xs mb-4 leading-normal">
                Supports PDF, SolidWorks, Microsoft Excel, DOCX formats. Maximum size constraint: 25MB per file.
              </p>

              <label className="bg-primary hover:brightness-105 px-4 py-2 font-mono text-[10px] uppercase font-bold text-on-primary rounded-lg transition-colors cursor-pointer block">
                Browse Files
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const file = e.target.files[0];
                      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
                      const newFile = { name: file.name, size: `${sizeInMB} MB`, status: 'uploading' as const };
                      setAttachments([...attachments, newFile]);
                      
                      setTimeout(() => {
                        setAttachments(prev => prev.map(f => f.name === file.name ? { ...f, status: 'done' } : f));
                      }, 1300);
                    }
                  }}
                />
              </label>
            </div>

            {/* Attachment Status Lists */}
            <div className="space-y-2">
              <span className="font-mono text-[9px] text-outline uppercase font-bold tracking-wider">Attached Materials logs ({attachments.length})</span>
         
              {attachments.map((file, i) => (
                <div key={i} className="p-3 bg-surface-container-lowest border border-outline-variant/60 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="text-primary w-5 h-5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-white text-[11px] block">{file.name}</span>
                      <span className="text-[9px] text-outline font-mono block mt-0.5">{file.size}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {file.status === 'uploading' ? (
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full border border-primary border-t-transparent animate-spin"></span>
                        <span className="font-mono text-[9px] text-primary">SENDING...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 p-1 px-2.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-[9px] font-bold font-mono">
                        <Check className="w-3 h-3 stroke-[3]" /> UPLOADED
                      </div>
                    )}

                    <button 
                      type="button" 
                      onClick={() => setAttachments(attachments.filter(f => f.name !== file.name))}
                      className="text-on-surface-variant hover:text-white transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTROLS BAR BOTTOM */}
        <div className="flex justify-between items-center pt-6 mt-6 border-t border-outline-variant/35">
          <button 
            type="button"
            onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
            disabled={activeStep === 1}
            className="bg-surface-container-high/60 cursor-pointer text-on-surface border border-outline-variant hover:bg-surface-variant px-5 py-2.5 rounded-lg font-mono text-xs flex items-center gap-2 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>

          {activeStep < 4 ? (
            <button 
              type="button"
              onClick={() => {
                if (activeStep === 1 && !title) return; // simple validations
                setActiveStep(prev => Math.min(4, prev + 1));
              }}
              className="bg-primary cursor-pointer text-on-primary hover:brightness-105 active:scale-95 px-6 py-2.5 rounded-lg font-mono text-xs font-bold flex items-center gap-2 transition-all"
            >
              Continue <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button 
              type="button"
              onClick={handlePublishRFQ}
              disabled={!title}
              className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white px-7 py-3 rounded-xl font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-primary/10 active:scale-95 transition-all"
            >
              Publish &amp; Invite Suppliers <Check className="w-4 h-4 stroke-[3]" />
            </button>
          )}
        </div>

      </div>

      {/* RECENTLY PUBLISHED TENDERS LIST */}
      <section className="space-y-3">
        <h3 className="font-mono text-xs text-white uppercase tracking-wider font-bold">Active RFQ Dispatch Pipeline ({rfqs.length})</h3>
        
        <div className="space-y-4">
          {rfqs.map((rfq) => (
            <div key={rfq.id} className="bg-surface-container-low border border-outline-variant p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/30 transition-all">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="bg-primary/10 border border-primary/25 px-2.5 py-0.5 rounded text-[10px] font-bold font-mono text-primary leading-none uppercase">{rfq.id}</span>
                  <span className="bg-surface-container-high/80 text-[10px] text-on-surface-variant px-2 py-0.5 rounded font-mono font-medium">{rfq.status}</span>
                </div>
                <h4 className="text-white text-sm font-bold leading-snug">{rfq.title}</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2 max-w-2xl">{rfq.description}</p>
                
                <div className="flex flex-wrap gap-x-6 gap-y-1.5 pt-1.5 text-[10px] font-mono text-outline">
                  <span>Deadline: <strong>{rfq.deadline}</strong></span>
                  <span>Currency: <strong>{rfq.currency.split(' - ')[0]}</strong></span>
                  <span>Items: <strong>{rfq.lineItems.length} rows</strong></span>
                  <span>Invitees: <strong>{rfq.assignedVendors.length} vendors</strong></span>
                </div>
              </div>

              <div className="md:border-l border-outline-variant/35 md:pl-6 flex flex-col justify-center min-w-[160px] gap-2">
                <div className="font-mono text-right hidden md:block">
                  <span className="text-[10px] block text-outline uppercase tracking-wider">Date Published</span>
                  <span className="text-white text-xs font-semibold block mt-0.5">{rfq.dateCreated}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
