// PixelPop E-Commerce and Admin Dashboard Application Controller
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  projectId: "pixelpop-cd075",
  storageBucket: "pixelpop-cd075.firebasestorage.app",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

// Initialize Database
DB.init();

  // APP STATE
  const state = {
    currentCategory: "all",
    currentSubcategory: "all",
    searchQuery: "",
    sortBy: "popular",
    activePage: "store", // "store" or "dashboard"
    selectedProduct: null,
    customization: {
      color: null,
      size: null,
      material: null,
    },
    cart: JSON.parse(localStorage.getItem("pixelpop_cart")) || [],
    emails: JSON.parse(localStorage.getItem("pixelpop_emails")) || [],
    rotation: 45,
    isDragging: false,
    startX: 0,
    isAdminLoggedIn: sessionStorage.getItem("isAdminLoggedIn") === "true",
    appliedCoupon: null,
    productsFilterCategory: "all",
    crudGalleryUrls: [],
    productsFilterSubcategory: "all",
    productsFilterPrice: 150,
    productsFilterSearch: "",
    productsFilterSort: "popular",
  };

  // DOM CACHE
  const DOM = {
    // Nav
    logoBtn: document.getElementById("logo-btn"),
    navHome: document.getElementById("nav-home"),
    navProductsTrigger: document.getElementById("nav-products-trigger"),
    navAbout: document.getElementById("nav-about"),
    navContact: document.getElementById("nav-contact"),
    navDashboard: document.getElementById("nav-dashboard"),
    cartToggleBtn: document.getElementById("cart-toggle-btn"),
    cartCountBadge: document.getElementById("cart-count-badge"),

    // Pages
    storefrontPage: document.getElementById("storefront-page"),
    productDetailPage: document.getElementById("product-detail-page"),
    adminDashboardPage: document.getElementById("admin-dashboard-page"),

    // Hero / Storefront
    heroCtaBtn: document.getElementById("hero-cta-btn"),
    categoryTabs: document.getElementById("category-tabs-container"),
    subcategoriesChips: document.getElementById("subcategories-chips-container"),
    searchBar: document.getElementById("search-bar"),
    sortSelect: document.getElementById("sort-select"),
    productsGrid: document.getElementById("products-grid-container"),

    // Detail/Customizer
    detailBackBtn: document.getElementById("detail-back-btn"),
    printBedElement: document.getElementById("print-bed-element"),
    modelSvg: document.getElementById("model-svg"),
    modelSvgPath: document.getElementById("model-svg-path"),
    infillPatternLayer: document.getElementById("infill-pattern-layer"),
    customizerStatusText: document.getElementById("customizer-status-text"),
    detailProductName: document.getElementById("detail-product-name"),
    detailRatingDisplay: document.getElementById("detail-rating-display"),
    detailProductDesc: document.getElementById("detail-product-desc"),
    detailMainImage: document.getElementById("detail-main-image"),
    detailThumbnailsContainer: document.getElementById("detail-thumbnails-container"),
    crudGalleryContainer: document.getElementById("crud-gallery-container"),
    variationsSelectors: document.getElementById("variations-selectors-container"),
    specPrintTime: document.getElementById("spec-print-time"),
    specFilamentWeight: document.getElementById("spec-filament-weight"),
    specDifficulty: document.getElementById("spec-difficulty"),
    detailPriceVal: document.getElementById("detail-price-val"),
    addToCartBtn: document.getElementById("add-to-cart-btn"),

    // Cart Drawer
    cartDrawerPanel: document.getElementById("cart-drawer-panel"),
    closeCartBtn: document.getElementById("close-cart-btn"),
    cartItemsList: document.getElementById("cart-items-list"),
    cartSubtotalVal: document.getElementById("cart-subtotal-val"),
    cartTotalVal: document.getElementById("cart-total-val"),
    goCheckoutBtn: document.getElementById("go-checkout-btn"),

    // Checkout Modal
    checkoutModalOverlay: document.getElementById("checkout-modal-overlay"),
    closeCheckoutBtn: document.getElementById("close-checkout-btn"),
    checkoutForm: document.getElementById("checkout-form"),
    checkoutItemsList: document.getElementById("checkout-items-list"),
    chkSubtotalVal: document.getElementById("chk-subtotal-val"),
    chkShippingVal: document.getElementById("chk-shipping-val"),
    chkSurchargeRow: document.getElementById("chk-surcharge-row"),
    chkSurchargeLabel: document.getElementById("chk-surcharge-label"),
    chkSurchargeVal: document.getElementById("chk-surcharge-val"),
    chkTotalVal: document.getElementById("chk-total-val"),
    deliveryOptionsContainer: document.getElementById("delivery-options-container"),
    paymentOptionsContainer: document.getElementById("payment-options-container"),
    paymentDetailsPanel: document.getElementById("payment-details-panel"),
    paymentDetailsInstructions: document.getElementById("payment-details-instructions"),
    paymentDetailsFields: document.getElementById("payment-details-fields"),
    paymentDetailsQrContainer: document.getElementById("payment-details-qr-container"),
    paymentDetailsQrImg: document.getElementById("payment-details-qr-img"),
    paymentReferenceGroup: document.getElementById("payment-reference-group"),
    paymentReferenceLabel: document.getElementById("payment-reference-label"),
    chkPaymentReference: document.getElementById("chk-payment-reference"),

    // Payments Config dashboard fields
    paymentsConfigForm: document.getElementById("payments-config-form"),
    cfgCodEnabled: document.getElementById("cfg-cod-enabled"),
    cfgCodInstructions: document.getElementById("cfg-cod-instructions"),
    cfgCodFee: document.getElementById("cfg-cod-fee"),
    cfgWishEnabled: document.getElementById("cfg-wish-enabled"),
    cfgWishPhone: document.getElementById("cfg-wish-phone"),
    cfgWishName: document.getElementById("cfg-wish-name"),
    cfgWishInstructions: document.getElementById("cfg-wish-instructions"),
    cfgWishBarcode: document.getElementById("cfg-wish-barcode"),
    cfgNeoEnabled: document.getElementById("cfg-neo-enabled"),
    cfgNeoLink: document.getElementById("cfg-neo-link"),
    cfgNeoAccount: document.getElementById("cfg-neo-account"),
    cfgNeoInstructions: document.getElementById("cfg-neo-instructions"),
    cfgNeoQr: document.getElementById("cfg-neo-qr"),

    // Pricing Calculator fields
    calcCfgSpoolCost: document.getElementById("calc-cfg-spool-cost"),
    calcCfgSpoolWeight: document.getElementById("calc-cfg-spool-weight"),
    calcCfgWattage: document.getElementById("calc-cfg-wattage"),
    calcCfgElecRate: document.getElementById("calc-cfg-elec-rate"),
    calcCfgDepreciation: document.getElementById("calc-cfg-depreciation"),
    calcCfgLaborWage: document.getElementById("calc-cfg-labor-wage"),
    calcCfgProfitMargin: document.getElementById("calc-cfg-profit-margin"),
    calcSaveDefaultsBtn: document.getElementById("calc-save-defaults-btn"),
    calcItemName: document.getElementById("calc-item-name"),
    calcWeight: document.getElementById("calc-weight"),
    calcPrintTime: document.getElementById("calc-print-time"),
    calcPrepTime: document.getElementById("calc-prep-time"),
    calcPackagingCost: document.getElementById("calc-packaging-cost"),
    calcOutSuggestedPrice: document.getElementById("calc-out-suggested-price"),
    calcOutProfitPercent: document.getElementById("calc-out-profit-percent"),
    calcOutMaterialCost: document.getElementById("calc-out-material-cost"),
    calcOutPowerCost: document.getElementById("calc-out-power-cost"),
    calcOutWearCost: document.getElementById("calc-out-wear-cost"),
    calcOutLaborCost: document.getElementById("calc-out-labor-cost"),
    calcOutPackagingCost: document.getElementById("calc-out-packaging-cost"),
    calcOutTotalCogs: document.getElementById("calc-out-total-cogs"),
    calcOutNetProfit: document.getElementById("calc-out-net-profit"),
    calcApplyCatalogBtn: document.getElementById("calc-apply-catalog-btn"),

    // Email Drawer
    emailSimulatorDrawer: document.getElementById("email-simulator-drawer"),
    emailHeaderToggle: document.getElementById("email-header-toggle"),
    emailUnreadBadge: document.getElementById("email-unread-badge"),
    emailListView: document.getElementById("email-list-view"),
    emailDetailView: document.getElementById("email-detail-view"),
    emailDetailBackBtn: document.getElementById("email-detail-back-btn"),
    emailDetailBody: document.getElementById("email-detail-body"),

    // Dashboard Overview
    statRevenue: document.getElementById("stat-revenue"),
    statOrdersCount: document.getElementById("stat-orders-count"),
    statFilamentConsumed: document.getElementById("stat-filament-consumed"),
    statActivePrints: document.getElementById("stat-active-prints"),
    revenueGraph: document.getElementById("revenue-graph"),
    filamentMetersContainer: document.getElementById("filament-meters-container"),
    dashboardInventoryGrid: document.getElementById("dashboard-inventory-grid"),
    dashboardOrdersTbody: document.getElementById("dashboard-orders-tbody"),

    // Dashboard Actions
    logoutBtn: document.getElementById("logout-btn"),
    inventoryAddItemBtn: document.getElementById("inventory-add-item-btn"),
    dbMenuItems: document.querySelectorAll(".db-menu-item"),
    dbSections: document.querySelectorAll(".db-section"),

    // Product CRUD Modal
    productFormModalOverlay: document.getElementById("product-form-modal-overlay"),
    closeProductFormBtn: document.getElementById("close-product-form-btn"),
    productCrudForm: document.getElementById("product-crud-form"),
    clientDetailsModalOverlay: document.getElementById("client-details-modal-overlay"),
    closeClientDetailsBtn: document.getElementById("close-client-details-btn"),
    clientDetailsBody: document.getElementById("client-details-body"),
    productModalTitle: document.getElementById("product-modal-title"),
    crudProductId: document.getElementById("crud-product-id"),
    crudName: document.getElementById("crud-name"),
    crudDescription: document.getElementById("crud-description"),
    crudPrice: document.getElementById("crud-price"),
    crudCategory: document.getElementById("crud-category"),
    crudSubcategory: document.getElementById("crud-subcategory"),
    crudPrintTime: document.getElementById("crud-print-time"),
    crudWeight: document.getElementById("crud-weight"),
    crudDifficulty: document.getElementById("crud-difficulty"),
    crudModelUrl: document.getElementById("crud-model-url"),
    crudColorsContainer: document.getElementById("crud-colors-container"),
    addColorOptionBtn: document.getElementById("add-color-option-btn"),
    crudSizesContainer: document.getElementById("crud-sizes-container"),
    addSizeOptionBtn: document.getElementById("add-size-option-btn"),
    crudMaterialsContainer: document.getElementById("crud-materials-container"),
    addMaterialOptionBtn: document.getElementById("add-material-option-btn"),
    adminLoginPage: document.getElementById("admin-login-page"),
    adminLoginForm: document.getElementById("admin-login-form"),
    adminEmailInput: document.getElementById("admin-email"),
    adminPasswordInput: document.getElementById("admin-password"),
    loginErrorMsg: document.getElementById("login-error-msg"),
    loginBackToStore: document.getElementById("login-back-to-store"),

    // Hero config
    heroConfigForm: document.getElementById("hero-config-form"),
    heroImagesUpload: document.getElementById("cfg-hero-images-upload"),
    heroGalleryContainer: document.getElementById("cfg-hero-gallery-container"),
    
    // Social & support config
    socialConfigForm: document.getElementById("social-config-form"),

    // Delivery Options CRUD
    addDeliveryOptionBtn: document.getElementById("add-delivery-option-btn"),
    dbDeliveryOptionsTbody: document.getElementById("db-delivery-options-tbody"),
    deliveryModalOverlay: document.getElementById("delivery-modal-overlay"),
    closeDeliveryModalBtn: document.getElementById("close-delivery-modal-btn"),
    deliveryCrudForm: document.getElementById("delivery-crud-form"),

    // Theme Config
    themeConfigForm: document.getElementById("theme-config-form"),
    cfgThemeMode: document.getElementById("cfg-theme-mode"),
    cfgThemePreset: document.getElementById("cfg-theme-preset"),
    cfgColorIndigo: document.getElementById("cfg-color-indigo"),
    cfgColorCyan: document.getElementById("cfg-color-cyan"),
    cfgColorPurple: document.getElementById("cfg-color-purple"),
    cfgColorPink: document.getElementById("cfg-color-pink"),
    cfgLogoLetter: document.getElementById("cfg-logo-letter"),
    cfgLogoText1: document.getElementById("cfg-logo-text1"),
    cfgLogoText2: document.getElementById("cfg-logo-text2"),

    // Categories Config
    dbCategoriesTbody: document.getElementById("db-categories-tbody"),
    addCategoryBtn: document.getElementById("add-category-btn"),
    categoryModalOverlay: document.getElementById("category-modal-overlay"),
    closeCategoryModalBtn: document.getElementById("close-category-modal-btn"),
    categoryCrudForm: document.getElementById("category-crud-form"),
    crudCategoryName: document.getElementById("crud-category-name"),
    subcategoryModalOverlay: document.getElementById("subcategory-modal-overlay"),
    closeSubcategoryModalBtn: document.getElementById("close-subcategory-modal-btn"),
    subcategoryCrudForm: document.getElementById("subcategory-crud-form"),
    crudSubcategoryName: document.getElementById("crud-subcategory-name"),
    crudSubcategoryCatId: document.getElementById("crud-subcategory-cat-id"),

    // Coupons Dashboard CRUD
    dbCouponsTbody: document.getElementById("db-coupons-tbody"),
    couponCrudForm: document.getElementById("coupon-crud-form"),

    // Cart Drawer Coupon inputs
    cartCouponInput: document.getElementById("cart-coupon-input"),
    applyCouponBtn: document.getElementById("apply-coupon-btn"),
    cartCouponStatus: document.getElementById("cart-coupon-status"),
    cartDiscountRow: document.getElementById("cart-discount-row"),
    cartDiscountLabel: document.getElementById("cart-discount-label"),
    cartDiscountVal: document.getElementById("cart-discount-val"),

    // Checkout Modal Coupon display
    chkDiscountRow: document.getElementById("chk-discount-row"),
    chkDiscountLabel: document.getElementById("chk-discount-label"),
    chkDiscountVal: document.getElementById("chk-discount-val"),

    // Products Page Views
    productsPage: document.getElementById("products-page"),
    productsPageGrid: document.getElementById("products-page-grid-container"),
    productsPageTitle: document.getElementById("products-page-title"),
    productsCountLabel: document.getElementById("products-count-label"),
    sidebarCategoriesList: document.getElementById("sidebar-categories-list"),
    sidebarSubcategoriesGroup: document.getElementById("sidebar-subcategories-group"),
    sidebarSubcategoriesList: document.getElementById("sidebar-subcategories-list"),
    filterPriceRange: document.getElementById("filter-price-range"),
    priceLimitLabel: document.getElementById("price-limit-label"),
    filterSearchInput: document.getElementById("filter-search-input"),
    filterSortSelect: document.getElementById("filter-sort-select"),

    // Curated Home Grids
    featuredProductsGrid: document.getElementById("featured-products-grid"),
    priceDropsProductsGrid: document.getElementById("price-drops-products-grid"),
    newArrivalsProductsGrid: document.getElementById("new-arrivals-products-grid"),

    // Admin Hero Home config inputs
    cfgFeaturedTitle: document.getElementById("cfg-featured-title"),
    cfgFeaturedDesc: document.getElementById("cfg-featured-desc"),
    cfgPricedropTitle: document.getElementById("cfg-pricedrop-title"),
    cfgPricedropDesc: document.getElementById("cfg-pricedrop-desc"),
    cfgNewarrivalTitle: document.getElementById("cfg-newarrival-title"),
    cfgNewarrivalDesc: document.getElementById("cfg-newarrival-desc"),

    // Admin Product CRUD checkboxes
    crudIsFeatured: document.getElementById("crud-is-featured"),
    crudIsNewArrival: document.getElementById("crud-is-new-arrival"),
    crudIsPriceDrop: document.getElementById("crud-is-price-drop"),
    crudOriginalPrice: document.getElementById("crud-original-price"),
    crudOriginalPriceGroup: document.getElementById("crud-original-price-group"),
  };

  // Helper map of hexes for swatch names auto-sync and repair
  const swatchHexMap = {
    "silk gold": "#ffd700",
    "gold": "#ffd700",
    "matte black": "#1a1a1a",
    "black": "#1a1a1a",
    "stealth black": "#0f0f0f",
    "cosmic blue": "#1e3a8a",
    "blue": "#1e3a8a",
    "classic blue": "#1e3a8a",
    "steel grey": "#4b5563",
    "crimson red": "#dc2626",
    "red": "#dc2626",
    "marble white": "#e8e8e8",
    "white": "#e8e8e8",
    "glow green": "#ccff33",
    "lime": "#a3e635",
    "lime green": "#a3e635",
    "metallic purple": "#7c3aed",
    "purple": "#7c3aed",
    "silver chrome": "#e2e8f0",
    "orange": "#ea580c"
  };

  // ==========================================
  // INITIALIZATION & ROUTING
  // ==========================================

  function initApp() {
    applyTheme();
    renderHeaderProductsDropdown();
    renderCuratedHomeSections();
    updateCartUI();
    renderEmailList();
    setupEmailAutoChecks();
    renderHeroContent();
    renderDeliveryOptions();
    renderSocialSettings();
    initSuperheroSpawner();

    // Default Email Seed if empty
    if (state.emails.length === 0) {
      addSimulatedEmail(
        "welcome@pixelpop.com",
        "PixelPop Welcome Package",
        `Welcome to PixelPop! Check out our new 3D customizer. Rotate models on the print bed in real-time, pick custom filaments, and get automatic printing confirmation emails! Our admin panel tracks all completed print weights and filaments. Happy printing!`
      );
    }
  }

  function changePage(page, pushState = true) {
    state.activePage = page;

    // Reset active visual states in header links
    if (DOM.navHome) DOM.navHome.classList.remove("active");
    if (DOM.navAbout) DOM.navAbout.classList.remove("active");
    if (DOM.navContact) DOM.navContact.classList.remove("active");
    if (DOM.navDashboard) DOM.navDashboard.classList.remove("active");
    if (DOM.navProductsTrigger) DOM.navProductsTrigger.classList.remove("active");

    DOM.storefrontPage.style.display = "none";
    DOM.productDetailPage.style.display = "none";
    DOM.adminDashboardPage.style.display = "none";
    if (DOM.adminLoginPage) DOM.adminLoginPage.style.display = "none";
    if (DOM.productsPage) DOM.productsPage.style.display = "none";

    const footer = document.getElementById("store-footer");
    const waWidget = document.getElementById("whatsapp-widget");
    if (page === "dashboard" || page === "admin-login") {
      if (footer) footer.style.display = "none";
      if (waWidget) waWidget.style.display = "none";
    } else {
      if (footer) footer.style.display = "block";
      const settings = DB.getSocialSettings();
      if (waWidget) {
        waWidget.style.display = settings.whatsappEnabled ? "block" : "none";
      }
    }

    if (page === "store") {
      DOM.storefrontPage.style.display = "block";
      if (pushState && window.location.pathname !== "/") {
        history.pushState({ page: "store" }, "", "/");
      }
    } else if (page === "products") {
      if (DOM.navProductsTrigger) DOM.navProductsTrigger.classList.add("active");
      if (DOM.productsPage) DOM.productsPage.style.display = "block";
      renderProductsPage();
      if (pushState && window.location.pathname !== "/products") {
        history.pushState({ page: "products" }, "", "/products");
      }
    } else if (page === "detail") {
      DOM.productDetailPage.style.display = "block";
      if (pushState && state.selectedProduct) {
        if (window.location.pathname !== `/product/${state.selectedProduct.id}`) {
          history.pushState({ page: "detail", id: state.selectedProduct.id }, "", `/product/${state.selectedProduct.id}`);
        }
      }
    } else if (page === "dashboard") {
      if (!state.isAdminLoggedIn) {
        changePage("admin-login", pushState);
        return;
      }
      if (DOM.navDashboard) DOM.navDashboard.classList.add("active");
      DOM.adminDashboardPage.style.display = "block";
      initDashboard();
      if (pushState && window.location.pathname !== "/admin") {
        history.pushState({ page: "dashboard" }, "", "/admin");
      }
    } else if (page === "admin-login") {
      if (DOM.navDashboard) DOM.navDashboard.classList.add("active");
      if (DOM.adminLoginPage) DOM.adminLoginPage.style.display = "flex";
      if (pushState && window.location.pathname !== "/admin") {
        history.pushState({ page: "admin-login" }, "", "/admin");
      }
    }
  }

  function handleUrlRouting() {
    const path = window.location.pathname;
    const hash = window.location.hash;

    if (path === "/admin" || hash === "#admin") {
      changePage("dashboard", false);
    } else if (path === "/products" || hash === "#products") {
      changePage("products", false);
    } else if (path.startsWith("/product/")) {
      const prodId = path.split("/").pop();
      const product = DB.getProductById(prodId);
      if (product) {
        state.selectedProduct = product;
        state.customization.color = product.variations.colors[0];
        state.customization.size = product.variations.sizes[0];
        state.customization.material = product.variations.materials[0];

        DOM.detailProductName.textContent = product.name;
        DOM.detailProductDesc.textContent = product.description;
        DOM.detailRatingDisplay.innerHTML = `★ ${product.rating.toFixed(1)} <span class="card-reviews">(${product.reviewsCount} verified reviews)</span>`;

        DOM.specPrintTime.textContent = product.specifications.printTime;
        DOM.specFilamentWeight.textContent = product.specifications.filamentUsed;
        DOM.specDifficulty.textContent = product.specifications.difficulty;

        renderVariationSelectors(product);
        updateCustomizerVisuals();
        changePage("detail", false);
      } else {
        changePage("store", false);
      }
    } else {
      changePage("store", false);
    }
  }

  window.addEventListener("popstate", () => {
    handleUrlRouting();
  });

  function renderHeaderProductsDropdown() {
    const dropdown = document.getElementById("products-dropdown-menu");
    if (!dropdown) return;

    const categories = DB.getCategories();
    let html = `<span class="dropdown-item" data-cat="all">All Products</span>`;
    categories.forEach(cat => {
      html += `<span class="dropdown-item" data-cat="${cat.id}">${cat.name}</span>`;
    });
    dropdown.innerHTML = html;

    // Rebind dropdown click events
    dropdown.querySelectorAll(".dropdown-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const catId = e.target.dataset.cat;
        
        state.productsFilterCategory = catId;
        state.productsFilterSubcategory = "all";
        state.productsFilterSearch = "";
        if (DOM.filterSearchInput) DOM.filterSearchInput.value = "";
        state.productsFilterPrice = 150;
        if (DOM.filterPriceRange) DOM.filterPriceRange.value = 150;
        if (DOM.priceLimitLabel) DOM.priceLimitLabel.textContent = "$150.00";
        
        changePage("products");
      });
    });
  }

  // ==========================================
  // CATALOG RENDERING & FILTERING HELPERS
  // ==========================================

  function renderProductsGrid(products, containerElement) {
    if (!containerElement) return;
    if (products.length === 0) {
      containerElement.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 4rem 0;">No items found.</div>`;
      return;
    }
    
    containerElement.innerHTML = products.map(p => {
      const displayPrice = p.basePrice.toFixed(2);
      const priceHtml = (p.isPriceDrop && p.originalPrice)
        ? `<div class="card-price-container">
             <span class="card-original-price">$${parseFloat(p.originalPrice).toFixed(2)}</span>
             <span class="card-price">$${displayPrice}</span>
           </div>`
        : `<span class="card-price">$${displayPrice}</span>`;
        
      return `
        <div class="glass-panel product-card" data-id="${p.id}">
          <div class="card-media">
            <img class="card-image" src="${p.defaultImage}" alt="${p.name}">
            <div class="card-tag">${p.subcategory}</div>
          </div>
          <div class="card-content">
            <h3 class="card-title">${p.name}</h3>
            <div class="card-rating">
              ★ ${p.rating.toFixed(1)} <span class="card-reviews">(${p.reviewsCount})</span>
            </div>
            <div class="card-footer">
              ${priceHtml}
              <button class="btn btn-primary btn-sm browse-item-btn" data-id="${p.id}">Buy 🛒</button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Add click handlers for buttons and cards within this container
    containerElement.querySelectorAll(".browse-item-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        openProductDetails(e.target.dataset.id);
      });
    });

    containerElement.querySelectorAll(".product-card").forEach(card => {
      card.addEventListener("click", () => {
        openProductDetails(card.dataset.id);
      });
    });
  }

  function renderCategoryTabs() {
    if (!DOM.categoryTabs) return;
    const categories = DB.getCategories();
    let html = `<button class="category-tab ${state.currentCategory === 'all' ? 'active' : ''}" data-id="all">All Items</button>`;

    categories.forEach(cat => {
      html += `<button class="category-tab ${state.currentCategory === cat.id ? 'active' : ''}" data-id="${cat.id}">${cat.name}</button>`;
    });

    DOM.categoryTabs.innerHTML = html;

    // Click Handlers
    DOM.categoryTabs.querySelectorAll(".category-tab").forEach(tab => {
      tab.addEventListener("click", (e) => {
        state.currentCategory = e.target.dataset.id;
        state.currentSubcategory = "all"; // Reset subcat
        DOM.categoryTabs.querySelectorAll(".category-tab").forEach(t => t.classList.remove("active"));
        e.target.classList.add("active");
        renderSubcategoryChips();
        renderProductsList();
      });
    });

    renderSubcategoryChips();
  }

  function renderSubcategoryChips() {
    if (!DOM.subcategoriesChips) return;
    if (state.currentCategory === "all") {
      DOM.subcategoriesChips.innerHTML = "";
      return;
    }

    const categories = DB.getCategories();
    const activeCat = categories.find(c => c.id === state.currentCategory);
    if (!activeCat) return;

    let html = `<span class="subcategory-chip ${state.currentSubcategory === 'all' ? 'active' : ''}" data-sub="all">All ${activeCat.name}</span>`;
    activeCat.subcategories.forEach(sub => {
      html += `<span class="subcategory-chip ${state.currentSubcategory === sub ? 'active' : ''}" data-sub="${sub}">${sub}</span>`;
    });

    DOM.subcategoriesChips.innerHTML = html;

    // Click Handlers
    DOM.subcategoriesChips.querySelectorAll(".subcategory-chip").forEach(chip => {
      chip.addEventListener("click", (e) => {
        state.currentSubcategory = e.target.dataset.sub;
        DOM.subcategoriesChips.querySelectorAll(".subcategory-chip").forEach(c => c.classList.remove("active"));
        e.target.classList.add("active");
        renderProductsList();
      });
    });
  }

  function renderProductsList() {
    if (!DOM.productsGrid) return;
    let products = DB.getProducts();

    // Filters
    if (state.currentCategory !== "all") {
      products = products.filter(p => p.category === state.currentCategory);
    }
    if (state.currentSubcategory !== "all") {
      products = products.filter(p => p.subcategory === state.currentSubcategory);
    }
    if (state.searchQuery.trim() !== "") {
      const q = state.searchQuery.toLowerCase();
      products = products.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    // Sort
    if (state.sortBy === "price-low") {
      products.sort((a, b) => a.basePrice - b.basePrice);
    } else if (state.sortBy === "price-high") {
      products.sort((a, b) => b.basePrice - a.basePrice);
    } else if (state.sortBy === "rating") {
      products.sort((a, b) => b.rating - a.rating);
    } else {
      // popular
      products.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    // Render using grid helper
    renderProductsGrid(products, DOM.productsGrid);
  }

  // ==========================================
  // CURATED HOME SECTIONS RENDERING
  // ==========================================

  function renderCuratedHomeSections() {
    const products = DB.getProducts();
    const hero = DB.getHeroContent();
    
    // Update section headings and subheadings
    const featuredTitleEl = document.getElementById("home-featured-title");
    const featuredDescEl = document.getElementById("home-featured-desc");
    const pricedropsTitleEl = document.getElementById("home-pricedrops-title");
    const pricedropsDescEl = document.getElementById("home-pricedrops-desc");
    const newarrivalsTitleEl = document.getElementById("home-newarrivals-title");
    const newarrivalsDescEl = document.getElementById("home-newarrivals-desc");

    if (featuredTitleEl) featuredTitleEl.textContent = hero.featuredTitle || "⭐ Featured Prints";
    if (featuredDescEl) featuredDescEl.textContent = hero.featuredSubtitle || "Hand-picked premium models from our designer collection";
    if (pricedropsTitleEl) pricedropsTitleEl.textContent = hero.priceDropTitle || "🔥 Price Drops";
    if (pricedropsDescEl) pricedropsDescEl.textContent = hero.priceDropSubtitle || "Special discounts and limited-time filament deals";
    if (newarrivalsTitleEl) newarrivalsTitleEl.textContent = hero.newArrivalTitle || "✨ New Arrivals";
    if (newarrivalsDescEl) newarrivalsDescEl.textContent = hero.newArrivalSubtitle || "Freshly sliced models and newly calibrated designs";

    // Filter lists
    const featuredProds = products.filter(p => p.isFeatured);
    const priceDropProds = products.filter(p => p.isPriceDrop);
    const newArrivalProds = products.filter(p => p.isNewArrival);

    // Render grids
    renderProductsGrid(featuredProds, DOM.featuredProductsGrid);
    renderProductsGrid(priceDropProds, DOM.priceDropsProductsGrid);
    renderProductsGrid(newArrivalProds, DOM.newArrivalsProductsGrid);
  }

  // ==========================================
  // DEDICATED PRODUCTS LISTING PAGE VIEW
  // ==========================================

  function renderProductsPageGrid() {
    if (!DOM.productsPageGrid) return;
    let products = DB.getProducts();

    // Apply Category filter
    if (state.productsFilterCategory !== "all") {
      products = products.filter(p => p.category === state.productsFilterCategory);
    }

    // Apply Subcategory filter
    if (state.productsFilterSubcategory !== "all") {
      products = products.filter(p => p.subcategory === state.productsFilterSubcategory);
    }

    // Apply Max Price filter
    products = products.filter(p => p.basePrice <= state.productsFilterPrice);

    // Apply Search filter
    if (state.productsFilterSearch.trim() !== "") {
      const q = state.productsFilterSearch.toLowerCase();
      products = products.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    // Apply Sorting
    const sortVal = state.productsFilterSort;
    if (sortVal === "price-low") {
      products.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortVal === "price-high") {
      products.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortVal === "rating") {
      products.sort((a, b) => b.rating - a.rating);
    } else {
      // popular
      products.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    // Render using our helper
    renderProductsGrid(products, DOM.productsPageGrid);

    // Update Count label
    if (DOM.productsCountLabel) {
      DOM.productsCountLabel.textContent = `${products.length} items found`;
    }
  }

  function renderProductsPage() {
    // Render categories in sidebar
    const categories = DB.getCategories();
    const products = DB.getProducts();
    
    let catHtml = `
      <div class="sidebar-cat-item ${state.productsFilterCategory === 'all' ? 'active' : ''}" data-id="all">
        All Products (${products.length})
      </div>
    `;
    
    categories.forEach(cat => {
      const count = products.filter(p => p.category === cat.id).length;
      catHtml += `
        <div class="sidebar-cat-item ${state.productsFilterCategory === cat.id ? 'active' : ''}" data-id="${cat.id}">
          ${cat.name} (${count})
        </div>
      `;
    });
    
    if (DOM.sidebarCategoriesList) {
      DOM.sidebarCategoriesList.innerHTML = catHtml;

      // Bind category click events
      DOM.sidebarCategoriesList.querySelectorAll(".sidebar-cat-item").forEach(item => {
        item.addEventListener("click", (e) => {
          state.productsFilterCategory = e.currentTarget.dataset.id;
          state.productsFilterSubcategory = "all"; // Reset subcategory
          renderProductsPage();
        });
      });
    }

    // Render subcategories in sidebar
    if (state.productsFilterCategory === "all") {
      if (DOM.sidebarSubcategoriesGroup) DOM.sidebarSubcategoriesGroup.style.display = "none";
    } else {
      const activeCat = categories.find(c => c.id === state.productsFilterCategory);
      if (activeCat && activeCat.subcategories && activeCat.subcategories.length > 0) {
        if (DOM.sidebarSubcategoriesGroup) DOM.sidebarSubcategoriesGroup.style.display = "block";
        
        const subCountAll = products.filter(p => p.category === activeCat.id).length;
        let subHtml = `
          <div class="sidebar-sub-item ${state.productsFilterSubcategory === 'all' ? 'active' : ''}" data-sub="all">
            All ${activeCat.name} (${subCountAll})
          </div>
        `;
        
        activeCat.subcategories.forEach(sub => {
          const count = products.filter(p => p.category === activeCat.id && p.subcategory === sub).length;
          subHtml += `
            <div class="sidebar-sub-item ${state.productsFilterSubcategory === sub ? 'active' : ''}" data-sub="${sub}">
              ${sub} (${count})
            </div>
          `;
        });
        
        if (DOM.sidebarSubcategoriesList) {
          DOM.sidebarSubcategoriesList.innerHTML = subHtml;

          // Bind subcategory click events
          DOM.sidebarSubcategoriesList.querySelectorAll(".sidebar-sub-item").forEach(item => {
            item.addEventListener("click", (e) => {
              state.productsFilterSubcategory = e.currentTarget.dataset.sub;
              
              // Set active class
              DOM.sidebarSubcategoriesList.querySelectorAll(".sidebar-sub-item").forEach(el => el.classList.remove("active"));
              e.currentTarget.classList.add("active");
              
              renderProductsPageGrid();
            });
          });
        }
      } else {
        if (DOM.sidebarSubcategoriesGroup) DOM.sidebarSubcategoriesGroup.style.display = "none";
      }
    }

    // Sync price range input
    if (DOM.filterPriceRange) {
      DOM.filterPriceRange.value = state.productsFilterPrice;
    }
    if (DOM.priceLimitLabel) {
      DOM.priceLimitLabel.textContent = `$${parseFloat(state.productsFilterPrice).toFixed(2)}`;
    }

    // Sync search input
    if (DOM.filterSearchInput) {
      DOM.filterSearchInput.value = state.productsFilterSearch;
    }

    // Sync sort dropdown
    if (DOM.filterSortSelect) {
      DOM.filterSortSelect.value = state.productsFilterSort;
    }

    // Render products grid
    renderProductsPageGrid();
  }

  // ==========================================
  // PRODUCT DETAILS & 3D CUSTOMIZER
  // ==========================================

  function openProductDetails(productId) {
    const product = DB.getProductById(productId);
    if (!product) return;

    state.selectedProduct = product;

    // Set default variation selection values
    state.customization.color = product.variations.colors[0];
    state.customization.size = product.variations.sizes[0];
    state.customization.material = product.variations.materials[0];

    // Populate Fields
    DOM.detailProductName.textContent = product.name;
    DOM.detailProductDesc.textContent = product.description;
    DOM.detailRatingDisplay.innerHTML = `★ ${product.rating.toFixed(1)} <span class="card-reviews">(${product.reviewsCount} verified reviews)</span>`;
    DOM.specPrintTime.textContent = product.specifications.printTime;
    DOM.specFilamentWeight.textContent = product.specifications.filamentUsed;
    DOM.specDifficulty.textContent = product.specifications.difficulty;

    // Set default main image and load thumbnails list
    if (product.gallery && product.gallery.length > 0) {
      DOM.detailMainImage.src = product.gallery[0];
      DOM.detailThumbnailsContainer.innerHTML = product.gallery.map((imgUrl, index) => `
        <img class="detail-thumb ${index === 0 ? 'active' : ''}" src="${imgUrl}" alt="Thumbnail ${index + 1}" data-index="${index}">
      `).join("");
      DOM.detailThumbnailsContainer.style.display = "flex";
      
      // Bind click handlers to thumbnails
      DOM.detailThumbnailsContainer.querySelectorAll(".detail-thumb").forEach(thumb => {
        thumb.addEventListener("click", (e) => {
          DOM.detailThumbnailsContainer.querySelectorAll(".detail-thumb").forEach(t => t.classList.remove("active"));
          e.currentTarget.classList.add("active");
          DOM.detailMainImage.src = e.currentTarget.src;
        });
      });
    } else {
      DOM.detailMainImage.src = product.defaultImage || "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=600&q=80";
      DOM.detailThumbnailsContainer.innerHTML = "";
      DOM.detailThumbnailsContainer.style.display = "none";
    }

    // Render Selectors
    renderVariationSelectors(product);

    // Update Customizer Visuals & Price
    updateCustomizerVisuals();

    changePage("detail");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderVariationSelectors(product) {
    let html = "";

    // 1. Color Picker
    if (product.variations.colors && product.variations.colors.length > 0) {
      html += `
        <div class="variation-group">
          <div class="variation-label">
            <span>Filament Swatch Color</span>
            <span class="label-val" id="color-val-label">${state.customization.color.name}</span>
          </div>
          <div class="color-swatches">
            ${product.variations.colors.map(col => `
              <div class="color-swatch ${state.customization.color.name === col.name ? 'active' : ''}" 
                   style="background: ${col.hex}" 
                   data-name="${col.name}" 
                   title="${col.name}">
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    // 2. Sizes Chips
    if (product.variations.sizes && product.variations.sizes.length > 0) {
      html += `
        <div class="variation-group">
          <div class="variation-label">
            <span>Dimension Scaling</span>
            <span class="label-val" id="size-val-label">${state.customization.size.name}</span>
          </div>
          <div class="chip-options">
            ${product.variations.sizes.map(sz => {
        const sign = sz.priceModifier >= 0 ? "+" : "";
        const modText = sz.priceModifier !== 0 ? ` (${sign}$${sz.priceModifier.toFixed(2)})` : "";
        return `
                <div class="chip-option ${state.customization.size.name === sz.name ? 'active' : ''}" data-type="size" data-name="${sz.name}">
                  <span>${sz.name}</span>
                  <div class="chip-meta">Scale: ${sz.scale}${modText}</div>
                </div>
              `;
      }).join("")}
          </div>
        </div>
      `;
    }

    // 3. Material Chips
    if (product.variations.materials && product.variations.materials.length > 0) {
      html += `
        <div class="variation-group">
          <div class="variation-label">
            <span>Filament Material Grade</span>
            <span class="label-val" id="material-val-label">${state.customization.material.name}</span>
          </div>
          <div class="chip-options">
            ${product.variations.materials.map(mat => {
        const sign = mat.priceModifier >= 0 ? "+" : "";
        const modText = mat.priceModifier !== 0 ? ` (${sign}$${mat.priceModifier.toFixed(2)})` : "";
        return `
                <div class="chip-option ${state.customization.material.name === mat.name ? 'active' : ''}" data-type="material" data-name="${mat.name}">
                  <span>${mat.name}</span>
                  <div class="chip-meta">${mat.description}${modText}</div>
                </div>
              `;
      }).join("")}
          </div>
        </div>
      `;
    }

    DOM.variationsSelectors.innerHTML = html;

    // Attach Listeners
    // Swatches
    document.querySelectorAll(".color-swatch").forEach(swatch => {
      swatch.addEventListener("click", (e) => {
        const colorName = e.target.dataset.name;
        state.customization.color = product.variations.colors.find(c => c.name === colorName);
        document.querySelectorAll(".color-swatch").forEach(s => s.classList.remove("active"));
        e.target.classList.add("active");
        document.getElementById("color-val-label").textContent = colorName;
        updateCustomizerVisuals();
      });
    });

    // Chips
    document.querySelectorAll(".chip-option").forEach(chip => {
      chip.addEventListener("click", (e) => {
        const target = e.currentTarget;
        const type = target.dataset.type;
        const name = target.dataset.name;

        if (type === "size") {
          state.customization.size = product.variations.sizes.find(s => s.name === name);
          document.querySelectorAll('.chip-option[data-type="size"]').forEach(c => c.classList.remove("active"));
          document.getElementById("size-val-label").textContent = name;
        } else if (type === "material") {
          state.customization.material = product.variations.materials.find(m => m.name === name);
          document.querySelectorAll('.chip-option[data-type="material"]').forEach(c => c.classList.remove("active"));
          document.getElementById("material-val-label").textContent = name;
        }

        target.classList.add("active");
        updateCustomizerVisuals();
      });
    });
  }

  function updateCustomizerVisuals() {
    const prod = state.selectedProduct;
    if (!prod) return;

    // Calculate Price
    const base = prod.basePrice;
    const cMod = state.customization.color ? state.customization.color.priceModifier : 0;
    const sMod = state.customization.size ? state.customization.size.priceModifier : 0;
    const mMod = state.customization.material ? state.customization.material.priceModifier : 0;
    const totalPrice = base + cMod + sMod + mMod;

    DOM.detailPriceVal.textContent = `$${totalPrice.toFixed(2)}`;

    // Set CSS parameters on preview panel
    if (state.customization.color) {
      let colorValue = state.customization.color.hex;
      // If it's a rainbow gradient, apply it as a background mask or fallback
      if (colorValue.includes("gradient")) {
        DOM.modelSvg.style.setProperty("--model-color", "#d946ef"); // Fallback
      } else {
        DOM.modelSvg.style.setProperty("--model-color", colorValue);
      }
    }

    if (state.customization.size) {
      const scaleStr = state.customization.size.scale; // e.g. "120%"
      const scaleVal = parseFloat(scaleStr) / 100;
      DOM.modelSvg.style.setProperty("--model-scale", scaleVal);

      // Scale weight and time accordingly
      const defaultWeight = parseInt(prod.specifications.filamentUsed) || 50;
      const calculatedWeight = Math.round(defaultWeight * scaleVal * scaleVal * scaleVal); // Cubic scaling
      DOM.specFilamentWeight.textContent = `${calculatedWeight}g`;

      const defaultTime = parseFloat(prod.specifications.printTime) || 4;
      const calculatedTime = (defaultTime * scaleVal * scaleVal).toFixed(1); // Quadratic scaling
      DOM.specPrintTime.textContent = `${calculatedTime} hours`;
    }

    // Set image display fallback if exists
    if (state.customization.color && prod.images && prod.images[state.customization.color.name]) {
      const colorImgUrl = prod.images[state.customization.color.name];
      DOM.detailMainImage.src = colorImgUrl;
      // Mark matching thumbnail as active
      if (DOM.detailThumbnailsContainer) {
        DOM.detailThumbnailsContainer.querySelectorAll(".detail-thumb").forEach(thumb => {
          if (thumb.src === colorImgUrl) {
            thumb.classList.add("active");
          } else {
            thumb.classList.remove("active");
          }
        });
      }
    }

    // Update infill representation based on material
    if (state.customization.material) {
      if (state.customization.material.name.includes("Durable") || state.customization.material.name.includes("Tough") || state.customization.material.name.includes("Waterproof")) {
        DOM.infillPatternLayer.style.setProperty("--infill-size", "12px");
        DOM.infillPatternLayer.style.setProperty("--infill-image", "repeating-linear-gradient(45deg, var(--model-color) 0, var(--model-color) 1px, transparent 0, transparent 50%)");
      } else {
        DOM.infillPatternLayer.style.setProperty("--infill-size", "24px");
        DOM.infillPatternLayer.style.setProperty("--infill-image", "radial-gradient(circle, var(--model-color) 10%, transparent 11%)");
      }
    }
  }

  // Drag-to-Rotate 3D Plate bed Simulation
  DOM.printBedElement.style.transform = `rotateX(60deg) rotateZ(${state.rotation}deg)`;
  DOM.modelSvg.style.transform = `rotateX(60deg) rotateZ(${state.rotation}deg) scale(var(--model-scale, 1))`;

  const onDragStart = (e) => {
    state.isDragging = true;
    state.startX = e.pageX || e.touches[0].pageX;
    DOM.customizerStatusText.textContent = "Rotating Build Plate...";
  };

  const onDragMove = (e) => {
    if (!state.isDragging) return;
    const currentX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
    const diffX = currentX - state.startX;
    state.rotation += diffX * 0.5; // Drag sensitivity
    state.startX = currentX;

    // Clamp or wrap
    state.rotation = state.rotation % 360;

    DOM.printBedElement.style.transform = `rotateX(60deg) rotateZ(${state.rotation}deg)`;
    DOM.modelSvg.style.transform = `rotateX(30deg) rotateZ(${state.rotation}deg) scale(var(--model-scale, 1))`;
  };

  const onDragEnd = () => {
    if (!state.isDragging) return;
    state.isDragging = false;
    DOM.customizerStatusText.textContent = "Interactive Customization Bed";
  };

  // Mouse Listeners
  DOM.printBedElement.parentElement.addEventListener("mousedown", onDragStart);
  window.addEventListener("mousemove", onDragMove);
  window.addEventListener("mouseup", onDragEnd);

  // Touch Listeners (Mobile support)
  DOM.printBedElement.parentElement.addEventListener("touchstart", onDragStart);
  window.addEventListener("touchmove", onDragMove);
  window.addEventListener("touchend", onDragEnd);

  // Add to Cart Action
  DOM.addToCartBtn.addEventListener("click", () => {
    const prod = state.selectedProduct;
    if (!prod) return;

    const cartItem = {
      id: `${prod.id}-${state.customization.color.name}-${state.customization.size.name}-${state.customization.material.name}`.replace(/\s+/g, '-').toLowerCase(),
      productId: prod.id,
      name: prod.name,
      image: prod.images[state.customization.color.name] || prod.defaultImage,
      color: state.customization.color.name,
      size: state.customization.size.name,
      material: state.customization.material.name,
      basePrice: prod.basePrice,
      price: prod.basePrice + state.customization.color.priceModifier + state.customization.size.priceModifier + state.customization.material.priceModifier,
      weight: DOM.specFilamentWeight.textContent,
      qty: 1
    };

    // Check duplicate
    const existingIndex = state.cart.findIndex(item => item.id === cartItem.id);
    if (existingIndex > -1) {
      state.cart[existingIndex].qty += 1;
    } else {
      state.cart.push(cartItem);
    }

    // Save & Update
    localStorage.setItem("pixelpop_cart", JSON.stringify(state.cart));
    updateCartUI();

    // Trigger Micro-animation notification
    DOM.addToCartBtn.textContent = "Added! ✓";
    DOM.addToCartBtn.style.background = "linear-gradient(135deg, var(--accent-green), #059669)";
    setTimeout(() => {
      DOM.addToCartBtn.textContent = "Add to Cart 🛒";
      DOM.addToCartBtn.style.background = "";
    }, 1500);

    // Open Cart Drawer automatically to show feedback
    DOM.cartDrawerPanel.classList.add("open");
  });

  // ==========================================
  // SHOPPING CART DRAWER
  // ==========================================

  DOM.cartToggleBtn.addEventListener("click", () => {
    DOM.cartDrawerPanel.classList.add("open");
  });
  DOM.closeCartBtn.addEventListener("click", () => {
    DOM.cartDrawerPanel.classList.remove("open");
  });

  function updateCartUI() {
    // Update Badge
    const count = state.cart.reduce((sum, item) => sum + item.qty, 0);
    DOM.cartCountBadge.textContent = count;
    DOM.cartCountBadge.style.display = count > 0 ? "grid" : "none";

    // Populate List
    if (state.cart.length === 0) {
      DOM.cartItemsList.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">🛒</div>
          <p>Your shopping tray is empty.</p>
        </div>
      `;
      DOM.cartSubtotalVal.textContent = "$0.00";
      DOM.cartTotalVal.textContent = "$0.00";
      DOM.goCheckoutBtn.disabled = true;
      if (DOM.cartDiscountRow) DOM.cartDiscountRow.style.display = "none";
      if (DOM.cartCouponStatus) DOM.cartCouponStatus.textContent = "";
      if (DOM.cartCouponInput) DOM.cartCouponInput.value = "";
      state.appliedCoupon = null;
      return;
    }

    DOM.goCheckoutBtn.disabled = false;
    DOM.cartItemsList.innerHTML = state.cart.map(item => `
      <div class="cart-item">
        <img class="cart-item-image" src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <span class="cart-item-title">${item.name}</span>
          <span class="cart-item-meta">${item.color} | ${item.size} | ${item.material}</span>
          <div class="cart-item-bottom">
            <div class="qty-selectors">
              <button class="qty-btn dec-qty" data-id="${item.id}">-</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn inc-qty" data-id="${item.id}">+</button>
            </div>
            <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
            <button class="remove-item-btn remove-cart" data-id="${item.id}">Remove</button>
          </div>
        </div>
      </div>
    `).join("");

    // Calculate Subtotals
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    DOM.cartSubtotalVal.textContent = `$${subtotal.toFixed(2)}`;

    let discountAmt = 0;
    if (state.appliedCoupon) {
      if (state.appliedCoupon.type === "percent") {
        discountAmt = subtotal * (state.appliedCoupon.value / 100);
      } else if (state.appliedCoupon.type === "fixed") {
        discountAmt = state.appliedCoupon.value;
      }
      discountAmt = Math.min(discountAmt, subtotal);

      DOM.cartDiscountLabel.textContent = state.appliedCoupon.type === "percent" ? `${state.appliedCoupon.value}%` : `$${state.appliedCoupon.value}`;
      DOM.cartDiscountVal.textContent = `-$${discountAmt.toFixed(2)}`;
      DOM.cartDiscountRow.style.display = "flex";
    } else {
      DOM.cartDiscountRow.style.display = "none";
    }

    const finalTotal = subtotal - discountAmt;
    DOM.cartTotalVal.textContent = `$${finalTotal.toFixed(2)}`;

    // Handlers
    document.querySelectorAll(".dec-qty").forEach(btn => {
      btn.addEventListener("click", () => updateQty(btn.dataset.id, -1));
    });
    document.querySelectorAll(".inc-qty").forEach(btn => {
      btn.addEventListener("click", () => updateQty(btn.dataset.id, 1));
    });
    document.querySelectorAll(".remove-cart").forEach(btn => {
      btn.addEventListener("click", () => removeCartItem(btn.dataset.id));
    });
  }

  function updateQty(itemId, modifier) {
    const item = state.cart.find(i => i.id === itemId);
    if (!item) return;

    item.qty += modifier;
    if (item.qty <= 0) {
      removeCartItem(itemId);
      return;
    }

    localStorage.setItem("pixelpop_cart", JSON.stringify(state.cart));
    updateCartUI();
  }

  function removeCartItem(itemId) {
    state.cart = state.cart.filter(item => item.id !== itemId);
    localStorage.setItem("pixelpop_cart", JSON.stringify(state.cart));
    updateCartUI();
  }

  // ==========================================
  // CHECKOUT FLOW
  // ==========================================

  DOM.goCheckoutBtn.addEventListener("click", () => {
    DOM.cartDrawerPanel.classList.remove("open");
    openCheckoutModal();
  });

  DOM.closeCheckoutBtn.addEventListener("click", () => {
    DOM.checkoutModalOverlay.classList.remove("open");
  });

  function openCheckoutModal() {
    DOM.checkoutModalOverlay.classList.add("open");

    // Fill Order summary
    DOM.checkoutItemsList.innerHTML = state.cart.map(item => `
      <div class="summary-item">
        <span class="name">${item.name} <span class="text-muted">x${item.qty}</span></span>
        <span>$${(item.price * item.qty).toFixed(2)}</span>
      </div>
    `).join("");

    // Populate payment methods dynamically
    const paymentSettings = DB.getPaymentSettings();
    let paymentHtml = "";
    let activePaymentId = "";

    if (paymentSettings.cod && paymentSettings.cod.enabled) {
      paymentHtml += `
        <div class="payment-option" data-id="cod">
          <span class="option-name">💵 Cash on Delivery</span>
        </div>
      `;
      if (!activePaymentId) activePaymentId = "cod";
    }
    if (paymentSettings.wish && paymentSettings.wish.enabled) {
      paymentHtml += `
        <div class="payment-option" data-id="wish">
          <span class="option-name">💸 Wish Money Transfer</span>
        </div>
      `;
      if (!activePaymentId) activePaymentId = "wish";
    }
    if (paymentSettings.neo && paymentSettings.neo.enabled) {
      paymentHtml += `
        <div class="payment-option" data-id="neo">
          <span class="option-name">💳 Neo by Audi</span>
        </div>
      `;
      if (!activePaymentId) activePaymentId = "neo";
    }

    if (!paymentHtml) {
      DOM.paymentOptionsContainer.innerHTML = `<p class="text-danger" style="font-size:0.85rem; font-weight:600; grid-column: 1/-1;">No payment methods enabled in Admin Dashboard.</p>`;
      DOM.paymentDetailsPanel.style.display = "none";
    } else {
      DOM.paymentOptionsContainer.innerHTML = paymentHtml;

      // Select default active payment
      const defaultOpt = DOM.paymentOptionsContainer.querySelector(`[data-id="${activePaymentId}"]`);
      if (defaultOpt) {
        defaultOpt.classList.add("active");
        selectCheckoutPaymentMethod(activePaymentId, paymentSettings);
      }

      // Attach click events
      DOM.paymentOptionsContainer.querySelectorAll(".payment-option").forEach(opt => {
        opt.addEventListener("click", (e) => {
          DOM.paymentOptionsContainer.querySelectorAll(".payment-option").forEach(p => p.classList.remove("active"));
          const target = e.currentTarget;
          target.classList.add("active");
          const paymentId = target.dataset.id;
          selectCheckoutPaymentMethod(paymentId, DB.getPaymentSettings());
          updateCheckoutSummaryTotals();
        });
      });
    }

    renderDeliveryOptions();
  }

  function selectCheckoutPaymentMethod(paymentId, paymentSettings) {
    DOM.paymentDetailsPanel.style.display = "block";
    DOM.chkPaymentReference.value = ""; // reset
    DOM.chkPaymentReference.required = false;

    if (paymentId === "cod") {
      const cfg = paymentSettings.cod;
      DOM.paymentDetailsInstructions.textContent = cfg.instructions;

      const extraFee = parseFloat(cfg.extraFee) || 0;
      let fieldsHtml = "";
      if (extraFee > 0) {
        fieldsHtml = `<span style="color: var(--accent-red); font-weight: 600;">COD Surcharge Delivery Fee: +$${extraFee.toFixed(2)}</span>`;
      } else {
        fieldsHtml = `<span style="color: var(--accent-green); font-weight: 600;">No extra COD surcharge</span>`;
      }
      DOM.paymentDetailsFields.innerHTML = fieldsHtml;
      DOM.paymentDetailsQrContainer.style.display = "none";
      DOM.paymentReferenceGroup.style.display = "none";
    }
    else if (paymentId === "wish") {
      const cfg = paymentSettings.wish;
      DOM.paymentDetailsInstructions.textContent = cfg.instructions;
      DOM.paymentDetailsFields.innerHTML = `
        <div style="margin-bottom: 0.2rem;"><strong>Phone Number:</strong> <span style="color: var(--accent-indigo); font-size: 0.95rem; font-weight: 600;">${cfg.phoneNumber}</span></div>
        <div><strong>Recipient Name:</strong> <span style="font-weight: 600;">${cfg.receiverName}</span></div>
      `;

      if (cfg.barcodeUrl) {
        DOM.paymentDetailsQrImg.src = cfg.barcodeUrl;
        DOM.paymentDetailsQrContainer.style.display = "block";
      } else {
        DOM.paymentDetailsQrContainer.style.display = "none";
      }

      DOM.paymentReferenceGroup.style.display = "block";
      DOM.paymentReferenceLabel.textContent = "Wish Transaction Reference (MTCN)";
      DOM.chkPaymentReference.placeholder = "e.g. 8-digit MTCN code";
      DOM.chkPaymentReference.required = true;
    }
    else if (paymentId === "neo") {
      const cfg = paymentSettings.neo;
      DOM.paymentDetailsInstructions.textContent = cfg.instructions;

      DOM.paymentDetailsFields.innerHTML = `
        <div style="margin-bottom: 0.2rem;"><strong>Neo Account ID:</strong> <span style="color: var(--accent-indigo); font-size: 0.95rem; font-weight: 600;">${cfg.accountNumber}</span></div>
        <a href="${cfg.paymentLink}" target="_blank" class="btn btn-secondary" style="margin-top: 0.6rem; padding: 0.4rem 1rem; font-size: 0.8rem; border-radius: 8px; justify-content: center; display: inline-flex; width: fit-content; text-decoration: none;">
          Open Neo Payment Link 🔗
        </a>
      `;

      if (cfg.qrUrl) {
        DOM.paymentDetailsQrImg.src = cfg.qrUrl;
        DOM.paymentDetailsQrContainer.style.display = "block";
      } else {
        DOM.paymentDetailsQrContainer.style.display = "none";
      }

      DOM.paymentReferenceGroup.style.display = "block";
      DOM.paymentReferenceLabel.textContent = "Neo Username / Account Reference";
      DOM.chkPaymentReference.placeholder = "e.g. Your Neo username/ref";
      DOM.chkPaymentReference.required = true;
    }
  }

  function updateCheckoutSummaryTotals() {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    DOM.chkSubtotalVal.textContent = `$${subtotal.toFixed(2)}`;

    // Discount
    let discountAmt = 0;
    if (state.appliedCoupon) {
      if (state.appliedCoupon.type === "percent") {
        discountAmt = subtotal * (state.appliedCoupon.value / 100);
      } else if (state.appliedCoupon.type === "fixed") {
        discountAmt = state.appliedCoupon.value;
      }
      discountAmt = Math.min(discountAmt, subtotal);
    }

    if (discountAmt > 0) {
      DOM.chkDiscountLabel.textContent = `Discount (${state.appliedCoupon.code})`;
      DOM.chkDiscountVal.textContent = `-$${discountAmt.toFixed(2)}`;
      DOM.chkDiscountRow.style.display = "flex";
    } else {
      DOM.chkDiscountRow.style.display = "none";
    }

    // Shipping fee
    const activeDelivery = document.querySelector(".delivery-option.active");
    const shippingPrice = activeDelivery ? parseFloat(activeDelivery.dataset.price) : 0;
    DOM.chkShippingVal.textContent = `$${shippingPrice.toFixed(2)}`;

    // Payment surcharge fee (COD fee)
    const activePayment = document.querySelector(".payment-option.active");
    let surchargeFee = 0;
    if (activePayment && activePayment.dataset.id === "cod") {
      const settings = DB.getPaymentSettings();
      surchargeFee = parseFloat(settings.cod.extraFee) || 0;
    }

    if (surchargeFee > 0) {
      DOM.chkSurchargeVal.textContent = `$${surchargeFee.toFixed(2)}`;
      DOM.chkSurchargeRow.style.display = "flex";
    } else {
      DOM.chkSurchargeRow.style.display = "none";
    }

    const total = subtotal - discountAmt + shippingPrice + surchargeFee;
    DOM.chkTotalVal.textContent = `$${total.toFixed(2)}`;
  }

  // Submit Order Form
  DOM.checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("chk-first-name").value;
    const lastName = document.getElementById("chk-last-name").value;
    const email = document.getElementById("chk-email").value;
    const phone = document.getElementById("chk-phone") ? document.getElementById("chk-phone").value.trim() : "";
    const address = document.getElementById("chk-address").value;
    const city = document.getElementById("chk-city").value;
    const zip = document.getElementById("chk-zip").value;

    const deliveryOpt = document.querySelector(".delivery-option.active").dataset.id;
    const activePaymentElement = document.querySelector(".payment-option.active");
    if (!activePaymentElement) {
      alert("Please select a payment option.");
      return;
    }
    const paymentOpt = activePaymentElement.dataset.id;
    const paymentRef = DOM.chkPaymentReference.value.trim();

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const shippingPrice = parseFloat(document.querySelector(".delivery-option.active").dataset.price);

    // Discount
    let discountAmt = 0;
    if (state.appliedCoupon) {
      if (state.appliedCoupon.type === "percent") {
        discountAmt = subtotal * (state.appliedCoupon.value / 100);
      } else if (state.appliedCoupon.type === "fixed") {
        discountAmt = state.appliedCoupon.value;
      }
      discountAmt = Math.min(discountAmt, subtotal);
    }

    // Surcharge
    let surchargeFee = 0;
    if (paymentOpt === "cod") {
      const settings = DB.getPaymentSettings();
      surchargeFee = parseFloat(settings.cod.extraFee) || 0;
    }
    const total = subtotal - discountAmt + shippingPrice + surchargeFee;

    // Build Order Object
    const orderId = `PIXEL-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      customer: { firstName, lastName, email, phone, address, city, zip },
      items: state.cart.map(item => ({
        productId: item.productId,
        name: item.name,
        qty: item.qty,
        price: item.price,
        color: item.color,
        size: item.size,
        material: item.material,
        weight: item.weight
      })),
      totals: {
        subtotal,
        discount: discountAmt,
        couponCode: state.appliedCoupon ? state.appliedCoupon.code : null,
        shipping: shippingPrice,
        surcharge: surchargeFee,
        total
      },
      deliveryMethod: deliveryOpt,
      paymentMethod: paymentOpt,
      paymentReference: paymentRef || null,
      datePlaced: new Date().toLocaleDateString(),
      status: "Pending" // Pending -> Printing -> Shipped
    };

    // Save to Database
    DB.createOrder(newOrder);

    // Visual order confirmation
    DOM.checkoutModalOverlay.classList.remove("open");
    alert(`Order Placed Successfully! Your Order ID is ${orderId}. Track build pipeline in the simulated inbox drawer.`);

    // Clear cart & coupon
    state.cart = [];
    state.appliedCoupon = null;
    localStorage.removeItem("pixelpop_cart");
    if (DOM.cartCouponInput) DOM.cartCouponInput.value = "";
    if (DOM.cartCouponStatus) DOM.cartCouponStatus.textContent = "";
    updateCartUI();

    // Switch to landing
    changePage("store");

    // Queue simulated auto emails
    triggerAutoOrderEmails(newOrder);
    updateNotificationBell();
  });



  // ==========================================
  // AUTO EMAILS SIMULATOR
  // ==========================================

  function renderEmailList() {
    const totalUnread = state.emails.filter(e => !e.read).length;
    DOM.emailUnreadBadge.textContent = totalUnread;
    DOM.emailUnreadBadge.style.display = totalUnread > 0 ? "block" : "none";

    if (state.emails.length === 0) {
      DOM.emailListView.innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">Your notification folder is empty.</div>`;
      return;
    }

    DOM.emailListView.innerHTML = state.emails.map((email, idx) => `
      <div class="email-row ${email.read ? '' : 'unread'}" data-index="${idx}">
        <div class="email-row-meta">
          <span>From: ${email.from}</span>
          <span>${email.time}</span>
        </div>
        <div class="email-row-title">${email.subject}</div>
        <div class="email-row-snippet">${email.body}</div>
      </div>
    `).join("");

    // Setup Row clicks
    document.querySelectorAll(".email-row").forEach(row => {
      row.addEventListener("click", () => {
        const idx = parseInt(row.dataset.index);
        openEmailDetail(idx);
      });
    });
  }

  function openEmailDetail(index) {
    const email = state.emails[index];
    if (!email) return;

    email.read = true;
    localStorage.setItem("pixelpop_emails", JSON.stringify(state.emails));
    renderEmailList();

    DOM.emailListView.style.display = "none";
    DOM.emailDetailView.style.display = "flex";

    DOM.emailDetailBody.innerHTML = `
      <div class="email-body-logo">PixelPop Customer Update</div>
      <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.8rem;">
        <strong>From:</strong> ${email.from}<br>
        <strong>Subject:</strong> ${email.subject}<br>
        <strong>Received:</strong> ${email.time}
      </p>
      <div style="white-space: pre-line; line-height: 1.5; color: var(--text-main);">
        ${email.body}
      </div>
    `;
  }

  DOM.emailDetailBackBtn.addEventListener("click", () => {
    DOM.emailDetailView.style.display = "none";
    DOM.emailListView.style.display = "block";
  });

  // Collapsible toggle for simulated email drawer
  DOM.emailHeaderToggle.addEventListener("click", () => {
    DOM.emailSimulatorDrawer.classList.toggle("open");
  });

  function addSimulatedEmail(from, subject, body) {
    const newEmail = {
      from,
      subject,
      body,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    state.emails.unshift(newEmail);
    localStorage.setItem("pixelpop_emails", JSON.stringify(state.emails));
    renderEmailList();

    // Trigger visual tray highlight if not already open
    if (!DOM.emailSimulatorDrawer.classList.contains("open")) {
      DOM.emailHeaderToggle.style.animation = "pulse-glow 1.5s infinite";
      setTimeout(() => {
        DOM.emailHeaderToggle.style.animation = "";
      }, 5000);
    }
  }

  function triggerAutoOrderEmails(order) {
    const itemsText = order.items.map(item => `• ${item.name} (${item.color}, ${item.size}, ${item.material}) x${item.qty} - $${(item.price * item.qty).toFixed(2)}`).join("\n");
    const address = order.customer;

    // Tailor email details based on payment method
    let paymentDetailsText = "";
    if (order.paymentMethod === "cod") {
      paymentDetailsText = `Payment Method: Cash on Delivery (COD)\nTotal to pay upon delivery: $${order.totals.total.toFixed(2)}`;
    } else if (order.paymentMethod === "wish") {
      paymentDetailsText = `Payment Method: Wish Money Transfer\nTransaction Reference (MTCN): ${order.paymentReference || "N/A"}\nStatus: We are verifying your Wish Money transfer.`;
    } else if (order.paymentMethod === "neo") {
      paymentDetailsText = `Payment Method: Neo by Audi\nNeo Account Username: ${order.paymentReference || "N/A"}\nStatus: We are verifying your Neo mobile transfer.`;
    }

    let discountLine = "";
    if (order.totals.discount && order.totals.discount > 0) {
      discountLine = `\nDiscount Applied (${order.totals.couponCode}): -$${order.totals.discount.toFixed(2)}`;
    }

    // 1. Order Received
    const deliveryOptions = DB.getDeliveryOptions();
    const matchedOpt = deliveryOptions.find(o => o.id === order.deliveryMethod);
    const deliveryText = matchedOpt ? `${matchedOpt.name} (${matchedOpt.desc})` : order.deliveryMethod;

    addSimulatedEmail(
      "billing@pixelpop.com",
      `Order Received - Invoice ${order.id}`,
      `Hi ${address.firstName},\n\nWe have registered your order ${order.id} and added it to our print bed pipeline queue!\n\nOrder Details:\n${itemsText}\n\nShipping To:\n${address.firstName} ${address.lastName}\n${address.address}, ${address.city}, ${address.zip}\n\nDelivery Method: ${deliveryText}\n\n${paymentDetailsText}${discountLine}\n\nGrand Total: $${order.totals.total.toFixed(2)}\n\nWe will update you as soon as our nozzles heat up and printing begins!\n\nBest,\nPixelPop Billing Team`
    );

    // 2. Queue printing start email after 15 seconds
    setTimeout(() => {
      // Check if order still exists and status hasn't been manually shipped
      const liveOrders = DB.getOrders();
      const currentOrder = liveOrders.find(o => o.id === order.id);
      if (currentOrder && currentOrder.status === "Pending") {
        DB.updateOrderStatus(order.id, "Printing");

        // Refresh dashboard order list if active
        if (state.activePage === "dashboard") {
          renderDashboardOrders();
          updateOverviewStats();
          updateNotificationBell();
        }

        const totalWeight = order.items.reduce((sum, item) => sum + (parseInt(item.weight) || 0) * item.qty, 0);

        addSimulatedEmail(
          "production@pixelpop.com",
          `Build Commenced - Printing Order ${order.id}`,
          `Hi ${address.firstName},\n\nGood news! Your order ${order.id} is now on the print bed. We've assigned the print job to our high-precision Delta printer array (Nozzle #4).\n\nTechnical Build Specs:\n• Build volume allocation: ${totalWeight}g of filament\n• Retraction speed: 45mm/s\n• Temperature: Extruder 210°C / Bed 60°C\n• Layer Resolution: 0.16mm fine details\n\nYou can track updates directly here. Once the build cools down and passes our QC caliper measurements, we'll pack it up!\n\nSincerely,\nPixelPop Fabrication Dept.`
        );
      }
    }, 15000);

    // 3. Queue shipping email after 40 seconds
    setTimeout(() => {
      const liveOrders = DB.getOrders();
      const currentOrder = liveOrders.find(o => o.id === order.id);
      if (currentOrder && currentOrder.status === "Printing") {
        DB.updateOrderStatus(order.id, "Shipped");

        if (state.activePage === "dashboard") {
          renderDashboardOrders();
          updateOverviewStats();
          updateNotificationBell();
        }

        const trackingNumber = `PXP-${Math.floor(10000000 + Math.random() * 90000000)}US`;

        addSimulatedEmail(
          "shipping@pixelpop.com",
          `Build Dispatched - Order ${order.id} is Shipped`,
          `Hi ${address.firstName},\n\nYour 3D printed items are finished! The prints cooled down, passed caliper inspection, were packed in bubble wrap, and handed off to our carrier.\n\nCarrier Tracking Number: ${trackingNumber}\nExpected arrival: 3-5 business days.\n\nThank you for choosing PixelPop. Feel free to reply to this email with photos of your prints in action!\n\nCheers,\nPixelPop Logistics`
        );
      }
    }, 45000);
  }

  function setupEmailAutoChecks() {
    // Just reactive check intervals if needed, but the setTimeout triggers will handle it.
  }

  // ==========================================
  // PRIVATE ADMIN DASHBOARD SECTION
  // ==========================================

  function initDashboard() {
    updateOverviewStats();
    renderOverviewCharts();
    renderDashboardInventory();
    renderDashboardCategories();
    renderDashboardCoupons();
    renderDashboardOrders();
    initPaymentsDashboardSettings();
    initCalculator();
    initHeroDashboardSettings();
    renderDashboardDeliveryOptions();
    initSocialDashboardSettings();
    initThemeDashboardSettings();
  }

  function initPaymentsDashboardSettings() {
    const settings = DB.getPaymentSettings();

    // COD inputs
    DOM.cfgCodEnabled.checked = settings.cod.enabled;
    DOM.cfgCodInstructions.value = settings.cod.instructions;
    DOM.cfgCodFee.value = settings.cod.extraFee.toFixed(2);

    // Wish inputs
    DOM.cfgWishEnabled.checked = settings.wish.enabled;
    DOM.cfgWishPhone.value = settings.wish.phoneNumber;
    DOM.cfgWishName.value = settings.wish.receiverName;
    DOM.cfgWishInstructions.value = settings.wish.instructions;
    DOM.cfgWishBarcode.value = settings.wish.barcodeUrl;

    // Neo inputs
    DOM.cfgNeoEnabled.checked = settings.neo.enabled;
    DOM.cfgNeoLink.value = settings.neo.paymentLink;
    DOM.cfgNeoAccount.value = settings.neo.accountNumber;
    DOM.cfgNeoInstructions.value = settings.neo.instructions;
    DOM.cfgNeoQr.value = settings.neo.qrUrl;

    // Setup tab switching in settings panel
    const tabs = document.querySelectorAll(".payment-settings-tab");
    const panels = document.querySelectorAll(".payment-settings-panel");

    tabs.forEach(tab => {
      // Remove old listeners
      const newTab = tab.cloneNode(true);
      tab.parentNode.replaceChild(newTab, tab);
    });

    const refreshedTabs = document.querySelectorAll(".payment-settings-tab");
    refreshedTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        refreshedTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const targetTab = tab.dataset.tab;
        panels.forEach(p => {
          if (p.id === targetTab) {
            p.style.display = "block";
          } else {
            p.style.display = "none";
          }
        });
      });
    });
  }

  // Handle Payments settings form submit
  DOM.paymentsConfigForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedSettings = {
      cod: {
        enabled: DOM.cfgCodEnabled.checked,
        instructions: DOM.cfgCodInstructions.value.trim(),
        extraFee: parseFloat(DOM.cfgCodFee.value) || 0
      },
      wish: {
        enabled: DOM.cfgWishEnabled.checked,
        phoneNumber: DOM.cfgWishPhone.value.trim(),
        receiverName: DOM.cfgWishName.value.trim(),
        instructions: DOM.cfgWishInstructions.value.trim(),
        barcodeUrl: DOM.cfgWishBarcode.value.trim()
      },
      neo: {
        enabled: DOM.cfgNeoEnabled.checked,
        paymentLink: DOM.cfgNeoLink.value.trim(),
        accountNumber: DOM.cfgNeoAccount.value.trim(),
        instructions: DOM.cfgNeoInstructions.value.trim(),
        qrUrl: DOM.cfgNeoQr.value.trim()
      }
    };

    DB.savePaymentSettings(updatedSettings);
    alert("Payment settings saved successfully!");
  });

  function initCalculator() {
    // Check if default calculator settings exist in localStorage, else set them
    if (!localStorage.getItem("calc_defaults")) {
      const initialDefaults = {
        spoolCost: 24.99,
        spoolWeight: 1000,
        wattage: 150,
        elecRate: 0.120,
        depreciation: 0.25,
        laborWage: 15.00,
        profitMargin: 60
      };
      localStorage.setItem("calc_defaults", JSON.stringify(initialDefaults));
    }

    // Load defaults
    const defaults = JSON.parse(localStorage.getItem("calc_defaults"));
    DOM.calcCfgSpoolCost.value = defaults.spoolCost;
    DOM.calcCfgSpoolWeight.value = defaults.spoolWeight;
    DOM.calcCfgWattage.value = defaults.wattage;
    DOM.calcCfgElecRate.value = defaults.elecRate;
    DOM.calcCfgDepreciation.value = defaults.depreciation;
    DOM.calcCfgLaborWage.value = defaults.laborWage;
    DOM.calcCfgProfitMargin.value = defaults.profitMargin;

    // Attach listeners for live updates
    const inputsToTrigger = [
      DOM.calcCfgSpoolCost, DOM.calcCfgSpoolWeight, DOM.calcCfgWattage,
      DOM.calcCfgElecRate, DOM.calcCfgDepreciation, DOM.calcCfgLaborWage,
      DOM.calcCfgProfitMargin, DOM.calcItemName, DOM.calcWeight,
      DOM.calcPrintTime, DOM.calcPrepTime, DOM.calcPackagingCost
    ];

    inputsToTrigger.forEach(input => {
      input.addEventListener("input", calculateCostsAndPrices);
    });

    // Save Defaults Button
    DOM.calcSaveDefaultsBtn.addEventListener("click", () => {
      const updatedDefaults = {
        spoolCost: parseFloat(DOM.calcCfgSpoolCost.value) || 0,
        spoolWeight: parseFloat(DOM.calcCfgSpoolWeight.value) || 1000,
        wattage: parseFloat(DOM.calcCfgWattage.value) || 0,
        elecRate: parseFloat(DOM.calcCfgElecRate.value) || 0,
        depreciation: parseFloat(DOM.calcCfgDepreciation.value) || 0,
        laborWage: parseFloat(DOM.calcCfgLaborWage.value) || 0,
        profitMargin: parseFloat(DOM.calcCfgProfitMargin.value) || 0
      };
      localStorage.setItem("calc_defaults", JSON.stringify(updatedDefaults));
      alert("Overhead default configuration saved in local storage! 💾");
    });

    // Apply to catalog button
    DOM.calcApplyCatalogBtn.addEventListener("click", () => {
      const suggestedPrice = parseFloat(DOM.calcOutSuggestedPrice.textContent.replace('$', '')) || 0;
      const printTime = DOM.calcPrintTime.value;
      const weight = DOM.calcWeight.value;
      const itemName = DOM.calcItemName.value.trim();

      // Open catalog form modal
      openProductCrudModal();

      // Populate form fields
      DOM.crudName.value = itemName;
      DOM.crudPrice.value = suggestedPrice.toFixed(2);
      DOM.crudPrintTime.value = printTime + " hours";
      DOM.crudWeight.value = weight + "g";
    });

    // Initial calculation run
    calculateCostsAndPrices();
  }

  function calculateCostsAndPrices() {
    const spoolCost = parseFloat(DOM.calcCfgSpoolCost.value) || 0;
    const spoolWeight = parseFloat(DOM.calcCfgSpoolWeight.value) || 1;
    const wattage = parseFloat(DOM.calcCfgWattage.value) || 0;
    const elecRate = parseFloat(DOM.calcCfgElecRate.value) || 0;
    const depreciation = parseFloat(DOM.calcCfgDepreciation.value) || 0;
    const laborWage = parseFloat(DOM.calcCfgLaborWage.value) || 0;
    const profitMargin = parseFloat(DOM.calcCfgProfitMargin.value) || 0;

    const itemName = DOM.calcItemName.value.trim();
    const weight = parseFloat(DOM.calcWeight.value) || 0;
    const printTime = parseFloat(DOM.calcPrintTime.value) || 0;
    const prepTime = parseFloat(DOM.calcPrepTime.value) || 0;
    const packagingCost = parseFloat(DOM.calcPackagingCost.value) || 0;

    // Formulas
    // Material Cost = (Model Weight in grams * 1.15) * (Spool Cost / Spool Weight in grams)
    const materialCost = (weight * 1.15) * (spoolCost / spoolWeight);

    // Power Cost = Print Time (hours) * (Machine Wattage / 1000) * Electricity Rate per kWh
    const powerCost = printTime * (wattage / 1000) * elecRate;

    // Machine Wear Cost = Print Time (hours) * Depreciation Rate per hour
    const wearCost = printTime * depreciation;

    // Labor Cost = (Hands-on Prep & Packing Time in minutes / 60) * Hourly Labor Wage
    const laborCost = (prepTime / 60) * laborWage;

    // Total Production Cost (COGS) = Material + Power + Machine Wear + Labor + Packaging Cost
    const totalCogs = materialCost + powerCost + wearCost + laborCost + packagingCost;

    // Suggested Retail Price = Total Production Cost / (1 - (Target Profit Margin % / 100))
    let suggestedPrice = 0;
    if (profitMargin < 100) {
      suggestedPrice = totalCogs / (1 - (profitMargin / 100));
    } else {
      suggestedPrice = totalCogs;
    }

    // Net Profit Margin = Suggested Price - COGS
    const netProfit = suggestedPrice - totalCogs;

    // Update Output display
    DOM.calcOutMaterialCost.textContent = `$${materialCost.toFixed(2)}`;
    DOM.calcOutPowerCost.textContent = `$${powerCost.toFixed(2)}`;
    DOM.calcOutWearCost.textContent = `$${wearCost.toFixed(2)}`;
    DOM.calcOutLaborCost.textContent = `$${laborCost.toFixed(2)}`;
    DOM.calcOutPackagingCost.textContent = `$${packagingCost.toFixed(2)}`;
    DOM.calcOutTotalCogs.textContent = `$${totalCogs.toFixed(2)}`;
    DOM.calcOutSuggestedPrice.textContent = `$${suggestedPrice.toFixed(2)}`;
    DOM.calcOutNetProfit.textContent = `$${netProfit.toFixed(2)}`;
    DOM.calcOutProfitPercent.textContent = `Margins: ${profitMargin.toFixed(0)}%`;

    // Toggle button state
    if (suggestedPrice > 0 && itemName !== "" && weight > 0 && printTime > 0) {
      DOM.calcApplyCatalogBtn.disabled = false;
    } else {
      DOM.calcApplyCatalogBtn.disabled = true;
    }
  }

  function updateOverviewStats() {
    const orders = DB.getOrders();

    // Revenue (Sum of all orders)
    const revenue = orders.reduce((sum, o) => sum + o.totals.total, 0);
    DOM.statRevenue.textContent = `$${revenue.toFixed(2)}`;

    // Orders Count
    DOM.statOrdersCount.textContent = orders.length;

    // Filament Consumed
    // Sum of weight from order items
    let totalWeightGrams = 0;
    orders.forEach(o => {
      o.items.forEach(item => {
        const wtVal = parseInt(item.weight) || 0;
        totalWeightGrams += wtVal * item.qty;
      });
    });
    const weightKg = totalWeightGrams / 1000;
    DOM.statFilamentConsumed.textContent = `${weightKg.toFixed(2)} kg`;

    // Active Prints
    const activeCount = orders.filter(o => o.status === "Printing").length;
    DOM.statActivePrints.textContent = activeCount;
  }

  function renderOverviewCharts() {
    // Dynamic Columns bar graph for last 7 days revenue
    const orders = DB.getOrders();
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dailyRevenue = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };

    // Seed default baseline days so graph has columns even with 0 sales
    dailyRevenue.Mon = 120;
    dailyRevenue.Tue = 190;
    dailyRevenue.Wed = 145;
    dailyRevenue.Thu = 240;

    // Populate actuals
    orders.forEach(o => {
      // Extract day
      const orderDate = new Date(o.datePlaced);
      const dayName = weekdays[orderDate.getDay()];
      if (dailyRevenue.hasOwnProperty(dayName)) {
        dailyRevenue[dayName] += o.totals.total;
      }
    });

    const maxVal = Math.max(...Object.values(dailyRevenue), 1);

    DOM.revenueGraph.innerHTML = Object.keys(dailyRevenue).map(day => {
      const val = dailyRevenue[day];
      const percent = (val / maxVal) * 100;
      return `
        <div class="graph-bar-wrap">
          <div class="graph-bar" style="height: ${percent}%">
            <span class="graph-bar-val">$${Math.round(val)}</span>
          </div>
          <span class="graph-bar-label">${day}</span>
        </div>
      `;
    }).join("");

    // Stock Allocation Breakdown
    const colorsUsage = {};
    orders.forEach(o => {
      o.items.forEach(item => {
        if (!colorsUsage[item.color]) colorsUsage[item.color] = 0;
        colorsUsage[item.color] += (parseInt(item.weight) || 0) * item.qty;
      });
    });

    // Merge with standard colors so list has default indicators
    const defaultWeights = { "Silk Gold": 320, "Matte Black": 550, "Crimson Red": 200, "Marble White": 410 };
    Object.keys(colorsUsage).forEach(c => {
      if (defaultWeights.hasOwnProperty(c)) {
        defaultWeights[c] += colorsUsage[c];
      } else {
        defaultWeights[c] = colorsUsage[c];
      }
    });

    const maxWeight = Math.max(...Object.values(defaultWeights), 1);

    DOM.filamentMetersContainer.innerHTML = Object.keys(defaultWeights).map(color => {
      const g = defaultWeights[color];
      const pct = (g / maxWeight) * 100;
      return `
        <div class="meter-row">
          <div class="meter-header">
            <span>${color}</span>
            <span>${g}g</span>
          </div>
          <div class="meter-bg">
            <div class="meter-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }).join("");
  }

  function renderDashboardInventory() {
    const products = DB.getProducts();

    if (products.length === 0) {
      DOM.dashboardInventoryGrid.innerHTML = `<div style="text-align: center; color: var(--text-muted); grid-column: 1/-1; padding: 2rem 0;">Inventory catalog is empty. Add a product.</div>`;
      return;
    }

    DOM.dashboardInventoryGrid.innerHTML = products.map(p => `
      <div class="glass-panel inv-card">
        <img class="inv-card-img" src="${p.defaultImage}" alt="${p.name}">
        <div class="inv-card-info">
          <div class="inv-card-title">${p.name}</div>
          <div class="inv-card-price">$${p.basePrice.toFixed(2)}</div>
        </div>
        <div class="inv-card-actions">
          <button class="action-icon-btn edit-inv" data-id="${p.id}" title="Edit Product">✏️</button>
          <button class="action-icon-btn delete delete-inv" data-id="${p.id}" title="Delete Product">🗑️</button>
        </div>
      </div>
    `).join("");

    // Listeners
    document.querySelectorAll(".delete-inv").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = btn.dataset.id;
        if (confirm("Are you sure you want to delete this product from the inventory catalog?")) {
          DB.deleteProduct(id);
          renderDashboardInventory();
          renderProductsList();
          updateOverviewStats();
        }
      });
    });

    document.querySelectorAll(".edit-inv").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = btn.dataset.id;
        openProductCrudModal(id);
      });
    });
  }

  function printOrderInvoice(order) {
    const printWindow = window.open("", "_blank");
    const itemsHtml = order.items.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: left;">
          <strong>${item.name}</strong><br>
          <small style="color: #666;">Color: ${item.color} | Size: ${item.size} | Material: ${item.material}</small>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.qty}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">$${item.price.toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">$${(item.price * item.qty).toFixed(2)}</td>
      </tr>
    `).join("");

    const discountRow = order.totals.discount > 0 ? `
      <tr>
        <td colspan="3" style="padding: 8px; text-align: right; font-weight: bold;">Discount:</td>
        <td style="padding: 8px; text-align: right; color: #dc2626;">-$${order.totals.discount.toFixed(2)}</td>
      </tr>
    ` : "";

    const shippingRow = `
      <tr>
        <td colspan="3" style="padding: 8px; text-align: right; font-weight: bold;">Shipping:</td>
        <td style="padding: 8px; text-align: right;">$${order.totals.shipping.toFixed(2)}</td>
      </tr>
    `;

    const codSurchargeRow = order.totals.surcharge > 0 ? `
      <tr>
        <td colspan="3" style="padding: 8px; text-align: right; font-weight: bold;">COD Fee:</td>
        <td style="padding: 8px; text-align: right;">$${order.totals.surcharge.toFixed(2)}</td>
      </tr>
    ` : "";

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${order.id}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; margin: 40px; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #4f46e5; padding-bottom: 20px; margin-bottom: 30px; }
            .header h1 { margin: 0; color: #4f46e5; font-size: 24px; }
            .meta-table { width: 100%; margin-bottom: 30px; border-collapse: collapse; }
            .meta-table td { padding: 5px 0; font-size: 14px; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            .items-table th { background: #f3f4f6; padding: 12px 10px; text-align: left; font-size: 14px; border-bottom: 2px solid #e5e7eb; }
            .items-table td { font-size: 14px; }
            .totals-table { float: right; width: 300px; margin-top: 20px; }
            .totals-table td { padding: 5px 0; }
            .footer { margin-top: 100px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #e5e7eb; padding-top: 20px; }
            @media print {
              body { margin: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>PixelPop Print Shop</h1>
              <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">3D Printing & Design Studio</p>
            </div>
            <div style="text-align: right;">
              <h2 style="margin: 0; color: #333; font-size: 20px;">INVOICE</h2>
              <p style="margin: 5px 0 0 0; font-size: 14px; font-weight: bold;">Order ID: ${order.id}</p>
            </div>
          </div>

          <table class="meta-table">
            <tr>
              <td style="width: 50%; vertical-align: top;">
                <strong style="color: #4f46e5;">Customer Information:</strong><br>
                ${order.customer.firstName} ${order.customer.lastName}<br>
                Phone: ${order.customer.phone || 'N/A'}<br>
                Email: ${order.customer.email || 'N/A'}
              </td>
              <td style="width: 50%; vertical-align: top; text-align: right;">
                <strong style="color: #4f46e5;">Shipping Address:</strong><br>
                ${order.customer.address}<br>
                ${order.customer.city}<br>
                ZIP: ${order.customer.zip || 'N/A'}
              </td>
            </tr>
            <tr>
              <td style="padding-top: 15px;">
                <strong>Date Placed:</strong> ${order.datePlaced}<br>
                <strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}
              </td>
              <td style="padding-top: 15px; text-align: right;">
                <strong>Status:</strong> ${order.status.toUpperCase()}
              </td>
            </tr>
          </table>

          <table class="items-table">
            <thead>
              <tr>
                <th style="text-align: left;">Item Description</th>
                <th style="text-align: center; width: 80px;">Qty</th>
                <th style="text-align: right; width: 100px;">Unit Price</th>
                <th style="text-align: right; width: 100px;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              ${discountRow}
              ${shippingRow}
              ${codSurchargeRow}
              <tr>
                <td colspan="3" style="padding: 10px 8px; text-align: right; font-size: 16px; font-weight: bold; border-top: 2px solid #4f46e5;">Total Cost:</td>
                <td style="padding: 10px 8px; text-align: right; font-size: 16px; font-weight: bold; color: #4f46e5; border-top: 2px solid #4f46e5;">$${order.totals.total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div class="footer">
            <p>Thank you for shopping with PixelPop Print Shop!</p>
            <p>If you have any questions about this order, please contact support.</p>
          </div>

          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }

  // Update bell notification badge
  function updateNotificationBell() {
    const orders = DB.getOrders();
    const pendingOrdersCount = orders.filter(o => o.status.toLowerCase() === "pending").length;
    const badge = document.getElementById("db-bell-badge");
    const bell = document.getElementById("db-notification-bell");
    if (badge && bell) {
      if (pendingOrdersCount > 0) {
        badge.textContent = pendingOrdersCount;
        badge.style.display = "flex";
        bell.classList.add("shake-bell");
      } else {
        badge.style.display = "none";
        bell.classList.remove("shake-bell");
      }
    }
  }

  function renderDashboardOrders() {
    const orders = DB.getOrders();

    if (orders.length === 0) {
      DOM.dashboardOrdersTbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 2rem;">No orders registered yet. Make a purchase on the storefront!</td></tr>`;
      return;
    }

    DOM.dashboardOrdersTbody.innerHTML = orders.map(o => {
      const itemsListText = o.items.map(i => `${i.name} x${i.qty} (${i.color})`).join(", ");
      const itemsListHtml = o.items.map(i => {
        const prod = DB.getProductById(i.productId);
        const dlLink = (prod && prod.modelUrl) 
          ? ` <a href="${prod.modelUrl}" target="_blank" title="Download 3D Model File" style="color: var(--accent-indigo); text-decoration: underline; font-weight: bold; margin-left: 0.4rem;">[Download File 💾]</a>` 
          : "";
        return `${i.name} x${i.qty} (${i.color})${dlLink}`;
      }).join("<br>");
      
      let paymentLabel = "";
      if (o.paymentMethod === "cod") {
        paymentLabel = "💵 Cash on Delivery";
      } else if (o.paymentMethod === "wish") {
        paymentLabel = "💸 Wish Money";
      } else if (o.paymentMethod === "neo") {
        paymentLabel = "💳 Neo by Audi";
      } else {
        paymentLabel = o.paymentMethod || "Unknown";
      }

      const refText = o.paymentReference ? `<div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-display); margin-top: 0.2rem;">Ref: ${o.paymentReference}</div>` : "";

      return `
        <tr>
          <td><strong>${o.id}</strong></td>
          <td>
            <strong>${o.customer.firstName} ${o.customer.lastName}</strong>
            <div style="display: flex; gap: 0.3rem; margin-top: 0.35rem;">
              <button type="button" class="btn-view-client" data-id="${o.id}" style="padding: 0.2rem 0.5rem; font-size: 0.72rem; border-radius: 6px; background: rgba(79, 70, 229, 0.08); color: var(--accent-indigo); border: 1px solid rgba(79, 70, 229, 0.15); cursor: pointer; transition: all 0.2s ease;">Info 🔍</button>
              <button type="button" class="btn-print-order" data-id="${o.id}" style="padding: 0.2rem 0.5rem; font-size: 0.72rem; border-radius: 6px; background: rgba(14, 165, 233, 0.08); color: #0ea5e9; border: 1px solid rgba(14, 165, 233, 0.15); cursor: pointer; transition: all 0.2s ease;">Print 🖨️</button>
            </div>
          </td>
          <td style="max-width: 280px; font-size: 0.85rem; line-height: 1.4;">${itemsListHtml}</td>
          <td>${o.datePlaced}</td>
          <td>
            <div style="font-weight: 500;">${paymentLabel}</div>
            ${refText}
          </td>
          <td><strong>$${o.totals.total.toFixed(2)}</strong></td>
          <td>
            <span class="order-badge ${o.status.toLowerCase()}">${o.status}</span>
          </td>
          <td>
            <select class="order-action-select" data-id="${o.id}">
              <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Queue (Pending)</option>
              <option value="Printing" ${o.status === 'Printing' ? 'selected' : ''}>Start Printing</option>
              <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Mark Shipped</option>
            </select>
          </td>
        </tr>
      `;
    }).join("");

    // Order Print click listeners
    document.querySelectorAll(".btn-print-order").forEach(btn => {
      btn.addEventListener("click", () => {
        const orderId = btn.dataset.id;
        const order = orders.find(o => o.id === orderId);
        if (order) {
          printOrderInvoice(order);
        }
      });
    });

    // Client Info button click listeners
    document.querySelectorAll(".btn-view-client").forEach(btn => {
      btn.addEventListener("click", () => {
        const orderId = btn.dataset.id;
        const order = orders.find(o => o.id === orderId);
        if (!order) return;

        const cust = order.customer;
        const phoneDisplay = cust.phone || "Not provided";
        const emailDisplay = cust.email || "Not provided";
        const zipDisplay = cust.zip || "Not provided";
        const cityDisplay = cust.city || "Not provided";
        const addressDisplay = cust.address || "Not provided";

        // Render customer info details inside the modal body
        DOM.clientDetailsBody.innerHTML = `
          <div>
            <strong style="color: var(--accent-indigo); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; display: block; margin-bottom: 0.2rem;">Full Name</strong>
            <span style="font-size: 1.05rem; font-weight: 600;">${cust.firstName} ${cust.lastName}</span>
          </div>
          <div>
            <strong style="color: var(--accent-indigo); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; display: block; margin-bottom: 0.2rem;">Phone Number</strong>
            <span style="font-size: 1.05rem; font-weight: 600; font-family: var(--font-display);">${phoneDisplay}</span>
          </div>
          <div>
            <strong style="color: var(--accent-indigo); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; display: block; margin-bottom: 0.2rem;">Email Address</strong>
            <span style="font-size: 1.05rem; font-weight: 600;">${emailDisplay}</span>
          </div>
          <div>
            <strong style="color: var(--accent-indigo); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; display: block; margin-bottom: 0.2rem;">Shipping Destination</strong>
            <span style="font-weight: 500;">${addressDisplay}, ${cityDisplay} (ZIP: ${zipDisplay})</span>
          </div>
          <div style="border-top: 1px solid var(--glass-border); padding-top: 0.8rem; margin-top: 0.4rem;">
            <strong style="color: var(--accent-indigo); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; display: block; margin-bottom: 0.2rem;">Order Context</strong>
            <span style="font-size: 0.88rem; color: var(--text-muted);">
              Order ID: <strong>${order.id}</strong><br>
              Placed On: ${order.datePlaced}<br>
              Payment Method: ${order.paymentMethod.toUpperCase()}<br>
              Shipping Option: ${order.shippingMethod ? order.shippingMethod.toUpperCase() : 'STANDARD'}
            </span>
          </div>
        `;

        DOM.clientDetailsModalOverlay.classList.add("open");
      });
    });

    // Table drop-down updates
    document.querySelectorAll(".order-action-select").forEach(sel => {
      sel.addEventListener("change", (e) => {
        const id = sel.dataset.id;
        const newStatus = e.target.value;

        DB.updateOrderStatus(id, newStatus);
        renderDashboardOrders();
        updateNotificationBell();
        updateOverviewStats();

        // Send simulated notification email matching status update
        const order = DB.getOrders().find(o => o.id === id);
        if (order) {
          if (newStatus === "Printing") {
            const totalWeight = order.items.reduce((sum, item) => sum + (parseInt(item.weight) || 0) * item.qty, 0);
            addSimulatedEmail(
              "production@pixelpop.com",
              `Build Commenced - Printing Order ${order.id}`,
              `Hi ${order.customer.firstName},\n\nWe have manually started printing your order ${order.id} on our industrial SLA print bed.\n\nDetails:\nBuild capacity: ${totalWeight}g.\n\nKeep an eye on this space for tracking details!`
            );
          } else if (newStatus === "Shipped") {
            addSimulatedEmail(
              "shipping@pixelpop.com",
              `Build Dispatched - Order ${order.id} is Shipped`,
              `Hi ${order.customer.firstName},\n\nCaliper inspection passes QA! We have shipped your 3D printed items. Safe travels for your package!`
            );
          }
        }
      });
    });
  }

  // Dashboard Sidebar nav links
  DOM.dbMenuItems.forEach(item => {
    item.addEventListener("click", (e) => {
      DOM.dbMenuItems.forEach(mi => mi.classList.remove("active"));
      DOM.dbSections.forEach(sec => sec.classList.remove("active"));

      e.currentTarget.classList.add("active");
      const targetSection = e.currentTarget.dataset.target;
      document.getElementById(targetSection).classList.add("active");
    });
  });

  // Notification bell click shortcut
  const bell = document.getElementById("db-notification-bell");
  if (bell) {
    bell.addEventListener("click", () => {
      const ordersMenuItem = Array.from(DOM.dbMenuItems).find(item => item.dataset.target === "db-orders");
      if (ordersMenuItem) {
        ordersMenuItem.click();
      }
    });
  }

  // ==========================================
  // PRODUCT CRUD INVENTORY FORMS
  // ==========================================

  // Dynamic Option Rows for Product CRUD
  function createColorOptionRow(name = "", hex = "#3b82f6") {
    const row = document.createElement("div");
    row.className = "option-row";
    row.innerHTML = `
      <input type="text" class="form-input color-name-input" placeholder="e.g. Silk Gold" value="${name}" style="flex: 2;" required>
      <input type="color" class="form-input color-hex-input" value="${hex}" style="flex: 0.8; padding: 0; min-height: 38px; cursor: pointer;" required>
      <button type="button" class="option-row-remove-btn" title="Remove Option">×</button>
    `;
    
    const nameInput = row.querySelector(".color-name-input");
    const hexInput = row.querySelector(".color-hex-input");

    // Automatically sync color picker hex when typing standard color names
    nameInput.addEventListener("input", (e) => {
      const val = e.target.value.toLowerCase().trim();
      if (swatchHexMap[val]) {
        hexInput.value = swatchHexMap[val];
      }
    });

    row.querySelector(".option-row-remove-btn").addEventListener("click", () => row.remove());
    DOM.crudColorsContainer.appendChild(row);
  }

  function createSizeOptionRow(name = "", modifier = 0) {
    const row = document.createElement("div");
    row.className = "option-row";
    row.innerHTML = `
      <input type="text" class="form-input size-name-input" placeholder="e.g. Standard" value="${name}" style="flex: 2;" required>
      <input type="number" step="0.01" class="form-input size-price-input" placeholder="Price (+$)" value="${modifier}" style="flex: 1;" required>
      <button type="button" class="option-row-remove-btn" title="Remove Option">×</button>
    `;
    row.querySelector(".option-row-remove-btn").addEventListener("click", () => row.remove());
    DOM.crudSizesContainer.appendChild(row);
  }

  function createMaterialOptionRow(name = "", modifier = 0) {
    const row = document.createElement("div");
    row.className = "option-row";
    row.innerHTML = `
      <input type="text" class="form-input material-name-input" placeholder="e.g. PETG" value="${name}" style="flex: 2;" required>
      <input type="number" step="0.01" class="form-input material-price-input" placeholder="Price (+$)" value="${modifier}" style="flex: 1;" required>
      <button type="button" class="option-row-remove-btn" title="Remove Option">×</button>
    `;
    row.querySelector(".option-row-remove-btn").addEventListener("click", () => row.remove());
    DOM.crudMaterialsContainer.appendChild(row);
  }

  // Bind add button click listeners
  if (DOM.addColorOptionBtn) {
    DOM.addColorOptionBtn.addEventListener("click", () => createColorOptionRow("", "#3b82f6"));
  }
  if (DOM.addSizeOptionBtn) {
    DOM.addSizeOptionBtn.addEventListener("click", () => createSizeOptionRow("", 0));
  }
  if (DOM.addMaterialOptionBtn) {
    DOM.addMaterialOptionBtn.addEventListener("click", () => createMaterialOptionRow("", 0));
  }

  DOM.inventoryAddItemBtn.addEventListener("click", () => {
    openProductCrudModal();
  });
  DOM.closeProductFormBtn.addEventListener("click", () => {
    DOM.productFormModalOverlay.classList.remove("open");
  });
  if (DOM.closeClientDetailsBtn) {
    DOM.closeClientDetailsBtn.addEventListener("click", () => {
      DOM.clientDetailsModalOverlay.classList.remove("open");
    });
  }

  if (DOM.crudIsPriceDrop) {
    DOM.crudIsPriceDrop.addEventListener("change", (e) => {
      if (DOM.crudOriginalPriceGroup) {
        DOM.crudOriginalPriceGroup.style.display = e.target.checked ? "block" : "none";
      }
      if (!e.target.checked && DOM.crudOriginalPrice) {
        DOM.crudOriginalPrice.value = "";
      }
    });
  }

  function openProductCrudModal(productId = null) {
    DOM.productFormModalOverlay.classList.add("open");
    DOM.productCrudForm.reset();
    if (DOM.crudColorsContainer) DOM.crudColorsContainer.innerHTML = "";
    if (DOM.crudSizesContainer) DOM.crudSizesContainer.innerHTML = "";
    if (DOM.crudMaterialsContainer) DOM.crudMaterialsContainer.innerHTML = "";

    // Clear image status and preview URL
    document.getElementById("crud-image-url").value = "";
    document.getElementById("crud-image-upload").value = "";
    document.getElementById("image-upload-status").textContent = "";
    state.crudGalleryUrls = [];
    if (DOM.crudGalleryContainer) {
      DOM.crudGalleryContainer.innerHTML = "";
    }

    if (productId) {
      // Edit mode
      const prod = DB.getProductById(productId);
      if (!prod) return;

      DOM.productModalTitle.textContent = "Modify Catalog Product";
      DOM.crudProductId.value = prod.id;
      DOM.crudName.value = prod.name;
      DOM.crudDescription.value = prod.description;
      DOM.crudPrice.value = prod.basePrice;
      
      syncProductModalCategories(prod.category, prod.subcategory);
      document.getElementById("crud-image-url").value = prod.defaultImage || "";
      state.crudGalleryUrls = prod.gallery ? [...prod.gallery] : (prod.defaultImage ? [prod.defaultImage] : []);
      renderCrudGalleryList();

      DOM.crudPrintTime.value = prod.specifications.printTime;
      DOM.crudWeight.value = prod.specifications.filamentUsed;
      DOM.crudDifficulty.value = prod.specifications.difficulty;
      if (DOM.crudModelUrl) DOM.crudModelUrl.value = prod.modelUrl || "";

      // Populate colors, sizes & materials options as interactive rows
      DOM.crudColorsContainer.innerHTML = "";
      prod.variations.colors.forEach(c => createColorOptionRow(c.name, c.hex));

      DOM.crudSizesContainer.innerHTML = "";
      prod.variations.sizes.forEach(s => createSizeOptionRow(s.name, s.priceModifier));

      DOM.crudMaterialsContainer.innerHTML = "";
      prod.variations.materials.forEach(m => createMaterialOptionRow(m.name, m.priceModifier));

      // Curation checkboxes & original price
      if (DOM.crudIsFeatured) DOM.crudIsFeatured.checked = prod.isFeatured || false;
      if (DOM.crudIsNewArrival) DOM.crudIsNewArrival.checked = prod.isNewArrival || false;
      if (DOM.crudIsPriceDrop) DOM.crudIsPriceDrop.checked = prod.isPriceDrop || false;
      if (DOM.crudOriginalPrice) DOM.crudOriginalPrice.value = prod.originalPrice || "";
      if (DOM.crudOriginalPriceGroup) {
        DOM.crudOriginalPriceGroup.style.display = prod.isPriceDrop ? "block" : "none";
      }
    } else {
      // Add Mode
      DOM.productModalTitle.textContent = "Create New Catalog Product";
      DOM.crudProductId.value = "";
      
      syncProductModalCategories();
      state.crudGalleryUrls = [];
      renderCrudGalleryList();

      DOM.crudColorsContainer.innerHTML = "";
      createColorOptionRow("Silk Gold", "#ffd700");
      createColorOptionRow("Matte Black", "#1a1a1a");
      createColorOptionRow("Cosmic Blue", "#1e3a8a");

      DOM.crudSizesContainer.innerHTML = "";
      createSizeOptionRow("Small (10cm)", -3.00);
      createSizeOptionRow("Standard", 0.00);
      createSizeOptionRow("Large", 8.00);

      DOM.crudMaterialsContainer.innerHTML = "";
      createMaterialOptionRow("PLA (Standard)", 0.00);
      createMaterialOptionRow("PETG (Durable)", 2.50);

      // Curation checkboxes & original price
      if (DOM.crudIsFeatured) DOM.crudIsFeatured.checked = false;
      if (DOM.crudIsNewArrival) DOM.crudIsNewArrival.checked = false;
      if (DOM.crudIsPriceDrop) DOM.crudIsPriceDrop.checked = false;
      if (DOM.crudOriginalPrice) DOM.crudOriginalPrice.value = "";
      if (DOM.crudOriginalPriceGroup) DOM.crudOriginalPriceGroup.style.display = "none";
      if (DOM.crudModelUrl) DOM.crudModelUrl.value = "";
    }
  }

  // Legacy tags handler functions removed in favor of dynamic color options row editor

  // Render the list of images in the product CRUD modal
  function renderCrudGalleryList() {
    if (!DOM.crudGalleryContainer) return;
    if (state.crudGalleryUrls.length === 0) {
      DOM.crudGalleryContainer.innerHTML = `<p class="text-muted" style="grid-column: 1/-1; font-size: 0.85rem; margin: 0;">No images uploaded yet.</p>`;
      return;
    }
    DOM.crudGalleryContainer.innerHTML = state.crudGalleryUrls.map((url, idx) => `
      <div class="crud-gallery-item" data-index="${idx}">
        <img src="${url}" alt="Product Image Preview">
        <button type="button" class="crud-gallery-remove" data-index="${idx}" title="Remove Image">&times;</button>
      </div>
    `).join("");

    // Bind remove button handlers
    DOM.crudGalleryContainer.querySelectorAll(".crud-gallery-remove").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = parseInt(e.currentTarget.dataset.index);
        state.crudGalleryUrls.splice(idx, 1);
        // Sync first image to legacy field
        document.getElementById("crud-image-url").value = state.crudGalleryUrls[0] || "";
        renderCrudGalleryList();
      });
    });
  }

  // Handle multiple product images upload to Firebase Storage
  const imageUploadInput = document.getElementById("crud-image-upload");
  const imageUrlInput = document.getElementById("crud-image-url");
  const uploadStatus = document.getElementById("image-upload-status");

  if (imageUploadInput && uploadStatus) {
    imageUploadInput.addEventListener("change", async (e) => {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;

      uploadStatus.textContent = `⏳ Uploading ${files.length} image(s)...`;
      uploadStatus.style.color = "var(--accent-indigo)";

      let loadedCount = 0;
      let offlineWarning = false;

      for (const file of files) {
        const localUrl = URL.createObjectURL(file);
        
        const uploadPromise = async () => {
          const fileExtension = file.name.split('.').pop();
          const fileName = `products/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExtension}`;
          const storageRef = ref(storage, fileName);
          const snapshot = await uploadBytes(storageRef, file);
          return await getDownloadURL(snapshot.ref);
        };

        const timeoutPromise = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms));

        try {
          const downloadUrl = await Promise.race([uploadPromise(), timeoutPromise(8000)]);
          state.crudGalleryUrls.push(downloadUrl);
          loadedCount++;
        } catch (err) {
          console.warn("Firebase Storage upload failed or timed out. Falling back to local Blob URL:", err);
          state.crudGalleryUrls.push(localUrl);
          loadedCount++;
          offlineWarning = true;
        }
      }

      if (imageUrlInput) {
        imageUrlInput.value = state.crudGalleryUrls[0] || "";
      }

      if (offlineWarning) {
        uploadStatus.textContent = "⚠️ Uploaded (Firebase offline preview)";
        uploadStatus.style.color = "var(--accent-gold)";
      } else {
        uploadStatus.textContent = `✅ Successfully uploaded ${loadedCount} images!`;
        uploadStatus.style.color = "var(--accent-green)";
      }

      renderCrudGalleryList();
      imageUploadInput.value = "";
    });
  }

  // Submit Inventory Form (Create & Update)
  DOM.productCrudForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const pid = DOM.crudProductId.value;
    const name = DOM.crudName.value;
    const desc = DOM.crudDescription.value;
    const price = parseFloat(DOM.crudPrice.value);
    const category = DOM.crudCategory.value;
    const subcategory = DOM.crudSubcategory.value;
    const printTime = DOM.crudPrintTime.value || "4 hours";
    const weight = DOM.crudWeight.value || "80g";
    const difficulty = DOM.crudDifficulty.value;
    const modelUrl = DOM.crudModelUrl ? DOM.crudModelUrl.value.trim() : "";

    // Read promotion flags & original price
    const isFeatured = DOM.crudIsFeatured ? DOM.crudIsFeatured.checked : false;
    const isNewArrival = DOM.crudIsNewArrival ? DOM.crudIsNewArrival.checked : false;
    const isPriceDrop = DOM.crudIsPriceDrop ? DOM.crudIsPriceDrop.checked : false;
    const originalPrice = (isPriceDrop && DOM.crudOriginalPrice && DOM.crudOriginalPrice.value)
      ? parseFloat(DOM.crudOriginalPrice.value)
      : null;

    // Build color variations from interactive rows
    const colors = Array.from(DOM.crudColorsContainer.querySelectorAll(".option-row")).map(row => {
      const cName = row.querySelector(".color-name-input").value.trim();
      const hex = row.querySelector(".color-hex-input").value;
      return { name: cName, hex, priceModifier: 0 };
    });

    // Build sizes from interactive rows
    const sizes = Array.from(DOM.crudSizesContainer.querySelectorAll(".option-row")).map(row => {
      const sName = row.querySelector(".size-name-input").value.trim();
      const modifier = parseFloat(row.querySelector(".size-price-input").value) || 0;
      return { name: sName, scale: "100%", priceModifier: modifier };
    });

    // Build materials from interactive rows
    const materials = Array.from(DOM.crudMaterialsContainer.querySelectorAll(".option-row")).map(row => {
      const mName = row.querySelector(".material-name-input").value.trim();
      const modifier = parseFloat(row.querySelector(".material-price-input").value) || 0;
      return { name: mName, description: "Custom parsed density grade", priceModifier: modifier };
    });

    const isEdit = pid !== "";
    const productSlug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const imageUrl = document.getElementById("crud-image-url").value || "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=600&q=80";

    const finalProduct = {
      id: isEdit ? pid : productSlug,
      name,
      description: desc,
      basePrice: price,
      category,
      subcategory,
      rating: isEdit ? DB.getProductById(pid).rating : 5.0,
      reviewsCount: isEdit ? DB.getProductById(pid).reviewsCount : 1,
      isFeatured,
      isNewArrival,
      isPriceDrop,
      originalPrice,
      images: {
        [colors[0] ? colors[0].name : "Default"]: state.crudGalleryUrls[0] || "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=600&q=80"
      },
      defaultImage: state.crudGalleryUrls[0] || "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=600&q=80",
      gallery: state.crudGalleryUrls,
      modelUrl,
      variations: { colors, sizes, materials },
      specifications: { printTime, filamentUsed: weight, difficulty }
    };

    if (isEdit) {
      DB.updateProduct(finalProduct);
    } else {
      DB.addProduct(finalProduct);
    }

    DOM.productFormModalOverlay.classList.remove("open");
    renderDashboardInventory();
    renderProductsList();
    renderCuratedHomeSections();
    if (state.activePage === "products") {
      renderProductsPage();
    }
    updateOverviewStats();

    alert(isEdit ? "Product details updated!" : "New product added to store catalog!");
  });

  // ==========================================
  // GENERAL INTERACTION LISTENERS & ROUTING
  // ==========================================
  // Navigations
  DOM.logoBtn.addEventListener("click", () => {
    changePage("store");
    DOM.navHome.classList.add("active");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  DOM.navHome.addEventListener("click", () => {
    changePage("store");
    DOM.navHome.classList.add("active");

    // Reset filters
    state.currentCategory = "all";
    state.currentSubcategory = "all";
    state.searchQuery = "";
    if (DOM.searchBar) DOM.searchBar.value = "";
    
    // Reset products page filters
    state.productsFilterCategory = "all";
    state.productsFilterSubcategory = "all";
    state.productsFilterSearch = "";
    state.productsFilterPrice = 150;
    state.productsFilterSort = "popular";
    
    renderCategoryTabs();
    renderProductsList();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  if (DOM.navDashboard) {
    DOM.navDashboard.addEventListener("click", () => changePage("dashboard"));
  }
  DOM.logoutBtn.addEventListener("click", () => {
    state.isAdminLoggedIn = false;
    sessionStorage.removeItem("isAdminLoggedIn");
    changePage("store");
    DOM.navHome.classList.add("active");
  });

  if (DOM.adminLoginForm) {
    DOM.adminLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = DOM.adminEmailInput.value.trim();
      const password = DOM.adminPasswordInput.value;

      if (email === "hassanshamso12@gmail.com" && password === "11223311") {
        state.isAdminLoggedIn = true;
        sessionStorage.setItem("isAdminLoggedIn", "true");
        DOM.loginErrorMsg.style.display = "none";
        DOM.adminEmailInput.value = "";
        DOM.adminPasswordInput.value = "";
        changePage("dashboard");
      } else {
        DOM.loginErrorMsg.style.display = "block";
      }
    });
  }

  if (DOM.loginBackToStore) {
    DOM.loginBackToStore.addEventListener("click", () => {
      changePage("store");
      DOM.navHome.classList.add("active");
    });
  }
  DOM.detailBackBtn.addEventListener("click", () => {
    changePage("store");
    DOM.navHome.classList.add("active");
  });

  // Static dropdown bindings removed in favor of dynamic renderHeaderProductsDropdown bindings

  // About and Contact scroll routing
  DOM.navAbout.addEventListener("click", () => {
    changePage("store");
    DOM.navAbout.classList.add("active");
    document.getElementById("about-us-section").scrollIntoView({ behavior: 'smooth' });
  });

  DOM.navContact.addEventListener("click", () => {
    changePage("store");
    DOM.navContact.classList.add("active");
    document.getElementById("contact-us-section").scrollIntoView({ behavior: 'smooth' });
  });

  // Contact Form submit
  const contactForm = document.getElementById("storefront-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contact-name").value;
      const email = document.getElementById("contact-email").value;
      const message = document.getElementById("contact-message").value;

      // Simulated auto-response in notification inbox
      addSimulatedEmail(
        "support@pixelpop.com",
        "PixelPop Message Receipt",
        `Hi ${name},\n\nWe have received your message regarding custom quote/inquiry. Our fabrication engineers are currently analyzing details.\n\nYour Message Snippet:\n"${message.slice(0, 100)}..."\n\nWe will email you back within 1-2 hours!\n\nBest regards,\nPixelPop Customer Support`
      );

      alert(`Thank you, ${name}! Your inquiry has been sent. A confirmation note has been dispatched to your inbox center.`);
      contactForm.reset();
    });
  }

  // Landing Page CTA
  DOM.heroCtaBtn.addEventListener("click", () => {
    changePage("products");
  });

  // Search & sorting
  if (DOM.searchBar) {
    DOM.searchBar.addEventListener("input", (e) => {
      state.productsFilterSearch = e.target.value;
      if (DOM.filterSearchInput) DOM.filterSearchInput.value = e.target.value;
      changePage("products");
    });
  }
  if (DOM.sortSelect) {
    DOM.sortSelect.addEventListener("change", (e) => {
      state.productsFilterSort = e.target.value;
      if (DOM.filterSortSelect) DOM.filterSortSelect.value = e.target.value;
      changePage("products");
    });
  }

  // Products Page Sidebar Filter Listeners
  if (DOM.filterPriceRange) {
    DOM.filterPriceRange.addEventListener("input", (e) => {
      state.productsFilterPrice = parseFloat(e.target.value);
      if (DOM.priceLimitLabel) {
        DOM.priceLimitLabel.textContent = `$${state.productsFilterPrice.toFixed(2)}`;
      }
      renderProductsPageGrid();
    });
  }

  if (DOM.filterSearchInput) {
    DOM.filterSearchInput.addEventListener("input", (e) => {
      state.productsFilterSearch = e.target.value;
      renderProductsPageGrid();
    });
  }

  if (DOM.filterSortSelect) {
    DOM.filterSortSelect.addEventListener("change", (e) => {
      state.productsFilterSort = e.target.value;
      renderProductsPageGrid();
    });
  }

  // ==========================================
  // DYNAMIC HERO, DELIVERY, AND SOCIAL CONTROLS
  // ==========================================

  // --- Front-end Renderers ---
  // Store dynamic slideshow cycle state in state
  state.heroSlideshowImages = [];
  state.heroSlideshowIndex = 0;
  state.heroSlideshowIntervalId = null;

  function startHeroSlideshow(images) {
    if (state.heroSlideshowIntervalId) {
      clearInterval(state.heroSlideshowIntervalId);
      state.heroSlideshowIntervalId = null;
    }

    const wrapper = document.getElementById("hero-slides-wrapper");
    if (!wrapper) return;

    state.heroSlideshowImages = (images && images.length > 0) ? images : ["superhero_hero_bg.png"];
    state.heroSlideshowIndex = 0;

    wrapper.innerHTML = state.heroSlideshowImages.map((imgUrl, index) => `
      <img src="${imgUrl}" class="hero-slide ${index === 0 ? 'active' : ''}" alt="Hero Visual Slide">
    `).join("");

    if (state.heroSlideshowImages.length <= 1) return;

    state.heroSlideshowIntervalId = setInterval(() => {
      const slides = wrapper.querySelectorAll(".hero-slide");
      if (slides.length === 0) return;
      slides[state.heroSlideshowIndex].classList.remove("active");
      state.heroSlideshowIndex = (state.heroSlideshowIndex + 1) % slides.length;
      slides[state.heroSlideshowIndex].classList.add("active");
    }, 4000);
  }

  function renderHeroContent() {
    const content = DB.getHeroContent();
    if (!content) return;

    const titleEl = document.querySelector(".hero-content h1");
    const subtitleEl = document.querySelector(".hero-content p");
    
    if (titleEl) titleEl.innerHTML = content.title;
    if (subtitleEl) subtitleEl.textContent = content.subtitle;
    if (DOM.heroCtaBtn) DOM.heroCtaBtn.textContent = content.ctaText;
    
    const printersEl = document.getElementById("stat-printers");
    const printsEl = document.getElementById("stat-prints");
    const ratingEl = document.getElementById("stat-rating");
    if (printersEl) printersEl.textContent = content.activePrinters;
    if (printsEl) printsEl.textContent = content.completedPrints;
    if (ratingEl) ratingEl.textContent = content.customerRating;

    startHeroSlideshow(content.images);
  }

  function renderDeliveryOptions() {
    const options = DB.getDeliveryOptions();
    if (!DOM.deliveryOptionsContainer) return;

    if (options.length === 0) {
      DOM.deliveryOptionsContainer.innerHTML = `<p class="text-danger" style="font-size:0.85rem; font-weight:600; grid-column: 1/-1;">No delivery options available.</p>`;
      return;
    }

    DOM.deliveryOptionsContainer.innerHTML = options.map((opt, idx) => `
      <div class="delivery-option ${idx === 0 ? 'active' : ''}" data-id="${opt.id}" data-price="${opt.price}">
        <div class="option-details">
          <span class="option-name">${opt.name}</span>
          <span class="option-desc">${opt.desc}</span>
        </div>
        <span class="option-price">$${opt.price.toFixed(2)}</span>
      </div>
    `).join("");

    // Rebind click events
    DOM.deliveryOptionsContainer.querySelectorAll(".delivery-option").forEach(opt => {
      opt.addEventListener("click", (e) => {
        DOM.deliveryOptionsContainer.querySelectorAll(".delivery-option").forEach(d => d.classList.remove("active"));
        e.currentTarget.classList.add("active");
        updateCheckoutSummaryTotals();
      });
    });

    updateCheckoutSummaryTotals();
  }

  function renderSocialSettings() {
    const settings = DB.getSocialSettings();
    if (!settings) return;

    const waWidget = document.getElementById("whatsapp-widget");
    const waLink = document.getElementById("whatsapp-link");
    if (waWidget && waLink) {
      if (settings.whatsappEnabled && state.activePage !== "dashboard" && state.activePage !== "admin-login") {
        waWidget.style.display = "block";
        const encodedMsg = encodeURIComponent(settings.whatsappMessage);
        const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, "");
        waLink.href = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
      } else {
        waWidget.style.display = "none";
      }
    }

    // Render footer social links
    const footerSocial = document.getElementById("social-links-footer");
    if (footerSocial) {
      let html = "";
      if (settings.instagramUrl) {
        html += `
          <a href="${settings.instagramUrl}" target="_blank" class="social-link" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
        `;
      }
      if (settings.facebookUrl) {
        html += `
          <a href="${settings.facebookUrl}" target="_blank" class="social-link" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        `;
      }
      if (settings.tiktokUrl) {
        html += `
          <a href="${settings.tiktokUrl}" target="_blank" class="social-link" aria-label="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.99-1.72-.08-.07-.17-.14-.24-.21V14c0 3.32-2.12 6.44-5.33 7.37-3.21.93-6.84-.4-8.37-3.42-1.53-3.01-.7-6.95 1.95-8.98 1.42-1.09 3.21-1.6 4.98-1.41V11.7c-.82-.25-1.74-.1-2.45.39-.71.49-1.12 1.35-1.07 2.21.05.86.63 1.65 1.44 1.93.81.28 1.77.06 2.37-.53.48-.47.72-1.15.72-1.83V.02z"/>
            </svg>
          </a>
        `;
      }
      footerSocial.innerHTML = html;
    }

    // Render Contact page display elements
    const addressEl = document.getElementById("contact-address-display");
    const emailEl = document.getElementById("contact-email-display");
    const phoneEl = document.getElementById("contact-phone-display");
    const hoursEl = document.getElementById("contact-hours-display");

    if (addressEl && settings.address) addressEl.textContent = settings.address;
    if (emailEl && settings.email) {
      emailEl.textContent = settings.email;
      emailEl.href = `mailto:${settings.email}`;
    }
    if (phoneEl && settings.phone) phoneEl.textContent = settings.phone;
    if (hoursEl && settings.hours) hoursEl.textContent = settings.hours;
  }

  // --- Dashboard Initializers & CRUD ---
  // Store uploaded Hero Visual URLs
  state.crudHeroUrls = [];

  function renderHeroGalleryList() {
    if (!DOM.heroGalleryContainer) return;

    if (state.crudHeroUrls.length === 0) {
      DOM.heroGalleryContainer.innerHTML = `<p class="text-muted" style="grid-column:1/-1; font-size:0.85rem;">No visual images uploaded. Click above to upload hero slides!</p>`;
      return;
    }

    DOM.heroGalleryContainer.innerHTML = state.crudHeroUrls.map((imgUrl, index) => `
      <div class="crud-gallery-item">
        <img src="${imgUrl}" alt="Hero Image ${index + 1}">
        <button type="button" class="crud-gallery-remove" data-index="${index}" title="Delete Image">×</button>
      </div>
    `).join("");

    DOM.heroGalleryContainer.querySelectorAll(".crud-gallery-remove").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.currentTarget.dataset.index);
        state.crudHeroUrls.splice(idx, 1);
        renderHeroGalleryList();
      });
    });
  }

  function initHeroDashboardSettings() {
    const content = DB.getHeroContent();
    if (!content) return;
    
    document.getElementById("cfg-hero-title").value = content.title;
    document.getElementById("cfg-hero-subtitle").value = content.subtitle;
    document.getElementById("cfg-hero-cta").value = content.ctaText;
    document.getElementById("cfg-hero-printers").value = content.activePrinters;
    document.getElementById("cfg-hero-prints").value = content.completedPrints;
    document.getElementById("cfg-hero-rating").value = content.customerRating;

    // Load curated sections configuration fields
    if (DOM.cfgFeaturedTitle) DOM.cfgFeaturedTitle.value = content.featuredTitle || "";
    if (DOM.cfgFeaturedDesc) DOM.cfgFeaturedDesc.value = content.featuredSubtitle || "";
    if (DOM.cfgPricedropTitle) DOM.cfgPricedropTitle.value = content.priceDropTitle || "";
    if (DOM.cfgPricedropDesc) DOM.cfgPricedropDesc.value = content.priceDropSubtitle || "";
    if (DOM.cfgNewarrivalTitle) DOM.cfgNewarrivalTitle.value = content.newArrivalTitle || "";
    if (DOM.cfgNewarrivalDesc) DOM.cfgNewarrivalDesc.value = content.newArrivalSubtitle || "";

    // Load visual images into state and gallery list
    state.crudHeroUrls = content.images ? [...content.images] : ["superhero_hero_bg.png"];
    renderHeroGalleryList();

    // Bind Hero Visual Images File Uploader (once)
    if (DOM.heroImagesUpload && !DOM.heroImagesUpload.dataset.listenerBound) {
      DOM.heroImagesUpload.dataset.listenerBound = "true";
      DOM.heroImagesUpload.addEventListener("change", async (ev) => {
        const files = Array.from(ev.target.files);
        if (files.length === 0) return;

        const uploadStatus = document.getElementById("hero-upload-status");
        if (uploadStatus) {
          uploadStatus.textContent = "⏳ Uploading visual slides...";
          uploadStatus.style.color = "var(--accent-indigo)";
        }

        let loadedCount = 0;
        let offlineWarning = false;

        for (const file of files) {
          const localUrl = URL.createObjectURL(file);
          
          const uploadPromise = async () => {
            const fileExtension = file.name.split('.').pop();
            const fileName = `hero/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExtension}`;
            const storageRef = ref(storage, fileName);
            const snapshot = await uploadBytes(storageRef, file);
            return await getDownloadURL(snapshot.ref);
          };

          const timeoutPromise = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms));

          try {
            const downloadUrl = await Promise.race([uploadPromise(), timeoutPromise(8000)]);
            state.crudHeroUrls.push(downloadUrl);
            loadedCount++;
          } catch (err) {
            console.warn("Hero image upload failed or timed out. Falling back to local Blob URL:", err);
            state.crudHeroUrls.push(localUrl);
            loadedCount++;
            offlineWarning = true;
          }
        }

        renderHeroGalleryList();
        DOM.heroImagesUpload.value = "";

        if (uploadStatus) {
          if (offlineWarning) {
            uploadStatus.textContent = `⚠️ Uploaded ${loadedCount} (local preview)`;
            uploadStatus.style.color = "var(--accent-gold)";
          } else {
            uploadStatus.textContent = `✅ Successfully uploaded ${loadedCount} images!`;
            uploadStatus.style.color = "var(--accent-green)";
          }
        }
      });
    }
  }

  function initSocialDashboardSettings() {
    const settings = DB.getSocialSettings();
    if (!settings) return;

    document.getElementById("cfg-wa-enabled").checked = settings.whatsappEnabled;
    document.getElementById("cfg-wa-phone").value = settings.whatsappNumber;
    document.getElementById("cfg-wa-msg").value = settings.whatsappMessage;
    document.getElementById("cfg-instagram-url").value = settings.instagramUrl;
    document.getElementById("cfg-facebook-url").value = settings.facebookUrl;
    if (document.getElementById("cfg-tiktok-url")) document.getElementById("cfg-tiktok-url").value = settings.tiktokUrl || "";

    if (document.getElementById("cfg-contact-address")) document.getElementById("cfg-contact-address").value = settings.address || "";
    if (document.getElementById("cfg-contact-email")) document.getElementById("cfg-contact-email").value = settings.email || "";
    if (document.getElementById("cfg-contact-phone")) document.getElementById("cfg-contact-phone").value = settings.phone || "";
    if (document.getElementById("cfg-contact-hours")) document.getElementById("cfg-contact-hours").value = settings.hours || "";
  }

  function applyTheme() {
    const theme = DB.getThemeSettings();
    if (!theme) return;

    // Apply Logo
    document.querySelectorAll(".logo").forEach(logoEl => {
      const brandWrap = logoEl.querySelector(".logo-brand-wrap") || logoEl;
      if (theme.logoImageUrl) {
        brandWrap.innerHTML = `<img src="${theme.logoImageUrl}" alt="Logo" style="height: 38px; object-fit: contain; max-width: 140px; display: block;">`;
      } else {
        const isDb = logoEl.parentNode.classList.contains("db-sidebar") || brandWrap.classList.contains("logo-brand-wrap");
        const suffix = isDb ? "DB" : (theme.logoText2 || "Pop");
        brandWrap.innerHTML = `
          <div class="logo-icon">${theme.logoLetter || "P"}</div>
          <span>${theme.logoText1 || "Pixel"}<span class="text-gradient">${suffix}</span></span>
        `;
      }
    });

    // Apply Colors
    const root = document.documentElement;
    for (const [key, val] of Object.entries(theme.colors)) {
      root.style.setProperty(`--${key}`, val);
    }

    // Set Theme Mode Colors
    if (theme.themeMode === "dark") {
      root.style.setProperty("--bg-primary", "#0b0c10");
      root.style.setProperty("--bg-secondary", "#1a1c23");
      root.style.setProperty("--bg-card", "rgba(26, 28, 35, 0.75)");
      root.style.setProperty("--bg-card-hover", "rgba(35, 38, 48, 0.9)");
      root.style.setProperty("--glass-border", "rgba(255, 255, 255, 0.08)");
      root.style.setProperty("--glass-shadow", "rgba(0, 0, 0, 0.3)");
      root.style.setProperty("--text-main", "#f1f5f9");
      root.style.setProperty("--text-muted", "#94a3b8");
      
      root.style.setProperty("--body-bg-overlay", `
        linear-gradient(rgba(11, 12, 16, 0.94), rgba(11, 12, 16, 0.94))
      `);
    } else {
      root.style.setProperty("--bg-primary", "#ffffff");
      root.style.setProperty("--bg-secondary", "#f8fafc");
      root.style.setProperty("--bg-card", "rgba(255, 255, 255, 0.75)");
      root.style.setProperty("--bg-card-hover", "rgba(241, 245, 249, 0.9)");
      root.style.setProperty("--glass-border", "rgba(15, 23, 42, 0.08)");
      root.style.setProperty("--glass-shadow", "rgba(15, 23, 42, 0.04)");
      root.style.setProperty("--text-main", "#0f172a");
      root.style.setProperty("--text-muted", "#64748b");
      
      root.style.setProperty("--body-bg-overlay", `
        linear-gradient(rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.96))
      `);
    }
  }

  function initThemeDashboardSettings() {
    const theme = DB.getThemeSettings();
    if (!theme) return;

    DOM.cfgThemeMode.value = theme.themeMode;
    DOM.cfgThemePreset.value = "custom";
    
    DOM.cfgColorIndigo.value = theme.colors["accent-indigo"];
    DOM.cfgColorCyan.value = theme.colors["accent-cyan"];
    DOM.cfgColorPurple.value = theme.colors["accent-purple"];
    DOM.cfgColorPink.value = theme.colors["accent-pink"];
    
    DOM.cfgLogoLetter.value = theme.logoLetter || "P";
    DOM.cfgLogoText1.value = theme.logoText1 || "Pixel";
    DOM.cfgLogoText2.value = theme.logoText2 || "Pop";

    // Set custom logo inputs and preview state
    const imgUrlInput = document.getElementById("cfg-logo-image-url");
    const previewContainer = document.getElementById("cfg-logo-preview-container");
    const previewImg = document.getElementById("cfg-logo-preview");
    if (imgUrlInput && theme.logoImageUrl) {
      imgUrlInput.value = theme.logoImageUrl;
      if (previewImg) previewImg.src = theme.logoImageUrl;
      if (previewContainer) previewContainer.style.display = "flex";
    } else {
      if (imgUrlInput) imgUrlInput.value = "";
      if (previewContainer) previewContainer.style.display = "none";
    }

    // Bind logo image file upload triggers (once)
    const logoUploadInput = document.getElementById("cfg-logo-upload");
    const logoUploadStatus = document.getElementById("logo-upload-status");
    const btnRemoveLogoImg = document.getElementById("btn-remove-logo-img");

    if (logoUploadInput && !logoUploadInput.dataset.listenerBound) {
      logoUploadInput.dataset.listenerBound = "true";
      logoUploadInput.addEventListener("change", async (ev) => {
        const file = ev.target.files[0];
        if (!file) return;

        logoUploadStatus.textContent = "⏳ Uploading logo...";
        logoUploadStatus.style.color = "var(--accent-indigo)";

        const uploadPromise = async () => {
          const fileExtension = file.name.split('.').pop();
          const fileName = `logos/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExtension}`;
          const storageRef = ref(storage, fileName);
          const snapshot = await uploadBytes(storageRef, file);
          return await getDownloadURL(snapshot.ref);
        };

        const timeoutPromise = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms));

        try {
          const downloadUrl = await Promise.race([uploadPromise(), timeoutPromise(8000)]);
          const urlField = document.getElementById("cfg-logo-image-url");
          const previewField = document.getElementById("cfg-logo-preview");
          const containerField = document.getElementById("cfg-logo-preview-container");
          if (urlField) urlField.value = downloadUrl;
          if (previewField) previewField.src = downloadUrl;
          if (containerField) containerField.style.display = "flex";
          logoUploadStatus.textContent = "✅ Logo uploaded!";
          logoUploadStatus.style.color = "var(--accent-green)";
        } catch (err) {
          console.warn("Logo upload failed or timed out. Falling back to local Blob URL:", err);
          const localUrl = URL.createObjectURL(file);
          const urlField = document.getElementById("cfg-logo-image-url");
          const previewField = document.getElementById("cfg-logo-preview");
          const containerField = document.getElementById("cfg-logo-preview-container");
          if (urlField) urlField.value = localUrl;
          if (previewField) previewField.src = localUrl;
          if (containerField) containerField.style.display = "flex";
          logoUploadStatus.textContent = "⚠️ Uploaded (local preview)";
          logoUploadStatus.style.color = "var(--accent-gold)";
        }
      });
    }

    if (btnRemoveLogoImg && !btnRemoveLogoImg.dataset.listenerBound) {
      btnRemoveLogoImg.dataset.listenerBound = "true";
      btnRemoveLogoImg.addEventListener("click", () => {
        const urlField = document.getElementById("cfg-logo-image-url");
        const fileField = document.getElementById("cfg-logo-upload");
        const previewField = document.getElementById("cfg-logo-preview");
        const containerField = document.getElementById("cfg-logo-preview-container");
        if (urlField) urlField.value = "";
        if (fileField) fileField.value = "";
        if (previewField) previewField.src = "";
        if (containerField) containerField.style.display = "none";
        logoUploadStatus.textContent = "🗑️ Image logo cleared";
        logoUploadStatus.style.color = "var(--accent-gold)";
      });
    }

    // Reset old listeners if any by replacing element or just binding directly
    // Preset change handler
    DOM.cfgThemePreset.removeEventListener("change", handlePresetChange);
    DOM.cfgThemePreset.addEventListener("change", handlePresetChange);
  }

  function handlePresetChange(e) {
    const preset = e.target.value;
    const presets = {
      "default": {
        "accent-indigo": "#4f46e5",
        "accent-cyan": "#0891b2",
        "accent-purple": "#7c3aed",
        "accent-pink": "#db2777"
      },
      "emerald-gold": {
        "accent-indigo": "#059669",
        "accent-cyan": "#d97706",
        "accent-purple": "#10b981",
        "accent-pink": "#f59e0b"
      },
      "rose-purple": {
        "accent-indigo": "#db2777",
        "accent-cyan": "#7c3aed",
        "accent-purple": "#ec4899",
        "accent-pink": "#a855f7"
      },
      "cyberpunk": {
        "accent-indigo": "#ea580c",
        "accent-cyan": "#e11d48",
        "accent-purple": "#f97316",
        "accent-pink": "#f43f5e"
      },
      "ocean-breeze": {
        "accent-indigo": "#0284c7",
        "accent-cyan": "#0d9488",
        "accent-purple": "#0ea5e9",
        "accent-pink": "#14b8a6"
      }
    };

    if (presets[preset]) {
      DOM.cfgColorIndigo.value = presets[preset]["accent-indigo"];
      DOM.cfgColorCyan.value = presets[preset]["accent-cyan"];
      DOM.cfgColorPurple.value = presets[preset]["accent-purple"];
      DOM.cfgColorPink.value = presets[preset]["accent-pink"];
    }
  }

  if (DOM.themeConfigForm) {
    DOM.themeConfigForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const imgUrlInput = document.getElementById("cfg-logo-image-url");
      const updatedTheme = {
        logoLetter: DOM.cfgLogoLetter.value.trim(),
        logoText1: DOM.cfgLogoText1.value.trim(),
        logoText2: DOM.cfgLogoText2.value.trim(),
        logoImageUrl: imgUrlInput ? imgUrlInput.value : "",
        themeMode: DOM.cfgThemeMode.value,
        colors: {
          "accent-indigo": DOM.cfgColorIndigo.value,
          "accent-cyan": DOM.cfgColorCyan.value,
          "accent-purple": DOM.cfgColorPurple.value,
          "accent-pink": DOM.cfgColorPink.value,
          "accent-gold": "#d97706",
          "accent-green": "#059669",
          "accent-red": "#dc2626"
        }
      };

      DB.saveThemeSettings(updatedTheme);
      applyTheme();
      alert("Website branding and color theme saved successfully! 💾");
    });
  }

  function renderDashboardDeliveryOptions() {
    const options = DB.getDeliveryOptions();
    if (!DOM.dbDeliveryOptionsTbody) return;

    if (options.length === 0) {
      DOM.dbDeliveryOptionsTbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 2rem;">No delivery options registered. Add one!</td></tr>`;
      return;
    }

    DOM.dbDeliveryOptionsTbody.innerHTML = options.map(o => `
      <tr>
        <td><strong>${o.name}</strong></td>
        <td>${o.desc}</td>
        <td><strong>$${o.price.toFixed(2)}</strong></td>
        <td>
          <button class="action-icon-btn edit-delivery" data-id="${o.id}" title="Edit Option">✏️</button>
          <button class="action-icon-btn delete delete-delivery" data-id="${o.id}" title="Delete Option" style="margin-left: 0.5rem;">🗑️</button>
        </td>
      </tr>
    `).join("");

    // Bind actions
    DOM.dbDeliveryOptionsTbody.querySelectorAll(".delete-delivery").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        if (confirm("Are you sure you want to delete this delivery option?")) {
          let current = DB.getDeliveryOptions();
          current = current.filter(item => item.id !== id);
          DB.saveDeliveryOptions(current);
          renderDashboardDeliveryOptions();
          renderDeliveryOptions();
        }
      });
    });

    DOM.dbDeliveryOptionsTbody.querySelectorAll(".edit-delivery").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        openDeliveryModal(id);
      });
    });
  }

  function openDeliveryModal(optionId = null) {
    DOM.deliveryModalOverlay.classList.add("open");
    DOM.deliveryCrudForm.reset();
    document.getElementById("crud-delivery-id").value = "";
    document.getElementById("delivery-modal-title").textContent = "Create Delivery Option";

    if (optionId) {
      const options = DB.getDeliveryOptions();
      const opt = options.find(o => o.id === optionId);
      if (opt) {
        document.getElementById("delivery-modal-title").textContent = "Edit Delivery Option";
        document.getElementById("crud-delivery-id").value = opt.id;
        document.getElementById("crud-delivery-name").value = opt.name;
        document.getElementById("crud-delivery-desc").value = opt.desc;
        document.getElementById("crud-delivery-price").value = opt.price;
      }
    }
  }

  // --- Form submission event bindings ---
  if (DOM.heroConfigForm) {
    DOM.heroConfigForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const updated = {
        title: document.getElementById("cfg-hero-title").value.trim(),
        subtitle: document.getElementById("cfg-hero-subtitle").value.trim(),
        ctaText: document.getElementById("cfg-hero-cta").value.trim(),
        activePrinters: document.getElementById("cfg-hero-printers").value.trim(),
        completedPrints: document.getElementById("cfg-hero-prints").value.trim(),
        customerRating: document.getElementById("cfg-hero-rating").value.trim(),
        // Save curated section values
        featuredTitle: DOM.cfgFeaturedTitle ? DOM.cfgFeaturedTitle.value.trim() : "",
        featuredSubtitle: DOM.cfgFeaturedDesc ? DOM.cfgFeaturedDesc.value.trim() : "",
        priceDropTitle: DOM.cfgPricedropTitle ? DOM.cfgPricedropTitle.value.trim() : "",
        priceDropSubtitle: DOM.cfgPricedropDesc ? DOM.cfgPricedropDesc.value.trim() : "",
        newArrivalTitle: DOM.cfgNewarrivalTitle ? DOM.cfgNewarrivalTitle.value.trim() : "",
        newArrivalSubtitle: DOM.cfgNewarrivalDesc ? DOM.cfgNewarrivalDesc.value.trim() : "",
        images: state.crudHeroUrls
      };
      DB.saveHeroContent(updated);
      renderHeroContent();
      renderCuratedHomeSections();
      alert("Hero section content saved successfully! 💾");
    });
  }

  if (DOM.socialConfigForm) {
    DOM.socialConfigForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const updated = {
        whatsappEnabled: document.getElementById("cfg-wa-enabled").checked,
        whatsappNumber: document.getElementById("cfg-wa-phone").value.trim(),
        whatsappMessage: document.getElementById("cfg-wa-msg").value.trim(),
        instagramUrl: document.getElementById("cfg-instagram-url").value.trim(),
        facebookUrl: document.getElementById("cfg-facebook-url").value.trim(),
        tiktokUrl: document.getElementById("cfg-tiktok-url") ? document.getElementById("cfg-tiktok-url").value.trim() : "",
        address: document.getElementById("cfg-contact-address").value.trim(),
        email: document.getElementById("cfg-contact-email").value.trim(),
        phone: document.getElementById("cfg-contact-phone").value.trim(),
        hours: document.getElementById("cfg-contact-hours").value.trim(),
      };
      DB.saveSocialSettings(updated);
      renderSocialSettings();
      alert("Social, support & contact settings saved successfully! 💾");
    });
  }

  if (DOM.addDeliveryOptionBtn) {
    DOM.addDeliveryOptionBtn.addEventListener("click", () => openDeliveryModal());
  }

  if (DOM.closeDeliveryModalBtn) {
    DOM.closeDeliveryModalBtn.addEventListener("click", () => {
      DOM.deliveryModalOverlay.classList.remove("open");
    });
  }

  if (DOM.deliveryCrudForm) {
    DOM.deliveryCrudForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("crud-delivery-id").value;
      const name = document.getElementById("crud-delivery-name").value.trim();
      const desc = document.getElementById("crud-delivery-desc").value.trim();
      const price = parseFloat(document.getElementById("crud-delivery-price").value);

      let options = DB.getDeliveryOptions();
      if (id) {
        options = options.map(o => o.id === id ? { id, name, desc, price } : o);
      } else {
        const newId = name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now();
        options.push({ id: newId, name, desc, price });
      }

      DB.saveDeliveryOptions(options);
      DOM.deliveryModalOverlay.classList.remove("open");
      renderDashboardDeliveryOptions();
      renderDeliveryOptions();
    });
  }

  // --- Superhero Spawner Effect ---
  function initSuperheroSpawner() {
    const container = document.querySelector(".nozzle-simulator");
    if (!container) return;

    // Ambient spawning
    let ambientTimer = null;
    function startAmbientSpawning() {
      const delay = 800 + Math.random() * 800;
      ambientTimer = setTimeout(() => {
        if (state.activePage === "store") {
          spawnSuperheroParticle(container, false);
        }
        startAmbientSpawning();
      }, delay);
    }

    startAmbientSpawning();

    // Click handler for bursts
    container.addEventListener("click", (e) => {
      e.stopPropagation();
      
      const burstCount = 18 + Math.floor(Math.random() * 8); // 18 - 25 particles
      for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
          spawnSuperheroParticle(container, true);
        }, i * 35); // stagger for premium burst feel
      }
      
      // Pulse/scale animation to nozzle icon itself
      const nozzleIcon = container.querySelector(".nozzle-icon");
      if (nozzleIcon) {
        nozzleIcon.style.transition = "transform 0.1s ease";
        nozzleIcon.style.transform = "scale(0.82)";
        setTimeout(() => {
          nozzleIcon.style.transform = "";
        }, 120);
      }
    });
  }

  function spawnSuperheroParticle(container, isBurst = false) {
    const HEROES = [
      {
        name: "batman",
        glow: "0 0 15px rgba(250, 204, 21, 0.45)",
        svgGlow: "#facc15",
        html: `<svg viewBox="0 0 24 24"><path fill="#facc15" d="M12 6.5c-.5 0-1 1.8-1.2 2.6-1.2-.2-2.4-1.8-4.4-1.8-2.8 0-5.2 2.6-5.2 5.6 0 4.6 5.8 9.4 10.8 12.4 5-3 10.8-7.8 10.8-12.4 0-3-2.4-5.6-5.2-5.6-2 0-3.2 1.6-4.4 1.8-.2-.8-.7-2.6-1.2-2.6z"/></svg>`
      },
      {
        name: "superman",
        glow: "0 0 15px rgba(239, 68, 68, 0.45)",
        svgGlow: "#ef4444",
        html: `<svg viewBox="0 0 24 24"><path fill="#ef4444" stroke="#facc15" stroke-width="1.2" d="M12 2 L21.5 5 L19 14 L12 22 L5 14 L2.5 5 Z"/><path fill="#facc15" d="M12.5 6.5 C10.8 6.5 10 7.5 10 8.5 L11.2 8.5 C11.2 8 11.8 7.4 12.5 7.4 C13.2 7.4 13.5 7.8 13.5 8.2 C13.5 8.8 12.8 9.2 12.2 9.6 C11.2 10.1 10.8 10.8 10.8 11.5 L10.8 12.5 L14.2 12.5 L14.2 11.5 C14.2 11 14.8 10.6 15.2 10.2 C15.8 9.8 16 9.2 16 8.5 C16 7.2 14.5 6.5 12.5 6.5 Z"/></svg>`
      },
      {
        name: "flash",
        glow: "0 0 15px rgba(250, 204, 21, 0.55)",
        svgGlow: "#facc15",
        html: `<svg viewBox="0 0 24 24"><path fill="#facc15" d="M15 2L6 13h5l-3 9 10-11h-5l3-8z"/></svg>`
      },
      {
        name: "captain-america",
        glow: "0 0 15px rgba(59, 130, 246, 0.45)",
        svgGlow: "#3b82f6",
        html: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ef4444"/><circle cx="12" cy="12" r="8.5" fill="#ffffff"/><circle cx="12" cy="12" r="6" fill="#3b82f6"/><polygon points="12,7 13.5,10.5 17,10.5 14.2,12.5 15.3,16 12,14 8.7,16 9.8,12.5 7,10.5 10.5,10.5" fill="#ffffff"/></svg>`
      },
      {
        name: "ironman",
        glow: "0 0 15px rgba(239, 68, 68, 0.45)",
        svgGlow: "#ef4444",
        html: `<svg viewBox="0 0 24 24"><path fill="#ef4444" d="M12 2c-4.4 0-8 3.6-8 8v4c0 3.3 2.7 6 6 6h4c3.3 0 6-2.7 6-6v-4c0-4.4-3.6-8-8-8zm-4 7h8v1H8V9zm1 3h6v2.5l-1 1h-4l-1-1V12z"/><path fill="#facc15" d="M7 8h10v1H7V8zm1.5 3h7v1.5l-.8.8h-5.4l-.8-.8V11z"/></svg>`
      },
      {
        name: "spiderman",
        glow: "0 0 15px rgba(239, 68, 68, 0.55)",
        svgGlow: "#ef4444",
        html: `<svg viewBox="0 0 24 24"><circle cx="12" cy="10" r="2.5" fill="#ef4444"/><circle cx="12" cy="14" r="3.5" fill="#ef4444"/><path stroke="#ef4444" stroke-width="1.5" stroke-linecap="round" d="M12 9 C8 7, 7 4, 7 4 M12 9 C16 7, 17 4, 17 4 M12 11 C8 11, 6 9, 6 9 M12 11 C16 11, 18 9, 18 9 M12 13 C8 15, 6 18, 6 18 M12 13 C16 15, 18 18, 18 18 M12 15 C8 18, 7 21, 7 21 M12 15 C16 18, 17 21, 17 21"/></svg>`
      }
    ];

    const hero = HEROES[Math.floor(Math.random() * HEROES.length)];
    const el = document.createElement("div");
    el.className = "hero-superhero-particle";
    el.innerHTML = hero.html;

    const angle = Math.random() * Math.PI * 2;
    const distance = isBurst ? (120 + Math.random() * 150) : (80 + Math.random() * 90);
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const rot = -360 + Math.random() * 720;
    const duration = isBurst ? (0.8 + Math.random() * 0.7) : (1.4 + Math.random() * 0.8);

    el.style.setProperty("--particle-glow", hero.glow);
    el.style.setProperty("--particle-svg-glow", hero.svgGlow);
    el.style.setProperty("--particle-tx", `${tx}px`);
    el.style.setProperty("--particle-ty", `${ty}px`);
    el.style.setProperty("--particle-rot", `${rot}deg`);
    el.style.setProperty("--particle-duration", `${duration}s`);

    container.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, duration * 1000);
  }

  function syncProductModalCategories(selectedCatId = null, selectedSubName = null) {
    const categories = DB.getCategories();
    if (categories.length === 0) {
      DOM.crudCategory.innerHTML = `<option value="">No categories available</option>`;
      DOM.crudSubcategory.innerHTML = `<option value="">No subcategories available</option>`;
      return;
    }

    // Populate category select
    DOM.crudCategory.innerHTML = categories.map(cat => `
      <option value="${cat.id}">${cat.name}</option>
    `).join("");

    if (selectedCatId) {
      DOM.crudCategory.value = selectedCatId;
    }

    const updateSubcategories = () => {
      const activeCatId = DOM.crudCategory.value;
      const activeCat = categories.find(c => c.id === activeCatId);
      if (activeCat && activeCat.subcategories && activeCat.subcategories.length > 0) {
        DOM.crudSubcategory.innerHTML = activeCat.subcategories.map(sub => `
          <option value="${sub}">${sub}</option>
        `).join("");
        if (selectedSubName && activeCat.subcategories.includes(selectedSubName)) {
          DOM.crudSubcategory.value = selectedSubName;
        }
      } else {
        DOM.crudSubcategory.innerHTML = `<option value="">None</option>`;
      }
    };

    updateSubcategories();

    DOM.crudCategory.removeEventListener("change", updateSubcategories);
    DOM.crudCategory.addEventListener("change", updateSubcategories);
  }

  function renderDashboardCategories() {
    const categories = DB.getCategories();
    if (!DOM.dbCategoriesTbody) return;

    if (categories.length === 0) {
      DOM.dbCategoriesTbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 2rem;">No categories registered yet. Click "+ Add Category" to create one!</td></tr>`;
      return;
    }

    DOM.dbCategoriesTbody.innerHTML = categories.map(cat => {
      const subList = cat.subcategories.map(sub => `
        <span class="tag-chip" style="margin-right: 0.5rem; margin-bottom: 0.5rem; display: inline-flex; align-items: center; background: rgba(0,0,0,0.05); padding: 0.2rem 0.5rem; border-radius: 6px;">
          ${sub}
          <span class="remove-subcategory-btn" data-cat-id="${cat.id}" data-sub-name="${sub}" style="cursor: pointer; color: var(--accent-red); margin-left: 0.4rem; font-weight: bold;">×</span>
        </span>
      `).join("") || `<span class="text-muted" style="font-size: 0.85rem;">None</span>`;

      return `
        <tr>
          <td><strong>${cat.name}</strong></td>
          <td><code>${cat.id}</code></td>
          <td style="max-width: 400px; white-space: normal;">
            <div style="display: flex; flex-wrap: wrap; align-items: center;">
              ${subList}
            </div>
          </td>
          <td>
            <button class="btn btn-secondary btn-sm add-sub-btn" data-id="${cat.id}">+ Add Sub</button>
            <button class="action-icon-btn delete delete-cat" data-id="${cat.id}" title="Delete Category" style="margin-left: 0.8rem;">🗑️</button>
          </td>
        </tr>
      `;
    }).join("");

    // Bind Add Subcategory
    DOM.dbCategoriesTbody.querySelectorAll(".add-sub-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        openSubcategoryModal(btn.dataset.id);
      });
    });

    // Bind Delete Category
    DOM.dbCategoriesTbody.querySelectorAll(".delete-cat").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        if (confirm("Are you sure you want to delete this category? This will not delete products in this category, but they may become uncategorized.")) {
          let current = DB.getCategories();
          current = current.filter(item => item.id !== id);
          DB.saveCategories(current);
          renderDashboardCategories();
          renderCategoryTabs();
          renderProductsList();
          renderHeaderProductsDropdown();
        }
      });
    });

    // Bind Remove Subcategory
    DOM.dbCategoriesTbody.querySelectorAll(".remove-subcategory-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const catId = btn.dataset.catId;
        const subName = btn.dataset.subName;
        if (confirm(`Remove subcategory "${subName}" from this category?`)) {
          let current = DB.getCategories();
          const cat = current.find(c => c.id === catId);
          if (cat) {
            cat.subcategories = cat.subcategories.filter(s => s !== subName);
            DB.saveCategories(current);
            renderDashboardCategories();
            renderCategoryTabs();
            renderProductsList();
            renderHeaderProductsDropdown();
          }
        }
      });
    });
  }

  function openCategoryModal() {
    DOM.categoryModalOverlay.classList.add("open");
    DOM.categoryCrudForm.reset();
  }

  function openSubcategoryModal(catId) {
    DOM.subcategoryModalOverlay.classList.add("open");
    DOM.subcategoryCrudForm.reset();
    document.getElementById("crud-subcategory-cat-id").value = catId;
  }

  if (DOM.addCategoryBtn) {
    DOM.addCategoryBtn.addEventListener("click", openCategoryModal);
  }
  if (DOM.closeCategoryModalBtn) {
    DOM.closeCategoryModalBtn.addEventListener("click", () => {
      DOM.categoryModalOverlay.classList.remove("open");
    });
  }
  if (DOM.closeSubcategoryModalBtn) {
    DOM.closeSubcategoryModalBtn.addEventListener("click", () => {
      DOM.subcategoryModalOverlay.classList.remove("open");
    });
  }

  if (DOM.categoryCrudForm) {
    DOM.categoryCrudForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("crud-category-name").value.trim();
      const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

      let current = DB.getCategories();
      if (current.some(c => c.id === id)) {
        alert("A category with this name or ID already exists!");
        return;
      }

      current.push({ id, name, subcategories: [] });
      DB.saveCategories(current);
      DOM.categoryModalOverlay.classList.remove("open");
      renderDashboardCategories();
      renderCategoryTabs();
      renderProductsList();
      renderHeaderProductsDropdown();
    });
  }

  if (DOM.subcategoryCrudForm) {
    DOM.subcategoryCrudForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const catId = document.getElementById("crud-subcategory-cat-id").value;
      const subName = document.getElementById("crud-subcategory-name").value.trim();

      let current = DB.getCategories();
      const cat = current.find(c => c.id === catId);
      if (cat) {
        if (cat.subcategories.includes(subName)) {
          alert("This subcategory already exists under this category!");
          return;
        }
        cat.subcategories.push(subName);
        DB.saveCategories(current);
      }

      DOM.subcategoryModalOverlay.classList.remove("open");
      renderDashboardCategories();
      renderCategoryTabs();
      renderProductsList();
      renderHeaderProductsDropdown();
    });
  }

  function renderDashboardCoupons() {
    const coupons = DB.getCoupons();
    if (!DOM.dbCouponsTbody) return;

    if (coupons.length === 0) {
      DOM.dbCouponsTbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 2rem;">No coupons registered yet. Create one!</td></tr>`;
      return;
    }

    DOM.dbCouponsTbody.innerHTML = coupons.map(c => `
      <tr>
        <td><strong>${c.code}</strong></td>
        <td>${c.type === 'percent' ? 'Percentage (%)' : 'Fixed Amount ($)'}</td>
        <td>${c.type === 'percent' ? `${c.value}%` : `$${c.value.toFixed(2)}`}</td>
        <td>
          <button class="action-icon-btn delete delete-coupon" data-code="${c.code}" title="Delete Coupon">🗑️</button>
        </td>
      </tr>
    `).join("");

    // Bind Delete Coupon Actions
    DOM.dbCouponsTbody.querySelectorAll(".delete-coupon").forEach(btn => {
      btn.addEventListener("click", () => {
        const code = btn.dataset.code;
        if (confirm(`Are you sure you want to delete coupon code "${code}"?`)) {
          DB.deleteCoupon(code);
          renderDashboardCoupons();
          
          // Clear active coupon if deleted
          if (state.appliedCoupon && state.appliedCoupon.code === code) {
            state.appliedCoupon = null;
            if (DOM.cartCouponInput) DOM.cartCouponInput.value = "";
            if (DOM.cartCouponStatus) DOM.cartCouponStatus.textContent = "";
            updateCartUI();
          }
        }
      });
    });
  }

  // Coupon Apply Event Listener (Cart Drawer)
  if (DOM.applyCouponBtn) {
    DOM.applyCouponBtn.addEventListener("click", () => {
      const inputVal = DOM.cartCouponInput.value.trim().toUpperCase();
      if (!inputVal) {
        state.appliedCoupon = null;
        DOM.cartCouponStatus.textContent = "";
        updateCartUI();
        return;
      }

      const coupons = DB.getCoupons();
      const matched = coupons.find(c => c.code.toUpperCase() === inputVal);

      if (matched) {
        state.appliedCoupon = matched;
        DOM.cartCouponStatus.textContent = `✅ Coupon "${matched.code}" applied!`;
        DOM.cartCouponStatus.style.color = "var(--accent-green)";
        updateCartUI();
      } else {
        state.appliedCoupon = null;
        DOM.cartCouponStatus.textContent = "❌ Invalid coupon code.";
        DOM.cartCouponStatus.style.color = "var(--accent-red)";
        updateCartUI();
      }
    });
  }

  // Coupon Dashboard Form Submit
  if (DOM.couponCrudForm) {
    DOM.couponCrudForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const code = document.getElementById("crud-coupon-code").value.trim().toUpperCase();
      const type = document.getElementById("crud-coupon-type").value;
      const value = parseFloat(document.getElementById("crud-coupon-value").value);

      const coupons = DB.getCoupons();
      if (coupons.some(c => c.code.toUpperCase() === code)) {
        alert("A coupon with this code already exists!");
        return;
      }

      const newCoupon = { code, type, value };
      DB.addCoupon(newCoupon);
      DOM.couponCrudForm.reset();
      renderDashboardCoupons();
      alert(`Coupon "${code}" created successfully! 🏷️`);
    });
  }

  // INITIALIZE ON RUN
  async function startApplication() {
    try {
      await DB.syncFromFirestore();
    } catch (err) {
      console.warn("Firestore startup sync failed or timed out. Operating in offline/local fallback mode:", err);
    }
    initApp();

    // Auto-repair color swatches and names mismatch in the database
    const products = DB.getProducts();
    let anyRepaired = false;
    products.forEach(p => {
      let repaired = false;
      if (p.variations && p.variations.colors) {
        p.variations.colors.forEach(col => {
          const lowerName = col.name.toLowerCase().trim();
          if (swatchHexMap[lowerName] && col.hex !== swatchHexMap[lowerName]) {
            col.hex = swatchHexMap[lowerName];
            repaired = true;
          }
        });
      }
      if (repaired) {
        DB.updateProduct(p);
        anyRepaired = true;
      }
    });
    if (anyRepaired) {
      renderProductsList();
      renderCuratedHomeSections();
    }

    handleUrlRouting();
    updateNotificationBell();
  }
  startApplication();


