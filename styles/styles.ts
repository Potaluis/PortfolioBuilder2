// styles/styles.ts
import { StyleSheet } from 'react-native';

export const portfolioStyles = StyleSheet.create({
  // Pantalla de Inicio
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  startCard: {
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.7,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
  },
  primaryButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2563eb',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  secondaryButtonText: {
    color: '#2563eb',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },

  // Modal de Autenticación
    modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    },
    modalContainer: {
    borderRadius: 16,
    padding: 32,  // Aumentar de 24 a 32
    width: '90%',  // Cambiar de 100% a 90%
    maxWidth: 500,  // Aumentar de 400 a 500
    minHeight: 400,  // Añadir altura mínima
    },
  authSlider: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  sliderButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  sliderButtonActive: {
    backgroundColor: '#2563eb',
  },
  sliderText: {
    fontWeight: '500',
    color: '#6b7280',
  },
  sliderTextActive: {
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  googleButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  googleButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
  cancelButton: {
    paddingVertical: 8,
  },
  cancelButtonText: {
    textAlign: 'center',
    opacity: 0.6,
  },

  // Pantalla Home
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  gridContainer: {
    padding: 24,
  },
  projectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  projectCard: {
    borderRadius: 12,
    padding: 24,
    width: '48%',
    height: 120,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  projectCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  projectCardSubtitle: {
    fontSize: 12,
    marginTop: 8,
    opacity: 0.6,
  },
  newProjectCard: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 24,
    width: '48%',
    height: 120,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newProjectIcon: {
    fontSize: 32,
    color: 'white',
    marginBottom: 8,
  },
  newProjectText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },

  // Modal de Configuración
  configModalContainer: {
    flex: 1,
  },
  configHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  configTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  configScrollView: {
    flex: 1,
    padding: 24,
  },
  configSection: {
    marginBottom: 32,
  },
  configSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  sectionName: {
    fontSize: 14,
  },
  optionButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionButtonActive: {
    backgroundColor: '#2563eb',
  },
  optionButtonText: {
    textAlign: 'center',
    color: '#374151',
  },
  optionButtonTextActive: {
    color: 'white',
  },
  rowConfigContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rowConfigLabel: {
    fontSize: 14,
  },
  numberButtons: {
    flexDirection: 'row',
    gap: 4,
  },
  numberButton: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 4,
  },
  numberButtonActive: {
    backgroundColor: '#2563eb',
  },
  numberButtonText: {
    color: '#374151',
    fontWeight: '500',
  },
  numberButtonTextActive: {
    color: 'white',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  cancelModalButton: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    paddingVertical: 12,
    borderRadius: 8,
  },
  cancelModalButtonText: {
    textAlign: 'center',
    color: '#374151',
    fontWeight: '600',
  },
  createButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },

  // Pantalla del Proyecto
  projectHeader: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    color: '#2563eb',
    fontWeight: '600',
  },
  projectHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  projectScrollView: {
    flex: 1,
    padding: 24,
  },
  projectContent: {
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  projectContentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  configDisplaySection: {
    marginBottom: 24,
  },
  configDisplayTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  configDisplayItem: {
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.8,
  },
  placeholderContainer: {
    backgroundColor: '#dbeafe',
    padding: 16,
    borderRadius: 8,
  },
  placeholderText: {
    color: '#1e40af',
    textAlign: 'center',
    fontWeight: '500',
  },
});