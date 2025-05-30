// hooks/usePortfolioApp.tsx - AUTENTICACIÓN CORREGIDA
import {
  AuthForm,
  AuthMode,
  Project,
  ProjectConfig
} from '@/types';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useFirebase } from './useFirebase';

export const usePortfolioApp = () => {
  // Firebase hook
  const {
    user: firebaseUser,
    loading: firebaseLoading,
    error: firebaseError,
    register: firebaseRegister,
    login: firebaseLogin,
    logout: firebaseLogout,
    getUserProjects,
    saveProject,
    updateProject,
    deleteProject,
    clearError
  } = useFirebase();

  // Estados de UI
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProjectConfigModal, setShowProjectConfigModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  // Estados del formulario de auth
  const [authForm, setAuthForm] = useState<AuthForm>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Estados de configuración del proyecto
  const [projectConfig, setProjectConfig] = useState<ProjectConfig>({
    sections: [
      { name: 'Sobre mí', enabled: true, order: 0 },
      { name: 'Proyectos', enabled: true, order: 1 },
      { name: 'Servicios', enabled: false, order: 2 },
      { name: 'Blog', enabled: false, order: 3 },
      { name: 'Testimonios', enabled: false, order: 4 },
      { name: 'Contacto', enabled: true, order: 5 },
      { name: 'CV descargable', enabled: false, order: 6 }
    ],
    menuPosition: 'top',
    projectStyle: 'grid',
    projectsPerRowDesktop: 3,
    projectsPerRowMobile: 2
  });

  // Cargar proyectos cuando el usuario esté autenticado
  useEffect(() => {
    const loadUserProjects = async () => {
      if (firebaseUser) {
        setLoading(true);
        try {
          const userProjects = await getUserProjects();
          setProjects(userProjects);
        } catch (error) {
          console.error('Error loading projects:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setProjects([]);
      }
    };

    loadUserProjects();
  }, [firebaseUser, getUserProjects]);

  // Mostrar errores de Firebase
  useEffect(() => {
    if (firebaseError) {
      Alert.alert('Error', firebaseError, [
        { text: 'OK', onPress: clearError }
      ]);
    }
  }, [firebaseError, clearError]);

  // Funciones de autenticación CORREGIDAS
  const handleAuth = async () => {
    console.log('🔐 handleAuth iniciado - modo:', authMode);
    
    // Validaciones básicas
    const emailTrim = authForm.email.trim();
    const passwordTrim = authForm.password.trim();
    
    if (!emailTrim) {
      Alert.alert('Error', 'Por favor ingresa tu email');
      return;
    }
    
    // Validación simple de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrim)) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return;
    }
    
    if (!passwordTrim) {
      Alert.alert('Error', 'Por favor ingresa tu contraseña');
      return;
    }

    try {
      setLoading(true);
      
      if (authMode === 'register') {
        // Validaciones adicionales para registro
        const usernameTrim = authForm.username.trim();
        
        if (!usernameTrim) {
          Alert.alert('Error', 'Por favor ingresa un nombre de usuario');
          return;
        }
        
        if (passwordTrim.length < 6) {
          Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
          return;
        }
        
        if (passwordTrim !== authForm.confirmPassword) {
          Alert.alert('Error', 'Las contraseñas no coinciden');
          return;
        }

        console.log('📝 Intentando registrar usuario...');
        const result = await firebaseRegister(emailTrim, passwordTrim, usernameTrim);
        console.log('📝 Resultado del registro:', result);
        
        if (result.success) {
          setShowAuthModal(false);
          setAuthForm({ username: '', email: '', password: '', confirmPassword: '' });
          Alert.alert('¡Registro Exitoso!', 'Tu cuenta ha sido creada correctamente');
        } else {
          Alert.alert('Error en el Registro', result.error || 'No se pudo crear la cuenta');
        }
      } else {
        console.log('🔑 Intentando iniciar sesión...');
        const result = await firebaseLogin(emailTrim, passwordTrim);
        console.log('🔑 Resultado del login:', result);
        
        if (result.success) {
          setShowAuthModal(false);
          setAuthForm({ username: '', email: '', password: '', confirmPassword: '' });
          Alert.alert('¡Bienvenido!', 'Has iniciado sesión correctamente');
        } else {
          Alert.alert('Error en el Login', result.error || 'No se pudo iniciar sesión');
        }
      }
    } catch (error) {
      console.error('❌ Error en autenticación:', error);
      Alert.alert('Error', 'Ocurrió un error inesperado. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    console.log('🚀 Google auth iniciado - modo demo');
    
    try {
      setLoading(true);
      
      // Usar el método de login del hook de Firebase con credenciales de Google simuladas
      const result = await firebaseLogin('demo.google@gmail.com', 'google123');
      
      if (result.success) {
        setShowAuthModal(false);
        setAuthForm({ username: '', email: '', password: '', confirmPassword: '' });
        Alert.alert('¡Bienvenido!', 'Has iniciado sesión con Google (modo demo)');
      } else {
        Alert.alert('Error', 'No se pudo iniciar sesión con Google');
      }
    } catch (error) {
      console.error('❌ Error en Google auth:', error);
      Alert.alert('Error', 'No se pudo iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  };

  const updateAuthForm = (field: keyof AuthForm, value: string) => {
    setAuthForm(prev => ({ ...prev, [field]: value }));
  };

  // Funciones de proyectos
  const createNewProject = async () => {
    if (!firebaseUser) {
      Alert.alert('Error', 'Debes iniciar sesión para crear un proyecto');
      return;
    }

    setLoading(true);
    try {
      const newProjectData = {
        userId: firebaseUser.uid,
        name: `Portfolio ${projects.length + 1}`,
        config: { ...projectConfig },
        content: {
          aboutMe: {
            title: '',
            description: '',
            image: '',
            skills: []
          },
          projects: [],
          services: [],
          blog: [],
          testimonials: [],
          contact: {}
        },
        settings: {
          published: false,
          domain: undefined,
          seoTitle: '',
          seoDescription: ''
        }
      };

      const savedProject = await saveProject(newProjectData);
      
      setProjects(prev => [savedProject, ...prev]);
      setCurrentProject(savedProject);
      setShowProjectConfigModal(false);
      
      Alert.alert('¡Éxito!', 'Portfolio creado correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el portfolio');
      console.error('Error creating project:', error);
    } finally {
      setLoading(false);
    }
  };

  const openProject = (project: Project) => {
    setCurrentProject(project);
  };

  const updateProjectInList = async (projectId: string, updates: Partial<Project>) => {
    try {
      await updateProject(projectId, updates);
      
      setProjects(prev => 
        prev.map(p => p.id === projectId ? { ...p, ...updates } : p)
      );
      
      if (currentProject?.id === projectId) {
        setCurrentProject(prev => prev ? { ...prev, ...updates } : null);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el proyecto');
      console.error('Error updating project:', error);
    }
  };

  const removeProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      
      setProjects(prev => prev.filter(p => p.id !== projectId));
      
      if (currentProject?.id === projectId) {
        setCurrentProject(null);
      }
      
      Alert.alert('Éxito', 'Portfolio eliminado');
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el portfolio');
      console.error('Error deleting project:', error);
    }
  };

  // Funciones de configuración
  const toggleSection = (index: number) => {
    const updatedSections = [...projectConfig.sections];
    updatedSections[index].enabled = !updatedSections[index].enabled;
    setProjectConfig(prev => ({ ...prev, sections: updatedSections }));
  };

  const updateProjectConfig = (field: keyof ProjectConfig, value: any) => {
    setProjectConfig(prev => ({ ...prev, [field]: value }));
  };

  // Funciones de navegación
const openAuthModal = (mode: AuthMode) => {
  console.log('🔓 Abriendo modal de auth en modo:', mode);
  setAuthMode(mode);
  setShowAuthModal(true);
  // Limpiar formulario al abrir
  setAuthForm({ username: '', email: '', password: '', confirmPassword: '' });
  clearError();
};

  const closeAuthModal = () => {
    console.log('🔒 Cerrando modal de auth');
    setShowAuthModal(false);
    setAuthForm({ username: '', email: '', password: '', confirmPassword: '' });
    clearError();
  };

  const openProjectConfigModal = () => {
    if (!firebaseUser) {
      Alert.alert('Error', 'Debes iniciar sesión para crear un proyecto');
      return;
    }
    setShowProjectConfigModal(true);
  };

  const closeProjectConfigModal = () => {
    setShowProjectConfigModal(false);
  };

  const logout = async () => {
    try {
      await firebaseLogout();
      setProjects([]);
      setCurrentProject(null);
      Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return {
    // Estados
    showAuthModal,
    showProjectConfigModal,
    authMode,
    user: firebaseUser,
    projects,
    currentProject,
    authForm,
    projectConfig,
    loading: loading || firebaseLoading,
    error: firebaseError,

    // Funciones de autenticación
    handleAuth,
    handleGoogleAuth,
    updateAuthForm,
    setAuthMode,

    // Funciones de proyectos
    createNewProject,
    openProject,
    updateProjectInList,
    removeProject,

    // Funciones de configuración
    toggleSection,
    updateProjectConfig,

    // Funciones de navegación
    openAuthModal,
    closeAuthModal,
    openProjectConfigModal,
    closeProjectConfigModal,
    logout,

    // Utilidades
    clearError,
  };
};