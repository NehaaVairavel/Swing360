import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
  productName?: string;
}

const EnquiryModal = ({ open, onClose, productName }: EnquiryModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", phone: "", email: "", description: "" });
      onClose();
    }, 2500);
  };

  const inputClasses =
    "w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-[15px] text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-200 font-medium";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="relative w-full max-w-[460px] bg-white p-10 md:p-12 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose} 
              className="absolute top-8 right-8 text-gray-300 hover:text-primary transition-all p-2 rounded-full hover:bg-gray-50 group"
            >
              <X size={24} className="group-hover:scale-110 transition-transform duration-200" />
            </button>
            
            <div className="mb-8">
              <h3 className="font-display font-black text-3xl text-gray-900 mb-2 tracking-tight">Send Enquiry</h3>
              {productName && (
                <p className="text-[16px] text-gray-500 font-semibold tracking-tight flex items-center gap-2">
                   <span className="w-4 h-0.5 bg-primary/40 rounded-full" />
                   For: <span className="text-gray-800">{productName}</span>
                </p>
              )}
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary text-4xl font-bold">✓</span>
                </div>
                <p className="text-2xl text-gray-900 font-display font-black mb-2">Request Sent</p>
                <p className="text-gray-500 font-medium px-4">Our team will get back to you with a custom quote shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="space-y-4">
                  <input
                    required 
                    placeholder="Name *" 
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClasses}
                  />
                  <input
                    required 
                    type="tel"
                    placeholder="Phone Number *" 
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClasses}
                  />
                  <input
                    type="email"
                    placeholder="Email (optional)" 
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClasses}
                  />
                  <textarea
                    required 
                    placeholder="Enquiry Description *" 
                    value={form.description} 
                    rows={4}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className={`${inputClasses} resize-none min-h-[130px]`}
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-orange-500 text-white font-display font-black py-5 rounded-full text-[15px] uppercase tracking-[0.1em] shadow-[0_12px_24px_-8px_rgba(245,158,11,0.5)] hover:shadow-[0_20px_40px_-12px_rgba(245,158,11,0.6)] transition-all mt-4"
                >
                  Confirm Enquiry
                </motion.button>
                
                <p className="text-center text-[12px] text-gray-400 font-bold tracking-tight">
                  By submitting, you agree to our 
                  <button type="button" className="ml-1 text-gray-500 underline hover:text-primary transition-colors">
                    Terms of Service
                  </button>
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;
