import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Search, Phone, User, Facebook, Instagram } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
  currentPath: string;
  navigateTo: (path: string) => void;
}

export default function Header({ 
  activeSection, 
  setActiveSection, 
  onOpenAdmin,
  currentPath,
  navigateTo
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor page scroll to apply background effects and update active state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "destinations", label: "Destinations" },
    { id: "universities", label: "Universities" },
    { id: "success-stories", label: "Success Stories" },
    { id: "locations", label: "Locations" },
    { id: "testimonials", label: "Testimonials" }
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    
    if (id === "success-stories") {
      navigateTo("/success-stories");
      return;
    }
    
    if (currentPath !== "/") {
      navigateTo("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 150);
      return;
    }

    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      id="app-header"
      className="fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-300 pointer-events-none"
    >
      {/* Top Utility Header Bar with circular buttons (aligns visually with the main bar) */}
      <div 
        className={`max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex justify-end items-center gap-3 transition-all duration-300 pointer-events-auto ${
          isScrolled 
            ? "h-0 py-0 opacity-0 overflow-hidden" 
            : "h-12 pt-3 pb-1 opacity-100"
        }`}
      >
        {/* Decorative Circular Search Button */}
        <button 
          onClick={() => handleNavClick("services")}
          className="h-9 w-9 bg-white text-gray-700 hover:text-brand-blue-600 hover:bg-slate-50 flex items-center justify-center rounded-full shadow-lg shadow-brand-blue-950/5 border border-slate-100 transition duration-200 cursor-pointer focus:outline-none"
          title="Search Services"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Facebook Link */}
        <a 
          href="https://facebook.com/unihelp.consultant"
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 w-9 bg-white text-gray-700 hover:text-blue-600 hover:bg-slate-50 flex items-center justify-center rounded-full shadow-lg shadow-brand-blue-950/5 border border-slate-100 transition duration-200"
          title="Facebook Page: @unihelp.consultant"
        >
          <Facebook className="h-4 w-4" />
        </a>

        {/* Instagram Link */}
        <a 
          href="https://instagram.com/unihelp.consultant"
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 w-9 bg-white text-gray-700 hover:text-pink-600 hover:bg-slate-50 flex items-center justify-center rounded-full shadow-lg shadow-brand-blue-950/5 border border-slate-100 transition duration-200"
          title="Instagram Profile: unihelp.consultant"
        >
          <Instagram className="h-4 w-4" />
        </a>

        {/* Circular Phone Helpline Link */}
        <a 
          href="tel:+923417548178"
          className="h-9 w-9 bg-white text-gray-700 hover:text-brand-blue-600 hover:bg-slate-50 flex items-center justify-center rounded-full shadow-lg shadow-brand-blue-950/5 border border-slate-100 transition duration-200"
          title="Call Helpline: +92 (341) 754-8178"
        >
          <Phone className="h-4 w-4" />
        </a>

        {/* Administrative Login Pill (Matches Phoenix design exactly) */}
        <button 
          onClick={onOpenAdmin}
          className="h-9 px-4 bg-white text-gray-800 hover:text-brand-blue-700 hover:bg-slate-50 font-sans font-bold text-xs rounded-full shadow-lg shadow-brand-blue-950/5 border border-slate-100 flex items-center gap-2 transition cursor-pointer focus:outline-none"
        >
          <User className="h-3.5 w-3.5 text-gray-500" />
          <span>Login</span>
        </button>
      </div>

      {/* Main Floating Capsule Navigation bar */}
      <div 
        className={`max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 transition-all duration-300 pointer-events-auto mt-2`}
      >
        <div 
          className="w-full bg-white/95 backdrop-blur-md border border-slate-200/50 shadow-xl shadow-brand-blue-950/5 rounded-full pl-0 pr-2 lg:pr-3 py-0 flex items-center justify-between transition-all duration-300 h-14 sm:h-[68px] overflow-hidden"
        >
          {/* Brand Logo in a pristine white container (aligned flush left matching the University of Phoenix design badge) */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center h-full focus:outline-none group select-none"
            id="nav-logo"
          >
            <div className="bg-white rounded-l-full rounded-r-2xl sm:rounded-r-3xl px-5 sm:px-7 flex items-center justify-center h-full shadow-[3px_0_12px_rgba(0,0,0,0.02)] border-r border-slate-150 transition-all duration-300 group-hover:bg-slate-50/60">
              <img
                src="/logo.png"
                alt="Uni Help Consultants Logo"
                className="h-7 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
            </div>
          </button>

          {/* Center Navigation Links (Hidden on small / medium devices below lg, optimized for desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" id="desktop-nav">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  id={`nav-link-${link.id}`}
                  className={`px-3 py-2 rounded-full font-sans font-bold text-[11px] xl:text-xs tracking-wider uppercase transition-all duration-200 focus:outline-none whitespace-nowrap cursor-pointer hover:scale-103 ${
                    isActive
                      ? "bg-brand-blue-50 text-brand-blue-700 font-extrabold shadow-sm border border-brand-blue-100/30"
                      : "text-gray-600 hover:text-brand-blue-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Suffix Action Buttons (Hidden on mobile/tablet below lg) */}
          <div className="hidden lg:flex items-center gap-2 mr-2">
            <button
              onClick={() => handleNavClick("contact")}
              id="header-apply-now-btn"
              className="px-4.5 py-2.5 bg-gradient-to-r from-brand-gold-500 to-amber-500 hover:from-amber-400 hover:to-brand-gold-500 text-brand-blue-950 hover:shadow-lg rounded-full font-sans font-extrabold text-[10px] xl:text-xs uppercase tracking-wider shadow-md shadow-brand-gold-500/10 transition-all duration-300 transform active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Apply Now
            </button>
          </div>

          {/* Mobile Menu Actions (visible under lg) */}
          <div className="lg:hidden flex items-center gap-2 mr-2">
            {/* Quick Contact shortcut on mobile */}
            <button
              onClick={() => handleNavClick("contact")}
              className="px-3.5 py-1.5 bg-gradient-to-r from-brand-gold-500 to-amber-500 text-brand-blue-950 font-sans font-bold text-[10px] uppercase tracking-wider rounded-full shadow-sm shadow-brand-gold-500/10 active:scale-95 focus:outline-none"
            >
              Apply
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-slate-50 hover:bg-slate-100 text-brand-blue-950 border border-slate-200/50 rounded-full transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 stroke-[2.5]" />
              ) : (
                <Menu className="h-5 w-5 stroke-[2.5]" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu-drawer"
          className="lg:hidden absolute mx-auto left-4 right-4 bg-white border border-slate-200 shadow-2xl rounded-3xl overflow-hidden pointer-events-auto select-none animate-in slide-in-from-top-4 duration-300 top-20 sm:top-24"
        >
          <div className="p-4 space-y-1 bg-gradient-to-b from-white to-slate-50/50">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  id={`mobile-link-${link.id}`}
                  className={`w-full text-left px-4 py-3 rounded-2xl font-sans font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    isActive
                      ? "bg-brand-blue-600 text-white font-extrabold"
                      : "text-gray-700 hover:bg-slate-100/80 hover:text-brand-blue-700"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive ? (
                    <div className="h-2 w-2 rounded-full bg-brand-gold-400 shadow-inner" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5 text-gray-400 opacity-50" />
                  )}
                </button>
              );
            })}
            <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => handleNavClick("contact")}
                id="mobile-cta-btn"
                className="w-full py-3 bg-gradient-to-r from-brand-gold-500 to-amber-500 hover:from-amber-400 hover:to-brand-gold-500 text-brand-blue-950 font-sans font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-brand-gold-500/10 cursor-pointer"
              >
                Request Free Consultation
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                id="mobile-admin-btn"
                className="w-full py-3 bg-white hover:bg-slate-50 text-slate-700 hover:text-brand-blue-700 border border-slate-200 font-sans font-bold text-xs uppercase tracking-wider rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
              >
                🔒 Staff Admin Console
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
