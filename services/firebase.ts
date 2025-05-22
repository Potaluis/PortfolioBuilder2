// services/firebase.ts - Configuración Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuración Firebase - REEMPLAZAR con tus valores
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "tu-api-key",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "tu-auth-domain",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "tu-project-id",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "tu-storage-bucket",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "tu-sender-id",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "tu-app-id"
};

// Verificar que las variables de entorno estén configuradas
if (!process.env.EXPO_PUBLIC_FIREBASE_API_KEY) {
  console.warn('⚠️ Firebase config using default values. Please set environment variables.');
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configuraciones adicionales
auth.useDeviceLanguage(); // Usar idioma del dispositivo

export default app;