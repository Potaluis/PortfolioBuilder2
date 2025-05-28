// components/landing/NavigationMenu.tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

interface NavigationMenuProps {
  onNavigate: (section: string) => void;
  activeSection?: string;
  isOpen?: boolean;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  onNavigate,
  activeSection,
  isOpen = false,
}) => {
  const navigationItems = [
    { key: 'hero', label: 'Inicio', icon: '🏠' },
    { key: 'how-it-works', label: 'Cómo funciona', icon: '⚙️' },
    { key: 'featured', label: 'Destacados', icon: '⭐' },
    { key: 'reviews', label: 'Opiniones', icon: '💬' },
    { key: 'contact', label: 'Contacto', icon: '📧' },
  ];

  if (width > 768 || !isOpen) {
    return null;
  }

  return (
    <ThemedView style={{
      position: 'absolute',
      top: 80,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
      paddingVertical: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
      zIndex: 999,
    }}>
      {navigationItems.map((item) => (
        <TouchableOpacity
          key={item.key}
          onPress={() => onNavigate(item.key)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 12,
            backgroundColor: activeSection === item.key ? '#f3f4f6' : 'transparent',
          }}
        >
          <ThemedText style={{
            fontSize: 16,
            marginRight: 12,
          }}>
            {item.icon}
          </ThemedText>
          <ThemedText style={{
            fontSize: 16,
            fontWeight: activeSection === item.key ? '600' : '400',
            color: activeSection === item.key ? '#2563eb' : '#4b5563',
          }}>
            {item.label}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
};