// hooks/useFirebase.tsx - CORREGIDO con flujo de autenticación funcional
import { isFirebaseConfigured } from '@/services/firebase';
import { AuthResponse, Project, User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    // Verificar si hay un usuario guardado en el storage (simulado)
    const checkStoredUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('demo_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading stored user:', error);
      }
      setLoading(false);
    };

    // Pequeño delay para simular carga
    setTimeout(checkStoredUser, 500);
  }, []);

  // Registrar usuario
  const register = async (email: string, password: string, username: string): Promise<AuthResponse> => {
    try {
      setLoading(true);
      setError(null);

      if (!isConfigured) {
        // Simulación en modo demo con Promise tipada
        return new Promise<AuthResponse>(async (resolve) => {
          setTimeout(async () => {
            const newUser = { 
              ...MOCK_USER, 
              uid: `demo-${Date.now()}`,
              email, 
              username,
              createdAt: new Date().toISOString()
            };
            
            // Guardar usuario en AsyncStorage para persistencia
            try {
              await AsyncStorage.setItem('demo_user', JSON.stringify(newUser));
            } catch (error) {
              console.error('Error saving user to storage:', error);
            }
            
            // Actualizar estado
            setUser(newUser);
            setLoading(false);
            
            resolve({ success: true, needsVerification: false });
          }, 1500);
        });
      }

      // TODO: Implementar registro real con Firebase
      return { success: true, needsVerification: true };
    } catch (error: any) {
      const errorMessage = 'Error en el registro';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Iniciar sesión
  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setLoading(true);
      setError(null);

      if (!isConfigured) {
        // Simulación en modo demo con Promise tipada
        return new Promise<AuthResponse>(async (resolve) => {
          setTimeout(async () => {
            const loggedInUser = { 
              ...MOCK_USER, 
              uid: `demo-${Date.now()}`,
              email,
              username: email.split('@')[0] // Usar parte del email como username
            };
            
            // Guardar usuario en AsyncStorage para persistencia
            try {
              await AsyncStorage.setItem('demo_user', JSON.stringify(loggedInUser));
            } catch (error) {
              console.error('Error saving user to storage:', error);
            }
            
            // Actualizar estado
            setUser(loggedInUser);
            setLoading(false);
            
            resolve({ success: true });
          }, 1000);
        });
      }

      // TODO: Implementar login real con Firebase
      return { success: true };
    } catch (error: any) {
      const errorMessage = 'Error en el login';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      if (!isConfigured) {
        // Limpiar AsyncStorage
        await AsyncStorage.removeItem('demo_user');
        await AsyncStorage.removeItem('demo_projects');
        setUser(null);
        return;
      }

      // TODO: Implementar logout real
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
        // Obtener proyectos del AsyncStorage si existen
        const storedProjects = await AsyncStorage.getItem('demo_projects');
        if (storedProjects) {
          return JSON.parse(storedProjects);
        }
        
        // Si no hay proyectos guardados, devolver los mock
        return MOCK_PROJECTS.map(p => ({
          ...p,
          userId: user.uid
        }));
      }

      // TODO: Implementar obtención real de proyectos
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
        const newProject: Project = {
          id: `demo-${Date.now()}`,
          ...project,
          userId: user.uid,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        // Obtener proyectos actuales
        const storedProjects = await AsyncStorage.getItem('demo_projects');
        const projects = storedProjects ? JSON.parse(storedProjects) : [];
        
        // Agregar nuevo proyecto
        projects.push(newProject);
        
        // Guardar en AsyncStorage
        await AsyncStorage.setItem('demo_projects', JSON.stringify(projects));
        
        return newProject;
      }

      // TODO: Implementar guardado real
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
        const storedProjects = await AsyncStorage.getItem('demo_projects');
        if (storedProjects) {
          const projects = JSON.parse(storedProjects);
          const index = projects.findIndex((p: Project) => p.id === projectId);
          
          if (index !== -1) {
            projects[index] = {
              ...projects[index],
              ...updates,
              updatedAt: new Date().toISOString()
            };
            
            await AsyncStorage.setItem('demo_projects', JSON.stringify(projects));
          }
        }
        return;
      }

      // TODO: Implementar actualización real
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
        const storedProjects = await AsyncStorage.getItem('demo_projects');
        if (storedProjects) {
          const projects = JSON.parse(storedProjects);
          const filtered = projects.filter((p: Project) => p.id !== projectId);
          await AsyncStorage.setItem('demo_projects', JSON.stringify(filtered));
        }
        return;
      }

      // TODO: Implementar eliminación real
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
        const updatedUser = { ...user, preferences };
        await AsyncStorage.setItem('demo_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return;
      }

      // TODO: Implementar guardado real de preferencias
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