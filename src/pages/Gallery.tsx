import { useState } from "react";
import { Play, Maximize, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedGear from "@/components/AnimatedGear";

type MediaItem = {
  id: string;
  url: string;
  title: string;
  category: "All" | "Facilities" | "Deliveries" | "Workshops";
};

const categories = ["All", "Facilities", "Deliveries", "Workshops"];

// High-quality mock media for the gallery
// High-quality mock media for the gallery
const mockMedia: MediaItem[] = [
  { id: "1", url: "https://images.unsplash.com/photo-1541888081696-277d33b8a3e4?q=80&w=1200&auto=format&fit=crop", title: "Excavator Fleet Operations", category: "Facilities" },
  { id: "2", url: "https://images.unsplash.com/photo-1581451152062-8e0f607dd3b3?q=80&w=1200&auto=format&fit=crop", title: "Heavy Dozer Global Transit", category: "Deliveries" },
  { id: "3", url: "https://images.unsplash.com/photo-1579412691522-83204d1f2b6a?q=80&w=1200&auto=format&fit=crop", title: "Hydraulic System Inspection", category: "Workshops" },
  { id: "4", url: "https://images.unsplash.com/photo-1498084393753-b411b2d26f58?q=80&w=1200&auto=format&fit=crop", title: "Backhoe Loading Precision", category: "Facilities" },
  { id: "5", url: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f0?q=80&w=1200&auto=format&fit=crop", title: "Shipping Logistics Hub", category: "Deliveries" },
  { id: "6", url: "https://plus.unsplash.com/premium_photo-1664303498877-ad5f5eeab2b7?q=80&w=1200&auto=format&fit=crop", title: "Skid Steer Premium Lineup", category: "Facilities" },
  { id: "7", url: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=1200&auto=format&fit=crop", title: "Crawler Crane Assembly", category: "Workshops" },
  { id: "8", url: "https://images.unsplash.com/photo-1578330132822-0193077af3f0?q=80&w=1200&auto=format&fit=crop", title: "Global Machinery Export", category: "Deliveries" },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariant = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredMedia = mockMedia.filter(
    item => activeCategory === "All" || item.category === activeCategory
  );

  const navigateLightbox = (dir: 1 | -1) => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + dir + filteredMedia.length) % filteredMedia.length);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute right-[5%] top-[15%] opacity-[0.03] pointer-events-none hidden lg:block">
        <AnimatedGear size={220} className="[animation-direction:reverse]" />
      </div>

      <div className="container-section relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-heading mb-4">Our <span className="text-gradient">Gallery</span></h1>
          <p className="text-muted-foreground text-lg">Visual highlights of our machinery, global shipments, and facilities.</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center flex-wrap gap-2 md:gap-4 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => { setActiveCategory(category); setLightboxIndex(null); }}
              className={`px-6 py-2.5 rounded-full text-sm font-display font-bold uppercase tracking-wider transition-all ${
                activeCategory === category
                  ? "bg-primary text-white shadow-glow shadow-primary/20 scale-105"
                  : "bg-gray-100/80 text-heading/70 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Media Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredMedia.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariant}
                layout
                className="relative group rounded-[1.5rem] overflow-hidden bg-gray-100 cursor-pointer break-inside-avoid shadow-soft hover:shadow-premium transition-all duration-500 border border-border/30"
                onClick={() => setLightboxIndex(index)}
              >
                <div className="relative overflow-hidden aspect-auto min-h-[250px]">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Hover Overlay - Premium Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8" />
                  
                  {/* Content that appears on hover */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                    <div className="bg-primary/90 self-start px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-tighter mb-3 shadow-glow">
                      {item.category}
                    </div>
                    <h3 className="font-display font-bold text-xl text-white mb-1 drop-shadow-md">{item.title}</h3>
                  </div>

                  {/* Top indicators */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                      <Maximize size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
            onClick={() => setLightboxIndex(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-3 rounded-full hover:bg-white/20 z-10">
              <span className="sr-only">Close</span>
              <X size={24} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full text-white hover:bg-primary/80 transition-all duration-300 z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full text-white hover:bg-primary/80 transition-all duration-300 z-10"
            >
              <ChevronRight size={24} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-6xl w-full max-h-[85vh] relative rounded-lg overflow-hidden flex items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={filteredMedia[lightboxIndex].url}
                alt={filteredMedia[lightboxIndex].title}
                className="max-w-full max-h-[85vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-display font-bold text-white mb-2">{filteredMedia[lightboxIndex].title}</h3>
                <span className="bg-primary/90 px-3 py-1 rounded-full text-xs font-bold text-white tracking-wider">{filteredMedia[lightboxIndex].category}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
