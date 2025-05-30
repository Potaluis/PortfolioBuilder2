// app/project/[id].tsx - CORREGIDO PARA MODO DESARROLLO
import { ProjectScreen } from '@/components/ProjectScreen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Project } from '@/types';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';

// 🚨 PROYECTOS TEMPORALES PARA DESARROLLO (mismos que en DashboardScreen)
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

export default function ProjectDetail() {
  const { id } = useLocalSearchParams();
  
  console.log('📖 Abriendo proyecto con ID:', id);

  // Buscar el proyecto por ID en los datos temporales
  const project = TEMP_PROJECTS.find(p => p.id === id);

  const handleGoBack = () => {
    console.log('⬅️ Volviendo al dashboard');
    router.back();
  };

  if (!project) {
    console.log('❌ Proyecto no encontrado:', id);
    return (
      <ThemedView style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 20
      }}>
        <ThemedText style={{ fontSize: 64, marginBottom: 16 }}>🔍</ThemedText>
        
        <ThemedText style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#1f2937',
          textAlign: 'center',
          marginBottom: 12,
        }}>
          Proyecto no encontrado
        </ThemedText>
        
        <ThemedText style={{
          fontSize: 16,
          color: '#6b7280',
          textAlign: 'center',
          marginBottom: 24,
          lineHeight: 24,
        }}>
          El proyecto que buscas no existe o ha sido eliminado.
        </ThemedText>
        
        <ThemedText style={{
          fontSize: 12,
          color: '#9ca3af',
          textAlign: 'center',
          marginBottom: 24,
        }}>
          ID buscado: {id}
        </ThemedText>
        
        <ThemedText 
          style={{
            fontSize: 16,
            color: '#2563eb',
            textAlign: 'center',
            textDecorationLine: 'underline',
            fontWeight: '600',
          }}
          onPress={handleGoBack}
        >
          ← Volver al Dashboard
        </ThemedText>
      </ThemedView>
    );
  }

  console.log('✅ Proyecto encontrado:', project.name);

  return (
    <ProjectScreen
      currentProject={project}
      onGoBack={handleGoBack}
    />
  );
}