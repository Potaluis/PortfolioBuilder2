import { PublicProfile } from "@/types/landing";

export const calculatePopularityScore = (
  views: number,
  contacts: number,
  rating: number,
  daysActive: number
): number => {
  const viewsWeight = 0.4;
  const contactsWeight = 0.4;
  const ratingWeight = 0.2;
  
  const normalizedViews = Math.min(views / 1000, 1); // Normalizar hasta 1000 views
  const normalizedContacts = Math.min(contacts / 100, 1); // Normalizar hasta 100 contacts
  const normalizedRating = rating / 5; // Normalizar rating 0-1
  
  const baseScore = (
    normalizedViews * viewsWeight +
    normalizedContacts * contactsWeight +
    normalizedRating * ratingWeight
  ) * 10;
  
  // Bonus por actividad reciente
  const activityBonus = Math.max(0, (30 - daysActive) / 30) * 0.5;
  
  return Math.min(baseScore + activityBonus, 10);
};

export const getTopProfiles = (profiles: PublicProfile[], count: number = 3): PublicProfile[] => {
  return profiles
    .filter(profile => profile.published)
    .sort((a, b) => {
      // Primero los featured
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Luego por popularityScore
      return b.popularityScore - a.popularityScore;
    })
    .slice(0, count);
};