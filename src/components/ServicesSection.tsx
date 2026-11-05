import React, { useState, useEffect } from "react";
import { SERVICES_DATA } from "../data";
import { Service } from "../types";

const ACADEMIC_COUNSELING_HEADER_IMAGE = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop";
import {
  GraduationCap,
  FileCheck,
  Coins,
  Compass,
  BookOpen,
  PlaneTakeoff,
  ArrowRight,
  Info,
  X,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
  FileText,
  Check,
  Contact,
  Sparkles,
  Award,
  ShieldCheck
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap: GraduationCap,
  FileCheck: FileCheck,
  Coins: Coins,
  Compass: Compass,
  BookOpen: BookOpen,
  PlaneTakeoff: PlaneTakeoff
};

export const SERVICE_IMAGES: Record<string, string> = {
  "university-admissions": "/src/assets/images/service_university_admissions_1793878050723.jpg",
  "visa-guidance": "/src/assets/images/service_visa_guidance_1793878052708.jpg",
  "scholarship-assistance": "/src/assets/images/service_scholarship_assistance_1793878052494.jpg",
  "career-counseling": "/src/assets/images/service_career_counseling_1793878053988.jpg",
  "test-prep": "/src/assets/images/service_test_prep_1793878054589.jpg",
  "pre-departure": "/src/assets/images/service_pre_departure_1793878055021.jpg"
};

const SERVICES_KPI_DATA: Record<string, { duration: string; cost: string; experience: string; englishReq: string; badge: string; overview: string }> = {
  "university-admissions": {
    duration: "2 - 8 Weeks",
    cost: "Full Profile Audit",
    experience: "Target: Elite Global Unis",
    englishReq: "IELTS/TOEFL Support",
    badge: "Points-Tested Academic Matching",
    overview: "Comprehensive 360-degree support for securing admissions in top-ranking universities worldwide."
  },
  "visa-guidance": {
    duration: "1 - 3 Months",
    cost: "98% Verified Success",
    experience: "Embassy Compliance Check",
    englishReq: "Full Mock Interviews",
    badge: "Direct Envoy Visa Processing",
    overview: "Meticulous verification of source of funds, cover letter layouts, and mock interviews."
  },
  "scholarship-assistance": {
    duration: "Varies by Eligibility",
    cost: "Merit & Need Based Filtering",
    experience: "Tuition Waivers & Stipends",
    englishReq: "SOP & LOR Audit Ready",
    badge: "State-Sponsored Funding Match",
    overview: "Active mapping of university scholarships, corporate support, and government fellowships."
  },
  "career-counseling": {
    duration: "1 - 2 Sessions",
    cost: "Psychometrics Assessment",
    experience: "Employment Trend Audits",
    englishReq: "Global Work Visa Alignment",
    badge: "Bespoke Career Mapping",
    overview: "Ensuring your study majors translate seamlessly into high-yield professions worldwide."
  },
  "test-prep": {
    duration: "4 - 6 Weeks Syllabus",
    cost: "Expert Instructors",
    experience: "High Band Achievement",
    englishReq: "Diagnostic Mocks Included",
    badge: "Linguistic Benchmark Optimization",
    overview: "Structured modules, speaking evaluations, and diagnostic reports to maximize your score."
  },
  "pre-departure": {
    duration: "Pre-Flight Briefings",
    cost: "Freshman Mentor Match",
    experience: "Banking & Housing Lease",
    englishReq: "Alumni Circles Support",
    badge: "Transition & Acculturation Guide",
    overview: "Everything you need to do before boarding - from health insurance to student quarters."
  }
};

export interface ServicesSectionProps {
  onBookService: (serviceName: string) => void;
  activeServiceId?: string;
  onNavigate?: (path: string) => void;
}

export function getServicePath(id: string): string {
  if (id === "pre-departure") return "/pre-departure-&-acculturation";
  return `/${id}`;
}

export default function ServicesSection({ 
  onBookService,
  activeServiceId,
  onNavigate
}: ServicesSectionProps) {
  const [localSelectedService, setLocalSelectedService] = useState<Service | null>(null);
  const [active360Step, setActive360Step] = useState(0);

  const selectedService = activeServiceId
    ? (SERVICES_DATA.find((srv) => srv.id === activeServiceId) || null)
    : localSelectedService;

  useEffect(() => {
    if (activeServiceId) {
      setLocalSelectedService(null);
    }
  }, [activeServiceId]);

  if (selectedService && activeServiceId) {
    const Icon = iconMap[selectedService.iconName] || GraduationCap;
    const kpis = SERVICES_KPI_DATA[selectedService.id] || {
      duration: "Flexible Timeline",
      cost: "Bespoke Evaluation",
      experience: "Guidance Included",
      englishReq: "Free Diagnostic Check",
      badge: "Premium Uni Help Service",
      overview: selectedService.description
    };

    return (
      <div className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-brand-gold-500 selection:text-brand-blue-950">
        
        {/* POLISHED HERO SECTION FOR SPECIFIC ACADEMIC SERVICE */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-brand-blue-950 via-slate-900 to-brand-blue-950 text-white overflow-hidden text-left">
          {/* Grids and flares */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0" />
          <div className="absolute -top-32 right-[-10%] w-[450px] h-[450px] rounded-full bg-brand-gold-500/10 blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back to Home / Services Directory link */}
            <button 
              onClick={() => {
                if (onNavigate) {
                  onNavigate("/");
                } else {
                  setLocalSelectedService(null);
                }
              }}
              className="inline-flex items-center gap-2 text-white/70 hover:text-brand-gold-400 font-bold text-xs uppercase tracking-wider mb-6 transition focus:outline-none cursor-pointer group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Services Listing</span>
            </button>

            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-brand-gold-400 text-[10px] font-bold tracking-wider uppercase">
                <Icon className="h-4 w-4" />
                <span>Uni Help Academic Offering</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white select-text">
                {selectedService.title}
              </h1>
              
              <p className="font-semibold text-brand-gold-400 font-mono text-xs sm:text-sm uppercase tracking-widest">
                🏆 Category: {kpis.badge}
              </p>

              <p className="text-base sm:text-lg text-brand-blue-105 max-w-3xl leading-relaxed select-text pt-2 font-semibold">
                {kpis.overview}
              </p>

              {/* Core Academic KPI badges row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-left">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">Timeframe</span>
                  <span className="text-sm sm:text-base font-bold text-brand-gold-400 mt-1 block">{kpis.duration}</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">Audit Focus</span>
                  <span className="text-sm sm:text-base font-bold text-white mt-1 block">{kpis.cost}</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">Core Deliverable</span>
                  <span className="text-sm sm:text-base font-bold text-white mt-1 block">{kpis.experience}</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">Assisted Prep</span>
                  <span className="text-sm sm:text-base font-bold text-white mt-1 block font-sans">{kpis.englishReq}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICE MAIN BODY CONTENT */}
        <section className="py-16 bg-slate-50 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Visual Details modules */}
              <div className="lg:col-span-8 space-y-12">
                
                {/* 1. Deep Insights & Strategic Execution */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 rounded-3xl p-6 sm:p-8 flex items-start gap-4 shadow-sm">
                  <div className="p-3 bg-white rounded-2xl shadow-sm border border-indigo-100 text-brand-blue-700 shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display font-extrabold text-lg text-slate-900">
                      Deep Insights & Strategic Execution
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed select-text">
                      {selectedService.longDescription}
                    </p>
                  </div>
                </div>

                {/* 2. Structured Process Timeline */}
                {selectedService.processTimeline && (
                  <div id="process-section" className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <div className="h-10 w-10 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center">
                        <Compass className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-extrabold text-xl text-slate-900">Projected Roadmap & Milestones</h3>
                        <p className="text-[11px] text-slate-500 font-sans tracking-wide">Meticulous timeline phases evaluated by our expert desks</p>
                      </div>
                    </div>
                    
                    <div className="relative border-l border-slate-200 ml-4 pl-6 space-y-8 py-2">
                      {selectedService.processTimeline.map((step, index) => {
                        const colonIndex = step.indexOf(":");
                        const title = colonIndex !== -1 ? step.substring(0, colonIndex) : `Phase ${index + 1}`;
                        const desc = colonIndex !== -1 ? step.substring(colonIndex + 1) : step;
                        return (
                          <div key={index} className="relative select-text">
                            <span className="absolute -left-[35px] top-0 h-6 w-6 rounded-full bg-brand-blue-700 text-white font-mono font-bold text-xs flex items-center justify-center shadow-md">
                              {index + 1}
                            </span>
                            <h4 className="font-display font-extrabold text-sm text-slate-900 mt-0.5">{title.trim()}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed mt-1.5">{desc.trim()}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. Required Documents */}
                {selectedService.requiredDocs && (
                  <div id="documents-section" className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <div className="h-10 w-10 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-extrabold text-xl text-slate-900">Required Documentary Evidence</h3>
                        <p className="text-[11px] text-slate-500 font-sans tracking-wide">Fulfill this dossier compilation to unlock admissions submission channels</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedService.requiredDocs.map((doc, index) => (
                        <div key={index} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex gap-3 select-text">
                          <div className="h-6 w-6 rounded-lg bg-white shadow-sm border border-slate-200/50 flex items-center justify-center text-slate-500 text-xs font-bold font-mono">
                            {index + 1}
                          </div>
                          <p className="text-xs text-slate-700 font-medium leading-relaxed">{doc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Core Benefits and Program Goals */}
                <div id="benefits-section" className="bg-gradient-to-br from-indigo-950 to-brand-blue-950 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl shadow-indigo-950/10">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="font-display font-bold text-xl text-white">Core deliverables & Key Benefits</h3>
                    <p className="text-white/60 text-[11px] font-sans">Why this program represents an ultimate advantage for your academic career</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedService.benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-3 text-white/90 select-text">
                        <div className="h-5 w-5 rounded-full bg-brand-gold-500/15 border border-brand-gold-500/30 flex items-center justify-center text-brand-gold-400 flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <p className="text-xs leading-relaxed">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
              
              {/* Right Column: Dynamic Inquiry Widget Sticky Side Card */}
              <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start space-y-6">
                
                {/* 1. Prompt Booking Card */}
                <div className="bg-white border-2 border-brand-blue-100 shadow-xl rounded-3xl p-6 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-brand-gold-400/5 rounded-full blur-xl pointer-events-none" />
                  
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest bg-brand-gold-500/10 text-brand-gold-600 border border-brand-gold-500/20 uppercase mb-4 select-none">
                    ⚡ DIRECT AGENT DISPATCH
                  </span>
                  
                  <h3 className="font-display font-extrabold text-lg text-slate-900 leading-tight">
                    Check Case Eligibility & Book Counselor
                  </h3>
                  
                  <p className="text-xs text-slate-500 leading-relaxed mt-2.5 select-text">
                    Academic systems and visa timelines change quickly. Speak to our physical desk officers at Lahore, Karachi, or Dubai to evaluate your scores, transcripts, and secure official casework representation instantly.
                  </p>

                  <div className="pt-4 space-y-3 border-t border-slate-100 mt-5">
                    <button
                      onClick={() => onBookService(selectedService.title)}
                      className="w-full py-3 bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-sans font-black text-xs uppercase tracking-wider rounded-xl transition duration-200 shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Contact className="h-4 w-4" />
                      Inquire About This Service
                    </button>
                    
                    <a
                      href="tel:+923417548178"
                      className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition border border-slate-200 flex items-center justify-center gap-2"
                    >
                      📞 Live Helpline Direct Call
                    </a>
                  </div>
                  
                  <div className="mt-4 text-[10px] text-center text-slate-400 flex items-center gap-1.5 justify-center">
                    <Info className="h-3 w-3" />
                    <span>Includes 100% Free Initial Assessment</span>
                  </div>
                </div>

                {/* 2. Service Quick Specs Card */}
                <div className="bg-slate-900 text-white rounded-3xl p-6 text-left relative overflow-hidden border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Service Metrics</span>
                  <div className="flex items-center gap-3 mt-2 pb-4 border-b border-slate-800">
                    <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center text-brand-gold-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-base leading-tight">Uni Help Consulting</h4>
                      <p className="text-[10px] text-slate-400 font-mono tracking-wide uppercase">Bespoke Academic Support</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Consultation Model:</span>
                      <span className="font-bold">One-on-One Personalized</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Expert Desk:</span>
                      <span className="font-bold text-brand-gold-400 text-right">Senior Education Officer</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Initial Assessment:</span>
                      <span className="font-bold text-emerald-400">100% Free Office Profile Audit</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

      </div>
    );
  }

  const counselingPhases = [
    {
      title: "Profile Assessment",
      label: "Evaluate & Match",
      description: "Analyze GPA, language scores, and career ambitions to align with premium, high-success institutions.",
      metric: "450+ Global Universities Evaluated Daily",
      badge: "Step 01 / Pre-Audit",
      iconName: "GraduationCap",
      color: "text-sky-500 bg-sky-500/10 border-sky-500/20",
      details: [
        "Unbiased matching across UK, USA, Canada, Australia & Europe",
        "Free initial eligibility audit conducted by senior counselors",
        "Comprehensive credit transfer assessment and timeline review"
      ],
      prefillInquiry: "360° Support Intake: Profile Assessment"
    },
    {
      title: "Exam & Score Mastery",
      label: "Standardized Prep",
      description: "Custom strategies, material drills, and mock sessions to guarantee key linguistic proficiency benchmarks.",
      metric: "Targeting Average Band 7.5+ IELTS",
      badge: "Step 02 / Diagnostics",
      iconName: "BookOpen",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      details: [
        "Diagnostic test prep for IELTS Academic, TOEFL, or Duolingo",
        "Personalized feedback sessions with senior language instructors",
        "Full simulation mocks with realistic timing and evaluation criteria"
      ],
      prefillInquiry: "360° Support Intake: Test Preparation"
    },
    {
      title: "SOP & Essay Advisory",
      label: "Dossier Polish",
      description: "Our board reviews, restructures, and polishes your statement of purpose to capture your core leadership potential.",
      metric: "100% Tailored Portfolios (No AI Templates)",
      badge: "Step 03 / Portfolio",
      iconName: "FileCheck",
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
      details: [
        "Statement of Purpose (SOP) styling, structures and proofreading",
        "Helper tutorials to file custom CV and Letter of recommendation matrices",
        "Expert assistance targeting top tier academic selection teams"
      ],
      prefillInquiry: "360° Support Intake: SOP & Essay Services"
    },
    {
      title: "Scholarship Scouting",
      label: "Bursaries & Grants",
      description: "Scan active global registers to match qualifying students with regional scholarships and full/partial waivers.",
      metric: "$4.5M+ Cumulative Direct Grants Secured",
      badge: "Step 04 / Funding",
      iconName: "Coins",
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      details: [
        "Active monitoring of state-sponsored, co-funded and university grants",
        "Need-based and merit-based application guidelines",
        "Specialized assistance in compiling competitive scholarship essays"
      ],
      prefillInquiry: "360° Support Intake: Scholarships Match"
    },
    {
      title: "Visa Compliance Liaison",
      label: "Embassy Clearance",
      description: "Unraveling complex state requirements by auditing financial statements, preparing documents, and running simulated mocks.",
      metric: "98.7% Certified Consulate Pass Success Rate",
      badge: "Step 05 / Compliance",
      iconName: "PlaneTakeoff",
      color: "text-violet-500 bg-violet-500/10 border-violet-500/20",
      details: [
        "Strict verification of source of funds, bank letters, and legal declarations",
        "Simulated embassy mock interviews with experienced immigration officials",
        "Full cover letters and checklist audits customized for specific visa streams"
      ],
      prefillInquiry: "360° Support Intake: Visa Support"
    },
    {
      title: "Landing & Acculturation",
      label: "Pre-Flight & Housing",
      description: "Complete pre-departure advice on native bank accounts setup, health insurance, and secure student hostels.",
      metric: "15+ International Senior Alumni Networks",
      badge: "Step 06 / Relocation",
      iconName: "Compass",
      color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
      details: [
        "Pre-flight briefings on campus life, culture, weather, and legal regulations",
        "Assistance in securing certified student accommodation near the campus",
        "Immediate match with local senior student alumni mentors in your destination"
      ],
      prefillInquiry: "360° Support Intake: Pre-Departure Services"
    }
  ];

  const localPhaseIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    GraduationCap,
    BookOpen,
    FileCheck,
    Coins,
    PlaneTakeoff,
    Compass
  };

  const activePhase = counselingPhases[active360Step];
  const ActivePhaseIcon = localPhaseIcons[activePhase.iconName] || GraduationCap;

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      
      {/* Decorative Grids & Spotlights */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] rounded-full bg-brand-blue-600/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] rounded-full bg-brand-gold-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 relative">
          {/* Left Column: Text Content & Trust Badges */}
          <div className="lg:col-span-7 text-left space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold text-brand-gold-600 bg-brand-gold-500/10 border border-brand-gold-500/20 uppercase tracking-widest">
              <Sparkles className="h-3 w-3 fill-brand-gold-500/20" />
              <span>Premium Admissions Ecosystem</span>
            </div>
            
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-brand-blue-950 tracking-tight leading-[1.12]">
              Comprehensive 360° Academic Counseling & Visas Support
            </h2>
            
            <div className="h-1 w-20 bg-gradient-to-r from-brand-blue-600 to-brand-green-600 rounded-full" />
            
            <p className="font-sans text-gray-500 text-sm sm:text-base leading-relaxed">
              Every candidate is unique. We deploy a synchronous, end-to-end global counseling pipeline to optimize your credentials, edit your statement of purpose essays, audit complex bank transcripts, and guide you through simulated visa consulate interviews. 
            </p>

            {/* Trust Indicator Badges */}
            <div className="flex flex-wrap gap-2.5 pt-3">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100/80 text-emerald-800 text-xs font-sans font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>98.7% Certified Visa Success</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-sky-50 border border-sky-100/80 text-sky-800 text-xs font-sans font-medium">
                <GraduationCap className="h-4 w-4 text-sky-600" />
                <span>450+ Partner Universities</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-100/80 text-amber-800 text-xs font-sans font-medium">
                <Award className="h-4 w-4 text-amber-600" />
                <span>100% Personal Tailored Profiles</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Photographic Education Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group/img w-full max-w-[420px] aspect-[4/3] rounded-3xl p-2.5 bg-gradient-to-b from-slate-100 to-slate-200/50 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              {/* Backing visual glows */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue-600/5 via-brand-gold-500/5 to-transparent rounded-3xl opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative w-full h-full rounded-[18px] overflow-hidden bg-slate-100 border border-white">
                <img
                  src={ACADEMIC_COUNSELING_HEADER_IMAGE}
                  alt="Vibrant international students working together on academic counseling and applications"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.04]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Micro Metadata Tag */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-brand-blue-950/95 backdrop-blur-md rounded-lg border border-white/10 text-[9px] font-mono font-bold tracking-wider text-brand-gold-400 shadow-lg">
                  VERIFIED ECOSYSTEM
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* NEW HIGH-FIDELITY INTERACTIVE 360° JOURNEY CORE PLATFORM */}
        {/* ========================================================================= */}
        <div className="mb-20 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#a88d3b]">Admissions Lifecycle Visualizer</span>
            <h3 className="font-display font-medium text-lg sm:text-xl text-slate-800">Explore our structured phases from pre-audit to landing</h3>
            <p className="text-xs text-slate-400">Click any milestone below to see standard deliverables & real metrics:</p>
          </div>

          {/* Stepper horizontal ribbon link */}
          <div className="relative mb-10 overflow-x-auto pb-4 scrollbar-thin">
            {/* Connection Line */}
            <div className="absolute hidden md:block h-0.5 bg-slate-200/70 top-[26px] left-[8%] right-[8%] -z-10" />

            <div className="flex md:grid md:grid-cols-6 gap-4 min-w-[700px] px-2">
              {counselingPhases.map((phase, idx) => {
                const PhaseIcon = localPhaseIcons[phase.iconName] || GraduationCap;
                const isActive = active360Step === idx;
                
                return (
                  <button
                    key={idx}
                    onClick={() => setActive360Step(idx)}
                    className="flex-1 flex flex-col items-center text-center focus:outline-none group cursor-pointer"
                  >
                    {/* Circle Sphere */}
                    <div className={`h-14 w-14 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                      isActive 
                        ? "bg-slate-900 border-brand-gold-500 text-brand-gold-400 shadow-lg shadow-brand-gold-500/15 scale-110" 
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-400 hover:bg-slate-100 group-hover:scale-105"
                    }`}>
                      <PhaseIcon className="h-5 w-5 stroke-[2]" />
                    </div>
                    {/* Step Labels */}
                    <span className={`text-[11px] font-display font-bold uppercase tracking-wider mt-3 transition-colors ${
                      isActive ? "text-slate-900 font-extrabold" : "text-slate-500 group-hover:text-slate-800"
                    }`}>
                      {phase.title.split(" & ").pop()?.split(" ").slice(0, 2).join(" ")}
                    </span>
                    <span className="text-[9px] text-slate-400 mt-0.5 block md:hidden lg:block font-sans">
                      {phase.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Central presentation command card */}
          <div className="relative bg-slate-950 text-white rounded-2xl p-6 sm:p-8 md:p-10 border border-slate-900 shadow-2xl overflow-hidden transition-all duration-300">
            {/* Glow backing */}
            <div className="absolute top-0 right-0 h-48 w-48 bg-brand-gold-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-48 w-48 bg-brand-blue-600/5 rounded-full blur-2xl pointer-events-none" />

            {/* Glowing top line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue-600 via-brand-gold-500 to-brand-green-600" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left Column Description */}
              <div className="md:col-span-7 space-y-5 text-left">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-brand-gold-400 border border-white/5">
                    <ActivePhaseIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">{activePhase.badge}</span>
                    <h4 className="font-display font-bold text-xl sm:text-2xl text-white mt-0.5">{activePhase.title}</h4>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans font-medium">
                  {activePhase.description}
                </p>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-brand-gold-400 block">Performance Index metric</span>
                  <p className="text-sm sm:text-base font-display font-bold text-white mt-1 flex items-center gap-2">
                    <Award className="h-4.5 w-4.5 text-brand-gold-500 shrink-0" />
                    <span>{activePhase.metric}</span>
                  </p>
                </div>
              </div>

              {/* Right Column Custom Actions & Details */}
              <div className="md:col-span-5 space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3.5 text-left backdrop-blur-sm">
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#a88d3b] flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Core Action Deliverables</span>
                  </h5>
                  <ul className="space-y-2.5">
                    {activePhase.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-200">
                        <Check className="h-4 w-4 text-[#a88d3b] shrink-0 mt-0.5" />
                        <span className="leading-tight font-sans text-slate-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    onBookService(activePhase.title);
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      const offset = 85;
                      const scrollPos = contactSection.getBoundingClientRect().top + window.pageYOffset - offset;
                      window.scrollTo({ top: scrollPos, behavior: "smooth" });
                    }
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-brand-gold-500 to-amber-500 hover:from-brand-gold-400 hover:to-amber-400 text-brand-blue-950 font-sans font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-brand-gold-500/10 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:scale-98"
                >
                  <span>Inquire For This Step</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Roster Title Separator */}
        <div className="text-center mb-10">
          <h3 className="font-display font-medium text-lg uppercase tracking-wider text-slate-400">Core Individual Offering Portfolios</h3>
          <p className="text-xs text-slate-400 mt-1">Deep-dive into specialized modules for direct secure applications:</p>
        </div>

        {/* Dynamic Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service, idx) => {
            const Icon = iconMap[service.iconName] || GraduationCap;
            return (
              <div
                key={service.id}
                id={`service-card-${idx}`}
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-brand-blue-300 hover:-translate-y-1.5 flex flex-col justify-between text-left"
              >
                {/* Visual Image Header */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={SERVICE_IMAGES[service.id] || ACADEMIC_COUNSELING_HEADER_IMAGE}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = ACADEMIC_COUNSELING_HEADER_IMAGE;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
                  
                  {/* Floating Icon Frame & Tag */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-white/95 backdrop-blur-md text-brand-blue-600 shadow-md flex items-center justify-center border border-white/60">
                      <Icon className="h-5 w-5 stroke-[2]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-brand-gold-300 uppercase bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                      {SERVICES_KPI_DATA[service.id]?.duration || "Guided Phase"}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-lg text-brand-blue-950 group-hover:text-brand-blue-600 transition-colors duration-200">
                      {service.title}
                    </h4>
                    <p className="font-sans text-xs text-gray-500 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Benefits Pill Badges (First 2) */}
                  <div className="pt-3 flex flex-wrap gap-1.5 border-t border-slate-100">
                    {service.benefits.slice(0, 2).map((benefit, bIdx) => (
                      <span
                        key={bIdx}
                        className="inline-block text-[10px] font-sans font-medium text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-150"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

                  {/* Actions Row */}
                  <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (onNavigate) {
                          onNavigate(getServicePath(service.id));
                        } else {
                          setLocalSelectedService(service);
                        }
                      }}
                      id={`service-details-btn-${service.id}`}
                      className="text-xs font-sans font-bold text-brand-blue-600 hover:text-brand-blue-800 flex items-center gap-1 focus:outline-none cursor-pointer"
                    >
                      <Info className="h-3.5 w-3.5" />
                      Read Deep Details
                    </button>

                    <button
                      onClick={() => onBookService(service.title)}
                      id={`service-select-btn-${service.id}`}
                      className="h-9 w-9 rounded-full bg-slate-50 text-slate-600 border border-slate-200/60 group-hover:bg-brand-gold-500 group-hover:border-transparent group-hover:text-brand-blue-950 flex items-center justify-center group-hover:shadow transition-all duration-300 transform active:scale-95 cursor-pointer"
                      title="Select Service"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* High-Fidelity Details Overlay Modal */}
      {selectedService && (
        <div
          id="service-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-blue-950/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setLocalSelectedService(null)}
        >
          <div
            id="service-detail-modal"
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-2xl w-full p-6 sm:p-8 space-y-6 relative overflow-hidden animate-in zoom-in-95 duration-200 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Accents */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-brand-blue-600 via-brand-gold-400 to-brand-green-700" />

            <button
              onClick={() => setLocalSelectedService(null)}
              id="close-service-modal"
              className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-700 transition"
              aria-label="Close Modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title / Description */}
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-brand-blue-50 text-brand-blue-600 flex items-center justify-center shrink-0">
                {React.createElement(iconMap[selectedService.iconName] || GraduationCap, { className: "h-6 w-6" })}
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-xl text-brand-blue-950">
                  {selectedService.title}
                </h3>
                <p className="text-xs font-mono text-brand-blue-800 uppercase tracking-wide">
                  Core Counseling Offering
                </p>
              </div>
            </div>

            {/* Core Body */}
            <div className="space-y-3">
              <p className="font-sans text-sm text-gray-700 leading-relaxed font-semibold">
                {selectedService.description}
              </p>
              <p className="font-sans text-xs text-gray-500 leading-relaxed border-l-2 border-brand-blue-600 pl-3 py-1">
                {selectedService.longDescription}
              </p>
            </div>

            {/* Split Grid for Timelines and Documentation Checks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-gray-100">
              
              {/* Left Column: Timeline */}
              {selectedService.processTimeline && (
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-blue-900 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-brand-gold-500" />
                    Admissions Process & Roadmap
                  </h4>
                  <div className="space-y-3 pl-2 border-l border-gray-100">
                    {selectedService.processTimeline.map((step, sIdx) => (
                      <div key={sIdx} className="relative pl-4 text-xs">
                        <div className="absolute top-1 left-[-16px] h-2.5 w-2.5 rounded-full bg-white border-2 border-brand-blue-600" />
                        <span className="text-gray-600 font-sans leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Right Column: Required Documents */}
              {selectedService.requiredDocs && (
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-green-700 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-brand-green-600" />
                    Required Dossier Checklists
                  </h4>
                  <ul className="space-y-2.5 pl-1">
                    {selectedService.requiredDocs.map((doc, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-brand-green-600 shrink-0 mt-0.5" />
                        <span className="font-sans leading-tight">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* Benefits detail highlights list */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-[#a88d3b]">
                Key Service Deliverables Summary:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.benefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-brand-blue-600 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Consultation Trigger redirection button */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-end items-stretch sm:items-center">
              <button
                onClick={() => setLocalSelectedService(null)}
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold text-center transition"
              >
                Close View
              </button>
              
              <button
                onClick={() => {
                  onBookService(selectedService.title);
                  setLocalSelectedService(null);
                }}
                id="modal-request-cta"
                className="px-5 py-2.5 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-950 rounded-lg text-xs font-bold text-center transition flex items-center justify-center gap-1.5"
              >
                Inquire For This Service
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
