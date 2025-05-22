// hooks/userPortfolioApp.tsx
import {
    AuthForm,
    AuthMode,
    Project,
    ProjectConfig,
    User
} from '@/types';
import { useState } from 'react';
import { Alert } from 'react-native';

export const usePortfolioApp = () => {
  // Estados principales
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProjectConfigModal, setShowProjectConfigModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

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

  // Funciones de autenticación
  const handleAuth = () => {
    if (authMode === 'register') {
      // Simular verificación por email
      Alert.alert(
        'Verificación requerida',
        'Por favor, revisa tu correo electrónico para verificar tu cuenta.',
        [{ text: 'OK', onPress: () => setShowAuthModal(false) }]
      );
    } else {
      // Simular login exitoso
      setUser({ username: authForm.username || authForm.email });
      setShowAuthModal(false);
    }
    // Limpiar formulario
    setAuthForm({ username: '', email: '', password: '', confirmPassword: '' });
  };

  const handleGoogleAuth = () => {
    // Simular autenticación con Google
    setUser({ username: 'Usuario Google' });
    setShowAuthModal(false);
  };

  const updateAuthForm = (field: keyof AuthForm, value: string) => {
    setAuthForm(prev => ({ ...prev, [field]: value }));
  };

  // Funciones de proyectos
  const createNewProject = () => {
    const newProject: Project = {
      id: Date.now(),
      name: `Portfolio ${projects.length + 1}`,
      config: { ...projectConfig }
    };
    setProjects(prev => [...prev, newProject]);
    setCurrentProject(newProject);
    setShowProjectConfigModal(false);
  };

  const openProject = (project: Project) => {
    setCurrentProject(project);
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
  };

  const openProjectConfigModal = () => {
    setShowProjectConfigModal(true);
  };

  const closeProjectConfigModal = () => {
    setShowProjectConfigModal(false);
  };

  const logout = () => {
    setUser(null);
    setProjects([]);
    setCurrentProject(null);
  };

  return {
    // Estados
    showAuthModal,
    showProjectConfigModal,
    authMode,
    user,
    projects,
    currentProject,
    authForm,
    projectConfig,

    // Funciones de autenticación
    handleAuth,
    handleGoogleAuth,
    updateAuthForm,
    setAuthMode,

    // Funciones de proyectos
    createNewProject,
    openProject,

    // Funciones de configuración
    toggleSection,
    updateProjectConfig,

    // Funciones de navegación
    openAuthModal,
    closeAuthModal,
    openProjectConfigModal,
    closeProjectConfigModal,
    logout,
  };
};