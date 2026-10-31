import { Service, LocationInfo, Testimonial, StatItem, WhyChooseItem, University } from "./types";

export const SERVICES_DATA: Service[] = [
  {
    id: "university-admissions",
    title: "University Admissions",
    description: "End-to-end support for securing admissions in elite global universities, tailoring profiles and crafting standout SOPs.",
    longDescription: "Our university admission placement is a strategic 360-degree service. We carefully assess your academic history, career objectives, and financial capabilities to design a personalized university list. From shortlisting institutions matching your interest to filing precise applications and polishing your Statement of Purpose (SOP) or Letter of Recommendation (LOR), our experts ensure your portfolio stands out from global pools.",
    iconName: "GraduationCap",
    benefits: ["Personalized university matchmaking", "SOP evaluation and editing support", "Application review and portfolio styling"],
    processTimeline: [
      "Week 1-2: Initial academic assessment & career fit brainstorming profile audit",
      "Week 3-4: Curated university list generation (Best-fit, Match, & Safety grids)",
      "Week 5-6: Structured SOP styling feedback, resume tailoring, and recommendation layouts",
      "Week 7-8: Direct portal submission with partner tracking indicators"
    ],
    requiredDocs: [
      "Official high school / under-grad academic transcripts",
      "Valid Passport ID bio page",
      "Standard CV / Resume highlighting extracurriculars & local accolades",
      "2-3 Letters of Recommendation (Academic or Professional)",
      "Statement of Purpose (SOP) essay draft"
    ]
  },
  {
    id: "visa-guidance",
    title: "Visa & Immigration Guidance",
    description: "Comprehensive guidance on visa requirements, documentation compilation, and structural mock interview training.",
    longDescription: "Navigating international visa protocols can be demanding. Our immigration counsel stays updated with current policies for the UK, USA, Canada, Australia, Europe, and the Middle East. We offer meticulous checklist compilation, financial auditing, cover letter layouts, and mock visa interview simulations that have helped us accomplish an outstanding 98% success rate.",
    iconName: "FileCheck",
    benefits: ["98% verified visa success rate", "Mock interview simulations", "Meticulous documentation audits"],
    processTimeline: [
      "Stage 1: Country-specific visa policy diagnostics and financial bank statement checklist compilation",
      "Stage 2: Thorough audit of source of funds, sponsorship affidavits, and family tax filing certifications",
      "Stage 3: Drafted Statement of Intent (GTE) cover letters for immigration officers",
      "Stage 4: Face-to-face mock interview routines replicating real embassy environments"
    ],
    requiredDocs: [
      "Official University Acceptance letter (CAS / CoE / I-20 Form)",
      "Verified bank verification letter with minimum 28-day funds hold",
      "Immigration health surcharge & embassy fee payment slips",
      "Source of wealth verification (Tax files, property valuations, or salary slips)",
      "Police clearance certificates & certified medical exam reports"
    ]
  },
  {
    id: "scholarship-assistance",
    title: "Scholarship Assistance",
    description: "Identification of merit-based, need-based, and state-sponsored scholarship opportunities to fund your global dream.",
    longDescription: "Don't let financial obstacles limit your vision. We actively cross-examine academic excellence, athletic criteria, and need-based state funding options. Our advisors guide you in writing powerful scholarship essays, applying for regional tuition waivers, and pursuing athletic or institutional research fellowships.",
    iconName: "Coins",
    benefits: ["Merit & need-based scholarship filtering", "Effective essay crafting advice", "Tuition waiver options coverage"],
    processTimeline: [
      "Cycle 1: Global scholarship catalog mapping (Government, Corporate, & Direct University pathways)",
      "Cycle 2: Personal statement structuring targeting humanitarian or research values",
      "Cycle 3: Submission and secondary evaluation drills with partner representatives"
    ],
    requiredDocs: [
      "Highest GPA certificates / academic gold medals",
      "Certified household income sheets for need-based claims",
      "Custom Scholarship application essays",
      "Record of regional sports, arts, or community volunteer services"
    ]
  },
  {
    id: "career-counseling",
    title: "Global Career Counseling",
    description: "In-depth psychometric alignment and market trend insights to map your study choices with world-class careers.",
    longDescription: "A degree is an investment in your future. Our certified counselors hold career mapping sessions to ensure the discipline you study seamlessly translates into highly in-demand skills in target job markets. We align your degrees with global employment trends, post-study work routes, and prospective pathways.",
    iconName: "Compass",
    benefits: ["Psychometric interest exploration", "Post-study work visa pathway alignment", "Industry-wise employment trend insights"],
    processTimeline: [
      "Phase 1: In-house career assessment test and behavioral evaluation",
      "Phase 2: Employment forecast scan and international salary statistics mapping",
      "Phase 3: Degree curriculum audit ensuring accreditation by regional boards (e.g., ABET, AACSB)"
    ],
    requiredDocs: [
      "Academic track records & major subject transcripts",
      "Completed psychometric evaluation report (conducted at our physical desks)",
      "Career target preferences & geographic region choices checklist"
    ]
  },
  {
    id: "test-prep",
    title: "Test Prep (IELTS / TOEFL)",
    description: "Rigorous diagnostic testing, personalized study schemes, and mock evaluation pipelines with expert examiners.",
    longDescription: "Unlock your language prerequisites with our expert test preparation. We provide customized diagnostic exams, extensive study material, digital templates, and detailed diagnostic reports. Our training boosts confidence and strategy, enabling candidates to secure top scores requested by premier institutes.",
    iconName: "BookOpen",
    benefits: ["Custom diagnostic mock assessments", "Certified instructors & interactive modules", "Flexible schedule & band improvement blueprints"],
    processTimeline: [
      "Week 1: Comprehensive benchmark exam to trace structural speaking & listening gaps",
      "Week 2-4: Focused modules (Structured essay mapping, speed reading under time bounds)",
      "Week 5-6: Core speaking evaluation and full mock exams evaluated by certified trainers"
    ],
    requiredDocs: [
      "National ID / Passport copy",
      "Uni Help Diagnostic benchmark record scorecard",
      "Course enrollment sheet & preference (Academic vs General Training)"
    ]
  },
  {
    id: "pre-departure",
    title: "Pre-Departure & Acculturation",
    description: "Essential briefings on student life, health insurance cover, legal compliance, and community network resources.",
    longDescription: "Landing in a new country is an exciting transition. We ensure you feel welcomed and fully prepared before you board. Our briefs cover student bank account establishment, healthcare insurance registrations, local travel arrangements, accommodation leases, and cultural adaptations, along with introductions to active alumni circles.",
    iconName: "PlaneTakeoff",
    benefits: ["On-campus accommodation linkages", "Student banking & insurance guide", "Introduction to regional alumni circles"],
    processTimeline: [
      "Milestone 1: Dynamic seminar regarding medical registrations, city maps, and safe student quarters",
      "Milestone 2: Multi-regional group call introducing freshmen to on-campus senior mentors",
      "Milestone 3: Packing guide, currency limits briefs, and air-port transition charts"
    ],
    requiredDocs: [
      "Stamped Student Visa validation page",
      "Prepaid flight schedules & landing card draft",
      "Pre-assigned dormitory address or host certificate",
      "International immunization & vaccination records folder"
    ]
  }
];

export const UNIVERSITIES_DATA: University[] = [
  {
    id: "uni-toronto",
    name: "University of Toronto",
    country: "Canada",
    flag: "🇨🇦",
    worldRanking: 21,
    acceptanceRate: "43%",
    ieltsRequirement: "7.0 (with no band lower than 6.5)",
    avgTuition: "$45,000 - $62,000 CAD / Year",
    intakePeriods: ["September (Fall Intake)", "January (Limited Winter Intake)"],
    popularPrograms: [
      "B.S. in Computer Science & Machine Learning",
      "Master of Business Administration (Rotman MBA)",
      "Bachelor of Applied Engineering & Material Science",
      "Master of Public Health (Dalla Lana School)"
    ],
    scholarshipsAvailable: [
      "Lester B. Pearson International Scholarship (Full Coverage)",
      "President's Scholars of Excellence (Tuition Waiver)",
      "U of T International Scholar Award"
    ],
    requiredDocuments: [
      "High School Diploma with a minimum GPA of 3.8/4.0 or equivalent",
      "Standard SOP details + CV",
      "English Proficiency proof (IELTS or TOEFL)",
      "2 Academic reference certificates"
    ],
    description: "Standing as Canada's leading research institution, the University of Toronto is a highly prestigious, multi-campus university offering rich historic libraries, world-class labs, and an active co-op internship blueprint. Based in Toronto's economic core, it provides immediate linkages to global recruiters.",
    whyStudyHere: [
      "Highly accredited Canadian degree with direct 3-year PGWP (Post-Graduation Work Permit) eligibility",
      "Access to the Rotman School of Management and world-recognized Vector AI institute hubs",
      "Consistently ranked the number 1 university inside Canada by all prestigious index boards"
    ]
  },
  {
    id: "kings-london",
    name: "King's College London",
    country: "United Kingdom",
    flag: "🇬🇧",
    worldRanking: 40,
    acceptanceRate: "15%",
    ieltsRequirement: "7.0 (with minimum 6.5 in all bands)",
    avgTuition: "£24,000 - £31,000 GBP / Year",
    intakePeriods: ["September (Primary Intake)", "January (Selected Master Degrees)"],
    popularPrograms: [
      "LLM in International Corporate Law",
      "BSc in Finance, Fintech & Artificial Intelligence",
      "M.Sc. in Psychological Medicine / Healthcare Studies",
      "MA in War Studies & International Relations"
    ],
    scholarshipsAvailable: [
      "KCL Global Leaders Scholarship (Up to £10,000)",
      "Chevening Fellowships Support (Full tuition & living stipend)",
      "King's Alumni Direct Postgraduate Bursary"
    ],
    requiredDocuments: [
      "British A-Levels with AAA-A*AA equivalence, or national board scorecard above 85%",
      "Personal statement outlining subject matter passion",
      "Two letters of reference with official school stamps",
      "Satisfactory criminal records audit for healthcare/law disciplines"
    ],
    description: "An elite member of the UK's prestigious Russell Group research circle, King's College London spans historic Thames-side campuses in the absolute center of London. Known for producing global leaders, KCL specializes in cutting-edge healthcare, policy, humanities, and business informatics.",
    whyStudyHere: [
      "Prestigious UK brand recognized instantly across government and elite investment circles worldwide",
      "Prime central London geographic coordinates, giving superb access to banking, tech, and healthcare industries",
      "Comprehensive research networks with 12+ Nobel laureates throughout its historic ranks"
    ]
  },
  {
    id: "uni-adelaide",
    name: "University of Adelaide",
    country: "Australia",
    flag: "🇦🇺",
    worldRanking: 89,
    acceptanceRate: "75%",
    ieltsRequirement: "6.5 (with minimum 6.0 in all bands)",
    avgTuition: "$36,000 - $46,000 AUD / Year",
    intakePeriods: ["February (Semester 1)", "July (Semester 2)"],
    popularPrograms: [
      "Master of Wine Business / Viticulture",
      "M.S. in Software Engineering & Cybersecurity",
      "Bachelor of Architectural & Space Design",
      "Bachelor of Petroleum & Chemical Engineering"
    ],
    scholarshipsAvailable: [
      "Global Citizens Scholarship (15% to 30% Tuition fee waiver)",
      "Adelaide Global Academic Excellence Award (50% Tuition Fee)",
      "Higher Education Family Scholarship discounts"
    ],
    requiredDocuments: [
      "Secondary school completion certificates with aggregate marks equivalent to 75%+",
      "IELTS Academic report form",
      "Proof of funds matching Australian DHA rules",
      "Statement of Purpose addressing Genuine Temporary Entrant (GTE) criteria"
    ],
    description: "The University of Adelaide is one of Australia's historic 'Group of Eight' prestigious universities. Located in a safe, affordable, exceptionally livable cost region, Adelaide offers premium research facilities and regional immigration bonus points towards permanent residency for graduates.",
    whyStudyHere: [
      "One additional year of post-study working visa due to designated regional status pathways",
      "State-of-the-art agricultural, AI software engineering, and clean energy laboratory setups",
      "Affordable living tuition ratios making it a highly requested target among families"
    ]
  },
  {
    id: "nyu-global",
    name: "New York University",
    country: "United States",
    flag: "🇺🇸",
    worldRanking: 38,
    acceptanceRate: "12%",
    ieltsRequirement: "7.5 (or TOEFL 100+)",
    avgTuition: "$54,000 - $64,000 USD / Year",
    intakePeriods: ["September (Fall Semester)", "January (Spring Semester)"],
    popularPrograms: [
      "BS in Finance / Economics (Stern School of Business)",
      "Bachelor of Fine Arts (Tisch School of the Arts)",
      "MS in Computer Engineering (Tandon School of Engineering)",
      "M.A. in International Media & Communications"
    ],
    scholarshipsAvailable: [
      "AnBryce Scholarship (Full tuition & room expenses)",
      "Martin Luther King Jr. Humanitarian Aid scholarships",
      "Tandon School Merit Scholarship (Up to $25,000/year)"
    ],
    requiredDocuments: [
      "Official high school transcripts evaluated by WES (if requested)",
      "SAT / ACT scores (Optional but highly recommended for placement)",
      "3 Comprehensive Letters of Recommendation",
      "Rich Personal Statement outlining creative or entrepreneurial objectives"
    ],
    description: "Operating with New York City itself as its dynamic campus, NYU is a global heavyweight. With campuses that range from Greenwich Village to Brooklyn, NYU places students directly in front of the world's finest financial, tech, and theatrical corporations, offering an unmatched career launchpad.",
    whyStudyHere: [
      "Highly prestigious Stern Business School and Tandon Tech options on your resume",
      "Unparalleled corporate linkage events, internship circles, and startup incubator access",
      "Vibrant multi-cultural urban environment that builds real-world confidence & maturity"
    ]
  },
  {
    id: "uni-melbourne",
    name: "University of Melbourne",
    country: "Australia",
    flag: "🇦🇺",
    worldRanking: 14,
    acceptanceRate: "65%",
    ieltsRequirement: "7.0 (with no band lower than 6.5)",
    avgTuition: "$41,000 - $51,000 AUD / Year",
    intakePeriods: ["February (Semester 1 Intake)", "July (Semester 2 Intake)"],
    popularPrograms: [
      "Master of Information Technology / Data Science",
      "Bachelor of Commerce (Finance & Management)",
      "Master of Engineering (Mechatronics)",
      "Juris Doctor (Melbourne Law School)"
    ],
    scholarshipsAvailable: [
      "Melbourne Graduate Scholarship (Partial fee waivers)",
      "Melbourne Research Scholarship (Full stipend & tuition cover)",
      "Elizabeth & Carlton Scholars assistance"
    ],
    requiredDocuments: [
      "Certified transcripts with strong performance indicators inside mathematics/science",
      "Detailed statement of temporary entrance intentions",
      "CV & official syllabus outlines for credit transfer requests"
    ],
    description: "Ranked 14th in the entire world, the University of Melbourne is the undisputed pinnacle of Australian higher education. With its distinctive Melbourne Model curriculum, it focuses on building deep critical thinking skills paired with rich professional certifications.",
    whyStudyHere: [
      "Unmatched global prestige, ranked inside the top 15 universities worldwide",
      "Beautiful cultural city of Melbourne, consistently voted in top 10 most livable cities",
      "Superb networking with top-tier Australian and international employer networks"
    ]
  },
  {
    id: "mcgill-univ",
    name: "McGill University",
    country: "Canada",
    flag: "🇨🇦",
    worldRanking: 30,
    acceptanceRate: "46%",
    ieltsRequirement: "6.5 (minimum 6.0 in each section)",
    avgTuition: "$39,000 - $54,000 CAD / Year",
    intakePeriods: ["September (Only Fall Intake)"],
    popularPrograms: [
      "B.Eng in Computer Engineering (Software Focus)",
      "Master of Science in Neuroscience / Biology",
      "Bachelor of Commerce & Global Investments",
      "BSc in Food Sciences & Agricultural Systems"
    ],
    scholarshipsAvailable: [
      "McGill Major Entrance Scholarship ($3,000 to $12,000 per year)",
      "McGill Bursary Program (Need-based financial assistance)",
      "Faculty of Science merit awards"
    ],
    requiredDocuments: [
      "Strong performance index in national boards or A-Levels (minimum 88% average)",
      "Certified SAT or ACT scoreboards (if applying via American syllabus)",
      "Completed McGill admissions dashboard filings"
    ],
    description: "Located in the beautiful, bilingual European-style city of Montreal, McGill University is affectionately nicknamed 'The Harvard of Canada.' Boasting 12 Nobel laureates and a reputation for supreme academic rigor, it stands at the frontline of global medical and engineering developments.",
    whyStudyHere: [
      "Study under absolute global standards, surrounded by exceptional peers representing 150+ countries",
      "Experience Montreal's exceptionally affordable and vibrant culture, ranked one of the finest student destinations",
      "Top-tier post-graduation employment index, highly revered across Boston, Silicon Valley, and Europe"
    ]
  },
  {
    id: "tum-germany",
    name: "Technical University of Munich",
    country: "Germany",
    flag: "🇩🇪",
    worldRanking: 37,
    acceptanceRate: "8%",
    ieltsRequirement: "6.5 (or TOEFL 88+)",
    avgTuition: "€0 - €3,000 EUR / Semester",
    intakePeriods: ["October (Winter Semester)", "April (Summer Semester)"],
    popularPrograms: [
      "B.Sc. in Robotics, Cognition & Intelligence",
      "M.Sc. in Automotive Software Engineering",
      "M.Sc. in Biomedical Engineering & Medical Physics",
      "B.Sc. in Management & Technology (TUM-SOM)"
    ],
    scholarshipsAvailable: [
      "DAAD Scholarship (Full coverage stipend)",
      "Heinrich Böll Foundation Scholarships",
      "TUM Grants for International Students"
    ],
    requiredDocuments: [
      "VPD (Vorprüfungsdokumentation) via Uni-Assist",
      "High School Diploma with certified German translations",
      "English/German Language Proof",
      "Letter of Motivation & CV"
    ],
    description: "Consistently ranked as Germany's absolute best university, the Technical University of Munich represents supreme excellence in engineering, computer science, and natural sciences. Located in the bustling technological capital of Munich, it provides free tuition pathways and deep ties to Europe's industry giants.",
    whyStudyHere: [
      "High prestige degree with virtually zero tuition costs under Germany's public education scheme",
      "Extensive hands-on labs with direct R&D partnerships with Siemens, BMW, and Airbus",
      "Exceptional post-studying Job Seeker Visa giving up to 18 months for graduates"
    ]
  },
  {
    id: "sorbonne-france",
    name: "Sorbonne University",
    country: "France",
    flag: "🇫🇷",
    worldRanking: 59,
    acceptanceRate: "10%",
    ieltsRequirement: "6.5 (or DELF B2 for French tracks)",
    avgTuition: "€2,770 - €3,770 EUR / Year",
    intakePeriods: ["September (Autumn Intake)"],
    popularPrograms: [
      "B.S. in Mathematics & Computer Science",
      "Master in Computational Mechanics",
      "M.A. in History & Philosophy of Science",
      "M.Sc. in Physics of Complex Systems"
    ],
    scholarshipsAvailable: [
      "Eiffel Excellence Scholarship (Full monthly allowance + fees)",
      "Sorbonne University Foundation Grants",
      "Charpak Scholarship (For bilateral researchers)"
    ],
    requiredDocuments: [
      "Dossier filed via 'Etudes en France' portal",
      "Certified French translation of transcriptor sheets",
      "Motivation Essay detailing academic aims",
      "2 Academic Reference Letters"
    ],
    description: "Located in the historic heart of Paris, Sorbonne University is a major world research institution with a heritage dating back to the 13th century. It offers state-funded tuition models and acts as a legendary intellectual hub for literature, core sciences, and mathematics.",
    whyStudyHere: [
      "Extremely affordable tuition fees subsidized by the French government for international students",
      "Unbelievable location on the Left Bank in central Paris, rich with lifestyle and intellectual history",
      "Eligible for Eiffel and European Union Erasmus research grants and fellowships"
    ]
  },
  {
    id: "ub-spain",
    name: "University of Barcelona",
    country: "Spain",
    flag: "🇪🇸",
    worldRanking: 152,
    acceptanceRate: "41%",
    ieltsRequirement: "6.5 (or DELE B2 for Spanish tracks)",
    avgTuition: "€2,500 - €4,500 EUR / Year",
    intakePeriods: ["September (First Semester)", "February (Second Semester Intake)"],
    popularPrograms: [
      "Bachelor of Business Administration & Management",
      "M.Sc. in Bioinformatics & Medical Imaging",
      "Master in International Business",
      "B.Sc. in Marine Sciences & Biology"
    ],
    scholarshipsAvailable: [
      "UB International Collaboration Grants",
      "MAEC-AECID Government Scholarship",
      "Erasmus+ EU Mobility Stipends"
    ],
    requiredDocuments: [
      "Credential of Homologación via Spanish Ministry of Education",
      "Official high school transcript records",
      "Proof of English or Spanish language proficiency",
      "Copy of Passport bio page"
    ],
    description: "As the top-rated research school in Spain, the University of Barcelona combines hundreds of years of historic academic tradition with state-of-the-art facilities. Nestled in Europe's most vibrant coastal startup hub, it represents an outstanding Mediterranean educational experience.",
    whyStudyHere: [
      "Prime location in Barcelona, a premier European business, culture, and coastal tech hub",
      "Part of the prestigious LERU (League of European Research Universities) network",
      "Extremely competitive tuition structures compared to English-speaking counterpart countries"
    ]
  },
  {
    id: "elte-hungary",
    name: "Eötvös Loránd University",
    country: "Hungary",
    flag: "🇭🇺",
    worldRanking: 564,
    acceptanceRate: "35%",
    ieltsRequirement: "6.0 (with no band lower than 5.5)",
    avgTuition: "€4,000 - €7,000 EUR / Year",
    intakePeriods: ["September (Autumn Intake)", "February (Limited Spring Intake)"],
    popularPrograms: [
      "B.Sc. in Computer Science & Programming",
      "M.A. in International Relations & Global Policy",
      "B.Sc. in Psychology & Behavioral Analytics",
      "M.Sc. in Applied Mathematics & Data Modeling"
    ],
    scholarshipsAvailable: [
      "Stipendium Hungaricum Scholarship (100% tuition, monthly allowance & health cover)",
      "Hungarian Diaspora Scholarship",
      "ELTE Merit Grants for Outstanding Academics"
    ],
    requiredDocuments: [
      "Certified graduation transcripts (with English Translations)",
      "Standard English eligibility certificates (IELTS/TOEFL)",
      "Detailed Curriculum Vitae",
      "Completed online entrance test (applicable to software and science tracks)"
    ],
    description: "Based in Budapest, Eötvös Loránd University (ELTE) is Hungary's leading research university, known for a rich legacy of Nobel laureates and outstanding scientists. ELTE is celebrated for highly robust computer science, psychology, and humanities schools taught completely in English.",
    whyStudyHere: [
      "Eligible for Stipendium Hungaricum, one of the world's most generous full government funding cycles",
      "Vibrant, extraordinarily cheap, and beautiful central European living in Budapest",
      "Fully accredited European Union degree with smooth cross-border transfer programs (ECTS)"
    ]
  },
  {
    id: "snu-korea",
    name: "Seoul National University",
    country: "South Korea",
    flag: "🇰🇷",
    worldRanking: 41,
    acceptanceRate: "15%",
    ieltsRequirement: "6.5 (or TOPIK Level 3+ for Korean tracks)",
    avgTuition: "$6,000 - $9,500 USD / Year",
    intakePeriods: ["March (Spring Intake)", "September (Fall Intake)"],
    popularPrograms: [
      "B.S. in Electrical & Computer Engineering",
      "Global MBA Program (SNU Graduate School)",
      "Master of Public Policy & International Dev",
      "B.S. in Biotechnology & Chemical Science"
    ],
    scholarshipsAvailable: [
      "Global Korea Scholarship (GKS) - Full Tuition, Airfare & Living allowance",
      "SNU President Fellowship (SPF)",
      "Graduate Scholarship for Excellent Foreign Students (GSFS)"
    ],
    requiredDocuments: [
      "Certificate of graduation with Apostille or Consular confirmation",
      "Standard English or Korean language scores sheet",
      "Two official recommendation letters",
      "Portfolio details (for fine arts/design only)"
    ],
    description: "Ranking as the supreme academic crown jewel of South Korea, Seoul National University (SNU) is the apex of the prestigious 'SKY' trio. Situated in SNU's beautiful Gwanak campus in Seoul, it delivers top-tier educational curriculum, partnering with market heavyweights like Samsung, Hyundai, and LG.",
    whyStudyHere: [
      "Extreme brand prestige, opening doors to South Korea's high-tech conglomerate networks (Samsung, LG)",
      "Subsidized state tuition fees offering Ivy League level tier at a fraction of Western costs",
      "Deep immersion in the hyper-modern, safe, and historically rich cultural life of Seoul"
    ]
  },
  {
    id: "usp-brazil",
    name: "University of São Paulo",
    country: "Brazil",
    flag: "🇧🇷",
    worldRanking: 85,
    acceptanceRate: "10%",
    ieltsRequirement: "6.5 (or Celpe-Bras exam for Portuguese-taught tracks)",
    avgTuition: "Free (No tuition fees in public university)",
    intakePeriods: ["March (First Semester)", "August (Second Semester)"],
    popularPrograms: [
      "M.Sc. in Tropical Biodiversity & Conservation",
      "B.Sc. in Computer Engineering & Digital Systems",
      "Master of Business Management & Finance",
      "M.S. in Bio-processing Engineering"
    ],
    scholarshipsAvailable: [
      "CAPES Postgraduate Research Stipends",
      "FAPESP Research Fellowships",
      "USP International Student Accommodation Bursaries"
    ],
    requiredDocuments: [
      "High School Diploma with official Portuguese Translation",
      "Certified transcripts detailing subject grades",
      "Passport page validity verification",
      "Proof of Celpe-Bras or English proficiency depending on chosen track"
    ],
    description: "The University of São Paulo (USP) is the premiere public institution of higher education and research in Latin America. Renowned for its technological innovation, medical research, and economic sciences, USP offers tuition-free education on campuses teeming with rich ecological reserves and libraries.",
    whyStudyHere: [
      "Tuition-free high-quality elite education at the top-ranked research university in Latin America",
      "Leading startup ecosystem of São Paulo of over 12 million residents with direct professional links",
      "Unique focus on bio-refinery, tropical medicine, agriculture, and high-performance computation"
    ]
  },
  {
    id: "tcd-ireland",
    name: "Trinity College Dublin (TCD)",
    country: "Ireland",
    flag: "🇮🇪",
    worldRanking: 81,
    acceptanceRate: "33%",
    ieltsRequirement: "6.5 (with no band lower than 6.0)",
    avgTuition: "€15,000 - €26,000 EUR / Year",
    intakePeriods: ["September (Autumn Intake)"],
    popularPrograms: [
      "BA/Mod in Computer Science",
      "MSc in Computer Science (Data Science)",
      "MBA (Trinity Business School)",
      "MSc in Finance"
    ],
    scholarshipsAvailable: [
      "Global Excellence Postgraduate Scholarship",
      "Government of Ireland International Education Scholarship",
      "Trinity Sport Scholarship"
    ],
    requiredDocuments: [
      "High school transcripts or Bachelor degree scorecards with GPA 3.3/4.0+",
      "Two academic reference letters",
      "Statement of Purpose (SOP)",
      "English proficiency certificate (IELTS/TOEFL)"
    ],
    description: "Located in the beautiful cobblestoned heart of Dublin, Trinity College Dublin is Ireland's oldest, most prestigious university, founded in 1592. Historically modeled after Oxford and Cambridge, TCD is a world-class research institution famous for producing literary giants like Oscar Wilde and Bram Stoker, alongside cutting-edge modern science and computing hubs.",
    whyStudyHere: [
      "Consistently ranked the #1 university in Ireland and a top-100 global institution.",
      "Rich history with state-of-the-art labs, situated in Dublin's technological and financial core.",
      "Direct access to top-tier international recruitment circuits of major tech corporations adjacent to campus."
    ]
  },
  {
    id: "ucd-ireland",
    name: "University College Dublin (UCD)",
    country: "Ireland",
    flag: "🇮🇪",
    worldRanking: 126,
    acceptanceRate: "40%",
    ieltsRequirement: "6.5 (with no band lower than 6.0)",
    avgTuition: "€14,800 - €24,500 EUR / Year",
    intakePeriods: ["September (Primary Intake)", "January (Selected postgraduate programs)"],
    popularPrograms: [
      "MSc in Data & Computational Science",
      "MBA (Michael Smurfit Graduate Business School)",
      "MSc in Quantitative Finance",
      "BEng in Electronic & Computer Engineering"
    ],
    scholarshipsAvailable: [
      "UCD Global Excellence Scholarship (50% or 100% Tuition Waiver)",
      "UCD Smurfit Merit Scholarships",
      "Government of Ireland Scholarships"
    ],
    requiredDocuments: [
      "Academic transcripts (Undergraduate degree above 65%+ or high school above 80%)",
      "Detailed Statement of Purpose",
      "CV outlining academic and professional accolades",
      "Two references and English language report"
    ],
    description: "University College Dublin is Ireland's largest and most globally diverse university. Situated on a sprawling, modern parkland campus in south Dublin, UCD is famous for its elite triple-accredited Smurfit Business School and its massive leadership in engineering, business, veterinary sciences, and international policy.",
    whyStudyHere: [
      "Home to the triple-accredited Michael Smurfit Graduate Business School, ranked among Europe's absolute best.",
      "Ranked #1 in Ireland for graduate employability for over five consecutive years.",
      "Vibrant modern campus featuring unparalleled residential, sporting, and student union networks."
    ]
  },
  {
    id: "ucc-ireland",
    name: "University College Cork (UCC)",
    country: "Ireland",
    flag: "🇮🇪",
    worldRanking: 273,
    acceptanceRate: "45%",
    ieltsRequirement: "6.5 (with no band lower than 6.0)",
    avgTuition: "€13,000 - €22,500 EUR / Year",
    intakePeriods: ["September (Primary Intake)"],
    popularPrograms: [
      "MSc in Biotechnology",
      "MSc in Food Science & Nutrition",
      "MSc in Information Systems for Business Performance",
      "MEng in Sustainable Energy"
    ],
    scholarshipsAvailable: [
      "UCC International Student Merit Scholarship",
      "SEFS (Science, Engineering & Food Science) Postgraduate Scheme",
      "UCC Sports Scholarships"
    ],
    requiredDocuments: [
      "Certified transcripts with clear grading criteria",
      "English proficiency test results (IELTS/DET)",
      "Personal Statement (SOP) with clear career objectives",
      "Two recommendation letters"
    ],
    description: "Located in Ireland's culinary and pharmaceutical capital of Cork, University College Cork is a beautiful riverside campus combining historic 19th-century architecture with cutting-edge scientific research. UCC is globally famous for its food science, biotechnology, and renewable energy research departments.",
    whyStudyHere: [
      "World-renowned authority on Food Sciences, Biotechnology, and Renewable Energy research.",
      "Located adjacent to Cork's massive pharmaceutical cluster, home to 8 of the top 10 global pharma companies.",
      "Awarded 'Greenest University in the World' for outstanding campus ecological and sustainability policies."
    ]
  },
  {
    id: "ug-ireland",
    name: "University of Galway (UG)",
    country: "Ireland",
    flag: "🇮🇪",
    worldRanking: 289,
    acceptanceRate: "48%",
    ieltsRequirement: "6.5 (with no band lower than 6.0)",
    avgTuition: "€12,500 - €22,000 EUR / Year",
    intakePeriods: ["September (Primary Fall Intake)"],
    popularPrograms: [
      "MSc in Biomedical Engineering",
      "MSc in Software Design & Cognitive Science",
      "MA in International Journalism",
      "MSc in Regenerative Medicine & Stem Cell Tech"
    ],
    scholarshipsAvailable: [
      "Galway Global Excellence Scholarships (Up to €5,000)",
      "MSc Biomedical Engineering Merit Scholarships",
      "Hardiman Research Scholarships"
    ],
    requiredDocuments: [
      "Bachelor or high school transcripts and diplomas",
      "Detailed SOP",
      "IELTS or TOEFL equivalent scorecard",
      "Two letters of reference on official letterheads"
    ],
    description: "Perched on the banks of the River Corrib, the University of Galway is located in the cultural and festival heartbeat of Ireland's West Coast. It is a globally recognized research-led institution leading international breakthroughs in med-tech, biomedical sciences, marine optics, and human rights law.",
    whyStudyHere: [
      "Located in Galway, a world-class hub for medical device engineering (MedTech) companies.",
      "Ranked inside the top 1% of universities globally, with rich creative and artistic industry links.",
      "Stunning, supportive campus culture in one of the friendliest cities in Western Europe."
    ]
  },
  {
    id: "dcu-ireland",
    name: "Dublin City University (DCU)",
    country: "Ireland",
    flag: "🇮🇪",
    worldRanking: 436,
    acceptanceRate: "55%",
    ieltsRequirement: "6.5 (with no band lower than 6.0)",
    avgTuition: "€11,500 - €18,500 EUR / Year",
    intakePeriods: ["September (Autumn Intake)", "January (Selected Postgraduate Diplomas)"],
    popularPrograms: [
      "MSc in Computing (AI, Blockchain, Secure Systems)",
      "MSc in Electronic & Computer Engineering",
      "MSc in Business Analytics",
      "BSc in Global Business (Dual Degree streams)"
    ],
    scholarshipsAvailable: [
      "DCU International Merit Scholarship (Up to €3,000)",
      "DCU Business School Dean's Outstanding Scholar Award",
      "Sports Academy Scholarships"
    ],
    requiredDocuments: [
      "Degree transcripts and provisional certificates",
      "Clear, focused SOP matching industry ambitions",
      "Detailed resume / CV",
      "IELTS / Duolingo English test sheet"
    ],
    description: "Located in north Dublin, Dublin City University (DCU) is Ireland's premier 'University of Enterprise'. Celebrated for its hyper-modern infrastructure, DCU has a deep focus on industry integration, business incubation, and launching high-tech startups. Most of its degree courses feature mandatory INTRA work placements with Fortune 500 companies.",
    whyStudyHere: [
      "Unmatched industry connection with a mandatory professional INTRA internship program for students.",
      "Home to Ireland's largest university enterprise center (Invent) and the National Centre for Plasma Science.",
      "Named Sunday Times University of the Year multiple times for superb student satisfaction and careers."
    ]
  },
  {
    id: "ul-ireland",
    name: "University of Limerick (UL)",
    country: "Ireland",
    flag: "🇮🇪",
    worldRanking: 421,
    acceptanceRate: "53%",
    ieltsRequirement: "6.5 (with no band lower than 6.0)",
    avgTuition: "€11,800 - €18,000 EUR / Year",
    intakePeriods: ["September (Autumn Intake)"],
    popularPrograms: [
      "MSc in Software Engineering",
      "MSc in Business Analytics",
      "MSc in Aeronautical Engineering",
      "BSc in Computer Games Development"
    ],
    scholarshipsAvailable: [
      "UL Kemmy Business School Scholarships",
      "UL Faculty of Science & Engineering Waiver (Up to €4,000)",
      "Sports Elite Bursaries"
    ],
    requiredDocuments: [
      "Prior degrees and marksheets",
      "Medium of Instruction Certificate or IELTS/TOEFL dashboard",
      "Comprehensive personal motivation statement",
      "Academic reference reports"
    ],
    description: "The University of Limerick is a strikingly beautiful, riverside campus situated on the historic banks of the Shannon. Famous for housing one of the world's most advanced digital libraries (The Glucksman Library) and Ireland's National Sports Arena, UL is renowned for its exceptional cooperative education program, placing over 2,000 students in paid internships annually.",
    whyStudyHere: [
      "One of the largest Cooperative Education (Co-op) programs in Europe, guaranteeing real-world experience.",
      "Incorporates world-class facilities like Ireland's only analog flight simulator and fully-equipped avionics labs.",
      "Substantially lower living costs compared to Dublin while maintaining high salary graduate roles."
    ]
  },
  {
    id: "mu-ireland",
    name: "Maynooth University (MU)",
    country: "Ireland",
    flag: "🇮🇪",
    worldRanking: 801,
    acceptanceRate: "60%",
    ieltsRequirement: "6.5 (with no band lower than 6.0)",
    avgTuition: "€11,000 - €16,500 EUR / Year",
    intakePeriods: ["September (Primary Fall Intake)"],
    popularPrograms: [
      "MSc in Data Science & Analytics",
      "MSc in Strategy & Innovation",
      "MSc in Immunology & Global Health",
      "BSc in Robotics & Intelligent Devices"
    ],
    scholarshipsAvailable: [
      "Maynooth University Taught Postgraduate Scholarships (€2,000)",
      "MU Sports Scholarships",
      "Erasmus+ and Government Schemes"
    ],
    requiredDocuments: [
      "Full secondary/undergraduate academic transcripts",
      "Proof of English proficiency (IELTS, DET, or TOEFL)",
      "Statement of Purpose (SOP)",
      "Two reference credentials"
    ],
    description: "Located just 25 kilometers west of Dublin in Ireland's only historic university town, Maynooth University blends a unique dual heritage: an 18th-century old campus with stunning architecture and a hyper-modern, high-tech research campus. It is Ireland's fastest-growing university, excelling in computer science, mathematics, geography, and social sciences.",
    whyStudyHere: [
      "Combines the charm and safety of a historic university town with rapid railway access to Dublin City Centre.",
      "Fastest growing university in Ireland, leading international research in wireless networks, AI, and immunology.",
      "Highly supportive, community-driven international student network with high graduation satisfaction."
    ]
  },
  {
    id: "tudublin-ireland",
    name: "Technological University Dublin (TU Dublin)",
    country: "Ireland",
    flag: "🇮🇪",
    worldRanking: 851,
    acceptanceRate: "65%",
    ieltsRequirement: "6.0 (with no band lower than 5.5)",
    avgTuition: "€10,500 - €15,500 EUR / Year",
    intakePeriods: ["September (Autumn Intake)"],
    popularPrograms: [
      "MSc in Computer Science (Advanced Software Development)",
      "MSc in Digital Media Technologies",
      "MSc in Culinary Innovation & Food Product Dev",
      "BEng in Mechanical & Building Services Eng"
    ],
    scholarshipsAvailable: [
      "Centenary Scholarship Program (50% Tuition Waiver)",
      "TU Dublin International Student Bursary",
      "Sports Elite Scholarships"
    ],
    requiredDocuments: [
      "Transcripts of academic achievements",
      "English language score reports",
      "Copy of Passport bio page",
      "SOP outlining technical interest area"
    ],
    description: "TU Dublin is Ireland's first technological university, formed by a merger of three highly respected technical institutes. Located on an award-winning, brand new state-of-the-art campus in Grangegorman, central Dublin, TU Dublin focuses on project-based learning, practical industry skillsets, and close collaboration with international technical employers.",
    whyStudyHere: [
      "Project-led, hands-on pedagogical model heavily aligned with actual corporate workforce requirements.",
      "Brand new, world-class modern campus in central Dublin (Grangegorman) with outstanding labs and design studios.",
      "Lower tuition fee structures compared to traditional comprehensive universities, offering extreme high-value ROI."
    ]
  },
  {
    id: "rcsi-ireland",
    name: "Royal College of Surgeons in Ireland (RCSI)",
    country: "Ireland",
    flag: "🇮🇪",
    worldRanking: 251,
    acceptanceRate: "15%",
    ieltsRequirement: "6.5 (with minimum 6.5 in all bands)",
    avgTuition: "€25,000 - €45,000 EUR / Year",
    intakePeriods: ["September (Primary Medical Intake)"],
    popularPrograms: [
      "Undergraduate Medicine (5 or 6 Year program)",
      "BSc in Pharmacy (MPharm integrated)",
      "BSc in Physiotherapy",
      "MSc in Technologies and Analytics in Healthcare"
    ],
    scholarshipsAvailable: [
      "RCSI International Student Scholarship",
      "RCSI Alumni Merit Scholarships",
      "Government of Ireland Education Scholarships"
    ],
    requiredDocuments: [
      "Highly competitive academic record (A-Levels A*A*A* or IB 38+ or GPA 3.8/4.0)",
      "Two medical/academic letters of reference",
      "Personal narrative demonstrating healthcare dedication",
      "Pass marks on medical entrance interview or boards (if required)"
    ],
    description: "The Royal College of Surgeons in Ireland (RCSI) is a highly specialized, world-class medical and surgical sciences institution located in the heart of Dublin facing St. Stephen's Green. RCSI is dedicated exclusively to training medicine, health, and surgical professionals, offering some of the most advanced clinical simulation centers in Europe.",
    whyStudyHere: [
      "One of the oldest, most prestigious medical schools in the world, dedicated exclusively to healthcare sciences.",
      "Home to Europe's largest and most advanced clinical simulation suite for realistic training.",
      "Global health network with degrees recognized by international medical councils, including US, UK, and GCC."
    ]
  },
  {
    id: "mtu-ireland",
    name: "Munster Technological University (MTU)",
    country: "Ireland",
    flag: "🇮🇪",
    worldRanking: 1001,
    acceptanceRate: "72%",
    ieltsRequirement: "6.0 (with no band lower than 5.5)",
    avgTuition: "€10,000 - €14,000 EUR / Year",
    intakePeriods: ["September (Autumn Intake)", "January (Selected Streams Only)"],
    popularPrograms: [
      "MSc in Cloud Computing",
      "MSc in Cybersecurity",
      "BSc in Software Development",
      "BEng in Structural Engineering"
    ],
    scholarshipsAvailable: [
      "MTU International Student Merit Scholarship (Up to €2,000)",
      "MTU Departmental Tuition Fee Waivers",
      "Sports and Creative Arts Scholarships"
    ],
    requiredDocuments: [
      "Transcripts of academic degrees",
      "English test score tracking (IELTS/DET)",
      "Personal SOP detailing practical engineering goals",
      "CV showing technical internships or jobs"
    ],
    description: "Munster Technological University (MTU) is a premier technological university situated in the south of Ireland, with primary campuses in Cork and Kerry. MTU provides top-tier technical training, specializing in cloud computing, cybersecurity, structural engineering, and creative design. MTU's programs are deeply aligned with the regional technological industry hubs in Munster.",
    whyStudyHere: [
      "Exemplary focus on Cloud Computing and Cybersecurity, with courses directly mapped to corporate certificates.",
      "Highly affordable tuition rates and living costs in Cork and Kerry regions compared to major metropolises.",
      "Mandatory professional industry attachments, ensuring exceptional post-graduation employment placement rates."
    ]
  }
];

export const LOCATIONS_DATA: LocationInfo[] = [
  {
    city: "Lahore",
    country: "Pakistan",
    flag: "🇵🇰",
    address: "Office #7, 3rd Floor, Al-Hafeez Shopping Mall, Main Boulevard, Gulberg III, Lahore, 54000",
    phone: "+92 (341) 754-8178",
    email: "lahore@unihelp.com",
    coordinates: { lat: 31.4697, lng: 74.4101 },
    note: "Headquarters for Pakistan operations. Drop by for custom diagnostic test preparations and comprehensive visa consultation desks."
  },
  {
    city: "Karachi",
    country: "Pakistan",
    flag: "🇵🇰",
    address: "Suite 204, Business Point, Near Askari Tower 2, Shahrah-e-Faisal, Karachi, 75350",
    phone: "+92 (341) 754-8178",
    email: "karachi@unihelp.com",
    coordinates: { lat: 24.8143, lng: 67.0396 },
    note: "Clifton branch serving Sindh's aspiring youth. Employs seasoned direct-placement specialists for American & British universities."
  },
  {
    city: "Islamabad",
    country: "Pakistan",
    flag: "🇵🇰",
    address: "Plot 12-C, Civic Centre, G-11 Markaz, Islamabad, 44000",
    phone: "+92 (341) 754-8178",
    email: "islamabad@unihelp.com",
    coordinates: { lat: 33.6844, lng: 72.9889 },
    note: "Located centrally in the capital. Handles executive consultation circuits, elite fellowship plans, and government scholarship partnerships."
  },
  {
    city: "Dubai",
    country: "UAE",
    flag: "🇦🇪",
    address: "Office 1702, Mazaya Business Avenue – BB1, JLT, Dubai, UAE",
    phone: "+92 (341) 754-8178",
    email: "dubai@unihelp.com",
    coordinates: { lat: 25.2048, lng: 55.2708 },
    note: "Regional Middle East hub. Houses specialized counseling departments focusing on European and Canadian public college enrollments."
  },
  {
    city: "Riyadh",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    address: "Al-Malaz District, King Abdullah Road, Al Muruj Center, Office 312, Riyadh 12271",
    phone: "+92 (341) 754-8178",
    email: "riyadh@unihelp.com",
    coordinates: { lat: 24.7136, lng: 46.6753 },
    note: "Centrally visible in Riyadh's economic heart. Tailored consultation packages for elite admissions and pre-flight compliance briefings."
  },
  {
    city: "Doha",
    country: "Qatar",
    flag: "🇶🇦",
    address: "Floor 14, Al Jazeera Tower, West Bay, Doha, Qatar",
    phone: "+92 (341) 754-8178",
    email: "doha@unihelp.com",
    coordinates: { lat: 25.2854, lng: 51.5310 },
    note: "West Bay executive wing. Catering to Qatari pupils and resident expatriates with priority application channels to Ivy League systems."
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "testi-1",
    name: "Ayesha Ahmed",
    destination: "Australia Gold Coast",
    course: "M.S. in Software Engineering",
    comment: "Uni Help Consultants made the stressful task of applying abroad incredibly seamless! Thanks to their customized SOP styling guidance, I secured is a partial scholarship at the University of Adelaide, and they guided my absolute visa within 14 days. Simply outstanding!",
    rating: 5,
    avatarUrl: "https://picsum.photos/300/200?random=1",
    universityName: "University of Adelaide"
  },
  {
    id: "testi-2",
    name: "Zain Al-Mansoor",
    destination: "United Kingdom",
    course: "BSc in Finance & AI Data",
    comment: "I was extremely confused regarding my visa filings because of sudden changes in UK rules. The Islamabad desk mapped out every single form meticulously, keeping my portfolio completely secure and optimized. I couldn't recommend them enough, and I am now enjoying my campus in London!",
    rating: 5,
    avatarUrl: "https://picsum.photos/300/200?random=2",
    universityName: "King's College London"
  },
  {
    id: "testi-3",
    name: "Noura Al-Dosari",
    destination: "Toronto, Canada",
    course: "Master of Public Health",
    comment: "As a student applying from our Riyadh office, I received bespoke career support matching exactly what I wanted. They helped filter active scholarship pathways and kept me consistently updated with pre-departure requirements. Five stars for the student-first philosophy!",
    rating: 5,
    avatarUrl: "https://picsum.photos/300/200?random=3",
    universityName: "University of Toronto"
  }
];

export const STATS_DATA: StatItem[] = [
  {
    value: "98%",
    label: "Visa Success Rate",
    iconName: "FileCheck",
    description: "Unmatched expertise in managing student student visa applications with absolute statutory compliance."
  },
  {
    value: "5,000+",
    label: "Students Placed",
    iconName: "Users",
    description: "Accomplished scholars studying in premium hubs including the USA, UK, Canada, and Australia."
  },
  {
    value: "200+",
    label: "Partner Universities",
    iconName: "School",
    description: "Direct academic linkages enabling expedited processing queues and exclusive scholarship considerations."
  }
];

export const WHY_CHOOSE_DATA: WhyChooseItem[] = [
  {
    title: "End-to-End Absolute Care",
    description: "From academic psychometrics to packing your bags for flight, our team holds your hand at every physical milestone.",
    iconName: "ShieldCheck"
  },
  {
    title: "Regional Physical Footprint",
    description: "We are physically present across 6 key locations in Pakistan and the Gulf, offering in-office counselor sessions at any time.",
    iconName: "MapPin"
  },
  {
    title: "Direct Strategic University Links",
    description: "Direct partnerships with academic boards worldwide mean faster admissions decisions and exclusive financial aid matching.",
    iconName: "Award"
  },
  {
    title: "Certified Immigrations Specialists",
    description: "All our visas counselor specialists hold certifications and keep aligned with fast-shifting legal entry requirements.",
    iconName: "FileSpreadsheet"
  }
];
