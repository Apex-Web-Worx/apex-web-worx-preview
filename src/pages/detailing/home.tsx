import { useState, useEffect } from "react";
import { useDetailingModal } from "@/contexts/DetailingModalContext";
import DetailingDisclaimer from "@/components/detailing/DetailingDisclaimer";
import DetailingAdminPreviewSection from "@/components/detailing/DetailingAdminPreviewSection";
import "@/styles/detailing.css";
import { DETAILING_BRAND } from "@/lib/detailing-demo";
import { Link } from "wouter";
import {
  Menu,
  X,
  ChevronRight,
  Star,
  Shield,
  Car,
  Sparkles,
  Droplets,
  Instagram,
  Facebook,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Award,
  ExternalLink,
  Wand2,
  Zap,
} from "lucide-react";

const LOGO_URL = `${import.meta.env.BASE_URL}elite-detailing-logo.webp?v=3`;
const INSTAGRAM_LINK = DETAILING_BRAND.instagram;
const FACEBOOK_LINK = "#";
const GOOGLE_REVIEWS_LINK = "#";

const AddonCard = ({ addon }: { addon: { name: string; price: string; description?: string } }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => {
    if (addon.description) setIsExpanded((prev) => !prev);
  };
  return (
    <div
      role={addon.description ? "button" : undefined}
      tabIndex={addon.description ? 0 : undefined}
      onKeyDown={(e) => {
        if (addon.description && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          toggleExpanded();
        }
      }}
      className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-[#00EAFF] transition-all cursor-pointer group"
      onMouseEnter={() => addon.description && setIsExpanded(true)}
      onMouseLeave={() => addon.description && setIsExpanded(false)}
      onClick={toggleExpanded}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-base font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#E6007A] group-hover:to-[#00EAFF] transition-all duration-300">{addon.name}</h4>
        {addon.description && (
          <ChevronRight
            className={`w-4 h-4 shrink-0 text-[#00EAFF] transition-transform duration-300 mt-0.5 ${
              isExpanded ? "rotate-90" : ""
            }`}
            aria-hidden="true"
          />
        )}
      </div>
      <p className="text-[#00EAFF] font-bold text-sm">{addon.price}</p>
      {addon.description && (
        <div
          className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96" : "max-h-0"}`}
        >
          <p className="text-gray-300 text-xs mt-3 leading-relaxed">
            {addon.description}
          </p>
        </div>
      )}
    </div>
  );
};

const services = [
  {
    id: "full-detailing",
    title: "Full Detailing",
    description:
      "The ultimate package! Includes interior and exterior detailed cleaning and protection. Get your vehicle looking showroom fresh inside and out. Add-ons available to customize your package.",
    icon: <Wand2 className="w-10 h-10 text-[#E6007A]" />,
    pricing: "$300",
    pricingDetails: ["Coupe / Sedan: $300-$400", "Truck / Jeep / 2-Row SUV: $350 – $450", "Minivan / 3-Row SUV: $350 – $500"],
    features: [
      "Complete Exterior Detailing",
      "Complete Interior Detailing",
      "Paint Protection",
      "Professional Results",
      "Customizable Add-ons",
    ],
  },
  {
    id: "interior-detailing",
    title: "Interior Detailing",
    description:
      "Comprehensive interior cleaning that transforms every surface. From carpets to leather to air vents. Add-ons available to customize your package.",
    icon: <Droplets className="w-10 h-10 text-[#E6007A]" />,
    pricing: "$200",
    pricingDetails: ["2-Row: $200 – $300", "3-Row: $250 – $350"],
    features: [
      "Air vents cleaned",
      "Free air fresheners",
      "Steam cleaning of center console and door panels",
      "All plastic surfaces wiped down",
      "Cloth seats cleaned and steamed",
      "Spot cleaning of the headliner",
      "Cleaning of interior windows and mirrors",
      "Trunk area vacuumed",
      "Leather seats cleaned and conditioned",
      "Rubber mats washed",
      "Extensive vacuuming of the interior",
      "Floor mats steam-cleaned",
      "Steam-cleaning of brake and gas pedals",
    ],
  },
  {
    id: "express-interior-detailing",
    title: "Express Interior Detailing",
    description: (
      <>
        A fast, high-quality interior refresh designed to keep your vehicle clean, fresh, and presentable—without the time commitment of a full detail. This service includes a thorough vacuum, wipe-down of all interior surfaces, floor mats cleaned, interior glass polished, and a light refresh of high-touch areas. Perfect for well-maintained vehicles or as a maintenance service between full details.{" "}
        <span className="text-[#FFA500] font-bold">
          This service is intended only to maintain a semi-clean vehicle. Heavily soiled interiors, stains, excessive pet hair, or deep cleaning needs may require a Full Interior Detail. Final service type will be confirmed upon inspection.
        </span>
      </>
    ),
    icon: <Droplets className="w-10 h-10 text-[#E6007A]" />,
    pricing: "$100",
    pricingDetails: ["2-Row: $100–$150", "3-Row: $150–$200"],
    features: [
      "Thorough Vacuum",
      "Interior Surfaces Wiped Down",
      "Floor Mats Cleaned",
      "Interior Glass Polished",
      "High-Touch Areas Refreshed",
    ],
  },
  {
    id: "exterior-detailing",
    title: "Exterior Detailing",
    description:
      "Comprehensive exterior cleaning and protection to make your car turn heads everywhere you go. Includes detailed hand wash, exterior windows and mirrors cleaning, wheels and tires cleaned, polished, and dressed, door jambs wiped down, and spray sealant for 1-month protection.",
    icon: <Car className="w-10 h-10 text-[#00EAFF]" />,
    pricing: "$150",
    pricingDetails: ["Sedan: $150", "SUV: $200–$250"],
    features: [
      "Detailed Hand Wash",
      "Windows & Mirrors Cleaned",
      "Wheels & Tires Detailed",
      "Door Jambs Wiped",
      "1-Month Spray Sealant",
    ],
  },
  {
    id: "wash-clay-wax",
    title: "Wash, Clay & Wax",
    description:
      "First, the vehicle receives a thorough hand wash to remove dirt, dust, and road grime. Next, a clay bar treatment is used to safely remove embedded contaminants such as tar, brake dust, and industrial fallout that normal washing cannot remove. Finally, a protective wax coating is applied to enhance shine, protect the paint, and help repel water and dirt.",
    icon: <Sparkles className="w-10 h-10 text-[#E6007A]" />,
    pricing: "$250",
    pricingDetails: ["Sedan: $250", "SUV: $300–$350"],
    features: [
      "Thorough Hand Wash",
      "Clay Bar Treatment",
      "Professional Wax Coating",
      "Enhanced Paint Protection",
      "Water & Dirt Repellent",
    ],
  },
  {
    id: "headlight-restoration",
    title: "Headlight Restoration",
    description:
      "Fix foggy, yellowed headlights to improve nighttime visibility and dramatically improve your car's appearance.",
    icon: <CheckCircle2 className="w-10 h-10 text-[#00EAFF]" />,
    pricing: "$125",
    features: ["Improves Safety", "Removes Oxidation", "UV Protection Applied"],
  },
  {
    id: "ceramic-coating",
    title: "Ceramic Coating",
    description:
      "Ultimate protection and extreme gloss for your vehicle's paint. Lasts for years, making maintenance washes a breeze.",
    icon: <Shield className="w-10 h-10 text-[#00EAFF]" />,
    pricing: "Call for Quote",
    features: ["Up to 5 Years Protection", "Extreme Hydrophobics", "Scratch Resistance"],
  },
  {
    id: "paint-correction",
    title: "Paint Correction",
    description:
      "Restore your paint to a flawless, mirror-like finish. We offer four levels of correction depending on the condition of your vehicle and the result you're after — from a quick gloss refresh to full show-level restoration.",
    icon: <Sparkles className="w-10 h-10 text-[#E6007A]" />,
    pricing: "$300+",
    pricingDetails: [
      "Paint Enhancement — starting at $300: Light machine polish for added gloss, minor haze removal, and better shine. Great for vehicles that just need a refresh.",
      "1-Step Paint Correction — starting at $600: Includes wash, iron removal, clay bar, single-stage machine polish, and sealant. Removes light swirls, haze, and minor defects.",
      "2-Step Paint Correction — starting at $1,100: Includes compound + polish for deeper swirl/scratch removal and stronger reflection. Recommended before ceramic coating.",
      "Advanced Paint Correction — starting at $1,800: For heavily swirled, oxidized, black, or show-level vehicles. Final price depends on paint condition, size, and desired result.",
    ],
    features: ["Swirl Mark Removal", "Deep Gloss Restoration", "Enhances Resale Value"],
  },
];

const gallery = [
  { id: 1, title: "Paint Correction", beforeAfter: false, color: "from-blue-900 to-[#00EAFF]", thumbnail: `${import.meta.env.BASE_URL}detailing/images/paint-correction-thumbnail.jpg`, images: [
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-1.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-2.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-3.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-4.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-5.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-6.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-7.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-1.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-2.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-3.jpg`,
  ], currentImageIndex: 0 },
  { id: 2, title: "Ceramic Coating", beforeAfter: true, color: "from-[#E6007A] to-pink-950", video: `${import.meta.env.BASE_URL}detailing/images/paint-correction-4.jpg` },
  { id: 3, title: "Interior Restoration", beforeAfter: true, color: "from-blue-900 to-indigo-900", thumbnail: `${import.meta.env.BASE_URL}detailing/images/interior-after-1.jpg`, images: [
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-1290.jpeg`, label: "Before" },
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-1303.jpeg`, label: "After" },
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-1297.jpeg`, label: "Before" },
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-1309.jpeg`, label: "After" },
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-1294.jpeg`, label: "Before" },
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-1306.jpeg`, label: "After" },
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-before-1.jpg`, label: "Before" },
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-after-1.jpg`, label: "After" },
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-before-2.jpg`, label: "Before" },
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-after-2.jpg`, label: "After" },
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-before-3.jpg`, label: "Before" },
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-after-3.jpg`, label: "After" },
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-before-4.jpg`, label: "Before" },
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-after-4.jpg`, label: "After" },
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-before-5.jpg`, label: "Before" },
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-after-5.jpg`, label: "After" },
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-before-6.jpg`, label: "Before" },
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-after-6.jpg`, label: "After" },
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-before-7.jpg`, label: "Before" },
    { src: `${import.meta.env.BASE_URL}detailing/images/interior-after-7.jpg`, label: "After" },
  ], currentImageIndex: 0 },
  { id: 4, title: "Exterior Detail", beforeAfter: true, color: "from-pink-950 to-black", thumbnail: `${import.meta.env.BASE_URL}detailing/images/exterior-detail-thumbnail.jpg`, video: `${import.meta.env.BASE_URL}detailing/images/exterior-after-1.jpg`, images: [
    { src: `${import.meta.env.BASE_URL}detailing/images/exterior-before-1.jpg`, label: "Before" },
    { src: `${import.meta.env.BASE_URL}detailing/images/exterior-after-1.jpg`, label: "After" },
    { src: `${import.meta.env.BASE_URL}detailing/images/exterior-before-2.jpg`, label: "Before" },
    { src: `${import.meta.env.BASE_URL}detailing/images/exterior-after-2.jpg`, label: "After" },
  ], currentImageIndex: 0 },
  { id: 5, title: "Headlights Restoration", beforeAfter: true, color: "from-cyan-900 to-blue-600", thumbnail: `${import.meta.env.BASE_URL}detailing/images/headlights-after-1.jpg`, images: [
    { src: `${import.meta.env.BASE_URL}detailing/images/headlights-before-1.jpg`, label: "Before" },
    { src: `${import.meta.env.BASE_URL}detailing/images/headlights-after-1.jpg`, label: "After" },
    { src: `${import.meta.env.BASE_URL}detailing/images/headlights-before-2.jpg`, label: "Before" },
    { src: `${import.meta.env.BASE_URL}detailing/images/headlights-after-2.jpg`, label: "After" },
    { src: `${import.meta.env.BASE_URL}detailing/images/headlights-before-3.jpg`, label: "Before" },
    { src: `${import.meta.env.BASE_URL}detailing/images/headlights-after-3.jpg`, label: "After" },
  ], currentImageIndex: 0 },
];

  const testimonials = [
    {
      text: "Elite Detailing detailed our fleet vehicles — two trucks, a sedan, a minivan, and an SUV. Every vehicle looked brand new. We'll definitely be back with our personal cars.",
      author: "Local Business Client",
      name: "Local Business Client",
      location: "Metro Area",
    },
  {
    name: "Sarah W.",
    location: "Metro Area",
    text: "The interior detail was mind-blowing. With two kids, my SUV was a disaster zone. They got out stains I thought were permanent and it smells brand new again.",
  },
  {
    name: "Jennifer M.",
    location: "Metro Area",
    text: "They completely restored my headlights and the difference is night and day. Professional, thorough, and they even took care to protect my vehicle. Highly recommend!",
  },
];

const googleReviews = [
  {
    name: "David S.",
    rating: 5,
    date: "Google Review",
    text: "The waxing service was fantastic and very reasonable. Made my BMW X5 look brand new. Extra wheel treatment at no charge. Very professional team that knows detailing inside and out.",
  },
  {
    name: "Larry P.",
    rating: 5,
    date: "Google Review",
    text: "Elite Detailing detailed our work vehicles including trucks, sedans, and an SUV. Every vehicle looked brand new. We'll definitely be bringing our personal vehicles back.",
  },
  {
    name: "Mark C.",
    rating: 5,
    date: "Google Review",
    text: "Elite Detailing made our Honda look like the day it was new. Highly recommend for anyone looking to restore their vehicle to showroom condition.",
  },
  {
    name: "Darrell C.",
    rating: 5,
    date: "Google Review",
    text: "Had the exterior of my truck detailed and could not believe how great it looked — like brand new. Top-tier performance and attention to detail. Will definitely be going back.",
  },
  {
    name: "Zach M.",
    rating: 5,
    date: "Google Review",
    text: "Great job detailing our SUV. Very professional and reasonably priced.",
  },
  {
    name: "Nicolle M.",
    rating: 5,
    date: "Google Review",
    text: "Got my car looking better than ever. The team is detail oriented and made my car shine inside and out. Turnaround time was great.",
  },
];

function AddonsSection() {
  const [expandedAddon, setExpandedAddon] = useState(null);

  const interiorAddons = [
    {
      id: "pet-hair",
      name: "Pet Hair Removal",
      price: "$0 – $100",
      description: "Pet hair removal is a specialized interior detailing service designed to extract stubborn pet hair from seats, carpets, floor mats, and other fabric surfaces inside the vehicle. Professional tools such as rubber brushes, specialized vacuums, air compressors, and detailing tools are used to loosen and remove hair that is deeply embedded in upholstery fibers."
    },
    {
      id: "deep-shampooing",
      name: "Deep Shampooing & Stain Removal",
      price: "$120+",
      description: "Deep shampooing and stain removal is an intensive cleaning process designed to eliminate deeply embedded dirt, odors, and stubborn stains from carpets and upholstery. High-quality cleaning solutions and powerful extraction equipment lift contaminants from the fibers, leaving surfaces sanitized, refreshed, and looking like new."
    },
    {
      id: "plastic-uv",
      name: "Interior Plastic UV Treatment",
      price: "$60",
      description: "Interior Plastic UV Treatment protects dashboards, door panels, and other plastic surfaces from sun damage. The treatment restores the original appearance while adding a protective layer that helps prevent fading, cracking, and discoloration."
    }
  ];

  const exteriorAddons = [
    {
      id: "exterior-detailing",
      name: "Exterior Detailing",
      price: "Sedan: $150 | SUV: $200",
      description: "Comprehensive exterior cleaning and protection to make your car turn heads everywhere you go. Includes detailed hand wash, exterior windows and mirrors cleaning, wheels and tires cleaned, polished, and dressed, door jambs wiped down, and spray sealant for 1-month protection."
    },
    {
      id: "wash-clay-wax",
      name: "Wash, Clay & Wax",
      price: "Sedan: $250 | SUV: $300–$350",
      description: "First, the vehicle receives a thorough hand wash to remove dirt, dust, and road grime. Next, a clay bar treatment is used to safely remove embedded contaminants such as tar, brake dust, and industrial fallout that normal washing cannot remove. Finally, a protective wax coating is applied to enhance shine, protect the paint, and help repel water and dirt."
    },
    {
      id: "dress-exterior",
      name: "Dress Exterior Plastic",
      price: "$45",
      description: "Exterior Plastic Dressing is a detailing service that restores and protects the plastic and rubber trim on the outside of your vehicle. A professional-grade dressing is applied to faded or dull plastic surfaces to bring back their deep, rich color while adding protection against sun damage and weather."
    },
    {
      id: "clay-bar",
      name: "Clay Bar Treatment",
      price: "$55+",
      description: "Clay Bar Treatment is a detailing process that removes embedded contaminants from your vehicle's paint that regular washing cannot eliminate. Using a specialized clay bar and lubricant, the surface is gently treated to lift off bonded particles such as brake dust, tar, tree sap, and industrial fallout. This process leaves the paint smooth to the touch, improves the vehicle's shine, and prepares the surface for wax, sealant, or ceramic coating."
    },
    {
      id: "headlight",
      name: "Headlight Restoration",
      price: "$100",
      description: "Headlight Restoration is a detailing service that removes oxidation, haze, and yellowing from vehicle headlights to restore clarity and brightness. Over time, sun exposure and environmental contaminants can make headlights cloudy, reducing visibility and the overall appearance of your vehicle."
    },
    {
      id: "engine-bay",
      name: "Engine Bay Cleaning",
      price: "$60+",
      description: "Engine Bay Cleaning is a detailing service that safely cleans the engine compartment to remove built-up dirt, grease, dust, and debris. Using specialized cleaners and careful techniques, the engine bay is degreased, gently washed, and dried to restore a clean and well-maintained appearance."
    }
  ];

  return (
    <div className="mt-24 pt-16 border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Interior Addons */}
        <div>
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] to-[#00EAFF]">
              Interior Addons
            </span>
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Optional Services (Extra Charges Apply)
          </p>
          
          <div className="space-y-4">
            {interiorAddons.map(addon => (
              <AddonCard key={addon.id} addon={addon} />
            ))}
          </div>
        </div>

        {/* Exterior Addons */}
        <div>
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] to-[#00EAFF]">
              Exterior Addons
            </span>
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Optional Services (Extra Charges Apply)
          </p>
          
          <div className="space-y-4">
            {exteriorAddons.map(addon => (
              <AddonCard key={addon.id} addon={addon} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DetailingHome() {
  const { showDetailingModal } = useDetailingModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<typeof gallery[0] | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [aboutImageIdx, setAboutImageIdx] = useState(0);
  const [failedVideos, setFailedVideos] = useState<Set<number>>(new Set());
  const [mapChooserOpen, setMapChooserOpen] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);
  const [isAnimatingSlider, setIsAnimatingSlider] = useState(true);
  const [sliderDirection, setSliderDirection] = useState<'forward' | 'backward'>('forward');
  const [sliderFading, setSliderFading] = useState(false);
  const [sliderCycleComplete, setSliderCycleComplete] = useState(false);
  const [paintCorrectionPreviewIndex, setPaintCorrectionPreviewIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [activeFaqCategory, setActiveFaqCategory] = useState<"General" | "Paint Correction">("General");
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);

  const faqs: Array<{ q: string; a: string; category: string }> = [
    {
      q: "Where are you located?",
      a: "Our shop is located in the Metro Area. Serving the greater metro area and surrounding communities.",
      category: "General",
    },
    {
      q: "How long does a detail take?",
      a: "Most interior or exterior details take 2–4 hours. Full details usually run 4–6 hours — and sometimes up to 10 hours for heavily soiled vehicles. Ceramic coatings or paint correction can take a full day depending on vehicle condition.",
      category: "General",
    },
    {
      q: "How do I book an appointment?",
      a: "Click any Book Your Detail button to use our online booking — pick your service, day, and time in under a minute. You can also call us at (555) 000-0000. All scheduling needs to happen before your visit.",
      category: "General",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept cash, Square (all major credit/debit cards), Venmo, and Zelle. Digital gift cards are also available year-round through our Square store.",
      category: "General",
    },
    {
      q: "What if my vehicle is in really rough shape?",
      a: "No problem — we handle heavy pet hair, deep stains, and serious build-up. Heavily soiled interiors may require a Full Interior Detail rather than the Express service. Final pricing is confirmed at inspection.",
      category: "General",
    },
    {
      q: "Do you offer gift cards?",
      a: "Yes — digital gift cards are available through our Square store. They're a perfect gift for any car owner.",
      category: "General",
    },
    {
      q: "What is paint correction?",
      a: "Paint correction is a professional process that removes imperfections from your vehicle's paint by machine polishing the clear coat. Over time, your paint can develop swirl marks, light scratches, oxidation, water spots, holograms, fading or dullness, and surface contamination. The goal is to restore clarity, depth, and gloss while making your paint look significantly cleaner and newer. Before any correction begins, your vehicle goes through proper preparation which may include a hand wash, iron decontamination, clay bar treatment, and paint inspection to ensure the paint is clean and safe to polish.",
      category: "Paint Correction",
    },
    {
      q: "What is a 1-Step Paint Correction?",
      a: "A 1-step correction is ideal for vehicles with light imperfections. This process includes a light cutting polish that removes minor swirl marks, improves gloss and shine, reduces light scratches, and enhances paint clarity. A 1-step correction typically removes 50–70% of paint defects depending on paint condition and hardness. Best for newer vehicles, light swirl marks, vehicles that already have decent paint condition, and owners wanting a noticeable improvement without heavy correction.",
      category: "Paint Correction",
    },
    {
      q: "What is a 2-Step Paint Correction?",
      a: "A 2-step correction is a more aggressive restoration process for vehicles with heavier imperfections. Step 1 uses a heavy compound that removes deeper scratches, corrects oxidation, eliminates heavier swirl marks, and removes deeper paint defects. Step 2 uses a finishing polish that refines the paint, restores gloss, removes haze from compounding, and creates a deep mirror-like finish. A 2-step correction can remove 70–90%+ of paint defects depending on paint thickness and condition. Best for older vehicles, heavily neglected paint, deep swirls and scratches, and vehicles needing major restoration. Some scratches may be too deep to remove safely if they've gone through the clear coat.",
      category: "Paint Correction",
    },
    {
      q: "Why does pricing vary?",
      a: "Every vehicle is different. Pricing depends on vehicle size, paint condition, level of contamination, time needed for preparation, and whether your vehicle needs a 1-step or 2-step correction. Heavily contaminated vehicles require additional prep time before polishing can safely begin.",
      category: "Paint Correction",
    },
    {
      q: "Do I need paint protection after correction?",
      a: "Yes — protection is highly recommended after paint correction. Once the paint is polished, adding protection helps preserve the results and keeps your vehicle cleaner longer. Our paint sealant provides 6–8 months of protection against dirt buildup, water spots, UV exposure, road grime, and minor surface wear, while adding extra gloss and making future washes easier.",
      category: "Paint Correction",
    },
    {
      q: "Can you apply ceramic coating after correction?",
      a: "Yes. Ceramic coating is a premium option for longer-term protection and durability. Benefits include longer-lasting protection, strong water beading, easier maintenance, UV protection, and enhanced gloss.",
      category: "Paint Correction",
    },
    {
      q: "How long does paint correction take?",
      a: "Most paint correction services take anywhere from 1 full day to multiple days, depending on the vehicle size and paint condition.",
      category: "Paint Correction",
    },
    {
      q: "Will paint correction remove all scratches?",
      a: "Not always. Paint correction can remove many imperfections, but scratches that are too deep may require wet sanding, touch-up paint, or may be unsafe to fully remove.",
      category: "Paint Correction",
    },
    {
      q: "What is ceramic coating?",
      a: "Ceramic coating is a premium protective layer that bonds to your vehicle's paint, providing long-lasting protection while enhancing gloss and making maintenance easier.",
      category: "Ceramic Coating",
    },
    {
      q: "Why should I ceramic coat my vehicle?",
      a: "Deep, mirror-like shine. Protection from UV rays and oxidation. Helps resist stains and contaminants. Makes washing easier. Keeps your vehicle cleaner longer. Preserves your paint's appearance.",
      category: "Ceramic Coating",
    },
    {
      q: "What's included in the ceramic coating package?",
      a: "Full hand wash, iron decontamination treatment, clay bar treatment, paint polishing for maximum gloss, paint preparation and panel wipe, professional ceramic coating application, and final quality inspection.",
      category: "Ceramic Coating",
    },
    {
      q: "Does a brand-new vehicle need paint polishing?",
      a: "Yes. Even new vehicles often have light swirl marks, dealership wash scratches, and minor imperfections. Proper paint preparation ensures the best possible finish before the coating is applied.",
      category: "Ceramic Coating",
    },
    {
      q: "How long does the ceramic coating process take?",
      a: "Most ceramic coating services take 1-2 days, depending on the size of the vehicle and the amount of paint correction needed.",
      category: "Ceramic Coating",
    },
    {
      q: "How long will ceramic coating last?",
      a: "With proper maintenance and safe washing methods, ceramic coating can provide years of protection and shine.",
      category: "Ceramic Coating",
    },
    {
      q: "Will ceramic coating prevent scratches?",
      a: "Ceramic coating is not scratch-proof, but it helps protect against minor wash-induced swirl marks and everyday wear.",
      category: "Ceramic Coating",
    },
    {
      q: "Does ceramic coating eliminate the need to wash my car?",
      a: "No, but it makes cleaning much easier. Dirt, mud, and road grime don't stick as easily, helping your vehicle stay cleaner for longer.",
      category: "Ceramic Coating",
    },
    {
      q: "Can ceramic coating be applied to windows and wheels?",
      a: "Yes! Exterior glass and wheels can also be protected, making them easier to clean and maintain.",
      category: "Ceramic Coating",
    },
    {
      q: "How should I maintain my ceramic-coated vehicle?",
      a: "We recommend regular hand washes using pH-neutral soap and avoiding automatic car washes with brushes to maximize the life of the coating.",
      category: "Ceramic Coating",
    },
    {
      q: "Is ceramic coating worth it?",
      a: "Absolutely! Ceramic coating is one of the best ways to protect your investment, reduce maintenance, and keep your vehicle looking its best for years.",
      category: "Ceramic Coating",
    },
  ];

  const serviceCities = [
    "Downtown", "Northside", "West End", "East Valley", "South Park",
    "Rogersville", "Strafford", "Willard", "Sparta", "Highlandville",
  ];

  const beforeAfterPairs: Array<{ title: string; before: string; after: string }> = [
    {
      title: "Interior Restoration",
      before: `${import.meta.env.BASE_URL}detailing/images/interior-1290.jpeg`,
      after: `${import.meta.env.BASE_URL}detailing/images/interior-1303.jpeg`,
    },
    {
      title: "Interior Restoration",
      before: `${import.meta.env.BASE_URL}detailing/images/interior-1297.jpeg`,
      after: `${import.meta.env.BASE_URL}detailing/images/interior-1309.jpeg`,
    },
    {
      title: "Interior Restoration",
      before: `${import.meta.env.BASE_URL}detailing/images/interior-1294.jpeg`,
      after: `${import.meta.env.BASE_URL}detailing/images/interior-1306.jpeg`,
    },
    {
      title: "Interior Restoration",
      before: `${import.meta.env.BASE_URL}detailing/images/interior-before-1.jpg`,
      after: `${import.meta.env.BASE_URL}detailing/images/interior-after-1.jpg`,
    },
    {
      title: "Interior Restoration",
      before: `${import.meta.env.BASE_URL}detailing/images/interior-before-2.jpg`,
      after: `${import.meta.env.BASE_URL}detailing/images/interior-after-2.jpg`,
    },
    {
      title: "Interior Restoration",
      before: `${import.meta.env.BASE_URL}detailing/images/interior-before-3.jpg`,
      after: `${import.meta.env.BASE_URL}detailing/images/interior-after-3.jpg`,
    },
    {
      title: "Interior Restoration",
      before: `${import.meta.env.BASE_URL}detailing/images/interior-before-7.jpg`,
      after: `${import.meta.env.BASE_URL}detailing/images/interior-after-7.jpg`,
    },
    {
      title: "Exterior Detail",
      before: `${import.meta.env.BASE_URL}detailing/images/exterior-before-1.jpg`,
      after: `${import.meta.env.BASE_URL}detailing/images/exterior-after-1.jpg`,
    },
    {
      title: "Exterior Detail",
      before: `${import.meta.env.BASE_URL}detailing/images/exterior-before-2.jpg`,
      after: `${import.meta.env.BASE_URL}detailing/images/exterior-after-2.jpg`,
    },
    {
      title: "Headlights Restoration",
      before: `${import.meta.env.BASE_URL}detailing/images/headlights-before-1.jpg`,
      after: `${import.meta.env.BASE_URL}detailing/images/headlights-after-1.jpg`,
    },
    {
      title: "Headlights Restoration",
      before: `${import.meta.env.BASE_URL}detailing/images/headlights-before-2.jpg`,
      after: `${import.meta.env.BASE_URL}detailing/images/headlights-after-2.jpg`,
    },
    {
      title: "Headlights Restoration",
      before: `${import.meta.env.BASE_URL}detailing/images/headlights-before-3.jpg`,
      after: `${import.meta.env.BASE_URL}detailing/images/headlights-after-3.jpg`,
    },
    {
      title: "Paint Correction",
      before: `${import.meta.env.BASE_URL}detailing/images/paint-correction-before.jpeg`,
      after: `${import.meta.env.BASE_URL}detailing/images/paint-correction-after.jpeg`,
    },
  ];

  const handleSliderDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const container = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const clientX =
      "touches" in e && e.touches.length > 0
        ? e.touches[0].clientX
        : "changedTouches" in e && e.changedTouches.length > 0
          ? e.changedTouches[0].clientX
          : (e as React.MouseEvent<HTMLDivElement>).clientX;
    const newPos = Math.max(0, Math.min(100, ((clientX - container.left) / container.width) * 100));
    setSliderPosition(newPos);
  };

  const aboutImages = [
    `${import.meta.env.BASE_URL}detailing/images/hero-1.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/hero-2.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/hero-1.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/hero-2.jpg`,
  ];

  // Auto-rotate images
  useEffect(() => {
    const timer = setInterval(() => {
      setAboutImageIdx((prev) => (prev + 1) % aboutImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [aboutImages.length]);

  // Auto-animate slider
  useEffect(() => {
    if (!isAnimatingSlider || isDraggingSlider) return;
    
    const interval = setInterval(() => {
      setSliderPosition((prev) => {
        let newPos = prev;
        if (sliderDirection === 'forward') {
          newPos = prev + 0.5;
          if (newPos >= 100) {
            setSliderDirection('backward');
            return 100;
          }
        } else {
          newPos = prev - 0.5;
          if (newPos <= 0) {
            setSliderDirection('forward');
            return 0;
          }
        }
        return newPos;
      });
    }, 16);
    
    return () => clearInterval(interval);
  }, [isAnimatingSlider, isDraggingSlider, sliderDirection]);

  // Auto-switch slider after one complete animation cycle (20 seconds), but only once through all comparisons
  useEffect(() => {
    if (!isAnimatingSlider || isDraggingSlider || sliderCycleComplete) return;
    
    const switchTimer = setInterval(() => {
      setSliderFading(true);
      setTimeout(() => {
        setCurrentSliderIndex((prev) => {
          const nextIndex = prev + 1;
          if (nextIndex >= beforeAfterPairs.length) {
            setSliderCycleComplete(true);
            setIsAnimatingSlider(false); // Stop animation when cycle completes
            return prev; // Stay on last image
          }
          return nextIndex;
        });
        setSliderPosition(50);
        setSliderDirection('forward');
        setSliderFading(false);
      }, 300);
    }, 20000); // Switch every 20 seconds (one complete cycle)
    
    return () => clearInterval(switchTimer);
  }, [isAnimatingSlider, isDraggingSlider, sliderCycleComplete, beforeAfterPairs.length]);


  // Auto-rotate gallery images when lightbox is open
  useEffect(() => {
    if (!selectedGalleryItem) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => {
        if (!selectedGalleryItem.images) return prev;
        const next = prev + 1;
        if (next >= selectedGalleryItem.images.length) return 0;
        return next;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, [selectedGalleryItem]);

  const handleGalleryItemClick = (item: typeof gallery[0]) => {
    setSelectedGalleryItem(item);
    setCurrentImageIndex(0);
    
    // Preload current and next image when gallery opens
    if (item.images) {
      const preloadImage = (index: number) => {
        if (index >= 0 && index < item.images.length) {
          const imageSrc = typeof item.images[index] === 'string' 
            ? item.images[index] 
            : item.images[index].src;
          const img = new Image();
          img.src = imageSrc;
        }
      };
      preloadImage(0);
      preloadImage(1);
    }
  };

  const nextImage = () => {
    if (selectedGalleryItem?.images && currentImageIndex < selectedGalleryItem.images.length - 1) {
      setIsImageTransitioning(true);
      setTimeout(() => {
        const nextIndex = currentImageIndex + 1;
        setCurrentImageIndex(nextIndex);
        setIsImageTransitioning(false);

        // Preload the image after next
        if (nextIndex + 1 < selectedGalleryItem.images.length) {
          const imageSrc = typeof selectedGalleryItem.images[nextIndex + 1] === 'string'
            ? selectedGalleryItem.images[nextIndex + 1]
            : selectedGalleryItem.images[nextIndex + 1].src;
          const img = new Image();
          img.src = imageSrc;
        }
      }, 200);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setIsImageTransitioning(true);
      setTimeout(() => {
        const prevIndex = currentImageIndex - 1;
        setCurrentImageIndex(prevIndex);
        setIsImageTransitioning(false);

        // Preload the image before previous
        if (prevIndex - 1 >= 0 && selectedGalleryItem?.images) {
          const imageSrc = typeof selectedGalleryItem.images[prevIndex - 1] === 'string'
            ? selectedGalleryItem.images[prevIndex - 1]
            : selectedGalleryItem.images[prevIndex - 1].src;
          const img = new Image();
          img.src = imageSrc;
        }
      }, 200);
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "services", "about", "gallery", "testimonials", "faq"];
    const observers = {};

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(callback, {
          threshold: [0, 0.1, 0.2],
        });
        observer.observe(element);
        observers[id] = observer;
      }
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);

  const paintCorrectionImages = [
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-5.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-2.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-6.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-1.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-3.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-4.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-7.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-1.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-2.jpg`,
    `${import.meta.env.BASE_URL}detailing/images/paint-correction-3.jpg`,
  ];

  useEffect(() => {
    const paintCorrectionTimer = setInterval(() => {
      setPaintCorrectionPreviewIndex((prev) => (prev + 1) % paintCorrectionImages.length);
    }, 3500);

    return () => clearInterval(paintCorrectionTimer);
  }, [paintCorrectionImages.length]);


  const getHeaderOffset = () => {
    const root = document.querySelector(".detailing-site");
    if (!root) return 80;
    const styles = getComputedStyle(root);
    const disclaimer = parseFloat(styles.getPropertyValue("--detail-disclaimer-h")) || 0;
    const nav = parseFloat(styles.getPropertyValue("--detail-nav-h")) || 0;
    return disclaimer + nav + 8;
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = getHeaderOffset();
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const openMapChooser = () => {
    setMapChooserOpen(true);
  };

  const openGoogleMaps = () => {
    window.open("#", "_blank", "noopener,noreferrer");
    setMapChooserOpen(false);
  };

  const openAppleMaps = () => {
    window.open("#", "_blank", "noopener,noreferrer");
    setMapChooserOpen(false);
  };

  return (
    <div className="detailing-site min-h-screen bg-black text-white overflow-x-hidden selection:bg-[#E6007A] selection:text-white">
      {/* Texture Overlay */}
      <div className="texture-overlay" />
      <DetailingDisclaimer className="fixed top-0 left-0 right-0 z-[60]" />
      {/* Navigation */}
      <nav
        className={`fixed left-0 right-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-md shadow-[0_4px_32px_rgba(230,0,122,0.35),0_0_48px_rgba(0,234,255,0.15)]"
            : "bg-black/70 backdrop-blur-sm"
        }`}
        style={{ top: "var(--detail-disclaimer-h)" }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#E6007A] via-[#00EAFF] to-[#E6007A]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 min-h-[var(--detail-nav-h)] w-full">
            <button
              type="button"
              className="flex items-center justify-start shrink-0 min-w-0"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
            >
              <img
                src={LOGO_URL}
                alt="Elite Detailing"
                className="logo-img logo-nav logo-shine"
              />
            </button>

            <div className="hidden xl:flex items-center justify-center gap-5 lg:gap-6">
              {["Home", "Services", "About", "Gallery", "Testimonials", "FAQ"].map((item) => {
                const href = `#${item.toLowerCase()}`;
                return (
                  <a
                    key={item}
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.toLowerCase());
                    }}
                    className={`font-semibold text-xs lg:text-sm tracking-wider uppercase transition-colors relative group whitespace-nowrap ${
                      activeSection === item.toLowerCase()
                        ? "text-white header-shine"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#E6007A] to-[#00EAFF] transition-all duration-300 group-hover:w-full" />
                  </a>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-2 sm:gap-3">
              <a
                href="tel:+15550000000"
                className="hidden xl:inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#00EAFF] transition-colors shrink-0"
                aria-label="Call Elite Detailing"
              >
                <Phone className="w-4 h-4 text-[#00EAFF] shrink-0" />
                <span>Call</span>
              </a>
              <Link href={DETAILING_BRAND.adminLoginPath} className="btn-elite-outline text-sm px-3 py-2 sm:px-4 sm:py-2.5 shrink-0 hidden md:inline-flex">
                ADMIN LOGIN
              </Link>
              <Link href={DETAILING_BRAND.bookPath} className="btn-elite-primary text-sm px-4 py-2 sm:px-5 sm:py-2.5 shrink-0 hidden md:inline-flex">
                BOOK NOW <ChevronRight className="w-4 h-4 ml-1 hidden sm:inline" />
              </Link>
              <a
                href="tel:+15550000000"
                className="md:hidden inline-flex items-center justify-center detail-touch-target rounded-full bg-white/5 border border-white/10 text-white hover:text-[#00EAFF] hover:border-[#00EAFF] transition-colors"
                aria-label="Call Elite Detailing"
              >
                <Phone className="w-5 h-5" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden text-white detail-touch-target inline-flex items-center justify-center focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`xl:hidden fixed left-0 right-0 w-full bg-black border-b border-white/10 transition-all duration-300 ease-in-out overflow-hidden z-40 ${
            mobileMenuOpen ? "max-h-[480px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
          }`}
          style={{ top: "calc(var(--detail-disclaimer-h) + var(--detail-nav-h))" }}
        >
          <div className="flex flex-col space-y-4 px-6">
            {["Home", "Services", "About", "Gallery", "Testimonials", "FAQ", "Buy Gift Card"].map((item) => {
              const isGiftCard = item === "Buy Gift Card";
              const href = isGiftCard ? "#gift-cards" : `#${item.toLowerCase()}`;
              return (
                <a
                  key={item}
                  href={href}
                  onClick={(e) => {
                    if (isGiftCard) {
                      e.preventDefault();
                      showDetailingModal();
                      setMobileMenuOpen(false);
                      return;
                    }
                    e.preventDefault();
                    scrollToSection(item.toLowerCase());
                  }}
                  className="text-left text-gray-300 hover:text-white font-semibold text-lg tracking-wider uppercase"
                >
                  {item}
                </a>
              );
            })}
            <Link
              href={DETAILING_BRAND.adminLoginPath}
              onClick={() => setMobileMenuOpen(false)}
              className="btn-elite-outline w-full text-center"
            >
              ADMIN LOGIN
            </Link>
            <Link
              href={DETAILING_BRAND.bookPath}
              onClick={() => setMobileMenuOpen(false)}
              className="btn-elite-primary mt-2 w-full text-center"
            >
              BOOK NOW
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-[calc(100dvh-var(--detail-header-offset))] sm:min-h-screen flex items-center overflow-hidden pt-[var(--detail-header-offset)]"
      >
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}detailing/images/hero-2.jpg`}
            alt="Elite Detailing freshly detailed vehicle"
            className="w-full h-full object-cover opacity-25"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
        </div>
        {/* Soap Bubbles in Header */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="soap-bubble absolute bottom-[5%] left-[5%] w-12 h-12" style={{ animationDuration: '16s', animationDelay: '0s' }} />
          <div className="soap-bubble absolute bottom-[10%] left-[15%] w-16 h-16" style={{ animationDuration: '18s', animationDelay: '1s' }} />
          <div className="soap-bubble absolute bottom-[8%] right-[10%] w-20 h-20" style={{ animationDuration: '20s', animationDelay: '2s' }} />
          <div className="soap-bubble absolute bottom-[15%] right-[5%] w-14 h-14" style={{ animationDuration: '17s', animationDelay: '0.5s' }} />
          <div className="soap-bubble absolute bottom-[3%] left-[40%] w-10 h-10" style={{ animationDuration: '19s', animationDelay: '1.5s' }} />
          <div className="soap-bubble absolute bottom-[12%] left-[25%] w-6 h-6" style={{ animationDuration: '15s', animationDelay: '0.8s' }} />
          <div className="soap-bubble absolute bottom-[7%] right-[20%] w-8 h-8" style={{ animationDuration: '17s', animationDelay: '2.5s' }} />
          <div className="soap-bubble absolute bottom-[20%] left-[60%] w-7 h-7" style={{ animationDuration: '16s', animationDelay: '1.2s' }} />
        </div>

          <div className="absolute inset-0 z-0 opacity-50">
          <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-[#E6007A] rounded-full mix-blend-screen filter blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[#00EAFF] rounded-full mix-blend-screen filter blur-[100px] animate-[pulse_8s_ease-in-out_infinite_1s]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center py-6 sm:py-10">
          <img
            src={LOGO_URL}
            alt="Elite Detailing"
            className="logo-img logo-hero logo-shine mb-4 sm:mb-5"
          />

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-4 sm:mb-5 drop-shadow-2xl uppercase max-w-4xl">
            Elevating Your Ride to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] via-white to-[#00EAFF]">
              Peak Shine
            </span>
          </h1>

          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#E6007A]/30 mb-6 max-w-xl">
            <span className="flex h-2 w-2 rounded-full bg-[#00EAFF] animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#E6007A] to-[#00EAFF] uppercase tech-label">
              {DETAILING_BRAND.tagline}
            </span>
          </p>

          <p className="max-w-2xl text-sm sm:text-base md:text-lg text-gray-300 mb-8 font-medium px-1">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] via-[#FF1493] to-[#00EAFF]">Premium auto detailing, ceramic coating, and paint correction</span> services serving
            <span className="text-[#00EAFF] font-bold"> the greater metro area</span>. We bring the showroom shine to your vehicle.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 w-full max-w-3xl">
              <Link href={DETAILING_BRAND.bookPath} className="btn-elite-primary w-full sm:w-auto sm:flex-1 sm:max-w-[220px]">
                BOOK YOUR DETAIL <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            <button
              type="button"
              onClick={() => showDetailingModal()}
              className="btn-elite-outline w-full sm:w-auto sm:flex-1 sm:max-w-[220px]"
            >
              BUY GIFT CARD <ChevronRight className="w-4 h-4 ml-1" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("services")}
              className="btn-elite-outline w-full sm:w-auto sm:flex-1 sm:max-w-[220px]"
            >
              EXPLORE SERVICES
            </button>
          </div>

          {/* Google Reviews Badge */}
          <a
            href={GOOGLE_REVIEWS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#FFA500]/60 transition-colors"
            aria-label="See our Google reviews"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-bold text-white text-sm sm:text-base">5.0</span>
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 text-[#FFA500]" fill="currentColor" />
              ))}
            </div>
            <span className="text-gray-300 text-xs sm:text-sm font-medium">on Google</span>
          </a>

          <div className="mt-10 flex flex-wrap justify-center items-center gap-6 sm:gap-8 opacity-80 hover:opacity-100 transition-all duration-500">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#E6007A]" />
              <span className="font-bold">Satisfaction Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-[#00EAFF]" />
              <span className="font-bold">5.0★ on Google</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-[#E6007A]" />
              <span className="font-bold">Shop-Based · Metro Area</span>
            </div>
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative border-t border-white/5 bg-[#0a0a0f] overflow-hidden">
        {/* Soap Bubbles in Services Section Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="soap-bubble absolute bottom-[5%] left-[5%] w-12 h-12" style={{ animationDuration: '16s', animationDelay: '0s' }} />
          <div className="soap-bubble absolute bottom-[10%] right-[10%] w-16 h-16" style={{ animationDuration: '18s', animationDelay: '1s' }} />
          <div className="soap-bubble absolute bottom-[8%] left-[15%] w-20 h-20" style={{ animationDuration: '20s', animationDelay: '2s' }} />
          <div className="soap-bubble absolute bottom-[15%] right-[5%] w-14 h-14" style={{ animationDuration: '17s', animationDelay: '0.5s' }} />
          <div className="soap-bubble absolute bottom-[3%] left-[40%] w-10 h-10" style={{ animationDuration: '19s', animationDelay: '1.5s' }} />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-widest text-[#00EAFF] uppercase mb-3">
              What We Do
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
              Elite{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] to-[#00EAFF]">
                Services
              </span>
            </h3>
            <p className="text-gray-400 text-lg">
              We offer comprehensive detailing solutions tailored to protect your investment and keep
              your vehicle looking immaculate.
            </p>
          </div>

          <div className="mb-12 p-6 rounded-xl bg-white/5 border border-[#E6007A]/30 backdrop-blur-sm max-w-3xl mx-auto">
            <p className="text-gray-300 text-sm leading-relaxed">
              <span className="font-black text-[#E6007A]">Pricing Note:</span> The price ranges listed below are standard for the majority of vehicles. The final cost will depend on the condition of your vehicle and any additional services you request. For a more accurate estimate, please contact us directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group relative p-[1px] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                  index === services.length - 1 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 group-hover:from-[#E6007A] group-hover:to-[#00EAFF] transition-all duration-500 opacity-50 group-hover:opacity-100" />
                <div className="relative h-full bg-[#111] p-6 sm:p-8 rounded-2xl flex flex-col z-10 transition-all duration-500">
                  <div className="mb-6 p-4 rounded-xl bg-white/5 inline-flex w-fit group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                    {service.icon}
                  </div>
                  <h4 className="text-2xl font-black mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#E6007A] group-hover:to-[#00EAFF] transition-all duration-300 flex items-center flex-wrap gap-2">
                    {service.title}
                    {service.id === "interior-detailing" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-[#E6007A] to-[#00EAFF] text-white group-hover:bg-none group-hover:bg-white group-hover:text-black transition-colors">
                        <Star className="w-3 h-3" fill="currentColor" /> Most Booked
                      </span>
                    )}
                    {service.id === "full-detailing" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#00EAFF] text-white group-hover:bg-white group-hover:text-black transition-colors">
                        Best Value
                      </span>
                    )}
                    {service.id === "express-interior-detailing" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-[#E6007A] to-[#00EAFF] text-white group-hover:bg-none group-hover:bg-white group-hover:text-black transition-colors">
                        <Zap className="w-3 h-3" /> Express
                      </span>
                    )}
                  </h4>
                  <div className="mb-4">
                    {!/call/i.test(service.pricing) && (
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-0.5">
                        Starting at
                      </p>
                    )}
                    <p className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] to-[#00EAFF]">
                      {service.pricing}
                    </p>
                  </div>
                  {service.pricingDetails && (
                    <div className="mb-4 text-sm text-gray-300 bg-white/5 p-3 rounded-lg">
                      {service.pricingDetails.map((detail, i) => (
                        <p key={i} className="text-xs mb-1">{detail}</p>
                      ))}
                    </div>
                  )}
                  <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#00EAFF] mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={DETAILING_BRAND.bookPath}
                    className="mt-auto inline-flex items-center gap-2 font-bold text-sm tracking-widest text-white uppercase group/btn cursor-pointer"
                  >
                    Book Now{" "}
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:text-[#00EAFF] transition-all" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Addons Section - Two Column Layout */}
          <AddonsSection />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-24 relative bg-black border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-sm font-bold tracking-widest text-[#E6007A] uppercase mb-3">
              How It Works
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              Three Simple{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] to-[#00EAFF]">
                Steps
              </span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Book Online", desc: "Pick your service, day, and time in under 2 minutes — right here on our site.", icon: <Clock className="w-7 h-7 text-[#00EAFF]" /> },
              { step: "02", title: "We Detail", desc: "Drop your car off at our shop. We handle every surface with care, from paint to upholstery.", icon: <Sparkles className="w-7 h-7 text-[#E6007A]" /> },
              { step: "03", title: "Drive Happy", desc: "Step into a like-new vehicle and enjoy long-lasting protection and shine.", icon: <Car className="w-7 h-7 text-[#00EAFF]" /> },
            ].map((s) => (
              <div key={s.step} className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <div className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] to-[#00EAFF] mb-4">{s.step}</div>
                <div className="mb-4">{s.icon}</div>
                <h4 className="text-xl font-black uppercase tracking-tight mb-2">{s.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        {/* Soap Bubbles in About Section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="soap-bubble absolute bottom-[5%] left-[5%] w-12 h-12" style={{ animationDuration: '16s', animationDelay: '0s' }} />
          <div className="soap-bubble absolute bottom-[10%] right-[10%] w-16 h-16" style={{ animationDuration: '18s', animationDelay: '1s' }} />
          <div className="soap-bubble absolute bottom-[8%] left-[15%] w-20 h-20" style={{ animationDuration: '20s', animationDelay: '2s' }} />
          <div className="soap-bubble absolute bottom-[15%] right-[5%] w-14 h-14" style={{ animationDuration: '17s', animationDelay: '0.5s' }} />
          <div className="soap-bubble absolute bottom-[3%] left-[40%] w-10 h-10" style={{ animationDuration: '19s', animationDelay: '1.5s' }} />
        </div>
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#E6007A]/10 rounded-full mix-blend-screen filter blur-[120px] -translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative group">
                {/* Image container with smooth transitions */}
                {aboutImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`About image ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-opacity duration-1000 ease-in-out"
                    style={{
                      opacity: idx === aboutImageIdx ? 1 : 0,
                    }}
                  />
                ))}
                <div 
                  className="absolute inset-0 bg-gradient-to-tr from-[#E6007A]/30 to-[#00EAFF]/30 group-hover:from-[#E6007A]/50 group-hover:to-[#00EAFF]/50 z-10 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent z-20">
                  <div className="inline-flex items-center gap-3 bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center overflow-hidden"
                        >
                          <Star className="w-5 h-5 text-[#00EAFF]" fill="currentColor" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="font-black text-white text-lg leading-tight">⭐⭐⭐⭐⭐</p>
                      <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                        5-Star Rated
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-[#E6007A] to-[#00EAFF] rounded-2xl -z-10 blur-xl opacity-50" />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-sm font-bold tracking-widest text-[#E6007A] uppercase mb-3">
                About Us
              </h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-6 sm:mb-8 leading-tight">
                Welcome to{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] to-[#00EAFF]">
                  Elite Detailing
                </span>
              </h3>

              <div className="space-y-5 sm:space-y-6 text-gray-400 text-base sm:text-lg mb-8 sm:mb-10">
                <p>
                  Where passion, precision, and purpose come together to serve you with excellence. Serving the greater metro area and surrounding communities. We specialize in high-quality car detailing that restores beauty, protects value, and reflects the pride you have in your vehicle.
                </p>
                <p>
                  Our dedication to quality and customer satisfaction has earned us a <strong className="text-white">5-star reputation</strong> with clients across the metro area — a recognition we work hard to maintain with every vehicle.
                </p>
                <p>
                  Elite Detailing was built on a commitment to meticulous craftsmanship and honest service. What started as a passion for automotive care has grown into a trusted shop known for consistency, transparency, and results you can see.
                </p>
                <p>
                  We use only premium-grade chemicals and professional techniques to ensure every vehicle gets the attention it deserves — inside and out. Whether it's a deep interior clean, paint correction, or exterior protection, our goal is to exceed your expectations.
                </p>
                <p>
                  <strong className="text-white">Experience the Elite difference — where quality drives every detail.</strong>
                </p>
                <div className="mt-8 flex items-center gap-5 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="relative shrink-0">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#E6007A] to-[#00EAFF] blur-md opacity-60" />
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#E6007A]/30 to-[#00EAFF]/30 border-2 border-white/20 flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-[#00EAFF]" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">
                      Certified professionals
                    </p>
                    <p className="text-white font-black text-lg sm:text-xl leading-tight">
                      Expert Detailing Team
                    </p>
                    <p className="text-[#E6007A] font-bold text-sm">
                      Trained · Insured · Detail-Oriented
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  {
                    title: "Premium Products",
                    desc: "Professional-grade chemicals only",
                    icon: <Shield className="text-[#E6007A]" />,
                  },
                  {
                    title: "Insured & Certified",
                    desc: "Peace of mind for your investment",
                    icon: <Award className="text-[#00EAFF]" />,
                  },
                  {
                    title: "Flexible Scheduling",
                    desc: "Book easily online anytime",
                    icon: <Clock className="text-[#E6007A]" />,
                  },
                  {
                    title: "Expert Team",
                    desc: "Certified professionals on staff",
                    icon: <Sparkles className="text-[#00EAFF]" />,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="font-bold text-white mb-1">{item.title}</h5>
                      <p className="text-sm text-gray-400 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Slider Section */}
      <section className="py-20 sm:py-24 relative bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16">
            <h2 className="text-sm font-bold tracking-widest text-[#E6007A] uppercase mb-3">
              See the Difference
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
              Before & After <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] to-[#00EAFF]">Transformations</span>
            </h3>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Slider */}
            <div
              className="detail-slider relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden cursor-col-resize bg-black/50 border border-white/10 group"
              onMouseMove={isDraggingSlider ? handleSliderDrag : undefined}
              onMouseDown={() => {
                setIsDraggingSlider(true);
                setIsAnimatingSlider(false);
              }}
              onMouseUp={() => {
                setIsDraggingSlider(false);
                setIsAnimatingSlider(true);
              }}
              onMouseLeave={() => {
                setIsDraggingSlider(false);
                setIsAnimatingSlider(true);
              }}
              onTouchStart={(e) => {
                setIsDraggingSlider(true);
                setIsAnimatingSlider(false);
                handleSliderDrag(e);
              }}
              onTouchEnd={() => {
                setIsDraggingSlider(false);
                setIsAnimatingSlider(true);
              }}
              onTouchMove={(e) => {
                e.preventDefault();
                handleSliderDrag(e);
              }}
              onClick={handleSliderDrag}
            >
              {/* After Image (Background) */}
              <img
                src={beforeAfterPairs[currentSliderIndex].after}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                style={{ opacity: sliderFading ? 0 : 1 }}
              />

              {/* Before Image (Overlay) */}
              <div
                className="absolute inset-0 overflow-hidden transition-opacity duration-300"
                style={{ width: `${sliderPosition}%`, opacity: sliderFading ? 0 : 1 }}
              >
                <img
                  src={beforeAfterPairs[currentSliderIndex].before}
                  alt="Before"
                  className="absolute top-0 left-0 h-full max-w-none object-cover object-left"
                  style={{ width: `${sliderPosition > 0 ? 100 / (sliderPosition / 100) : 100}%` }}
                />
              </div>

              {/* Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#E6007A] to-[#00EAFF] cursor-col-resize"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center transition-all">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14M16 5v14" />
                  </svg>
                </div>
              </div>

              {/* Labels */}
              <div 
                className="absolute top-2 left-2 sm:top-4 sm:left-4 text-white font-black uppercase text-xs sm:text-sm tracking-wider bg-black/50 px-2 py-1 sm:px-3 sm:py-2 rounded-lg backdrop-blur-sm transition-opacity duration-300"
                style={{ opacity: sliderPosition > 15 ? 1 : 0, pointerEvents: 'none' }}
              >
                Before
              </div>
              <div 
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white font-black uppercase text-xs sm:text-sm tracking-wider bg-black/50 px-2 py-1 sm:px-3 sm:py-2 rounded-lg backdrop-blur-sm transition-opacity duration-300"
                style={{ opacity: sliderPosition < 85 ? 1 : 0, pointerEvents: 'none' }}
              >
                After
              </div>

              {/* Title */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-white font-black uppercase text-center text-xs sm:text-base md:text-lg tracking-wider bg-gradient-to-r from-[#E6007A]/80 to-[#00EAFF]/80 px-2 sm:px-4 sm:px-6 py-2 sm:py-3 rounded-lg backdrop-blur-sm">
                {beforeAfterPairs[currentSliderIndex].title}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
              <button
                onClick={() => setCurrentSliderIndex((prev) => (prev - 1 + beforeAfterPairs.length) % beforeAfterPairs.length)}
                className="w-full sm:w-auto px-6 py-3 min-h-[44px] rounded-lg bg-white/5 border border-white/10 hover:border-[#00EAFF] hover:text-white transition-all font-bold text-sm"
              >
                ← Previous
              </button>
              <button
                onClick={() => setCurrentSliderIndex((prev) => (prev + 1) % beforeAfterPairs.length)}
                className="w-full sm:w-auto px-6 py-3 min-h-[44px] rounded-lg bg-white/5 border border-white/10 hover:border-[#00EAFF] hover:text-white transition-all font-bold text-sm"
              >
                Next →
              </button>
            </div>

            {/* Indicators */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6">
              {beforeAfterPairs.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSliderIndex(idx)}
                  className={`min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full transition-all ${
                    idx === currentSliderIndex
                      ? "bg-gradient-to-r from-[#E6007A] to-[#00EAFF] scale-110"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Show transformation ${idx + 1}`}
                >
                  <span className={`block rounded-full ${idx === currentSliderIndex ? "w-2.5 h-2.5 bg-white" : "w-2 h-2 bg-white/80"}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 relative bg-[#0a0a0f] border-y border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 sm:mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold tracking-widest text-[#00EAFF] uppercase mb-3">
                Our Work
              </h2>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                Results That{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] to-[#00EAFF]">
                  Speak
                </span>
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 justify-items-center">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer w-full"
                onClick={() => handleGalleryItemClick(item)}
              >
                {item.video && !failedVideos.has(item.id) ? (
                  <>
                    <video
                      src={item.video}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      muted
                      autoPlay
                      loop
                      playsInline
                      controls={false}
                      onError={() => setFailedVideos(prev => new Set(prev).add(item.id))}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                  </>
                ) : item.images && item.images.length > 0 ? (
                  <>
                    {item.thumbnail?.endsWith('.mov') || item.thumbnail?.endsWith('.mp4') ? (
                      <video
                        src={item.thumbnail}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        muted
                        autoPlay
                        loop
                        playsInline
                        controls={false}
                      />
                    ) : item.id === 1 ? (
                      <div className="absolute inset-0">
                        {paintCorrectionImages.map((src, idx) => (
                          <img
                            key={src}
                            src={src}
                            alt="Paint Correction"
                            className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-opacity duration-700 ${paintCorrectionPreviewIndex === idx ? 'opacity-100' : 'opacity-0'}`}
                            style={{ filter: 'brightness(1.1) contrast(1.1)' }}
                          />
                        ))}
                      </div>
                    ) : (
                      <img
                        src={item.thumbnail || (typeof item.images[0] === 'string' ? item.images[0] : item.images[0].src)}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        style={{ filter: 'brightness(1.15) contrast(1.15)' }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  </>
                ) : (
                  <>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-80 group-hover:scale-105 transition-transform duration-700`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  </>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.beforeAfter ? (
                    <span className="inline-block px-3 py-1 bg-[#00EAFF] text-black font-black text-xs uppercase tracking-widest rounded mb-3 opacity-85">
                      Results before and after
                    </span>
                  ) : item.id === 1 && (
                    <span className="inline-block px-3 py-1 bg-[#00EAFF] text-black font-black text-xs uppercase tracking-widest rounded mb-3 opacity-85">
                      Finished results
                    </span>
                  )}
                  <h4 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] to-[#00EAFF] opacity-85" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8)) drop-shadow(0 1px 2px rgba(0,0,0,0.6))' }}>{item.title}</h4>
                  {item.images && item.images.length > 1 && (
                    <p className="text-xs text-gray-300 mt-2">
                      {item.images.length} {item.images.length === 1 ? 'result' : 'results'}
                    </p>
                  )}
                  <div className="w-12 h-1 bg-gradient-to-r from-[#E6007A] to-[#00EAFF] mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 text-lg mb-6">See more stunning transformations on Instagram</p>
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 font-black text-white text-base sm:text-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-[#E6007A] to-[#00EAFF] rounded-xl overflow-hidden shadow-[0_0_40px_rgba(168,134,205,0.4)] hover:shadow-[0_0_60px_rgba(0,234,255,0.6)] sm:hover:scale-105"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00EAFF] to-[#E6007A] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center gap-3">
                <Instagram className="w-6 h-6" />
                Follow @eliteautodetailing
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Lightbox Modal */}
      {selectedGalleryItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedGalleryItem(null)}
        >
          <button
            onClick={() => setSelectedGalleryItem(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 detail-touch-target inline-flex items-center justify-center text-white hover:text-[#00EAFF] transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>


          <div 
            className={`relative flex items-center justify-center ${isFullscreen ? 'w-screen h-screen' : 'max-w-4xl max-h-[90vh]'}`} 
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
            onTouchEnd={(e) => {
              setTouchEnd(e.changedTouches[0].clientX);
              const distance = touchStart - e.changedTouches[0].clientX;
              if (distance > 50 && selectedGalleryItem?.images && currentImageIndex < selectedGalleryItem.images.length - 1) {
                nextImage();
              }
              if (distance < -50 && currentImageIndex > 0) {
                prevImage();
              }
            }}
          >
            {selectedGalleryItem.images && selectedGalleryItem.images.length > 0 ? (
              <>
                <img
                  src={typeof selectedGalleryItem.images[currentImageIndex] === 'string' ? selectedGalleryItem.images[currentImageIndex] : selectedGalleryItem.images[currentImageIndex].src}
                  alt={`${selectedGalleryItem.title} - Image ${currentImageIndex + 1}`}
                  className={`${isFullscreen ? 'w-full h-full' : 'w-full h-full'} object-contain ${!isFullscreen && 'rounded-xl'} transition-opacity duration-200`}
                  style={{ filter: 'brightness(0.95) contrast(1.05)', opacity: isImageTransitioning ? 0 : 1 }}
                />
                
                {/* Before/After Label */}
                {selectedGalleryItem.beforeAfter && typeof selectedGalleryItem.images[currentImageIndex] === 'object' && (
                  <div className="absolute top-6 left-6 bg-gradient-to-r from-[#E6007A] to-[#00EAFF] text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg opacity-85">
                    {selectedGalleryItem.images[currentImageIndex].label}
                  </div>
                )}
                
                {/* Previous Button */}
                {currentImageIndex > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-[#00EAFF] active:text-[#00EAFF] transition-colors z-50 bg-black/50 hover:bg-black/70 active:bg-black/80 p-3 md:p-4 rounded-full cursor-pointer min-w-12 h-12 md:min-w-14 md:h-14 flex items-center justify-center"
                    aria-label="Previous image"
                    type="button"
                  >
                    <svg className="w-6 h-6 md:w-8 md:h-8 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}

                {/* Next Button */}
                {selectedGalleryItem.images.length > 1 && currentImageIndex < selectedGalleryItem.images.length - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-[#00EAFF] active:text-[#00EAFF] transition-colors z-50 bg-black/50 hover:bg-black/70 active:bg-black/80 p-3 md:p-4 rounded-full cursor-pointer min-w-12 h-12 md:min-w-14 md:h-14 flex items-center justify-center"
                    aria-label="Next image"
                    type="button"
                  >
                    <svg className="w-6 h-6 md:w-8 md:h-8 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}

                {/* Image Counter */}
                {selectedGalleryItem.images.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {currentImageIndex + 1} / {selectedGalleryItem.images.length}
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      )}

      {/* Testimonials */}
      <section id="testimonials" className="py-24 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-[#00EAFF]/10 rounded-full mix-blend-screen filter blur-[150px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-[#E6007A] uppercase mb-3">
              Testimonials
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              Client{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] to-[#00EAFF]">
                Reactions
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors"
              >
                <Star className="absolute top-8 right-8 w-12 h-12 text-white/5" />
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-[#00EAFF]" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-8 relative z-10">"{testimonial.text}"</p>
                <div>
                  <h5 className="font-bold text-white text-lg">{testimonial.name}</h5>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Google Reviews Showcase */}
      <section className="py-24 relative bg-[#0a0a0f] border-y border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#E6007A]/10 rounded-full mix-blend-screen filter blur-[120px] -translate-y-1/2" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-sm font-bold tracking-widest text-[#00EAFF] uppercase mb-3">
              Google Reviews
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
              Trusted by Our{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] to-[#00EAFF]">
                Happy Customers
              </span>
            </h3>
            <p className="text-gray-400 text-lg mb-8">
              See what our clients are saying about Elite Detailing. We maintain a 5-star rating across all platforms.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { rating: "5.0", reviews: "Excellent", description: "Rating" },
                { rating: "100%", reviews: "Positive", description: "Customer Rating" },
                { rating: "5h", reviews: "Response", description: "Support Time" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors">
                  <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] to-[#00EAFF] mb-2">
                    {stat.rating}
                  </p>
                  <p className="text-gray-300 font-bold mb-2">{stat.reviews}</p>
                  <p className="text-gray-500 text-sm uppercase tracking-wider">{stat.description}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {googleReviews.map((review, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 hover:bg-white/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h5 className="font-bold text-white text-lg">{review.name}</h5>
                    <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= review.rating ? "text-[#FFA500]" : "text-gray-600"}`}
                      fill={star <= review.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 sm:py-24 relative bg-black border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00EAFF]/10 rounded-full mix-blend-screen filter blur-[120px]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-sm font-bold tracking-widest text-[#00EAFF] uppercase mb-3">
              Service Area
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Serving the{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] to-[#00EAFF]">
                Metro Area
              </span>
            </h3>
            <p className="text-gray-400 text-lg">
              Serving the greater metro area and surrounding communities. Drop your vehicle off at our shop.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {serviceCities.map((city) => (
                <div
                  key={city}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#00EAFF]/50 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#00EAFF]" />
                  <span className="text-sm font-bold text-gray-200">{city}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="tel:+15550000000"
                className="flex items-center gap-3 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-[#E6007A]/50 transition-colors"
              >
                <Phone className="w-5 h-5 text-[#E6007A]" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Call</p>
                  <p className="text-white font-bold">(555) 000-0000</p>
                </div>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-[#00EAFF]/50 transition-colors"
              >
                <MapPin className="w-5 h-5 text-[#00EAFF]" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Shop</p>
                  <p className="text-white font-bold">123 Demo Blvd</p>
                </div>
              </a>
              <div className="flex items-center gap-3 p-5 rounded-xl bg-white/5 border border-white/10">
                <Clock className="w-5 h-5 text-[#E6007A]" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Hours</p>
                  <p className="text-white font-bold">Mon–Sat · 7am – 6pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Preview Section */}
      <DetailingAdminPreviewSection />

      {/* FAQ Section */}
      <section id="faq" className="py-20 sm:py-24 relative bg-[#0a0a0f] border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-sm font-bold tracking-widest text-[#E6007A] uppercase mb-3">
              FAQ
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              Frequently Asked{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E6007A] to-[#00EAFF]">
                Questions
              </span>
            </h3>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 px-2">
            {(["General", "Paint Correction", "Ceramic Coating"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFaqCategory(cat);
                  setOpenFaq(null);
                }}
                className={`px-4 sm:px-5 py-2.5 min-h-[44px] rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 border ${
                  activeFaqCategory === cat
                    ? "bg-gradient-to-r from-[#E6007A] to-[#00EAFF] text-white border-transparent shadow-[0_0_20px_rgba(0,234,255,0.3)]"
                    : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs
              .filter((faq) => faq.category === activeFaqCategory)
              .map((faq, i) => {
                const key = `${activeFaqCategory}-${i}`;
                const isOpen = openFaq === key;
                return (
                  <div
                    key={key}
                    className={`rounded-xl border backdrop-blur-sm transition-colors ${
                      isOpen ? "bg-white/10 border-[#00EAFF]/40" : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : key)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-white text-base sm:text-lg">{faq.q}</span>
                      <ChevronRight
                        className={`w-5 h-5 shrink-0 text-[#00EAFF] transition-transform duration-300 ${
                          isOpen ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-gray-300 text-sm sm:text-base leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-[#111] border border-white/10 p-10 md:p-20 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-full bg-gradient-to-b from-[#E6007A]/20 to-[#00EAFF]/20 blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
                Ready to Experience <br />
                The Elite Difference?
              </h2>
              <p className="text-xl text-gray-400 mb-10 font-medium">
                Book your appointment today.
              </p>
              <div className="mb-8 p-6 rounded-xl bg-white/5 border border-[#00EAFF]/30 backdrop-blur-sm max-w-2xl">
                <p className="text-gray-300 text-sm leading-relaxed">
                  <span className="font-black text-[#00EAFF]">Important:</span> All scheduling needs to be done prior to your visit. We appreciate your understanding and encourage you to book ahead to secure your preferred time.
                </p>
              </div>
              <Link
                href={DETAILING_BRAND.bookPath}
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 font-black text-white text-lg sm:text-xl transition-all duration-300 ease-in-out bg-gradient-to-r from-[#E6007A] to-[#00EAFF] rounded-xl overflow-hidden shadow-[0_0_40px_rgba(230,0,122,0.4)] hover:shadow-[0_0_60px_rgba(0,234,255,0.6)] sm:hover:scale-105 cursor-pointer"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00EAFF] to-[#E6007A] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-3">
                  BOOK APPOINTMENT NOW <ChevronRight className="w-6 h-6" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#050505] border-t border-white/5 pt-20 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 sm:mb-16">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <img
                src={LOGO_URL}
                alt="Elite Detailing"
                className="logo-img logo-footer logo-shine"
              />
              <p className="text-gray-400 mb-6 font-medium">
                Prestige vehicle detailing and ceramic coating services. Expert craftsmanship,
                exceptional results.
              </p>
              <div className="flex gap-4">
                <a
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#E6007A] hover:to-[#00EAFF] transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={FACEBOOK_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00EAFF] transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={GOOGLE_REVIEWS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#EA4335] transition-all"
                  aria-label="Google Reviews"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-black text-lg uppercase tracking-wider mb-6">Quick Links</h4>
              <ul className="space-y-3 font-medium text-gray-400">
                {["Home", "Services", "About", "Gallery", "Testimonials", "FAQ", "Buy Gift Card"].map((item) => {
                  const isGiftCard = item === "Buy Gift Card";
                  const href = isGiftCard
                    ? "#gift-cards"
                    : `#${item.toLowerCase()}`;
                  return (
                    <li key={item}>
                      <a
                        href={href}
                        onClick={(e) => {
                          if (isGiftCard) return;
                          e.preventDefault();
                          scrollToSection(item.toLowerCase());
                        }}
                        className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"
                      >
                        <ChevronRight className="w-3 h-3 text-[#00EAFF]" /> {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-lg uppercase tracking-wider mb-6">Services</h4>
              <ul className="space-y-3 font-medium text-gray-400">
                {services.map((service) => (
                  <li
                    key={service.id}
                    className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <ChevronRight className="w-3 h-3 text-[#E6007A]" /> {service.title}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-lg uppercase tracking-wider mb-6">Contact</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#00EAFF] shrink-0 mt-0.5" />
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:block hover:text-[#00EAFF] transition-colors cursor-pointer text-left"
                  >
                    <span>Located in the metro area<br />123 Demo Boulevard, Metro Area</span>
                  </a>
                  <button
                    onClick={openMapChooser}
                    className="md:hidden hover:text-[#00EAFF] transition-colors cursor-pointer text-left"
                  >
                    <span>Located in the metro area<br />123 Demo Boulevard, Metro Area</span>
                  </button>
                </li>
                <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                  <Phone className="w-5 h-5 text-[#E6007A]" />
                  <a href="tel:+15550000000" className="hover:text-[#00EAFF] transition-colors">(555) 000-0000</a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#E6007A] shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-white font-bold">Mon – Sat</p>
                    <p className="text-gray-400">7:00 AM – 6:00 PM</p>
                    <p className="text-gray-500 mt-1">Closed Sundays</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <Mail className="w-5 h-5 text-[#00EAFF] shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="md:group-hover:hidden block md:block">Contact us via<br />social media</span>
                    <div className="flex md:hidden group-hover:flex gap-3 pt-2">
                      <a
                        href={INSTAGRAM_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/10 hover:bg-gradient-to-r hover:from-[#E6007A] hover:to-[#00EAFF] transition-all transform hover:scale-110"
                        title="Instagram"
                      >
                        <Instagram className="w-5 h-5 text-white" />
                      </a>
                      <a
                        href={FACEBOOK_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/10 hover:bg-gradient-to-r hover:from-[#E6007A] hover:to-[#00EAFF] transition-all transform hover:scale-110"
                        title="Facebook"
                      >
                        <Facebook className="w-5 h-5 text-white" />
                      </a>
                      <a
                        href={GOOGLE_REVIEWS_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/10 hover:bg-[#EA4335] transition-all transform hover:scale-110"
                        title="Google Reviews"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="py-6 border-t border-white/10 flex flex-col items-center justify-center gap-3 text-center">
            <a
              href="https://www.apexwebworx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 hover:opacity-100 transition-all"
              aria-label="APEX WEB WORX"
            >
              <img
                src={`${import.meta.env.BASE_URL}detailing/images/apex-webworx-logo.png`}
                alt="APEX WEB WORX"
                className="h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity"
              />
              <p className="text-gray-500 text-xs font-medium uppercase tracking-widest group-hover:text-white transition-colors">
                Designed and developed by <span className="text-[#00EAFF] font-bold">APEX WEB WORX</span>
              </p>
            </a>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-gray-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} Elite Detailing. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 text-sm text-gray-500 font-medium">
              <button
                onClick={() => setLegalModal("privacy")}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setLegalModal("terms")}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Action Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-black/95 backdrop-blur-md border-t border-white/10 detail-sticky-bar grid grid-cols-2 gap-2 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <a
          href="tel:+15550000000"
          className="flex items-center justify-center gap-2 px-3 py-3 min-h-[48px] rounded-lg bg-white/10 border border-white/15 font-bold text-sm text-white"
          aria-label="Call Elite Detailing"
        >
          <Phone className="w-4 h-4 text-[#00EAFF]" />
          CALL NOW
        </a>
          <Link
            href={DETAILING_BRAND.bookPath}
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 px-3 py-3 min-h-[48px] rounded-lg bg-gradient-to-r from-[#E6007A] to-[#00EAFF] font-black text-sm text-white shadow-[0_0_15px_rgba(0,234,255,0.4)]"
          >
            BOOK NOW
            <ChevronRight className="w-4 h-4" />
          </Link>
      </div>
      {/* Spacer so sticky bar doesn't overlap content on mobile */}
      <div className="md:hidden detail-mobile-spacer" aria-hidden="true" />

      {/* Legal Modal: Privacy / Terms */}
      {legalModal && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 py-8"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#111] border border-white/10 p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                {legalModal === "privacy" ? "Privacy Policy" : "Terms of Service"}
              </h3>
              <button
                onClick={() => setLegalModal(null)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-6">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>

            {legalModal === "privacy" ? (
              <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                <p>
                  Elite Detailing ("we", "us") respects your privacy. This page explains what limited information we collect when you use this site or contact us, and how we use it.
                </p>
                <div>
                  <h4 className="font-black text-white text-base mb-1">Information We Collect</h4>
                  <p>We only collect information you voluntarily provide — your name, phone, email, vehicle details, and appointment preferences when you book or contact us.</p>
                </div>
                <div>
                  <h4 className="font-black text-white text-base mb-1">How We Use It</h4>
                  <p>To schedule and complete your service, send appointment reminders, follow up on the work performed, and respond to your questions. We do not sell or share your information with third parties for marketing.</p>
                </div>
                <div>
                  <h4 className="font-black text-white text-base mb-1">Cookies & Analytics</h4>
                  <p>This site may use basic analytics cookies to understand traffic. You can disable cookies in your browser at any time.</p>
                </div>
                <div>
                  <h4 className="font-black text-white text-base mb-1">Contact</h4>
                  <p>Questions about your data? Call <a href="tel:+15550000000" className="text-[#00EAFF] underline">(555) 000-0000</a> or message us on Instagram or Facebook.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                <p>
                  By booking a service or using this site, you agree to the following terms.
                </p>
                <div>
                  <h4 className="font-black text-white text-base mb-1">Booking & Scheduling</h4>
                  <p>All scheduling must be completed before your visit through our online booking. Please arrive on time. Significant delays may require rescheduling.</p>
                </div>
                <div>
                  <h4 className="font-black text-white text-base mb-1">Pricing</h4>
                  <p>Listed prices are starting points and reflect standard vehicle conditions. Final pricing is confirmed at inspection and depends on vehicle size, condition, and any add-on services.</p>
                </div>
                <div>
                  <h4 className="font-black text-white text-base mb-1">Cancellations</h4>
                  <p>Please give at least 24 hours' notice for cancellations or reschedules so we can offer the slot to other customers.</p>
                </div>
                <div>
                  <h4 className="font-black text-white text-base mb-1">Vehicle Condition & Liability</h4>
                  <p>We take great care with every vehicle. Customers are responsible for removing valuables before service. Pre-existing damage, mechanical issues, or worn materials are not the responsibility of Elite Detailing.</p>
                </div>
                <div>
                  <h4 className="font-black text-white text-base mb-1">Satisfaction</h4>
                  <p>If something isn't right, contact us within 24 hours of service and we'll make it right.</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setLegalModal(null)}
              className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-[#E6007A] to-[#00EAFF] font-black text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {mapChooserOpen && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#111] border border-white/10 p-6 text-center shadow-2xl">
            <h3 className="text-xl font-black uppercase tracking-wider mb-2">Open Maps</h3>
            <p className="text-gray-400 text-sm mb-6">Choose your preferred map app.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={openGoogleMaps}
                className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#00EAFF] hover:text-white transition-colors font-bold"
              >
                Google Maps
              </button>
              <button
                onClick={openAppleMaps}
                className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#E6007A] hover:text-white transition-colors font-bold"
              >
                Apple Maps
              </button>
            </div>
            <button
              onClick={() => setMapChooserOpen(false)}
              className="mt-4 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}