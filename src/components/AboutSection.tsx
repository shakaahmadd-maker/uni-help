import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  Check, 
  CalendarCheck, 
  MapPin, 
  ShieldCheck, 
  Handshake, 
  Award, 
  Phone,
  User,
  X,
  Sparkles,
  PhoneCall,
  GraduationCap
} from "lucide-react";

interface Office {
  regionLabel: string;
  shortLabel: string;
  name: string;
  address: string;
  phone: string;
}

const PK_OFFICES: Office[] = [
  {
    regionLabel: "Lahore (Capital)",
    shortLabel: "Johar Town Hub",
    name: "Lahore Hub",
    address: "M-Block, Johar Town, Lahore",
    phone: "+92 42 111 864 435"
  },
  {
    regionLabel: "Karachi",
    shortLabel: "DHA Phase VI Office",
    name: "Karachi Office",
    address: "DHA Phase 6, Main Khayaban-e-Ittehad, Karachi",
    phone: "+92 21 345 67890"
  },
  {
    regionLabel: "Islamabad",
    shortLabel: "F-7 Executive Branch",
    name: "Islamabad HQ",
    address: "F-7 Markaz, Islamabad",
    phone: "+92 51 987 65432"
  }
];

const GCC_OFFICES: Office[] = [
  {
    regionLabel: "Dubai (UAE)",
    shortLabel: "SZR Business Hub",
    name: "Dubai Executive Tower",
    address: "Business Bay, Sheikh Zayed Road, Dubai",
    phone: "+971 4 555 1234"
  },
  {
    regionLabel: "Riyadh (KSA)",
    shortLabel: "Olaya District Office",
    name: "Riyadh Advisory Office",
    address: "Al Olaya Street, Olaya District, Riyadh",
    phone: "+966 11 222 5678"
  },
  {
    regionLabel: "Doha (Qatar)",
    shortLabel: "West Bay Branch",
    name: "Doha Gulf Hub",
    address: "West Bay Landmark Tower, Doha",
    phone: "+974 4444 8888"
  }
];

interface AboutSectionProps {
  onConsult?: (service: string) => void;
}

export default function AboutSection({ onConsult }: AboutSectionProps) {
  const [activeRegion, setActiveRegion] = useState<"pk" | "gcc">("pk");
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  // Form states
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [destination, setDestination] = useState("");
  const [qualification, setQualification] = useState("");

  const currentOffices = activeRegion === "pk" ? PK_OFFICES : GCC_OFFICES;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);

    // Save values for toast/callback
    const selectedDest = destination;
    const selectedQual = qualification;

    // Clear fields
    setFullName("");
    setPhoneNumber("");
    setDestination("");
    setQualification("");

    // Trigger onConsult to notify parents and prefill form if provided
    if (onConsult) {
      onConsult(`Direct Assessment: Destination: ${selectedDest} (${selectedQual})`);
      
      // Auto scroll to contact section
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const offset = 85;
        const scrollPos = contactSection.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: scrollPos, behavior: "smooth" });
      }
    }

    // Show toast
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 6000);
  };

  const selectOffice = (office: Office) => {
    setSelectedOffice(office);
    // Smooth scroll down slightly to focus on the detail box for great mobile experience
    setTimeout(() => {
      const detailBox = document.getElementById("officeDetailBox");
      if (detailBox) {
        detailBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 100);
  };

  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative">
      
      {/* 3D Dynamics Perspective Style Tag Injected for Perfect Aesthetic Performance */}
      <style>{`
        .perspective-container {
          perspective: 1200px;
        }
        .td-card {
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.4s;
        }
        .td-card:hover {
          transform: translateY(-6px) rotateX(8deg) rotateY(-4deg);
          box-shadow: 
            -12px 18px 30px -5px rgba(0, 102, 204, 0.08),
            0px 10px 15px -3px rgba(0, 0, 0, 0.03);
        }
        .dark .td-card:hover {
          box-shadow: 
            -12px 18px 30px -5px rgba(0, 102, 204, 0.25),
            0px 10px 15px -3px rgba(0, 0, 0, 0.4);
        }
        .td-icon-wrapper {
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.6s;
          transform-style: preserve-3d;
        }
        .td-card:hover .td-icon-wrapper {
          transform: translateZ(30px);
          box-shadow: 0 10px 20px rgba(0, 102, 204, 0.15);
        }
        .td-content-wrapper {
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
          transform-style: preserve-3d;
        }
        .td-card:hover .td-content-wrapper {
          transform: translateZ(20px);
        }
      `}</style>

      {/* Modern Background Decorators isolated so overflow does not break position sticky */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] rounded-full bg-brand-blue-600/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] rounded-full bg-brand-gold-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-45 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* ========================================== */}
          {/* LEFT & CENTER: RICH INFORMATION PANEL      */}
          {/* ========================================== */}
          <div className="lg:col-span-7 space-y-12 text-left">
            
            {/* Section Header */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-brand-blue-50 dark:bg-brand-blue-950/30 border border-brand-blue-100 dark:border-brand-blue-800/40 px-3.5 py-1.5 rounded-full shadow-sm">
                <Compass className="h-4 w-4 text-brand-blue-600 dark:text-brand-gold-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue-700 dark:text-brand-gold-400">Who We Are</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Empowering Students with <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-brand-blue-600 via-brand-gold-500 to-brand-green-600 bg-clip-text text-transparent">Support and Global Expertise</span>
              </h1>
              
              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                <p>
                  Founded with the objective of making premium education accessible,{" "}
                  <strong className="text-brand-blue-700 dark:text-brand-gold-400 font-semibold">Uni Help Consultants</strong> has grown into an internationally trusted mentorship circle. 
                  We don't just process college admissions—we build long-standing relationships with students and families to align academic desires with real-world outcomes.
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans">
                  With a strong physical presence in major Pakistani capitals (Lahore, Karachi, Islamabad) and critical hubs across the GCC region (Dubai, Riyadh, Doha), we ensure you have localized in-person access. We stand beside you from day one of planning to university graduation.
                </p>
              </div>

              {/* Checkmarks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                <div className="flex items-start space-x-3 group">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                    Certified Education Counselors
                  </span>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                    Direct Placement Networks
                  </span>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                    Pre-flight Checklists & Lodging
                  </span>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                    Personalized Portfolio Building
                  </span>
                </div>
              </div>

              {/* Action Buttons Under Content Block */}
              <div className="flex flex-wrap gap-3.5 pt-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-brand-blue-600 hover:bg-brand-blue-700 dark:bg-brand-blue-700 dark:hover:bg-brand-blue-600 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-brand-blue-500/20 hover:shadow-brand-blue-500/30 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <CalendarCheck className="h-4 w-4 mr-2" />
                  Apply for Free Counseling
                </button>
                <a 
                  href="#officeHubSelection" 
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-200/60 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs uppercase tracking-widest border border-slate-300/40 dark:border-slate-800 transition-all transform hover:-translate-y-0.5"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Explore Nearby Branches
                </a>
              </div>
            </div>

            {/* Why Choose Us 3D Blocks Grid */}
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Core Strengths</span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">Why Choose Us</h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Interact with the 3D dynamic blocks below to explore our structural advantages:</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 perspective-container">
                
                {/* 3D Card 1 */}
                <div className="td-card group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 hover:border-brand-blue-600/65 transition-all text-left">
                  {/* Background overlay glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-brand-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="flex items-start space-x-4">
                    <div className="td-icon-wrapper flex-shrink-0 w-12 h-12 rounded-xl bg-brand-blue-50 dark:bg-brand-blue-950/50 text-brand-blue-600 dark:text-brand-gold-400 flex items-center justify-center border border-brand-blue-100/50 dark:border-brand-blue-900/50 shadow-sm">
                      <ShieldCheck className="h-6 w-6 stroke-[1.8]" />
                    </div>
                    <div className="td-content-wrapper space-y-1 flex-1">
                      <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight font-display">
                        End-to-End Absolute Care
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans mt-1">
                        From academic psychometrics to packing your bags for flight, our team holds your hand at every physical milestone.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3D Card 2 */}
                <div className="td-card group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 hover:border-brand-blue-600/65 transition-all text-left">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-brand-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="flex items-start space-x-4">
                    <div className="td-icon-wrapper flex-shrink-0 w-12 h-12 rounded-xl bg-brand-blue-50 dark:bg-brand-blue-950/50 text-brand-blue-600 dark:text-brand-gold-400 flex items-center justify-center border border-brand-blue-100/50 dark:border-brand-blue-900/50 shadow-sm">
                      <MapPin className="h-6 w-6 stroke-[1.8]" />
                    </div>
                    <div className="td-content-wrapper space-y-1 flex-1">
                      <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight font-display">
                        Regional Physical Footprint
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans mt-1">
                        We are physically present across 6 key locations in Pakistan and the Gulf, offering in-office counselor sessions at any time.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3D Card 3 */}
                <div className="td-card group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 hover:border-brand-blue-600/65 transition-all text-left">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-brand-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="flex items-start space-x-4">
                    <div className="td-icon-wrapper flex-shrink-0 w-12 h-12 rounded-xl bg-brand-blue-50 dark:bg-brand-blue-950/50 text-brand-blue-600 dark:text-brand-gold-400 flex items-center justify-center border border-brand-blue-100/50 dark:border-brand-blue-900/50 shadow-sm">
                      <Handshake className="h-6 w-6 stroke-[1.8]" />
                    </div>
                    <div className="td-content-wrapper space-y-1 flex-1">
                      <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight font-display">
                        Direct Strategic Links
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans mt-1">
                        Direct partnerships with academic boards worldwide mean faster admissions decisions and exclusive financial aid matching.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3D Card 4 */}
                <div className="td-card group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 hover:border-brand-blue-600/65 transition-all text-left">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-brand-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="flex items-start space-x-4">
                    <div className="td-icon-wrapper flex-shrink-0 w-12 h-12 rounded-xl bg-brand-blue-50 dark:bg-brand-blue-950/50 text-brand-blue-600 dark:text-brand-gold-400 flex items-center justify-center border border-brand-blue-100/50 dark:border-brand-blue-900/50 shadow-sm">
                      <Award className="h-6 w-6 stroke-[1.8]" />
                    </div>
                    <div className="td-content-wrapper space-y-1 flex-1">
                      <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight font-display">
                        Certified Specialist Team
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans mt-1">
                        All our visas counselor specialists hold certifications and keep aligned with fast-shifting legal entry requirements.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Location Explorer Widget */}
            <div id="officeHubSelection" className="p-6 rounded-2xl bg-brand-blue-50/50 dark:bg-slate-900/40 border border-brand-blue-100 dark:border-slate-850 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center space-x-2 font-display">
                    <Sparkles className="h-5 w-5 text-brand-gold-500" />
                    <span>Interactive Office Hubs</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Select any official branch below to reveal customized contact details.</p>
                </div>
                
                {/* Switch Tabs */}
                <div className="flex space-x-2 shrink-0">
                  <button 
                    onClick={() => { setActiveRegion("pk"); setSelectedOffice(null); }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      activeRegion === "pk"
                        ? "bg-brand-blue-600 dark:bg-brand-blue-700 text-white shadow-sm"
                        : "bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    Pakistan
                  </button>
                  <button 
                    onClick={() => { setActiveRegion("gcc"); setSelectedOffice(null); }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      activeRegion === "gcc"
                        ? "bg-brand-blue-600 dark:bg-brand-blue-700 text-white shadow-sm"
                        : "bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    GCC / Gulf Region
                  </button>
                </div>
              </div>

              {/* Dynamic Grid list */}
              <div id="officeCardsContainer" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentOffices.map((office, idx) => (
                  <div
                    key={office.name}
                    onClick={() => selectOffice(office)}
                    className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 cursor-pointer hover:border-brand-blue-500/60 dark:hover:border-brand-blue-500/60 transition-all shadow-sm group/office text-left"
                  >
                    <span className="text-[10px] font-bold text-brand-blue-600 dark:text-brand-gold-400 block uppercase tracking-wider">{office.regionLabel}</span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block truncate mt-0.5">{office.shortLabel}</span>
                    <span className="text-[10px] text-slate-400 block mt-2 flex items-center gap-1">
                      <PhoneCall className="h-2.5 w-2.5 text-brand-blue-600 dark:text-brand-gold-400" /> 
                      <span>Tap for details</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Selected Office Info Box */}
              <AnimatePresence>
                {selectedOffice && (
                  <motion.div 
                    id="officeDetailBox"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 rounded-xl bg-brand-blue-100/30 dark:bg-brand-blue-950/20 border border-brand-blue-200/40 dark:border-brand-blue-900/40"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 select-all">
                        <h5 className="font-bold text-slate-900 dark:text-white text-sm font-display">{selectedOffice.name}</h5>
                        <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5 pt-0.5">
                          <MapPin className="h-3.5 w-3.5 text-brand-blue-600 dark:text-brand-gold-500 shrink-0" /> 
                          <span>{selectedOffice.address}</span>
                        </p>
                        <p className="text-xs font-bold text-brand-blue-700 dark:text-brand-gold-400 flex items-center gap-1.5 pt-0.5">
                          <Phone className="h-3.5 w-3.5 text-brand-blue-600 dark:text-brand-gold-500 shrink-0" /> 
                          <span>{selectedOffice.phone}</span>
                        </p>
                      </div>
                      <button 
                        onClick={() => setSelectedOffice(null)}
                        className="text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 text-[10px] bg-slate-200/50 dark:bg-slate-800/60 px-2 py-1 rounded cursor-pointer transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
          
          {/* ========================================== */}
          {/* RIGHT: HIGH-IMPACT STICKY VISUAL BANNER     */}
          {/* ========================================== */}
          <div 
            className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start space-y-6"
            style={{ position: "sticky", top: "7rem" }}
          >
            
            {/* Main Redesigned Banner - NO Overlays for Clean Elegance */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-900 aspect-[4/5] lg:aspect-auto lg:h-[580px]">
              
              {/* Glowing Ambient Background */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10" />
              
              <img 
                src="/src/assets/images/about_us_counseling_team_1793878050703.jpg" 
                alt="Uni Help Consultants - Professional counseling team guiding university student" 
                className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out block"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop";
                }}
              />
            </div>

            {/* Premium Testimonial Bubble */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/95 border border-slate-200/60 dark:border-slate-800 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-blue-600 bg-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80" 
                    alt="Alumna student portrait Alisha K." 
                    className="object-cover w-full h-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full text-[10px] text-white flex items-center justify-center border border-white dark:border-slate-900 shadow">
                  ✓
                </span>
              </div>
              <div className="text-left">
                <p className="text-xs italic text-slate-600 dark:text-slate-300 leading-relaxed">
                  "Uni Help transformed my application timeline. Received offers from King's College & University of Sydney with scholarships!"
                </p>
                <span className="block text-[11px] font-bold text-brand-blue-600 dark:text-brand-gold-400 mt-1">
                  — Alisha K., Uni Help Alumna (King's College London)
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ========================================== */}
      {/* DIALOG: ADMISSIONS CONSULTATION MODAL       */}
      {/* ========================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 z-10"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-150 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-brand-blue-50 dark:bg-brand-blue-950 text-brand-blue-600 dark:text-brand-gold-400 flex items-center justify-center mx-auto text-xl">
                  <User className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">Free Admissions Assessment</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Tell us your targets and an immigration specialist will review your profile.</p>
              </div>

              {/* Form elements */}
              <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Zain Khan" 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:text-white" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+92 300 1234567" 
                      className="w-full px-4 py-3 rounded-xl bg-slate-55 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:text-white" 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Desired Destination Country</label>
                  <select 
                    required 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:text-white"
                  >
                    <option value="">Choose study destination...</option>
                    <option value="UK">United Kingdom (UK)</option>
                    <option value="US">United States (USA)</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Japan">Japan 🇯🇵</option>
                    <option value="Malaysia">Malaysia 🇲🇾</option>
                    <option value="Turkey">Turkey 🇹🇷</option>
                    <option value="Brazil">Brazil 🇧🇷</option>
                    <option value="Chile">Chile 🇨🇱</option>
                    <option value="Indonesia">Indonesia 🇮🇩</option>
                    <option value="South Africa">South Africa 🇿🇦</option>
                    <option value="Europe">Schengen Europe</option>
                    <option value="Other">Other Region</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-sans">Current Academic Qualification</label>
                  <select 
                    required 
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:text-white"
                  >
                    <option value="">Select Qualification...</option>
                    <option value="Alevels">A-Levels / FSc / Intermediate</option>
                    <option value="Bachelors">Undergraduate Degree (Bachelors)</option>
                    <option value="Masters">Graduate Degree (Masters/PhD)</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3.5 px-4 rounded-xl bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-brand-blue-500/10 active:scale-[0.98] transition-all cursor-pointer mt-2"
                >
                  Submit Profile Evaluation
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================== */}
      {/* TOAST SYSTEM (ELEGANT REACT ANIMATED)      */}
      {/* ========================================== */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 border border-slate-800/80 text-white p-4.5 rounded-2xl shadow-2xl flex items-center justify-between space-x-4"
          >
            <div className="flex items-center space-x-3.5 text-left">
              <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow">
                <Check className="h-5 w-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="block font-bold text-xs tracking-wide uppercase text-white font-display">Submission Received!</span>
                <span className="block text-xs text-slate-300 font-sans mt-0.5">Our senior regional board counselor will review your profile shortly.</span>
              </div>
            </div>
            <button 
              onClick={() => setShowToast(false)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Dismiss toast"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
