// screens/ProfilesScreen.tsx - CORREGIDO
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ProfileFilters } from '@/components/profiles/ProfileFilters';
import { ProfileGrid } from '@/components/profiles/ProfileGrid';
import { ProfileSearch } from '@/components/profiles/ProfileSearch';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useProfiles } from '@/hooks/useProfiles';
import { ProfileFilters as ProfileFiltersType, PublicProfile } from '@/types/profiles';
import React, { useState } from 'react';
import { Alert, Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

// Habilidades disponibles para filtrar
const SKILL_OPTIONS = [
  'UI/UX', 'React', 'React Native', 'Node.js', 'Python', 'JavaScript',
  'TypeScript', 'Figma', 'Photoshop', 'Illustrator', 'Photography',
  '3D', 'Animation', 'Video Editing', 'Marketing', 'SEO', 'Content Writing',
  'MongoDB', 'Firebase', 'AWS', 'Docker', 'Git', 'Agile'
];

export const ProfilesScreen: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ProfileFiltersType>({
    skills: [],
    sortBy: 'relevance',
    searchText: '',
  });

  const { profiles, loading, error, refetch } = useProfiles(filters);

  const handleProfilePress = (profile: PublicProfile) => {
    // En producción, abrir el portfolio en el navegador
    Alert.alert(
      profile.name,
      `${profile.title}\n\nPortfolio: ${profile.portfolioUrl}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Ver Portfolio', onPress: () => console.log('Abrir:', profile.portfolioUrl) }
      ]
    );
  };

  const handleSearchChange = (text: string) => {
    setFilters(prev => ({ ...prev, searchText: text }));
  };

  if (error) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <ThemedText style={{ fontSize: 18, color: '#ef4444', textAlign: 'center' }}>
          {error}
        </ThemedText>
        <TouchableOpacity
          onPress={refetch}
          style={{
            marginTop: 20,
            backgroundColor: '#2563eb',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
        >
          <ThemedText style={{ color: 'white', fontWeight: '600' }}>
            Reintentar
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <View style={{
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
      }}>
        <ThemedText style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: 8,
        }}>
          Perfiles Profesionales
        </ThemedText>
        <ThemedText style={{
          fontSize: 16,
          color: '#6b7280',
        }}>
          Descubre portfolios increíbles de nuestra comunidad
        </ThemedText>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={{
          padding: 20,
          maxWidth: 1200,
          width: '100%',
          alignSelf: 'center',
        }}>
          {/* Barra de búsqueda */}
          <ProfileSearch
            value={filters.searchText}
            onChangeText={handleSearchChange}
          />

          {/* Botón de filtros */}
          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            style={{
              backgroundColor: showFilters ? '#2563eb' : 'white',
              borderWidth: 1,
              borderColor: showFilters ? '#2563eb' : '#d1d5db',
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 8,
              marginBottom: 20,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
            }}
          >
            <ThemedText style={{
              fontSize: 16,
              color: showFilters ? 'white' : '#4b5563',
              marginRight: 8,
            }}>
              ⚙️ Filtros
            </ThemedText>
            {filters.skills.length > 0 && (
              <View style={{
                backgroundColor: showFilters ? 'white' : '#2563eb',
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 10,
              }}>
                <ThemedText style={{
                  fontSize: 12,
                  color: showFilters ? '#2563eb' : 'white',
                  fontWeight: '600',
                }}>
                  {filters.skills.length}
                </ThemedText>
              </View>
            )}
          </TouchableOpacity>

          {/* Panel de filtros */}
          <ProfileFilters
            filters={filters}
            onFiltersChange={setFilters}
            skillOptions={SKILL_OPTIONS}
            isVisible={showFilters}
          />

          {/* Grid de perfiles */}
          {loading ? (
            <LoadingSpinner text="Cargando perfiles..." />
          ) : (
            <ProfileGrid
              profiles={profiles}
              onProfilePress={handleProfilePress}
              emptyMessage={
                filters.searchText || filters.skills.length > 0
                  ? 'No se encontraron perfiles con estos criterios'
                  : 'No hay perfiles disponibles'
              }
            />
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
};