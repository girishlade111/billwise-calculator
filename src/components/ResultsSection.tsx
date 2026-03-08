import { BillResult, TARIFF_DATA } from "@/data/tariffData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Printer, RefreshCw, X, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

interface ResultsSectionProps {
  result: BillResult;
  prevResult?: BillResult | null;
}

const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2 });

const ResultsSection = ({ result, prevResult }: ResultsSectionProps) => {
  const [showShareModal, setShowShareModal] = useState(false);

  const getRatingBadge = (total: number, units: number) => {
    if (units < 100 || total < 300) return { emoji: "🟢", label: "Low Usage — Great job!", bg: "bg-success/15 text-success" };
    if (total < 800) return { emoji: "🟡", label: "Moderate Usage — Room to save", bg: "bg-accent/15 text-accent-foreground" };
    if (total < 1500) return { emoji: "🟠", label: "High Usage — Check tips below", bg: "bg-warning/15 text-warning" };
    return { emoji: "🔴", label: "Very High Usage — Read saving tips urgently", bg: "bg-destructive/15 text-destructive" };
  };

  const rating = getRatingBadge(result.total, result.units);
  const slabColors = ["bg-success", "bg-accent", "bg-warning", "bg-destructive", "bg-destructive"];
  const slabTextColors = ["text-success", "text-accent", "text-warning", "text-destructive", "text-destructive"];

  const stateKey = Object.keys(TARIFF_DATA).find(k => TARIFF_DATA[k].name === result.stateName) || "";
  const stateData = TARIFF_DATA[stateKey];
  const slabs = stateData?.residential.slabs || [];
  const dutyPct = stateData ? Math.round(stateData.residential.electricityDuty * 100) : 0;

  // Calculate slab boundaries for labels
  const slabBoundaries = [0, ...slabs.map(s => s.upTo === Infinity ? 1000 : s.upTo)];
  const maxBar = Math.max(1000, result.units);

  // User position percentage on bar
  const userPosPercent = Math.min((result.units / maxBar) * 100, 100);

  const now = new Date();
  const monthYear = now.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  const diff = prevResult ? result.total - prevResult.total : 0;
  const pctChange = prevResult && prevResult.total > 0 ? ((diff / prevResult.total) * 100) : 0;

  return (
    <>
      <section id="results" className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-6">

            {/* CARD 1 — Main Bill Summary */}
            <Card className="shadow-xl border-0 rounded-2xl overflow-hidden animate-fade-in">
              <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{result.stateName}</p>
                  <span className="text-xs bg-primary-foreground/15 px-2 py-0.5 rounded-full">Residential</span>
                </div>
                <p className="text-sm opacity-80">⚡ Estimated Bill</p>
              </div>
              <CardContent className="p-6 text-center">
                <p className="text-5xl md:text-6xl font-bold text-accent my-4">
                  ₹{fmt(result.total)}
                </p>
                <p className="text-sm text-muted-foreground mb-4">for {result.units} units consumed</p>
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${rating.bg} animate-scale-in`}>
                  <span>{rating.emoji}</span> {rating.label}
                </div>
              </CardContent>
            </Card>

            {/* CARD 2 — Slab Visual Bar */}
            <Card className="border-0 shadow-lg rounded-2xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">📊 Your Slab Breakdown</h3>
                <div className="relative">
                  <div className="flex h-10 rounded-full overflow-hidden">
                    {slabs.map((slab, i) => {
                      const prevLimit = i === 0 ? 0 : (slabs[i - 1].upTo === Infinity ? 0 : slabs[i - 1].upTo);
                      const slabMax = slab.upTo === Infinity ? maxBar : slab.upTo;
                      return (
                        <div
                          key={i}
                          className={`${slabColors[i]} relative flex items-center justify-center text-xs font-medium text-white transition-all duration-500`}
                          style={{ flex: slabMax - prevLimit }}
                        >
                          ₹{slab.rate}
                        </div>
                      );
                    })}
                  </div>
                  {/* User position marker */}
                  <div
                    className="absolute top-0 h-10 w-0.5 border-l-2 border-dashed border-white/80"
                    style={{ left: `${userPosPercent}%` }}
                  />
                </div>
                {/* Slab boundary labels */}
                <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                  {slabBoundaries.map((b, i) => (
                    <span key={i}>{b === 1000 ? "1000+" : b}</span>
                  ))}
                </div>
                <p className={`text-sm font-medium mt-2 ${slabTextColors[result.currentSlabIndex]}`}>
                  You are in Slab {result.currentSlabIndex + 1}
                </p>
              </CardContent>
            </Card>

            {/* CARD 3 — Detailed Breakdown Table */}
            <Card className="border-0 shadow-lg rounded-2xl animate-fade-in" style={{ animationDelay: "0.15s" }}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">🧾 Bill Breakdown</h3>
                <div className="rounded-lg border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-3 font-medium">Component</th>
                        <th className="text-right p-3 font-medium">Units/Detail</th>
                        <th className="text-right p-3 font-medium">Rate</th>
                        <th className="text-right p-3 font-medium">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.slabBreakdown.map((s, i) => (
                        <tr
                          key={i}
                          className={`transition-colors ${
                            i === result.currentSlabIndex
                              ? "bg-accent/10 border-l-2 border-l-accent"
                              : i % 2 === 0
                              ? "bg-muted/30"
                              : ""
                          }`}
                        >
                          <td className="p-3">{s.slabLabel}</td>
                          <td className="p-3 text-right">{s.units}</td>
                          <td className="p-3 text-right">₹{s.rate.toFixed(2)}</td>
                          <td className="p-3 text-right">₹{fmt(s.amount)}</td>
                        </tr>
                      ))}
                      <tr className={result.slabBreakdown.length % 2 === 0 ? "bg-muted/30" : ""}>
                        <td className="p-3">Fixed Charges</td>
                        <td className="p-3 text-right">—</td>
                        <td className="p-3 text-right">—</td>
                        <td className="p-3 text-right">₹{fmt(result.fixedCharge)}</td>
                      </tr>
                      {result.fuelSurchargeAmount > 0 && (
                        <tr className={result.slabBreakdown.length % 2 === 1 ? "bg-muted/30" : ""}>
                          <td className="p-3">Fuel Surcharge</td>
                          <td className="p-3 text-right">{result.units} units</td>
                          <td className="p-3 text-right">₹{stateData?.residential.fuelSurcharge.toFixed(2)}/unit</td>
                          <td className="p-3 text-right">₹{fmt(result.fuelSurchargeAmount)}</td>
                        </tr>
                      )}
                      {result.electricityDuty > 0 && (
                        <tr className="bg-muted/30">
                          <td className="p-3">Electricity Duty ({dutyPct}%)</td>
                          <td className="p-3 text-right">—</td>
                          <td className="p-3 text-right">{dutyPct}% of energy</td>
                          <td className="p-3 text-right">₹{fmt(result.electricityDuty)}</td>
                        </tr>
                      )}
                      <tr className="border-t-2 border-border font-bold text-base">
                        <td className="p-3" colSpan={3}>Total Payable</td>
                        <td className="p-3 text-right text-accent">₹{fmt(result.total)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* CARD 4 — Before/After Comparison */}
            {prevResult && (
              <Card className="border-0 shadow-lg rounded-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">📅 Month-over-Month Comparison</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-xl p-4 text-center">
                      <p className="text-sm text-muted-foreground">Last Month</p>
                      <p className="text-2xl font-bold mt-1">₹{fmt(prevResult.total)}</p>
                      <p className="text-sm text-muted-foreground">{prevResult.units} units</p>
                    </div>
                    <div className="border-2 border-accent rounded-xl p-4 text-center">
                      <p className="text-sm text-muted-foreground">This Month</p>
                      <p className="text-2xl font-bold mt-1">₹{fmt(result.total)}</p>
                      <p className="text-sm text-muted-foreground">{result.units} units</p>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    {diff < 0 ? (
                      <div>
                        <p className="text-success font-semibold flex items-center justify-center gap-2">
                          <TrendingDown className="w-5 h-5" />
                          🎉 You saved ₹{fmt(Math.abs(diff))} this month!
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">({pctChange.toFixed(1)}%)</p>
                      </div>
                    ) : diff > 0 ? (
                      <div>
                        <p className="text-destructive font-semibold flex items-center justify-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          ⚠️ Bill increased by ₹{fmt(diff)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">(+{pctChange.toFixed(1)}%)</p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground font-medium">= Same as last month</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CARD 5 — Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: "0.25s" }}>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
              >
                <RefreshCw className="w-4 h-4" /> Recalculate
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => window.print()}>
                <Printer className="w-4 h-4" /> Print Bill
              </Button>
              <Button className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setShowShareModal(true)}>
                <Camera className="w-4 h-4" /> Screenshot Card
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowShareModal(false)}>
          <div
            className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Shareable Card */}
            <div className="border-2 border-accent/30 rounded-xl p-5 space-y-3 bg-card">
              <p className="font-bold text-lg text-center">⚡ My Electricity Bill — {monthYear}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">State</span><span className="font-medium">{result.stateName}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Units</span><span className="font-medium">{result.units} kWh</span></div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="font-semibold">Total Amount</span>
                  <span className="text-xl font-bold text-accent">₹{fmt(result.total)}</span>
                </div>
              </div>
              <div className="border-t pt-2 text-center">
                <p className="text-xs text-muted-foreground">🔗 Calculated on BillMeter — ladestack.in</p>
                <p className="text-xs text-muted-foreground mt-1">Share with family & friends!</p>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-4">
              📱 Take a screenshot and share on WhatsApp!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultsSection;
