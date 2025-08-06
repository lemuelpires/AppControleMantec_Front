/**
 * Sistema de Z-Index Padronizado
 * 
 * Esta arquivo centraliza todos os valores de z-index seguindo as melhores práticas
 * para evitar conflitos e manter uma hierarquia lógica consistente.
 */

export const Z_INDEX = {
  // Base - Conteúdo normal e elementos decorativos
  BASE: 0,
  CONTENT: 1,
  DECORATIVE: 2,
  
  // Elementos de interface baixos
  PAGE_ELEMENTS: 10,
  
  // Dropdowns e tooltips
  DROPDOWN: 200,
  TOOLTIP: 250,
  
  // Menu e navegação
  HEADER: 100,
  MENU_OVERLAY: 300,
  SIDEBAR: 350,
  
  // Modais
  MODAL_BACKDROP: 400,
  MODAL_CONTENT: 410,
  MODAL_IMAGE: 430,
  MODAL_USER: 450,
  MODAL_LOGIN: 500, // Modal de login base
  MODAL_RESET_PASSWORD: 550, // Deve aparecer SOBRE o login quando chamado de lá
  
  // Notificações e alerts
  NOTIFICATION: 600,
  ALERT: 650,
  
  // Debug e desenvolvimento
  DEBUG: 9000,
  
  // Formulários e componentes internos
  FORM_ELEMENTS: 50,
  FORM_OVERLAY: 60,
};

/**
 * Utilitário para verificar conflitos de z-index
 */
export const checkZIndexConflicts = () => {
  const values = Object.values(Z_INDEX);
  const duplicates = values.filter((item, index) => values.indexOf(item) !== index);
  
  if (duplicates.length > 0) {
    console.warn('Z-Index conflicts detected:', duplicates);
  }
  
  return duplicates.length === 0;
};

export default Z_INDEX;
