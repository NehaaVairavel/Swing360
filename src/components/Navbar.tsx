import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);
  
  const handleHomeClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-navbar navbar-floating" : "glass-navbar-initial border-b border-border/20"
      }`}
    >
      <div className={`container-section flex items-center justify-between transition-all duration-500 ${scrolled ? "h-20" : "h-24"}`}>
        {/* ── Logo + Brand Name ── */}
        <Link to="/" onClick={handleHomeClick} className="flex items-center gap-3.5 group">
          <img
            src={logo}
            alt="Swing360 EXIM"
            className={`w-auto drop-shadow-lg group-hover:scale-105 transition-all duration-500 ${scrolled ? "h-14" : "h-16"}`}
          />
          <div className="hidden sm:flex flex-col leading-tight pt-1">
            <span className={`font-display font-extrabold text-heading tracking-tight transition-all duration-500 ${scrolled ? "text-xl" : "text-2xl"}`}>
              Swing<span className="text-primary drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">360</span>
            </span>
            <span className="font-display font-bold text-[11px] md:text-xs text-primary/80 uppercase tracking-[0.2em] mt-0.5">
              EXIM Trading
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={link.path === "/" ? handleHomeClick : undefined}
                className={`nav-link-hover relative font-display text-[15px] font-bold transition-colors duration-400 py-2 ${
                  location.pathname === link.path
                    ? "text-primary text-shadow-sm"
                    : "text-heading/70 hover:text-heading"
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2.5px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, hsl(38 92% 50%), hsl(28 88% 42%))",
                      boxShadow: "0 0 10px rgba(245,158,11,0.5)",
                    }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 250, damping: 25 }}
                  />
                )}
              </Link>
            ))}
          </div>
          
          <div className="w-px h-8 bg-border/60 mx-1"></div>

          <Link
            to="/contact"
            className="btn-cta text-sm py-3 px-8 shadow-glow"
          >
            <span className="relative z-10 font-display font-bold tracking-wide">Get Quote</span>
          </Link>
        </div>

        {/* ── Mobile toggle ── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-heading p-2 rounded-xl hover:bg-muted/50 transition-colors"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden overflow-hidden border-t border-border/30"
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="container-section py-6 flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={link.path === "/" ? handleHomeClick : undefined}
                    className={`font-display text-base font-bold py-3.5 px-5 rounded-xl transition-all duration-300 block ${
                      location.pathname === link.path
                        ? "text-primary bg-primary/10 shadow-[inner_0_0_0_1px_rgba(245,158,11,0.2)]"
                        : "text-heading hover:bg-muted/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mt-2"
              >
                <Link
                  to="/contact"
                  className="btn-cta text-sm text-center block py-4"
                >
                  <span className="relative z-10 font-display font-bold tracking-wide">Get Quote</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
