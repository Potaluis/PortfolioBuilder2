// components/landing/HowItWorks.tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

const { width } = Dimensions.get('window');

export const HowItWorks: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);

  // URL del video trailer - reemplazar con tu video real
  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Placeholder

  const steps = [
    {
      number: "1",
      title: "Regístrate",
      description: "Crea tu cuenta gratuita en segundos",
      icon: "📝"
    },
    {
      number: "2", 
      title: "Personaliza",
      description: "Elige plantillas y personaliza tu diseño",
      icon: "🎨"
    },
    {
      number: "3",
      title: "Publica",
      description: "Comparte tu portfolio con el mundo",
      icon: "🚀"
    }
  ];

  return (
    <ThemedView style={{
      paddingVertical: 80,
      paddingHorizontal: 20,
      backgroundColor: '#f8fafc',
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
            ¿Cómo Funciona?
          </ThemedText>
          <ThemedText style={{
            fontSize: 18,
            color: '#6b7280',
            textAlign: 'center',
            maxWidth: 600,
            lineHeight: 26,
          }}>
            Crear tu portfolio profesional nunca fue tan fácil. Sigue estos simples pasos.
          </ThemedText>
        </View>

        {/* Contenido Principal */}
        <View style={{
          flexDirection: width > 768 ? 'row' : 'column',
          alignItems: 'flex-start',
          gap: 40,
        }}>
          {/* Lado Izquierdo - Pasos */}
          <View style={{
            flex: 1,
            paddingRight: width > 768 ? 20 : 0,
          }}>
            {steps.map((step, index) => (
              <View
                key={step.number}
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginBottom: 32,
                }}
              >
                {/* Número */}
                <View style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: '#2563eb',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 20,
                }}>
                  <ThemedText style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                    {step.number}
                  </ThemedText>
                </View>

                {/* Contenido */}
                <View style={{ flex: 1, paddingTop: 8 }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}>
                    <ThemedText style={{ fontSize: 24, marginRight: 8 }}>
                      {step.icon}
                    </ThemedText>
                    <ThemedText style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: '#1f2937',
                    }}>
                      {step.title}
                    </ThemedText>
                  </View>
                  
                  <ThemedText style={{
                    fontSize: 16,
                    color: '#6b7280',
                    lineHeight: 24,
                  }}>
                    {step.description}
                  </ThemedText>
                </View>

                {/* Línea conectora */}
                {index < steps.length - 1 && (
                  <View style={{
                    position: 'absolute',
                    left: 29,
                    top: 60,
                    width: 2,
                    height: 32,
                    backgroundColor: '#e5e7eb',
                  }} />
                )}
              </View>
            ))}

            {/* Botón CTA adicional */}
            <TouchableOpacity
              style={{
                backgroundColor: '#10b981',
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 8,
                alignSelf: 'flex-start',
                marginTop: 20,
              }}
            >
              <ThemedText style={{
                color: 'white',
                fontWeight: '600',
                fontSize: 16,
              }}>
                Ver Ejemplos
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Lado Derecho - Video */}
          <View style={{
            flex: 1,
            paddingLeft: width > 768 ? 20 : 0,
          }}>
            <View style={{
              backgroundColor: 'white',
              borderRadius: 16,
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.1,
              shadowRadius: 24,
              elevation: 16,
            }}>
              {!showVideo ? (
                // Thumbnail del video
                <TouchableOpacity
                  onPress={() => setShowVideo(true)}
                  style={{
                    height: 300,
                    backgroundColor: '#1f2937',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Imagen de fondo placeholder */}
                  <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }} />
                  
                  {/* Botón de play */}
                  <View style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 16,
                  }}>
                    <ThemedText style={{
                      fontSize: 32,
                      color: '#2563eb',
                      marginLeft: 4, // Centrar el triángulo
                    }}>
                      ▶
                    </ThemedText>
                  </View>

                  <ThemedText style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                    Ver Video Trailer
                  </ThemedText>
                  
                  <ThemedText style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: 14,
                    marginTop: 4,
                  }}>
                    2:30 min
                  </ThemedText>
                </TouchableOpacity>
              ) : (
                // Video incrustado
                <View style={{ height: 300 }}>
                  <WebView
                    source={{ uri: videoUrl }}
                    style={{ flex: 1 }}
                    allowsFullscreenVideo
                    mediaPlaybackRequiresUserAction={false}
                  />
                </View>
              )}
            </View>

            {/* Estadísticas debajo del video */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 32,
              paddingHorizontal: 20,
            }}>
              <View style={{ alignItems: 'center' }}>
                <ThemedText style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: '#2563eb',
                }}>
                  500+
                </ThemedText>
                <ThemedText style={{
                  fontSize: 14,
                  color: '#6b7280',
                  marginTop: 4,
                }}>
                  Portfolios Creados
                </ThemedText>
              </View>

              <View style={{ alignItems: 'center' }}>
                <ThemedText style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: '#10b981',
                }}>
                  98%
                </ThemedText>
                <ThemedText style={{
                  fontSize: 14,
                  color: '#6b7280',
                  marginTop: 4,
                }}>
                  Satisfacción
                </ThemedText>
              </View>

              <View style={{ alignItems: 'center' }}>
                <ThemedText style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: '#f59e0b',
                }}>
                  24/7
                </ThemedText>
                <ThemedText style={{
                  fontSize: 14,
                  color: '#6b7280',
                  marginTop: 4,
                }}>
                  Soporte
                </ThemedText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ThemedView>
  );
};