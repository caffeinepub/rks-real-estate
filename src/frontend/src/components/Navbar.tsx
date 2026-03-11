import { Button } from "@/components/ui/button";
import { Menu, MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const WHATSAPP_URL = "https://wa.me/919910396406";

const navLinks = [
  { label: "Home", href: "#home", ocid: "nav.home_link" },
  { label: "Properties", href: "#properties", ocid: "nav.properties_link" },
  { label: "About", href: "#about", ocid: "nav.about_link" },
  { label: "Contact", href: "#contact", ocid: "nav.contact_link" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy shadow-lg py-2" : "bg-navy/95 backdrop-blur-sm py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("#home")}
          className="flex items-center gap-3 group"
        >
          <img
            src="/assets/generated/rks-logo-transparent.dim_300x100.png"
            alt="RKS Real Estate"
            className="h-10 w-auto object-contain"
          />
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid={link.ocid}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-white/80 hover:text-gold font-body text-sm font-medium tracking-wide uppercase transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gold after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.whatsapp_button"
          >
            <Button
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white font-body font-medium flex items-center gap-2 px-4"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </Button>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-navy border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid={link.ocid}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="block text-white/80 hover:text-gold font-body text-sm font-medium tracking-wide uppercase transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="nav.whatsapp_button"
                className="block pt-2"
              >
                <Button
                  size="sm"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-body font-medium flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
