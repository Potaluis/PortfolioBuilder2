// components/profiles/ProfileSearch.tsx
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { TextInput, View } from 'react-native';

interface ProfileSearchProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const ProfileSearch: React.FC<ProfileSearchProps> = ({
  value,
  onChangeText,
  placeholder = "Buscar por nombre, profesión o habilidad..."
}) => {
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <View style={{ marginBottom: 24 }}>
      <ThemedText style={{
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
      }}>
        Buscar Perfiles
      </ThemedText>
      
      <TextInput
        style={{
          backgroundColor: backgroundColor,
          borderWidth: 1,
          borderColor: '#d1d5db',
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 16,
          color: textColor,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};