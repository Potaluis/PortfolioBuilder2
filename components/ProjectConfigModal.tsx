// components/ProjectConfigModal.tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { portfolioStyles } from '@/styles/styles';
import { ProjectConfig } from '@/types';
import React from 'react';
import { Modal, ScrollView, Switch, TouchableOpacity } from 'react-native';

interface ProjectConfigModalProps {
  visible: boolean;
  projectConfig: ProjectConfig;
  onClose: () => void;
  onCreate: () => void;
  onToggleSection: (index: number) => void;
  onUpdateConfig: (field: keyof ProjectConfig, value: any) => void;
}

export const ProjectConfigModal: React.FC<ProjectConfigModalProps> = ({
  visible,
  projectConfig,
  onClose,
  onCreate,
  onToggleSection,
  onUpdateConfig,
}) => {
  return (
    <Modal visible={visible} animationType="slide">
      <ThemedView style={portfolioStyles.configModalContainer}>
        <ThemedView style={portfolioStyles.configHeader}>
          <ThemedText style={portfolioStyles.configTitle}>Configurar Portfolio</ThemedText>
        </ThemedView>
        
        <ScrollView style={portfolioStyles.configScrollView}>
          {/* Secciones */}
          <ThemedView style={portfolioStyles.configSection}>
            <ThemedText style={portfolioStyles.configSectionTitle}>
              ¿Qué secciones te gustaría tener?
            </ThemedText>
            {projectConfig.sections.map((section, index) => (
              <ThemedView key={index} style={portfolioStyles.sectionRow}>
                <ThemedText style={portfolioStyles.sectionName}>{section.name}</ThemedText>
                <Switch
                  value={section.enabled}
                  onValueChange={() => onToggleSection(index)}
                  trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                  thumbColor={section.enabled ? '#ffffff' : '#f3f4f6'}
                />
              </ThemedView>
            ))}
          </ThemedView>

          {/* Posición del menú */}
          <ThemedView style={portfolioStyles.configSection}>
            <ThemedText style={portfolioStyles.configSectionTitle}>¿Dónde prefieres el menú?</ThemedText>
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
            <ThemedText style={portfolioStyles.configSectionTitle}>¿Cómo mostrar tus proyectos?</ThemedText>
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
              onPress={onClose}
            >
              <ThemedText style={portfolioStyles.cancelModalButtonText}>Cancelar</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={portfolioStyles.createButton}
              onPress={onCreate}
            >
              <ThemedText style={portfolioStyles.createButtonText}>Crear Portfolio</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </Modal>
  );
};