export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  reason: string;
}

export const sendContactMessage = async (data: ContactMessage): Promise<boolean> => {
  try {
    // En producción, integrar con un servicio de email como:
    // - EmailJS
    // - SendGrid
    // - Formspree
    // - Firebase Functions + Nodemailer
    
    console.log('Enviando mensaje de contacto:', data);
    
    // Simulación de delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return true;
  } catch (error) {
    console.error('Error enviando mensaje:', error);
    return false;
  }
};
