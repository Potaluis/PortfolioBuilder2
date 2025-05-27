// components/common/Footer.tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { Dimensions, Linking, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export const Footer: React.FC = () => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:juanlupriv24@gmail.com');
  };

  const handleGithubPress = () => {
    // Añadir tu GitHub cuando tengas el proyecto público
    Linking.openURL('https://github.com/juanlumoreno');
  };

  const handleLinkedInPress = () => {
    // Añadir tu LinkedIn
    Linking.openURL('https://linkedin.com/in/juanluismoreno');
  };

  return (
    <ThemedView style={{
      backgroundColor: '#1f2937',
      paddingVertical: 48,
      paddingHorizontal: 20,
    }}>
      <View style={{
        maxWidth: 1200,
        width: '100%',
        alignSelf: 'center',
      }}>
        {/* Contenido principal */}
        <View style={{
          flexDirection: width > 768 ? 'row' : 'column',
          justifyContent: 'space-between',
          alignItems: width > 768 ? 'flex-start' : 'center',
          gap: 32,
          marginBottom: 32,
        }}>
          {/* Logo y descripción */}
          <View style={{
            flex: 1,
            alignItems: width > 768 ? 'flex-start' : 'center',
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
            }}>
              <View style={{
                width: 32,
                height: 32,
                backgroundColor: '#2563eb',
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
              }}>
                <ThemedText style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                  PB
                </ThemedText>
              </View>
              <ThemedText style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
              }}>
                PortfolioBuilder
              </ThemedText>
            </View>
            
            <ThemedText style={{
              fontSize: 16,
              color: '#9ca3af',
              textAlign: width > 768 ? 'left' : 'center',
              maxWidth: 300,
              lineHeight: 24,
              marginBottom: 16,
            }}>
              La plataforma más fácil para crear portfolios profesionales que destacan.
            </ThemedText>

            {/* Redes sociales */}
            <View style={{
              flexDirection: 'row',
              gap: 12,
            }}>
              <TouchableOpacity
                onPress={handleEmailPress}
                style={{
                  backgroundColor: '#374151',
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <ThemedText style={{ fontSize: 16 }}>📧</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleGithubPress}
                style={{
                  backgroundColor: '#374151',
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <ThemedText style={{ fontSize: 16 }}>⚡</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleLinkedInPress}
                style={{
                  backgroundColor: '#374151',
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <ThemedText style={{ fontSize: 16 }}>💼</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Enlaces rápidos */}
          <View style={{
            alignItems: width > 768 ? 'flex-start' : 'center',
          }}>
            <ThemedText style={{
              fontSize: 18,
              fontWeight: '600',
              color: 'white',
              marginBottom: 16,
            }}>
              Enlaces Rápidos
            </ThemedText>
            
            <View style={{ gap: 8 }}>
              <TouchableOpacity>
                <ThemedText style={{
                  fontSize: 14,
                  color: '#9ca3af',
                  textAlign: width > 768 ? 'left' : 'center',
                }}>
                  Cómo funciona
                </ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity>
                <ThemedText style={{
                  fontSize: 14,
                  color: '#9ca3af',
                  textAlign: width > 768 ? 'left' : 'center',
                }}>
                  Plantillas
                </ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity>
                <ThemedText style={{
                  fontSize: 14,
                  color: '#9ca3af',
                  textAlign: width > 768 ? 'left' : 'center',
                }}>
                  Precios
                </ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity>
                <ThemedText style={{
                  fontSize: 14,
                  color: '#9ca3af',
                  textAlign: width > 768 ? 'left' : 'center',
                }}>
                  Soporte
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Información legal */}
          <View style={{
            alignItems: width > 768 ? 'flex-start' : 'center',
          }}>
            <ThemedText style={{
              fontSize: 18,
              fontWeight: '600',
              color: 'white',
              marginBottom: 16,
            }}>
              Legal
            </ThemedText>
            
            <View style={{ gap: 8 }}>
              <TouchableOpacity>
                <ThemedText style={{
                  fontSize: 14,
                  color: '#9ca3af',
                  textAlign: width > 768 ? 'left' : 'center',
                }}>
                  Términos de uso
                </ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity>
                <ThemedText style={{
                  fontSize: 14,
                  color: '#9ca3af',
                  textAlign: width > 768 ? 'left' : 'center',
                }}>
                  Política de privacidad
                </ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity>
                <ThemedText style={{
                  fontSize: 14,
                  color: '#9ca3af',
                  textAlign: width > 768 ? 'left' : 'center',
                }}>
                  Cookies
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Línea separadora */}
        <View style={{
          height: 1,
          backgroundColor: '#374151',
          marginBottom: 24,
        }} />

        {/* Copyright y créditos */}
        <View style={{
          flexDirection: width > 600 ? 'row' : 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
        }}>
          <View style={{
            alignItems: width > 600 ? 'flex-start' : 'center',
          }}>
            <ThemedText style={{
              fontSize: 14,
              color: '#9ca3af',
              textAlign: 'center',
              marginBottom: 4,
            }}>
              © {new Date().getFullYear()} PortfolioBuilder. Todos los derechos reservados.
            </ThemedText>
            
            <ThemedText style={{
              fontSize: 12,
              color: '#6b7280',
              textAlign: 'center',
            }}>
              Desarrollado con ❤️ por Juan Luis Moreno Bernal
            </ThemedText>
          </View>

          {/* Tecnologías utilizadas */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            backgroundColor: '#374151',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}>
              <ThemedText style={{ fontSize: 16 }}>⚛️</ThemedText>
              <ThemedText style={{
                fontSize: 12,
                color: '#9ca3af',
                fontWeight: '500',
              }}>
                React Native
              </ThemedText>
            </View>
            
            <ThemedText style={{
              color: '#6b7280',
              fontSize: 12,
            }}>
              +
            </ThemedText>
            
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}>
              <ThemedText style={{ fontSize: 16 }}>📱</ThemedText>
              <ThemedText style={{
                fontSize: 12,
                color: '#9ca3af',
                fontWeight: '500',
              }}>
                Expo
              </ThemedText>
            </View>
            
            <ThemedText style={{
              color: '#6b7280',
              fontSize: 12,
            }}>
              +
            </ThemedText>
            
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}>
              <ThemedText style={{ fontSize: 16 }}>🔥</ThemedText>
              <ThemedText style={{
                fontSize: 12,
                color: '#9ca3af',
                fontWeight: '500',
              }}>
                Firebase
              </ThemedText>
            </View>
          </View>
        </View>
      </View>
    </ThemedView>
  );
};