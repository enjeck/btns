/**
 * Clipboard utility functions
 */

/**
 * Copy text to clipboard (legacy method for older browsers)
 * @param {string} text - Text to copy
 * @param {HTMLInputElement} inputElement - Hidden input element for copying
 * @returns {boolean} Success status
 */
const copyToClipboardLegacy = (text, inputElement) => {
  try {
    inputElement.value = text;
    inputElement.select();
    inputElement.setSelectionRange(0, 99999);
    document.execCommand('copy');
    return true;
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
};

/**
 * Copy text to clipboard using modern API with fallback
 * @param {string} text - Text to copy
 * @param {HTMLInputElement} inputElement - Hidden input element for fallback
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text, inputElement) => {
  // Try modern clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.warn('Clipboard API failed, falling back to legacy method:', error);
    }
  }

  // Fallback to legacy method
  return copyToClipboardLegacy(text, inputElement);
};

/**
 * Show tooltip with message
 * @param {HTMLElement} tooltip - Tooltip element
 * @param {string} message - Message to display
 */
export const showTooltip = (tooltip, message) => {
  if (tooltip) {
    tooltip.textContent = message;
  }
};
