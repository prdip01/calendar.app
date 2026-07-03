/**
 * Formats a number to Indian Rupee (₹) currency format.
 * @param {number|string} amount 
 * @returns {string} Formatted currency
 */
export const formatCurrency = (amount) => {
  const val = parseFloat(amount);
  if (isNaN(val)) return '₹0.00';
  
  // Format to Rupee currency. Using en-IN handles the grouping correctly (e.g. 1,00,000)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(val);
};

/**
 * Counts the number of words in a string.
 * @param {string} text 
 * @returns {number}
 */
export const getWordCount = (text) => {
  if (!text || typeof text !== 'string') return 0;
  const cleanText = text.trim();
  return cleanText === '' ? 0 : cleanText.split(/\s+/).length;
};

/**
 * Custom lightweight Markdown parser for Pra-Calendar.
 * Supports:
 * - `# Heading` -> `<div class="md-heading">...</div>`
 * - `## Subheading` -> `<div class="md-subheading">...</div>`
 * - `**bold text**` -> `<span class="md-bold">...</span>`
 * - `[color:value](text)` -> `<span style="color: value">...</span>`
 * @param {string} text 
 * @returns {string} Sanitized HTML string
 */
export const parseMarkdown = (text) => {
  if (!text) return '';

  // 1. Basic HTML sanitization to prevent XSS
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // 2. Parse inline color tags: [color:red](text here) or [color:#FFD700](text here)
  // Match format: [color:COLOR_NAME_OR_HEX](TEXT_CONTENT)
  html = html.replace(/\[color:([^\]]+)\]\(([^)]+)\)/g, (match, color, content) => {
    // Basic verification of color input (words or hex code) to maintain styling safety
    const cleanColor = color.trim().replace(/[^a-zA-Z0-9#(), ]/g, '');
    return `<span style="color: ${cleanColor}">${content}</span>`;
  });

  // 3. Process lines for block elements and bold text
  const lines = html.split('\n');
  const parsedLines = lines.map(line => {
    let cleanLine = line;

    // Check for Headings
    if (cleanLine.startsWith('# ')) {
      const headingText = cleanLine.substring(2);
      return `<h3 class="md-heading">${headingText}</h3>`;
    }
    
    // Check for Subheadings
    if (cleanLine.startsWith('## ')) {
      const subheadingText = cleanLine.substring(3);
      return `<h4 class="md-subheading">${subheadingText}</h4>`;
    }

    // Bold text matching **text**
    cleanLine = cleanLine.replace(/\*\*(.*?)\*\*/g, '<span class="md-bold">$1</span>');

    // Return empty lines as blank spacing blocks rather than omitting them
    if (cleanLine.trim() === '') {
      return '<div class="md-space" style="height: 0.5rem;"></div>';
    }

    return `<p class="md-text">${cleanLine}</p>`;
  });

  return parsedLines.join('');
};
