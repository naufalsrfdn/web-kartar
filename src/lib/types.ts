export interface Member {
  id: string;
  fullName: string;
  gender: "Laki-laki" | "Perempuan";
  pob: string;
  dob: string;
  whatsapp: string;
  rt: "RT 1" | "RT 2" | "RT 3";
  photoUrl: string;
  roleTitle?: string;
  isApproved: boolean;
  createdAt: string;
}

export interface MemberApplication {
  id: string;
  fullName: string;
  gender: "Laki-laki" | "Perempuan";
  pob: string;
  dob: string;
  whatsapp: string;
  rt: "RT 1" | "RT 2" | "RT 3";
  photoUrl: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  note?: string;
  createdAt: string;
}

export interface Leadership {
  id: string;
  memberId?: string;
  name: string;
  roleTitle: string;
  division?: string;
  photoUrl: string;
  whatsapp?: string;
  orderIndex: number;
}

export interface UmkmItem {
  id: string;
  name: string;
  owner: string;
  whatsapp: string;
  category?: string;
  description: string;
  priceRange?: string;
  imageUrl: string;
  location?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
  previewPhotos: string[];
  gdriveUrl: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  date: string;
  category: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  description: string;
  category: string;
  year: number;
  target: string;
  status: "PLANNED" | "ONGOING" | "COMPLETED";
}

export interface FinancialTransaction {
  id: string;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: string;
  note?: string;
}

export interface SystemSettings {
  registrationOpen: boolean;
  secretariatAddress: string;
  whatsappNumber: string;
  instagramHandle: string;
  tiktokHandle: string;
  mapsEmbedUrl: string;
  heroNotice?: string;
}
