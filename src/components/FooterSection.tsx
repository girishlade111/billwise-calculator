import { Zap, Globe, Github, Mail, Instagram, Linkedin, CodepenIcon, ArrowRight, Zap, MapPin, Calendar, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const socialLinks = [
  { href: "https://ladestack.in", icon: Globe, label: "Website", color: "hover:bg-blue-500" },
  { href: "mailto:admin@ladestack.in", icon: Mail, label: "Email", color: "hover:bg-red-500" },
  { href: "https://github.com/girishlade111", icon: Github, label: "GitHub", color: "hover:bg-gray-700" },
  { href: "https://www.linkedin.com/in/girish-lade-075bba201/", icon: Linkedin, label: "LinkedIn", color: "hover:bg-blue-600" },
  { href: "https://www.instagram.com/girish_lade_/", icon: Instagram, label: "Instagram", color: "hover:bg-pink-500" },
  { href: "https://codepen.io/Girish-Lade-the-looper", icon: CodepenIcon, label: "CodePen", color: "hover:bg-cyan-500" },
];

const quickLinks = [
  { label: "Calculator", target: "calculator" },
  { label: "Appliances", target: "appliances" },
  { label: "Saving Tips", target: "saving-tips" },
  { label: "Tariff Rates", target: "tariff-table" },
  { label: "FAQ", target: "faq" },
];

const pageLinks = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms", to: "/terms" },
  { label: "Disclaimer", to: "/disclaimer" },
];

const FooterSection = () => {
  return (
    <footer className="bg-gradient-to-br from-primary via-primary to-[#152a45] text-primary-foreground relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" 
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 max-w-7xl mx-auto mb-12">
          {/* Column 1 - Brand */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <motion.div 
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="bg-accent text-accent-foreground p-2.5 rounded-xl shadow-lg shadow-accent/25"
              >
                <Zap className="w-6 h-6" />
              </motion.div>
              <span className="text-xl font-bold tracking-tight">BillMeter</span>
            </motion.div>
            
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Free, instant electricity bill calculator for India with 2026 updated tariff slabs.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ href, icon: Icon, label, color }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group bg-white/10 hover:${color} p-2.5 rounded-xl transition-all duration-300 hover:shadow-lg`}
                >
                  <Icon className="w-5 h-5 text-white/90 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="font-bold text-sm uppercase tracking-widest text-accent">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.target}>
                  <button
                    onClick={() => scrollTo(link.target)}
                    className="text-sm text-primary-foreground/70 hover:text-accent hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 - Pages */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-bold text-sm uppercase tracking-widest text-accent">Pages</h3>
            <ul className="space-y-3">
              {pageLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-primary-foreground/70 hover:text-accent hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 - Features */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="font-bold text-sm uppercase tracking-widest text-accent">Features</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" /> 10+ Indian States
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" /> 2026 Tariff Rates
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" /> Slab Breakdown
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" /> Appliance Calculator
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" /> Saving Tips
              </li>
            </ul>
          </motion.div>

          {/* Column 5 - Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="font-bold text-sm uppercase tracking-widest text-accent">Contact</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" /> admin@ladestack.in
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" /> Solapur, Maharashtra
              </li>
              <li className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" /> Updated: April 2026
              </li>
            </ul>

            {/* Newsletter CTA */}
            <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-sm font-medium mb-2">Stay Updated</p>
              <p className="text-xs text-primary-foreground/60 mb-3">Get latest tariff rates in your inbox.</p>
              <a 
                href="mailto:admin@ladestack.in?subject=Subscribe for Updates"
                className="inline-flex items-center gap-2 text-xs bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Subscribe <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 max-w-7xl mx-auto mb-8" />

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto text-center md:text-left"
        >
          <p className="text-sm text-primary-foreground/60">
            © 2026 <span className="font-semibold text-primary-foreground/80">Lade Stack</span>. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
            <span>Built with</span>
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-red-500"
            >❤️</motion.span>
            <span>in</span>
            <span className="font-medium">Solapur, Maharashtra, India</span>
          </div>

          <p className="text-sm text-primary-foreground/50">
            <span className="font-medium">Disclaimer:</span> Estimates only. Verify with your DISCOM.
          </p>
        </motion.div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 bg-accent text-accent-foreground p-3 rounded-full shadow-lg shadow-accent/30 z-50"
        aria-label="Back to top"
      >
        <ArrowRight className="w-5 h-5 -rotate-90" />
      </motion.button>
    </footer>
  );
};

export default FooterSection;