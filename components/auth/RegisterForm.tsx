// components/auth/RegisterForm.tsx
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { portfolioStyles } from '@/styles/styles';
import { AuthForm } from '@/types';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { GoogleAuthButton } from './GoogleAuthButton';

interface RegisterFormProps {
  authForm: AuthForm;
  onFormChange: (field: keyof AuthForm, value: string) => void;
  onSubmit: () => void;
  onGoogleAuth: () => void;
  loading?: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  authForm,
  onFormChange,
  onSubmit,
  onGoogleAuth,
  loading = false,
}) => {
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <View>
      <TextInput
        style={[portfolioStyles.input, { 
          color: textColor, 
          backgroundColor,
          fontSize: 16,
          paddingVertical: 14,
          marginBottom: 16
        }]}
        placeholder="Nombre de usuario"
        placeholderTextColor="#6b7280"
        value={authForm.username}
        onChangeText={(text) => onFormChange('username', text)}
        autoCapitalize="none"
        editable={!loading}
      />
      
      <TextInput
        style={[portfolioStyles.input, { 
          color: textColor, 
          backgroundColor,
          fontSize: 16,
          paddingVertical: 14,
          marginBottom: 16
        }]}
        placeholder="Email"
        placeholderTextColor="#6b7280"
        value={authForm.email}
        onChangeText={(text) => onFormChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      
      <TextInput
        style={[portfolioStyles.input, { 
          color: textColor, 
          backgroundColor,
          fontSize: 16,
          paddingVertical: 14,
          marginBottom: 16
        }]}
        placeholder="Contraseña"
        placeholderTextColor="#6b7280"
        value={authForm.password}
        onChangeText={(text) => onFormChange('password', text)}
        secureTextEntry
        editable={!loading}
      />
      
      <TextInput
        style={[portfolioStyles.input, { 
          color: textColor, 
          backgroundColor,
          fontSize: 16,
          paddingVertical: 14,
          marginBottom: 24
        }]}
        placeholder="Confirmar contraseña"
        placeholderTextColor="#6b7280"
        value={authForm.confirmPassword}
        onChangeText={(text) => onFormChange('confirmPassword', text)}
        secureTextEntry
        editable={!loading}
      />

      <GoogleAuthButton 
        onPress={onGoogleAuth} 
        disabled={loading}
      />

      <TouchableOpacity 
        style={[portfolioStyles.primaryButton, { 
          paddingVertical: 16,
          marginTop: 16,
          opacity: loading ? 0.6 : 1
        }]} 
        onPress={onSubmit}
        disabled={loading}
      >
        <ThemedText style={[portfolioStyles.primaryButtonText, { fontSize: 16 }]}>
          {loading ? 'Creando cuenta...' : 'Registrarse'}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};