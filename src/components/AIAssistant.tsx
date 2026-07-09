import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Compass, User, Sparkles, MessageCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const PRESETS = [
  "Best time to visit for gorilla trekking?",
  "What is included in the permit fee?",
  "Recommend a luxury fly-in itinerary",
  "Is Uganda safe for family safaris?",
  "Do I need a yellow fever certificate?"
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Jambo! Welcome to Horizon Chasers Uganda. I am your premium AI Safari Planner. How may I help you design your dream African adventure today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });
      const data = await response.json();
      
      if (response.ok && data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "I'm having a slight connection issue, but our human booking specialists are fully online! Please write to us via our Inquiry form or contact page." }]);
      }
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", content: "I'm having a slight connection issue, but our human booking specialists are fully online! Please write to us via our Inquiry form or contact page." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2.5 bg-forest hover:bg-forest/90 text-white px-5 py-4 rounded-full shadow-2xl border border-gold/30 hover:border-gold cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-gold animate-pulse" />
          <span className="text-xs font-bold tracking-wider uppercase hidden sm:inline">AI Travel Assistant</span>
          <MessageCircle className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-6 w-[92vw] sm:w-[420px] h-[550px] bg-ivory rounded-3xl border border-gold/20 shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-forest p-5 text-white flex items-center justify-between border-b border-gold/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/15 rounded-full flex items-center justify-center border border-gold/30">
                  <Compass className="w-5 h-5 text-gold animate-spin" style={{ animationDuration: "15s" }} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base tracking-wide flex items-center gap-1.5">
                    Safari Planner
                    <span className="text-[10px] bg-gold/20 text-gold border border-gold/30 px-1.5 py-0.5 rounded-full font-sans font-bold uppercase tracking-widest">AI</span>
                  </h4>
                  <p className="text-[10px] text-stone-300 font-sans tracking-wide">Horizon Chasers Uganda</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-stone-50/50">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role !== "user" && (
                    <div className="w-8 h-8 rounded-full bg-forest flex items-center justify-center border border-gold/20 flex-shrink-0">
                      <Compass className="w-4 h-4 text-gold" />
                    </div>
                  )}

                  <div
                    className={`max-w-[78%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      m.role === "user"
                        ? "bg-forest text-white rounded-tr-none font-medium"
                        : "bg-white text-stone-800 border border-stone-200 rounded-tl-none"
                    }`}
                  >
                    {/* Simplified markdown formatter for list items, bullet points, etc. */}
                    <div className="space-y-1.5 whitespace-pre-wrap">
                      {m.content.split("\n").map((line, lIdx) => {
                        if (line.startsWith("* ") || line.startsWith("- ")) {
                          return (
                            <div key={lIdx} className="flex gap-2 pl-1">
                              <span className="text-gold">•</span>
                              <span>{line.substring(2)}</span>
                            </div>
                          );
                        }
                        if (line.startsWith("### ")) {
                          return (
                            <h5 key={lIdx} className="font-serif font-bold text-stone-900 pt-1 text-sm">
                              {line.substring(4)}
                            </h5>
                          );
                        }
                        if (line.startsWith("#### ")) {
                          return (
                            <h6 key={lIdx} className="font-serif font-bold text-stone-900 text-xs">
                              {line.substring(5)}
                            </h6>
                          );
                        }
                        return <p key={lIdx}>{line}</p>;
                      })}
                    </div>
                  </div>

                  {m.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center border border-gold/30 flex-shrink-0">
                      <User className="w-4 h-4 text-gold" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-8 h-8 rounded-full bg-forest flex items-center justify-center border border-gold/20 flex-shrink-0">
                    <Compass className="w-4 h-4 text-gold animate-spin" />
                  </div>
                  <div className="bg-white text-stone-500 border border-stone-200 p-3.5 rounded-2xl rounded-tl-none text-xs flex items-center gap-1.5">
                    <span>Our safari specialist is typing</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Bottom bar */}
            {messages.length === 1 && (
              <div className="p-3 bg-stone-100 border-t border-stone-200 flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap">
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(p)}
                    className="text-[10px] bg-white border border-stone-200 hover:border-gold rounded-full px-3 py-1.5 font-medium text-stone-600 hover:text-forest transition-colors cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input Footer */}
            <div className="p-4 bg-white border-t border-stone-200 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                placeholder="Ask about gorilla tracking, routes..."
                className="flex-1 bg-stone-50 border border-stone-200 focus:border-gold outline-none rounded-xl px-3 text-xs text-stone-800"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 bg-forest hover:bg-forest/95 disabled:bg-stone-300 text-white rounded-xl flex items-center justify-center transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
