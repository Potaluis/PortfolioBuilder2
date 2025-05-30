// utils/devConfig.ts - CONFIGURACIÓN PARA DESARROLLO

// 🚨 CONFIGURACIÓN DE DESARROLLO
export const DEV_CONFIG = {
  // Cambiar a false para usar autenticación real
  BYPASS_AUTH: true,
  
  // Mostrar banners de desarrollo
  SHOW_DEV_BANNER: true,
  
  // Logs detallados en consola
  VERBOSE_LOGGING: true,
  
  // Usuario temporal para desarrollo
  TEMP_USER: {
    uid: 'dev-user-123',
    username: 'Desarrollador Demo',
    email: 'dev@portfoliobuilder.com',
    createdAt: new Date().toISOString(),
    emailVerified: true,
  },
  
  // Datos mock para desarrollo
  USE_MOCK_DATA: true,
  
  // Auto-crear proyectos de ejemplo
  CREATE_SAMPLE_PROJECTS: true,
};

// Función para logging condicional
export const devLog = (message: string, data?: any) => {
  if (DEV_CONFIG.VERBOSE_LOGGING) {
    console.log(`🛠️ [DEV] ${message}`, data || '');
  }
};

// Función para verificar si estamos en modo desarrollo
export const isDevMode = () => {
  return DEV_CONFIG.BYPASS_AUTH && __DEV__;
};

// Mensaje de estado de la app
export const getAppStatus = () => {
  if (isDevMode()) {
    return {
      mode: 'development',
      message: 'Aplicación en modo desarrollo - Autenticación deshabilitada',
      color: '#10b981',
      icon: '🛠️'
    };
  } else {
    return {
      mode: 'production',
      message: 'Aplicación en modo producción',
      color: '#2563eb',
      icon: '🚀'
    };
  }
};