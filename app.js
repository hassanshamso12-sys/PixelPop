// PixelPop E-Commerce and Admin Dashboard Application Controller

document.addEventListener("DOMContentLoaded", () => {
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
    colorsTagsBox: document.getElementById("colors-tags-box"),
    colorsTagInput: document.getElementById("colors-tag-input"),
    crudSizes: document.getElementById("crud-sizes"),
    crudMaterials: document.getElementById("crud-materials"),
    adminLoginPage: document.getElementById("admin-login-page"),
    adminLoginForm: document.getElementById("admin-login-form"),
    adminEmailInput: document.getElementById("admin-email"),
    adminPasswordInput: document.getElementById("admin-password"),
    loginErrorMsg: document.getElementById("login-error-msg"),
    loginBackToStore: document.getElementById("login-back-to-store"),
  };

  // Tag input helper list
  let currentColorsTags = [];

  // ==========================================
  // INITIALIZATION & ROUTING
  // ==========================================

  function initApp() {
    renderCategoryTabs();
    renderProductsList();
    updateCartUI();
    renderEmailList();
    setupEmailAutoChecks();

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

    if (page === "store") {
      DOM.storefrontPage.style.display = "block";
      if (pushState && window.location.pathname !== "/") {
        history.pushState({ page: "store" }, "", "/");
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

  // ==========================================
  // CATALOG RENDERING & FILTERING
  // ==========================================

  function renderCategoryTabs() {
    const categories = DB.getCategories();
    let html = `<button class="category-tab ${state.currentCategory === 'all' ? 'active' : ''}" data-id="all">All Items</button>`;

    categories.forEach(cat => {
      html += `<button class="category-tab ${state.currentCategory === cat.id ? 'active' : ''}" data-id="${cat.id}">${cat.name}</button>`;
    });

    DOM.categoryTabs.innerHTML = html;

    // Click Handlers
    document.querySelectorAll(".category-tab").forEach(tab => {
      tab.addEventListener("click", (e) => {
        state.currentCategory = e.target.dataset.id;
        state.currentSubcategory = "all"; // Reset subcat
        document.querySelectorAll(".category-tab").forEach(t => t.classList.remove("active"));
        e.target.classList.add("active");
        renderSubcategoryChips();
        renderProductsList();
      });
    });

    renderSubcategoryChips();
  }

  function renderSubcategoryChips() {
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
    document.querySelectorAll(".subcategory-chip").forEach(chip => {
      chip.addEventListener("click", (e) => {
        state.currentSubcategory = e.target.dataset.sub;
        document.querySelectorAll(".subcategory-chip").forEach(c => c.classList.remove("active"));
        e.target.classList.add("active");
        renderProductsList();
      });
    });
  }

  function renderProductsList() {
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

    // Render HTML
    if (products.length === 0) {
      DOM.productsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 4rem 0;">No 3D items found matching your filters.</div>`;
      return;
    }

    DOM.productsGrid.innerHTML = products.map(p => {
      const displayPrice = p.basePrice.toFixed(2);
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
              <span class="card-price">$${displayPrice}</span>
              <button class="btn btn-secondary btn-sm browse-item-btn" data-id="${p.id}">Configure</button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Add Config listeners
    document.querySelectorAll(".browse-item-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        openProductDetails(e.target.dataset.id);
      });
    });

    document.querySelectorAll(".product-card").forEach(card => {
      card.addEventListener("click", () => {
        openProductDetails(card.dataset.id);
      });
    });
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
    if (state.customization.color && prod.images[state.customization.color.name]) {
      // Optionally we can crossfade or display the matching photo background
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
    DOM.cartTotalVal.textContent = `$${subtotal.toFixed(2)}`;

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

    // Attach click events to delivery options once just in case
    document.querySelectorAll(".delivery-option").forEach(opt => {
      // remove old listeners
      const newOpt = opt.cloneNode(true);
      opt.parentNode.replaceChild(newOpt, opt);
    });

    document.querySelectorAll(".delivery-option").forEach(opt => {
      opt.addEventListener("click", (e) => {
        document.querySelectorAll(".delivery-option").forEach(d => d.classList.remove("active"));
        e.currentTarget.classList.add("active");
        updateCheckoutSummaryTotals();
      });
    });

    updateCheckoutSummaryTotals();
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

    const total = subtotal + shippingPrice + surchargeFee;
    DOM.chkTotalVal.textContent = `$${total.toFixed(2)}`;
  }

  // Submit Order Form
  DOM.checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("chk-first-name").value;
    const lastName = document.getElementById("chk-last-name").value;
    const email = document.getElementById("chk-email").value;
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

    // Surcharge
    let surchargeFee = 0;
    if (paymentOpt === "cod") {
      const settings = DB.getPaymentSettings();
      surchargeFee = parseFloat(settings.cod.extraFee) || 0;
    }
    const total = subtotal + shippingPrice + surchargeFee;

    // Build Order Object
    const orderId = `PIXEL-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      customer: { firstName, lastName, email, address, city, zip },
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
      totals: { subtotal, shipping: shippingPrice, surcharge: surchargeFee, total },
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

    // Clear cart
    state.cart = [];
    localStorage.removeItem("pixelpop_cart");
    updateCartUI();

    // Switch to landing
    changePage("store");

    // Queue simulated auto emails
    triggerAutoOrderEmails(newOrder);
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

    // 1. Order Received
    addSimulatedEmail(
      "billing@pixelpop.com",
      `Order Received - Invoice ${order.id}`,
      `Hi ${address.firstName},\n\nWe have registered your order ${order.id} and added it to our print bed pipeline queue!\n\nOrder Details:\n${itemsText}\n\nShipping To:\n${address.firstName} ${address.lastName}\n${address.address}, ${address.city}, ${address.zip}\n\nDelivery Method: ${order.deliveryMethod === 'express' ? 'Express Filament Courier (1-2 days)' : 'Standard Postal (4-6 days)'}\n\n${paymentDetailsText}\n\nGrand Total: $${order.totals.total.toFixed(2)}\n\nWe will update you as soon as our nozzles heat up and printing begins!\n\nBest,\nPixelPop Billing Team`
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
    renderDashboardOrders();
    initPaymentsDashboardSettings();
    initCalculator();
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

  function renderDashboardOrders() {
    const orders = DB.getOrders();

    if (orders.length === 0) {
      DOM.dashboardOrdersTbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 2rem;">No orders registered yet. Make a purchase on the storefront!</td></tr>`;
      return;
    }

    DOM.dashboardOrdersTbody.innerHTML = orders.map(o => {
      const itemsList = o.items.map(i => `${i.name} x${i.qty} (${i.color})`).join(", ");
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
          <td>${o.customer.firstName} ${o.customer.lastName}</td>
          <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${itemsList}">${itemsList}</td>
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

    // Table drop-down updates
    document.querySelectorAll(".order-action-select").forEach(sel => {
      sel.addEventListener("change", (e) => {
        const id = sel.dataset.id;
        const newStatus = e.target.value;

        DB.updateOrderStatus(id, newStatus);
        renderDashboardOrders();
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

  // ==========================================
  // PRODUCT CRUD INVENTORY FORMS
  // ==========================================

  DOM.inventoryAddItemBtn.addEventListener("click", () => {
    openProductCrudModal();
  });
  DOM.closeProductFormBtn.addEventListener("click", () => {
    DOM.productFormModalOverlay.classList.remove("open");
  });

  function openProductCrudModal(productId = null) {
    DOM.productFormModalOverlay.classList.add("open");
    DOM.productCrudForm.reset();
    currentColorsTags = [];
    renderColorsTags();

    if (productId) {
      // Edit mode
      const prod = DB.getProductById(productId);
      if (!prod) return;

      DOM.productModalTitle.textContent = "Modify Catalog Product";
      DOM.crudProductId.value = prod.id;
      DOM.crudName.value = prod.name;
      DOM.crudDescription.value = prod.description;
      DOM.crudPrice.value = prod.basePrice;
      DOM.crudCategory.value = prod.category;
      DOM.crudSubcategory.value = prod.subcategory;
      DOM.crudPrintTime.value = prod.specifications.printTime;
      DOM.crudWeight.value = prod.specifications.filamentUsed;
      DOM.crudDifficulty.value = prod.specifications.difficulty;

      currentColorsTags = prod.variations.colors.map(c => c.name);
      renderColorsTags();

      // Convert sizes & materials array back to formats
      const sizeStr = prod.variations.sizes.map(s => `${s.name}:${s.priceModifier.toFixed(2)}`).join(", ");
      DOM.crudSizes.value = sizeStr;

      const matStr = prod.variations.materials.map(m => `${m.name}:${m.priceModifier.toFixed(2)}`).join(", ");
      DOM.crudMaterials.value = matStr;
    } else {
      // Add Mode
      DOM.productModalTitle.textContent = "Create New Catalog Product";
      DOM.crudProductId.value = "";
      currentColorsTags = ["Silk Gold", "Matte Black", "Cosmic Blue"];
      renderColorsTags();
      DOM.crudSizes.value = "Small (10cm):-3.00, Standard:0.00, Large:+8.00";
      DOM.crudMaterials.value = "PLA (Standard):0.00, PETG (Durable):2.50";
    }
  }

  // Tags Handler for colors
  function renderColorsTags() {
    // Render chips
    const chipsHtml = currentColorsTags.map((col, idx) => `
      <span class="tag-chip">
        ${col}
        <span class="remove-tag-btn" data-index="${idx}">×</span>
      </span>
    `).join("");

    // Remove input element temporarily to append chips
    const input = DOM.colorsTagInput;
    DOM.colorsTagsBox.innerHTML = chipsHtml;
    DOM.colorsTagsBox.appendChild(input);

    // Re-attach listener
    input.focus();

    document.querySelectorAll(".remove-tag-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(btn.dataset.index);
        currentColorsTags.splice(idx, 1);
        renderColorsTags();
      });
    });
  }

  DOM.colorsTagInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = DOM.colorsTagInput.value.trim();
      if (val && !currentColorsTags.includes(val)) {
        currentColorsTags.push(val);
        DOM.colorsTagInput.value = "";
        renderColorsTags();
      }
    }
  });

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

    // Helper map of hexes
    const swatchHexMap = {
      "silk gold": "#ffd700",
      "gold": "#ffd700",
      "matte black": "#1a1a1a",
      "black": "#1a1a1a",
      "stealth black": "#0f0f0f",
      "cosmic blue": "#1e3a8a",
      "blue": "#1e3a8a",
      "crimson red": "#dc2626",
      "red": "#dc2626",
      "marble white": "#e8e8e8",
      "white": "#e8e8e8",
      "glow green": "#ccff33",
      "metallic purple": "#7c3aed",
      "purple": "#7c3aed",
      "silver chrome": "#e2e8f0",
      "orange": "#ea580c"
    };

    // Build color variants
    const colors = currentColorsTags.map(c => {
      const lower = c.toLowerCase();
      const hex = swatchHexMap[lower] || "#3b82f6"; // Default blue fallback
      return { name: c, hex, priceModifier: 0 };
    });

    // Build sizes from CSV
    const sizes = DOM.crudSizes.value.split(",").map(szStr => {
      const parts = szStr.split(":");
      const sName = parts[0].trim();
      const modifier = parts[1] ? parseFloat(parts[1]) : 0;
      return { name: sName, scale: "100%", priceModifier: modifier };
    });

    // Build materials from CSV
    const materials = DOM.crudMaterials.value.split(",").map(matStr => {
      const parts = matStr.split(":");
      const mName = parts[0].trim();
      const modifier = parts[1] ? parseFloat(parts[1]) : 0;
      return { name: mName, description: "Custom parsed density grade", priceModifier: modifier };
    });

    const isEdit = pid !== "";
    const productSlug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const finalProduct = {
      id: isEdit ? pid : productSlug,
      name,
      description: desc,
      basePrice: price,
      category,
      subcategory,
      rating: isEdit ? DB.getProductById(pid).rating : 5.0,
      reviewsCount: isEdit ? DB.getProductById(pid).reviewsCount : 1,
      images: {
        [currentColorsTags[0] || "Default"]: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=600&q=80"
      },
      defaultImage: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=600&q=80",
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
    DOM.searchBar.value = "";
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

  // Products Category Dropdown Trigger
  document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      const catId = e.target.dataset.cat;
      changePage("store");
      DOM.navProductsTrigger.classList.add("active");

      state.currentCategory = catId;
      state.currentSubcategory = "all";
      state.searchQuery = "";
      DOM.searchBar.value = "";

      renderCategoryTabs();
      renderProductsList();

      document.getElementById("shop-catalog-anchor").scrollIntoView({ behavior: 'smooth' });
    });
  });

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
    document.getElementById("shop-catalog-anchor").scrollIntoView({ behavior: 'smooth' });
  });

  // Search & sorting
  DOM.searchBar.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderProductsList();
  });
  DOM.sortSelect.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderProductsList();
  });

  // INITIALIZE ON RUN
  initApp();
  handleUrlRouting();
});
