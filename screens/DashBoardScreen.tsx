// screens/DashBoardScreen.tsx - BYPASS TOTAL PARA DESARROLLO
import { ContractsSection } from '@/components/dashboard/ContractsSection';
import { DashboardLayout, DashboardSection } from '@/components/dashboard/DashboardLayout';
import { EnhancedPortfolioCreator } from '@/components/dashboard/EnhancedPortfolioCreator';
import { MessagesSection } from '@/components/dashboard/MessagesSection';
import { PortfoliosSection } from '@/components/dashboard/PortfoliosSection';
import { SettingsSection } from '@/components/dashboard/SettingsSection';
import { StatisticsSection } from '@/components/dashboard/StatisticsSection';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Project, ProjectConfig, User } from '@/types';
import { DEV_CONFIG, devLog, getAppStatus } from '@/utils/devConfig';
import { getTempUserProjects } from '@/utils/tempData';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

// 🚨 USUARIO Y PROYECTOS TEMPORALES PARA DESARROLLO
const TEMP_USER: User = {
  uid: 'temp-user-123',
  username: 'Usuario Temporal',
  email: 'temp@portfoliobuilder.com',
  createdAt: new Date().toISOString(),
  emailVerified: true,
};

const TEMP_PROJECTS: Project[] = [
  {
    id: 'temp-project-1',
    userId: 'temp-user-123',
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
      aboutMe: { 
        title: 'Sobre mí', 
        description: 'Desarrollador apasionado por crear experiencias digitales increíbles.',
        skills: ['React Native', 'TypeScript', 'Firebase']
      },
      projects: [],
      services: [],
      blog: [],
      testimonials: [],
      contact: {}
    },
    settings: {
      published: false,
      seoTitle: 'Mi Portfolio Demo',
      seoDescription: 'Portfolio profesional de desarrollo'
    },
    createdAt: '2024-05-01T10:00:00Z',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'temp-project-2',
    userId: 'temp-user-123',
    name: 'Portfolio Creativo',
    config: {
      sections: [
        { name: 'Sobre mí', enabled: true, order: 0 },
        { name: 'Proyectos', enabled: true, order: 1 },
        { name: 'Servicios', enabled: true, order: 2 },
        { name: 'Contacto', enabled: true, order: 3 }
      ],
      menuPosition: 'left',
      projectStyle: 'carousel',
      projectsPerRowDesktop: 2,
      projectsPerRowMobile: 1
    },
    content: {
      aboutMe: { 
        title: 'Creativo Digital', 
        description: 'Diseñador especializado en experiencias visuales impactantes.',
        skills: ['UI/UX', 'Figma', 'Illustrator']
      },
      projects: [],
      services: [],
      blog: [],
      testimonials: [],
      contact: {}
    },
    settings: {
      published: true,
      seoTitle: 'Portfolio Creativo',
      seoDescription: 'Diseño y creatividad digital'
    },
    createdAt: '2024-04-15T14:30:00Z',
    updatedAt: new Date().toISOString()
  }
];

export const DashboardScreen: React.FC = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>('portfolios');
  const [showPortfolioCreator, setShowPortfolioCreator] = useState(false);
  const [projects, setProjects] = useState<Project[]>(getTempUserProjects());
  const [currentUser] = useState<User>(TEMP_USER);
  const appStatus = getAppStatus();

  useEffect(() => {
    devLog('Dashboard cargado en modo desarrollo');
    devLog('Usuario temporal:', currentUser.email);
    devLog('Proyectos cargados:', projects.length);
  }, [currentUser.email, projects.length]);

  // Funciones del portfolio
  const handleCreatePortfolio = (config: ProjectConfig) => {
    devLog('Creando portfolio con configuración:', config);
    
    const newProject: Project = {
      id: `temp-project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: currentUser.uid,
      name: `Mi Portfolio ${projects.length + 1}`,
      config: config,
      content: {
        aboutMe: { 
          title: 'Sobre mí', 
          description: 'Cuéntanos sobre ti y tu experiencia profesional...',
          skills: []
        },
        projects: [],
        services: [],
        blog: [],
        testimonials: [],
        contact: {
          email: currentUser.email
        }
      },
      settings: {
        published: false,
        seoTitle: `Portfolio de ${currentUser.username}`,
        seoDescription: 'Portfolio profesional creado con PortfolioBuilder'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      template: 'custom'
    };

    setProjects(prev => [newProject, ...prev]);
    setShowPortfolioCreator(false);
    
    Alert.alert('¡Éxito!', 'Portfolio creado correctamente (modo desarrollo)');
    devLog('Proyecto creado:', newProject.name);
  };

  const handleEditProject = (project: Project) => {
    devLog('Editando proyecto:', project.name);
    Alert.alert('Función de edición', 'Esta funcionalidad estará disponible pronto');
  };

  const handleDeleteProject = (project: Project) => {
    devLog('Eliminando proyecto:', project.name);
    
    Alert.alert(
      'Eliminar Portfolio',
      `¿Estás seguro de que deseas eliminar "${project.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => {
            setProjects(prev => prev.filter(p => p.id !== project.id));
            Alert.alert('Portfolio eliminado', 'El portfolio ha sido eliminado correctamente');
            devLog('Proyecto eliminado:', project.name);
          }
        },
      ]
    );
  };

  const handleOpenProject = (project: Project) => {
    devLog('Abriendo proyecto:', project.name);
    router.push(`/project/${project.id}`);
  };

  const handleDuplicateProject = (project: Project) => {
    devLog('Duplicando proyecto:', project.name);
    
    const duplicatedProject: Project = {
      ...project,
      id: `temp-project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: `${project.name} (Copia)`,
      settings: {
        ...project.settings,
        published: false,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProjects(prev => [duplicatedProject, ...prev]);
    Alert.alert('¡Éxito!', 'Portfolio duplicado correctamente');
    devLog('Proyecto duplicado:', duplicatedProject.name);
  };

  const handleUpdateUser = (updates: Partial<User>) => {
    devLog('Actualizando usuario:', updates);
    Alert.alert('Configuración guardada', 'Los cambios han sido guardados (modo desarrollo)');
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión',
          onPress: () => {
            Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente (modo desarrollo)');
            // En modo desarrollo, no hacemos nada más
          }
        }
      ]
    );
  };

  // Renderizar sección activa
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'portfolios':
        return (
          <PortfoliosSection
            projects={projects}
            onCreateProject={() => setShowPortfolioCreator(true)}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
            onOpenProject={handleOpenProject}
            onDuplicateProject={handleDuplicateProject}
          />
        );
      
      case 'statistics':
        return <StatisticsSection />;
      
      case 'messages':
        return <MessagesSection />;
      
      case 'contracts':
        return <ContractsSection />;
      
      case 'settings':
        return (
          <SettingsSection
            user={currentUser}
            onLogout={handleLogout}
            onUpdateUser={handleUpdateUser}
          />
        );
      
      default:
        return (
          <ThemedView style={{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: 40,
          }}>
            <ThemedText style={{ 
              fontSize: 48, 
              marginBottom: 16 
            }}>
              🚧
            </ThemedText>
            <ThemedText style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: 8,
              textAlign: 'center',
            }}>
              Sección en Desarrollo
            </ThemedText>
            <ThemedText style={{
              fontSize: 16,
              color: '#6b7280',
              textAlign: 'center',
            }}>
              Esta funcionalidad estará disponible pronto
            </ThemedText>
          </ThemedView>
        );
    }
  };

  return (
    <>
      {/* Banner de modo desarrollo */}
      {DEV_CONFIG.SHOW_DEV_BANNER && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: appStatus.color,
          paddingHorizontal: 20,
          paddingVertical: 12,
          paddingTop: 50, // Para el status bar
          zIndex: 1000,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ThemedText style={{ fontSize: 16, marginRight: 8 }}>{appStatus.icon}</ThemedText>
          <ThemedText style={{
            color: 'white',
            fontSize: 14,
            fontWeight: '600',
            textAlign: 'center',
          }}>
            {appStatus.message} - Usuario: {currentUser.username}
          </ThemedText>
        </View>
      )}

      <View style={{ 
        flex: 1, 
        marginTop: DEV_CONFIG.SHOW_DEV_BANNER ? 80 : 0 // Espacio para el banner
      }}>
        <DashboardLayout
          user={currentUser}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onLogout={handleLogout}
        >
          {renderActiveSection()}
        </DashboardLayout>
      </View>

      {/* Modal Creador de Portfolio */}
      <EnhancedPortfolioCreator
        visible={showPortfolioCreator}
        onClose={() => setShowPortfolioCreator(false)}
        onCreate={handleCreatePortfolio}
      />
    </>
  );
};