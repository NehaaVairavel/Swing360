import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useInView, useScroll } from "framer-motion";
import { Truck, Wrench, Banknote, Headphones, Globe, ArrowRight, Settings, Shield, Award } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import AnimatedGear from "@/components/AnimatedGear";
import SectionReveal from "@/components/SectionReveal";
import heroBg from "@/assets/hero-bg.jpg";
import excavatorImg from "@/assets/excavator.jpg";
import backhoeImg from "@/assets/backhoe.jpg";
import dozerImg from "@/assets/dozer.jpg";
import materialHandlerImg from "@/assets/material-handler.jpg";
import skidSteerImg from "@/assets/skid-steer.jpg";
import graderImg from "@/assets/grader.jpg";

const stats = [
  { value: 10, suffix: "+", label: "Years Operating", icon: Shield },
  { value: 200, suffix: "+", label: "Units Delivered", icon: Truck },
  { value: 120, suffix: "+", label: "Machines Exported", icon: Award },
  { value: 5, suffix: "", label: "Countries Served", icon: Globe },
];

const categories = [
  { name: "Excavators", image: excavatorImg },
  { name: "Backhoe Loaders", image: backhoeImg },
  { name: "Dozers", image: dozerImg },
  { name: "Material Handlers", image: materialHandlerImg },
  { name: "Skid Steers", image: skidSteerImg },
  { name: "Graders", image: graderImg },
];

const services = [
  { icon: Truck, title: "Heavy Equipment Trading", desc: "Import & export of premium used machinery across global markets." },
  { icon: Wrench, title: "Spare Parts Trading", desc: "Genuine and aftermarket parts for all major equipment brands." },
  { icon: Banknote, title: "Financing Solutions", desc: "Flexible payment plans tailored to your business needs." },
  { icon: Headphones, title: "After-Sales Support", desc: "Dedicated support to maximize your equipment lifecycle." },
];

const markets = ["UAE", "Middle East", "Africa", "Europe", "India", "Mexico"];

/* ── Count-up hook ── */
const useCountUp = (target: number, duration = 2500) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return { count, ref };
};

const StatCard = ({ stat, i }: { stat: typeof stats[0]; i: number }) => {
  const { count, ref } = useCountUp(stat.value);
  const IconComp = stat.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.12 }}
      className="text-center card-premium rounded-3xl p-6 md:p-8 border-accent-left group"
    >
      <div className="icon-container w-16 h-16 rounded-2xl mx-auto mb-5 relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <IconComp size={28} className="text-primary group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 relative z-10" />
      </div>
      <div className="text-4xl md:text-5xl font-display font-extrabold text-shimmer tracking-tight">
        {count}{stat.suffix}
      </div>
      <div className="text-[15px] text-muted-foreground mt-2 font-medium">{stat.label}</div>
    </motion.div>
  );
};

const wordVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Mouse parallax for hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const heroImageX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const heroImageY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);
  const gearRotation = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);

  // Multi-layer parallax
  const bgY = useTransform(scrollY, [0, 1000], [0, 200]);
  const shapeY1 = useTransform(scrollY, [0, 1000], [0, 100]);
  const shapeY2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const gearY = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <div className="overflow-hidden" onMouseMove={handleMouseMove}>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center section-base industrial-pattern overflow-hidden">
        {/* Parallax background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-[0.06] scale-110 blur-[1px]" />
        </motion.div>

        {/* Abstract depth shapes with parallax */}
        <motion.div style={{ y: shapeY1, x: useTransform(mouseX, [-0.5, 0.5], [-50, 50]) }} className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-primary/[0.08] blur-[100px] z-0" />
        <motion.div style={{ y: shapeY2, x: useTransform(mouseX, [-0.5, 0.5], [50, -50]) }} className="absolute bottom-[-5%] left-[5%] w-[500px] h-[500px] rounded-full bg-accent/[0.06] blur-[120px] z-0" />
        
        {/* Decorative gears */}
        <motion.div style={{ y: gearY, rotate: gearRotation }} className="absolute bottom-12 right-[12%] opacity-[0.08] hidden lg:block z-0">
          <AnimatedGear size={320} className="drop-shadow-xl" />
        </motion.div>
        <motion.div style={{ y: shapeY1, rotate: useTransform(mouseY, [-0.5, 0.5], [45, -45]) }} className="absolute top-[20%] right-[2%] opacity-[0.05] hidden lg:block z-0">
          <AnimatedGear size={180} className="[animation-duration:reverse] drop-shadow-xl" />
        </motion.div>

        <div className="container-section relative z-10 pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left Content */}
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md border border-primary/20 text-heading px-5 py-2 rounded-full text-[10px] font-display font-black uppercase tracking-[0.2em] mb-10 shadow-[0_10px_30px_-10px_rgba(245,158,11,0.2)]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Global Machinery Export Hub
              </motion.div>

              <div className="text-5xl md:text-[4rem] lg:text-[4.5rem] font-display font-black text-heading leading-[1.05] mb-6 text-shadow-lg drop-shadow-sm">
                {["Premium", "Heavy", "Equipment"].map((word, i) => (
                  <motion.span key={word} custom={i} initial="hidden" animate="visible" variants={wordVariants} className="inline-block mr-3 lg:mr-4">
                    {word}
                  </motion.span>
                ))}
                <br />
                {["Trading", "from"].map((word, i) => (
                  <motion.span key={word} custom={i + 3} initial="hidden" animate="visible" variants={wordVariants} className="inline-block mr-3 lg:mr-4">
                    {word}
                  </motion.span>
                ))}
                <motion.span custom={5} initial="hidden" animate="visible" variants={wordVariants} className="inline-block text-shimmer relative">
                  Dubai
                  <span className="absolute inset-0 bg-primary/20 blur-2xl -z-10 rounded-full scale-150"></span>
                </motion.span>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="text-lg md:text-xl mb-12 text-heading/65 leading-relaxed font-medium"
              >
                Reliable Machinery • Transparent Trade • Worldwide Logistics
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex flex-wrap gap-5"
              >
                <Link
                  to="/products"
                  className="group btn-cta px-10 py-5 rounded-2xl font-display font-black flex items-center gap-2 text-base shadow-glow shadow-primary/20"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    Explore Products
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Link>
                <Link
                  to="/contact"
                  className="btn-secondary-glass px-10 py-5 rounded-2xl flex items-center justify-center border-charcoal/30 hover:border-primary"
                >
                  Get Quote
                </Link>
              </motion.div>
            </div>

            {/* Right – Floating Image Depth Group */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 50 }}
              style={{ x: heroImageX, y: heroImageY }}
              className="hidden lg:block relative"
            >
              <div className="relative animate-float-hero hero-image-wrapper">
                {/* Image core */}
                <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-hero-image border-[1.5px] border-white/50 relative z-10 bg-white">
                  <img src={excavatorImg} alt="Heavy Equipment" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
                
                {/* Multi-layer glow */}
                <div className="absolute -inset-6 rounded-[2.5rem] bg-primary/10 blur-[50px] -z-10 animate-glow-breathe" />
                <div className="absolute -inset-2 rounded-[2rem] bg-white/60 blur-[15px] -z-10" />

                {/* Floating stat badges */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute -bottom-8 -left-8 glass-card rounded-2xl px-6 py-5 z-20 shadow-premium border-accent-left"
                >
                  <div className="text-3xl font-display font-extrabold text-primary drop-shadow-sm">200+</div>
                  <div className="text-[13px] text-heading/70 font-bold uppercase tracking-wide mt-1">Units Delivered</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="absolute -top-8 -right-8 glass-card rounded-2xl px-6 py-5 z-20 shadow-premium"
                >
                  <div className="text-3xl font-display font-extrabold text-primary drop-shadow-sm">Global</div>
                  <div className="text-[13px] text-heading/70 font-bold uppercase tracking-wide mt-1">Export Network</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="section-warm industrial-dots py-24 md:py-32 section-divider-top overflow-hidden">
        <div className="container-section relative z-10">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-heading mb-4 heading-decorated tracking-tight">
              Our Global <span className="text-gradient drop-shadow-sm">Presence</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-6">
              Delivering excellence in heavy equipment trading across global markets
            </p>
          </SectionReveal>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s, i) => (
              <StatCard key={i} stat={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="section-tinted py-24 md:py-32 section-divider-top relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="container-section relative z-10">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-heading mb-4 heading-decorated tracking-tight">
              Premium <span className="text-gradient drop-shadow-sm">Products</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mt-6">Explore our diverse range of high-quality heavy equipment ready for global export</p>
          </SectionReveal>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categories.map((cat) => (
              <motion.div key={cat.name} variants={staggerItem}>
                <Link
                  to="/products"
                  className="group relative overflow-hidden rounded-[1.5rem] aspect-[4/3] block card-premium shadow-premium"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/90" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <h3 className="font-display font-bold text-2xl text-white drop-shadow-md transform transition-transform duration-500 group-hover:translate-y-[-4px]">{cat.name}</h3>
                    <div className="flex items-center gap-3 mt-3 overflow-hidden">
                      <div className="h-[2px] w-0 bg-primary group-hover:w-12 transition-all duration-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                      <span className="text-white/0 group-hover:text-white/90 text-sm font-bold uppercase tracking-wider transition-all duration-500 translate-x-[-15px] group-hover:translate-x-0">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-16 text-center">
            <Link to="/products" className="btn-secondary-glass inline-flex items-center gap-2">
              Browse All Equipment <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section-soft py-24 md:py-32 section-divider-top relative">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute inset-0 industrial-pattern opacity-50 z-0"></div>

        <div className="container-section relative z-10">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-heading mb-4 heading-decorated tracking-tight">
              Global <span className="text-gradient drop-shadow-sm">Solutions</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mt-6">Comprehensive end-to-end solutions for international heavy equipment trading</p>
          </SectionReveal>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {services.map((s) => (
              <motion.div
                key={s.title}
                variants={staggerItem}
                className="card-premium rounded-3xl p-8 group border-accent-left shadow-soft hover:shadow-premium bg-white/60 backdrop-blur-sm"
              >
                <div className="icon-container w-16 h-16 rounded-2xl mb-6 relative">
                  <div className="absolute inset-0 bg-primary/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <s.icon size={28} className="text-primary group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 relative z-10" strokeWidth={2} />
                </div>
                <h3 className="font-display font-bold text-heading mb-3 text-lg">{s.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Markets ── */}
      <section className="section-base py-24 md:py-32 section-divider-top relative overflow-hidden">
        <motion.div style={{ y: shapeY1 }} className="absolute top-[20%] right-[10%] opacity-[0.03] text-primary">
          <Globe size={400} />
        </motion.div>
        
        <div className="container-section text-center relative z-10">
          <SectionReveal>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-heading mb-4 heading-decorated tracking-tight flex items-center justify-center gap-4">
              <Globe className="text-primary drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]" size={42} />
              Markets We <span className="text-gradient drop-shadow-sm">Serve</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-16 mt-6">
              Strategic location in Dubai enabling seamless delivery to global markets
            </p>
          </SectionReveal>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {markets.map((m) => (
              <motion.div
                key={m}
                variants={staggerItem}
                whileHover={{
                  y: -6,
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(245,158,11,0.2), 0 0 20px rgba(245,158,11,0.1)",
                }}
                className="card-premium px-10 py-5 rounded-2xl font-display font-extrabold text-[15px] text-heading cursor-default tracking-wide bg-white/80 backdrop-blur-sm"
              >
                {m}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="gradient-cta py-24 md:py-32 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-white/[0.12] blur-[100px]" />
          <div className="absolute bottom-[-20%] left-[10%] w-[500px] h-[500px] rounded-full bg-white/[0.08] blur-[80px]" />
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full bg-white/[0.05] blur-[120px]" />
        </div>

        {/* Industrial grid overlay */}
        <div className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container-section text-center relative z-20">
          <SectionReveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6 drop-shadow-lg tracking-tight">
              Ready to Upgrade Your Fleet?
            </h2>
            <p className="text-white/90 mb-12 max-w-2xl mx-auto text-lg md:text-xl font-medium drop-shadow-md">
              Get competitive pricing, global shipping logistics, and expert consultation from our Dubai headquarters.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-charcoal px-12 py-5 rounded-2xl font-display font-extrabold hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all duration-400 group text-[15px]"
              >
                Get a Quote
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300 text-primary" />
              </Link>
              <a
                href="tel:+918220722221"
                className="inline-flex items-center gap-2 bg-transparent text-white border-2 border-white/30 px-10 py-5 rounded-2xl font-display font-bold hover:bg-white/10 hover:border-white transition-all duration-400 text-[15px]"
              >
                Call +91 8220722221
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
};

export default Index;
