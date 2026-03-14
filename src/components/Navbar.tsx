import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = ["Features", "Dashboard", "Simulations", "Protocol"];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-2xl border-b border-white/5 py-3" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-black">
            <span className="text-primary font-black text-sm group-hover:text-black transition-colors">AS</span>
          </div>
          <span className="font-black text-white tracking-widest uppercase italic text-lg leading-none transition-all group-hover:tracking-tighter">
            Attack<span className="text-primary">Simulator</span>
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-12">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="text-[10px] font-mono font-bold text-white/40 hover:text-primary transition-all tracking-[0.3em] uppercase relative group">
              {l}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
          <button 
            onClick={() => window.location.href = "https://attack-simulator-alpha-core.vercel.app/"}
            className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-primary hover:shadow-[0_0_20px_rgba(0,242,255,0.4)]"
          >
            Establish Link
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)}>
          <div className="w-6 h-5 flex flex-col justify-between">
            <motion.span animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }} className="w-full h-0.5 bg-primary rounded-full block" />
            <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="w-full h-0.5 bg-primary rounded-full block" />
            <motion.span animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }} className="w-full h-0.5 bg-primary rounded-full block" />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-3xl z-40 md:hidden flex flex-col items-center justify-center gap-12"
          >
            <div className="flex flex-col items-center gap-8">
              {links.map((l, i) => (
                <motion.a
                  key={l}
                  href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-4xl font-black text-white hover:text-primary transition-all uppercase tracking-tighter"
                  onClick={() => setOpen(false)}
                >
                  {l}
                </motion.a>
              ))}
            </div>
            <motion.button
              onClick={() => window.location.href = "https://attack-simulator-alpha-core.vercel.app/"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="px-12 py-4 bg-primary text-black font-black uppercase tracking-widest text-sm"
            >
              Get Started
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
