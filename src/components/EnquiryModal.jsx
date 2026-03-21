import { useState, useEffect, useRef } from "react";
import { X, User, Phone, Mail, MapPin, ArrowRight, ShieldCheck, Tag, Calendar, ChevronDown, Check, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Country data with flags ── */
const COUNTRIES = [
  { name: "Afghanistan", flag: "🇦🇫" },
  { name: "Albania", flag: "🇦🇱" },
  { name: "Algeria", flag: "🇩🇿" },
  { name: "Angola", flag: "🇦🇴" },
  { name: "Argentina", flag: "🇦🇷" },
  { name: "Armenia", flag: "🇦🇲" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Austria", flag: "🇦🇹" },
  { name: "Azerbaijan", flag: "🇦🇿" },
  { name: "Bahrain", flag: "🇧🇭" },
  { name: "Bangladesh", flag: "🇧🇩" },
  { name: "Belarus", flag: "🇧🇾" },
  { name: "Belgium", flag: "🇧🇪" },
  { name: "Bolivia", flag: "🇧🇴" },
  { name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Bulgaria", flag: "🇧🇬" },
  { name: "Cambodia", flag: "🇰🇭" },
  { name: "Cameroon", flag: "🇨🇲" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Chile", flag: "🇨🇱" },
  { name: "China", flag: "🇨🇳" },
  { name: "Colombia", flag: "🇨🇴" },
  { name: "Congo (DRC)", flag: "🇨🇩" },
  { name: "Costa Rica", flag: "🇨🇷" },
  { name: "Croatia", flag: "🇭🇷" },
  { name: "Cuba", flag: "🇨🇺" },
  { name: "Cyprus", flag: "🇨🇾" },
  { name: "Czech Republic", flag: "🇨🇿" },
  { name: "Denmark", flag: "🇩🇰" },
  { name: "Dominican Republic", flag: "🇩🇴" },
  { name: "Ecuador", flag: "🇪🇨" },
  { name: "Egypt", flag: "🇪🇬" },
  { name: "El Salvador", flag: "🇸🇻" },
  { name: "Ethiopia", flag: "🇪🇹" },
  { name: "Finland", flag: "🇫🇮" },
  { name: "France", flag: "🇫🇷" },
  { name: "Georgia", flag: "🇬🇪" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Ghana", flag: "🇬🇭" },
  { name: "Greece", flag: "🇬🇷" },
  { name: "Guatemala", flag: "🇬🇹" },
  { name: "Honduras", flag: "🇭🇳" },
  { name: "Hungary", flag: "🇭🇺" },
  { name: "India", flag: "🇮🇳" },
  { name: "Indonesia", flag: "🇮🇩" },
  { name: "Iran", flag: "🇮🇷" },
  { name: "Iraq", flag: "🇮🇶" },
  { name: "Ireland", flag: "🇮🇪" },
  { name: "Israel", flag: "🇮🇱" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Ivory Coast", flag: "🇨🇮" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Jordan", flag: "🇯🇴" },
  { name: "Kazakhstan", flag: "🇰🇿" },
  { name: "Kenya", flag: "🇰🇪" },
  { name: "Kuwait", flag: "🇰🇼" },
  { name: "Kyrgyzstan", flag: "🇰🇬" },
  { name: "Laos", flag: "🇱🇦" },
  { name: "Latvia", flag: "🇱🇻" },
  { name: "Lebanon", flag: "🇱🇧" },
  { name: "Libya", flag: "🇱🇾" },
  { name: "Lithuania", flag: "🇱🇹" },
  { name: "Luxembourg", flag: "🇱🇺" },
  { name: "Malaysia", flag: "🇲🇾" },
  { name: "Maldives", flag: "🇲🇻" },
  { name: "Mali", flag: "🇲🇱" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "Moldova", flag: "🇲🇩" },
  { name: "Mongolia", flag: "🇲🇳" },
  { name: "Morocco", flag: "🇲🇦" },
  { name: "Mozambique", flag: "🇲🇿" },
  { name: "Myanmar", flag: "🇲🇲" },
  { name: "Nepal", flag: "🇳🇵" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "New Zealand", flag: "🇳🇿" },
  { name: "Nicaragua", flag: "🇳🇮" },
  { name: "Nigeria", flag: "🇳🇬" },
  { name: "North Korea", flag: "🇰🇵" },
  { name: "Norway", flag: "🇳🇴" },
  { name: "Oman", flag: "🇴🇲" },
  { name: "Pakistan", flag: "🇵🇰" },
  { name: "Palestine", flag: "🇵🇸" },
  { name: "Panama", flag: "🇵🇦" },
  { name: "Papua New Guinea", flag: "🇵🇬" },
  { name: "Paraguay", flag: "🇵🇾" },
  { name: "Peru", flag: "🇵🇪" },
  { name: "Philippines", flag: "🇵🇭" },
  { name: "Poland", flag: "🇵🇱" },
  { name: "Portugal", flag: "🇵🇹" },
  { name: "Qatar", flag: "🇶🇦" },
  { name: "Romania", flag: "🇷🇴" },
  { name: "Russia", flag: "🇷🇺" },
  { name: "Rwanda", flag: "🇷🇼" },
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "Senegal", flag: "🇸🇳" },
  { name: "Serbia", flag: "🇷🇸" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Slovakia", flag: "🇸🇰" },
  { name: "Somalia", flag: "🇸🇴" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "South Sudan", flag: "🇸🇸" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "Sri Lanka", flag: "🇱🇰" },
  { name: "Sudan", flag: "🇸🇩" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "Syria", flag: "🇸🇾" },
  { name: "Taiwan", flag: "🇹🇼" },
  { name: "Tajikistan", flag: "🇹🇯" },
  { name: "Tanzania", flag: "🇹🇿" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "Tunisia", flag: "🇹🇳" },
  { name: "Turkey", flag: "🇹🇷" },
  { name: "Turkmenistan", flag: "🇹🇲" },
  { name: "Uganda", flag: "🇺🇬" },
  { name: "Ukraine", flag: "🇺🇦" },
  { name: "United Arab Emirates", flag: "🇦🇪" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "United States", flag: "🇺🇸" },
  { name: "Uruguay", flag: "🇺🇾" },
  { name: "Uzbekistan", flag: "🇺🇿" },
  { name: "Venezuela", flag: "🇻🇪" },
  { name: "Vietnam", flag: "🇻🇳" },
  { name: "Yemen", flag: "🇾🇪" },
  { name: "Zambia", flag: "🇿🇲" },
  { name: "Zimbabwe", flag: "🇿🇼" },
];

const STATES_BY_COUNTRY = {
  "India": ["Andhra Pradesh", "Delhi", "Gujarat", "Karnataka", "Kerala", "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal", "Other"],
  "United Arab Emirates": ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Other"],
};

/* ── Searchable Country Combobox ── */
const CountrySelect = ({ value, onChange, required }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const selected = COUNTRIES.find(c => c.name === value);
  const filtered = query
    ? COUNTRIES.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    : COUNTRIES;

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setQuery("");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSelect = (country) => {
    onChange(country.name);
    setOpen(false);
    setQuery("");
  };

  // Keyboard navigation
  const [highlighted, setHighlighted] = useState(0);
  const handleKey = (e) => {
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlighted(h => Math.min(h + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
    if (e.key === "Enter") { e.preventDefault(); if (filtered[highlighted]) handleSelect(filtered[highlighted]); }
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={handleOpen}
        className={`w-full pl-11 pr-10 py-3.5 bg-gray-50 border rounded-xl text-[14px] text-left font-medium transition-all duration-200 flex items-center gap-2 ${
          open ? "border-primary ring-2 ring-primary/15 bg-white" : "border-gray-200 hover:border-gray-300"
        } ${!value ? "text-gray-400" : "text-gray-900"}`}
      >
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <MapPin size={15} />
        </span>
        <span className="truncate">
          {selected ? `${selected.flag} ${selected.name}` : "Select your country"}
        </span>
        <ChevronDown size={14} className={`absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {/* Hidden required-compatible input */}
      <input type="text" required={required} value={value} onChange={() => {}} className="sr-only" tabIndex={-1} aria-hidden />

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white border border-gray-200 rounded-xl shadow-[0_12px_32px_-8px_rgba(0,0,0,0.14)] overflow-hidden"
          >
            {/* Search inside dropdown */}
            <div className="p-2 border-b border-gray-100">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setHighlighted(0); }}
                onKeyDown={handleKey}
                placeholder="Type to search..."
                className="w-full px-3 py-2 text-[13px] bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-medium placeholder:text-gray-400"
              />
            </div>
            {/* Options */}
            <ul className="max-h-[180px] overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <li className="px-4 py-3 text-[13px] text-gray-400 text-center">No countries found</li>
              ) : filtered.map((c, i) => (
                <li
                  key={c.name}
                  onClick={() => handleSelect(c)}
                  onMouseEnter={() => setHighlighted(i)}
                  className={`flex items-center gap-3 px-4 py-3 text-[13px] cursor-pointer transition-colors duration-100 ${
                    highlighted === i ? "bg-orange-50 text-primary" : "text-gray-700 hover:bg-orange-50 hover:text-primary"
                  }`}
                >
                  <span className="text-base leading-none">{c.flag}</span>
                  <span className="font-medium flex-1">{c.name}</span>
                  {value === c.name && <Check size={13} className="text-primary shrink-0" />}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Main Modal ── */
const EnquiryModal = ({ open, onClose, productName, product }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", country: "", state: "", city: "" });

  const states = STATES_BY_COUNTRY[form.country] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", phone: "", email: "", country: "", state: "", city: "" });
      onClose();
    }, 2800);
  };

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const inputCls = "w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 focus:bg-white transition-all duration-200 font-medium";
  const selectCls = "w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[14px] text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 focus:bg-white transition-all duration-200 font-medium appearance-none";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ type: "spring", damping: 26, stiffness: 380 }}
            className="relative w-full max-w-[860px] bg-white rounded-[1.75rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-visible"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ← Back — pill button, top-left, over dark panel */}
            <button
              onClick={onClose}
              aria-label="Go back"
              className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 hover:border-primary/40 text-white/80 hover:text-primary text-[12px] font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm group"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              <span className="hidden sm:inline">Back</span>
            </button>

            {/* ✕ Close — top-right */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3.5 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary/20 text-white/80 hover:text-primary border border-white/10 hover:border-primary/30 transition-all duration-200 group"
            >
              <X size={17} className="group-hover:scale-110 transition-transform duration-200" />
            </button>

            {/* ── LEFT PANEL ── */}
            <div className="relative md:w-[42%] shrink-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 flex flex-col p-7 gap-5">
              <div className="absolute inset-0 opacity-[0.12] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle at 85% 15%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 15% 85%, #f59e0b 0%, transparent 40%)" }}
              />
              {product?.images?.[0] ? (
                <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 shadow-lg shrink-0 mt-10">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              ) : (
                <div className="rounded-2xl bg-white/5 border border-white/10 aspect-video flex items-center justify-center shrink-0 mt-10">
                  <Tag size={36} className="text-white/20" />
                </div>
              )}
              <div className="relative z-10 flex flex-col gap-3">
                <div className="inline-flex items-center gap-1.5 bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit">
                  <ShieldCheck size={10} />
                  Verified Listing
                </div>
                <h3 className="text-white font-black text-[1.1rem] leading-snug tracking-tight">
                  {productName || "Heavy Equipment"}
                </h3>
                <div className="space-y-2 pt-1 border-t border-white/10">
                  {product?.price && (
                    <div className="flex items-center gap-2 text-[13px]">
                      <Tag size={12} className="text-primary shrink-0" />
                      <span className="text-white/55 font-medium w-10">Price</span>
                      <span className="text-white font-black">{product.price}</span>
                    </div>
                  )}
                  {product?.year && (
                    <div className="flex items-center gap-2 text-[13px]">
                      <Calendar size={12} className="text-primary shrink-0" />
                      <span className="text-white/55 font-medium w-10">Year</span>
                      <span className="text-white font-bold">{product.year}</span>
                    </div>
                  )}
                  {product?.refNumber && (
                    <div className="flex items-center gap-2 text-[13px]">
                      <ShieldCheck size={12} className="text-primary shrink-0" />
                      <span className="text-white/55 font-medium w-10">Ref</span>
                      <span className="text-white font-black font-mono tracking-wide">{product.refNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="flex-1 p-7 md:p-9 flex flex-col justify-center">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-5">
                    <span className="text-primary text-4xl">✓</span>
                  </div>
                  <p className="text-2xl text-gray-900 font-display font-black mb-2">Request Sent!</p>
                  <p className="text-gray-500 font-medium text-[15px] max-w-[260px] mx-auto leading-relaxed">Our team will contact you with full details shortly.</p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="font-display font-black text-[1.5rem] text-gray-900 tracking-tight leading-tight mb-1">Get Details &amp; Best Price</h2>
                    <p className="text-gray-400 text-[13px] font-medium">Fill in your details and we'll get back to you instantly.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {/* Name */}
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><User size={15} /></div>
                      <input required placeholder="Enter your full name" value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                    </div>
                    {/* Phone */}
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><Phone size={15} /></div>
                      <input required type="tel" placeholder="Enter your phone number" value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
                    </div>
                    {/* Email */}
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><Mail size={15} /></div>
                      <input required type="email" placeholder="Enter your email address" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
                    </div>

                    {/* Country — Searchable combobox */}
                    <CountrySelect
                      value={form.country}
                      required
                      onChange={(country) => setForm({ ...form, country, state: "", city: "" })}
                    />

                    {/* State + City row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><MapPin size={15} /></div>
                        {states.length > 0 ? (
                          <select required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className={selectCls}>
                            <option value="" disabled>State *</option>
                            {states.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        ) : (
                          <input required placeholder="State / Region *" value={form.state}
                            onChange={(e) => setForm({ ...form, state: e.target.value })} className={inputCls} />
                        )}
                      </div>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><MapPin size={15} /></div>
                        <input required placeholder="Enter your city" value={form.city}
                          onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputCls} />
                      </div>
                    </div>

                    {/* CTA */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-orange-500 text-white font-black py-4 rounded-xl text-[14px] uppercase tracking-[0.12em] shadow-[0_10px_24px_-8px_rgba(245,158,11,0.55)] hover:shadow-[0_18px_36px_-10px_rgba(245,158,11,0.65)] transition-all duration-300 flex items-center justify-center gap-2.5 mt-1"
                    >
                      Send Enquiry
                      <ArrowRight size={16} />
                    </motion.button>

                    <p className="text-center flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-semibold mt-1">
                      <ShieldCheck size={11} className="text-primary" />
                      Verified sellers only
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryModal;
