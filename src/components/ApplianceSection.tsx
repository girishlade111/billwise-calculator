import { useState, useEffect } from "react";
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
  const [autoFillUnits, setAutoFillUnits] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [savedBills, setSavedBills] = useState<{date: string; units: number; amount: number}[]>([]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    const saved = localStorage.getItem("billwise_bills");
    if (saved) setSavedBills(JSON.parse(saved));
  }, []);

  const calculateUnits = (appliance: Appliance) => (appliance.watts * appliance.hours * appliance.days) / 1000;

  const totalUnits = appliances.reduce((sum, a) => sum + calculateUnits(a), 0);
  const estimatedCost = (totalUnits * rate);

  const handleAutoFill = () => {
    setAutoFillUnits(Math.round(totalUnits));
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
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center mb-5">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold mb-3">
              <Zap className="w-3 h-3" />
              <span>Appliance Calculator</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-1">💡 Calculate by Appliances</h2>
            <p className="text-xs text-gray-400">Estimate bill based on your appliances</p>
          </motion.div>

          {/* Rate Input */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex items-center gap-2 mb-3 p-2 bg-gray-900/50 rounded-lg">
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-gray-400">Rate (₹/unit):</span>
            <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="h-8 text-sm w-20 bg-gray-800 border-gray-700" />
          </motion.div>

          {/* Appliances List */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-2 mb-4 max-h-[400px] overflow-y-auto pr-1">
            {appliances.map((appliance, i) => (
              <motion.div 
                key={appliance.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="p-2.5 bg-gray-900/60 border border-gray-800 rounded-lg flex items-center gap-2"
              >
                <input
                  type="text"
                  value={appliance.name}
                  onChange={(e) => updateAppliance(appliance.id, "name", e.target.value)}
                  className="w-20 bg-transparent text-xs font-medium text-white outline-none border-b border-gray-700 focus:border-amber-500"
                />
                <div className="flex-1 grid grid-cols-3 gap-1">
                  <div className="relative">
                    <input type="number" value={appliance.watts} onChange={(e) => updateAppliance(appliance.id, "watts", e.target.value)} className="w-full bg-gray-800 text-xs text-center rounded py-1 text-gray-300" />
                    <span className="absolute -bottom-3 left-0 text-[8px] text-gray-500">W</span>
                  </div>
                  <div className="relative">
                    <input type="number" value={appliance.hours} onChange={(e) => updateAppliance(appliance.id, "hours", e.target.value)} className="w-full bg-gray-800 text-xs text-center rounded py-1 text-gray-300" />
                    <span className="absolute -bottom-3 left-0 text-[8px] text-gray-500">hrs</span>
                  </div>
                  <div className="relative">
                    <input type="number" value={appliance.days} onChange={(e) => updateAppliance(appliance.id, "days", e.target.value)} className="w-full bg-gray-800 text-xs text-center rounded py-1 text-gray-300" />
                    <span className="absolute -bottom-3 left-0 text-[8px] text-gray-500">days</span>
                  </div>
                </div>
                <span className="text-xs text-amber-400 font-mono w-14 text-right">{calculateUnits(appliance).toFixed(1)}</span>
                <button onClick={() => removeAppliance(appliance.id)} className="text-gray-500 hover:text-red-400 p-1"><X className="w-3 h-3" /></button>
              </motion.div>
            ))}
          </motion.div>

          {/* Add/Reset Buttons */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="flex gap-2 mb-4">
            <Button onClick={addAppliance} variant="outline" size="sm" className="flex-1 text-xs border-gray-700 hover:bg-gray-800">+ Add Appliance</Button>
            <Button onClick={resetToDefaults} variant="ghost" size="sm" className="text-xs text-gray-500">Reset</Button>
          </motion.div>

          {/* Total */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-4 bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/30 rounded-xl mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">Total Consumption</span>
              <span className="text-xl font-bold text-amber-400">{totalUnits.toFixed(1)} units</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Estimated Cost</span>
              <span className="text-2xl font-bold text-white">₹{estimatedCost.toFixed(0)}</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex gap-2">
            <Button onClick={handleAutoFill} className="flex-1 bg-amber-500 hover:bg-amber-600 text-black text-sm font-semibold rounded-lg">
              Use in Calculator <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button onClick={saveBill} variant="outline" className="text-xs border-gray-700 hover:bg-gray-800 rounded-lg">
              <History className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Alert */}
          {showAlert && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-2 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">Units auto-filled in calculator!</span>
            </motion.div>
          )}

          {/* Saved Bills */}
          {savedBills.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4 p-3 bg-gray-900/50 rounded-lg">
              <p className="text-xs text-gray-500 mb-2">Recent Bills</p>
              <div className="space-y-1">
                {savedBills.slice(-3).reverse().map((bill, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-gray-500">{bill.date}</span>
                    <span className="text-gray-400">{bill.units} units = ₹{bill.amount}</span>
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