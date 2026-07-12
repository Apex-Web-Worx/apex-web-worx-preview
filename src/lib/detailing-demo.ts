/**
 * Demo branding and static data for Apex Detailing preview.
 * Frontend-only — no real backend, credentials, or customer data.
 */

export const DETAILING_BRAND = {
  name: "Apex Detailing",
  tagline: "Elevating Your Ride to Its Peak Shine.",
  location: "Nixa, Missouri",
  website: "https://apexdetailing.net",
  websiteDisplay: "apexdetailing.net",
  instagram: "https://instagram.com/apexdetailing_net",
  instagramHandle: "@apexdetailing_net",
  phone: "(417) 527-6165",
  phoneTel: "+14175276165",
  email: "hello@apexdetailing.example",
  serviceArea: "Serving Nixa, Springfield, Ozark, and surrounding Southwest Missouri communities.",
  previewUrl: "https://preview.apexwebworx.com/detailing",
} as const;

export const DETAILING_DISCLAIMER =
  "Demo Website Concept by Apex Web Worx";

export const DETAILING_DISCLAIMER_SUB =
  "This preview demonstrates the type of website, booking system, and admin tools Apex Web Worx can build for an auto detailing business.";

export const DETAILING_MODAL_MESSAGE =
  "This is a demo booking experience. Apex Web Worx can connect this system to your calendar, email, payments, CRM, and admin dashboard.";

export const DETAILING_SERVICES = [
  {
    id: "interior",
    title: "Interior Detailing",
    description:
      "Deep vacuum, surface wipe-down, glass cleaning, and interior protection for a fresh cabin feel.",
    price: "Request Estimate",
  },
  {
    id: "exterior",
    title: "Exterior Detailing",
    description:
      "Hand wash, decontamination, wheel and tire care, and paint-safe finishing for a brilliant exterior.",
    price: "From $150 (sedan) · $200 (truck/SUV)",
  },
  {
    id: "full",
    title: "Full Detail",
    description:
      "Complete interior and exterior transformation — our most comprehensive detailing package.",
    price: "$300–$500 depending on vehicle",
  },
  {
    id: "paint-correction",
    title: "Paint Correction",
    description:
      "Multi-stage polishing to reduce swirls, scratches, and oxidation for a mirror-like finish.",
    price: "Request Estimate",
  },
  {
    id: "ceramic",
    title: "Ceramic Coating",
    description:
      "Long-lasting hydrophobic protection with enhanced gloss, UV defense, and easier maintenance.",
    price: "Custom Quote",
  },
  {
    id: "headlight",
    title: "Headlight Restoration",
    description:
      "Restore cloudy, yellowed headlights for improved clarity, safety, and curb appeal.",
    price: "From $120",
  },
  {
    id: "engine-bay",
    title: "Engine Bay Detailing",
    description:
      "Careful degreasing and dressing of the engine bay for a clean, show-ready presentation.",
    price: "Request Estimate",
  },
  {
    id: "express-interior",
    title: "Express Interior",
    description:
      "Quick but thorough interior refresh — ideal for busy schedules and regular maintenance.",
    price: "$100–$200 depending on vehicle",
  },
] as const;

export const DETAILING_ADDONS = [
  { id: "pet-hair", title: "Pet Hair Removal", price: "+$50–$100 depending on severity" },
  { id: "carpet", title: "Carpet Extraction", price: "From $100" },
  { id: "headlight", title: "Headlight Restoration", price: "From $120" },
  { id: "engine-bay", title: "Engine Bay Detail", price: "Request Estimate" },
  { id: "paint-sealant", title: "Paint Sealant", price: "Request Estimate" },
  { id: "ceramic-upgrade", title: "Ceramic Coating Upgrade", price: "Custom Quote" },
  { id: "wheel-coating", title: "Wheel Coating", price: "Request Estimate" },
  { id: "glass-coating", title: "Glass Coating", price: "Request Estimate" },
] as const;

export const DETAILING_VEHICLE_TYPES = [
  "Sedan",
  "Coupe",
  "Truck",
  "2-row SUV",
  "3-row SUV",
  "Jeep",
  "Minivan",
  "Other",
] as const;

export const DETAILING_SERVICE_OPTIONS = [
  "Express Interior",
  "Interior Detail",
  "Exterior Detail",
  "Full Detail",
  "Paint Correction",
  "Ceramic Coating",
  "Headlight Restoration",
  "Custom Estimate",
] as const;

export const DETAILING_TIME_SLOTS = [
  "8:00 AM",
  "9:30 AM",
  "11:00 AM",
  "1:00 PM",
  "2:30 PM",
  "4:00 PM",
] as const;

export const DETAILING_BLOCKED_DATES = [
  "2026-07-18",
  "2026-07-25",
  "2026-08-01",
  "2026-08-08",
  "2026-08-15",
];

export const DETAILING_REVIEWS = [
  {
    name: "Marcus T.",
    vehicle: "2022 Ford F-150",
    rating: 5,
    text: "The full detail exceeded expectations. Interior looks brand new and the paint has incredible depth.",
  },
  {
    name: "Jenny L.",
    vehicle: "2020 Honda CR-V",
    rating: 5,
    text: "Professional, communicative, and the ceramic coating makes washing so much easier. Highly recommend.",
  },
  {
    name: "David R.",
    vehicle: "2019 BMW 3 Series",
    rating: 5,
    text: "Paint correction removed years of swirl marks. The car looks better than when I bought it.",
  },
] as const;

export const DETAILING_WHY_CHOOSE = [
  { title: "Professional-Grade Products", desc: "Premium cleaners, coatings, and tools chosen for lasting results." },
  { title: "Careful Attention to Detail", desc: "Every panel, crevice, and surface receives meticulous care." },
  { title: "Clear Communication", desc: "Transparent updates from booking through completion." },
  { title: "Mobile-Friendly Booking", desc: "Schedule appointments online anytime from any device." },
  { title: "Transparent Service Selection", desc: "Know exactly what you're getting before we begin." },
  { title: "Local Service", desc: "Proudly serving Nixa and the greater Southwest Missouri area." },
  { title: "Ongoing Customer Support", desc: "Aftercare guidance and follow-up to keep your vehicle looking its best." },
] as const;

export const DETAILING_ADMIN_BOOKINGS = [
  {
    id: 2001,
    name: "Alex M.",
    vehicle: "2021 Toyota Camry",
    service: "Full Detail",
    date: "2026-07-14",
    status: "confirmed" as const,
    revenue: 375,
  },
  {
    id: 2002,
    name: "Sarah K.",
    vehicle: "2023 Jeep Wrangler",
    service: "Ceramic Coating",
    date: "2026-07-16",
    status: "pending" as const,
    revenue: 0,
  },
  {
    id: 2003,
    name: "Chris P.",
    vehicle: "2018 Chevy Silverado",
    service: "Exterior Detail",
    date: "2026-07-12",
    status: "completed" as const,
    revenue: 200,
  },
  {
    id: 2004,
    name: "Emily W.",
    vehicle: "2020 Honda Odyssey",
    service: "Express Interior",
    date: "2026-07-17",
    status: "in_progress" as const,
    revenue: 175,
  },
  {
    id: 2005,
    name: "Jordan B.",
    vehicle: "2022 Tesla Model 3",
    service: "Paint Correction",
    date: "2026-07-10",
    status: "cancelled" as const,
    revenue: 0,
  },
] as const;

export const DETAILING_GALLERY = [
  {
    id: "interior",
    title: "Interior Restoration",
    before: "linear-gradient(135deg, #2a2520 0%, #1a1815 50%, #3d3530 100%)",
    after: "linear-gradient(135deg, #1a1a22 0%, #0d1117 50%, #1e2836 100%)",
    beforeLabel: "Before",
    afterLabel: "After",
  },
  {
    id: "paint",
    title: "Paint Correction",
    before: "linear-gradient(135deg, #3a3028 0%, #2a2218 50%, #4a4038 100%)",
    after: "linear-gradient(135deg, #0a1628 0%, #1a2840 30%, #0d1a2e 70%, #050a14 100%)",
    beforeLabel: "Swirls & Haze",
    afterLabel: "Mirror Finish",
  },
  {
    id: "ceramic",
    title: "Ceramic Coating",
    before: "linear-gradient(135deg, #2a2820 0%, #1a1810 100%)",
    after: "linear-gradient(135deg, #0a2040 0%, #102848 40%, #081828 100%)",
    beforeLabel: "Unguarded",
    afterLabel: "Hydrophobic Shield",
  },
  {
    id: "headlight",
    title: "Headlight Restoration",
    before: "linear-gradient(135deg, #4a4540 0%, #3a3530 100%)",
    after: "linear-gradient(135deg, #e8eef4 0%, #c8d4e0 50%, #a8b8c8 100%)",
    beforeLabel: "Cloudy",
    afterLabel: "Crystal Clear",
  },
  {
    id: "pet-hair",
    title: "Pet Hair Removal",
    before: "linear-gradient(135deg, #3a3530 0%, #2a2520 100%)",
    after: "linear-gradient(135deg, #1a1a20 0%, #121218 100%)",
    beforeLabel: "Embedded Hair",
    afterLabel: "Hair-Free",
  },
  {
    id: "family",
    title: "Family Vehicle Deep Clean",
    before: "linear-gradient(135deg, #353028 0%, #252018 100%)",
    after: "linear-gradient(135deg, #181820 0%, #101018 100%)",
    beforeLabel: "Daily Wear",
    afterLabel: "Showroom Fresh",
  },
] as const;

export const DETAILING_SEO_BENEFITS = [
  { title: "Google Business Profile Setup", desc: "Optimized listings with photos, services, hours, and accurate business info." },
  { title: "Local SEO", desc: "Rank for detailing searches in Nixa, Springfield, and surrounding areas." },
  { title: "Service-Area Pages", desc: "Dedicated pages for each city and neighborhood you serve." },
  { title: "Review Links", desc: "Easy pathways for satisfied customers to leave Google reviews." },
  { title: "Mobile Optimization", desc: "Fast, responsive design that converts mobile searchers into bookings." },
  { title: "Click-to-Call Buttons", desc: "One-tap calling for customers ready to schedule immediately." },
  { title: "Directions Integration", desc: "Google Maps links so customers find your shop or mobile service area." },
  { title: "Booking Conversion", desc: "Streamlined forms and CTAs designed to turn visitors into appointments." },
  { title: "Professional Branding", desc: "Consistent visual identity across web, social, and search listings." },
] as const;
