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
  onLogout?: () => void; // Añadir prop para logout
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  projects,
  onOpenProject,
  onCreateProject,
  onLogout,
}) => {
  return (
    <ThemedView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <ThemedView style={portfolioStyles.header}>
        <ThemedView>
          <ThemedText style={portfolioStyles.headerTitle}>Mis Portfolios</ThemedText>
          <ThemedText style={portfolioStyles.headerSubtitle}>Hola, {user.username}</ThemedText>
        </ThemedView>
        
        {/* Botón de logout */}
        {onLogout && (
          <TouchableOpacity 
            onPress={onLogout}
            style={{
              backgroundColor: '#ef4444',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
            }}
          >
            <ThemedText style={{ color: 'white', fontWeight: '600' }}>
              Cerrar sesión
            </ThemedText>
          </TouchableOpacity>
        )}
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