// screens/ProfilesScreen.tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { usePortfolioApp } from '@/hooks/usePortfolioApp';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Dimensions, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

// Datos de ejemplo de perfiles públicos
const mockProfiles = [
  {
    id: 1,
    name: "María González",
    title: "Diseñadora UX/UI",
    description: "Especialista en diseño de interfaces modernas y experiencias de usuario excepcionales. Con más de 5 años de experiencia.",
    avatar: "MG",
    skills: ["UI/UX", "Figma", "Prototyping", "User Research"],
    views: 1250,
    contacts: 89,
    rating: 4.9,
    createdAt: "2024-01-15",
    featured: true
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    title: "Desarrollador Full Stack",
    description: "Experto en React, Node.js y arquitecturas escalables. Apasionado por el código limpio y las mejores prácticas.",
    avatar: "CR",
    skills: ["React", "Node.js", "MongoDB", "TypeScript"],
    views: 1180,
    contacts: 76,
    rating: 4.8,
    createdAt: "2024-02-01",
    featured: true
  },
  {
    id: 3,
    name: "Ana Martín",
    title: "Fotógrafa Profesional",
    description: "Especializada en fotografía de retrato y eventos. Capturando momentos únicos con un estilo artístico distintivo.",
    avatar: "AM",
    skills: ["Fotografía", "Lightroom", "Photoshop", "Edición"],
    views: 1050,
    contacts: 94,
    rating: 5.0,
    createdAt: "2024-01-20",
    featured: true
  },
  {
    id: 4,
    name: "David López",
    title: "Arquitecto",
    description: "Diseño de espacios innovadores y sostenibles. Especializado en arquitectura residencial y comercial moderna.",
    avatar: "DL",
    skills: ["AutoCAD", "3D Modeling", "Diseño Sostenible", "Renders"],
    views: 890,
    contacts: 45,
    rating: 4.7,
    createdAt: "2024-03-10",
    featured: false
  },
  {
    id: 5,
    name: "Carmen Jiménez",
    title: "Ilustradora Digital",
    description: "Creación de ilustraciones digitales para libros, revistas y marcas. Estilo único y versátil.",
    avatar: "CJ",
    skills: ["Ilustración", "Procreate", "Adobe Illustrator", "Concept Art"],
    views: 750,
    contacts: 62,
    rating: 4.9,
    createdAt: "2024-02-28",
    featured: false
  },
  {
    id: 6,
    name: "Andrés Ruiz",
    title: "Marketing Digital",
    description: "Estrategias de marketing digital que generan resultados. Experto en SEO, SEM y redes sociales.",
    avatar: "AR",
    skills: ["SEO", "Google Ads", "Social Media", "Analytics"],
    views: 650,
    contacts: 38,
    rating: 4.6,
    createdAt: "2024-03-05",
    featured: false
  }
];

const allSkills = [
  "UI/UX", "Figma", "Prototyping", "User Research", "React", "Node.js", 
  "MongoDB", "TypeScript", "Fotografía", "Lightroom", "Photoshop", "Edición",
  "AutoCAD", "3D Modeling", "Diseño Sostenible", "Renders", "Ilustración",
  "Procreate", "Adobe Illustrator", "Concept Art", "SEO", "Google Ads",
  "Social Media", "Analytics", "JavaScript", "Python", "Diseño Gráfico",
  "Branding", "WordPress", "E-commerce", "Flutter", "Swift"
];

type SortOption = 'relevance' | 'newest' | 'oldest' | 'most-viewed' | 'least-viewed';

export const ProfilesScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [showFilters, setShowFilters] = useState(false);

  const { user, openAuthModal } = usePortfolioApp();

  const handleBackToHome = () => {
    router.push('/(tabs)');
  };

  const toggleSkillFilter = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSelectedSkills([]);
    setSearchText('');
    setSortBy('relevance');
  };

  // Filtrar y ordenar perfiles
  const getFilteredProfiles = () => {
    let filtered = mockProfiles.filter(profile => {
      // Filtro por texto
      const matchesSearch = profile.name.toLowerCase().includes(searchText.toLowerCase()) ||
                           profile.title.toLowerCase().includes(searchText.toLowerCase()) ||
                           profile.description.toLowerCase().includes(searchText.toLowerCase());
      
      // Filtro por habilidades
      const matchesSkills = selectedSkills.length === 0 || 
                           selectedSkills.some(skill => profile.skills.includes(skill));
      
      return matchesSearch && matchesSkills;
    });

    // Ordenar
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'most-viewed':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'least-viewed':
        filtered.sort((a, b) => a.views - b.views);
        break;
      case 'relevance':
      default:
        // Ordenar por featured primero, luego por views + contacts
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.views + b.contacts * 10) - (a.views + a.contacts * 10);
        });
        break;
    }

    return filtered;
  };

  const handleViewProfile = (profileId: number) => {
    // En producción, abrir el portfolio público
    console.log(`Viewing profile ${profileId}`);
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <Header 
        onNavigate={handleBackToHome}
        onAuthPress={() => openAuthModal('login')}
        isLoggedIn={!!user}
      />

      <ScrollView style={{ flex: 1, marginTop: 80 }}>
        <ThemedView style={{ padding: 20 }}>
          {/* Título y búsqueda */}
          <View style={{ marginBottom: 32 }}>
            <ThemedText style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: 8,
            }}>
              Explora Perfiles
            </ThemedText>
            <ThemedText style={{
              fontSize: 16,
              color: '#6b7280',
              marginBottom: 24,
            }}>
              Descubre el trabajo de profesionales talentosos
            </ThemedText>

            {/* Barra de búsqueda */}
            <TextInput
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 16,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 2,
              }}
              placeholder="Buscar por nombre, profesión o habilidad..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Filtros y ordenación */}
          <View style={{
            flexDirection: width > 768 ? 'row' : 'column',
            justifyContent: 'space-between',
            alignItems: width > 768 ? 'center' : 'stretch',
            gap: 16,
            marginBottom: 24,
          }}>
            {/* Botón mostrar filtros */}
            <TouchableOpacity
              onPress={() => setShowFilters(!showFilters)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#d1d5db',
              }}
            >
              <ThemedText style={{ marginRight: 8 }}>🔍</ThemedText>
              <ThemedText style={{ fontWeight: '500' }}>
                Filtros {selectedSkills.length > 0 && `(${selectedSkills.length})`}
              </ThemedText>
            </TouchableOpacity>

            {/* Ordenación */}
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
              {[
                { key: 'relevance', label: 'Relevancia' },
                { key: 'newest', label: 'Más nuevo' },
                { key: 'oldest', label: 'Más antiguo' },
                { key: 'most-viewed', label: 'Más visto' },
                { key: 'least-viewed', label: 'Menos visto' }
              ].map((option) => (
                <TouchableOpacity
                  key={option.key}
                  onPress={() => setSortBy(option.key as SortOption)}
                  style={{
                    backgroundColor: sortBy === option.key ? '#2563eb' : 'white',
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: sortBy === option.key ? '#2563eb' : '#d1d5db',
                  }}
                >
                  <ThemedText style={{
                    fontSize: 14,
                    color: sortBy === option.key ? 'white' : '#6b7280',
                    fontWeight: sortBy === option.key ? '600' : '400',
                  }}>
                    {option.label}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Panel de filtros por habilidades */}
          {showFilters && (
            <View style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 12,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: '#e5e7eb',
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}>
                <ThemedText style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#1f2937',
                }}>
                  Filtrar por Habilidades
                </ThemedText>
                {selectedSkills.length > 0 && (
                  <TouchableOpacity onPress={clearFilters}>
                    <ThemedText style={{
                      color: '#ef4444',
                      fontWeight: '500',
                    }}>
                      Limpiar
                    </ThemedText>
                  </TouchableOpacity>
                )}
              </View>

              <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
              }}>
                {allSkills.map((skill) => (
                  <TouchableOpacity
                    key={skill}
                    onPress={() => toggleSkillFilter(skill)}
                    style={{
                      backgroundColor: selectedSkills.includes(skill) ? '#eff6ff' : '#f9fafb',
                      borderWidth: 1,
                      borderColor: selectedSkills.includes(skill) ? '#2563eb' : '#e5e7eb',
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 16,
                    }}
                  >
                    <ThemedText style={{
                      fontSize: 13,
                      color: selectedSkills.includes(skill) ? '#2563eb' : '#6b7280',
                      fontWeight: selectedSkills.includes(skill) ? '600' : '400',
                    }}>
                      {skill}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Resultados */}
          <View style={{ marginBottom: 32 }}>
            <ThemedText style={{
              fontSize: 16,
              color: '#6b7280',
              marginBottom: 20,
            }}>
              {getFilteredProfiles().length} perfiles encontrados
            </ThemedText>

            {/* Grid de perfiles */}
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 20,
              justifyContent: width > 1200 ? 'flex-start' : 'center',
            }}>
              {getFilteredProfiles().map((profile) => (
                <TouchableOpacity
                  key={profile.id}
                  onPress={() => handleViewProfile(profile.id)}
                  style={{
                    width: width > 1200 ? '30%' : width > 768 ? '45%' : '100%',
                    maxWidth: 380,
                    backgroundColor: 'white',
                    borderRadius: 16,
                    padding: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    elevation: 4,
                    borderWidth: 1,
                    borderColor: '#f3f4f6',
                  }}
                >
                  {/* Featured badge */}
                  {profile.featured && (
                    <View style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      backgroundColor: '#f59e0b',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 8,
                    }}>
                      <ThemedText style={{
                        fontSize: 10,
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                        ⭐ DESTACADO
                      </ThemedText>
                    </View>
                  )}

                  {/* Avatar y rating */}
                  <View style={{
                    alignItems: 'center',
                    marginBottom: 16,
                  }}>
                    <View style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: `hsl(${profile.id * 60}, 70%, 60%)`,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}>
                      <ThemedText style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                        {profile.avatar}
                      </ThemedText>
                    </View>

                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                      <ThemedText style={{ fontSize: 14, color: '#f59e0b' }}>
                        {'★'.repeat(Math.floor(profile.rating))}
                      </ThemedText>
                      <ThemedText style={{
                        fontSize: 12,
                        color: '#6b7280',
                        marginLeft: 4,
                      }}>
                        {profile.rating}
                      </ThemedText>
                    </View>
                  </View>

                  {/* Info */}
                  <ThemedText style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#1f2937',
                    textAlign: 'center',
                    marginBottom: 4,
                  }}>
                    {profile.name}
                  </ThemedText>

                  <ThemedText style={{
                    fontSize: 14,
                    color: '#2563eb',
                    fontWeight: '600',
                    textAlign: 'center',
                    marginBottom: 12,
                  }}>
                    {profile.title}
                  </ThemedText>

                  <ThemedText style={{
                    fontSize: 13,
                    color: '#6b7280',
                    textAlign: 'center',
                    lineHeight: 18,
                    marginBottom: 16,
                  }}>
                    {profile.description}
                  </ThemedText>

                  {/* Skills */}
                  <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 4,
                    marginBottom: 16,
                  }}>
                    {profile.skills.slice(0, 3).map((skill, index) => (
                      <View
                        key={index}
                        style={{
                          backgroundColor: '#eff6ff',
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                          borderRadius: 8,
                        }}
                      >
                        <ThemedText style={{
                          fontSize: 10,
                          color: '#2563eb',
                          fontWeight: '500',
                        }}>
                          {skill}
                        </ThemedText>
                      </View>
                    ))}
                    {profile.skills.length > 3 && (
                      <View style={{
                        backgroundColor: '#f3f4f6',
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderRadius: 8,
                      }}>
                        <ThemedText style={{
                          fontSize: 10,
                          color: '#6b7280',
                          fontWeight: '500',
                        }}>
                          +{profile.skills.length - 3}
                        </ThemedText>
                      </View>
                    )}
                  </View>

                  {/* Stats */}
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    paddingTop: 12,
                    borderTopWidth: 1,
                    borderTopColor: '#f3f4f6',
                  }}>
                    <View style={{ alignItems: 'center' }}>
                      <ThemedText style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#1f2937',
                      }}>
                        {profile.views}
                      </ThemedText>
                      <ThemedText style={{
                        fontSize: 10,
                        color: '#6b7280',
                      }}>
                        Visitas
                      </ThemedText>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                      <ThemedText style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#1f2937',
                      }}>
                        {profile.contacts}
                      </ThemedText>
                      <ThemedText style={{
                        fontSize: 10,
                        color: '#6b7280',
                      }}>
                        Contactos
                      </ThemedText>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Mensaje si no hay resultados */}
            {getFilteredProfiles().length === 0 && (
              <View style={{
                alignItems: 'center',
                paddingVertical: 48,
              }}>
                <ThemedText style={{
                  fontSize: 48,
                  marginBottom: 16,
                }}>
                  🔍
                </ThemedText>
                <ThemedText style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: 8,
                }}>
                  No se encontraron perfiles
                </ThemedText>
                <ThemedText style={{
                  fontSize: 14,
                  color: '#6b7280',
                  textAlign: 'center',
                  marginBottom: 16,
                }}>
                  Prueba ajustando los filtros de búsqueda
                </ThemedText>
                <TouchableOpacity
                  onPress={clearFilters}
                  style={{
                    backgroundColor: '#2563eb',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 8,
                  }}
                >
                  <ThemedText style={{
                    color: 'white',
                    fontWeight: '600',
                  }}>
                    Limpiar Filtros
                  </ThemedText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ThemedView>

        <Footer />
      </ScrollView>
    </ThemedView>
  );
};