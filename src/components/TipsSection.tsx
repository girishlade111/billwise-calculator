import { Card, CardContent } from "@/components/ui/card";

const tips = [
  { icon: "📊", title: "Stay Under the Slab Limit", tip: "In Maharashtra, using 300 units instead of 301 units saves you from entering the expensive ₹12.83/unit slab. Aim to stay just under slab boundaries. Even 10 units less can save ₹100+." },
  { icon: "🌀", title: "Use BLDC Fans", tip: "BLDC fans consume only 28-35 watts vs 75W for normal fans. If you run 4 fans 12 hrs/day, BLDC saves ~50 units/month = ₹400-600 saved annually." },
  { icon: "❄️", title: "Set AC at 24°C", tip: "Every 1°C increase in AC temperature saves 6% electricity. Set your AC to 24°C instead of 18°C. Use a 5-star rated AC with inverter technology for maximum savings." },
  { icon: "☀️", title: "Install Rooftop Solar", tip: "With MSEDCL's net metering, a 2kW solar panel can reduce a 400-unit bill to near zero. Government subsidy available. Payback period: 3-4 years." },
  { icon: "🚿", title: "Smart Geyser Usage", tip: "A 2000W geyser running for 30 mins uses 1 unit. Limit geyser to 8-10 minutes. Use insulated pipes and solar water heater if possible." },
  { icon: "📉", title: "New 2026 Tariff Reduction", tip: "MSEDCL has reduced tariffs by 1%-10% in 2026. Consumers using under 100 units get 10% reduction. Under PM Surya Ghar Yojana, free electricity up to 300 units if solar installed." },
  { icon: "💡", title: "Go Full LED", tip: "Replace all CFL/tube lights with LED. A 9W LED replaces a 40W bulb with same brightness. If 10 lights run 6 hrs/day, LED saves 18 units/month = ₹150-250 saved." },
  { icon: "🕙", title: "Use Heavy Appliances at Night", tip: "Run washing machines, dishwashers and iron at night (11 PM - 6 AM). Some states offer ToD tariff discounts for off-peak usage. Check with your DISCOM." },
];

const TipsSection = () => (
  <section id="tips" className="py-12 md:py-16 bg-secondary/30">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">💡 Smart Ways to Reduce Your Electricity Bill</h2>
      <p className="text-center text-muted-foreground mb-8">Practical tips for Maharashtra & all Indian homes</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {tips.map((t) => (
          <Card key={t.title} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="text-3xl mb-3">{t.icon}</div>
              <h3 className="font-semibold mb-2">{t.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.tip}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default TipsSection;
