import { useState, ChangeEvent, FormEvent } from "react";
import { Send, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [successMsg, setSuccessMsg] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Contact API response error.");

      const data = await res.json();
      setSuccessMsg(data.message || "Your message has been successfully received!");
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="relative w-full rounded-3xl glass-card p-6 md:p-8 overflow-hidden transition-all duration-500 border border-white/5 hover:border-cyan-400/10">
      {status === "success" ? (
        <div className="flex flex-col items-center justify-center text-center py-10 space-y-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-white">Quantum Message Dispatched!</h3>
            <p className="text-sm text-outline mt-1 max-w-sm mx-auto">{successMsg}</p>
          </div>
          <button
            onClick={() => setStatus("idle")}
            className="text-xs font-mono py-2.5 px-5 bg-surface-container-high rounded-xl text-white hover:bg-surface-container-highest transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Send Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="space-y-4 select-text">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name-input" className="block text-[11px] font-mono text-outline uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                id="name-input"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="What should I call you?"
                className="w-full bg-surface-container-lowest border border-white/8 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/30 transition-all placeholder:text-outline-variant"
              />
            </div>
            <div>
              <label htmlFor="email-input" className="block text-[11px] font-mono text-outline uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <input
                id="email-input"
                type="type"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g. recruit@company.com"
                className="w-full bg-surface-container-lowest border border-white/8 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/30 transition-all placeholder:text-outline-variant"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject-input" className="block text-[11px] font-mono text-outline uppercase tracking-wider mb-1.5">
              Subject
            </label>
            <input
              id="subject-input"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Freelance Project / Job Interview / Hi"
              className="w-full bg-surface-container-lowest border border-white/8 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/30 transition-all placeholder:text-outline-variant"
            />
          </div>

          <div>
            <label htmlFor="message-input" className="block text-[11px] font-mono text-outline uppercase tracking-wider mb-1.5">
              Message *
            </label>
            <textarea
              id="message-input"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell me all about your brilliant idea..."
              className="w-full bg-surface-container-lowest border border-white/8 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/30 transition-all placeholder:text-outline-variant resize-none"
            />
          </div>

          {status === "error" && (
            <p className="text-rose-400 text-xs font-mono">
              * Failed to transmit. Please double check all details or contact directly.
            </p>
          )}

          <div className="pt-2">
            <motion.button
              id="submit-contact"
              type="submit"
              disabled={status === "loading"}
              whileHover={{ scale: 1.015, y: -1 }}
              whileTap={{ scale: 0.995 }}
              transition={{ type: "spring", stiffness: 450, damping: 18 }}
              className="w-full py-3 bg-linear-to-r from-primary-container to-secondary-container hover:from-indigo-600 hover:to-cyan-500 rounded-xl font-mono text-xs tracking-wider uppercase text-white font-semibold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
            >
              {status === "loading" ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Transmitting...
                </>
              ) : (
                <>
                  Transmit Signals
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </motion.button>
          </div>
        </form>
      )}
    </div>
  );
}
