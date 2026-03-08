import { BarChart3, Wind, Thermometer, Sun, Droplets, TrendingDown, Lightbulb, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tips = [
  {
    icon: BarChart3,
    iconColor: "text-accent",
    badge: "⭐ Most Important",
    title: "Stay Under Slab Limit",
    body: "In Maharashtra, crossing 300 units jumps rate from ₹9.64 to ₹12.83/unit for ALL excess units. Using 299 units instead of 301 can save ₹50–₹100. Track monthly usage carefully.",
    savings: "💰 Save ₹50–₹200/month",
  },
  {
    icon: Wind,
    iconColor: "text-blue-500",
    title: "Switch to BLDC Fans",
    body: "BLDC fans use only 28–35W vs 75W for regular fans. Running 4 BLDC fans 12hrs/day saves ~50 units/month. Initial cost ₹2,000–₹3,500, payback in under 6 months.",
    savings: "💰 Save ₹150–₹400/year",
  },
  {
    icon: Thermometer,
    iconColor: "text-blue-500",
    title: "Set AC to 24°C",
    body: "BEE recommends 24°C as the standard AC temperature. Every 1°C increase saves 6% power. Going from 18°C to 24°C = 36% savings on AC electricity. Use inverter AC with 5-star rating.",
    savings: "💰 Save ₹300–₹800/month in summer",
  },
  {
    icon: Sun,
    iconColor: "text-yellow-500",
    badge: "🔥 Trending",
    title: "Rooftop Solar + Net Metering",
    body: "MSEDCL's net metering lets solar users offset their bill. A 2kW system (₹80,000–₹1,00,000 after subsidy) can reduce a 400-unit bill to near zero. Payback: 3–4 years. PM Surya Ghar scheme gives up to ₹78,000 subsidy.",
    savings: "💰 Save ₹800–₹1,500/month",
  },
  {
    icon: Droplets,
    iconColor: "text-cyan-500",
    title: "Smart Geyser Usage",
    body: "A 2000W geyser for 30 mins = 1 unit. Limit to 8–10 mins per use. Insulate pipes to retain heat. A solar water heater (₹15,000–₹25,000) can reduce geyser usage by 70%.",
    savings: "💰 Save ₹100–₹300/month",
  },
  {
    icon: TrendingDown,
    iconColor: "text-success",
    badge: "🆕 New 2026",
    title: "MSEDCL 2026 Tariff Cuts",
    body: "MSEDCL reduced tariffs by 1%–10% effective 2025–26. Consumers under 100 units/month get 10% reduction. Over 5 years, total 26% reduction planned till 2029–30. Check if you qualify for BPL subsidies.",
    savings: "💰 Auto saving — just stay informed",
  },
  {
    icon: Lightbulb,
    iconColor: "text-yellow-500",
    title: "100% LED Lighting",
    body: "9W LED = 40W incandescent bulb (same brightness). Replace 10 old lights running 6hrs/day → saves 18 units/month → ₹150–₹200 saved. LED lifespan: 25,000 hours vs 1,000 hours for bulbs.",
    savings: "💰 Save ₹150–₹250/month",
  },
  {
    icon: Clock,
    iconColor: "text-purple-500",
    title: "Off-Peak Appliance Usage",
    body: "Heavy appliances (washing machine, iron, water pump) used at night (11PM–6AM) can benefit from Time-of-Day (ToD) tariffs in some states. Also reduces grid load and prevents voltage drops.",
    savings: "💰 Save ₹50–₹150/month",
  },
];

const TipsSection = () => (
  <section id="saving-tips" className="py-12 md:py-16 bg-accent/5">
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">💡 Smart Ways to Reduce Your Electricity Bill</h2>
          <p className="text-muted-foreground mb-3">Practical tips proven to reduce bills in Maharashtra & all Indian homes</p>
          <span className="inline-flex items-center gap-1.5 bg-success/10 text-success px-4 py-1.5 rounded-full text-sm font-semibold">
            Save ₹200–₹2000/month with these tips
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((tip, i) => {
            const Icon = tip.icon;
            return (
              <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-lg bg-muted ${tip.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {tip.badge && (
                      <span className="text-xs font-semibold bg-accent/10 text-accent-foreground px-2 py-0.5 rounded-full">
                        {tip.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-base">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tip.body}</p>
                  <p className="text-xs font-medium text-success bg-success/10 px-2.5 py-1 rounded-full inline-block">
                    {tip.savings}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Savings Callout */}
        <div className="mt-8 bg-accent/10 border border-accent/30 rounded-xl p-5 text-center">
          <p className="font-semibold mb-1">
            💡 Implementing all tips above can reduce a ₹2,000 monthly bill to ₹800–₹1,200.
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            That's ₹9,600–₹14,400 savings per year — enough for a new AC!
          </p>
          <a href="#calculator">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
              Calculate your potential savings →
            </Button>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default TipsSection;
