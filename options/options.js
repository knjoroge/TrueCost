/**
 * TrueCost — Options Page Script
 * Loads and saves user preferences.
 */

document.addEventListener('DOMContentLoaded', () => {

  const fields = {
    showCarbon:        document.getElementById('opt-carbon'),
    showEnergy:        document.getElementById('opt-energy'),
    showWater:         document.getElementById('opt-water'),
    showWaste:         document.getElementById('opt-waste'),
    showOzone:         document.getElementById('opt-ozone'),
    showAlternatives:  document.getElementById('opt-alts'),
    maxHistory:        document.getElementById('opt-history-len')
  };

  const saveBtn    = document.getElementById('btn-save');
  const saveStatus = document.getElementById('save-status');

  // Load current settings
  chrome.storage.local.get({ settings: {} }, (result) => {
    const s = result.settings || {};
    for (const [key, el] of Object.entries(fields)) {
      if (el.type === 'checkbox') {
        el.checked = s[key] !== false; // default true
      } else if (el.tagName === 'SELECT') {
        el.value = (s[key] || 50).toString();
      }
    }
  });

  // Save settings — preserve enabled state set by popup toggle
  saveBtn.addEventListener('click', () => {
    chrome.storage.local.get({ settings: {} }, (current) => {
      const settings = { ...current.settings };
      for (const [key, el] of Object.entries(fields)) {
        if (el.type === 'checkbox') {
          settings[key] = el.checked;
        } else if (el.tagName === 'SELECT') {
          settings[key] = parseInt(el.value, 10);
        }
      }

      chrome.runtime.sendMessage({ type: 'SAVE_SETTINGS', settings });

      saveStatus.textContent = '✓ Settings saved';
      saveStatus.classList.add('visible');
      setTimeout(() => saveStatus.classList.remove('visible'), 2000);
    });
  });

  const resetDefaultsBtn = document.getElementById('btn-reset-defaults');
  if (resetDefaultsBtn) {
    resetDefaultsBtn.addEventListener('click', () => {
      const defaults = {
        showCarbon: true, showEnergy: true, showWater: true,
        showWaste: true, showOzone: true, showAlternatives: true, maxHistory: 50
      };
      for (const [key, el] of Object.entries(fields)) {
        if (el.type === 'checkbox') el.checked = defaults[key] ?? true;
        else if (el.tagName === 'SELECT') el.value = String(defaults[key] ?? 50);
      }
      saveStatus.textContent = '✓ Defaults restored — click Save to apply';
      saveStatus.classList.add('visible');
      setTimeout(() => saveStatus.classList.remove('visible'), 3000);
    });
  }
});
