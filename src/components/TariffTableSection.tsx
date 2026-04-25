import { useState } from "react";
import { Zap, Calculator, DollarSign, Globe } from "lucide-react";
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
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center mb-5">
            <div className="inline-flex items-center gap-1.5 bg-white/10 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">
              <Globe className="w-3 h-3" />
              <span>State Comparison</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-1 text-white">Compare Electricity Bills</h2>
            <p className="text-xs text-white/60">See how your state compares</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex items-center gap-2 mb-4 p-2 bg-white/5 border border-white/10 rounded-lg">
            <Calculator className="w-4 h-4 text-white" />
            <span className="text-xs text-white/70">Compare at:</span>
            <input type="number" value={units} onChange={(e) => setUnits(Number(e.target.value))} className="w-20 bg-white/10 text-sm text-center rounded py-1 text-white" />
            <span className="text-xs text-white/50">units</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-4 bg-white/5 border border-white/20 rounded-xl mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-white/60">Cheapest State</p>
                <p className="text-sm font-bold text-white">{cheapest?.label}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/60">Potential Savings</p>
                <p className="text-lg font-bold text-white">₹{savings.toFixed(0)}</p>
              </div>
            </div>
          </motion.div>

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
                      ? "bg-white/10 border border-white/30" 
                      : isCheapest 
                      ? "bg-white/5 border border-white/20" 
                      : "bg-white/5 border border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCheapest ? "bg-white text-black" : "bg-white/20 text-white"
                    }`}>
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-xs font-medium text-white">{state.label}</p>
                      <p className="text-[10px] text-white/50">₹{state.rate.toFixed(2)}/unit</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${isMaharashtra ? "text-white" : isCheapest ? "text-white" : "text-white/80"}`}>
                      ₹{state.bill.toFixed(0)}
                    </p>
                    {isMaharashtra && <p className="text-[8px] text-white/70">Your State</p>}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <p className="text-[10px] text-white/40 mt-3 text-center">* Estimates only. Verify with local DISCOM.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default TariffTableSection;