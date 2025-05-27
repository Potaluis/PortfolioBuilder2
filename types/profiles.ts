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