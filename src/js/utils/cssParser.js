/**
 * CSS parsing and extraction utilities
 */

/**
 * Get stylesheet rules matching a selector
 * @param {string} selector - CSS selector to match
 * @returns {Array} Array of matching CSS rules
 */
export const getStylesheetRules = (selector) => {
  const allRules = [];
  
  // Iterate through all stylesheets
  for (let i = 0; i < document.styleSheets.length; i++) {
    const stylesheet = document.styleSheets[i];
    
    try {
      const rules = Array.from(stylesheet.cssRules || []);
      const matchingRules = rules.filter(
        (rule) => rule.selectorText && rule.selectorText.includes(selector)
      );
      allRules.push(...matchingRules);
    } catch (error) {
      // CORS error or other access issues - skip this stylesheet
      console.warn(`Cannot access stylesheet ${i}:`, error.message);
    }
  }
  
  return allRules;
};

/**
 * Create regex pattern for selector matching
 * @param {string} selector - CSS selector
 * @returns {RegExp} Regular expression for matching
 */
const createSelectorRegex = (selector) => {
  const escapedSelector = selector.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  return new RegExp(`${escapedSelector}(?:[:\\s].*)?$`);
};

/**
 * Extract matching selector from comma-separated selectors
 * @param {string} selectorText - Full selector text
 * @param {string} targetSelector - Target selector to match
 * @returns {string|null} Matching selector or null
 */
const extractMatchingSelector = (selectorText, targetSelector) => {
  if (!selectorText.includes(',')) {
    return selectorText;
  }

  const selectorArray = selectorText.split(',').map((s) => s.trim());
  const regexSelector = new RegExp(`${targetSelector}.*`);

  for (const selector of selectorArray) {
    const match = selector.match(regexSelector);
    if (match) return match[0];
  }

  return null;
};

/**
 * Parse CSS text and extract properties
 * @param {string} cssText - CSS rule text
 * @returns {Array<string>} Array of CSS properties
 */
const parseCssProperties = (cssText) => {
  const startIndex = cssText.indexOf('{');
  if (startIndex === -1) return [];

  const cssContent = cssText.substring(startIndex + 1, cssText.lastIndexOf('}'));
  return cssContent
    .split(';')
    .map((prop) => prop.trim())
    .filter((prop) => prop.length > 0);
};

/**
 * Get CSS for a specific selector
 * @param {string} selector - CSS selector
 * @param {Array} stylesheetRules - Array of stylesheet rules
 * @returns {Object} Object containing selectors and their CSS properties
 */
export const getSelectorCss = (selector, stylesheetRules) => {
  const selectorRegex = createSelectorRegex(selector);
  const selectors = [];
  const cssProperties = [];

  for (const rule of stylesheetRules) {
    const { selectorText, cssText } = rule;
    const matchingSelector = selectorText.match(selectorRegex);

    if (!matchingSelector) continue;

    const finalSelector = extractMatchingSelector(selectorText, selector);
    if (!finalSelector) continue;

    const properties = parseCssProperties(cssText);
    const selectorIndex = selectors.indexOf(finalSelector);

    if (selectorIndex === -1) {
      selectors.push(finalSelector);
      cssProperties.push(properties);
    } else {
      // Merge properties for duplicate selectors
      cssProperties[selectorIndex] = [
        ...cssProperties[selectorIndex],
        ...properties,
      ];
    }
  }

  return { selectors, cssProperties };
};

/**
 * Format CSS for display
 * @param {Array<string>} selectors - Array of CSS selectors
 * @param {Array<Array<string>>} cssProperties - Array of property arrays
 * @returns {string} Formatted CSS string
 */
export const formatCss = (selectors, cssProperties) => {
  let formattedCss = '';

  selectors.forEach((selector, index) => {
    formattedCss += `${selector} {\n`;
    cssProperties[index].forEach((property) => {
      formattedCss += `  ${property};\n`;
    });
    formattedCss += '}\n\n';
  });

  return formattedCss;
};
