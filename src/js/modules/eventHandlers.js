/**
 * Event handlers module
 */
import { SELECTORS, MESSAGES } from '../constants.js';
import { getElement, getAllElements } from '../utils/domUtils.js';
import { copyToClipboard, showTooltip } from '../utils/clipboard.js';
import {
  displayHtmlCode,
  displayCssCode,
  showCodeArea,
  hideCodeArea,
  extractClasses,
} from './codeDisplay.js';

/**
 * Handle button click - display code
 * @param {Event} event - Click event
 */
const handleButtonClick = (event) => {
  event.preventDefault();
  const button = event.currentTarget;

  // Show code area
  showCodeArea();

  // Display HTML
  displayHtmlCode(button);

  // Display CSS
  const classes = extractClasses(button);
  displayCssCode(classes);
};

/**
 * Handle copy HTML button click
 * @param {Event} event - Click event
 */
const handleCopyHtml = async (event) => {
  const htmlCode = getElement(SELECTORS.HTML_CODE)?.textContent || '';
  const clipboardHolder = getElement(SELECTORS.CLIPBOARD_HOLDER);
  const tooltip = getElement(SELECTORS.HTML_TOOLTIP);

  const success = await copyToClipboard(htmlCode, clipboardHolder);
  if (success) {
    showTooltip(tooltip, MESSAGES.COPIED_HTML);
  }
};

/**
 * Handle copy CSS button click
 * @param {Event} event - Click event
 */
const handleCopyCss = async (event) => {
  const cssCode = getElement(SELECTORS.CSS_CODE)?.textContent || '';
  const clipboardHolder = getElement(SELECTORS.CLIPBOARD_HOLDER);
  const tooltip = getElement(SELECTORS.CSS_TOOLTIP);

  const success = await copyToClipboard(cssCode, clipboardHolder);
  if (success) {
    showTooltip(tooltip, MESSAGES.COPIED_CSS);
  }
};

/**
 * Reset tooltip text on mouse leave
 * @param {string} tooltipSelector - Tooltip selector
 */
const handleTooltipLeave = (tooltipSelector) => {
  const tooltip = getElement(tooltipSelector);
  showTooltip(tooltip, MESSAGES.COPY_TO_CLIPBOARD);
};

/**
 * Handle close icon click
 */
const handleCloseClick = () => {
  hideCodeArea();
};

/**
 * Initialize all event listeners
 */
export const initializeEventListeners = () => {
  // Button clicks
  const buttons = getAllElements(SELECTORS.BUTTON);
  buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
  });

  // Copy HTML
  const copyHtmlBtn = getElement(SELECTORS.COPY_HTML);
  if (copyHtmlBtn) {
    copyHtmlBtn.addEventListener('click', handleCopyHtml);
    copyHtmlBtn.addEventListener('mouseleave', () =>
      handleTooltipLeave(SELECTORS.HTML_TOOLTIP)
    );
  }

  // Copy CSS
  const copyCssBtn = getElement(SELECTORS.COPY_CSS);
  if (copyCssBtn) {
    copyCssBtn.addEventListener('click', handleCopyCss);
    copyCssBtn.addEventListener('mouseleave', () =>
      handleTooltipLeave(SELECTORS.CSS_TOOLTIP)
    );
  }

  // Close icon
  const closeIcon = getElement(SELECTORS.CLOSE_ICON);
  if (closeIcon) {
    closeIcon.addEventListener('click', handleCloseClick);
  }
};
