import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "./MagneticButton";

const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-48 sm:py-64 overflow-hidden bg-black">
      {/* Background grid - enhanced */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 242, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 242, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* Glow orbs - more intense */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-[150px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #00f2ff, #7000ff, transparent)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-primary font-mono text-xs tracking-[0.5em] uppercase mb-8 block">Ready for Deployment?</span>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter uppercase mb-12">
            Harden Your <span className="text-gradient-cyber">Human Firewall</span>
          </h2>

          <p className="text-xl sm:text-2xl text-white/40 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
            Join elite security operations teams globaly. Build a culture of cyber resilience through controlled, high-fidelity threat simulations.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <MagneticButton onClick={() => window.location.href = "https://attack-simulator-alpha-core.vercel.app/"}>
              <span className="px-12 py-6 bg-primary text-black font-black uppercase tracking-widest text-lg hover:bg-white transition-colors block shadow-[0_0_50px_rgba(0,242,255,0.3)]">
                Start Mission
              </span>
            </MagneticButton>

            <button 
              onClick={() => window.location.href = "https://github.com/TAPAN-2835/AttackSimulator_AlphaCore"}
              className="text-white/40 hover:text-white font-mono uppercase tracking-[0.3em] text-xs transition-colors border-b border-white/5 pb-2 hover:border-primary"
            >
              Explore Documentation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
