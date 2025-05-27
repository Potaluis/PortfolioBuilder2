// app/index.tsx - Página principal actualizada
import { HomeScreen } from '@/components/HomeScreen';
import { usePortfolioApp } from '@/hooks/userPortfolioApp';
import { LandingScreen } from '@/screens/LandingScreen';
import { router } from 'expo-router';
import React from 'react';

export default function Index() {
  const { user, projects, openProject, openProjectConfigModal, logout } = usePortfolioApp();

  // Si el usuario está logueado, mostrar su dashboard
  if (user) {
    const handleOpenProject = (project: any) => {
      openProject(project);
      router.push({
        pathname: '/project/[id]',
        params: { id: project.id.toString() }
      });
    };

    return (
      <HomeScreen
        user={user}
        projects={projects}
        onOpenProject={handleOpenProject}
        onCreateProject={openProjectConfigModal}
        onLogout={logout}
      />
    );
  }

  // Si no está logueado, mostrar la landing page
  return <LandingScreen />;
}