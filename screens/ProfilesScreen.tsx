// screens/ProfileScreen.tsx - SINTAXIS CORREGIDA
import { ProjectScreen as ProjectScreenComponent } from '@/components/ProjectScreen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { usePortfolioApp } from '@/hooks/usePortfolioApp';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';

export const ProfileScreen: React.FC = () => {
  const { id } = useLocalSearchParams();
  const { projects, currentProject } = usePortfolioApp();

  // Buscar el proyecto por ID
  const project = projects.find(p => p.id.toString() === id) || currentProject;

  const handleGoBack = () => {
    router.back();
  };

  if (!project) {
    return (
      <ThemedView style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#ffffff'
      }}>
        <ThemedText style={{
          fontSize: 18,
          color: '#1f2937',
          textAlign: 'center'
        }}>
          Proyecto no encontrado
        </ThemedText>
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