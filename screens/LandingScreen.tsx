// screens/LandingScreen.tsx
import { AuthModal } from '@/components/AuthModal';
import { ThemedView } from '@/components/ThemedView';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { ContactForm } from '@/components/landing/ContactForm';
import { FeaturedProfiles } from '@/components/landing/FeaturedProfiles';
import { HeroCarousel } from '@/components/landing/HeroCarousel';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Reviews } from '@/components/landing/Reviews';
import { usePortfolioApp } from '@/hooks/usePortfolioApp';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';

const { width } = Dimensions.get('window');

export const LandingScreen: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [sectionOffsets, setSectionOffsets] = useState<{[key: string]: number}>({});
  
  const {
    showAuthModal,
    authMode,
    authForm,
    user,
    handleAuth,
    handleGoogleAuth,
    updateAuthForm,
    setAuthMode,
    openAuthModal,
    closeAuthModal,
  } = usePortfolioApp();

  // Función para navegar a secciones
  const scrollToSection = (section: string) => {
    if (sectionOffsets[section] && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: sectionOffsets[section] - 80, // Offset para el header
        animated: true,
      });
    }
  };

  // Función para medir las posiciones de cada sección
  const onSectionLayout = (section: string, event: any) => {
    const { y } = event.nativeEvent.layout;
    setSectionOffsets(prev => ({ ...prev, [section]: y }));
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      
      {/* Header fijo */}
      <Header 
        onNavigate={scrollToSection}
        onAuthPress={() => openAuthModal('login')}
        isLoggedIn={!!user}
      />

      {/* Contenido principal */}
      <ScrollView 
        ref={scrollViewRef}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 0 }}
      >
        {/* Hero Section - Carrusel */}
        <View onLayout={(event) => onSectionLayout('hero', event)}>
          <HeroCarousel onRegisterPress={() => openAuthModal('register')} />
        </View>

        {/* Cómo Funciona */}
        <View onLayout={(event) => onSectionLayout('how-it-works', event)}>
          <HowItWorks />
        </View>

        {/* Perfiles Destacados */}
        <View onLayout={(event) => onSectionLayout('featured', event)}>
          <FeaturedProfiles />
        </View>

        {/* Testimonios */}
        <View onLayout={(event) => onSectionLayout('reviews', event)}>
          <Reviews />
        </View>

        {/* Contacto */}
        <View onLayout={(event) => onSectionLayout('contact', event)}>
          <ContactForm />
        </View>

        {/* Footer */}
        <Footer />
      </ScrollView>

      {/* Modal de Autenticación */}
      <AuthModal
        visible={showAuthModal}
        authMode={authMode}
        authForm={authForm}
        onClose={closeAuthModal}
        onAuth={handleAuth}
        onGoogleAuth={handleGoogleAuth}
        onModeChange={setAuthMode}
        onFormChange={updateAuthForm}
      />
    </ThemedView>
  );
};