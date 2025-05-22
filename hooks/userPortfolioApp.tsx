// hooks/userPortfolioApp.tsx - ACTUALIZADO con Firebase
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
  }, [firebaseUser]);

  // Mostrar errores de Firebase
  useEffect(() => {
    if (firebaseError) {
      Alert.alert('Error', firebaseError, [
        { text: 'OK', onPress: clearError }
      ]);
    }
  }, [firebaseError]);

  // Funciones de autenticación
  const handleAuth = async () => {
    if (authMode === 'register') {
      // Validaciones
      if (!authForm.username.trim()) {
        Alert.alert('Error', 'Por favor ingresa un nombre de usuario');
        return;
      }
      if (authForm.password !== authForm.confirmPassword) {
        Alert.alert('Error', 'Las contraseñas no coinciden');
        return;
      }

      // Registrar con Firebase
      const result = await firebaseRegister(
        authForm.email, 
        authForm.password, 
        authForm.username
      );

      if (result.success) {
        if (result.needsVerification) {
          Alert.alert(
            'Verificación requerida',
            'Te hemos enviado un email de verificación. Por favor verifica tu cuenta.',
            [{ text: 'OK', onPress: () => setShowAuthModal(false) }]
          );
        } else {
          setShowAuthModal(false);
        }
      }
    } else {
      // Iniciar sesión con Firebase
      const result = await firebaseLogin(authForm.email, authForm.password);
      
      if (result.success) {
        setShowAuthModal(false);
      }
    }

    // Limpiar formulario
    setAuthForm({ username: '', email: '', password: '', confirmPassword: '' });
  };

  const handleGoogleAuth = async () => {
    // TODO: Implementar autenticación con Google
    Alert.alert('Próximamente', 'Autenticación con Google estará disponible pronto');
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
        name: `Portfolio ${projects.length + 1}`,
        config: { ...projectConfig },
        content: {
          aboutMe: '',
          projects: [],
          services: [],
          blog: [],
          testimonials: [],
          contact: {}
        },
        settings: {
          published: false,
          domain: null,
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
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
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