// components/profiles/ProfileCard.tsx
import { ThemedText } from '@/components/ThemedText';
import { PublicProfile } from '@/types/profiles';
import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface ProfileCardProps {
  profile: PublicProfile;
  onPress: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onPress }) => {
  const cardWidth = width > 1200 ? '30%' : width > 768 ? '45%' : '100%';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: cardWidth,
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
        marginBottom: 20,
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
          backgroundColor: '#e5e7eb',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 8,
        }}>
          {profile.avatar ? (
            <ThemedText style={{
              fontSize: 24,
              color: '#6b7280',
            }}>
              {profile.avatar}
            </ThemedText>
          ) : (
            <ThemedText style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
              {profile.name.charAt(0).toUpperCase()}
            </ThemedText>
          )}
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
            {profile.rating.toFixed(1)}
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
      }} numberOfLines={3}>
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
              marginRight: 4,
              marginBottom: 4,
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
            {profile.totalViews}
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
            {profile.totalContacts}
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
  );
};