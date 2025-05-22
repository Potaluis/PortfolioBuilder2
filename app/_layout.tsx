// app/_layout.tsx - NUEVA navegación sin tabs
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
        {/* Pantalla principal del portfolio */}
        <Stack.Screen name="index" />
        
        {/* Pantalla individual de proyecto */}
        <Stack.Screen 
          name="project/[id]" 
          options={{
            presentation: 'modal',
            animation: 'slide_from_right'
          }}
        />
        
        {/* Pantalla de configuración (opcional) */}
        <Stack.Screen 
          name="settings" 
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom'
          }}
        />
        
        {/* 404 */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}