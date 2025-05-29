// hooks/useColorScheme.ts - SIEMPRE DEVUELVE 'light'
export function useColorScheme() {
  return 'light' as const;
}

// hooks/useThemeColor.ts - COLORES CLAROS FORZADOS
import { Colors } from '@/constants/Colors';

const LIGHT_COLORS = {
  text: '#1f2937',
  background: '#ffffff',
  tint: '#2563eb',
  icon: '#6b7280',
  tabIconDefault: '#6b7280',
  tabIconSelected: '#2563eb',
};

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // Siempre usar colores del tema claro
  const colorFromProps = props.light;

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return LIGHT_COLORS[colorName] || Colors.light[colorName];
  }
}