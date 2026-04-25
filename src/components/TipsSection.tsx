import { 
  BarChart3, Wind, Thermometer, Sun, Droplets, TrendingDown, 
  Lightbulb, Clock, Zap, ArrowRight, Calculator, Sparkles, Wallet, TrendingUp 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const tips = [
  {
    icon: BarChart3,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/20",
    badge: "⭐ Most Important",
    badgeColor: "bg-amber-500/20 text-amber-400",
    title: "Stay Under Slab Limit",
    body: "In Maharashtra, crossing 300 units jumps rate from ₹9.64 to ₹12.83/unit for ALL excess units. Using 299 units instead of 301 can save ₹50–₹100 monthly. Track usage carefully.",
    savings: "₹50–₹200/month",
    highlight: true,
  },
  {
    icon: Wind,
    iconColor: "text-cyan-500",
    bgColor: "bg-cyan-500/20",
    title: "Switch to BLDC Fans",
    body: "BLDC fans use only 28–35W vs 75W regular fans. Running 4 BLDC fans 12hrs/day saves ~50 units/month. Payback in under 6 months.",
    savings: "₹150–₹400/year",
  },
  {
    icon: Thermometer,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/20",
    title: "Set AC to 24°C",
    body: "BEE recommends 24°C. Every 1°C increase saves 6% power. Going from 18°C to 24°C = 36% savings. Use inverter AC with 5-star rating.",
    savings: "₹300–₹800/month",
  },
  {
    icon: Sun,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/20",
    badge: "🔥 Trending",
    badgeColor: "bg-orange-500/20 text-orange-400",
    title: "Rooftop Solar + Net Metering",
    body: "MSEDCL's net metering lets solar users offset their bill. A 2kW system (₹80,000–₹1,00,000 after subsidy) can reduce a 400-unit bill to near zero.",
    savings: "₹800–₹1,500/month",
    highlight: true,
  },
  {
    icon: Droplets,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/20",
    title: "Smart Geyser Usage",
    body: "A 2000W geyser for 30 mins = 1 unit. Limit to 8–10 mins per use. Insulate pipes to retain heat. Solar water heater can reduce usage by 70%.",
    savings: "₹100–₹300/month",
  },
  {
    icon: TrendingDown,
    iconColor: "text-green-500",
    bgColor: "bg-green-500/20",
    badge: "🆕 2026",
    badgeColor: "bg-green-500/20 text-green-400",
    title: "MSEDCL 2026 Tariff Cuts",
    body: "MSEDCL reduced tariffs by 1%–10% effective 2025–26. Consumers under 100 units get 10% reduction. 26% total reduction planned till 2029–30.",
    savings: "Auto savings",
  },
  {
    icon: Lightbulb,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/20",
    title: "100% LED Lighting",
    body: "9W LED = 40W incandescent (same brightness). Replace 10 old lights running 6hrs/day → saves 18 units/month. LED lifespan: 25,000 hours.",
    savings: "₹150–₹250/month",
    highlight: true,
  },
  {
    icon: Clock,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-500/20",
    title: "Off-Peak Usage",
    body: "Use heavy appliances at night (11PM–6AM) for Time-of-Day (ToD) tariffs in some states. Also reduces grid load and prevents voltage drops.",
    savings: "₹50–₹150/month",
  },
];

const TipsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="saving-tips" 
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: "hsl(var(--background))" }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" 
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" 
        />
      </div>

      <div ref={ref} className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {/* Header Badge */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>Money Saving Tips</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            💡 Smart Ways to Reduce Your Electricity Bill
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-6">
            Practical tips proven to reduce bills in Maharashtra & all Indian homes
          </p>
          
          {/* Savings Banner */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 px-6 py-3 rounded-2xl"
          >
            <Wallet className="w-5 h-5" />
            <span className="font-semibold">Save ₹200–₹2,000/month</span>
            <span className="text-sm opacity-70">with these tips</span>
          </motion.div>
        </motion.div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {tips.map((tip, i) => {
            const Icon = tip.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <Card className={`h-full border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-2xl ${
                  tip.highlight 
                    ? "border-amber-500/30 bg-amber-500/5 dark:border-amber-500/20 dark:bg-amber-500/10" 
                    : "border-border/50"
                }`}>
                  <CardContent className="p-5 space-y-4">
                    {/* Icon & Badge Row */}
                    <div className="flex items-start justify-between">
                      <div className={`p-2.5 rounded-xl ${tip.bgColor}`}>
                        <Icon className={`w-5 h-5 ${tip.iconColor}`} />
                      </div>
                      {tip.badge && (
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tip.badgeColor}`}>
                          {tip.badge}
                        </span>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="font-bold text-base">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{tip.body}</p>
                    </div>
                    
                    {/* Savings Badge */}
                    <div className="flex items-center gap-2 pt-2">
                      <TrendingDown className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        {tip.savings}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Savings Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border border-amber-500/30 rounded-2xl p-6 md:p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Zap className="w-6 h-6 text-amber-500" />
              <span className="font-bold text-lg">Total Potential Savings</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">
              ₹9,600–₹14,400/year
            </p>
            <p className="text-muted-foreground mb-6">
              Implementing all tips above can reduce a ₹2,000 monthly bill to ₹800–₹1,200.
              <br />
              <span className="text-sm">That's enough for a new AC or 2 months of free electricity!</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#calculator">
                <Button className="bg-amber-500 text-slate-900 hover:bg-amber-600 gap-2 rounded-xl">
                  <Calculator className="w-4 h-4" />
                  Calculate Your Savings
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <a href="#appliances">
                <Button variant="outline" className="gap-2 rounded-xl">
                  <Lightbulb className="w-4 h-4" />
                  Check Appliance Usage
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TipsSection;