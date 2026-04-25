import { BillResult, TARIFF_DATA } from "@/data/tariffData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Printer, RefreshCw, X, TrendingUp, TrendingDown, Receipt, Calendar, Percent, Zap } from "lucide-react";
import { useState } from "react";

interface ResultsSectionProps {
  result: BillResult;
  prevResult?: BillResult | null;
}

const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2 });

const ResultsSection = ({ result, prevResult }: ResultsSectionProps) => {
  const [showShareModal, setShowShareModal] = useState(false);

  const getRatingBadge = (total: number, units: number) => {
    if (units < 100 || total < 300) return { emoji: "🟢", label: "Low Usage — Great job!", bg: "bg-success/15 text-success border-success/30" };
    if (total < 800) return { emoji: "🟡", label: "Moderate Usage — Room to save", bg: "bg-accent/15 text-accent-foreground border-accent/30" };
    if (total < 1500) return { emoji: "🟠", label: "High Usage — Check tips below", bg: "bg-warning/15 text-warning border-warning/30" };
    return { emoji: "🔴", label: "Very High Usage — Urgent attention needed", bg: "bg-destructive/15 text-destructive border-destructive/30" };
  };

  const rating = getRatingBadge(result.total, result.units);
  const slabColors = ["bg-success", "bg-accent", "bg-warning", "bg-destructive", "bg-destructive"];
  const slabTextColors = ["text-success", "text-accent", "text-warning", "text-destructive", "text-destructive"];

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

  const handleRecalculate = () => {
    const el = document.getElementById("calculator");
    el?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const input = el?.querySelector("input[type='number']") as HTMLInputElement;
      input?.focus();
    }, 500);
  };

  return (
    <>
      <section id="results" className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 via-secondary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-6">

            {/* Main Card */}
            <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden animate-fade-in-up">
              <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground p-6 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    <p className="font-bold text-lg">{result.stateName}</p>
                  </div>
                  <span className="text-xs bg-primary-foreground/15 px-3 py-1 rounded-full font-medium">Residential</span>
                </div>
                <p className="text-sm opacity-80">Estimated Bill</p>
              </div>
              <CardContent className="p-8 text-center space-y-4">
                <p className="text-5xl md:text-6xl font-bold text-accent">
                  ₹{fmt(result.total)}
                </p>
                <p className="text-muted-foreground text-lg">{result.units} units consumed this month</p>
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-semibold ${rating.bg} border animate-scale-in`}>
                  <span className="text-lg">{rating.emoji}</span> {rating.label}
                </div>
              </CardContent>
            </Card>

            {/* Slab Visual */}
            <Card className="border-0 shadow-xl rounded-2xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-6 md:p-8">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-accent" /> Your Slab Breakdown
                </h3>
                <div className="relative mb-4">
                  <div className="flex h-12 rounded-2xl overflow-hidden shadow-inner">
                    {slabs.map((slab, i) => {
                      const prevLimit = i === 0 ? 0 : (slabs[i - 1].upTo === Infinity ? 0 : slabs[i - 1].upTo);
                      const slabMax = slab.upTo === Infinity ? maxBar : slab.upTo;
                      return (
                        <div
                          key={i}
                          className={`${slabColors[i]} relative flex items-center justify-center text-xs font-bold text-white`}
                          style={{ flex: slabMax - prevLimit }}
                        >
                          <span className="hidden sm:block">₹{slab.rate}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className="absolute top-0 h-12 w-1 bg-white/80 shadow-lg"
                    style={{ left: `${userPosPercent}%`, transform: "translateX(-50%)" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mb-4 font-medium">
                  {slabBoundaries.map((b, i) => (
                    <span key={i}>{b === 1000 ? "1000+" : b}</span>
                  ))}
                </div>
                <div className={`text-center px-5 py-3 rounded-xl ${slabTextColors[result.currentSlabIndex]}/15 border ${slabTextColors[result.currentSlabIndex]}/30`}>
                  <span className="font-semibold">Currently in Slab {result.currentSlabIndex + 1}</span>
                </div>
              </CardContent>
            </Card>

            {/* Breakdown Table */}
            <Card className="border-0 shadow-xl rounded-2xl animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              <CardContent className="p-6 md:p-8">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <Percent className="w-5 h-5 text-accent" /> Detailed Breakdown
                </h3>
                <div className="rounded-2xl border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4 font-semibold">Component</th>
                        <th className="text-right p-4 font-semibold">Units</th>
                        <th className="text-right p-4 font-semibold">Rate</th>
                        <th className="text-right p-4 font-semibold">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.slabBreakdown.map((s, i) => (
                        <tr
                          key={i}
                          className={`transition-colors ${
                            i === result.currentSlabIndex
                              ? "bg-accent/10 border-l-4 border-l-accent"
                              : i % 2 === 0
                              ? "bg-muted/30"
                              : ""
                          }`}
                        >
                          <td className="p-4 font-medium">{s.slabLabel}</td>
                          <td className="p-4 text-right">{s.units}</td>
                          <td className="p-4 text-right">₹{s.rate.toFixed(2)}</td>
                          <td className="p-4 text-right font-semibold">₹{fmt(s.amount)}</td>
                        </tr>
                      ))}
                      <tr className={result.slabBreakdown.length % 2 === 0 ? "bg-muted/30" : ""}>
                        <td className="p-4 font-medium">Fixed Charges</td>
                        <td className="p-4 text-right">—</td>
                        <td className="p-4 text-right">—</td>
                        <td className="p-4 text-right font-semibold">₹{fmt(result.fixedCharge)}</td>
                      </tr>
                      {result.fuelSurchargeAmount > 0 && (
                        <tr className={result.slabBreakdown.length % 2 === 1 ? "bg-muted/30" : ""}>
                          <td className="p-4 font-medium">Fuel Surcharge</td>
                          <td className="p-4 text-right">{result.units}</td>
                          <td className="p-4 text-right">₹{stateData?.residential.fuelSurcharge.toFixed(2)}/unit</td>
                          <td className="p-4 text-right font-semibold">₹{fmt(result.fuelSurchargeAmount)}</td>
                        </tr>
                      )}
                      {result.electricityDuty > 0 && (
                        <tr className="bg-muted/50">
                          <td className="p-4 font-semibold">Electricity Duty ({dutyPct}%)</td>
                          <td className="p-4 text-right">—</td>
                          <td className="p-4 text-right">{dutyPct}%</td>
                          <td className="p-4 text-right font-semibold text-accent">₹{fmt(result.electricityDuty)}</td>
                        </tr>
                      )}
                      <tr className="border-t-2 border-accent/30 bg-accent/10 font-bold text-base">
                        <td className="p-4" colSpan={3}>Total Payable</td>
                        <td className="p-4 text-right text-accent">₹{fmt(result.total)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Comparison */}
            {prevResult && (
              <Card className="border-0 shadow-xl rounded-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <CardContent className="p-6 md:p-8">
                  <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent" /> Month-over-Month
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="border-2 border-muted rounded-2xl p-5 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Last Month</p>
                      <p className="text-2xl font-bold">₹{fmt(prevResult.total)}</p>
                      <p className="text-sm text-muted-foreground mt-1">{prevResult.units} units</p>
                    </div>
                    <div className="border-2 border-accent rounded-2xl p-5 text-center bg-accent/5">
                      <p className="text-sm text-muted-foreground mb-2">This Month</p>
                      <p className="text-2xl font-bold text-accent">₹{fmt(result.total)}</p>
                      <p className="text-sm text-muted-foreground mt-1">{result.units} units</p>
                    </div>
                  </div>
                  <div className="text-center">
                    {diff < 0 ? (
                      <div className="bg-success/10 border border-success/30 rounded-xl p-4">
                        <p className="text-success font-bold flex items-center justify-center gap-2">
                          <TrendingDown className="w-5 h-5" />
                          Saved ₹{fmt(Math.abs(diff))} this month!
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{pctChange.toFixed(1)}% less</p>
                      </div>
                    ) : diff > 0 ? (
                      <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4">
                        <p className="text-destructive font-bold flex items-center justify-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          +₹{fmt(diff)} increased
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">+{pctChange.toFixed(1)}%</p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground font-medium">= Same as last month</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
              <Button
                variant="outline"
                className="gap-2 rounded-xl"
                onClick={handleRecalculate}
              >
                <RefreshCw className="w-4 h-4" /> Recalculate
              </Button>
              <Button variant="outline" className="gap-2 rounded-xl" onClick={() => window.print()}>
                <Printer className="w-4 h-4" /> Print
              </Button>
              <Button className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl" onClick={() => setShowShareModal(true)}>
                <Camera className="w-4 h-4" /> Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setShowShareModal(false)}>
          <div className="bg-card rounded-3xl shadow-2xl max-w-sm w-full p-6 relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowShareModal(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
            <div className="border-2 border-accent/20 rounded-2xl p-6 bg-gradient-to-br from-muted/30 to-muted/10">
              <p className="font-bold text-lg text-center mb-4">⚡ My Electricity Bill</p>
              <p className="text-center text-muted-foreground text-sm mb-4">{monthYear}</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">State</span><span className="font-medium">{result.stateName}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Units</span><span className="font-medium">{result.units} kWh</span></div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-accent">₹{fmt(result.total)}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4">
              Calculated on BillMeter — ladestack.in
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultsSection;
