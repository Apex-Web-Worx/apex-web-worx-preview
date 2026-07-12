import { Link } from "wouter";
import { Phone, Mail, Instagram } from "lucide-react";
import DetailingDisclaimer from "@/components/detailing/DetailingDisclaimer";
import { DETAILING_BRAND } from "@/lib/detailing-demo";

const logoPath = `${import.meta.env.BASE_URL}apex-detailing-logo.svg`;

const serviceLinks = [
  { label: "Interior Detailing", href: "#services" },
  { label: "Exterior Detailing", href: "#services" },
  { label: "Full Detail", href: "#services" },
  { label: "Ceramic Coating", href: "#services" },
  { label: "Book Online", href: "#book" },
];

export default function DetailingFooter() {
  return (
    <footer className="py-12 sm:py-16 border-t border-white/5 bg-[#0a0a0c] pb-[max(3rem,env(safe-area-inset-bottom))]">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <DetailingDisclaimer variant="footer" className="mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/detailing">
              <img
                src={logoPath}
                alt={`${DETAILING_BRAND.name} logo`}
                className="h-12 w-auto mb-4"
              />
            </Link>
            <p className="font-display font-semibold text-lg">{DETAILING_BRAND.name}</p>
            <p className="text-sm text-[#94a3b8] mt-1">{DETAILING_BRAND.location}</p>
            <p className="text-xs text-[#94a3b8]/60 mt-3">Demo concept by Apex Web Worx</p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <div className="space-y-2">
              {serviceLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-[#94a3b8] hover:text-[#00e5ff] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-[#94a3b8]">
              <a
                href={`tel:${DETAILING_BRAND.phoneTel}`}
                className="flex items-center gap-2 hover:text-[#00e5ff] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#00e5ff]" />
                {DETAILING_BRAND.phone}
              </a>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00e5ff]" />
                {DETAILING_BRAND.email}
              </p>
              <a
                href={DETAILING_BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#00e5ff] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#00e5ff]" />
                {DETAILING_BRAND.instagramHandle}
              </a>
              <a
                href={DETAILING_BRAND.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00e5ff] transition-colors"
              >
                {DETAILING_BRAND.websiteDisplay}
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Service Area</h4>
            <p className="text-sm text-[#94a3b8] leading-relaxed">{DETAILING_BRAND.serviceArea}</p>
            <div className="flex gap-4 mt-6">
              <a href="#privacy" className="text-xs text-[#94a3b8]/60 hover:text-[#00e5ff] uppercase tracking-wider">
                Privacy
              </a>
              <a href="#terms" className="text-xs text-[#94a3b8]/60 hover:text-[#00e5ff] uppercase tracking-wider">
                Terms
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#94a3b8]/50 uppercase tracking-wider"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p>&copy; {new Date().getFullYear()} {DETAILING_BRAND.name} — Demo Preview</p>
          <a
            href="https://apexwebworx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00e5ff] transition-colors"
          >
            Built by Apex Web Worx
          </a>
        </div>
      </div>
    </footer>
  );
}
