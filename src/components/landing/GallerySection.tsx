import { motion } from "framer-motion";
import menuAppetizers from "@/assets/menu-appetizers.jpg";
import menuProtein from "@/assets/menu-protein.png";
import menuSides from "@/assets/menu-sides.jpg";
import menuSalads from "@/assets/menu-salads.jpg";
import menuFruits from "@/assets/menu-fruits.jpg";
import dishBeef from "@/assets/dish-beef-loin.png";
import weddingCatering from "@/assets/wedding-catering.png";
import corporateEvent from "@/assets/corporate-event.png";
import heroBrisket from "@/assets/hero-brisket.png";

const galleryImages = [
  { src: menuAppetizers, alt: "Elegant appetizer spread" },
  { src: menuProtein, alt: "Grilled protein station" },
  { src: menuSides, alt: "Chef-crafted sides" },
  { src: menuSalads, alt: "Fresh salad display" },
  { src: menuFruits, alt: "Seasonal fruit presentation" },
  { src: dishBeef, alt: "Premium beef loin service" },
  { src: weddingCatering, alt: "Wedding catering setup" },
  { src: corporateEvent, alt: "Corporate event buffet" },
  { src: heroBrisket, alt: "Live grill station" },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 md:py-32 bg-background border-t border-white/5">
      <div className="container px-6 md:px-12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="uppercase tracking-[0.2em] text-xs text-[#C8A45D] font-medium mb-4 block">
            Gallery
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Events Brought to Life
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto font-light">
            Sample presentation styles from our catering platform demo — premium plating,
            buffet setups, and live service stations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.alt}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative aspect-[4/3] overflow-hidden border border-white/10"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
