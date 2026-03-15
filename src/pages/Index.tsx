import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AttackFlowSection from "@/components/AttackFlowSection";
import FeaturesSection from "@/components/FeaturesSection";
import DashboardSection from "@/components/DashboardSection";
import LiveStreamSection from "@/components/LiveStreamSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CTASection from "@/components/CTASection";
import PricingSection from "@/components/PricingSection";

const NetworkVisualization = lazy(() => import("@/components/NetworkVisualization"));

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-primary selection:text-black">
      <Navbar />
      <HeroSection />

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none h-64" />
        <AttackFlowSection />
      </div>

      <FeaturesSection />

      <DashboardSection />

      <LiveStreamSection />

      <Suspense fallback={
        <div className="h-[600px] flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="font-mono text-primary/40 text-xs tracking-[0.5em] uppercase">Initializing Neural Map</span>
          </div>
        </div>
      }>
        <NetworkVisualization />
      </Suspense>

      <HowItWorksSection />

      <PricingSection />

      <CTASection />

      {/* Footer */}
      <footer className="border-t border-white/5 py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-24">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <span className="text-primary font-black text-xs">AS</span>
                </div>
                <span className="text-xl font-black tracking-tighter uppercase italic">Attack<span className="text-primary">Simulator</span></span>
              </div>
              <p className="text-white/30 text-sm font-light leading-relaxed max-w-sm">
                The world's most advanced cybersecurity simulation platform. Empowering organizations to build human resilience against modern threats.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Platform</h4>
              <ul className="space-y-4 text-sm text-white/30 font-light">
                <li><a href="#" className="hover:text-primary transition-colors">Simulations</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Training</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Resources</h4>
              <ul className="space-y-4 text-sm text-white/30 font-light">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
            <span className="text-xs text-white/20 font-mono tracking-widest">© 2026 ATTACKSIMULATOR_CORE_V2.0</span>
            <div className="flex gap-12 text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
              <a href="#" className="hover:text-primary transition-colors">Privacy_Protocol</a>
              <a href="#" className="hover:text-primary transition-colors">Terms_of_Engage</a>
              <a href="#" className="hover:text-primary transition-colors">Node_Status</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
