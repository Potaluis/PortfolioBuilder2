// app/index.tsx - NUEVA pantalla principal (sin tabs)
import { AuthModal } from '@/components/AuthModal';
import { HomeScreen } from '@/components/HomeScreen';
import { ProjectConfigModal } from '@/components/ProjectConfigModal';
import { StartScreen } from '@/components/StartScreen';
import { usePortfolioApp } from '@/hooks/userPortfolioApp';
import { router } from 'expo-router';
import React from 'react';

export default function PortfolioApp() {
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

  // Función para abrir proyecto individual
  const handleOpenProject = (project: any) => {
    openProject(project);
    router.push({
      pathname: '/project/[id]',
      params: { id: project.id.toString() }
    });
  };

  return (
    <>
      {/* Pantalla principal - StartScreen o HomeScreen */}
      {!user ? (
        <StartScreen onAuth={openAuthModal} />
      ) : (
        <HomeScreen
          user={user}
          projects={projects}
          onOpenProject={handleOpenProject}
          onCreateProject={openProjectConfigModal}
        />
      )}

      {/* Modal de autenticación mejorado */}
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

      {/* Modal de configuración mejorado */}
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