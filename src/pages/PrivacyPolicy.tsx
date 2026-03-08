import { Zap, ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PrivacyPolicyPage = () => (
  <div className="min-h-screen bg-background">
    <header className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Calculator
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-accent text-accent-foreground p-2 rounded-lg">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold">Privacy Policy</h1>
        </div>
        <p className="text-sm opacity-70">Last updated: March 8, 2026</p>
      </div>
    </header>

    <main className="container mx-auto px-4 py-12 max-w-3xl prose prose-sm prose-neutral dark:prose-invert">
      <p className="text-muted-foreground leading-relaxed text-base">
        At Lade Stack ("we", "our", "us"), we take your privacy seriously. This Privacy Policy explains how BillMeter ("the Tool", "the Website") handles information when you use our free electricity bill calculator at ladestack.in/billmeter.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-3">1. Information We Collect</h2>
      <p className="text-muted-foreground leading-relaxed">
        <strong>Short answer: We collect virtually nothing.</strong>
      </p>
      <p className="text-muted-foreground leading-relaxed">
        BillMeter is designed to be privacy-first. Here's what we do and don't collect:
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2">1.1 Information We Do NOT Collect</h3>
      <ul className="space-y-1 text-muted-foreground">
        <li>• <strong>Personal Information:</strong> We do not collect your name, email, phone number, address, or any personally identifiable information (PII).</li>
        <li>• <strong>Account Data:</strong> BillMeter does not require registration, login, or account creation.</li>
        <li>• <strong>Calculation Data:</strong> Your bill calculations (state, units, results) are processed entirely in your browser. No calculation data is sent to our servers.</li>
        <li>• <strong>Payment Information:</strong> BillMeter is free. We do not collect any payment or financial information.</li>
        <li>• <strong>Location Data:</strong> We do not access your GPS, IP-based location, or any geolocation data.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2">1.2 Information That May Be Automatically Collected</h3>
      <ul className="space-y-1 text-muted-foreground">
        <li>• <strong>Basic Analytics:</strong> We may use privacy-respecting analytics (e.g., Plausible, Umami) to understand page views and general usage patterns. These tools do not use cookies and do not track individual users.</li>
        <li>• <strong>Server Logs:</strong> Our hosting provider may automatically log basic request data (IP address, browser type, timestamp) as part of standard web server operation. These logs are not used for tracking and are automatically deleted.</li>
        <li>• <strong>Dark Mode Preference:</strong> Your dark/light mode preference is stored in your browser's localStorage. This data never leaves your device.</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-3">2. How We Use Information</h2>
      <p className="text-muted-foreground leading-relaxed">
        Since we collect minimal data, our usage is limited to:
      </p>
      <ul className="space-y-1 text-muted-foreground">
        <li>• Understanding general traffic patterns (which pages are popular, how many visitors per day)</li>
        <li>• Improving the calculator's accuracy and user experience</li>
        <li>• Diagnosing technical issues and bugs</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-3">3. Cookies</h2>
      <p className="text-muted-foreground leading-relaxed">
        <strong>BillMeter does not use cookies.</strong> We do not use tracking cookies, advertising cookies, or third-party cookies of any kind. Your dark mode preference is stored using the browser's localStorage API, which is not a cookie and cannot be accessed by other websites.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-3">4. Third-Party Services</h2>
      <p className="text-muted-foreground leading-relaxed">
        BillMeter may use the following third-party services:
      </p>
      <ul className="space-y-1 text-muted-foreground">
        <li>• <strong>Google Fonts:</strong> We load the Inter font from Google Fonts. Google's privacy policy applies to font loading requests. No tracking is involved.</li>
        <li>• <strong>CDN/Hosting:</strong> Our website is served via a content delivery network. Standard web serving logs may apply per the CDN provider's privacy policy.</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mt-2">
        We do NOT use: Google Analytics, Facebook Pixel, any advertising network, any social media tracker, or any data broker service.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-3">5. Data Storage & Security</h2>
      <p className="text-muted-foreground leading-relaxed">
        All calculations are performed client-side (in your web browser). No calculation inputs or results are transmitted to or stored on our servers. Your data stays on your device.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-2">
        Our website is served over HTTPS (TLS 1.3) ensuring encrypted communication between your browser and our servers.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-3">6. Children's Privacy</h2>
      <p className="text-muted-foreground leading-relaxed">
        BillMeter is a general-purpose utility tool. We do not knowingly collect any information from children under 13 years of age. Since we don't collect personal information from any user, this concern is inherently addressed.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-3">7. Data Sharing</h2>
      <p className="text-muted-foreground leading-relaxed">
        We do not sell, trade, rent, or share any user data with third parties. Since we don't collect personal data, there is nothing to share.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-3">8. Your Rights</h2>
      <p className="text-muted-foreground leading-relaxed">
        Under applicable data protection laws (including India's Digital Personal Data Protection Act, 2023), you have the right to:
      </p>
      <ul className="space-y-1 text-muted-foreground">
        <li>• Access any personal data we hold about you (we hold none)</li>
        <li>• Request deletion of your data (nothing to delete)</li>
        <li>• Opt out of data collection (we don't collect data)</li>
        <li>• Clear your localStorage data by clearing your browser data</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-3">9. Changes to This Policy</h2>
      <p className="text-muted-foreground leading-relaxed">
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this page periodically.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-3">10. Contact Us</h2>
      <p className="text-muted-foreground leading-relaxed">
        If you have any questions about this Privacy Policy, please contact us:
      </p>
      <ul className="space-y-1 text-muted-foreground">
        <li>• <strong>Email:</strong> privacy@ladestack.in</li>
        <li>• <strong>Website:</strong> <a href="https://ladestack.in" target="_blank" rel="noopener noreferrer" className="text-accent underline">ladestack.in</a></li>
        <li>• <strong>Address:</strong> Lade Stack, Solapur, Maharashtra 413001, India</li>
      </ul>

      <div className="text-center mt-12">
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

export default PrivacyPolicyPage;
