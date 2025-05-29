// app/_layout.tsx - TEMA CLARO FORZADO
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font'; // Comentado temporalmente
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// Tema claro personalizado - forzamos siempre modo claro
const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2563eb',
    background: '#ffffff',
    card: '#ffffff',
    text: '#1f2937',
    border: '#e5e7eb',
    notification: '#2563eb',
  },
};

export default function RootLayout() {
  // Comentamos las fuentes por ahora para evitar errores
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });

  // if (!loaded) {
  //   return null;
  // }

  return (
    <ThemeProvider value={LightTheme}>
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
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}