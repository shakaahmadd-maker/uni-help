import { TESTIMONIALS_DATA } from "../data";
import { Star, Quote, Award } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gray-100" />

      {/* Background shape */}
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-gold-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Module Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-bold text-brand-gold-500 uppercase tracking-widest">
            Client Stories
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-blue-950 tracking-tight">
            Loved and Trusted by Over 5,000+ Placed Students
          </h2>
          <div className="h-1.5 w-16 bg-brand-blue-600 mx-auto rounded-full" />
          <p className="font-sans text-gray-500 text-sm leading-relaxed">
            Discover how our professional counselors streamlined university applications, optimized portfolios, and secured student visas smoothly.
          </p>
        </div>

        {/* Grid display layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              id={`testimonial-card-${idx}`}
              className="bg-gray-50/50 rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm relative text-left flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              
              <div className="space-y-4">
                {/* Rating row and large quote decoration */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-brand-gold-500">
                    {[...Array(testimonial.rating)].map((_, rIdx) => (
                      <Star key={rIdx} className="h-4 w-4 fill-brand-gold-500" />
                    ))}
                  </div>
                  
                  {/* Absolute quote */}
                  <Quote className="h-8 w-8 text-brand-blue-600/10 stroke-[2] shrink-0" />
                </div>

                {/* Main feedback text */}
                <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
              </div>

              {/* Student details footer section */}
              <div className="pt-6 border-t border-gray-100 mt-6 flex items-center gap-3.5">
                
                {/* Custom Avatar Placeholder with Initials to avoid unreliable random URLs if blocking */}
                <div className="h-11 w-11 rounded-full bg-brand-blue-950 text-brand-gold-400 font-bold text-sm tracking-wide flex items-center justify-center shrink-0 border border-brand-blue-800">
                  {testimonial.name.split(" ").map(n => n[0]).join("")}
                </div>

                <div className="min-w-0">
                  <h4 className="font-display font-bold text-sm text-brand-blue-950 truncate">
                    {testimonial.name}
                  </h4>
                  <div className="text-[10px] text-brand-blue-600 font-bold uppercase tracking-wider mt-0.5 truncate">
                    {testimonial.course}
                  </div>
                  
                  <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1 truncate">
                    <Award className="h-3 w-3 text-brand-green-600 shrink-0" />
                    <span className="font-semibold">{testimonial.universityName}</span>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
