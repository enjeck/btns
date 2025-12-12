/**
 * Code display module - handles showing HTML and CSS code
 */
import { SELECTORS, ANIMATIONS } from '../constants.js';
import { setText, setStyle, clearContent } from '../utils/domUtils.js';
import { getStylesheetRules, getSelectorCss, formatCss } from '../utils/cssParser.js';

/**
 * Display HTML code for a button
 * @param {HTMLElement} button - Button element
 */
export const displayHtmlCode = (button) => {
  const htmlCode = button.outerHTML;
  setText(SELECTORS.HTML_CODE, htmlCode);
};

/**
 * Display CSS code for button classes
 * @param {Array<string>} classes - Array of CSS class names
 */
export const displayCssCode = (classes) => {
  clearContent(SELECTORS.CSS_CODE);
  const cssCodeElement = document.querySelector(SELECTORS.CSS_CODE);

  classes.forEach((className) => {
    const selector = `.${className}`;
    const stylesheetRules = getStylesheetRules(selector);
    const { selectors, cssProperties } = getSelectorCss(selector, stylesheetRules);

    const formattedCss = formatCss(selectors, cssProperties);
    if (cssCodeElement) {
      cssCodeElement.innerHTML += formattedCss.replace(/\n/g, '<br>');
    }
  });
};

/**
 * Show code area panel
 */
export const showCodeArea = () => {
  const codeArea = document.querySelector(SELECTORS.CODE_AREA);
  if (codeArea) {
    codeArea.classList.add('active');
  }
};

/**
 * Hide code area panel
 */
export const hideCodeArea = () => {
  const codeArea = document.querySelector(SELECTORS.CODE_AREA);
  if (codeArea) {
    codeArea.classList.remove('active');
  }
};

/**
 * Extract CSS classes from element
 * @param {HTMLElement} element - DOM element
 * @returns {Array<string>} Array of class names
 */
export const extractClasses = (element) => {
  const classAttr = element.getAttribute('class');
  return classAttr ? classAttr.split(' ').filter((cls) => cls.trim()) : [];
};
