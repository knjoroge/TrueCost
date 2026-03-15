/**
 * TrueCost — Data Lookup Module
 * Handles product lookup by ASIN and category-based fallbacks.
 */

const TrueCostData = (() => {

  /**
   * Category keywords mapped to category keys.
   * Used to guess a product category from the page title.
   */
  const CATEGORY_KEYWORDS = {
    shoes:      ['shoe', 'sneaker', 'boot', 'sandal', 'slipper', 'running', 'trainer', 'footwear', 'loafer', 'heel', 'clog'],
    computers:  ['laptop', 'computer', 'macbook', 'chromebook', 'notebook', 'desktop', 'pc', 'workstation', 'monitor'],
    phones:     ['phone', 'iphone', 'galaxy', 'pixel', 'smartphone', 'ipad', 'tablet', 'kindle'],
    clothing:   ['shirt', 'pant', 'jean', 'jacket', 'dress', 'sweater', 'hoodie', 'coat', 'blouse', 'skirt', 'shorts', 'sock', 'underwear', 't-shirt'],
    appliances: ['coffee maker', 'blender', 'vacuum', 'toaster', 'microwave', 'instant pot', 'air fryer', 'dishwasher', 'dryer', 'washer', 'oven'],
    single_use: ['disposable', 'paper plate', 'plastic cup', 'trash bag', 'k-cup', 'pod', 'ziploc', 'paper towel', 'napkin', 'wrap', 'foil'],
    furniture:  ['chair', 'desk', 'table', 'shelf', 'bookshelf', 'couch', 'sofa', 'bed', 'mattress', 'dresser', 'cabinet'],
    networking: ['router', 'switch', 'modem', 'ethernet', 'wi-fi', 'wifi', 'access point', 'hub'],
    toys:       ['lego', 'toy', 'game', 'puzzle', 'action figure', 'doll', 'board game', 'play set'],
    beauty:     ['moisturizer', 'lotion', 'body wash', 'shampoo', 'conditioner', 'cream', 'skincare', 'makeup', 'perfume', 'serum', 'sunscreen']
  };

  /**
   * Look up a product by ASIN.
   * @param {string} asin
   * @returns {object|null}
   */
  function findByAsin(asin) {
    if (!asin) return null;
    return TRUECOST_PRODUCTS[asin.toUpperCase()] || null;
  }

  /**
   * Guess category from a product title string.
   * @param {string} title
   * @returns {string}  category key or 'unknown'
   */
  function guessCategory(title) {
    if (!title) return 'unknown';
    const lower = title.toLowerCase();
    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      for (const kw of keywords) {
        if (lower.includes(kw)) return category;
      }
    }
    return 'unknown';
  }

  /**
   * Get the best product data for the current page.
   * Priority: exact ASIN match → category estimate → generic estimate
   * @param {string} asin
   * @param {string} title  - product title from the page
   * @returns {{ product: object, isEstimate: boolean, label: string }}
   */
  function lookup(asin, title) {
    const exact = findByAsin(asin);
    if (exact) {
      return { product: exact, isEstimate: false, label: exact.name };
    }

    const category = guessCategory(title);
    const estimate = TRUECOST_CATEGORY_ESTIMATES[category];
    return {
      product: estimate,
      isEstimate: true,
      label: estimate.label
    };
  }

  /**
   * Format a number nicely (with commas).
   */
  function fmt(n, decimals = 0) {
    if (n == null) return '—';
    return n.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  /**
   * Format a currency amount.
   */
  function fmtMoney(n) {
    if (n == null) return '$0.00';
    return '$' + n.toFixed(2);
  }

  return { findByAsin, guessCategory, lookup, fmt, fmtMoney };
})();
