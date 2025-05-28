// components/common/LoadingSpinner.tsx
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color,
  text,
  fullScreen = true
}) => {
  const defaultColor = useThemeColor({}, 'text');
  const spinnerColor = color || '#2563eb';

  const containerStyle = fullScreen 
    ? { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }
    : { justifyContent: 'center', alignItems: 'center', padding: 20 };

  return (
    <View>
      <ActivityIndicator size={size} color={spinnerColor} />
      {text && (
        <ThemedText style={{
          marginTop: 16,
          fontSize: 16,
          color: defaultColor,
          opacity: 0.7,
          textAlign: 'center',
        }}>
          {text}
        </ThemedText>
      )}
    </View>
  );
};