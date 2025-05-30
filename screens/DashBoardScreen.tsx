// screens/DashboardScreen.tsx - CON INDICADOR DE MODO DEBUG
import { AuthModal } from '@/components/auth/AuthModal';
import { ContractsSection } from '@/components/dashboard/ContractsSection';
import { DashboardLayout, DashboardSection } from '@/components/dashboard/DashboardLayout';
import { EnhancedPortfolioCreator } from '@/components/dashboard/EnhancedPortfolioCreator';
import { MessagesSection } from '@/components/dashboard/MessagesSection';
import { PortfoliosSection } from '@/components/dashboard/PortfoliosSection';
import { SettingsSection } from '@/components/dashboard/SettingsSection';
import { StatisticsSection } from '@/components/dashboard/StatisticsSection';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { usePortfolioApp } from '@/hooks/usePortfolioApp';
import { ProjectConfig } from '@/types';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

export const DashboardScreen: React.FC = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>('portfolios');
  const [showPortfolioCreator, setShowPortfolioCreator] = useState(false);

  const {
    // Estados
    showAuthModal,
    authMode,
    user,
    projects,
    authForm,
    loading,
    debugMode,

    // Funciones de autenticación
    handleAuth,
    handleGoogleAuth,
    updateAuthForm,
    setAuthMode,
    logout,

    // Funciones de proyectos
    openProject,
    updateProjectInList,
    removeProject,

    // Funciones de navegación
    openAuthModal,
    closeAuthModal,
  } = usePortfolioApp();

  // Si no hay usuario, mostrar pantalla de login
  if (!user) {
    return (
      <ThemedView style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 24,
        backgroundColor: '#f8fafc',
      }}>
        {/* 🚨 INDICADOR DE MODO DEBUG */}
        {debugMode && (
          <View style={{
            position: 'absolute',
            top: 60,
            left: 20,
            right: 20,
            backgroundColor: '#fef3c7',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#f59e0b',
            zIndex: 1000,
          }}>
            <ThemedText style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#92400e',
              textAlign: 'center',
            }}>
              🛠️ MODO DEPURACIÓN ACTIVO - Login automático habilitado
            </ThemedText>
          </View>
        )}

        <View style={{
          backgroundColor: 'white',
          borderRadius: 24,
          padding: 40,
          width: '100%',
          maxWidth: 400,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.1,
          shadowRadius: 24,
          elevation: 16,
          marginTop: debugMode ? 60 : 0, // Espacio para el banner de debug
        }}>
          <ThemedText style={{ 
            fontSize: 64, 
            textAlign: 'center',
            marginBottom: 24,
          }}>
            📊
          </ThemedText>
          
          <ThemedText style={{ 
            fontSize: 28, 
            fontWeight: 'bold', 
            textAlign: 'center',
            color: '#1f2937',
            marginBottom: 12,
          }}>
            Accede a tu Dashboard
          </ThemedText>
          
          <ThemedText style={{ 
            fontSize: 16, 
            textAlign: 'center',
            color: '#6b7280',
            lineHeight: 24,
            marginBottom: 32,
          }}>
            {debugMode 
              ? 'Modo depuración activo - Haz clic para ir directamente al dashboard'
              : 'Inicia sesión para gestionar tus portfolios, ver estadísticas y administrar tu cuenta profesional'
            }
          </ThemedText>
          
          {/* 🚨 BOTÓN DE DEBUG - Login directo */}
          <TouchableOpacity
            onPress={() => openAuthModal('login')}
            style={{
              backgroundColor: debugMode ? '#10b981' : '#2563eb',
              paddingHorizontal: 32,
              paddingVertical: 16,
              borderRadius: 12,
              shadowColor: debugMode ? '#10b981' : '#2563eb',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {debugMode && (
              <ThemedText style={{ 
                fontSize: 18, 
                marginRight: 8 
              }}>
                🚀
              </ThemedText>
            )}
            <ThemedText style={{ 
              color: 'white', 
              fontSize: 16, 
              fontWeight: '600',
              textAlign: 'center',
            }}>
              {debugMode ? 'Acceso Rápido (Debug)' : 'Iniciar Sesión'}
            </ThemedText>
          </TouchableOpacity>
          
          {!debugMode && (
            <TouchableOpacity
              onPress={() => openAuthModal('register')}
              style={{
                marginTop: 16,
                paddingVertical: 12,
              }}
            >
              <ThemedText style={{
                color: '#2563eb',
                fontSize: 16,
                fontWeight: '500',
                textAlign: 'center',
                textDecorationLine: 'underline',
              }}>
                ¿No tienes cuenta? Regístrate aquí
              </ThemedText>
            </TouchableOpacity>
          )}

          {/* Nota de debug */}
          {debugMode && (
            <View style={{
              marginTop: 20,
              padding: 12,
              backgroundColor: '#f0f9ff',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#0ea5e9',
            }}>
              <ThemedText style={{
                fontSize: 12,
                color: '#0369a1',
                textAlign: 'center',
                lineHeight: 16,
              }}>
                💡 Para desactivar el modo debug, cambia DEBUG_MODE a false en hooks/usePortfolioApp.tsx
              </ThemedText>
            </View>
          )}
        </View>

        {/* Modal de autenticación (solo se muestra si DEBUG_MODE es false) */}
        {!debugMode && (
          <AuthModal
            visible={showAuthModal}
            authMode={authMode}
            authForm={authForm}
            onClose={closeAuthModal}
            onAuth={handleAuth}
            onGoogleAuth={handleGoogleAuth}
            onModeChange={setAuthMode}
            onFormChange={updateAuthForm}
          />
        )}
      </ThemedView>
    );
  }

  // Funciones del portfolio
  const handleCreatePortfolio = (config: ProjectConfig) => {
    console.log('🎨 Creando portfolio con configuración:', config);
    
    const newProject = {
      userId: user.uid,
      name: `Mi Portfolio ${projects.length + 1}`,
      config: config,
      content: {
        aboutMe: { 
          title: 'Sobre mí', 
          description: 'Cuéntanos sobre ti...',
          skills: []
        },
        projects: [],
        services: [],
        blog: [],
        testimonials: [],
        contact: {}
      },
      settings: {
        published: false,
        seoTitle: `Portfolio de ${user.username}`,
        seoDescription: 'Portfolio profesional'
      }
    };

    console.log('💾 Guardando nuevo proyecto:', newProject);
    setShowPortfolioCreator(false);
  };

  const handleEditProject = (project: any) => {
    console.log('✏️ Editando proyecto:', project.name);
  };

  const handleDeleteProject = (project: any) => {
    console.log('🗑️ Eliminando proyecto:', project.name);
    removeProject(project.id);
  };

  const handleOpenProject = (project: any) => {
    console.log('📖 Abriendo proyecto:', project.name);
    openProject(project);
    router.push(`/project/${project.id}`);
  };

  const handleDuplicateProject = (project: any) => {
    console.log('📋 Duplicando proyecto:', project.name);
  };

  const handleUpdateUser = (updates: any) => {
    console.log('👤 Actualizando usuario:', updates);
  };

  // Renderizar sección activa
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'portfolios':
        return (
          <PortfoliosSection
            projects={projects}
            onCreateProject={() => setShowPortfolioCreator(true)}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
            onOpenProject={handleOpenProject}
            onDuplicateProject={handleDuplicateProject}
          />
        );
      
      case 'statistics':
        return <StatisticsSection />;
      
      case 'messages':
        return <MessagesSection />;
      
      case 'contracts':
        return <ContractsSection />;
      
      case 'settings':
        return (
          <SettingsSection
            user={user}
            onLogout={logout}
            onUpdateUser={handleUpdateUser}
          />
        );
      
      default:
        return (
          <ThemedView style={{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: 40,
          }}>
            <ThemedText style={{ 
              fontSize: 48, 
              marginBottom: 16 
            }}>
              🚧
            </ThemedText>
            <ThemedText style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: 8,
              textAlign: 'center',
            }}>
              Sección en Desarrollo
            </ThemedText>
            <ThemedText style={{
              fontSize: 16,
              color: '#6b7280',
              textAlign: 'center',
            }}>
              Esta funcionalidad estará disponible pronto
            </ThemedText>
          </ThemedView>
        );
    }
  };

  return (
    <>
      {/* 🚨 BANNER DE MODO DEBUG EN DASHBOARD */}
      {debugMode && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#10b981',
          paddingHorizontal: 20,
          paddingVertical: 12,
          paddingTop: 50, // Para el status bar
          zIndex: 1000,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ThemedText style={{ fontSize: 16, marginRight: 8 }}>🛠️</ThemedText>
          <ThemedText style={{
            color: 'white',
            fontSize: 14,
            fontWeight: '600',
            textAlign: 'center',
          }}>
            MODO DEPURACIÓN ACTIVO - Usuario: {user.email}
          </ThemedText>
        </View>
      )}

      <View style={{ 
        flex: 1, 
        marginTop: debugMode ? 80 : 0 // Espacio para el banner de debug
      }}>
        <DashboardLayout
          user={user}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onLogout={logout}
        >
          {renderActiveSection()}
        </DashboardLayout>
      </View>

      {/* Modal Creador de Portfolio Mejorado */}
      <EnhancedPortfolioCreator
        visible={showPortfolioCreator}
        onClose={() => setShowPortfolioCreator(false)}
        onCreate={handleCreatePortfolio}
      />
    </>
  );
};