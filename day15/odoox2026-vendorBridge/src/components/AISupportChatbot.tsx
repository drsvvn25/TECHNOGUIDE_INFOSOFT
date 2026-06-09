import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, RefreshCw, Zap, MessageSquare } from 'lucide-react';

interface Msg { id: string; role: 'user' | 'bot'; text: string; }

const KB: { keys: string[]; answer: string }[] = [
  { keys: ['hello','hi','hey','good morning','good evening','greet'],
    answer: "Hello! 👋 Welcome to **VendorBridge ERP**. I'm your 24/7 support assistant.\n\nI can help you with:\n- Vendor management & onboarding\n- Creating & sending RFQs\n- Comparing vendor quotations\n- Purchase order approvals\n- Dashboard & reports\n\nWhat would you like to know?" },
  { keys: ['what is vendorbridge','about','platform','erp','system'],
    answer: "**VendorBridge** is a modern cloud-based ERP procurement platform designed to streamline your entire vendor management lifecycle.\n\n**Key capabilities:**\n- Centralized vendor database\n- Automated RFQ dispatch\n- Smart quotation comparison\n- Multi-level approval workflows\n- Real-time procurement analytics\n\nIt connects procurement teams with suppliers for faster, smarter sourcing decisions." },
  { keys: ['login','sign in','access','password','credential','account'],
    answer: "**Logging into VendorBridge:**\n\n1. Go to the VendorBridge homepage\n2. Click **'Get Started'** or **'Login'**\n3. Enter your registered email & password\n4. Click **Sign In**\n\n**Forgot password?** Use the 'Forgot Password' link on the login page to reset via email.\n\nFor new accounts, contact your system administrator for credentials." },
  { keys: ['vendor','add vendor','onboard','supplier','register vendor'],
    answer: "**Managing Vendors in VendorBridge:**\n\n**To add a new vendor:**\n1. Navigate to **Vendors Database** in the sidebar\n2. Click **'+ Add Vendor'** button\n3. Fill in: Company name, contact details, category, compliance docs\n4. Click **Save** — vendor is instantly added to your database\n\n**Vendor details tracked:**\n- Contact information & address\n- Business category & specialization\n- Compliance & certification status\n- Performance rating & history\n- Active/Inactive status" },
  { keys: ['rfq','request for quotation','create rfq','send rfq','dispatch','sourcing'],
    answer: "**RFQ (Request for Quotation) Workflow:**\n\n**Creating an RFQ:**\n1. Click **'New RFQ Sourcing'** in the sidebar (or go to RFQs Dispatch tab)\n2. Fill in: Item description, quantity, required date, specifications\n3. Select vendors to send the RFQ to\n4. Set submission deadline\n5. Click **Dispatch RFQ**\n\nVendors receive the RFQ and submit their quotes. All responses are automatically collected in the **Compare Quotes** section." },
  { keys: ['quotation','compare','quote','review','vendor quote','best price'],
    answer: "**Comparing Vendor Quotations:**\n\n1. Go to **Compare Quotes** tab in the sidebar\n2. View all received quotations side-by-side\n3. Compare: Unit price, total value, delivery time, terms\n4. Click **Approve** to accept the best quote\n5. An automatic **Purchase Order** is generated upon approval\n\n**Tips for evaluation:**\n- Check total landed cost (price + delivery)\n- Review vendor performance history\n- Consider lead time vs. price tradeoff" },
  { keys: ['purchase order','po','order','procurement'],
    answer: "**Purchase Orders (PO) in VendorBridge:**\n\nPOs are automatically generated when:\n- A quotation is approved in **Compare Quotes**\n- An approval request is approved in the Dashboard\n\n**PO Status Types:**\n- **Processing** — PO sent to vendor, awaiting confirmation\n- **In Transit** — Goods dispatched by vendor\n- **Delivered** — Order received\n- **Cancelled** — PO voided\n\nView all POs in the **Dashboard** under Purchase Order History." },
  { keys: ['approval','approve','reject','workflow','authorize'],
    answer: "**Approval Workflow:**\n\nVendorBridge uses multi-level approvals for procurement governance.\n\n**How to approve/reject:**\n1. Go to **Dashboard** — scroll to Pending Approvals\n2. Review the request details (vendor, amount, item)\n3. Click ✅ **Approve** or ❌ **Reject**\n\n**On approval:** A Purchase Order is automatically created\n**On rejection:** Request is marked rejected; requester is notified\n\nAll approval actions are logged with timestamps for audit trails." },
  { keys: ['dashboard','overview','stats','summary','home','main'],
    answer: "**VendorBridge Dashboard Overview:**\n\nThe Dashboard is your command center showing:\n\n📊 **Key Metrics:**\n- Total active vendors\n- Open RFQs count\n- Pending approvals\n- Monthly spend analytics\n\n📋 **Sections:**\n- **Purchase Order History** — all recent POs with status\n- **Pending Approvals** — items awaiting your action\n- **Quick Actions** — navigate to any module fast\n\nAccess it anytime via the **Dashboard** option in the sidebar." },
  { keys: ['report','analytics','insight','spend','data'],
    answer: "**Reports & Analytics:**\n\nVendorBridge provides real-time procurement insights:\n\n- **Spend Analysis** — track expenditure by vendor/category\n- **Vendor Performance** — rating trends over time\n- **RFQ Turnaround** — time from dispatch to quote received\n- **PO Fulfillment Rate** — on-time delivery tracking\n\nAccess reports from the **Dashboard** or **Reports** tab. Data updates in real-time as transactions occur." },
  { keys: ['navigate','navigation','menu','sidebar','how to go','where is','find','tab'],
    answer: "**VendorBridge Navigation Guide:**\n\n**Sidebar Menu (left):**\n- 🏠 **Dashboard** — Overview & approvals\n- 👥 **Vendors Database** — Manage all vendors\n- 📋 **RFQs Dispatch** — Create & track RFQs\n- ⚖️ **Compare Quotes** — Review quotations (marked NEW)\n\n**Top Header:**\n- 🔍 Search bar — find vendors, RFQs, orders\n- 🔔 Notifications — system alerts\n- ❓ Support — this chat assistant\n\n**Quick shortcut:** Click **'+ New RFQ Sourcing'** button in sidebar for fast RFQ creation." },
  { keys: ['search','find','filter','look up'],
    answer: "**Search in VendorBridge:**\n\nUse the **Search bar** in the top header to quickly find:\n- Vendors by name or category\n- RFQs by title or date\n- Purchase orders by PO number\n- Quotations by vendor\n\nJust type in the search box and results filter instantly across all modules." },
  { keys: ['logout','sign out','exit','leave'],
    answer: "**To Logout from VendorBridge:**\n\n1. Scroll to the bottom of the **left sidebar**\n2. Click the **Logout** button (red hover)\n3. You'll be returned to the landing page\n\nYour session data is saved automatically. All vendors, RFQs, and POs remain intact for your next login." },
  { keys: ['security','secure','safe','permission','role','access control'],
    answer: "**VendorBridge Security:**\n\n- 🔒 **Secured Terminal** — all sessions are encrypted\n- 👤 **Role-based Access** — control what each user can do\n- 📝 **Audit Trail** — every action is logged with user & timestamp\n- 🛡️ **Approval Gates** — high-value POs require authorization\n\nThe system displays **'SECURED TERMINAL'** badge in the header when your session is active and verified." },
  { keys: ['price','cost','plan','subscription','fee','pricing'],
    answer: "**VendorBridge Pricing:**\n\nFor pricing plans and subscription details, please contact our sales team directly.\n\n📧 **Email:** sales@vendorbridge.com\n📞 **Phone:** Available on our website\n🌐 **Website:** Visit the VendorBridge homepage\n\nWe offer plans for small businesses, mid-market, and enterprise organizations with custom volume pricing." },
  { keys: ['contact','support','help','email','phone','reach'],
    answer: "**Contact VendorBridge Support:**\n\n📧 **Email Support:** support@vendorbridge.com\n💬 **Live Chat:** Use this chat assistant (available 24/7)\n📞 **Phone:** Available on our main website\n📚 **Documentation:** In-app help guides\n\n**For urgent issues:**\nUse the notification bell 🔔 in the top header to check system alerts, or email our support team directly for account-related issues." },
  { keys: ['how','start','begin','first','new user','getting started'],
    answer: "**Getting Started with VendorBridge:**\n\n**Step 1:** Login with your credentials\n**Step 2:** Explore the **Dashboard** for an overview\n**Step 3:** Go to **Vendors Database** → Add your first vendor\n**Step 4:** Create your first **RFQ** using the '+ New RFQ Sourcing' button\n**Step 5:** When vendor quotes arrive, compare them in **Compare Quotes**\n**Step 6:** Approve the best quote → Purchase Order auto-generated!\n\nThat's the complete procurement cycle in VendorBridge. 🎉" },
  { keys: ['thank','thanks','great','good','perfect','awesome','nice','helpful'],
    answer: "You're welcome! 😊 I'm always here to help.\n\nIs there anything else you'd like to know about VendorBridge? Feel free to ask about vendors, RFQs, quotations, purchase orders, or any other feature!" },
  { keys: ['bye','goodbye','see you','later','done'],
    answer: "Goodbye! 👋 Thank you for using VendorBridge support.\n\nHave a productive procurement day! If you need help again, just click the chat button anytime. 🚀" },
];

const QUICK = [
  { label: 'About VendorBridge', q: 'What is VendorBridge?' },
  { label: 'Add a vendor', q: 'How do I add a vendor?' },
  { label: 'Create RFQ', q: 'How do I create an RFQ?' },
  { label: 'Compare quotes', q: 'How do I compare quotations?' },
  { label: 'Approve PO', q: 'How does approval workflow work?' },
  { label: 'Navigation help', q: 'How do I navigate the platform?' },
];

function findAnswer(input: string): string {
  const lower = input.toLowerCase();
  let best = { score: 0, answer: '' };
  for (const entry of KB) {
    const score = entry.keys.filter(k => lower.includes(k)).length;
    if (score > best.score) best = { score, answer: entry.answer };
  }
  if (best.score > 0) return best.answer;
  return "I'm not sure about that specific topic, but I'm here to help! 🤔\n\nYou can ask me about:\n- **Vendor management** — adding, managing suppliers\n- **RFQs** — creating and dispatching requests\n- **Quotations** — comparing and approving vendor quotes\n- **Purchase Orders** — PO creation and tracking\n- **Approvals** — workflow and authorization\n- **Dashboard** — overview and reports\n\nOr type **'getting started'** for a complete platform guide!";
}

function renderText(text: string) {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((seg, j) =>
      seg.startsWith('**') && seg.endsWith('**')
        ? <strong key={j} className="text-white font-semibold">{seg.slice(2,-2)}</strong>
        : <span key={j}>{seg}</span>
    );
    if (line.startsWith('- ')) return <li key={i} className="ml-3 list-disc">{parts.slice(1)}</li>;
    if (line.trim() === '') return <div key={i} className="h-1.5" />;
    return <p key={i} className="leading-relaxed">{parts}</p>;
  });
}

let uid = 0;
const id = () => `m${++uid}`;

export default function AISupportChatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, typing]);

  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([{ id: id(), role: 'bot', text: "Hello! 👋 I'm **VendorBridge AI Support**.\n\nI can answer all your questions about our vendor management platform — no account needed!\n\nWhat can I help you with today?" }]);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setInput('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
    const userMsg: Msg = { id: id(), role: 'user', text: q };
    setMsgs(p => [...p, userMsg]);
    setTyping(true);
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const answer = findAnswer(q);
      setMsgs(p => [...p, { id: id(), role: 'bot', text: answer }]);
      setTyping(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }, delay);
  };

  const reset = () => {
    setMsgs([{ id: id(), role: 'bot', text: "Chat cleared! 🔄 I'm ready to help again.\n\nAsk me anything about VendorBridge!" }]);
    setTyping(false);
  };

  return (
    <>
      {/* Trigger */}
      <button
        id="ai-chatbot-trigger"
        onClick={() => setOpen(p => !p)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 ${open ? 'bg-surface-container border border-outline-variant text-on-surface' : 'bg-gradient-to-br from-primary to-secondary-container text-white'}`}
        aria-label="Support Chat"
      >
        {!open && <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />}
        {open ? <X className="w-5 h-5" /> : <Bot className="w-6 h-6" />}
        {!open && <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-tertiary rounded-full border-2 border-background" />}
      </button>

      {/* Window */}
      {open && (
        <div
          id="ai-chatbot-window"
          className="fixed bottom-24 right-6 z-50 w-[360px] h-[520px] flex flex-col bg-surface-container border border-outline-variant/60 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
          style={{ animation: 'chatIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both' }}
        >
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 bg-surface-container-high border-b border-outline-variant/50">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary-container flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border border-surface-container-high" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wide leading-none">VendorBridge AI</h3>
                <p className="text-[9px] text-on-surface-variant mt-0.5 font-mono">{typing ? '✍️ Typing...' : 'Support Assistant · Online'}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={reset} className="p-1.5 text-on-surface-variant hover:text-white hover:bg-surface-variant rounded transition-colors cursor-pointer" title="Clear"><RefreshCw className="w-3.5 h-3.5" /></button>
              <button onClick={() => setOpen(false)} className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error/10 rounded transition-colors cursor-pointer" title="Close"><X className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          {/* Powered badge */}
          <div className="flex-shrink-0 flex items-center justify-center gap-1.5 py-1 bg-primary/5 border-b border-outline-variant/30">
            <Zap className="w-2.5 h-2.5 text-primary" />
            <span className="text-[9px] font-mono text-primary uppercase tracking-widest">VendorBridge Knowledge Base</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: 'thin' }}>
            {msgs.map(m => (
              <div key={m.id} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 ${m.role === 'user' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-gradient-to-br from-primary to-secondary-container text-white'}`}>
                  {m.role === 'user' ? 'U' : <Bot className="w-3 h-3" />}
                </div>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2.5 text-xs space-y-0.5 ${m.role === 'user' ? 'bg-primary/15 text-white border border-primary/20 rounded-tr-sm' : 'bg-surface-container-high border border-outline-variant/40 text-on-surface rounded-tl-sm'}`}>
                  {renderText(m.text)}
                  <p className={`text-[9px] mt-1 font-mono ${m.role === 'user' ? 'text-primary/60 text-right' : 'text-on-surface-variant'}`}>
                    {new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:true})}
                  </p>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary-container flex items-center justify-center mt-0.5"><Bot className="w-3 h-3 text-white" /></div>
                <div className="bg-surface-container-high border border-outline-variant/40 rounded-2xl rounded-tl-sm px-3 py-3">
                  <div className="flex items-center gap-1">
                    {[0,150,300].map(d => <span key={d} className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{animationDelay:`${d}ms`}} />)}
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick prompts */}
          {msgs.length <= 1 && (
            <div className="flex-shrink-0 px-3 pb-2">
              <p className="text-[9px] text-on-surface-variant font-mono uppercase tracking-widest mb-1.5 flex items-center gap-1"><MessageSquare className="w-2.5 h-2.5" /> Quick questions</p>
              <div className="flex gap-1.5 flex-wrap">
                {QUICK.map(q => (
                  <button key={q.label} onClick={() => send(q.q)} disabled={typing}
                    className="px-2 py-1 text-[10px] bg-surface-container-low border border-outline-variant/50 rounded-full text-on-surface-variant hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer disabled:opacity-50 font-mono">
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex-shrink-0 p-3 border-t border-outline-variant/50 bg-surface-container-high">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                id="ai-chatbot-input"
                rows={1}
                value={input}
                onChange={e => { setInput(e.target.value); e.currentTarget.style.height='auto'; e.currentTarget.style.height=Math.min(e.currentTarget.scrollHeight,120)+'px'; }}
                onKeyDown={e => { if (e.key==='Enter'&&!e.shiftKey){e.preventDefault();send(input);} }}
                disabled={typing}
                placeholder="Ask anything about VendorBridge…"
                className="flex-1 resize-none bg-surface-container-low border border-outline-variant/60 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary/60 transition-colors disabled:opacity-50 font-sans min-h-[38px] max-h-[120px]"
                style={{height:'38px'}}
              />
              <button
                id="ai-chatbot-send"
                onClick={() => send(input)}
                disabled={typing || !input.trim()}
                className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary-container text-white flex items-center justify-center hover:opacity-90 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[8px] text-on-surface-variant/40 font-mono mt-1.5 text-center">Enter to send · Shift+Enter for new line</p>
          </div>
        </div>
      )}

      <style>{`@keyframes chatIn{from{opacity:0;transform:scale(0.85) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
    </>
  );
}
