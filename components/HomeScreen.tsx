// components/HomeScreen.tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { portfolioStyles } from '@/styles/styles';
import { Project, User } from '@/types';
import React from 'react';
import { ScrollView, StatusBar, TouchableOpacity } from 'react-native';

interface HomeScreenProps {
  user: User;
  projects: Project[];
  onOpenProject: (project: Project) => void;
  onCreateProject: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  projects,
  onOpenProject,
  onCreateProject,
}) => {
  return (
    <ThemedView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <ThemedView style={portfolioStyles.header}>
        <ThemedText style={portfolioStyles.headerTitle}>Mis Portfolios</ThemedText>
        <ThemedText style={portfolioStyles.headerSubtitle}>Hola, {user.username}</ThemedText>
      </ThemedView>

      {/* Grid de proyectos */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={portfolioStyles.gridContainer}>
        <ThemedView style={portfolioStyles.projectsGrid}>
          {projects.map((project) => (
            <TouchableOpacity
              key={project.id}
              style={[portfolioStyles.projectCard, { backgroundColor: 'white' }]}
              onPress={() => onOpenProject(project)}
            >
              <ThemedText style={portfolioStyles.projectCardTitle}>{project.name}</ThemedText>
              <ThemedText style={portfolioStyles.projectCardSubtitle}>Portfolio existente</ThemedText>
            </TouchableOpacity>
          ))}
          
          {/* Botón para crear nuevo proyecto */}
          <TouchableOpacity
            style={portfolioStyles.newProjectCard}
            onPress={onCreateProject}
          >
            <ThemedText style={portfolioStyles.newProjectIcon}>+</ThemedText>
            <ThemedText style={portfolioStyles.newProjectText}>Nuevo Portfolio</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};