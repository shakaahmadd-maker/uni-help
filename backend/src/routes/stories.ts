import { Router, Request, Response } from "express";
import { prisma, getIsDatabaseConfigured } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";
import path from "path";
import fs from "fs";

const router = Router();

// Foundational verified success stories permanently available
export const INITIAL_VERIFIED_STORIES = [
  {
    id: "story-1-irfan-ullah",
    legacyId: "story-1-irfan-ullah",
    name: "Irfan Ullah",
    city: "Germany",
    stream: "Computer Science",
    review: "I am Irfan Ullah, a Computer Science student. Uni Help Consultants helped me secure my visa successfully. Their team was very professional – they guided me step by step, from preparing my documents to submitting the application. I felt confident because they answered all my questions clearly. Thanks to Uni Help Consultants, my visa was approved without any trouble. I highly recommend them to any student who wants honest and effective visa help.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "I***N U***H",
    stampId: "DE-STAMP-101",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 1,
    createdAt: new Date("2026-11-09T01:00:00.000Z"),
    updatedAt: new Date("2026-11-09T01:00:00.000Z"),
  },
  {
    id: "story-2-shafi-ullah",
    legacyId: "story-2-shafi-ullah",
    name: "Shafi Ullah",
    city: "Germany",
    stream: "Master in Physics",
    review: "I am Shafi Ullah, a Physics graduate. I wanted to pursue my Master’s in Physics in Germany, but the visa process seemed very complicated. Uni Help Consultants made it simple for me. They guided me on every step – from university documentation to the German visa application and interview preparation. Thanks to their honest and professional support, I received my German student visa successfully. I strongly recommend Uni Help Consultants to any student aiming to study abroad.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "S***I U***H",
    stampId: "DE-STAMP-102",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 2,
    createdAt: new Date("2026-11-09T01:01:00.000Z"),
    updatedAt: new Date("2026-11-09T01:01:00.000Z"),
  },
  {
    id: "story-3-arshad-ali",
    legacyId: "story-3-arshad-ali",
    name: "Arshad Ali",
    city: "Germany",
    stream: "Master in Physics",
    review: "I'm Arshad Ali, and I wanted to pursue a Master's in Physics in Germany. Uni Help Consultants made the entire process smooth and stress-free. They guided me through every document and prepared me for the visa interview. My German student visa was approved without any hassle. Highly recommended!",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "A***D A*I",
    stampId: "DE-STAMP-103",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 3,
    createdAt: new Date("2026-11-09T01:02:00.000Z"),
    updatedAt: new Date("2026-11-09T01:02:00.000Z"),
  },
  {
    id: "story-4-abdullah",
    legacyId: "story-4-abdullah",
    name: "Abdullah",
    city: "Germany",
    stream: "Master in Mathematics",
    review: "I am Abdullah, a Mathematics student. I wanted to pursue my Master’s in Mathematics in Germany, but the visa process seemed very complex. Uni Help Consultants made it easy for me. They guided me through every step – from preparing my documents to the German visa application. Their team was professional, honest, and always available to answer my questions. Thanks to their support, I received my German student visa successfully. I highly recommend Uni Help Consultants to any student planning to study abroad.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "A***H",
    stampId: "DE-STAMP-104",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 4,
    createdAt: new Date("2026-11-09T01:03:00.000Z"),
    updatedAt: new Date("2026-11-09T01:03:00.000Z"),
  },
  {
    id: "story-5-saddam-khan",
    legacyId: "story-5-saddam-khan",
    name: "Saddam Khan",
    city: "Germany",
    stream: "Master in Mathematics",
    review: "I'm Saddam Khan, and I wanted to pursue a Master's in Mathematics in Germany. Uni Help Consultants made the entire process smooth and simple. They guided me through every document and prepared me for the visa interview. My German student visa was approved without any hassle. Highly recommended!",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "S***M K***N",
    stampId: "DE-STAMP-105",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 5,
    createdAt: new Date("2026-11-09T01:04:00.000Z"),
    updatedAt: new Date("2026-11-09T01:04:00.000Z"),
  },
  {
    id: "story-6-hassan-ali",
    legacyId: "story-6-hassan-ali",
    name: "Hassan Ali",
    city: "Germany",
    stream: "Master in Physics",
    review: "I'm Hassan Ali, and I wanted to pursue a Master's in Physics in Germany. Uni Help Consultants made the entire process smooth and stress-free. They guided me through every document and prepared me for the visa interview. My German student visa was approved without any hassle. Highly recommended!",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "H***N A*I",
    stampId: "DE-STAMP-106",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 6,
    createdAt: new Date("2026-11-09T01:05:00.000Z"),
    updatedAt: new Date("2026-11-09T01:05:00.000Z"),
  },
  {
    id: "story-7-samandar-khan",
    legacyId: "story-7-samandar-khan",
    name: "Samandar Khan",
    city: "Germany",
    stream: "Master in Physics",
    review: "My name is Samandar Khan, and I wanted to pursue a Master’s in Physics in Germany. At first, I didn’t know where to start – the visa rules, the documents, the timelines. Then I contacted Uni Help Consultants. They broke down the entire process into simple, manageable steps. They reviewed my application, helped me prepare for the visa interview, and made sure nothing was missed. The result? My German student visa was approved without any issues. I’m grateful to Uni Help Consultants for making my dream possible.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "S***R K***N",
    stampId: "DE-STAMP-107",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 7,
    createdAt: new Date("2026-11-09T01:06:00.000Z"),
    updatedAt: new Date("2026-11-09T01:06:00.000Z"),
  },
  {
    id: "story-8-uzma-shehzadi",
    legacyId: "story-8-uzma-shehzadi",
    name: "Uzma Shehzadi",
    city: "Germany",
    stream: "Master in Mathematics",
    review: "As a female student planning to study Mathematics in Germany, I had many doubts – not just about the visa process, but whether I could handle everything alone. Uni Help Consultants changed that for me. They treated my case with care and professionalism. From preparing my documents for the Master’s in Mathematics to submitting my German visa application, they were with me at every stage. Their guidance gave me confidence. Today, my visa is approved, and I am ready to start my journey. Thank you, Uni Help Consultants, for believing in me.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "U***A S***I",
    stampId: "DE-STAMP-108",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 8,
    createdAt: new Date("2026-11-09T01:07:00.000Z"),
    updatedAt: new Date("2026-11-09T01:07:00.000Z"),
  },
  {
    id: "story-9-fazal-wadood",
    legacyId: "story-9-fazal-wadood",
    name: "Fazal Wadood",
    city: "Germany",
    stream: "Master in Physics",
    review: "I’m Fazal Wadood, and I always wanted to study Physics at the master’s level in Germany. The visa process felt like a huge barrier – until I reached out to Uni Help Consultants. They didn’t just give me forms to fill; they actually guided me through every single requirement. My documents were checked, my interview was practiced, and my confidence was built. Thanks to their honest work, my German student visa was approved. If you have a dream, let Uni Help Consultants help you achieve it.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "F***L W***D",
    stampId: "DE-STAMP-109",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 9,
    createdAt: new Date("2026-11-09T01:08:00.000Z"),
    updatedAt: new Date("2026-11-09T01:08:00.000Z"),
  },
  {
    id: "story-10-rashid-ahmad",
    legacyId: "story-10-rashid-ahmad",
    name: "Rashid Ahmad",
    city: "Germany",
    stream: "MS in Mathematics",
    review: "My name is Rashid Ahmad, and I wanted to pursue a Master’s in Mathematics in Germany. The visa process seemed full of complex requirements and potential delays. Fortunately, I chose Uni Help Consultants. They explained everything clearly, helped me organize my documents step by step, and prepared me for the visa interview. Their team was always responsive and professional. In the end, my German student visa was approved smoothly. I truly appreciate their support and highly recommend them to every student dreaming of studying abroad.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "R***D A***D",
    stampId: "DE-STAMP-110",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 10,
    createdAt: new Date("2026-11-09T01:09:00.000Z"),
    updatedAt: new Date("2026-11-09T01:09:00.000Z"),
  },
  {
    id: "story-11-sami-ullah",
    legacyId: "story-11-sami-ullah",
    name: "Sami Ullah",
    city: "Germany",
    stream: "Master in Physics",
    review: "I’m Sami Ullah, and completing my Master’s in Physics in Germany was a dream I thought might stay out of reach because of the complicated visa process. Then I found Uni Help Consultants. They didn’t overwhelm me with jargon – instead, they gave me a clear roadmap. From my application to the final visa approval, they supported me at every turn. Their team was honest, fast, and genuinely cared about my success. My German student visa is now approved, and I can’t thank them enough. If you need real help, go to Uni Help Consultants.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "S***I U***H",
    stampId: "DE-STAMP-111",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 11,
    createdAt: new Date("2026-11-09T01:10:00.000Z"),
    updatedAt: new Date("2026-11-09T01:10:00.000Z"),
  },
  {
    id: "story-12-najeeb-ullah",
    legacyId: "story-12-najeeb-ullah",
    name: "Najeeb Ullah",
    city: "France",
    stream: "Master’s in Quantum, Light, Material, and Nanoscience",
    review: "My name is Najeeb Ullah, and I had my sights set on a very specific and advanced Master’s program – Quantum, Light, Material, and Nanoscience in France. The visa process felt even more daunting because my field is highly specialized. Uni Help Consultants didn’t treat me like just another file. They took time to understand my academic background, helped me present my research interests clearly, and guided me through every document with precision. Their support gave me the confidence to face the French visa authorities. The result? My visa was approved. I am now on my way to study at the frontier of physics. Thank you, Uni Help Consultants, for making the impossible possible.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "N***B U***H",
    stampId: "FR-STAMP-112",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 12,
    createdAt: new Date("2026-11-09T01:11:00.000Z"),
    updatedAt: new Date("2026-11-09T01:11:00.000Z"),
  },
  {
    id: "story-13-sohail-ahmad",
    legacyId: "story-13-sohail-ahmad",
    name: "Sohail Ahmad",
    city: "France",
    stream: "Master in Natural Language Processing",
    review: "I'm Sohail Ahmad, and I wanted to pursue a Master's in Natural Language Processing in France. Uni Help Consultants made the entire process smooth and stress-free. They guided me through every document and prepared me for the visa interview. My French student visa was approved without any hassle. Highly recommended!",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "S***L A***D",
    stampId: "FR-STAMP-113",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 13,
    createdAt: new Date("2026-11-09T01:12:00.000Z"),
    updatedAt: new Date("2026-11-09T01:12:00.000Z"),
  },
  {
    id: "story-14-abdurahman",
    legacyId: "story-14-abdurahman",
    name: "Abdurahman",
    city: "Germany",
    stream: "Master in Physics",
    review: "My name is Abdurahman. I always dreamed of studying Physics at the master’s level in Germany. But the visa process worried me – so many rules, documents, and deadlines. Then I contacted Uni Help Consultants. They guided me like a true partner. They helped me organize my application, prepare for the visa interview, and avoid common mistakes. Their team was patient and honest. In the end, my German student visa was approved. I am now ready to start my Physics journey in Germany. If you need real support, choose Uni Help Consultants.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "A***N",
    stampId: "DE-STAMP-114",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 14,
    createdAt: new Date("2026-11-09T01:13:00.000Z"),
    updatedAt: new Date("2026-11-09T01:13:00.000Z"),
  },
  {
    id: "story-15-muhammad-shafiq",
    legacyId: "story-15-muhammad-shafiq",
    name: "Muhammad Shafiq",
    city: "Germany",
    stream: "Master in Physics",
    review: "I am Muhammad Shafiq, and Physics has always been my passion. Germany was my first choice for a Master’s degree, but the visa process seemed full of challenges. Uni Help Consultants made the impossible possible. They guided me through every document, helped me prepare for my interview, and gave me confidence when I felt uncertain. Their team was professional, responsive, and truly caring. Thanks to their hard work, my German student visa was approved. I am now one step closer to my dream. I highly recommend Uni Help Consultants to every student who wants to study abroad.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "M***D S***Q",
    stampId: "DE-STAMP-115",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 15,
    createdAt: new Date("2026-11-09T01:14:00.000Z"),
    updatedAt: new Date("2026-11-09T01:14:00.000Z"),
  },
  {
    id: "story-16-syed-alam",
    legacyId: "story-16-syed-alam",
    name: "Syed Alam",
    city: "Germany",
    stream: "Master in Physics",
    review: "I’m Syed Alam, and Germany was my dream destination for a Master’s in Physics. Uni Help Consultants made the visa process smooth and stress-free. Their team guided me perfectly – from documents to interview prep. My German visa was approved without any hassle. Highly recommended!",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "S***D A***M",
    stampId: "DE-STAMP-116",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 16,
    createdAt: new Date("2026-11-09T01:15:00.000Z"),
    updatedAt: new Date("2026-11-09T01:15:00.000Z"),
  },
  {
    id: "story-17-waleed-khan",
    legacyId: "story-17-waleed-khan",
    name: "Waleed Khan",
    city: "Germany",
    stream: "Master in Mathematics",
    review: "I'm Waleed Khan, and I wanted to pursue a Master's in Mathematics in Germany. The entire visa process seemed overwhelming at first, but Uni Help Consultants made it stress-free. They guided me through every step – from preparing my documents to the visa interview. Their team was professional, honest, and always available when I needed them. Thanks to their support, my German student visa was approved successfully. I highly recommend Uni Help Consultants to any student with dreams of studying abroad.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "W***D K***N",
    stampId: "DE-STAMP-117",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 17,
    createdAt: new Date("2026-11-09T01:16:00.000Z"),
    updatedAt: new Date("2026-11-09T01:16:00.000Z"),
  },
  {
    id: "story-18-shahid-ali",
    legacyId: "story-18-shahid-ali",
    name: "Shahid Ali",
    city: "France",
    stream: "Master in Development of Drugs and Health Products",
    review: "I’m Shahid Ali, and I wanted to pursue a Master’s in Development of Drugs and Health Products in France – a very specialized field. The admission and visa process seemed daunting, but Uni Help Consultants made it easy. They guided me through every requirement, helped me prepare my application, and ensured my visa interview went smoothly. Their team was professional and always available. Thanks to them, my French student visa was approved. I truly recommend Uni Help Consultants to anyone aiming for specialized studies abroad.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "S***D A*I",
    stampId: "FR-STAMP-118",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 18,
    createdAt: new Date("2026-11-09T01:17:00.000Z"),
    updatedAt: new Date("2026-11-09T01:17:00.000Z"),
  },
  {
    id: "story-19-shahid-ferdost",
    legacyId: "story-19-shahid-ferdost",
    name: "Shahid Ferdost",
    city: "France",
    stream: "Master's in Machine Learning and Data Sciences",
    review: "I'm Shahid Ferdost, and I wanted to pursue a Master's in Machine Learning and Data Sciences in France – one of the most competitive fields today. The application and visa process required precision, and I knew I couldn't do it alone. Uni Help Consultants stepped in and handled everything professionally. They helped me structure my application, prepared me for the French visa interview, and made sure every document was perfect. Their guidance gave me confidence. My French student visa was approved smoothly. I'm truly grateful to Uni Help Consultants for helping me take this big step toward my future in AI and data science.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "S***D F***T",
    stampId: "FR-STAMP-119",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 19,
    createdAt: new Date("2026-11-09T01:18:00.000Z"),
    updatedAt: new Date("2026-11-09T01:18:00.000Z"),
  },
  {
    id: "story-20-jahan-sher-khan",
    legacyId: "story-20-jahan-sher-khan",
    name: "Jahan Sher Khan",
    city: "Germany",
    stream: "Master in Mining Engineering",
    review: "My name is Jahan Sher Khan, and I wanted to pursue a Master's in Mining Engineering in Germany – a country known for its excellence in engineering and technology. The visa process felt overwhelming, but Uni Help Consultants made everything clear and manageable. They helped me organize my academic documents, prepared me for the interview, and guided me through every step with patience. Their team was reliable and professional. Thanks to them, my German student visa was approved without any issues. I strongly recommend Uni Help Consultants to any student aiming for higher education abroad.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "J***N S***R K***N",
    stampId: "DE-STAMP-120",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 20,
    createdAt: new Date("2026-11-09T01:19:00.000Z"),
    updatedAt: new Date("2026-11-09T01:19:00.000Z"),
  },
  {
    id: "story-21-naeem-ullah",
    legacyId: "story-21-naeem-ullah",
    name: "Naeem Ullah",
    city: "Germany",
    stream: "Bachelor in Computer Sciences",
    review: "My name is Naeem Ullah, and I wanted to pursue a Bachelor's in Computer Sciences in Germany. As an undergraduate student, I was nervous about the entire process – from university applications to the German visa. Uni Help Consultants made everything simple for me. They guided me through document preparation, helped me meet deadlines, and made sure I was fully prepared for the visa interview. Their team was always supportive and honest. Today, my German student visa is approved, and I'm ready to begin my academic journey. I highly recommend Uni Help Consultants to every student, whether for Bachelor's or Master's.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "N***M U***H",
    stampId: "DE-STAMP-121",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 21,
    createdAt: new Date("2026-11-09T01:20:00.000Z"),
    updatedAt: new Date("2026-11-09T01:20:00.000Z"),
  },
  {
    id: "story-22-zia-ullah-khan",
    legacyId: "story-22-zia-ullah-khan",
    name: "Zia Ullah Khan",
    city: "Germany",
    stream: "Master in Mathematics",
    review: "My name is Zia Ullah Khan, and I wanted to pursue a Master's in Mathematics in Germany. Mathematics has always been my passion, but the visa process seemed complicated and stressful. Uni Help Consultants changed that for me. They guided me through every requirement – from document preparation to visa interview practice. Their team was professional, responsive, and truly cared about my success. Thanks to their support, my German student visa was approved smoothly. I am now ready to begin my Master's journey in Germany. I strongly recommend Uni Help Consultants to any student with big dreams.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "Z*A U***H K***N",
    stampId: "DE-STAMP-122",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 22,
    createdAt: new Date("2026-11-09T01:21:00.000Z"),
    updatedAt: new Date("2026-11-09T01:21:00.000Z"),
  },
  {
    id: "story-23-usman-aman",
    legacyId: "story-23-usman-aman",
    name: "Usman Aman",
    city: "Germany",
    stream: "Master in Geomatics",
    review: "I'm Usman Aman, and I wanted to pursue a Master's in Geomatics in Germany. Uni Help Consultants made the whole process simple and stress-free. They guided me through every document and prepared me for the visa interview. My German student visa was approved without any problems. Highly recommended!",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "U***N A***N",
    stampId: "DE-STAMP-123",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 23,
    createdAt: new Date("2026-11-09T01:22:00.000Z"),
    updatedAt: new Date("2026-11-09T01:22:00.000Z"),
  },
  {
    id: "story-24-waqas-ahmad",
    legacyId: "story-24-waqas-ahmad",
    name: "Waqas Ahmad",
    city: "Germany",
    stream: "Master in Forestry",
    review: "My name is Waqas Ahmad, and I wanted to pursue a Master's in Forestry – a field close to my heart that focuses on environmental sustainability and natural resource management. Germany offered excellent programs, but the visa process felt overwhelming at first. Uni Help Consultants made everything simple and clear. They guided me through document preparation, helped me understand the requirements, and prepared me for the visa interview with confidence. Their team was professional, supportive, and always responsive. Thanks to their hard work, my German student visa was approved successfully. I am now ready to contribute to a greener future. I highly recommend Uni Help Consultants to any student with a passion for making a difference.",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "W***S A***D",
    stampId: "DE-STAMP-124",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 24,
    createdAt: new Date("2026-11-09T01:23:00.000Z"),
    updatedAt: new Date("2026-11-09T01:23:00.000Z"),
  },
  {
    id: "story-25-muhammad-haseeb-ul-hassan",
    legacyId: "story-25-muhammad-haseeb-ul-hassan",
    name: "Muhammad Haseeb Ul Hassan",
    city: "Germany",
    stream: "Master in Geosciences",
    review: "I'm Muhammad Haseeb Ul Hassan, and I wanted to pursue a Master's in Geosciences in Germany. Uni Help Consultants made the entire process smooth and simple. They guided me through every document and prepared me for the visa interview. My German student visa was approved without any hassle. Highly recommended!",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "M***D H***B U* H***N",
    stampId: "DE-STAMP-125",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 25,
    createdAt: new Date("2026-11-09T01:24:00.000Z"),
    updatedAt: new Date("2026-11-09T01:24:00.000Z"),
  },
  {
    id: "story-26-abdur-rahman",
    legacyId: "story-26-abdur-rahman",
    name: "Abdur Rahman",
    city: "Germany",
    stream: "Master in Physics",
    review: "I'm Abdur Rahman, and I wanted to pursue a Master's in Physics in Germany. Uni Help Consultants made the entire process smooth and stress-free. They guided me through every document and prepared me for the visa interview. My German student visa was approved without any hassle. Highly recommended!",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "A***R R***N",
    stampId: "DE-STAMP-126",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 26,
    createdAt: new Date("2026-11-09T01:25:00.000Z"),
    updatedAt: new Date("2026-11-09T01:25:00.000Z"),
  },
  {
    id: "story-27-irfan-ali",
    legacyId: "story-27-irfan-ali",
    name: "Irfan Ali",
    city: "France",
    stream: "Master in Machine Learning and Data Mining",
    review: "I'm Irfan Ali, and I wanted to pursue a Master's in Machine Learning and Data Mining in France. Uni Help Consultants made the entire process smooth and stress-free. They guided me through every document and prepared me for the visa interview. My French student visa was approved without any hassle. Highly recommended!",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "I***N A*I",
    stampId: "FR-STAMP-127",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 27,
    createdAt: new Date("2026-11-09T01:26:00.000Z"),
    updatedAt: new Date("2026-11-09T01:26:00.000Z"),
  },
  {
    id: "story-28-shah-khalid",
    legacyId: "story-28-shah-khalid",
    name: "Shah Khalid",
    city: "Germany",
    stream: "MS in Physics",
    review: "I'm Shah Khalid, and I wanted to pursue an MS in Physics in Germany. Uni Help Consultants made the entire process smooth and stress-free. They guided me through every document and prepared me for the visa interview. My German student visa was approved without any hassle. Highly recommended!",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "S***H K***D",
    stampId: "DE-STAMP-128",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 28,
    createdAt: new Date("2026-11-09T01:27:00.000Z"),
    updatedAt: new Date("2026-11-09T01:27:00.000Z"),
  },
  {
    id: "story-29-zakary-khan",
    legacyId: "story-29-zakary-khan",
    name: "Zakary Khan",
    city: "Germany",
    stream: "Bachelor in Computer Sciences",
    review: "I'm Zakary Khan, and I wanted to pursue a Bachelor's in Computer Sciences in Germany. Uni Help Consultants made the entire process smooth and stress-free. They guided me through every document and prepared me for the visa interview. My German student visa was approved without any hassle. Highly recommended!",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "Z***Y K***N",
    stampId: "DE-STAMP-129",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 29,
    createdAt: new Date("2026-11-09T01:28:00.000Z"),
    updatedAt: new Date("2026-11-09T01:28:00.000Z"),
  },
  {
    id: "story-30-saif-ur-rahman",
    legacyId: "story-30-saif-ur-rahman",
    name: "Saif ur Rahman",
    city: "Germany",
    stream: "MS in Physics",
    review: "I'm Saif ur Rahman, and I wanted to pursue an MS in Physics in Germany. Uni Help Consultants made the entire process smooth and stress-free. They guided me through every document and prepared me for the visa interview. My German student visa was approved without any hassle. Highly recommended!",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "S***F U* R***N",
    stampId: "DE-STAMP-130",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 30,
    createdAt: new Date("2026-11-09T01:29:00.000Z"),
    updatedAt: new Date("2026-11-09T01:29:00.000Z"),
  },
  {
    id: "story-31-abdul-wasay",
    legacyId: "story-31-abdul-wasay",
    name: "Abdul Wasay",
    city: "Germany",
    stream: "Master in Geosciences",
    review: "I'm Abdul Wasay, and I wanted to pursue a Master's in Geosciences in Germany. Uni Help Consultants made the entire process smooth and stress-free. They guided me through every document and prepared me for the visa interview. My German student visa was approved without any hassle. Highly recommended!",
    rating: 5,
    clientPic: "",
    visaStamp: "",
    maskedName: "A***L W***Y",
    stampId: "DE-STAMP-131",
    visaGrantDate: "November 2026",
    isPublished: true,
    displayOrder: 31,
    createdAt: new Date("2026-11-09T01:30:00.000Z"),
    updatedAt: new Date("2026-11-09T01:30:00.000Z"),
  },
];

// Fallback file storage helper for local/offline resilience
const DATA_DIR = path.join(process.cwd(), "data");
const STORIES_FILE = path.join(DATA_DIR, "stories.json");

function readFallbackStories(): any[] {
  try {
    if (fs.existsSync(STORIES_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(STORIES_FILE, "utf-8"));
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (_e) {}
  return [...INITIAL_VERIFIED_STORIES];
}

function writeFallbackStories(stories: any[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    const temp = `${STORIES_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(temp, JSON.stringify(stories, null, 2), "utf-8");
    fs.renameSync(temp, STORIES_FILE);
  } catch (err) {
    console.error("[Storage] Fallback write error:", err);
  }
}

// Automatically verify/create the success_stories table in PostgreSQL
let tableInitialized = false;
async function ensureStoriesTable() {
  if (tableInitialized) return;
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS success_stories (
          id VARCHAR(255) PRIMARY KEY,
          legacy_id VARCHAR(255),
          name VARCHAR(255) NOT NULL,
          city VARCHAR(255),
          stream VARCHAR(255),
          review TEXT,
          rating INTEGER DEFAULT 5,
          client_pic TEXT,
          visa_stamp TEXT,
          masked_name VARCHAR(255),
          stamp_id VARCHAR(100),
          visa_grant_date VARCHAR(100),
          is_published BOOLEAN DEFAULT TRUE,
          display_order INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await prisma.$executeRawUnsafe(`
      ALTER TABLE success_stories ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
    `);
    tableInitialized = true;
    console.log("[Stories API] PostgreSQL table success_stories verified/ensured.");
  } catch (err: any) {
    console.warn("[Stories API] Table initialization note:", err.message);
  }
}

// GET /api/stories - Fetch all success stories
// 100% Unrestricted: zero auth blockers, zero sandbox gates, public access
router.get("/", async (_req: Request, res: Response) => {
  try {
    const isDb = getIsDatabaseConfigured();
    if (isDb) {
      await ensureStoriesTable();
      let stories = await prisma.successStory.findMany({
        orderBy: { createdAt: "desc" },
      });

      // Auto-Seed: If database table is empty, seed foundational 6 verified records into PostgreSQL
      if (!stories || stories.length === 0) {
        console.log("[Stories API] PostgreSQL table is empty. Auto-seeding 6 verified success stories...");
        for (const s of INITIAL_VERIFIED_STORIES) {
          try {
            await prisma.successStory.upsert({
              where: { id: s.id },
              update: {
                name: s.name,
                city: s.city,
                stream: s.stream,
                review: s.review,
                rating: s.rating,
                clientPic: s.clientPic,
                visaStamp: s.visaStamp,
                maskedName: s.maskedName,
                stampId: s.stampId,
                visaGrantDate: s.visaGrantDate,
                isPublished: true,
                displayOrder: s.displayOrder,
              },
              create: {
                id: s.id,
                legacyId: s.legacyId,
                name: s.name,
                city: s.city,
                stream: s.stream,
                review: s.review,
                rating: s.rating,
                clientPic: s.clientPic,
                visaStamp: s.visaStamp,
                maskedName: s.maskedName,
                stampId: s.stampId,
                visaGrantDate: s.visaGrantDate,
                isPublished: true,
                displayOrder: s.displayOrder,
                createdAt: s.createdAt,
              },
            });
          } catch (_seedErr) {}
        }
        stories = await prisma.successStory.findMany({
          orderBy: { createdAt: "desc" },
        });
      }

      if (stories && stories.length > 0) {
        res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
        return res.json({
          success: true,
          data: stories,
        });
      }
    }

    const fallback = readFallbackStories();
    res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    return res.json({
      success: true,
      data: fallback,
    });
  } catch (error: any) {
    console.warn("[Prisma Stories] Database query error, using fallback storage:", error.message);
    const fallback = readFallbackStories();
    res.setHeader("Cache-Control", "public, max-age=30, stale-while-revalidate=120");
    return res.json({
      success: true,
      data: fallback,
    });
  }
});

// POST /api/stories/sync - Bulk force-sync success stories directly to PostgreSQL (Admin protected)
router.post("/sync", requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const rawStories = req.body?.stories || req.body || [];
    const storiesArray: any[] = Array.isArray(rawStories) ? rawStories : [rawStories];
    const isDb = getIsDatabaseConfigured();
    const syncedRecords: any[] = [];

    if (isDb) {
      await ensureStoriesTable();
      for (const item of storiesArray) {
        if (!item || !item.name) continue;
        const targetId = item.id || `story-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        const legacyId = item.legacyId || item.id || null;
        
        const existingRecord = await prisma.successStory.findFirst({
          where: {
            OR: [
              { id: targetId },
              ...(legacyId ? [{ legacyId }] : []),
            ],
          },
        });
        const finalId = existingRecord ? existingRecord.id : targetId;

        const record = await prisma.successStory.upsert({
          where: { id: finalId },
          update: {
            name: item.name,
            maskedName: item.maskedName || `${item.name.charAt(0)}***`,
            city: item.city || "Global Destination",
            stream: item.stream || "Academic Degree",
            review: item.review || "",
            rating: typeof item.rating === "number" ? item.rating : 5,
            clientPic: item.clientPic !== undefined ? item.clientPic : (existingRecord?.clientPic || ""),
            visaStamp: item.visaStamp !== undefined ? item.visaStamp : (existingRecord?.visaStamp || ""),
            stampId: item.stampId || existingRecord?.stampId || `STAMP-${Math.floor(100 + Math.random() * 900)}`,
            visaGrantDate: item.visaGrantDate || existingRecord?.visaGrantDate || "",
            isPublished: true,
            displayOrder: typeof item.displayOrder === "number" ? item.displayOrder : (existingRecord?.displayOrder || 0),
          },
          create: {
            id: finalId,
            legacyId,
            name: item.name,
            maskedName: item.maskedName || `${item.name.charAt(0)}***`,
            city: item.city || "Global Destination",
            stream: item.stream || "Academic Degree",
            review: item.review || "",
            rating: typeof item.rating === "number" ? item.rating : 5,
            clientPic: item.clientPic || "",
            visaStamp: item.visaStamp || "",
            stampId: item.stampId || `STAMP-${Math.floor(100 + Math.random() * 900)}`,
            visaGrantDate: item.visaGrantDate || "",
            isPublished: true,
            displayOrder: typeof item.displayOrder === "number" ? item.displayOrder : 0,
            createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
          },
        });
        syncedRecords.push(record);
      }
    } else {
      for (const item of storiesArray) {
        if (!item || !item.name) continue;
        syncedRecords.push({
          ...item,
          id: item.id || `story-${Date.now()}`,
          isPublished: true,
          updatedAt: new Date().toISOString(),
        });
      }
    }

    // Persist to fallback cache as well
    writeFallbackStories(syncedRecords.length > 0 ? syncedRecords : readFallbackStories());

    console.log(`[Stories API] Bulk synced ${syncedRecords.length} stories successfully.`);
    return res.json({
      success: true,
      data: {
        count: syncedRecords.length,
        items: syncedRecords,
      },
    });
  } catch (error: any) {
    console.error("[Stories API] Sync failed:", error);
    return res.status(500).json({
      success: false,
      error: { code: "SYNC_FAILED", message: error.message || "Failed to synchronize stories to database" },
    });
  }
});

// POST /api/stories - Create or upsert a single success story (Admin protected)
router.post("/", requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const body = req.body || {};
    const targetId = body.id || `story-${Date.now()}`;
    const legacyId = body.legacyId || body.id || null;
    const name = body.name || "Anonymous Student";
    const maskedName = body.maskedName || `${name.charAt(0)}***`;
    const city = body.city || "Global Destination";
    const stream = body.stream || "Academic Degree";
    const review = body.review || "";
    const rating = typeof body.rating === "number" ? body.rating : 5;
    const clientPic = body.clientPic || "";
    const visaStamp = body.visaStamp || "";
    const stampId = body.stampId || `STAMP-${Math.floor(100 + Math.random() * 900)}`;
    const visaGrantDate = body.visaGrantDate || "";
    const isPublished = body.isPublished !== undefined ? Boolean(body.isPublished) : true;
    const displayOrder = typeof body.displayOrder === "number" ? body.displayOrder : 0;
    const createdAt = body.createdAt ? new Date(body.createdAt) : new Date();

    let storyRecord: any = null;
    const isDb = getIsDatabaseConfigured();
    if (isDb) {
      await ensureStoriesTable();
      const existingStory = await prisma.successStory.findFirst({
        where: {
          OR: [
            { id: targetId },
            ...(legacyId ? [{ legacyId }] : []),
          ],
        },
      });
      const finalTargetId = existingStory ? existingStory.id : targetId;

      storyRecord = await prisma.successStory.upsert({
        where: { id: finalTargetId },
        update: {
          name,
          maskedName,
          city,
          stream,
          review,
          rating,
          clientPic,
          visaStamp,
          stampId,
          visaGrantDate,
          isPublished,
          displayOrder,
        },
        create: {
          id: finalTargetId,
          legacyId,
          name,
          maskedName,
          city,
          stream,
          review,
          rating,
          clientPic,
          visaStamp,
          stampId,
          visaGrantDate,
          isPublished,
          displayOrder,
          createdAt,
        },
      });
    }

    if (!storyRecord) {
      storyRecord = {
        id: targetId,
        legacyId,
        name,
        maskedName,
        city,
        stream,
        review,
        rating,
        clientPic,
        visaStamp,
        stampId,
        visaGrantDate,
        isPublished,
        displayOrder,
        createdAt: createdAt.toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    // Keep local fallback storage in sync
    try {
      const fileStories = readFallbackStories();
      const idx = fileStories.findIndex((s) => s.id === targetId || (legacyId && s.id === legacyId));
      if (idx !== -1) fileStories[idx] = storyRecord;
      else fileStories.unshift(storyRecord);
      writeFallbackStories(fileStories);
    } catch {}

    console.log(`[Stories API] Story saved: "${name}" (${storyRecord.id})`);
    return res.status(201).json({
      success: true,
      data: storyRecord,
    });
  } catch (error: any) {
    console.error("[Stories API] Story creation failed:", error);
    return res.status(500).json({
      success: false,
      error: { code: "CREATE_FAILED", message: error.message || "Failed to create success story" },
    });
  }
});

// PUT /api/stories/:id - Update existing success story (Admin protected)
router.put("/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body || {};
    let updatedRecord: any = null;
    const isDb = getIsDatabaseConfigured();

    if (isDb) {
      await ensureStoriesTable();
      try {
        const existing = await prisma.successStory.findFirst({
          where: {
            OR: [{ id }, { legacyId: id }],
          },
        });
        if (existing) {
          updatedRecord = await prisma.successStory.update({
            where: { id: existing.id },
            data: {
              ...(body.name !== undefined && { name: body.name }),
              ...(body.maskedName !== undefined && { maskedName: body.maskedName }),
              ...(body.city !== undefined && { city: body.city }),
              ...(body.stream !== undefined && { stream: body.stream }),
              ...(body.review !== undefined && { review: body.review }),
              ...(body.rating !== undefined && { rating: typeof body.rating === "number" ? body.rating : 5 }),
              ...(body.clientPic !== undefined && { clientPic: body.clientPic }),
              ...(body.visaStamp !== undefined && { visaStamp: body.visaStamp }),
              ...(body.stampId !== undefined && { stampId: body.stampId }),
              ...(body.visaGrantDate !== undefined && { visaGrantDate: body.visaGrantDate }),
              ...(body.isPublished !== undefined && { isPublished: Boolean(body.isPublished) }),
              ...(body.displayOrder !== undefined && { displayOrder: Number(body.displayOrder) }),
            },
          });
        }
      } catch (_e) {}
    }

    if (!updatedRecord) {
      const stories = readFallbackStories();
      const idx = stories.findIndex((s) => s.id === id || s.legacyId === id);
      if (idx === -1) {
        return res.status(404).json({
          success: false,
          error: { code: "NOT_FOUND", message: "Success story not found" },
        });
      }
      updatedRecord = { ...stories[idx], ...body, updatedAt: new Date().toISOString() };
    }

    // Keep fallback storage in sync
    try {
      const stories = readFallbackStories();
      const idx = stories.findIndex((s) => s.id === id || s.legacyId === id);
      if (idx !== -1) {
        stories[idx] = updatedRecord;
        writeFallbackStories(stories);
      }
    } catch {}

    return res.json({
      success: true,
      data: updatedRecord,
    });
  } catch (error: any) {
    console.error("[Stories API] Story update failed:", error);
    return res.status(500).json({
      success: false,
      error: { code: "UPDATE_FAILED", message: error.message || "Failed to update success story" },
    });
  }
});

// DELETE /api/stories/:id - Delete story (Admin protected)
router.delete("/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const isDb = getIsDatabaseConfigured();

    if (isDb) {
      await ensureStoriesTable();
      try {
        const existing = await prisma.successStory.findFirst({
          where: {
            OR: [{ id }, { legacyId: id }],
          },
        });
        if (existing) {
          await prisma.successStory.delete({
            where: { id: existing.id },
          });
        }
      } catch (_e) {}
    }

    // Remove from local fallback
    try {
      const stories = readFallbackStories();
      const filtered = stories.filter((s) => s.id !== id && s.legacyId !== id);
      writeFallbackStories(filtered);
    } catch {}

    return res.json({
      success: true,
      data: { message: "Success story deleted successfully" },
    });
  } catch (error: any) {
    console.error("[Stories API] Story deletion failed:", error);
    return res.status(500).json({
      success: false,
      error: { code: "DELETE_FAILED", message: error.message || "Failed to delete success story" },
    });
  }
});

export default router;
