// components/profiles/ProfileGrid.tsx
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ThemedText } from '@/components/ThemedText';
import { PublicProfile } from '@/types/profiles';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { ProfileCard } from './ProfileCard';

const { width } = Dimensions.get('window');

interface ProfileGridProps {
  profiles: PublicProfile[];
  loading?: boolean;
  onProfilePress: (profile: PublicProfile) => void;
  emptyMessage?: string;
}

export const ProfileGrid: React.FC<ProfileGridProps> = ({
  profiles,
  loading = false,
  onProfilePress,
  emptyMessage = 'No se encontraron perfiles'
}) => {
  if (loading) {
    return <LoadingSpinner text="Cargando perfiles..." />;
  }

  if (profiles.length === 0) {
    return (
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
          {emptyMessage}
        </ThemedText>
        <ThemedText style={{
          fontSize: 14,
          color: '#6b7280',
          textAlign: 'center',
        }}>
          Prueba ajustando los filtros de búsqueda
        </ThemedText>
      </View>
    );
  }

  return (
    <View>
      <ThemedText style={{
        fontSize: 16,
        color: '#6b7280',
        marginBottom: 20,
      }}>
        {profiles.length} {profiles.length === 1 ? 'perfil encontrado' : 'perfiles encontrados'}
      </ThemedText>

      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        justifyContent: width > 1200 ? 'flex-start' : 'center',
      }}>
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onPress={() => onProfilePress(profile)}
          />
        ))}
      </View>
    </View>
  );
};