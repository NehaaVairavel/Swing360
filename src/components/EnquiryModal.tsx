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
    "bg-muted/30 border border-border/60 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-400";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="card-premium w-full max-w-md p-6 relative rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-heading transition-colors p-1 rounded-lg hover:bg-muted">
              <X size={20} />
            </button>
            <h3 className="font-display font-bold text-xl text-heading mb-1">Send Enquiry</h3>
            {productName && <p className="text-sm text-muted-foreground mb-4">For: {productName}</p>}

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary text-2xl">✓</span>
                </div>
                <p className="text-heading font-display font-bold">Thank you!</p>
                <p className="text-muted-foreground text-sm">Our team will contact you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  required placeholder="Name *" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClasses}
                />
                <input
                  required placeholder="Phone Number *" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClasses}
                />
                <input
                  placeholder="Email (optional)" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClasses}
                />
                <textarea
                  required placeholder="Enquiry Description *" value={form.description} rows={3}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className={`${inputClasses} resize-none`}
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground font-display font-bold py-3 rounded-xl hover:shadow-glow transition-all duration-400 btn-glow"
                >
                  Submit Enquiry
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;
