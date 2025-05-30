// components/dashboard/ContractsSection.tsx - Gestión de contratos y trabajos
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { Alert, Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface Contract {
  id: string;
  clientName: string;
  clientEmail: string;
  projectTitle: string;
  description: string;
  status: 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  budget: number;
  currency: string;
  startDate: string;
  deadline: string;
  completedTasks: number;
  totalTasks: number;
  lastUpdate: string;
  tags: string[];
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    deadline: string;
    completed: boolean;
    payment?: number;
  }>;
}

// Datos mock - en producción vendrían de Firebase
const mockContracts: Contract[] = [
  {
    id: '1',
    clientName: 'TechStart Solutions',
    clientEmail: 'contact@techstart.com',
    projectTitle: 'Rediseño completo de sitio web corporativo',
    description: 'Modernización completa del sitio web incluyendo nuevo diseño, optimización SEO y implementación de sistema de blog.',
    status: 'in_progress',
    priority: 'high',
    budget: 3500,
    currency: 'EUR',
    startDate: '2024-05-15',
    deadline: '2024-06-30',
    completedTasks: 7,
    totalTasks: 12,
    lastUpdate: '2024-05-29',
    tags: ['Web Design', 'SEO', 'React'],
    milestones: [
      {
        id: 'm1',
        title: 'Wireframes y Prototipo',
        description: 'Diseño inicial y estructura del sitio',
        deadline: '2024-05-25',
        completed: true,
        payment: 1000
      },
      {
        id: 'm2',
        title: 'Diseño Visual Completo',
        description: 'Diseño final de todas las páginas',
        deadline: '2024-06-10',
        completed: false,
        payment: 1500
      },
      {
        id: 'm3',
        title: 'Desarrollo e Implementación',
        description: 'Programación y puesta en línea',
        deadline: '2024-06-30',
        completed: false,
        payment: 1000
      }
    ]
  },
  {
    id: '2',
    clientName: 'María García',
    clientEmail: 'maria@fotografa.com',
    projectTitle: 'Portfolio fotográfico personalizado',
    description: 'Desarrollo de portfolio online para fotógrafa profesional con galería dinámica y sistema de contacto.',
    status: 'review',
    priority: 'medium',
    budget: 1200,
    currency: 'EUR',
    startDate: '2024-05-01',
    deadline: '2024-05-31',
    completedTasks: 8,
    totalTasks: 8,
    lastUpdate: '2024-05-28',
    tags: ['Portfolio', 'Photography', 'Gallery'],
    milestones: [
      {
        id: 'm4',
        title: 'Diseño y Estructura',
        description: 'Layout y organización del portfolio',
        deadline: '2024-05-15',
        completed: true,
        payment: 600
      },
      {
        id: 'm5',
        title: 'Desarrollo y Entrega',
        description: 'Programación completa y entrega final',
        deadline: '2024-05-31',
        completed: true,
        payment: 600
      }
    ]
  },
  {
    id: '3',
    clientName: 'Innovate Corp',
    clientEmail: 'projects@innovate.com',
    projectTitle: 'Dashboard de análisis de datos',
    description: 'Creación de dashboard interactivo para visualización de métricas de negocio en tiempo real.',
    status: 'pending',
    priority: 'urgent',
    budget: 5000,
    currency: 'EUR',
    startDate: '2024-06-01',
    deadline: '2024-07-15',
    completedTasks: 0,
    totalTasks: 15,
    lastUpdate: '2024-05-30',
    tags: ['Dashboard', 'Analytics', 'React', 'D3.js'],
    milestones: [
      {
        id: 'm6',
        title: 'Análisis y Planificación',
        description: 'Definición de requerimientos y arquitectura',
        deadline: '2024-06-10',
        completed: false,
        payment: 1500
      },
      {
        id: 'm7',
        title: 'Desarrollo Core',
        description: 'Desarrollo de funcionalidades principales',
        deadline: '2024-06-30',
        completed: false,
        payment: 2500
      },
      {
        id: 'm8',
        title: 'Testing y Entrega',
        description: 'Pruebas, optimización y deploy',
        deadline: '2024-07-15',
        completed: false,
        payment: 1000
      }
    ]
  }
];

export const ContractsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | Contract['status']>('all');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  const statusConfig = {
    pending: { label: 'Pendiente', color: '#f59e0b', bg: '#fef3c7', icon: '⏳' },
    in_progress: { label: 'En Progreso', color: '#2563eb', bg: '#dbeafe', icon: '🔄' },
    review: { label: 'En Revisión', color: '#8b5cf6', bg: '#ede9fe', icon: '👀' },
    completed: { label: 'Completado', color: '#10b981', bg: '#d1fae5', icon: '✅' },
    cancelled: { label: 'Cancelado', color: '#ef4444', bg: '#fee2e2', icon: '❌' }
  };

  const priorityConfig = {
    low: { label: 'Baja', color: '#6b7280' },
    medium: { label: 'Media', color: '#f59e0b' },
    high: { label: 'Alta', color: '#ef4444' },
    urgent: { label: 'Urgente', color: '#dc2626' }
  };

  const filterOptions = [
    { key: 'all' as const, label: 'Todos', count: mockContracts.length },
    { key: 'pending' as const, label: 'Pendientes', count: mockContracts.filter(c => c.status === 'pending').length },
    { key: 'in_progress' as const, label: 'En Progreso', count: mockContracts.filter(c => c.status === 'in_progress').length },
    { key: 'review' as const, label: 'En Revisión', count: mockContracts.filter(c => c.status === 'review').length },
    { key: 'completed' as const, label: 'Completados', count: mockContracts.filter(c => c.status === 'completed').length },
  ];

  const getFilteredContracts = () => {
    if (selectedFilter === 'all') return mockContracts;
    return mockContracts.filter(contract => contract.status === selectedFilter);
  };

  const calculateProgress = (contract: Contract) => {
    return Math.round((contract.completedTasks / contract.totalTasks) * 100);
  };

  const calculateEarnings = (contract: Contract) => {
    const completedMilestones = contract.milestones.filter(m => m.completed);
    return completedMilestones.reduce((total, milestone) => total + (milestone.payment || 0), 0);
  };

  const getTotalEarnings = () => {
    return mockContracts.reduce((total, contract) => total + calculateEarnings(contract), 0);
  };

  const getPendingEarnings = () => {
    return mockContracts.reduce((total, contract) => {
      const pendingMilestones = contract.milestones.filter(m => !m.completed);
      return total + pendingMilestones.reduce((sum, milestone) => sum + (milestone.payment || 0), 0);
    }, 0);
  };

  const handleMarkMilestone = (contractId: string, milestoneId: string) => {
    Alert.alert(
      'Marcar Hito como Completado',
      '¿Has terminado este hito? Esto notificará al cliente para revisión.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Marcar Completado', onPress: () => console.log('Marcar completado:', milestoneId) }
      ]
    );
  };

  const handleUpdateStatus = (contractId: string, newStatus: Contract['status']) => {
    Alert.alert(
      'Actualizar Estado',
      `¿Cambiar el estado del proyecto a "${statusConfig[newStatus].label}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => console.log('Actualizar estado:', newStatus) }
      ]
    );
  };

  const filteredContracts = getFilteredContracts();

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
            Contratos
          </ThemedText>
          <ThemedText style={{
            fontSize: 16,
            color: '#6b7280',
          }}>
            Gestiona tus proyectos y trabajos activos
          </ThemedText>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#2563eb',
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <ThemedText style={{ fontSize: 18, marginRight: 8 }}>➕</ThemedText>
          <ThemedText style={{
            color: 'white',
            fontWeight: '600',
            fontSize: 16,
          }}>
            Nuevo Contrato
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* KPIs */}
      <View style={{
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
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
              fontSize: 28,
              fontWeight: 'bold',
              color: '#10b981',
            }}>
              €{getTotalEarnings().toLocaleString()}
            </ThemedText>
            <ThemedText style={{ fontSize: 24 }}>💰</ThemedText>
          </View>
          <ThemedText style={{
            fontSize: 14,
            color: '#6b7280',
            fontWeight: '500',
          }}>
            Ingresos Confirmados
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
              fontSize: 28,
              fontWeight: 'bold',
              color: '#f59e0b',
            }}>
              €{getPendingEarnings().toLocaleString()}
            </ThemedText>
            <ThemedText style={{ fontSize: 24 }}>⏳</ThemedText>
          </View>
          <ThemedText style={{
            fontSize: 14,
            color: '#6b7280',
            fontWeight: '500',
          }}>
            Pendientes de Cobro
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
              fontSize: 28,
              fontWeight: 'bold',
              color: '#2563eb',
            }}>
              {mockContracts.filter(c => c.status === 'in_progress').length}
            </ThemedText>
            <ThemedText style={{ fontSize: 24 }}>🔄</ThemedText>
          </View>
          <ThemedText style={{
            fontSize: 14,
            color: '#6b7280',
            fontWeight: '500',
          }}>
            Proyectos Activos
          </ThemedText>
        </View>
      </View>

      {/* Filtros */}
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        padding: 4,
        marginBottom: 24,
      }}>
        {filterOptions.map((option) => (
          <TouchableOpacity
            key={option.key}
            onPress={() => setSelectedFilter(option.key)}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 8,
              backgroundColor: selectedFilter === option.key ? '#2563eb' : 'transparent',
            }}
          >
            <ThemedText style={{
              fontSize: 14,
              fontWeight: '600',
              color: selectedFilter === option.key ? 'white' : '#6b7280',
              marginRight: 8,
            }}>
              {option.label}
            </ThemedText>
            {option.count > 0 && (
              <View style={{
                backgroundColor: selectedFilter === option.key ? 'rgba(255,255,255,0.2)' : '#d1d5db',
                borderRadius: 10,
                minWidth: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 6,
              }}>
                <ThemedText style={{
                  color: selectedFilter === option.key ? 'white' : '#6b7280',
                  fontSize: 11,
                  fontWeight: 'bold',
                }}>
                  {option.count}
                </ThemedText>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de Contratos */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {filteredContracts.length === 0 ? (
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 60,
          }}>
            <ThemedText style={{ fontSize: 64, marginBottom: 16 }}>📋</ThemedText>
            <ThemedText style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: 8,
            }}>
              No hay contratos
            </ThemedText>
            <ThemedText style={{
              fontSize: 16,
              color: '#6b7280',
              textAlign: 'center',
            }}>
              Los nuevos proyectos aparecerán aquí
            </ThemedText>
          </View>
        ) : (
          <View style={{ gap: 16 }}>
            {filteredContracts.map((contract) => (
              <TouchableOpacity
                key={contract.id}
                onPress={() => setSelectedContract(contract)}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 16,
                  padding: 20,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 3,
                  borderLeftWidth: 4,
                  borderLeftColor: statusConfig[contract.status].color,
                }}
              >
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 12,
                }}>
                  <View style={{ flex: 1 }}>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 4,
                    }}>
                      <ThemedText style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#1f2937',
                        marginRight: 12,
                      }}>
                        {contract.projectTitle}
                      </ThemedText>
                      
                      <View style={{
                        backgroundColor: priorityConfig[contract.priority].color,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 12,
                      }}>
                        <ThemedText style={{
                          fontSize: 10,
                          color: 'white',
                          fontWeight: '600',
                        }}>
                          {priorityConfig[contract.priority].label.toUpperCase()}
                        </ThemedText>
                      </View>
                    </View>
                    
                    <ThemedText style={{
                      fontSize: 14,
                      color: '#6b7280',
                      marginBottom: 8,
                    }}>
                      Cliente: {contract.clientName}
                    </ThemedText>
                    
                    <ThemedText
                      style={{
                        fontSize: 14,
                        color: '#9ca3af',
                        lineHeight: 20,
                      }}
                      numberOfLines={2}
                    >
                      {contract.description}
                    </ThemedText>
                  </View>

                  <View style={{
                    alignItems: 'flex-end',
                    marginLeft: 16,
                  }}>
                    <View style={{
                      backgroundColor: statusConfig[contract.status].bg,
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}>
                      <ThemedText style={{
                        fontSize: 12,
                        marginRight: 4,
                      }}>
                        {statusConfig[contract.status].icon}
                      </ThemedText>
                      <ThemedText style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: statusConfig[contract.status].color,
                      }}>
                        {statusConfig[contract.status].label}
                      </ThemedText>
                    </View>
                    
                    <ThemedText style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#10b981',
                    }}>
                      €{contract.budget.toLocaleString()}
                    </ThemedText>
                  </View>
                </View>

                {/* Progreso */}
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 12,
                }}>
                  <View style={{ flex: 1, marginRight: 12 }}>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 4,
                    }}>
                      <ThemedText style={{
                        fontSize: 12,
                        color: '#6b7280',
                      }}>
                        Progreso
                      </ThemedText>
                      <ThemedText style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: '#374151',
                      }}>
                        {contract.completedTasks}/{contract.totalTasks} tareas
                      </ThemedText>
                    </View>
                    <View style={{
                      height: 6,
                      backgroundColor: '#f3f4f6',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}>
                      <View style={{
                        width: `${calculateProgress(contract)}%`,
                        height: '100%',
                        backgroundColor: '#2563eb',
                      }} />
                    </View>
                  </View>
                  
                  <ThemedText style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#2563eb',
                  }}>
                    {calculateProgress(contract)}%
                  </ThemedText>
                </View>

                {/* Tags y Fecha */}
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 6,
                    flex: 1,
                  }}>
                    {contract.tags.slice(0, 3).map((tag, index) => (
                      <View
                        key={index}
                        style={{
                          backgroundColor: '#eff6ff',
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                          borderRadius: 12,
                        }}
                      >
                        <ThemedText style={{
                          fontSize: 10,
                          color: '#2563eb',
                          fontWeight: '500',
                        }}>
                          {tag}
                        </ThemedText>
                      </View>
                    ))}
                    {contract.tags.length > 3 && (
                      <View style={{
                        backgroundColor: '#f3f4f6',
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 12,
                      }}>
                        <ThemedText style={{
                          fontSize: 10,
                          color: '#6b7280',
                          fontWeight: '500',
                        }}>
                          +{contract.tags.length - 3}
                        </ThemedText>
                      </View>
                    )}
                  </View>
                  
                  <ThemedText style={{
                    fontSize: 12,
                    color: '#6b7280',
                    marginLeft: 12,
                  }}>
                    Entrega: {new Date(contract.deadline).toLocaleDateString('es-ES')}
                  </ThemedText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
};