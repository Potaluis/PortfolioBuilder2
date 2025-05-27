import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  style,
  ...props
}) => {
  const variants = {
    primary: {
      backgroundColor: '#2563eb',
      borderWidth: 0,
    },
    secondary: {
      backgroundColor: '#6b7280',
      borderWidth: 0,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: '#2563eb',
    },
    ghost: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
  };

  const sizes = {
    small: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      fontSize: 14,
    },
    medium: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      fontSize: 16,
    },
    large: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      fontSize: 18,
    },
  };

  const textColor = variant === 'outline' || variant === 'ghost' ? '#2563eb' : 'white';

  return (
    <TouchableOpacity
      style={[
        {
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          ...variants[variant],
          paddingVertical: sizes[size].paddingVertical,
          paddingHorizontal: sizes[size].paddingHorizontal,
        },
        style,
      ]}
      {...props}
    >
      <ThemedText style={{
        color: textColor,
        fontSize: sizes[size].fontSize,
        fontWeight: '600',
      }}>
        {children}
      </ThemedText>
    </TouchableOpacity>
  );
};