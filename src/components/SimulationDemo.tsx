import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldIcon, TargetIcon, LockIcon } from "./Icons";
import MagneticButton from "./MagneticButton";

const SimulationDemo = () => {
  const [stage, setStage] = useState<"idle" | "launching" | "active" | "complete">("idle");
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString([], { hour12: false })}] ${msg}`]);
  };

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const handleLaunch = () => {
    setStage("launching");
    setLogs([]);
    addLog("Initializing neural simulation engine...");

    setTimeout(() => {
      setStage("active");
      addLog("Payload encrypted. Commencing multi-vector deployment.");
    }, 1500);
  };

  useEffect(() => {
    if (stage === "active") {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStage("complete");
            addLog("Simulation protocols finalized. Generating risk report.");
            return 100;
          }

          const next = prev + Math.random() * 15;
          if (next > 30 && prev <= 30) addLog("Phishing vector deployed to 4,200 nodes.");
          if (next > 60 && prev <= 60) addLog("Credential harvesting active. Tracking telemetry.");
          if (next > 80 && prev <= 80) addLog("Analyzing behavioral vulnerability clusters.");

          return next;
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [stage]);

  const reset = () => {
    setStage("idle");
    setProgress(0);
    setLogs([]);
  };

  return (
    <section className="relative py-32 sm:py-48 bg-black/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Interactive Sandbox</span>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
              Test Your <span className="text-gradient-cyber">Defenses</span> Now
            </h2>
            <p className="text-white/40 text-lg font-light leading-relaxed mb-12 max-w-xl">
              Experience the power of AttackSimulator with our interactive mini-demo. Deploy a simulated attack and watch the results in real-time.
            </p>

            <div className="flex gap-6">
              {stage === "idle" || stage === "complete" ? (
                <MagneticButton onClick={() => window.location.href = "https://attack-simulator-alpha-core.vercel.app/"}>
                  <span className="px-12 py-5 bg-primary text-black font-black uppercase tracking-widest text-sm hover:bg-white transition-colors block">
                    {stage === "complete" ? "Reset Sandbox" : "Launch Simulation"}
                  </span>
                </MagneticButton>
              ) : (
                <div className="px-12 py-5 border border-primary/30 text-primary font-mono uppercase tracking-widest text-sm flex items-center gap-4 bg-primary/5">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Operation Active...
                </div>
              )}
            </div>
          </motion.div>

          <div className="relative">
            {/* Holographic Arena */}
            <div className="glass-card glow-border p-1 bg-black/60 rounded-[2.5rem] relative overflow-hidden aspect-square flex items-center justify-center shadow-[0_0_100px_rgba(0,242,255,0.1)]">

              <AnimatePresence mode="wait">
                {stage === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    className="flex flex-col items-center gap-8"
                  >
                    <div className="w-32 h-32 rounded-full border-2 border-white/5 flex items-center justify-center relative">
                      <ShieldIcon size={64} className="text-white/10" />
                      <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin duration-[3s]" />
                    </div>
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] animate-pulse">Waiting for commands</span>
                  </motion.div>
                )}

                {(stage === "launching" || stage === "active") && (
                  <motion.div
                    key="active"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full p-12 flex flex-col"
                  >
                    <div className="flex-1 overflow-hidden font-mono text-[10px] sm:text-xs text-primary/60 space-y-2 mb-8 no-scrollbar scroll-smooth">
                      {logs.map((log, i) => (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          key={i}
                        >
                          {log}
                        </motion.div>
                      ))}
                      <div ref={logEndRef} />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest">
                        <span>Deployment Progress</span>
                        <span>{Math.floor(progress)}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary shadow-[0_0_10px_#00f2ff]"
                          animate={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {stage === "complete" && (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-12"
                  >
                    <div className="w-24 h-24 mx-auto bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                      <TargetIcon size={40} className="text-primary" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">Mission Success</h3>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent h-1 w-full animate-scanline opacity-20 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
            </div>

            {/* Background elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimulationDemo;
