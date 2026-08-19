/**
 * Configuração centralizada de URLs de API
 * Define os endpoints baseado no ambiente (desenvolvimento ou produção)
 */

const isDevelopment = import.meta.env.DEV;

// URL base da API
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3000' // Desenvolvimento
  : (import.meta.env.VITE_API_URL || 'https://seu-backend-render.onrender.com'); // Produção

// Endpoints da API
export const API_ENDPOINTS = {
  POSTS: `${API_BASE_URL}/api/posts`,
  POSTS_BATCH: `${API_BASE_URL}/api/posts/batch`,
};

export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

export default API_BASE_URL;
