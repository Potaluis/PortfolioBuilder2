import { ProfileFilters, PublicProfile } from '@/types/profiles';
import { useEffect, useState } from 'react';

// Datos mock para desarrollo
const mockProfiles: PublicProfile[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'María González',
    title: 'Diseñadora UX/UI',
    description: 'Especialista en diseño de interfaces modernas y experiencias de usuario excepcionales.',
    skills: ['UI/UX', 'Figma', 'Prototyping', 'User Research'],
    portfolioUrl: 'https://maria-design.portfoliobuilder.com',
    published: true,
    featured: true,
    totalViews: 1250,
    totalContacts: 89,
    lastWeekViews: 150,
    lastWeekContacts: 12,
    popularityScore: 9.2,
    rating: 4.9,
    createdAt: '2024-01-15',
    updatedAt: '2024-05-20',
  },
  // Más perfiles...
];

export const useProfiles = (filters?: ProfileFilters) => {
  const [profiles, setProfiles] = useState<PublicProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfiles();
  }, [filters]);

  const loadProfiles = async () => {
    setLoading(true);
    try {
      // En producción, cargar desde Firebase
      await new Promise(resolve => setTimeout(resolve, 500)); // Simular carga
      
      let filteredProfiles = [...mockProfiles];
      
      if (filters) {
        // Aplicar filtros
        if (filters.searchText) {
          const search = filters.searchText.toLowerCase();
          filteredProfiles = filteredProfiles.filter(profile =>
            profile.name.toLowerCase().includes(search) ||
            profile.title.toLowerCase().includes(search) ||
            profile.description.toLowerCase().includes(search)
          );
        }
        
        if (filters.skills.length > 0) {
          filteredProfiles = filteredProfiles.filter(profile =>
            filters.skills.some(skill => profile.skills.includes(skill))
          );
        }
        
        // Aplicar ordenación
        switch (filters.sortBy) {
          case 'newest':
            filteredProfiles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
          case 'oldest':
            filteredProfiles.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            break;
          case 'most-viewed':
            filteredProfiles.sort((a, b) => b.totalViews - a.totalViews);
            break;
          case 'least-viewed':
            filteredProfiles.sort((a, b) => a.totalViews - b.totalViews);
            break;
          default: // relevance
            filteredProfiles.sort((a, b) => {
              if (a.featured && !b.featured) return -1;
              if (!a.featured && b.featured) return 1;
              return b.popularityScore - a.popularityScore;
            });
        }
      }
      
      setProfiles(filteredProfiles);
    } catch (err) {
      setError('Error cargando perfiles');
    } finally {
      setLoading(false);
    }
  };

  return {
    profiles,
    loading,
    error,
    refetch: loadProfiles,
  };
};