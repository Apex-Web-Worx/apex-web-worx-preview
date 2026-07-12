import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import DemoDisclaimer from "@/components/demo/DemoDisclaimer";
import { useLanguage } from "@/contexts/LanguageContext";
import { DEMO_BRAND } from "@/lib/demo";

const logoPath = `${import.meta.env.BASE_URL}premier-logo.svg`;

export default function Navbar(_props: { dark?: boolean }) {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const syncHeight = () => {
      const height = Math.ceil(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--site-header-h", `${height}px`);
    };

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(header);
    window.addEventListener("resize", syncHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeight);
    };
  }, [isScrolled, mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { name: t.nav.ourCraft, href: "#craft" },
    { name: t.nav.menu, href: "#menu" },
    { name: t.nav.events, href: "#events" },
    { name: "Gallery", href: "#gallery" },
  ];

  const solid = isScrolled || mobileMenuOpen;

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-[120] pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        solid ? "bg-[#0F0F0D]" : "bg-transparent"
      }`}
    >
      {/* Always opaque black so no content peeks between banner and nav */}
      <div className={`${solid ? "bg-[#0F0F0D]" : "bg-[#0F0F0D]"}`}>
        <DemoDisclaimer
          className={solid ? "border-b border-white/10" : "border-b border-[#C8A45D]/30"}
        />
      </div>

      <nav
        className={`transition-[background-color,padding,border-color] duration-300 ${
          solid
            ? "bg-[#0F0F0D] py-2.5 md:py-3 border-b border-white/10"
            : "bg-transparent py-3 md:py-5 border-b border-transparent"
        }`}
      >
        <div className="container relative z-[120] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 z-50 min-w-0"
            onClick={mobileMenuOpen ? closeMobileMenu : undefined}
          >
            <img
              src={logoPath}
              alt={`${DEMO_BRAND.name} Logo`}
              className={`w-auto object-contain shrink-0 transition-all duration-300 ${
                solid ? "h-10 sm:h-12 md:h-14" : "h-11 sm:h-14 md:h-16"
              }`}
            />
            <span className="font-serif font-bold text-sm sm:text-lg tracking-wide hidden sm:block text-foreground leading-tight">
              PREMIER<br />EVENT CATERING
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-widest uppercase text-foreground/80 hover:text-[#C8A45D] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Button
              asChild
              className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-medium tracking-wide uppercase px-8"
            >
              <a href="#book">{t.nav.bookEvent}</a>
            </Button>
            <LanguageSwitcher />
          </div>

          <div className="md:hidden flex items-center gap-2 z-50">
            {!mobileMenuOpen && <LanguageSwitcher />}
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center text-foreground hover:text-[#C8A45D] transition-colors touch-manipulation"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? t.nav.closeMenu : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={26} strokeWidth={1.75} /> : <Menu size={26} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 bottom-0 z-[100] md:hidden flex flex-col bg-[#0F0F0D] px-6 pb-[max(2rem,env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain"
            style={{ top: "var(--site-header-h, 7rem)" }}
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-5 w-full max-w-sm mx-auto py-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="w-full min-h-12 flex items-center justify-center text-center text-2xl font-serif text-foreground hover:text-[#C8A45D] transition-colors touch-manipulation"
                >
                  {link.name}
                </a>
              ))}
              <Button
                asChild
                className="rounded-none bg-primary text-primary-foreground text-base px-8 py-6 mt-2 w-full max-w-xs touch-manipulation"
              >
                <a href="#book" onClick={closeMobileMenu}>
                  {t.nav.bookCateringEvent}
                </a>
              </Button>
            </div>
            <div className="pb-2 flex justify-center">
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
