// app/(tabs)/dashboard.tsx - Dashboard del usuario
import { AuthModal } from '@/components/auth/AuthModal';
import { HomeScreen } from '@/components/HomeScreen';
import { ProjectConfigModal } from '@/components/ProjectConfigModal';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { usePortfolioApp } from '@/hooks/usePortfolioApp';
import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function DashboardPage() {
  const {
    // Estados
    showAuthModal,
    showProjectConfigModal,
    authMode,
    user,
    projects,
    authForm,
    projectConfig,

    // Funciones de autenticación
    handleAuth,
    handleGoogleAuth,
    updateAuthForm,
    setAuthMode,
    logout,

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
  } = usePortfolioApp();

  // Si no hay usuario, mostrar pantalla de login
  if (!user) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
          Inicia sesión para ver tu Dashboard
        </ThemedText>
        <ThemedText style={{ fontSize: 16, marginBottom: 32, textAlign: 'center', opacity: 0.7 }}>
          Crea y gestiona tus portfolios profesionales
        </ThemedText>
        <TouchableOpacity
          style={{
            backgroundColor: '#2563eb',
            paddingHorizontal: 32,
            paddingVertical: 16,
            borderRadius: 12,
          }}
          onPress={() => openAuthModal('login')}
        >
          <ThemedText style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
            Iniciar Sesión
          </ThemedText>
        </TouchableOpacity>
        
        {/* Modal de autenticación */}
        <AuthModal
          visible={showAuthModal}
          authMode={authMode}
          authForm={authForm}
          onClose={closeAuthModal}
          onAuth={handleAuth}
          onGoogleAuth={handleGoogleAuth}
          onModeChange={setAuthMode}
          onFormChange={updateAuthForm}
        />
      </ThemedView>
    );
  }

  const handleOpenProject = (project: any) => {
    openProject(project);
    router.push({
      pathname: '/project/[id]',
      params: { id: project.id.toString() }
    });
  };

  return (
    <>
      <HomeScreen
        user={user}
        projects={projects}
        onOpenProject={handleOpenProject}
        onCreateProject={openProjectConfigModal}
        onLogout={logout}
      />

      <ProjectConfigModal
        visible={showProjectConfigModal}
        projectConfig={projectConfig}
        onClose={closeProjectConfigModal}
        onCreate={createNewProject}
        onToggleSection={toggleSection}
        onUpdateConfig={updateProjectConfig}
      />
    </>
  );
}