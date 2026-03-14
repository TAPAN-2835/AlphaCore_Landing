import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const initialEvents = [
  { id: 1, time: "10:42:11", user: "finance@company.com", action: "opened phishing email", status: "monitored" },
  { id: 2, time: "10:42:21", user: "hr@company.com", action: "suspicious link clicked", status: "warning" },
  { id: 3, time: "10:42:35", user: "dev@company.com", action: "credentials submitted", status: "critical" },
];

const ACTIONS = [
  { action: "phishing email delivered", user: "sales@corp.io", status: "monitored" },
  { action: "macro attachment downloaded", user: "legal@corp.io", status: "warning" },
  { action: "unauthorized redirect followed", user: "mktg@corp.io", status: "warning" },
  { action: "domain spoof detected", user: "exec@corp.io", status: "critical" },
];

const LiveStreamSection = () => {
  const [events, setEvents] = useState(initialEvents);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomAction = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
      const newEvent = {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour12: false }),
        ...randomAction
      };
      setEvents(prev => [...prev.slice(-9), newEvent]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events]);

  return (
    <section className="relative py-32 sm:py-48 bg-black/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-24">
            <span className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Simulation Intelligence</span>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter text-center">
              Live Cyber <span className="text-gradient-cyber">Event Stream</span>
            </h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
           {/* Terminal Frame */}
           <div className="glass-card glow-border bg-black/80 backdrop-blur-3xl rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,242,255,0.1)] border-white/10">
              <div className="bg-white/5 px-8 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                    </div>
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">threat_event_feed.sys</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono text-white/10 uppercase">Buffer: 1024KB</span>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#00f2ff]" />
                </div>
              </div>

              <div 
                ref={scrollRef}
                className="p-8 h-[500px] overflow-y-auto font-mono text-sm space-y-4 scrollbar-hide no-scrollbar"
              >
                <AnimatePresence initial={false}>
                  {events.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex gap-6 group hover:bg-white/[0.02] -mx-4 px-4 py-2 rounded-lg transition-colors"
                    >
                      <span className="text-white/20 shrink-0 font-medium">[{event.time}]</span>
                      <div className="flex-1 flex gap-4 overflow-hidden">
                        <span className="text-primary font-bold shrink-0">{">"}</span>
                        <div className="flex flex-wrap gap-x-3 items-center">
                            <span className="text-white/80 font-semibold">{event.user}</span>
                            <span className="text-white/40">{event.action}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border
                                ${event.status === "critical" ? "bg-rose-500/10 border-rose-500/30 text-rose-400" : 
                                  event.status === "warning" ? "bg-amber-500/10 border-amber-500/30 text-amber-400" : 
                                  "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"}`}>
                                {event.status}
                            </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <div className="flex items-center gap-3 text-primary pt-4 group">
                    <span className="text-primary font-bold">{">"}</span>
                    <span className="w-2.5 h-5 bg-primary/40 animate-blink shadow-[0_0_10px_rgba(0,242,255,0.5)]" />
                    <span className="text-[10px] font-mono text-white/10 uppercase tracking-[0.5em] ml-4 group-hover:text-white/20 transition-colors">Awaiting intrusion...</span>
                </div>
              </div>

              {/* Terminal Bottom Grid Mask */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
           </div>

           {/* Decorative elements */}
           <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
           <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default LiveStreamSection;
