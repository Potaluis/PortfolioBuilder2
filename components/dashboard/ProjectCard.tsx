// components/dashboard/ProjectCard.tsx
import { ThemedText } from '@/components/ThemedText';
import { portfolioStyles } from '@/styles/styles';
import { Project } from '@/types';
import React from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';

interface ProjectCardProps {
  project: Project;
  onPress: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onPress,
  onEdit,
  onDelete,
  onDuplicate,
}) => {
  const handleLongPress = () => {
    const options = [
      { text: 'Abrir', onPress: onPress },
      onEdit && { text: 'Editar', onPress: onEdit },
      onDuplicate && { text: 'Duplicar', onPress: onDuplicate },
      onDelete && { text: 'Eliminar', onPress: handleDelete, style: 'destructive' as const },
      { text: 'Cancelar', style: 'cancel' as const }
    ].filter(Boolean);

    Alert.alert(
      project.name,
      '¿Qué deseas hacer con este portfolio?',
      options
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar Portfolio',
      `¿Estás seguro de que deseas eliminar "${project.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: onDelete },
      ]
    );
  };

  const getLastUpdated = () => {
    const date = new Date(project.updatedAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    return date.toLocaleDateString();
  };

  return (
    <TouchableOpacity
      style={[portfolioStyles.projectCard, { backgroundColor: 'white' }]}
      onPress={onPress}
      onLongPress={handleLongPress}
      activeOpacity={0.8}
    >
      {/* Estado de publicación */}
      <View style={{
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: project.settings.published ? '#10b981' : '#f59e0b',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
      }}>
        <ThemedText style={{
          fontSize: 10,
          color: 'white',
          fontWeight: '600',
        }}>
          {project.settings.published ? 'PUBLICADO' : 'BORRADOR'}
        </ThemedText>
      </View>

      {/* Icono del proyecto */}
      <View style={{
        width: 48,
        height: 48,
        backgroundColor: '#eff6ff',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
      }}>
        <ThemedText style={{
          fontSize: 24,
          color: '#2563eb',
        }}>
          📁
        </ThemedText>
      </View>

      {/* Información del proyecto */}
      <ThemedText style={portfolioStyles.projectCardTitle}>
        {project.name}
      </ThemedText>
      
      <ThemedText style={[portfolioStyles.projectCardSubtitle, { marginTop: 4 }]}>
        Actualizado {getLastUpdated()}
      </ThemedText>

      {/* Estadísticas */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
      }}>
        <View style={{ alignItems: 'center' }}>
          <ThemedText style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: '#1f2937',
          }}>
            {project.config.sections.filter(s => s.enabled).length}
          </ThemedText>
          <ThemedText style={{
            fontSize: 10,
            color: '#6b7280',
          }}>
            Secciones
          </ThemedText>
        </View>

        <View style={{ alignItems: 'center' }}>
          <ThemedText style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: '#1f2937',
          }}>
            {project.content.projects.length}
          </ThemedText>
          <ThemedText style={{
            fontSize: 10,
            color: '#6b7280',
          }}>
            Proyectos
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};