import { BillResult, TARIFF_DATA } from "@/data/tariffData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, TrendingUp, TrendingDown } from "lucide-react";
import { useRef } from "react";

interface ResultsSectionProps {
  result: BillResult;
  prevResult?: BillResult | null;
}

const ResultsSection = ({ result, prevResult }: ResultsSectionProps) => {
  const shareRef = useRef<HTMLDivElement>(null);

  const getRatingBadge = (total: number) => {
    if (total < 300) return { emoji: "🟢", label: "Low Usage — Great job!", color: "bg-success/10 text-success" };
    if (total < 800) return { emoji: "🟡", label: "Moderate Usage — Room to save", color: "bg-accent/10 text-accent-foreground" };
    if (total < 1500) return { emoji: "🟠", label: "High Usage — Check tips below", color: "bg-warning/10 text-warning-foreground" };
    return { emoji: "🔴", label: "Very High Usage — Read saving tips urgently", color: "bg-destructive/10 text-destructive" };
  };

  const rating = getRatingBadge(result.total);
  const slabColors = ["bg-success", "bg-accent", "bg-warning", "bg-destructive", "bg-destructive"];

  const state = TARIFF_DATA[Object.keys(TARIFF_DATA).find(k => TARIFF_DATA[k].name === result.stateName) || ""];
  const slabs = state?.residential.slabs || [];

  const now = new Date();
  const monthYear = now.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  return (
    <section id="results" className="py-12 md:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
          {/* Main Bill Card */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="bg-primary text-primary-foreground p-4">
              <p className="text-sm opacity-80">{result.stateName} • {result.category} • {result.units} units</p>
            </div>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Estimated Bill Amount</p>
              <p className="text-4xl md:text-5xl font-extrabold text-accent">₹{result.total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>

              <div className={`inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full text-sm font-medium ${rating.color}`}>
                <span>{rating.emoji}</span> {rating.label}
              </div>

              {/* Slab Breakdown */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Slab Breakdown</h3>
                <div className="rounded-lg border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-3 font-medium">Slab</th>
                        <th className="text-right p-3 font-medium">Units</th>
                        <th className="text-right p-3 font-medium">Rate (₹)</th>
                        <th className="text-right p-3 font-medium">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.slabBreakdown.map((s, i) => (
                        <tr key={i} className={i === result.currentSlabIndex ? "bg-accent/10 font-semibold" : ""}>
                          <td className="p-3">{s.slabLabel}</td>
                          <td className="p-3 text-right">{s.units}</td>
                          <td className="p-3 text-right">₹{s.rate.toFixed(2)}</td>
                          <td className="p-3 text-right">₹{s.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Charges Summary */}
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Energy Charges</span><span>₹{result.energyCharge.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Fixed Charges</span><span>₹{result.fixedCharge.toFixed(2)}</span></div>
                {result.fuelSurchargeAmount > 0 && (
                  <div className="flex justify-between"><span>Fuel Surcharge</span><span>₹{result.fuelSurchargeAmount.toFixed(2)}</span></div>
                )}
                {result.electricityDuty > 0 && (
                  <div className="flex justify-between"><span>Electricity Duty</span><span>₹{result.electricityDuty.toFixed(2)}</span></div>
                )}
                <div className="flex justify-between font-bold text-base pt-2 border-t">
                  <span>Total Payable</span><span className="text-accent">₹{result.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Slab Visual Bar */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Slab Visualization</h3>
              <div className="flex h-8 rounded-full overflow-hidden">
                {slabs.map((slab, i) => {
                  const prevLimit = i === 0 ? 0 : (slabs[i - 1].upTo === Infinity ? 0 : slabs[i - 1].upTo);
                  const maxVal = slab.upTo === Infinity ? Math.max(result.units, prevLimit + 200) : slab.upTo;
                  return (
                    <div
                      key={i}
                      className={`${slabColors[i]} relative flex items-center justify-center text-xs font-medium text-white`}
                      style={{ flex: maxVal - prevLimit }}
                    >
                      ₹{slab.rate}
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-2">You are in Slab {result.currentSlabIndex + 1}</p>
            </CardContent>
          </Card>

          {/* Comparison */}
          {prevResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">Last Month</p>
                  <p className="text-2xl font-bold mt-1">₹{prevResult.total.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">{prevResult.units} units</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold mt-1">₹{result.total.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">{result.units} units</p>
                </CardContent>
              </Card>
              <Card className="md:col-span-2 border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  {result.total < prevResult.total ? (
                    <p className="text-success font-semibold flex items-center justify-center gap-2">
                      <TrendingDown className="w-5 h-5" />
                      You saved ₹{(prevResult.total - result.total).toFixed(2)} this month 🎉
                    </p>
                  ) : (
                    <p className="text-destructive font-semibold flex items-center justify-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Bill increased by ₹{(result.total - prevResult.total).toFixed(2)} ⚠️
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Shareable Card */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div ref={shareRef} className="bg-card border rounded-xl p-6 space-y-3">
                <p className="font-bold text-lg">📊 My Electricity Bill — {monthYear}</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div><p className="text-xs text-muted-foreground">State</p><p className="font-semibold">{result.stateName}</p></div>
                  <div><p className="text-xs text-muted-foreground">Units</p><p className="font-semibold">{result.units}</p></div>
                  <div><p className="text-xs text-muted-foreground">Amount</p><p className="font-semibold text-accent">₹{result.total.toFixed(0)}</p></div>
                </div>
                <p className="text-xs text-muted-foreground text-center pt-2 border-t">
                  Calculated on BillMeter by Lade Stack — ladestack.in
                </p>
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" className="gap-2">
                  <Camera className="w-4 h-4" /> Share / Screenshot This
                </Button>
                <p className="text-xs text-muted-foreground mt-2">Take a screenshot and share with family!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
