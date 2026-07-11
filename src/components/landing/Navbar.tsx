import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { DEMO_BRAND } from "@/lib/demo";

const logoPath = `${import.meta.env.BASE_URL}premier-logo.svg`;

export default function Navbar({ dark }: { dark?: boolean }) {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const scrolledBg = dark
    ? "bg-[#0F0F0D]/95 backdrop-blur-md border-b border-[rgba(200,164,93,0.12)]"
    : "bg-background/95 backdrop-blur-md border-b border-white/5";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-[52px] left-0 right-0 z-[110] transition-all duration-300 ${
        mobileMenuOpen ? "bg-[#0F0F0D] border-b border-white/10 py-3" : isScrolled ? scrolledBg : "bg-transparent py-3 md:py-6"
      }`}
    >
      <div className="container relative z-[120] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 z-50 min-w-0" onClick={mobileMenuOpen ? closeMobileMenu : undefined}>
          <img src={logoPath} alt={`${DEMO_BRAND.name} Logo`} className="h-12 sm:h-14 md:h-16 w-auto object-contain shrink-0" />
          <span className="font-serif font-bold text-base sm:text-lg tracking-wide hidden sm:block text-foreground leading-tight">
            PREMIER<br />EVENT CATERING
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium tracking-widest uppercase text-foreground/80 hover:text-[#C8A45D] transition-colors">
              {link.name}
            </a>
          ))}
          <Button asChild className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-medium tracking-wide uppercase px-8">
            <a href="#book">{t.nav.bookEvent}</a>
          </Button>
          <LanguageSwitcher />
        </div>

        <div className="md:hidden flex items-center gap-3 z-50">
          {!mobileMenuOpen && <LanguageSwitcher />}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center text-foreground hover:text-[#C8A45D] transition-colors"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? t.nav.closeMenu : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={26} strokeWidth={1.75} /> : <Menu size={26} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 top-[calc(4.5rem+52px)] bottom-0 z-[100] md:hidden flex flex-col bg-[#0F0F0D] px-6 pb-8 overflow-y-auto"
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-6 w-full max-w-sm mx-auto py-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={closeMobileMenu} className="w-full text-center text-2xl font-serif text-foreground hover:text-[#C8A45D] transition-colors">
                  {link.name}
                </a>
              ))}
              <Button asChild className="rounded-none bg-primary text-primary-foreground text-base px-8 py-6 mt-2 w-full max-w-xs">
                <a href="#book" onClick={closeMobileMenu}>{t.nav.bookCateringEvent}</a>
              </Button>
            </div>
            <LanguageSwitcher />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
