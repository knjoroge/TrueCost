/**
 * TrueCost — Background Service Worker
 * Tracks cumulative impact stats and product history across browsing sessions.
 */

const DEFAULT_STATS = {
  productsViewed: 0,
  totalCarbon: 0,
  totalWater: 0,
  totalWaste: 0,
  totalEnergy: 0,
  totalDonation: 0
};

const DEFAULT_SETTINGS = {
  enabled: true,
  showCarbon: true,
  showWater: true,
  showWaste: true,
  showEnergy: true,
  showOzone: true,
  showAlternatives: true,
  maxHistory: 50
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(null, (existing) => {
    const init = {};
    if (!existing.stats)    init.stats = DEFAULT_STATS;
    if (!existing.history)  init.history = [];
    if (!existing.settings) init.settings = DEFAULT_SETTINGS;
    if (Object.keys(init).length > 0) {
      chrome.storage.local.set(init);
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.type === 'PRODUCT_VIEWED') {
    chrome.storage.local.get({ stats: DEFAULT_STATS, history: [], settings: DEFAULT_SETTINGS }, (result) => {
      // Update cumulative stats
      const stats = result.stats || { ...DEFAULT_STATS };
      stats.productsViewed = (stats.productsViewed || 0) + 1;
      stats.totalCarbon    = (stats.totalCarbon || 0) + (message.product.greenhouse || 0);
      stats.totalWater     = (stats.totalWater || 0) + (message.product.water || 0);
      stats.totalWaste     = (stats.totalWaste || 0) + (message.product.waste || 0);
      stats.totalEnergy    = (stats.totalEnergy || 0) + (message.product.energy || 0);
      stats.totalDonation  = (stats.totalDonation || 0) + (message.product.cost || 0);

      // Add to history
      const history = result.history || [];
      const maxHistory = result.settings?.maxHistory || 50;
      history.unshift({
        name: message.product.name,
        category: message.product.category || 'unknown',
        isEstimate: message.product.isEstimate || false,
        carbon: message.product.greenhouse || 0,
        water: message.product.water || 0,
        waste: message.product.waste || 0,
        energy: message.product.energy || 0,
        cost: message.product.cost || 0,
        timestamp: Date.now(),
        url: message.product.url || ''
      });

      // Trim history to max length
      if (history.length > maxHistory) {
        history.length = maxHistory;
      }

      chrome.storage.local.set({ stats, history });
    });
  }

  if (message.type === 'RESET_STATS') {
    chrome.storage.local.set({
      stats: { ...DEFAULT_STATS },
      history: []
    });
  }

  if (message.type === 'GET_DATA') {
    chrome.storage.local.get({ stats: DEFAULT_STATS, history: [], settings: DEFAULT_SETTINGS }, (result) => {
      sendResponse(result);
    });
    return true; // async response
  }

  if (message.type === 'SAVE_SETTINGS') {
    chrome.storage.local.set({ settings: message.settings });
  }
});
