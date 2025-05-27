// components/landing/Reviews.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window');

// Testimonios ficticios extremadamente positivos
const testimonials = [
  {
    id: 1,
    name: "Elena Rodríguez",
    role: "Diseñadora Freelance",
    company: "Studio Creative",
    content: "¡Increíble! PortfolioBuilder transformó completamente mi presencia online. En solo 2 días tenía un portfolio profesional que me ha conseguido 5 nuevos clientes. ¡No puedo estar más satisfecha!",
    rating: 5,
    avatar: "ER"
  },
  {
    id: 2,
    name: "Miguel Santos",
    role: "Desarrollador Web",
    company: "TechCorp",
    content: "La mejor inversión que he hecho para mi carrera. El portfolio que creé me ayudó a conseguir el trabajo de mis sueños. La facilidad de uso es impresionante, ¡lo recomiendo al 100%!",
    rating: 5,
    avatar: "MS"
  },
  {
    id: 3,
    name: "Laura García",
    role: "Fotógrafa",
    company: "Independiente",
    content: "Espectacular. Como fotógrafa necesitaba mostrar mi trabajo de forma elegante y PortfolioBuilder me dio exactamente eso. He triplicado mis consultas desde que lo uso. ¡Gracias!",
    rating: 5,
    avatar: "LG"
  },
  {
    id: 4,
    name: "David López",
    role: "Arquitecto",
    company: "López & Asociados",
    content: "Excepcional. La calidad de las plantillas es profesional y la personalización es súper fácil. Mi portfolio ahora destaca entre la competencia. ¡Altamente recomendado!",
    rating: 5,
    avatar: "DL"
  },
  {
    id: 5,
    name: "Carmen Jiménez",
    role: "Ilustradora",
    company: "Freelance",
    content: "¡Fantástico! Nunca pensé que crear un portfolio profesional pudiera ser tan sencillo. El resultado es impresionante y he conseguido colaboraciones increíbles. ¡5 estrellas!",
    rating: 5,
    avatar: "CJ"
  },
  {
    id: 6,
    name: "Andrés Ruiz",
    role: "Marketing Digital",
    company: "Digital Agency",
    content: "Perfecto para profesionales que buscan destacar. La plataforma es intuitiva y los resultados son espectaculares. Mi portfolio ahora refleja verdaderamente mi experiencia.",
    rating: 5,
    avatar: "AR"
  }
];

export const Reviews: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll suave
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        const nextIndex = (currentIndex + 1) % testimonials.length;
        const cardWidth = width > 768 ? 400 : width - 40;
        const gap = 20;
        
        scrollViewRef.current.scrollTo({
          x: nextIndex * (cardWidth + gap),
          animated: true,
        });
        setCurrentIndex(nextIndex);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const cardWidth = width > 768 ? 400 : width - 40;
  const cardsToShow = width > 1200 ? 3 : width > 768 ? 2 : 1;

  return (
    <ThemedView style={{
      paddingVertical: 80,
      backgroundColor: '#f8fafc',
    }}>
      <View style={{
        maxWidth: 1200,
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 20,
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
            Lo Que Dicen Nuestros Usuarios
          </ThemedText>
          <ThemedText style={{
            fontSize: 18,
            color: '#6b7280',
            textAlign: 'center',
            maxWidth: 600,
            lineHeight: 26,
          }}>
            Miles de profesionales ya han transformado su carrera con PortfolioBuilder
          </ThemedText>

          {/* Estadística destacada */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 24,
            backgroundColor: '#ecfdf5',
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 50,
          }}>
            <ThemedText style={{
              fontSize: 24,
              marginRight: 8,
            }}>
              ⭐
            </ThemedText>
            <ThemedText style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#059669',
              marginRight: 8,
            }}>
              4.9/5
            </ThemedText>
            <ThemedText style={{
              fontSize: 16,
              color: '#065f46',
            }}>
              • +2,500 reseñas
            </ThemedText>
          </View>
        </View>

        {/* Carrusel de Testimonios */}
        <View style={{ overflow: 'hidden' }}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 10,
              gap: 20,
            }}
            snapToInterval={cardWidth + 20}
            decelerationRate="fast"
          >
            {testimonials.map((testimonial) => (
              <View
                key={testimonial.id}
                style={{
                  width: cardWidth,
                  backgroundColor: 'white',
                  borderRadius: 16,
                  padding: 24,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 4,
        }}>
          <ThemedText style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#1f2937',
            textAlign: 'center',
            marginBottom: 12,
          }}>
            ¿Listo para unirte a ellos?
          </ThemedText>
          <ThemedText style={{
            fontSize: 16,
            color: '#6b7280',
            textAlign: 'center',
            marginBottom: 24,
          }}>
            Crea tu portfolio profesional hoy mismo
          </ThemedText>
          
          {/* Botones de acción */}
          <View style={{
            flexDirection: width > 480 ? 'row' : 'column',
            gap: 12,
            alignItems: 'center',
          }}>
            <View style={{
              backgroundColor: '#2563eb',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8,
            }}>
              <ThemedText style={{
                color: 'white',
                fontWeight: '600',
                fontSize: 16,
              }}>
                Comenzar Gratis
              </ThemedText>
            </View>
            
            <ThemedText style={{
              fontSize: 14,
              color: '#9ca3af',
              textAlign: 'center',
            }}>
              No se requiere tarjeta de crédito
            </ThemedText>
          </View>
        </View>
      </View>
    </ThemedView>
  );
};0.08,
                  shadowRadius: 12,
                  elevation: 8,
                  borderWidth: 1,
                  borderColor: '#f3f4f6',
                }}
              >
                {/* Rating */}
                <View style={{
                  flexDirection: 'row',
                  marginBottom: 16,
                }}>
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <ThemedText key={index} style={{
                      fontSize: 20,
                      color: '#f59e0b',
                      marginRight: 2,
                    }}>
                      ⭐
                    </ThemedText>
                  ))}
                </View>

                {/* Contenido */}
                <ThemedText style={{
                  fontSize: 16,
                  lineHeight: 24,
                  color: '#374151',
                  marginBottom: 20,
                  fontStyle: 'italic',
                }}>
                  "{testimonial.content}"
                </ThemedText>

                {/* Usuario */}
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 16,
                  borderTopWidth: 1,
                  borderTopColor: '#f3f4f6',
                }}>
                  {/* Avatar */}
                  <View style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: '#2563eb',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 12,
                  }}>
                    <ThemedText style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                      {testimonial.avatar}
                    </ThemedText>
                  </View>

                  {/* Info */}
                  <View style={{ flex: 1 }}>
                    <ThemedText style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#1f2937',
                      marginBottom: 2,
                    }}>
                      {testimonial.name}
                    </ThemedText>
                    <ThemedText style={{
                      fontSize: 14,
                      color: '#6b7280',
                    }}>
                      {testimonial.role}
                    </ThemedText>
                    <ThemedText style={{
                      fontSize: 12,
                      color: '#9ca3af',
                    }}>
                      {testimonial.company}
                    </ThemedText>
                  </View>

                  {/* Badge verificado */}
                  <View style={{
                    backgroundColor: '#10b981',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                  }}>
                    <ThemedText style={{
                      fontSize: 10,
                      color: 'white',
                      fontWeight: '600',
                    }}>
                      ✓ Verificado
                    </ThemedText>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Indicadores */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 32,
          gap: 8,
        }}>
          {testimonials.map((_, index) => (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: currentIndex === index ? '#2563eb' : '#d1d5db',
              }}
            />
          ))}
        </View>

        {/* CTA Final */}
        <View style={{
          alignItems: 'center',
          marginTop: 48,
          backgroundColor: 'white',
          padding: 32,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: