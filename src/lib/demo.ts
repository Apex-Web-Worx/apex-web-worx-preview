/**
 * Central demo branding for Premier Event Catering (public preview).
 * Restore point: git tag `demo-baseline` / branch `demo/premier-event-catering`.
 * For a real client, branch off that tag and override these values + assets.
 * See DEMO.md.
 */
export const DEMO_BRAND = {
  name: "Premier Event Catering",
  shortName: "Premier Catering",
  tagline: "Premium Catering. Personalized.",
  email: "hello@premiereventcatering.example",
  phone: "(555) 123-4567",
  phoneTel: "+15551234567",
  location: "Metro Area, USA",
  serviceArea: "Serving the greater metro area and surrounding communities.",
  website: "https://preview.apexwebworx.com/catering",
  instagram: "#",
  facebook: "#",
} as const;

export const DEMO_BUILD = "2026-07-12-catering-fonts";

export const DEMO_DISCLAIMER =
  "Demo Website Concept by Apex Web Worx — not an official business website.";

export const DEMO_MODAL_MESSAGE =
  "This is a demo. Apex Web Worx can connect this to your email, CRM, booking calendar, or payment system.";

/** Mock booked dates for calendar preview (frontend only) */
export const DEMO_BOOKED_DATES = [
  "2026-07-18",
  "2026-08-02",
  "2026-08-15",
  "2026-09-06",
  "2026-09-20",
];

export const DEMO_ADMIN_BOOKINGS = [
  {
    id: 1001,
    name: "Sarah M.",
    eventType: "Wedding",
    eventDate: "2026-08-22",
    guestCount: 120,
    location: "Garden Venue",
    status: "pending_approval",
    totalPrice: 4800,
  },
  {
    id: 1002,
    name: "James T.",
    eventType: "Corporate",
    eventDate: "2026-09-12",
    guestCount: 85,
    location: "Downtown Conference Center",
    status: "approved",
    totalPrice: 3400,
  },
  {
    id: 1003,
    name: "Emily R.",
    eventType: "Birthday",
    eventDate: "2026-10-05",
    guestCount: 45,
    location: "Private Residence",
    status: "new_inquiry",
    totalPrice: 2250,
  },
];

export const DEMO_BOOKING_STORAGE_KEY = "demoBooking";

export interface DemoBookingSelection {
  clientToken: string;
  inquiry: {
    id: number;
    name: string;
    email: string;
    phone: string;
    eventType: string;
    eventDate: string;
    guestCount: number;
    location: string;
    message?: string;
  };
  packageName: string;
  packageId: string;
  selectedItems: { category: string; name: string; quantity: number }[];
  additionalGuests: number;
  selectedAddonIds: string[];
  basePricePerPerson: number;
  addonsPricePerPerson: number;
  pricePerPerson: number;
  estimatedTotal: number;
  clientNote: string;
  status: "pending_approval";
  createdAt: string;
}

export function saveDemoBooking(booking: DemoBookingSelection) {
  sessionStorage.setItem(DEMO_BOOKING_STORAGE_KEY, JSON.stringify(booking));
}

export function loadDemoBooking(token?: string): DemoBookingSelection | null {
  const raw = sessionStorage.getItem(DEMO_BOOKING_STORAGE_KEY);
  if (!raw) return null;
  try {
    const booking = JSON.parse(raw) as DemoBookingSelection;
    if (token && booking.clientToken !== token) return null;
    return booking;
  } catch {
    return null;
  }
}
