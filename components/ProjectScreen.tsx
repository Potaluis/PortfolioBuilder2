// components/ProjectScreen.tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { portfolioStyles } from '@/styles/styles';
import { Project } from '@/types';
import React from 'react';
import { ScrollView, StatusBar, TouchableOpacity } from 'react-native';

interface ProjectScreenProps {
  currentProject: Project;
  onGoBack: () => void;
}

export const ProjectScreen: React.FC<ProjectScreenProps> = ({
  currentProject,
  onGoBack,
}) => {
  const getProjectStyleLabel = (style: string) => {
    switch (style) {
      case 'grid': return 'Cuadrícula de miniaturas';
      case 'list': return 'Lista con texto y preview';
      case 'carousel': return 'Estilo carrusel';
      case 'masonry': return 'Mosaico dinámico (Pinterest)';
      default: return style;
    }
  };

  const getMenuPositionLabel = (position: string) => {
    switch (position) {
      case 'top': return 'Arriba';
      case 'left': return 'Izquierda';
      case 'right': return 'Derecha';
      default: return position;
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <ThemedView style={portfolioStyles.projectHeader}>
        <TouchableOpacity onPress={onGoBack}>
          <ThemedText style={portfolioStyles.backButton}>← Volver</ThemedText>
        </TouchableOpacity>
        <ThemedText style={portfolioStyles.projectHeaderTitle}>{currentProject.name}</ThemedText>
        <ThemedView style={{ width: 60 }} />
      </ThemedView>

      {/* Contenido del proyecto */}
      <ScrollView style={portfolioStyles.projectScrollView}>
        <ThemedView style={portfolioStyles.projectContent}>
          <ThemedText style={portfolioStyles.projectContentTitle}>
            Configuración del Portfolio
          </ThemedText>
          
          {/* Secciones habilitadas */}
          <ThemedView style={portfolioStyles.configDisplaySection}>
            <ThemedText style={portfolioStyles.configDisplayTitle}>Secciones incluidas:</ThemedText>
            {currentProject.config.sections
              .filter(section => section.enabled)
              .map((section, index) => (
                <ThemedText key={index} style={portfolioStyles.configDisplayItem}>
                  • {section.name}
                </ThemedText>
              ))}
          </ThemedView>

          {/* Posición del menú */}
          <ThemedView style={portfolioStyles.configDisplaySection}>
            <ThemedText style={portfolioStyles.configDisplayTitle}>Posición del menú:</ThemedText>
            <ThemedText style={portfolioStyles.configDisplayItem}>
              {getMenuPositionLabel(currentProject.config.menuPosition)}
            </ThemedText>
          </ThemedView>

          {/* Estilo de proyectos */}
          <ThemedView style={portfolioStyles.configDisplaySection}>
            <ThemedText style={portfolioStyles.configDisplayTitle}>Estilo de presentación:</ThemedText>
            <ThemedText style={portfolioStyles.configDisplayItem}>
              {getProjectStyleLabel(currentProject.config.projectStyle)}
            </ThemedText>
          </ThemedView>

          {/* Proyectos por fila */}
          <ThemedView style={portfolioStyles.configDisplaySection}>
            <ThemedText style={portfolioStyles.configDisplayTitle}>Distribución de proyectos:</ThemedText>
            <ThemedText style={portfolioStyles.configDisplayItem}>
              Escritorio: {currentProject.config.projectsPerRowDesktop} por fila
            </ThemedText>
            <ThemedText style={portfolioStyles.configDisplayItem}>
              Móvil: {currentProject.config.projectsPerRowMobile} por fila
            </ThemedText>
          </ThemedView>

          <ThemedView style={portfolioStyles.placeholderContainer}>
            <ThemedText style={portfolioStyles.placeholderText}>
              🚧 En desarrollo - Esta pantalla mostrará el editor completo del portfolio
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};