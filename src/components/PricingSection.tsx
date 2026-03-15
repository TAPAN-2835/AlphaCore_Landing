import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "./MagneticButton";

const tiers = [
  {
    name: "Free Demo",
    price: "$0",
    description: "Basic simulation access for individuals to test the waters.",
    features: [
      "1 Basic Phishing Campaign",
      "Standard Email Templates",
      "Basic Analytics Dashboard",
      "Community Support",
    ],
    buttonText: "Start Free",
    isPopular: false,
  },
  {
    name: "Pro Mission",
    price: "$49",
    period: "/mo",
    description: "Advanced threat simulations for active security teams.",
    features: [
      "Unlimited Campaigns",
      "Advanced Multichannel Templates",
      "Real-time Analytics & API",
      "Priority Support",
      "Custom Domains",
    ],
    buttonText: "Upgrade to Pro",
    isPopular: true,
  },
  {
    name: "Elite Operations",
    price: "Custom",
    description: "Enterprise-grade resilience for large organizations.",
    features: [
      "Everything in Pro",
      "Dedicated Success Manager",
      "Custom Integration Support",
      "On-Premise Deployment Options",
      "24/7 Priority Hotline",
    ],
    buttonText: "Contact Sales",
    isPopular: false,
  },
];

const CheckIcon = () => (
  <svg 
    className="w-5 h-5 text-primary shrink-0 mr-3" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const PricingSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 sm:py-48 overflow-hidden bg-black border-t border-white/5">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 242, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 242, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-mono text-xs tracking-[0.5em] uppercase mb-4 block">Deployment Tier</span>
            <h2 className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tighter uppercase mb-6">
              Choose Your <span className="text-gradient-cyber">Arsenal</span>
            </h2>
            <p className="text-xl text-white/40 font-light">
              Scale your security operations with high-fidelity threat simulation models. From free demos to elite operations.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative group ${tier.isPopular ? 'md:-translate-y-4' : ''}`}
            >
              {/* Card background/border with glow */}
              <div className={`absolute inset-0 bg-gradient-to-b ${tier.isPopular ? 'from-primary/20 to-primary/5 border-primary/50' : 'from-white/5 to-transparent border-white/10'} border rounded-2xl transition-all duration-300 group-hover:bg-white/5 group-hover:border-primary/50`} />
              
              {/* Popular glow effect */}
              {tier.isPopular && (
                <div className="absolute -inset-px bg-gradient-to-b from-primary/50 to-transparent rounded-2xl opacity-50 blur-sm mix-blend-screen" />
              )}

              <div className="relative p-8 flex flex-col h-full rounded-2xl bg-black/50 backdrop-blur-xl">
                {tier.isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-primary text-black font-black uppercase text-[10px] tracking-widest py-1 px-4 rounded-full shadow-[0_0_20px_rgba(0,242,255,0.5)]">
                      Most Deployed
                    </span>
                  </div>
                )}
                
                <h3 className="text-white font-bold text-2xl uppercase tracking-widest mb-2">{tier.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-5xl font-black text-white tracking-tighter">{tier.price}</span>
                  {tier.period && <span className="text-white/40 ml-2 font-mono text-sm">{tier.period}</span>}
                </div>
                <p className="text-white/40 font-light mb-8 text-sm leading-relaxed">{tier.description}</p>
                
                <ul className="flex-grow space-y-4 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start text-white/70 font-light text-sm">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton className="w-full">
                  <span className={`block w-full text-center py-4 font-black uppercase tracking-widest text-sm transition-all duration-300
                    ${tier.isPopular 
                      ? 'bg-primary text-black hover:bg-white shadow-[0_0_30px_rgba(0,242,255,0.2)]' 
                      : 'bg-white/5 text-white hover:bg-primary/20 hover:text-primary border border-white/10 hover:border-primary/50'
                    }`}
                  >
                    {tier.buttonText}
                  </span>
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
