import React, { useState } from "react";
import { LOCATIONS_DATA } from "../data";
import { LocationInfo } from "../types";
import { MapPin, Phone, Mail, Building, Clock, ArrowRight, Compass } from "lucide-react";

interface LocationsSectionProps {
  onContactCity: (cityName: string) => void;
}

export default function LocationsSection({ onContactCity }: LocationsSectionProps) {
  const [selectedCity, setSelectedCity] = useState<LocationInfo>(LOCATIONS_DATA[0]);

  return (
    <section id="locations" className="py-20 bg-gray-50/70 relative">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gray-200" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Module Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-bold text-brand-blue-600 uppercase tracking-widest flex items-center justify-center gap-1">
            <Compass className="h-4 w-4 animate-spin" style={{ animationDuration: "10s" }} />
            <span>Global Footprint</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-blue-950 tracking-tight">
            Our Physical Presence Across 6 Strategic Hubs
          </h2>
          <div className="h-1.5 w-16 bg-brand-green-600 mx-auto rounded-full" />
          <p className="font-sans text-gray-500 text-sm leading-relaxed">
            Walk into any of our physical office locations in Pakistan or the GCC region for face-to-face academic evaluations and secure filing briefings.
          </p>
        </div>

        {/* Outer Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-6">
          
          {/* Left: Office Selection roster grid (7 cols) */}
          <div className="lg:col-span-7 space-y-4" id="office-selector-roster">
            <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-gray-500 text-left mb-2">
              Select City Office:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LOCATIONS_DATA.map((location) => {
                const isCurrent = selectedCity.city === location.city;
                return (
                  <button
                    key={location.city}
                    onClick={() => setSelectedCity(location)}
                    id={`city-btn-${location.city.toLowerCase()}`}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 transform outline-none focus:outline-none flex flex-col justify-between h-[180px] ${
                      isCurrent
                        ? "bg-white border-brand-blue-600 shadow-md ring-2 ring-brand-blue-600/10"
                        : "bg-white/80 border-gray-100 hover:border-gray-300 hover:shadow shadow-sm"
                    }`}
                  >
                    <div>
                      {/* Flag and City Name */}
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-lg text-brand-blue-950">
                          {location.city}
                        </span>
                        
                        {/* Region Flag Badge */}
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-gray-100 text-[10px] font-sans font-bold text-gray-700">
                          <span>{location.flag}</span>
                          <span>{location.country}</span>
                        </div>
                      </div>

                      {/* Snippet preview */}
                      <p className="font-sans text-xs text-gray-500 line-clamp-2 mt-3 leading-relaxed">
                        {location.address}
                      </p>
                    </div>

                    {/* Footer highlight metrics */}
                    <div className="pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] text-brand-blue-600 font-semibold uppercase tracking-wider">
                      <span>{isCurrent ? "Active Selection" : "Click to Inspect"}</span>
                      <ArrowRight className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        isCurrent ? "translate-x-1 text-brand-gold-500" : "text-gray-400"
                      }`} />
                    </div>

                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Office High-Fidelity Profile Drawer (5 cols) */}
          <div className="lg:col-span-5" id="selected-office-panel">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 space-y-6 text-left relative overflow-hidden">
              
              {/* Background gradient top bar */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-brand-blue-600" />

              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedCity.flag}</span>
                    <h3 className="font-display font-extrabold text-2xl text-brand-blue-950">
                      {selectedCity.city}
                    </h3>
                  </div>
                  <p className="text-[10px] font-mono font-medium uppercase tracking-wider text-brand-green-600">
                    Officially Licensed Branch Office
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-brand-blue-50 text-brand-blue-600 flex items-center justify-center shrink-0">
                  <Building className="h-5 w-5" />
                </div>
              </div>

              {/* Address detail */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-gray-50 text-gray-400 mt-0.5">
                    <MapPin className="h-4.5 w-4.5 text-brand-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Office Address</div>
                    <p className="text-sm font-sans text-gray-700 leading-relaxed font-semibold">
                      {selectedCity.address}
                    </p>
                  </div>
                </div>

                {/* Hours / Schedule */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-gray-50 text-gray-400 mt-0.5">
                    <Clock className="h-4.5 w-4.5 text-brand-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Office Hours</div>
                    <p className="text-xs text-gray-600 font-sans">
                      Monday – Saturday, 9:00 AM – 6:00 PM <span className="text-xs font-semibold text-brand-green-700">(GMT+5 / UAE/KSA regional times)</span>
                    </p>
                  </div>
                </div>

                {/* Direct Telephones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <a
                    href={`tel:${selectedCity.phone}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 hover:bg-gray-100/70 border border-gray-100 transition group"
                  >
                    <Phone className="h-4 w-4 text-brand-green-600 shrink-0 group-hover:scale-110 transition" />
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Call Direct</div>
                      <div className="text-xs font-semibold text-gray-700">{selectedCity.phone}</div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${selectedCity.email}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 hover:bg-gray-100/70 border border-gray-100 transition group"
                  >
                    <Mail className="h-4 w-4 text-brand-blue-600 shrink-0 group-hover:scale-110 transition" />
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Write Email</div>
                      <div className="text-xs font-semibold text-gray-700">{selectedCity.email}</div>
                    </div>
                  </a>
                </div>

                {/* Operating Note summary */}
                <div className="p-4 rounded-xl bg-brand-blue-50/70 border border-brand-blue-100/40 text-xs text-gray-600 leading-relaxed">
                  <strong>Specific note:</strong> {selectedCity.note}
                </div>

              </div>

              {/* Booking Trigger redirection inside Profile */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => onContactCity(selectedCity.city)}
                  id="office-direction-btn"
                  className="flex-1 py-3 text-center bg-brand-blue-950 hover:bg-brand-blue-900 text-white rounded-xl text-xs font-bold transition duration-300 shadow-md active:scale-95"
                >
                  Contact {selectedCity.city} Desk
                </button>
                
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedCity.city + " " + selectedCity.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 text-center bg-white border border-gray-200 hover:border-brand-blue-300 text-gray-700 hover:text-brand-blue-600 rounded-xl text-xs font-bold transition duration-300 flex items-center justify-center gap-1.5 focus:outline-none"
                >
                  Get Directions
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
