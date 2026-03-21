import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Mail, X, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { products, categories } from "@/data/products";
import EnquiryModal from "@/components/EnquiryModal";
import AnimatedGear from "@/components/AnimatedGear";
import { getWhatsAppUrl } from "@/utils/whatsapp";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const ProductCard = ({ product, setSelectedProduct, setEnquiryOpen }) => {
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
      
      <div className="p-7">
        <h3 className="font-display font-black text-heading text-xl mb-1 tracking-tight group-hover:text-primary transition-colors duration-300 line-clamp-2 min-h-[56px]">
          {product.name}
        </h3>
        <p className="text-[13px] text-muted-foreground mb-6 font-bold uppercase tracking-wider opacity-60 line-clamp-1 min-h-[19.5px]">
          {product.brand} · {product.model}
        </p>
        
        <div className="flex items-end justify-between gap-3 mb-6">
          <div className="flex-1 min-w-0">
            <div className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em] mb-1">Export Price</div>
            <div className="text-primary font-display font-black text-2xl tracking-tighter drop-shadow-sm truncate">{product.price}</div>
          </div>
          <div className="shrink-0 text-[10px] bg-white border border-gray-200 px-3.5 py-2 rounded-xl flex flex-col items-center leading-[1.2] shadow-sm group-hover:border-primary/20 transition-all duration-300">
            <span className="text-gray-500 font-bold uppercase tracking-widest text-[8px] mb-0.5">Ref:</span>
            <span className="text-gray-900 font-display font-black tracking-tight">{product.refNumber}</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 bg-white border border-charcoal/5 text-heading text-[11px] font-black uppercase tracking-widest py-3 rounded-xl hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all duration-300 text-center"
          >
            Details
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              setSelectedProduct(product);
              setEnquiryOpen(true);
            }}
            className="flex-1 bg-primary text-white text-[11px] font-black uppercase tracking-widest py-3 rounded-xl shadow-[0_8px_15px_-5px_rgba(245,158,11,0.4)] hover:shadow-glow hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MessageCircle size={14} />
            Enquire
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    const search = searchParams.get("search");
    if (search !== null) {
      setSearchQuery(search);
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

        {/* Filter and Search Bar - Premium Redesign */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white/50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] p-2 md:p-2.5 mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between sticky top-24 z-30"
        >
          {/* Categories - Sleek Animated Tabs */}
          <div className="flex overflow-x-auto w-full lg:w-auto pb-0.5 lg:pb-0 gap-1.5 hide-scrollbar px-1 scroll-smooth">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => { setActiveCategory(category); }}
                className={`flex-shrink-0 px-6 py-3 rounded-[1.25rem] text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-500 relative group ${
                  activeCategory === category
                    ? "text-white"
                    : "text-heading/40 hover:text-heading/70"
                }`}
              >
                {activeCategory === category && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-orange-500 shadow-[0_8px_20px_-6px_rgba(245,158,11,0.6)] z-0 rounded-[1.25rem]"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
                {activeCategory !== category && (
                   <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary/20 rounded-full transition-all duration-300 group-hover:w-1/2" />
                )}
              </button>
            ))}
          </div>

          {/* Search Box - Integrated & Minimal */}
          <div className="relative w-full lg:w-[320px] px-1 group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-heading/20 group-focus-within:text-primary transition-colors duration-300">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 bg-gray-50/40 border border-gray-100/50 rounded-2xl text-[13px] font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 transition-all font-body text-heading placeholder:text-heading/20 shadow-inner"
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

      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} productName={selectedProduct?.name} />
    </div>
  );
};

export default Products;
