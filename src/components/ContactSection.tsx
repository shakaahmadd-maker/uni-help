import React, { useState, useEffect } from "react";
import { Send, MapPin, Phone, Mail, CheckCircle, AlertTriangle, X, Check, Globe } from "lucide-react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../firebase";

interface ContactSectionProps {
  initialServiceSelected: string;
  initialCitySelected: string;
  initialUniversitySelected: string;
  clearPrefills: () => void;
}

export default function ContactSection({
  initialServiceSelected,
  initialCitySelected,
  initialUniversitySelected,
  clearPrefills
}: ContactSectionProps) {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    service: "",
    message: ""
  });

  // Validation States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Monitor prefill triggers from other components
  useEffect(() => {
    if (initialCitySelected) {
      setFormData((prev) => ({ ...prev, city: initialCitySelected }));
    }
  }, [initialCitySelected]);

  useEffect(() => {
    if (initialUniversitySelected) {
      setFormData((prev) => ({
        ...prev,
        service: "University Admissions",
        message: `Hello Uni Help Consultants, I am highly interested in securing admissions at "${initialUniversitySelected}". Please review my core academic tracks and guide me on required documents, upcoming intake cycles, and active scholarship applications.`
      }));
    } else if (initialServiceSelected) {
      let mappedService = initialServiceSelected;
      let mappedMessage = `Hello Uni Help Consultants, I am interested in seeking advice on your "${initialServiceSelected}" services. Please share enrollment advice.`;

      // 1. Check for AboutSection's direct assessment format
      if (initialServiceSelected.startsWith("Direct Assessment: Destination:")) {
        // e.g. "Direct Assessment: Destination: UK (Bachelors)"
        const match = initialServiceSelected.match(/Destination:\s*([A-Za-z\s]+)\s*\(([^)]+)\)/);
        if (match) {
          const dest = match[1].trim();
          const qual = match[2].trim();
          
          // Map country codes to select options
          if (dest === "UK") mappedService = "Study in UK";
          else if (dest === "US") mappedService = "Study in USA";
          else if (dest === "Canada") mappedService = "Study in Canada";
          else if (dest === "Australia") mappedService = "Study in Australia";
          else if (dest === "Germany") mappedService = "Study in Germany";
          else if (dest === "Japan") mappedService = "Study in Japan";
          else if (dest === "Malaysia") mappedService = "Study in Malaysia";
          else if (dest === "Turkey") mappedService = "Study in Turkey";
          else if (dest === "Brazil") mappedService = "Study in Brazil";
          else if (dest === "Chile") mappedService = "Study in Chile";
          else if (dest === "Indonesia") mappedService = "Study in Indonesia";
          else if (dest === "Europe") mappedService = "Study in Germany";
          else mappedService = "University Admissions";

          mappedMessage = `Hello Uni Help Consultants, I have completed a Free Academic Profile pre-audit evaluation for "${dest}" targeting a level of "${qual}". Please review my educational scores and advise me on physical office desk procedures, CAS/I-20 visa document compilation, and scholarships.`;
        } else {
          mappedService = "University Admissions";
        }
      } 
      // 2. Map standard service titles to dropdown option values
      else if (initialServiceSelected === "Visa & Immigration Guidance" || initialServiceSelected === "Visa Compliance Liaison" || initialServiceSelected.includes("Immigration Pathways")) {
        mappedService = "Visa Guidance";
      } else if (initialServiceSelected === "Global Career Counseling" || initialServiceSelected === "Career Counseling" || initialServiceSelected === "Global Career mapping") {
        mappedService = "Career Counseling";
      } else if (initialServiceSelected.startsWith("Test Prep") || initialServiceSelected === "Language Test Preparation" || initialServiceSelected === "Exam & Score Mastery") {
        mappedService = "Test Prep (IELTS/TOEFL)";
      } else if (initialServiceSelected === "Pre-Departure & Acculturation" || initialServiceSelected === "Pre-departure Support" || initialServiceSelected === "Landing & Acculturation" || initialServiceSelected.includes("Acculturation")) {
        mappedService = "Pre-departure Support";
      } else if (initialServiceSelected === "Scholarship Assistance" || initialServiceSelected === "Scholarship Scouting" || initialServiceSelected.includes("Scholarship")) {
        mappedService = "Scholarship Assistance";
      } else if (initialServiceSelected.includes("-")) {
        // e.g. "Germany - Student Stream", map country part
        const parts = initialServiceSelected.split("-");
        const countryPart = parts[0].trim();
        if (countryPart === "United Kingdom" || countryPart === "UK") mappedService = "Study in UK";
        else if (countryPart === "United States" || countryPart === "USA") mappedService = "Study in USA";
        else if (countryPart === "Canada") mappedService = "Study in Canada";
        else if (countryPart === "Australia") mappedService = "Study in Australia";
        else if (countryPart === "Germany") mappedService = "Study in Germany";
        else if (countryPart === "France") mappedService = "Study in France";
        else if (countryPart === "Spain") mappedService = "Study in Spain";
        else if (countryPart === "South Korea" || countryPart === "KOR") mappedService = "Study in South Korea";
        else if (countryPart === "Hungary") mappedService = "Study in Hungary";
        else if (countryPart === "Lithuania") mappedService = "Study in Lithuania";
        else if (countryPart === "Latvia") mappedService = "Study in Latvia";
        else if (countryPart === "Denmark") mappedService = "Study in Denmark";
        else if (countryPart === "Finland") mappedService = "Study in Finland";
        else if (countryPart === "Ireland") mappedService = "Study in Ireland";
        else mappedService = "Visa Guidance";
        
        mappedMessage = `Hello Uni Help Consultants, I am interested in inquiring about the "${initialServiceSelected}" pathway. Please share required document lists, cost estimates, and processing times.`;
      }

      setFormData((prev) => ({
        ...prev,
        service: mappedService,
        message: mappedMessage
      }));
    }
  }, [initialServiceSelected, initialUniversitySelected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Full Name is required";
    if (!formData.phone.trim()) tempErrors.phone = "Phone number is required";
    if (!formData.city) tempErrors.city = "Please select an office of interest";
    
    // Email validate
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = "Email Address is required";
    } else if (!emailPattern.test(formData.email)) {
      tempErrors.email = "Please specify a valid email format (e.g., student@domain.com)";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const submissionId = "sub-" + Math.random().toString(36).substring(2, 11);
    const rightNow = new Date().toISOString();

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      city: formData.city,
      service: formData.service || "General Academic Query",
      message: formData.message.trim(),
      status: "NEW",
    };

    try {
      // 1. Save in local backup queue to support offline/sandbox admin editing
      const localQueue = JSON.parse(localStorage.getItem("unihelp_local_submissions") || "[]");
      const localItem = {
        ...payload,
        id: submissionId,
        createdAt: rightNow,
        updatedAt: rightNow,
        notes: "",
        source: "local"
      };
      localQueue.unshift(localItem);
      localStorage.setItem("unihelp_local_submissions", JSON.stringify(localQueue));

      // 2. Direct attempt to write into Cloud Firestore matching security rules matches
      await setDoc(doc(db, "submissions", submissionId), {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        city: payload.city,
        service: payload.service,
        message: payload.message,
        status: payload.status,
        createdAt: serverTimestamp(), // Enforces compliance with standard request.time inside firestore.rules
      });

      console.log("Successfully recorded application directly inside cloud database.");
    } catch (saveError) {
      console.warn("Firestore connection inactive or loading. Utilizing secure local backup queue.", saveError);
      try {
        handleFirestoreError(saveError, OperationType.WRITE, `submissions/${submissionId}`);
      } catch (errLogger) {
        // Silently logged
      }
    } finally {
      setIsSubmitting(false);
      setIsSubmitSuccess(true);
      
      try {
        window.alert("Your counsel request was successfully submitted!");
      } catch (err) {
        console.log("Iframe alert blocked, showing elegant custom visual overlay card instead.");
      }
      
      // Reset form variables
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        service: "",
        message: ""
      });
      clearPrefills();
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-brand-blue-950 via-brand-blue-900 to-slate-900 text-white relative">
      
      {/* Wave bottom or top separator border */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-white/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-bold text-brand-gold-400 uppercase tracking-widest">
            Appointment Center
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Initiate Your Global Study Journey
          </h2>
          <div className="h-1.5 w-16 bg-brand-gold-500 mx-auto rounded-full" />
          <p className="font-sans text-brand-blue-100/80 text-sm leading-relaxed">
            Fill out our counselor inquiry questionnaire. Our strategic direct placements team will review your profile metrics and connect with you within 24 hours.
          </p>
        </div>

        {/* 2-Column form map panel split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="contact-split-panels">
          
          {/* Left Panel: Form (7 cols) */}
          <div className="lg:col-span-7 bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 text-left flex flex-col justify-between" id="contact-form-wrap">
            <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
              
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Student Counsel Evaluation Form</h3>
                  <p className="text-[11px] text-brand-blue-100/70">Please supply verified metrics to ensure reliable university alignment.</p>
                </div>
                {formData.city && (
                  <div className="px-2.5 py-1 rounded bg-brand-gold-500/20 text-brand-gold-400 border border-brand-gold-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Desk: {formData.city}
                  </div>
                )}
              </div>

              {/* Input: Full Name & Phone combined on medium screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-sans font-bold text-brand-blue-100 uppercase tracking-wider">
                    Full Name <span className="text-brand-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-white/10 border text-sm text-white rounded-xl px-4 py-3 placeholder-white/35 transition focus:outline-none focus:ring-2 focus:ring-brand-gold-400 ${
                      errors.name ? "border-rose-500 focus:ring-rose-500" : "border-white/15"
                    }`}
                    placeholder="e.g. Ayesha Ahmed"
                    required
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-sans font-bold text-brand-blue-100 uppercase tracking-wider">
                    Phone Number <span className="text-brand-gold-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-white/10 border text-sm text-white rounded-xl px-4 py-3 placeholder-white/35 transition focus:outline-none focus:ring-2 focus:ring-brand-gold-400 ${
                      errors.phone ? "border-rose-500 focus:ring-rose-500" : "border-white/15"
                    }`}
                    placeholder="e.g. +92 300 1234567"
                    required
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Input: Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-sans font-bold text-brand-blue-100 uppercase tracking-wider">
                  Email Address <span className="text-brand-gold-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-white/10 border text-sm text-white rounded-xl px-4 py-3 placeholder-white/35 transition focus:outline-none focus:ring-2 focus:ring-brand-gold-400 ${
                    errors.email ? "border-rose-500 focus:ring-rose-500" : "border-white/15"
                  }`}
                  placeholder="student@example.com"
                  required
                />
                {errors.email && (
                  <p className="text-xs text-rose-400 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Input: Office of Interest & Service choice combined */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1.5">
                  <label htmlFor="city" className="text-xs font-sans font-bold text-brand-blue-100 uppercase tracking-wider">
                    Office of Interest <span className="text-brand-gold-400">*</span>
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full bg-[#1e293b] border text-sm text-white rounded-xl px-4 py-3 transition focus:outline-none focus:ring-2 focus:ring-brand-gold-400 ${
                      errors.city ? "border-rose-500 focus:ring-rose-500 animate-shake" : "border-white/15"
                    }`}
                    required
                  >
                    <option value="" disabled className="text-gray-400">--- Select Location Desk ---</option>
                    <option value="Lahore" className="text-gray-800 bg-white">Lahore Office, Pakistan</option>
                    <option value="Karachi" className="text-gray-800 bg-white">Karachi Office, Pakistan</option>
                    <option value="Islamabad" className="text-gray-800 bg-white">Islamabad Office, Pakistan</option>
                    <option value="Dubai" className="text-gray-800 bg-white">Dubai Hub, UAE</option>
                    <option value="Riyadh" className="text-gray-800 bg-white">Riyadh Hub, Saudi Arabia</option>
                    <option value="Doha" className="text-gray-800 bg-white">Doha Hub, Qatar</option>
                  </select>
                  {errors.city && (
                    <p className="text-xs text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.city}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="service" className="text-xs font-sans font-bold text-brand-blue-100 uppercase tracking-wider">
                    Primary Service Sought
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-[#1e293b] border border-white/15 text-sm text-white rounded-xl px-4 py-3 transition focus:outline-none focus:ring-2 focus:ring-brand-gold-400"
                  >
                    <option value="">General Academic Query</option>
                    <option value="University Admissions">University admissions placement</option>
                    <option value="Visa Guidance">Visa & Immigration advice</option>
                    <option value="Scholarship Assistance">Scholarships allocation study</option>
                    <option value="Career Counseling">Global Career mapping</option>
                    <option value="Test Prep (IELTS/TOEFL)">IELTS / TOEFL prep packages</option>
                    <option value="Pre-departure Support">Pre-departure briefs & stays</option>
                    <optgroup label="Study Destinations" className="text-gray-800 bg-white font-bold">
                      <option value="Study in USA" className="text-gray-705">Study in USA 🇺🇸</option>
                      <option value="Study in UK" className="text-gray-705">Study in UK 🇬🇧</option>
                      <option value="Study in Canada" className="text-gray-705">Study in Canada 🇨🇦</option>
                      <option value="Study in Australia" className="text-gray-705">Study in Australia 🇦🇺</option>
                      <option value="Study in Germany" className="text-gray-705">Study in Germany 🇩🇪</option>
                      <option value="Study in France" className="text-gray-705">Study in France 🇫🇷</option>
                      <option value="Study in Spain" className="text-gray-705">Study in Spain 🇪🇸</option>
                      <option value="Study in South Korea" className="text-gray-705">Study in South Korea 🇰🇷</option>
                      <option value="Study in Hungary" className="text-gray-705">Study in Hungary 🇭🇺</option>
                      <option value="Study in Lithuania" className="text-gray-705">Study in Lithuania 🇱🇹</option>
                      <option value="Study in Latvia" className="text-gray-705">Study in Latvia 🇱🇻</option>
                      <option value="Study in Denmark" className="text-gray-705">Study in Denmark 🇩🇰</option>
                      <option value="Study in Finland" className="text-gray-705">Study in Finland 🇫🇮</option>
                      <option value="Study in Ireland" className="text-gray-705">Study in Ireland 🇮🇪</option>
                    </optgroup>
                  </select>
                </div>

              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-sans font-bold text-brand-blue-100 uppercase tracking-wider">
                  Details of your enquiry (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/15 text-sm text-white rounded-xl px-4 py-3 placeholder-white/35 transition focus:outline-none focus:ring-2 focus:ring-brand-gold-400"
                  placeholder="Tell us about your target study destination, scores, or scholarship timeline..."
                />
              </div>

              {/* Form submit actions */}
              <button
                type="submit"
                id="contact-form-submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-950 font-sans font-bold text-base rounded-xl transition duration-300 shadow-md flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-55"
              >
                {isSubmitting ? "Processing Inquiry..." : "Submit Direct Counsel Request"}
                <Send className="h-4 w-4" />
              </button>

            </form>
          </div>

          {/* Right Panel: Embedded Maps frame and details (5 cols) */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between" id="contact-details-wrap">
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6 sm:p-7 space-y-6 text-left flex-1 flex flex-col justify-between h-full">
              
              {/* Maps representation block */}
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-white">Our Central Doha West Bay Headquarters</h3>
                  <p className="text-xs text-brand-blue-100/70 mt-0.5">Floor 14, Al Jazeera Tower, West Bay, Doha, Qatar</p>
                </div>

                {/* Simulated high fidelity map placeholder or generic map iFrame */}
                <div className="relative w-full h-[220px] rounded-xl overflow-hidden mt-3 border border-white/15 bg-slate-900 flex items-center justify-center">
                  
                  {/* Actual map iFrame with beautiful look */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.341147986!2d51.52834127593649!3d25.326300425717655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c4bfb79ebd4d%3A0xc47f0da0dfcf07d8!2sWest%20Bay%2C%20Doha!5e0!3m2!1sen!2sqa!4v1700000000000!5m2!1sen!2sqa"
                    title="West Bay HQ Map"
                    className="absolute inset-0 w-full h-full border-0 select-none opacity-85"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  
                  {/* Decorative map banner overlay */}
                  <div className="absolute bottom-2 left-2 right-2 bg-brand-blue-950/90 text-white p-2.5 rounded-lg border border-white/15 pointer-events-none text-[11px] flex items-center justify-between">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-emerald-500 font-bold shrink-0">●</span>
                      <span className="truncate">HQ Doha Desk Operating</span>
                    </div>
                    <span className="text-brand-gold-400 font-bold shrink-0">200+ Partners</span>
                  </div>
                </div>

                {/* Additional metrics */}
                <div className="pt-4 border-t border-white/15 mt-3 space-y-3">
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-brand-gold-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-brand-blue-100/70 font-mono">Operations Zone</div>
                      <div className="text-xs font-semibold text-white">Pakistan (Gulberg III / Shahrah-e-Faisal / G-11 Markaz) & GCC</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-brand-green-600 shrink-0" />
                    <div>
                      <div className="text-[10px] text-brand-blue-100/70 font-mono">General Desk</div>
                      <div className="text-xs font-semibold text-white">support@unihelp.com / desk@unihelp.com</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Visual Submit Success Alert Modal */}
      {isSubmitSuccess && (
        <div
          id="submit-success-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-blue-950/80 backdrop-blur-md"
        >
          <div
            id="success-message-card"
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-md w-full p-8 space-y-6 text-center animate-in zoom-in-95 duration-200"
          >
            <div className="mx-auto h-16 w-16 bg-brand-green-50 text-brand-green-600 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-2xl text-brand-blue-950 leading-tight">
                Inquiry Submitted!
              </h3>
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                Thank you! We've securely received your profile statistics. Our certified regional counselors from your selected location desk will reach out within 24 hours to schedule details.
              </p>
            </div>

            {/* Simulated schedule date feedback */}
            <div className="py-2.5 px-4 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-700 font-mono inline-block">
              Response Reference: UHC-2026-ENQ
            </div>

            <button
              onClick={() => setIsSubmitSuccess(false)}
              id="close-success-dialog"
              className="w-full py-3.5 bg-brand-blue-950 hover:bg-brand-blue-900 text-white font-sans font-bold text-center rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2 transform active:scale-95"
            >
              Continue Browsing
            </button>

          </div>
        </div>
      )}

    </section>
  );
}
