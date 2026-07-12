import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import DetailingDisclaimer from "@/components/detailing/DetailingDisclaimer";
import { DETAILING_BRAND } from "@/lib/detailing-demo";

const logoPath = `${import.meta.env.BASE_URL}apex-detailing-logo.svg`;

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "Add-Ons", href: "#addons" },
  { name: "Reviews", href: "#reviews" },
  { name: "Admin", href: "#admin" },
];

export default function DetailingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const sync = () => {
      document.documentElement.style.setProperty(
        "--detail-header-h",
        `${Math.ceil(header.getBoundingClientRect().height)}px`
      );
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(header);
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [isScrolled, mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const solid = isScrolled || mobileOpen;

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-[120] pt-[env(safe-area-inset-top)]"
    >
      <DetailingDisclaimer className={solid ? "border-b border-white/5" : ""} />

      <nav
        className={`transition-all duration-300 ${
          solid ? "bg-[#0a0a0c]/95 backdrop-blur-md border-b border-white/5 py-2.5" : "bg-transparent py-3 md:py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-3">
          <Link href="/detailing" className="flex items-center gap-3 z-50 min-w-0" onClick={() => setMobileOpen(false)}>
            <img
              src={logoPath}
              alt={`${DETAILING_BRAND.name} logo`}
              className={`w-auto object-contain shrink-0 transition-all ${solid ? "h-9 sm:h-10" : "h-10 sm:h-12"}`}
            />
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-widest uppercase text-[#94a3b8] hover:text-[#00e5ff] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a href="#book" className="detail-btn-primary px-6 py-2.5 text-xs rounded-md">
              Book Your Detail
            </a>
          </div>

          <button
            type="button"
            className="md:hidden inline-flex h-11 w-11 items-center justify-center text-[#f0f4f8] z-50"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 bottom-0 z-[100] md:hidden flex flex-col bg-[#0a0a0c] px-6 pb-[max(2rem,env(safe-area-inset-bottom))] overflow-y-auto"
            style={{ top: "var(--detail-header-h, 6rem)" }}
          >
            <div className="flex flex-col items-center gap-5 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-2xl text-[#f0f4f8] hover:text-[#00e5ff] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#book"
                onClick={() => setMobileOpen(false)}
                className="detail-btn-primary px-8 py-4 text-sm rounded-md w-full max-w-xs text-center mt-2"
              >
                Book Your Detail
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
