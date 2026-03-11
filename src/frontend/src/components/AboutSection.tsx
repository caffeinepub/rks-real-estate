import { Award, Building, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { icon: Award, value: "10+", label: "Years of Excellence" },
  { icon: Building, value: "500+", label: "Properties Sold" },
  { icon: Users, value: "1000+", label: "Happy Clients" },
  { icon: TrendingUp, value: "Pan-India", label: "Network Coverage" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold font-body text-sm font-semibold tracking-[0.15em] uppercase">
            Our Story
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
            About RKS Real Estate
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-16">
          {/* Left: story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-2xl font-semibold text-white mb-4">
              Trusted Real Estate Partner Across India
            </h3>
            <div className="space-y-4 font-body text-white/75 leading-relaxed">
              <p>
                Founded over a decade ago, RKS Real Estate has grown to become
                one of India's most trusted property consultants. We specialize
                in premium residential and commercial properties, offering
                end-to-end support to buyers, sellers, and investors.
              </p>
              <p>
                Our deep understanding of India's dynamic real estate landscape,
                combined with our commitment to transparency and client-first
                approach, has helped thousands of families find their dream
                homes and investors maximize their returns.
              </p>
              <p>
                From luxury villas in Gurgaon to commercial spaces in Mumbai, we
                bring you an exclusive selection of properties that meet the
                highest standards of quality and value.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Transparency", "Integrity", "Client-First", "Excellence"].map(
                (value) => (
                  <span
                    key={value}
                    className="px-4 py-1.5 border border-gold/50 text-gold text-sm font-body font-medium rounded-sm"
                  >
                    {value}
                  </span>
                ),
              )}
            </div>
          </motion.div>

          {/* Right: CEO card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center"
          >
            <div className="bg-navy-light rounded-xl overflow-hidden border border-white/10 shadow-xl max-w-sm w-full">
              {/* CEO avatar */}
              <div className="relative bg-gradient-to-br from-navy-light to-navy pt-10 pb-8 px-8 flex flex-col items-center">
                {/* Decorative ring */}
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 border-2 border-gold/50 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-navy-light border border-white/10 flex items-center justify-center overflow-hidden">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-20 h-20 text-white/40"
                        fill="currentColor"
                        role="img"
                        aria-label="CEO avatar"
                      >
                        <circle cx="50" cy="35" r="18" />
                        <ellipse cx="50" cy="80" rx="30" ry="20" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-navy" />
                  </div>
                </div>

                <h4 className="font-display text-xl font-bold text-white mt-5">
                  Sidharth Dhara
                </h4>
                <p className="font-body text-gold text-sm font-semibold tracking-wide uppercase mt-1">
                  CEO & Founder
                </p>
                <p className="font-body text-white/60 text-center text-sm mt-4 leading-relaxed">
                  "Our mission is to make premium real estate accessible,
                  transparent, and rewarding for every client."
                </p>
              </div>
              <div className="px-8 py-5 border-t border-white/10">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-display text-xl font-bold text-gold">
                      10+
                    </div>
                    <div className="font-body text-white/50 text-xs">Years</div>
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold text-gold">
                      500+
                    </div>
                    <div className="font-body text-white/50 text-xs">Deals</div>
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold text-gold">
                      100%
                    </div>
                    <div className="font-body text-white/50 text-xs">
                      Honest
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="bg-navy-light rounded-lg p-6 border border-white/10 text-center hover:border-gold/30 transition-colors"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon className="h-5 w-5 text-gold" />
              </div>
              <div className="font-display text-2xl font-bold text-white mb-1">
                {value}
              </div>
              <div className="font-body text-white/50 text-sm">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
