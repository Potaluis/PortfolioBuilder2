// components/landing/ContactForm.tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { Alert, Dimensions, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactReasons = [
  "Consulta General",
  "Soporte Técnico", 
  "Problema con mi cuenta",
  "Sugerencia de mejora",
  "Colaboración",
  "Otro"
];

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');

  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu nombre');
      return false;
    }
    
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu email');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return false;
    }
    
    if (!selectedReason) {
      Alert.alert('Error', 'Por favor selecciona el motivo de tu consulta');
      return false;
    }
    
    if (!formData.message.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu mensaje');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simular envío de email
      // En producción, aquí enviarías el email a juanlupriv24@gmail.com
      const emailData = {
        to: 'juanlupriv24@gmail.com',
        subject: `PortfolioBuilder: ${selectedReason} - ${formData.name}`,
        body: `
Nuevo mensaje de contacto desde PortfolioBuilder:

Nombre: ${formData.name}
Email: ${formData.email}
Motivo: ${selectedReason}
Asunto: ${formData.subject || 'Sin asunto específico'}

Mensaje:
${formData.message}

---
Enviado desde la página de contacto de PortfolioBuilder
        `
      };
      
      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        '¡Mensaje Enviado!',
        'Gracias por contactarnos. Te responderemos lo antes posible.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Limpiar formulario
              setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
              });
              setSelectedReason('');
            }
          }
        ]
      );
      
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar el mensaje. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={{
      paddingVertical: 80,
      paddingHorizontal: 20,
      backgroundColor: 'white',
    }}>
      <View style={{
        maxWidth: 800,
        width: '100%',
        alignSelf: 'center',
      }}>
        {/* Título */}
        <View style={{ 
          alignItems: 'center', 
          marginBottom: 48 
        }}>
          <ThemedText style={{
            fontSize: 36,
            fontWeight: 'bold',
            color: '#1f2937',
            textAlign: 'center',
            marginBottom: 16,
          }}>
            ¿Necesitas Ayuda?
          </ThemedText>
          <ThemedText style={{
            fontSize: 18,
            color: '#6b7280',
            textAlign: 'center',
            maxWidth: 600,
            lineHeight: 26,
          }}>
            Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos pronto.
          </ThemedText>
        </View>

        {/* Información de contacto rápido */}
        <View style={{
          flexDirection: width > 600 ? 'row' : 'column',
          gap: 24,
          marginBottom: 48,
        }}>
          <View style={{
            flex: 1,
            backgroundColor: '#f8fafc',
            padding: 20,
            borderRadius: 12,
            alignItems: 'center',
          }}>
            <ThemedText style={{ fontSize: 24, marginBottom: 8 }}>📧</ThemedText>
            <ThemedText style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: 4,
            }}>
              Email
            </ThemedText>
            <ThemedText style={{
              fontSize: 14,
              color: '#6b7280',
              textAlign: 'center',
            }}>
              juanlupriv24@gmail.com
            </ThemedText>
          </View>

          <View style={{
            flex: 1,
            backgroundColor: '#f8fafc',
            padding: 20,
            borderRadius: 12,
            alignItems: 'center',
          }}>
            <ThemedText style={{ fontSize: 24, marginBottom: 8 }}>⏰</ThemedText>
            <ThemedText style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: 4,
            }}>
              Respuesta
            </ThemedText>
            <ThemedText style={{
              fontSize: 14,
              color: '#6b7280',
              textAlign: 'center',
            }}>
              Dentro de 24 horas
            </ThemedText>
          </View>
        </View>

        {/* Formulario */}
        <View style={{
          backgroundColor: '#f8fafc',
          padding: 32,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 4,
        }}>
          {/* Nombre y Email */}
          <View style={{
            flexDirection: width > 600 ? 'row' : 'column',
            gap: 16,
            marginBottom: 20,
          }}>
            <View style={{ flex: 1 }}>
              <ThemedText style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#374151',
                marginBottom: 8,
              }}>
                Nombre *
              </ThemedText>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  color: textColor,
                }}
                placeholder="Tu nombre completo"
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View style={{ flex: 1 }}>
              <ThemedText style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#374151',
                marginBottom: 8,
              }}>
                Email *
              </ThemedText>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  color: textColor,
                }}
                placeholder="tu@email.com"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          {/* Motivo de consulta */}
          <View style={{ marginBottom: 20 }}>
            <ThemedText style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#374151',
              marginBottom: 12,
            }}>
              Motivo de tu consulta *
            </ThemedText>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 8,
            }}>
              {contactReasons.map((reason) => (
                <TouchableOpacity
                  key={reason}
                  onPress={() => setSelectedReason(reason)}
                  style={{
                    backgroundColor: selectedReason === reason ? '#2563eb' : 'white',
                    borderWidth: 1,
                    borderColor: selectedReason === reason ? '#2563eb' : '#d1d5db',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                  }}
                >
                  <ThemedText style={{
                    fontSize: 14,
                    color: selectedReason === reason ? 'white' : '#6b7280',
                    fontWeight: selectedReason === reason ? '600' : '400',
                  }}>
                    {reason}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Asunto */}
          <View style={{ marginBottom: 20 }}>
            <ThemedText style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#374151',
              marginBottom: 8,
            }}>
              Asunto (opcional)
            </ThemedText>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                color: textColor,
              }}
              placeholder="Breve descripción del asunto"
              value={formData.subject}
              onChangeText={(text) => handleInputChange('subject', text)}
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Mensaje */}
          <View style={{ marginBottom: 24 }}>
            <ThemedText style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#374151',
              marginBottom: 8,
            }}>
              Mensaje *
            </ThemedText>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                color: textColor,
                minHeight: 120,
                textAlignVertical: 'top',
              }}
              placeholder="Describe tu consulta con el mayor detalle posible..."
              value={formData.message}
              onChangeText={(text) => handleInputChange('message', text)}
              multiline
              numberOfLines={6}
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Botón enviar */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            style={{
              backgroundColor: loading ? '#9ca3af' : '#2563eb',
              paddingVertical: 16,
              paddingHorizontal: 24,
              borderRadius: 12,
              alignItems: 'center',
              shadowColor: '#2563eb',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: loading ? 0 : 0.2,
              shadowRadius: 8,
              elevation: loading ? 0 : 8,
            }}
          >
            <ThemedText style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
            }}>
              {loading ? 'Enviando...' : 'Enviar Mensaje'}
            </ThemedText>
          </TouchableOpacity>

          {/* Nota de privacidad */}
          <ThemedText style={{
            fontSize: 12,
            color: '#9ca3af',
            textAlign: 'center',
            marginTop: 16,
            lineHeight: 18,
          }}>
            Tu información está segura. Solo la usaremos para responder a tu consulta.
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
};