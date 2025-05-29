// utils/fonts.ts - CONFIGURACIÓN DE FUENTES OPCIONAL

// Si quieres usar fuentes personalizadas en el futuro, coloca los archivos .ttf en:
// assets/fonts/SpaceMono-Regular.ttf

// Luego descomenta este código en _layout.tsx:
/*
import { useFonts } from 'expo-font';

const [loaded] = useFonts({
  SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
});

if (!loaded) {
  return null;
}
*/

// Por ahora, usamos las fuentes del sistema por defecto
export const fontConfig = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  light: 'System',
};

// Estilos de texto consistentes para toda la app
export const textStyles = {
  title: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#374151',
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: '#4b5563',
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: '#6b7280',
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#ffffff',
  },
};