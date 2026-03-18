import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedGear from "@/components/AnimatedGear";
import logo from "@/assets/logo.png";

const Footer = () => {
  const location = useLocation();

  const handleHomeClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#1a1c1e] to-[#2d2f33] text-white relative overflow-hidden border-t border-white/5">
    {/* Deep depth layers & textures */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
    
    {/* Very Subtle Gear Pattern Overlay */}
    <div className="absolute inset-0 opacity-[0.005] pointer-events-none flex items-center justify-center overflow-hidden">
      <div className="grid grid-cols-4 gap-20 transform rotate-12 scale-150">
        {[...Array(16)].map((_, i) => (
          <AnimatedGear key={i} size={180} className={i % 2 === 0 ? "animate-spin-slow" : "[animation-direction:reverse] animate-spin-slow"} />
        ))}
      </div>
    </div>

    <div className="container-section py-12 md:py-14 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 lg:gap-16">
        
        {/* LEFT: BRAND SECTION */}
        <div className="md:col-span-12 lg:col-span-5">
          <div className="flex items-center gap-4 mb-5">
            <img 
              src={logo} 
              alt="Swing360 EXIM" 
              className="h-14 w-auto object-contain drop-shadow-sm" 
            />
            <div className="h-8 w-px bg-white/10 mx-1 hidden sm:block" />
            <div className="flex flex-col">
               <span className="font-display font-black text-xl tracking-tight text-white leading-none">Swing360</span>
               <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary mt-1">Exim Trading FZCO</span>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6 font-medium">
            Global hub for heavy equipment trading and export from Dubai, delivering excellence worldwide.
          </p>
        </div>

        {/* CENTER: NAVIGATION */}
        <div className="md:col-span-6 lg:col-span-3 lg:col-start-7">
          <h4 className="font-display font-bold text-white mb-6 text-[11px] uppercase tracking-[0.25em]">Quick Links</h4>
          <div className="flex flex-col gap-4">
            {[
              { label: "Home", path: "/" },
              { label: "Products", path: "/products" },
              { label: "Gallery", path: "/gallery" },
              { label: "Contact", path: "/contact" },
            ].map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onClick={l.path === "/" ? handleHomeClick : undefined}
                className="text-white/50 text-[14px] font-semibold hover:text-primary transition-colors duration-300 w-fit"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT: CONTACT */}
        <div className="md:col-span-6 lg:col-span-3">
          <h4 className="font-display font-bold text-white mb-6 text-[11px] uppercase tracking-[0.25em]">Get In Touch</h4>
          <div className="flex flex-col gap-5 text-[14px] text-white/50">
            <div className="flex items-start gap-4">
              <MapPin size={18} className="text-primary/70 mt-0.5 shrink-0" />
              <span className="leading-relaxed">
                Silicon Oasis, Dubai, UAE
              </span>
            </div>
            
            <a href="tel:+918220722221" className="flex items-center gap-4 group hover:text-white transition-colors">
              <Phone size={18} className="text-primary/70 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-bold">+91 8220722221</span>
            </a>

            <a href="mailto:swing360exim@gmail.com" className="flex items-center gap-4 group hover:text-white transition-colors">
              <Mail size={18} className="text-primary/70 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">swing360exim@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar: Branded & Clean */}
      <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Swing360 Exim Trading FZCO
        </div>
        <div className="flex items-center gap-4 text-[10px] text-white/40 font-bold uppercase tracking-[0.15em]">
           <span>Dubai</span>
           <span className="text-white/10">•</span>
           <span>Strategic Hub</span>
           <span className="text-white/10">•</span>
           <span>Global Export</span>
        </div>
      </div>
    </div>
    </footer>
  );
};

export default Footer;
