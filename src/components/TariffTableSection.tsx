import { useState } from "react";
import { Zap, ArrowRight, ArrowDown, TrendingUp, DollarSign, Globe, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { STATES, TARIFF_DATA } from "@/data/tariffData";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TariffTableSection = () => {
  const [units, setUnits] = useState<number>(300);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const calculateBill = (stateKey: string, units: number) => {
    const state = TARIFF_DATA[stateKey];
    if (!state) return 0;
    const { slabs, fixedCharge, electricityDuty, fuelSurcharge } = state.residential;
    let energy = 0;
    let prevLimit = 0;
    for (const slab of slabs) {
      const slabMax = slab.upTo === Infinity ? units : slab.upTo;
      const inSlab = Math.max(0, Math.min(units - prevLimit, slabMax - prevLimit));
      energy += inSlab * slab.rate;
      prevLimit = slabMax;
      if (prevLimit >= units) break;
    }
    const fc = fixedCharge.upTo1kW || 75;
    const fs = fuelSurcharge * units;
    const ed = electricityDuty * energy;
    return energy + fc + fs + ed;
  };

  const stateData = STATES.map(s => ({
    ...s,
    rate: TARIFF_DATA[s.value]?.residential.slabs[0]?.rate || 0,
    bill: calculateBill(s.value, units)
  })).sort((a, b) => a.bill - b.bill);

  const cheapest = stateData[0];
  const expensive = stateData[stateData.length - 1];
  const savings = expensive.bill - cheapest.bill;

  return (
    <section id="tariff-table" className="py-10 md:py-14 bg-black">
      <div ref={ref} className="container mx-auto px-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }} className="max-w-lg mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center mb-5">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold mb-3">
              <Globe className="w-3 h-3" />
              <span>State Comparison</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-1">📊 Compare Electricity Bills</h2>
            <p className="text-xs text-gray-400">See how your state compares</p>
          </motion.div>

          {/* Units Input */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex items-center gap-2 mb-4 p-2 bg-gray-900/50 rounded-lg">
            <Calculator className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-gray-400">Compare at:</span>
            <input type="number" value={units} onChange={(e) => setUnits(Number(e.target.value))} className="w-20 bg-gray-800 text-sm text-center rounded py-1 text-white" />
            <span className="text-xs text-gray-500">units</span>
          </motion.div>

          {/* Savings Card */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-4 bg-gradient-to-r from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Cheapest State</p>
                <p className="text-sm font-bold text-green-400">{cheapest?.label}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Potential Savings</p>
                <p className="text-lg font-bold text-white">₹{savings.toFixed(0)}</p>
              </div>
            </div>
          </motion.div>

          {/* State List */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="space-y-1.5 max-h-[350px] overflow-y-auto">
            {stateData.map((state, i) => {
              const isCheapest = i === 0;
              const isMaharashtra = state.value === "maharashtra";
              return (
                <motion.div
                  key={state.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                  className={`p-2.5 rounded-lg flex items-center justify-between ${
                    isMaharashtra 
                      ? "bg-amber-500/10 border border-amber-500/30" 
                      : isCheapest 
                      ? "bg-green-500/10 border border-green-500/20" 
                      : "bg-gray-900/40 border border-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCheapest ? "bg-green-500 text-black" : "bg-gray-700 text-gray-400"
                    }`}>
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-xs font-medium text-white">{state.label}</p>
                      <p className="text-[10px] text-gray-500">₹{state.rate.toFixed(2)}/unit</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${isMaharashtra ? "text-amber-400" : isCheapest ? "text-green-400" : "text-gray-300"}`}>
                      ₹{state.bill.toFixed(0)}
                    </p>
                    {isMaharashtra && <p className="text-[8px] text-amber-400">Your State</p>}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <p className="text-[10px] text-gray-600 mt-3 text-center">* Estimates only. Verify with local DISCOM.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default TariffTableSection;