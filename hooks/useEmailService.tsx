import { ContactMessage, sendContactMessage } from '@/services/emailService';
import { useState } from 'react';
import { Alert } from 'react-native';

export const useEmailService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (data: ContactMessage): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const success = await sendContactMessage(data);
      
      if (success) {
        Alert.alert(
          '¡Mensaje Enviado!',
          'Gracias por contactarnos. Te responderemos lo antes posible.'
        );
        return true;
      } else {
        throw new Error('No se pudo enviar el mensaje');
      }
    } catch (err) {
      const errorMessage = 'Error al enviar el mensaje. Por favor intenta de nuevo.';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    sendMessage,
    loading,
    error,
    clearError: () => setError(null),
  };
};