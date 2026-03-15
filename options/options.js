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

  // Save settings
  saveBtn.addEventListener('click', () => {
    const settings = { enabled: true };
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
