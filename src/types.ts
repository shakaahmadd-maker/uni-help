export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string; // Lucide icon name mapping
  benefits: string[];
  processTimeline?: string[];
  requiredDocs?: string[];
}

export interface University {
  id: string;
  name: string;
  country: string;
  flag: string;
  worldRanking: number;
  acceptanceRate: string;
  ieltsRequirement: string;
  avgTuition: string;
  intakePeriods: string[];
  popularPrograms: string[];
  scholarshipsAvailable: string[];
  requiredDocuments: string[];
  description: string;
  whyStudyHere: string[];
}

export interface LocationInfo {
  city: string;
  country: string;
  flag: string;
  address: string;
  phone: string;
  email: string;
  coordinates: { lat: number; lng: number };
  note: string;
}

export interface Testimonial {
  id: string;
  name: string;
  destination: string;
  course: string;
  comment: string;
  rating: number;
  avatarUrl?: string;
  universityName?: string;
}

export interface StatItem {
  value: string;
  label: string;
  iconName: string;
  description: string;
}

export interface WhyChooseItem {
  title: string;
  description: string;
  iconName: string;
}
