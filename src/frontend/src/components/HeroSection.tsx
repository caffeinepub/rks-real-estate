import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

const WHATSAPP_URL = "https://wa.me/919910396406";

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-banner.dim_1600x700.jpg')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="inline-block bg-gold/20 border border-gold/40 text-gold px-4 py-1.5 text-xs font-body font-semibold tracking-[0.15em] uppercase mb-6 rounded-sm">
              Premium Real Estate in India
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Find Your <span className="text-gold">Dream</span>
            <br />
            Property
          </motion.h1>

          <motion.p
            className="font-body text-white/80 text-lg sm:text-xl mb-10 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            RKS Real Estate brings you an exclusive portfolio of premium
            apartments, villas, plots, and commercial spaces across India. Your
            journey to the perfect home starts here.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            <Button
              size="lg"
              data-ocid="hero.primary_button"
              onClick={() => scrollToSection("#properties")}
              className="bg-gold hover:bg-gold-dark text-foreground font-body font-semibold text-base px-8 py-3 h-auto flex items-center gap-2 shadow-gold"
            >
              Browse Properties
              <ArrowRight className="h-5 w-5" />
            </Button>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.secondary_button"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white/60 text-white hover:bg-white/10 hover:border-white font-body font-semibold text-base px-8 py-3 h-auto flex items-center gap-2 w-full sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                Contact Us on WhatsApp
              </Button>
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {[
              { value: "10+", label: "Years Experience" },
              { value: "500+", label: "Properties Sold" },
              { value: "Pan-India", label: "Network" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center sm:text-left">
                <div className="font-display text-3xl font-bold text-gold">
                  {value}
                </div>
                <div className="font-body text-white/70 text-sm mt-1">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          aria-hidden="true"
        >
          <path
            d="M0 80L1440 80L1440 40C1200 80 720 0 0 40L0 80Z"
            fill="oklch(0.97 0.005 250)"
          />
        </svg>
      </div>
    </section>
  );
}
