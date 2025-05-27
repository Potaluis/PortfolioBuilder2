import { router } from 'expo-router';
import { useEffect } from 'react';

export default function RegisterPage() {
  useEffect(() => {
    // Redirigir a la página principal con el modal de registro abierto
    router.replace('/?auth=register');
  }, []);

  return null;
}