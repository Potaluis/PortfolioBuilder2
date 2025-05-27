// components/dashboard/ProjectList.tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { portfolioStyles } from '@/styles/styles';
import { Project } from '@/types';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { CreateProjectButton } from './CreateProjectButton';
import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
  onProjectPress: (project: Project) => void;
  onCreateProject: () => void;
  onEditProject?: (project: Project) => void;
  onDeleteProject?: (project: Project) => void;
  onDuplicateProject?: (project: Project) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onProjectPress,
  onCreateProject,
  onEditProject,
  onDeleteProject,
  onDuplicateProject,
}) => {
  const maxProjects = 5; // Límite de proyectos por usuario
  const canCreateMore = projects.length < maxProjects;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={portfolioStyles.gridContainer}>
      {/* Estadísticas */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        padding: 16,
        backgroundColor: '#eff6ff',
        borderRadius: 12,
      }}>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <ThemedText style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#2563eb',
          }}>
            {projects.length}
          </ThemedText>
          <ThemedText style={{
            fontSize: 12,
            color: '#6b7280',
          }}>
            Portfolios
          </ThemedText>
        </View>
        
        <View style={{ alignItems: 'center', flex: 1 }}>
          <ThemedText style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#10b981',
          }}>
            {projects.filter(p => p.settings.published).length}
          </ThemedText>
          <ThemedText style={{
            fontSize: 12,
            color: '#6b7280',
          }}>
            Publicados
          </ThemedText>
        </View>
        
        <View style={{ alignItems: 'center', flex: 1 }}>
          <ThemedText style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#f59e0b',
          }}>
            {projects.filter(p => !p.settings.published).length}
          </ThemedText>
          <ThemedText style={{
            fontSize: 12,
            color: '#6b7280',
          }}>
            Borradores
          </ThemedText>
        </View>
      </View>

      {/* Grid de proyectos */}
      <ThemedView style={portfolioStyles.projectsGrid}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onPress={() => onProjectPress(project)}
            onEdit={onEditProject ? () => onEditProject(project) : undefined}
            onDelete={onDeleteProject ? () => onDeleteProject(project) : undefined}
            onDuplicate={onDuplicateProject ? () => onDuplicateProject(project) : undefined}
          />
        ))}
        
        {/* Botón para crear nuevo proyecto */}
        {canCreateMore ? (
          <CreateProjectButton onPress={onCreateProject} />
        ) : (
          <View style={[portfolioStyles.newProjectCard, { 
            backgroundColor: '#e5e7eb',
            opacity: 0.7 
          }]}>
            <ThemedText style={[portfolioStyles.newProjectIcon, { color: '#6b7280' }]}>
              🔒
            </ThemedText>
            <ThemedText style={[portfolioStyles.newProjectText, { color: '#6b7280' }]}>
              Límite alcanzado
            </ThemedText>
            <ThemedText style={{ 
              color: '#6b7280', 
              fontSize: 10, 
              marginTop: 4,
              textAlign: 'center' 
            }}>
              Máximo {maxProjects} portfolios
            </ThemedText>
          </View>
        )}
      </ThemedView>

      {/* Tip o sugerencia */}
      {projects.length > 0 && (
        <View style={{
          marginTop: 32,
          padding: 16,
          backgroundColor: '#fef3c7',
          borderRadius: 12,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <ThemedText style={{ fontSize: 24, marginRight: 12 }}>💡</ThemedText>
          <View style={{ flex: 1 }}>
            <ThemedText style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#92400e',
              marginBottom: 4,
            }}>
              Consejo
            </ThemedText>
            <ThemedText style={{
              fontSize: 12,
              color: '#92400e',
              lineHeight: 18,
            }}>
              Mantén tus portfolios actualizados para mejorar tu visibilidad. 
              Los portfolios publicados aparecen en la sección de perfiles públicos.
            </ThemedText>
          </View>
        </View>
      )}
    </ScrollView>
  );
};