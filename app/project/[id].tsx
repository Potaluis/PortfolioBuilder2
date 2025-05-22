// app/project/[id].tsx
import { ProjectScreen } from '@/components/ProjectScreen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { usePortfolioApp } from '@/hooks/userPortfolioApp';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function ProjectDetail() {
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
    <ProjectScreen
      currentProject={project}
      onGoBack={handleGoBack}
    />
  );
}