import { Zap, Globe, Github, Mail, Instagram, Linkedin, CodepenIcon, ArrowRight, MapPin, Calendar, Check, Send, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const socialLinks = [
  { href: "https://ladestack.in", icon: Globe, label: "Website", color: "hover:bg-blue-500", bg: "bg-blue-500/20", text: "text-blue-400" },
  { href: "mailto:admin@ladestack.in", icon: Mail, label: "Email", color: "hover:bg-red-500", bg: "bg-red-500/20", text: "text-red-400" },
  { href: "https://github.com/girishlade111", icon: Github, label: "GitHub", color: "hover:bg-gray-600", bg: "bg-gray-500/20", text: "text-gray-400" },
  { href: "https://www.linkedin.com/in/girish-lade-075bba201/", icon: Linkedin, label: "LinkedIn", color: "hover:bg-blue-600", bg: "bg-blue-600/20", text: "text-blue-500" },
  { href: "https://www.instagram.com/girish_lade_/", icon: Instagram, label: "Instagram", color: "hover:bg-pink-500", bg: "bg-pink-500/20", text: "text-pink-500" },
  { href: "https://codepen.io/Girish-Lade-the-looper", icon: CodepenIcon, label: "CodePen", color: "hover:bg-cyan-500", bg: "bg-cyan-500/20", text: "text-cyan-500" },
];

const quickLinks = [
  { label: "Calculator", target: "calculator", icon: Zap },
  { label: "Appliances", target: "appliances", icon: Zap },
  { label: "Saving Tips", target: "saving-tips", icon: Zap },
  { label: "Tariff Rates", target: "tariff-table", icon: Zap },
  { label: "FAQ", target: "faq", icon: Zap },
];

const pageLinks = [
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Disclaimer", to: "/disclaimer" },
];

const features = [
  "2026 Updated Tariffs",
  "10+ Indian States",
  "Slab-wise Breakdown",
  "Appliance Calculator",
  "Saving Tips",
  "Dark Mode Support",
  "No Login Required",
  "100% Free",
];

const FooterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      window.location.href = `mailto:admin@ladestack.in?subject=Subscribe: ${email}`;
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-900 to-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[100px]" 
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Top Section - Brand & Newsletter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16 pb-8 border-b border-white/10"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-amber-400 to-amber-500 p-3 rounded-2xl shadow-lg shadow-amber-500/30"
            >
              <Zap className="w-8 h-8 text-slate-900" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold">BillMeter</h3>
              <p className="text-slate-400 text-sm">Free electricity bill calculator for India</p>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="flex items-center gap-3">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email for updates"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm w-64 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-500"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 px-4 py-3 rounded-xl text-green-400"
              >
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">Thanks for subscribing!</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Main Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Social */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <h4 className="font-bold text-amber-400 text-sm uppercase tracking-widest">Connect</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Calculate your electricity bill instantly with accurate 2026 tariff rates for 10+ Indian states.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {socialLinks.map(({ href, icon: Icon, label, color, bg, text }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${bg} ${text} p-2.5 rounded-xl transition-all duration-300 hover:shadow-lg`}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-bold text-amber-400 text-sm uppercase tracking-widest">Navigate</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={link.target}>
                  <button
                    onClick={() => scrollTo(link.target)}
                    className="group flex items-center gap-3 text-slate-300 hover:text-amber-400 transition-colors text-sm w-full"
                  >
                    <span className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-amber-500/20 flex items-center justify-center text-[10px]">{i + 1}</span>
                    {link.label}
                    <ArrowRight className="w-3 h-3 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Pages */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="font-bold text-amber-400 text-sm uppercase tracking-widest">Pages</h4>
            <ul className="space-y-3">
              {pageLinks.map((link, i) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-3 text-slate-300 hover:text-amber-400 transition-colors text-sm"
                  >
                    <span className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-amber-500/20 flex items-center justify-center text-[10px]">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Features */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h4 className="font-bold text-amber-400 text-sm uppercase tracking-widest">Features</h4>
            <ul className="grid grid-cols-2 gap-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-slate-400 text-sm">
                  <Check className="w-4 h-4 text-amber-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10"
        >
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>© 2026</span>
            <Link to="/" className="font-semibold text-slate-300 hover:text-amber-400 transition-colors">Lade Stack</Link>
            <span className="text-slate-600">•</span>
            <span>All rights reserved</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Made with</span>
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-red-500"
            >❤</motion.span>
            <span>in</span>
            <span className="text-slate-300">Solapur, India</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-500">
              <span className="font-medium text-slate-400">Note:</span> Estimates only. Verify with your DISCOM.
            </span>
          </div>
        </motion.div>
      </div>

      {/* Floating Back to Top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 p-3 rounded-full shadow-lg shadow-amber-500/30 z-50 hover:shadow-amber-500/50 transition-all"
        aria-label="Back to top"
      >
        <ExternalLink className="w-5 h-5 rotate-45" />
      </motion.button>
    </footer>
  );
};

export default FooterSection;