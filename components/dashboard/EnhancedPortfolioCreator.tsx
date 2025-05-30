// components/dashboard/EnhancedPortfolioCreator.tsx - Creador mejorado con drag & drop
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ProjectConfig, ProjectSection } from '@/types';
import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, ScrollView, Switch, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const { height: screenHeight } = Dimensions.get('window');

interface EnhancedPortfolioCreatorProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (config: ProjectConfig) => void;
}

const DEFAULT_SECTIONS: ProjectSection[] = [
  { name: 'Sobre mí', enabled: true, order: 0 },
  { name: 'Proyectos', enabled: true, order: 1 },
  { name: 'Servicios', enabled: false, order: 2 },
  { name: 'Blog', enabled: false, order: 3 },
  { name: 'Testimonios', enabled: false, order: 4 },
  { name: 'Contacto', enabled: true, order: 5 },
  { name: 'CV descargable', enabled: false, order: 6 }
];

const MENU_POSITIONS = [
  { key: 'top', label: 'Arriba', icon: '⬆️', description: 'Menú horizontal en la parte superior' },
  { key: 'left', label: 'Izquierda', icon: '⬅️', description: 'Sidebar fijo a la izquierda' },
  { key: 'right', label: 'Derecha', icon: '➡️', description: 'Sidebar fijo a la derecha' }
] as const;

const PROJECT_STYLES = [
  { 
    key: 'grid', 
    label: 'Cuadrícula de miniaturas', 
    icon: '🔲', 
    description: 'Vista clásica en cuadrícula con imágenes destacadas' 
  },
  { 
    key: 'list', 
    label: 'Lista con texto y preview', 
    icon: '📝', 
    description: 'Lista detallada con descripciones extensas' 
  },
  { 
    key: 'carousel', 
    label: 'Estilo carrusel', 
    icon: '🎠', 
    description: 'Navegación horizontal con transiciones suaves' 
  },
  { 
    key: 'masonry', 
    label: 'Mosaico dinámico (Pinterest)', 
    icon: '🧱', 
    description: 'Layout tipo Pinterest con alturas variables' 
  }
] as const;

// Componente para sección draggable
const DraggableSection = ({ 
  section, 
  index, 
  onToggle,
  onMove,
  isLast
}: {
  section: ProjectSection;
  index: number;
  onToggle: () => void;
  onMove: (fromIndex: number, toIndex: number) => void;
  isLast: boolean;
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = withSpring(1.05);
    },
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onEnd: () => {
      scale.value = withSpring(1);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      
      // Lógica de reordenamiento simplificada
      if (Math.abs(translateY.value) > 50) {
        const direction = translateY.value > 0 ? 1 : -1;
        const targetIndex = Math.max(0, Math.min(index + direction, 6));
        if (targetIndex !== index) {
          runOnJS(onMove)(index, targetIndex);
        }
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value }
    ],
    zIndex: scale.value > 1 ? 1000 : 1,
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[animatedStyle]}>
        <ThemedView style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          backgroundColor: section.enabled ? '#eff6ff' : '#f9fafb',
          borderRadius: 12,
          marginBottom: isLast ? 0 : 12,
          borderWidth: 1,
          borderColor: section.enabled ? '#2563eb' : '#e5e7eb',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
        }}>
          {/* Drag Handle */}
          <View style={{
            marginRight: 12,
            padding: 4,
          }}>
            <ThemedText style={{
              fontSize: 16,
              color: '#9ca3af',
            }}>
              ≡
            </ThemedText>
          </View>

          {/* Sección Info */}
          <View style={{ flex: 1 }}>
            <ThemedText style={{
              fontSize: 16,
              fontWeight: '600',
              color: section.enabled ? '#1e40af' : '#374151',
              marginBottom: 2,
            }}>
              {section.name}
            </ThemedText>
            <ThemedText style={{
              fontSize: 12,
              color: section.enabled ? '#3b82f6' : '#6b7280',
            }}>
              {section.enabled ? 'Incluida en tu portfolio' : 'Disponible para agregar'}
            </ThemedText>
          </View>

          {/* Toggle */}
          <Switch
            value={section.enabled}
            onValueChange={onToggle}
            trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
            thumbColor={section.enabled ? '#ffffff' : '#f3f4f6'}
          />
        </ThemedView>
      </Animated.View>
    </PanGestureHandler>
  );
};

export const EnhancedPortfolioCreator: React.FC<EnhancedPortfolioCreatorProps> = ({
  visible,
  onClose,
  onCreate,
}) => {
  const [step, setStep] = useState(1);
  const [sections, setSections] = useState<ProjectSection[]>(DEFAULT_SECTIONS);
  const [config, setConfig] = useState<ProjectConfig>({
    sections: DEFAULT_SECTIONS,
    menuPosition: 'top',
    projectStyle: 'grid',
    projectsPerRowDesktop: 3,
    projectsPerRowMobile: 2,
  });

  // Animaciones del modal
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(screenHeight * 0.1, {
        damping: 20,
        stiffness: 90,
      });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(screenHeight, { duration: 250 });
      // Reset al cerrar
      setStep(1);
      setSections(DEFAULT_SECTIONS);
      setConfig({
        sections: DEFAULT_SECTIONS,
        menuPosition: 'top',
        projectStyle: 'grid',
        projectsPerRowDesktop: 3,
        projectsPerRowMobile: 2,
      });
    }
  }, [visible]);

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleClose = () => {
    opacity.value = withTiming(0, { duration: 200 });
    translateY.value = withTiming(screenHeight, { duration: 250 }, () => {
      runOnJS(onClose)();
    });
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleToggleSection = (index: number) => {
    const newSections = [...sections];
    newSections[index].enabled = !newSections[index].enabled;
    setSections(newSections);
    setConfig(prev => ({ ...prev, sections: newSections }));
  };

  const handleMoveSection = (fromIndex: number, toIndex: number) => {
    const newSections = [...sections];
    const [movedSection] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, movedSection);
    
    // Actualizar orden
    newSections.forEach((section, index) => {
      section.order = index;
    });
    
    setSections(newSections);
    setConfig(prev => ({ ...prev, sections: newSections }));
  };

  const handleCreate = () => {
    onCreate(config);
    handleClose();
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Secciones de tu Portfolio';
      case 2: return 'Posición del Menú';
      case 3: return 'Estilo de Proyectos';
      case 4: return 'Configuración Final';
      default: return '';
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <ThemedText style={{
              fontSize: 16,
              color: '#6b7280',
              marginBottom: 24,
              textAlign: 'center',
              lineHeight: 22,
            }}>
              ¿Qué secciones te gustaría tener en tu portfolio?{'\n'}
              Arrastra para reordenar y activa/desactiva según necesites
            </ThemedText>

            <View style={{ marginBottom: 24 }}>
              {sections.map((section, index) => (
                <DraggableSection
                  key={`${section.name}-${index}`}
                  section={section}
                  index={index}
                  onToggle={() => handleToggleSection(index)}
                  onMove={handleMoveSection}
                  isLast={index === sections.length - 1}
                />
              ))}
            </View>

            <View style={{
              backgroundColor: '#f0f9ff',
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#0ea5e9',
            }}>
              <ThemedText style={{
                fontSize: 14,
                color: '#0369a1',
                fontWeight: '500',
                marginBottom: 4,
              }}>
                💡 Consejo
              </ThemedText>
              <ThemedText style={{
                fontSize: 13,
                color: '#0369a1',
                lineHeight: 18,
              }}>
                Puedes cambiar estas configuraciones después. Se recomienda empezar con "Sobre mí", "Proyectos" y "Contacto".
              </ThemedText>
            </View>
          </View>
        );

      case 2:
        return (
          <View>
            <ThemedText style={{
              fontSize: 16,
              color: '#6b7280',
              marginBottom: 24,
              textAlign: 'center',
            }}>
              ¿Dónde prefieres que esté el menú de navegación?
            </ThemedText>

            {MENU_POSITIONS.map((position) => (
              <TouchableOpacity
                key={position.key}
                onPress={() => setConfig(prev => ({ ...prev, menuPosition: position.key }))}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  backgroundColor: config.menuPosition === position.key ? '#eff6ff' : '#f9fafb',
                  borderRadius: 12,
                  marginBottom: 12,
                  borderWidth: 2,
                  borderColor: config.menuPosition === position.key ? '#2563eb' : '#e5e7eb',
                }}
              >
                <ThemedText style={{
                  fontSize: 24,
                  marginRight: 16,
                }}>
                  {position.icon}
                </ThemedText>
                
                <View style={{ flex: 1 }}>
                  <ThemedText style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: config.menuPosition === position.key ? '#1e40af' : '#374151',
                    marginBottom: 2,
                  }}>
                    {position.label}
                  </ThemedText>
                  <ThemedText style={{
                    fontSize: 13,
                    color: config.menuPosition === position.key ? '#3b82f6' : '#6b7280',
                  }}>
                    {position.description}
                  </ThemedText>
                </View>

                {config.menuPosition === position.key && (
                  <ThemedText style={{
                    fontSize: 20,
                    color: '#2563eb',
                  }}>
                    ✓
                  </ThemedText>
                )}
              </TouchableOpacity>
            ))}
          </View>
        );

      case 3:
        return (
          <View>
            <ThemedText style={{
              fontSize: 16,
              color: '#6b7280',
              marginBottom: 24,
              textAlign: 'center',
            }}>
              ¿Cómo prefieres mostrar tus proyectos?
            </ThemedText>

            {PROJECT_STYLES.map((style) => (
              <TouchableOpacity
                key={style.key}
                onPress={() => setConfig(prev => ({ ...prev, projectStyle: style.key }))}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  backgroundColor: config.projectStyle === style.key ? '#eff6ff' : '#f9fafb',
                  borderRadius: 12,
                  marginBottom: 12,
                  borderWidth: 2,
                  borderColor: config.projectStyle === style.key ? '#2563eb' : '#e5e7eb',
                }}
              >
                <ThemedText style={{
                  fontSize: 24,
                  marginRight: 16,
                }}>
                  {style.icon}
                </ThemedText>
                
                <View style={{ flex: 1 }}>
                  <ThemedText style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: config.projectStyle === style.key ? '#1e40af' : '#374151',
                    marginBottom: 2,
                  }}>
                    {style.label}
                  </ThemedText>
                  <ThemedText style={{
                    fontSize: 13,
                    color: config.projectStyle === style.key ? '#3b82f6' : '#6b7280',
                  }}>
                    {style.description}
                  </ThemedText>
                </View>

                {config.projectStyle === style.key && (
                  <ThemedText style={{
                    fontSize: 20,
                    color: '#2563eb',
                  }}>
                    ✓
                  </ThemedText>
                )}
              </TouchableOpacity>
            ))}
          </View>
        );

      case 4:
        return (
          <View>
            <ThemedText style={{
              fontSize: 16,
              color: '#6b7280',
              marginBottom: 24,
              textAlign: 'center',
            }}>
              Últimos ajustes para tu portfolio
            </ThemedText>

            {/* Proyectos por fila */}
            <View style={{
              backgroundColor: '#f9fafb',
              padding: 20,
              borderRadius: 12,
              marginBottom: 20,
            }}>
              <ThemedText style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#374151',
                marginBottom: 16,
              }}>
                Proyectos por fila
              </ThemedText>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}>
                <ThemedText style={{
                  fontSize: 14,
                  color: '#6b7280',
                }}>
                  En escritorio:
                </ThemedText>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  {[2, 3, 4].map((num) => (
                    <TouchableOpacity
                      key={num}
                      onPress={() => setConfig(prev => ({ ...prev, projectsPerRowDesktop: num }))}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        backgroundColor: config.projectsPerRowDesktop === num ? '#2563eb' : '#e5e7eb',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <ThemedText style={{
                        color: config.projectsPerRowDesktop === num ? 'white' : '#6b7280',
                        fontWeight: '600',
                      }}>
                        {num}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <ThemedText style={{
                  fontSize: 14,
                  color: '#6b7280',
                }}>
                  En móvil:
                </ThemedText>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  {[1, 2].map((num) => (
                    <TouchableOpacity
                      key={num}
                      onPress={() => setConfig(prev => ({ ...prev, projectsPerRowMobile: num }))}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        backgroundColor: config.projectsPerRowMobile === num ? '#2563eb' : '#e5e7eb',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <ThemedText style={{
                        color: config.projectsPerRowMobile === num ? 'white' : '#6b7280',
                        fontWeight: '600',
                      }}>
                        {num}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {/* Resumen */}
            <View style={{
              backgroundColor: '#ecfdf5',
              padding: 20,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#10b981',
            }}>
              <ThemedText style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#065f46',
                marginBottom: 12,
              }}>
                🎉 ¡Tu portfolio está listo!
              </ThemedText>
              <ThemedText style={{
                fontSize: 14,
                color: '#065f46',
                lineHeight: 20,
              }}>
                {sections.filter(s => s.enabled).length} secciones activadas • Menú {MENU_POSITIONS.find(p => p.key === config.menuPosition)?.label.toLowerCase()} • Estilo {PROJECT_STYLES.find(s => s.key === config.projectStyle)?.label.toLowerCase()}
              </ThemedText>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      <Animated.View style={[{ flex: 1 }, backgroundStyle]}>
        <BlurView intensity={15} tint="dark" style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={handleClose}
            activeOpacity={1}
          />

          <Animated.View style={[modalStyle, { 
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: screenHeight * 0.9,
            backgroundColor: 'transparent'
          }]}>
            <ThemedView style={{
              flex: 1,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingTop: 20,
            }}>
              {/* Header */}
              <View style={{
                paddingHorizontal: 24,
                paddingBottom: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#f3f4f6',
              }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}>
                  <ThemedText style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#1f2937',
                  }}>
                    Crear Portfolio
                  </ThemedText>
                  
                  <TouchableOpacity onPress={handleClose}>
                    <ThemedText style={{
                      fontSize: 24,
                      color: '#6b7280',
                    }}>
                      ✕
                    </ThemedText>
                  </TouchableOpacity>
                </View>

                {/* Progress */}
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}>
                  <ThemedText style={{
                    fontSize: 14,
                    color: '#6b7280',
                    marginRight: 12,
                  }}>
                    Paso {step} de 4
                  </ThemedText>
                  
                  <View style={{
                    flex: 1,
                    height: 4,
                    backgroundColor: '#e5e7eb',
                    borderRadius: 2,
                  }}>
                    <View style={{
                      width: `${(step / 4) * 100}%`,
                      height: '100%',
                      backgroundColor: '#2563eb',
                      borderRadius: 2,
                    }} />
                  </View>
                </View>

                <ThemedText style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#1f2937',
                }}>
                  {getStepTitle()}
                </ThemedText>
              </View>

              {/* Contenido */}
              <ScrollView style={{
                flex: 1,
                paddingHorizontal: 24,
                paddingTop: 24,
              }}>
                {renderStepContent()}
              </ScrollView>

              {/* Footer */}
              <View style={{
                paddingHorizontal: 24,
                paddingTop: 20,
                paddingBottom: 24,
                borderTopWidth: 1,
                borderTopColor: '#f3f4f6',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 12,
              }}>
                <TouchableOpacity
                  onPress={step === 1 ? handleClose : handleBack}
                  style={{
                    flex: 1,
                    paddingVertical: 14,
                    borderRadius: 12,
                    backgroundColor: '#f3f4f6',
                    alignItems: 'center',
                  }}
                >
                  <ThemedText style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#374151',
                  }}>
                    {step === 1 ? 'Cancelar' : 'Atrás'}
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={step === 4 ? handleCreate : handleNext}
                  style={{
                    flex: 1,
                    paddingVertical: 14,
                    borderRadius: 12,
                    backgroundColor: '#2563eb',
                    alignItems: 'center',
                  }}
                >
                  <ThemedText style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: 'white',
                  }}>
                    {step === 4 ? 'Crear Portfolio' : 'Siguiente'}
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>
          </Animated.View>
        </BlurView>
      </Animated.View>
    </Modal>
  );
};