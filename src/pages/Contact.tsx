import { Zap, ArrowLeft, Mail, Globe, MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ContactPage = () => (
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
          <h1 className="text-3xl md:text-4xl font-extrabold">Contact Us</h1>
        </div>
        <p className="text-lg opacity-90 max-w-2xl">
          Have a question, suggestion, or found an error? We'd love to hear from you.
        </p>
      </div>
    </header>

    <main className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6 space-y-3">
            <div className="bg-accent/10 text-accent p-3 rounded-lg w-fit">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Email Us</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              For general inquiries, feature requests, tariff corrections, or partnership proposals.
            </p>
            <a href="mailto:hello@ladestack.in" className="text-accent font-semibold underline underline-offset-2">
              hello@ladestack.in
            </a>
            <p className="text-xs text-muted-foreground">We typically respond within 24–48 hours.</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6 space-y-3">
            <div className="bg-accent/10 text-accent p-3 rounded-lg w-fit">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Visit Our Website</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Learn more about Lade Stack and our other free tools for Indian consumers.
            </p>
            <a href="https://ladestack.in" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold underline underline-offset-2">
              ladestack.in
            </a>
            <p className="text-xs text-muted-foreground">Explore our portfolio of free utilities.</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6 space-y-3">
            <div className="bg-accent/10 text-accent p-3 rounded-lg w-fit">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Report a Bug</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Found an incorrect tariff rate, calculation error, or UI bug? Please let us know with details:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Which state and load you selected</li>
              <li>• How many units you entered</li>
              <li>• What result you got vs. what you expected</li>
              <li>• Your device and browser (if UI bug)</li>
            </ul>
            <a href="mailto:bugs@ladestack.in" className="text-accent font-semibold underline underline-offset-2">
              bugs@ladestack.in
            </a>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6 space-y-3">
            <div className="bg-accent/10 text-accent p-3 rounded-lg w-fit">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">MSEDCL Helpline</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              For actual bill disputes, meter issues, or account queries, contact your DISCOM directly:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li><strong>MSEDCL (Maharashtra):</strong> 1800-200-3435 (Toll Free)</li>
              <li><strong>MSEDCL WhatsApp:</strong> 9930099300</li>
              <li><strong>BSES (Delhi):</strong> 19123</li>
              <li><strong>BESCOM (Karnataka):</strong> 1912</li>
              <li><strong>TNEB (Tamil Nadu):</strong> 94987 94987</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Office Address */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-accent" /> Our Office
        </h2>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <p className="font-semibold text-lg mb-2">Lade Stack</p>
            <p className="text-muted-foreground leading-relaxed">
              Solapur, Maharashtra 413001<br />
              India
            </p>
            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Business Hours: Monday – Saturday, 10:00 AM – 6:00 PM IST</span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Before Contact */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Before You Contact Us</h2>
        <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="font-semibold text-foreground mb-1">❓ "Why is my BillMeter estimate different from my actual bill?"</p>
            <p>BillMeter provides estimates within 2–5% accuracy. Actual bills may include meter rent (₹15–₹30/month), regulatory surcharges, wheeling charges, or special subsidies not accounted for in our calculator. Also check if your billing cycle covers more than 30 days.</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="font-semibold text-foreground mb-1">❓ "Can you add my state?"</p>
            <p>We currently support 10 major states. If your state is not listed, email us at hello@ladestack.in with your state name and we'll prioritize adding it. Include a link to your state's DISCOM tariff order if possible.</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="font-semibold text-foreground mb-1">❓ "Is BillMeter affiliated with MSEDCL or any DISCOM?"</p>
            <p>No. BillMeter is an independent tool by Lade Stack. We are not affiliated with, endorsed by, or connected to any state DISCOM, SERC, or government body. We use publicly available tariff data.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <Link to="/">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 rounded-xl font-semibold gap-2">
            <Zap className="w-5 h-5" /> Back to Calculator →
          </Button>
        </Link>
      </div>
    </main>

    <footer className="bg-primary text-primary-foreground py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-sm opacity-70">
        <p>© 2026 Lade Stack — <a href="https://ladestack.in" className="underline">ladestack.in</a></p>
      </div>
    </footer>
  </div>
);

export default ContactPage;
