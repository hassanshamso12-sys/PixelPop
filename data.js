// 3D Print Shop Seed Data & Database Wrapper
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, deleteDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  projectId: "pixelpop-cd075",
  storageBucket: "pixelpop-cd075.firebasestorage.app",
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(firebaseApp);

const DEFAULT_ALLOWED_ADMINS = [
  {
    email: "hassanshamso12@gmail.com",
    addedAt: "2026-01-01T00:00:00.000Z",
    addedBy: "System Administrator"
  }
];

const DEFAULT_ADMIN_ACCOUNTS = [
  {
    email: "hassanshamso12@gmail.com",
    password: "11223311",
    createdAt: "2026-01-01T00:00:00.000Z",
    isSignedUp: true
  }
];

const DEFAULT_INVESTORS = [
  {
    id: "inv-1",
    name: "Alex Vance",
    email: "investor@pixelpop.com",
    password: "1234password",
    createdAt: "2026-01-15T00:00:00.000Z"
  }
];

const DEFAULT_PRINTERS = [
  {
    id: "prn-1",
    name: "Bambu Lab X1-Carbon #1",
    serialNumber: "BL-X1C-99482",
    investorEmail: "investor@pixelpop.com",
    hourlyRate: 6.50,
    costPerHour: 0.90,
    status: "Idle",
    currentSessionStart: null,
    accumulatedSessionSeconds: 0,
    unpaidHours: 14.5,
    lifetimeHours: 62.0,
    sessions: [
      {
        id: "sess-1",
        startDate: "2026-10-04T08:00:00.000Z",
        endDate: "2026-10-04T14:30:00.000Z",
        hours: 6.5,
        rate: 6.50,
        earnings: 42.25,
        payoffId: null
      },
      {
        id: "sess-2",
        startDate: "2026-10-05T09:00:00.000Z",
        endDate: "2026-10-05T17:00:00.000Z",
        hours: 8.0,
        rate: 6.50,
        earnings: 52.00,
        payoffId: null
      }
    ],
    payoffHistory: [
      {
        id: "pay-101",
        date: "2026-09-30T18:00:00.000Z",
        hoursPaid: 47.5,
        hourlyRate: 6.50,
        amountPaid: 308.75,
        notes: "End of September Settlement"
      }
    ]
  }
];

const DEFAULT_CUSTOM_JOBS = [
  {
    id: "cjob-101",
    clientName: "Architectural Models Ltd",
    jobTitle: "Scale Prototype Building Model (High Res)",
    printerId: "prn-1",
    printerName: "Bambu Lab X1-Carbon #1",
    investorEmail: "investor@pixelpop.com",
    durationHours: 12.0,
    cost: 14.50,
    price: 85.00,
    profit: 70.50,
    date: "2026-10-05T14:00:00.000Z",
    status: "Completed"
  }
];

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
  },
  {
    id: "super-heros",
    name: "Super Heros",
    subcategories: ["Superman", "Batman", "Action Figures"]
  },
  {
    id: "politics-religious",
    name: "Politics & Religious",
    subcategories: ["National Logos", "Symbols", "Historical Flags"]
  },
  {
    id: "stationary",
    name: "Stationary",
    subcategories: ["Organizers", "Pen Holders", "Desk Accents"]
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
    },
    sourceModelUrl: "https://makerworld.com/en/models/123456-articulating-crystal-dragon"
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
    },
    sourceModelUrl: "https://crealitycloud.com/model-detail/654321-geometric-planter"
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
    },
    sourceModelUrl: "https://printables.com/model/789101-hexanest-desk-organizer"
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
    },
    sourceModelUrl: "https://makerworld.com/en/models/112233-cyberpunk-oni-mask"
  },
  {
    id: "superman-statue",
    name: "Superman Statue",
    description: "A highly detailed, 3D printed Superman statue in a classic heroic pose. Ideal for comic fans, office display, or action figure collections. Hand-calibrated layers for maximum muscle definition.",
    basePrice: 29.99,
    category: "super-heros",
    subcategory: "Superman",
    rating: 5.0,
    reviewsCount: 15,
    isFeatured: true,
    isNewArrival: true,
    isPriceDrop: false,
    originalPrice: null,
    images: {
      "Classic Blue": "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=600&q=80"
    },
    defaultImage: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1608889175168-984c98e268a7?auto=format&fit=crop&w=600&q=80"
    ],
    variations: {
      colors: [
        { name: "Classic Blue", hex: "#1e3a8a", priceModifier: 0 },
        { name: "Steel Grey", hex: "#4b5563", priceModifier: 0 }
      ],
      sizes: [
        { name: "Standard (15cm)", scale: "100%", priceModifier: 0 },
        { name: "Large (25cm)", scale: "155%", priceModifier: 15.00 }
      ],
      materials: [
        { name: "PLA (Standard)", description: "Environmentally friendly, excellent details.", priceModifier: 0 }
      ]
    },
    specifications: {
      printTime: "9 hours",
      filamentUsed: "140g",
      difficulty: "Medium"
    },
    sourceModelUrl: "https://makerworld.com/en/models/998877-superman-statue"
  }
];

const DEFAULT_ORDERS = [
  {
    id: "ORD-1001",
    createdAt: "2026-10-06T10:15:00.000Z",
    datePlaced: "2026-10-06",
    customer: { firstName: "Sami", lastName: "Khoury", email: "sami@example.com", phone: "+961 70 111 222", address: "Hamra St", city: "Beirut", zip: "1103" },
    items: [
      { productId: "crystal-dragon", name: "Articulating Crystal Dragon", color: "Silk Gold", size: "Standard (22cm)", material: "PLA (Standard)", qty: 2, price: 19.99, weight: "95g" }
    ],
    totals: { subtotal: 39.98, discount: 0, shipping: 4.99, surcharge: 0, total: 44.97 },
    costAmount: 12.50,
    deliveryStatus: "Processing",
    paymentStatus: "Paid",
    paymentMethod: "cod"
  },
  {
    id: "ORD-1002",
    createdAt: "2026-10-05T14:30:00.000Z",
    datePlaced: "2026-10-05",
    customer: { firstName: "Maya", lastName: "Nassar", email: "maya@example.com", phone: "+961 03 444 555", address: "Achrafieh", city: "Beirut", zip: "1100" },
    items: [
      { productId: "oni-mask", name: "Cyberpunk Oni Half-Mask", color: "Crimson Red", size: "Adult Standard", material: "ABS (Tough)", qty: 1, price: 44.99, weight: "220g" }
    ],
    totals: { subtotal: 44.99, discount: 0, shipping: 4.99, surcharge: 0, total: 49.98 },
    costAmount: 14.00,
    deliveryStatus: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "wish"
  },
  {
    id: "ORD-1003",
    createdAt: "2026-10-03T16:20:00.000Z",
    datePlaced: "2026-10-03",
    customer: { firstName: "Tariq", lastName: "Salem", email: "tariq@example.com", phone: "+961 71 888 999", address: "Kaslik St", city: "Jounieh", zip: "1201" },
    items: [
      { productId: "modular-organizer", name: "HexaNest Modular Desk Organizer", color: "Stealth Black", size: "Master Set (6 Columns)", material: "PETG (Extra Stiff)", qty: 1, price: 41.99, weight: "150g" }
    ],
    totals: { subtotal: 41.99, discount: 0, shipping: 4.99, surcharge: 0, total: 46.98 },
    costAmount: 13.00,
    deliveryStatus: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "neo"
  },
  {
    id: "ORD-1004",
    createdAt: "2026-09-28T11:00:00.000Z",
    datePlaced: "2026-09-28",
    customer: { firstName: "Rami", lastName: "El-Hajj", email: "rami@example.com", phone: "+961 76 333 222", address: "Corniche St", city: "Saida", zip: "1600" },
    items: [
      { productId: "superman-statue", name: "Superman Statue", color: "Classic Blue", size: "Large (25cm)", material: "PLA (Standard)", qty: 1, price: 44.99, weight: "140g" }
    ],
    totals: { subtotal: 44.99, discount: 0, shipping: 4.99, surcharge: 0, total: 49.98 },
    costAmount: 13.50,
    deliveryStatus: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "cod"
  },
  {
    id: "ORD-1005",
    createdAt: "2026-09-21T09:45:00.000Z",
    datePlaced: "2026-09-21",
    customer: { firstName: "Nour", lastName: "Fakhoury", email: "nour@example.com", phone: "+961 70 555 777", address: "Mina St", city: "Tripoli", zip: "1300" },
    items: [
      { productId: "self-watering-planter", name: "Geometric Self-Watering Planter", color: "Marble White", size: "Large (15cm)", material: "PETG (Waterproof)", qty: 2, price: 22.99, weight: "70g" }
    ],
    totals: { subtotal: 45.98, discount: 0, shipping: 4.99, surcharge: 0, total: 50.97 },
    costAmount: 14.00,
    deliveryStatus: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "wish"
  },
  {
    id: "ORD-1006",
    createdAt: "2026-09-14T15:10:00.000Z",
    datePlaced: "2026-09-14",
    customer: { firstName: "Karim", lastName: "Ziad", email: "karim@example.com", phone: "+961 03 123 789", address: "Old Port", city: "Byblos", zip: "1401" },
    items: [
      { productId: "crystal-dragon", name: "Articulating Crystal Dragon", color: "Silk Rainbow", size: "Giant (35cm)", material: "PLA (Standard)", qty: 1, price: 38.49, weight: "160g" }
    ],
    totals: { subtotal: 38.49, discount: 0, shipping: 4.99, surcharge: 0, total: 43.48 },
    costAmount: 11.80,
    deliveryStatus: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "neo"
  },
  {
    id: "ORD-1007",
    createdAt: "2026-08-28T14:00:00.000Z",
    datePlaced: "2026-08-28",
    customer: { firstName: "Lina", lastName: "Matar", email: "lina@example.com", phone: "+961 71 444 333", address: "Boulvard St", city: "Zahle", zip: "1800" },
    items: [
      { productId: "oni-mask", name: "Cyberpunk Oni Half-Mask", color: "Metallic Purple", size: "Adult Standard", material: "PLA (Standard)", qty: 2, price: 42.49, weight: "220g" }
    ],
    totals: { subtotal: 84.98, discount: 5.00, shipping: 4.99, surcharge: 0, total: 84.97 },
    costAmount: 26.00,
    deliveryStatus: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "cod"
  },
  {
    id: "ORD-1008",
    createdAt: "2026-08-12T10:30:00.000Z",
    datePlaced: "2026-08-12",
    customer: { firstName: "Fadi", lastName: "Haddad", email: "fadi@example.com", phone: "+961 70 888 111", address: "Main Road", city: "Batroun", zip: "1450" },
    items: [
      { productId: "modular-organizer", name: "HexaNest Modular Desk Organizer", color: "Cosmic Blue", size: "Master Set (6 Columns)", material: "PETG (Extra Stiff)", qty: 2, price: 41.99, weight: "150g" }
    ],
    totals: { subtotal: 83.98, discount: 10.00, shipping: 4.99, surcharge: 0, total: 78.97 },
    costAmount: 23.50,
    deliveryStatus: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "wish"
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
  newArrivalSubtitle: "Freshly sliced models and newly calibrated designs",
  showcaseCards: [
    { img: "fdm_printing.png", title: "FDM Filament", desc: "High-Strength PLA/PETG" },
    { img: "sla_resin_printing.png", title: "SLA UV Resin", desc: "Ultra-Fine miniatures" },
    { img: "post_processing.png", title: "Post-Processing", desc: "Custom hand-paint detail" }
  ]
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
  logoImageUrl: "",
  logoHeight: 38,
  bgImageUrl: "",
  bgOpacity: 0.08,
  bgSaturation: 1.0,
  bgOverlayColor: "#ffffff",
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
  initRealtimeSync() {
    try {
      // Realtime listener for Products
      onSnapshot(collection(db, "products"), (snapshot) => {
        if (!snapshot.empty) {
          const list = [];
          snapshot.forEach(d => list.push(d.data()));
          localStorage.setItem("products", JSON.stringify(list));
          window.dispatchEvent(new CustomEvent("pixelpop:data-updated", { detail: { type: "products" } }));
        }
      }, (err) => console.warn("Products realtime sync:", err));

      // Realtime listener for Orders
      onSnapshot(collection(db, "orders"), (snapshot) => {
        const list = [];
        snapshot.forEach(d => list.push(d.data()));
        localStorage.setItem("orders", JSON.stringify(list));
        window.dispatchEvent(new CustomEvent("pixelpop:data-updated", { detail: { type: "orders" } }));
      }, (err) => console.warn("Orders realtime sync:", err));

      // Realtime listener for Categories
      onSnapshot(doc(db, "settings", "categories"), (snap) => {
        if (snap.exists() && snap.data().list) {
          localStorage.setItem("categories", JSON.stringify(snap.data().list));
          window.dispatchEvent(new CustomEvent("pixelpop:data-updated", { detail: { type: "categories" } }));
        }
      }, (err) => console.warn("Categories realtime sync:", err));
    } catch (e) {
      console.warn("Could not start realtime Firestore sync:", e);
    }
  },

  async syncFromFirestore() {
    try {
      const [
        categoriesDoc,
        couponsDoc,
        deliveryDoc,
        paymentsDoc,
        heroDoc,
        socialDoc,
        themeDoc,
        allowedAdminsDoc,
        adminAccountsDoc,
        investorsDoc,
        printersDoc,
        customJobsDoc,
        productsSnap,
        ordersSnap
      ] = await Promise.all([
        getDoc(doc(db, "settings", "categories")),
        getDoc(doc(db, "settings", "coupons")),
        getDoc(doc(db, "settings", "delivery")),
        getDoc(doc(db, "settings", "payments")),
        getDoc(doc(db, "settings", "hero")),
        getDoc(doc(db, "settings", "social")),
        getDoc(doc(db, "settings", "theme")),
        getDoc(doc(db, "settings", "allowed_admins")),
        getDoc(doc(db, "settings", "admin_accounts")),
        getDoc(doc(db, "settings", "investors")),
        getDoc(doc(db, "settings", "printers")),
        getDoc(doc(db, "settings", "custom_jobs")),
        getDocs(collection(db, "products")),
        getDocs(collection(db, "orders"))
      ]);

      // Categories
      if (categoriesDoc.exists()) {
        localStorage.setItem("categories", JSON.stringify(categoriesDoc.data().list));
      } else {
        this.init();
        const local = JSON.parse(localStorage.getItem("categories"));
        if (local) await setDoc(doc(db, "settings", "categories"), { list: local });
      }

      // Coupons
      if (couponsDoc.exists()) {
        localStorage.setItem("coupons", JSON.stringify(couponsDoc.data().list));
      } else {
        this.init();
        const local = JSON.parse(localStorage.getItem("coupons"));
        if (local) await setDoc(doc(db, "settings", "coupons"), { list: local });
      }

      // Delivery Options
      if (deliveryDoc.exists()) {
        localStorage.setItem("delivery_options", JSON.stringify(deliveryDoc.data().list));
      } else {
        this.init();
        const local = JSON.parse(localStorage.getItem("delivery_options"));
        if (local) await setDoc(doc(db, "settings", "delivery"), { list: local });
      }

      // Payments Settings
      if (paymentsDoc.exists()) {
        localStorage.setItem("payment_settings", JSON.stringify(paymentsDoc.data()));
      } else {
        this.init();
        const local = JSON.parse(localStorage.getItem("payment_settings"));
        if (local) await setDoc(doc(db, "settings", "payments"), local);
      }

      // Hero Content
      if (heroDoc.exists()) {
        localStorage.setItem("hero_content", JSON.stringify(heroDoc.data()));
      } else {
        this.init();
        const local = JSON.parse(localStorage.getItem("hero_content"));
        if (local) await setDoc(doc(db, "settings", "hero"), local);
      }

      // Social Settings
      if (socialDoc.exists()) {
        localStorage.setItem("social_settings", JSON.stringify(socialDoc.data()));
      } else {
        this.init();
        const local = JSON.parse(localStorage.getItem("social_settings"));
        if (local) await setDoc(doc(db, "settings", "social"), local);
      }

      // Theme Settings
      if (themeDoc.exists()) {
        localStorage.setItem("theme_settings", JSON.stringify(themeDoc.data()));
      } else {
        this.init();
        const local = JSON.parse(localStorage.getItem("theme_settings"));
        if (local) await setDoc(doc(db, "settings", "theme"), local);
      }

      // Allowed Admin Emails
      if (allowedAdminsDoc.exists()) {
        localStorage.setItem("allowed_admin_emails", JSON.stringify(allowedAdminsDoc.data().list));
      } else {
        this.init();
        const local = JSON.parse(localStorage.getItem("allowed_admin_emails"));
        if (local) await setDoc(doc(db, "settings", "allowed_admins"), { list: local });
      }

      // Admin Accounts
      if (adminAccountsDoc.exists()) {
        localStorage.setItem("admin_accounts", JSON.stringify(adminAccountsDoc.data().list));
      } else {
        this.init();
        const local = JSON.parse(localStorage.getItem("admin_accounts"));
        if (local) await setDoc(doc(db, "settings", "admin_accounts"), { list: local });
      }

      // Investors Accounts
      if (investorsDoc.exists()) {
        localStorage.setItem("investors", JSON.stringify(investorsDoc.data().list));
      } else {
        this.init();
        const local = JSON.parse(localStorage.getItem("investors"));
        if (local) await setDoc(doc(db, "settings", "investors"), { list: local });
      }

      // Printers Fleet
      if (printersDoc.exists()) {
        localStorage.setItem("printers", JSON.stringify(printersDoc.data().list));
      } else {
        this.init();
        const local = JSON.parse(localStorage.getItem("printers"));
        if (local) await setDoc(doc(db, "settings", "printers"), { list: local });
      }

      // Custom Jobs
      if (customJobsDoc && customJobsDoc.exists()) {
        localStorage.setItem("custom_jobs", JSON.stringify(customJobsDoc.data().list));
      } else {
        this.init();
        const local = JSON.parse(localStorage.getItem("custom_jobs"));
        if (local) await setDoc(doc(db, "settings", "custom_jobs"), { list: local });
      }

      // Products
      if (!productsSnap.empty) {
        const list = [];
        productsSnap.forEach(d => list.push(d.data()));
        localStorage.setItem("products", JSON.stringify(list));
      } else {
        this.init();
        const list = JSON.parse(localStorage.getItem("products")) || DEFAULT_PRODUCTS;
        await Promise.all(list.map(p => setDoc(doc(db, "products", p.id), p)));
      }

      // Orders
      if (!ordersSnap.empty) {
        const list = [];
        ordersSnap.forEach(d => list.push(d.data()));
        localStorage.setItem("orders", JSON.stringify(list));
      } else {
        this.init();
        const list = JSON.parse(localStorage.getItem("orders")) || [];
        await Promise.all(list.map(o => setDoc(doc(db, "orders", o.id), o)));
      }
    } catch (e) {
      console.error("Firestore sync error:", e);
      throw e;
    }
  },

  init() {
    if (!localStorage.getItem("categories")) {
      localStorage.setItem("categories", JSON.stringify(DEFAULT_CATEGORIES));
    }
    if (!localStorage.getItem("products")) {
      localStorage.setItem("products", JSON.stringify(DEFAULT_PRODUCTS));
    }
    if (!localStorage.getItem("orders") || JSON.parse(localStorage.getItem("orders") || "[]").length === 0) {
      localStorage.setItem("orders", JSON.stringify(DEFAULT_ORDERS));
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
    if (!localStorage.getItem("allowed_admin_emails")) {
      localStorage.setItem("allowed_admin_emails", JSON.stringify(DEFAULT_ALLOWED_ADMINS));
    }
    if (!localStorage.getItem("admin_accounts")) {
      localStorage.setItem("admin_accounts", JSON.stringify(DEFAULT_ADMIN_ACCOUNTS));
    }
    if (!localStorage.getItem("investors")) {
      localStorage.setItem("investors", JSON.stringify(DEFAULT_INVESTORS));
    }
    if (!localStorage.getItem("printers")) {
      localStorage.setItem("printers", JSON.stringify(DEFAULT_PRINTERS));
    }
    if (!localStorage.getItem("custom_jobs")) {
      localStorage.setItem("custom_jobs", JSON.stringify(DEFAULT_CUSTOM_JOBS));
    }
  },

  getCategories() {
    this.init();
    return JSON.parse(localStorage.getItem("categories"));
  },

  saveCategories(categories) {
    localStorage.setItem("categories", JSON.stringify(categories));
    setDoc(doc(db, "settings", "categories"), { list: categories }).catch(console.error);
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
      if (p.modelUrl === undefined) {
        p.modelUrl = "";
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
    Promise.all(products.map(p => setDoc(doc(db, "products", p.id), p))).catch(console.error);
  },

  addProduct(product) {
    const products = this.getProducts();
    products.push(product);
    this.saveProducts(products);
    setDoc(doc(db, "products", product.id), product).catch(console.error);
    return product;
  },

  updateProduct(updatedProduct) {
    let products = this.getProducts();
    products = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    this.saveProducts(products);
    setDoc(doc(db, "products", updatedProduct.id), updatedProduct).catch(console.error);
    return updatedProduct;
  },

  deleteProduct(id) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== id);
    this.saveProducts(products);
    deleteDoc(doc(db, "products", id)).catch(console.error);
  },

  getOrders() {
    this.init();
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let updated = false;
    orders = orders.map(o => {
      if (!o.deliveryStatus) {
        o.deliveryStatus = o.status || "Pending";
        updated = true;
      }
      if (!o.status) {
        o.status = o.deliveryStatus;
        updated = true;
      }
      if (!o.paymentStatus) {
        o.paymentStatus = (o.paymentMethod === "cod" && o.deliveryStatus !== "Delivered") ? "Unpaid" : "Paid";
        updated = true;
      }
      return o;
    });
    if (updated) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
    return orders;
  },

  saveOrders(orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
    Promise.all(orders.map(o => setDoc(doc(db, "orders", o.id), o))).catch(console.error);
  },

  createOrder(order) {
    if (!order.deliveryStatus) order.deliveryStatus = order.status || "Pending";
    if (!order.status) order.status = order.deliveryStatus;
    if (!order.paymentStatus) order.paymentStatus = "Unpaid";
    
    const orders = this.getOrders();
    orders.unshift(order); // Put new orders at the top
    this.saveOrders(orders);
    setDoc(doc(db, "orders", order.id), order).catch(console.error);
    return order;
  },

  updateOrderStatus(orderId, status) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      order.deliveryStatus = status;
      this.saveOrders(orders);
      setDoc(doc(db, "orders", orderId), order).catch(console.error);
    }
    return order;
  },

  updateOrderDeliveryStatus(orderId, deliveryStatus) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.deliveryStatus = deliveryStatus;
      order.status = deliveryStatus;
      this.saveOrders(orders);
      setDoc(doc(db, "orders", orderId), order).catch(console.error);
    }
    return order;
  },

  updateOrderPaymentStatus(orderId, paymentStatus) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.paymentStatus = paymentStatus;
      this.saveOrders(orders);
      setDoc(doc(db, "orders", orderId), order).catch(console.error);
    }
    return order;
  },

  getPaymentSettings() {
    this.init();
    return JSON.parse(localStorage.getItem("payment_settings"));
  },

  savePaymentSettings(settings) {
    localStorage.setItem("payment_settings", JSON.stringify(settings));
    setDoc(doc(db, "settings", "payments"), settings).catch(console.error);
  },

  getHeroContent() {
    this.init();
    const saved = JSON.parse(localStorage.getItem("hero_content"));
    return { ...DEFAULT_HERO_CONTENT, ...saved };
  },

  saveHeroContent(content) {
    localStorage.setItem("hero_content", JSON.stringify(content));
    setDoc(doc(db, "settings", "hero"), content).catch(console.error);
  },

  getDeliveryOptions() {
    this.init();
    return JSON.parse(localStorage.getItem("delivery_options"));
  },

  saveDeliveryOptions(options) {
    localStorage.setItem("delivery_options", JSON.stringify(options));
    setDoc(doc(db, "settings", "delivery"), { list: options }).catch(console.error);
  },

  getSocialSettings() {
    this.init();
    const saved = JSON.parse(localStorage.getItem("social_settings"));
    return { ...DEFAULT_SOCIAL_SETTINGS, ...saved };
  },

  saveSocialSettings(settings) {
    localStorage.setItem("social_settings", JSON.stringify(settings));
    setDoc(doc(db, "settings", "social"), settings).catch(console.error);
  },

  getThemeSettings() {
    this.init();
    return JSON.parse(localStorage.getItem("theme_settings"));
  },

  saveThemeSettings(settings) {
    localStorage.setItem("theme_settings", JSON.stringify(settings));
    setDoc(doc(db, "settings", "theme"), settings).catch(console.error);
  },

  getCoupons() {
    this.init();
    return JSON.parse(localStorage.getItem("coupons"));
  },

  saveCoupons(coupons) {
    localStorage.setItem("coupons", JSON.stringify(coupons));
    setDoc(doc(db, "settings", "coupons"), { list: coupons }).catch(console.error);
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
  },

  // ADMIN AUTHORIZATION & ACCOUNT MANAGERS
  getAllowedAdmins() {
    this.init();
    return JSON.parse(localStorage.getItem("allowed_admin_emails")) || DEFAULT_ALLOWED_ADMINS;
  },

  saveAllowedAdmins(list) {
    localStorage.setItem("allowed_admin_emails", JSON.stringify(list));
    setDoc(doc(db, "settings", "allowed_admins"), { list }).catch(console.error);
  },

  isEmailAllowedAsAdmin(email) {
    if (!email) return false;
    const normalized = email.trim().toLowerCase();
    const allowed = this.getAllowedAdmins();
    return allowed.some(a => {
      const e = typeof a === 'string' ? a : a.email;
      return e.toLowerCase().trim() === normalized;
    });
  },

  addAllowedAdmin(email, addedBy = "Dashboard Admin") {
    const normalized = email.trim().toLowerCase();
    let allowed = this.getAllowedAdmins();
    const exists = allowed.some(a => {
      const e = typeof a === 'string' ? a : a.email;
      return e.toLowerCase().trim() === normalized;
    });

    if (!exists) {
      allowed.push({
        email: normalized,
        addedAt: new Date().toISOString(),
        addedBy: addedBy || "Dashboard Admin"
      });
      this.saveAllowedAdmins(allowed);
    }
    return allowed;
  },

  removeAllowedAdmin(email) {
    const normalized = email.trim().toLowerCase();
    let allowed = this.getAllowedAdmins();
    allowed = allowed.filter(a => {
      const e = typeof a === 'string' ? a : a.email;
      return e.toLowerCase().trim() !== normalized;
    });
    this.saveAllowedAdmins(allowed);

    // Also purge existing signed-up account if revoked
    let accounts = this.getAdminAccounts();
    accounts = accounts.filter(ac => ac.email.toLowerCase().trim() !== normalized);
    this.saveAdminAccounts(accounts);
    return allowed;
  },

  getAdminAccounts() {
    this.init();
    return JSON.parse(localStorage.getItem("admin_accounts")) || DEFAULT_ADMIN_ACCOUNTS;
  },

  saveAdminAccounts(list) {
    localStorage.setItem("admin_accounts", JSON.stringify(list));
    setDoc(doc(db, "settings", "admin_accounts"), { list }).catch(console.error);
  },

  getAdminAccount(email) {
    if (!email) return null;
    const normalized = email.trim().toLowerCase();
    const accounts = this.getAdminAccounts();
    return accounts.find(a => a.email.toLowerCase().trim() === normalized) || null;
  },

  registerAdminAccount(email, password) {
    const normalized = email.trim().toLowerCase();
    let accounts = this.getAdminAccounts();
    const existingIndex = accounts.findIndex(a => a.email.toLowerCase().trim() === normalized);
    const accountData = {
      email: normalized,
      password: password,
      createdAt: new Date().toISOString(),
      isSignedUp: true
    };
    if (existingIndex >= 0) {
      accounts[existingIndex] = accountData;
    } else {
      accounts.push(accountData);
    }
    this.saveAdminAccounts(accounts);
    return accountData;
  },

  // INVESTOR ACCOUNT MANAGEMENT
  getInvestors() {
    this.init();
    return JSON.parse(localStorage.getItem("investors")) || DEFAULT_INVESTORS;
  },

  saveInvestors(list) {
    localStorage.setItem("investors", JSON.stringify(list));
    setDoc(doc(db, "settings", "investors"), { list }).catch(console.error);
  },

  getInvestorByEmail(email) {
    if (!email) return null;
    const normalized = email.trim().toLowerCase();
    const investors = this.getInvestors();
    return investors.find(i => i.email.toLowerCase().trim() === normalized) || null;
  },

  addInvestor(investor) {
    let investors = this.getInvestors();
    investor.email = investor.email.trim().toLowerCase();
    const existingIdx = investors.findIndex(i => i.email === investor.email);
    if (existingIdx >= 0) {
      investors[existingIdx] = { ...investors[existingIdx], ...investor };
    } else {
      investors.push({
        id: "inv-" + Date.now(),
        createdAt: new Date().toISOString(),
        ...investor
      });
    }
    this.saveInvestors(investors);
    return investor;
  },

  deleteInvestor(id) {
    let investors = this.getInvestors();
    investors = investors.filter(i => i.id !== id);
    this.saveInvestors(investors);
  },

  // PRINTER FLEET & PIPELINE MANAGEMENT
  getPrinters() {
    this.init();
    return JSON.parse(localStorage.getItem("printers")) || DEFAULT_PRINTERS;
  },

  savePrinters(list) {
    localStorage.setItem("printers", JSON.stringify(list));
    setDoc(doc(db, "settings", "printers"), { list }).catch(console.error);
  },

  getPrinterById(id) {
    const printers = this.getPrinters();
    return printers.find(p => p.id === id) || null;
  },

  getPrintersForInvestor(investorEmail) {
    if (!investorEmail) return [];
    const normalized = investorEmail.trim().toLowerCase();
    const printers = this.getPrinters();
    return printers.filter(p => p.investorEmail.toLowerCase().trim() === normalized);
  },

  addPrinter(printer) {
    let printers = this.getPrinters();
    const newPrinter = {
      id: "prn-" + Date.now(),
      status: "Idle",
      currentSessionStart: null,
      accumulatedSessionSeconds: 0,
      unpaidHours: 0,
      lifetimeHours: 0,
      costPerHour: parseFloat(printer.costPerHour) || 0,
      sessions: [],
      payoffHistory: [],
      ...printer,
      hourlyRate: parseFloat(printer.hourlyRate) || 0,
      investorEmail: printer.investorEmail.trim().toLowerCase()
    };
    printers.push(newPrinter);
    this.savePrinters(printers);
    return newPrinter;
  },

  updatePrinter(updatedPrinter) {
    let printers = this.getPrinters();
    printers = printers.map(p => p.id === updatedPrinter.id ? updatedPrinter : p);
    this.savePrinters(printers);
    return updatedPrinter;
  },

  deletePrinter(id) {
    let printers = this.getPrinters();
    printers = printers.filter(p => p.id !== id);
    this.savePrinters(printers);
  },

  // PRINTER LIVE TIMER & CONTROL TRIGGERS
  startPrinter(printerId) {
    let printers = this.getPrinters();
    const printer = printers.find(p => p.id === printerId);
    if (!printer) return;

    if (printer.status !== "Printing") {
      printer.status = "Printing";
      printer.currentSessionStart = Date.now();
      this.savePrinters(printers);
    }
    return printer;
  },

  pausePrinter(printerId) {
    let printers = this.getPrinters();
    const printer = printers.find(p => p.id === printerId);
    if (!printer) return;

    if (printer.status === "Printing" && printer.currentSessionStart) {
      const elapsedSeconds = Math.floor((Date.now() - printer.currentSessionStart) / 1000);
      printer.accumulatedSessionSeconds = (printer.accumulatedSessionSeconds || 0) + elapsedSeconds;
      printer.currentSessionStart = null;
      printer.status = "Paused";
      this.savePrinters(printers);
    }
    return printer;
  },

  stopPrinter(printerId) {
    let printers = this.getPrinters();
    const printer = printers.find(p => p.id === printerId);
    if (!printer) return;

    let totalSeconds = printer.accumulatedSessionSeconds || 0;
    if (printer.status === "Printing" && printer.currentSessionStart) {
      totalSeconds += Math.floor((Date.now() - printer.currentSessionStart) / 1000);
    }

    const durationHours = parseFloat((totalSeconds / 3600).toFixed(2));
    const now = new Date().toISOString();

    if (durationHours > 0 || totalSeconds > 0) {
      if (!printer.sessions) printer.sessions = [];
      const sessionObj = {
        id: "sess-" + Date.now(),
        startDate: printer.currentSessionStart ? new Date(printer.currentSessionStart).toISOString() : now,
        endDate: now,
        hours: durationHours,
        rate: printer.hourlyRate,
        earnings: parseFloat((durationHours * printer.hourlyRate).toFixed(2)),
        payoffId: null
      };
      printer.sessions.unshift(sessionObj);
      printer.unpaidHours = parseFloat(((printer.unpaidHours || 0) + durationHours).toFixed(2));
      printer.lifetimeHours = parseFloat(((printer.lifetimeHours || 0) + durationHours).toFixed(2));
    }

    printer.status = "Idle";
    printer.currentSessionStart = null;
    printer.accumulatedSessionSeconds = 0;

    this.savePrinters(printers);
    return printer;
  },

  editPrinterHours(printerId, newUnpaidHours, newLifetimeHours = null) {
    let printers = this.getPrinters();
    const printer = printers.find(p => p.id === printerId);
    if (!printer) return;

    printer.unpaidHours = Math.max(0, parseFloat(newUnpaidHours) || 0);
    if (newLifetimeHours !== null) {
      printer.lifetimeHours = Math.max(0, parseFloat(newLifetimeHours) || 0);
    }
    this.savePrinters(printers);
    return printer;
  },

  triggerPayoff(printerId, notes = "Payment Settlement") {
    let printers = this.getPrinters();
    const printer = printers.find(p => p.id === printerId);
    if (!printer) return;

    const unpaidHrs = printer.unpaidHours || 0;
    const rate = printer.hourlyRate || 0;
    const amount = parseFloat((unpaidHrs * rate).toFixed(2));

    const payoffRecord = {
      id: "pay-" + Date.now(),
      date: new Date().toISOString(),
      printerId: printer.id,
      printerName: printer.name,
      serialNumber: printer.serialNumber,
      investorEmail: printer.investorEmail,
      hoursPaid: unpaidHrs,
      hourlyRate: rate,
      amountPaid: amount,
      notes: notes || "Payment Settlement"
    };

    if (!printer.payoffHistory) printer.payoffHistory = [];
    printer.payoffHistory.unshift(payoffRecord);

    // Mark current unpaid sessions as paid
    if (printer.sessions) {
      printer.sessions.forEach(s => {
        if (!s.payoffId) s.payoffId = payoffRecord.id;
      });
    }

    // Reset unpaid hours to 0
    printer.unpaidHours = 0;

    this.savePrinters(printers);
    return payoffRecord;
  },

  // ON-DEMAND CUSTOM PRINTING JOBS
  getCustomJobs() {
    this.init();
    return JSON.parse(localStorage.getItem("custom_jobs")) || DEFAULT_CUSTOM_JOBS;
  },

  saveCustomJobs(list) {
    localStorage.setItem("custom_jobs", JSON.stringify(list));
    setDoc(doc(db, "settings", "custom_jobs"), { list }).catch(console.error);
  },

  addCustomJob(job) {
    let jobs = this.getCustomJobs();
    const cost = parseFloat(job.cost) || 0;
    const price = parseFloat(job.price) || 0;
    const profit = parseFloat((price - cost).toFixed(2));

    let printerName = "Unassigned";
    let investorEmail = "N/A";

    if (job.printerId) {
      const printer = this.getPrinterById(job.printerId);
      if (printer) {
        printerName = printer.name;
        investorEmail = printer.investorEmail;
      }
    }

    const newJob = {
      id: "cjob-" + Date.now(),
      date: new Date().toISOString(),
      status: "Completed",
      printerName,
      investorEmail,
      ...job,
      cost,
      price,
      profit,
      durationHours: parseFloat(job.durationHours) || 0
    };

    jobs.unshift(newJob);
    this.saveCustomJobs(jobs);

    // If assigned to a printer, credit hours to printer unpaidHours & add session
    if (job.printerId) {
      let printers = this.getPrinters();
      const printer = printers.find(p => p.id === job.printerId);
      if (printer) {
        const hrs = parseFloat(job.durationHours) || 0;
        printer.unpaidHours = parseFloat(((printer.unpaidHours || 0) + hrs).toFixed(2));
        printer.lifetimeHours = parseFloat(((printer.lifetimeHours || 0) + hrs).toFixed(2));
        if (!printer.sessions) printer.sessions = [];
        printer.sessions.unshift({
          id: "sess-" + Date.now(),
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          hours: hrs,
          rate: printer.hourlyRate,
          earnings: parseFloat((hrs * printer.hourlyRate).toFixed(2)),
          payoffId: null
        });
        this.savePrinters(printers);
      }
    }

    return newJob;
  },

  deleteCustomJob(id) {
    let jobs = this.getCustomJobs();
    jobs = jobs.filter(j => j.id !== id);
    this.saveCustomJobs(jobs);
  },

  dispatchOrderToPrinter(orderId, printerId) {
    let orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    let printers = this.getPrinters();
    const printer = printers.find(p => p.id === printerId);

    if (order && printer) {
      order.assignedPrinterId = printer.id;
      order.assignedPrinterName = printer.name;
      order.deliveryStatus = "Printing";
      order.status = "Printing";
      this.saveOrders(orders);

      // Start target printer live timecode & status
      this.startPrinter(printer.id);
    }
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
window.DEFAULT_ALLOWED_ADMINS = DEFAULT_ALLOWED_ADMINS;
window.DEFAULT_ADMIN_ACCOUNTS = DEFAULT_ADMIN_ACCOUNTS;
window.DEFAULT_INVESTORS = DEFAULT_INVESTORS;
window.DEFAULT_PRINTERS = DEFAULT_PRINTERS;
window.DEFAULT_CUSTOM_JOBS = DEFAULT_CUSTOM_JOBS;
