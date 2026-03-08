import { Zap, ArrowLeft, Users, Target, Shield, Heart, MapPin, Globe, Lightbulb, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => (
  <div className="min-h-screen bg-background">
    {/* Header */}
    <header className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Calculator
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-accent text-accent-foreground p-2 rounded-lg">
            <Zap className="w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold">About BillMeter</h1>
        </div>
        <p className="text-lg opacity-90 max-w-2xl">
          India's most trusted free electricity bill calculator — built with love in Solapur, Maharashtra.
        </p>
      </div>
    </header>

    <main className="container mx-auto px-4 py-12 max-w-4xl space-y-12">
      {/* Mission */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-6 h-6 text-accent" />
          <h2 className="text-2xl font-bold">Our Mission</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          BillMeter was born out of a simple frustration — understanding electricity bills in India is unnecessarily complicated. With different states having different tariff structures, slab rates, fixed charges, fuel surcharges, and electricity duties, even educated consumers struggle to understand why their bill is what it is.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Our mission is to make electricity billing transparent and understandable for every Indian household. We believe that when consumers understand their bills, they make better decisions about energy usage, save money, and contribute to a more sustainable future.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          BillMeter provides instant, accurate bill estimates using the latest officially published tariff orders from state DISCOMs (Distribution Companies) and State Electricity Regulatory Commissions (SERCs) across India.
        </p>
      </section>

      {/* What We Offer */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-6 h-6 text-accent" />
          <h2 className="text-2xl font-bold">What BillMeter Offers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "⚡ Bill Calculator", desc: "Calculate your exact electricity bill with slab-wise breakdown for 10+ Indian states including Maharashtra (MSEDCL), Delhi (BSES/TPDDL), Karnataka (BESCOM), Gujarat (UGVCL), Tamil Nadu (TNEB), and more." },
            { title: "📱 Appliance Calculator", desc: "Don't know your units? Add your home appliances — fans, ACs, refrigerators, geysers — and we'll estimate your monthly kWh consumption automatically." },
            { title: "💡 Saving Tips", desc: "Practical, actionable tips to reduce your electricity bill — from switching to BLDC fans and LED lighting to rooftop solar installations under PM Surya Ghar Yojana." },
            { title: "📊 Tariff Reference", desc: "Comprehensive 2026 state-wise tariff comparison table with slab rates, fixed charges, and electricity duty for all major Indian states." },
            { title: "📅 Bill Comparison", desc: "Compare your current month's bill with the previous month to track your consumption trends and identify savings opportunities." },
            { title: "🖨️ Print & Share", desc: "Print your bill estimate or share a clean screenshot card with family and friends via WhatsApp or social media." },
          ].map((item, i) => (
            <Card key={i} className="border-0 shadow-sm">
              <CardContent className="p-5">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Free */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-6 h-6 text-accent" />
          <h2 className="text-2xl font-bold">Why BillMeter is Free</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We believe access to basic utility information should be free for everyone. BillMeter is and will always be:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-success font-bold">✓</span> <span><strong>100% Free</strong> — No premium plans, no paywalls, no hidden charges.</span></li>
          <li className="flex items-start gap-2"><span className="text-success font-bold">✓</span> <span><strong>No Ads</strong> — Clean, distraction-free interface. We don't monetize your attention.</span></li>
          <li className="flex items-start gap-2"><span className="text-success font-bold">✓</span> <span><strong>No Login Required</strong> — No account creation, no email collection, no phone number verification.</span></li>
          <li className="flex items-start gap-2"><span className="text-success font-bold">✓</span> <span><strong>No Data Collection</strong> — We don't store your calculations or personal information. Everything runs in your browser.</span></li>
          <li className="flex items-start gap-2"><span className="text-success font-bold">✓</span> <span><strong>Open & Transparent</strong> — All tariff data is sourced from publicly available DISCOM orders and SERC notifications.</span></li>
        </ul>
      </section>

      {/* Data Sources */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-accent" />
          <h2 className="text-2xl font-bold">Data Sources & Accuracy</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          BillMeter's tariff data is sourced from official documents published by:
        </p>
        <ul className="space-y-2 text-muted-foreground text-sm">
          <li>• <strong>MSEDCL (Maharashtra)</strong> — Maharashtra State Electricity Distribution Company Ltd. Tariff Order by MERC (Maharashtra Electricity Regulatory Commission)</li>
          <li>• <strong>BSES / TPDDL (Delhi)</strong> — Delhi Electricity Regulatory Commission (DERC) tariff schedule</li>
          <li>• <strong>BESCOM (Karnataka)</strong> — Karnataka Electricity Regulatory Commission (KERC) orders</li>
          <li>• <strong>UGVCL / DGVCL / MGVCL / PGVCL (Gujarat)</strong> — Gujarat Electricity Regulatory Commission (GERC) tariff orders</li>
          <li>• <strong>UPPCL (Uttar Pradesh)</strong> — UP Electricity Regulatory Commission (UPERC) notifications</li>
          <li>• <strong>TNEB / TANGEDCO (Tamil Nadu)</strong> — Tamil Nadu Electricity Regulatory Commission (TNERC) orders</li>
          <li>• <strong>TSSPDCL / TSNPDCL (Telangana)</strong> — Telangana State Electricity Regulatory Commission (TSERC)</li>
          <li>• <strong>WBSEDCL (West Bengal)</strong> — West Bengal Electricity Regulatory Commission (WBERC)</li>
          <li>• <strong>JVVNL / AVVNL / JdVVNL (Rajasthan)</strong> — Rajasthan Electricity Regulatory Commission (RERC)</li>
          <li>• <strong>MPCZ / MPEZ (Madhya Pradesh)</strong> — Madhya Pradesh Electricity Regulatory Commission (MPERC)</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          <strong>Last Updated:</strong> March 2026. Tariff data reflects the FY 2025–26 tariff orders. We update rates within 30 days of new SERC notifications.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-2">
          <strong>Accuracy:</strong> BillMeter estimates are typically within 2–5% of actual DISCOM bills for standard residential consumers. Variations may occur due to meter rent, regulatory surcharges, special subsidies (BPL/SC/ST), or mid-year tariff revisions.
        </p>
      </section>

      {/* About Lade Stack */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-accent" />
          <h2 className="text-2xl font-bold">About Lade Stack</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>Lade Stack</strong> is a technology company based in Solapur, Maharashtra, India. We build free, useful tools for Indian consumers that solve everyday problems.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Founded with the belief that technology should simplify life, not complicate it, Lade Stack focuses on creating clean, fast, and accessible web applications that work on any device — from a basic smartphone to a desktop computer.
        </p>
        <div className="flex items-start gap-2 text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
          <span>Solapur, Maharashtra 413001, India</span>
        </div>
        <div className="flex items-start gap-2 text-muted-foreground text-sm mt-1">
          <Globe className="w-4 h-4 mt-0.5 shrink-0" />
          <a href="https://ladestack.in" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">ladestack.in</a>
        </div>
      </section>

      {/* Technology */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-6 h-6 text-accent" />
          <h2 className="text-2xl font-bold">Technology</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          BillMeter is built with modern web technologies for speed, reliability, and accessibility:
        </p>
        <ul className="space-y-1 text-muted-foreground text-sm">
          <li>• <strong>Frontend:</strong> React 18 + TypeScript + Vite for blazing-fast performance</li>
          <li>• <strong>Styling:</strong> Tailwind CSS + shadcn/ui for a clean, responsive design system</li>
          <li>• <strong>Hosting:</strong> Edge-deployed CDN for fast loading across India</li>
          <li>• <strong>Privacy:</strong> All calculations run client-side — no data is sent to any server</li>
          <li>• <strong>Accessibility:</strong> WCAG 2.1 compliant with keyboard navigation and screen reader support</li>
          <li>• <strong>Performance:</strong> Lighthouse score 95+ on mobile and desktop</li>
        </ul>
      </section>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link to="/">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 rounded-xl font-semibold gap-2">
            <Zap className="w-5 h-5" /> Calculate Your Bill Now →
          </Button>
        </Link>
      </div>
    </main>

    {/* Simple Footer */}
    <footer className="bg-primary text-primary-foreground py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-sm opacity-70">
        <p>© 2026 Lade Stack — <a href="https://ladestack.in" className="underline">ladestack.in</a></p>
      </div>
    </footer>
  </div>
);

export default AboutPage;
