import { useState } from "react";
import { Zap, Calculator, DollarSign, Sun, TrendingUp, TrendingDown, AlertTriangle, Clock, Download, History, ArrowRight, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Appliance {
  id: number;
  name: string;
  watts: number;
  hours: number;
  days: number;
}

const defaultAppliances: Appliance[] = [
  { id: 1, name: "LED Bulb", watts: 10, hours: 6, days: 30 },
  { id: 2, name: "Fan", watts: 75, hours: 12, days: 30 },
  { id: 3, name: "AC", watts: 1500, hours: 8, days: 30 },
  { id: 4, name: "Refrigerator", watts: 150, hours: 24, days: 30 },
  { id: 5, name: "Washing Machine", watts: 500, hours: 1, days: 8 },
  { id: 6, name: "TV", watts: 80, hours: 4, days: 30 },
  { id: 7, name: "Geyser", watts: 2000, hours: 0.5, days: 30 },
  { id: 8, name: "Laptop", watts: 45, hours: 8, days: 30 },
  { id: 9, name: "Water Pump", watts: 750, hours: 2, days: 30 },
  { id: 10, name: "Microwave", watts: 1000, hours: 0.5, days: 15 },
];

const ApplianceSection = () => {
  const [appliances, setAppliances] = useState<Appliance[]>(defaultAppliances);
  const [rate, setRate] = useState<number>(7);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [savedBills, setSavedBills] = useState<{date: string; units: number; amount: number}[]>([]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useState(() => {
    const saved = localStorage.getItem("billwise_bills");
    if (saved) setSavedBills(JSON.parse(saved));
  });

  const calculateUnits = (appliance: Appliance) => (appliance.watts * appliance.hours * appliance.days) / 1000;

  const totalUnits = appliances.reduce((sum, a) => sum + calculateUnits(a), 0);
  const estimatedCost = (totalUnits * rate);

  const handleAutoFill = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const addAppliance = () => {
    setAppliances([...appliances, { id: Date.now(), name: "New", watts: 50, hours: 1, days: 30 }]);
  };

  const updateAppliance = (id: number, field: keyof Appliance, value: string | number) => {
    setAppliances(appliances.map(a => a.id === id ? { ...a, [field]: field === "name" ? value : Number(value) } : a));
  };

  const removeAppliance = (id: number) => {
    setAppliances(appliances.filter(a => a.id !== id));
  };

  const resetToDefaults = () => {
    setAppliances(defaultAppliances);
  };

  const saveBill = () => {
    const newBill = { date: new Date().toLocaleDateString(), units: Math.round(totalUnits), amount: Math.round(estimatedCost) };
    const updated = [...savedBills, newBill].slice(-10);
    setSavedBills(updated);
    localStorage.setItem("billwise_bills", JSON.stringify(updated));
  };

  return (
    <section id="appliances" className="py-10 md:py-14 relative overflow-hidden bg-black">
      <div ref={ref} className="container mx-auto px-3 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }} className="max-w-lg mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center mb-5">
            <div className="inline-flex items-center gap-1.5 bg-white/10 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">
              <Zap className="w-3 h-3" />
              <span>Appliance Calculator</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-1">Calculate by Appliances</h2>
            <p className="text-xs text-white/50">Estimate bill based on your appliances</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex items-center gap-2 mb-3 p-2 bg-white/5 border border-white/10 rounded-lg">
            <DollarSign className="w-4 h-4 text-white" />
            <span className="text-xs text-white/50">Rate (₹/unit):</span>
            <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="h-8 text-sm w-20 bg-white/10 border-white/20 text-white" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-2 mb-4 max-h-[400px] overflow-y-auto pr-1">
            {appliances.map((appliance, i) => (
              <motion.div 
                key={appliance.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="p-2.5 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2"
              >
                <input
                  type="text"
                  value={appliance.name}
                  onChange={(e) => updateAppliance(appliance.id, "name", e.target.value)}
                  className="w-20 bg-transparent text-xs font-medium text-white outline-none border-b border-white/20 focus:border-white"
                />
                <div className="flex-1 grid grid-cols-3 gap-1">
                  <div className="relative">
                    <input type="number" value={appliance.watts} onChange={(e) => updateAppliance(appliance.id, "watts", e.target.value)} className="w-full bg-white/10 text-xs text-center rounded py-1 text-white" />
                    <span className="absolute -bottom-3 left-0 text-[8px] text-white/40">W</span>
                  </div>
                  <div className="relative">
                    <input type="number" value={appliance.hours} onChange={(e) => updateAppliance(appliance.id, "hours", e.target.value)} className="w-full bg-white/10 text-xs text-center rounded py-1 text-white" />
                    <span className="absolute -bottom-3 left-0 text-[8px] text-white/40">hrs</span>
                  </div>
                  <div className="relative">
                    <input type="number" value={appliance.days} onChange={(e) => updateAppliance(appliance.id, "days", e.target.value)} className="w-full bg-white/10 text-xs text-center rounded py-1 text-white" />
                    <span className="absolute -bottom-3 left-0 text-[8px] text-white/40">days</span>
                  </div>
                </div>
                <span className="text-xs text-white font-mono w-14 text-right">{calculateUnits(appliance).toFixed(1)}</span>
                <button onClick={() => removeAppliance(appliance.id)} className="text-white/40 hover:text-white p-1"><X className="w-3 h-3" /></button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="flex gap-2 mb-4">
            <Button onClick={addAppliance} variant="outline" size="sm" className="flex-1 text-xs border-white/20 hover:bg-white/10">+ Add Appliance</Button>
            <Button onClick={resetToDefaults} variant="ghost" size="sm" className="text-xs text-white/50">Reset</Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-4 bg-white/5 border border-white/20 rounded-xl mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-white/70">Total Consumption</span>
              <span className="text-xl font-bold text-white">{totalUnits.toFixed(1)} units</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/70">Estimated Cost</span>
              <span className="text-2xl font-bold text-white">₹{estimatedCost.toFixed(0)}</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex gap-2">
            <Button onClick={handleAutoFill} className="flex-1 bg-white hover:bg-white/90 text-black text-sm font-semibold rounded-lg">
              Use in Calculator <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button onClick={saveBill} variant="outline" className="text-xs border-white/20 hover:bg-white/10 rounded-lg">
              <History className="w-4 h-4" />
            </Button>
          </motion.div>

          {showAlert && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-2 bg-white/10 border border-white/20 rounded-lg flex items-center gap-2">
              <Check className="w-4 h-4 text-white" />
              <span className="text-xs text-white">Units auto-filled in calculator!</span>
            </motion.div>
          )}

          {savedBills.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4 p-3 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-xs text-white/50 mb-2">Recent Bills</p>
              <div className="space-y-1">
                {savedBills.slice(-3).reverse().map((bill, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-white/50">{bill.date}</span>
                    <span className="text-white/70">{bill.units} units = ₹{bill.amount}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ApplianceSection;