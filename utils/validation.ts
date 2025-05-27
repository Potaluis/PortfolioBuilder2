export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (!password) return { valid: false, message: 'La contraseña es requerida' };
  if (password.length < 6) return { valid: false, message: 'La contraseña debe tener al menos 6 caracteres' };
  return { valid: true };
};

export const validateUsername = (username: string): { valid: boolean; message?: string } => {
  if (!username.trim()) return { valid: false, message: 'El nombre de usuario es requerido' };
  if (username.trim().length < 3) return { valid: false, message: 'El nombre debe tener al menos 3 caracteres' };
  return { valid: true };
};