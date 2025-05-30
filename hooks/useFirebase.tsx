// hooks/useFirebase.tsx - ARREGLADO: Re-renders infinitos
import { isFirebaseConfigured } from '@/services/firebase';
import { AuthResponse, Project, User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

// Mock user para desarrollo
const createMockUser = (email: string, username?: string): User => ({
  uid: `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  username: username || email.split('@')[0],
  email: email,
  createdAt: new Date().toISOString(),
  emailVerified: true
});

// Mock projects para desarrollo
const createMockProjects = (userId: string): Project[] => [
  {
    id: `demo-project-${Date.now()}`,
    userId: userId,
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

  // CORREGIDO: Usar useCallback para evitar re-renders infinitos
  const getUserProjects = useCallback(async (): Promise<Project[]> => {
    if (!user?.uid) {
      console.log('❌ No hay usuario para obtener proyectos');
      return [];
    }

    console.log('📁 Obteniendo proyectos para usuario:', user.email);

    try {
      if (!isConfigured) {
        // Obtener proyectos del AsyncStorage si existen
        const storedProjects = await AsyncStorage.getItem('demo_projects');
        if (storedProjects) {
          const projects = JSON.parse(storedProjects);
          console.log('📁 Proyectos encontrados en storage:', projects.length);
          return projects;
        }
        
        // Si no hay proyectos guardados, crear y devolver los mock
        const mockProjects = createMockProjects(user.uid);
        await AsyncStorage.setItem('demo_projects', JSON.stringify(mockProjects));
        console.log('📁 Proyectos demo creados:', mockProjects.length);
        return mockProjects;
      }

      // TODO: Implementar obtención real de proyectos
      return [];
    } catch (error) {
      console.error('❌ Error obteniendo proyectos:', error);
      return [];
    }
  }, [user?.uid, user?.email, isConfigured]);

  // Inicializar - verificar usuario guardado
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🔥 Inicializando Firebase hook...');
      console.log('🔥 Firebase configurado:', isConfigured);
      
      try {
        // Verificar si hay un usuario guardado
        const storedUser = await AsyncStorage.getItem('demo_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log('👤 Usuario encontrado en storage:', parsedUser.email);
          setUser(parsedUser);
        } else {
          console.log('👤 No hay usuario guardado');
        }
      } catch (error) {
        console.error('❌ Error cargando usuario:', error);
      } finally {
        setLoading(false);
        console.log('✅ Inicialización completada');
      }
    };

    // Pequeño delay para simular carga inicial
    setTimeout(initializeAuth, 800);
  }, [isConfigured]); // CORREGIDO: Solo depende de isConfigured

  // Registrar usuario
  const register = async (email: string, password: string, username: string): Promise<AuthResponse> => {
    console.log('📝 Registro iniciado para:', email);
    
    try {
      setLoading(true);
      setError(null);

      if (!isConfigured) {
        console.log('📝 Modo demo - simulando registro...');
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const newUser = createMockUser(email, username);
        console.log('👤 Usuario demo creado:', newUser);
        
        // Guardar usuario en AsyncStorage
        await AsyncStorage.setItem('demo_user', JSON.stringify(newUser));
        
        // Actualizar estado
        setUser(newUser);
        
        console.log('✅ Registro demo completado');
        return { success: true, needsVerification: false };
      }

      // TODO: Implementar registro real con Firebase
      console.log('🔥 Firebase real no implementado');
      return { success: false, error: 'Firebase real no configurado' };
    } catch (error: any) {
      console.error('❌ Error en registro:', error);
      const errorMessage = 'Error en el registro';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Iniciar sesión
  const login = async (email: string, password: string): Promise<AuthResponse> => {
    console.log('🔑 Login iniciado para:', email);
    
    try {
      setLoading(true);
      setError(null);

      if (!isConfigured) {
        console.log('🔑 Modo demo - simulando login...');
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const loggedInUser = createMockUser(email);
        console.log('👤 Usuario demo logueado:', loggedInUser);
        
        // Guardar usuario en AsyncStorage
        await AsyncStorage.setItem('demo_user', JSON.stringify(loggedInUser));
        
        // Actualizar estado
        setUser(loggedInUser);
        
        console.log('✅ Login demo completado');
        return { success: true };
      }

      // TODO: Implementar login real con Firebase
      console.log('🔥 Firebase real no implementado');
      return { success: false, error: 'Firebase real no configurado' };
    } catch (error: any) {
      console.error('❌ Error en login:', error);
      const errorMessage = 'Error en el login';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Cerrar sesión
  const logout = async () => {
    console.log('🚪 Cerrando sesión...');
    
    try {
      if (!isConfigured) {
        // Limpiar AsyncStorage
        await AsyncStorage.removeItem('demo_user');
        await AsyncStorage.removeItem('demo_projects');
        setUser(null);
        console.log('✅ Sesión cerrada (modo demo)');
        return;
      }

      // TODO: Implementar logout real
      setUser(null);
    } catch (error) {
      console.error('❌ Error cerrando sesión:', error);
    }
  };

  // Guardar proyecto
  const saveProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user?.uid) throw new Error('Usuario no autenticado');

    console.log('💾 Guardando proyecto:', project.name);

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
        
        console.log('✅ Proyecto guardado:', newProject.id);
        return newProject;
      }

      // TODO: Implementar guardado real
      throw new Error('Firebase real no configurado');
    } catch (error) {
      console.error('❌ Error guardando proyecto:', error);
      throw error;
    }
  };

  // Actualizar proyecto
  const updateProject = async (projectId: string, updates: Partial<Project>) => {
    if (!user?.uid) throw new Error('Usuario no autenticado');

    console.log('📝 Actualizando proyecto:', projectId);

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
            console.log('✅ Proyecto actualizado');
          }
        }
        return;
      }

      // TODO: Implementar actualización real
    } catch (error) {
      console.error('❌ Error actualizando proyecto:', error);
      throw error;
    }
  };

  // Eliminar proyecto
  const deleteProject = async (projectId: string) => {
    if (!user?.uid) throw new Error('Usuario no autenticado');

    console.log('🗑️ Eliminando proyecto:', projectId);

    try {
      if (!isConfigured) {
        // Simular eliminación
        const storedProjects = await AsyncStorage.getItem('demo_projects');
        if (storedProjects) {
          const projects = JSON.parse(storedProjects);
          const filtered = projects.filter((p: Project) => p.id !== projectId);
          await AsyncStorage.setItem('demo_projects', JSON.stringify(filtered));
          console.log('✅ Proyecto eliminado');
        }
        return;
      }

      // TODO: Implementar eliminación real
    } catch (error) {
      console.error('❌ Error eliminando proyecto:', error);
      throw error;
    }
  };

  // Guardar configuración de usuario
  const saveUserPreferences = async (preferences: any) => {
    if (!user?.uid) throw new Error('Usuario no autenticado');

    try {
      if (!isConfigured) {
        const updatedUser = { ...user, preferences };
        await AsyncStorage.setItem('demo_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return;
      }

      // TODO: Implementar guardado real de preferencias
    } catch (error) {
      console.error('❌ Error guardando preferencias:', error);
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
    clearError: () => {
      console.log('🧹 Limpiando error');
      setError(null);
    },
    isConfigured
  };
};