import { Link } from "wouter";
import { Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import DemoDisclaimer from "@/components/demo/DemoDisclaimer";
import { DEMO_BRAND } from "@/lib/demo";

const logoPath = `${import.meta.env.BASE_URL}premier-logo.svg`;

export default function Footer({ dark, compact }: { dark?: boolean; compact?: boolean }) {
  const { t } = useLanguage();

  const bgStyle = dark ? { background: "#0F0F0D" } : undefined;
  const textColor = dark ? "#F5EFE4" : undefined;
  const mutedColor = dark ? "#B8B2A8" : undefined;
  const borderColor = dark ? "rgba(200, 164, 93, 0.12)" : undefined;

  if (compact) {
    return (
      <footer className="py-3 border-t" style={bgStyle ? { ...bgStyle, borderColor } : { background: "var(--background)", borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="container px-4 sm:px-6 md:px-12 mx-auto">
          <DemoDisclaimer className="mb-3" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-light" style={mutedColor ? { color: mutedColor } : undefined}>
              <span className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-[#C8A45D]" />{DEMO_BRAND.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-[#C8A45D]" />{DEMO_BRAND.phone}</span>
              <span>{DEMO_BRAND.location}</span>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="py-12 sm:py-16 border-t text-center md:text-left pb-[max(3rem,env(safe-area-inset-bottom))]" style={bgStyle ? { ...bgStyle, borderColor } : { background: "var(--background)", borderColor: "rgba(255,255,255,0.05)" }}>
      <div className="container px-4 sm:px-6 md:px-12 mx-auto">
        <DemoDisclaimer className="mb-8 sm:mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-12 items-center md:items-start">
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <Link href="/" className="inline-block mb-6">
              <img src={logoPath} alt={`${DEMO_BRAND.name} Logo`} className="h-14 sm:h-16 w-auto object-contain" />
            </Link>
            <p className="font-serif font-bold text-lg tracking-wide">{DEMO_BRAND.name}</p>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-serif text-lg font-bold mb-4" style={textColor ? { color: textColor } : undefined}>{t.footer.contact}</h4>
            <div className="space-y-2 font-light text-sm" style={mutedColor ? { color: mutedColor } : undefined}>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#C8A45D]" />{DEMO_BRAND.email}</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#C8A45D]" />{DEMO_BRAND.phone}</p>
              <p>{DEMO_BRAND.location}</p>
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-serif text-lg font-bold mb-4" style={textColor ? { color: textColor } : undefined}>{t.footer.explore}</h4>
            <div className="space-y-2 font-light text-sm flex flex-col" style={mutedColor ? { color: mutedColor } : undefined}>
              <a href="#craft" className="hover:text-[#C8A45D] transition-colors">{t.footer.ourCraft}</a>
              <a href="#menu" className="hover:text-[#C8A45D] transition-colors">{t.footer.theMenu}</a>
              <a href="#events" className="hover:text-[#C8A45D] transition-colors">{t.footer.events}</a>
              <a href="#admin-preview" className="hover:text-[#C8A45D] transition-colors">Admin Preview</a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-serif text-lg font-bold mb-4" style={textColor ? { color: textColor } : undefined}>{t.footer.serviceArea}</h4>
            <p className="font-light text-sm leading-relaxed" style={mutedColor ? { color: mutedColor } : undefined}>
              {DEMO_BRAND.serviceArea}
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light tracking-wider uppercase" style={{ borderTop: `1px solid ${borderColor || "rgba(255,255,255,0.05)"}`, color: mutedColor || "rgba(255,255,255,0.4)" }}>
          <p>&copy; {new Date().getFullYear()} {t.footer.rights}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#C8A45D] transition-colors">{t.footer.privacy}</Link>
            <Link href="/terms" className="hover:text-[#C8A45D] transition-colors">{t.footer.terms}</Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="https://apexwebworx.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 group">
            <span className="text-xs font-light tracking-wider uppercase group-hover:text-[#C8A45D] transition-colors">
              {t.footer.designedBy}
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
