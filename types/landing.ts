export interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  overlayColor: string;
  active?: boolean;
  order?: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  verified?: boolean;
}

export interface FeaturedProfile {
  id: number;
  name: string;
  title: string;
  description: string;
  avatar: string;
  skills: string[];
  views: number;
  contacts: number;
  rating: number;
  portfolioUrl: string;
  featured?: boolean;
}

// ==========================================
// types/profiles.ts
// ==========================================
export interface PublicProfile {
  id: string;
  userId: string;
  name: string;
  title: string;
  description: string;
  avatar?: string;
  skills: string[];
  portfolioUrl: string;
  published: boolean;
  featured: boolean;
  totalViews: number;
  totalContacts: number;
  lastWeekViews: number;
  lastWeekContacts: number;
  popularityScore: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileFilters {
  skills: string[];
  sortBy: 'relevance' | 'newest' | 'oldest' | 'most-viewed' | 'least-viewed';
  searchText: string;
}