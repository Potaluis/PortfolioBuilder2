// components/AuthModal.tsx - MEJORADO con transiciones y tamaño correcto
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { portfolioStyles } from '@/styles/styles';
import { AuthForm, AuthMode } from '@/types';
import { BlurView } from 'expo-blur';
import React, { useEffect } from 'react';
import { Dimensions, KeyboardAvoidingView, Modal, Platform, ScrollView, TextInput, TouchableOpacity } from 'react-native';
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

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

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
  
  // Animaciones mejoradas - empieza 30px arriba
  const translateY = useSharedValue(-30);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.98);

  // Efectos de animación
  useEffect(() => {
    if (visible) {
      // Mostrar modal con slide down suave desde -30px y fade in
      opacity.value = withTiming(1, { duration: 350 });
      translateY.value = withSpring(0, {
        damping: 22,
        stiffness: 120,
      });
      scale.value = withSpring(1, {
        damping: 18,
        stiffness: 150,
      });
    } else {
      // Ocultar modal
      opacity.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(-30, { duration: 250 });
      scale.value = withTiming(0.98, { duration: 200 });
    }
  }, [visible]);

  // Estilo animado para el fondo blur
  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // Estilo animado para el modal
  const modalStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value }
    ],
    opacity: opacity.value,
  }));

  const handleClose = () => {
    // Animar cierre y luego cerrar
    opacity.value = withTiming(0, { duration: 200 });
    translateY.value = withTiming(-30, { duration: 250 });
    scale.value = withTiming(0.98, { duration: 200 }, () => {
      runOnJS(onClose)();
    });
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      {/* Fondo blur animado */}
      <Animated.View style={[{ flex: 1 }, backgroundStyle]}>
        <BlurView
          intensity={25}
          tint="dark"
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Overlay para cerrar al tocar fuera */}
          <TouchableOpacity
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            onPress={handleClose}
            activeOpacity={1}
          />

          {/* Modal container animado */}
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ width: '100%', alignItems: 'center' }}
          >
            <Animated.View style={[modalStyle, { width: '90%', maxWidth: 480 }]}>
              <ThemedView style={[
                portfolioStyles.modalContainer, 
                {
                  // Modal mucho más grande
                  paddingVertical: 40,
                  paddingHorizontal: 32,
                  minHeight: authMode === 'register' ? 600 : 500,
                  width: '100%',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 12 },
                  shadowOpacity: 0.3,
                  shadowRadius: 25,
                  elevation: 25,
                }
              ]}>
                <ScrollView 
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ flexGrow: 1 }}
                  keyboardShouldPersistTaps="handled"
                >
                  {/* Título del modal */}
                  <ThemedText style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 30,
                  }}>
                    {authMode === 'login' ? 'Bienvenido' : 'Crear cuenta'}
                  </ThemedText>

                  {/* Slider para cambiar entre login y registro */}
                  <Animated.View style={[portfolioStyles.authSlider, { marginBottom: 32 }]}>
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
                    />
                  )}
                  
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
                  />
                  
                  {authMode === 'register' && (
                    <TextInput
                      style={[portfolioStyles.input, { 
                        color: textColor, 
                        backgroundColor,
                        fontSize: 16,
                        paddingVertical: 14,
                        marginBottom: 20
                      }]}
                      placeholder="Confirmar contraseña"
                      placeholderTextColor="#6b7280"
                      value={authForm.confirmPassword}
                      onChangeText={(text) => onFormChange('confirmPassword', text)}
                      secureTextEntry
                    />
                  )}

                  {/* Espacio antes de los botones */}
                  <ThemedView style={{ marginTop: authMode === 'login' ? 20 : 8 }}>
                    {/* Botón de Google */}
                    <TouchableOpacity 
                      style={[portfolioStyles.googleButton, { 
                        paddingVertical: 16,
                        marginBottom: 16 
                      }]} 
                      onPress={onGoogleAuth}
                    >
                      <ThemedText style={[portfolioStyles.googleButtonText, { fontSize: 16 }]}>
                        Continuar con Google
                      </ThemedText>
                    </TouchableOpacity>

                    {/* Botón principal */}
                    <TouchableOpacity 
                      style={[portfolioStyles.primaryButton, { 
                        paddingVertical: 16,
                        marginBottom: 16 
                      }]} 
                      onPress={onAuth}
                    >
                      <ThemedText style={[portfolioStyles.primaryButtonText, { fontSize: 16 }]}>
                        {authMode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                      </ThemedText>
                    </TouchableOpacity>

                    {/* Botón cancelar */}
                    <TouchableOpacity 
                      style={[portfolioStyles.cancelButton, { paddingVertical: 12 }]} 
                      onPress={handleClose}
                    >
                      <ThemedText style={[portfolioStyles.cancelButtonText, { fontSize: 15 }]}>
                        Cancelar
                      </ThemedText>
                    </TouchableOpacity>
                  </ThemedView>
                </ScrollView>
              </ThemedView>
            </Animated.View>
          </KeyboardAvoidingView>
        </BlurView>
      </Animated.View>
    </Modal>
  );
};