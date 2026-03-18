import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  Calendar, 
  Clock, 
  Tag, 
  ShieldCheck,
  Share2,
  ChevronRight
} from "lucide-react";
import { products, Product } from "@/data/products";
import { useState, useEffect } from "react";
import EnquiryModal from "@/components/EnquiryModal";
import AnimatedGear from "@/components/AnimatedGear";
import { getWhatsAppUrl } from "@/utils/whatsapp";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  
  const product = products.find((p) => p.id === id);

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    window.open(getWhatsAppUrl(product?.name, product?.refNumber), '_blank');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-display font-black text-heading mb-6 tracking-tight">Machine Not Found</h2>
          <Link to="/products" className="btn-cta inline-flex items-center gap-3 px-8 py-4 rounded-2xl">
            <ArrowLeft size={20} /> Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const specifications = [
    { label: "Brand", value: product.brand },
    { label: "Model", value: product.model },
    { label: "Year", value: product.year },
    { label: "Used Hours", value: `${product.usedHours.toLocaleString()} hrs` },
    { label: "Ref Number", value: product.refNumber },
    { label: "Category", value: product.category },
    { label: "Condition", value: "Fully Inspected" },
    { label: "Target Market", value: "Global Export" }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] relative pt-32 pb-24">
      {/* Decorative Background Elements */}
      <div className="absolute top-[5%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/[0.05] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-[150px] pointer-events-none" />

      <div className="container-section relative z-10">
        {/* Breadcrumbs & Back Button */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
          <Link
            to="/products"
            className="flex items-center gap-3 text-heading/40 hover:text-primary transition-all font-black uppercase tracking-widest text-[11px] group"
          >
            <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
              <ArrowLeft size={18} />
            </div>
            Back to Products
          </Link>
          
          <div className="flex gap-4">
             <button 
               onClick={handleShareLink}
               className="h-12 px-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-primary/30 hover:bg-primary/5 text-heading/60 hover:text-primary transition-all flex items-center gap-2 font-black uppercase tracking-widest text-[10px]"
             >
               {isCopied ? <><CheckCircle2 size={16} className="text-green-500" /> Copied</> : <><Share2 size={16} /> Copy Link</>}
             </button>
             <button 
               onClick={handleWhatsAppShare}
               className="h-12 px-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all flex items-center gap-2 font-black uppercase tracking-widest text-[10px]"
             >
               <MessageSquare size={16} /> WhatsApp
             </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Image Gallery */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-gray-100 border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] group cursor-zoom-in"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={product.images[activeImage] || product.image}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </AnimatePresence>
              
              {/* Image Indicators Overlay */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10 p-1.5 rounded-full bg-black/20 backdrop-blur-md">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`h-1.5 transition-all rounded-full ${activeImage === idx ? 'w-8 bg-primary' : 'w-1.5 bg-white/40 hover:bg-white'}`}
                  />
                ))}
              </div>

              {/* Verified Badge */}
              <div className="absolute top-8 left-8 z-10">
                <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-[1.25rem] flex items-center gap-3 shadow-xl border border-white/50">
                  <ShieldCheck className="text-primary" size={20} />
                  <span className="text-[11px] font-black text-heading uppercase tracking-[0.2em]">Verified Hub Inspection</span>
                </div>
              </div>
            </motion.div>

            {/* Thumbnail Navigation */}
            <div className="grid grid-cols-4 gap-6 px-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square rounded-[1.5rem] overflow-hidden border-2 transition-all duration-500 overflow-hidden relative group ${
                    activeImage === idx 
                      ? 'border-primary shadow-[0_10px_30px_-5px_rgba(245,158,11,0.4)] scale-105 z-10' 
                      : 'border-transparent grayscale hover:grayscale-0 hover:scale-[1.03] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  {activeImage !== idx && <div className="absolute inset-0 bg-heading/10 group-hover:opacity-0 transition-opacity" />}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Content & Pricing */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-primary/20">
                  {product.category}
                </span>
                <span className="text-gray-500 font-bold uppercase tracking-[0.15em] text-[10px] flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl shadow-sm">
                  <Tag size={14} className="text-primary/70" /> 
                  Ref: <span className="text-gray-900 font-black">{product.refNumber}</span>
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-display font-black text-heading mb-8 leading-[1.1] tracking-tight">
                {product.name}
              </h1>

              <div className="bg-gray-50/50 rounded-[2.5rem] p-10 mb-12 border border-gray-100 relative overflow-hidden group shadow-inner">
                <div className="absolute top-0 right-[-5%] p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity rotate-12">
                   <AnimatedGear size={180} />
                </div>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 relative z-10">
                  <div>
                    <span className="text-heading/30 text-[10px] uppercase font-black tracking-[0.4em] mb-3 block">Global Export Price</span>
                    <h2 className="text-5xl lg:text-6xl font-display font-black text-primary tracking-tighter drop-shadow-sm">{product.price}</h2>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-heading/60 bg-white/80 px-5 py-2.5 rounded-2xl border border-gray-100 text-[13px] font-bold shadow-sm">
                      <Clock size={18} className="text-primary" />
                      {product.usedHours.toLocaleString()} Operating Hours
                    </div>
                    <div className="flex items-center gap-3 text-heading/60 bg-white/80 px-5 py-2.5 rounded-2xl border border-gray-100 text-[13px] font-bold shadow-sm">
                      <Calendar size={18} className="text-primary" />
                      Year {product.year} Manufacture
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-12 px-2">
                {specifications.map((spec, i) => (
                  <div key={i} className="flex flex-col gap-1 py-2 border-b border-gray-100/80 group">
                    <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest group-hover:text-primary/70 transition-colors">{spec.label}</span>
                    <span className="text-gray-900 font-black text-[15px] tracking-tight">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="mb-12 px-2">
                <h4 className="text-heading/30 text-[9px] font-black uppercase tracking-[0.3em] mb-4">Manufacturer Specifications</h4>
                <p className="text-heading/60 leading-relaxed text-[17px] font-medium italic font-body border-l-4 border-primary/10 pl-6">
                  "{product.description}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="flex-[1.5] bg-primary text-white py-5 px-8 flex items-center justify-center gap-4 rounded-[1.5rem] font-black uppercase tracking-widest text-[13px] shadow-[0_20px_40px_-10px_rgba(245,158,11,0.5)] hover:shadow-glow hover:scale-[1.02] transition-all group"
                >
                  <MessageSquare size={22} />
                  Enquire Now
                </button>
                <a
                  href="tel:+918220722221"
                  className="flex-1 bg-white border-2 border-charcoal/5 text-heading py-5 px-8 flex items-center justify-center gap-4 rounded-[1.5rem] font-black uppercase tracking-widest text-[13px] hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <Phone size={22} className="text-primary" />
                  Call Direct
                </a>
              </div>

              <div className="mt-12 flex items-center gap-8 p-6 rounded-[2rem] bg-gray-50 border border-gray-100 shadow-inner">
                <div className="flex -space-x-4">
                   {[1,2,3,4,5].map(i => (
                     <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden relative">
                       <img src={`https://i.pravatar.cc/150?img=${i+20}`} alt="Active Buyer" />
                       <div className="absolute inset-0 bg-primary/10" />
                     </div>
                   ))}
                </div>
                <p className="text-[14px] text-heading/40 font-bold leading-tight">
                  <strong className="text-heading">18+ Buyers</strong> currently interested in machines from the <strong className="text-primary">{product.category}</strong> category.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          {[
            { icon: CheckCircle2, title: "Global Logistics", desc: "Strategic international trading delivering excellence from Dubai to the world." },
            { icon: ShieldCheck, title: "Certified Units", desc: "Every unit undergoes a comprehensive 360° technical inspection." },
            { icon: ShieldCheck, title: "Export Ready", desc: "Complete documentation support for seamless international transit." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[2.5rem] border border-gray-100 bg-white hover:border-primary/20 transition-all duration-500 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <item.icon className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-display font-black text-heading mb-3 tracking-tight">{item.title}</h3>
              <p className="text-heading/40 text-[15px] font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} productName={product.name} />
    </div>
  );
};

export default ProductDetail;
