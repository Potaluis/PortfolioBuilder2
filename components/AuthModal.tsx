// components/AuthModal.tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { portfolioStyles } from '@/styles/styles';
import { AuthForm, AuthMode } from '@/types';
import React from 'react';
import { Modal, TextInput, TouchableOpacity, View } from 'react-native';

interface AuthModalProps {
  visible: boolean;
  authMode: AuthMode;
  authForm: AuthForm;
  onClose: () => void;
  onAuth: () => void;
  onGoogleAuth: () => void;
  onModeChange: (mode: AuthMode) => void;
  onFormChange: (field: keyof AuthForm, value: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  visible,
  authMode,
  authForm,
  onClose,
  onAuth,
  onGoogleAuth,
  onModeChange,
  onFormChange,
}) => {
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={portfolioStyles.modalOverlay}>
        <ThemedView style={portfolioStyles.modalContainer}>
          {/* Slider para cambiar entre login y registro */}
          <View style={portfolioStyles.authSlider}>
            <TouchableOpacity
              style={[portfolioStyles.sliderButton, authMode === 'login' && portfolioStyles.sliderButtonActive]}
              onPress={() => onModeChange('login')}
            >
              <ThemedText style={[portfolioStyles.sliderText, authMode === 'login' && portfolioStyles.sliderTextActive]}>
                Iniciar Sesión
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[portfolioStyles.sliderButton, authMode === 'register' && portfolioStyles.sliderButtonActive]}
              onPress={() => onModeChange('register')}
            >
              <ThemedText style={[portfolioStyles.sliderText, authMode === 'register' && portfolioStyles.sliderTextActive]}>
                Registro
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Campos del formulario */}
          {authMode === 'register' && (
            <TextInput
              style={[portfolioStyles.input, { color: textColor, backgroundColor }]}
              placeholder="Nombre de usuario"
              placeholderTextColor="#6b7280"
              value={authForm.username}
              onChangeText={(text) => onFormChange('username', text)}
            />
          )}
          
          <TextInput
            style={[portfolioStyles.input, { color: textColor, backgroundColor }]}
            placeholder="Email"
            placeholderTextColor="#6b7280"
            value={authForm.email}
            onChangeText={(text) => onFormChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            style={[portfolioStyles.input, { color: textColor, backgroundColor }]}
            placeholder="Contraseña"
            placeholderTextColor="#6b7280"
            value={authForm.password}
            onChangeText={(text) => onFormChange('password', text)}
            secureTextEntry
          />
          
          {authMode === 'register' && (
            <TextInput
              style={[portfolioStyles.input, { color: textColor, backgroundColor }]}
              placeholder="Confirmar contraseña"
              placeholderTextColor="#6b7280"
              value={authForm.confirmPassword}
              onChangeText={(text) => onFormChange('confirmPassword', text)}
              secureTextEntry
            />
          )}

          {/* Botón de Google */}
          <TouchableOpacity style={portfolioStyles.googleButton} onPress={onGoogleAuth}>
            <ThemedText style={portfolioStyles.googleButtonText}>Continuar con Google</ThemedText>
          </TouchableOpacity>

          {/* Botón principal */}
          <TouchableOpacity style={portfolioStyles.primaryButton} onPress={onAuth}>
            <ThemedText style={portfolioStyles.primaryButtonText}>
              {authMode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
            </ThemedText>
          </TouchableOpacity>

          {/* Botón cancelar */}
          <TouchableOpacity style={portfolioStyles.cancelButton} onPress={onClose}>
            <ThemedText style={portfolioStyles.cancelButtonText}>Cancelar</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </View>
    </Modal>
  );
};