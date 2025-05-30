// components/common/Header.tsx - CON LOGS DE DEBUG
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface HeaderProps {
  onNavigate: (section: string) => void;
  onAuthPress: () => void;
  isLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  onNavigate, 
  onAuthPress, 
  isLoggedIn 
}) => {
  const navigationItems = [
    { key: 'how-it-works', label: 'Cómo funciona' },
    { key: 'featured', label: 'Destacados' },
    { key: 'reviews', label: 'Opiniones' },
    { key: 'contact', label: 'Contacto' },
  ];

  const handleProfilesPress = () => {
    console.log('📱 Navegando a perfiles...');
    router.push('/(tabs)/profiles');
  };

  const handleDashboardPress = () => {
    console.log('📊 Navegando a dashboard...');
    router.push('/(tabs)/dashboard');
  };

  const handleHomePress = () => {
    console.log('🏠 Navegando a inicio...');
    router.push('/(tabs)');
  };

  const handleAuthClick = () => {
    console.log('🔐 Click en botón de autenticación');
    onAuthPress();
  };

  return (
    <ThemedView style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
      paddingTop: 44, // Para el status bar
      paddingBottom: 16,
      paddingHorizontal: 20,
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 1200,
        width: '100%',
        alignSelf: 'center',
      }}>
        
        {/* Logo */}
        <TouchableOpacity 
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={handleHomePress}
        >
          {/* Placeholder para logo - reemplazar cuando tengas logo.png */}
          <View style={{
            width: 40,
            height: 40,
            backgroundColor: '#2563eb',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
          }}>
            <ThemedText style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
              PB
            </ThemedText>
          </View>
          <ThemedText style={{ 
            fontSize: 20, 
            fontWeight: 'bold',
            color: '#1f2937'
          }}>
            PortfolioBuilder
          </ThemedText>
        </TouchableOpacity>

        {/* Navegación Central - Solo visible en pantallas grandes */}
        {width > 768 && (
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            gap: 32,
          }}>
            {navigationItems.map((item) => (
              <TouchableOpacity
                key={item.key}
                onPress={() => onNavigate(item.key)}
                style={{ paddingVertical: 8 }}
              >
                <ThemedText style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#4b5563',
                }}>
                  {item.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
            
            {/* Botón Perfiles */}
            <TouchableOpacity
              onPress={handleProfilesPress}
              style={{ paddingVertical: 8 }}
            >
              <ThemedText style={{
                fontSize: 16,
                fontWeight: '500',
                color: '#4b5563',
              }}>
                Perfiles
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}

        {/* Botones de Acción */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center',
          gap: 12,
        }}>
          {isLoggedIn ? (
            <TouchableOpacity
              onPress={handleDashboardPress}
              style={{
                backgroundColor: '#2563eb',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 8,
              }}
            >
              <ThemedText style={{ 
                color: 'white', 
                fontWeight: '600',
                fontSize: 16,
              }}>
                Dashboard
              </ThemedText>
            </TouchableOpacity>
          ) : (
            <>
            <TouchableOpacity
              onPress={() => {
                console.log('🔐 Click en botón de autenticación');
                onAuthPress();
              }}
              style={{
                backgroundColor: 'transparent',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
              }}
            >
                <ThemedText style={{ 
                  color: '#4b5563', 
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                  Iniciar Sesión
                </ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleAuthClick}
                style={{
                  backgroundColor: '#2563eb',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 8,
                }}
              >
                <ThemedText style={{ 
                  color: 'white', 
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                  Registrarse
                </ThemedText>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ThemedView>
  );
};