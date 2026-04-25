import { Zap, Sun, Moon, Sparkles, ShieldCheck, Smartphone, Globe, Users, ArrowRight, ChevronDown, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface HeroSectionProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

const features = [
  { icon: Sparkles, label: "2026 Slabs", color: "bg-amber-500/20 text-amber-400" },
  { icon: Globe, label: "10+ States", color: "bg-blue-500/20 text-blue-400" },
  { icon: ShieldCheck, label: "No Login", color: "bg-green-500/20 text-green-400" },
  { icon: Smartphone, label: "Mobile", color: "bg-purple-500/20 text-purple-400" },
  { icon: Users, label: "50K+ Users", color: "bg-pink-500/20 text-pink-400" },
  { icon: Calculator, label: "100% Free", color: "bg-cyan-500/20 text-cyan-400" },
];

const HeroSection = ({ darkMode, onToggleDark }: HeroSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex flex-col bg-gradient-to-br from-slate-900 via-slate-900 to-primary text-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-amber-500/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-20 -right-20 w-[350px] h-[350px] bg-amber-500/15 rounded-full blur-[80px]" 
        />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Nav */}
      <div className="relative z-10 container mx-auto px-3 pt-4">
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <motion.div whileHover={{ rotate: 180, scale: 1.05 }} className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-amber-400 to-amber-500 p-1.5 rounded-lg shadow-lg shadow-amber-500/30">
              <Zap className="w-4 h-4 text-slate-900" />
            </div>
            <span className="text-lg font-bold">BillMeter</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" onClick={onToggleDark} className="text-slate-300 hover:text-white hover:bg-white/10 rounded-lg" aria-label="Toggle theme">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-10 flex-1 container mx-auto px-3 flex items-center justify-center pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ delay: 0.15, type: "spring" }} className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold mb-5">
            <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>2026 Tariffs</span>
          </motion.div>

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }} className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Calculate Your <span className="text-amber-400">Electricity Bill</span>
            <br />
            <span className="text-xl md:text-2xl font-bold text-slate-300">Instantly & Accurately</span>
          </motion.h1>

          {/* Description */}
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.35 }} className="text-sm md:text-base text-slate-400 mb-6 max-w-lg mx-auto">
            State-wise slab calculation with accurate 2026 tariff data — completely free, no login.
          </motion.p>

          {/* Features */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.45 }} className="flex flex-wrap justify-center gap-2 mb-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.label} initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.1 * i + 0.5 }} whileHover={{ scale: 1.05, y: -2 }} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 ${feature.color}`}>
                  <Icon className="w-3 h-3" />
                  {feature.label}
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.a href="#calculator" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 hover:from-amber-400 hover:to-amber-500 text-sm px-6 py-5 rounded-xl font-bold shadow-lg shadow-amber-500/30 group">
                <Zap className="w-4 h-4 mr-1.5" />
                Calculate My Bill
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </motion.a>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="ghost" size="lg" className="text-slate-300 hover:text-white text-sm px-4 rounded-lg" onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}>
                How it Works
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust */}
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }} className="mt-5 text-xs text-slate-500">
            Trusted by <span className="text-white font-semibold">50,000+</span> households in India
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 5, 0] }} transition={{ delay: 1, duration: 2, repeat: Infinity }} className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500">
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
};

export default HeroSection;