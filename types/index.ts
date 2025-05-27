// types/index.ts - ACTUALIZADO con campos de Firebase

export interface User {
  uid: string;                    // ID único de Firebase
  username: string;
  email: string;
  createdAt?: string;            // Fecha de registro
  emailVerified?: boolean;       // Email verificado
  photoURL?: string;             // URL de foto de perfil
  preferences?: UserPreferences; // Preferencias del usuario
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: boolean;
  autoSave: boolean;
}

export interface AuthForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProjectSection {
  name: string;
  enabled: boolean;
  order: number;
}

export interface ProjectConfig {
  sections: ProjectSection[];
  menuPosition: 'top' | 'left' | 'right';
  projectStyle: 'grid' | 'list' | 'carousel' | 'masonry';
  projectsPerRowDesktop: number;
  projectsPerRowMobile: number;
}

// Contenido del portfolio
export interface PortfolioContent {
  aboutMe: {
    title?: string;
    description?: string;
    image?: string;
    skills?: string[];
  };
  projects: PortfolioProject[];
  services: PortfolioService[];
  blog: BlogPost[];
  testimonials: Testimonial[];
  contact: ContactInfo;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  image?: string;
  images?: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category?: string;
  createdAt: string;
}

export interface PortfolioService {
  id: string;
  title: string;
  description: string;
  icon?: string;
  price?: string;
  features: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
  rating: number;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  location?: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
  };
}

// Configuraciones del portfolio
export interface PortfolioSettings {
  published: boolean;           // Si está publicado o en borrador
  domain?: string;             // Dominio personalizado
  seoTitle?: string;           // Título SEO
  seoDescription?: string;     // Descripción SEO
  analytics?: string;          // Google Analytics ID
  customCSS?: string;          // CSS personalizado
  password?: string;           // Contraseña para acceso privado
}

// Proyecto completo
export interface Project {
  id: string;                  // ID único del proyecto
  userId: string;              // ID del usuario propietario
  name: string;                // Nombre del portfolio
  config: ProjectConfig;       // Configuración de diseño
  content: PortfolioContent;   // Contenido del portfolio
  settings: PortfolioSettings; // Configuraciones
  createdAt: string;          // Fecha de creación
  updatedAt: string;          // Última actualización
  template?: string;          // Plantilla utilizada
}

export type AuthMode = 'login' | 'register';
export type Screen = 'start' | 'home' | 'project';

export interface AppState {
  currentScreen: Screen;
  showAuthModal: boolean;
  showProjectConfigModal: boolean;
  authMode: AuthMode;
  user: User | null;
  projects: Project[];
  currentProject: Project | null;
  authForm: AuthForm;
  projectConfig: ProjectConfig;
}

// Estados de carga y error
export interface LoadingState {
  auth: boolean;
  projects: boolean;
  saving: boolean;
  uploading: boolean;
}

export interface ErrorState {
  auth?: string;
  projects?: string;
  saving?: string;
  network?: string;
}

// Respuestas de API
export interface AuthResponse {
  success: boolean;
  error?: string;
  needsVerification?: boolean;
}

export interface ProjectResponse {
  success: boolean;
  data?: Project;
  error?: string;
}

// Analytics y métricas
export interface PortfolioAnalytics {
  views: number;
  uniqueVisitors: number;
  contactClicks: number;
  projectClicks: number;
  topPages: Array<{
    path: string;
    views: number;
  }>;
  countries: Array<{
    country: string;
    views: number;
  }>;
}

// Plantillas de portfolio
export interface PortfolioTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'minimal' | 'creative' | 'corporate' | 'developer';
  features: string[];
  config: ProjectConfig;
  isPremium: boolean;
}

export interface PublicProfile {
  id: string;
  userId: string;
  name: string;
  title: string;
  description: string;
  avatar?: string;
  skills: string[];
  portfolioUrl: string;
  published: boolean;
  featured: boolean;
  totalViews: number;
  totalContacts: number;
  lastWeekViews: number;
  lastWeekContacts: number;
  popularityScore: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileFilters {
  skills: string[];
  sortBy: 'relevance' | 'newest' | 'oldest' | 'most-viewed' | 'least-viewed';
  searchText: string;
}