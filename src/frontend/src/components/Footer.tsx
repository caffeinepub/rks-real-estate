import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/919910396406";
const currentYear = new Date().getFullYear();

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Properties", href: "#properties" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-navy text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <img
              src="/assets/generated/rks-logo-transparent.dim_300x100.png"
              alt="RKS Real Estate"
              className="h-12 w-auto object-contain mb-4"
            />
            <p className="font-body text-white/60 leading-relaxed text-sm max-w-xs">
              RKS Real Estate is your trusted partner for premium residential
              and commercial properties across India. We turn your property
              aspirations into reality.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-body font-medium transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-base">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="font-body text-white/60 hover:text-gold text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-gold/50 rounded-full group-hover:bg-gold transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-base">
              Contact Info
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+919910396406"
                className="flex items-start gap-3 text-white/60 hover:text-gold transition-colors group"
              >
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-gold" />
                <span className="font-body text-sm">+91 99103 96406</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/60 hover:text-gold transition-colors"
              >
                <MessageCircle className="h-4 w-4 mt-0.5 shrink-0 text-gold" />
                <span className="font-body text-sm">
                  WhatsApp: +91 99103 96406
                </span>
              </a>
              <a
                href="mailto:info@rksrealestate.in"
                className="flex items-start gap-3 text-white/60 hover:text-gold transition-colors"
              >
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-gold" />
                <span className="font-body text-sm">info@rksrealestate.in</span>
              </a>
              <div className="flex items-start gap-3 text-white/60">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gold" />
                <span className="font-body text-sm">Pan-India Operations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-white/40 text-xs text-center sm:text-left">
            © {currentYear} RKS Real Estate. All rights reserved.
          </p>
          <p className="font-body text-white/30 text-xs text-center sm:text-right">
            Built with <span className="text-red-400">♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/60 hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
