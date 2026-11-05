import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ReusableStats from "./components/Stats";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import UniversitiesSection from "./components/UniversitiesSection";
import LocationsSection from "./components/LocationsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import DestinationsSection from "./components/DestinationsSection";
import SuccessStoriesSection from "./components/SuccessStoriesSection";
import ScholarshipDetailPage from "./components/ScholarshipDetailPage";
import FaqsPage from "./components/FaqsPage";
import ImmigrationPages from "./components/ImmigrationPages";
import { MessageCircle } from "lucide-react";

function getCountryIdFromPath(path: string): string | null {
  const decoded = decodeURIComponent(path).toLowerCase().trim();
  const slug = decoded.startsWith("/") ? decoded.slice(1) : decoded;
  
  if (slug.startsWith("study-in-")) {
    return slug.replace("study-in-", "");
  }
  
  if (slug.startsWith("study in ")) {
    const countryName = slug.replace("study in ", "").trim();
    const mappings: Record<string, string> = {
      "united kingdom": "uk",
      "united-kingdom": "uk",
      "uk": "uk",
      "united states": "usa",
      "united states of america": "usa",
      "usa": "usa",
      "malaysia": "malaysia",
      "ireland": "ireland",
      "latvia": "latvia",
      "germany": "germany",
      "france": "france",
      "spain": "spain",
      "south korea": "south-korea",
      "south-korea": "south-korea",
      "hungary": "hungary",
      "lithuania": "lithuania",
      "denmark": "denmark",
      "finland": "finland",
      "canada": "canada",
      "brazil": "brazil",
      "japan": "japan",
      "turkey": "turkey",
      "chile": "chile",
      "indonesia": "indonesia",
      "south africa": "south-africa",
      "south-africa": "south-africa"
    };
    if (mappings[countryName]) {
      return mappings[countryName];
    }
  }
  
  return null;
}

function getServiceIdFromPath(path: string): string | null {
  const decoded = decodeURIComponent(path).toLowerCase().trim();
  const slug = decoded.startsWith("/") ? decoded.slice(1) : decoded;
  
  const clean = (str: string) => {
    return str
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };
  
  const targetClean = clean(slug);
  
  if (targetClean === clean("university-admissions") || targetClean === clean("university-admission")) {
    return "university-admissions";
  }
  if (targetClean === clean("visa-guidance") || targetClean === "visa" || targetClean === clean("visa-&-immigration-guidance") || targetClean === clean("visa-and-immigration-guidance") || targetClean === "visa-immigration-guidance") {
    return "visa-guidance";
  }
  if (targetClean === clean("scholarship-assistance") || targetClean === "scholarships" || targetClean === clean("scholarship") || targetClean === "scholarship-assistance-program") {
    return "scholarship-assistance";
  }
  if (targetClean === clean("career-counseling") || targetClean === clean("global-career-counseling") || targetClean === "career") {
    return "career-counseling";
  }
  if (targetClean === clean("test-prep") || targetClean === clean("test-prep-(ielts-/-toefl)") || targetClean === clean("test-prep-ielts-toefl") || targetClean === "test-prep-ielts") {
    return "test-prep";
  }
  if (targetClean === clean("pre-departure") || targetClean === clean("pre-departure-&-acculturation") || targetClean === clean("pre-departure-and-acculturation") || targetClean === "pre-departure-acculturation") {
    return "pre-departure";
  }
  
  return null;
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [showWaTooltip, setShowWaTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWaTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  
  // States used to share dynamic prefills with the contact module
  const [prefilledService, setPrefilledService] = useState("");
  const [prefilledCity, setPrefilledCity] = useState("");
  const [prefilledUniversity, setPrefilledUniversity] = useState("");

  // Sync back/forward browser navigation actions
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState(null, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  useEffect(() => {
    if (currentPath === "/success-stories") {
      setActiveSection("success-stories");
    } else if (getCountryIdFromPath(currentPath) !== null) {
      setActiveSection("destinations");
    } else if (currentPath.startsWith("/immigration")) {
      setActiveSection("services");
    } else if (getServiceIdFromPath(currentPath) !== null) {
      setActiveSection("services");
    } else if (currentPath.startsWith("/scholarship")) {
      setActiveSection("scholarships");
    } else if (currentPath === "/faqs" || currentPath === "/faq") {
      setActiveSection("faqs");
    } else if (currentPath === "/admin" || currentPath === "/login" || currentPath === "/admin-login") {
      setActiveSection("admin");
    } else {
      setActiveSection("home");
    }
  }, [currentPath]);

  // Track screen scrolling to automatically highlight active navigation anchors
  useEffect(() => {
    const sectionIds = ["home", "about", "services", "destinations", "universities", "success-stories", "locations", "testimonials", "contact"];
    
    const handleViewportScroll = () => {
      if (window.location.pathname !== "/") return;
      const scrollPosition = window.scrollY + 200; // Offset for sticky header heights and visual margin checks
      
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleViewportScroll);
    return () => window.removeEventListener("scroll", handleViewportScroll);
  }, []);

  // Helper: Reliable smooth scrolling to contact section with retry mechanism
  const scrollToContactWithFallback = () => {
    let attempts = 0;
    const interval = setInterval(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        clearInterval(interval);
        const offset = 80;
        const scrollPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
           top: scrollPosition,
           behavior: "smooth"
        });
      } else {
        attempts++;
        if (attempts >= 15) {
          clearInterval(interval);
        }
      }
    }, 40);
  };

  // Handler: When user clicks to book/inquire direct service
  const handleServiceSelectPrefill = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    setPrefilledUniversity(""); // Reset university choice when selecting standard service
    
    if (currentPath !== "/") {
      navigateTo("/");
    }
    scrollToContactWithFallback();
  };

  // Handler: When user clicks an individual university to register admission assistance
  const handleUniversityInquirePrefill = (uniName: string) => {
    setPrefilledUniversity(uniName);
    setPrefilledService("University Admissions"); // Map directly to Admissions
    
    if (currentPath !== "/") {
      navigateTo("/");
    }
    scrollToContactWithFallback();
  };

  // Handler: When user clicks an individual branch office desk to initiate custom routing
  const handleCitySelectPrefill = (cityName: string) => {
    setPrefilledCity(cityName);
    
    if (currentPath !== "/") {
      navigateTo("/");
    }
    scrollToContactWithFallback();
  };

  const handleCountryInquirePrefill = (countryName: string) => {
    setPrefilledService(countryName);
    setPrefilledUniversity("");
    
    if (currentPath !== "/") {
      navigateTo("/");
    }
    scrollToContactWithFallback();
  };

  const handleClearPrefills = () => {
    setPrefilledService("");
    setPrefilledCity("");
    setPrefilledUniversity("");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 antialiased flex flex-col justify-between overflow-x-hidden">
      
      {/* 1. Header Navigation */}
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onOpenAdmin={() => navigateTo("/login")} 
        currentPath={currentPath}
        navigateTo={navigateTo}
      />

      {/* 2. Main content blocks */}
      <main className="flex-1">
        
        {currentPath === "/success-stories" ? (
          /* Separate Dedicated Success Stories Page */
          <div className="pt-20">
            <SuccessStoriesSection 
              initialViewMode="dedicated-list"
              onBackToHome={() => navigateTo("/")}
            />
          </div>
        ) : getCountryIdFromPath(currentPath) !== null ? (
          /* Separate Dedicated Study-In Country Page */
          <div className="pt-20">
            <DestinationsSection 
              activeCountryId={getCountryIdFromPath(currentPath) || ""}
              onSelectCountryForInquiry={handleCountryInquirePrefill}
              onNavigate={navigateTo}
            />
          </div>
        ) : currentPath.startsWith("/immigration") ? (
          /* Dedicated Dynamic Country Visa & Immigration Hub */
          <div className="pt-20">
            <ImmigrationPages 
              currentPath={currentPath}
              onNavigate={navigateTo}
              onConsult={handleServiceSelectPrefill}
            />
          </div>
        ) : getServiceIdFromPath(currentPath) !== null ? (
          /* Separate Dedicated Academic Service Page */
          <div className="pt-20">
            <ServicesSection 
              activeServiceId={getServiceIdFromPath(currentPath) || undefined}
              onBookService={handleServiceSelectPrefill}
              onNavigate={navigateTo}
            />
          </div>
        ) : currentPath.startsWith("/scholarship") ? (
          /* Separate Dedicated Scholarship Detail Directory */
          <div className="pt-20">
            <ScholarshipDetailPage 
              activeScholarshipId={currentPath.replace("/scholarship/", "").replace("/scholarships/", "")}
              onNavigateHome={() => navigateTo("/")}
              onSelectScholarship={(id) => navigateTo(`/scholarship/${id}`)}
              onConsult={(name) => handleServiceSelectPrefill(`Scholarship Inquire: ${name}`)}
            />
          </div>
        ) : (currentPath === "/faqs" || currentPath === "/faq") ? (
          /* Separate Dedicated Comprehensive FAQs Directory */
          <div className="pt-20">
            <FaqsPage 
              onNavigateHome={() => navigateTo("/")}
              onConsult={(item) => handleServiceSelectPrefill(`FAQ: ${item}`)}
            />
          </div>
        ) : (currentPath === "/admin" || currentPath === "/login" || currentPath === "/admin-login") ? (
          /* Separate Dedicated Admin Sign In & Dashboard Page for the Whole Team */
          <div className="pt-28 pb-16 bg-slate-950 px-4 md:px-8">
            <AdminPanel 
              isOpen={true} 
              onClose={() => navigateTo("/")} 
              isFullPage={true} 
            />
          </div>
        ) : (
          /* Full Homepage Sections Layout */
          <>
            {/* Core Home elements */}
            <Hero onCtaClick={(sectionId) => {
              if (sectionId === "success-stories") {
                navigateTo("/success-stories");
                return;
              }
              if (sectionId === "immigration") {
                navigateTo("/immigration");
                return;
              }
              const el = document.getElementById(sectionId);
              if (el) {
                const offset = 80;
                const scrollPos = el.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: scrollPos, behavior: "smooth" });
              }
            }} />

            {/* Floating statistics widgets panel */}
            <ReusableStats />

            {/* Strategic about content cards */}
            <AboutSection onConsult={handleServiceSelectPrefill} />

            {/* Academic offerings & interactive custom detail inspector */}
            <ServicesSection 
              onBookService={handleServiceSelectPrefill} 
              onNavigate={navigateTo}
            />

            {/* Global Study Destinations interactive hub */}
            <DestinationsSection 
              onSelectCountryForInquiry={handleCountryInquirePrefill} 
              onNavigate={navigateTo}
            />

            {/* Dynamic searchable & filterable partner universities roster */}
            <UniversitiesSection onInquireUniversity={handleUniversityInquirePrefill} />

            {/* Dynamic sliding success stories & visa stamp archives carousel on homepage */}
            <SuccessStoriesSection 
              initialViewMode="home-slider"
              onOpenDedicated={() => navigateTo("/success-stories")}
            />

            {/* Global Hub physical cities list and roster inspect drawer */}
            <LocationsSection onContactCity={handleCitySelectPrefill} />

            {/* Social Proof and real testimonial sliders */}
            <TestimonialsSection />

            {/* Fully validated student counselor appointment console */}
            <ContactSection
              initialServiceSelected={prefilledService}
              initialCitySelected={prefilledCity}
              initialUniversitySelected={prefilledUniversity}
              clearPrefills={handleClearPrefills}
            />
          </>
        )}

      </main>

      {/* 3. Global footer */}
      <Footer 
        onLinkClick={(sectionId) => {
          if (sectionId === "success-stories") {
            navigateTo("/success-stories");
          } else {
            setActiveSection(sectionId);
          }
        }} 
        onCityLinkClick={handleCitySelectPrefill} 
        currentPath={currentPath}
        navigateTo={navigateTo}
      />

      {/* 4. Controls Console Drawer Overlay */}
      <AdminPanel isOpen={isAdminPanelOpen} onClose={() => setIsAdminPanelOpen(false)} />

      {/* 5. Floating WhatsApp Button & Live Counselor Help Tooltip */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 max-w-[280px] sm:max-w-sm font-sans" id="floating-whatsapp-container">
        {showWaTooltip && (
          <div className="relative flex items-center gap-3 bg-white text-gray-800 py-3 pl-4 pr-10 rounded-2xl shadow-2xl border border-gray-100 transition-all duration-300 animate-bounce">
            <button
              onClick={() => setShowWaTooltip(false)}
              className="absolute top-1.5 right-1.5 text-gray-400 hover:text-gray-600 focus:outline-none p-1 cursor-pointer transition-colors"
              aria-label="Close message"
              id="close-wa-tooltip-btn"
            >
              <svg className="h-3.5 w-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex-1">
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                Active Support
              </p>
              <p className="text-xs font-bold text-brand-blue-950 mt-1 select-text">
                Need a Free Consultation? Chat with us live on WhatsApp!
              </p>
            </div>
          </div>
        )}
        
        <a
          href="https://wa.me/923417548178?text=Hello%20Uni%20Help%20Consultants!%20I'm%20interested%20in%20arranging%20a%20free%20consultation%20with%20your%20team."
          target="_blank"
          rel="noopener noreferrer"
          id="whatsapp-floating-link"
          className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#22c35e] text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 group cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          {/* Pulsing visual back ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping -z-10"></span>
          <MessageCircle className="h-7 w-7 fill-white stroke-[#25D366]" id="wa-btn-icon" />
        </a>
      </div>

    </div>
  );
}
