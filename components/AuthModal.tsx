// components/AuthModal.tsx - CON ANIMACIONES MEJORADAS
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { portfolioStyles } from '@/styles/styles';
import { AuthForm, AuthMode } from '@/types';
import { BlurView } from 'expo-blur';
import React, { useEffect } from 'react';
import { Dimensions, Modal, TextInput, TouchableOpacity } from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

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

const { height: screenHeight } = Dimensions.get('window');

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
  
  // Animaciones
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);

  // Efectos de animación
  useEffect(() => {
    if (visible) {
      // Mostrar modal con slide up
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(0, {
        damping: 20,
        stiffness: 90,
      });
    } else {
      // Ocultar modal con slide down
      opacity.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(screenHeight, { duration: 250 });
    }
  }, [visible]);

  // Estilo animado para el fondo blur
  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // Estilo animado para el modal
  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleClose = () => {
    // Animar cierre y luego cerrar
    opacity.value = withTiming(0, { duration: 200 });
    translateY.value = withTiming(screenHeight, { duration: 250 }, () => {
      runOnJS(onClose)();
    });
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      {/* Fondo blur animado */}
      <Animated.View style={[{ flex: 1 }, backgroundStyle]}>
        <BlurView
          intensity={20}
          tint="dark"
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
          }}
        >
          {/* Overlay para cerrar al tocar fuera */}
          <TouchableOpacity
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            onPress={handleClose}
            activeOpacity={1}
          />

          {/* Modal container animado */}
          <Animated.View style={[modalStyle]}>
            <ThemedView style={portfolioStyles.modalContainer}>
              {/* Slider para cambiar entre login y registro */}
              <Animated.View style={portfolioStyles.authSlider}>
                <TouchableOpacity
                  style={[
                    portfolioStyles.sliderButton,
                    authMode === 'login' && portfolioStyles.sliderButtonActive
                  ]}
                  onPress={() => onModeChange('login')}
                >
                  <ThemedText style={[
                    portfolioStyles.sliderText,
                    authMode === 'login' && portfolioStyles.sliderTextActive
                  ]}>
                    Iniciar Sesión
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    portfolioStyles.sliderButton,
                    authMode === 'register' && portfolioStyles.sliderButtonActive
                  ]}
                  onPress={() => onModeChange('register')}
                >
                  <ThemedText style={[
                    portfolioStyles.sliderText,
                    authMode === 'register' && portfolioStyles.sliderTextActive
                  ]}>
                    Registro
                  </ThemedText>
                </TouchableOpacity>
              </Animated.View>

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
                <ThemedText style={portfolioStyles.googleButtonText}>
                  Continuar con Google
                </ThemedText>
              </TouchableOpacity>

              {/* Botón principal */}
              <TouchableOpacity style={portfolioStyles.primaryButton} onPress={onAuth}>
                <ThemedText style={portfolioStyles.primaryButtonText}>
                  {authMode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                </ThemedText>
              </TouchableOpacity>

              {/* Botón cancelar */}
              <TouchableOpacity style={portfolioStyles.cancelButton} onPress={handleClose}>
                <ThemedText style={portfolioStyles.cancelButtonText}>Cancelar</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </Animated.View>
        </BlurView>
      </Animated.View>
    </Modal>
  );
};