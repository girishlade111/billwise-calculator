import { useState } from "react";
import { Zap, Calculator, DollarSign, Sun, TrendingUp, TrendingDown, AlertTriangle, Clock, Download, History, ArrowRight, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BillResult, TARIFF_DATA } from "@/data/tariffData";
import { motion } from "framer-motion";

interface ResultsSectionProps {
  result: BillResult;
  prevResult?: BillResult | null;
}

const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2 });

const ResultsSection = ({ result, prevResult }: ResultsSectionProps) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const getRatingBadge = (total: number, units: number) => {
    if (units < 100 || total < 300) return { label: "Low Usage", bg: "bg-white/10 text-white border-white/20" };
    if (total < 800) return { label: "Moderate", bg: "bg-white/20 text-white border-white/30" };
    if (total < 1500) return { label: "High Usage", bg: "bg-white/30 text-white border-white/40" };
    return { label: "Very High", bg: "bg-white/40 text-white border-white/50" };
  };

  const rating = getRatingBadge(result.total, result.units);
  const slabColors = ["bg-white/30", "bg-white/40", "bg-white/50", "bg-white/60", "bg-white/70"];

  const stateKey = Object.keys(TARIFF_DATA).find(k => TARIFF_DATA[k].name === result.stateName) || "";
  const stateData = TARIFF_DATA[stateKey];
  const slabs = stateData?.residential.slabs || [];
  const dutyPct = stateData ? Math.round(stateData.residential.electricityDuty * 100) : 0;

  const slabBoundaries = [0, ...slabs.map(s => s.upTo === Infinity ? 1000 : s.upTo)];
  const maxBar = Math.max(1000, result.units);

  const now = new Date();
  const monthYear = now.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  const diff = prevResult ? result.total - prevResult.total : 0;

  const annualProjection = result.total * 12;
  const dailyAverage = result.total / 30;

  const handleRecalculate = () => {
    const el = document.getElementById("calculator");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const saveBill = () => {
    const bills = JSON.parse(localStorage.getItem("billwise_bills") || "[]");
    bills.push({ date: monthYear, units: result.units, amount: result.total, state: result.stateName });
    localStorage.setItem("billwise_bills", JSON.stringify(bills.slice(-50)));
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  return (
    <>
      <section id="results" className="py-10 md:py-14 bg-black">
        <div className="container mx-auto px-3">
          <div className="max-w-md mx-auto space-y-3">

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/20 rounded-2xl overflow-hidden">
              <div className="bg-white/5 p-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-white" />
                  <p className="font-bold text-white">{result.stateName}</p>
                </div>
                <p className="text-xs text-white/50">Estimated Bill</p>
              </div>
              <CardContent className="p-4 text-center space-y-3">
                <p className="text-4xl font-bold text-white">₹{fmt(result.total)}</p>
                <p className="text-sm text-white/60">{result.units} units this month</p>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${rating.bg}`}>
                  {rating.label}
                </div>
              </CardContent>
            </motion.div>

            <div className="grid grid-cols-2 gap-2">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-[10px] text-white/60">Daily Average</p>
                <p className="text-sm font-bold text-white">₹{dailyAverage.toFixed(0)}/day</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-[10px] text-white/60">Annual Projected</p>
                <p className="text-sm font-bold text-white">₹{annualProjection.toLocaleString()}</p>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex h-6 rounded-lg overflow-hidden mb-2">
                {slabs.map((slab, i) => {
                  const prevLimit = i === 0 ? 0 : slabs[i - 1].upTo;
                  const slabMax = slab.upTo === Infinity ? maxBar : slab.upTo;
                  return (
                    <div key={i} className={`${slabColors[i]} flex items-center justify-center text-[10px] font-bold text-white`} style={{ flex: slabMax - prevLimit }}>
                      ₹{slab.rate}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] text-white/50">
                {slabBoundaries.map((b, i) => (<span key={i}>{b === 1000 ? "1000+" : b}</span>))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-xs font-semibold text-white/80 mb-2">Bill Breakdown</p>
              <div className="space-y-1.5 text-xs">
                {result.slabBreakdown.map((s, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-white/60">{s.slabLabel}</span>
                    <span className="text-white font-mono">₹{fmt(s.amount)}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-white/10 pt-1.5 mt-1.5">
                  <span className="text-white/60">Fixed Charges</span>
                  <span className="text-white font-mono">₹{fmt(result.fixedCharge)}</span>
                </div>
                {result.electricityDuty > 0 && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Duty ({dutyPct}%)</span>
                    <span className="text-white font-mono">₹{fmt(result.electricityDuty)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-white pt-1.5 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-white">₹{fmt(result.total)}</span>
                </div>
              </div>
            </motion.div>

            {prevResult && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-xs font-semibold text-white/80 mb-2">vs Last Month</p>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">₹{fmt(prevResult.total)} → ₹{fmt(result.total)}</span>
                  <span className={diff <= 0 ? "text-white" : "text-white/80"}>
                    {diff <= 0 ? <><TrendingDown className="w-3 h-3 inline" /> -₹{Math.abs(diff).toFixed(0)}</> : <><TrendingUp className="w-3 h-3 inline" /> +₹{diff.toFixed(0)}</>}
                  </span>
                </div>
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex gap-2">
              <Button onClick={handleRecalculate} variant="outline" className="flex-1 text-xs border-white/20 hover:bg-white/10 text-white rounded-lg">
                Recalculate
              </Button>
              <Button onClick={() => window.print()} variant="outline" className="flex-1 text-xs border-white/20 hover:bg-white/10 text-white rounded-lg">
                Print
              </Button>
              <Button onClick={saveBill} variant="outline" className="text-xs border-white/20 hover:bg-white/10 text-white rounded-lg">
                Save
              </Button>
              <Button onClick={() => setShowShareModal(true)} className="flex-1 bg-white hover:bg-white/90 text-black text-xs rounded-lg font-semibold">
                Share
              </Button>
            </motion.div>

            {showSaved && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2 bg-white/10 border border-white/20 rounded-lg text-center text-xs text-white">
                ✓ Bill saved to history!
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setShowShareModal(false)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-black border border-white/20 rounded-2xl p-5 max-w-xs w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowShareModal(false)} className="absolute top-3 right-3 text-white/50"><X className="w-4 h-4" /></button>
            <p className="font-bold text-center mb-3 text-white">My Electricity Bill</p>
            <div className="p-4 bg-white/5 rounded-xl mb-3">
              <div className="flex justify-between text-xs mb-1"><span className="text-white/60">State</span><span className="text-white">{result.stateName}</span></div>
              <div className="flex justify-between text-xs mb-1"><span className="text-white/60">Units</span><span className="text-white">{result.units} kWh</span></div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-white/10 mt-2">
                <span className="text-white">Total</span>
                <span className="text-white">₹{fmt(result.total)}</span>
              </div>
            </div>
            <p className="text-[10px] text-white/40 text-center">Calculated on BillMeter</p>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ResultsSection;