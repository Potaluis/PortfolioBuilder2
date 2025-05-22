// services/firebase.ts - CONFIGURACIÓN CORREGIDA
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuración Firebase - Usa variables de entorno o valores de desarrollo
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "AIzaSyBWnZrqrgo-uc7KUhRParm1n_Ch0-9TS0A",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "portfoliobuilder-436e2.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "portfoliobuilder-436e2",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "portfoliobuilder-436e2.firebasestorage.app",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1:1006205399991:web:331b8271705bb469ce6e32",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "1:123456789012:web:abcdef123456789",
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID || "G-L3H3YFTHP3"
};

// Verificar si estamos en modo desarrollo
const isDevelopment = !process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 
                     process.env.NODE_ENV === 'development';

if (isDevelopment) {
  console.log('🔧 Firebase en modo desarrollo - usando configuración demo');
  console.log('📋 Para usar Firebase real, configura las variables en .env');
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configuraciones adicionales
if (typeof window !== 'undefined') {
  auth.useDeviceLanguage(); // Solo en cliente
}

// Conectar emuladores en desarrollo (opcional)
if (isDevelopment && typeof window !== 'undefined') {
  // Descomenta estas líneas si quieres usar emuladores locales
  // connectAuthEmulator(auth, 'http://localhost:9099');
  // connectFirestoreEmulator(db, 'localhost', 8080);
  // connectStorageEmulator(storage, 'localhost', 9199);
}

export default app;

// Función para verificar si Firebase está configurado correctamente
export const isFirebaseConfigured = () => {
  return Boolean(process.env.EXPO_PUBLIC_FIREBASE_API_KEY && 
                process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID);
};

// Función para obtener el estado de la configuración
export const getFirebaseStatus = () => {
  if (isFirebaseConfigured()) {
    return {
      status: 'configured',
      message: 'Firebase configurado correctamente'
    };
  } else {
    return {
      status: 'demo',
      message: 'Usando configuración de desarrollo. Configura .env para usar Firebase real.'
    };
  }
};