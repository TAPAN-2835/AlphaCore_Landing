import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import GridBackground from "./GridBackground";
import DecryptedText from "./DecryptedText";
import MagneticButton from "./MagneticButton";
import { PhishingIcon } from "./Icons";

const terminalLines = [
  { time: "10:31:58", text: "Initializing phishing campaign...", color: "text-primary" },
  { time: "10:32:01", text: "Email payload delivered to target", color: "text-primary" },
  { time: "10:32:09", text: "Target opened email [finance@corp.io]", color: "text-muted-foreground" },
  { time: "10:32:14", text: "WARNING: Suspicious link clicked", color: "text-amber-400" },
  { time: "10:32:18", text: "ALERT: Credential attempt detected", color: "text-destructive" },
  { time: "10:32:22", text: "Session captured — risk score: HIGH", color: "text-destructive" },
];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -200]);
  const y3 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => (prev < terminalLines.length ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[120vh] flex items-center justify-center overflow-hidden cyber-noise">
      <GridBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left content */}
          <motion.div
            style={{ y: y3, opacity }}
            className="lg:col-span-3 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-mono glow-border">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                v3.2 — Live Threat Engine
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-8xl font-black leading-[0.9] mb-6 tracking-tighter">
              <DecryptedText text="Simulate Attacks." className="block text-white" speed={25} />
              <DecryptedText text="Strengthen Defenses." className="block text-gradient-cyber" speed={25} delay={800} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-lg sm:text-xl text-muted-foreground/80 max-w-xl mb-10 mx-auto lg:mx-0 font-light leading-relaxed"
            >
              Train your organization against real-world cyber threats using controlled phishing and deception simulations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
            >
              <MagneticButton 
                onClick={() => window.location.href = "https://attack-simulator-alpha-core.vercel.app/"}
                variant="primary" 
                className="px-10 h-14 text-base font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(0,242,255,0.3)]"
              >
                Start Simulation
              </MagneticButton>
              <MagneticButton 
                onClick={() => window.location.href = "https://attack-simulator-alpha-core.vercel.app/"}
                variant="ghost" 
                className="px-10 h-14 text-base font-bold uppercase tracking-widest border-white/10 text-white/70 hover:text-white"
              >
                Watch Demo
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right floating panels */}
          <div className="lg:col-span-2 relative hidden lg:block">
            {/* Terminal panel */}
            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, x: 50, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="glass-card glow-border p-5 mb-6 backdrop-blur-2xl bg-black/40"
            >
              <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[10px] font-mono text-white/30 ml-2 uppercase tracking-tight">network_monitor.exe</span>
              </div>
              <div className="font-mono text-xs space-y-2.5 max-h-52 overflow-hidden">
                {terminalLines.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-3"
                  >
                    <span className="text-white/20">[{line.time}]</span>
                    <span className={`${line.color} font-medium`}>{line.text}</span>
                  </motion.div>
                ))}
                {visibleLines < terminalLines.length && (
                  <div className="flex items-center gap-1 text-primary/60">
                    <span>$</span>
                    <span className="w-1.5 h-3 bg-primary/60 animate-blink" />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Phishing email card */}
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="glass-card glow-border p-5 ml-12 backdrop-blur-3xl bg-primary/5"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(0,242,255,0.1)]">
                  <PhishingIcon size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-wide">Action Required: Data Sync</div>
                  <div className="text-[10px] text-white/40 font-mono">auth@c0rp-security.net</div>
                </div>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed mb-4">
                We've noticed a discrepancy in your security clearance. Please verify your credentials to maintain access...
              </p>
              <div className="px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded text-[10px] text-rose-400 font-mono font-bold text-center uppercase tracking-widest glow-pulse">
                ⚠ SIMULATED ATTACK ⚠
              </div>
            </motion.div>

            {/* Floating metrics */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="absolute -top-8 -right-8 glass-card glow-border px-4 py-3 bg-black/60"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_#f43f5e]" />
                <span className="text-xs font-mono font-bold text-rose-500 uppercase">3 Anomalies</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">Initiate Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
