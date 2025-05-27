// components/landing/HeroCarousel.tsx
import { ThemedText } from '@/components/ThemedText';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native';
import {
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface HeroCarouselProps {
  onRegisterPress: () => void;
}

// Datos del carrusel - reemplazar con imágenes reales
const carouselData = [
  {
    id: 1,
    title: "Crea tu Portfolio Profesional",
    subtitle: "Destaca con un portfolio único y profesional",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    overlayColor: "rgba(37, 99, 235, 0.7)"
  },
  {
    id: 2,
    title: "Diseños Personalizables",
    subtitle: "Plantillas modernas adaptadas a tu estilo",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    overlayColor: "rgba(16, 185, 129, 0.7)"
  },
  {
    id: 3,
    title: "Conecta con Oportunidades",
    subtitle: "Haz que tu trabajo llegue a quien lo necesita",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    overlayColor: "rgba(168, 85, 247, 0.7)"
  }
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onRegisterPress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const slideWidth = width;
  const animatedValue = useSharedValue(0);

  // Auto-slide cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % carouselData.length;
      scrollToIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * slideWidth,
        animated: true,
      });
      setCurrentIndex(index);
      animatedValue.value = withSpring(index);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? carouselData.length - 1 : currentIndex - 1;
    scrollToIndex(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % carouselData.length;
    scrollToIndex(nextIndex);
  };

  const onScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / slideWidth);
    if (index !== currentIndex) {
      setCurrentIndex(index);
      animatedValue.value = withSpring(index);
    }
  };

  return (
    <View style={{
      height: Math.min(height * 0.8, 600),
      marginTop: 80, // Espacio para el header
      position: 'relative',
    }}>
      {/* Carrusel */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {carouselData.map((slide, index) => (
          <ImageBackground
            key={slide.id}
            source={{ uri: slide.image }}
            style={{
              width: slideWidth,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            imageStyle={{ resizeMode: 'cover' }}
          >
            {/* Overlay */}
            <View style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: slide.overlayColor,
            }} />
            
            {/* Contenido */}
            <View style={{
              alignItems: 'center',
              paddingHorizontal: 40,
              zIndex: 1,
            }}>
              <ThemedText style={{
                fontSize: 42,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                marginBottom: 16,
                textShadowColor: 'rgba(0, 0, 0, 0.3)',
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 4,
              }}>
                {slide.title}
              </ThemedText>
              
              <ThemedText style={{
                fontSize: 20,
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
                marginBottom: 32,
                maxWidth: 600,
                lineHeight: 28,
              }}>
                {slide.subtitle}
              </ThemedText>
              
              {/* Botón Registrarse - Solo en el primer slide */}
              {index === 0 && (
                <TouchableOpacity
                  onPress={onRegisterPress}
                  style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 32,
                    paddingVertical: 16,
                    borderRadius: 12,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 8,
                  }}
                >
                  <ThemedText style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#1f2937',
                  }}>
                    Comenzar Gratis
                  </ThemedText>
                </TouchableOpacity>
              )}
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      {/* Flechas de navegación */}
      <TouchableOpacity
        onPress={handlePrevious}
        style={{
          position: 'absolute',
          left: 20,
          top: '50%',
          transform: [{ translateY: -25 }],
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 25,
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(10px)',
        }}
      >
        <ThemedText style={{ 
          fontSize: 24, 
          color: 'white', 
          fontWeight: 'bold' 
        }}>
          ‹
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleNext}
        style={{
          position: 'absolute',
          right: 20,
          top: '50%',
          transform: [{ translateY: -25 }],
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 25,
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(10px)',
        }}
      >
        <ThemedText style={{ 
          fontSize: 24, 
          color: 'white', 
          fontWeight: 'bold' 
        }}>
          ›
        </ThemedText>
      </TouchableOpacity>

      {/* Indicadores */}
      <View style={{
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        flexDirection: 'row',
        gap: 8,
      }}>
        {carouselData.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => scrollToIndex(index)}
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: currentIndex === index 
                ? 'white' 
                : 'rgba(255, 255, 255, 0.5)',
            }}
          />
        ))}
      </View>
    </View>
  );
};

// Importar StyleSheet
import { StyleSheet } from 'react-native';
