import React, { useState, useEffect } from "react";
import { 
  Globe, Search, ChevronRight, Inbox, BookOpen, AlertCircle, CheckCircle, Check, 
  DollarSign, MapPin, ArrowRight, ShieldAlert, CreditCard, Award, 
  HelpCircle, Sparkles, Filter, X, ArrowLeft, Calendar, Hourglass, Landmark, GraduationCap,
  Compass, FileText, Contact, Info, Download
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DESTINATIONS_DATA, Destination } from "../destinationsData";
import { db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// High-resolution visual cover images for the 21 unique destinations
const DESTINATION_IMAGES: Record<string, string> = {
  usa: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80',
  uk: 'https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&w=1200&q=80',
  australia: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
  germany: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
  france: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
  spain: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80',
  "south-korea": 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=80',
  hungary: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
  lithuania: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
  latvia: 'https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?auto=format&fit=crop&w=1200&q=80',
  denmark: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80',
  finland: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
  ireland: 'https://images.unsplash.com/photo-1549880181-56a44cf8a4a1?auto=format&fit=crop&w=1200&q=80',
  canada: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=1200&q=80',
  brazil: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80',
  japan: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
  turkey: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
  chile: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&w=1200&q=80',
  malaysia: 'https://images.unsplash.com/photo-1541059191173-1256e879f97e?auto=format&fit=crop&w=1200&q=80',
  indonesia: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
  "south-africa": 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=80'
};

interface FAQItem {
  q: string;
  a: string;
}

const COUNTRY_FAQS: Record<string, FAQItem[]> = {
  usa: [
    {
      q: "Can I work off-campus on an F-1 student visa?",
      a: "No, F-1 students can only work on-campus for up to 20 hours per week during academic terms. Off-campus employment is restricted and only permitted through pre-approved programs like Curricular Practical Training (CPT) or Optional Practical Training (OPT) after completing at least one academic year."
    },
    {
      q: "What is the STEM OPT extension in the United States?",
      a: "Students who graduate with an eligible Science, Technology, Engineering, or Math (STEM) degree can apply for a 24-month extension of their post-completion OPT (Optional Practical Training), allowing for a total of 36 months of lawful employment permission in the US."
    },
    {
      q: "Do US universities require SAT, GRE, or GMAT?",
      a: "Many US universities have adopted test-optional or test-blind policies for standard admissions. However, presenting highly competitive GRE/GMAT or SAT scores is still strongly recommended for STEM majors to secure institutional merit-based scholarships and research/teaching assistantships."
    },
    {
      q: "How much liquid funds do I need to show for an F-1 visa interview?",
      a: "You must demonstrate immediate liquid security covering the first full academic year of tuition and living expenses as specified on your official Form I-20. Additionally, you must show a credible source of sponsorship for subsequent years of study."
    },
    {
      q: "Can the English language test requirement be waived for US admissions?",
      a: "Yes, many institutions offer English language waivers if your prior education was conducted entirely in English (supported by an official Medium of Instruction certificate). Alternatively, multiple colleges accept the Duolingo English Test (DET) as a cost-effective IELTS/TOEFL alternative."
    },
    {
      q: "Is health insurance compulsory for international students in the US?",
      a: "Yes, health insurance is strictly mandatory. Most US universities automatically enroll international students in their institutional health insurance plans, though some allow you to waive this fee if you provide proof of equivalent third-party coverage."
    }
  ],
  uk: [
    {
      q: "How long is the Graduate Route post-study work visa in the UK?",
      a: "The Graduate Route allows eligible international students who complete their undergraduate or postgraduate degrees to stay and work in the UK for 2 years (3 years for PhD graduates) with full labor rights and no sponsor salary caps."
    },
    {
      q: "What is the 28-day financial holding rule for a UK student visa?",
      a: "To satisfy UK Visa and Immigration (UKVI) financial guidelines, you must show outstanding first-year tuition fees plus standardized living costs held continuously in your personal bank account (or your parents' account) for a minimum of 28 consecutive days before applying."
    },
    {
      q: "Are 1-year Master's degrees in the UK globally recognized?",
      a: "Yes, intensive 12-month UK Master's degrees are fully accredited, globally prestigious, and recognized by employers and credential boards worldwide. They allow you to enter the workforce early and save a full year of living expenses."
    },
    {
      q: "Do I need a tuberculosis (TB) test for my UK student visa?",
      a: "Yes, applicants who are residents of designated countries (including Pakistan, India, and parts of the GCC) must complete a TB screening from a UKVI-approved medical center and submit the clear medical certificate alongside their visa application."
    },
    {
      q: "Can I bring my spouse or dependents to the UK as a student?",
      a: "Under current UK immigration updates, only international students enrolled in postgraduate research-active programs (such as PhDs or research-based Masters) or government-sponsored programs can sponsor dependent visas."
    },
    {
      q: "What is a CAS letter and why is it needed?",
      a: "A CAS (Confirmation of Acceptance for Studies) is an electronic database record generated by your host university confirming unconditional offer status and fee deposit clearance. It is a mandatory requirement for filing your UK Student Visa."
    }
  ],
  australia: [
    {
      q: "What is the Australian Genuine Student (GS) requirement?",
      a: "The GS requirement is a written assessment integrated into the student visa process. Applicants must write a series of detailed statements demonstrating their academic intentions, ties to their home country, and the direct career value of their chosen course."
    },
    {
      q: "What are the rules regarding part-time hours in Australia?",
      a: "International students on a Subclass 500 student visa can work a maximum of 48 hours per fortnightly cycle while their university courses are in active session, and unlimited hours during official term breaks."
    },
    {
      q: "How long can I work in Australia after graduating?",
      a: "Graduates are eligible for the Temporary Graduate Visa (Subclass 485), which typically grants 2 to 4 years of open work rights depending on study level and regional bonuses. Regional study hubs offer additional post-study work years as a residency incentive."
    },
    {
      q: "Is Overseas Student Health Cover (OSHC) mandatory?",
      a: "Yes, you must purchase an approved OSHC policy that covers the entire planned duration of your stay in Australia. Evidence of clear OSHC payment is a strict prerequisite for submitting your student visa."
    },
    {
      q: "How do universities calculate my GPA for Australian admissions?",
      a: "Australian academic panels assess your prior high school or university transcripts and align your percentages to local grading systems. Most universities require a minimum of 60% as a baseline for direct admissions."
    },
    {
      q: "Are regional universities in Australia cheaper?",
      a: "Yes, universities located in regional areas (like Adelaide, Perth, Hobart, or Geelong) generally offer more affordable tuition fees, lower daily living expenses, and higher chances of securing regional bursaries and state residency nominations."
    }
  ],
  germany: [
    {
      q: "Are German public universities completely free of charge?",
      a: "Yes, public universities across 15 of Germany's 16 federal states charge zero tuition fees for all students, regardless of nationality. You only pay a semester administrative contribution of €250 to €350, which includes a comprehensive regional public transit pass."
    },
    {
      q: "What is a Blocked Account (Sperrkonto) and is it required?",
      a: "Yes, a Sperrkonto is mandated by the German embassy. It acts as a financial self-support proof. To satisfy visa requirements, you must deposit €11,904 EUR, which is locked and released to you in equal installments of €992 EUR per month during your first year of stay."
    },
    {
      q: "Do I need an APS Certificate to apply for a German visa?",
      a: "Yes, students applying from select South Asian nations (like Pakistan and India) or China must complete academic verification through the German Embassy's Academic Evaluation Center (APS) to obtain an APS Certificate before filing visa applications."
    },
    {
      q: "Can I study in Germany if I do not speak any German?",
      a: "Yes, Germany offers hundreds of fully English-taught Bachelor's and Master's programs, particularly in technology and business. However, learning basic German (A1/A2 level) is highly useful for daily integration and competing in the part-time job market."
    },
    {
      q: "What is the post-study job seeker visa in Germany?",
      a: "Upon graduating from a German university, you are legally entitled to an 18-month Job Seeker Visa. During this period, you can work unlimited hours in any job while searching for a professional contract matching your academic specialization."
    },
    {
      q: "How many hours can international students work in Germany?",
      a: "You are allowed to work up to 140 full days or 280 half days per calendar year. Student jobs inside universities (academic assistants) do not count toward this limit."
    }
  ],
  france: [
    {
      q: "What is Campus France and is it compulsory?",
      a: "Campus France is the official French national agency for higher education. Submitting your profile through the Campus France EF (Études en France) platform is a compulsory prerequisite for students from over 40 countries to receive administrative validation."
    },
    {
      q: "Am I eligible for housing allowance/grants in France?",
      a: "Yes, international students are eligible to apply for monthly rent subsidies (CAF) from the French National Family Allowance Fund. CAF can reimburse up to 30% to 40% of standard student housing costs, making rental extremely affordable."
    },
    {
      q: "What is a Grande École and why is it prestigious?",
      a: "Grandes Écoles are highly selective, elite higher education institutions in France separate from the public university framework. Famous for business (e.g., HEC, ESSEC) and engineering, they offer triple-crown accreditations, paid internships, and unmatched professional networks."
    },
    {
      q: "What is the post-study job finder visa in France?",
      a: "Graduates who complete a Master's degree in France can apply for a 1-year residency permit (recherche d'emploi/création d'entreprise) which allows them to live and work in France while seeking a job matching their specialization."
    },
    {
      q: "Do I need to speak French to study in France?",
      a: "No, a massive number of business, engineering, design, and culinary arts programs are delivered entirely in English. For these tracks, you only need an English proficiency score (e.g., IELTS) with no French proficiency requirements."
    },
    {
      q: "How many hours can I work part-time in France?",
      a: "Your French student visa allows you to work part-time up to 60% of the normal annual working hour threshold, which translates to a maximum of 964 hours per calendar year."
    }
  ],
  spain: [
    {
      q: "What is the IPREM requirement for Spanish student visas?",
      a: "To obtain a Spanish student visa, you must demonstrate monthly financials representing at least 100% of the IPREM (Public Income Indicator), which corresponds to holding approximately €600 EUR per month of your planned stay."
    },
    {
      q: "Can international students work part-time in Spain?",
      a: "Yes, under Spain's updated immigration laws, international student visa holders are authorized to work part-time up to 30 hours per week, provided the work hours do match and do not obstruct active study parameters."
    },
    {
      q: "What is the post-study work option in Spain?",
      a: "Graduates who complete their degrees at Spanish universities can apply for a 12-month Job-Search Residence permit to secure a professional contract in Spain's job market."
    },
    {
      q: "Do Spain's universities offer English-taught programs?",
      a: "Yes, Spain is home to world-renowned business schools and design academies that offer a wide array of programs entirely in English. Having basic Spanish skills remains highly valuable for daily socializing and networking."
    },
    {
      q: "Are Spanish degrees recognized throughout Europe?",
      a: "Yes, Spain is a member of the European Higher Education Area (EHEA) and follows the Bologna process. All ECTS credits and degrees obtained are fully accredited and recognized across the 29 Schengen states."
    },
    {
      q: "Is medical insurance mandatory for Spanish visas?",
      a: "Yes, you must submit proof of private medical insurance from a registered Spanish provider. The policy must cover 100% of medical and hospitalization costs with zero copayments (sin copago) and include active repatriation of remains coverage."
    }
  ],
  "south-korea": [
    {
      q: "What are the language requirements for studying in South Korea?",
      a: "Programs taught in English require a minimum IELTS score of 5.5 or TOEFL equivalent. Programs taught in Korean usually require a TOPIK (Test of Proficiency in Korean) Level 3 or 4 certificate for direct admission."
    },
    {
      q: "What is the Global Korea Scholarship (GKS)?",
      a: "GKS is a prestigious government scholarship that provides full funding, including 100% tuition, airfare, monthly living allowances, medical insurance, and a mandatory 1-year Korean language training course."
    },
    {
      q: "How much funds do I need to show for a South Korean visa?",
      a: "To satisfy the Ministry of Justice, you must present a certified bank balance in your own name (or parents' name) showing between $18,000 USD and $20,000 USD held continuously to support study and living costs."
    },
    {
      q: "Can I work part-time as an international student in Korea?",
      a: "Yes, international students with a valid D-2 visa can work part-time up to 20 hours per week (and unlimited hours during official university breaks) after obtaining formal approval from both their university adviser and the regional immigration office."
    },
    {
      q: "What is the D-10 Job Seeker visa in South Korea?",
      a: "The D-10 is a visa granted to international graduates from Korean universities. It allows you to reside in South Korea for up to 2 years (renewed in 6-month increments) while aggressively seeking professional internship or employment agreements."
    },
    {
      q: "Are South Korean universities safe and supportive?",
      a: "South Korea ranks among the safest nations on Earth, offering highly guarded environments, safe public transit, and modern campus layouts. Standard university counseling and support departments ensure international students adapt seamlessly."
    }
  ],
  hungary: [
    {
      q: "What is the Stipendium Hungaricum Scholarship program?",
      a: "It is Hungary's premier fully-funded scholarship. It covers 100% of tuition, provides free medical insurance, contributes to local housing costs, and supplies a monthly living stipend to international scholars from participating nations."
    },
    {
      q: "What is the average cost of living in Hungary for students?",
      a: "Hungary is highly affordable. You can live comfortably on a budget of €500 to €700 per month, which covers shared apartment housing, public transit, meals, and academic materials."
    },
    {
      q: "Can I travel around Europe with a Hungarian student visa?",
      a: "Yes, your Hungarian national student visa acts as a full entry pass to the Schengen Area, granting you visa-free travel throughout all 29 member countries for up to 90 days within any 180-day cycle."
    },
    {
      q: "Is Hungary a good destination for medical and healthcare majors?",
      a: "Yes, Hungary has a prestigious medical academic legacy. Degrees in Medicine, Dentistry, and Pharmacy from Semmelweis or Pécs are globally accredited, recognized, and highly cost-competitive compared to Western options."
    },
    {
      q: "What is the post-study work permission in Hungary?",
      a: "Upon completing your degree, you are eligible to apply for a 9-month Study-to-Work residence permit, allowing you to reside in Hungary while establishing a corporate contract or launching a startup."
    },
    {
      q: "Are study programs in Hungarian universities taught in English?",
      a: "Yes, Hungarian universities offer a wide range of undergraduate, postgraduate, and doctoral programs delivered entirely in English across sciences, humanities, business, and medicine tracks."
    }
  ],
  lithuania: [
    {
      q: "Are Lithuanian university degrees recognized globally?",
      a: "Yes, Lithuania follows the European Higher Education Bologna standards. All degrees and credits (ECTS) are fully accredited, recognized, and respected across the EU, US, UK, and Commonwealth nations."
    },
    {
      q: "What financial proof is required for a Lithuania visa?",
      a: "You must prove that you hold financial reserves equivalent to at least €400 EUR per planned month of stay, which corresponds to displaying roughly €4,800 EUR in an active personal bank statement."
    },
    {
      q: "What is the apostilling requirement for Baltic documents?",
      a: "Lithuanian immigration rules mandate that all prior foreign degrees, transcripts, and regional police clearance records must be legally Apostilled or stamped by the Ministry of Foreign Affairs before submission."
    },
    {
      q: "Is it easy to find English-taught programs in Lithuania?",
      a: "Yes, Lithuania has outstanding public and private institutions offering high-tech informatics, aviation management, fintech, and biomedical pipelines conducted 100% in English."
    },
    {
      q: "Are there travel and discount benefits for students in Lithuania?",
      a: "Yes! Your local Lithuanian Student Identity Card (LSP) unlocks large state subsidies. You will receive up to 50% discount on train services and up to 80% discount on city buses and metro routes."
    },
    {
      q: "How many hours can international students work in Lithuania?",
      a: "International students are legally permitted to work part-time up to 20 hours per week during normal term blocks, and up to 40 hours per week (full-time) during summer breaks or holidays."
    }
  ],
  latvia: [
    {
      q: "What are the typical tuition fees for studying in Latvia?",
      a: "Latvia is incredibly pocket-friendly. Standard engineering, aviation, business, and computing degrees range from €1,800 to €4,500 per year. Only specialized medical and dental sciences carry higher premiums."
    },
    {
      q: "What is the Latvian AIC evaluation report?",
      a: "The Academic Information Centre (AIC) is Latvia's state body for translating and certifying foreign qualifications. To secure an invitation letter, your previous transcripts must be submitted to AIC for verification."
    },
    {
      q: "How much money must I hold in my bank for a Latvian visa?",
      a: "You are required to show bank statements proving you hold at least €500 EUR per month of planned stay, which totals around €6,000 EUR for a single academic year."
    },
    {
      q: "Do I need to submit a clean criminal background report?",
      a: "Yes, Latvian consular services require all applicants to submit an official, apostilled police clearance certificate showing a clean record from their home country."
    },
    {
      q: "Can I work in Latvia as an international student?",
      a: "Yes, you are authorized to work part-time up to 20 hours per week during academic semesters, and full-time up to 40 hours per week during university holidays."
    },
    {
      q: "Are Latvian universities globally prestigious?",
      a: "Yes, Latvia's major research hubs (like Riga Technical University and University of Latvia) are recognized state academies famous for advanced engineering, logistics, and medical science collaborations."
    }
  ],
  denmark: [
    {
      q: "What are the student tuition costs in Denmark?",
      a: "For international students from non-EU/EEA countries, tuition fees range from €6,000 to €16,000 per year. Higher education is completely free for EU/EEA citizens and students holding specific Danish residence permissions."
    },
    {
      q: "What are the rules regarding post-study work stay in Denmark?",
      a: "Denmark offers a highly welcoming post-study policy. Upon graduation, international students are granted a 3-year residency permission automatically to find work and establish careers inside Denmark's robust, green economy."
    },
    {
      q: "What financial maintenance proof is requested by Denmark?",
      a: "Non-scholarship candidates must submit bank statements as self-support proof, showing at least DKK 6,569 per planned month of study (equivalent to about €900/month or €10,800/year)."
    },
    {
      q: "Do I need to speak Danish to get admitted?",
      a: "No, Danish universities offer a broad catalog of advanced sustainable energy, design, engineering, and tech programs delivered entirely in English. Most citizens speak exceptional English, minimizing any language barriers."
    },
    {
      q: "Is public healthcare free for students in Denmark?",
      a: "Yes, once you receive your Danish Civil Registration Number (CPR) and health card, you have full, free access to Denmark's highly advanced public healthcare system, identical to local Danish citizens."
    },
    {
      q: "What is problem-based learning (PBL) in Denmark?",
      a: "PBL is Denmark's signature pedagogical model. Instead of relying purely on lectures, classes revolve around group projects solving actual problems submitted by Danish industrial and technology organizations."
    }
  ],
  finland: [
    {
      q: "What is the duration of the post-study work visa in Finland?",
      a: "Finland has one of the best post-study work policies globally: graduates can apply for up to a 2-year residence permit to seek a career or register a startup. This permit can be used in dynamic installments over time."
    },
    {
      q: "How much funds do I need to hold for a Finnish permit?",
      a: "The Finnish Immigration Service (Migri) requires evidence of holding at least €560 EUR per month of planned stay, which translates to showing ~€5,720 EUR in your personal account for one academic year."
    },
    {
      q: "Does Finland accept SAT scores for undergraduate tracking?",
      a: "Yes, many highly ranked Finnish academic academies (including Aalto University) accept direct bachelor admissions pipelines based on competitive SAT exam results, often associated with up to 100% tuition scholarships."
    },
    {
      q: "What are the part-time working hours in Finland?",
      a: "Under recent student welfare updates, international students in Finland can work part-time up to 30 hours per week during term semesters, with unlimited hours allowed during school holiday periods."
    },
    {
      q: "Are there scholarships to cover tuition costs in Finland?",
      a: "Yes, major Finnish universities provide merit-based tuition fee scholarship programs (covering 50% to 100% of study costs) based on your entry score grades or subsequent in-course academic outstanding performance."
    },
    {
      q: "What is student accommodation like in Finland?",
      a: "Finland features highly comfortable, modern student housing managed by student foundations (like HOAS or TOAS) offering subsidized studio and shared layouts. Rent includes heating, internet, and sauna access, costing between €250 and €450 per month."
    }
  ],
  ireland: [
    {
      q: "What is the Irish Third Level Graduate Scheme (1G Visa)?",
      a: "Level 8 (Honours Bachelor) and Level 9 (Master/PhD) graduates from recognized Irish universities are eligible for an automatic 2-year post-study stay-back visa (Stamp 1G), allowing them to work full-time or seek employment with no initial sponsor requirements."
    },
    {
      q: "How much liquid funds must I demonstrate for an Irish student visa?",
      a: "You must demonstrate that you have immediate access to at least €10,000 for your living expenses for each year of your studies, in addition to showing full payment of tuition fees (or at least a minimum payment of €6,000 before visa submission)."
    },
    {
      q: "Are 1-year Master's degrees in Ireland globally recognized?",
      a: "Yes, Ireland's intensive 1-year Master's programs are fully aligned with the European Bologna system (NFQ Level 9), prestigious, and globally recognized, allowing you to enter the tech or business sectors quickly."
    },
    {
      q: "Can I work part-time as an international student in Ireland?",
      a: "Yes, students holding a stamp 2 visa can work up to 20 hours per week during term time, and up to 40 hours per week during official vacation times (June, July, August, and from December 15th to January 15th)."
    },
    {
      q: "Do Irish universities require English proficiency tests?",
      a: "Yes, standard admission requires English proficiency. Typical requirements are IELTS 6.0 - 6.5, Duolingo English Test (DET) 110-120, or TOEFL iBT 80+. English waivers are only possible under strict Medium of Instruction criteria of certain native colleges."
    },
    {
      q: "Why is Ireland called 'the Silicon Valley of Europe'?",
      a: "Ireland serves as the European headquarters for 9 of the world's top 10 US tech companies (including Apple, Google, Meta, and Stripe) and 10 of the top 10 global pharmaceutical firms, creating an incredibly rich network of internship and graduate career options."
    },
    {
      q: "Is health insurance necessary for Irish student visas?",
      a: "Yes, private medical insurance is a mandatory requirement for all non-EU student visas. You must provide a certificate of policy coverage from a recognized Irish insurer or equivalent, with a minimum coverage limit of €25,000."
    }
  ],
  canada: [
    {
      q: "What is the study permit application process for Canadian universities?",
      a: "To obtain a Canadian study permit, you must first secure an official Letter of Acceptance (LOA) with a DLI number from an accredited Designated Learning Institution. You must then submit a Provincial Attestation Letter (PAL) if applicable, pay tuition fees, acquire your GIC self-support certificate, clear medical examinations, and file your online application through the IRCC portal."
    },
    {
      q: "How much funding is required for the Canadian GIC (Guaranteed Investment Certificate)?",
      a: "To satisfy Canadian immigration (IRCC) financial guidelines, international students must purchase a Guaranteed Investment Certificate (GIC) from an approved Canadian bank (such as Scotiabank, CIBC, or RBC) containing $20,635 CAD. This serves as guaranteed proof of living costs and is paid back to you in monthly installments over your first year."
    },
    {
      q: "Can international students work off-campus in Canada?",
      a: "Yes, eligible international students carrying full-time academic loads with valid study permits are legally authorized to work off-campus for up to 24 hours per week during active school semesters, and full-time (40 hours+) during scheduled institutional breaks."
    },
    {
      q: "What is the Post-Graduation Work Permit (PGWP) in Canada?",
      a: "The PGWP is a highly lucrative open work permit that allows international graduates of eligible DLIs to reside and work for any employer in Canada for up to 3 years. For example, completing a 2-year Master's degree typically unlocks a full 3-year PGWP, which is a major pathway toward Permanent Residency (PR) via Express Entry."
    },
    {
      q: "Can the English language test requirement be waived for Canadian admissions?",
      a: "Yes, selected Canadian universities allow English waivers if your entire prior degree was taught in English (supported by an official Medium of Instruction certificate). However, for rapid visa approvals under IRCC guidelines, writing IELTS Academic or PTE Academic is still strongly recommended."
    },
    {
      q: "How do I ensure my Canadian academy is a Designated Learning Institution (DLI)?",
      a: "You must check the official IRCC list to verify that your chosen college or university is registered with a designated DLI number. Your formal Letter of Acceptance must display this DLI number to be accepted as part of your study permit application."
    }
  ],
  brazil: [
    {
      q: "Can international students study in Brazil in English?",
      a: "While Portuguese remains the primary language of daily life, major universities like USP, UNICAMP, and Federal University of Rio de Janeiro increasingly offer graduate courses, specialized seminars, and research fellowships entirely in English."
    },
    {
      q: "What is the CELPE-Bras examination?",
      a: "CELPE-Bras is Brazil's official, internationally recognized Portuguese language proficiency certificate. Developing fluency is highly recommended for students enrolling in standard undergraduate degrees or seeking deep integrations with the local community."
    },
    {
      q: "Is standard university education in Brazil free of charge?",
      a: "Yes! Brazil's public federal and state universities (like USP) offer 100% free tuition, even for international students, if they successfully pass the competitive local vestibular entrance exams or direct application channels."
    },
    {
      q: "How long is the Post-Study job hunter permit in Brazil?",
      a: "Upon graduating, international students can secure a visa extension for up to 1 year for job selection. Registering a standard national corporate employment contract immediately activates a multi-year Temporary Resident authorization."
    }
  ],
  japan: [
    {
      q: "What is the MEXT Scholarship and what does it cover?",
      a: "The Ministry of Education, Culture, Sports, Science and Technology (MEXT) scholarship is a comprehensive government bursary covering 100% of university tuition fees, initial round-trip airline tickets, and an ongoing monthly stipend of up to 145,000 JPY."
    },
    {
      q: "Do I need permission to work part-time in Japan?",
      a: "Yes. To work part-time up to 28 hours per week, you must secure the 'Permission to Engage in Activity other than that Permitted' stamp from Japan's Immigration Services Agency, which is typically requested easily on initial airport arrival."
    },
    {
      q: "How does the Japanese custom academic year operate?",
      a: "The traditional Japanese academic calendar starts in April and finishes in March. However, to support international student influxes, many universities offer autumn-specific intake panels starting in September or October."
    },
    {
      q: "Is it difficult to secure a job in Japan after graduating?",
      a: "Japan's job market is highly welcoming due to demographic labor demands. Undergraduates holding conversational Japanese proficiency (JLPT N2 or higher) find extremely strong hiring success across tech, automotive, and retail conglomerates."
    }
  ],
  turkey: [
    {
      q: "Are degrees from Turkish universities valid in Europe?",
      a: "Yes! Turkey is an active participant in European Higher Education frameworks, standardizing ECTS credits and matching European standards (Bologna Process). All diplomas carry full recognition and support Erasmus+ exchange programs."
    },
    {
      q: "What is the Turkiye Burslari Scholarship program?",
      a: "It is a highly prestigious, fully funded, state-backed academic program that covers everything: premium university placements, full tuition, 1 year of Turkish language training, student dormitory stays, health care, and monthly stipends."
    },
    {
      q: "Can I study in Turkey if I do not speak Turkish?",
      a: "Absolutely. Multiple prestigious universities in Istanbul and Ankara (like METU, Bilkent, Koç, and Sabancı) deliver programs entirely in English, requiring only an English certificate (e.g., IELTS) or a university proficiency test score."
    },
    {
      q: "How long can I stay in Turkey to find a job after graduation?",
      a: "International graduates can convert their student residence card into a 1-year postgraduate work search visa. Securing a formal contract allows the employer to seamlessly apply for a structured national Work Permit."
    }
  ],
  chile: [
    {
      q: "Is Chile a safe destination for international students?",
      a: "Yes. Chile has consistently ranked as one of the safest, most politically stable, and economically secure nations in South America. Its metropolitan transit systems, modern infrastructure, and healthcare facilities match premium international scales."
    },
    {
      q: "Why is Chile a global hotspot for astronomy research?",
      a: "Due to the exceptionally clear atmosphere, high altitudes, and dry climate of the Atacama Desert, Chile hosts the world's most advanced space observatories (including ALMA). Joint agreements automatically reserve 10% of observation time for researchers studying at local Chilean universities."
    },
    {
      q: "Can I work in Chile while on a student visa?",
      a: "Yes, Chilean student visa holders are authorized to work part-time for up to 20 hours per week, provided the work hours do not conflict with their academic schedules and they obtain formal authorization from immigration."
    },
    {
      q: "What is the cost of living for international students in Chile?",
      a: "Chile is highly affordable compared to North America and Western Europe. Modern student accommodation and food costs average around $400 to $650 USD per month depending on the city, making high quality living accessible."
    }
  ],
  malaysia: [
    {
      q: "What are 'Branch Campus' universities in Malaysia?",
      a: "Malaysia is famous for hosting fully accredited branch sites of elite Western universities, including Monash University (Australia), University of Nottingham (UK), and Heriot-Watt University (UK). Students can study in Malaysia and graduate with the exact same degree certificate at 60% lower costs."
    },
    {
      q: "Is English widely spoken in Malaysia?",
      a: "Yes, Malaysia ranks exceptionally high on the global English Proficiency Index. It is widely used in business, higher education, and daily communication, making adaptation incredibly smooth for international students."
    },
    {
      q: "How does the Malaysian student visa application (EMGS) work?",
      a: "EMGS is a state-governed system that centralizes all international student intakes. Once you accept a university offer, the institution registers your application through EMGS to receive an electronic Visa Approval Letter (VAL), which allows you to enter the country seamlessly."
    },
    {
      q: "What are the job prospects after studying in Malaysia?",
      a: "Malaysia is a focal corporate hub for multinational companies within Southeast Asia. Qualified STEM, IT, and financial graduates can easily transition onto specialized employment passes, high-value consulting placements, or regional digital visas."
    }
  ],
  indonesia: [
    {
      q: "Are English-taught programs available in Indonesia?",
      a: "Yes! Top institutions like Universitas Indonesia (UI), Gadjah Mada University (UGM), and ITB offer International Undergraduate Programs (IUP) and graduate tracks taught entirely in English, combined with dual-degree pathways with European partner universities."
    },
    {
      q: "How much does it cost to live as a student in Indonesia?",
      a: "Indonesia is one of the most budget-friendly academic hubs in Asia. International students can comfortably cover rent, transport, high-speed internet, and daily dining with a budget of $300 to $500 USD per month, allowing for an incredibly high quality of life."
    },
    {
      q: "What is the study permit required for Indonesian student visas?",
      a: "Before applying for a student visa at an Indonesian consulate, your host university must submit your academic files to the Ministry of Education in Jakarta to receive an official Study Permit. Once approved, the immigration authorities issue your Telex Visa."
    },
    {
      q: "Is Indonesia suitable for scientific field research?",
      a: "Absolutely. Indonesia is unparalleled globally for field research in tropical forestry, marine systems, conservation biology, seismology, volcanology, and comparative Austronesian cultural studies."
    }
  ],
  "south-africa": [
    {
      q: "How does the South African higher education grading system compare globally?",
      a: "South Africa's major institutions follow British-influenced academic structures. Degrees from top-tier research universities (like UCT or Stellenbosch) are fully aligned with the Bologna process and are globally recognized, making transition to PhD or Ivy League tracks highly seamless."
    },
    {
      q: "What is the Critical Skills Visa in South Africa?",
      a: "South Africa maintains an official list of scarce and high-demand professional sectors. International graduates who complete degrees in STEM, engineering, actuarial sciences, or information security can immediately qualify for rapid multi-year Critical Skills Employment Visa pathways."
    },
    {
      q: "Can international students work part-time in South Africa?",
      a: "Yes! Your South African study visa automatically authorizes you to work part-time for up to 20 hours per week during academic semesters, and full-time (40 hours) during official scheduled holidays."
    },
    {
      q: "What are the requirements for the mandatory South African medical certificate?",
      a: "To obtain a South African student visa, all applicants must undergo a physical examination and chest X-ray to obtain official medical and radiological reports certifying that they are free from infectious conditions (such as tuberculosis)."
    }
  ]
};

export interface DestinationsSectionProps {
  onSelectCountryForInquiry: (countryName: string) => void;
  activeCountryId?: string;
  onNavigate?: (path: string) => void;
}

export default function DestinationsSection({ 
  onSelectCountryForInquiry,
  activeCountryId,
  onNavigate
}: DestinationsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | "GLOBAL" | "SCHENGEN" | "ASIA" | "LOW_TUITION">("ALL");
  const [localSelectedDestination, setLocalSelectedDestination] = useState<Destination | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Deck comparison variables
  const [compareList, setCompareList] = useState<Destination[]>([]);
  const [compareDrawerOpen, setCompareDrawerOpen] = useState(false);
  const [visaFilter, setVisaFilter] = useState<"all" | "Easy" | "Medium" | "High">("all");

  // Modals management
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [procureModalOpen, setProcureModalOpen] = useState(false);
  const [procureCountryId, setProcureCountryId] = useState<string | null>(null);

  // Dynamic feedback and prompt queues
  const [successModal, setSuccessModal] = useState<{ title: string; body: string; type: 'inquiry' | 'profile' } | null>(null);
  const [toast, setToast] = useState<{ title: string; text: string; type: string } | null>(null);

  // Smart evaluator input fields
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileIntake, setProfileIntake] = useState("Fall 2026 Intake");
  const [profileBudget, setProfileBudget] = useState("Free / Low Cost (< $5,000 USD)");
  const [profileDegree, setProfileDegree] = useState("hs");
  const [profilePriorities, setProfilePriorities] = useState("");

  // Direct clearance form input fields
  const [procureName, setProcureName] = useState("");
  const [procureEmail, setProcureEmail] = useState("");
  const [procureStart, setProcureStart] = useState("Fall 2026");
  const [procureDegree, setProcureDegree] = useState("bachelors");

  // Auto-dismiss custom toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const selectedDestination = activeCountryId
    ? (DESTINATIONS_DATA.find((dest) => dest.id === activeCountryId) || null)
    : localSelectedDestination;

  // Filters destinations based on search query & regional filters
  const filteredDestinations = DESTINATIONS_DATA.filter((dest) => {
    const matchesSearch = 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.popularTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.popularCourses.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    // Visa filter matching difficulty rating
    if (visaFilter !== "all" && dest.visaDifficulty !== visaFilter) {
      return false;
    }

    if (selectedFilter === "GLOBAL") {
      return ["usa", "uk", "australia", "ireland", "canada", "brazil", "chile", "south-africa", "turkey"].includes(dest.id);
    }
    if (selectedFilter === "SCHENGEN") {
      return ["germany", "france", "spain", "hungary", "lithuania", "latvia", "denmark", "finland"].includes(dest.id);
    }
    if (selectedFilter === "ASIA") {
      return ["south-korea", "japan", "malaysia", "indonesia"].includes(dest.id);
    }
    if (selectedFilter === "LOW_TUITION") {
      return ["germany", "south-korea", "hungary", "lithuania", "latvia", "brazil", "turkey", "chile", "malaysia", "indonesia"].includes(dest.id);
    }

    return true;
  });

  const handleCtaClick = (countryName: string) => {
    // Select destination in Inquiry form
    onSelectCountryForInquiry(countryName);
    // Smooth scroll down to contact frame
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

  const toggleCompareItem = (destId: string) => {
    const dest = DESTINATIONS_DATA.find(d => d.id === destId);
    if (!dest) return;
    const index = compareList.findIndex(item => item.id === destId);
    if (index > -1) {
      setCompareList(compareList.filter(item => item.id !== destId));
      setToast({
        title: "Removed",
        text: `${dest.name} removed from comparison deck.`,
        type: "info"
      });
    } else {
      if (compareList.length >= 3) {
        setToast({
          title: "Deck Limit Reached",
          text: "Remove a country to compare other choices side-by-side.",
          type: "amber"
        });
        return;
      }
      setCompareList([...compareList, dest]);
      setToast({
        title: "Added to Deck",
        text: `${dest.name} added to comparison deck.`,
        type: "success"
      });
    }
  };

  const triggerInquiryAll = () => {
    setProcureCountryId("deck_bulk");
    setProcureModalOpen(true);
    setCompareDrawerOpen(false);
  };

  const handleInquirySubmitReal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submissionId = "sub_" + Math.random().toString(36).substring(2, 11);
      const targetCountry = procureCountryId === "deck_bulk" 
        ? `Deck Bulk Compare: ${compareList.map(item => item.name).join(", ")}`
        : (DESTINATIONS_DATA.find(d => d.id === procureCountryId)?.name || "Country Clearance Direct");

      await setDoc(doc(db, "submissions", submissionId), {
        name: procureName,
        email: procureEmail,
        phone: "",
        city: "Online Procure Portal",
        service: `Clearance: ${targetCountry}`,
        message: `Interactive rapid dossier request for academic level: ${procureDegree}, targeting timeline: ${procureStart}.`,
        status: "NEW",
        createdAt: serverTimestamp()
      });

      setSuccessModal({
        title: "Inquiry Active!",
        body: `Thank you, ${procureName} (${procureEmail}). Your dossier has been processed and assigned to a designated university enrollment lead. Direct clearance guidelines will be sent to your inbox shortly.`,
        type: "inquiry"
      });
      setProcureModalOpen(false);
      setProcureName("");
      setProcureEmail("");
    } catch (err) {
      console.error("Failed to submit inquiry directly to live database", err);
      setToast({
        title: "Submission Error",
        text: "An error occurred while saving your inquiry. Please try again later.",
        type: "amber"
      });
    }
  };

  const handleProfileEvaluationSubmitReal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submissionId = "sub_" + Math.random().toString(36).substring(2, 11);
      await setDoc(doc(db, "submissions", submissionId), {
        name: profileName,
        email: profileEmail,
        phone: "",
        city: "Smart Placement Evaluator",
        service: `Intake Evaluation: ${profileIntake}`,
        message: `Evaluation Parameters:\nBudget: ${profileBudget}\nHighest Degree: ${profileDegree}\nPriorities & Majors: ${profilePriorities || "Intended major and part-time goals unspecified"}`,
        status: "NEW",
        createdAt: serverTimestamp()
      });

      setSuccessModal({
        title: "Counsel Assigned!",
        body: `Your profile metrics have been parsed successfully. A Senior Admissions Analyst has been assigned to evaluate your academics and will dispatch an optimized pathway blueprint map to ${profileEmail} within 24 hours.`,
        type: "profile"
      });
      setProfileModalOpen(false);
      setProfileName("");
      setProfileEmail("");
      setProfilePriorities("");
    } catch (err) {
      console.error("Failed to submit profile match to live database", err);
      setToast({
        title: "Evaluation Error",
        text: "Please double check your parameters and connectivity and retry.",
        type: "amber"
      });
    }
  };

  // --- RENDERING 1: COMPREHENSIVE STANDALONE COUNTRY PORTAL ---
  if (selectedDestination) {
    return (
      <div className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-brand-gold-500 selection:text-brand-blue-950 text-left">
        
        {/* POLISHED HERO SECTION FOR SPECIFIC DESTINATION */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-brand-blue-950 text-white overflow-hidden text-left">
          {/* Ambient Head cover image of the country */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 scale-105 pointer-events-none opacity-30 select-none z-0"
            style={{ 
              backgroundImage: `url(${DESTINATION_IMAGES[selectedDestination.id] || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"})` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-950 via-slate-950/80 to-transparent z-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-blue-950/90 z-0" />

          {/* Grids and flares */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0" />
          <div className="absolute -top-32 right-[-10%] w-[450px] h-[450px] rounded-full bg-brand-gold-500/10 blur-[120px] pointer-events-none z-0" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back to Home / Destinations Directory link */}
            <button 
              onClick={() => {
                if (onNavigate) {
                  onNavigate("/");
                } else {
                  setLocalSelectedDestination(null);
                }
              }}
              className="inline-flex items-center gap-2 text-white/70 hover:text-brand-gold-400 font-bold text-xs uppercase tracking-wider mb-6 transition focus:outline-none cursor-pointer group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Destinations Listing</span>
            </button>

            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-brand-gold-400 text-[10px] font-bold tracking-wider uppercase">
                <span className="text-xl" role="img" aria-label={selectedDestination.name}>{selectedDestination.flag}</span>
                <span>International Study Portal</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white select-text">
                {selectedDestination.name} Study Pathway
              </h1>
              
              <p className="font-semibold text-brand-gold-400 font-mono text-xs sm:text-sm uppercase tracking-widest text-left">
                🏆 Visa Status: {selectedDestination.visaDifficulty} Difficulty
              </p>

              <p className="text-base sm:text-lg text-brand-blue-105 max-w-3xl leading-relaxed select-text pt-2 font-semibold">
                "{selectedDestination.tagline}"
              </p>

              {/* Core Destination KPI badges row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-left">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">Key Intakes</span>
                  <span className="text-xs sm:text-sm font-bold text-brand-gold-400 mt-1 block">
                    {selectedDestination.intakes.map(item => item.split(" - ")[0]).join(" / ")}
                  </span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">Mean Tuition</span>
                  <span className="text-xs sm:text-sm font-bold text-white mt-1 block h-auto truncate">
                    {selectedDestination.avgTuitionRange.split(" (")[0]}
                  </span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">Work Authorization</span>
                  <span className="text-xs sm:text-sm font-bold text-white mt-1 block h-auto truncate">
                    {selectedDestination.partTimeHours.split(" (New")[0]}
                  </span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">Language Requirement</span>
                  <span className="text-xs sm:text-sm font-bold text-white mt-1 block font-sans">
                    {selectedDestination.languageRequirement.split(" (")[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STUDY PORTAL MAIN BODY CONTENT */}
        <section className="py-16 bg-slate-50 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Visual Details modules */}
              <div className="lg:col-span-8 space-y-12">
                
                {/* 1. Academic Assessment Overview */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 rounded-3xl p-6 sm:p-8 flex items-start gap-4 shadow-sm">
                  <div className="p-3 bg-white rounded-2xl shadow-sm border border-indigo-100 text-brand-blue-700 shrink-0">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display font-extrabold text-lg text-slate-900">
                      Professional Academic Assessment
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed select-text">
                      {selectedDestination.overview}
                    </p>
                  </div>
                </div>

                {/* 2. Top Placement Reasons */}
                <div id="reasons-section" className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="h-10 w-10 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center">
                      <Compass className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-xl text-slate-900">Why Study in {selectedDestination.name}</h3>
                      <p className="text-[11px] text-slate-500 font-sans tracking-wide">Distinct regional advantages and post-academic career avenues</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {selectedDestination.topReasons.map((reason, index) => (
                      <div key={index} className="flex gap-4 items-start select-text">
                        <span className="h-6 w-6 rounded-full bg-brand-blue-75/30 border border-brand-blue-100 text-brand-blue-800 font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                          {index + 1}
                        </span>
                        <div className="space-y-1 text-left">
                          <p className="text-sm text-slate-700 font-medium leading-relaxed">{reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Popular High-Demand Career Tracks */}
                <div id="courses-section" className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="h-10 w-10 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-xl text-slate-900">High-Demand Career Tracks</h3>
                      <p className="text-[11px] text-slate-500 font-sans tracking-wide">Degrees and fields with optimized local hiring pipelines and post-study stays</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    {selectedDestination.popularCourses.map((course, index) => (
                      <div key={index} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex gap-3 select-text items-center">
                        <span className="h-2 w-2 rounded-full bg-brand-blue-600 shrink-0" />
                        <p className="text-xs text-slate-800 font-bold leading-relaxed">{course}</p>
                      </div>
                    ))}
                  </div>

                  {/* Language diagnostics check box */}
                  <div className="mt-4 p-4 bg-brand-blue-50/70 border border-brand-blue-100/55 rounded-2xl flex items-start gap-3 text-left">
                    <HelpCircle className="h-5 w-5 text-brand-blue-600 shrink-0 mt-0.5" />
                    <div className="text-left space-y-1 select-text">
                      <h4 className="text-xs font-bold text-brand-blue-900 uppercase tracking-wide animate-pulse">Language Test Guidelines</h4>
                      <p className="text-[11px] sm:text-xs text-brand-blue-700 leading-relaxed font-sans">
                        Core Language parameters request: <strong className="font-mono text-slate-950 underline">{selectedDestination.languageRequirement}</strong>. Waiver schedules may exist for candidates presenting prior English medium instruction validation letters.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Required Visa Documents */}
                <div id="visa-section" className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="h-10 w-10 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-xl text-slate-900">Required Visa Files & Dossier Checklist</h3>
                      <p className="text-[11px] text-slate-500 font-sans tracking-wide">Strict credentials, sponsorships, and self-support standards validated by target embassies</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-left">
                    {selectedDestination.visaRequirements.map((req, index) => (
                      <div key={index} className="flex gap-3 text-slate-700 select-text p-3 shadow-sm border border-slate-100 rounded-xl bg-slate-50/50 items-start">
                        <div className="h-5 w-5 rounded-full bg-amber-500/10 border border-amber-500/35 flex items-center justify-center text-amber-600 flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <p className="text-xs leading-relaxed font-semibold">{req}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Destination Specific FAQs */}
                {COUNTRY_FAQS[selectedDestination.id] && (
                  <div id="faqs-section" className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <div className="h-10 w-10 bg-brand-blue-50 text-brand-blue-600 rounded-2xl flex items-center justify-center">
                        <HelpCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-extrabold text-xl text-slate-900">Destination FAQs</h3>
                        <p className="text-[11px] text-slate-500 font-sans tracking-wide">
                          Frequently asked questions about studying and settling in {selectedDestination.name}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {COUNTRY_FAQS[selectedDestination.id].map((faq, index) => {
                        const isOpen = openFaqIndex === index;
                        return (
                          <div
                            key={index}
                            className="border border-slate-150/85 rounded-2xl overflow-hidden bg-slate-50/40 hover:bg-slate-50/80 transition-all duration-250 shadow-sm text-left"
                          >
                            <button
                              onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                              className="w-full flex items-center justify-between p-4 text-left font-sans font-bold text-xs sm:text-sm text-slate-800 focus:outline-none cursor-pointer group"
                            >
                              <span className="pr-4 group-hover:text-brand-blue-700 transition-colors duration-150">{faq.q}</span>
                              <ChevronRight
                                className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                                  isOpen ? "rotate-90 text-brand-blue-600" : "group-hover:translate-x-0.5"
                                }`}
                              />
                            </button>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: "easeInOut" }}
                                >
                                  <div className="p-4 pt-0 border-t border-slate-100 text-xs text-slate-600 leading-relaxed font-sans select-text whitespace-pre-line">
                                    {faq.a}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
              
              {/* Right Column: Dynamic Inquiry Widget Sticky Side Card */}
              <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 text-left animate-fade-in">
                
                {/* 1. Prompt Booking Card */}
                <div className="bg-white border-2 border-brand-blue-100 shadow-xl rounded-3xl p-6 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-brand-gold-400/5 rounded-full blur-xl pointer-events-none" />
                  
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest bg-brand-gold-500/10 text-brand-gold-600 border border-brand-gold-500/20 uppercase mb-4 select-none">
                    ⚡ DIRECT COUNSEL DESK
                  </span>
                  
                  <h3 className="font-display font-extrabold text-lg text-slate-900 leading-tight">
                    Assess Eligibility & Apply to Universities
                  </h3>
                  
                  <p className="text-xs text-slate-500 leading-relaxed mt-2.5 select-text">
                    Academic systems and visa timelines change quickly. Speak to our physical desk officers at Lahore, Karachi, or Dubai to evaluate your scores, transcripts, and secure official casework representation instantly.
                  </p>

                  <div className="pt-4 space-y-3 border-t border-slate-100 mt-5">
                    <button
                      onClick={() => handleCtaClick(selectedDestination.popularTitle)}
                      className="w-full py-3 bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-sans font-black text-xs uppercase tracking-wider rounded-xl transition duration-200 shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Contact className="h-4 w-4" />
                      Apply & Inquire Pathway
                    </button>
                    
                    <a
                      href="tel:+923417548178"
                      className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition border border-slate-200 flex items-center justify-center gap-2"
                    >
                      📞 Live Helpline Direct Call
                    </a>
                  </div>
                  
                  <div className="mt-4 text-[10px] text-center text-slate-400 flex items-center gap-1.5 justify-center">
                    <Info className="h-3 w-3" />
                    <span>Includes 100% Free Consultation Audit</span>
                  </div>
                </div>

                {/* 2. Service Quick Specs Card */}
                <div className="bg-slate-900 text-white rounded-3xl p-6 text-left relative overflow-hidden border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Financial & Living Specs</span>
                  <div className="flex items-center gap-3 mt-2 pb-4 border-b border-slate-800">
                    <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center text-brand-gold-400 font-bold text-lg">
                      <span role="img" aria-label={selectedDestination.name}>{selectedDestination.flag}</span>
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-white leading-tight">{selectedDestination.name} Profile</h4>
                      <p className="text-[10px] text-slate-400 font-mono tracking-wide uppercase">Official Economic Metrics</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4 text-xs font-mono">
                    <div className="flex justify-between flex-wrap gap-2">
                      <span className="text-slate-400">Mean Tuition:</span>
                      <span className="font-bold text-right text-brand-gold-400">{selectedDestination.avgTuitionRange.split(" (")[0]}</span>
                    </div>
                    <div className="flex justify-between flex-wrap gap-2 border-t border-slate-800 pt-2.5">
                      <span className="text-slate-400">Living Expenses:</span>
                      <span className="font-bold text-right text-slate-100">{selectedDestination.avgLivingExpenses.split(" (")[0]}</span>
                    </div>
                    <div className="flex justify-between flex-wrap gap-2 border-t border-slate-800 pt-2.5">
                      <span className="text-slate-400">Part-Time limit:</span>
                      <span className="font-bold text-right text-slate-100">{selectedDestination.partTimeHours.split(" (")[0]}</span>
                    </div>
                    <div className="flex justify-between flex-wrap gap-2 border-t border-slate-800 pt-2.5">
                      <span className="text-slate-400">PSW Authorization:</span>
                      <span className="font-bold text-right text-brand-blue-400">{selectedDestination.postStudyWorkVisa}</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

      </div>
    );
  }

  // --- RENDERING 2: BASE DIRECTORY GRID (DEFAULT STANDARD VIEW) ---
  return (
    <section id="destinations" className="py-16 bg-slate-50 relative overflow-hidden text-left">
      {/* Decorative side mesh blurs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue-100/30 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

      {/* Action Center Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight bg-gradient-to-r from-sky-700 to-indigo-600 bg-clip-text text-transparent block leading-none">UniHelp Global Deck</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Admissions & Visa Registry</span>
          </div>
        </div>
        <button 
          onClick={() => setCompareDrawerOpen(true)} 
          className="relative flex items-center space-x-2.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
        >
          <Compass className="h-4 w-4 text-sky-600" />
          <span>Compare Deck</span>
          {compareList.length > 0 && (
            <span className="w-5 h-5 bg-indigo-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center animate-bounce ml-1.5">
              {compareList.length}
            </span>
          )}
        </button>
      </div>

      {/* Search and Filters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-md">
          {/* Universal Live Search */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 ml-4 absolute left-0.5 top-4.5" />
            </div>
            <input 
              type="text" 
              placeholder="Search country name, degrees pathways, cost indices..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-14 pr-28 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base shadow-inner"
            />
            <div className="absolute inset-y-2 right-2 flex items-center">
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all duration-150 flex items-center space-x-1 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Regional & Budget Pill Filter Segment */}
          <div className="flex flex-col space-y-4">
            <div className="text-center">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2.5">Filter by Global Category</span>
              <div className="flex flex-wrap justify-center items-center gap-2.5">
                {[
                  { id: "ALL", label: "🌐 All Destinations" },
                  { id: "GLOBAL", label: "🇺🇸 Global Giants" },
                  { id: "SCHENGEN", label: "🇪🇺 EU Schengen Europe" },
                  { id: "ASIA", label: "🇰🇷 Asian Tech Leaders" },
                  { id: "LOW_TUITION", label: "💎 Budget-Friendly / Zero Tuition" }
                ].map((cat) => {
                  const isActive = selectedFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedFilter(cat.id as any)}
                      className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-full transition-all duration-200 border cursor-pointer select-none flex items-center space-x-1.5
                        ${isActive 
                            ? 'bg-sky-600 border-sky-600 text-white shadow-md' 
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Quick Visa Filter Sub-Segment */}
            <div className="border-t border-slate-100 pt-4 flex flex-wrap justify-center items-center gap-3">
              <span className="text-xs font-semibold text-slate-400">Visa Rate:</span>
              <button 
                onClick={() => setVisaFilter("all")} 
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  visaFilter === "all" 
                    ? "bg-slate-800 text-white border-slate-800" 
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                All Rates
              </button>
              {[
                { id: "High", label: "High", colorClass: "bg-sky-500", activeClass: "bg-sky-500 border-sky-500 text-white" },
                { id: "Medium", label: "Medium", colorClass: "bg-indigo-500", activeClass: "bg-indigo-600 border-indigo-600 text-white" },
                { id: "Easy", label: "Easy", colorClass: "bg-emerald-500", activeClass: "bg-emerald-500 border-emerald-500 text-white" }
              ].map((rate) => {
                const isActive = visaFilter === rate.id;
                return (
                  <button
                    key={rate.id}
                    onClick={() => setVisaFilter(rate.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center ${
                      isActive 
                        ? rate.activeClass 
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${isActive ? 'bg-white' : rate.colorClass}`} />
                    {rate.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Cards & Grid Display */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        {/* Grid Header Metrics */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 font-display">Accredited Study Portals</h2>
            <p className="text-xs text-slate-400 mt-1">Showing {filteredDestinations.length} premium educational sectors</p>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-slate-400 font-medium">Layout:</span>
            <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 font-bold flex items-center gap-1 leading-none">
              <Globe className="h-3 w-3" /> Adaptive Visual Cards
            </span>
          </div>
        </div>

        {/* Cards Container */}
        {filteredDestinations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-3xl mb-4">
              <Inbox className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No destinations match your filters</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-sm">Try modifying your search text, toggling visa rates, or choosing another regional cluster.</p>
            <button 
              onClick={() => { setSelectedFilter("ALL"); setVisaFilter("all"); setSearchQuery(""); }}
              className="mt-5 px-5 py-2.5 bg-sky-600 text-white rounded-xl text-xs font-bold hover:bg-sky-700 transition duration-150 shadow-md cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => {
              const isCompared = compareList.some(item => item.id === dest.id);
              const customImageUrl = DESTINATION_IMAGES[dest.id] || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80";
              
              let visaBadgeColor = '';
              if (dest.visaDifficulty === 'High') visaBadgeColor = 'bg-sky-50 text-sky-700 border-sky-200';
              else if (dest.visaDifficulty === 'Medium') visaBadgeColor = 'bg-indigo-50 text-indigo-700 border-indigo-200';
              else visaBadgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';

              return (
                <div 
                  key={dest.id} 
                  className="group bg-white rounded-2xl border border-slate-100 hover:border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col relative"
                >
                  {/* Card banner containing country cover image */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img 
                      src={customImageUrl} 
                      alt={dest.popularTitle} 
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-950/20" />
                    
                    {/* Premium Custom Visa Badge overlay */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-extrabold tracking-widest border uppercase backdrop-blur-md ${visaBadgeColor}`}>
                        {dest.visaDifficulty} Visa
                      </span>
                    </div>

                    {/* Title details absolute overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-2.5 text-white z-10">
                      <span className="text-3xl filter drop-shadow-md leading-none select-none">{dest.flag}</span>
                      <div>
                        <p className="text-[9px] tracking-widest text-sky-200 font-extrabold uppercase leading-none mb-1">DESTINATION PORTAL</p>
                        <h4 className="text-lg font-extrabold leading-none filter drop-shadow">{dest.popularTitle}</h4>
                      </div>
                    </div>
                  </div>

                  {/* Card Body Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 select-text">{dest.tagline}</p>
                    </div>

                    {/* Metrics Box */}
                    <div className="grid grid-cols-2 gap-3 pt-3.5 border-t border-slate-100 mb-4 bg-slate-50 p-3 rounded-xl">
                      <div>
                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">MEAN TUITION</span>
                        <span className="text-slate-800 text-[11px] font-extrabold block mt-0.5 truncate" title={dest.avgTuitionRange}>{dest.avgTuitionRange.split(" (")[0]}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">PART-TIME JOBS</span>
                        <span className="text-slate-800 text-[11px] font-extrabold block mt-0.5 truncate" title={dest.partTimeHours}>{dest.partTimeHours.split(" (")[0]}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between gap-2.5 pt-1 select-none">
                      {/* Compare Deck Toggle Button */}
                      <button 
                        onClick={() => toggleCompareItem(dest.id)} 
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all text-sm cursor-pointer select-none shrink-0
                          ${isCompared 
                              ? 'bg-indigo-50 border-indigo-200 text-indigo-600' 
                              : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300'}`} 
                        title={isCompared ? 'Remove from compare deck' : 'Add to compare deck'}
                      >
                        <Compass className="h-4.5 w-4.5" />
                      </button>
                      
                      {/* Detailed Guide trigger */}
                      <button 
                        onClick={() => {
                          if (onNavigate) {
                            onNavigate(`/study-in-${dest.id}`);
                          } else {
                            setLocalSelectedDestination(dest);
                          }
                        }} 
                        className="inline-flex items-center space-x-1 px-2 py-2.5 text-[11px] font-bold text-slate-500 hover:text-sky-600 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                      >
                        <BookOpen className="h-4.5 w-4.5" />
                        <span>Syllabus</span>
                      </button>
                      
                      {/* Procure Desk action trigger */}
                      <button 
                        onClick={() => {
                          setProcureCountryId(dest.id);
                          setProcureModalOpen(true);
                        }} 
                        className="flex-1 inline-flex items-center justify-center px-3.5 py-2.5 text-[11px] font-extrabold tracking-wider text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-all duration-150 shadow-sm group/btn cursor-pointer select-none"
                      >
                        <span>PROCURE DESK</span>
                        <ChevronRight className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Profile Placement Call To Action block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10 text-left font-sans">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden border border-slate-700">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-50/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-left">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-sky-300 font-semibold uppercase tracking-wider select-none">
                <Sparkles className="h-4.5 w-4.5 text-sky-400 animate-pulse" />
                <span>Smart Placement Engine</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                Are you unclear about scholarship limits or local deadlines?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed select-text font-sans">
                Different countries have custom processing timelines (e.g. APS reviews are mandatory in Germany, while the USA requests SEVIS payment clearance). Our specialized, certified country counsel heads will guide you through all rules.
              </p>
            </div>
            <div className="w-full lg:w-auto shrink-0 select-none">
              <button 
                onClick={() => setProfileModalOpen(true)} 
                className="w-full lg:w-auto inline-flex items-center justify-center px-8 py-4 text-xs font-black uppercase tracking-widest text-slate-950 bg-white hover:bg-slate-100 rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer leading-none"
              >
                MATCH MY PROFILE DIRECTLY
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Side-by-side Compare Drawer Panel */}
      <AnimatePresence>
        {compareDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden font-sans">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCompareDrawerOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            />
            
            <div className="fixed inset-y-0 right-0 max-w-lg w-full flex">
              <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="w-full bg-white shadow-2xl z-50 border-l border-slate-100 flex flex-col h-full"
              >
                {/* Drawer Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center space-x-3 text-left">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                      <Compass className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg leading-tight">Compare Decisions</h3>
                      <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Side-by-side assessment desk</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setCompareDrawerOpen(false)} 
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Drawer Content Grid */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {compareList.length === 0 ? (
                    <div className="text-center py-16 text-slate-400 border border-dashed border-slate-200 rounded-3xl">
                      <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <Compass className="h-8 w-8" />
                      </div>
                      <h4 className="font-bold text-slate-700 text-sm">Your deck is empty</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-[260px] mx-auto leading-relaxed">Compare up to 3 destinations side-by-side using the compass buttons inside the country cards.</p>
                    </div>
                  ) : (
                    compareList.map((item) => {
                      let visaBadgeColor = '';
                      if (item.visaDifficulty === 'High') visaBadgeColor = 'bg-sky-50 text-sky-700 border-sky-100';
                      else if (item.visaDifficulty === 'Medium') visaBadgeColor = 'bg-indigo-50 text-indigo-700 border-indigo-100';
                      else visaBadgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-100';

                      return (
                        <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative flex flex-col justify-between shadow-sm text-left">
                          <button 
                            onClick={() => toggleCompareItem(item.id)} 
                            className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition p-1 rounded-lg hover:bg-slate-200/50 cursor-pointer"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <div className="flex items-center space-x-3 mb-3 text-left">
                            <span className="text-3xl select-none leading-none">{item.flag}</span>
                            <div>
                              <h4 className="font-black text-slate-800 text-sm leading-none">{item.popularTitle}</h4>
                              <span className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[8px] font-extrabold tracking-wider border uppercase ${visaBadgeColor}`}>
                                {item.visaDifficulty} Visa
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2 text-[11px] text-slate-600 pt-2 border-t border-slate-200 font-sans">
                            <div className="flex justify-between flex-wrap gap-1">
                              <span className="text-slate-400 font-semibold">Mean Tuition Scale:</span>
                              <span className="font-bold text-slate-800 truncate max-w-[200px]">{item.avgTuitionRange}</span>
                            </div>
                            <div className="flex justify-between flex-wrap gap-1">
                              <span className="text-slate-400 font-semibold">Working Limit / Week:</span>
                              <span className="font-bold text-slate-800 truncate max-w-[200px]">{item.partTimeHours}</span>
                            </div>
                            <div className="flex justify-between flex-wrap gap-1">
                              <span className="text-slate-400 font-semibold">Living Cost:</span>
                              <span className="font-bold text-slate-800 truncate max-w-[200px]">{item.avgLivingExpenses}</span>
                            </div>
                            <div className="flex justify-between flex-wrap gap-1">
                              <span className="text-slate-400 font-semibold">Language Req:</span>
                              <span className="font-bold text-slate-800 truncate max-w-[200px]">{item.languageRequirement}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Drawer Footer Actions */}
                <div className="p-6 border-t border-slate-100 bg-slate-50 select-none">
                  {compareList.length > 0 ? (
                    <div className="space-y-3">
                      <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100/50 text-[11px] text-indigo-700 font-semibold text-left flex items-start">
                        <Info className="h-4 w-4 mr-1.5 text-indigo-500 shrink-0 mt-0.5" />
                        <span>Crucially, compare parameters outline official baseline metrics held at the admissions registry. Let's start bulk verification.</span>
                      </div>
                      <button 
                        onClick={triggerInquiryAll} 
                        className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer active:scale-98"
                      >
                        Consult For ({compareList.length}) Selected Deck Places
                      </button>
                    </div>
                  ) : (
                    <button disabled className="w-full bg-slate-200 text-slate-400 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider cursor-not-allowed">
                      Select Destinations to compare
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Smart Matching Modal */}
      <AnimatePresence>
        {profileModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProfileModalOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-150 z-50 text-left relative"
            >
              {/* Header banner */}
              <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 text-white relative">
                <button 
                  onClick={() => setProfileModalOpen(false)} 
                  className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="inline-flex items-center space-x-2.5 px-2.5 py-1 rounded-full bg-sky-500/20 border border-sky-500/30 text-[10px] text-sky-300 font-semibold uppercase tracking-wider mb-2 select-none">
                  <Sparkles className="h-3 w-3" />
                  <span>Clearing Profile Audit</span>
                </div>
                <h4 className="text-2xl font-black text-white leading-none">Direct Country Counsel matching</h4>
                <p className="text-slate-300 text-xs mt-1.5 leading-relaxed font-sans">Match your current academic records, financial limit, and visa timeline directly against verified admissions requirements.</p>
              </div>

              {/* Form Body */}
              <form onSubmit={handleProfileEvaluationSubmitReal} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Your Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      placeholder="Alexander Mercer" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all text-sm text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Contact Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      placeholder="alex@mercer.com" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all text-sm text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Target Intake Term</label>
                    <select 
                      value={profileIntake}
                      onChange={(e) => setProfileIntake(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all text-sm text-slate-800 font-sans"
                    >
                      <option>Fall 2026 Intake</option>
                      <option>Spring 2027 Intake</option>
                      <option>Fall 2027 Intake</option>
                      <option>Undecided / Rolling Admissions</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Tuition Budget Target / Year</label>
                    <select 
                      value={profileBudget}
                      onChange={(e) => setProfileBudget(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all text-sm text-slate-800 font-sans"
                    >
                      <option>Free / Low Cost (&lt; $5,000 USD)</option>
                      <option>Moderate ($5,000 - $15,000 USD)</option>
                      <option>Premium ($15,000 - $30,000 USD)</option>
                      <option>Ivy Tier ($30,000+ USD)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Highest Completed Degree</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "hs", label: "High School", sub: "Undergrad Seekers" },
                      { id: "ba", label: "Bachelor's", sub: "Postgrad Seekers" },
                      { id: "ma", label: "Master's", sub: "Doctorate Seekers" }
                    ].map((lvl) => {
                      const isSelected = profileDegree === lvl.id;
                      return (
                        <div 
                          key={lvl.id}
                          onClick={() => setProfileDegree(lvl.id)}
                          className={`border rounded-xl p-3 text-center cursor-pointer block transition-all relative select-none
                            ${isSelected 
                              ? 'border-indigo-600 bg-indigo-50/40 text-indigo-950 font-bold' 
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                        >
                          <span className="text-xs font-bold block mb-0.5">{lvl.label}</span>
                          <span className="text-[9px] text-slate-400 block font-normal">{lvl.sub}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Additional Target Priorities</label>
                  <textarea 
                    rows={2} 
                    value={profilePriorities}
                    onChange={(e) => setProfilePriorities(e.target.value)}
                    placeholder="e.g. Intended major/discipline, part-time work goals, post-study work goals..." 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all text-sm text-slate-800 font-sans"
                  />
                </div>

                <div className="pt-2 select-none font-sans">
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all duration-200 text-xs uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
                  >
                    <span>Initialize Instant Profile Assessment Match</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-2.5 flex items-center justify-center gap-1">
                    <ShieldAlert className="h-3.5 w-3.5 text-slate-300" />
                    <span>Encrypted with standard clearance metrics. Unlocks personal consultation channel.</span>
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Procure / Inquiry Modal */}
      <AnimatePresence>
        {procureModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 font-sans">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProcureModalOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 z-50 text-left relative"
            >
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-sky-600 to-indigo-600 p-6 text-white relative">
                <button 
                  onClick={() => setProcureModalOpen(false)} 
                  className="absolute top-4 right-4 text-white/85 hover:text-white bg-black/15 hover:bg-black/30 p-2 rounded-xl transition cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
                <span className="text-[9px] font-extrabold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full inline-block mb-2 select-none">
                  Procuring Academic clearance desk
                </span>
                <h4 className="text-2xl font-black text-white leading-none">
                  {procureCountryId === "deck_bulk" 
                    ? "Inquire Comparison Deck" 
                    : `Inquire: ${DESTINATIONS_DATA.find(d => d.id === procureCountryId)?.popularTitle || "Direct Clearance"}`}
                </h4>
                <p className="text-sky-100 text-xs mt-1.5 font-sans leading-relaxed">Submit this rapid dossier request to initialize priority enrollment guidance and safe-haven placement.</p>
              </div>

              {/* Form Body */}
              <form onSubmit={handleInquirySubmitReal} className="p-6 space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Your Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={procureName}
                    onChange={(e) => setProcureName(e.target.value)}
                    placeholder="Evelyn Carter" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all text-sm text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Contact Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={procureEmail}
                      onChange={(e) => setProcureEmail(e.target.value)}
                      placeholder="evelyn@domain.com" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all text-sm text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Intended Start Date</label>
                    <select 
                      value={procureStart}
                      onChange={(e) => setProcureStart(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all text-sm text-slate-800 font-sans"
                    >
                      <option>Fall 2026</option>
                      <option>Spring 2027</option>
                      <option>Fall 2027</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Current Academic Level</label>
                  <div className="grid grid-cols-3 gap-2 font-sans">
                    {[
                      { id: "bachelors", label: "Bachelor's" },
                      { id: "masters", label: "Master's" },
                      { id: "phd", label: "Ph.D." }
                    ].map((lvl) => {
                      const isSelected = procureDegree === lvl.id;
                      return (
                        <div 
                          key={lvl.id}
                          onClick={() => setProcureDegree(lvl.id)}
                          className={`border rounded-xl p-2.5 text-center cursor-pointer block transition-all relative select-none
                            ${isSelected 
                              ? 'border-indigo-600 bg-indigo-50/40 text-indigo-950 font-bold' 
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                        >
                          <span className="text-xs font-bold block">{lvl.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 select-none">
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition duration-200 text-xs uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
                  >
                    <span>Secure Premium Consultation Slot</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-slate-400 text-[10px] text-center mt-2.5 leading-normal font-sans">By proceeding, you unlock direct channel assistance powered by verified university enrollment specialists.</p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Clearance Popups */}
      <AnimatePresence>
        {successModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSuccessModal(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm shadow"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100 z-50 relative"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-500 text-2xl flex items-center justify-center mx-auto mb-4 select-none">
                <Check className="h-8 w-8" />
              </div>
              <h4 className="font-extrabold text-slate-800 text-lg leading-none">{successModal.title}</h4>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed select-text font-sans">{successModal.body}</p>
              <button 
                onClick={() => setSuccessModal(null)} 
                className="mt-5 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer select-none active:scale-98"
              >
                Confirm & Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Exquisite custom toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl flex items-center space-x-3 transition-all duration-300 max-w-sm border border-slate-800 text-left font-sans"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0
              ${toast.type === "success" ? "bg-emerald-500/20 text-emerald-400" : toast.type === "amber" ? "bg-amber-500/20 text-amber-400" : "bg-sky-500/20 text-sky-400"}`}
            >
              <Info className="h-4.5 w-4.5" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs text-white leading-none">{toast.title}</h5>
              <p className="text-[10px] text-slate-400 mt-1 leading-tight">{toast.text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
