import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, CornerDownLeft, Sparkles } from "lucide-react";
import { ChatMessage } from "../types";

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi there! I am Divy's AI Developer Assistant. Ask me anything about Divy's skills, B.Tech education at ADIT, achievements, or project experience!",
      timestamp: new Date(),
    },
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  const presetQuestions = [
    "What are his core tech skills?",
    "Tell me about Technoguide internship.",
    "What hackathons has he won?",
    "How can I contact and hire him?",
  ];

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMsg("");
    setIsTyping(true);

    try {
      const historyContext = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyContext,
        }),
      });

      if (!res.ok) {
        throw new Error("Network response error during chat completion.");
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        text: data.text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        text: "I encountered a slight glitch connecting to the neural network. Let me state that Divy is highly competent and you can email him directly at drsvvn25@gmail.com!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          id="chat-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-r from-primary-container to-secondary-container text-white shadow-lg cursor-pointer hover:shadow-cyan-500/20 group border border-white/20"
        >
          {isOpen ? (
            <X className="w-6 h-6 transform transition-transform duration-300 group-hover:rotate-90" />
          ) : (
            <div className="relative">
              <Bot className="w-6 h-6 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
              </span>
            </div>
          )}
        </motion.button>
      </div>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-panel"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[580px] max-h-[80vh] rounded-3xl glass-card flex flex-col z-50 overflow-hidden shadow-2xl border-glow"
          >
            {/* Header */}
            <div className="p-4 bg-linear-to-b from-surface-container-high to-surface-container flex items-center justify-between border-b border-white/8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center border border-secondary/30">
                  <Bot className="w-5 h-5 text-secondary animate-bounce" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm tracking-wide text-white flex items-center gap-1.5">
                    Divy's AI Assistant
                    <Sparkles className="w-3.5 h-3.5 text-secondary" />
                  </h3>
                  <p className="text-[11px] font-mono text-cyan-300">gemini-3.5-flash / Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-outline hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Pane */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hidden">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 max-w-[85%] ${
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                      msg.role === "user"
                        ? "bg-primary-container/20 border-primary/30"
                        : "bg-surface-container-high border-white/10"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-3.5 h-3.5 text-primary" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-secondary" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`p-3 rounded-2xl text-[13px] leading-relaxed select-text ${
                      msg.role === "user"
                        ? "bg-primary-container text-white rounded-tr-none shadow-md"
                        : "bg-surface-container-low text-on-surface border border-white/5 rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span className="block mt-1 text-[9px] text-right text-outline opacity-70">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 max-w-[85%] mr-auto">
                  <div className="w-7 h-7 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-secondary animate-pulse" />
                  </div>
                  <div className="p-3 bg-surface-container-low text-on-surface border border-white/5 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-tertiary rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Presets */}
            {messages.length < 3 && (
              <div className="px-4 py-2 border-t border-white/5 bg-surface-container-lowest/40">
                <p className="text-[11px] text-outline-variant font-mono mb-1.5">Preset Coordinates:</p>
                <div className="flex flex-wrap gap-1.5">
                  {presetQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="text-[11px] py-1 px-2.5 rounded-lg border border-white/8 bg-surface-container-low hover:bg-white/5 text-secondary hover:text-white transition-all cursor-pointer text-left font-sans truncate max-w-full"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Action Bar */}
            <div className="p-3 border-t border-white/5 bg-surface-container flex gap-1.5 items-center">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputMsg)}
                placeholder="Ask assistant about Divy's skills..."
                className="flex-1 bg-surface-container-lowest border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-hidden focus:border-secondary transition-colors placeholder:text-outline-variant"
              />
              <button
                onClick={() => handleSendMessage(inputMsg)}
                disabled={!inputMsg.trim() || isTyping}
                className="p-2 bg-primary-container text-white rounded-xl hover:bg-indigo-600 transition-colors disabled:opacity-40 disabled:hover:bg-primary-container cursor-pointer flex items-center justify-center shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
