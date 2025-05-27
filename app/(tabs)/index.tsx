// app/(tabs)/index.tsx - CORREGIR conflicto de nombres
import { AuthModal } from '@/components/auth/AuthModal';
import { HomeScreen } from '@/components/HomeScreen';
import { ProjectConfigModal } from '@/components/ProjectConfigModal';
import { StartScreen } from '@/components/StartScreen';
import { usePortfolioApp } from '@/hooks/usePortfolioApp';
import { router } from 'expo-router';
import React from 'react';

// Cambio el nombre del componente para evitar conflicto
export default function PortfolioHomePage() {
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
    logout, // Añadir logout

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

  // Función para abrir proyecto (navegará a otra ruta)
  const handleOpenProject = (project: any) => {
    openProject(project);
    // Navegar a la pantalla del proyecto
    router.push({
      pathname: '/project/[id]',
      params: { id: project.id.toString() }
    });
  };

  return (
    <>
      {/* Pantalla principal */}
      {!user ? (
        <StartScreen onAuth={openAuthModal} />
      ) : (
        <HomeScreen
          user={user}
          projects={projects}
          onOpenProject={handleOpenProject}
          onCreateProject={openProjectConfigModal}
          onLogout={logout} // Pasar la función logout
        />
      )}

      {/* Modales */}
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