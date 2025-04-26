// utils/formatters.ts

/**
 * Format a date in French locale
 * @param date Date object to format
 * @returns Formatted date string
 */
export function formatDate(date: Date) {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  /**
   * Truncate text to specified length and add ellipsis
   * @param text Text to truncate
   * @param length Maximum length
   * @returns Truncated text
   */
  export function truncateText(text: string, length: number = 150) {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  }
  
  /**
   * Format number to French locale with thousand separators
   * @param num Number to format
   * @returns Formatted number string
   */
  export function formatNumber(num: number) {
    return new Intl.NumberFormat('fr-FR').format(num);
  }