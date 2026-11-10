import React from "react";
import { GraduationCap, GraduationCap as LogoIcon, Mail, Phone, MapPin, ExternalLink, Globe, Facebook, Instagram } from "lucide-react";

interface FooterProps {
  onLinkClick: (sectionId: string) => void;
  onCityLinkClick: (cityName: string) => void;
  currentPath: string;
  navigateTo: (path: string) => void;
}

export default function Footer({ onLinkClick, onCityLinkClick, currentPath, navigateTo }: FooterProps) {
  const currentYear = 2026;

  const quickLinks = [
    { label: "Counsel Home", id: "home" },
    { label: "About Consultants", id: "about" },
    { label: "Services Framework", id: "services" },
    { label: "Study Destinations", id: "destinations" },
    { label: "Success Stories", id: "success-stories" },
    { label: "Common FAQs Guide", id: "faqs" },
    { label: "Branch Offices", id: "locations" },
    { label: "Client Testimonials", id: "testimonials" },
    { label: "Contact Admissions Desk", id: "contact" }
  ];

  const eliteScholarships = [
    { name: "Chevening Scholarships (UK)", id: "chevening-scholarships-uk" },
    { name: "Fulbright Program (USA)", id: "fulbright-scholarship-usa" },
    { name: "DAAD Scholarships (Germany)", id: "daad-scholarships-germany" },
    { name: "Erasmus Mundus (Europe)", id: "erasmus-mundus-scholarship" },
    { name: "MEXT Scholarships (Japan)", id: "japan-government-mext-scholarship" },
    { name: "Commonwealth Awards (UK)", id: "commonwealth-scholarships-uk" }
  ];

  const immigrationLinks = [
    { name: "Global Immigration Hub", path: "/immigration" },
    { name: "Australia Skilled Visas", path: "/immigration/australia" },
    { name: "Austria Red-White-Red Card", path: "/immigration/austria" },
    { name: "Canada Express Entry & PNP", path: "/immigration/canada" },
    { name: "Germany Opportunity & Blue Card", path: "/immigration/germany" },
    { name: "New Zealand Points SMC", path: "/immigration/newzealand" },
    { name: "UAE Golden & Green Visas", path: "/immigration/uae" },
    { name: "China Z / R Talent Visas", path: "/immigration/china" },
    { name: "United States EB & Diversity", path: "/immigration/unitedstates" }
  ];

  const practiceCities = [
    { name: "Lahore", detail: "Gulberg III Office" },
    { name: "Karachi", detail: "Business Point Desk" },
    { name: "Islamabad", detail: "G-11 Markaz Desk" },
    { name: "Dubai", detail: "Mazaya Business Avenue" },
    { name: "Riyadh", detail: "Al Muruj Center Desk" },
    { name: "Doha", detail: "Al Jazeera Tower Desk" }
  ];

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    
    if (id === "success-stories") {
      navigateTo("/success-stories");
      return;
    }

    if (id === "faqs") {
      navigateTo("/faqs");
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

    onLinkClick(id);
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
  };

  const handleCityClick = (cityName: string) => {
    if (currentPath !== "/") {
      navigateTo("/");
      setTimeout(() => {
        onCityLinkClick(cityName);
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          const offset = 80;
          const scrollPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({
            top: scrollPosition,
            behavior: "smooth"
          });
        }
      }, 150);
      return;
    }

    onCityLinkClick(cityName);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const offset = 80;
      const scrollPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer id="app-footer" className="bg-brand-blue-950 text-white pt-16 pb-8 border-t border-white/5 relative overflow-hidden text-left">
      
      {/* Absolute decor grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top visual row: Split logo, links config */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand Col (3 Columns) */}
          <div className="md:col-span-6 lg:col-span-3 space-y-5" id="footer-about-col">
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); navigateTo("/"); }} 
              className="inline-block group focus:outline-none"
              title="Uni Help Consultants"
            >
              <div className="bg-white rounded-2xl px-4 py-2.5 inline-flex items-center justify-center shadow-lg shadow-black/20 border border-white/10 transition-transform duration-300 group-hover:scale-102">
                <img
                  src="/logo.png"
                  alt="Uni Help Consultants Logo"
                  className="h-9 sm:h-10 w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
            </a>

            <p className="font-sans text-[11px] text-brand-blue-200/80 leading-relaxed max-w-sm">
              Helping Pakistani and Gulf students fulfill international university placement pathways seamlessly. Certified in-person operations spanning Lahore, Karachi, Islamabad, Dubai, Riyadh, and Doha.
            </p>

            {/* Direct hotline */}
            <div className="space-y-1.5 pt-1 text-[11px]">
              <div className="flex items-center gap-2 text-brand-blue-100">
                <Globe className="h-3.5 w-3.5 text-brand-gold-400 shrink-0" />
                <span>Mon-Sat, 9AM - 6PM</span>
              </div>
              <div className="flex items-start gap-2 text-brand-blue-100">
                <Phone className="h-3.5 w-3.5 text-brand-gold-400 shrink-0 mt-0.5" />
                <span>Hotline: <a href="tel:+923417548178" className="hover:text-brand-gold-400 transition font-mono font-bold">+92 (341) 754-8178</a></span>
              </div>
            </div>

            {/* Social media connections */}
            <div className="flex items-center gap-2.5 pt-3 select-none">
              <a 
                href="https://facebook.com/unihelp.consultant"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 bg-white/5 hover:bg-white/10 hover:text-blue-400 text-brand-blue-100 flex items-center justify-center rounded-lg border border-white/10 transition duration-300"
                title="Facebook: @unihelp.consultant"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://instagram.com/unihelp.consultant"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 bg-white/5 hover:bg-white/10 hover:text-pink-400 text-brand-blue-100 flex items-center justify-center rounded-lg border border-white/10 transition duration-300"
                title="Instagram: unihelp.consultant"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <div className="text-[10px] text-brand-blue-200/50 flex flex-col pl-1 font-sans">
                <span className="font-bold text-slate-300">@unihelp.consultant</span>
                <span>Follow our success stories!</span>
              </div>
            </div>
          </div>

          {/* Quick links navigation mapping (2 Columns) */}
          <div className="md:col-span-6 lg:col-span-2 space-y-4" id="footer-links-col">
            <h4 className="font-display font-semibold text-[10px] uppercase tracking-wider text-brand-gold-400">
              Quick Links
            </h4>
            <div className="h-0.5 w-6 bg-brand-gold-400 rounded-full" />
            <ul className="space-y-2 text-xs font-sans">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className="text-brand-blue-100/80 hover:text-white transition-colors duration-200 flex items-center gap-1"
                  >
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Elite Scholarships Guides (2 Columns) */}
          <div className="md:col-span-6 lg:col-span-2 space-y-4" id="footer-scholarships-col">
            <h4 className="font-display font-semibold text-[10px] uppercase tracking-wider text-brand-gold-400">
              Scholarship Guides
            </h4>
            <div className="h-0.5 w-6 bg-brand-gold-400 rounded-full" />
            <ul className="space-y-2 text-xs font-sans">
              {eliteScholarships.map((s) => (
                <li key={s.id}>
                  <a
                    href={`/scholarship/${s.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(`/scholarship/${s.id}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-brand-blue-100/80 hover:text-white transition-colors duration-200 flex items-center gap-1 block truncate max-w-full"
                  >
                    <span className="text-brand-gold-400 font-bold mr-1">★</span>
                    <span className="truncate">{s.name.split(" (")[0]}</span>
                  </a>
                </li>
              ))}
              <li className="pt-1.5 border-t border-white/5">
                <a
                  href="/scholarships"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("/scholarships");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-brand-gold-400 hover:text-brand-gold-300 transition-colors duration-200 text-[11px] font-bold tracking-wider uppercase flex items-center gap-1"
                >
                  <span>All 44+ Awards →</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Global Immigration Pathways (3 Columns) */}
          <div className="md:col-span-6 lg:col-span-3 space-y-4" id="footer-immigration-col">
            <h4 className="font-display font-semibold text-[10px] uppercase tracking-wider text-brand-gold-400">
              Immigration Guides
            </h4>
            <div className="h-0.5 w-6 bg-brand-gold-400 rounded-full" />
            <ul className="space-y-2 text-xs font-sans">
              {immigrationLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(link.path);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-brand-blue-100/80 hover:text-white transition-colors duration-200 flex items-center gap-1 block truncate max-w-full font-bold"
                  >
                    <span className="text-brand-gold-400 mr-1 font-sans">✈</span>
                    <span className="truncate">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Regional locations navigation routing map (2 columns) */}
          <div className="md:col-span-6 lg:col-span-2 space-y-4" id="footer-cities-col">
            <h4 className="font-display font-semibold text-[10px] uppercase tracking-wider text-brand-gold-400">
              Admissions Desks
            </h4>
            <div className="h-0.5 w-6 bg-brand-gold-400 rounded-full" />
            <ul className="grid grid-cols-1 gap-2.5 text-xs font-sans animate-fadeIn">
              {practiceCities.map((city) => (
                <li key={city.name}>
                  <button
                    onClick={() => handleCityClick(city.name)}
                    className="w-full text-left text-brand-blue-100/80 hover:text-white transition-colors duration-200 flex flex-col focus:outline-none"
                  >
                    <span className="font-semibold underline decoration-brand-blue-800/85 hover:decoration-brand-gold-400 underline-offset-2">
                      {city.name} Office Desk
                    </span>
                    <span className="text-[10px] text-brand-blue-200/55">{city.detail}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom copyright alignment and social indices bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono select-none" id="footer-bottom-tier">
          
          <div className="text-[11px] text-brand-blue-200/60 text-center sm:text-left">
            © {currentYear} Uni Help Consultants. All Rights Reserved. <span className="text-brand-gold-400 font-bold tracking-widest ml-1">Your Bridge to Global Education</span>
          </div>

          {/* Core regulatory compliance or certifications badges */}
          <div className="flex items-center gap-3 text-[10px] text-brand-blue-200/50">
            <span>Direct Placement Agent</span>
            <span>•</span>
            <span>IELTS Certified</span>
            <span>•</span>
            <span>Middle East & PK Hub Network</span>
          </div>

        </div>

      </div>

    </footer>
  );
}
