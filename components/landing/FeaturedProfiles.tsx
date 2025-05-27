// components/landing/FeaturedProfiles.tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

// Datos de ejemplo - en producción vendrían de Firebase
const featuredProfiles = [
  {
    id: 1,
    name: "María González",
    title: "Diseñadora UX/UI",
    description: "Especialista en diseño de interfaces modernas y experiencias de usuario excepcionales.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    skills: ["UI/UX", "Figma", "Prototyping"],
    views: 1250,
    contacts: 89,
    rating: 4.9,
    portfolioUrl: "https://maria-design.portfoliobuilder.com"
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    title: "Desarrollador Full Stack",
    description: "Experto en React, Node.js y arquitecturas escalables. Apasionado por el código limpio.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    skills: ["React", "Node.js", "MongoDB"],
    views: 1180,
    contacts: 76,
    rating: 4.8,
    portfolioUrl: "https://carlos-dev.portfoliobuilder.com"
  },
  {
    id: 3,
    name: "Ana Martín",
    title: "Fotógrafa Profesional",
    description: "Especializada en fotografía de retrato y eventos. Capturando momentos únicos.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    skills: ["Fotografía", "Lightroom", "Photoshop"],
    views: 1050,
    contacts: 94,
    rating: 5.0,
    portfolioUrl: "https://ana-photo.portfoliobuilder.com"
  }
];

export const FeaturedProfiles: React.FC = () => {
  const handleViewProfile = (profileUrl: string) => {
    // En producción, abrir el portfolio en una nueva ventana/navegador
    console.log(`Opening portfolio: ${profileUrl}`);
  };

  const handleViewMoreProfiles = () => {
    router.push('/profiles');
  };

  return (
    <ThemedView style={{
      paddingVertical: 80,
      paddingHorizontal: 20,
      backgroundColor: 'white',
    }}>
      <View style={{
        maxWidth: 1200,
        width: '100%',
        alignSelf: 'center',
      }}>
        {/* Título */}
        <View style={{ 
          alignItems: 'center', 
          marginBottom: 60 
        }}>
          <ThemedText style={{
            fontSize: 36,
            fontWeight: 'bold',
            color: '#1f2937',
            textAlign: 'center',
            marginBottom: 16,
          }}>
            Perfiles Destacados
          </ThemedText>
          <ThemedText style={{
            fontSize: 18,
            color: '#6b7280',
            textAlign: 'center',
            maxWidth: 600,
            lineHeight: 26,
          }}>
            Los profesionales más destacados de la semana por visitas y contactos
          </ThemedText>
        </View>

        {/* Grid de Perfiles */}
        <View style={{
          flexDirection: width > 900 ? 'row' : 'column',
          gap: 24,
          marginBottom: 48,
        }}>
          {featuredProfiles.map((profile, index) => (
            <TouchableOpacity
              key={profile.id}
              onPress={() => handleViewProfile(profile.portfolioUrl)}
              style={{
                flex: 1,
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 24,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 8,
                borderWidth: 1,
                borderColor: '#f3f4f6',
                transform: [{ scale: index === 0 ? 1.02 : 1 }], // Destacar el primero
              }}
            >
              {/* Badge de posición */}
              <View style={{
                position: 'absolute',
                top: -8,
                right: 16,
                backgroundColor: index === 0 ? '#f59e0b' : index === 1 ? '#6b7280' : '#cd7f32',
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 12,
              }}>
                <ThemedText style={{
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                  #{index + 1}
                </ThemedText>
              </View>

              {/* Avatar */}
              <View style={{
                alignItems: 'center',
                marginBottom: 16,
              }}>
                <View style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: '#e5e7eb',
                  marginBottom: 12,
                  overflow: 'hidden',
                }}>
                  {/* Placeholder para imagen - en producción usar Image */}
                  <View style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: `hsl(${profile.id * 60}, 70%, 60%)`,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <ThemedText style={{
                      color: 'white',
                      fontSize: 24,
                      fontWeight: 'bold',
                    }}>
                      {profile.name.charAt(0)}
                    </ThemedText>
                  </View>
                </View>

                {/* Rating */}
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}>
                  <ThemedText style={{ fontSize: 16, color: '#f59e0b' }}>
                    {'★'.repeat(Math.floor(profile.rating))}
                  </ThemedText>
                  <ThemedText style={{
                    fontSize: 14,
                    color: '#6b7280',
                    marginLeft: 4,
                  }}>
                    {profile.rating}
                  </ThemedText>
                </View>
              </View>

              {/* Info */}
              <View style={{ alignItems: 'center' }}>
                <ThemedText style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: 4,
                  textAlign: 'center',
                }}>
                  {profile.name}
                </ThemedText>

                <ThemedText style={{
                  fontSize: 16,
                  color: '#2563eb',
                  fontWeight: '600',
                  marginBottom: 12,
                  textAlign: 'center',
                }}>
                  {profile.title}
                </ThemedText>

                <ThemedText style={{
                  fontSize: 14,
                  color: '#6b7280',
                  textAlign: 'center',
                  lineHeight: 20,
                  marginBottom: 16,
                }}>
                  {profile.description}
                </ThemedText>

                {/* Skills */}
                <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 8,
                  marginBottom: 16,
                }}>
                  {profile.skills.map((skill, skillIndex) => (
                    <View
                      key={skillIndex}
                      style={{
                        backgroundColor: '#eff6ff',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 12,
                      }}
                    >
                      <ThemedText style={{
                        fontSize: 12,
                        color: '#2563eb',
                        fontWeight: '500',
                      }}>
                        {skill}
                      </ThemedText>
                    </View>
                  ))}
                </View>

                {/* Stats */}
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                  paddingTop: 16,
                  borderTopWidth: 1,
                  borderTopColor: '#f3f4f6',
                }}>
                  <View style={{ alignItems: 'center' }}>
                    <ThemedText style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#1f2937',
                    }}>
                      {profile.views}
                    </ThemedText>
                    <ThemedText style={{
                      fontSize: 12,
                      color: '#6b7280',
                    }}>
                      Visitas
                    </ThemedText>
                  </View>

                  <View style={{ alignItems: 'center' }}>
                    <ThemedText style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#1f2937',
                    }}>
                      {profile.contacts}
                    </ThemedText>
                    <ThemedText style={{
                      fontSize: 12,
                      color: '#6b7280',
                    }}>
                      Contactos
                    </ThemedText>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botón Ver Más */}
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={handleViewMoreProfiles}
            style={{
              backgroundColor: '#2563eb',
              paddingHorizontal: 32,
              paddingVertical: 16,
              borderRadius: 12,
              shadowColor: '#2563eb',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <ThemedText style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
            }}>
              Ver Más Perfiles
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
};