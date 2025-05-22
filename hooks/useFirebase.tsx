// hooks/useFirebase.tsx - Hook para Firebase operations
import { auth, db } from '@/services/firebase';
import { Project, User } from '@/types';
import {
    createUserWithEmailAndPassword,
    User as FirebaseUser,
    onAuthStateChanged,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useFirebase = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Escuchar cambios de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Usuario logueado - obtener datos del perfil
        const userProfile = await getUserProfile(firebaseUser.uid);
        setUser(userProfile);
      } else {
        // Usuario no logueado
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Obtener perfil de usuario desde Firestore
  const getUserProfile = async (uid: string): Promise<User | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return { ...userDoc.data(), uid } as User;
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  };

  // Crear perfil de usuario en Firestore
  const createUserProfile = async (firebaseUser: FirebaseUser, username: string) => {
    try {
      const userProfile: User = {
        uid: firebaseUser.uid,
        username,
        email: firebaseUser.email || '',
        createdAt: new Date().toISOString(),
        emailVerified: firebaseUser.emailVerified
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), userProfile);
      return userProfile;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  };

  // Registrar usuario
  const register = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      setError(null);

      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Enviar email de verificación
      await sendEmailVerification(userCredential.user);
      
      // Crear perfil en Firestore
      const userProfile = await createUserProfile(userCredential.user, username);
      
      setUser(userProfile);
      return { success: true, needsVerification: true };
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error.code);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Iniciar sesión
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userProfile = await getUserProfile(userCredential.user.uid);
      
      setUser(userProfile);
      return { success: true };
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error.code);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Obtener proyectos del usuario
  const getUserProjects = async (): Promise<Project[]> => {
    if (!user?.uid) return [];

    try {
      const projectsRef = collection(db, 'users', user.uid, 'portfolios');
      const querySnapshot = await getDocs(projectsRef);
      
      const projects: Project[] = [];
      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() } as Project);
      });
      
      return projects.sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
      console.error('Error getting user projects:', error);
      return [];
    }
  };

  // Guardar proyecto
  const saveProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user?.uid) throw new Error('User not authenticated');

    try {
      const projectData = {
        ...project,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user.uid
      };

      const docRef = await addDoc(
        collection(db, 'users', user.uid, 'portfolios'),
        projectData
      );

      return { id: docRef.id, ...projectData };
    } catch (error) {
      console.error('Error saving project:', error);
      throw error;
    }
  };

  // Actualizar proyecto
  const updateProject = async (projectId: string, updates: Partial<Project>) => {
    if (!user?.uid) throw new Error('User not authenticated');

    try {
      const projectRef = doc(db, 'users', user.uid, 'portfolios', projectId);
      await updateDoc(projectRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  };

  // Eliminar proyecto
  const deleteProject = async (projectId: string) => {
    if (!user?.uid) throw new Error('User not authenticated');

    try {
      const projectRef = doc(db, 'users', user.uid, 'portfolios', projectId);
      await deleteDoc(projectRef);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };

  // Guardar configuración de usuario
  const saveUserPreferences = async (preferences: any) => {
    if (!user?.uid) throw new Error('User not authenticated');

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { preferences });
    } catch (error) {
      console.error('Error saving preferences:', error);
      throw error;
    }
  };

  return {
    // Estados
    user,
    loading,
    error,
    
    // Métodos de autenticación
    register,
    login,
    logout,
    
    // Métodos de proyectos
    getUserProjects,
    saveProject,
    updateProject,
    deleteProject,
    
    // Métodos de configuración
    saveUserPreferences,
    
    // Utilidades
    clearError: () => setError(null)
  };
};

// Utilidad para convertir códigos de error de Firebase a mensajes amigables
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Este email ya está registrado';
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres';
    case 'auth/invalid-email':
      return 'Email inválido';
    case 'auth/user-not-found':
      return 'Usuario no encontrado';
    case 'auth/wrong-password':
      return 'Contraseña incorrecta';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Intenta más tarde';
    default:
      return 'Error de autenticación';
  }
};