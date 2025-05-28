// screens/ProjectScreen.tsx
import { ProjectScreen as ProjectScreenComponent } from '@/components/ProjectScreen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { usePortfolioApp } from '@/hooks/usePortfolioApp';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';

export const ProjectScreen: React.FC = () => {
  const { id } = useLocalSearchParams();
  const { projects, currentProject } = usePortfolioApp();

  // Buscar el proyecto por ID
  const project = projects.find(p => p.id.toString() === id) || currentProject;

  const handleGoBack = () => {
    router.back();
  };

  if (!project) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Proyecto no encontrado</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ProjectScreenComponent
      currentProject={project}
      onGoBack={handleGoBack}
    />
  );
};