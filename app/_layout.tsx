// app/(tabs)/_layout.tsx - OPCIONAL: Personalización para PortfolioBuilder
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Portfolios', // ← Cambiado de 'Home' a 'Portfolios'
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Configuración', // ← Cambiado de 'Explore' a 'Configuración'
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

/*
PERSONALIZACIÓN ADICIONAL:

1. Para cambiar íconos, añade al MAPPING en components/ui/IconSymbol.tsx:
   'gear': 'settings',
   'user': 'person',
   'portfolio': 'folder',

2. Para añadir más tabs:
   <Tabs.Screen
     name="profile"
     options={{
       title: 'Perfil',
       tabBarIcon: ({ color }) => <IconSymbol size={28} name="user" color={color} />,
     }}
   />

3. Para ocultar tabs cuando el usuario no esté logueado:
   Use conditional rendering based on user state from usePortfolioApp()
*/