// utils/tempData.ts - DATOS TEMPORALES PARA DESARROLLO

import { Project, User } from '@/types';

// 👤 USUARIO TEMPORAL
export const TEMP_USER: User = {
  uid: 'dev-user-portfolio-123',
  username: 'Juan Luis Moreno',
  email: 'desarrollador@portfoliobuilder.com',
  createdAt: '2024-05-01T10:00:00Z',
  emailVerified: true,
  preferences: {
    theme: 'light',
    language: 'es',
    notifications: true,
    autoSave: true
  }
};

// 📁 PROYECTOS TEMPORALES
export const TEMP_PROJECTS: Project[] = [
  {
    id: 'temp-project-1',
    userId: TEMP_USER.uid,
    name: 'Mi Portfolio Principal',
    config: {
      sections: [
        { name: 'Sobre mí', enabled: true, order: 0 },
        { name: 'Proyectos', enabled: true, order: 1 },
        { name: 'Servicios', enabled: true, order: 2 },
        { name: 'Testimonios', enabled: true, order: 3 },
        { name: 'Contacto', enabled: true, order: 4 }
      ],
      menuPosition: 'top',
      projectStyle: 'grid',
      projectsPerRowDesktop: 3,
      projectsPerRowMobile: 2
    },
    content: {
      aboutMe: { 
        title: 'Desarrollador Full Stack', 
        description: 'Especializado en React Native, TypeScript y Firebase. Apasionado por crear aplicaciones móviles que marcan la diferencia.',
        skills: ['React Native', 'TypeScript', 'Firebase', 'Node.js', 'Expo']
      },
      projects: [
        {
          id: 'proj-1',
          title: 'PortfolioBuilder',
          description: 'Plataforma para crear portfolios profesionales',
          technologies: ['React Native', 'Firebase', 'TypeScript'],
          featured: true,
          category: 'Mobile App',
          createdAt: '2024-05-01T00:00:00Z'
        },
        {
          id: 'proj-2',
          title: 'App de Gestión',
          description: 'Sistema de gestión empresarial móvil',
          technologies: ['React Native', 'Node.js', 'MongoDB'],
          featured: false,
          category: 'Business',
          createdAt: '2024-04-15T00:00:00Z'
        }
      ],
      services: [
        {
          id: 'serv-1',
          title: 'Desarrollo Mobile',
          description: 'Aplicaciones nativas para iOS y Android',
          price: 'Desde €2,500',
          features: ['React Native', 'Diseño responsive', 'Integración APIs', 'Testing']
        },
        {
          id: 'serv-2',
          title: 'Consultoría Técnica',
          description: 'Asesoramiento en arquitectura y tecnología',
          price: '€80/hora',
          features: ['Análisis técnico', 'Optimización', 'Escalabilidad', 'Best practices']
        }
      ],
      blog: [],
      testimonials: [
        {
          id: 'test-1',
          name: 'María García',
          role: 'CEO',
          company: 'TechStart',
          content: 'Excelente trabajo en nuestra app móvil. Superó todas nuestras expectativas.',
          rating: 5
        }
      ],
      contact: {
        email: 'juan@portfoliobuilder.com',
        phone: '+34 600 123 456',
        location: 'Cartagena, España',
        social: {
          github: 'https://github.com/juanlumoreno',
          linkedin: 'https://linkedin.com/in/juanluismoreno',
          website: 'https://portfoliobuilder.com'
        }
      }
    },
    settings: {
      published: true,
      seoTitle: 'Juan Luis Moreno - Desarrollador Full Stack',
      seoDescription: 'Portfolio profesional de Juan Luis Moreno, desarrollador especializado en React Native y aplicaciones móviles.'
    },
    createdAt: '2024-05-01T10:00:00Z',
    updatedAt: new Date().toISOString(),
    template: 'professional'
  },
  {
    id: 'temp-project-2',
    userId: TEMP_USER.uid,
    name: 'Portfolio Creativo',
    config: {
      sections: [
        { name: 'Sobre mí', enabled: true, order: 0 },
        { name: 'Proyectos', enabled: true, order: 1 },
        { name: 'Blog', enabled: true, order: 2 },
        { name: 'Contacto', enabled: true, order: 3 }
      ],
      menuPosition: 'left',
      projectStyle: 'carousel',
      projectsPerRowDesktop: 2,
      projectsPerRowMobile: 1
    },
    content: {
      aboutMe: { 
        title: 'Diseñador Digital', 
        description: 'Creativo apasionado por el diseño UX/UI y las experiencias digitales memorables.',
        skills: ['UI/UX', 'Figma', 'Illustrator', 'Photoshop', 'Prototyping']
      },
      projects: [
        {
          id: 'proj-3',
          title: 'Redesign de E-commerce',
          description: 'Mejora de la experiencia de compra online',
          technologies: ['Figma', 'UI/UX', 'User Research'],
          featured: true,
          category: 'Design',
          createdAt: '2024-04-20T00:00:00Z'
        }
      ],
      services: [
        {
          id: 'serv-3',
          title: 'Diseño UX/UI',
          description: 'Interfaces intuitivas y atractivas',
          price: 'Desde €1,500',
          features: ['Research', 'Wireframes', 'Prototipos', 'Testing']
        }
      ],
      blog: [
        {
          id: 'blog-1',
          title: 'Tendencias en UX 2024',
          excerpt: 'Las últimas tendencias en diseño de experiencias',
          content: 'El diseño UX continúa evolucionando...',
          tags: ['UX', 'Design', 'Trends'],
          published: true,
          createdAt: '2024-05-15T00:00:00Z',
          updatedAt: '2024-05-15T00:00:00Z'
        }
      ],
      testimonials: [],
      contact: {
        email: 'creative@portfoliobuilder.com',
        location: 'Madrid, España'
      }
    },
    settings: {
      published: false,
      seoTitle: 'Portfolio Creativo - Diseño UX/UI',
      seoDescription: 'Portfolio de diseño digital y experiencias de usuario'
    },
    createdAt: '2024-04-15T14:30:00Z',
    updatedAt: new Date().toISOString(),
    template: 'creative'
  },
  {
    id: 'temp-project-3',
    userId: TEMP_USER.uid,
    name: 'Portfolio Minimalista',
    config: {
      sections: [
        { name: 'Sobre mí', enabled: true, order: 0 },
        { name: 'Proyectos', enabled: true, order: 1 },
        { name: 'Contacto', enabled: true, order: 2 }
      ],
      menuPosition: 'top',
      projectStyle: 'list',
      projectsPerRowDesktop: 1,
      projectsPerRowMobile: 1
    },
    content: {
      aboutMe: { 
        title: 'Desarrollador Backend', 
        description: 'Especialista en APIs robustas y arquitecturas escalables.',
        skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'AWS']
      },
      projects: [
        {
          id: 'proj-4',
          title: 'API de Pagos',
          description: 'Sistema de procesamiento de pagos seguro',
          technologies: ['Python', 'Django', 'Stripe', 'PostgreSQL'],
          featured: true,
          category: 'Backend',
          createdAt: '2024-03-10T00:00:00Z'
        }
      ],
      services: [],
      blog: [],
      testimonials: [],
      contact: {
        email: 'backend@portfoliobuilder.com'
      }
    },
    settings: {
      published: false,
      seoTitle: 'Portfolio Minimalista - Backend Developer',
      seoDescription: 'Desarrollo backend profesional'
    },
    createdAt: '2024-03-01T09:00:00Z',
    updatedAt: new Date().toISOString(),
    template: 'minimal'
  }
];

// 📊 ESTADÍSTICAS TEMPORALES
export const TEMP_STATS = {
  totalViews: 12847,
  uniqueVisitors: 8234,
  contactClicks: 186,
  projectClicks: 423,
  topPages: [
    { path: '/', views: 5234 },
    { path: '/projects', views: 3456 },
    { path: '/about', views: 2890 },
    { path: '/contact', views: 1267 }
  ],
  countries: [
    { country: 'España', views: 6234 },
    { country: 'México', views: 2345 },
    { country: 'Argentina', views: 1890 },
    { country: 'Colombia', views: 1456 },
    { country: 'Chile', views: 922 }
  ]
};

// 💬 MENSAJES TEMPORALES
export const TEMP_MESSAGES = [
  {
    id: 'msg-1',
    senderName: 'Elena Rodríguez',
    senderEmail: 'elena@empresa.com',
    subject: 'Propuesta de colaboración',
    content: 'Hola, estamos interesados en contratar tus servicios para el desarrollo de una aplicación móvil...',
    timestamp: '2024-05-30T14:30:00Z',
    isRead: false,
    isApproved: false,
    hasAttachments: true
  },
  {
    id: 'msg-2',
    senderName: 'Carlos Martínez',
    senderEmail: 'carlos@startup.com',
    subject: 'Consulta sobre precios',
    content: 'Me gustaría saber más sobre tus tarifas para desarrollo de aplicaciones...',
    timestamp: '2024-05-29T10:15:00Z',
    isRead: true,
    isApproved: true,
    hasAttachments: false
  }
];

// 🏢 CONTRATOS TEMPORALES
export const TEMP_CONTRACTS = [
  {
    id: 'cont-1',
    clientName: 'TechCorp Solutions',
    projectTitle: 'App de Gestión Empresarial',
    status: 'in_progress',
    priority: 'high',
    budget: 8500,
    deadline: '2024-07-15',
    progress: 65,
    description: 'Desarrollo de aplicación móvil para gestión empresarial con módulos de inventario, ventas y reporting.'
  },
  {
    id: 'cont-2',
    clientName: 'StartupMadrid',
    projectTitle: 'Prototipo MVP',
    status: 'review',
    priority: 'medium',
    budget: 3200,
    deadline: '2024-06-20',
    progress: 90,
    description: 'Desarrollo de MVP para plataforma de networking profesional.'
  }
];

// 🎨 PLANTILLAS DISPONIBLES
export const TEMP_TEMPLATES = [
  {
    id: 'tpl-1',
    name: 'Profesional',
    description: 'Diseño limpio y profesional para desarrolladores',
    category: 'developer' as const,
    isPremium: false
  },
  {
    id: 'tpl-2',
    name: 'Creativo',
    description: 'Diseño colorido perfecto para diseñadores',
    category: 'creative' as const,
    isPremium: false
  },
  {
    id: 'tpl-3',
    name: 'Minimalista',
    description: 'Diseño simple y elegante',
    category: 'minimal' as const,
    isPremium: true
  }
];

// 🔧 FUNCIONES HELPER
export const getTempUserProjects = (): Project[] => {
  return TEMP_PROJECTS.filter(project => project.userId === TEMP_USER.uid);
};

export const getTempProjectById = (id: string): Project | undefined => {
  return TEMP_PROJECTS.find(project => project.id === id);
};

export const getPublishedProjects = (): Project[] => {
  return TEMP_PROJECTS.filter(project => project.settings.published);
};

export const getDraftProjects = (): Project[] => {
  return TEMP_PROJECTS.filter(project => !project.settings.published);
};