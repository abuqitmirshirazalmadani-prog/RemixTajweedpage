"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Send, ArrowRight, MessageSquare, Info, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { handleEmailClick } from "@/lib/utils";

export function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; content: string }>>([
    { 
      role: "model", 
      content: "As Salaam Alaikum! I'm TajweedPage AI. Ask me about our courses, Tajweed rules, tutor schedules, or female staff. How can I assist you today?" 
    }
  ]);
  const [loading, setLoading] = useState(false);
  
  // Suggested link recommendations to display in bottom drawer of assistant
  const [suggestedLinks, setSuggestedLinks] = useState<Array<{ title: string; url: string }>>([]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom when message arrives
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "chat",
          prompt: userMsg,
          messageHistory: messages
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMessages(prev => [...prev, { role: "model", content: data.text }]);
        
        // Populate recommended links from the RAG mapping matches dynamically!
        if (Array.isArray(data.docs) && data.docs.length > 0) {
          const links = data.docs.map((doc: any) => ({
            title: doc.title,
            url: doc.url
          }));
          setSuggestedLinks(links.slice(0, 2));
        } else {
          setSuggestedLinks([]);
        }
      } else {
        setMessages(prev => [...prev, { role: "model", content: data.error || "Apologies, let me consult the learning material again." }]);
      }
    } catch (_) {
      setMessages(prev => [...prev, { role: "model", content: "Apologies, I am having trouble connecting to the neural server. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const selectSuggested = (topic: string) => {
    setInput(`Tell me about ${topic}`);
  };

  return (
    <>
      {/* Floating trigger button vertical column - Bottom right corner */}
      <div id="global-floating-stack" className="fixed bottom-6 right-6 z-[130] flex flex-col gap-4 items-end pointer-events-none">
        <AnimatePresence>
          {!isOpen && (
            <>
              {/* Email Trigger Button (Top) */}
              <motion.button 
                key="global-email"
                id="global-email-btn"
                onClick={(e) => handleEmailClick(e, "Tajweedpage Quran Classes Inquiry")} 
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 bg-zinc-900 border border-white/10 text-[#C8EB5F] hover:text-white rounded-full shadow-lg hover:border-[#C8EB5F]/20 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <span className="absolute right-16 bg-zinc-900 text-white text-[10px] tracking-wide font-mono px-3 py-2 rounded-lg border border-white/10 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap shadow-xl flex items-center gap-2">
                  Send Email
                  <div className="absolute top-1/2 -right-1 -mt-1 w-2 h-2 bg-zinc-900 border-r border-t border-white/10 rotate-45" />
                </span>
                <Mail size={22} />
              </motion.button>

              {/* WhatsApp Trigger Button (Middle) */}
              <motion.a 
                key="global-whatsapp"
                id="global-whatsapp-btn"
                href="https://wa.me/923233260859?text=Asalamu%20Alaikum,%20I%20am%20interested%20in%20taking%20Tajweed%20online%20classes%20with%20Tajweedpage." 
                target="_blank" 
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:scale-105 transition-all duration-300"
              >
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
                <span className="absolute right-16 bg-zinc-900 text-white text-[10px] tracking-wide font-mono px-3 py-2 rounded-lg border border-white/10 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap shadow-xl flex items-center gap-2">
                  Chat on WhatsApp
                  <div className="absolute top-1/2 -right-1 -mt-1 w-2 h-2 bg-zinc-900 border-r border-t border-white/10 rotate-45" />
                </span>
                <MessageCircle size={24} />
              </motion.a>
            </>
          )}
        </AnimatePresence>

        {/* AI Assistant Button (Bottom) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="pointer-events-auto flex items-center justify-center sm:justify-start gap-2 bg-[#C8EB5F] hover:bg-white text-black font-semibold font-mono tracking-widest text-xs h-14 w-14 sm:w-auto sm:px-5 sm:py-3.5 rounded-full shadow-[0_10px_30px_rgba(200,235,95,0.3)] transition-all duration-300 transform active:scale-95 group select-none cursor-pointer relative"
        >
          {isOpen ? (
            <X size={18} className="text-black shrink-0" />
          ) : (
            <MessageSquare size={20} className="animate-pulse text-black shrink-0" />
          )}
          <span className="hidden sm:inline">ASK TAJWEED AI</span>
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1" />
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="fixed bottom-24 right-3 sm:right-6 w-[calc(100vw-24px)] sm:w-[380px] h-[500px] bg-zinc-950 border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-[120] flex flex-col overflow-hidden"
          >
            {/* Header portion */}
            <div className="bg-black py-4 px-5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C8EB5F] animate-pulse" />
                <div>
                  <h4 className="font-serif font-bold text-white text-sm">TajweedPage AI</h4>
                  <span className="text-[10px] text-zinc-500 font-mono tracking-wider">ONLINE CHAT ADVISOR</span>
                </div>
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Main Chat Flow scroll frame */}
            <div 
              ref={chatContainerRef}
              className="flex-grow p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 bg-zinc-950"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      m.role === "user" 
                        ? "bg-[#C8EB5F] text-black font-semibold rounded-br-none" 
                        : "bg-zinc-900 text-neutral-300 rounded-bl-none border border-white/5"
                    }`}
                  >
                    {m.role === "model" ? (
                      <div className="markdown-body space-y-1 prose prose-invert">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <span>{m.content}</span>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 text-neutral-400 text-[11px] rounded-2xl p-3 rounded-bl-none border border-white/5 flex items-center gap-1.5 font-mono">
                    <span className="w-1 h-1 rounded-full bg-[#C8EB5F] animate-bounce" />
                    <span className="w-1 h-1 rounded-full bg-[#C8EB5F] animate-bouncedelay" />
                    <span className="w-1 h-1 rounded-full bg-[#C8EB5F] animate-bounce" />
                    <span>Searching curriculum...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic suggested category recommendations links */}
            {suggestedLinks.length > 0 && (
              <div className="bg-black/80 px-4 py-2.5 border-t border-white/5 flex flex-col gap-1.5 shrink-0">
                <span className="text-[9px] font-mono tracking-wider text-neutral-500 uppercase flex items-center gap-1">
                  <Info size={10} /> Grounded Recommendations:
                </span>
                <div className="flex flex-col gap-1">
                  {suggestedLinks.map((suggestion, idx) => (
                    <Link 
                      key={idx}
                      href={suggestion.url}
                      onClick={() => setIsOpen(false)}
                      className="text-[11px] text-[#C8EB5F] hover:underline flex items-center gap-1 font-serif italic"
                    >
                      <span>✦ {suggestion.title}</span>
                      <ArrowRight size={10} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Open AI Learning Center CTA card */}
            <div className="bg-black border-t border-white/5 p-3 flex items-center justify-between gap-2 shrink-0">
              <span className="text-[10px] text-neutral-400 font-serif italic">Need voice analyzers & checkers?</span>
              <Link 
                href="/ai"
                onClick={() => setIsOpen(false)}
                className="bg-[#C8EB5F]/10 hover:bg-[#C8EB5F] hover:text-black border border-[#C8EB5F]/20 text-[#C8EB5F] font-mono font-bold text-[10px] tracking-wider uppercase px-3 py-2 rounded-xl transition-all flex items-center gap-1"
              >
                <span>OPEN AI CENTER</span>
                <ArrowRight size={10} />
              </Link>
            </div>

            {/* Send prompt Input area */}
            <form onSubmit={handleSubmit} className="p-3 bg-zinc-900/60 border-t border-white/5 flex gap-2 shrink-0">
              <input 
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about Noorani Qaida, female staff, free trials..."
                className="flex-grow bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C8EB5F]/40 font-mono"
              />
              <button 
                type="submit"
                className="bg-[#C8EB5F] hover:bg-white text-black p-2.5 rounded-xl transition-colors shrink-0 flex items-center justify-center cursor-pointer"
              >
                <Send size={12} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default FloatingAssistant;
