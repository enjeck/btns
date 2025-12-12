/**
 * DOM utility functions
 */

/**
 * Get element by selector
 * @param {string} selector - CSS selector
 * @returns {HTMLElement|null}
 */
export const getElement = (selector) => document.querySelector(selector);

/**
 * Get all elements by selector
 * @param {string} selector - CSS selector
 * @returns {NodeList}
 */
export const getAllElements = (selector) => document.querySelectorAll(selector);

/**
 * Set element text content
 * @param {string} selector - CSS selector
 * @param {string} text - Text content
 */
export const setText = (selector, text) => {
  const element = getElement(selector);
  if (element) element.textContent = text;
};

/**
 * Set element style property
 * @param {string} selector - CSS selector
 * @param {string} property - CSS property
 * @param {string} value - CSS value
 */
export const setStyle = (selector, property, value) => {
  const element = getElement(selector);
  if (element) element.style[property] = value;
};

/**
 * Clear element content
 * @param {string} selector - CSS selector
 */
export const clearContent = (selector) => {
  const element = getElement(selector);
  if (element) element.innerHTML = '';
};
