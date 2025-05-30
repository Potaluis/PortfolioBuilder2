// components/dashboard/PortfoliosSection.tsx - Sección de portfolios mejorada
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Project } from '@/types';
import React from 'react';
import { Alert, Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface PortfoliosSectionProps {
  projects: Project[];
  onCreateProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
  onOpenProject: (project: Project) => void;
  onDuplicateProject: (project: Project) => void;
}

const FREE_PORTFOLIO_LIMIT = 3;

export const PortfoliosSection: React.FC<PortfoliosSectionProps> = ({
  projects,
  onCreateProject,
  onEditProject,
  onDeleteProject,
  onOpenProject,
  onDuplicateProject,
}) => {
  const canCreateMore = projects.length < FREE_PORTFOLIO_LIMIT;
  const publishedCount = projects.filter(p => p.settings.published).length;
  const draftCount = projects.filter(p => !p.settings.published).length;

  const handlePortfolioAction = (project: Project) => {
    const options = [
      { text: 'Abrir Editor', onPress: () => onOpenProject(project) },
      { text: 'Editar Configuración', onPress: () => onEditProject(project) },
      { text: 'Duplicar', onPress: () => onDuplicateProject(project) },
      { text: 'Eliminar', onPress: () => handleDelete(project), style: 'destructive' as const },
      { text: 'Cancelar', style: 'cancel' as const }
    ];

    Alert.alert(
      project.name,
      `Estado: ${project.settings.published ? 'Publicado' : 'Borrador'}`,
      options
    );
  };

  const handleDelete = (project: Project) => {
    Alert.alert(
      'Eliminar Portfolio',
      `¿Estás seguro de que deseas eliminar "${project.name}"? Esta acción no se puede deshacer.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => onDeleteProject(project) },
      ]
    );
  };

  const handleUpgrade = () => {
    Alert.alert(
      'Actualizar a Premium',
      'Con el plan Premium podrás crear portfolios ilimitados, usar plantillas exclusivas y tener soporte prioritario.',
      [
        { text: 'Ahora no', style: 'cancel' },
        { text: 'Ver Planes', onPress: () => console.log('Abrir planes') },
      ]
    );
  };

  const getCardWidth = () => {
    if (width > 1200) return (width - 320 - 60) / 3; // 3 columnas en pantallas grandes
    if (width > 768) return (width - 320 - 40) / 2; // 2 columnas en tablet
    return width - 320 - 40; // 1 columna en móvil
  };

  return (
    <ThemedView style={{ flex: 1, padding: 24 }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
      }}>
        <View>
          <ThemedText style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: 4,
          }}>
            Mis Portfolios
          </ThemedText>
          <ThemedText style={{
            fontSize: 16,
            color: '#6b7280',
          }}>
            Gestiona y organiza tus portfolios profesionales
          </ThemedText>
        </View>

        <TouchableOpacity
          onPress={canCreateMore ? onCreateProject : handleUpgrade}
          style={{
            backgroundColor: canCreateMore ? '#2563eb' : '#f59e0b',
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
          }}
        >
          <ThemedText style={{
            fontSize: 18,
            marginRight: 8,
          }}>
            {canCreateMore ? '➕' : '⭐'}
          </ThemedText>
          <ThemedText style={{
            color: 'white',
            fontWeight: '600',
            fontSize: 16,
          }}>
            {canCreateMore ? 'Nuevo Portfolio' : 'Actualizar a Premium'}
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Estadísticas Rápidas */}
      <View style={{
        flexDirection: 'row',
        gap: 16,
        marginBottom: 32,
      }}>
        <View style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}>
            <ThemedText style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: '#2563eb',
            }}>
              {projects.length}
            </ThemedText>
            <ThemedText style={{ fontSize: 24 }}>📁</ThemedText>
          </View>
          <ThemedText style={{
            fontSize: 14,
            color: '#6b7280',
            fontWeight: '500',
          }}>
            Total Portfolios
          </ThemedText>
          <ThemedText style={{
            fontSize: 12,
            color: '#9ca3af',
            marginTop: 4,
          }}>
            {FREE_PORTFOLIO_LIMIT - projects.length} restantes gratis
          </ThemedText>
        </View>

        <View style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}>
            <ThemedText style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: '#10b981',
            }}>
              {publishedCount}
            </ThemedText>
            <ThemedText style={{ fontSize: 24 }}>🌐</ThemedText>
          </View>
          <ThemedText style={{
            fontSize: 14,
            color: '#6b7280',
            fontWeight: '500',
          }}>
            Publicados
          </ThemedText>
          <ThemedText style={{
            fontSize: 12,
            color: '#9ca3af',
            marginTop: 4,
          }}>
            Visibles al público
          </ThemedText>
        </View>

        <View style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}>
            <ThemedText style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: '#f59e0b',
            }}>
              {draftCount}
            </ThemedText>
            <ThemedText style={{ fontSize: 24 }}>✏️</ThemedText>
          </View>
          <ThemedText style={{
            fontSize: 14,
            color: '#6b7280',
            fontWeight: '500',
          }}>
            Borradores
          </ThemedText>
          <ThemedText style={{
            fontSize: 12,
            color: '#9ca3af',
            marginTop: 4,
          }}>
            En desarrollo
          </ThemedText>
        </View>
      </View>

      {/* Grid de Portfolios */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {projects.length === 0 ? (
          // Estado vacío
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 80,
          }}>
            <ThemedText style={{ fontSize: 64, marginBottom: 16 }}>📁</ThemedText>
            <ThemedText style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: 8,
            }}>
              ¡Crea tu primer portfolio!
            </ThemedText>
            <ThemedText style={{
              fontSize: 16,
              color: '#6b7280',
              textAlign: 'center',
              marginBottom: 24,
              maxWidth: 400,
            }}>
              Comienza a mostrar tu trabajo al mundo con un portfolio profesional
            </ThemedText>
            <TouchableOpacity
              onPress={onCreateProject}
              style={{
                backgroundColor: '#2563eb',
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 12,
              }}
            >
              <ThemedText style={{
                color: 'white',
                fontWeight: '600',
                fontSize: 16,
              }}>
                Crear Portfolio
              </ThemedText>
            </TouchableOpacity>
          </View>
        ) : (
          // Grid de portfolios
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 20,
          }}>
            {projects.map((project) => (
              <TouchableOpacity
                key={project.id}
                onPress={() => handlePortfolioAction(project)}
                style={{
                  width: getCardWidth(),
                  backgroundColor: 'white',
                  borderRadius: 16,
                  padding: 20,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.08,
                  shadowRadius: 12,
                  elevation: 6,
                  borderWidth: 1,
                  borderColor: '#f3f4f6',
                }}
              >
                {/* Miniatura/Preview */}
                <View style={{
                  height: 120,
                  backgroundColor: '#f8fafc',
                  borderRadius: 12,
                  marginBottom: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: '#e5e7eb',
                  borderStyle: 'dashed',
                }}>
                  <ThemedText style={{ fontSize: 32, marginBottom: 8 }}>🖼️</ThemedText>
                  <ThemedText style={{
                    fontSize: 12,
                    color: '#9ca3af',
                    textAlign: 'center',
                  }}>
                    Vista previa disponible cuando publiques
                  </ThemedText>
                </View>

                {/* Estado */}
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

                {/* Info */}
                <ThemedText style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: 4,
                }} numberOfLines={1}>
                  {project.name}
                </ThemedText>

                <ThemedText style={{
                  fontSize: 14,
                  color: '#6b7280',
                  marginBottom: 16,
                }}>
                  Creado el {new Date(project.createdAt).toLocaleDateString()}
                </ThemedText>

                {/* Estadísticas */}
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  paddingTop: 12,
                  borderTopWidth: 1,
                  borderTopColor: '#f3f4f6',
                }}>
                  <View style={{ alignItems: 'center' }}>
                    <ThemedText style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#1f2937',
                    }}>
                      {project.config.sections.filter(s => s.enabled).length}
                    </ThemedText>
                    <ThemedText style={{
                      fontSize: 11,
                      color: '#6b7280',
                    }}>
                      Secciones
                    </ThemedText>
                  </View>

                  <View style={{ alignItems: 'center' }}>
                    <ThemedText style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#1f2937',
                    }}>
                      {project.content.projects.length}
                    </ThemedText>
                    <ThemedText style={{
                      fontSize: 11,
                      color: '#6b7280',
                    }}>
                      Proyectos
                    </ThemedText>
                  </View>

                  <View style={{ alignItems: 'center' }}>
                    <ThemedText style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#1f2937',
                    }}>
                      1.2K
                    </ThemedText>
                    <ThemedText style={{
                      fontSize: 11,
                      color: '#6b7280',
                    }}>
                      Visitas
                    </ThemedText>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Banner de limitación */}
      {!canCreateMore && (
        <View style={{
          backgroundColor: '#fef3c7',
          padding: 16,
          borderRadius: 12,
          marginTop: 20,
          borderWidth: 1,
          borderColor: '#f59e0b',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <View style={{ flex: 1 }}>
              <ThemedText style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#92400e',
                marginBottom: 4,
              }}>
                ¡Has alcanzado el límite gratuito!
              </ThemedText>
              <ThemedText style={{
                fontSize: 14,
                color: '#92400e',
                lineHeight: 20,
              }}>
                Actualiza a Premium para crear portfolios ilimitados, usar plantillas exclusivas y obtener análisis avanzados.
              </ThemedText>
            </View>
            
            <TouchableOpacity
              onPress={handleUpgrade}
              style={{
                backgroundColor: '#f59e0b',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                marginLeft: 16,
              }}
            >
              <ThemedText style={{
                color: 'white',
                fontWeight: '600',
                fontSize: 14,
              }}>
                Actualizar
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ThemedView>
  );
};