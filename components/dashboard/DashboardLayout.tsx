// components/dashboard/DashboardLayout.tsx - Nueva estructura del dashboard
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { User } from '@/types';
import React, { useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export type DashboardSection = 'portfolios' | 'statistics' | 'messages' | 'contracts' | 'settings';

interface SidebarMenuItem {
  id: DashboardSection;
  title: string;
  icon: string;
  description: string;
  badge?: number;
}

interface DashboardLayoutProps {
  user: User;
  activeSection: DashboardSection;
  onSectionChange: (section: DashboardSection) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const menuItems: SidebarMenuItem[] = [
  {
    id: 'portfolios',
    title: 'Portfolios',
    icon: '📁',
    description: 'Gestiona tus portfolios'
  },
  {
    id: 'statistics',
    title: 'Estadísticas',
    icon: '📊',
    description: 'Analiza tu rendimiento'
  },
  {
    id: 'messages',
    title: 'Mensajes',
    icon: '💬',
    description: 'Bandeja de entrada',
    badge: 3 // Ejemplo de badge de notificación
  },
  {
    id: 'contracts',
    title: 'Contratos',
    icon: '📋',
    description: 'Trabajos activos',
    badge: 1
  },
  {
    id: 'settings',
    title: 'Configuración',
    icon: '⚙️',
    description: 'Ajustes de cuenta'
  }
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  user,
  activeSection,
  onSectionChange,
  onLogout,
  children
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(width < 768);

  const sidebarWidth = sidebarCollapsed ? 80 : 280;

  return (
    <ThemedView style={{ flex: 1, flexDirection: 'row' }}>
      {/* Sidebar */}
      <View style={{
        width: sidebarWidth,
        backgroundColor: '#1f2937',
        borderRightWidth: 1,
        borderRightColor: '#374151',
      }}>
        {/* Header del Sidebar */}
        <View style={{
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#374151',
          alignItems: sidebarCollapsed ? 'center' : 'flex-start',
        }}>
          <TouchableOpacity
            onPress={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{
              alignSelf: sidebarCollapsed ? 'center' : 'flex-end',
              marginBottom: sidebarCollapsed ? 0 : 16,
            }}
          >
            <ThemedText style={{
              fontSize: 18,
              color: '#9ca3af',
            }}>
              {sidebarCollapsed ? '☰' : '←'}
            </ThemedText>
          </TouchableOpacity>

          {!sidebarCollapsed && (
            <>
              {/* Logo */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 16,
              }}>
                <View style={{
                  width: 32,
                  height: 32,
                  backgroundColor: '#2563eb',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12,
                }}>
                  <ThemedText style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                    PB
                  </ThemedText>
                </View>
                <ThemedText style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                  PortfolioBuilder
                </ThemedText>
              </View>

              {/* Info del usuario */}
              <View style={{
                backgroundColor: '#374151',
                padding: 12,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#2563eb',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12,
                }}>
                  <ThemedText style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                    {user.username.charAt(0).toUpperCase()}
                  </ThemedText>
                </View>
                
                <View style={{ flex: 1 }}>
                  <ThemedText style={{
                    color: 'white',
                    fontWeight: '600',
                    fontSize: 14,
                  }} numberOfLines={1}>
                    {user.username}
                  </ThemedText>
                  <ThemedText style={{
                    color: '#9ca3af',
                    fontSize: 12,
                  }} numberOfLines={1}>
                    {user.email}
                  </ThemedText>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Menu Items */}
        <ScrollView style={{ flex: 1, paddingVertical: 8 }}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => onSectionChange(item.id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: sidebarCollapsed ? 20 : 20,
                paddingVertical: 16,
                marginHorizontal: 8,
                marginVertical: 2,
                borderRadius: 12,
                backgroundColor: activeSection === item.id ? '#2563eb' : 'transparent',
              }}
            >
              <ThemedText style={{
                fontSize: 20,
                marginRight: sidebarCollapsed ? 0 : 16,
              }}>
                {item.icon}
              </ThemedText>

              {!sidebarCollapsed && (
                <View style={{ flex: 1 }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <ThemedText style={{
                      color: activeSection === item.id ? 'white' : '#d1d5db',
                      fontWeight: activeSection === item.id ? '600' : '500',
                      fontSize: 15,
                    }}>
                      {item.title}
                    </ThemedText>
                    
                    {item.badge && (
                      <View style={{
                        backgroundColor: '#ef4444',
                        borderRadius: 10,
                        minWidth: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 6,
                      }}>
                        <ThemedText style={{
                          color: 'white',
                          fontSize: 11,
                          fontWeight: 'bold',
                        }}>
                          {item.badge}
                        </ThemedText>
                      </View>
                    )}
                  </View>
                  
                  <ThemedText style={{
                    color: activeSection === item.id ? 'rgba(255,255,255,0.8)' : '#9ca3af',
                    fontSize: 12,
                    marginTop: 2,
                  }}>
                    {item.description}
                  </ThemedText>
                </View>
              )}

              {/* Badge cuando está colapsado */}
              {sidebarCollapsed && item.badge && (
                <View style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: '#ef4444',
                  borderRadius: 6,
                  minWidth: 12,
                  height: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <ThemedText style={{
                    color: 'white',
                    fontSize: 8,
                    fontWeight: 'bold',
                  }}>
                    {item.badge}
                  </ThemedText>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Footer del Sidebar */}
        <View style={{
          padding: 16,
          borderTopWidth: 1,
          borderTopColor: '#374151',
        }}>
          <TouchableOpacity
            onPress={onLogout}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              paddingVertical: 12,
              paddingHorizontal: 12,
              borderRadius: 8,
              backgroundColor: '#374151',
            }}
          >
            <ThemedText style={{
              fontSize: 16,
              marginRight: sidebarCollapsed ? 0 : 12,
            }}>
              🚪
            </ThemedText>
            
            {!sidebarCollapsed && (
              <ThemedText style={{
                color: '#d1d5db',
                fontWeight: '500',
              }}>
                Cerrar Sesión
              </ThemedText>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Contenido Principal */}
      <View style={{
        flex: 1,
        backgroundColor: '#f8fafc',
      }}>
        {children}
      </View>
    </ThemedView>
  );
};