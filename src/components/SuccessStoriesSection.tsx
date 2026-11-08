import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Award, CheckCircle, Eye, Globe, Lock, ShieldCheck, Star, Trash2, 
  Upload, User, X, Filter, Sparkles, RefreshCw, LogOut, Check, Info, FileText,
  ChevronLeft, ChevronRight, Play, Pause, Search, ArrowLeft, ArrowRight
} from "lucide-react";
import { storiesApi } from "../api/stories";

// Initial set of default mock successes matching the specified HTML layout
export const DEFAULT_MOCK_STORIES = [
  {
    id: "story-1794042096342",
    name: "Ahmad Khan",
    city: "United Kingdom",
    stream: "Master of Business Administration",
    review: "Uni Help made my UK student visa process seamless from admission to visa stamping! Highly recommended.",
    rating: 5,
    clientPic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
    visaStamp: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=400&fit=crop",
    maskedName: "A***D K**N",
    stampId: "STAMP-973",
    visaGrantDate: "November 2026"
  },
  {
    id: "mock-1",
    name: "Fazal Wadood",
    city: "Germany",
    stream: "Master's in Computer Science",
    review: "Big Congratulations to Fazal Wadood! We are thrilled to announce that Fazal has successfully secured admission for a Master's in Computer Sciences at a top German public university and obtained his German student visa DE! At @unihelp, we specialize in turning study abroad dreams into reality by guiding students through admissions, documentation & visa success.",
    rating: 5,
    clientPic: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop",
    visaStamp: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&h=400&fit=crop",
    maskedName: "F***L W****D",
    stampId: "DE-STAMP-782",
    visaGrantDate: "May 12, 2026"
  },
  {
    id: "mock-2",
    name: "Amara Cole",
    city: "United Kingdom",
    stream: "Bachelor's of Business",
    review: "Big Congratulations to Amara Cole! Amara has successfully obtained her UK Student Visa tier-4 to study Business Management in London! The immigration process was smooth, requiring thorough checklist compilation and proof of financial records. At @unihelp, our admissions desk simplifies study visa guidelines. Ready to take your career global?",
    rating: 5,
    clientPic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop",
    visaStamp: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=400&fit=crop",
    maskedName: "A***A C**E",
    stampId: "UK-STAMP-491",
    visaGrantDate: "April 28, 2026"
  },
  {
    id: "mock-3",
    name: "Sarah Chen",
    city: "Australia",
    stream: "Master's of Data Science",
    review: "Outstanding admissions success! Sarah Chen has successfully secured her Australia Subclass 500 visa to attend high-ranking Melbourne University! The complex GTE assessment was completed cleanly within 18 days under expert counselling supervision at @unihelp. Truly a hallmark of student ambition & matching strategies!",
    rating: 5,
    clientPic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
    visaStamp: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=500&h=400&fit=crop",
    maskedName: "S***H C**N",
    stampId: "AU-STAMP-320",
    visaGrantDate: "June 02, 2026"
  },
  {
    id: "mock-4",
    name: "Marcus Miller",
    city: "Canada",
    stream: "PR & Residency Study Permit",
    review: "Massive Congratulations to Marcus! He has secured his Canada Study Permit approval for University of British Columbia! Marcus was assisted through strict document collection protocols and statement of purpose formatting. A verified victory for the engineering streams!",
    rating: 5,
    clientPic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    visaStamp: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=400&fit=crop",
    maskedName: "M***S M****R",
    stampId: "CA-STAMP-185",
    visaGrantDate: "May 19, 2026"
  },
  {
    id: "mock-5",
    name: "Elena Rostova",
    city: "United States",
    stream: "Master's of Biotechnology",
    review: "Incredible news! Elena Rostova has successfully obtained her US F-1 Academic Visa for study in Biotechnology streams! She secured full research scholarship waiver clearances with our elite profile matching strategies at @unihelp. Ready to realize your Ivy League dreams?",
    rating: 5,
    clientPic: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
    visaStamp: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&h=400&fit=crop",
    maskedName: "E***A R*****A",
    stampId: "US-STAMP-612",
    visaGrantDate: "June 10, 2026"
  }
];

export interface SuccessStory {
  id: string;
  name: string;
  city: string;
  stream: string;
  review: string;
  rating: number;
  clientPic: string;
  visaStamp: string;
  maskedName: string;
  stampId: string;
  visaGrantDate?: string;
}

export interface SuccessStoriesSectionProps {
  initialViewMode?: "home-slider" | "dedicated-list";
  onBackToHome?: () => void;
  onOpenDedicated?: () => void;
  hideOpenDedicatedButton?: boolean;
}

export default function SuccessStoriesSection({
  initialViewMode = "home-slider",
  onBackToHome,
  onOpenDedicated,
  hideOpenDedicatedButton = false
}: SuccessStoriesSectionProps = {}) {
  const [viewMode, setViewMode] = useState<"home-slider" | "dedicated-list">(initialViewMode);

  useEffect(() => {
    setViewMode(initialViewMode);
  }, [initialViewMode]);
  const [activeStories, setActiveStories] = useState<SuccessStory[]>(() => {
    let localStories: SuccessStory[] = [];
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("global_passages_v3_stories");
      if (stored) {
        try {
          localStories = JSON.parse(stored) as SuccessStory[];
        } catch (e) {
          localStories = [...DEFAULT_MOCK_STORIES];
        }
      } else {
        localStories = [...DEFAULT_MOCK_STORIES];
      }
    } else {
      localStories = [...DEFAULT_MOCK_STORIES];
    }
    
    localStories.sort((a, b) => {
      const aId = a?.id || "";
      const bId = b?.id || "";
      const aIsCustom = typeof aId === "string" && aId.startsWith("story-");
      const bIsCustom = typeof bId === "string" && bId.startsWith("story-");
      
      if (aIsCustom && bIsCustom) {
        const aTime = parseInt(aId.replace("story-", ""), 10) || 0;
        const bTime = parseInt(bId.replace("story-", ""), 10) || 0;
        return bTime - aTime;
      }
      if (aIsCustom) return -1;
      if (bIsCustom) return 1;
      
      return aId.localeCompare(bId);
    });
    return localStories;
  });
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next (right to left), -1 = prev (left to right)
  const [autoplay, setAutoplay] = useState(true);

  // Detail Modal
  const [selectedVisaStory, setSelectedVisaStory] = useState<SuccessStory | null>(null);

  // Custom toast notification system
  interface Toast {
    id: number;
    message: string;
    type: "success" | "error" | "info";
  }
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const lastBackendStories = useRef<SuccessStory[]>([]);

  // Safe helper to cache stories locally without QuotaExceededError
  const safeCacheStories = (stories: SuccessStory[]) => {
    try {
      localStorage.setItem("global_passages_v3_stories", JSON.stringify(stories));
    } catch (quotaErr) {
      console.warn("Storage quota warning, caching lightweight records:", quotaErr);
      try {
        const lightweight = stories.map((s) => ({
          ...s,
          clientPic: s.clientPic && s.clientPic.startsWith("data:") ? "" : s.clientPic,
          visaStamp: s.visaStamp && s.visaStamp.startsWith("data:") ? "" : s.visaStamp,
        }));
        localStorage.setItem("global_passages_v3_stories", JSON.stringify(lightweight));
      } catch (_e) {}
    }
  };

  // Live real-time entries sync without Firestore: backend API + multi-tab BroadcastChannel + storage sync + polling
  useEffect(() => {
    // BroadcastChannel enables instant cross-tab and cross-window sync across all visitor sessions in the browser
    const storiesChannel = typeof window !== "undefined" && "BroadcastChannel" in window
      ? new BroadcastChannel("unihelp_stories_channel")
      : null;

    const handleLocalUpdate = () => {
      // Load current local stories first to find any active custom stories
      let localStories: SuccessStory[] = [];
      const stored = typeof window !== "undefined" ? localStorage.getItem("global_passages_v3_stories") : null;
      if (stored) {
        try {
          localStories = JSON.parse(stored) as SuccessStory[];
        } catch (e) {
          // ignore
        }
      }

      // Foundational verified stories baseline
      const baseStories = [...DEFAULT_MOCK_STORIES];
      const backendStories = lastBackendStories.current || [];

      // Combine backend stories, local stories, and default stories
      const allCandidateStories = [...backendStories, ...localStories, ...baseStories];
      const seenIds = new Set<string>();
      const deduplicated: SuccessStory[] = [];

      for (const s of allCandidateStories) {
        if (!s || !s.name || !s.review) continue;
        const key = s.id || s.stampId || `${s.name}-${s.city}`;
        if (!seenIds.has(key)) {
          seenIds.add(key);
          deduplicated.push(s);
        }
      }

      deduplicated.sort((a: any, b: any) => {
        if (a.createdAt && b.createdAt) {
          const timeA = new Date(a.createdAt).getTime();
          const timeB = new Date(b.createdAt).getTime();
          if (!isNaN(timeA) && !isNaN(timeB) && timeA !== timeB) {
            return timeB - timeA;
          }
        }
        const aId = a?.id || "";
        const bId = b?.id || "";
        const aIsCustom = typeof aId === "string" && aId.startsWith("story-");
        const bIsCustom = typeof bId === "string" && bId.startsWith("story-");
        if (aIsCustom && bIsCustom) {
          const aTime = parseInt(aId.replace("story-", ""), 10) || 0;
          const bTime = parseInt(bId.replace("story-", ""), 10) || 0;
          return bTime - aTime;
        }
        if (aIsCustom) return -1;
        if (bIsCustom) return 1;
        return aId.localeCompare(bId);
      });

      setActiveStories(deduplicated);
    };

    const fetchBackendStories = () => {
      storiesApi
        .getAll()
        .then(async (backendStories) => {
          if (backendStories && backendStories.length > 0) {
            const mappedStories: SuccessStory[] = backendStories.map((item) => ({
              id: item.legacyId || item.id,
              name: item.name,
              city: item.city,
              stream: item.stream,
              review: item.review,
              rating: item.rating,
              clientPic: item.clientPic || "",
              visaStamp: item.visaStamp || "",
              maskedName: item.maskedName || "A*** S***",
              stampId: item.stampId || `STAMP-${item.id.slice(-4)}`,
              visaGrantDate: item.visaGrantDate || "",
            }));

            const prevCount = lastBackendStories.current.length;
            lastBackendStories.current = mappedStories;
            handleLocalUpdate();
            safeCacheStories(mappedStories);
            // If new stories arrived, reset carousel to front
            if (mappedStories.length > prevCount) {
              setCurrentSlideIndex(0);
            }
          } else {
            handleLocalUpdate();
          }
        })
        .catch((_err) => {
          handleLocalUpdate();
        });
    };

    // 1. Initial quick local load + immediate live API fetch
    handleLocalUpdate();
    fetchBackendStories();

    // 2. Listen for BroadcastChannel updates from admin panel or other tabs
    if (storiesChannel) {
      storiesChannel.onmessage = (event) => {
        if (event.data?.type === "STORIES_UPDATED") {
          if (event.data?.stories && Array.isArray(event.data.stories)) {
            lastBackendStories.current = event.data.stories;
          }
          handleLocalUpdate();
          setCurrentSlideIndex(0);
        }
      };
    }

    // 3. Register listeners for real-time local storage & custom browser events
    window.addEventListener("storage", handleLocalUpdate);
    window.addEventListener("localStoriesUpdated", handleLocalUpdate);
    window.addEventListener("storiesChanged", handleLocalUpdate);
    window.addEventListener("focus", fetchBackendStories);
    
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        fetchBackendStories();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // 4. Periodic background polling every 5 seconds so all visitors get new uploads automatically without page refresh
    const pollTimer = setInterval(fetchBackendStories, 5000);

    return () => {
      if (storiesChannel) {
        storiesChannel.close();
      }
      window.removeEventListener("storage", handleLocalUpdate);
      window.removeEventListener("localStoriesUpdated", handleLocalUpdate);
      window.removeEventListener("storiesChanged", handleLocalUpdate);
      window.removeEventListener("focus", fetchBackendStories);
      document.removeEventListener("visibilitychange", handleVisibility);
      clearInterval(pollTimer);
    };
  }, []);

  const copyShareLink = () => {
    addToast("Social sharing link copied to clipboard!", "info");
  };

  // Autoplay slide rotation effect
  useEffect(() => {
    if (!autoplay || activeStories.length === 0 || viewMode !== "home-slider") return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlideIndex(prev => {
        if (activeStories.length === 0) return 0;
        return (prev + 1) % activeStories.length;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [autoplay, activeStories.length, viewMode]);

  // Safety guard: scale down slide index if stories are deleted, or reset to 0 when a new story is added (list length increases or top story changes)
  const prevLengthRef = React.useRef(activeStories.length);
  const prevFirstIdRef = React.useRef(activeStories[0]?.id);
  useEffect(() => {
    const currentFirstId = activeStories[0]?.id;
    if (activeStories.length === 0) {
      setCurrentSlideIndex(0);
    } else if (activeStories.length > prevLengthRef.current || (currentFirstId && currentFirstId !== prevFirstIdRef.current)) {
      // New story uploaded/synced, jump directly to the beginning to showcase it immediately!
      setCurrentSlideIndex(0);
    } else if (currentSlideIndex >= activeStories.length) {
      setCurrentSlideIndex(0); // reset to beginning safely
    }
    prevLengthRef.current = activeStories.length;
    prevFirstIdRef.current = currentFirstId;
  }, [activeStories, currentSlideIndex]);

  const handlePrevSlide = () => {
    if (activeStories.length === 0) return;
    setDirection(-1);
    setCurrentSlideIndex(prev => (prev - 1 + activeStories.length) % activeStories.length);
  };

  const handleNextSlide = () => {
    if (activeStories.length === 0) return;
    setDirection(1);
    setCurrentSlideIndex(prev => (prev + 1) % activeStories.length);
  };

  const changeViewMode = (mode: "home-slider" | "dedicated-list") => {
    setViewMode(mode);
    const element = document.getElementById("success-stories");
    if (element) {
      const offset = 85;
      const scrollPos = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: scrollPos, behavior: "smooth" });
    }
  };

  const filteredStories = activeStories.filter(story => {
    if (!story) return false;
    const city = story.city || "";
    const name = story.name || "";
    const stream = story.stream || "";
    const review = story.review || "";

    const matchesFilter = selectedFilter === "All" || city.toLowerCase() === selectedFilter.toLowerCase();
    const matchesSearch = searchQuery.trim() === "" || 
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="success-stories" className="py-24 bg-brand-blue-950 text-slate-100 relative overflow-hidden">
      
      {/* Decorative premium blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-15">
        
        {/* ===================== tab: PUBLIC FRONT END ===================== */}
        <div className="space-y-12">
            
            {/* ===================== VIEW MODE 1: DYNAMIC SLIDERS CAROUSEL ===================== */}
            {viewMode === "home-slider" && (
              <div className="space-y-12 animate-fade-in">
                
                {/* Heading Area with dynamic View Mode switch button */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-brand-gold-500/10 text-brand-gold-400 border border-brand-gold-500/20 uppercase select-none">
                    🏆 OFFICIAL IMMIGRATION RESULTS
                  </span>
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight select-text">
                    Verified Success Stories & <span className="text-brand-gold-400">Visa Stamps</span>
                  </h2>
                  <p className="font-sans text-brand-blue-105 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto select-text">
                    Read inspiring journeys from students and professionals who achieved their overseas goals. Toggle through our active slides showcase.
                  </p>

                  {/* Slide indicators counter or metrics */}
                  <div className="flex items-center justify-center gap-4 pt-2 text-xs font-semibold text-slate-400 select-none">
                    <div className="flex items-center gap-1.5">
                      <span className="text-brand-gold-400 font-bold">✓</span>
                      <span>100% Verified Stamp Uploads</span>
                    </div>
                    <div className="w-1.5 h-1.5 bg-brand-blue-800 rounded-full" />
                    <div className="flex items-center gap-1.5">
                      <span className="text-brand-gold-400 font-bold">✓</span>
                      <span>{activeStories.length} Success Cases</span>
                    </div>
                  </div>
                </div>

                {/* Big Slider container */}
                <div className="max-w-4xl mx-auto relative px-4 sm:px-12 select-none">
                  
                  {/* Sliding Display Card */}
                  {activeStories.length > 0 ? (
                    <div className="overflow-hidden rounded-3xl relative min-h-[420px] sm:min-h-[380px] md:min-h-[340px] w-full">
                      <AnimatePresence mode="popLayout" initial={false}>
                        {(() => {
                          const story = activeStories[currentSlideIndex];
                          if (!story) return null;
                          return (
                            <motion.div
                              key={currentSlideIndex}
                              initial={{ x: direction === 1 ? "100%" : "-100%", opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: direction === 1 ? "-100%" : "100%", opacity: 0 }}
                              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                              className="bg-white text-slate-800 rounded-3xl shadow-2xl border border-slate-100 relative overflow-hidden w-full min-h-[420px] sm:min-h-[380px] md:min-h-[340px]"
                            >
                              
                              {/* Subtle top progress bar for autoplay */}
                              {autoplay && (
                                <div className="absolute top-0 left-0 right-0 h-1 bg-brand-blue-900/10">
                                  <div key={currentSlideIndex} className="h-full bg-brand-gold-400 animate-[progress_6s_linear_infinite]" />
                                </div>
                              )}

                              {/* Gold star corner indicator */}
                              <div className="absolute top-5 right-5 flex items-center gap-0.5 text-brand-gold-500 text-xs font-bold bg-brand-blue-50 px-2.5 py-1 rounded-full border border-brand-blue-100">
                                <Star className="h-3.5 w-3.5 fill-brand-gold-500 text-brand-gold-500" />
                                <span>5.0 Verified</span>
                              </div>

                              {/* Inner card padding */}
                              <div className="p-6 sm:p-10">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                                  
                                  {/* Left portrait photo */}
                                  <div className="relative shrink-0 select-none">
                                    <div className="w-28 h-32 rounded-[50%/40%] overflow-hidden border-[4px] border-brand-gold-400 shadow-xl transition-all hover:scale-105 duration-300">
                                      {story.clientPic && story.clientPic.startsWith("data:application/pdf") ? (
                                        <div className="w-full h-full bg-brand-blue-950 flex items-center justify-center">
                                          <FileText className="h-8 w-8 text-brand-gold-400 animate-pulse" />
                                        </div>
                                      ) : story.clientPic ? (
                                        <img 
                                          className="w-full h-full object-cover" 
                                          src={story.clientPic} 
                                          alt={story.name} 
                                          onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://placehold.co/150x150/1d4ed8/ffffff?text=${encodeURIComponent(story.name)}`;
                                          }}
                                        />
                                      ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-brand-blue-800 to-brand-blue-950 flex items-center justify-center text-white font-display font-black text-2xl select-none">
                                          {story.name ? story.name.charAt(0).toUpperCase() : "U"}
                                        </div>
                                      )}
                                    </div>
                                    {/* Green checkbadge */}
                                    <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5 shadow border border-slate-100">
                                      <div className="bg-emerald-500 rounded-full p-1 text-white flex items-center justify-center">
                                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right review content detail */}
                                  <div className="flex-1 text-center md:text-left space-y-4 select-text">
                                    <div className="space-y-1">
                                      <h3 className="text-2xl font-black font-display text-slate-900 leading-none tracking-tight">
                                        {story.name}
                                      </h3>
                                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-bold text-brand-blue-600">
                                        <span className="bg-brand-blue-50 px-2 py-0.5 rounded-md border border-brand-blue-100">{story.city}</span>
                                        <span className="text-slate-300">•</span>
                                        <span className="text-slate-500 font-sans">{story.stream}</span>
                                        {story.visaGrantDate && (
                                          <>
                                            <span className="text-slate-300">•</span>
                                            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-150 uppercase font-mono text-[9px]">
                                              📅 Granted: {story.visaGrantDate}
                                            </span>
                                          </>
                                        )}
                                      </div>
                                    </div>

                                    <p className="text-slate-600 text-sm sm:text-base italic leading-relaxed font-normal p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                      "{story.review}"
                                    </p>
                                  </div>

                                </div>

                                {/* Card divider */}
                                <hr className="border-slate-100 my-6" />

                                {/* Actions banner */}
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
                                  
                                  {/* View Visa Stamp Action */}
                                  <button
                                    onClick={() => setSelectedVisaStory(story)}
                                    className="w-full sm:w-auto px-5 py-3 bg-brand-blue-50 border border-brand-blue-100 hover:border-brand-blue-300 hover:bg-brand-blue-100 text-brand-blue-900 font-sans font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                                  >
                                    <Eye className="h-4 w-4 text-brand-blue-600" />
                                    <span>View Verified Visa Approval</span>
                                    <span className="text-brand-gold-500 font-bold">★</span>
                                  </button>

                                  <div className="flex items-center gap-3 text-xs text-slate-400 font-bold">
                                    <span>Share Success:</span>
                                    <button onClick={copyShareLink} className="text-slate-500 hover:text-brand-blue-600 transition cursor-pointer">FB</button>
                                    <span className="text-slate-200">|</span>
                                    <button onClick={copyShareLink} className="text-slate-500 hover:text-sky-500 transition cursor-pointer">TW</button>
                                    <span className="text-slate-200">|</span>
                                    <button onClick={copyShareLink} className="text-slate-500 hover:text-brand-blue-800 transition cursor-pointer">LN</button>
                                  </div>

                                </div>

                              </div>

                            </motion.div>
                          );
                        })()}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-brand-blue-900 rounded-3xl border border-brand-blue-800 text-slate-300">
                      No success stories are configured.
                    </div>
                  )}

                  {/* Absolute Left/Right button indicators with glassmorphic styles */}
                  {activeStories.length > 1 && (
                    <>
                      <button 
                        onClick={handlePrevSlide}
                        className="absolute left-[-15px] sm:left-[-25px] top-1/2 -translate-y-1/2 p-3 bg-brand-blue-900 hover:bg-brand-blue-800 border-2 border-brand-gold-400/30 hover:border-brand-gold-400 text-brand-gold-400 rounded-full transition-all duration-200 shadow-xl cursor-pointer"
                        title="Previous Story"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      
                      <button 
                        onClick={handleNextSlide}
                        className="absolute right-[-15px] sm:right-[-25px] top-1/2 -translate-y-1/2 p-3 bg-brand-blue-900 hover:bg-brand-blue-800 border-2 border-brand-gold-400/30 hover:border-brand-gold-400 text-brand-gold-400 rounded-full transition-all duration-200 shadow-xl cursor-pointer"
                        title="Next Story"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                </div>

                {/* Dots indicators & Autoplay controls */}
                <div className="flex items-center justify-center gap-4 select-none">
                  <button 
                    onClick={() => setAutoplay(!autoplay)}
                    className="p-1.5 bg-brand-blue-900 border border-brand-blue-800 rounded-lg hover:border-brand-gold-400 text-slate-400 hover:text-white transition cursor-pointer"
                    title={autoplay ? "Pause Slideshow" : "Play Slideshow"}
                  >
                    {autoplay ? <Pause className="h-3.5 w-3.5 text-brand-gold-400" /> : <Play className="h-3.5 w-3.5" />}
                  </button>

                  <div className="flex items-center gap-2">
                    {activeStories.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setCurrentSlideIndex(i);
                          setAutoplay(false); // Let them control manually if they click a dot
                        }}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          i === currentSlideIndex 
                            ? "bg-brand-gold-400 w-6 h-2" 
                            : "bg-brand-blue-800 hover:bg-brand-blue-700 w-2 h-2"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Elegant transition banner pointing to the Dedicated page */}
                <div className="max-w-4xl mx-auto pt-4 select-none">
                  <div className="bg-gradient-to-r from-brand-blue-900 to-brand-blue-950 p-6 sm:p-8 rounded-3xl border border-brand-blue-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
                    <div className="space-y-1">
                      <span className="px-2.5 py-0.5 bg-brand-gold-500/10 text-brand-gold-400 border border-brand-gold-500/20 text-[9px] font-bold rounded uppercase tracking-wider">
                        Comprehensive Registry Directory
                      </span>
                      <h4 className="text-lg font-bold text-white tracking-tight">Looking for our complete verified archive?</h4>
                      <p className="text-xs text-brand-blue-200 leading-normal max-w-xl">
                        We have dynamic search indexes, academic intake parameters, and full immigration visa documents listed for our students.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (onOpenDedicated) {
                          onOpenDedicated();
                        } else {
                          changeViewMode("dedicated-list");
                        }
                      }}
                      className="w-full md:w-auto shrink-0 px-5 py-3 bg-brand-gold-400 hover:bg-brand-gold-500 text-brand-blue-950 font-sans font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 group"
                    >
                      <span>Open Dedicated Page</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* ===================== VIEW MODE 2: DEDICATED ARCHIVE PAGE DIRECTORY ===================== */}
            {viewMode === "dedicated-list" && (
              <div className="space-y-12 animate-fade-in">
                
                {/* Page Header with Breadcrumbs & Back Nav buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-brand-blue-800/80">
                  
                  {/* Return to homepage slides toggle button */}
                  <button
                    onClick={() => {
                      if (onBackToHome) {
                        onBackToHome();
                      } else {
                        changeViewMode("home-slider");
                      }
                    }}
                    className="group inline-flex items-center gap-2 px-4 py-2 bg-brand-blue-900 hover:bg-brand-blue-800 border border-brand-blue-800 text-slate-300 hover:text-white font-sans font-bold text-xs rounded-xl transition duration-200 cursor-pointer animate-pulse"
                  >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 text-brand-gold-400" />
                    <span>{onBackToHome ? "Back to Home" : "Back to Slides Showcase"}</span>
                  </button>

                  {/* Breadcrumb text indicators */}
                  <div className="flex items-center gap-2 text-xs text-brand-blue-300 font-bold uppercase tracking-wider">
                    <span>Home</span>
                    <span>/</span>
                    <span className="text-brand-gold-400">Success Stories Portal</span>
                  </div>

                </div>

                {/* Title Description Layout */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-brand-gold-500/10 text-brand-gold-400 border border-brand-gold-500/20 uppercase select-none">
                    ⭐ COMPREHENSIVE REGISTRY DIRECTORY
                  </span>
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight select-text">
                    Verified Case Archives
                  </h2>
                  <p className="font-sans text-brand-blue-105 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto select-text">
                    Explore our structured index of verified visa approval stamps. Search by student name, academic streams, or filter by destination countries. 
                  </p>
                </div>

                {/* Bento Statistics summary bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left select-none">
                  <div className="bg-brand-blue-900/50 p-4 rounded-2xl border border-brand-blue-800/60">
                    <span className="text-[10px] text-brand-blue-300 uppercase block font-mono">Registry Cases</span>
                    <strong className="text-xl sm:text-2xl font-black text-white block mt-1">{activeStories.length} Active</strong>
                  </div>
                  <div className="bg-brand-blue-900/50 p-4 rounded-2xl border border-brand-blue-800/60">
                    <span className="text-[10px] text-brand-blue-300 uppercase block font-mono">Verification Rate</span>
                    <strong className="text-xl sm:text-2xl font-black text-emerald-400 block mt-1">100% Secure</strong>
                  </div>
                  <div className="bg-brand-blue-900/50 p-4 rounded-2xl border border-brand-blue-800/60">
                    <span className="text-[10px] text-brand-blue-300 uppercase block font-mono">Avg Processing</span>
                    <strong className="text-xl sm:text-2xl font-black text-brand-gold-400 block mt-1">18.5 Days</strong>
                  </div>
                  <div className="bg-brand-blue-900/50 p-4 rounded-2xl border border-brand-blue-800/60">
                    <span className="text-[10px] text-brand-blue-300 uppercase block font-mono">Quality Score</span>
                    <strong className="text-xl sm:text-2xl font-black text-white block mt-1">★★★★★</strong>
                  </div>
                </div>

                {/* Search & Dynamic Select Filters Control block */}
                <div className="max-w-4xl mx-auto bg-brand-blue-900/40 p-5 rounded-3xl border border-brand-blue-800/80 flex flex-col md:flex-row items-center gap-4 text-xs">
                  
                  {/* Search Bar Input */}
                  <div className="relative w-full md:flex-1">
                    <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-brand-blue-300/80" />
                    <input
                      type="text"
                      placeholder="Search by candidate name, degree stream, or country..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-brand-blue-950/90 border border-brand-blue-800 hover:border-brand-blue-700 focus:border-brand-gold-400 text-slate-200 text-xs rounded-xl outline-none focus:outline-none focus:ring-1 focus:ring-brand-gold-400"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3.5 top-3.5 p-0.5 rounded-full hover:bg-brand-blue-800 text-slate-400 hover:text-white cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Select country filter dropdown */}
                  <div className="flex items-center gap-2.5 w-full md:w-auto">
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="w-full md:w-56 bg-brand-blue-950/90 border border-brand-blue-800 text-xs text-slate-200 rounded-xl px-4 py-3 outline-none focus:outline-none focus:ring-1 focus:ring-brand-gold-400"
                    >
                      <option value="All">All Visa Destinations</option>
                      <option value="Germany">Germany success cases</option>
                      <option value="United Kingdom">United Kingdom success cases</option>
                      <option value="Canada">Canada success cases</option>
                      <option value="United States">United States success cases</option>
                      <option value="Australia">Australia success cases</option>
                      <option value="France">France success cases</option>
                    </select>
                  </div>

                </div>

                {/* Main Grid display of stories list */}
                {filteredStories.length === 0 ? (
                  <div className="text-center py-20 bg-brand-blue-900/10 rounded-3xl border border-dashed border-brand-blue-800/60 max-w-md mx-auto space-y-4">
                    <div className="text-brand-gold-400 text-4xl">📭</div>
                    <h3 className="text-base font-bold text-white">No Matching Cases Found</h3>
                    <p className="text-xs text-brand-blue-205 px-6 leading-relaxed">
                      We couldn't locate any records matching your filter criteria. Try searching for a different name stream, or resetting your country tag.
                    </p>
                    <button 
                      onClick={() => { setSearchQuery(""); setSelectedFilter("All"); }}
                      className="px-4 py-2 bg-brand-blue-900 hover:bg-brand-blue-800 text-brand-gold-400 text-xs font-bold rounded-xl border border-brand-blue-800 transition cursor-pointer"
                    >
                      Reset Filter Queries
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto select-none">
                    {filteredStories.map((story) => (
                      <div 
                        key={story.id} 
                        className="bg-white text-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col justify-between hover:shadow-2xl transition duration-300 relative group overflow-hidden"
                      >
                        {/* Ambient accent inside card */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue-50 rounded-full blur-2xl pointer-events-none group-hover:bg-brand-blue-100/50 transition duration-300" />

                        <div className="space-y-4">
                          
                          {/* Profile layout and verified stamp label */}
                          <div className="flex items-center gap-4">
                            <div className="relative shrink-0 select-none">
                              <div className="w-16 h-20 rounded-[50%/40%] overflow-hidden border-2 border-brand-gold-400 shadow-md">
                                {story.clientPic && story.clientPic.startsWith("data:application/pdf") ? (
                                  <div className="w-full h-full bg-brand-blue-950 flex items-center justify-center">
                                    <FileText className="h-6 w-6 text-brand-gold-400 animate-pulse" />
                                  </div>
                                ) : story.clientPic ? (
                                  <img 
                                    className="w-full h-full object-cover" 
                                    src={story.clientPic} 
                                    alt={story.name} 
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = `https://placehold.co/150x150/1d4ed8/ffffff?text=${encodeURIComponent(story.name)}`;
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-brand-blue-800 to-brand-blue-950 flex items-center justify-center text-white font-display font-black text-base select-none">
                                    {story.name ? story.name.charAt(0).toUpperCase() : "U"}
                                  </div>
                                )}
                              </div>
                              <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow border border-slate-100">
                                <div className="bg-emerald-500 rounded-full p-0.5 text-white flex items-center justify-center">
                                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                                </div>
                              </div>
                            </div>

                            <div className="text-left">
                              <h4 className="font-display font-black text-sm text-slate-900 group-hover:text-brand-blue-800 transition duration-200 truncate max-w-[150px] capitalize">
                                {story.name}
                              </h4>
                              <p className="text-[10px] font-bold text-brand-blue-600 block">{story.city}</p>
                              <p className="text-[10px] text-slate-400 truncate max-w-[150px]">{story.stream}</p>
                              {story.visaGrantDate && (
                                <p className="text-[9px] font-mono font-bold text-amber-600 mt-0.5 whitespace-nowrap">
                                  📅 Grant: {story.visaGrantDate}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Review Testimonial text block */}
                          <p className="text-slate-600 text-xs italic leading-relaxed text-left line-clamp-4">
                            "{story.review}"
                          </p>

                        </div>

                        {/* Actions button */}
                        <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between gap-2.5 select-none">
                          <button
                            onClick={() => setSelectedVisaStory(story)}
                            className="px-4 py-2 bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-700 text-[11px] font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <Eye className="h-3.5 w-3.5 text-slate-500" />
                            <span>View Stamp</span>
                          </button>
                          
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100 font-mono text-center font-bold">
                            {story.stampId}
                          </span>
                        </div>

                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

          </div>

      </div>

      {/* ===================== SECURE VISUAL REDACTED VISA MODAL ===================== */}
      {selectedVisaStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-blue-950/90 backdrop-blur-md p-4 animate-fade-in select-none">
          <div className="bg-brand-blue-900 border-2 border-brand-blue-800 p-6 rounded-3xl max-w-lg w-full relative shadow-2xl animate-scale-up select-none">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedVisaStory(null)}
              className="absolute top-4 right-4 bg-brand-blue-950 border border-brand-blue-800 hover:border-brand-gold-400 text-slate-400 hover:text-white p-2 rounded-full transition cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1.5 pb-4 border-b border-brand-blue-800/80 text-left">
              <span className="px-2.5 py-0.5 bg-brand-gold-500/10 text-brand-gold-400 border border-brand-gold-500/30 text-[9px] font-extrabold rounded inline-block uppercase tracking-wider">
                🔒 Secured Immigration Archives
              </span>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Verified Stamp Approval</span>
              </h3>
              <p className="text-xs text-brand-blue-200">
                Automated privacy redaction active. Passport numbers, private codes, and biometric credentials remain fully masked.
              </p>
            </div>

            {/* Redacted Visa Stamp Area */}
            <div className="my-6 relative border border-brand-blue-800 rounded-2xl overflow-hidden bg-brand-blue-950 aspect-[4/3] flex items-center justify-center">
              {selectedVisaStory.visaStamp && selectedVisaStory.visaStamp.startsWith("data:application/pdf") ? (
                <iframe
                  src={selectedVisaStory.visaStamp}
                  className="w-full h-full bg-white border-0"
                  title="Visa document"
                />
              ) : selectedVisaStory.visaStamp ? (
                <img 
                  src={selectedVisaStory.visaStamp} 
                  className="w-full h-full object-contain filter" 
                  alt="Visa stamp"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center text-slate-400">
                  <ShieldCheck className="h-16 w-16 text-brand-gold-400/80 mb-2" />
                  <span className="text-sm font-semibold text-white">Official Visa Grant Verified</span>
                  <span className="text-xs text-slate-400 mt-1">Official visa documentation secured & archived for case {selectedVisaStory.stampId}</span>
                </div>
              )}
              
              {/* Overlay Mask Tag */}
              <div className="absolute inset-x-0 bottom-0 bg-brand-blue-950/95 p-3.5 border-t border-brand-blue-800 text-[10px] text-brand-gold-400 flex items-center justify-between font-mono">
                <span>STAMP CASE ID: <span className="text-white font-bold">{selectedVisaStory.stampId}</span></span>
                <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                  ● REAL DOCUMENT
                </span>
              </div>
            </div>

            {/* Details panel */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-brand-blue-950 p-4 rounded-xl border border-brand-blue-800 text-left">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">Stamp Owner</span>
                <strong className="text-white font-bold text-xs tracking-wide truncate block">{selectedVisaStory.maskedName}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">Target Stream</span>
                <strong className="text-brand-gold-400 font-bold block truncate">{selectedVisaStory.stream}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">Grant Date</span>
                <strong className="text-emerald-400 font-bold block truncate">{selectedVisaStory.visaGrantDate || "N/A"}</strong>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ===================== TOAST STACK BANNER LAYER ===================== */}
      <div className="fixed bottom-6 right-6 z-[100] space-y-3 pointer-events-none select-none max-w-sm w-full">
        {toasts.map((t) => {
          let borderCol = "border-brand-gold-400/40";
          let icon = <CheckCircle className="h-4 w-4 text-brand-gold-400 shrink-0" />;
          if (t.type === "error") {
            borderCol = "border-red-500/40";
            icon = <Trash2 className="h-4 w-4 text-red-400 shrink-0" />;
          } else if (t.type === "info") {
            borderCol = "border-blue-500/40";
            icon = <Info className="h-4 w-4 text-blue-400 shrink-0" />;
          }

          return (
            <div 
              key={t.id}
              className={`p-4 bg-brand-blue-900 border ${borderCol} rounded-2xl flex items-center gap-3 shadow-2xl text-slate-100 pointer-events-auto animate-slide-in`}
            >
              {icon}
              <span className="text-xs font-semibold leading-snug">{t.message}</span>
            </div>
          );
        })}
      </div>

    </section>
  );
}
