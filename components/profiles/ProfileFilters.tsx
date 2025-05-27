// components/profiles/ProfileFilters.tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ProfileFilters as ProfileFiltersType } from '@/types/profiles';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

interface ProfileFiltersProps {
  filters: ProfileFiltersType;
  onFiltersChange: (filters: ProfileFiltersType) => void;
  skillOptions: string[];
  isVisible: boolean;
}

export const ProfileFilters: React.FC<ProfileFiltersProps> = ({
  filters,
  onFiltersChange,
  skillOptions,
  isVisible,
}) => {
  if (!isVisible) return null;

  const toggleSkill = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    
    onFiltersChange({
      ...filters,
      skills: newSkills,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      skills: [],
      sortBy: 'relevance',
      searchText: '',
    });
  };

  const sortOptions: Array<{ key: ProfileFiltersType['sortBy']; label: string }> = [
    { key: 'relevance', label: 'Relevancia' },
    { key: 'newest', label: 'Más nuevo' },
    { key: 'oldest', label: 'Más antiguo' },
    { key: 'most-viewed', label: 'Más visto' },
    { key: 'least-viewed', label: 'Menos visto' },
  ];

  return (
    <ThemedView style={{
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 12,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: '#e5e7eb',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 3,
    }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}>
        <ThemedText style={{
          fontSize: 18,
          fontWeight: '600',
          color: '#1f2937',
        }}>
          Filtros
        </ThemedText>
        {(filters.skills.length > 0 || filters.sortBy !== 'relevance') && (
          <TouchableOpacity onPress={clearFilters}>
            <ThemedText style={{
              color: '#ef4444',
              fontWeight: '500',
              fontSize: 14,
            }}>
              Limpiar todo
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>

      {/* Ordenar por */}
      <View style={{ marginBottom: 20 }}>
        <ThemedText style={{
          fontSize: 16,
          fontWeight: '500',
          color: '#374151',
          marginBottom: 12,
        }}>
          Ordenar por
        </ThemedText>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: -4 }}
        >
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              onPress={() => onFiltersChange({ ...filters, sortBy: option.key })}
              style={{
                backgroundColor: filters.sortBy === option.key ? '#2563eb' : '#f3f4f6',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                marginHorizontal: 4,
              }}
            >
              <ThemedText style={{
                fontSize: 14,
                color: filters.sortBy === option.key ? 'white' : '#6b7280',
                fontWeight: filters.sortBy === option.key ? '600' : '400',
              }}>
                {option.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Filtrar por habilidades */}
      <View>
        <ThemedText style={{
          fontSize: 16,
          fontWeight: '500',
          color: '#374151',
          marginBottom: 12,
        }}>
          Filtrar por habilidades
        </ThemedText>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
        }}>
          {skillOptions.map((skill) => (
            <TouchableOpacity
              key={skill}
              onPress={() => toggleSkill(skill)}
              style={{
                backgroundColor: filters.skills.includes(skill) ? '#eff6ff' : '#f9fafb',
                borderWidth: 1,
                borderColor: filters.skills.includes(skill) ? '#2563eb' : '#e5e7eb',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16,
                marginBottom: 8,
                marginRight: 8,
              }}
            >
              <ThemedText style={{
                fontSize: 13,
                color: filters.skills.includes(skill) ? '#2563eb' : '#6b7280',
                fontWeight: filters.skills.includes(skill) ? '600' : '400',
              }}>
                {skill}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Resumen de filtros activos */}
      {filters.skills.length > 0 && (
        <View style={{
          marginTop: 16,
          paddingTop: 16,
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
        }}>
          <ThemedText style={{
            fontSize: 14,
            color: '#6b7280',
          }}>
            {filters.skills.length} {filters.skills.length === 1 ? 'habilidad seleccionada' : 'habilidades seleccionadas'}
          </ThemedText>
        </View>
      )}
    </ThemedView>
  );
};