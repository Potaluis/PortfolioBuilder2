// hooks/useProfiles.tsx - ACTUALIZADO CON MÁS DATOS
import { ProfileFilters, PublicProfile } from '@/types/profiles';
import { useEffect, useState } from 'react';

// Datos mock expandidos para desarrollo
const mockProfiles: PublicProfile[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'María González',
    title: 'Diseñadora UX/UI',
    description: 'Especialista en diseño de interfaces modernas y experiencias de usuario excepcionales. Más de 5 años creando productos digitales.',
    avatar: '👩‍💻',
    skills: ['UI/UX', 'Figma', 'Prototyping', 'User Research', 'Illustrator'],
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
  {
    id: '2',
    userId: 'user2',
    name: 'Carlos Ruiz',
    title: 'Desarrollador Full Stack',
    description: 'Experto en React, Node.js y arquitecturas escalables. Apasionado por el código limpio y las mejores prácticas.',
    avatar: '👨‍💻',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Docker', 'AWS'],
    portfolioUrl: 'https://carlos-dev.portfoliobuilder.com',
    published: true,
    featured: true,
    totalViews: 1180,
    totalContacts: 76,
    lastWeekViews: 140,
    lastWeekContacts: 10,
    popularityScore: 8.8,
    rating: 4.8,
    createdAt: '2024-02-10',
    updatedAt: '2024-05-22',
  },
  {
    id: '3',
    userId: 'user3',
    name: 'Ana Martín',
    title: 'Fotógrafa Profesional',
    description: 'Especializada en fotografía de retrato y eventos. Capturando momentos únicos con un estilo artístico.',
    avatar: '📸',
    skills: ['Photography', 'Lightroom', 'Photoshop', 'Video Editing'],
    portfolioUrl: 'https://ana-photo.portfoliobuilder.com',
    published: true,
    featured: true,
    totalViews: 1050,
    totalContacts: 94,
    lastWeekViews: 120,
    lastWeekContacts: 15,
    popularityScore: 9.5,
    rating: 5.0,
    createdAt: '2024-03-05',
    updatedAt: '2024-05-23',
  },
  {
    id: '4',
    userId: 'user4',
    name: 'Roberto López',
    title: 'Desarrollador React Native',
    description: 'Creando aplicaciones móviles increíbles. Especializado en React Native y experiencias móviles fluidas.',
    avatar: '📱',
    skills: ['React Native', 'JavaScript', 'Firebase', 'Git', 'Agile'],
    portfolioUrl: 'https://roberto-mobile.portfoliobuilder.com',
    published: true,
    featured: false,
    totalViews: 890,
    totalContacts: 45,
    lastWeekViews: 80,
    lastWeekContacts: 5,
    popularityScore: 7.2,
    rating: 4.6,
    createdAt: '2024-03-20',
    updatedAt: '2024-05-21',
  },
  {
    id: '5',
    userId: 'user5',
    name: 'Laura Sánchez',
    title: 'Marketing Digital',
    description: 'Estratega de marketing con enfoque en crecimiento orgánico y campañas creativas.',
    avatar: '📊',
    skills: ['Marketing', 'SEO', 'Content Writing', 'Analytics'],
    portfolioUrl: 'https://laura-marketing.portfoliobuilder.com',
    published: true,
    featured: false,
    totalViews: 750,
    totalContacts: 62,
    lastWeekViews: 90,
    lastWeekContacts: 8,
    popularityScore: 7.8,
    rating: 4.7,
    createdAt: '2024-04-01',
    updatedAt: '2024-05-20',
  },
  {
    id: '6',
    userId: 'user6',
    name: 'Diego Fernández',
    title: 'Animador 3D',
    description: 'Artista 3D especializado en animación de personajes y entornos para videojuegos.',
    avatar: '🎮',
    skills: ['3D', 'Animation', 'Blender', 'Unity'],
    portfolioUrl: 'https://diego-3d.portfoliobuilder.com',
    published: true,
    featured: false,
    totalViews: 920,
    totalContacts: 38,
    lastWeekViews: 110,
    lastWeekContacts: 4,
    popularityScore: 6.9,
    rating: 4.5,
    createdAt: '2024-04-15',
    updatedAt: '2024-05-22',
  },
  {
    id: '7',
    userId: 'user7',
    name: 'Patricia Gómez',
    title: 'Desarrolladora Python',
    description: 'Backend developer con experiencia en Python, Django y machine learning.',
    avatar: '🐍',
    skills: ['Python', 'Django', 'AWS', 'Docker', 'Git'],
    portfolioUrl: 'https://patricia-python.portfoliobuilder.com',
    published: true,
    featured: false,
    totalViews: 680,
    totalContacts: 32,
    lastWeekViews: 70,
    lastWeekContacts: 3,
    popularityScore: 6.2,
    rating: 4.4,
    createdAt: '2024-05-01',
    updatedAt: '2024-05-23',
  },
  {
    id: '8',
    userId: 'user8',
    name: 'Miguel Rodríguez',
    title: 'Diseñador Gráfico',
    description: 'Creativo visual con pasión por el branding y la identidad corporativa.',
    avatar: '🎨',
    skills: ['Illustrator', 'Photoshop', 'Branding', 'Typography'],
    portfolioUrl: 'https://miguel-design.portfoliobuilder.com',
    published: true,
    featured: false,
    totalViews: 560,
    totalContacts: 28,
    lastWeekViews: 60,
    lastWeekContacts: 2,
    popularityScore: 5.8,
    rating: 4.3,
    createdAt: '2024-05-10',
    updatedAt: '2024-05-24',
  }
];

export const useProfiles = (filters?: ProfileFilters) => {
  const [profiles, setProfiles] = useState<PublicProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfiles();
  }, [filters?.searchText, filters?.skills, filters?.sortBy]);

  const loadProfiles = async () => {
    console.log('🔍 Cargando perfiles con filtros:', filters);
    setLoading(true);
    setError(null);
    
    try {
      // En producción, cargar desde Firebase
      await new Promise(resolve => setTimeout(resolve, 800)); // Simular carga
      
      let filteredProfiles = [...mockProfiles];
      
      if (filters) {
        // Aplicar búsqueda de texto
        if (filters.searchText && filters.searchText.trim() !== '') {
          const search = filters.searchText.toLowerCase().trim();
          filteredProfiles = filteredProfiles.filter(profile =>
            profile.name.toLowerCase().includes(search) ||
            profile.title.toLowerCase().includes(search) ||
            profile.description.toLowerCase().includes(search) ||
            profile.skills.some(skill => skill.toLowerCase().includes(search))
          );
        }
        
        // Aplicar filtro de habilidades
        if (filters.skills && filters.skills.length > 0) {
          filteredProfiles = filteredProfiles.filter(profile =>
            filters.skills.some(skill => profile.skills.includes(skill))
          );
        }
        
        // Aplicar ordenación
        switch (filters.sortBy) {
          case 'newest':
            filteredProfiles.sort((a, b) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            break;
            
          case 'oldest':
            filteredProfiles.sort((a, b) => 
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
            break;
            
          case 'most-viewed':
            filteredProfiles.sort((a, b) => b.totalViews - a.totalViews);
            break;
            
          case 'least-viewed':
            filteredProfiles.sort((a, b) => a.totalViews - b.totalViews);
            break;
            
          default: // relevance
            filteredProfiles.sort((a, b) => {
              // Primero los featured
              if (a.featured && !b.featured) return -1;
              if (!a.featured && b.featured) return 1;
              
              // Luego por popularityScore
              return b.popularityScore - a.popularityScore;
            });
        }
      }
      
      console.log(`✅ ${filteredProfiles.length} perfiles encontrados`);
      setProfiles(filteredProfiles);
      
    } catch (err) {
      console.error('❌ Error cargando perfiles:', err);
      setError('Error al cargar los perfiles. Por favor intenta de nuevo.');
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