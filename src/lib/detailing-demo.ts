/**
 * Demo branding for Elite Detailing preview.
 * Frontend-only — no real backend, credentials, or customer data.
 */

export const DETAILING_BRAND = {
  name: "Elite Detailing",
  shortName: "Elite",
  tagline: "Elevating Your Ride to Its Peak Shine",
  location: "Metro Area",
  address: "123 Demo Boulevard, Metro Area",
  addressShort: "123 Demo Blvd",
  serviceArea: "Serving the greater metro area and surrounding communities.",
  website: "https://preview.apexwebworx.com/detailing",
  websiteDisplay: "preview.apexwebworx.com/detailing",
  instagram: "#",
  instagramHandle: "@eliteautodetailing",
  phone: "(555) 000-0000",
  phoneTel: "+15550000000",
  email: "hello@eliteautodetailing.example",
  previewUrl: "https://preview.apexwebworx.com/detailing",
  bookPath: "/detailing/book",
  /** Relative path for wouter navigate inside /detailing nest */
  bookPathNested: "/book",
} as const;

export const DETAILING_BUILD = "2026-07-12-pink";

export const DETAILING_DISCLAIMER =
  "Demo Website Concept by Apex Web Worx";

export const DETAILING_DISCLAIMER_SUB =
  "This preview demonstrates the type of website, booking system, and admin tools Apex Web Worx can build for an auto detailing business.";

export const DETAILING_MODAL_MESSAGE =
  "This is a demo booking experience. Apex Web Worx can connect this system to your calendar, email, payments, CRM, and admin dashboard.";

export interface DemoBookingService {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  priceLabel: string;
  durationMinutes: number;
  badge?: "popular" | "value" | "express" | "notice";
}

export const BOOKING_SERVICES: DemoBookingService[] = [
  {
    id: "1",
    slug: "full-detailing",
    name: "Full Detailing",
    description: "Complete interior and exterior transformation with protection.",
    priceCents: 35000,
    priceLabel: "From $350",
    durationMinutes: 240,
    badge: "value",
  },
  {
    id: "2",
    slug: "interior-detailing",
    name: "Interior Detailing",
    description: "Deep interior cleaning, vacuum, surfaces, and glass.",
    priceCents: 20000,
    priceLabel: "From $200",
    durationMinutes: 180,
    badge: "popular",
  },
  {
    id: "3",
    slug: "express-interior",
    name: "Express Interior",
    description: "Quick but thorough interior refresh for well-maintained vehicles.",
    priceCents: 10000,
    priceLabel: "From $100",
    durationMinutes: 90,
    badge: "express",
  },
  {
    id: "4",
    slug: "exterior-detailing",
    name: "Exterior Detailing",
    description: "Hand wash, wheels, tires, and paint-safe finishing.",
    priceCents: 15000,
    priceLabel: "From $150",
    durationMinutes: 120,
  },
  {
    id: "5",
    slug: "wash-clay-wax",
    name: "Wash, Clay & Wax",
    description: "Decontamination and protective wax for lasting shine.",
    priceCents: 25000,
    priceLabel: "From $250",
    durationMinutes: 150,
  },
  {
    id: "6",
    slug: "headlight-restoration",
    name: "Headlight Restoration",
    description: "Restore clarity and improve nighttime visibility.",
    priceCents: 12500,
    priceLabel: "From $125",
    durationMinutes: 60,
  },
  {
    id: "7",
    slug: "ceramic-coating",
    name: "Ceramic Coating",
    description: "Long-lasting hydrophobic paint protection.",
    priceCents: 0,
    priceLabel: "Custom Quote",
    durationMinutes: 480,
    badge: "notice",
  },
  {
    id: "8",
    slug: "paint-correction",
    name: "Paint Correction",
    description: "Multi-stage polishing for a mirror-like finish.",
    priceCents: 30000,
    priceLabel: "From $300",
    durationMinutes: 360,
  },
];

export const BOOKING_TIME_SLOTS = [
  "8:00 AM",
  "9:30 AM",
  "11:00 AM",
  "1:00 PM",
  "2:30 PM",
  "4:00 PM",
];

export const BOOKING_BLOCKED_DATES = [
  "2026-07-18",
  "2026-07-25",
  "2026-08-01",
  "2026-08-08",
];

export function formatPrice(cents: number): string {
  if (cents <= 0) return "Custom Quote";
  return `$${(cents / 100).toFixed(0)}`;
}

export function formatDuration(minutes: number): string {
  if (minutes >= 480) return "1–2 days";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${h} hr${h > 1 ? "s" : ""}`;
  return `${h}h ${m}m`;
}

export function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function addDaysStr(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
