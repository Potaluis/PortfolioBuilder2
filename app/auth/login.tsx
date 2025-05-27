import { router } from 'expo-router';
import { useEffect } from 'react';

export default function LoginPage() {
  useEffect(() => {
    // Redirigir a la página principal con el modal de login abierto
    router.replace('/?auth=login');
  }, []);

  return null;
}