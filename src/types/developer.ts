export interface Developer {
  _id: string;
  developerName: string;
  slug: string;
  shortDescription: string;
  highlights: string[];
  location: string;
  developerLogo: string; // URL (required)
  establishedYear?: number;
  totalProjects?: number;
  website?: string;
  createdAt: string;
  updatedAt: string;
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
