import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Clock, 
  FileText, 
  Globe, 
  CheckCircle2, 
  ChevronRight, 
  Info, 
  Award, 
  Users, 
  Compass, 
  Check, 
  BookOpen, 
  ShieldAlert, 
  ListChecks,
  Contact
} from "lucide-react";

interface ImmigrationPagesProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onConsult: (visaTitle: string) => void;
}

interface VisaStream {
  id: string;
  title: string;
  subclass?: string;
  badge: string;
  overview: string;
  pointsSystem: boolean;
  minPoints?: number;
  eligibility: string[];
  documents: string[];
  steps: string[];
  benefits: string[];
  duration: string;
  cost: string;
  experienceNeeded: string;
  englishReq: string;
}

interface CountryData {
  id: string;
  name: string;
  flag: string;
  code: string;
  heroBg: string; // Gradient color theme styling
  accentColor: string;
  summary: string;
  description: string;
  streams: VisaStream[];
}

const IMMIGRATION_DATA: CountryData[] = [
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    code: "AUS",
    heroBg: "from-blue-900 via-sky-950 to-blue-950",
    accentColor: "border-sky-500 bg-sky-50 text-sky-700",
    summary: "Australia offers robust, points-tested pathways for skilled migration seeking to contribute to the economic development of regional and metropolitan communities.",
    description: "The Australian Department of Home Affairs operates multiple pathways for overseas high-caliber professionals. These points-tested visas allow applicants to live, work, and study in Australia as permanent residents or regional workers with straight-line pathways to citizenship.",
    streams: [
      {
        id: "skilled-independent-189",
        title: "Skilled Independent Visa",
        subclass: "Subclass 189",
        badge: "Points-Tested Permanent Residency",
        overview: "The Skilled Independent Visa (Subclass 189) is a permanent residency stream for highly skilled professionals who do not have sponsorship from an Australian employer, state, or family member. It relies entirely on independent scores on the points table.",
        pointsSystem: true,
        minPoints: 65,
        eligibility: [
          "Must have an occupation listed on the relevant Medium and Long-term Strategic Skills List (MLTSSL)",
          "Must achieve at least 65 points on the points assessment table (based on age, English language, qualifications, and employment history)",
          "Must have a positive Skills Assessment from the relevant assessing authority for the nominated occupation",
          "Must be under 45 years of age at the time of receiving the invitation",
          "Must demonstrate Competent English (equivalent to IELTS Band 6.0 in all components or higher)"
        ],
        documents: [
          "Positive Skills Assessment result from the official body (e.g., ACS for IT, EA for Engineers, CPA for Accountants)",
          "Valid IELTS, TOEFL, or PTE Academic scorecard",
          "Certified academic degrees, transcripts, and syllabus catalogs",
          "Detailed employment references, tax filings, and bank records verifying paid employment length",
          "National Police clearance certificates and official medical clearance reports"
        ],
        steps: [
          "Complete Your Skills Assessment: File documentation with the relevant assessing body to confirm equivalent academic & career alignment.",
          "Submit Expression of Interest (EOI): File a digital record on Australia's SkillSelect system indicating points ranking.",
          "Receive Invitation to Apply (ITA): The Department of Home Affairs conducts monthly targeted rounds. Candidates with the highest points are selected.",
          "File Your Official Visa Application: Within 60 days of ITA receipt, submit complete medical, character, and professional evidence."
        ],
        benefits: [
          "Unrestricted rights to live, work, and study anywhere in the continent of Australia",
          "Enroll directly in Medicare, Australia's taxpayer-subsidized public healthcare model",
          "Direct pathway to apply for full Australian Citizenship after residency requirements are met",
          "Sponsor eligible family relatives for Australian permanent residence visas"
        ],
        duration: "10 - 18 Months (Processing Time)",
        cost: "From $4,640 AUD for the primary applicant",
        experienceNeeded: "Minimum 1 Year Post-Qualification (but more years boost points score significantly)",
        englishReq: "IELTS Minimum 6.0 in all bands (7.0+ recommended for points advantage)"
      },
      {
        id: "skilled-nominated-190",
        title: "Skilled Nominated Visa",
        subclass: "Subclass 190",
        badge: "State-Sponsored Permanent Residency",
        overview: "The Skilled Nominated Visa (Subclass 190) is a state-sponsored permanent visa. It allows Australian states or territories to nominate skilled professionals who possess skills that are in critical shortage in their specific regional economies.",
        pointsSystem: true,
        minPoints: 65,
        eligibility: [
          "Must receive a formal nomination from an Australian state/territory government agency",
          "Occupation must be on the relevant state's specific skilled occupation list",
          "Must achieve at least 65 points on the points assessment (including 5 points awarded automatically for state nomination)",
          "Must have a positive Skills Assessment and be aged under 45 years",
          "Must commit to living and working in the nominating state for the first 2 years of residency"
        ],
        documents: [
          "Official nomination approval letter from the sponsoring State or Territory Government",
          "Positive Skill Assessment outcomes booklet",
          "IELTS/PTE academic report verifying English proficiency level",
          "Employment contracts, payslips, and comprehensive employer testimonials",
          "Proof of active registration with regulatory councils (where applicable)"
        ],
        steps: [
          "Skill Assessment: Secure positive verification of your educational background and career history.",
          "Submit EOI & State Registration: Declare interest in specific nominating states via the SkillSelect portal and file a direct state sponsorship application.",
          "State Nomination Approval: State governments review portfolios and issue an invitation.",
          "Lodge Visa Application with DHA: Submit official documents to DHA within 60 days after state approval."
        ],
        benefits: [
          "Immediate permanent residency status upon entry to Australia",
          "Additional 5 points allocated directly to your point test scorecard for securing state support",
          "Full access to social security benefits and public education models for children",
          "Clear, predictable pathway to citizenship within 4 years"
        ],
        duration: "9 - 15 Months (Processing Time)",
        cost: "From $4,640 AUD for the primary applicant",
        experienceNeeded: "Minimum 1-3 Years depending on state-specific list specifications",
        englishReq: "IELTS Minimum 6.0 in overall and sub-scores (Some states request 7.0 for medical/legal careers)"
      },
      {
        id: "skilled-regional-491",
        title: "Skilled Work Regional (Provisional) Visa",
        subclass: "Subclass 491",
        badge: "Regional provisional pathway to PR",
        overview: "The Skilled Work Regional (Subclass 491) is a 5-year provisional visa designed to encourage skilled professionals to live and work in designated regional areas of Australia. It grants a guaranteed route to permanent residency after 3 years.",
        pointsSystem: true,
        minPoints: 65,
        eligibility: [
          "Must be nominated by a state/territory government, or sponsored by an eligible relative residing in a designated regional area",
          "Must live, work, and study strictly in a designated regional area (includes almost all areas outside Sydney, Melbourne, and Brisbane)",
          "Must achieve at least 65 points (including 15 points automatically awarded for regional sponsorship)",
          "Must have a valid Skills Assessment, be under 45, and have competent English"
        ],
        documents: [
          "State nomination confirmation or declaration documents completed by the regional sponsoring relative",
          "Evidence of the relative's permanent residency or citizenship and proof of regional address (leases, utility records)",
          "Positive Skills Assessment certificate",
          "IELTS/PTE scoreboards",
          "Tax records and pay documentation"
        ],
        steps: [
          "Assess Skills: Secure recognition from the relevant Australian assessing body.",
          "Lodge EOI & Regional Sponsoring Application: Focus interest on regional territories and request structural sponsorship.",
          "Secure Regional ITA: State issues nomination, immediately introducing 15 bonus points to your profile.",
          "Visa Lodging: Lodge application with DHA proving regional residency plans and matching eligibility."
        ],
        benefits: [
          "Stay in Australia for 5 full years with flexible internal regional mobility options",
          "Receive a massive 15-point increase on your points test sheet, boosting ITA probability",
          "Direct route to Subclass 191 Permanent Residency after living and working for 3 years with specified taxable income ($70,000+ per year)",
          "Eligible for regional healthcare enrollment support"
        ],
        duration: "8 - 12 Months",
        cost: "From $4,640 AUD for primary applicant",
        experienceNeeded: "1 - 2 Years showing solid occupational durability",
        englishReq: "IELTS Minimum 6.0 across all four skill metrics"
      },
      {
        id: "australia-visa-ballot-lottery",
        title: "Work & Holiday Visa Ballot & Lottery",
        subclass: "Subclass 462 Ballot",
        badge: "Random Electronic Selection Lottery",
        overview: "Australia uses a high-integrity random electronic ballot (lottery) system to allocate highly sought-after Work and Holiday (Subclass 462) visa slots for candidate countries with capped quotas (such as China, India, Brazil, Vietnam, and Turkey), and the new Pacific Engagement Visa (Subclass 192) ballot programs. This ensures safe, transparent, and fair access without point competitions.",
        pointsSystem: false,
        eligibility: [
          "Must be a citizen and passport-holder of a country eligible for the Work and Holiday Ballot (e.g. China, Vietnam, India, Brazil, Turkey)",
          "Must be aged between 18 and 30 years old (inclusive) at the time of registering the ballot",
          "Must register on the official Australian Department of Home Affairs ImmiAccount ballot system during active registration windows",
          "Must meet the educational requirement (usually a tertiary qualification or at least 2 full years of completed undergraduate study)",
          "Must prove functional English (equivalent to IELTS Band 4.5 overall score or higher)"
        ],
        documents: [
          "Valid eligible national passport details page scanned in high resolution",
          "Proof of functional English language capability (IELTS Academic or General Training, PTE, or TOEFL scorecard)",
          "Graduation scrolls, university degree certificates, or official college semester transcripts",
          "Evidence of sufficient support funds ($5,000 AUD plus additional funds for departure airfares, totaling around $6,500 AUD)",
          "Certified birth certificate and official national identity registry cards"
        ],
        steps: [
          "Create ImmiAccount & Pre-Register: Log into the Department of Home Affairs portal and file a high-integrity pre-registration card during open ballot windows.",
          "Pay Lottery Registration Fee: Pay the nominal ballot entry fee (approximately $25 AUD) to lock in your active entry.",
          "Wait for Electronic Draw Rounds: Home Affairs runs computer-generated random selections on periodic dates during the program year.",
          "Receive Selection Notification: If selected, you receive an official Selection Notification with a unique Invitation to Apply (ITA).",
          "Lodge Full Subclass 462 Visa: Submit complete academic, language, health, and financial proofs within the strict 60-day window from visual notification."
        ],
        benefits: [
          "Reside and travel anywhere in Australia for 12 months (extendable up to 3 years by doing designated specified work)",
          "Full-time work rights and flexible employment options across all commercial sectors",
          "Brief study or training courses up to 4 continuous months permitted in high-end institutions",
          "Multi-entry travel privileges allowed: exit and re-enter Australia as many times as desired during the visa term",
          "A direct transition platform onto skilled work visas or permanent resident pathways upon matching employers"
        ],
        duration: "1 - 3 Months (Ballot draw speeds vary; 14 days once full visa is lodged)",
        cost: "$25 AUD ballot entry fee + $635 AUD visa fee",
        experienceNeeded: "None (Perfect for young graduates, adventurers, and entry-professionals)",
        englishReq: "IELTS Minimum 4.5 overall (Functional English benchmark)"
      }
    ]
  },
  {
    id: "austria",
    name: "Austria",
    flag: "🇦🇹",
    code: "AUT",
    heroBg: "from-rose-900 via-stone-900 to-red-950",
    accentColor: "border-red-500 bg-red-50 text-red-700",
    summary: "Austria's Red-White-Red scheme acts as a structured criterion-linked immigration pathway allowing high-level global professionals to settle in the European heartland.",
    description: "The Red-White-Red Card (Rot-Weiß-Rot – Karte) is a flexible point-regulated system designed to easily facilitate the immigration of third-country workers and their families, tailoring residency permits to specific professional skills.",
    streams: [
      {
        id: "red-white-red-highly-qualified",
        title: "RWR Card for Very Highly Qualified Workers",
        badge: "Criterion-Linked Elite Class",
        overview: "The Red-White-Red Card for Very Highly Qualified Workers serves as a fast-line pathway for global executives, researchers, and highly qualified academics. It allows them to enter Austria on a Job Seeker Visa, requiring zero initial job offers.",
        pointsSystem: true,
        minPoints: 70, // out of 100
        eligibility: [
          "Must score a minimum of 70 points out of 100 on the specific highly qualified workers points table",
          "Points criteria include: special qualifications (PhD, patents), work experience matching seniority, language skills (German or English), and prior studies in Austria",
          "Must support themselves financially while on the initial Austria Job Seeker Visa if applying before securing a job offer"
        ],
        documents: [
          "Doctorate, master's, or bachelor's degree scrolls with graduation proof",
          "Verification of gross annual salary in previous leadership positions (tax papers/stipends)",
          "Research patents, publications, or verified regional award recognition",
          "German integration or English language certifications (CEFR level equivalents)",
          "Proof of sufficient independent funds (bank statements) to cover Austrian living costs"
        ],
        steps: [
          "Points Audit: Confirm that your profile accumulates at least 70/100 points on the Austrian Qualified criteria.",
          "Job Seeker Visa: Apply for a 6-month Job Seeker Visa at the Austrian embassy to search for local employment.",
          "Job Match & RWR Card Filing: Upon securing an elite employment contract matching your skill Level, easily transition directly into a Red-White-Red Card."
        ],
        benefits: [
          "Work freely and live securely in Austria with direct spouse access to the unrestricted labor market",
          "Apply for a Red-White-Red Card Plus after 2 years, giving open labor access all across Austria",
          "Settle in one of the world's most stable, culturally rich, and secure European economies"
        ],
        duration: "2 - 4 Months",
        cost: "€160 application fee + embassy admin charges",
        experienceNeeded: "5+ Years of high-level professional/research experience recommended",
        englishReq: "Competent English (IELTS 6.5+ / CEFR B2) or basic German (A1) for point benefits"
      },
      {
        id: "red-white-red-skilled-shortage",
        title: "RWR Card for Skilled Workers in Shortage Occupations",
        badge: "Shortage List Specific Pathway",
        overview: "This stream targets skilled trade professionals and technical experts whose professions are listed on the official annual Austrian Shortage Occupation List (Mangelberufe), covering tech, mechanical trades, and specialist healthcare.",
        pointsSystem: true,
        minPoints: 55, // out of 90
        eligibility: [
          "Must have finished vocational training or a degree matching a shortage occupation",
          "Must have a concrete, legally binding job offer in Austria matching your qualifications with compliant pay standards",
          "Must score at least 55 out of 90 points on the shortage occupation assessment sheet"
        ],
        documents: [
          "Completed Vocational Training Certificate or engineering college diploma",
          "Legally binding work contract/job offer with detailed salary and task lists inside Austria",
          "Employer Declaration Form (Arbeitgebererklärung) completed by the Austrian employer",
          "Certificates of employment from previous employers describing exact task descriptions",
          "Language proficiency certificates (German A1/A2/B1 or English IELTS)"
        ],
        steps: [
          "Check Shortage Occupations: Verify if your job class is on the annual national or regional Austria shortage list.",
          "Secure an Offer: Partner with Austrian recruiters or employers to obtain structured employment.",
          "Point Test & File: Lodge the complete points-certified dossier with the local Austrian embassy or directly with the local residency authority."
        ],
        benefits: [
          "Direct, swift route to Austrian residency tied to in-demand industrial and engineering careers",
          "Full local health and social security integration, ensuring complete safety for matching dependents",
          "Spouse receives free, open work authorization inside Austria shortly after arrival"
        ],
        duration: "3 - 5 Months",
        cost: "€160 visa & application registry toll",
        experienceNeeded: "At least 1-2 years of experience within the specific shortage discipline",
        englishReq: "German language skills are heavily valued (A1 minimum) or IELTS 5.5+"
      },
      {
        id: "red-white-red-other-key-workers",
        title: "RWR Card for Other Key Workers",
        badge: "Salary-Regulated Professional Class",
        overview: "The Red-White-Red Card for Other Key Workers is designed for skilled third-country professionals who possess specialized skills not listed on the shortage occupation index, but meet specific minimum salary thresholds.",
        pointsSystem: true,
        minPoints: 50, // out of 75
        eligibility: [
          "Must secure a job offer with an Austrian employer that meets the legal minimum monthly gross salary",
          "Minimum Salary (2025/2026 guidelines): €3,078 EUR gross per month (for applicants of all ages)",
          "Must score at least 50 points out of 75 on the Key Workers scoring system"
        ],
        documents: [
          "Accredited University Degree or advanced professional training certificates",
          "Binding Austrian Employment Contract proving gross salary criteria is strictly met or exceeded",
          "Arbeitgebererklärung (detailed employer declaration matching local marketplace rates)",
          "Employment history verification from official tax or social security bodies",
          "CEFR German or English Language proof cards"
        ],
        steps: [
          "Receive Compliant Offer: Secure an employment package meeting the legal minimum wage for Austrian key workers.",
          "Verify Points: Audit characteristics (age, degree, languages, experience) against the 50-point threshold.",
          "Lodge with Embassy: The embassy routes documents to the Austrian Public Employment Service (AMS) for evaluation."
        ],
        benefits: [
          "Offers a flexible pathway to Austria even for non-shortage list job classes based on salary",
          "Includes full family visa rights for spelling pathways to permanent settlement in Central Europe",
          "Conversion to Red-White-Red Plus (free Austrian job market access) after 24 months of compliant employment"
        ],
        duration: "3 - 6 Months",
        cost: "€160 application fee",
        experienceNeeded: "2+ Years of specialized professional experience",
        englishReq: "IELTS 6.0+ or CEFR B1 level, or basic conversational German"
      }
    ]
  },
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    code: "CAN",
    heroBg: "from-amber-950 via-red-950 to-stone-900",
    accentColor: "border-red-600 bg-red-50 text-red-700",
    summary: "Canada's Express Entry and provincial programs remain the global standard for seamless, predictable, and welcoming economic relocation.",
    description: "Immigration, Refugees and Citizenship Canada (IRCC) operates Express Entry, a highly organized electronic selection system that manages applications for skilled workers, and collaborates directly with provinces to allocate Provincial Nominations.",
    streams: [
      {
        id: "federal-skilled-worker",
        title: "Federal Skilled Worker Program",
        subclass: "FSWP",
        badge: "Express Entry Core Program",
        overview: "The Federal Skilled Worker Program (FSWP) is managed under Canada's Express Entry. It is designed for skilled workers worldwide who have significant foreign work experience and matching high human capital rankings.",
        pointsSystem: true,
        minPoints: 67, // out of 100 on the FSWP grid, then entered into Comprehensive Ranking System (CRS)
        eligibility: [
          "Must meet the minimum requirement of 1 year of continuous, full-time paid work experience within the past 10 years (TEER category 0, 1, 2, or 3)",
          "Must score at least 67 points out of 100 on the FSW selection grid (assessing age, language, degree, and adaptability)",
          "Must demonstrate English or French proficiency at CLB (Canadian Language Benchmark) Level 7 or above in all four skills",
          "Must have Completed an Educational Credential Assessment (ECA) for foreign degrees"
        ],
        documents: [
          "ECA Report from a designated body (e.g., WES, IQAS, ICAS)",
          "Official Language Test results (IELTS Academic is not accepted, must use IELTS General Training or CELPIP)",
          "Reference letters from each employer illustrating duties, salary, hours, and duration conforming to TEER codes",
          "Proof of sufficient settlement funds matching family size coordinates",
          "Valid medical exam papers and police records certificates"
        ],
        steps: [
          "Secure ECA and IELTS tests: Complete general examinations and educational equivalency credentials.",
          "Evaluate 67-Points Gate: Verify if your FSW grid score is at or above 67/100 points.",
          "Create Express Entry Profile: Build a profile to be assigned a CRS scores rating out of 1200.",
          "ITA & Lodging: When IRCC holds Express Entry draws, individuals matching cutoffs are issued an ITA to file a full PR application."
        ],
        benefits: [
          "Direct route to unconditional Permanent Residency status in Canada before landing",
          "Freedom to live, work, and study anywhere in Canada (excluding Quebec, which operates its own system)",
          "High-standard social safety nets, free public healthcare, and free public schooling for dependents",
          "Eligible to apply for Canadian Citizenship after spending 3 years (1,095 days) in Canada"
        ],
        duration: "6 - 8 Months after ITA receipt",
        cost: "$1,520 CAD (Application fee + Right of PR Fee for primary applicant)",
        experienceNeeded: "Minimum 1 Year continuous skilled history (More years enhance CRS score)",
        englishReq: "IELTS General Training with minimum CLB 7 (Minimum 6.0 in each band) – higher scores highly recommended"
      },
      {
        id: "canadian-experience-class",
        title: "Canadian Experience Class",
        subclass: "CEC",
        badge: "In-Canada Experienced Class",
        overview: "The Canadian Experience Class (CEC) is tailored for skilled workers who have already acquired in-Canada work experience. This pathway is perfect for international graduates and temporary foreign workers in Canada.",
        pointsSystem: true,
        minPoints: 450, // Evaluated directly on CRS draw cutoffs
        eligibility: [
          "Must have at least 1 year of skilled work experience in Canada within the last 3 years (TEER 0, 1, 2, or 3)",
          "Canadian work experience must have been earned while holding proper work authorization (e.g., PGWP, LMIA)",
          "Must meet the language levels required for the job TEER (CLB 7 for TEER 0/1; CLB 5 for TEER 2/3)"
        ],
        documents: [
          "Canadian T4 tax slips, Notice of Assessments (NOA), and employer contracts verifying in-Canada time",
          "Official IELTS General or CELPIP language scorecard",
          "Valid Work Permit document copies and academic credential references (if claiming points)",
          "Completed medical check records and police clearance files"
        ],
        steps: [
          "Acquire Canada Work Experience: Complete 1 year of continuous or cumulative full-time skilled work.",
          "Enter Express Entry Pool: Create an online portal profile tracking your CRS score coordinates.",
          "Secure ITA: IRCC holds program-specific draws or general draws. Secure the invite.",
          "Lodge PR: Submit full documentation digitally with accelerated processing times."
        ],
        benefits: [
          "Exempt from proving settlement funds, reducing complex financial bank-holding requirements",
          "Extremely high success rates due to pre-existing adaptation in the local Canadian labor force",
          "Smooth transition from temporary status to citizenship within a predictable timeline"
        ],
        duration: "4 - 6 Months",
        cost: "$1,520 CAD application toll",
        experienceNeeded: "1 Year of in-Canada skilled work experience",
        englishReq: "CLB 7 (IELTS 6.0+) for high-skill TEER, or CLB 5 (IELTS 5.0/4.0) for trade TEER classes"
      },
      {
        id: "provincial-nominee-program",
        title: "Provincial Nominee Program",
        subclass: "PNP",
        badge: "Province-Sponsored PR Allocation",
        overview: "The Provincial Nominee Program (PNP) allows Canadian provinces and territories to nominate individuals who wish to immigrate to Canada and are interested in settling in a specific province. It awards an instant 600 CRS points.",
        pointsSystem: true,
        minPoints: 600, // Offers 600 points boost in Express Entry
        eligibility: [
          "Must meet the specific requirements of the nominating province or territory (e.g., Ontario, BC, Alberta)",
          "Must possess the skills, education, and work experience needed to contribute directly to the province's economy",
          "Must intend to live and establish yourself in the nominating province"
        ],
        documents: [
          "Provincial Nomination Certificate (Nomination document issued by the PNP office)",
          "Educational assess papers, foreign work details, and matching language test report files",
          "Province-specific settlement plan indicating family housing and community integration intention"
        ],
        steps: [
          "Identify PNP Pathways: Research provinces with matching skilled programs or express entry streams.",
          "Submit Expression of Interest to Province: Complete provincial registration folders (e.g., OINP, BC PNP).",
          "Receive Provincial Nomination: Secure official nomination, immediately adding 600 points to your Express Entry CRS profile.",
          "Receive ITA & Settle IRCC PR: Lodge visa papers with IRCC for expedited final processing."
        ],
        benefits: [
          "Guarantees an invitation (ITA) in the very next Express Entry draw due to the massive 600 points allocation",
          "Provides pathways for candidates with lower independent CRS points who have highly targeted vocational skills",
          "Direct settlement support and local community assistance provided by the nominating province"
        ],
        duration: "10 - 15 Months (varies by province and submission method)",
        cost: "$1,520 CAD federal fee + varying provincial fees ($300 - $1,500 CAD)",
        experienceNeeded: "1 - 3 Years of specialized industry experience",
        englishReq: "IELTS General CLB 5 to CLB 7 depending on provincial program rules"
      }
    ]
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    code: "DEU",
    heroBg: "from-stone-900 via-amber-950 to-neutral-950",
    accentColor: "border-amber-500 bg-amber-50 text-amber-800",
    summary: "Germany's newly updated Skilled Immigration Act makes the European powerhouse highly accessible, introducing point-based job seeking and highly favorable Blue Card limits.",
    description: "The Federal Republic of Germany provides efficient, highly standardized immigration routes targeting engineers, IT experts, healthcare specialists, and non-academic vocational trades seeking to establish legal careers.",
    streams: [
      {
        id: "opportunity-card",
        title: "Opportunity Card",
        subclass: "Chancenkarte",
        badge: "Point-Restricted 1-Year Job Seeker",
        overview: "The newly introduced Opportunity Card (Chancenkarte) allows skilled workers from non-EU countries to come to Germany for up to one year to look for suitable employment. It operates on a point system reflecting qualification, languages, and age.",
        pointsSystem: true,
        minPoints: 6, // out of 14 points on the Chancenkarte grid
        eligibility: [
          "Must have a foreign degree/vocational qualification that is state-recognized in Germany, OR earn at least 6 points on the Chancenkarte table",
          "Must possess German skills (at least A1 CEFR level) OR English skills (at least B2 CEFR level)",
          "Must demonstrate sufficient financial resources to cover your stay in Germany (approximately €1,027 per month, protected through a blocked bank account)"
        ],
        documents: [
          "Anerkennung (German Recognition assessment) or proof of dual vocational/academic degrees",
          "IELTS General (B2/6.5 equivalent) or Goethe Institute German A1/A2/B1/B2 certs",
          "Blocked account statement (Sperrkonto) proving hold of sufficient funds (€12,300+ for 1 year)",
          "Basic valid German health insurance policy coverage documentation",
          "Curriculum Vitae highlighting academic and professional history"
        ],
        steps: [
          "Verify Points: Audit characteristics using the Chancenkarte points grid to ensure 6 points requirement is reached.",
          "Secure Blocked Account: Transfer necessary funds into a German blocked bank account.",
          "Embassy Lodge: Lodge Chancenkarte paper forms at the German embassy in your home country.",
          "Arrive & Search: Live in Germany for 1 year with options to engage in up to 20 hours/week of trial work."
        ],
        benefits: [
          "Enter Germany without a pre-existing job contract or sponsor company",
          "Authorization to work up to 20 hours per week in any casual job while looking for permanent high-skilled opportunities",
          "Option to transition directly into a long-term Work Visa or EU Blue Card on the spot once a contract is signed"
        ],
        duration: "1 - 3 Months",
        cost: "€75 embassy processing fee",
        experienceNeeded: "2+ Years of vocational or professional background",
        englishReq: "English IELTS 6.0/6.5 (B2) OR German language A1/A2 is mandatory"
      },
      {
        id: "work-visa-professionals",
        title: "Work Visa for Qualified Professionals",
        badge: "Contract-Tied Professional Visa",
        overview: "The Work Visa for Qualified Professionals is designed for skilled personnel who have achieved a recognized university degree or qualified vocational training, and have already secured a concrete job contract from a German employer.",
        pointsSystem: false,
        eligibility: [
          "Must hold an academic degree or vocational training certificate that is officially recognized as equivalent to a German qualification (Anerkennung)",
          "Must have a concrete, detailed job offer from a company physically registered in Germany",
          "The job offer must match your specific academic or vocational qualification scope"
        ],
        documents: [
          "Equivalency Statement from the Central Office for Foreign Education (ZAB) or Anabin printout",
          "Binding Job Contract signed by the German employer with clear salary grids",
          "Declaration on the Employment Relationship form (Erklärung zum Beschäftigungsverhältnis)",
          "Official passport, passport photos, and vocational transcripts translated to German",
          "Goethe Institute language certificates (if required by job nature)"
        ],
        steps: [
          "Obtain Recognition: Verify degree equivalency via the Anabin database or ZAB evaluation forms.",
          "Secure Contract: Apply for jobs and secure a binding offer corresponding to your skillset.",
          "Lodge Visa: Apply at the resident German consulate. The consulate coordinates with the local Federal Employment Agency (BA) for standard dispatch."
        ],
        benefits: [
          "Direct route to high-paying careers in Germany with immediate state residence authorization",
          "Spouse and children are granted unrestricted work and school permits automatically",
          "Eligible to apply for permanent settlement permit (Niederlassungserlaubnis) in Germany after just 3-4 years"
        ],
        duration: "2 - 4 Months",
        cost: "€75 registry fee",
        experienceNeeded: "Degree/Vocational qualification matches the professional work context",
        englishReq: "Dependent on job contract specifications (No mandatory embassy test if employer waives it)"
      },
      {
        id: "eu-blue-card",
        title: "EU Blue Card",
        subclass: "Blaue Karte EU",
        badge: "Elite High-Salaried Professional Class",
        overview: "The EU Blue Card is the premier entry and residence permit for university graduates from non-EU countries. It features low minimum salary thresholds, particularly in bottleneck professions such as IT, engineering, and mathematics.",
        pointsSystem: false,
        eligibility: [
          "Must hold a recognized higher education degree (equivalent to a German university degree)",
          "Must have a binding employment contract in Germany with a minimum gross annual salary",
          "Standard Salary Limit (2024/2025): €45,300 gross per year",
          "Bottleneck Professions (IT, natural sciences, engineering, human medicine): €41,041 gross per year"
        ],
        documents: [
          "German or recognized comparable university diploma with official transcripts",
          "Detailed German Employment Contract stating gross salary meeting Blue Card parameters",
          "Erklärung zum Beschäftigungsverhältnis completed by the sponsoring corporate body",
          "German language skills certificates (unnecessary if English is the primary trade language of the firm)"
        ],
        steps: [
          "Anabin Check: Validate your university and degree status (must be rated H+ on the Anabin index).",
          "Sign Contract: Secure a position in Germany with a salary meeting the required thresholds.",
          "Lodge Visa: Apply at the consulate or immigration office. Blue Card processing benefits from statutory fast-track queues."
        ],
        benefits: [
          "Fastest track to Permanent Settlement (PR): Eligible for PR helper status after just 21 months with German B1, or 27 months with basic German A1",
          "Unrestricted right to transition to other EU countries for business and employment after short periods",
          "Facilitated and expedited family reunification workflows without language demands for spouses"
        ],
        duration: "3 - 6 Weeks (Fast-tracked)",
        cost: "€100 application registry charge",
        experienceNeeded: "Academic degree holder (Relevant professional experience can substitute degree in IT fields)",
        englishReq: "No legal minimum required if the corporate language of the hiring firm is English"
      }
    ]
  },
  {
    id: "newzealand",
    name: "New Zealand",
    flag: "🇳🇿",
    code: "NZL",
    heroBg: "from-slate-900 via-indigo-950 to-blue-950",
    accentColor: "border-indigo-500 bg-indigo-50 text-indigo-700",
    summary: "New Zealand's points-based Skilled Migrant Category and flexible residence pathways offer high-quality lifestyle avenues in the southern hemisphere.",
    description: "Immigration New Zealand operates structured, high-success resettlement pipelines for qualified specialists, skilled trade personnel, and family sponsors wanting secure access to the country's public healthcare, schooling, and clean natural ecosystems.",
    streams: [
      {
        id: "skilled-migrant-smc",
        title: "Skilled Migrant Category",
        subclass: "Points-Based SMC",
        badge: "Points‑based Skilled Migrant Category",
        overview: "The Skilled Migrant Category is a point-regulated framework targeting skilled workers whose employment contributes to New Zealand's economic growth. Candidates must meet the 6-point SMC threshold through NZ registered professional status, academic qualifications, or high-income brackets.",
        pointsSystem: true,
        minPoints: 6,
        eligibility: [
          "Must secure an active skilled job offer or current employment in NZ with compliant hourly wages matching median wage scales",
          "Must meet the statutory 6-point threshold through recognized qualifications, high-paying career experience, or official professional registrations",
          "Must be aged 55 or under at the time of application submission",
          "Must demonstrate competent English language skills (IELTS General 6.5 minimum score or equivalent)",
          "Must meet health and character/integrity check guidelines"
        ],
        documents: [
          "Official New Zealand employment agreement detailing full-time duties",
          "NZQA Academic Credential Assessment report (unless degree falls under exemption database)",
          "Valid IELTS General or TOEFL proficiency certificate with compliant scores",
          "Sealed police character certificates from all countries lived in for 12+ months within the last decade",
          "Sealed medical exam packet including chest X-ray and practitioner review certificates"
        ],
        steps: [
          "Assess Points Model Score: Audit your educational credentials and NZ job offer metrics against the 6-point SMC scale.",
          "File Expression of Interest (EOI): Register your complete profile details online with Immigration New Zealand.",
          "Respond to Invitation: Once INZ reviews the EOI registry and automatically invites you (ITA), submit complete certified evidence within 4 months."
        ],
        benefits: [
          "Indefinite authorization to live, work, and study anywhere across New Zealand",
          "Access to state-funded public medical services and public primary/secondary schools for kids",
          "Straightforward, structured pathway to apply for full NZ Citizenship after 5 residency years"
        ],
        duration: "6 - 10 Months",
        cost: "$4,290 NZD application fee",
        experienceNeeded: "1+ Years post-qualification skilled work",
        englishReq: "IELTS Minimum 6.5 overall band score (General or Academic)"
      },
      {
        id: "work-to-residence-greenlist",
        title: "Work‑to‑residence",
        subclass: "Green List Tier 2",
        badge: "Residence after 24 months of working",
        overview: "The Work-to-Residence pathway allows skilled specialists holding authorized job offers under the New Zealand Green List Tier 2 framework to transition directly into unconditional permanent residency after completing 2 years of accredited local employment.",
        pointsSystem: false,
        eligibility: [
          "Must hold a genuine, full-time job offer in an occupation currently featured on Green List Tier 2 (e.g., specialized medical, teaching, or trade roles)",
          "Hiring New Zealand organization must hold active, valid Accredited Employer status with INZ",
          "Must successfully work in the designated qualifying role for at least 24 months continuous",
          "Must satisfy standard national health and character parameters"
        ],
        documents: [
          "Accredited NZ employer agreement matching current Green List occupation titles",
          "Relevant professional registrations or certified academic degrees",
          "Consecutive IRS-equivalent tax files (IRD summaries) and monthly payslips proving continuous NZ work duration",
          "Police certificates from home country and New Zealand authorities",
          "IELTS or PTE academic report verifying required English thresholds"
        ],
        steps: [
          "Secure Green List Placement: Search and apply with Accredited NZ Employers to secure a Tier 2 contract.",
          "Accumulate Kiwi Work Experience: Execute consistent, high-standard professional duties for 2 full consecutive years.",
          "Submit Residence Application: Lodge the complete permanent residency application with INZ upon meeting the 2-year workload milestone."
        ],
        benefits: [
          "Bypasses standard points-assessment grids completely for a direct, stress-free route to PR",
          "Ensures full work authorization for joined spouses and primary public school rights for children",
          "Establishes deep community roots in New Zealand's peaceful regional environments"
        ],
        duration: "3 - 6 Months",
        cost: "$3,610 NZD government fee",
        experienceNeeded: "2 Years continuous skilled work inside NZ",
        englishReq: "IELTS Minimum 6.5 overall band score for primary applicant"
      },
      {
        id: "family-sponsorship-nz",
        title: "Family Sponsorship",
        subclass: "Family Class Stream",
        badge: "Family: partner, dependent child, parent",
        overview: "The Family Sponsorship program enables New Zealand citizens and permanent residents to sponsor their overseas spouses, dependent children, or parents to obtain permanent residency and reunite in New Zealand.",
        pointsSystem: false,
        eligibility: [
          "Sponsor must be an adult NZ Citizen, Permanent Resident, or holding valid Australian Citizenship residing in New Zealand",
          "For Partners: Must prove a genuine, stable relationship while living together for at least 12 months",
          "For Dependent Children: Must be aged 24 or under, single, with no independent children of their own",
          "For Parents: Must receive a formal sponsorship invitation from child, satisfying minimum sponsor income rules"
        ],
        documents: [
          "Proof of sponsor's NZ citizenship or permanent resident status (passports, certificates)",
          "Exhaustive partnership evidence (joint tenancy leases, utility bills, combined bank accounts, photographic chronicles)",
          "Biological or legal birth certificates verifying children or parentage links to the sponsor",
          "Sealed medical checkup reports and home country police certificates for all sponsored relatives"
        ],
        steps: [
          "Register Sponsorship Interest: The NZ resident signs official sponsorship commitments validating financial and housing support.",
          "File Family Application: Gather comprehensive bio-records, joint partnership logs, or kinship evidence and submit online.",
          "INZ Review: Case officers assess authenticity of relationships, schedule phone interviews if required, and issue the residency visas."
        ],
        benefits: [
          "Provides a highly protected, secure path to rejoin loved ones in New Zealand's exceptionally safe environment",
          "Immediate open work access for spouses to contribute to the NZ labor market instantly",
          "Entitles children to immediate free public schooling and healthcare"
        ],
        duration: "5 - 9 Months (Partners) / 12+ Months (Parents)",
        cost: "From $2,750 NZD",
        experienceNeeded: "None (Based entirely on relationship authenticity and sponsor integration)",
        englishReq: "Partners and children are exempt from tests; parents can prepay ESOL lessons if required scores aren't met"
      }
    ]
  },
  {
    id: "uae",
    name: "UAE",
    flag: "🇦🇪",
    code: "ARE",
    heroBg: "from-slate-900 via-emerald-950 to-teal-950",
    accentColor: "border-emerald-500 bg-emerald-50 text-emerald-700",
    summary: "The United Arab Emirates offers ultra-modern, tax-free residencies, including the prestigious Golden Visa and specialized talent programs for global professionals.",
    description: "The Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) of the UAE operates elite, long-term visas designed to attract global investors, executives, and high-tier academic, technical, or athletic talent.",
    streams: [
      {
        id: "uae-employment-visa",
        title: "Employment Visa",
        subclass: "Standard MOHRE Permit",
        badge: "Company-Sponsored Work Residency",
        overview: "The Standard Employment Visa provides third-country professionals with legal residency tied to a registered corporate entity in the UAE. It permits them to live and work in the UAE tax-free with mandatory corporate health coverage.",
        pointsSystem: false,
        eligibility: [
          "Must secure a formal, binding employment contract from an active, registered company inside mainland UAE or its premier Free Zones",
          "Must be of legal working age (18 or above) and pass standard national medical fitness screening",
          "Applicant’s academic certificates must be properly accredited to match the relevant MOHRE skill categories"
        ],
        documents: [
          "Official UAE employment contract copy signed by both employer and employee",
          "Attested university degrees or trade certificates (authenticated by the Ministry of Foreign Affairs and UAE consulate in home country)",
          "Valid national passport copies with clear photo pages",
          "UAE Medical Fitness Certificate (verifying clear test results for HIV, Hepatitis B/C, and Tuberculosis)",
          "Corporate registry documents and active trade license copies of the sponsoring company"
        ],
        steps: [
          "Accept Offer and Receive Entry Permit: Sign standard MOHRE offer papers; the employer registers these online to generate your entry permit visa.",
          "Medical Examination and Biometrics: Fly to the UAE on the entry visa, complete medical blood tests, and register biometrics at an official Federal Identity center.",
          "Stamping and Emirates ID: Fulfill final security review; the ICP issues your work residency sticker and prints your physical Emirates ID card."
        ],
        benefits: [
          "Guarantees 100% tax-free monthly salary enabling significant savings and premium lifestyle options",
          "Gives legal rights to easily sponsor visas for your spouse, children, and domestic helpers",
          "Mandatory health insurance coverage fully managed and sponsored by the employing company"
        ],
        duration: "3 - 6 Weeks (Standard timeline)",
        cost: "Processed and paid entirely by the UAE employer (under strict MOHRE rules)",
        experienceNeeded: "Varies based on job category (typically 1-3 years specialized history)",
        englishReq: "No official test required (corporate English fluency levels apply)"
      },
      {
        id: "uae-investment-property",
        title: "Investment / Property Visa",
        subclass: "Investor Residence",
        badge: "Investment/Property Wealth Residency (3-5 Years)",
        overview: "Designed for global high-net-worth individuals, this program grants long-term residency in the UAE to foreigners who satisfy property acquisition parameters or establish significant corporate entities in Free Zones or Mainland UAE.",
        pointsSystem: false,
        eligibility: [
          "Must buy a residential property in a designated freehold area with a purchase value of at least AED 750,000 (for 2-year visa) or AED 2 Million (for 5-year/Golden Visa)",
          "The property must be fully built, with official ownership confirmed via a direct municipal Title Deed",
          "Property must satisfy minimum equity rules (any existing mortgages must be under strict legal margins)"
        ],
        documents: [
          "Official Title Deed of the residential property issued by the municipal Land Bureau (e.g., Dubai Land Department)",
          "Clear proof of complete payment transition (bank letters, clearing receipts, or developer statement records)",
          "Police Clearance Certificate / Good Conduct certificate issued by local UAE police (such as Dubai Police)",
          "Copy of current national passport and passport-sized color photos of the investor",
          "Active, comprehensive private medical insurance policy valid inside the UAE"
        ],
        steps: [
          "Acquire Eligible Real Estate: Complete buying transactions with registered brokers and receive your certified municipal Title Deed.",
          "Request Police clearance: Apply online on police portals to generate your verified Good Conduct Certificate.",
          "Lodge Residency File: Apply through the Land Department's dedicated immigration team to secure immediate residency approval."
        ],
        benefits: [
          "Establishes a long-term, low-tax operational headquarters in the Gulf's most advanced luxury metropolis",
          "Empowers you to sponsor visa setups for your immediate family members (spouses, children, and parents)",
          "Highly flexible travel guidelines with zero strict limits on physical days inside the country to keep visa active"
        ],
        duration: "2 - 4 Weeks",
        cost: "Approximately AED 13,000 - 16,000 in official fees",
        experienceNeeded: "None (Fulfillment of capital property purchase is the sole metric)",
        englishReq: "None required"
      },
      {
        id: "uae-golden-visa",
        title: "Long‑term visas (Golden Visa)",
        subclass: "Golden Visa Class",
        badge: "Golden Visa (10 Years)",
        overview: "The prestigious UAE Golden Visa is a 10-year, self-sponsored residency scheme. It is granted to high-tier professionals, outstanding researchers, entrepreneurs, property owners, and exceptional students with zero requirements for a third-party corporate employer.",
        pointsSystem: false,
        eligibility: [
          "For Skilled Professionals: Fulfill a basic monthly salary minimum of AED 30,000 under a valid UAE job contract, holding attested degrees",
          "For Real Estate Investors: Fulfill AED 2 Million net property equity purchase",
          "For Outstanding Scientists / PhD Holders: Hold accredited doctoral credentials from world top 100/500 universities in key scientific fields"
        ],
        documents: [
          "Attested doctoral, master's, or bachelor's academic certificates matching specified professional levels",
          "Verified UAE bank statements or MOHRE wage statements proving basic monthly wages of AED 30,000+",
          "A copy of the property Title Deed or developer statements (if applying through the investment track)",
          "ICP-certified medical fitness checkup report",
          "Official passport copies and current visa status documents"
        ],
        steps: [
          "Request Academic Integration: Attest and equivalent university degrees with MOHRE or the Ministry of Education.",
          "Request Nominations: Submit a specialized Golden Visa nomination request online via GDRFA or ICP digital portals.",
          "Fulfill Physical Biometrics: Complete biometrics profiling and medical checks to obtain the elite 10-year Emirates ID card."
        ],
        benefits: [
          "Magnificent 10 years of self-sponsored residency completely untethered from standard employer lock-ins",
          "Unlimited multi-entry travel with zero rules requiring returns within 6 months to keep visas active",
          "Sponsor your spouse, children of any age, and internal household personnel without limits"
        ],
        duration: "2 - 4 Weeks",
        cost: "AED 3000 - 4500 approximate government fees",
        experienceNeeded: "Varies (Senior executives require 5+ years of verified business history)",
        englishReq: "None required"
      },
      {
        id: "uae-green-blue-visa",
        title: "Special talent visa",
        subclass: "Green & Blue Visa Streams",
        badge: "Blue Visa for environmental protection",
        overview: "The UAE Green Visa offers a 5-year self-sponsored residency for skilled freelancers and entrepreneurs, while the newly announced Blue Visa honors environmental protection champions, sustainability pioneers, and circular economy experts.",
        pointsSystem: false,
        eligibility: [
          "For Climate and Environmental Champions (Blue Visa): Must be officially nominated or show verified contributions to climate action, marine conservation, or green tech",
          "For Skilled Freelancers (Green Visa): Hold a freelancer permit from MOHRE with annual freelance income of AED 360,000 for the last 24 months",
          "For Skilled Employees (Green Visa): Master's or Bachelor's graduate with a monthly basic salary of at least AED 15,000"
        ],
        documents: [
          "Attested university degrees or qualifying professional certifications",
          "Documentary records of scientific achievement, ecological research, or sustainability projects (for Blue Visa)",
          "Detailed tax logs, freelance business permits, and verified bank records showing compliant annual revenues",
          "Medical fitness certificate and good behavior records"
        ],
        steps: [
          "Fulfill Environmental/Freelance Status: Obtain direct nomination letters or MOHRE freelancing permits.",
          "Submit Digital Application: Lodge dossier via ICP/GDRFA registry portals specifying Green/Blue categories.",
          "Biometrics and Stamping: Undergo medical blood testing, record biometrics, and secure the physical 5-year ID."
        ],
        benefits: [
          "Enjoy 5 years of self-sponsored residency without needing standard employer sponsorship models",
          "Allows sponsoring immediate family members for identical 5-year residence durations",
          "Highly generous 6-month grace periods to stay or transition in the UAE after visa expiry"
        ],
        duration: "3 - 5 Weeks",
        cost: "AED 2,500 - 3,800 approximate fees",
        experienceNeeded: "2+ Years of freelancing or active environmental stewardship",
        englishReq: "None required"
      }
    ]
  },
  {
    id: "china",
    name: "China",
    flag: "🇨🇳",
    code: "CHN",
    heroBg: "from-slate-900 via-red-950 to-neutral-950",
    accentColor: "border-red-500 bg-red-50 text-red-700",
    summary: "China offers structured work, elite study, and specialized talent pipelines (R Visa) for foreign experts wishing to contribute to the economic development of its major provinces.",
    description: "The National Immigration Administration (NIA) of the People's Republic of China operates highly secure, structured entry permits ranging from high-level corporate work visas (Z) and academic study visas (X) to the elite Category A Talent Visa (R) for global experts.",
    streams: [
      {
        id: "china-work-visa-z",
        title: "Work visa (Z)",
        subclass: "Z Visa Class",
        badge: "Work-Tied Resident Permit",
        overview: "The Z Visa is the core, legally mandated visa for third-country specialists who have secured a state-sanctioned employment contract inside mainland China, leading directly to a localized Residence Permit.",
        pointsSystem: false,
        eligibility: [
          "Must secure a formal employment invitation from a legally registered company authorized to hire foreign workers in China",
          "Must obtain an official Foreigner Work Permit Notification letter from the Ministry of Science and Technology",
          "Must be aged between 18 and 60 (for males) or 18 and 55 (for females), holding clean records"
        ],
        documents: [
          "Foreigner's Work Permit Notification document (online barcoded letter issued by local SAFEA)",
          "Degree attestation from Chinese Embassy/Consulate and Home Ministry of Education",
          "Clean international police clearance search records from native country",
          "Standard PRC-format physical medical examination certificate",
          "Formal company invitation letter (authorized unit invitation)"
        ],
        steps: [
          "SAFEA System Entry: Sponsoring company uploads your resume and degree files to retrieve your official Foreigner Work Notification.",
          "Embassy Passport Submission: Take the Work Permit Notification to your home Chinese consulate to have your Z Entry Visa stamped.",
          "Convert to Residence Permit: Fly to China and, within 30 days, complete a local medical check to convert Z status to a long-term Residence Permit."
        ],
        benefits: [
          "Grants secure operational rights to live and build advanced careers inside China's leading global hubs (Shanghai, Beijing, Shenzhen)",
          "Protects employees under state labor frameworks with complete employer-sponsored insurance coverage",
          "Gives straightforward paths to apply for family visas (S1/S2) for accompanying dependents"
        ],
        duration: "4 - 6 Weeks",
        cost: "$140 - $250 USD (varies by applicant nationality)",
        experienceNeeded: "Minimum 2 Years of post-graduation professional work history",
        englishReq: "Varies (not required unless target job dictates language requirements)"
      },
      {
        id: "china-study-visa-x",
        title: "Study visa (X1/X2)",
        subclass: "X1/X2 Visa Class",
        badge: "Academic Student Visa",
        overview: "X1 (Long-term, >180 days) and X2 (Short-term, <180 days) Study Visas are designed for international students admitted into state-accredited Chinese universities, language programs, or research centers.",
        pointsSystem: false,
        eligibility: [
          "Must receive an official Admission Letter from a state-approved Chinese university or educational institute",
          "Must hold a state-regulated Visa Application for Study in China form (JW201 or JW202 form)",
          "Must meet the baseline age and health credentials specified by Chinese immigration authorities"
        ],
        documents: [
          "Original University Admission Notice letter with official school stamps",
          "Official JW201 or JW202 form (government-authorized scholarship or self-funded international student form)",
          "PRC Physical Examination Record for Foreigners",
          "Proof of sufficient financial means to cover tuition and Chinese living costs",
          "National identification documentation and visa history copies"
        ],
        steps: [
          "University Admissions: Perfect your university applications to secure enrollment and obtain your admission document and JW201/202 form.",
          "Lodge Consular Visa: Complete standard physical exams and submit original JW/Notice forms to the Chinese Embassy.",
          "Activate Residence Permit: Fly to China and convert your X1 visa to a physical Student Residence Permit within 30 days of arrival."
        ],
        benefits: [
          "Provides access to highly regarded, state-of-the-art campuses, often fully funded through Chinese Government Scholarships",
          "Allows seamless integration into China's world-class university research facilities and laboratories",
          "Allows student part-time work or internship opportunities under university registration rules"
        ],
        duration: "2 - 4 Weeks",
        cost: "$100 - $180 USD",
        experienceNeeded: "None (Requires active student enroll documents)",
        englishReq: "Not legally required (Subject to school medium instruction rules)"
      },
      {
        id: "china-family-reunion-q",
        title: "Family reunion (Q1/Q2)",
        subclass: "Q1/Q2 Visa Class",
        badge: "Family Reunion Visa",
        overview: "Designed for foreign relatives of Chinese citizens, or foreign relatives of foreigners holding permanent residency in China, who wish to enter for family reunification.",
        pointsSystem: false,
        eligibility: [
          "Must be a relative (spouse, parent, child, partner, or sibling) of an active Chinese citizen, or of a foreigner holding a China Green Card",
          "Q1 is for long-term reunion (>180 days), leading to local Residence Permit",
          "Q2 is for short-term visits (up to 180 days per entry) with highly flexible multi-entry terms"
        ],
        documents: [
          "Letter of Invitation written by the relative residing in China",
          "Chinese ID card copy of the sponsor, or foreign passport + Permanent Resident ID card",
          "Original relationship evidence (attested marriage, kinship certificates, or biological birth certificates)",
          "National identification document and visa history copies"
        ],
        steps: [
          "Initiate Family Invitation: Have your relative in China draft and execute a standard formal invitation letter.",
          "Consular Submission: Lodge invitation documents, relationship records, and your passport at the Chinese visa office.",
          "Secure Visa: Collect the visa; if Q1, complete registration at the local PSB Exit & Entry bureau to collect your residence card."
        ],
        benefits: [
          "Enables long-term, unrestricted living and family time in mainland China with loved ones",
          "Q1 residence permit grants unlimited exit and entry privileges without sponsorship renewals",
          "Provides a highly predictable, straightforward application processing flow with minimal audits"
        ],
        duration: "1 - 2 Weeks",
        cost: "$140 - $220 USD",
        experienceNeeded: "None required",
        englishReq: "None required"
      },
      {
        id: "china-talent-visa-r",
        title: "Talent visa (R)",
        subclass: "R Visa Class",
        badge: "Talent visa (R) for high‑level foreign talents",
        overview: "The elite R Visa is a multi-entry, long-term talent visa issued to high-level foreign experts, scientists, Nobel laureates, and leaders in highly specialized industries who are highly needed by the Chinese state.",
        pointsSystem: false,
        eligibility: [
          "Must meet the Category A criteria of the National Foreign Expert Classification Table",
          "Can include senior researchers, scientists in key laboratories, high-tech founders, or individuals recognized as globally outstanding talent",
          "Must receive confirmation as an outstanding expert from the provincial Foreign Experts Bureau"
        ],
        documents: [
          "Confirmation Letter for High-Level Foreign Talents (issued within 5 days by Chinese regional bureau)",
          "Exhaustive resume reflecting patents, scientific awards, credentials, or high-tier leadership achievements",
          "Valid passport copy as well as certified copies of advanced degrees",
          "Standard PRC character search and medical check documents"
        ],
        steps: [
          "Provincial Endorsement: Provincial authorities evaluate expert credentials and issue the dynamic High-Level Talent Letter.",
          "Embassy Fast-Track Z/R: Apply at the Chinese Embassy. R Visa processing is highly prioritized and completely visa-fee-exempt.",
          "Multi-Entry Resident Permit: Receive up to 5-10 years multi-entry visa with single entries up to 180 days."
        ],
        benefits: [
          "Staggering 10-year multi-entry visa with zero visa fees for primary applicant and dependents",
          "Direct pathways to convert to Permanent Residency (China Green Card) after 3 years compliant work",
          "Extremely fast consular clearance, often completed within 3 working days"
        ],
        duration: "3 - 5 Working Days (Fast-Tracked)",
        cost: "Completely Free (Visa fees officially waived by China government)",
        experienceNeeded: "Significant global achievements or leadership history in science/tech/business",
        englishReq: "No language requirement"
      }
    ]
  },
  {
    id: "unitedstates",
    name: "United States",
    flag: "🇺🇸",
    code: "USA",
    heroBg: "from-slate-900 via-blue-950 to-slate-950",
    accentColor: "border-blue-500 bg-blue-50 text-blue-700",
    summary: "The United States offers premier immigration pathways including family-based preferences, employment priority tiers (EB-1 to EB-5), and diversity selection.",
    description: "The United States Citizenship and Immigration Services (USCIS) operates structured immigrant visas leading directly to the physical permanent resident card (Green Card), emphasizing professional talent level, family unity, and diversity.",
    streams: [
      {
        id: "usa-family-based",
        title: "Family‑based immigration",
        subclass: "USCIS Family Track",
        badge: "Immediate relative & preference categories",
        overview: "Allows United States citizens and Lawful Permanent Residents (LPRs) to sponsor their foreign immediate relatives, or specific family preference members, for a lawful green card to reside and work in America.",
        pointsSystem: false,
        eligibility: [
          "Sponsor must be a US Citizen or Lawful Permanent Resident (LPR) aged 18 or above with compliant housing states",
          "Immediate relative class: Spouse, unmarried children under 21, or parents of US Citizens (exempt from annual quotas)",
          "Preference categories: Siblings, married or adult children of US Citizens, and spouses or children of LPRs (subject to priority date bulletin rules)"
        ],
        documents: [
          "Form I-130 (Petition for Alien Relative) filed with USCIS",
          "Form I-864 (Affidavit of Support) verifying sponsor meets 125% of Federal Poverty thresholds",
          "Original marriage certificates, shared asset files, joint leases, or birth records proving biological relation",
          "Completed DS-260 application form and police character summaries",
          "Sealed medical examination report completed by a state-approved civil surgeon"
        ],
        steps: [
          "File Petitions with USCIS: The US sponsor lodges Form I-130 and Form I-864 containing relationship documentation.",
          "National Visa Center (NVC) Stage: When USCIS approves, NVC coordinates required file processing and civil fee clearance.",
          "Attend Consular interview: The applicant completes specialized health checks and attends local consular processing to gain entry."
        ],
        benefits: [
          "Earns unconditional Permanent Residency (Green Card) immediately upon landing on US soil",
          "Completely unrestricted rights to live, work, and study anywhere in the United States",
          "Favorable path to apply for full US Citizenship after holding LPR status for 3 or 5 years"
        ],
        duration: "1 - 2 Years for Immediate / varying timelines for Preference Classes",
        cost: "$675 USCIS Fee + NVC registry fees ($535)",
        experienceNeeded: "None required",
        englishReq: "None required"
      },
      {
        id: "usa-employment-eb",
        title: "Employment‑based immigration",
        subclass: "EB-1 to EB-5 priority levels",
        badge: "Employment-based priority EB1 to EB5",
        overview: "The US immigration framework allocates 140,000 employment-based immigrant visas annually. These are divided into 5 priority levels, matching extraordinary ability (EB-1), advanced degrees (EB-2), skilled trades (EB-3), or job-creating investor capital (EB-5).",
        pointsSystem: false,
        eligibility: [
          "EB-1 Priority: Foreign nationals with extraordinary ability, elite researchers, or international business executives",
          "EB-2 / EB-3 Professionals: Masters degree holders or skilled labor trades (typically requires PERM employer certificate)",
          "EB-5 Investors: Invest minimum capital of $800,000 in a targeted employment area (TEA) creating 10 US jobs"
        ],
        documents: [
          "USCIS Form I-140 (Alien Worker Petition) or USCIS Form I-526 (Standalone Investor Petition)",
          "Approved PERM Labor Certification (Form ETA 9089) issued by the US Department of Labor",
          "Attested university degrees or qualifying vocational training records with foreign evaluations",
          "Detailed, signed employer job offers or reference letters showing continuous career experience",
          "Capital tracing reports and audit sheets establishing lawful source of investment funds (for EB-5)"
        ],
        steps: [
          "PERM Market Test: US Employer conducts national recruiting campaigns to satisfy Dept of Labor shortage criteria (waived for EB-1 and custom EB-2 NIW).",
          "Lodge USCIS Petition: Submit the Form I-140 or I-526 packet matching the rigorous statutory specifications of your professional tier.",
          "Consular / Adjustment of Status: Secure visa allotment via Consulate interviews or file Form I-485 to retrieve your physical Green Card."
        ],
        benefits: [
          "Secures a durable future inside the world’s largest and highest-paying professional marketplace",
          "Allows immediate spouse work authorization (under EB/H4 settings) and public schooling for minor kids",
          "Direct route to unconditional US Naturalization and passport ownership after 5 years"
        ],
        duration: "1 - 3 Years depending on priority level and visa bulletin limits",
        cost: "$715 USCIS filing fee + PERM administrative costs",
        experienceNeeded: "Track dependent (Exemplary international credentials for EB-1; 1-5 years for EB-2/3)",
        englishReq: "No legal test mandate (corporate expectations apply)"
      },
      {
        id: "usa-humanitarian",
        title: "Humanitarian / Refugee & Asylum",
        subclass: "Humanitarian Category",
        badge: "Humanitarian: for refugees & asylees",
        overview: "Provides legal permanent residency pathways to individuals who have suffered persecution, or have a well-founded fear of persecution in their native countries based on race, religion, nationality, social group, or political standing.",
        pointsSystem: false,
        eligibility: [
          "Must satisfy the statutory legal definition of a refugee under international human rights law",
          "Refugee status: Processed while the applicant is physically outside the United States",
          "Asylee status: Lodged within 1 year of physically arriving inside United States borders",
          "Must present believable evidence of credible fear supported by country summaries or legal testimony"
        ],
        documents: [
          "Form I-589 application for Asylum and withholding of removal (for asylees)",
          "Extensive personal account describing exact instances of persecution or threats",
          "Independent local human rights summaries (UNHCR, State Dept archives) supporting the regional crisis",
          "Personal identification records, biographical summaries, and passport files"
        ],
        steps: [
          "File Petitions with USCIS: Present Form I-589 online or register dossier with UNHCR representatives abroad.",
          "USCIS Interview: Attend in-depth, structured testimonies with USCIS Asylum Officers or immigration judges.",
          "Adjust to Green Card: Successfully approved refugees or asylees can apply for permanent LPR status after 1 year."
        ],
        benefits: [
          "Full, state-protected integration inside the United States away from active violence or persecution",
          "Immediate legal authorization to secure employment and eligibility for official federal resettlement aids",
          "Right to sponsor direct relatives and adjust to permanent Lawful Resident status"
        ],
        duration: "Varies significantly (typically 1 to 5+ years depending on judicial processing backlogs)",
        cost: "$0 (Completely free with no filing fees for humanitarian asylum applicants)",
        experienceNeeded: "None required",
        englishReq: "None required"
      },
      {
        id: "usa-diversity-visa",
        title: "Diversity Visa (Green Card Lottery)",
        subclass: "DV-Lottery Program",
        badge: "Diversity Visa Lottery Stream",
        overview: "US Congress authorizes 55,000 Green Cards annually through a random electronic lottery scheme, targeting citizens of nations with historically low levels of immigration to the United States.",
        pointsSystem: false,
        eligibility: [
          "Must be a native of an eligible country with lower rates of immigration to the US",
          "Must fit education/trade parameters: At least high school graduation, OR 2 years of work in a high-skill trade requiring 2 years tool training"
        ],
        documents: [
          "A copy of the online entry submission confirmation page containing your digital confirmation number",
          "Official high school credentials or industrial employment records",
          "Consular DS-260 application form copies, certified police certificates, and personal bio records",
          "Consular medical reports completed by civil surgeons"
        ],
        steps: [
          "Register Entry Online: Complete electronic registrations with photos in the official State Department lottery window.",
          "Monitor May Selection Selection: Log in to the electronic portal with your confirmation code to verify selection.",
          "File DS-260 and Complete Interview: Submit DS-260, monitor the Case Number in the visa bulletins, and execute consular interviews."
        ],
        benefits: [
          "Direct Lawful Permanent Residency (Green Card) without needing employer sponsorship or family ties in America",
          "Extremely low-cost permanent visa entry route for lucky selected candidates",
          "All selection-aligned immediate family members (spouse & children) retrieve Green Cards together"
        ],
        duration: "1.5 - 2 Years (from lottery enrollment up to physical visa print)",
        cost: "Free electronic registration; $330 consular visa charge if selected and interviewed",
        experienceNeeded: "High school graduation or 2 years qualifying career history",
        englishReq: "None required"
      }
    ]
  }
];

export default function ImmigrationPages({ currentPath, onNavigate, onConsult }: ImmigrationPagesProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [selectedStream, setSelectedStream] = useState<VisaStream | null>(null);

  useEffect(() => {
    // Parse the path to determine current view state
    // Formats:
    // /immigration
    // /immigration/:countryId
    // /immigration/:countryId/:streamId
    const parts = currentPath.split("/").filter(Boolean);
    
    // parts[0] is "immigration"
    if (parts.length === 1) {
      setSelectedCountry(null);
      setSelectedStream(null);
    } else if (parts.length === 2) {
      const countryId = parts[1].toLowerCase();
      const country = IMMIGRATION_DATA.find(c => c.id === countryId);
      if (country) {
        setSelectedCountry(country);
        setSelectedStream(null);
      } else {
        setSelectedCountry(null);
        setSelectedStream(null);
      }
    } else if (parts.length === 3) {
      const countryId = parts[1].toLowerCase();
      const streamId = parts[2].toLowerCase();
      
      const country = IMMIGRATION_DATA.find(c => c.id === countryId);
      if (country) {
        setSelectedCountry(country);
        const stream = country.streams.find(s => s.id === streamId);
        if (stream) {
          setSelectedStream(stream);
        } else {
          setSelectedStream(null);
        }
      } else {
        setSelectedCountry(null);
        setSelectedStream(null);
      }
    } else {
      setSelectedCountry(null);
      setSelectedStream(null);
    }
    
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentPath]);

  const handleBackToOverview = () => {
    onNavigate("/immigration");
  };

  const handleBackToCountry = () => {
    if (selectedCountry) {
      onNavigate(`/immigration/${selectedCountry.id}`);
    } else {
      onNavigate("/immigration");
    }
  };

  // 1. Individual Visa Detailed View
  if (selectedCountry && selectedStream) {
    return (
      <div className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-brand-gold-500 selection:text-brand-blue-950">
        
        {/* POLISHED HERO SECTION FOR SPECIFIC VISA STREAM */}
        <section className={`relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br ${selectedCountry.heroBg} text-white overflow-hidden`}>
          {/* Grids and flares */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0" />
          <div className="absolute -top-32 right-[-10%] w-[450px] h-[450px] rounded-full bg-brand-gold-500/10 blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back to Country link breadcrumb */}
            <button 
              onClick={handleBackToCountry}
              className="inline-flex items-center gap-2 text-white/70 hover:text-brand-gold-400 font-bold text-xs uppercase tracking-wider mb-6 transition focus:outline-none cursor-pointer group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to {selectedCountry.name} Programs</span>
            </button>

            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-brand-gold-400 text-[10px] font-bold tracking-wider uppercase">
                <span>{selectedCountry.flag} {selectedCountry.name} IMMIGRATION</span>
                {selectedStream.subclass && (
                  <>
                    <span className="text-white/35">|</span>
                    <span className="text-white font-mono">{selectedStream.subclass}</span>
                  </>
                )}
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white select-text">
                {selectedStream.title}
              </h1>
              
              <p className="font-semibold text-brand-gold-400 font-mono text-xs sm:text-sm uppercase tracking-widest">
                🏆 Program Status: {selectedStream.badge}
              </p>

              <p className="text-base sm:text-lg text-brand-blue-100 max-w-3xl leading-relaxed select-text pt-2">
                {selectedStream.overview}
              </p>

              {/* Core Visa KPI badgets row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-left">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">Time Duration</span>
                  <span className="text-sm sm:text-base font-bold text-brand-gold-400 mt-1 block">{selectedStream.duration}</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">Application Cost</span>
                  <span className="text-sm sm:text-base font-bold text-white mt-1 block">{selectedStream.cost}</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">Experience</span>
                  <span className="text-sm sm:text-base font-bold text-white mt-1 block">{selectedStream.experienceNeeded}</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">English Level</span>
                  <span className="text-sm sm:text-base font-bold text-white mt-1 block font-sans">{selectedStream.englishReq}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VISA DETAIL MAIN BODY CONTENT */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Visual Details modules */}
              <div className="lg:col-span-8 space-y-12">
                
                {/* 1. Points System Callout or Info Guard */}
                {selectedStream.pointsSystem && (
                  <div className="bg-gradient-to-r from-blue-50 to-sky-50 border border-sky-100 rounded-3xl p-6 sm:p-8 flex items-start gap-4 shadow-sm">
                    <div className="p-3 bg-white rounded-2xl shadow-sm border border-sky-100 text-sky-600">
                      <Award className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-extrabold text-lg text-slate-900">
                        Points-Engineered Migration Selection
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed select-text">
                        This {selectedCountry.name} pathway operates under a rigorous competitive assessment grid. To become eligible, your profile needs to fulfill the regulatory baseline factor weight (such as a minimum score of <span className="font-extrabold text-sky-700">{selectedStream.minPoints} points</span>) encompassing certified indices like age bracket, academic ranks, language fluency levels, and career history years.
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. Structured Eligibility Criteria */}
                <div id="criteria-section" className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="h-10 w-10 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center">
                      <ListChecks className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-xl text-slate-900">Mandatory Eligibility Criteria</h3>
                      <p className="text-[11px] text-slate-500 font-sans tracking-wide">Fulfill these baseline constraints to secure visa submission authorization</p>
                    </div>
                  </div>
                  
                  <ul className="grid grid-cols-1 gap-4">
                    {selectedStream.eligibility.map((item, index) => (
                      <li key={index} className="flex gap-3 text-slate-600 leading-relaxed text-sm select-text">
                        <span className="h-5 w-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
                          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Detailed Document Checklist */}
                 <div id="documents-section" className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="h-10 w-10 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-xl text-slate-900">Required Documentary Evidence</h3>
                      <p className="text-[11px] text-slate-500 font-sans tracking-wide">Must compile officially certified translations matching these classifications</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedStream.documents.map((doc, index) => (
                      <div key={index} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex gap-3 select-text">
                        <div className="h-6 w-6 rounded-lg bg-white shadow-sm border border-slate-200/50 flex items-center justify-center text-slate-500 text-xs font-bold font-mono">
                          {index + 1}
                        </div>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed">{doc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Complete Step-by-Step Action Pathway Process */}
                <div id="process-section" className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="h-10 w-10 bg-sky-50 text-sky-700 rounded-2xl flex items-center justify-center">
                      <Compass className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-xl text-slate-900">Step-by-Step Immigration Roadmap</h3>
                      <p className="text-[11px] text-slate-500 font-sans tracking-wide">Meticulous milestone sequences directed by our specialized caseworkers</p>
                    </div>
                  </div>
                  
                  <div className="relative border-l border-slate-200 ml-4 pl-6 space-y-8 py-2">
                    {selectedStream.steps.map((step, index) => {
                      const [title, desc] = step.split(":");
                      return (
                        <div key={index} className="relative select-text">
                          <span className="absolute -left-[35px] top-0 h-6 w-6 rounded-full bg-brand-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-md">
                            {index + 1}
                          </span>
                          <h4 className="font-display font-extrabold text-sm text-slate-900 mt-0.5">{title.trim()}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1.5">{desc?.trim() || ""}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Core Benefits of Settlement */}
                <div id="benefits-section" className="bg-gradient-to-br from-indigo-950 to-brand-blue-950 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl shadow-indigo-950/10">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="font-display font-bold text-xl text-white">Primacy & Key Settlement Benefits</h3>
                    <p className="text-white/60 text-[11px] font-sans">Why this stream represents an ultimate milestone for your career & family lineage</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedStream.benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-3 text-white/90 select-text">
                        <div className="h-5 w-5 rounded-full bg-brand-gold-500/15 border border-brand-gold-500/30 flex items-center justify-center text-brand-gold-400 flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 stroke-[2.5]" />
                        </div>
                        <p className="text-xs leading-relaxed">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
              
              {/* Right Column: Dynamic Inquiry Widget Sticky Side Card */}
              <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start space-y-6">
                
                {/* 1. Prompt Booking & Prefill Callout Card */}
                <div className="bg-white border-2 border-brand-blue-100 shadow-xl rounded-3xl p-6 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-brand-gold-400/5 rounded-full blur-xl pointer-events-none" />
                  
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest bg-brand-gold-500/10 text-brand-gold-600 border border-brand-gold-500/20 uppercase mb-4 select-none">
                    ⚡ DIRECT ENVOY SUPPORT
                  </span>
                  
                  <h3 className="font-display font-extrabold text-lg text-slate-900 leading-tight">
                    Check Your Case Compatibility Profile
                  </h3>
                  
                  <p className="text-xs text-slate-500 leading-relaxed mt-2.5 select-text">
                    Immigration rules shift dynamically. Reach out to our physical office desks in Lahore, Karachi, or Dubai to check points compatibility, document validation status, and secure standard casework representation options.
                  </p>

                  <div className="pt-4 space-y-3 border-t border-slate-100 mt-5">
                    <button
                      onClick={() => onConsult(`${selectedCountry.name} - ${selectedStream.title}`)}
                      className="w-full py-3 bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-sans font-black text-xs uppercase tracking-wider rounded-xl transition duration-200 shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Contact className="h-4 w-4" />
                      Inquire About This Visa
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
                    <span>Includes 100% Free Initial Assessment</span>
                  </div>
                </div>

                {/* 2. Country Quick Specs Card */}
                <div className="bg-slate-900 text-white rounded-3xl p-6 text-left relative overflow-hidden border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{selectedCountry.name} Metrics</span>
                  <div className="flex items-center gap-3 mt-2 pb-4 border-b border-slate-800">
                    <span className="text-3xl">{selectedCountry.flag}</span>
                    <div>
                      <h4 className="font-display font-extrabold text-base leading-tight">{selectedCountry.name} Government</h4>
                      <p className="text-[10px] text-slate-400 font-mono tracking-wide uppercase">Immigration Hub: {selectedCountry.code}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Primary Language:</span>
                      <span className="font-bold">English / Regional</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">PR Visa Framework:</span>
                      <span className="font-bold text-brand-gold-400 block max-w-[150px] text-right">Points / Contract linked</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Citizenship Option:</span>
                      <span className="font-bold text-emerald-400">Available</span>
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

  // 2. Country Directory / Streams Roster View
  if (selectedCountry) {
    return (
      <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
        
        {/* COUNTRY DIRECTORY HERO BANNER */}
        <section className={`relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br ${selectedCountry.heroBg} text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0" />
          <div className="absolute -top-32 right-[-10%] w-[450px] h-[450px] rounded-full bg-brand-gold-500/10 blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back to all countries link */}
            <button 
              onClick={handleBackToOverview}
              className="inline-flex items-center gap-2 text-white/70 hover:text-brand-gold-400 font-bold text-xs uppercase tracking-wider mb-6 transition focus:outline-none cursor-pointer group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Global Countries Directory</span>
            </button>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3  py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-brand-gold-400 text-xs font-bold tracking-wider uppercase">
                <span>{selectedCountry.flag} IMMIGRATION UNIT</span>
                <span className="text-white/20">|</span>
                <span className="text-white font-mono">{selectedCountry.code} OFFICIAL CHANNELS</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white select-text">
                Immigration to <span className="text-brand-gold-400">{selectedCountry.name}</span>
              </h1>

              <p className="text-base sm:text-lg text-brand-blue-105 leading-relaxed max-w-2xl select-text pt-2">
                {selectedCountry.summary}
              </p>
            </div>
          </div>
        </section>

        {/* VISA PATHWAYS LISTING GRID */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-left space-y-3 max-w-3xl">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight select-text">
                Structured Visa and Residency Programs
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed max-w-2xl select-text">
                Explore the legal pathways available for skilled specialists and academics seeking permanent or professional settlement inside {selectedCountry.name}. Select a designated program to view requirements, timetables, and eligibility structures.
              </p>
            </div>

            {/* Grid of visa streams inside the country */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {selectedCountry.streams.map((stream) => (
                <div 
                  key={stream.id}
                  className="bg-white border border-slate-200 hover:border-brand-blue-300 shadow-lg hover:shadow-2xl rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 relative group"
                >
                  <div className="space-y-4">
                    <span className="inline-block px-2.5 py-1 rounded bg-slate-100/85 text-slate-600 font-mono text-[9px] font-bold uppercase tracking-wider">
                      {stream.subclass || "Economic Stream"}
                    </span>
                    
                    <h3 className="font-display font-extrabold text-lg text-slate-900 tracking-tight group-hover:text-brand-blue-700 transition-colors">
                      {stream.title}
                    </h3>
                    
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-4 select-text">
                      {stream.overview}
                    </p>

                    {/* Features row */}
                    <div className="pt-3 border-t border-slate-150 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Duration Limits:</span>
                        <span className="font-bold text-slate-700">{stream.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Language Requirement:</span>
                        <span className="font-bold text-slate-700 font-sans">{stream.englishReq}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => onNavigate(`/immigration/${selectedCountry.id}/${stream.id}`)}
                      className="inline-flex items-center gap-1 text-xs font-black uppercase text-brand-blue-700 group-hover:text-brand-blue-800 transition-colors cursor-pointer"
                    >
                      View Full Details
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    
                    <button
                      onClick={() => onConsult(`${selectedCountry.name} - ${stream.title}`)}
                      className="px-3.5 py-1.5 bg-slate-100 group-hover:bg-brand-gold-400 text-slate-700 group-hover:text-brand-blue-950 rounded-lg text-[10px] font-bold uppercase transition"
                    >
                      Audit Call
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Strategic Consultation Banner */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-left relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 shadow-xl mt-12">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 to-transparent pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 h-48 w-48 bg-brand-gold-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-4 max-w-xl relative z-10 text-left">
                <span className="px-3 py-1 bg-brand-gold-500/10 text-brand-gold-400 border border-brand-gold-500/20 text-[10px] font-bold tracking-widest uppercase rounded-full">
                  ★ UNLOCK {selectedCountry.name.toUpperCase()} PR BLUEPRINT
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight leading-tight">
                  Unsure which Program matches your active Profile?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed select-text">
                  Our corporate immigration desks employ certified legal representatives. Send us your complete CV structure, educational transcripts, and language card benchmarks. Let's arrange a dedicated strategic evaluation call.
                </p>
              </div>

              <div className="relative z-10 flex-shrink-0 space-y-3 w-full sm:w-auto text-left">
                <button
                  onClick={() => onConsult(`${selectedCountry.name} Immigration Pathways`)}
                  className="w-full sm:w-auto px-6 py-4.5 bg-brand-gold-400 hover:bg-brand-gold-500 text-brand-blue-950 font-sans font-black text-xs uppercase tracking-wider rounded-xl transition duration-300 shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Request Profile Evaluation Call
                  <ChevronRight className="h-4 w-4 stroke-[2]" />
                </button>
              </div>
            </div>

          </div>
        </section>

      </div>
    );
  }

  // 3. Central Immigration Unit Landing Portal (Directory)
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-brand-gold-500 selection:text-brand-blue-950">
      
      {/* DIRECTORY MASTER HERO SECTION */}
      <section className="relative pt-24 pb-16 md:pt-36 md:pb-28 bg-gradient-to-br from-brand-blue-950 via-brand-blue-900 to-slate-950 text-white overflow-hidden">
        {/* flares */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-slate-800/20 blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-6 text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-brand-gold-400 text-xs font-semibold tracking-wider uppercase select-none">
              <Globe className="h-4 w-4 animate-spin" style={{ animationDuration: '24s' }} />
              <span>Certified Global Recruitment & Resettlement Desks</span>
            </span>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none text-white select-text">
              International <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-400 via-brand-gold-500 to-amber-300">Immigration pathways</span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-brand-blue-100 max-w-2xl leading-relaxed select-text">
              Unlock legally aligned permanent residency (PR), trade qualifications, and job-seeking residency permits for high-achieving professionals. We represent profiles across premier economies with verified excellence.
            </p>
          </div>
        </div>
      </section>

      {/* CORE COUNTRIES DIRECTORY LISTING */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-tight select-text">
              Target Resettlement Countries
            </h2>
            <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed select-text">
              We focus on premium, legally predictable immigration frameworks with high standards of living, excellent infrastructure, and strong economic landscapes. Select a country to initiate your review.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {IMMIGRATION_DATA.map((country) => (
              <div 
                key={country.id}
                className="bg-white border border-slate-200/50 hover:border-brand-blue-200 shadow-lg hover:shadow-2xl rounded-3xl p-6.5 text-left flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 relative group"
              >
                {/* Background color block flare */}
                <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl bg-slate-900 transition-colors group-hover:bg-brand-blue-600" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl select-none">{country.flag}</span>
                    <span className="text-[10px] font-bold text-slate-400 font-mono tracking-widest uppercase">{country.code}</span>
                  </div>
                  
                  <h3 className="font-display font-extrabold text-xl text-slate-900 tracking-tight select-text">
                    {country.name}
                  </h3>
                  
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-4 select-text">
                    {country.summary}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider block">Available Pathways:</span>
                    <ul className="mt-1.5 space-y-1">
                      {country.streams.map(s => (
                        <li key={s.id} className="text-[11px] text-slate-600 font-semibold truncate flex items-center gap-1">
                          <span className="h-1 w-1 bg-brand-blue-500 rounded-full" />
                          <span>{s.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate(`/immigration/${country.id}`)}
                    className="inline-flex items-center gap-1 text-xs font-black uppercase text-brand-blue-700 hover:text-brand-blue-800 transition-colors cursor-pointer"
                  >
                    Explore Programs
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Core Trust statistics blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white border border-slate-200/50 p-8 rounded-3xl shadow-sm mt-12 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-display font-black text-brand-blue-700 leading-none">98%</span>
              <h4 className="font-bold text-slate-800 text-sm">Visa Verification approvals</h4>
              <p className="text-xs text-slate-400 max-w-[200px] mx-auto">Expert documentation compiles passing complex audits.</p>
            </div>
            <div className="border-t sm:border-t-0 sm:border-l border-slate-100 py-4 sm:py-0 space-y-1">
              <span className="text-3xl sm:text-4xl font-display font-black text-slate-900 leading-none">12 +</span>
              <h4 className="font-bold text-slate-800 text-sm">Visa Subclasses Sourced</h4>
              <p className="text-xs text-slate-400 max-w-[200px] mx-auto">Providing precise, structured answers matching target profiles.</p>
            </div>
            <div className="border-t sm:border-t-0 sm:border-l border-slate-100 py-4 sm:py-0 space-y-1">
              <span className="text-3xl sm:text-4xl font-display font-black text-brand-blue-700 leading-none">100%</span>
              <h4 className="font-bold text-slate-800 text-sm">Regulatory Compliance</h4>
              <p className="text-xs text-slate-400 max-w-[200px] mx-auto">Direct cooperation with certified immigration caseworkers.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
