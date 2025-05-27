// app/_layout.tsx - NAVEGACIÓN CORREGIDA
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Página principal - Landing o Dashboard según login */}
        <Stack.Screen name="index" />
        
        {/* Página de perfiles públicos */}
        <Stack.Screen 
          name="profiles" 
          options={{
            title: 'Perfiles',
            animation: 'slide_from_right'
          }}
        />
        
        {/* Dashboard del usuario */}
        <Stack.Screen 
          name="dashboard" 
          options={{
            title: 'Dashboard',
            animation: 'slide_from_right'
          }}
        />
        
        {/* Editor de proyecto individual */}
        <Stack.Screen 
          name="project/[id]" 
          options={{
            title: 'Editor',
            presentation: 'modal',
            animation: 'slide_from_right'
          }}
        />
        
        {/* 404 */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}