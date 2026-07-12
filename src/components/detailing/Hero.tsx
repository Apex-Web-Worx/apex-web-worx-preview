import { motion } from "framer-motion";
import { Shield, Sparkles, Award } from "lucide-react";
import DetailingDisclaimer from "@/components/detailing/DetailingDisclaimer";
import { DETAILING_BRAND } from "@/lib/detailing-demo";

const trustBadges = [
  { icon: Sparkles, label: "Premium Products" },
  { icon: Award, label: "Expert Detailing" },
  { icon: Shield, label: "Satisfaction Focused" },
];

function VehicleVisual() {
  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-[16/9]">
      <div className="detail-glow-orb w-64 h-64 bg-[#00e5ff]/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="detail-glow-orb w-48 h-48 bg-[#a855f7]/15 top-1/4 right-1/4" />
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full drop-shadow-[0_0_60px_rgba(0,229,255,0.15)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="carBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a22" />
            <stop offset="40%" stopColor="#0d0d14" />
            <stop offset="100%" stopColor="#12121a" />
          </linearGradient>
          <linearGradient id="carHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="rgba(0,229,255,0.15)" />
            <stop offset="70%" stopColor="rgba(168,85,247,0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="groundGlow" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,229,255,0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <ellipse cx="400" cy="340" rx="320" ry="20" fill="url(#groundGlow)" opacity="0.5" />
        <path
          d="M120 280 Q140 220 200 200 L280 190 Q320 170 400 170 Q480 170 520 190 L600 200 Q660 220 680 280 L660 300 L580 310 Q560 320 520 320 L280 320 Q240 320 220 310 L140 300 Z"
          fill="url(#carBody)"
          stroke="rgba(0,229,255,0.2)"
          strokeWidth="1"
        />
        <path
          d="M200 200 Q280 175 400 175 Q520 175 600 200 L580 240 Q500 230 400 230 Q300 230 220 240 Z"
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.5"
        />
        <rect x="180" y="200" width="440" height="60" fill="url(#carHighlight)" opacity="0.6" />
        <circle cx="240" cy="310" r="40" fill="#0a0a0c" stroke="rgba(0,229,255,0.3)" strokeWidth="2" />
        <circle cx="240" cy="310" r="22" fill="#16161e" />
        <circle cx="560" cy="310" r="40" fill="#0a0a0c" stroke="rgba(0,229,255,0.3)" strokeWidth="2" />
        <circle cx="560" cy="310" r="22" fill="#16161e" />
        <path d="M300 195 L350 185 L450 185 L500 195" stroke="rgba(0,229,255,0.4)" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}

export default function DetailingHero() {
  return (
    <section className="detail-hero-bg relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="detail-glow-orb w-96 h-96 bg-[#3b82f6]/10 -top-20 -left-20" />
      <div className="detail-glow-orb w-80 h-80 bg-[#ec4899]/8 top-1/3 -right-20" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-12 pt-[calc(var(--detail-header-h,6rem)+1rem)] pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 lg:hidden"
            >
              <DetailingDisclaimer variant="inline" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="detail-section-label mb-4"
            >
              {DETAILING_BRAND.location}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
            >
              <span className="detail-gradient-text">{DETAILING_BRAND.tagline}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[#94a3b8] text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
            >
              Professional interior detailing, exterior detailing, paint correction, and ceramic
              coating — precision care that brings out the best in every vehicle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <a href="#book" className="detail-btn-primary px-8 py-4 text-sm rounded-md text-center">
                Book Your Detail
              </a>
              <a href="#services" className="detail-btn-outline px-8 py-4 text-sm rounded-md text-center">
                View Services
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 sm:gap-6"
            >
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-[#94a3b8]">
                  <Icon className="w-4 h-4 text-[#00e5ff]" />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hidden lg:block"
          >
            <VehicleVisual />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="lg:hidden mt-12"
        >
          <VehicleVisual />
        </motion.div>
      </div>
    </section>
  );
}
