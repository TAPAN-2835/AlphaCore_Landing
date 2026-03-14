import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ShieldIcon, MailIcon, MouseIcon, TargetIcon, LockIcon } from "./Icons";

const steps = [
  { id: 1, label: "Admin", desc: "Campaign created", icon: ShieldIcon, color: "text-primary" },
  { id: 2, label: "Email Sent", desc: "Payload delivered", icon: MailIcon, color: "text-primary" },
  { id: 3, label: "Opened", desc: "Target engaged", icon: TargetIcon, color: "text-emerald-400" },
  { id: 4, label: "Link Clicked", desc: "URL accessed", icon: MouseIcon, color: "text-amber-400" },
  { id: 5, label: "Credentials", desc: "Data captured", icon: LockIcon, color: "text-rose-500" },
];

const logLines = [
  { time: "10:32:01", text: "Email delivered to finance@company.com", type: "info" },
  { time: "10:32:09", text: "Email opened — User-Agent: Chrome/120", type: "info" },
  { time: "10:32:14", text: "Suspicious link clicked — redirect captured", type: "warn" },
  { time: "10:32:18", text: "Credential attempt detected — harvesting active", type: "alert" },
  { time: "10:32:22", text: "Session token intercepted — simulation complete", type: "alert" },
];

const AttackFlowSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-32 sm:py-48 overflow-hidden bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Simulation Flow</span>
          <h2 className="text-4xl sm:text-6xl font-black mt-4 text-white tracking-tighter">
            See How an <span className="text-gradient-cyber">Attack Lifecycle</span> Unfolds
          </h2>
        </motion.div>

        {/* Flow nodes */}
        <div className="relative mb-32">
          {/* Connection line (desktop) */}
          <svg className="absolute top-10 left-0 w-full h-1 px-12 hidden md:block" fill="none">
             <motion.path
                d="M 0 0.5 L 1200 0.5"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="10 5"
                style={{ pathLength }}
             />
             <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00f2ff" />
                    <stop offset="50%" stopColor="#7000ff" />
                    <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
             </defs>
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col items-center group"
              >
                <div className="glass-card glow-border w-20 h-20 rounded-2xl flex items-center justify-center mb-6 relative z-10 bg-black/50 overflow-hidden group-hover:scale-110 transition-transform duration-500">
                  <step.icon className={`w-8 h-8 ${step.color} transition-colors`} />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className={`font-bold text-sm tracking-widest uppercase mb-2 ${step.color}`}>{step.label}</span>
                <span className="text-xs text-white/40 font-mono text-center px-4">{step.desc}</span>

                {/* Arrow for mobile */}
                {i < steps.length - 1 && (
                  <div className="md:hidden w-px h-12 bg-gradient-to-b from-primary/50 to-rose-500/50 my-6 shadow-[0_0_10px_rgba(0,242,255,0.2)]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Terminal log */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card glow-border p-8 max-w-4xl mx-auto backdrop-blur-3xl bg-black/60 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                <span className="text-[10px] font-mono text-white/20 ml-2 uppercase tracking-[0.2em]">attack_simulation_log.v3.1</span>
            </div>
            <div className="text-[10px] font-mono text-primary/40 animate-pulse uppercase">Live Feed</div>
          </div>
          <div className="font-mono text-sm space-y-3">
            {logLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex gap-4 group"
              >
                <span className="text-white/10 shrink-0 select-none">[{line.time}]</span>
                <span className={
                  line.type === "alert" ? "text-rose-500 font-bold" :
                  line.type === "warn" ? "text-amber-400" :
                  "text-primary/70"
                }>
                  <span className="mr-2 text-white/5 group-hover:text-primary/20 transition-colors">{">"}</span>
                  {line.text}
                </span>
              </motion.div>
            ))}
            <div className="flex items-center gap-2 text-primary/40 pt-2">
              <span className="animate-pulse">$</span>
              <span className="w-2 h-4 bg-primary/40 animate-blink" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AttackFlowSection;
