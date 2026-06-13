# TrueCost

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Chrome Extension](https://img.shields.io/badge/Platform-Chrome-yellow.svg)](https://developer.chrome.com/docs/extensions/)

A Chrome extension that shows the environmental cost of products on Amazon — how much carbon, water, energy, and waste goes into making them.

Built at the [2016 CleanWeb Hackathon](http://devpost.com/software/truecost). Updated for modern Chrome in 2026.

---

## What it does

When you visit an Amazon product page, TrueCost adds a card below the "Add to Cart" button showing:

| Metric | What it measures |
|--------|-----------------|
| ☁️ Carbon | Greenhouse gases released during manufacturing (kg CO₂) |
| ⚡ Energy | Electricity and fuel used to produce it (megajoules) |
| 💧 Water | Water consumed during production (liters) |
| 🗑️ Waste | Solid waste created (kg) |
| 🌀 Ozone | Ozone-depleting chemicals released |

It covers 38+ products across 10 categories. For products not in the database, it shows a rough estimate for that category, labeled "Estimate."

## Features

- Works on 16 Amazon sites (US, UK, Canada, Germany, Japan, and more)
- Suggests greener options in the same product category
- Tracks your cumulative environmental impact in a dashboard
- Keeps a browsing history so you can look up products again
- Shows the estimated dollar cost to offset each product's impact
- Settings to show or hide specific metrics

## Screenshots

| Impact Card | Dashboard | Settings |
|---|---|---|
| *(shown below Add to Cart)* | *(cumulative stats + chart)* | *(toggle categories)* |

## Install

Chrome doesn't allow sideloaded extensions to be shared publicly, but you can run it yourself in developer mode:

1. Clone this repo:
   ```bash
   git clone https://github.com/truecost4env/truecost-chrome-extension.git
   ```
2. Open Chrome and go to `chrome://extensions`
3. Turn on **Developer mode** (toggle in the top-right)
4. Click **Load unpacked** and select the cloned `TrueCost` folder
5. Visit any supported Amazon product page — the impact card appears automatically

## How to use

**On a product page:** The TrueCost card appears just below the "Add to Cart" section. If the product is in the database, you'll see exact numbers. Otherwise you'll see a category average marked "Estimate."

**Dashboard popup:** Click the TrueCost icon in your Chrome toolbar. It shows your running totals across all products you've browsed, plus a chart and history list.

**Settings:** Click ⚙ Settings in the popup footer to choose which metrics to show and how many items to keep in your history.

**Turning it off:** Use the toggle in the top-right of the popup. The extension stays installed but stops showing cards.

**Clearing your data:** Click "Reset Stats" in the dashboard. This wipes all totals and history.

## Supported Amazon sites

amazon.com · amazon.co.uk · amazon.ca · amazon.de · amazon.fr · amazon.it · amazon.es · amazon.co.jp · amazon.in · amazon.com.br · amazon.com.au · amazon.com.mx · amazon.nl · amazon.sg · amazon.se · amazon.pl

## Project layout

```
TrueCost/
├── manifest.json        # Extension config
├── data/
│   └── products.js      # Product database and category estimates
├── src/
│   ├── content.js       # Injects the impact card into Amazon pages
│   ├── content.css      # Card styles
│   ├── data.js          # Product lookup logic
│   └── background.js    # Tracks stats and history in the background
├── popup/               # Dashboard popup (HTML, CSS, JS)
└── options/             # Settings page (HTML, CSS, JS)
```

## Where the data comes from

Impact numbers come from manufacturer sustainability reports — Nike, Dell, HP, Apple, Samsung, and Levi Strauss — as well as [EU environmental standards](https://environment.ec.europa.eu/topics/circular-economy/green-claims/product-environmental-footprint_en). The dollar figures represent what it would cost to offset each product's environmental footprint.

## Contributing

Pull requests are welcome. For bigger changes, open an issue first so we can discuss the approach.

1. Fork this repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes
4. Open a pull request

## License

MIT
