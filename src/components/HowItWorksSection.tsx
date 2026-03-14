import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MailIcon, TargetIcon, MouseIcon, BrainIcon, ChartIcon } from "./Icons";

const steps = [
  { 
    num: "01", 
    title: "Campaign Forge", 
    desc: "Architect complex phishing simulations with AI-optimized templates and target deep-profiling.", 
    icon: MailIcon,
    color: "from-cyan-500/20 to-cyan-500/5"
  },
  { 
    num: "02", 
    title: "Silent Deployment", 
    desc: "Execute multi-vector simulations across email, SMS, and collaborative platforms with no footprint.", 
    icon: TargetIcon,
    color: "from-purple-500/20 to-purple-500/5"
  },
  { 
    num: "03", 
    title: "Engagement Capture", 
    desc: "Monitor telemetry in real-time as users interact with simulations, capturing forensic metadata.", 
    icon: MouseIcon,
    color: "from-rose-500/20 to-rose-500/5"
  },
  { 
    num: "04", 
    title: "Neural Analysis", 
    desc: "Our engine processes interactions to identify psychological vulnerabilities and departmental risks.", 
    icon: BrainIcon,
    color: "from-emerald-500/20 to-emerald-500/5"
  },
  { 
    num: "05", 
    title: "Strategic Insights", 
    desc: "Receive actionable intelligence and automated training plans to harden your human perimeter.", 
    icon: ChartIcon,
    color: "from-amber-500/20 to-amber-500/5"
  },
];

const HowItWorksSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="relative py-32 sm:py-48 overflow-hidden bg-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Deployment Lifecycle</span>
          <h2 className="text-4xl sm:text-6xl font-black mt-4 text-white tracking-tighter">
            Strategic <span className="text-gradient-cyber uppercase">Protocol</span>
          </h2>
          <p className="text-white/40 mt-6 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            The systematic approach to identifying and neutralising human risk within your organisation.
          </p>
        </motion.div>

        {/* Desktop Layout */}
        <div className="hidden lg:block relative pt-12">
          {/* Progress Path */}
          <div className="absolute top-28 left-0 w-full h-0.5 bg-white/5 overflow-hidden">
             <motion.div 
               style={{ scaleX: pathLength }}
               className="h-full w-full bg-gradient-to-r from-primary via-purple-500 to-rose-500 origin-left shadow-[0_0_15px_rgba(0,242,255,0.5)]"
             />
          </div>

          <div className="grid grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative group pt-24"
              >
                {/* Step Connector Node */}
                <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black border-2 border-primary z-20 shadow-[0_0_10px_#00f2ff]" />
                
                <div className={`w-20 h-20 mx-auto glass-card glow-border rounded-2xl flex items-center justify-center mb-8 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 bg-gradient-to-br ${step.color}`}>
                   <step.icon size={32} className="text-white group-hover:text-primary transition-colors" />
                </div>
                
                <div className="text-center px-2">
                    <span className="text-[10px] font-mono text-primary font-black tracking-widest uppercase mb-2 block">{step.num}_STAGE</span>
                    <h3 className="text-lg font-black text-white mt-1 group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-white/40 mt-3 text-sm font-light leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-16 relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/5" />
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-8 items-start pl-2"
            >
              <div className={`w-14 h-14 shrink-0 glass-card glow-border rounded-xl flex items-center justify-center relative z-10 bg-gradient-to-br ${step.color}`}>
                <step.icon size={24} className="text-white" />
              </div>
              <div className="pt-2">
                <span className="text-[10px] font-mono text-primary font-black tracking-widest uppercase">{step.num}</span>
                <h3 className="text-xl font-bold text-white mt-1">{step.title}</h3>
                <p className="text-white/40 mt-2 text-sm font-light leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
