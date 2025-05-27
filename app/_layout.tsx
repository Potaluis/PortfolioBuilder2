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
        {/* Tabs - Navegación principal */}
        <Stack.Screen name="(tabs)" />
        
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