// components/auth/GoogleAuthButton.tsx
import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface GoogleAuthButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ 
  onPress, 
  disabled = false 
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: '#ef4444',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <ThemedText style={{
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
      }}>
        Continuar con Google
      </ThemedText>
    </TouchableOpacity>
  );
};