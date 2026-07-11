import { motion } from "framer-motion";
import { MapPin, Star, Search, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: MapPin,
    title: "Google Business Profile",
    desc: "Structured data and local SEO help your catering business appear in Google Maps and local search results.",
  },
  {
    icon: Star,
    title: "Review Integration",
    desc: "Showcase client testimonials and build trust with social proof on your landing page.",
  },
  {
    icon: Search,
    title: "Search-Optimized Pages",
    desc: "Meta tags, Open Graph, schema markup, and fast load times — built for discoverability.",
  },
  {
    icon: TrendingUp,
    title: "Conversion-Focused Design",
    desc: "Clear CTAs, mobile-first layout, and streamlined booking flows that turn visitors into inquiries.",
  },
];

export default function SeoSection() {
  return (
    <section id="seo" className="py-24 md:py-32 bg-secondary border-t border-white/5">
      <div className="container px-6 md:px-12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="uppercase tracking-[0.2em] text-xs text-[#C8A45D] font-medium mb-4 block">
            Visibility
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Google Business Profile &amp; SEO Benefits
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto font-light">
            Every Apex Web Worx catering site is built to rank locally and convert — not just
            look good.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {benefits.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background border border-white/10 p-8"
            >
              <item.icon className="w-8 h-8 text-[#C8A45D] mb-4" />
              <h3 className="font-serif text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-foreground/70 font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
