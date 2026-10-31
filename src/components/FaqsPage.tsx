import React, { useState } from "react";
import { faqsList, FAQItem } from "../faqsData";
import { 
  Search, 
  HelpCircle, 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  CheckCircle2, 
  GraduationCap, 
  Award, 
  FileText, 
  BookOpen, 
  Home 
} from "lucide-react";

interface FaqsPageProps {
  onNavigateHome: () => void;
  onConsult: (question: string) => void;
}

export default function FaqsPage({ onNavigateHome, onConsult }: FaqsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const categories = [
    "All",
    "Admissions & General",
    "Scholarships & Funding",
    "Visas & Immigration",
    "Test Preparation",
    "Services & Logistics"
  ];

  const filteredFaqs = faqsList.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (id: string) => {
    if (expandedFaqId === id) {
      setExpandedFaqId(null);
    } else {
      setExpandedFaqId(id);
    }
  };

  // Quick stats computed on the fly
  const countByCategory = (cat: string) => {
    if (cat === "All") return faqsList.length;
    return faqsList.filter(f => f.category === cat).length;
  };

  return (
    <div id="comprehensive-faqs-view" className="bg-slate-50 min-h-screen pb-20">
      
      {/* 1. Header Hero Area */}
      <section className="bg-brand-blue-950 text-white relative py-20 overflow-hidden text-left" id="faqs-hero-block">
        {/* Animated ambient mesh decorators */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-brand-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          
          {/* Back Home Link */}
          <button 
            onClick={onNavigateHome}
            id="back-home-from-faqs-btn"
            className="inline-flex items-center gap-2 text-brand-gold-400 hover:text-brand-gold-300 font-sans font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer group w-fit"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Global Counsel Home</span>
          </button>

          <div className="space-y-3 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-brand-gold-500/10 text-brand-gold-400 border border-brand-gold-500/20 uppercase select-none">
              🛡️ COMPREHENSIVE REPOSITORY
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight select-text">
              Frequently Asked <span className="text-brand-gold-400">Questions</span>
            </h1>
            <p className="text-xs sm:text-sm text-brand-blue-105 leading-relaxed font-sans select-text">
              Explore 50 comprehensive questions and answers addressing international studies admissions, fully funded scholarship pathways, student visa block accounts, and pre-departure setups curated by certified Uni Help Advisors.
            </p>
          </div>

          {/* Quick diagnostic badge dashboard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl pt-6 border-t border-white/10 text-xs">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="font-mono text-brand-gold-400 font-black text-lg block">50 FAQs</span>
              <span className="text-[10px] text-brand-blue-200">Total Active QA</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="font-mono text-brand-gold-400 font-black text-lg block">5 Core</span>
              <span className="text-[10px] text-brand-blue-200">Support Categories</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="font-mono text-brand-gold-400 font-black text-lg block">450+ Unis</span>
              <span className="text-[10px] text-brand-blue-200">Placement Network</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="font-mono text-brand-gold-400 font-black text-lg block">99.2%</span>
              <span className="text-[10px] text-brand-blue-200">Visa Success Rate</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Interactive Search & Directory Bar and Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Directory Search Console
            </h3>
            <p className="text-[11px] text-gray-400 font-sans">
              Enter queries to filter across admissions, IELTS, scholarships or visas
            </p>
          </div>

          <div className="relative w-full lg:max-w-xl">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search through 50 detailed questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold-500/30 focus:border-brand-gold-500 transition-all font-sans text-gray-700 font-medium"
              id="faq-search-input"
            />
          </div>
        </div>
      </div>

      {/* 3. Main Split Layout: Filter Categories Sidebar vs Accordion items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Category Side Selector Rail (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Browse by Category
              </h3>
              <p className="text-[10px] text-gray-400 font-sans">
                Each category contains exactly 10 comprehensive expert-written answers
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setExpandedFaqId(null);
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl text-left text-xs font-sans font-bold transition-all cursor-pointer ${
                    selectedCategory === cat 
                      ? "bg-brand-blue-50 text-brand-blue-900 border-l-4 border-brand-blue-900" 
                      : "text-gray-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="truncate">{cat}</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    selectedCategory === cat ? "bg-brand-blue-900 text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    {countByCategory(cat)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Help Promo Block */}
          <div className="bg-gradient-to-br from-brand-blue-900 to-brand-blue-950 text-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-gold-500 via-yellow-400 to-brand-gold-600" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold-500/5 rounded-full blur-[45px] pointer-events-none" />
            
            <div className="relative z-10 space-y-4 text-left">
              <div className="p-2 bg-white/5 rounded-lg border border-white/5 w-fit">
                <PhoneCall className="h-5 w-5 text-brand-gold-400 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-black text-sm text-brand-gold-400 tracking-tight">
                  Still Have Unresolved Questions?
                </h4>
                <p className="text-[11px] text-brand-blue-105 leading-relaxed font-sans select-text">
                  Don't navigate high-stakes admissions alone! Get an official detailed review of your transcripts, GRE score requirements, or visa block account procedures directly from our certified international advisory council.
                </p>
              </div>

              <button
                onClick={() => onConsult("General FAQ Inquiry")}
                className="w-full py-2.5 bg-brand-gold-400 hover:bg-brand-gold-500 text-brand-blue-950 font-sans font-black text-[10px] uppercase tracking-wider rounded-xl transition duration-305 shadow-md active:scale-95 text-center shrink-0 cursor-pointer"
                id="faqs-cta-free-consultation"
              >
                Inquire For Custom Profiling
              </button>
            </div>
          </div>

        </div>

        {/* FAQs Accordion Block (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {selectedCategory} Directory ({filteredFaqs.length} items found)
            </p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="text-[10px] font-bold text-brand-blue-900 hover:text-brand-blue-700 underline underline-offset-2"
              >
                Clear Search
              </button>
            )}
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 ${
                    isExpanded 
                      ? "border-brand-gold-400/40 ring-1 ring-brand-gold-400/20 shadow-md" 
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-left flex items-start gap-4 focus:outline-none transition-colors justify-between group cursor-pointer"
                  >
                    <div className="flex gap-3.5 items-start">
                      <span className="h-7 w-7 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-brand-blue-50 group-hover:text-brand-blue-900 flex items-center justify-center font-mono font-bold text-xs shrink-0 select-none transition-colors">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-widest font-bold text-brand-blue-900/60 font-mono">
                          {faq.category}
                        </span>
                        <h3 className="font-sans font-bold text-xs sm:text-sm text-brand-blue-950 select-text leading-snug group-hover:text-brand-blue-950 transition-colors">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div className="shrink-0 mt-1 select-none">
                      {isExpanded ? (
                        <div className="p-1 rounded-full bg-brand-gold-400/10 text-brand-blue-950">
                          <ChevronUp className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="p-1 rounded-full bg-slate-50 text-gray-400 group-hover:bg-slate-100 group-hover:text-gray-600 transition-all">
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </button>

                  {/* Accordion Expandable Answer Body */}
                  {isExpanded && (
                    <div className="px-5 pb-6 pt-1 border-t border-slate-50 animate-fadeIn text-left">
                      <div className="pl-11 pr-2 space-y-4">
                        <p className="text-xs text-gray-600 leading-relaxed font-sans select-text whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                          {faq.answer}
                        </p>

                        {/* Interactive support footer inside the opened FAQ */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[10px]">
                          <span className="text-gray-400 font-mono">
                            FAQ ID Index: #{faq.id}
                          </span>
                          
                          <button
                            onClick={() => onConsult(`FAQ: "${faq.question}"`)}
                            className="inline-flex items-center gap-1.5 text-brand-blue-900 hover:text-brand-blue-700 font-bold transition-colors select-none"
                          >
                            <PhoneCall className="h-3 w-3 text-brand-gold-500" />
                            <span>Ask counselor about this item</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 space-y-4 shadow-sm">
                <HelpCircle className="h-12 w-12 text-gray-300 mx-auto" />
                <div className="space-y-1 max-w-lg mx-auto">
                  <h4 className="font-sans font-black text-sm text-slate-800">
                    No matching FAQs found
                  </h4>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    We didn't find any FAQs matching "{searchQuery}" under "{selectedCategory}" category. Try checking your spelling or selecting "All" categories above.
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-bold text-xs rounded-lg transition"
                >
                  Reset Active Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
