import { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedGear from "@/components/AnimatedGear";
import { getWhatsAppUrl } from "@/utils/whatsapp";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", phone: "", message: "" });
    }, 4000);
  };

  const inputClasses =
    "w-full bg-white/70 backdrop-blur-sm border border-border/50 shadow-sm rounded-xl px-4 py-3.5 text-sm text-heading placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 hover:border-primary/30 transition-all duration-300";

  return (
    <div className="min-h-screen pt-28 pb-10 relative overflow-hidden bg-white">
      {/* Deep decorative background */}
      <div className="absolute top-[5%] right-[-5%] w-[400px] h-[400px] rounded-full bg-primary/[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-5%] w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute left-[8%] top-[15%] opacity-[0.03] pointer-events-none hidden lg:block">
        <AnimatedGear size={280} />
      </div>

      <div className="container-section relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-heading mb-4 tracking-tight">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Ready to discuss your heavy equipment needs? Our dedicated team is here to assist you globally.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Contact Info (Left) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5"
          >
            <div className="card-premium rounded-[2rem] p-8 border-accent-left relative overflow-hidden">
               <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
                 <AnimatedGear size={200} className="[animation-duration:30s]" />
               </div>
              <h2 className="text-2xl font-display font-extrabold text-heading mb-8 relative z-10">Contact Details</h2>
              
              <div className="flex flex-col gap-8 relative z-10">
                {[
                  {
                    icon: MapPin,
                    title: "Corporate Office",
                    content: (
                      <p className="text-sm font-medium text-muted-foreground mt-1 leading-relaxed">
                        Building A1, Dubai Digital Park,<br />
                        Dubai Silicon Oasis, Dubai, UAE
                      </p>
                    ),
                  },
                  {
                    icon: Phone,
                    title: "Phone & WhatsApp",
                    content: (
                      <div className="mt-1 flex flex-col gap-1">
                        <a href="tel:+918220722221" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors block">
                          +91 8220722221
                        </a>
                      </div>
                    ),
                  },
                  {
                    icon: Mail,
                    title: "Email Address",
                    content: (
                      <a href="mailto:swing360exim@gmail.com" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors mt-1 block">
                        swing360exim@gmail.com
                      </a>
                    ),
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    variants={staggerItem}
                    className="flex items-start gap-5 group"
                  >
                    <div className="w-14 h-14 rounded-2xl shrink-0 glass-card bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:bg-primary group-hover:shadow-glow transition-all duration-400">
                      <item.icon size={24} className="text-primary group-hover:text-white transition-colors duration-400" />
                    </div>
                    <div className="pt-1">
                      <h3 className="font-display font-bold text-heading text-lg">{item.title}</h3>
                      {item.content}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-border/50 relative z-10 flex flex-wrap gap-4">
                 <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white font-display font-bold py-3 px-4 rounded-xl hover:brightness-110 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-400"
                  >
                    <MessageCircle size={18} /> WhatsApp Us
                  </a>
              </div>
            </div>
          </motion.div>

          {/* Form (Right) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="card-premium rounded-[2rem] p-8 md:p-10 bg-white/60 backdrop-blur-xl">
              <div className="mb-8">
                <h2 className="text-2xl font-display font-bold text-heading">Send us a message</h2>
                <p className="text-sm text-muted-foreground mt-2">Fill out the form below and our sales representatives will get back to you within 24 hours.</p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center select-none"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75" />
                    <span className="text-primary text-4xl">✓</span>
                  </div>
                  <h3 className="text-2xl text-heading font-display font-extrabold mb-2">Message Delivered!</h3>
                  <p className="text-muted-foreground">Thank you for contacting us. We will reach out shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-bold text-heading ml-1 mb-1.5 block uppercase tracking-wide">Your Name</label>
                      <input
                        required placeholder="John Doe" value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-heading ml-1 mb-1.5 block uppercase tracking-wide">Phone Number</label>
                      <input
                        required placeholder="+1 234 567 890" value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClasses}
                        type="tel"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-heading ml-1 mb-1.5 block uppercase tracking-wide">Message</label>
                    <textarea
                      required placeholder="Tell us about the equipment you're looking for..." value={form.message} rows={5}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputClasses} resize-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 text-white font-display font-bold py-4 rounded-xl btn-cta flex items-center justify-center gap-2 group w-full"
                  >
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Send Enquiry
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
