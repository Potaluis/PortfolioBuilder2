// components/dashboard/SettingsSection.tsx - Configuración de cuenta
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { User } from '@/types';
import React, { useState } from 'react';
import { Alert, Dimensions, ScrollView, Switch, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface SettingsSectionProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (updates: Partial<User>) => void;
}

type SettingsTab = 'profile' | 'account' | 'notifications' | 'privacy' | 'billing';

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  user,
  onLogout,
  onUpdateUser
}) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    projectUpdates: true,
    newMessages: true,
  });
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    showProjects: true,
    allowMessages: true,
    showStats: false,
  });

  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');

  const tabs = [
    { key: 'profile' as const, label: 'Perfil', icon: '👤' },
    { key: 'account' as const, label: 'Cuenta', icon: '🔐' },
    { key: 'notifications' as const, label: 'Notificaciones', icon: '🔔' },
    { key: 'privacy' as const, label: 'Privacidad', icon: '🔒' },
    { key: 'billing' as const, label: 'Facturación', icon: '💳' },
  ];

  const handleUpdateProfile = () => {
    if (!formData.username.trim()) {
      Alert.alert('Error', 'El nombre de usuario no puede estar vacío');
      return;
    }

    if (!formData.email.trim()) {
      Alert.alert('Error', 'El email no puede estar vacío');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return;
    }

    onUpdateUser({
      username: formData.username,
      email: formData.email,
    });

    Alert.alert('Éxito', 'Perfil actualizado correctamente');
  };

  const handleChangePassword = () => {
    if (!formData.currentPassword) {
      Alert.alert('Error', 'Ingresa tu contraseña actual');
      return;
    }

    if (formData.newPassword.length < 6) {
      Alert.alert('Error', 'La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    // Simular cambio de contraseña
    Alert.alert('Éxito', 'Contraseña actualizada correctamente');
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Eliminar Cuenta',
      'Esta acción eliminará permanentemente tu cuenta y todos tus datos. ¿Estás seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Confirmación Final',
              'Escribe "ELIMINAR" para confirmar',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Confirmar', style: 'destructive', onPress: () => console.log('Cuenta eliminada') }
              ]
            );
          }
        }
      ]
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <View>
            <ThemedText style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: 20,
            }}>
              Información Personal
            </ThemedText>

            {/* Avatar */}
            <View style={{
              alignItems: 'center',
              marginBottom: 32,
            }}>
              <View style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: '#2563eb',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 16,
              }}>
                <ThemedText style={{
                  color: 'white',
                  fontSize: 36,
                  fontWeight: 'bold',
                }}>
                  {user.username.charAt(0).toUpperCase()}
                </ThemedText>
              </View>
              
              <TouchableOpacity style={{
                backgroundColor: '#f3f4f6',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
              }}>
                <ThemedText style={{
                  color: '#374151',
                  fontWeight: '500',
                }}>
                  Cambiar Foto
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* Formulario */}
            <View style={{ gap: 16 }}>
              <View>
                <ThemedText style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: 8,
                }}>
                  Nombre de Usuario
                </ThemedText>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#d1d5db',
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 16,
                    color: textColor,
                    backgroundColor: backgroundColor,
                  }}
                  value={formData.username}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, username: text }))}
                  placeholder="Tu nombre de usuario"
                />
              </View>

              <View>
                <ThemedText style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: 8,
                }}>
                  Email
                </ThemedText>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#d1d5db',
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 16,
                    color: textColor,
                    backgroundColor: backgroundColor,
                  }}
                  value={formData.email}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                  placeholder="tu@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity
                onPress={handleUpdateProfile}
                style={{
                  backgroundColor: '#2563eb',
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  borderRadius: 8,
                  marginTop: 16,
                }}
              >
                <ThemedText style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                  Guardar Cambios
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'account':
        return (
          <View>
            <ThemedText style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: 20,
            }}>
              Seguridad de la Cuenta
            </ThemedText>

            {/* Cambiar Contraseña */}
            <View style={{
              backgroundColor: '#f8fafc',
              padding: 20,
              borderRadius: 12,
              marginBottom: 24,
            }}>
              <ThemedText style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: 16,
              }}>
                Cambiar Contraseña
              </ThemedText>

              <View style={{ gap: 16 }}>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#d1d5db',
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 16,
                    color: textColor,
                    backgroundColor: 'white',
                  }}
                  value={formData.currentPassword}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, currentPassword: text }))}
                  placeholder="Contraseña actual"
                  secureTextEntry
                />

                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#d1d5db',
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 16,
                    color: textColor,
                    backgroundColor: 'white',
                  }}
                  value={formData.newPassword}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, newPassword: text }))}
                  placeholder="Nueva contraseña"
                  secureTextEntry
                />

                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#d1d5db',
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 16,
                    color: textColor,
                    backgroundColor: 'white',
                  }}
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
                  placeholder="Confirmar nueva contraseña"
                  secureTextEntry
                />

                <TouchableOpacity
                  onPress={handleChangePassword}
                  style={{
                    backgroundColor: '#10b981',
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    borderRadius: 8,
                  }}
                >
                  <ThemedText style={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: '600',
                  }}>
                    Actualizar Contraseña
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            {/* Autenticación en 2 pasos */}
            <View style={{
              backgroundColor: '#f8fafc',
              padding: 20,
              borderRadius: 12,
              marginBottom: 24,
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
              }}>
                <View>
                  <ThemedText style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#1f2937',
                  }}>
                    Autenticación en 2 pasos
                  </ThemedText>
                  <ThemedText style={{
                    fontSize: 14,
                    color: '#6b7280',
                    marginTop: 2,
                  }}>
                    Añade una capa extra de seguridad
                  </ThemedText>
                </View>
                
                <Switch
                  value={false}
                  onValueChange={() => Alert.alert('Próximamente', 'Esta función estará disponible pronto')}
                  trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                  thumbColor="white"
                />
              </View>
            </View>

            {/* Zona Peligrosa */}
            <View style={{
              backgroundColor: '#fef2f2',
              padding: 20,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#fecaca',
            }}>
              <ThemedText style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#dc2626',
                marginBottom: 8,
              }}>
                Zona Peligrosa
              </ThemedText>
              
              <ThemedText style={{
                fontSize: 14,
                color: '#7f1d1d',
                marginBottom: 16,
                lineHeight: 20,
              }}>
                Eliminar tu cuenta es permanente. Todos tus portfolios, mensajes y datos se perderán para siempre.
              </ThemedText>
              
              <TouchableOpacity
                onPress={handleDeleteAccount}
                style={{
                  backgroundColor: '#dc2626',
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  borderRadius: 8,
                  alignSelf: 'flex-start',
                }}
              >
                <ThemedText style={{
                  color: 'white',
                  fontWeight: '600',
                }}>
                  Eliminar Cuenta
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'notifications':
        return (
          <View>
            <ThemedText style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: 20,
            }}>
              Preferencias de Notificaciones
            </ThemedText>

            <View style={{ gap: 20 }}>
              {Object.entries(notifications).map(([key, value]) => {
                const labels = {
                  emailNotifications: { title: 'Notificaciones por Email', desc: 'Recibe actualizaciones por correo electrónico' },
                  pushNotifications: { title: 'Notificaciones Push', desc: 'Notificaciones instantáneas en tu dispositivo' },
                  marketingEmails: { title: 'Emails de Marketing', desc: 'Ofertas especiales y novedades' },
                  projectUpdates: { title: 'Actualizaciones de Proyectos', desc: 'Cuando hay cambios en tus proyectos' },
                  newMessages: { title: 'Nuevos Mensajes', desc: 'Cuando recibes nuevos mensajes de clientes' },
                };

                return (
                  <View
                    key={key}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: '#f8fafc',
                      padding: 16,
                      borderRadius: 12,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <ThemedText style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: 2,
                      }}>
                        {labels[key as keyof typeof labels].title}
                      </ThemedText>
                      <ThemedText style={{
                        fontSize: 14,
                        color: '#6b7280',
                      }}>
                        {labels[key as keyof typeof labels].desc}
                      </ThemedText>
                    </View>
                    
                    <Switch
                      value={value}
                      onValueChange={(newValue) => 
                        setNotifications(prev => ({ ...prev, [key]: newValue }))
                      }
                      trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                      thumbColor="white"
                    />
                  </View>
                );
              })}
            </View>
          </View>
        );

      case 'privacy':
        return (
          <View>
            <ThemedText style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: 20,
            }}>
              Configuración de Privacidad
            </ThemedText>

            <View style={{ gap: 20 }}>
              {Object.entries(privacy).map(([key, value]) => {
                const labels = {
                  profilePublic: { title: 'Perfil Público', desc: 'Tu perfil aparece en la sección de perfiles públicos' },
                  showEmail: { title: 'Mostrar Email', desc: 'Tu email es visible en tu portfolio público' },
                  showProjects: { title: 'Mostrar Proyectos', desc: 'Tus proyectos son visibles públicamente' },
                  allowMessages: { title: 'Permitir Mensajes', desc: 'Los visitantes pueden enviarte mensajes' },
                  showStats: { title: 'Mostrar Estadísticas', desc: 'Las estadísticas de visitas son públicas' },
                };

                return (
                  <View
                    key={key}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: '#f8fafc',
                      padding: 16,
                      borderRadius: 12,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <ThemedText style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: 2,
                      }}>
                        {labels[key as keyof typeof labels].title}
                      </ThemedText>
                      <ThemedText style={{
                        fontSize: 14,
                        color: '#6b7280',
                      }}>
                        {labels[key as keyof typeof labels].desc}
                      </ThemedText>
                    </View>
                    
                    <Switch
                      value={value}
                      onValueChange={(newValue) => 
                        setPrivacy(prev => ({ ...prev, [key]: newValue }))
                      }
                      trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                      thumbColor="white"
                    />
                  </View>
                );
              })}
            </View>

            <View style={{
              backgroundColor: '#fef3c7',
              padding: 16,
              borderRadius: 12,
              marginTop: 24,
            }}>
              <ThemedText style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#92400e',
                marginBottom: 4,
              }}>
                💡 Consejo de Privacidad
              </ThemedText>
              <ThemedText style={{
                fontSize: 13,
                color: '#92400e',
                lineHeight: 18,
              }}>
                Mantener tu perfil público te ayuda a conseguir más clientes, pero siempre puedes controlar qué información compartes.
              </ThemedText>
            </View>
          </View>
        );

      case 'billing':
        return (
          <View>
            <ThemedText style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: 20,
            }}>
              Facturación y Suscripción
            </ThemedText>

            {/* Plan Actual */}
            <View style={{
              backgroundColor: '#eff6ff',
              padding: 20,
              borderRadius: 12,
              marginBottom: 24,
              borderWidth: 2,
              borderColor: '#2563eb',
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}>
                <View>
                  <ThemedText style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#1e40af',
                  }}>
                    Plan Gratuito
                  </ThemedText>
                  <ThemedText style={{
                    fontSize: 14,
                    color: '#3b82f6',
                  }}>
                    Hasta 3 portfolios
                  </ThemedText>
                </View>
                
                <View style={{
                  backgroundColor: '#10b981',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 20,
                }}>
                  <ThemedText style={{
                    color: 'white',
                    fontSize: 12,
                    fontWeight: '600',
                  }}>
                    ACTIVO
                  </ThemedText>
                </View>
              </View>
              
              <ThemedText style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#1e40af',
                marginBottom: 16,
              }}>
                €0/mes
              </ThemedText>

              <TouchableOpacity
                style={{
                  backgroundColor: '#2563eb',
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  borderRadius: 8,
                }}
              >
                <ThemedText style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                  Actualizar a Premium
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* Historial de Pagos */}
            <View style={{
              backgroundColor: '#f8fafc',
              padding: 20,
              borderRadius: 12,
              marginBottom: 24,
            }}>
              <ThemedText style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: 16,
              }}>
                Historial de Pagos
              </ThemedText>
              
              <View style={{
                alignItems: 'center',
                paddingVertical: 32,
              }}>
                <ThemedText style={{ fontSize: 48, marginBottom: 12 }}>💳</ThemedText>
                <ThemedText style={{
                  fontSize: 16,
                  color: '#6b7280',
                  textAlign: 'center',
                }}>
                  No hay transacciones aún
                </ThemedText>
                <ThemedText style={{
                  fontSize: 14,
                  color: '#9ca3af',
                  textAlign: 'center',
                  marginTop: 4,
                }}>
                  Los pagos aparecerán aquí cuando actualices a Premium
                </ThemedText>
              </View>
            </View>

            {/* Métodos de Pago */}
            <View style={{
              backgroundColor: '#f8fafc',
              padding: 20,
              borderRadius: 12,
            }}>
              <ThemedText style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: 16,
              }}>
                Métodos de Pago
              </ThemedText>
              
              <TouchableOpacity style={{
                borderWidth: 2,
                borderColor: '#d1d5db',
                borderStyle: 'dashed',
                borderRadius: 8,
                padding: 16,
                alignItems: 'center',
              }}>
                <ThemedText style={{ fontSize: 24, marginBottom: 8 }}>💳</ThemedText>
                <ThemedText style={{
                  fontSize: 14,
                  color: '#6b7280',
                }}>
                  Añadir método de pago
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ThemedView style={{ flex: 1, padding: 24 }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
      }}>
        <View>
          <ThemedText style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: 4,
          }}>
            Configuración
          </ThemedText>
          <ThemedText style={{
            fontSize: 16,
            color: '#6b7280',
          }}>
            Gestiona tu cuenta y preferencias
          </ThemedText>
        </View>

        <TouchableOpacity
          onPress={onLogout}
          style={{
            backgroundColor: '#ef4444',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <ThemedText style={{ fontSize: 16, marginRight: 8 }}>🚪</ThemedText>
          <ThemedText style={{
            color: 'white',
            fontWeight: '600',
          }}>
            Cerrar Sesión
          </ThemedText>
        </TouchableOpacity>
      </View>

      <View style={{
        flexDirection: width > 768 ? 'row' : 'column',
        gap: 24,
        flex: 1,
      }}>
        {/* Sidebar de Tabs */}
        <View style={{
          width: width > 768 ? 240 : undefined,
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
          height: 'fit-content',
        }}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                marginBottom: 4,
                backgroundColor: activeTab === tab.key ? '#eff6ff' : 'transparent',
              }}
            >
              <ThemedText style={{
                fontSize: 18,
                marginRight: 12,
              }}>
                {tab.icon}
              </ThemedText>
              <ThemedText style={{
                fontSize: 15,
                fontWeight: activeTab === tab.key ? '600' : '500',
                color: activeTab === tab.key ? '#2563eb' : '#374151',
              }}>
                {tab.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contenido */}
        <View style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
        }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderTabContent()}
          </ScrollView>
        </View>
      </View>
    </ThemedView>
  );
};