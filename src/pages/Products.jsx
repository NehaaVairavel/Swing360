import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Mail, X, ChevronLeft, ChevronRight, Search, ArrowRight } from "lucide-react";
import { products, categories } from "@/data/products";
import EnquiryModal from "@/components/EnquiryModal";
import AnimatedGear from "@/components/AnimatedGear";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { useCurrency } from "@/context/CurrencyContext";
import CurrencyToggle from "@/components/CurrencyToggle";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const ProductCard = ({ product, setSelectedProduct, setEnquiryOpen }) => {
  const { formatPrice } = useCurrency();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <motion.div
      variants={itemVariant}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className="bg-white rounded-3xl overflow-hidden shadow-premium group border border-gray-100 hover:border-primary/20 transition-all duration-500"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100 font-display">
        <Link to={`/products/${product.id}`} className="block h-full w-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={product.images[currentImageIndex]}
              alt={product.name}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </AnimatePresence>
        </Link>
        
        {/* Navigation Arrows */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button 
            onClick={prevImage}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-heading hover:bg-primary hover:text-white transition-all pointer-events-auto"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextImage}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-heading hover:bg-primary hover:text-white transition-all pointer-events-auto"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
          {product.images.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? "bg-primary w-4" : "bg-white/50"}`}
            />
          ))}
        </div>

        {/* Image Overlays */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur text-heading text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.1)] border border-white/20">
          Verified
        </div>
        <div className="absolute top-4 left-4 bg-primary/95 backdrop-blur text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-lg border border-primary/20">
          {product.year}
        </div>
      </div>
      
      <div className="p-5">
        {/* Title */}
        <h3 className="font-display font-black text-heading text-[1.1rem] md:text-xl mb-4 tracking-tight group-hover:text-primary transition-colors duration-300 line-clamp-2 md:min-h-[56px] min-h-[48px] leading-tight">
          {product.name}
        </h3>
        
        {/* Price & Ref Section - Tighter, balanced flex row */}
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-3 mb-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] text-gray-900 font-black uppercase tracking-[0.2em]">Export Price</div>
              <CurrencyToggle variant="compact" />
            </div>
            <div className="text-primary font-display font-black text-[1.35rem] tracking-tight drop-shadow-sm whitespace-nowrap leading-none">
              {formatPrice(product.priceUSD)}
            </div>
          </div>
          
          {/* Ref Badge - Proper tag style with strong visibility */}
          <div className="shrink-0 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 shadow-sm group-hover:border-primary/40 transition-all duration-300 relative overflow-hidden flex flex-col items-center min-w-[68px]">
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="text-white/60 font-semibold uppercase tracking-widest text-[9px] mb-0.5 relative z-10 leading-none">Ref No.</span>
            <span className="text-white font-black text-[12px] tracking-tight relative z-10 leading-none">{product.refNumber}</span>
          </div>
        </div>
        
        {/* Actions Section */}
        <div className="flex gap-2.5">
          {/* Details Button - Option A (Premium Secondary w/ Icon) */}
          <Link
            to={`/products/${product.id}`}
            className="flex-1 bg-white border border-gray-200 text-gray-800 text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] py-3 rounded-xl hover:border-primary/40 hover:bg-orange-50/50 hover:text-primary hover:shadow-[0_4px_15px_-4px_rgba(245,158,11,0.15)] transition-all duration-300 text-center flex items-center justify-center gap-1.5 group/btn"
          >
            Details
            <ArrowRight size={13} className="text-gray-400 group-hover/btn:text-primary group-hover/btn:translate-x-1 transition-all duration-300" />
          </Link>
          
          {/* Enquire Button - Keep primary, strong lift and glow */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setSelectedProduct(product);
              setEnquiryOpen(true);
            }}
            className="flex-1 bg-primary text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] py-3 rounded-xl shadow-[0_8px_20px_-5px_rgba(245,158,11,0.45)] hover:shadow-[0_15px_25px_-5px_rgba(245,158,11,0.65)] hover:-translate-y-[2px] hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-1.5 border border-primary/20"
          >
            <MessageCircle size={14} className="opacity-90" />
            Enquire
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    if (search !== null) {
      setSearchQuery(search);
    }
    if (category !== null) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-[130px] pb-12 min-h-screen bg-[#fcfcfc] section-base relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/[0.05] blur-[120px] pointer-events-none" />
      <div className="absolute left-[5%] top-[20%] opacity-[0.03] pointer-events-none hidden lg:block">
        <AnimatedGear size={300} />
      </div>

      <div className="container-section relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-primary/20">
            Export Hub Catalog
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black text-heading mb-6 tracking-tight leading-[1.1]">
            Our Heavy Machinery <span className="text-gradient">Fleet</span>
          </h1>
          <p className="text-muted-foreground text-lg font-medium leading-relaxed italic">
            "Engineered for performance, curated for global markets."
          </p>
        </motion.div>

        {/* Filter and Search Bar - Clean Open Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-col md:flex-row md:items-start gap-4 sticky top-24 z-30 bg-[#fcfcfc]/95 backdrop-blur-md py-4 border-b border-gray-100"
        >
          {/* Category Chips - Wrap naturally, left-aligned */}
          <div className="flex flex-wrap items-center gap-2 flex-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => { setActiveCategory(category); }}
                className={`px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-200 border ${
                  activeCategory === category
                    ? "bg-primary border-primary text-white shadow-[0_4px_14px_-4px_rgba(245,158,11,0.55)]"
                    : "bg-transparent border-gray-200 text-gray-500 hover:bg-orange-50 hover:border-orange-200 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar - Inline right on desktop, full width on mobile */}
          <div className="relative w-full md:w-[280px] shrink-0 group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-200">
              <Search size={15} />
            </div>
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/40 transition-all text-heading placeholder:text-gray-400 shadow-sm"
            />
          </div>
        </motion.div>

        {/* Product Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                setSelectedProduct={setSelectedProduct} 
                setEnquiryOpen={setEnquiryOpen} 
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} productName={selectedProduct?.name} product={selectedProduct} />
    </div>
  );
};

export default Products;
