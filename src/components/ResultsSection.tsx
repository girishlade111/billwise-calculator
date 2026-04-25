import { BillResult, TARIFF_DATA } from "@/data/tariffData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Printer, RefreshCw, X, TrendingUp, TrendingDown, Zap, Receipt, Percent, Calendar, Download, Share2, Save } from "lucide-react";
import { useState } from "react";
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
    if (units < 100 || total < 300) return { emoji: "🟢", label: "Low Usage", bg: "bg-green-500/20 text-green-400 border-green-500/30" };
    if (total < 800) return { emoji: "🟡", label: "Moderate", bg: "bg-amber-500/20 text-amber-400 border-amber-500/30" };
    if (total < 1500) return { emoji: "🟠", label: "High Usage", bg: "bg-orange-500/20 text-orange-400 border-orange-500/30" };
    return { emoji: "🔴", label: "Very High", bg: "bg-red-500/20 text-red-400 border-red-500/30" };
  };

  const rating = getRatingBadge(result.total, result.units);
  const slabColors = ["bg-green-500", "bg-amber-500", "bg-orange-500", "bg-red-500", "bg-red-600"];

  const stateKey = Object.keys(TARIFF_DATA).find(k => TARIFF_DATA[k].name === result.stateName) || "";
  const stateData = TARIFF_DATA[stateKey];
  const slabs = stateData?.residential.slabs || [];
  const dutyPct = stateData ? Math.round(stateData.residential.electricityDuty * 100) : 0;

  const slabBoundaries = [0, ...slabs.map(s => s.upTo === Infinity ? 1000 : s.upTo)];
  const maxBar = Math.max(1000, result.units);
  const userPosPercent = Math.min((result.units / maxBar) * 100, 100);

  const now = new Date();
  const monthYear = now.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  const diff = prevResult ? result.total - prevResult.total : 0;
  const pctChange = prevResult && prevResult.total > 0 ? ((diff / prevResult.total) * 100) : 0;

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

            {/* Main Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <p className="font-bold text-white">{result.stateName}</p>
                </div>
                <p className="text-xs text-gray-400">Estimated Bill</p>
              </div>
              <CardContent className="p-4 text-center space-y-3">
                <p className="text-4xl font-bold text-amber-400">₹{fmt(result.total)}</p>
                <p className="text-sm text-gray-400">{result.units} units this month</p>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${rating.bg}`}>
                  <span>{rating.emoji}</span> {rating.label}
                </div>
              </CardContent>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="p-3 bg-gray-900/40 border border-gray-800 rounded-xl">
                <p className="text-[10px] text-gray-500">Daily Average</p>
                <p className="text-sm font-bold text-white">₹{dailyAverage.toFixed(0)}/day</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="p-3 bg-gray-900/40 border border-gray-800 rounded-xl">
                <p className="text-[10px] text-gray-500">Annual Projected</p>
                <p className="text-sm font-bold text-white">₹{annualProjection.toLocaleString()}</p>
              </motion.div>
            </div>

            {/* Slab Visual */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-3 bg-gray-900/40 border border-gray-800 rounded-xl">
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
              <div className="flex justify-between text-[10px] text-gray-500">
                {slabBoundaries.map((b, i) => (<span key={i}>{b === 1000 ? "1000+" : b}</span>))}
              </div>
            </motion.div>

            {/* Breakdown */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="p-3 bg-gray-900/40 border border-gray-800 rounded-xl">
              <p className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1"><Receipt className="w-3 h-3" /> Bill Breakdown</p>
              <div className="space-y-1.5 text-xs">
                {result.slabBreakdown.map((s, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-gray-400">{s.slabLabel}</span>
                    <span className="text-white font-mono">₹{fmt(s.amount)}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-gray-700 pt-1.5 mt-1.5">
                  <span className="text-gray-400">Fixed Charges</span>
                  <span className="text-white font-mono">₹{fmt(result.fixedCharge)}</span>
                </div>
                {result.electricityDuty > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duty ({dutyPct}%)</span>
                    <span className="text-white font-mono">₹{fmt(result.electricityDuty)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-white pt-1.5 border-t border-gray-700">
                  <span>Total</span>
                  <span className="text-amber-400">₹{fmt(result.total)}</span>
                </div>
              </div>
            </motion.div>

            {/* Comparison */}
            {prevResult && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="p-3 bg-gray-900/40 border border-gray-800 rounded-xl">
                <p className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1"><Calendar className="w-3 h-3" /> vs Last Month</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">₹{fmt(prevResult.total)} → ₹{fmt(result.total)}</span>
                  <span className={diff <= 0 ? "text-green-400" : "text-red-400"}>
                    {diff <= 0 ? <><TrendingDown className="w-3 h-3 inline" /> -₹{Math.abs(diff).toFixed(0)}</> : <><TrendingUp className="w-3 h-3 inline" /> +₹{diff.toFixed(0)}</>}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex gap-2">
              <Button onClick={handleRecalculate} variant="outline" className="flex-1 text-xs border-gray-700 hover:bg-gray-800 rounded-lg">
                <RefreshCw className="w-3 h-3 mr-1" /> Recalculate
              </Button>
              <Button onClick={() => window.print()} variant="outline" className="flex-1 text-xs border-gray-700 hover:bg-gray-800 rounded-lg">
                <Printer className="w-3 h-3 mr-1" /> Print
              </Button>
              <Button onClick={saveBill} variant="outline" className="text-xs border-gray-700 hover:bg-gray-800 rounded-lg">
                <Save className="w-3 h-3" />
              </Button>
              <Button onClick={() => setShowShareModal(true)} className="bg-amber-500 hover:bg-amber-600 text-black text-xs rounded-lg">
                <Share2 className="w-3 h-3" />
              </Button>
            </motion.div>

            {showSaved && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2 bg-green-500/20 border border-green-500/30 rounded-lg text-center text-xs text-green-400">
                ✓ Bill saved to history!
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setShowShareModal(false)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 max-w-xs w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowShareModal(false)} className="absolute top-3 right-3 text-gray-500"><X className="w-4 h-4" /></button>
            <p className="font-bold text-center mb-3">⚡ My Electricity Bill</p>
            <div className="p-4 bg-gray-800/50 rounded-xl mb-3">
              <div className="flex justify-between text-xs mb-1"><span className="text-gray-500">State</span><span>{result.stateName}</span></div>
              <div className="flex justify-between text-xs mb-1"><span className="text-gray-500">Units</span><span>{result.units} kWh</span></div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-700 mt-2">
                <span>Total</span>
                <span className="text-amber-400">₹{fmt(result.total)}</span>
              </div>
            </div>
            <p className="text-[10px] text-gray-500 text-center">Calculated on BillMeter</p>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ResultsSection;