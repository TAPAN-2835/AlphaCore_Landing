import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { PhishingIcon, LockIcon, MalwareIcon, ChartIcon, BrainIcon } from "./Icons";

const features = [
  {
    icon: PhishingIcon,
    title: "Phishing Campaign Simulator",
    desc: "Deploy realistic phishing emails with customizable templates, tracking pixels, and credential harvesting pages.",
    color: "from-cyan-500/20 to-cyan-500/5",
    stroke: "text-cyan-400"
  },
  {
    icon: LockIcon,
    title: "Credential Harvest Simulation",
    desc: "Test employee resistance to credential theft with simulated login portals and OAuth phishing flows.",
    color: "from-purple-500/20 to-purple-500/5",
    stroke: "text-purple-400"
  },
  {
    icon: MalwareIcon,
    title: "Malware Attachment Testing",
    desc: "Send harmless payloads disguised as malicious attachments to measure download and execution rates.",
    color: "from-rose-500/20 to-rose-500/5",
    stroke: "text-rose-400"
  },
  {
    icon: ChartIcon,
    title: "Security Analytics Dashboard",
    desc: "Analyze simulation results with deep-dive metrics, department-level reporting, and benchmark comparisons.",
    color: "from-emerald-500/20 to-emerald-500/5",
    stroke: "text-emerald-400"
  },
  {
    icon: BrainIcon,
    title: "Behavioral Risk Scoring",
    desc: "AI-powered risk scoring that identifies vulnerable departments and individuals based on behavioral patterns.",
    color: "from-amber-500/20 to-amber-500/5",
    stroke: "text-amber-400"
  },
];

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  color: string;
}

const TiltCard = ({ children, className = "", color }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0, spotX: 50, spotY: 50 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setStyle({
      rotateX: (y - 0.5) * -15,
      rotateY: (x - 0.5) * 15,
      spotX: x * 100,
      spotY: y * 100,
    });
  };

  const reset = () => setStyle({ rotateX: 0, rotateY: 0, spotX: 50, spotY: 50 });

  return (
    <div
      ref={ref}
      className={`perspective-1000 ${className} group`}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        animate={{ rotateX: style.rotateX, rotateY: style.rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`glass-card glow-border p-8 h-full relative overflow-hidden bg-gradient-to-br ${color} backdrop-blur-3xl`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Holographic Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] bg-[length:100%_4px] pointer-events-none" />
        
        {/* Spotlight effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${style.spotX}% ${style.spotY}%, rgba(255,255,255,0.08), transparent 70%)`,
          }}
        />
        
        <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const FeaturesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 sm:py-48 bg-black/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Platform Infrastructure</span>
          <h2 className="text-4xl sm:text-6xl font-black mt-4 text-white tracking-tighter">
            Next-Gen <span className="text-gradient-cyber uppercase">Simulation</span> Arsenal
          </h2>
          <p className="text-white/40 mt-6 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            A comprehensive suite of attack simulation capabilities designed for elite security operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={i === features.length - 1 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <TiltCard color={f.color}>
                <div className={`w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 ${f.stroke} shadow-inner group-hover:bg-white/10 transition-colors duration-500`}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-white/50 leading-relaxed font-light">{f.desc}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
