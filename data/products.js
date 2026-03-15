/**
 * TrueCost Product Environmental Impact Database
 * -----------------------------------------------
 * Sources:
 *   - Nike Environmental Impact Reports (2024)
 *   - Dell / HP Product Carbon Footprint datasheets
 *   - Samsung / Apple Environmental Reports (2024-2025)
 *   - Levi Strauss sustainability data
 *   - EU Product Environmental Footprint (PEF) methodology
 *   - World Bank global water-pricing benchmarks
 *
 * Costs are denominated in USD and represent the estimated
 * externality cost to counteract each environmental impact.
 *
 * Structure per product:
 *   name            — human-readable product name
 *   category        — used for fallback estimates
 *   greenhouse_footprint  — { usage (kgCO2e), unit, cost }
 *   energy_footprint      — { usage (MJ), unit }
 *   water_footprint       — { usage (Liters), unit, cost }
 *   waste_footprint       — { usage (Kg), unit, cost }
 *   ozone_footprint       — { usage (kgNMVOCe), unit, cost }
 *   total_footprint_cost  — sum of all individual costs
 */

const TRUECOST_PRODUCTS = {

  /* =========================================================
     SHOES
     ========================================================= */
  "B002RP8YH2": {
    name: "Nike Air Pegasus 25",
    category: "shoes",
    energy_footprint:     { usage: 204.23, unit: "MJ" },
    greenhouse_footprint: { usage: 13.76, unit: "kgCO2e", cost: 0.50 },
    water_footprint:      { usage: 4424, unit: "Liters", cost: 0.13 },
    waste_footprint:      { usage: 1.04, unit: "Kg", cost: 0.08 },
    ozone_footprint:      { usage: 0.101, unit: "kgNMVOCe", cost: 0.14 },
    total_footprint_cost: 0.85
  },
  "B00DP3RXMC": {
    name: "Nike Air Pegasus 30",
    category: "shoes",
    energy_footprint:     { usage: 178.77, unit: "MJ" },
    greenhouse_footprint: { usage: 11.96, unit: "kgCO2e", cost: 0.43 },
    water_footprint:      { usage: 3733, unit: "Liters", cost: 0.11 },
    waste_footprint:      { usage: 0.95, unit: "Kg", cost: 0.07 },
    ozone_footprint:      { usage: 0.082, unit: "kgNMVOCe", cost: 0.12 },
    total_footprint_cost: 0.73
  },
  "B00IOQLDIA": {
    name: "Nike Flyknit Lunar 2",
    category: "shoes",
    energy_footprint:     { usage: 156.07, unit: "MJ" },
    greenhouse_footprint: { usage: 10.88, unit: "kgCO2e", cost: 0.39 },
    water_footprint:      { usage: 3868, unit: "Liters", cost: 0.11 },
    waste_footprint:      { usage: 0.67, unit: "Kg", cost: 0.05 },
    ozone_footprint:      { usage: 0.081, unit: "kgNMVOCe", cost: 0.11 },
    total_footprint_cost: 0.66
  },
  "B0CZK3MNLP": {
    name: "Nike Pegasus 41",
    category: "shoes",
    energy_footprint:     { usage: 168.50, unit: "MJ" },
    greenhouse_footprint: { usage: 10.20, unit: "kgCO2e", cost: 0.37 },
    water_footprint:      { usage: 3100, unit: "Liters", cost: 0.09 },
    waste_footprint:      { usage: 0.78, unit: "Kg", cost: 0.06 },
    ozone_footprint:      { usage: 0.070, unit: "kgNMVOCe", cost: 0.10 },
    total_footprint_cost: 0.62
  },
  "B0D8L5T7QF": {
    name: "Adidas Ultraboost 5",
    category: "shoes",
    energy_footprint:     { usage: 190.00, unit: "MJ" },
    greenhouse_footprint: { usage: 12.50, unit: "kgCO2e", cost: 0.45 },
    water_footprint:      { usage: 4200, unit: "Liters", cost: 0.12 },
    waste_footprint:      { usage: 0.88, unit: "Kg", cost: 0.07 },
    ozone_footprint:      { usage: 0.092, unit: "kgNMVOCe", cost: 0.13 },
    total_footprint_cost: 0.77
  },
  "B0BXLY2QYS": {
    name: "New Balance Fresh Foam X 1080v13",
    category: "shoes",
    energy_footprint:     { usage: 195.60, unit: "MJ" },
    greenhouse_footprint: { usage: 13.10, unit: "kgCO2e", cost: 0.47 },
    water_footprint:      { usage: 4050, unit: "Liters", cost: 0.12 },
    waste_footprint:      { usage: 0.92, unit: "Kg", cost: 0.07 },
    ozone_footprint:      { usage: 0.088, unit: "kgNMVOCe", cost: 0.12 },
    total_footprint_cost: 0.78
  },

  /* =========================================================
     COMPUTERS & LAPTOPS
     ========================================================= */
  "B004MJ9O34": {
    name: "Dell Optiplex 780",
    category: "computers",
    greenhouse_footprint: { usage: 164, unit: "kgCO2e", cost: 5.90 },
    waste_footprint:      { usage: 8.20, unit: "Kg", cost: 0.62 },
    total_footprint_cost: 6.52
  },
  "B016L3NFO2": {
    name: "Dell FX-100",
    category: "computers",
    greenhouse_footprint: { usage: 33.6, unit: "kgCO2e", cost: 1.21 },
    waste_footprint:      { usage: 1.50, unit: "Kg", cost: 0.11 },
    total_footprint_cost: 1.32
  },
  "B00197YHHK": {
    name: "HP 350",
    category: "computers",
    greenhouse_footprint: { usage: 108, unit: "kgCO2e", cost: 3.89 },
    waste_footprint:      { usage: 5.40, unit: "Kg", cost: 0.41 },
    total_footprint_cost: 4.30
  },
  "B002BH4N12": {
    name: "HP Mini 110-1030",
    category: "computers",
    greenhouse_footprint: { usage: 62.2, unit: "kgCO2e", cost: 2.24 },
    waste_footprint:      { usage: 2.10, unit: "Kg", cost: 0.16 },
    total_footprint_cost: 2.40
  },
  "B0CGXYG911": {
    name: "Apple MacBook Air 15\" M3",
    category: "computers",
    energy_footprint:     { usage: 820, unit: "MJ" },
    greenhouse_footprint: { usage: 147, unit: "kgCO2e", cost: 5.29 },
    water_footprint:      { usage: 1890, unit: "Liters", cost: 0.05 },
    waste_footprint:      { usage: 1.24, unit: "Kg", cost: 0.09 },
    total_footprint_cost: 5.43
  },
  "B0DFQ4Q5T3": {
    name: "Dell XPS 14 (2025)",
    category: "computers",
    energy_footprint:     { usage: 1100, unit: "MJ" },
    greenhouse_footprint: { usage: 310, unit: "kgCO2e", cost: 11.16 },
    water_footprint:      { usage: 2400, unit: "Liters", cost: 0.07 },
    waste_footprint:      { usage: 2.50, unit: "Kg", cost: 0.19 },
    total_footprint_cost: 11.42
  },
  "B0CX23V2ZK": {
    name: "Lenovo ThinkPad X1 Carbon Gen 12",
    category: "computers",
    energy_footprint:     { usage: 960, unit: "MJ" },
    greenhouse_footprint: { usage: 280, unit: "kgCO2e", cost: 10.08 },
    water_footprint:      { usage: 2100, unit: "Liters", cost: 0.06 },
    waste_footprint:      { usage: 1.85, unit: "Kg", cost: 0.14 },
    total_footprint_cost: 10.28
  },

  /* =========================================================
     PHONES & TABLETS
     ========================================================= */
  "B00IZ1XVAC": {
    name: "Samsung Galaxy S5",
    category: "phones",
    greenhouse_footprint: { usage: 16.98, unit: "kgCO2e", cost: 0.61 },
    waste_footprint:      { usage: 0.18, unit: "Kg", cost: 0.01 },
    total_footprint_cost: 0.62
  },
  "B002M3SOBU": {
    name: "Apple iPod Touch 8GB (3rd gen)",
    category: "phones",
    greenhouse_footprint: { usage: 7.5, unit: "kgCO2e", cost: 0.27 },
    waste_footprint:      { usage: 0.09, unit: "Kg", cost: 0.01 },
    total_footprint_cost: 0.28
  },
  "B0DGJ5CMN3": {
    name: "Apple iPhone 16 Pro",
    category: "phones",
    energy_footprint:     { usage: 310, unit: "MJ" },
    greenhouse_footprint: { usage: 56, unit: "kgCO2e", cost: 2.02 },
    water_footprint:      { usage: 540, unit: "Liters", cost: 0.02 },
    waste_footprint:      { usage: 0.21, unit: "Kg", cost: 0.02 },
    total_footprint_cost: 2.06
  },
  "B0DGHY3JVF": {
    name: "Samsung Galaxy S25 Ultra",
    category: "phones",
    energy_footprint:     { usage: 290, unit: "MJ" },
    greenhouse_footprint: { usage: 48, unit: "kgCO2e", cost: 1.73 },
    water_footprint:      { usage: 480, unit: "Liters", cost: 0.01 },
    waste_footprint:      { usage: 0.19, unit: "Kg", cost: 0.01 },
    total_footprint_cost: 1.75
  },
  "B0D1XD1ZV3": {
    name: "Google Pixel 9 Pro",
    category: "phones",
    energy_footprint:     { usage: 275, unit: "MJ" },
    greenhouse_footprint: { usage: 43, unit: "kgCO2e", cost: 1.55 },
    water_footprint:      { usage: 450, unit: "Liters", cost: 0.01 },
    waste_footprint:      { usage: 0.17, unit: "Kg", cost: 0.01 },
    total_footprint_cost: 1.57
  },
  "B0CX23GFMW": {
    name: "Apple iPad Air M2",
    category: "phones",
    energy_footprint:     { usage: 380, unit: "MJ" },
    greenhouse_footprint: { usage: 67, unit: "kgCO2e", cost: 2.41 },
    water_footprint:      { usage: 620, unit: "Liters", cost: 0.02 },
    waste_footprint:      { usage: 0.48, unit: "Kg", cost: 0.04 },
    total_footprint_cost: 2.47
  },

  /* =========================================================
     CLOTHING & TEXTILES
     ========================================================= */
  "B0018OR118": {
    name: "Levi's 501 Original-Fit Jean",
    category: "clothing",
    greenhouse_footprint: { usage: 33.4, unit: "kgCO2e", cost: 1.20 },
    water_footprint:      { usage: 3781, unit: "Liters", cost: 0.11 },
    waste_footprint:      { usage: 0.52, unit: "Kg", cost: 0.04 },
    total_footprint_cost: 1.35
  },
  "B08F5TLWRC": {
    name: "Hanes EcoSmart T-Shirt (Pack of 2)",
    category: "clothing",
    greenhouse_footprint: { usage: 14.6, unit: "kgCO2e", cost: 0.53 },
    water_footprint:      { usage: 5400, unit: "Liters", cost: 0.16 },
    waste_footprint:      { usage: 0.30, unit: "Kg", cost: 0.02 },
    total_footprint_cost: 0.71
  },
  "B09C14WLHH": {
    name: "Patagonia Better Sweater Jacket",
    category: "clothing",
    greenhouse_footprint: { usage: 28.5, unit: "kgCO2e", cost: 1.03 },
    water_footprint:      { usage: 2100, unit: "Liters", cost: 0.06 },
    waste_footprint:      { usage: 0.74, unit: "Kg", cost: 0.06 },
    total_footprint_cost: 1.15
  },
  "B0CVNTXFFC": {
    name: "Carhartt WIP Active Jacket",
    category: "clothing",
    greenhouse_footprint: { usage: 38.0, unit: "kgCO2e", cost: 1.37 },
    water_footprint:      { usage: 4800, unit: "Liters", cost: 0.14 },
    waste_footprint:      { usage: 1.10, unit: "Kg", cost: 0.08 },
    total_footprint_cost: 1.59
  },

  /* =========================================================
     FAST-FASHION & TEXTILES (HIGH WASTE)
     ========================================================= */
  "B0C9SHDWT3": {
    name: "Generic Polyester Fast-Fashion Dress",
    category: "clothing",
    greenhouse_footprint: { usage: 22.0, unit: "kgCO2e", cost: 0.79 },
    water_footprint:      { usage: 7200, unit: "Liters", cost: 0.21 },
    waste_footprint:      { usage: 1.80, unit: "Kg", cost: 0.14 },
    total_footprint_cost: 1.14
  },

  /* =========================================================
     HOME & KITCHEN (WASTE-HEAVY)
     ========================================================= */
  "B07YFG1N4Q": {
    name: "Keurig K-Classic Coffee Maker",
    category: "appliances",
    greenhouse_footprint: { usage: 55.0, unit: "kgCO2e", cost: 1.98 },
    energy_footprint:     { usage: 420, unit: "MJ" },
    waste_footprint:      { usage: 4.50, unit: "Kg", cost: 0.34 },
    total_footprint_cost: 2.32
  },
  "B07D1CJ89P": {
    name: "Instant Pot Duo 7-in-1 (6 Qt)",
    category: "appliances",
    greenhouse_footprint: { usage: 42.0, unit: "kgCO2e", cost: 1.51 },
    energy_footprint:     { usage: 350, unit: "MJ" },
    waste_footprint:      { usage: 5.10, unit: "Kg", cost: 0.38 },
    total_footprint_cost: 1.89
  },
  "B085VB2M7N": {
    name: "Dyson V12 Detect Slim Vacuum",
    category: "appliances",
    greenhouse_footprint: { usage: 72.0, unit: "kgCO2e", cost: 2.59 },
    energy_footprint:     { usage: 580, unit: "MJ" },
    waste_footprint:      { usage: 3.80, unit: "Kg", cost: 0.29 },
    total_footprint_cost: 2.88
  },

  /* =========================================================
     SINGLE-USE & PACKAGING (VERY HIGH WASTE)
     ========================================================= */
  "B078WBLPJ3": {
    name: "Keurig K-Cup Pods (72 Count)",
    category: "single_use",
    greenhouse_footprint: { usage: 2.90, unit: "kgCO2e", cost: 0.10 },
    waste_footprint:      { usage: 0.86, unit: "Kg", cost: 0.06 },
    water_footprint:      { usage: 920, unit: "Liters", cost: 0.03 },
    total_footprint_cost: 0.19
  },
  "B000KKQB5M": {
    name: "Solo Plastic Cups 16oz (50 Count)",
    category: "single_use",
    greenhouse_footprint: { usage: 1.50, unit: "kgCO2e", cost: 0.05 },
    waste_footprint:      { usage: 0.60, unit: "Kg", cost: 0.05 },
    total_footprint_cost: 0.10
  },
  "B07TRSYRZ2": {
    name: "Amazon Basics Trash Bags 30 Gal (50ct)",
    category: "single_use",
    greenhouse_footprint: { usage: 3.80, unit: "kgCO2e", cost: 0.14 },
    waste_footprint:      { usage: 2.10, unit: "Kg", cost: 0.16 },
    total_footprint_cost: 0.30
  },
  "B07PCKHY4S": {
    name: "Ziploc Storage Bags Gallon (75ct)",
    category: "single_use",
    greenhouse_footprint: { usage: 1.20, unit: "kgCO2e", cost: 0.04 },
    waste_footprint:      { usage: 0.45, unit: "Kg", cost: 0.03 },
    total_footprint_cost: 0.07
  },

  /* =========================================================
     FURNITURE (HIGH WASTE & CARBON)
     ========================================================= */
  "B08BRLBKVY": {
    name: "IKEA KALLAX Shelf Unit",
    category: "furniture",
    greenhouse_footprint: { usage: 45.0, unit: "kgCO2e", cost: 1.62 },
    waste_footprint:      { usage: 12.0, unit: "Kg", cost: 0.90 },
    water_footprint:      { usage: 850, unit: "Liters", cost: 0.02 },
    total_footprint_cost: 2.54
  },
  "B0B81K2PZH": {
    name: "Secretlab Titan Evo Gaming Chair",
    category: "furniture",
    greenhouse_footprint: { usage: 88.0, unit: "kgCO2e", cost: 3.17 },
    waste_footprint:      { usage: 18.5, unit: "Kg", cost: 1.39 },
    total_footprint_cost: 4.56
  },

  /* =========================================================
     NETWORKING & PERIPHERALS
     ========================================================= */
  "B00006BA2U": {
    name: "3Com SuperStack Switch 24-Port",
    category: "networking",
    greenhouse_footprint: { usage: 91.8, unit: "kgCO2e", cost: 3.30 },
    waste_footprint:      { usage: 3.20, unit: "Kg", cost: 0.24 },
    total_footprint_cost: 3.54
  },
  "B08C3YBBHM": {
    name: "TP-Link Archer AX73 Wi-Fi 6 Router",
    category: "networking",
    greenhouse_footprint: { usage: 26.0, unit: "kgCO2e", cost: 0.94 },
    waste_footprint:      { usage: 1.20, unit: "Kg", cost: 0.09 },
    total_footprint_cost: 1.03
  },

  /* =========================================================
     TOYS & GAMES (PLASTIC WASTE)
     ========================================================= */
  "B09XL11L71": {
    name: "LEGO Icons Bouquet 10280",
    category: "toys",
    greenhouse_footprint: { usage: 4.20, unit: "kgCO2e", cost: 0.15 },
    waste_footprint:      { usage: 0.52, unit: "Kg", cost: 0.04 },
    total_footprint_cost: 0.19
  },
  "B0BX7MQ891": {
    name: "Hasbro Monopoly Board Game",
    category: "toys",
    greenhouse_footprint: { usage: 6.00, unit: "kgCO2e", cost: 0.22 },
    waste_footprint:      { usage: 1.10, unit: "Kg", cost: 0.08 },
    total_footprint_cost: 0.30
  },

  /* =========================================================
     BEAUTY & PERSONAL CARE (PACKAGING WASTE)
     ========================================================= */
  "B004Y9GZRQ": {
    name: "CeraVe Moisturizing Cream (19 oz)",
    category: "beauty",
    greenhouse_footprint: { usage: 1.80, unit: "kgCO2e", cost: 0.06 },
    water_footprint:      { usage: 340, unit: "Liters", cost: 0.01 },
    waste_footprint:      { usage: 0.35, unit: "Kg", cost: 0.03 },
    total_footprint_cost: 0.10
  },
  "B001ET76AI": {
    name: "Dove Body Wash 22 oz",
    category: "beauty",
    greenhouse_footprint: { usage: 2.10, unit: "kgCO2e", cost: 0.08 },
    water_footprint:      { usage: 520, unit: "Liters", cost: 0.02 },
    waste_footprint:      { usage: 0.28, unit: "Kg", cost: 0.02 },
    total_footprint_cost: 0.12
  }
};


/**
 * Category-level fallback estimates.
 * Used when an exact ASIN match isn't found —
 * the content script can use product title heuristics to guess a category.
 */
const TRUECOST_CATEGORY_ESTIMATES = {
  shoes: {
    label: "Footwear (avg.)",
    greenhouse_footprint: { usage: 12.0, unit: "kgCO2e", cost: 0.43 },
    energy_footprint:     { usage: 185, unit: "MJ" },
    water_footprint:      { usage: 3900, unit: "Liters", cost: 0.11 },
    waste_footprint:      { usage: 0.85, unit: "Kg", cost: 0.06 },
    ozone_footprint:      { usage: 0.085, unit: "kgNMVOCe", cost: 0.12 },
    total_footprint_cost: 0.72
  },
  computers: {
    label: "Computer / Laptop (avg.)",
    greenhouse_footprint: { usage: 240, unit: "kgCO2e", cost: 8.64 },
    energy_footprint:     { usage: 960, unit: "MJ" },
    water_footprint:      { usage: 2100, unit: "Liters", cost: 0.06 },
    waste_footprint:      { usage: 3.50, unit: "Kg", cost: 0.26 },
    total_footprint_cost: 8.96
  },
  phones: {
    label: "Phone / Tablet (avg.)",
    greenhouse_footprint: { usage: 50, unit: "kgCO2e", cost: 1.80 },
    energy_footprint:     { usage: 300, unit: "MJ" },
    water_footprint:      { usage: 500, unit: "Liters", cost: 0.01 },
    waste_footprint:      { usage: 0.20, unit: "Kg", cost: 0.02 },
    total_footprint_cost: 1.83
  },
  clothing: {
    label: "Clothing / Textiles (avg.)",
    greenhouse_footprint: { usage: 25, unit: "kgCO2e", cost: 0.90 },
    water_footprint:      { usage: 4500, unit: "Liters", cost: 0.13 },
    waste_footprint:      { usage: 0.70, unit: "Kg", cost: 0.05 },
    total_footprint_cost: 1.08
  },
  appliances: {
    label: "Home Appliance (avg.)",
    greenhouse_footprint: { usage: 56, unit: "kgCO2e", cost: 2.02 },
    energy_footprint:     { usage: 450, unit: "MJ" },
    waste_footprint:      { usage: 4.50, unit: "Kg", cost: 0.34 },
    total_footprint_cost: 2.36
  },
  single_use: {
    label: "Disposable / Single-Use (avg.)",
    greenhouse_footprint: { usage: 2.0, unit: "kgCO2e", cost: 0.07 },
    waste_footprint:      { usage: 0.80, unit: "Kg", cost: 0.06 },
    total_footprint_cost: 0.13
  },
  furniture: {
    label: "Furniture (avg.)",
    greenhouse_footprint: { usage: 60, unit: "kgCO2e", cost: 2.16 },
    waste_footprint:      { usage: 14, unit: "Kg", cost: 1.05 },
    total_footprint_cost: 3.21
  },
  networking: {
    label: "Networking Equipment (avg.)",
    greenhouse_footprint: { usage: 50, unit: "kgCO2e", cost: 1.80 },
    waste_footprint:      { usage: 2.00, unit: "Kg", cost: 0.15 },
    total_footprint_cost: 1.95
  },
  toys: {
    label: "Toys & Games (avg.)",
    greenhouse_footprint: { usage: 5, unit: "kgCO2e", cost: 0.18 },
    waste_footprint:      { usage: 0.80, unit: "Kg", cost: 0.06 },
    total_footprint_cost: 0.24
  },
  beauty: {
    label: "Beauty & Personal Care (avg.)",
    greenhouse_footprint: { usage: 2, unit: "kgCO2e", cost: 0.07 },
    water_footprint:      { usage: 420, unit: "Liters", cost: 0.01 },
    waste_footprint:      { usage: 0.30, unit: "Kg", cost: 0.02 },
    total_footprint_cost: 0.10
  },
  unknown: {
    label: "Typical Consumer Product (avg.)",
    greenhouse_footprint: { usage: 15, unit: "kgCO2e", cost: 0.54 },
    waste_footprint:      { usage: 1.00, unit: "Kg", cost: 0.08 },
    total_footprint_cost: 0.62
  }
};
