/**
 * Main application entry point
 */
import { ANIMATIONS } from './constants.js';
import { initializeEventListeners } from './modules/eventHandlers.js';

/**
 * Initialize the application
 */
const initApp = () => {
  // Small delay to ensure DOM is ready
  setTimeout(() => {
    initializeEventListeners();
    console.log('Button showcase application initialized');
  }, ANIMATIONS.DISPLAY_DELAY);
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
