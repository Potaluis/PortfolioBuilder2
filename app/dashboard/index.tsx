// app/dashboard/index.tsx
import { HomeScreen } from '@/components/HomeScreen';
import { usePortfolioApp } from '@/hooks/userPortfolioApp';
import { router } from 'expo-router';
import React from 'react';

export default function DashboardPage() {
  const { 
    user, 
    projects, 
    openProject, 
    openProjectConfigModal, 
    logout 
  } = usePortfolioApp();

  // Si no hay usuario, redirigir al inicio
  if (!user) {
    router.replace('/');
    return null;
  }

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