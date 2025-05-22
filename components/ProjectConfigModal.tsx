// components/ProjectConfigModal.tsx - MEJORADO con Drag & Drop
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { portfolioStyles } from '@/styles/styles';
import { ProjectConfig, ProjectSection } from '@/types';
import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, PanGestureHandler, ScrollView, Switch, TouchableOpacity } from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

interface ProjectConfigModalProps {
  visible: boolean;
  projectConfig: ProjectConfig;
  onClose: () => void;
  onCreate: () => void;
  onToggleSection: (index: number) => void;
  onUpdateConfig: (field: keyof ProjectConfig, value: any) => void;
}

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

// Componente para una sección draggable
const DraggableSection = ({ 
  section, 
  index, 
  onToggle, 
  onMove,
  isDragging,
  setIsDragging 
}: {
  section: ProjectSection;
  index: number;
  onToggle: () => void;
  onMove: (fromIndex: number, toIndex: number) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
}) => {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = withSpring(1.05);
      runOnJS(setIsDragging)(true);
    },
    onActive: (event) => {
      translateY.value = event.translationY;
    },
    onEnd: () => {
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
      runOnJS(setIsDragging)(false);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value }
    ],
    zIndex: isDragging ? 1000 : 1,
    elevation: isDragging ? 10 : 1,
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[animatedStyle]}>
        <ThemedView style={[
          portfolioStyles.sectionRow,
          { 
            backgroundColor: isDragging ? '#f0f9ff' : 'transparent',
            marginVertical: 2,
            paddingHorizontal: 12,
            borderRadius: 8,
          }
        ]}>
          {/* Icono de drag */}
          <ThemedText style={{ marginRight: 12, fontSize: 16, opacity: 0.5 }}>
            ≡
          </ThemedText>
          
          {/* Nombre de la sección */}
          <ThemedText style={[portfolioStyles.sectionName, { flex: 1 }]}>
            {section.name}
          </ThemedText>
          
          {/* Switch para habilitar/deshabilitar */}
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

export const ProjectConfigModal: React.FC<ProjectConfigModalProps> = ({
  visible,
  projectConfig,
  onClose,
  onCreate,
  onToggleSection,
  onUpdateConfig,
}) => {
  // Estados locales para drag & drop
  const [sections, setSections] = useState(projectConfig.sections);
  const [isDragging, setIsDragging] = useState(false);

  // Sincronizar con props cuando cambie
  useEffect(() => {
    setSections(projectConfig.sections);
  }, [projectConfig.sections]);

  // Animaciones del modal
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(screenHeight * 0.15, {
        damping: 20,
        stiffness: 90,
      });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(screenHeight, { duration: 250 });
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

  // Función para mover secciones
  const moveSection = (fromIndex: number, toIndex: number) => {
    const newSections = [...sections];
    const [movedSection] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, movedSection);
    
    // Actualizar orden
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index
    }));
    
    setSections(updatedSections);
    onUpdateConfig('sections', updatedSections);
  };

  const handleToggleSection = (index: number) => {
    const newSections = [...sections];
    newSections[index].enabled = !newSections[index].enabled;
    setSections(newSections);
    onUpdateConfig('sections', newSections);
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      <Animated.View style={[{ flex: 1 }, backgroundStyle]}>
        <BlurView intensity={15} tint="dark" style={{ flex: 1 }}>
          {/* Overlay para cerrar */}
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={handleClose}
            activeOpacity={1}
          />

          {/* Modal container - MÁS PEQUEÑO */}
          <Animated.View style={[modalStyle, { 
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: screenHeight * 0.85, // 85% de la pantalla
            backgroundColor: 'transparent'
          }]}>
            <ThemedView style={[{
              flex: 1,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingTop: 20,
            }]}>
              {/* Header */}
              <ThemedView style={portfolioStyles.configHeader}>
                <ThemedText style={portfolioStyles.configTitle}>
                  Configurar Portfolio
                </ThemedText>
              </ThemedView>
              
              <ScrollView style={portfolioStyles.configScrollView}>
                {/* Secciones con Drag & Drop */}
                <ThemedView style={portfolioStyles.configSection}>
                  <ThemedText style={portfolioStyles.configSectionTitle}>
                    ¿Qué secciones quieres? (arrastra para reordenar)
                  </ThemedText>
                  
                  {sections.map((section, index) => (
                    <DraggableSection
                      key={`${section.name}-${index}`}
                      section={section}
                      index={index}
                      onToggle={() => handleToggleSection(index)}
                      onMove={moveSection}
                      isDragging={isDragging}
                      setIsDragging={setIsDragging}
                    />
                  ))}
                </ThemedView>

                {/* Posición del menú */}
                <ThemedView style={portfolioStyles.configSection}>
                  <ThemedText style={portfolioStyles.configSectionTitle}>
                    ¿Dónde prefieres el menú?
                  </ThemedText>
                  {[
                    { key: 'top', label: 'Arriba' },
                    { key: 'left', label: 'Izquierda' },
                    { key: 'right', label: 'Derecha' }
                  ].map((position) => (
                    <TouchableOpacity
                      key={position.key}
                      style={[
                        portfolioStyles.optionButton,
                        projectConfig.menuPosition === position.key && portfolioStyles.optionButtonActive
                      ]}
                      onPress={() => onUpdateConfig('menuPosition', position.key)}
                    >
                      <ThemedText style={[
                        portfolioStyles.optionButtonText,
                        projectConfig.menuPosition === position.key && portfolioStyles.optionButtonTextActive
                      ]}>
                        {position.label}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </ThemedView>

                {/* Estilo de proyectos */}
                <ThemedView style={portfolioStyles.configSection}>
                  <ThemedText style={portfolioStyles.configSectionTitle}>
                    ¿Cómo mostrar tus proyectos?
                  </ThemedText>
                  {[
                    { key: 'grid', label: 'Cuadrícula de miniaturas' },
                    { key: 'list', label: 'Lista con texto y preview' },
                    { key: 'carousel', label: 'Estilo carrusel' },
                    { key: 'masonry', label: 'Mosaico dinámico (Pinterest)' }
                  ].map((style) => (
                    <TouchableOpacity
                      key={style.key}
                      style={[
                        portfolioStyles.optionButton,
                        projectConfig.projectStyle === style.key && portfolioStyles.optionButtonActive
                      ]}
                      onPress={() => onUpdateConfig('projectStyle', style.key)}
                    >
                      <ThemedText style={[
                        portfolioStyles.optionButtonText,
                        projectConfig.projectStyle === style.key && portfolioStyles.optionButtonTextActive
                      ]}>
                        {style.label}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </ThemedView>

                {/* Proyectos por fila */}
                <ThemedView style={portfolioStyles.configSection}>
                  <ThemedText style={portfolioStyles.configSectionTitle}>Proyectos por fila</ThemedText>
                  
                  <ThemedView style={portfolioStyles.rowConfigContainer}>
                    <ThemedText style={portfolioStyles.rowConfigLabel}>Escritorio:</ThemedText>
                    <ThemedView style={portfolioStyles.numberButtons}>
                      {[1, 2, 3, 4].map((num) => (
                        <TouchableOpacity
                          key={num}
                          style={[
                            portfolioStyles.numberButton,
                            projectConfig.projectsPerRowDesktop === num && portfolioStyles.numberButtonActive
                          ]}
                          onPress={() => onUpdateConfig('projectsPerRowDesktop', num)}
                        >
                          <ThemedText style={[
                            portfolioStyles.numberButtonText,
                            projectConfig.projectsPerRowDesktop === num && portfolioStyles.numberButtonTextActive
                          ]}>
                            {num}
                          </ThemedText>
                        </TouchableOpacity>
                      ))}
                    </ThemedView>
                  </ThemedView>
                  
                  <ThemedView style={portfolioStyles.rowConfigContainer}>
                    <ThemedText style={portfolioStyles.rowConfigLabel}>Móvil:</ThemedText>
                    <ThemedView style={portfolioStyles.numberButtons}>
                      {[1, 2, 3].map((num) => (
                        <TouchableOpacity
                          key={num}
                          style={[
                            portfolioStyles.numberButton,
                            projectConfig.projectsPerRowMobile === num && portfolioStyles.numberButtonActive
                          ]}
                          onPress={() => onUpdateConfig('projectsPerRowMobile', num)}
                        >
                          <ThemedText style={[
                            portfolioStyles.numberButtonText,
                            projectConfig.projectsPerRowMobile === num && portfolioStyles.numberButtonTextActive
                          ]}>
                            {num}
                          </ThemedText>
                        </TouchableOpacity>
                      ))}
                    </ThemedView>
                  </ThemedView>
                </ThemedView>

                {/* Botones */}
                <ThemedView style={portfolioStyles.modalButtons}>
                  <TouchableOpacity
                    style={portfolioStyles.cancelModalButton}
                    onPress={handleClose}
                  >
                    <ThemedText style={portfolioStyles.cancelModalButtonText}>
                      Cancelar
                    </ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={portfolioStyles.createButton}
                    onPress={onCreate}
                  >
                    <ThemedText style={portfolioStyles.createButtonText}>
                      Crear Portfolio
                    </ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              </ScrollView>
            </ThemedView>
          </Animated.View>
        </BlurView>
      </Animated.View>
    </Modal>
  );
};