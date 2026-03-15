# TrueCost — Environmental Impact Tracker

> Chrome extension that reveals the **true environmental cost** of products on Amazon — carbon emissions, water usage, energy consumption, and waste — right on the product page.

Originally built at the [2016 CleanWeb Hackathon](http://devpost.com/software/truecost), fully modernized for **Manifest V3** in 2026.

## Features

- 🌿 **Impact Card** — injected directly into Amazon product pages near "Add to Cart"
- 📊 **38+ products** across 10 categories (shoes, electronics, clothing, furniture, single-use items, etc.)
- ♻️ **Category fallback** — shows estimated impact for products not in the database
- 📈 **Dashboard popup** — tracks cumulative environmental impact with bar chart visualization
- 📜 **Product history** — timestamped log of every product you've viewed
- ⭐ **Eco alternatives** — suggests greener products in the same category with % impact reduction
- 🌍 **16 Amazon regions** — works on amazon.com, .co.uk, .ca, .de, .fr, .it, .es, .co.jp, .in, .com.br, .com.au, .com.mx, .nl, .sg, .se, .pl
- ⚙️ **Options page** — toggle individual impact categories and configure history length
- 🎚️ **Enable/disable toggle** — turn the overlay on or off from the popup
- 💚 **Donate checkbox** — opt-in to offset your environmental impact

## Installation (Developer Mode)

1. Clone this repository:
   ```bash
   git clone https://github.com/truecost4env/truecost-chrome-extension.git
   ```
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (toggle in top-right)
4. Click **Load unpacked** and select the `truecost-chrome-extension` directory
5. Browse any product on [amazon.com](https://www.amazon.com) — the impact card will appear!

## How to Use

### 🛒 Viewing Product Impact
1. Go to any product page on [amazon.com](https://www.amazon.com)
2. Scroll to the **"Add to Cart"** section — a **TrueCost impact card** will appear just below it
3. The card shows the product's environmental footprint:
   - ☁️ **Carbon** — greenhouse gas emissions (kgCO₂e)
   - ⚡ **Energy** — energy consumed during manufacturing (MJ)
   - 💧 **Water** — water used in production (Liters)
   - 🗑️ **Waste** — solid waste generated (Kg)
   - 🌀 **Ozone** — ozone-depleting substances (kgNMVOCe)
4. If the exact product is in our database, you'll see precise data. Otherwise, you'll see a category-level **estimate** (marked with an "Estimate" badge)

### 💚 Offsetting Your Impact
- Each impact card includes a **donation checkbox** (checked by default)
- The suggested donation amount covers the estimated cost to offset that product's environmental footprint
- Uncheck the box if you'd prefer not to donate for that product

### 📊 Dashboard Popup
1. Click the **TrueCost icon** in your Chrome toolbar to open the dashboard
2. View your **cumulative stats** — total carbon, water, waste, and energy across all products you've browsed
3. See how many products you've viewed and your total offset donation amount
4. **Toggle** the extension on/off using the switch in the top-right corner
5. Click **Reset Stats** to clear your cumulative tracking data

### 🔄 Navigating Between Products
- The extension automatically detects when you navigate to a new product page (including Amazon's single-page navigation) and updates the impact card accordingly

## Project Structure

```
truecost-chrome-extension/
├── manifest.json           # Manifest V3 extension config
├── LICENSE                 # MIT license
├── icons/                  # Extension icons (16, 48, 128px)
├── data/
│   └── products.js         # Product database + category estimates
├── src/
│   ├── content.js          # Content script (impact card + alternatives)
│   ├── content.css         # Impact card + alternatives styles
│   ├── data.js             # Product lookup module
│   └── background.js       # Service worker (stats + history)
├── popup/
│   ├── popup.html          # Dashboard popup (tabs, chart, history)
│   ├── popup.css           # Popup styles
│   └── popup.js            # Popup logic
└── options/
    ├── options.html         # Settings page
    ├── options.css          # Settings styles
    └── options.js           # Settings logic
```

## Data Sources

Environmental footprint data is sourced from manufacturer sustainability reports including Nike, Dell, HP, Apple, Samsung, and Levi Strauss, as well as the EU Product Environmental Footprint (PEF) methodology.

## Demo Video (Original 2016)

[![Demo Video](http://img.youtube.com/vi/7tInzzamB-A/0.jpg)](http://www.youtube.com/watch?v=7tInzzamB-A)

## License

MIT
