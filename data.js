// 3D Print Shop Seed Data & Database Wrapper

const DEFAULT_CATEGORIES = [
  {
    id: "home-decor",
    name: "Home Decor",
    subcategories: ["Vases", "Planters", "Sculptures"]
  },
  {
    id: "gadgets-tools",
    name: "Gadgets & Tools",
    subcategories: ["Desk Organizers", "Phone Stands", "Cable Management"]
  },
  {
    id: "gaming-toys",
    name: "Gaming & Toys",
    subcategories: ["Action Figures", "Dice Towers", "Fidget Toys"]
  },
  {
    id: "cosplay-props",
    name: "Cosplay & Props",
    subcategories: ["Helmets", "Wearables", "Replica Props"]
  }
];

const DEFAULT_PRODUCTS = [
  {
    id: "crystal-dragon",
    name: "Articulating Crystal Dragon",
    description: "A gorgeous, fully articulating dragon with sharp crystal-like scales. Fully poseable and incredibly satisfying as a fidget toy or desk companion. Printed using high-precision layers.",
    basePrice: 19.99,
    category: "gaming-toys",
    subcategory: "Fidget Toys",
    rating: 4.9,
    reviewsCount: 142,
    isFeatured: true,
    isNewArrival: false,
    isPriceDrop: true,
    originalPrice: 24.99,
    images: {
      "Silk Gold": "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=600&q=80", // placeholder colors
      "Silk Rainbow": "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80",
      "Matte Black": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
    },
    defaultImage: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
    ],
    variations: {
      colors: [
        { name: "Silk Gold", hex: "#ffd700", priceModifier: 0 },
        { name: "Silk Rainbow", hex: "linear-gradient(45deg, #ff007f, #7f00ff, #00ffff, #00ff7f, #ffff00)", priceModifier: 3.50 },
        { name: "Matte Black", hex: "#1a1a1a", priceModifier: 0 },
        { name: "Glow Green", hex: "#ccff33", priceModifier: 2.00 }
      ],
      sizes: [
        { name: "Small (15cm)", scale: "70%", priceModifier: -5.00 },
        { name: "Standard (22cm)", scale: "100%", priceModifier: 0 },
        { name: "Giant (35cm)", scale: "160%", priceModifier: 15.00 }
      ],
      materials: [
        { name: "PLA (Standard)", description: "Environmentally friendly, excellent details.", priceModifier: 0 },
        { name: "PETG (Durable)", description: "Impact resistant, heat resistant.", priceModifier: 2.50 }
      ]
    },
    specifications: {
      printTime: "6.5 hours",
      filamentUsed: "95g",
      difficulty: "Medium"
    }
  },
  {
    id: "self-watering-planter",
    name: "Geometric Self-Watering Planter",
    description: "Modern, minimalist geometric design features a dual-chamber watering reservoir. Water is wicked up from the bottom reservoir, preventing overwatering and allowing plants to drink at their own pace.",
    basePrice: 14.99,
    category: "home-decor",
    subcategory: "Planters",
    rating: 4.8,
    reviewsCount: 89,
    isFeatured: false,
    isNewArrival: true,
    isPriceDrop: false,
    originalPrice: null,
    images: {
      "Marble White": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
      "Terracotta": "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80",
      "Charcoal": "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80"
    },
    defaultImage: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80"
    ],
    variations: {
      colors: [
        { name: "Marble White", hex: "#e8e8e8", priceModifier: 1.00 },
        { name: "Terracotta", hex: "#c36a4b", priceModifier: 0 },
        { name: "Charcoal", hex: "#2b2b2b", priceModifier: 0 }
      ],
      sizes: [
        { name: "Standard (10cm)", scale: "100%", priceModifier: 0 },
        { name: "Large (15cm)", scale: "150%", priceModifier: 8.00 }
      ],
      materials: [
        { name: "PETG (Waterproof)", description: "Required for water containment.", priceModifier: 0 }
      ]
    },
    specifications: {
      printTime: "4.2 hours",
      filamentUsed: "70g",
      difficulty: "Easy"
    }
  },
  {
    id: "modular-organizer",
    name: "HexaNest Modular Desk Organizer",
    description: "Keep your workspace clean with this magnetic modular organizer. Hexagonal columns nest together. Includes dedicated slots for writing instruments, memory cards, a phone dock, and small office supplies.",
    basePrice: 24.99,
    category: "gadgets-tools",
    subcategory: "Desk Organizers",
    rating: 4.7,
    reviewsCount: 56,
    isFeatured: true,
    isNewArrival: false,
    isPriceDrop: false,
    originalPrice: null,
    images: {
      "Stealth Black": "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=600&q=80",
      "Cosmic Blue": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80",
      "Slate Grey": "https://images.unsplash.com/photo-1507208773393-40d9fc670acf?auto=format&fit=crop&w=600&q=80"
    },
    defaultImage: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507208773393-40d9fc670acf?auto=format&fit=crop&w=600&q=80"
    ],
    variations: {
      colors: [
        { name: "Stealth Black", hex: "#0f0f0f", priceModifier: 0 },
        { name: "Cosmic Blue", hex: "#1e3a8a", priceModifier: 1.50 },
        { name: "Slate Grey", hex: "#64748b", priceModifier: 0 },
        { name: "Neon Orange", hex: "#f97316", priceModifier: 2.00 }
      ],
      sizes: [
        { name: "Compact (3 Columns)", scale: "100%", priceModifier: 0 },
        { name: "Master Set (6 Columns)", scale: "150%", priceModifier: 14.00 }
      ],
      materials: [
        { name: "PLA (Standard)", description: "Ideal for indoor desktop use.", priceModifier: 0 },
        { name: "PETG (Extra Stiff)", description: "Durable and temperature stable.", priceModifier: 3.00 }
      ]
    },
    specifications: {
      printTime: "8 hours",
      filamentUsed: "150g",
      difficulty: "Medium"
    }
  },
  {
    id: "oni-mask",
    name: "Cyberpunk Oni Half-Mask",
    description: "A wearable Japanese demon half-mask with futuristic neon grid aesthetics. Hand-designed cybernetic vents, integrated strap slots, and visual mesh. Perfect for cosplay, display, or futuristic styling.",
    basePrice: 39.99,
    category: "cosplay-props",
    subcategory: "Wearables",
    rating: 4.95,
    reviewsCount: 210,
    isFeatured: false,
    isNewArrival: true,
    isPriceDrop: true,
    originalPrice: 49.99,
    images: {
      "Crimson Red": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
      "Metallic Purple": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
      "Carbon Fiber Black": "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=600&q=80"
    },
    defaultImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=600&q=80"
    ],
    variations: {
      colors: [
        { name: "Crimson Red", hex: "#dc2626", priceModifier: 0 },
        { name: "Metallic Purple", hex: "#7c3aed", priceModifier: 2.50 },
        { name: "Carbon Fiber Black", hex: "#111827", priceModifier: 4.00 }
      ],
      sizes: [
        { name: "Teen Size", scale: "90%", priceModifier: -3.00 },
        { name: "Adult Standard", scale: "100%", priceModifier: 0 },
        { name: "Adult Oversized", scale: "110%", priceModifier: 4.50 }
      ],
      materials: [
        { name: "PLA (Standard)", description: "Great finish, lightweight.", priceModifier: 0 },
        { name: "ABS (Tough)", description: "High impact resistance, sandable.", priceModifier: 5.00 }
      ]
    },
    specifications: {
      printTime: "14 hours",
      filamentUsed: "220g",
      difficulty: "Hard"
    }
  }
];

// Helper to interact with LocalStorage
const DEFAULT_PAYMENT_SETTINGS = {
  cod: {
    enabled: true,
    instructions: "Pay in cash upon receiving your 3D printed items. Please ensure you have the exact amount ready at the delivery address.",
    extraFee: 0.00
  },
  wish: {
    enabled: true,
    phoneNumber: "+961 70 123 456",
    receiverName: "PixelPop Shop",
    instructions: "Please send the transfer via Wish Money to the phone number and receiver name below. Once sent, type your Transaction Reference Number in the input field.",
    barcodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WishMoneyTransferPixelPop"
  },
  neo: {
    enabled: true,
    paymentLink: "https://neo.audi/pay/pixelpop",
    accountNumber: "NEO-PIXELPOP",
    instructions: "Tap the link or scan the QR code to complete your payment on the Neo by Audi app. Enter your Neo username/alias in the input field.",
    qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://neo.audi/pay/pixelpop"
  }
};

const DEFAULT_HERO_CONTENT = {
  title: "Bring Your Digital Creations To Life",
  subtitle: "Order high-precision 3D prints made from biodegradable PLA, durable PETG, or ultra-fine resin. Customize colors, sizing, and details instantly in our 3D customizer.",
  ctaText: "Browse Shop",
  activePrinters: "12",
  completedPrints: "4,500+",
  customerRating: "4.9★",
  featuredTitle: "⭐ Featured Prints",
  featuredSubtitle: "Hand-picked premium models from our designer collection",
  priceDropTitle: "🔥 Price Drops",
  priceDropSubtitle: "Special discounts and limited-time filament deals",
  newArrivalTitle: "✨ New Arrivals",
  newArrivalSubtitle: "Freshly sliced models and newly calibrated designs"
};

const DEFAULT_DELIVERY_OPTIONS = [
  { id: "standard", name: "Standard Postal", desc: "Delivered in 4-6 business days", price: 4.99 },
  { id: "express", name: "Express Filament Courier", desc: "Delivered in 1-2 business days", price: 12.99 }
];

const DEFAULT_SOCIAL_SETTINGS = {
  whatsappEnabled: true,
  whatsappNumber: "+961 70 123 456",
  whatsappMessage: "Hello! I have a question about my 3D print order.",
  instagramUrl: "https://instagram.com/pixelpop",
  facebookUrl: "https://facebook.com/pixelpop",
  tiktokUrl: "https://tiktok.com/@pixelpop",
  address: "Filament Lane, Badaro District, Beirut, Lebanon",
  email: "hello@pixelpop.com",
  phone: "+961 70 123 456",
  hours: "Monday - Saturday: 9:00 AM - 6:00 PM"
};

const DEFAULT_COUPONS = [
  { code: "PIXEL10", type: "percent", value: 10 },
  { code: "SAVE5", type: "fixed", value: 5 },
  { code: "WELCOME20", type: "percent", value: 20 }
];

const DEFAULT_THEME_SETTINGS = {
  logoLetter: "P",
  logoText1: "Pixel",
  logoText2: "Pop",
  themeMode: "light",
  colors: {
    "accent-indigo": "#4f46e5",
    "accent-cyan": "#0891b2",
    "accent-purple": "#7c3aed",
    "accent-pink": "#db2777",
    "accent-gold": "#d97706",
    "accent-green": "#059669",
    "accent-red": "#dc2626"
  }
};

const DB = {
  init() {
    if (!localStorage.getItem("categories")) {
      localStorage.setItem("categories", JSON.stringify(DEFAULT_CATEGORIES));
    }
    if (!localStorage.getItem("products")) {
      localStorage.setItem("products", JSON.stringify(DEFAULT_PRODUCTS));
    }
    if (!localStorage.getItem("orders")) {
      localStorage.setItem("orders", JSON.stringify([]));
    }
    if (!localStorage.getItem("payment_settings")) {
      localStorage.setItem("payment_settings", JSON.stringify(DEFAULT_PAYMENT_SETTINGS));
    }
    if (!localStorage.getItem("hero_content")) {
      localStorage.setItem("hero_content", JSON.stringify(DEFAULT_HERO_CONTENT));
    }
    if (!localStorage.getItem("delivery_options")) {
      localStorage.setItem("delivery_options", JSON.stringify(DEFAULT_DELIVERY_OPTIONS));
    }
    if (!localStorage.getItem("social_settings")) {
      localStorage.setItem("social_settings", JSON.stringify(DEFAULT_SOCIAL_SETTINGS));
    }
    if (!localStorage.getItem("theme_settings")) {
      localStorage.setItem("theme_settings", JSON.stringify(DEFAULT_THEME_SETTINGS));
    }
    if (!localStorage.getItem("coupons")) {
      localStorage.setItem("coupons", JSON.stringify(DEFAULT_COUPONS));
    }
  },

  getCategories() {
    this.init();
    return JSON.parse(localStorage.getItem("categories"));
  },

  saveCategories(categories) {
    localStorage.setItem("categories", JSON.stringify(categories));
  },

  getProducts() {
    this.init();
    let products = JSON.parse(localStorage.getItem("products"));
    let updated = false;
    products = products.map(p => {
      if (!p.gallery) {
        p.gallery = [];
        if (p.defaultImage) {
          p.gallery.push(p.defaultImage);
        }
        if (p.images) {
          Object.values(p.images).forEach(imgUrl => {
            if (imgUrl && !p.gallery.includes(imgUrl)) {
              p.gallery.push(imgUrl);
            }
          });
        }
        updated = true;
      }
      return p;
    });
    if (updated) {
      localStorage.setItem("products", JSON.stringify(products));
    }
    return products;
  },

  getProductById(id) {
    const products = this.getProducts();
    return products.find(p => p.id === id);
  },

  saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  },

  addProduct(product) {
    const products = this.getProducts();
    products.push(product);
    this.saveProducts(products);
    return product;
  },

  updateProduct(updatedProduct) {
    let products = this.getProducts();
    products = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    this.saveProducts(products);
    return updatedProduct;
  },

  deleteProduct(id) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== id);
    this.saveProducts(products);
  },

  getOrders() {
    this.init();
    return JSON.parse(localStorage.getItem("orders"));
  },

  saveOrders(orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
  },

  createOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order); // Put new orders at the top
    this.saveOrders(orders);
    return order;
  },

  updateOrderStatus(orderId, status) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      this.saveOrders(orders);
    }
    return order;
  },

  getPaymentSettings() {
    this.init();
    return JSON.parse(localStorage.getItem("payment_settings"));
  },

  savePaymentSettings(settings) {
    localStorage.setItem("payment_settings", JSON.stringify(settings));
  },

  getHeroContent() {
    this.init();
    const saved = JSON.parse(localStorage.getItem("hero_content"));
    return { ...DEFAULT_HERO_CONTENT, ...saved };
  },

  saveHeroContent(content) {
    localStorage.setItem("hero_content", JSON.stringify(content));
  },

  getDeliveryOptions() {
    this.init();
    return JSON.parse(localStorage.getItem("delivery_options"));
  },

  saveDeliveryOptions(options) {
    localStorage.setItem("delivery_options", JSON.stringify(options));
  },

  getSocialSettings() {
    this.init();
    const saved = JSON.parse(localStorage.getItem("social_settings"));
    return { ...DEFAULT_SOCIAL_SETTINGS, ...saved };
  },

  saveSocialSettings(settings) {
    localStorage.setItem("social_settings", JSON.stringify(settings));
  },

  getThemeSettings() {
    this.init();
    return JSON.parse(localStorage.getItem("theme_settings"));
  },

  saveThemeSettings(settings) {
    localStorage.setItem("theme_settings", JSON.stringify(settings));
  },

  getCoupons() {
    this.init();
    return JSON.parse(localStorage.getItem("coupons"));
  },

  saveCoupons(coupons) {
    localStorage.setItem("coupons", JSON.stringify(coupons));
  },

  addCoupon(coupon) {
    const coupons = this.getCoupons();
    coupons.push(coupon);
    this.saveCoupons(coupons);
    return coupon;
  },

  deleteCoupon(code) {
    let coupons = this.getCoupons();
    coupons = coupons.filter(c => c.code !== code);
    this.saveCoupons(coupons);
  }
};

// Export to window so other scripts can access
window.DB = DB;
window.DEFAULT_CATEGORIES = DEFAULT_CATEGORIES;
window.DEFAULT_PRODUCTS = DEFAULT_PRODUCTS;
window.DEFAULT_PAYMENT_SETTINGS = DEFAULT_PAYMENT_SETTINGS;
window.DEFAULT_HERO_CONTENT = DEFAULT_HERO_CONTENT;
window.DEFAULT_DELIVERY_OPTIONS = DEFAULT_DELIVERY_OPTIONS;
window.DEFAULT_SOCIAL_SETTINGS = DEFAULT_SOCIAL_SETTINGS;
window.DEFAULT_THEME_SETTINGS = DEFAULT_THEME_SETTINGS;
window.DEFAULT_COUPONS = DEFAULT_COUPONS;
