import { GraduationCap, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

interface HeroProps {
  onCtaClick: (sectionId: string) => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-brand-blue-950 via-brand-blue-900 to-brand-blue-950 text-white overflow-hidden"
    >
      {/* Dynamic Background Shapes */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-brand-blue-600 blur-3xl" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-green-700 blur-3xl animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute -bottom-20 left-[30%] w-80 h-80 rounded-full bg-brand-gold-500 blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c715_1px,transparent_1px),linear-gradient(to_bottom,#0284c715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Left Copy */}
          <div className="lg:col-span-7 space-y-6 text-left" id="hero-content">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-brand-gold-400 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="h-4 w-4 fill-brand-gold-400/20" />
              <span>Certified Study Abroad Counselors</span>
            </div>

            {/* H1 Headline */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white">
              Study Abroad Made Easy –{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-400 via-brand-gold-500 to-amber-300">
                360° University
              </span>{" "}
              Admission Support
            </h1>

            {/* Subtext description */}
            <p className="font-sans text-base sm:text-lg text-brand-blue-100/90 leading-relaxed max-w-2xl">
              Connect with executive counselors globally. We optimize your profiles, assist in filing secure student visa requests, uncover partial scholarships, and pave secure pathways into premier institutions worldwide.
            </p>

            {/* Primary Action Row */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => onCtaClick("contact")}
                id="hero-free-consultation"
                className="px-8 py-4 bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-950 font-sans font-bold text-base rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-brand-gold-500/20 flex items-center justify-center gap-2 group-hover:scale-105 active:scale-95"
              >
                Free Consultation
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={() => onCtaClick("services")}
                id="hero-explore-services"
                className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-sans font-semibold text-base rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 active:scale-95"
              >
                Explore Services
              </button>
            </div>

            {/* Quick trust metrics line */}
            <div className="pt-6 flex flex-wrap items-center gap-y-3 gap-x-6 border-t border-white/10 text-xs sm:text-sm text-brand-blue-100/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-gold-400" />
                <span>Authorized Agency Partner</span>
              </div>
              <div className="hidden sm:block text-white/20">•</div>
              <div>Direct Admissions Pathways</div>
              <div className="hidden sm:block text-white/20">•</div>
              <div>IELTS Benchmarked Scorers</div>
            </div>

          </div>

          {/* Luxury Visual Hero Card / Collage */}
          <div className="lg:col-span-5 relative" id="hero-graphic">
            <div className="relative mx-auto max-w-[360px] sm:max-w-[420px] lg:max-w-none">
              
              {/* Decorative Accent Ring */}
              <div className="absolute inset-x-0 -top-6 -bottom-6 border-2 border-brand-gold-400/20 border-dashed rounded-3xl pointer-events-none rotate-2 scale-102" />

              {/* Main Content Card representation */}
              <div className="relative bg-gradient-to-b from-brand-blue-900 to-brand-blue-950 rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                
                {/* Simulated Student Profile */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-brand-gold-400 text-brand-blue-950 font-bold flex items-center justify-center text-sm shadow-md">
                        US
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Admissions Pipeline</div>
                        <div className="text-[10px] text-brand-blue-100/70 font-mono tracking-wider">Active Enrollment Cycle</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-brand-green-700/60 text-brand-green-50 text-[10px] font-bold uppercase tracking-wider">
                      Live Status
                    </span>
                  </div>

                  {/* Flow items */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-brand-blue-600 text-white flex items-center justify-center font-mono text-xs font-bold mt-0.5">
                        ✓
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-white">University Selection Audit</div>
                        <p className="text-[11px] text-brand-blue-100/70">Matched list spanning Top 200 institutions</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-brand-blue-600 text-white flex items-center justify-center font-mono text-xs font-bold mt-0.5">
                        ✓
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-white">Drafting & Sop Review</div>
                        <p className="text-[11px] text-brand-blue-100/70">Custom tailored drafts highlighting accomplishments</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-brand-gold-500 text-brand-blue-950 flex items-center justify-center font-mono text-xs font-bold mt-0.5">
                        ★
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-brand-gold-400">Visa Filing & Prep</div>
                        <p className="text-[11px] text-brand-blue-100/70 font-medium">Interview simulation training complete & validated</p>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badge Strip */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-center gap-2">
                    <div>
                      <div className="text-xl font-display font-extrabold text-brand-gold-400 leading-none">98%</div>
                      <div className="text-[9px] uppercase tracking-wider text-brand-blue-100/70 mt-1 font-semibold">Visa Success</div>
                    </div>
                    <div className="border-l border-white/10 h-8" />
                    <div>
                      <div className="text-xl font-display font-extrabold text-white leading-none">5000+</div>
                      <div className="text-[9px] uppercase tracking-wider text-brand-blue-100/70 mt-1 font-semibold">Placements</div>
                    </div>
                    <div className="border-l border-white/10 h-8" />
                    <div>
                      <div className="text-xl font-display font-extrabold text-white leading-none">200+</div>
                      <div className="text-[9px] uppercase tracking-wider text-brand-blue-100/70 mt-1 font-semibold">Partners</div>
                    </div>
                  </div>

                </div>

                {/* Styled decorative elements inside mock */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-44 w-44 rounded-full bg-brand-blue-600/10 blur-xl pointer-events-none" />

              </div>
              
              {/* Supporting Little Floating Badges */}
              <div className="absolute -left-6 bottom-8 bg-brand-blue-950 border border-white/20 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 select-none">
                <div className="p-1.5 bg-brand-green-600 text-white rounded-lg">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] text-brand-blue-100 font-medium">Scholarships</div>
                  <div className="text-xs font-bold text-white">Full & Partial Match</div>
                </div>
              </div>

            </div>

            {/* Immigration Redirection Button */}
            <div className="mt-6 flex justify-center w-full">
              <button
                onClick={() => onCtaClick("immigration")}
                id="hero-immigration-redirect"
                className="w-full max-w-[360px] sm:max-w-[420px] lg:max-w-none px-6 py-4 bg-gradient-to-r from-amber-500 via-brand-gold-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-brand-blue-950 font-sans font-bold rounded-2xl shadow-xl shadow-brand-gold-500/10 flex items-center justify-between gap-4 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-brand-gold-500/25 active:scale-98 group border border-white/10 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-blue-950/10 rounded-xl">
                    <Sparkles className="h-5 w-5 text-brand-blue-950 animate-pulse" />
                  </div>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[9px] uppercase font-mono tracking-wider text-brand-blue-900/70 font-bold">Immigration Unit</span>
                    <span className="text-sm font-extrabold tracking-tight">Immigration by UniHelp Consultants</span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-brand-blue-950 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
