export const APP_CONFIG = {
  name: 'PortfolioBuilder',
  version: '1.0.0',
  author: 'Juan Luis Moreno Bernal',
  contact: 'juanlupriv24@gmail.com',
  technologies: ['React Native', 'Expo', 'Firebase'],
  maxProjectsPerUser: 5,
  maxImagesPerProject: 20,
  featuredProfilesCount: 3,
  popularityCalculationDays: 7,
};

export const ROUTES = {
  HOME: '/',
  PROFILES: '/profiles',
  DASHBOARD: '/dashboard',
  PROJECT: '/project',
} as const;

export const CONTACT_REASONS = [
  'Consulta General',
  'Soporte Técnico',
  'Problema con mi cuenta',
  'Sugerencia de mejora',
  'Colaboración',
  'Otro'
] as const;