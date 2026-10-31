export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Admissions & General" | "Scholarships & Funding" | "Visas & Immigration" | "Test Preparation" | "Services & Logistics";
}

export const faqsList: FAQItem[] = [
  // --- Category: Admissions & General (10 FAQs) ---
  {
    id: "adm-1",
    question: "How do I start my university application process with Uni Help?",
    answer: "Getting started is simple! You begin by booking a free diagnostic profiling session online or visiting one of our physical branch offices. Our expert counselors evaluate your academic transcripts, budget parameters, and career ambitions, then formulate a personalized list of 5–8 target universities across your chosen destinations.",
    category: "Admissions & General"
  },
  {
    id: "adm-2",
    question: "Which intakes are standard for UK, USA, Canada, and Australia?",
    answer: "The primary academic sessions are the Fall Intake (September/October)—which features the widest array of courses, scholarships, and funding opportunities—and the Spring/Winter Intake (January/February), which is ideal for candidates who missed the Fall cycle or needed extra preparation time. Australia also offers a major July intake.",
    category: "Admissions & General"
  },
  {
    id: "adm-3",
    question: "Do you charge any upfront agency fees for general university admissions?",
    answer: "We offer zero-service-fee counseling for admissions to our 450+ verified partner universities globally. Our consulting operations are backed by institutional partners, meaning you receive high-touch, first-class profile-grooming and application liaison completely free of commission. Specialized test-prep and premium visa dossiers carry independent transparent costs.",
    category: "Admissions & General"
  },
  {
    id: "adm-4",
    question: "Can I apply to universities if I am still waiting for my final board transcripts?",
    answer: "Absolutely! We can secure 'Conditional Offer Letters' from universities using your completed O-Level/Matriculation marks, AS-Level grades, or 1st-year Intermediate results. The condition will be cleared once you submit your final transcripts, degree certificates, or IELTS sheets before the intake's registration deadline.",
    category: "Admissions & General"
  },
  {
    id: "adm-5",
    question: "What is an 'Unconditional Offer Letter' and how long does it take to secure?",
    answer: "An Unconditional Offer Letter means you have satisfied all the academic, language (IELTS), and financial-vetting benchmarks set by the target institution. It represents a firm, guaranteed place. Processing timelines range from 3 days to 4 weeks depending on the university and country selected.",
    category: "Admissions & General"
  },
  {
    id: "adm-6",
    question: "What is the difference between direct applications and centralized portals like UCAS or OUAC?",
    answer: "Portals like UCAS (for UK undergraduate study) or OUAC (for Canada's Ontario colleges) consolidate multiple program requests into a single electronic record. For postgraduate programs, we apply directly to the university's custom systems. Our counselors handle both tracks, managing deadlines, fees, and material uploads for you.",
    category: "Admissions & General"
  },
  {
    id: "adm-7",
    question: "Can I change my undergraduate major after receiving an offer letter?",
    answer: "Yes, in many destinations (especially the US and Canada), academic structures are highly flexible. You can request a major swap before enrollment or change your concentration during your first year. For rigid programs (like Medicine in the UK/Australia), swaps are highly competitive and require formal pre-requisite reviews.",
    category: "Admissions & General"
  },
  {
    id: "adm-8",
    question: "What are the core documents required to apply for a Master's program?",
    answer: "You typically need: 1) Certified transcripts and Bachelor's degree certificates, 2) A detailed Statement of Purpose (SOP), 3) Two academic or professional Letters of Recommendation (LORs), 4) An updated CV, 5) A valid passport photocopy, and 6) Proof of language proficiency (IELTS, TOEFL, or Duolingo).",
    category: "Admissions & General"
  },
  {
    id: "adm-9",
    question: "Is there an age limit for applying to international universities?",
    answer: "There are no formal age limits for higher education! Universities value diverse experiences, especially in MBA and PhD tracks. However, visa officers require a clear, logical explanation for any long study gaps. Our experts specialize in writing detailed career summaries to substantiate your return to academics.",
    category: "Admissions & General"
  },
  {
    id: "adm-10",
    question: "Does Uni Help assist with credit transfer programs?",
    answer: "Yes. If you are currently studying at a recognized domestic college in Pakistan or the Gulf, we can assist in evaluating your course syllabi to transfer approved credits to top international universities, allowing you to graduate sooner and save substantial tuition fees.",
    category: "Admissions & General"
  },

  // --- Category: Scholarships & Funding (10 FAQs) ---
  {
    id: "sch-1",
    question: "How do I qualify for a fully funded government scholarship like Chevening or Fulbright?",
    answer: "Elite government scholarships look for three pillars: 1) Academic excellence, 2) Proven leadership potential and community contributions, and 3) A clear vision of how your studies will benefit your home country. Applications open nearly a year in advance and require highly polished, multi-stage narrative essays.",
    category: "Scholarships & Funding"
  },
  {
    id: "sch-2",
    question: "What is the difference between need-based and merit-based financial aid?",
    answer: "Merit-based scholarships are awarded based on academic results, test scores, or physical portfolios. Need-based financial aid is calculated purely on your family's financial situation. Top Ivy League colleges in the US (like Princeton and Harvard) offer 100% need-blind aid, meeting your validated financial shortfalls completely.",
    category: "Scholarships & Funding"
  },
  {
    id: "sch-3",
    question: "How does Uni Help assist in maximizing my university discount or tuition waiver?",
    answer: "We automatically screen your GPA against the internal merit structures of our partner universities. Many partner schools grant automatic tuition fee discounts (ranging from £1,500 to £8,000) simply for applying through Uni Help as a recognized direct counselor. We request these allocations on your behalf.",
    category: "Scholarships & Funding"
  },
  {
    id: "sch-4",
    question: "Do scholarships cover living expenses, health insurance, and flights?",
    answer: "Fully funded scholarships (such as Chevening, Erasmus Mundus, MEXT, and Commonwealth) cover tuition, monthly stipends, health insurance, and international flights. Partial or university-specific scholarships run to tuition waivers only, requiring you to support your own living and housing costs.",
    category: "Scholarships & Funding"
  },
  {
    id: "sch-5",
    question: "Do I need to secure an unconditional admission offer before applying for a scholarship?",
    answer: "It depends. For government scholarships (e.g., DAAD or AAS), you can apply with a conditional offer or list preferred courses. However, university-specific funding often requires a firm, active admissions file. We recommend submitting university admissions applications early to clear this step.",
    category: "Scholarships & Funding"
  },
  {
    id: "sch-6",
    question: "Can I receive multiple scholarships to cover my international degree?",
    answer: "Generally, key government and university regulations prohibit double-funding or stacking 'Fully Funded' grants. However, you can often combine a small regional bursary or creative tech award (like BeArt Presets) with a university-level partial tuition fee scholarship to mitigate overall expenses.",
    category: "Scholarships & Funding"
  },
  {
    id: "sch-7",
    question: "What family documents are required for CSS Profile financial aid applications?",
    answer: "The College Board CSS Profile requires verified family financial records. This involves: 1) Parent employment tax certificates, 2) Bank statements, 3) Property asset papers, 4) Business audit records, and 5) Utility invoices. Outlining this data carefully prevents administrative rejection.",
    category: "Scholarships & Funding"
  },
  {
    id: "sch-8",
    question: "Are there dedicated scholarships available for female STEM applicants?",
    answer: "Yes! There are massive global initiatives such as the British Council Scholarships for Women in STEM, along with institutional grants specifically engineered to balance gender representations in robotics, engineering, mathematics, and advanced computer sciences.",
    category: "Scholarships & Funding"
  },
  {
    id: "sch-9",
    question: "How do I write a compelling scholarship essay?",
    answer: "Avoid generic summaries. Frame a rich story centering on real personal challenges, achievements, and unique research ambitions. Always link your proposed academic research directly with the sponsoring foundation's central values and local development objectives. Uni Help offers comprehensive SOP formatting tutorials.",
    category: "Scholarships & Funding"
  },
  {
    id: "sch-10",
    question: "Is there an interview stage for scholarship evaluations?",
    answer: "Yes, prominent scholarships (Chevening, Fulbright, MEXT, Schwarzman) have a highly selective interview stage conducted by bi-national commissions or alumni boards. We conduct realistic mock interviews mimicking these panels to prepare you for the exact questions and evaluation criteria.",
    category: "Scholarships & Funding"
  },

  // --- Category: Visas & Immigration (10 FAQs) ---
  {
    id: "vis-1",
    question: "What is a 'Block Account' and is it mandatory for a German student visa?",
    answer: "A block account (Sperrkonto) is a mandatory financial deposit system showing the German government that you possess sufficient funds to support yourself for one academic year. For 2026, the required amount is €11,904. The bank slowly releases €992 per month to cover your rent, grocery, and living bills once you arrive.",
    category: "Visas & Immigration"
  },
  {
    id: "vis-2",
    question: "What is a 'CAS' letter for the United Kingdom visa?",
    answer: "The CAS (Confirmation of Acceptance for Studies) is an electronic code issued to you by your host UK university after clearing academic conditions and paying a secure tuition deposit. It is a mandatory requirement for your Student Visa (formerly Tier 4) submission, validating your official enrollment.",
    category: "Visas & Immigration"
  },
  {
    id: "vis-3",
    question: "How do I prove my 'Genuine Student' intentions for an Australian or New Zealand visa?",
    answer: "You must demonstrate your genuine study intent by passing rigorous GTE (Genuine Temporary Entrant) or GS (Genuine Student) checks. This involves presenting clear links to career progression in your home country, explaining your university choice, showing stable financial capability, and demonstrating that you do not intend to overstay.",
    category: "Visas & Immigration"
  },
  {
    id: "vis-4",
    question: "What is an I-20 form and how does it relate to US F-1 visas?",
    answer: "The I-20 is an official document issued by a SEVP-certified US school. It lists your program, estimated costs, and funding sources. Once received, you must pay the mandatory SEVIS I-901 fee and schedule your F-1 non-immigrant student visa interview at the closest US embassy or consulate.",
    category: "Visas & Immigration"
  },
  {
    id: "vis-5",
    question: "What are the financial proof requirements for a Canadian Study Permit?",
    answer: "To secure a Canadian Study Permit, you need to show tuition payment confirmation for your first year, plus a Guaranteed Investment Certificate (GIC) of CAD $20,635 to prove you can support yourself or present traditional bank statements showing liquid balances matching your total annual cost of presence.",
    category: "Visas & Immigration"
  },
  {
    id: "vis-6",
    question: "Can my spouse or children accompany me on a student visa?",
    answer: "Many destinations allow students pursuing postgraduate research programs (like PhDs or research Master's) or specific executive degrees to sponsor dependent visas for their spouse and children, granting them work and study rights. Guidelines depend heavily on current regional immigration legislation.",
    category: "Visas & Immigration"
  },
  {
    id: "vis-7",
    question: "Do I need to go through medical examinations and biometric registration for my visa?",
    answer: "Yes, almost all key destinations (Canada, Australia, UK, and Schengen states) require students to undergo biometric fingerprinting and digital photography at designated VFS or embassy collection sites. Some countries also require a certified health check from authorized panel doctors.",
    category: "Visas & Immigration"
  },
  {
    id: "vis-8",
    question: "How long does student visa processing usually take?",
    answer: "Processing timelines vary widely: UK student visas take 15–21 working days (priority services take 5 days); Canada takes 4–12 weeks; the US F-1 is decided instantly during your brief in-person interview; Germany can take 6–12 weeks depending on regional appointment congestion.",
    category: "Visas & Immigration"
  },
  {
    id: "vis-9",
    question: "What should I do if my student visa application is refused?",
    answer: "Do not panic! A refusal is often caused by administrative errors, incomplete financial documentation, or a weak personal statement. Our Senior Visa Advisory Board conducts a forensic review of your refusal letter, corrects any structural issues, and drafts a robust re-application folder.",
    category: "Visas & Immigration"
  },
  {
    id: "vis-10",
    question: "Do you offer interview preparation for US F-1 and UK credibility reviews?",
    answer: "Yes, this is one of our flagship services! We walk you through typical visa officer questions, teach you how to calmly explain your financial sponsors, clarify your post-graduation career goals, and conduct dynamic mock interviews to overcome public-speaking anxiety.",
    category: "Visas & Immigration"
  },

  // --- Category: Test Preparation (10 FAQs) ---
  {
    id: "tst-1",
    question: "Which English test is most widely accepted: IELTS, TOEFL, PTE, or Duolingo?",
    answer: "The Academic IELTS remains the gold standard globally. Pearson Test of English (PTE) is also highly accepted across the UK and Australia. TOEFL is a classic favorite in the US, while the online Duolingo English Test (DET) is an excellent, cost-effective option accepted by many US and Canadian schools.",
    category: "Test Preparation"
  },
  {
    id: "tst-2",
    question: "What is the difference between IELTS Academic and IELTS General Training?",
    answer: "IELTS Academic is strictly for candidates applying for higher education admissions, professional registration, or academic fellowships. IELTS General Training is used for immigration purposes, professional licensing, or secondary school enrollments in English-speaking nations.",
    category: "Test Preparation"
  },
  {
    id: "tst-3",
    question: "Does Uni Help offer physical and virtual IELTS preparation classes?",
    answer: "Yes! We run intensive state-of-the-art IELTS, TOEFL, and PTE training in our main branch offices. For remote students, we provide interactive virtual masterclasses featuring certified native speakers, regular diagnostic exams, and individual evaluation feedback on your writing and speaking performance.",
    category: "Test Preparation"
  },
  {
    id: "tst-4",
    question: "Can I get an IELTS waiver for admission to native English-speaking universities?",
    answer: "Many UK, US, and Australian universities offer IELTS waivers to applicants who completed their high school, GCE O-Levels or Bachelor's degrees in a recognized medium where English was the primary language of instruction. This is confirmed by submitting an official 'English Proficiency Certificate' from your school.",
    category: "Test Preparation"
  },
  {
    id: "tst-5",
    question: "What are the average SAT and GRE scores required for US admissions?",
    answer: "Elite US undergraduate colleges search for SAT scores in the 1350–1550 range, though many operate under 'Test-Optional' tracks. Graduate STEM master's or PhD programs typically target GRE Quantitative scores between 160 and 170. Our test mentors map target scores based on your choice of university.",
    category: "Test Preparation"
  },
  {
    id: "tst-6",
    question: "How long are English language proficiency and GRE results valid?",
    answer: "Standard language proficiency scores (IELTS, TOEFL, PTE) are electronically valid for exactly 2 years from your test date. Specialized standardized testing exams like the SAT, GRE, and GMAT remain valid for 5 years across university admissions systems.",
    category: "Test Preparation"
  },
  {
    id: "tst-7",
    question: "What is a 'MyBest Scores' policy in TOEFL?",
    answer: "TOEFL's 'MyBest Scores' policy (sometimes called superscore) automatically combines your highest section scores (Reading, Listening, Speaking, Writing) from all active valid tests taken over the previous two years, giving you a stronger composite score to present to universities.",
    category: "Test Preparation"
  },
  {
    id: "tst-8",
    question: "How do I register for an IELTS or PTE official test?",
    answer: "As an official partner of the British Council, IDP, and Pearson, Uni Help handles the registration process for you. You can secure approved test dates, choose convenient test centers (paper-based or computer-delivered), and complete secure credit card payments directly at our offices.",
    category: "Test Preparation"
  },
  {
    id: "tst-9",
    question: "Do you provide study guides and mock exams for IELTS?",
    answer: "We offer complete study guides and past paper databases. Our curriculum includes weekly computer-based mock tests mimicking actual testing environments, accompanied by deep grading reviews to help you confidently target scoring bands of 7.5 or higher.",
    category: "Test Preparation"
  },
  {
    id: "tst-10",
    question: "What is a safe IELTS score to qualify for most international master's programs?",
    answer: "A composite IELTS band of 6.5, with no individual section (Listening, Reading, Writing, Speaking) scoring below 6.0, is the standard requirement. High-tier universities or specific courses like Law, Medicine, and Journalism often require an overall band of 7.0 or 7.5.",
    category: "Test Preparation"
  },

  // --- Category: Services & Logistics (10 FAQs) ---
  {
    id: "srv-1",
    question: "Does Uni Help assist in finding secure student housing and accommodation?",
    answer: "Yes! We partner with global student accommodation platforms (such as Student.com and AmberStudent) and university campus housing offices to help you secure vetted, safe, and affordable student flats, studio apartments, or hostel shared spaces prior to your visa registration.",
    category: "Services & Logistics"
  },
  {
    id: "srv-2",
    question: "Do you provide airport pickup and pre-departure orientations?",
    answer: "Our pre-departure briefings cover packing guidelines, local laws, financial regulations, part-time work limits, and weather preparation lists. Through our active student networks, we also coordinate airport pickup and initial settlement logistics in your destination city.",
    category: "Services & Logistics"
  },
  {
    id: "srv-3",
    question: "What are the rules regarding part-time work as an international student?",
    answer: "Most student visas (UK, Australia, Canada, Germany) allow international students to work part-time up to 20 hours per week during active academic semesters and full-time (40 hours) during official vacation and holiday breaks. The US restricts F-1 students to on-campus work during their first year.",
    category: "Services & Logistics"
  },
  {
    id: "srv-4",
    question: "What is a 'Post-Study Work Visa' (PSW) or Graduate Route?",
    answer: "A PSW visa allows you to stay and work in your study country after graduation to gain global experience. The UK offers a 2-year Graduate Route (3 years for PhDs); Australia provides 2 to 4 years depending on course tier and location; Canada has a Post-Graduation Work Permit (PGWP) of up to 3 years.",
    category: "Services & Logistics"
  },
  {
    id: "srv-5",
    question: "How do I secure health insurance coverage while studying abroad?",
    answer: "Health insurance is a mandatory requirement for international students. In Australia, we arrange your Overseas Student Health Cover (OSHC); in the UK, you pay an Immigration Health Surcharge (IHS) during your visa registration; in Germany and Canada, we hook you up with certified health insurance providers.",
    category: "Services & Logistics"
  },
  {
    id: "srv-6",
    question: "Can I transfer from one international university to another after my arrival?",
    answer: "Yes, transfers are possible, but they must comply with immigration and university guidelines to protect your visa status. In the UK, for example, changing institutions usually requires a new CAS and a fresh visa application. Our post-arrival service desk provides virtual support for these requests.",
    category: "Services & Logistics"
  },
  {
    id: "srv-7",
    question: "How do I set up a student bank account in my host country?",
    answer: "Setting up an account is a priority upon arrival. We provide step-by-step guidance on booking appointments at local banks (like Barclays in the UK, Sparkasse in Germany, or RBC in Canada) and assist you in compiling required documents, including your passport, student visa, and enrollment letter.",
    category: "Services & Logistics"
  },
  {
    id: "srv-8",
    question: "Does Uni Help offer support for document legalization and attestation?",
    answer: "Yes. To satisfy foreign enrollment requirements, we assist in navigating attestation processes with bodies like the Higher Education Commission (HEC), Inter Board Committee of Chairmen (IBCC), and the Ministry of Foreign Affairs (MOFA) to ensure your academic folders are ready.",
    category: "Services & Logistics"
  },
  {
    id: "srv-9",
    question: "Are tuition fee installments and payment plans supported?",
    answer: "Yes, almost all modern international universities offer structured installment plans, allowing you to split your annual tuition fees into 2 to 6 convenient payments. Typically, you only need to clear a deposit or your first semester's fees to secure visa backing documents.",
    category: "Services & Logistics"
  },
  {
    id: "srv-10",
    question: "What does Uni Help's continuous relationship network offer to alumni?",
    answer: "We believe in lifetime support! Our alumni network connects current students with graduates who have successfully bridged the gap to international careers in finance, tech, healthcare, and engineering. We host regular workshops, networking sessions, and career-launch seminars.",
    category: "Services & Logistics"
  }
];
