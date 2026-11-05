import React, { useState } from "react";
import { scholarshipsList, Scholarship } from "../scholarshipsData";
import { 
  GraduationCap, 
  MapPin, 
  Award, 
  Search, 
  ArrowLeft, 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle, 
  PhoneCall, 
  Sparkles, 
  BookOpen, 
  Globe,
  Compass,
  FileText,
  Contact,
  Info
} from "lucide-react";

interface ScholarshipDetailPageProps {
  activeScholarshipId: string;
  onNavigateHome: () => void;
  onSelectScholarship: (id: string) => void;
  onConsult: (scholarshipName: string) => void;
}

export default function ScholarshipDetailPage({ 
  activeScholarshipId, 
  onNavigateHome, 
  onSelectScholarship,
  onConsult 
}: ScholarshipDetailPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const scholarship = scholarshipsList.find(s => s.id === activeScholarshipId) || scholarshipsList[0];

  const faqs = [
    {
      q: `Who is eligible to apply for the ${scholarship.name}?`,
      a: `The ${scholarship.name} primarily targets outstanding candidates applying for ${scholarship.level} programs. Eligibility requirements demand a strong academic standing, high scores in language or admissions tests, and stellar recommendations matching standard criteria for candidates targeting ${scholarship.country}.`,
      support: "Our team conducts a 100% free comprehensive eligibility assessment, verifying your academic transcripts, target score markers, and timeline constraints."
    },
    {
      q: `What is the financial value covered by this award?`,
      a: `The ${scholarship.name} offers a financial status/tier of "${scholarship.value}". This can encompass full or partial tuition coverage, monthly living cost allowances, textbook support, and sometimes return airfare, depending on the academic target intake.`,
      support: "Uni Help guides you through optimal budgeting, university financial declarations, and co-funding/bursary alignments to minimize hidden expenses."
    },
    {
      q: `Does the ${scholarship.name} require a prior admission letter from a university in ${scholarship.country}?`,
      a: `In most cases, yes. To secure and activate the ${scholarship.name}, you must hold an active or conditional letter of admission from an eligible partner institution or university department within ${scholarship.country}.`,
      support: "We manage your entire rapid-admission application workflow with top global partner universities, fast-tracking your offer letters."
    },
    {
      q: `How does Uni Help assist in writing a persuasive Statement of Purpose (SOP) or Study Plan for this program?`,
      a: `Winning essays for prestigious awards like ${scholarship.name} must tell a cohesive story of leadership, community development, and academic passion that directly aligns with the developmental goals of ${scholarship.category}.`,
      support: "Our editing desks provide customized, multi-stage proofreading, structural grooming, and semantic enhancement to craft compelling SOPs."
    },
    {
      q: `Are there language proficiency tests required for study under this scholarship?`,
      a: `Yes, for international admission in ${scholarship.country}, standard language test evidence (IELTS, TOEFL, or PTE Academic) is typically mandatory. Universities look for solid scores, often a minimum of 6.5 or 7.0 band score.`,
      support: "All registered Uni Help candidates receive free access to our premium IELTS preparation courses, structured exam mock tests, and training drills."
    },
    {
      q: `What is the ideal timeline to launch my application with Uni Help?`,
      a: `Scholarship programs have strict, early deadlines. For the ${scholarship.name}, compiling and reviewing all reference letters, research proposals, and translations should begin at least 6 to 8 months in advance.`,
      support: "We set up an automated individual milestones tracker for you, ensuring every form, endorsement, and transcript is submitted flawlessly ahead of time."
    },
    {
      q: `Are there return-home or bond commitments with this scholarship?`,
      a: `Some prestigious international awards (especially within ${scholarship.category}) require students to return to their home countries for a minimum period of 2 years to apply their global learning and lead local developmental initiatives.`,
      support: "Our counselors clarify all terms, ensuring your long-term career aspirations are fully strategized within legal framework constraints."
    },
    {
      q: `What is the structure of the interview panel, and how do I prepare?`,
      a: `The selection committee conducts highly technical and competency-focused panel interviews for selected students. Evaluators assess your adaptability, depth of knowledge, and passion for representing ${scholarship.country} academic values.`,
      support: "We organize simulated panel mock interviews with seasoned education consults and alumni, perfecting your speech, poise, and technical responses."
    },
    {
      q: `If my profile doesn't perfectly match the ${scholarship.name}, what alternative scholarships can I pursue?`,
      a: `If the fit is slightly off, dozens of high-value alternative scholarships and bursary schemes are available in our active global database of regional awards.`,
      support: "Using our proprietary directory of 450+ universities, we dynamically curate secondary list options best suited to secure financial coverage for your grades."
    },
    {
      q: `How do I officially begin my scholarship application process with Uni Help?`,
      a: `You can initiate your process instantly by clicking the "Inquire For This Scholarship" button, calling our direct support hotline, or visiting one of our dedicated physical advisory branches.`,
      support: "From the initial free document screening up to final visa success, we assign a dedicated senior liaison to manage your complete scholarship journey."
    }
  ];

  // Group similar scholarships for the side recommendation rail
  const relatedScholarships = scholarshipsList
    .filter(s => s.category === scholarship.category && s.id !== scholarship.id)
    .slice(0, 5);

  const filteredList = scholarshipsList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "UK & Europe", "USA & Canada", "Australia & Asia", "Global & International"];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-brand-gold-500 selection:text-brand-blue-950 text-left" id="scholarship-detail-view">
      
      {/* POLISHED HERO SECTION FOR SPECIFIC SCHOLARSHIP */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-brand-blue-950 via-slate-900 to-brand-blue-950 text-white overflow-hidden text-left">
        {/* Grids and flares */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0" />
        <div className="absolute -top-32 right-[-10%] w-[450px] h-[450px] rounded-full bg-brand-gold-500/10 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back to Home / Scholarships Listing link */}
          <button 
            onClick={onNavigateHome}
            id="back-to-home-from-scholarships-btn"
            className="text-white/70 hover:text-brand-gold-400 font-bold text-xs uppercase tracking-wider mb-6 transition focus:outline-none cursor-pointer group inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Global Counsel Home</span>
          </button>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-brand-gold-400 text-[10px] font-bold tracking-wider uppercase">
              <Award className="h-4 w-4 text-brand-gold-400" />
              <span>Scholarship Award Program</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white select-text animate-fade-in">
              {scholarship.name}
            </h1>
            
            <p className="font-semibold text-brand-gold-400 font-mono text-xs sm:text-sm uppercase tracking-widest text-left">
              🏆 Value: {scholarship.value}
            </p>

            <p className="text-base sm:text-lg text-brand-blue-105 max-w-3xl leading-relaxed select-text pt-2 font-semibold">
              {scholarship.description}
            </p>

            {/* Core Scholarship KPI badges row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-left">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">Target Region</span>
                <span className="text-xs sm:text-sm font-bold text-brand-gold-400 mt-1 block truncate">
                  {scholarship.category}
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">Target Country</span>
                <span className="text-xs sm:text-sm font-bold text-white mt-1 block truncate">
                  {scholarship.country}
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">Academic Level</span>
                <span className="text-xs sm:text-sm font-bold text-white mt-1 block h-auto truncate">
                  {scholarship.level}
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">Scholarship Standing</span>
                <span className="text-xs sm:text-sm font-bold text-white mt-1 block font-sans truncate">
                  {scholarship.value.split(" (")[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BODY CONTENT SECTION */}
      <section className="py-12 bg-slate-50 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 1. Global Academic Scholarships Directory (The in-page Search & filter) */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60 mb-10 text-left">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-display font-extrabold text-brand-blue-950 tracking-tight">
                  Global Academic Scholarships Directory
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Explore comprehensive support pipelines for 44 prestigious worldwide awards
                </p>
              </div>
              
              {/* Actionable interactive controls */}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto flex-1 max-w-2xl justify-end">
                <div className="relative flex-1 sm:max-w-xs">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search 44 scholarships..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold-500/30 focus:border-brand-gold-500 transition-all font-sans"
                    id="scholarship-search-input"
                  />
                </div>

                {/* Quick filter dropdown */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold-500/30 focus:border-brand-gold-500 transition-all font-sans font-medium text-gray-700"
                  id="scholarship-category-select"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick search hints / direct badges if search is active */}
            {(searchQuery || selectedCategory !== "All") && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Matching Directory Results ({filteredList.length})
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-2 custom-scrollbar">
                  {filteredList.map(s => (
                    <button
                      key={s.id}
                      onClick={() => {
                        onSelectScholarship(s.id);
                        setSearchQuery("");
                      }}
                      className={`text-[11px] px-3 py-1.5 rounded-lg transition-all text-left ${
                        s.id === scholarship.id 
                          ? "bg-brand-gold-500 text-brand-blue-950 font-bold" 
                          : "bg-gray-100 text-gray-700 hover:bg-brand-blue-50 hover:text-brand-blue-900"
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                  {filteredList.length === 0 && (
                    <span className="text-xs text-gray-500 italic py-2">
                      No scholarships found matching "{searchQuery}" under {selectedCategory} region.
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Main detail Layout split: Detail content vs. categories sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Main content block - 8 cols */}
            <div className="lg:col-span-8 space-y-8">
            
            {/* Core highlights and criteria */}
            <div id="highlights-section" className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="h-10 w-10 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl text-slate-900">Scholarship Key Highlights & Criteria</h3>
                  <p className="text-[11px] text-slate-500 font-sans tracking-wide">Key requirements, age specifications, and funding values</p>
                </div>
              </div>

              <div className="space-y-4">
                {scholarship.keyHighlights.map((hl, index) => (
                  <div key={index} className="flex gap-4 items-start select-text">
                    <span className="h-6 w-6 rounded-full bg-brand-blue-75/30 border border-brand-blue-100 text-brand-blue-800 font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                      {index + 1}
                    </span>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">{hl}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Highlight Section: How Uni Help is helpful for this scholarship */}
            <div className="bg-brand-blue-950 rounded-3xl overflow-hidden shadow-xl text-white relative">
              {/* Mesh visual overlay background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold-500/5 rounded-full blur-[90px] pointer-events-none" />

              <div className="p-8 sm:p-10 space-y-8 relative z-10">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-brand-gold-500/10 text-brand-gold-400 border border-brand-gold-500/20 uppercase select-none">
                    ⭐ ADVANTAGE & PLACEMENT SUPPORT
                  </span>
                  <h2 className="text-xl sm:text-2xl font-display font-black tracking-tight text-white leading-tight">
                    How Uni Help Consultants Maximizes Your Chances
                  </h2>
                  <p className="text-xs text-brand-blue-100 leading-relaxed font-sans max-w-2xl">
                    Our team of certified admissions coaches, IELTS specialists, and international advisory boards work side-by-side with candidates to build robust portfolios that outshine other applications.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {scholarship.howUniHelpHelps.map((point, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-2xl border border-white/5 text-left flex gap-3 group hover:border-brand-gold-400/20 hover:bg-white/10 transition-all duration-300">
                      <div className="h-8 w-8 rounded-lg bg-brand-gold-400 text-brand-blue-950 flex items-center justify-center font-mono font-bold text-xs shrink-0 select-none">
                        {index + 1}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-brand-gold-400">
                          Step {index + 1} Core Asset Grooming
                        </h4>
                        <p className="text-[11px] text-brand-blue-105 leading-relaxed font-sans select-text">
                          {point}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Instant lead-capture CTA card */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-1 text-left">
                    <p className="text-xs font-bold text-brand-gold-400 flex items-center gap-1.5">
                      <PhoneCall className="h-3.5 w-3.5 animate-pulse" />
                      Free Consultation Booking
                    </p>
                    <p className="text-[11px] text-brand-blue-150 leading-relaxed font-sans max-w-lg">
                      Ready to start your application dossier under our professional care? Speak to our team of specialized counselors for {scholarship.name}.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => onConsult(scholarship.name)}
                    className="px-6 py-3 bg-brand-gold-400 hover:bg-brand-gold-500 text-brand-blue-950 font-sans font-black text-xs uppercase tracking-wider rounded-xl transition duration-300 shadow-lg cursor-pointer transform active:scale-95 text-center shrink-0 w-full sm:w-auto"
                    id="scholarship-contact-action-btn"
                  >
                    Inquire For This Scholarship
                  </button>
                </div>

              </div>
            </div>

            {/* INTERACTIVE 10 FAQS ACCORDION SECTION */}
            <div id="scholarship-faqs-section" className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-left">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="h-10 w-10 bg-brand-gold-50 text-brand-gold-600 rounded-2xl flex items-center justify-center">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl text-slate-900">Frequently Asked Questions (10 Core Insights)</h3>
                  <p className="text-[11px] text-slate-500 font-sans tracking-wide">
                    Specific guidelines and how Uni Help provides professional support for {scholarship.name}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`border border-slate-200/70 rounded-2xl transition-all duration-300 overflow-hidden ${
                        isOpen ? "bg-slate-50/50 border-brand-blue-200 shadow-sm" : "bg-white hover:border-slate-300"
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left font-sans font-bold text-slate-800 text-xs sm:text-sm hover:text-brand-blue-800 focus:outline-none transition group select-none gap-4"
                        id={`faq-toggle-btn-${idx}`}
                        aria-expanded={isOpen}
                      >
                        <span className="flex items-start gap-3">
                          <span className="font-mono text-xs text-brand-gold-500 font-extrabold tracking-wider select-none mt-0.5">
                            {(idx + 1).toString().padStart(2, '0')}
                          </span>
                          <span className="leading-snug select-text">{faq.q}</span>
                        </span>
                        <ChevronRight 
                          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 group-hover:text-brand-blue-700 ${
                            isOpen ? "rotate-90 text-brand-blue-700" : ""
                          }`} 
                        />
                      </button>

                      {/* Accordion expand block */}
                      <div 
                        className={`transition-all duration-300 ${
                          isOpen ? "max-h-[500px] opacity-100 border-t border-slate-100/80 px-5 py-4" : "max-h-0 opacity-0 pointer-events-none"
                        }`}
                      >
                        <p className="text-xs sm:text-[13px] text-slate-650 leading-relaxed font-sans select-text hover:text-slate-800 transition-colors">
                          {faq.a}
                        </p>

                        {/* Uni Help Support breakout card */}
                        <div className="mt-4 p-4 bg-gradient-to-r from-brand-gold-500/10 to-brand-gold-500/[0.03] border-l-4 border-brand-gold-500 rounded-r-xl flex gap-3 items-start relative overflow-hidden">
                          <Sparkles className="h-4.5 w-4.5 text-brand-gold-600 shrink-0 mt-0.5 animate-pulse" />
                          <div className="space-y-1 text-left">
                            <span className="text-[10px] sm:text-[10.5px] font-bold text-brand-gold-700 uppercase tracking-widest block font-sans select-none">
                              🛡️ UNI HELP PREMIUM SUPPORT PATHWAY
                            </span>
                            <p className="text-xs text-slate-750 font-bold leading-relaxed font-sans select-text">
                              {faq.support}
                            </p>
                          </div>
                          {/* Radial ambient glow decoration */}
                          <div className="absolute top-0 right-0 h-16 w-16 bg-brand-gold-500/5 rounded-full blur-md pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right sidebar block - 4 cols */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start space-y-6">
            
            {/* Direct Booking/Inquiry Card */}
            <div className="bg-white border-2 border-brand-blue-100 shadow-xl rounded-3xl p-6 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 h-24 w-24 bg-brand-gold-400/5 rounded-full blur-xl pointer-events-none" />
              
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest bg-brand-gold-500/10 text-brand-gold-600 border border-brand-gold-500/20 uppercase mb-4 select-none">
                ⚡ SCHOLARSHIP LIAISON
              </span>
              
              <h3 className="font-display font-extrabold text-lg text-slate-900 leading-tight">
                Secure Eligibility & Consult Counselor
              </h3>
              
              <p className="text-xs text-slate-500 leading-relaxed mt-2.5 select-text font-sans">
                Scholarship deadlines and financial eligibility constraints are strictly enforced by global universities. Talk to our specialized counselors at Lahore, Karachi, or Dubai to evaluate your grade average point and draft professional research proposals.
              </p>

              <div className="pt-4 space-y-3 border-t border-slate-100 mt-5">
                <button
                  onClick={() => onConsult(scholarship.name)}
                  className="w-full py-3 bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-sans font-black text-xs uppercase tracking-wider rounded-xl transition duration-200 shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  id="scholarship-contact-action-btn"
                >
                  <Contact className="h-4 w-4" />
                  Inquire For This Scholarship
                </button>
                
                <a
                  href="tel:+923417548178"
                  className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition border border-slate-200 flex items-center justify-center gap-2"
                >
                  📞 Live Helpline Direct Call
                </a>
              </div>
              
              <div className="mt-4 text-[10px] text-center text-slate-400 flex items-center gap-1.5 justify-center font-sans">
                <Info className="h-3 w-3" />
                <span>Includes 100% Free Scholarship Audit</span>
              </div>
            </div>

            {/* Regional directory selector map */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Region Fast Finder
              </h3>
              <div className="flex flex-col gap-1.5">
                {categories.filter(c => c !== "All").map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      // Scroll to top of directory searching bar
                      const elem = document.getElementById("scholarship-search-input");
                      if (elem) elem.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl text-left text-xs font-sans font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat 
                        ? "bg-brand-blue-50 text-brand-blue-900 border-l-4 border-brand-blue-900" 
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>{cat} Directory</span>
                    <span className="text-[9px] bg-gray-100 text-gray-500 font-mono px-2 py-0.5 rounded-full font-bold">
                      {scholarshipsList.filter(s => s.category === cat).length} Awards
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Related Scholarships Rail */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Related {scholarship.category} Awards
                </h3>
                <p className="text-[10px] text-gray-400 font-sans">
                  Other prominent options in the same geographic category
                </p>
              </div>

              <div className="divide-y divide-gray-100">
                {relatedScholarships.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onSelectScholarship(s.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full text-left py-3 flex gap-2.5 items-start font-sans group hover:bg-slate-50 rounded-lg px-2 transition-all cursor-pointer"
                  >
                    <BookOpen className="h-4 w-4 text-brand-gold-550 mt-0.5 shrink-0" />
                    <div className="space-y-0.5 flex-1 min-w-0 font-sans">
                      <h4 className="text-xs font-bold text-brand-blue-955 truncate group-hover:text-brand-blue-700 transition-colors">
                        {s.name}
                      </h4>
                      <p className="text-[10px] text-gray-405 font-mono truncate">
                        {s.country} • {s.level}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-305 mt-1 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Consultation Promo Box */}
            <div className="bg-gradient-to-br from-brand-blue-900 to-brand-blue-950 text-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold-400/5 rounded-full blur-[40px] pointer-events-none" />
              <div className="relative z-10 space-y-4 text-left">
                <h4 className="font-display font-extrabold text-sm text-brand-gold-400">
                  Join 10,000+ Successful Scholars
                </h4>
                <p className="text-[11px] text-brand-blue-100 font-sans leading-relaxed">
                  Our candidates have won hundreds of millions in financial aids and fee waivers globally. Get continuous profiling audits, study proposals, mock interview simulations and visa preparation today!
                </p>
                <div className="pt-2 text-xs">
                  <div className="flex items-center gap-2 text-brand-blue-200">
                    <CheckCircle2 className="h-4 w-4 text-brand-gold-400" />
                    <span>Free Profile Diagnostic</span>
                  </div>
                  <div className="flex items-center gap-2 text-brand-blue-200 mt-1">
                    <CheckCircle2 className="h-4 w-4 text-brand-gold-400" />
                    <span>Liaison with 450+ Universities</span>
                  </div>
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
