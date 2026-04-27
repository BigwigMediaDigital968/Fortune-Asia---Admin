export interface Developer {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  coverImage?: string;
  shortDescription: string;
  fullDescription?: string;
  website?: string;
  stats?: { establishedYear?: number; totalProjects?: number };
  highlights?: string[];
  amenities?: string[];
  certifications?: string[];
  images?: string[];
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  seo?: { metaTitle?: string; metaDescription?: string; keywords?: string[] };
  isFeatured: boolean;
  isActive: boolean;
  priority?: number;
  projects?: {
    _id: string;
    title: string;
    slug: string;
    coverImage?: string;
    location?: string;
  }[];
  faqs?: { question: string; answer: string }[];
  brochure?: string;
  createdAt: string;
}

export interface DeveloperForm {
  developerName: string;
  slug: string;
  shortDescription: string;
  highlights: string; // comma separated (UI only)
  location: string;
  developerLogo: string; // URL input
  establishedYear?: number;
  totalProjects?: number;
  website?: string;
}
