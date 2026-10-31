export interface Destination {
  id: string;
  name: string;
  flag: string;
  popularTitle: string;
  tagline: string;
  accentColor: string; // Tailwind background/text color tokens
  overview: string;
  topReasons: string[];
  avgTuitionRange: string;
  avgLivingExpenses: string;
  postStudyWorkVisa: string;
  partTimeHours: string;
  intakes: string[];
  popularCourses: string[];
  visaDifficulty: "Easy" | "Medium" | "High";
  languageRequirement: string;
  visaRequirements: string[];
}

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: "usa",
    name: "United States of America",
    flag: "🇺🇸",
    popularTitle: "Study in USA",
    tagline: "The world's premium hub for tech giants, Ivy league research, and expansive OTP pathways.",
    accentColor: "from-blue-600 to-red-650 text-blue-500 bg-blue-50 border-blue-100",
    overview: "The USA hosts the highest concentration of top-ranked universities globally. For international aspirants, it offers unparalleled versatility with thousands of degree plans, rich extracurricular integration, and massive funding options via research assistantships.",
    topReasons: [
      "Access to the world's most prestigious Ivy League institutions and technological infrastructure.",
      "Up to 36 months of STEM OPT (Optional Practical Training) allowing students to execute real-world stays at firms like Google and Apple.",
      "Generous scholarship grids, fellowship models, and full tuition waivers for qualified graduate students."
    ],
    avgTuitionRange: "$20,000 - $55,000 USD / Year",
    avgLivingExpenses: "$12,000 - $18,000 USD / Year",
    postStudyWorkVisa: "1 - 3 Year OPT (STEM eligible expansion)",
    partTimeHours: "20 Hrs/Week (On-campus only)",
    intakes: ["Fall (August/September) - Major Intake", "Spring (January/February) - Secondary Intake"],
    popularCourses: ["MS in Computer Science & Artificial Intelligence", "MBA & Executive Management", "Bioengineering & Nanotechnology", "Fintech & Data Science"],
    visaDifficulty: "High",
    languageRequirement: "IELTS 6.5+ / TOEFL 80+ / Duolingo 110+",
    visaRequirements: [
      "Approved I-20 Form from an accredited US institution",
      "Paid SEVIS fee receipt ($350 USD)",
      "Proof of immediate liquid financial capacity covering 1 year of tuition and living costs",
      "DS-160 Visa Application confirmation code",
      "Excellent academic background transcripts and statement of intent proof"
    ]
  },
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    popularTitle: "Study in UK",
    tagline: "Accelerated degree structures, rich heritage, and simplified 2-year post-study work visa structures.",
    accentColor: "from-indigo-650 to-blue-500 text-indigo-500 bg-indigo-50 border-indigo-100",
    overview: "The UK is highly recognized for its rigorous, specialized, and accelerated educational structures. Undergraduate degrees typically finish in 3 years and Master's inside a single year, saving you massive living costs while unlocking early career steps.",
    topReasons: [
      "Accelerated 1-Year Master's options minimizing living fees and accelerating job market entry.",
      "Automatic 2-Year Graduate Immigration route (post-study work) without sponsor constraints.",
      "Russell Group integration, confirming absolute excellence across intensive research profiles."
    ],
    avgTuitionRange: "£14,000 - £28,000 GBP / Year",
    avgLivingExpenses: "£10,000 - £15,000 GBP / Year",
    postStudyWorkVisa: "2 Years (Graduate Route) / 3 Years for PhD trackers",
    partTimeHours: "20 Hrs/Week (Term time)",
    intakes: ["Autumn (September/October) - Ultimate Intake", "Winter/Spring (January/February) - Selected Options"],
    popularCourses: ["LLM in International Law", "MSc & BSc in Business & Investment Administration", "Informatics & Computing Science", "Masters in Public Health"],
    visaDifficulty: "Medium",
    languageRequirement: "IELTS 6.5+ (minimum 6.0 in each band) or equivalent",
    visaRequirements: [
      "Official CAS (Confirmation of Acceptance for Studies) number from a licensed sponsor university",
      "IELTS Academic score profile",
      "Tuberculosis clear medical certificate",
      "Strict 28-day financial holding proofs meeting UKVI living guidelines (Inside/Outside London brackets)"
    ]
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    popularTitle: "Study in Australia",
    tagline: "Unparalleled living quality, high-paying student jobs, and regional bonus options for residency.",
    accentColor: "from-sky-700 to-amber-500 text-sky-600 bg-sky-50 border-sky-100",
    overview: "Australia offers a vibrant, multicultural, and extremely supportive educational system. It ranks with superb standards of living across Adelaide, Melbourne, and Sydney, and is highly attractive for its industry-aligned professional training curricula.",
    topReasons: [
      "Up to 4-6 years of post-study working permissions (T&C apply based on regional selection).",
      "Superb hourly base wages for part-time student assignments across industries.",
      "World-class Group of Eight (Go8) research circles globally recognized for supreme impact."
    ],
    avgTuitionRange: "$25,000 - $45,000 AUD / Year",
    avgLivingExpenses: "$21,000 - $26,000 AUD / Year",
    postStudyWorkVisa: "2 - 5 Years (Extended rules in regional locations)",
    partTimeHours: "48 Hrs/Fortnight (Newly modified cap)",
    intakes: ["Inake 1 (February/March) - Primary", "Intake 2 (July/August) - Secondary"],
    popularCourses: ["MBA & Management", "Information Technology & Software Engineering", "Accounting & Finance studies", "Nursing & Social Work"],
    visaDifficulty: "High",
    languageRequirement: "IELTS 6.0+ (overall band range vary with degrees)",
    visaRequirements: [
      "Valid CoE (Confirmation of Enrolment) sheet",
      "Genuine Student (GS) statement matching Australian standards",
      "Comprehensive OSHC (Overseas Student Health Cover) documentation",
      "Proof of funds matching living standard criteria (~$29,000 AUD/year held logically)"
    ]
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    popularTitle: "Study in Germany",
    tagline: "Ultra-modern technical training, robust economies, and incredible public university zero-tuition grids.",
    accentColor: "from-amber-600 to-red-600 text-amber-500 bg-amber-50 border-amber-100",
    overview: "Germany stands at the peak of European technological production. With virtually zero tuition fees across public universities (excluding administrative semester contributions of ~€300), Germany makes top-tier learning highly cost-accessible.",
    topReasons: [
      "No tuition fees in public universities, irrespective of candidate nationality.",
      "Strong demand for STEM professionals, unlocking excellent post-graduation job rates.",
      "18-Month job seeker visa immediately handed to graduating candidates with minimal stress."
    ],
    avgTuitionRange: "€0 - €3,000 EUR / Year (Public Universities)",
    avgLivingExpenses: "€11,200 - €12,000 EUR / Year (Blocked Account requirement)",
    postStudyWorkVisa: "18 Months (Job Seeker Visa)",
    partTimeHours: "140 Full Days or 280 Half Days per calendar year",
    intakes: ["Winter Semester (October) - Major Entrance", "Summer Semester (April) - Restricted Tracks"],
    popularCourses: ["Automotive Engineering & Mechatronics", "Aerospace Engineering & Tech", "Informatics & Computing", "Renewable Energy Research"],
    visaDifficulty: "Medium",
    languageRequirement: "IELTS 6.5+ (English tracks) or TestDaF/DSH (German tracks)",
    visaRequirements: [
      "German Blocked Account (Sperrkonto) containing €11,904 EUR",
      "APS Certificate (strictly mandated for multiple South Asian applicants)",
      "University Admission Letter / VPD assessment certificate",
      "Comprehensive travel and local student health insurance cover documents"
    ]
  },
  {
    id: "france",
    name: "France",
    flag: "🇫🇷",
    popularTitle: "Study in France",
    tagline: "Leading global Business schools, gourmet heritage, and subsidized state accommodation grants.",
    accentColor: "from-indigo-700 to-red-500 text-indigo-500 bg-indigo-50 border-indigo-100",
    overview: "Home of specialized Business Schools (Grandes Écoles) like HEC Paris and INSEAD, France offers world-leading business, culinary, design, and aerospace tracks. The government provides direct rent subsidy assistance (CAF) to students.",
    topReasons: [
      "Direct state rent subvensions (CAF) repaying up to 40% of standard student dorm costs.",
      "Renowned business and fashion management colleges holding international triples accreditation.",
      "Access to the entire Schengen region with seamless travel and networking setups."
    ],
    avgTuitionRange: "€2,770 - €4,500 EUR / Year (Public) / €12,000 - €25,050 (Private)",
    avgLivingExpenses: "€8,000 - €11,000 EUR / Year",
    postStudyWorkVisa: "2-Year APS / Job Seeker Visa for Masters grads",
    partTimeHours: "60% of annual working limits (Approx 964 hours annually)",
    intakes: ["Fall Intake (September) - Primary", "Spring Intake (January/February) - Secondary"],
    popularCourses: ["MSc in Luxury Brand Management", "MBA & Strategic Analysis Studies", "Gastronomy, Culinary Arts & Hospitality", "Mechanical & Aviation Engineering"],
    visaDifficulty: "Medium",
    languageRequirement: "IELTS 6.0+ or DELF/DALF (for French tracks)",
    visaRequirements: [
      "Campus France verification approval documentation",
      "Proof of accommodation in France for the initial three months of residence",
      "A minimum budget allocation of €615 EUR per month during the entire stay timeline"
    ]
  },
  {
    id: "spain",
    name: "Spain",
    flag: "🇪🇸",
    popularTitle: "Study in Spain",
    tagline: "Affordable Mediterranean lifestyle, premium business schools, and incredible local experience.",
    accentColor: "from-red-650 to-yellow-500 text-red-500 bg-red-50 border-red-100",
    overview: "Spain blends high academic merit (with triple-accredited titans like IE, IESE, and ESADE) with warm climatic hospitality, affordable living, and a dynamic launchpad to both European and expansive Latin American job sectors.",
    topReasons: [
      "Access to world-class triple-crown Business schools ranked inside top global scales.",
      "Exceptional student life parameters with massive culinary, historical, and weather advantages.",
      "Ability to study in English while easily absorbing Spanish (the second most spoken global tongue)."
    ],
    avgTuitionRange: "€1,500 - €4,000 EUR / Year (Public) / €8,000 - €22,000 (Private)",
    avgLivingExpenses: "€7,200 - €10,000 EUR / Year",
    postStudyWorkVisa: "1 Year (Job Finder Residency Permission)",
    partTimeHours: "30 Hrs/Week (Newly updated rules)",
    intakes: ["September (Main Intake Track)", "February (Limited Master selection)"],
    popularCourses: ["Global Entrepreneurship & Business Innovation", "Tourism & Leisure Management", "Marketing & Growth Analysis", "Architecture & Interior Design"],
    visaDifficulty: "Medium",
    languageRequirement: "IELTS 6.0+ (English-medium programs) or DELE (Spanish tracks)",
    visaRequirements: [
      "Official enrollment certificate at a recognized academic institution",
      "Bank certificates showing at least 100% IPREM monthly allocations (~€600/month)",
      "Approved public or private health insurance valid inside Spain",
      "Medical check certification from a registered doctor"
    ]
  },
  {
    id: "south-korea",
    name: "South Korea",
    flag: "🇰🇷",
    popularTitle: "Study in South Korea",
    tagline: "Superb scientific automation, clean high-tech cities, and dynamic global tech giants.",
    accentColor: "from-blue-550 to-rose-500 text-rose-500 bg-rose-50 border-rose-100",
    overview: "South Korea is experiencing an unprecedented surge in global interest. Centered on stellar automation, robotics, computing development, and rich cultural exports, it presents high security, affordability, and fantastic university standards.",
    topReasons: [
      "Global leader in applied R&D engineering, robotics, AI, and electronics production.",
      "Generous Global Korea Scholarship (GKS) offering full tuition, airtickets, and monthly living grants.",
      "High safety indexes, incredible food, and interactive metropolitan environments."
    ],
    avgTuitionRange: "$3,000 - $8,000 USD / Year (Extremely Cost-Effective)",
    avgLivingExpenses: "$8,000 - $11,000 USD / Year",
    postStudyWorkVisa: "Up to 2 Years (D-10 Job Seeker Visa status)",
    partTimeHours: "20 Hrs/Week (Plus unlimited during semester holidays)",
    intakes: ["Spring Semester (March) - Major Intake", "Fall Semester (September) - Secondary Intake"],
    popularCourses: ["Robotics, Autonomous Dynamics & Electronics", "Game Design & Creative Technology", "Korean Studies & Global Trade", "Biomedical Science"],
    visaDifficulty: "Medium",
    languageRequirement: "TOPIK Level 3+ (for Korean-taught) or IELTS 5.5+ / TOEFL 75+ (for English-taught)",
    visaRequirements: [
      "Certificate of Admission (COA) issued directly by target South Korean university president",
      "Dynamic certificate displaying bank balance matching visa requirements (~$20,000 USD holding patterns)",
      "Certified family relations certificates if parents are acting as sponsor bodies"
    ]
  },
  {
    id: "hungary",
    name: "Hungary",
    flag: "🇭🇺",
    popularTitle: "Study in Hungary",
    tagline: "Affordable European gateway, rich architectural history, and highly recognized medical degrees.",
    accentColor: "from-emerald-755 to-red-500 text-emerald-650 bg-emerald-50 border-emerald-150",
    overview: "Hungary hosts outstanding traditions across medical, engineering, and chemical sciences. Its Stipendium Hungaricum scholarship covers tuition, medical insurance, and accommodation for thousands of international seekers yearly.",
    topReasons: [
      "The Stipendium Hungaricum program offers fully-funded government routes for multiple partner nations.",
      "Exceptionally low tuition and living costs relative to other Schengen states.",
      "Schengen mobility, allowing you to freely travel across 29 European countries."
    ],
    avgTuitionRange: "€3,000 - €8,000 EUR / Year (Medicine tracks: ~€16,000)",
    avgLivingExpenses: "€5,000 - €7,500 EUR / Year",
    postStudyWorkVisa: "9 Months (Study-to-work visa option)",
    partTimeHours: "30 Hrs/Week (Maximum allowed limit)",
    intakes: ["September (Autumn Entrance - Standard)", "February (Spring Intake - Selected)"],
    popularCourses: ["General Medicine & Dentistry", "Civil & Structural Engineering", "International Relations & Comparative Law", "Computer Informatics"],
    visaDifficulty: "Easy",
    languageRequirement: "IELTS 5.5+ or native English proof",
    visaRequirements: [
      "Letter of Acceptance from the Hungarian institution or Tempus Public Foundation (SH)",
      "Proof of payment of tuition fees (or scholarship award statement)",
      "Bank statements showing adequate monthly funds for maintenance",
      "Confirmed local accommodation lease or dorm certificate"
    ]
  },
  {
    id: "lithuania",
    name: "Lithuania",
    flag: "🇱🇹",
    popularTitle: "Study in Lithuania",
    tagline: "High-tech fintech centers, affordable cost arrays, and pristine Baltic academic cultures.",
    accentColor: "from-yellow-600 to-green-600 text-yellow-600 bg-yellow-50 border-yellow-100",
    overview: "Lithuania is rapidly becoming a key European fintech and startup hotspot. Universities coordinate directly with tech incubators, ensuring graduates obtain real hands-on professional placement paths alongside their European degrees.",
    topReasons: [
      "Leader in Baltic fintech, laser research, and cybersecurity innovation hubs.",
      "Extremely affordable European visa, and cost efficient accommodation markets.",
      "High English proficiency index among youngsters making daily socialization seamless."
    ],
    avgTuitionRange: "€2,000 - €5,500 EUR / Year",
    avgLivingExpenses: "€4,500 - €6,800 EUR / Year",
    postStudyWorkVisa: "1 Year (To find local contracts / work permits)",
    partTimeHours: "20 Hrs/Week (Under active student status)",
    intakes: ["September Intake - Major Primary", "January/February Intake - Minor"],
    popularCourses: ["Software Systems & Cloud Architecture", "Aviation & Logistics Management", "Global Economics & Finance", "Environmental Engineering"],
    visaDifficulty: "Easy",
    languageRequirement: "IELTS 5.5+ / TOEFL 70+",
    visaRequirements: [
      "National Visa D booking and application confirmation",
      "Document of Mediation from the Lithuanian vocational or academic body",
      "Sufficient financial verification (~€400 per month of planned stay)",
      "Clean criminal records certificate parsed with Hague Apostille credentials"
    ]
  },
  {
    id: "latvia",
    name: "Latvia",
    flag: "🇱🇻",
    popularTitle: "Study in Latvia",
    tagline: "Dynamic technical academies, cost-effective life, and scenic coastal Schengen gateway.",
    accentColor: "from-red-800 to-slate-200 text-red-800 bg-rose-50 border-rose-100",
    overview: "Latvia stands out as a highly friendly, budget-friendly nation offering excellent technical education options (such as Riga Technical University). It blends medieval beauty with dynamic digital startups and pristine beaches.",
    topReasons: [
      "Superb focus on engineering, telecommunications, and aviation mechanics disciplines.",
      "Incredibly reasonable student hostels and public transit costs.",
      "Direct pathway for skilled technicians to transition into corporate structures in Europe."
    ],
    avgTuitionRange: "€1,800 - €4,800 EUR / Year (High-tier medical specializations can cost more)",
    avgLivingExpenses: "€4,800 - €6,500 EUR / Year",
    postStudyWorkVisa: "4 Months (Can be extended upon local contract registration)",
    partTimeHours: "20 Hrs/Week (Extended to 40 Hours during vacations)",
    intakes: ["Autumn Intake (September) - Primary", "Spring Intake (February) - Selected Tracks"],
    popularCourses: ["Aviation Engineering & Maintenance Systems", "IT & Robotics Networks", "Business Management & Operations", "Civil & Structural Auditing"],
    visaDifficulty: "Easy",
    languageRequirement: "IELTS 5.5+ or structured university interview validation",
    visaRequirements: [
      "Certified University Enrollment & Contract Agreement Sheets",
      "Official Academic Recognition Statement (AIC evaluation certificate)",
      "Financial self-sufficiency statement showing at least €500 per month in funds",
      "Clean health certificate stating freedom from major contagious diseases"
    ]
  },
  {
    id: "denmark",
    name: "Denmark",
    flag: "🇩🇰",
    popularTitle: "Study in Denmark",
    tagline: "World-class environmental design, collaborative pedagogy, and high student happiness indexing.",
    accentColor: "from-red-500 to-slate-300 text-red-650 bg-red-50 border-red-100",
    overview: "Denmark offers unmatched learning quality characterized by interactive, problem-based studies where students work alongside local corporations. It serves as a benchmark for wind power, design, and green biotechnology.",
    topReasons: [
      "Highly innovative, collaborative, and student-focused academic pedagogies.",
      "Access to safe, happy cities with pristine nature, cycling transit, and robust social support.",
      "Incredible post-study stay pathways with up to 3 years of automatic job search visa permissions."
    ],
    avgTuitionRange: "€6,000 - €16,000 EUR / Year (Free for EU/EEA citizens)",
    avgLivingExpenses: "€9,000 - €13,000 EUR / Year",
    postStudyWorkVisa: "3 Years (Automatic job search period for graduates)",
    partTimeHours: "20 Hrs/Week (Extended to full-time during June, July, and August)",
    intakes: ["September (Autumn Intake) - Standard Major", "February (Spring Intake) - Postgraduate Tracks"],
    popularCourses: ["Wind Energy & Sustainable Engineering", "Product Design & Architecture", "Information Technology & Software Analytics", "Environmental Science Research"],
    visaDifficulty: "Medium",
    languageRequirement: "IELTS 6.5+ (no band lower than 6.0)",
    visaRequirements: [
      " Danish ST1 Residence Permit application details",
      "Receipt of full tuition fees paid for the initial semester or year",
      "Evidence of self-support (~DKK 6,569 DKK per month for non-scholarship students)"
    ]
  },
  {
    id: "finland",
    name: "Finland",
    flag: "🇫🇮",
    popularTitle: "Study in Finland",
    tagline: "The happiest country on Earth, pristine tech pipelines, and outstanding student benefits.",
    accentColor: "from-blue-600 to-slate-100 text-blue-600 bg-sky-50 border-sky-100",
    overview: "Finland is globally renowned for its high-tech, human-centric educational model. It consistently ranks as the happiest nation, boasting a highly digitized tech sector, pure air quality, and dynamic game dev sectors (like Supercell & Rovio).",
    topReasons: [
      "A guaranteed post-study residence permit for up to 2 years to seek careers or establish startups.",
      "Excellent local student discounts, cheap housing brackets, and high social trust.",
      "Leading technical and business academies with direct linkages to Nordic corporate ecosystems."
    ],
    avgTuitionRange: "€6,000 - €15,000 EUR / Year (Free for EU/EEA citizens)",
    avgLivingExpenses: "€7,200 - €10,000 EUR / Year",
    postStudyWorkVisa: "2 Years (Permanent-eligible job finder permit)",
    partTimeHours: "30 Hrs/Week (Newly updated rules allowing flexible work patterns)",
    intakes: ["Autumn Intake (September) - Joint National Application occurs in January", "January Intake (Selected programs)"],
    popularCourses: ["BSc & MSc in Artificial Intelligence & Digital Analytics", "Sustainable Smart Cities Design", "Nanosciences & Advanced Physics", "International Trade & Tech Entrepreneurship"],
    visaDifficulty: "Easy",
    languageRequirement: "IELTS 6.0+ or SAT score performance grids (accepted in multiple universities)",
    visaRequirements: [
      "Official Letter of Acceptance from studyinfo.fi portal",
      "Evidence of paid tuition fees or tuition award scholarship",
      "Sufficient funding of €560 EUR per month or €6,720 EUR per calendar year",
      "Comprehensive student health insurance certificate (covering up to €40,000 worth)"
    ]
  },
  {
    id: "ireland",
    name: "Ireland",
    flag: "🇮🇪",
    popularTitle: "Study in Ireland",
    tagline: "The Silicon Valley of Europe, rich cultural landscape, and 2-year post-study work routes.",
    accentColor: "from-green-650 to-orange-500 text-green-600 bg-green-50 border-green-100",
    overview: "Ireland is a global tech and pharmaceutical superpower, serving as the European headquarters for giants such as Google, Apple, Meta, Pfizer, and Stripe. With its highly welcoming English-speaking academic environment and a 2-year post-study work pathway, it stands out as one of Europe's premier educational destinations.",
    topReasons: [
      "European headquarters for top tech and pharma companies, offering incredible career and networking possibilities.",
      "An automatic 2-year stay-back visa (Graduate Scheme) for Level 8 (Honours Bachelor) and Level 9 (Master/PhD) graduates.",
      "A friendly, safe, and English-speaking environment with some of the oldest and most prestigious universities in Europe."
    ],
    avgTuitionRange: "€9,850 - €25,000 EUR / Year",
    avgLivingExpenses: "€7,500 - €12,000 EUR / Year",
    postStudyWorkVisa: "2 Years (Graduate Scheme Option)",
    partTimeHours: "20 Hrs/Week (Extended to 40 Hours during summer and winter vacations)",
    intakes: ["Autumn Intake (September) - Major Primary", "Spring Intake (January) - Selected Postgraduate Pipelines"],
    popularCourses: ["MSc in Data Analytics & Computer Science", "Fintech & Corporate Finance", "Pharmaceutical Science & Biotechnology", "Electronic & Computer Engineering"],
    visaDifficulty: "Medium",
    languageRequirement: "IELTS 6.0+ / Duolingo (DET) 110+ / TOEFL 80+",
    visaRequirements: [
      "Official Unconditional Letter of Acceptance from a recognized Irish university",
      "Evidence of paid full tuition fees (at least €6,000 initial payment required)",
      "Proof of immediate access to €10,005 in liquid funds for student support",
      "Comprehensive medical insurance certificate from an Irish provider",
      "Detailed Statement of Purpose outlining academic gaps and study motivations"
    ]
  },
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    popularTitle: "Study in Canada",
    tagline: "Highly accessible pathways, PGWP up to 3 years, and direct routes to Permanent Residency (PR).",
    accentColor: "from-red-600 to-rose-700 text-red-650 bg-red-50 border-red-100",
    overview: "Canada is consistently ranked among the best countries in the world for education and standard of living. It offers exceptional post-study working incentives through the PGWP and streamlined immigration pools specifically favoring international graduates.",
    topReasons: [
      "Rich Post-Graduation Work Permit (PGWP) of up to 3 years helping students integrate with the local job market.",
      "Clear, point-based pathways (Express Entry, Provincial Nominee Programs) to secure Canadian Permanent Residency (PR).",
      "World-class, diverse Designated Learning Institutions (DLIs) located across vibrant, welcoming hubs like Toronto, Vancouver, and Montreal."
    ],
    avgTuitionRange: "$15,000 - $38,000 CAD / Year",
    avgLivingExpenses: "$20,635 CAD / Year (GIC Requirement)",
    postStudyWorkVisa: "Up to 3 Years (Post-Graduation Work Permit - PGWP)",
    partTimeHours: "24 Hrs/Week (Extended from 20 hours under recent updates)",
    intakes: ["Fall Intake (September) - Primary Major", "Winter Intake (January) - Highly Selected", "Summer Intake (May) - Selected Diploma Tracks"],
    popularCourses: ["MBA & Strategic Consulting", "MSc & BSc in Advanced Computing Sciences", "Fintech, Marketing & e-Commerce", "Structural & Energy Power Engineering"],
    visaDifficulty: "Medium",
    languageRequirement: "IELTS 6.5+ (no band below 6.0) / PTE Academic 60+",
    visaRequirements: [
      "Official Letter of Acceptance (LOA) displaying a Designated Learning Institution (DLI) number",
      "Sufficient GIC (Guaranteed Investment Certificate) worth $20,635 CAD as proof of first-year support",
      "Evidence of paid tuition fee for the first academic year",
      "Provincial Attestation Letter (PAL) from the target university's host province (if required under updated regulations)",
      "Approved upfront panel biometric and medical exam clearance proofs"
    ]
  },
  {
    id: "brazil",
    name: "Brazil",
    flag: "🇧🇷",
    popularTitle: "Study in Brazil",
    tagline: "The heart of South America, vibrant research opportunities, and rich cultural immersion.",
    accentColor: "from-emerald-600 to-yellow-500 text-emerald-600 bg-emerald-50 border-emerald-100",
    overview: "Brazil offers spectacular research excellence, particularly across ecology, botany, agricultural studies, and civil engineering. Studying in Brazil gives students unique access to some of Latin America’s highest-ranked institutions, such as the University of São Paulo, mixed with dynamic local lifestyles, affordable living, and deep cultural richness.",
    topReasons: [
      "Home to USP and UNICAMP, two of Latin America's premier top-tier research universities.",
      "Highly affordable living standards and highly accessible public transport configurations.",
      "Vibrant cultural atmosphere with warm environments, rich culinary traditions, and active community-based learning."
    ],
    avgTuitionRange: "$2,000 - $8,000 USD / Year (Many public options charge nominal fees)",
    avgLivingExpenses: "$3,600 - $6,000 USD / Year",
    postStudyWorkVisa: "1 Year after graduation (extendable with employment contract)",
    partTimeHours: "20 Hrs/Week (Recently modernized student work laws)",
    intakes: ["Semester 1 (February/March) - Major Intake", "Semester 2 (July/August) - Secondary Intake"],
    popularCourses: ["Tropical Ecology, Forestry & Environmental Sciences", "Agricultural & Biological Engineering", "Spanish & Portuguese Literature", "Renewable Energy Systems"],
    visaDifficulty: "Easy",
    languageRequirement: "Portugués CELPE-Bras (for Portuguese tracks) or IELTS 6.0+ (for English tracks)",
    visaRequirements: [
      "Official letter of acceptance from a recognized Brazilian higher education institution",
      "Proof of financial self-sufficiency (approximately $500 USD per month)",
      "Apostilled clean background check from national police registry",
      "Comprehensive health insurance valid in Brazil or proof of entry to local SUS system"
    ]
  },
  {
    id: "japan",
    name: "Japan",
    flag: "🇯🇵",
    popularTitle: "Study in Japan",
    tagline: "The land of precision engineering, scientific milestones, and incredible corporate linkage.",
    accentColor: "from-rose-600 to-red-500 text-rose-600 bg-rose-50 border-rose-100",
    overview: "Japan is an elite global superpower in terms of industrial robotics, mechanical engineering, automotive innovation, and advanced materials research. Through extensive English-taught undergraduate and graduate initiatives like the MEXT Scholarship or individual English programs, Japan offers pristine, highly disciplined environments alongside access to giant global employers.",
    topReasons: [
      "Exceptional quality of life, cleanliness, safety, and highly efficient bullet train transit networks.",
      "Pristine technical disciplines with immediate placement pipelines into firms like Toyota, Sony, and Mitsubishi.",
      "The MEXT Scholarship provides fully funded government-backed pathways including round-trip flights and monthly stipends."
    ],
    avgTuitionRange: "$5,000 - $12,000 USD / Year",
    avgLivingExpenses: "$8,000 - $12,000 USD / Year",
    postStudyWorkVisa: "1 - 2 Years (Designated Activities Visa for job hunting)",
    partTimeHours: "28 Hrs/Week (With immigration work permission endorsement)",
    intakes: ["Spring Intake (April) - Ultimate Major Intake", "Autumn Intake (September/October) - English-medium tracks"],
    popularCourses: ["Robotics, AI & Cybernetic Systems", "Automotive & Aerospace Systems Design", "Game Theory & Computer Animation", "Business & Global Economy Management Planning"],
    visaDifficulty: "Medium",
    languageRequirement: "JLPT N3+ (for Japanese-taught tracks) or IELTS 6.0+ (for English tracks)",
    visaRequirements: [
      "Certificate of Eligibility (COE) issued by Japanese Immigration Authorities",
      "Sufficient funding proof (~2,000,000 JPY in a bank account or solid sponsor guarantee)",
      "Academic graduation diplomas and structured motivation letter",
      "Pledge of academic compliance signed by sponsor university"
    ]
  },
  {
    id: "turkey",
    name: "Turkey",
    flag: "🇹🇷",
    popularTitle: "Study in Turkey",
    tagline: "The bridge between East and West, highly affordable international degrees, and rich history.",
    accentColor: "from-red-700 to-amber-600 text-red-650 bg-red-50 border-red-150",
    overview: "Turkey is a scenic, culturally epic bridge connecting Europe and Asia. Turkish universities participate heavily in the European Higher Education Area (Bologna process) and Erasmus+ mobility, delivering fully recognized global diplomas. With extremely affordable tuition scales, cheap housing setups, and superb student resources across Istanbul and Ankara, it represents a top gateway choice.",
    topReasons: [
      "Full Erasmus+ mobility and Bologna process integration, ensuring degrees are recognized across Europe.",
      "The fully funded Turkiye Burslari Scholarship program, sponsoring tuition, flights, housing, and stipends.",
      "Highly accessible cost of living combined with globally rich historical sights, food, and culture."
    ],
    avgTuitionRange: "$1,500 - $6,000 USD / Year (English-track public universities are very affordable)",
    avgLivingExpenses: "$4,000 - $6,000 USD / Year",
    postStudyWorkVisa: "1 Year (Graduation work-search permit linked to student residency exit)",
    partTimeHours: "24 Hrs/Week (For graduate degree pursuers under recent visa amendments)",
    intakes: ["Autumn Intake (September/October) - Primary Intake", "Spring Intake (February) - Very limited master programs"],
    popularCourses: ["Civil & Structural Engineering", "International Relations & European Politics", "Architecture & Heritage Conservation", "Hospitality, Gastronomy & Tourism Management"],
    visaDifficulty: "Easy",
    languageRequirement: "IELTS 5.5+ or TÖMER certificate (for Turkish tracks) or university proficiency exam waiver",
    visaRequirements: [
      "Official university acceptance letter with YÖK (Higher Education Council) endorsement stamp",
      "Evidence of paid tuition fees or scholarship award letters",
      "Proof of financial sufficiency (approximately $500 USD per month held in bank)",
      "Approved travel and local medical insurance policy valid inside Turkey"
    ]
  },
  {
    id: "chile",
    name: "Chile",
    flag: "🇨🇱",
    popularTitle: "Study in Chile",
    tagline: "Stunning natural landscapes, stable economic markets, and leading Latin American universities.",
    accentColor: "from-blue-700 to-red-600 text-blue-600 bg-blue-50 border-blue-100",
    overview: "Chile is widely known for having one of Latin America's most stable, highly modernized economies. Hosting highly ranked academic institutions such as Pontificia Universidad Católica de Chile, it offers international students a safe haven for Spanish language training, mineral engineering, seismology, planetary physics, and astrophotography.",
    topReasons: [
      "Superb economic stability, modern safety indicators, and highly sophisticated urban transit systems.",
      "Unrivalled cosmic research facilities; Chile hosts over 40% of the world's most advanced telescopes and observatories.",
      "Spectacular natural wonders, spanning the Atacama Desert, Andean peaks, and pristine Patagonian fjords."
    ],
    avgTuitionRange: "$3,500 - $7,000 USD / Year",
    avgLivingExpenses: "$5,000 - $8,000 USD / Year",
    postStudyWorkVisa: "1 Year after graduation (can be transitioned onto structural temporary residency via professional contract)",
    partTimeHours: "20 Hrs/Week (Authorization linked directly to the student visa permit)",
    intakes: ["First Semester (March) - Major Intake", "Second Semester (August) - Secondary Intake"],
    popularCourses: ["Astronomy, Astrophysics & Space Science", "Mining, Mineral Processing & Geology", "Spanish Immersion & Latin American Economics", "Marine Biology & Coastal Resource Conservation"],
    visaDifficulty: "Easy",
    languageRequirement: "DELE B2 (highly recommended for Spanish tracks) or IELTS 6.0+ (for restricted English tracks)",
    visaRequirements: [
      "Official Letter of Enrollment from a registered Chilean university approved by Ministry of Education",
      "Proof of funding (at least $600 USD per month in personal or sponsor bank accounts)",
      "Clean medical certificate from a qualified physician",
      "Apostilled criminal record history check certificate"
    ]
  },
  {
    id: "malaysia",
    name: "Malaysia",
    flag: "🇲🇾",
    popularTitle: "Study in Malaysia",
    tagline: "The educational powerhouse of Southeast Asia, dual degree options, and vibrant cultural diversity.",
    accentColor: "from-blue-800 to-yellow-500 text-blue-700 bg-blue-50 border-blue-100",
    overview: "Malaysia stands as a leading, highly innovative hub for international education in Southeast Asia. It hosts branches of top British and Australian universities (such as Monash and Nottingham), allowing students to obtain dual-accredited degrees at a fraction of Western costs. Highly secure, English-speaking, and extremely affordable, it is a magnificent academic launchpad.",
    topReasons: [
      "Dual-degree packages; obtain degrees from top US, UK, or Australian universities at 40% of standard tuition.",
      "Highly affordable public transit, superb digital infrastructure, food, and student housing options.",
      "Outstanding English-speaking index; English is the primary medium of instruction across all private universities."
    ],
    avgTuitionRange: "$3,000 - $7,500 USD / Year",
    avgLivingExpenses: "$4,000 - $6,500 USD / Year",
    postStudyWorkVisa: "1 - 2 Years (Professional Employment Pass pathways or dynamic Digital Nomad pass)",
    partTimeHours: "20 Hrs/Week (Permitted strictly during semester breaks and holidays exceed 7 days)",
    intakes: ["February/March Intake", "June/July Intake", "September/October - Major Intake"],
    popularCourses: ["Information Technology & Cyber Security Studies", "MSc & BSc in Corporate Business, MBA", "Electrical & Electronic Engineering Systems", "Halal Food Science & Islamic Finances"],
    visaDifficulty: "Easy",
    languageRequirement: "IELTS 5.5+ or Duolingo 95+ (Often waived with Medium of Instruction certificate)",
    visaRequirements: [
      "Single Entry Visa (SEV) approval letter issued by EMGS (Education Malaysia Global Services)",
      "Academic transcripts, graduation certificates, and medium of instruction verification",
      "Pre-arrival medical screening clearance report",
      "Proof of financial assets to cover tuition fees and basic Southeast Asian living costs"
    ]
  },
  {
    id: "indonesia",
    name: "Indonesia",
    flag: "🇮🇩",
    popularTitle: "Study in Indonesia",
    tagline: "An archipelago of biodiversity, rich maritime science, and highly affordable living.",
    accentColor: "from-red-650 to-slate-200 text-red-600 bg-red-50 border-red-150",
    overview: "Indonesia is a vast, biodiverse archipelago offering deep insight into ecology, volcanology, maritime logistics, and cultural anthropology. Hosting premier institutions like Universitas Indonesia (UI) and Gadjah Mada University (UGM), it presents highly affordable tuition scales, warm tropical hospitality, and rich academic field studies.",
    topReasons: [
      "Outstanding biodiversity; perfect for research in marine biology, volcanology, and tropical archaeology.",
      "Incredibly low cost of living, letting international students thrive comfortably on budgets under $400/month.",
      "Invaluable cultural network pathways in a rapidly rising Southeast Asian economic superpower."
    ],
    avgTuitionRange: "$2,000 - $5,000 USD / Year",
    avgLivingExpenses: "$3,000 - $5,000 USD / Year",
    postStudyWorkVisa: "1 Year after graduation (can be expanded via local corporate IT/business sponsorships)",
    partTimeHours: "20 Hrs/Week (Linked to authorization approval under student stay permits)",
    intakes: ["Odd Semester (August/September) - Major Intake", "Even Semester (February) - Secondary Intake"],
    popularCourses: ["Tropical Forestry, Marine Biology & Marine Science", "Volcanology & Disaster Preparedness Studies", "Bahasa Indonesia & Southeast Asian Cultural Anthropology", "Agriculture Science & Sustainability Systems"],
    visaDifficulty: "Easy",
    languageRequirement: "IELTS 5.5+ (for English-taught international cohorts) or UKBI (for Indonesian tracks)",
    visaRequirements: [
      "Study Permit approval letter issued by the Ministry of Education, Culture, Research, and Technology of Indonesia",
      "Official Letter of Admission from host university listing duration of the course",
      "Bank statement of at least $1,500 USD or equivalent proof of financial support",
      "Health certificate and complete vaccination clearance statement"
    ]
  },
  {
    id: "south-africa",
    name: "South Africa",
    flag: "🇿🇦",
    popularTitle: "Study in South Africa",
    tagline: "Leading academic African academies, deep biodiversity, and rich English-speaking research circles.",
    accentColor: "from-emerald-700 to-yellow-600 text-emerald-700 bg-emerald-50 border-emerald-150",
    overview: "South Africa hosts multiple world-ranking academic institutions, including the University of Cape Town (UCT) and Stellenbosch University. Delivering pristine English-medium education in business, marine sciences, mining geology, and social justice, it offers a scenic, highly affordable gateway with deep research pedigree.",
    topReasons: [
      "The University of Cape Town (UCT) ranks consistently as the finest university across the African continent.",
      "Leading research structures in astrophotography (SKA project), infectious diseases, and mining engineering.",
      "Exceptional adventure parameters, from Table Mountain hiking to spectacular coastal oceanic safaris."
    ],
    avgTuitionRange: "$4,000 - $9,000 USD / Year",
    avgLivingExpenses: "$4,500 - $7,000 USD / Year",
    postStudyWorkVisa: "1 - 2 Years (Critical Skills Work Visa pathways for qualified STEM graduates)",
    partTimeHours: "20 Hrs/Week (Work endorsement is automatically authorized as part of your study visa)",
    intakes: ["Semester 1 (January/February) - Principal Major", "Semester 2 (July) - Secondary Intake"],
    popularCourses: ["Global Public Health & Infectious Epidemiology", "Mining, Geological Exploration & Mineralogy", "Wildlife Conservation, Zoology & Marine Policy", "Corporate Law & Social Justice Dynamics"],
    visaDifficulty: "Medium",
    languageRequirement: "IELTS 6.0+ or waiver letter for students with prior English education",
    visaRequirements: [
      "Official Letter of Undertaking and acceptance from a registered South African university",
      "Comprehensive SAQA evaluation of prior high school or undergraduate transcripts (if requested)",
      "Medical and radiological certificate showing no active tuberculosis",
      "Proof of financial capacity to cover yearly fees, local medical aid coverage, and living costs"
    ]
  }
];
