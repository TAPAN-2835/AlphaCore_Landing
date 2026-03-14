import { motion } from "framer-motion";
import { RadarIcon } from "./Icons";

const stats = [
  { label: "Emails Sent", value: "12,847", delta: "+2.3%", positive: true },
  { label: "Click Rate", value: "23.4%", delta: "-1.2%", positive: true },
  { label: "Credentials Captured", value: "1,293", delta: "+5.7%", positive: false },
  { label: "Risk Score", value: "HIGH", delta: "↑", positive: false },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const heatmapData = [
  [20, 30, 40, 50, 80, 40, 30],
  [40, 80, 50, 30, 60, 40, 20],
  [30, 40, 80, 60, 30, 30, 60],
  [60, 40, 30, 80, 50, 60, 40],
  [40, 60, 40, 30, 30, 80, 50],
];

const timelineData = [
  { time: "09:00", progress: 65 },
  { time: "10:00", progress: 85 },
  { time: "11:00", progress: 45 },
  { time: "12:00", progress: 75 },
  { time: "13:00", progress: 95 },
  { time: "14:00", progress: 40 },
];

const DashboardSection = () => {
  return (
    <section className="relative py-32 sm:py-48 bg-[#020617] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Strategic Intel</span>
          <h2 className="text-4xl sm:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
            The Live <span className="text-gradient-cyber">Command</span> Center
          </h2>
          <p className="text-white/40 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Real-time behavioral insights and predictive threat analysis. Monitor your organization's security posture with pixel-perfect accuracy.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Campaign Statistics */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card glow-border p-8 bg-black/40 backdrop-blur-3xl border-white/5"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-6 bg-primary rounded-full" />
              <h3 className="text-primary font-mono text-sm uppercase tracking-widest">Campaign Statistics</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors group">
                  <div className="text-[10px] font-mono text-white/30 uppercase mb-4 tracking-tighter">{stat.label}</div>
                  <div className="text-3xl font-black text-white mb-2 tracking-tighter group-hover:text-primary transition-colors">{stat.value}</div>
                  <div className={`text-[10px] font-mono font-bold ${stat.positive ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stat.delta}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Risk Heatmap */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card glow-border p-8 bg-black/40 backdrop-blur-3xl border-white/5"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1.5 h-6 bg-primary rounded-full" />
              <h3 className="text-primary font-mono text-sm uppercase tracking-widest">Risk Heatmap — Departments</h3>
            </div>
            
            <div className="grid grid-cols-7 gap-3 h-64 mb-6">
              {heatmapData.flat().map((val, i) => {
                const colors = [
                  'bg-slate-800/40',
                  'bg-primary/20',
                  'bg-primary/40',
                  'bg-purple-500/30',
                  'bg-purple-500/60',
                  'bg-rose-500/40',
                  'bg-rose-500/70'
                ];
                const colorIdx = Math.floor(i % colors.length);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.01 }}
                    className={`${colors[colorIdx]} rounded-md border border-white/5 hover:border-primary/40 transition-all cursor-pointer`}
                  />
                );
              })}
            </div>
            <div className="grid grid-cols-7 gap-3 text-center">
              {days.map(day => (
                <span key={day} className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{day}</span>
              ))}
            </div>
          </motion.div>

          {/* Bottom: Attack Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-card glow-border p-8 bg-black/40 backdrop-blur-3xl border-white/5"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-6 bg-primary rounded-full" />
                <h3 className="text-primary font-mono text-sm uppercase tracking-widest">Attack Timeline — Today</h3>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-blink" />
                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">Real-time Feed</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {timelineData.map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <span className="text-[10px] font-mono text-white/30 group-hover:text-white/60 transition-colors w-12">{item.time}</span>
                  <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                      className="h-full bg-gradient-to-r from-primary via-indigo-500 to-purple-600 rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Holographic scanning effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent h-20 w-full animate-scanline pointer-events-none opacity-40" />
          </motion.div>
        </div>

        {/* Global Stats Footer */}
        <div className="mt-12 flex flex-wrap justify-center gap-12 sm:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] mb-2 text-white">Nodes Protected</span>
              <span className="text-2xl font-bold text-white">1.4M+</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] mb-2 text-white">Live Threats</span>
              <span className="text-2xl font-bold text-primary">0.00%</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] mb-2 text-white">Detection Time</span>
              <span className="text-2xl font-bold text-white">12.4s</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
