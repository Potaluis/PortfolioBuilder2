// app/project/[id].tsx - CORREGIDO
import { ProjectScreen } from '@/components/ProjectScreen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { usePortfolioApp } from '@/hooks/usePortfolioApp';
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
      <ThemedView style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 20
      }}>
        <ThemedText style={{
          fontSize: 18,
          color: '#1f2937',
          textAlign: 'center',
          marginBottom: 20
        }}>
          Proyecto no encontrado
        </ThemedText>
        
        <ThemedText 
          style={{
            fontSize: 16,
            color: '#2563eb',
            textAlign: 'center',
            textDecorationLine: 'underline'
          }}
          onPress={handleGoBack}
        >
          ← Volver al Dashboard
        </ThemedText>
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