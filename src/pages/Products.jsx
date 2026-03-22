import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Mail, X, ChevronLeft, ChevronRight, Search, ArrowRight, Settings } from "lucide-react";
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

  const isSold = product.status === "Sold";

  return (
    <motion.div
      variants={itemVariant}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={`bg-white rounded-3xl overflow-hidden shadow-premium group border border-gray-100 transition-all duration-500 ${
        isSold ? "opacity-95 border-gray-100 pointer-events-auto" : "hover:border-primary/20"
      }`}
      style={{
        transform: isSold ? "none" : undefined,
      }}
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
              className={`w-full h-full object-cover transition-all duration-700 ${
                isSold ? "brightness-[85%] saturate-[0.8]" : "group-hover:scale-105"
              }`}
              loading="lazy"
            />
          </AnimatePresence>
          {isSold && (
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          )}
        </Link>
        
        {/* SOLD Badge */}
        {isSold && (
          <div className="absolute top-4 left-4 z-30">
            <div className="bg-red-500 text-white px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-lg shadow-red-500/30 flex items-center gap-1.5 border border-red-400/20">
              <span className="text-[14px] leading-none">✖</span>
              SOLD
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        {!isSold && (
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
        )}

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
        {!isSold && (
          <>
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur text-heading text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.1)] border border-white/20">
              Verified
            </div>
            <div className="absolute top-4 left-4 bg-primary/95 backdrop-blur text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-lg border border-primary/20">
              {product.year}
            </div>
          </>
        )}
      </div>
      
      <div className="p-5">
        {/* Title */}
        <h3 className={`font-display font-black text-[1.1rem] md:text-xl mb-4 tracking-tight transition-colors duration-300 line-clamp-2 md:min-h-[56px] min-h-[48px] leading-tight ${
          isSold ? "text-gray-500" : "text-heading group-hover:text-primary"
        }`}>
          {product.name}
        </h3>
        
        {/* Price & Ref Section */}
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-3 mb-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className={`text-[10px] font-black uppercase tracking-[0.2em] ${isSold ? "text-gray-400" : "text-gray-900"}`}>Export Price</div>
            </div>
            <div className={`font-display font-black text-[1.35rem] tracking-tight drop-shadow-sm whitespace-nowrap leading-none ${
              isSold ? "text-[#9CA3AF] line-through" : "text-primary"
            }`}>
              {formatPrice(product.priceUSD)}
            </div>
          </div>
          
          {/* Ref Badge */}
          <div className={`shrink-0 border rounded-lg px-3 py-2 shadow-sm transition-all duration-300 relative overflow-hidden flex flex-col items-center min-w-[68px] ${
            isSold ? "bg-gray-100 border-gray-200" : "bg-gray-800 border-gray-700 group-hover:border-primary/40"
          }`}>
            {!isSold && <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>}
            <span className={`font-semibold uppercase tracking-widest text-[9px] mb-0.5 relative z-10 leading-none ${isSold ? "text-gray-400" : "text-white/60"}`}>Ref No.</span>
            <span className={`font-black text-[12px] tracking-tight relative z-10 leading-none ${isSold ? "text-gray-600" : "text-white"}`}>{product.refNumber}</span>
          </div>
        </div>
        
        {/* Actions Section */}
        <div className="flex gap-2.5">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 bg-white border border-gray-200 text-gray-800 text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] py-3 rounded-xl hover:border-primary/40 hover:bg-orange-50/50 hover:text-primary hover:shadow-[0_4px_15px_-4px_rgba(245,158,11,0.15)] transition-all duration-300 text-center flex items-center justify-center gap-1.5 group/btn"
          >
            Details
            <ArrowRight size={13} className="text-gray-400 group-hover/btn:text-primary group-hover/btn:translate-x-1 transition-all duration-300" />
          </Link>
          
          {isSold ? (
            <div
              className="flex-1 bg-gray-100 text-gray-500 text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] py-3 rounded-xl flex items-center justify-center gap-1.5 border border-gray-200 cursor-default"
            >
              <MessageCircle size={14} className="opacity-50" />
              Enquire
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");
  const [activeStatus, setActiveStatus] = useState("All");
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

  const availableCount = products.filter(p => p.status === "Available").length;
  const soldCount = products.filter(p => p.status === "Sold").length;

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = activeStatus === "All" || product.status === activeStatus;
    return matchesCategory && matchesSearch && matchesStatus;
  });

  const availableProducts = filteredProducts.filter(p => p.status === "Available");
  const soldProducts = filteredProducts.filter(p => p.status === "Sold");

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
          className="text-center max-w-3xl mx-auto mb-4"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-primary/20">
            Export Hub Catalog
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black text-heading mb-6 tracking-tight leading-[1.1]">
            Our Heavy Machinery <span className="text-gradient">Fleet</span>
          </h1>
          <p className="text-muted-foreground text-lg font-medium leading-relaxed italic">
            "Engineered for performance, curated for global markets."
          </p>
        </motion.div>

        {/* New Filter Section */}
        <div className="max-w-6xl mx-auto mb-6">
          {/* Status Badges */}
          <div className="flex gap-4 mb-4 ml-2">
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-2xl shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-emerald-700 text-[13px] font-black tracking-tight">{availableCount} Available</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-2xl shadow-sm">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              <span className="text-gray-500 text-[13px] font-black tracking-tight">{soldCount} Sold</span>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-6 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] border border-gray-100 relative z-20"
          >
            {/* Search Bar */}
            <div className="relative mb-3">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-200">
                <Search size={22} className="opacity-70" />
              </div>
              <input
                type="text"
                placeholder="Search by name, brand, or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-8 py-5 bg-gray-50/80 border border-transparent rounded-full text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary/20 transition-all text-heading placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Category Filter */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3 ml-1">
                  <Settings size={18} className="text-gray-400" />
                  <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.15em]">Category</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
                        activeCategory === category
                          ? "bg-primary text-white shadow-[0_4px_15px_-4px_rgba(245,158,11,0.55)] scale-[1.03]"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-heading"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="lg:w-72 lg:pl-6 lg:border-l border-gray-100">
                <div className="mb-3 ml-1">
                  <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.15em]">Status</span>
                </div>
                <div className="flex gap-1 p-1 bg-gray-50 rounded-2xl border border-gray-100 mb-3">
                  {["All", "Available", "Sold"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setActiveStatus(status)}
                      className={`flex-1 py-3 rounded-[14px] text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
                        activeStatus === status
                          ? "bg-[#1e293b] text-white shadow-lg scale-[1.02]"
                          : "text-gray-500 hover:text-heading"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                {/* Currency Filter */}
                <div className="mb-2 ml-1">
                  <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.15em]">Currency</span>
                </div>
                <CurrencyToggle />

              </div>
            </div>
          </motion.div>
        </div>


        {/* Product Sections */}
        <div className="space-y-8">
          {/* Empty State Message */}
          {availableProducts.length === 0 && soldProducts.length > 0 && activeStatus !== "Sold" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-orange-50/50 border border-primary/20 rounded-[2rem] p-6 text-center max-w-2xl mx-auto mb-6"
            >
              <p className="text-heading font-display font-medium text-lg leading-relaxed">
                No available machines currently match your selection. <br/>
                <span className="text-primary font-black">Showing previously sold units.</span>
              </p>
            </motion.div>
          )}

          {/* Available Grid */}
          {availableProducts.length > 0 && activeStatus !== "Sold" && (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-6"
            >
              <AnimatePresence mode="popLayout">
                {availableProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    setSelectedProduct={setSelectedProduct} 
                    setEnquiryOpen={setEnquiryOpen} 
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Sold Divider */}
          {activeStatus === "All" && availableProducts.length > 0 && soldProducts.length > 0 && (
            <div className="relative pt-8 pb-4">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gray-200/60" />
              <div className="relative flex justify-center">
                <div className="bg-gray-50 border border-gray-200 px-10 py-3 rounded-full shadow-sm">
                  <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] leading-none">
                    Previously Sold Units
                  </h2>
                </div>
              </div>
            </div>
          )}

          {/* Sold Grid */}
          {soldProducts.length > 0 && activeStatus !== "Available" && (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-6 ${
                activeStatus === "All" ? "opacity-[0.85]" : ""
              }`}
            >
              <AnimatePresence mode="popLayout">
                {soldProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    setSelectedProduct={setSelectedProduct} 
                    setEnquiryOpen={setEnquiryOpen} 
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} productName={selectedProduct?.name} product={selectedProduct} />
    </div>
  );
};

export default Products;
