/**
 * TrueCost — Popup Script
 * Dashboard with stats, impact chart, and product history.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Element refs ---- */
  const toggleEl    = document.getElementById('toggle-enabled');
  const carbonEl    = document.getElementById('stat-carbon');
  const waterEl     = document.getElementById('stat-water');
  const wasteEl     = document.getElementById('stat-waste');
  const energyEl    = document.getElementById('stat-energy');
  const productsEl  = document.getElementById('stat-products');
  const donationEl  = document.getElementById('stat-donation');
  const resetBtn    = document.getElementById('btn-reset');
  const chartBars   = document.getElementById('chart-bars');
  const historyList = document.getElementById('history-list');
  const optionsLink = document.getElementById('open-options');
  const tabBtns     = document.querySelectorAll('.tab-btn');

  /* ---- Helpers ---- */
  function fmt(n) {
    if (n == null) return '0';
    if (n >= 1000) return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
    if (n >= 10)   return n.toFixed(1);
    return n.toFixed(2);
  }

  function timeAgo(ts) {
    const diff = Date.now() - ts;
    const mins  = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days  = Math.floor(diff / 86400000);
    if (mins < 1)   return 'Just now';
    if (mins < 60)  return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }

  /* ---- Impact Breakdown Chart ---- */
  function renderChart(stats) {
    const data = [
      { label: 'Carbon', value: stats.totalCarbon || 0, color: '#60a5fa', unit: 'kgCO₂e' },
      { label: 'Water',  value: stats.totalWater || 0,  color: '#2dd4bf', unit: 'L' },
      { label: 'Waste',  value: stats.totalWaste || 0,  color: '#f87171', unit: 'Kg' },
      { label: 'Energy', value: stats.totalEnergy || 0, color: '#fbbf24', unit: 'MJ' }
    ];

    const max = Math.max(...data.map(d => d.value), 1);
    const hasData = data.some(d => d.value > 0);

    if (!hasData) {
      chartBars.innerHTML = '<div class="chart-empty">Browse some products to see your impact chart</div>';
      return;
    }

    chartBars.innerHTML = '';
    for (const d of data) {
      const pct = Math.max((d.value / max) * 100, 2);
      const row = document.createElement('div');
      row.className = 'chart-row';
      row.innerHTML = `
        <span class="chart-label">${d.label}</span>
        <div class="chart-track">
          <div class="chart-bar" style="width:${pct}%; background:${d.color};"></div>
        </div>
        <span class="chart-val">${fmt(d.value)} ${d.unit}</span>
      `;
      chartBars.appendChild(row);
    }
  }

  /* ---- Product History ---- */
  function renderHistory(history) {
    if (!history || history.length === 0) {
      historyList.innerHTML = '<div class="history-empty">No products viewed yet. Browse Amazon to start tracking.</div>';
      return;
    }

    historyList.innerHTML = '';
    for (const item of history) {
      const row = document.createElement('div');
      row.className = 'history-item';

      const categoryIcons = {
        shoes: '👟', computers: '💻', phones: '📱', clothing: '👕',
        appliances: '🏠', single_use: '🗑️', furniture: '🪑',
        networking: '📡', toys: '🧸', beauty: '💄', unknown: '📦'
      };
      const icon = categoryIcons[item.category] || '📦';

      row.innerHTML = `
        <div class="history-icon">${icon}</div>
        <div class="history-info">
          <div class="history-name">${item.name}</div>
          <div class="history-meta">
            ${item.isEstimate ? '<span class="history-badge">EST</span>' : ''}
            <span>${fmt(item.carbon)} kgCO₂e</span>
            <span>•</span>
            <span>${fmt(item.waste)} Kg waste</span>
          </div>
        </div>
        <div class="history-time">${timeAgo(item.timestamp)}</div>
      `;

      if (item.url) {
        row.style.cursor = 'pointer';
        row.addEventListener('click', () => chrome.tabs.create({ url: item.url }));
      }

      historyList.appendChild(row);
    }
  }

  /* ---- Refresh all data ---- */
  function refresh() {
    chrome.runtime.sendMessage({ type: 'GET_DATA' }, (response) => {
      if (!response) {
        // Fallback for direct storage read
        chrome.storage.local.get({ enabled: true, stats: {}, history: [], settings: {} }, processData);
        return;
      }
      processData(response);
    });
  }

  function processData(result) {
    const settings = result.settings || {};
    toggleEl.checked = settings.enabled !== false;

    const s = result.stats || {};
    carbonEl.textContent   = fmt(s.totalCarbon || 0);
    waterEl.textContent    = fmt(s.totalWater || 0);
    wasteEl.textContent    = fmt(s.totalWaste || 0);
    energyEl.textContent   = fmt(s.totalEnergy || 0);
    productsEl.textContent = (s.productsViewed || 0).toString();
    donationEl.textContent = '$' + (s.totalDonation || 0).toFixed(2);

    renderChart(s);
    renderHistory(result.history || []);
  }

  /* ---- Tab switching ---- */
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  /* ---- Toggle ---- */
  toggleEl.addEventListener('change', () => {
    chrome.storage.local.get({ settings: {} }, (result) => {
      const settings = result.settings || {};
      settings.enabled = toggleEl.checked;
      chrome.runtime.sendMessage({ type: 'SAVE_SETTINGS', settings });
    });
  });

  /* ---- Reset ---- */
  resetBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'RESET_STATS' });
    setTimeout(refresh, 150);
  });

  /* ---- Options link ---- */
  optionsLink.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });

  refresh();
});
