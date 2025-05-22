// hooks/useFirebase.tsx - SIMPLIFICADO sin errores
import { isFirebaseConfigured } from '@/services/firebase';
import { Project, User } from '@/types';
import { useEffect, useState } from 'react';

// Mock user para desarrollo
const MOCK_USER: User = {
  uid: 'demo-user-123',
  username: 'Usuario Demo',
  email: 'demo@portfoliobuilder.com',
  createdAt: new Date().toISOString(),
  emailVerified: true
};

// Mock projects para desarrollo
const MOCK_PROJECTS: Project[] = [
  {
    id: 'demo-project-1',
    userId: 'demo-user-123',
    name: 'Mi Portfolio Demo',
    config: {
      sections: [
        { name: 'Sobre mí', enabled: true, order: 0 },
        { name: 'Proyectos', enabled: true, order: 1 },
        { name: 'Contacto', enabled: true, order: 2 }
      ],
      menuPosition: 'top',
      projectStyle: 'grid',
      projectsPerRowDesktop: 3,
      projectsPerRowMobile: 2
    },
    content: {
      aboutMe: { title: 'Sobre mí', description: 'Descripción demo' },
      projects: [],
      services: [],
      blog: [],
      testimonials: [],
      contact: {}
    },
    settings: {
      published: false,
      seoTitle: 'Mi Portfolio',
      seoDescription: 'Portfolio profesional'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const useFirebase = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isConfigured = isFirebaseConfigured();

  // Inicializar en modo demo o real
  useEffect(() => {
    if (isConfigured) {
      // TODO: Implementar Firebase real cuando esté configurado
      console.log('🔥 Firebase configurado - implementar lógica real');
      setLoading(false);
    } else {
      // Modo demo
      console.log('🎭 Modo demo activo');
      setTimeout(() => setLoading(false), 1000);
    }
  }, [isConfigured]);

  // Registrar usuario
  const register = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      setError(null);

      if (!isConfigured) {
        // Simulación en modo demo
        setTimeout(() => {
          setUser({ ...MOCK_USER, email, username });
          setLoading(false);
        }, 1500);
        return { success: true, needsVerification: true };
      }

      // TODO: Implementar registro real con Firebase
      // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // await sendEmailVerification(userCredential.user);
      // const userProfile = await createUserProfile(userCredential.user, username);
      // setUser(userProfile);
      
      return { success: true, needsVerification: true };
    } catch (error: any) {
      const errorMessage = 'Error en el registro';
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

      if (!isConfigured) {
        // Simulación en modo demo
        setTimeout(() => {
          setUser({ ...MOCK_USER, email });
          setLoading(false);
        }, 1000);
        return { success: true };
      }

      // TODO: Implementar login real con Firebase
      // const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // const userProfile = await getUserProfile(userCredential.user.uid);
      // setUser(userProfile);
      
      return { success: true };
    } catch (error: any) {
      const errorMessage = 'Error en el login';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      if (!isConfigured) {
        setUser(null);
        return;
      }

      // TODO: Implementar logout real
      // await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Obtener proyectos del usuario
  const getUserProjects = async (): Promise<Project[]> => {
    if (!user?.uid) return [];

    try {
      if (!isConfigured) {
        // Devolver proyectos demo
        return MOCK_PROJECTS;
      }

      // TODO: Implementar obtención real de proyectos
      // const projectsRef = collection(db, 'users', user.uid, 'portfolios');
      // const querySnapshot = await getDocs(projectsRef);
      // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      
      return [];
    } catch (error) {
      console.error('Error getting user projects:', error);
      return [];
    }
  };

  // Guardar proyecto
  const saveProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user?.uid) throw new Error('User not authenticated');

    try {
      if (!isConfigured) {
        // Simular guardado
        const newProject = {
          id: `demo-${Date.now()}`,
          ...project,
          userId: user.uid,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        return newProject;
      }

      // TODO: Implementar guardado real
      // const projectData = { ...project, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), userId: user.uid };
      // const docRef = await addDoc(collection(db, 'users', user.uid, 'portfolios'), projectData);
      // return { id: docRef.id, ...projectData };
      
      throw new Error('Firebase not configured');
    } catch (error) {
      console.error('Error saving project:', error);
      throw error;
    }
  };

  // Actualizar proyecto
  const updateProject = async (projectId: string, updates: Partial<Project>) => {
    if (!user?.uid) throw new Error('User not authenticated');

    try {
      if (!isConfigured) {
        // Simular actualización
        console.log('Demo: actualizando proyecto', projectId, updates);
        return;
      }

      // TODO: Implementar actualización real
      // const projectRef = doc(db, 'users', user.uid, 'portfolios', projectId);
      // await updateDoc(projectRef, { ...updates, updatedAt: new Date().toISOString() });
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  };

  // Eliminar proyecto
  const deleteProject = async (projectId: string) => {
    if (!user?.uid) throw new Error('User not authenticated');

    try {
      if (!isConfigured) {
        // Simular eliminación
        console.log('Demo: eliminando proyecto', projectId);
        return;
      }

      // TODO: Implementar eliminación real
      // const projectRef = doc(db, 'users', user.uid, 'portfolios', projectId);
      // await deleteDoc(projectRef);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };

  // Guardar configuración de usuario
  const saveUserPreferences = async (preferences: any) => {
    if (!user?.uid) throw new Error('User not authenticated');

    try {
      if (!isConfigured) {
        console.log('Demo: guardando preferencias', preferences);
        return;
      }

      // TODO: Implementar guardado real de preferencias
      // const userRef = doc(db, 'users', user.uid);
      // await updateDoc(userRef, { preferences });
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
    clearError: () => setError(null),
    isConfigured
  };
};