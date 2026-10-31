import React, { useState } from "react";
import { UNIVERSITIES_DATA } from "../data";
import { University } from "../types";
import { 
  Search, 
  MapPin, 
  Award, 
  BookOpen, 
  Coins, 
  FileText, 
  Percent, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Globe, 
  GraduationCap 
} from "lucide-react";

interface UniversitiesSectionProps {
  onInquireUniversity: (uniName: string) => void;
}

export default function UniversitiesSection({ onInquireUniversity }: UniversitiesSectionProps) {
  // Navigation & filter states
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeUniDetail, setActiveUniDetail] = useState<University | null>(null);

  // Filter logic
  const filteredUniversities = UNIVERSITIES_DATA.filter((uni) => {
    const matchesCountry = selectedCountry === "All" || uni.country === selectedCountry;
    const matchesSearch = 
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.popularPrograms.some(prog => prog.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCountry && matchesSearch;
  });

  const uniqueCountries = [
    "All",
    ...Array.from(new Set(UNIVERSITIES_DATA.map((uni) => uni.country)))
  ];

  const getCountryLabel = (country: string) => {
    if (country === "All") return "🌍 All Countries";
    const found = UNIVERSITIES_DATA.find((uni) => uni.country === country);
    return found ? `${found.flag} ${country}` : country;
  };

  return (
    <section id="universities" className="py-20 bg-gradient-to-b from-white to-gray-50/50 relative">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gray-100" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-bold text-brand-blue-700 uppercase tracking-widest flex items-center justify-center gap-1">
            <GraduationCap className="h-4 w-4" />
            <span>Ivy Standards & Russell Group Pathways</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-blue-950 tracking-tight">
            Our Premium Global Partner Universities
          </h2>
          <div className="h-1.5 w-16 bg-brand-gold-500 mx-auto rounded-full" />
          <p className="font-sans text-gray-500 text-sm leading-relaxed">
            We directly link ambitious students to prestigious research systems spanning Canada, the UK, Australia, the United States, Europe, and Asia. Navigate admission checklists and choose your dream campus.
          </p>
        </div>

        {/* Searching & Country Pill Filter Toggles Bar */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 text-left">
          
          {/* Countries Pill container */}
          <div className="flex flex-wrap items-center gap-1.5" id="uni-country-filters">
            {uniqueCountries.map((country) => {
              const isSelected = selectedCountry === country;
              return (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 focus:outline-none flex items-center gap-1 ${
                    isSelected
                      ? "bg-brand-blue-950 text-white shadow-md font-bold"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {getCountryLabel(country)}
                </button>
              );
            })}
          </div>

          {/* Search Box Inputs */}
          <div className="relative flex-1 max-w-sm" id="uni-search-bar">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search by university, degree keyword, country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 text-xs rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-600 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 inset-y-0 text-xs text-gray-400 hover:text-gray-700 font-semibold"
              >
                Clear
              </button>
            )}
          </div>

        </div>

        {/* Interactive Roster Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="universities-cards-layout">
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((uni, idx) => (
              <div
                key={uni.id}
                id={`uni-card-${idx}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-blue-200 transition-all duration-300 flex flex-col justify-between overflow-hidden text-left"
              >
                {/* Visual Top Highlight banner */}
                <div className="h-2 bg-gradient-to-r from-brand-blue-700 to-brand-green-700" />
                
                <div className="p-6 space-y-4">
                  
                  {/* Country badge, Name, Rankings indicators */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-600">
                        <span>{uni.flag}</span>
                        <span>{uni.country}</span>
                      </span>
                      
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-brand-gold-500/10 border border-brand-gold-500/20 text-[10px] font-bold text-brand-gold-500">
                        <Award className="h-3 w-3 fill-brand-gold-400/20" />
                        <span>QS Rank #{uni.worldRanking}</span>
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-lg text-brand-blue-950 group-hover:text-brand-blue-700 transition-colors duration-200">
                      {uni.name}
                    </h3>
                  </div>

                  {/* Summary requirements indicators */}
                  <div className="grid grid-cols-2 gap-2.5 py-2.5 border-y border-gray-50 text-[11px] text-gray-500 bg-gray-50/50 px-3 rounded-xl">
                    <div>
                      <span className="block text-gray-400 text-[9px] uppercase font-bold tracking-wider">Accept Rate</span>
                      <span className="font-semibold text-gray-700 flex items-center gap-0.5 mt-0.5">
                        <Percent className="h-3 w-3 text-brand-blue-600" />
                        {uni.acceptanceRate}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-[9px] uppercase font-bold tracking-wider">IELTS Target</span>
                      <span className="font-semibold text-gray-700 flex items-center gap-0.5 mt-0.5">
                        <BookOpen className="h-3 w-3 text-brand-green-700" />
                        {uni.ieltsRequirement.split("(")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Top Popular programs list */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#a88d3b]">
                      Popular Flagships Academic Routes:
                    </div>
                    <ul className="space-y-1 select-none">
                      {uni.popularPrograms.slice(0, 2).map((prog, pIdx) => (
                        <li key={pIdx} className="text-xs text-gray-600 flex items-center gap-1.5 truncate">
                          <CheckCircle2 className="h-3.5 w-3.5 text-brand-green-600 shrink-0" />
                          <span>{prog}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Card Actions Footer row */}
                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-bold uppercase font-mono tracking-wider">
                    {uni.avgTuition.split("/")[0]}
                  </span>

                  <button
                    onClick={() => setActiveUniDetail(uni)}
                    id={`uni-details-btn-${uni.id}`}
                    className="text-xs font-sans font-bold text-brand-blue-600 hover:text-brand-blue-800 flex items-center gap-1 focus:outline-none"
                  >
                    Details Page
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-12 space-y-2">
              <div className="text-gray-300 font-bold text-4xl">☹</div>
              <p className="text-sm font-sans text-gray-500">
                No partner universities match your filter parameters. Please adjust filters or clear the search.
              </p>
              <button
                onClick={() => { setSelectedCountry("All"); setSearchQuery(""); }}
                className="text-xs font-bold text-brand-blue-600 underline"
              >
                Reset Controls
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Comprehensive Academic Page Overview Overlay Sheet */}
      {activeUniDetail && (
        <div
          id="uni-page-overlay"
          className="fixed inset-0 z-50 flex items-center justify-end bg-brand-blue-950/75 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setActiveUniDetail(null)}
        >
          {/* Slides out from right in tablet/desktop and full screen in mobile */}
          <div
            id="uni-detail-sheet"
            className="bg-white h-full w-full max-w-2xl shadow-2xl overflow-y-auto relative animate-in slide-in-from-right duration-300 text-left flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header / Intro block within sheet */}
            <div>
              {/* Dynamic Simulated Background Hero banner */}
              <div className="relative h-44 sm:h-48 bg-gradient-to-br from-brand-blue-950 to-brand-blue-800 p-6 sm:p-8 flex flex-col justify-end">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c710_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40 pointer-events-none" />
                
                <button
                  onClick={() => setActiveUniDetail(null)}
                  id="close-uni-detail"
                  className="absolute top-4 right-4 p-2 bg-white/10 text-white hover:bg-white/20 rounded-full transition focus:outline-none"
                  aria-label="Close details view"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="space-y-1.5 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{activeUniDetail.flag}</span>
                    <span className="text-white font-mono uppercase text-xs tracking-widest font-bold">
                      {activeUniDetail.country} Direct Pathway
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                    {activeUniDetail.name}
                  </h3>
                </div>
              </div>

              {/* Roster overview indicators strip in actual body */}
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100 border-b border-gray-100 text-center text-xs font-sans py-4 bg-gray-50/50">
                <div className="p-2 space-y-1">
                  <span className="block text-gray-400 text-[9px] font-bold uppercase tracking-wider">QS Ranking</span>
                  <span className="font-extrabold text-brand-blue-950 text-sm"># {activeUniDetail.worldRanking} Worldwide</span>
                </div>
                <div className="p-2 space-y-1">
                  <span className="block text-gray-400 text-[9px] font-bold uppercase tracking-wider">Accept Rate</span>
                  <span className="font-extrabold text-brand-blue-950 text-sm">{activeUniDetail.acceptanceRate}</span>
                </div>
                <div className="p-2 space-y-1">
                  <span className="block text-gray-400 text-[9px] font-bold uppercase tracking-wider">Tuition Est.</span>
                  <span className="font-extrabold text-brand-green-700 text-xs truncate max-w-[150px] inline-block">{activeUniDetail.avgTuition.split("/")[0]}</span>
                </div>
                <div className="p-2 space-y-1">
                  <span className="block text-gray-400 text-[9px] font-bold uppercase tracking-wider">IELTS Bound</span>
                  <span className="font-extrabold text-brand-blue-950 text-sm">{activeUniDetail.ieltsRequirement.match(/[\d.]+/)?.[0] || "6.5"} Target</span>
                </div>
              </div>

              {/* Main profile content prose */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Descriptive Bio paragraph */}
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-blue-900">
                    Comprehensive Campus Profile
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed font-semibold">
                    {activeUniDetail.description}
                  </p>
                </div>

                {/* WhyStudy Here Checklist block */}
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#a88d3b]">
                    Key Institutional Value Props:
                  </h4>
                  <ul className="space-y-2.5">
                    {activeUniDetail.whyStudyHere.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                        <CheckCircle2 className="h-4.5 w-4.5 text-brand-green-700 shrink-0 mt-0.5" />
                        <span className="font-sans font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Popular Degree Pathways */}
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-blue-900">
                    Popular Majors & Programs Available:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeUniDetail.popularPrograms.map((prog, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-brand-blue-600 shrink-0" />
                        <span className="font-sans text-[11px] font-bold text-gray-700 truncate">{prog}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements & Admission Checklist grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-gray-100">
                  
                  {/* Documents Column */}
                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-blue-900 flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5 text-brand-blue-700" />
                      <span>Admission Checklist</span>
                    </h4>
                    <ul className="space-y-2.5">
                      {activeUniDetail.requiredDocuments.map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                          <CheckCircle2 className="h-4 w-4 text-brand-green-600 mt-0.5 shrink-0" />
                          <span className="font-sans leading-tight">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Scholarships & Intakes Column */}
                  <div className="space-y-4">
                    
                    {/* Scholarships */}
                    <div className="space-y-2">
                      <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-green-700 flex items-center gap-1">
                        <Coins className="h-3.5 w-3.5 text-brand-green-600" />
                        <span>Exclusive Scholarships</span>
                      </h4>
                      <ul className="space-y-1.5 pl-1">
                        {activeUniDetail.scholarshipsAvailable.map((scholar, idx) => (
                          <li key={idx} className="text-xs text-gray-600 leading-tight">
                            • <span className="font-sans font-semibold text-brand-blue-950">{scholar}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Intakes */}
                    <div className="space-y-2">
                      <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-blue-900 flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-brand-blue-700" />
                        <span>Semester Intakes</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeUniDetail.intakePeriods.map((period, idx) => (
                          <span key={idx} className="inline-block text-[10px] font-sans font-bold bg-brand-blue-50 text-brand-blue-700 px-2.5 py-1 rounded-md border border-brand-blue-100/30">
                            {period}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>

            {/* Sticky bottom CTA actions widget within sheet */}
            <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between select-none">
              <div>
                <div className="text-[10px] text-gray-400 font-bold uppercase">Ready to submit?</div>
                <div className="text-xs font-semibold text-gray-700 font-sans mt-0.5">Let our verified counselors apply on your behalf</div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveUniDetail(null)}
                  className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-600 border border-gray-200 rounded-xl text-xs font-bold transition text-center"
                >
                  Close Profile
                </button>
                <button
                  onClick={() => {
                    onInquireUniversity(activeUniDetail.name);
                    setActiveUniDetail(null);
                  }}
                  id="sheet-inquire-cta-btn"
                  className="px-5 py-2.5 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-950 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
                >
                  Apply For {activeUniDetail.name}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
