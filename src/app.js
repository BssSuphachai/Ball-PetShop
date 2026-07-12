import {
  fetchProducts,
  subscribeNewsletter
} from './firestore-api.js';
import {
  addCartItem,
  changeCartItemQuantity,
  loadCart,
  removeCartItem,
  saveCart
} from './services/cart-service.js';
import { checkoutAndPay } from './services/checkout-service.js';
import {
  registerWithEmail,
  loginWithEmail,
  logout,
  subscribeToAuthChanges
} from './services/auth-service.js';

// Product data loaded from Firestore
let products = [];

// App State
let cart = [];
let currentUser = null;
let currentSelectedProduct = null;
let activeFilter = 'all';

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const header = document.getElementById('main-header');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const overlay = document.getElementById('overlay');
const cartDrawer = document.getElementById('cart-drawer');
const memberDrawer = document.getElementById('member-drawer');
const productModal = document.getElementById('product-modal');
const cartBtn = document.getElementById('cart-btn');
const memberBtn = document.getElementById('member-btn');
const cartCloseBtn = document.getElementById('cart-close-btn');
const memberCloseBtn = document.getElementById('member-close-btn');
const modalCloseBtn = document.getElementById('modal-close-btn');
const cartBadge = document.getElementById('cart-badge');
const toastContainer = document.getElementById('toast-container');

// Initialize Website
document.addEventListener('DOMContentLoaded', async () => {
  showProductsLoading();
  initEventListeners();
  initAuthListener();
  lucide.createIcons();

  try {
    products = await fetchProducts();
    cart = loadCart(products);
    renderProducts(products);
    updateCartUI();
  } catch (error) {
    console.error('Failed to load products from Firestore:', error);
    productsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-medium);">
        <i data-lucide="cloud-off" style="width: 60px; height: 60px; stroke-width: 1.5; margin-bottom: 1rem;"></i>
        <p style="font-size: 1.2rem; font-weight: 600;">ไม่สามารถโหลดสินค้าจากฐานข้อมูลได้</p>
        <p style="font-size: 0.95rem; color: var(--text-light); margin-top: 0.25rem;">กรุณาตรวจสอบการเชื่อมต่อ Firebase Firestore</p>
      </div>
    `;
    lucide.createIcons();
    showToast('ไม่สามารถเชื่อมต่อฐานข้อมูลได้ กรุณาลองใหม่อีกครั้ง', 'error');
  }
});

function showProductsLoading() {
  productsGrid.innerHTML = `
    <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-medium);">
      <i data-lucide="loader-circle" style="width: 60px; height: 60px; stroke-width: 1.5; margin-bottom: 1rem; animation: spin 1s linear infinite;"></i>
      <p style="font-size: 1.2rem; font-weight: 600;">กำลังโหลดสินค้าจากฐานข้อมูล...</p>
    </div>
  `;
  lucide.createIcons();
}

// Toast Notifications Helper
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let iconName = 'check-circle';
  if (type === 'error') iconName = 'alert-circle';
  if (type === 'info') iconName = 'info';
  
  toast.innerHTML = `
    <i data-lucide="${iconName}"></i>
    <span>${message}</span>
  `;
  
  toastContainer.appendChild(toast);
  lucide.createIcons({ attrs: { class: 'toast-icon' } });
  
  setTimeout(() => {
    toast.style.animation = 'slide-in-toast 0.35s reverse forwards';
    setTimeout(() => {
      toast.remove();
    }, 350);
  }, 3000);
}

// Render Product Cards
function renderProducts(productsList) {
  productsGrid.innerHTML = '';
  
  if (productsList.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-medium);">
        <i data-lucide="package-search" style="width: 60px; height: 60px; stroke-width: 1.5; margin-bottom: 1rem;"></i>
        <p style="font-size: 1.2rem; font-weight: 600;">ไม่พบสินค้าที่ตรงตามเงื่อนไข</p>
        <p style="font-size: 0.95rem; color: var(--text-light); margin-top: 0.25rem;">ลองเปลี่ยนการค้นหาหรือเลือกประเภทอื่น</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  productsList.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    let catLabel = 'สุนัข';
    if (product.category === 'cat') catLabel = 'แมว';
    if (product.category === 'fish') catLabel = 'ปลาสวยงาม';
    
    let subCatLabel = 'อาหาร';
    if (product.subCategory === 'housing') subCatLabel = 'ที่อยู่อาศัย';
    if (product.subCategory === 'toys') subCatLabel = 'ของเล่น';

    let starsHtml = '';
    const fullStars = Math.floor(product.rating);
    const hasHalf = product.rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starsHtml += '<i data-lucide="star" style="fill: #fbbf24; color: #fbbf24; width: 16px; height: 16px;"></i>';
      } else if (i === fullStars && hasHalf) {
        starsHtml += '<i data-lucide="star-half" style="fill: #fbbf24; color: #fbbf24; width: 16px; height: 16px;"></i>';
      } else {
        starsHtml += '<i data-lucide="star" style="color: var(--text-light); width: 16px; height: 16px;"></i>';
      }
    }

    card.innerHTML = `
      <span class="product-badge">${catLabel}</span>
      <div class="product-img-holder">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-category">${subCatLabel}</span>
        <h3 class="product-name" title="${product.name}">${product.name}</h3>
        <div class="product-rating">
          ${starsHtml}
          <span>(${product.reviews})</span>
        </div>
        <div class="product-footer">
          <div class="product-price">฿${product.price.toLocaleString()}</div>
        </div>
        <div class="product-actions">
          <button class="btn-card-detail" data-id="${product.id}">ดูรายละเอียด</button>
          <button class="btn-card-cart" data-id="${product.id}" aria-label="ใส่ตะกร้า" ${product.stock > 0 ? '' : 'disabled'}>
            <i data-lucide="shopping-cart"></i>
          </button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
  
  lucide.createIcons();
  
  document.querySelectorAll('.btn-card-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pId = e.currentTarget.getAttribute('data-id');
      openProductModal(pId);
    });
  });

  document.querySelectorAll('.btn-card-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pId = e.currentTarget.getAttribute('data-id');
      addToCart(pId);
    });
  });
}

// Filter Actions
function filterProducts(category, subCategory = null) {
  let filtered = products;
  
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  
  if (subCategory) {
    filtered = filtered.filter(p => p.subCategory === subCategory);
  }
  
  renderProducts(filtered);
  
  navMenu.classList.remove('active');
  menuToggle.innerHTML = '<i data-lucide="menu"></i>';
  lucide.createIcons();
  
  const section = document.getElementById('categories-section');
  const yOffset = -100; 
  const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({top: y, behavior: 'smooth'});
}

// Add to Cart
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const result = addCartItem(cart, product, quantity);
  if (result.error) {
    showToast(result.error === 'out_of_stock'
      ? 'สินค้าหมดชั่วคราว'
      : 'จำนวนสินค้าในตะกร้าเกินสต็อกที่มี', 'error');
    return;
  }

  cart = result.cart;
  updateCartUI();
  showToast(`เพิ่ม "${product.name.substring(0, 25)}..." ลงตะกร้าแล้ว`);
}

// Remove from Cart
function removeFromCart(productId) {
  cart = removeCartItem(cart, productId).cart;
  updateCartUI();
  showToast('ลบสินค้าออกจากตะกร้าแล้ว', 'info');
}

// Change Quantity in Cart
function updateQuantity(productId, amount) {
  const item = cart.find(item => item.product.id === productId);
  if (!item) return;

  const result = changeCartItemQuantity(cart, productId, amount);
  if (result.error) {
    showToast('จำนวนสินค้าในตะกร้าเกินสต็อกที่มี', 'error');
    return;
  }

  cart = result.cart;
  updateCartUI();
}

// Update Cart Badge, Totals, and List
function updateCartUI() {
  const cartContent = document.getElementById('cart-content');
  const cartTotalItems = document.getElementById('cart-total-items');
  const cartGrandTotal = document.getElementById('cart-grand-total');
  
  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  cartBadge.textContent = totalItemsCount;
  cartBadge.style.display = totalItemsCount > 0 ? 'flex' : 'none';
  
  if (cart.length === 0) {
    cartContent.innerHTML = `
      <div class="cart-empty">
        <i data-lucide="shopping-bag"></i>
        <h3>ตะกร้าสินค้ายังว่างเปล่า</h3>
        <p>คุณยังไม่ได้เพิ่มสินค้าใดๆ ลองเลือกช้อปสินค้าคุณภาพดีของเราสิครับ</p>
      </div>
    `;
    cartTotalItems.textContent = '0 ชิ้น';
    cartGrandTotal.textContent = '0 บาท';
    lucide.createIcons();
    return;
  }

  let cartHtml = '<div class="cart-items-list">';
  let grandTotal = 0;

  cart.forEach(item => {
    const itemTotal = item.product.price * item.quantity;
    grandTotal += itemTotal;

    cartHtml += `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${item.product.image}" alt="${item.product.name}">
        </div>
        <div class="cart-item-info">
          <h4 class="cart-item-name">${item.product.name}</h4>
          <div class="cart-item-price">฿${item.product.price.toLocaleString()}</div>
          <div class="cart-item-qty">
            <button class="qty-btn minus" data-id="${item.product.id}">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn plus" data-id="${item.product.id}">+</button>
          </div>
        </div>
        <button class="cart-item-delete" data-id="${item.product.id}" aria-label="ลบสินค้า">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `;
  });

  cartHtml += '</div>';
  cartContent.innerHTML = cartHtml;
  
  cartTotalItems.textContent = `${totalItemsCount} ชิ้น`;
  cartGrandTotal.textContent = `฿${grandTotal.toLocaleString()} บาท`;
  
  lucide.createIcons();

  document.querySelectorAll('.qty-btn.minus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pId = e.currentTarget.getAttribute('data-id');
      updateQuantity(pId, -1);
    });
  });

  document.querySelectorAll('.qty-btn.plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pId = e.currentTarget.getAttribute('data-id');
      updateQuantity(pId, 1);
    });
  });

  document.querySelectorAll('.cart-item-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pId = e.currentTarget.getAttribute('data-id');
      removeFromCart(pId);
    });
  });
}

// Product Details Modal
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentSelectedProduct = product;
  
  document.getElementById('modal-img').src = product.image;
  document.getElementById('modal-img').alt = product.name;
  
  let subCatLabel = 'อาหาร';
  if (product.subCategory === 'housing') subCatLabel = 'ที่อยู่อาศัย';
  if (product.subCategory === 'toys') subCatLabel = 'ของเล่น';
  document.getElementById('modal-category').textContent = subCatLabel;
  
  document.getElementById('modal-title').textContent = product.name;
  document.getElementById('modal-price').textContent = `฿${product.price.toLocaleString()}`;
  document.getElementById('modal-desc').textContent = product.description;
  document.getElementById('modal-sku').textContent = product.sku;
  document.getElementById('modal-qty-val').textContent = '1';
  
  const modalRatingContainer = document.getElementById('modal-rating');
  modalRatingContainer.innerHTML = '';
  
  const fullStars = Math.floor(product.rating);
  const hasHalf = product.rating % 1 !== 0;
  
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      modalRatingContainer.innerHTML += '<i data-lucide="star" style="fill: #fbbf24; color: #fbbf24; width: 16px; height: 16px;"></i>';
    } else if (i === fullStars && hasHalf) {
      modalRatingContainer.innerHTML += '<i data-lucide="star-half" style="fill: #fbbf24; color: #fbbf24; width: 16px; height: 16px;"></i>';
    } else {
      modalRatingContainer.innerHTML += '<i data-lucide="star" style="color: var(--text-light); width: 16px; height: 16px;"></i>';
    }
  }
  modalRatingContainer.innerHTML += `<span>(${product.reviews} รีวิว)</span>`;
  
  lucide.createIcons();
  
  productModal.classList.add('active');
  overlay.classList.add('active');
}

function closeProductModal() {
  productModal.classList.remove('active');
  if (!cartDrawer.classList.contains('active') && !memberDrawer.classList.contains('active')) {
    overlay.classList.remove('active');
  }
}

function toggleCartDrawer(open) {
  if (open) {
    cartDrawer.classList.add('active');
    overlay.classList.add('active');
    memberDrawer.classList.remove('active');
  } else {
    cartDrawer.classList.remove('active');
    if (!productModal.classList.contains('active') && !memberDrawer.classList.contains('active')) {
      overlay.classList.remove('active');
    }
  }
}

function toggleMemberDrawer(open) {
  if (open) {
    memberDrawer.classList.add('active');
    overlay.classList.add('active');
    cartDrawer.classList.remove('active');
  } else {
    memberDrawer.classList.remove('active');
    if (!productModal.classList.contains('active') && !cartDrawer.classList.contains('active')) {
      overlay.classList.remove('active');
    }
  }
}

function showMemberProfile(user) {
  const loginWrapper = document.getElementById('login-form-wrapper');
  const registerWrapper = document.getElementById('register-form-wrapper');
  const profileWrapper = document.getElementById('member-profile-wrapper');
  const memberTitle = document.getElementById('member-title');

  document.getElementById('user-display-name').textContent = `คุณ ${user.displayName}`;
  document.getElementById('user-display-email').textContent = user.email;

  loginWrapper.style.display = 'none';
  registerWrapper.style.display = 'none';
  profileWrapper.style.display = 'block';
  memberTitle.innerHTML = '<i data-lucide="shield-check"></i> บัญชีของคุณ';
  lucide.createIcons();
}

function showLoginForm() {
  const loginWrapper = document.getElementById('login-form-wrapper');
  const registerWrapper = document.getElementById('register-form-wrapper');
  const profileWrapper = document.getElementById('member-profile-wrapper');
  const memberTitle = document.getElementById('member-title');

  profileWrapper.style.display = 'none';
  registerWrapper.style.display = 'none';
  loginWrapper.style.display = 'block';
  memberTitle.innerHTML = '<i data-lucide="user-check"></i> เข้าสู่ระบบ';
  lucide.createIcons();
}

function initAuthListener() {
  subscribeToAuthChanges((user) => {
    currentUser = user;

    if (user) {
      showMemberProfile(user);
    } else {
      showLoginForm();
    }
  });
}

function setAuthButtonLoading(button, isLoading, defaultText) {
  button.disabled = isLoading;
  button.textContent = isLoading ? 'กำลังดำเนินการ...' : defaultText;
}

// Event Listeners
function initEventListeners() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isActive = navMenu.classList.contains('active');
    menuToggle.innerHTML = isActive ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    lucide.createIcons();
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = link.parentElement;
        parent.classList.toggle('active');
        document.querySelectorAll('.nav-item').forEach(item => {
          if (item !== parent) item.classList.remove('active');
        });
      }
    });
  });

  document.querySelectorAll('.filter-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      const filter = tag.getAttribute('data-filter-tag');
      filterProducts(filter);
    });
  });

  document.querySelectorAll('.dropdown-item a').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const filterVal = item.getAttribute('data-filter');
      const parts = filterVal.split('-');
      filterProducts(parts[0], parts[1]);
      
      document.querySelectorAll('.filter-tag').forEach(t => {
        if (t.getAttribute('data-filter-tag') === parts[0]) {
          t.classList.add('active');
        } else {
          t.classList.remove('active');
        }
      });
    });
  });

  cartBtn.addEventListener('click', () => toggleCartDrawer(true));
  cartCloseBtn.addEventListener('click', () => toggleCartDrawer(false));
  memberBtn.addEventListener('click', () => toggleMemberDrawer(true));
  memberCloseBtn.addEventListener('click', () => toggleMemberDrawer(false));
  
  overlay.addEventListener('click', () => {
    closeProductModal();
    toggleCartDrawer(false);
    toggleMemberDrawer(false);
  });

  modalCloseBtn.addEventListener('click', closeProductModal);

  document.getElementById('hero-shop-btn').addEventListener('click', () => {
    filterProducts('all');
  });

  document.getElementById('hero-more-btn').addEventListener('click', () => {
    showToast('Suphachai Pet Shop ยินดีต้อนรับครับ! ร้านเราเปิด 09:00 - 20:00 น. ทุกวัน', 'info');
  });

  document.getElementById('brand-logo').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
    document.querySelector('[data-filter-tag="all"]').classList.add('active');
    filterProducts('all');
    window.scrollTo({top: 0, behavior: 'smooth'});
  });

  const modalQtyVal = document.getElementById('modal-qty-val');
  document.getElementById('modal-qty-minus').addEventListener('click', () => {
    let val = parseInt(modalQtyVal.textContent);
    if (val > 1) {
      modalQtyVal.textContent = val - 1;
    }
  });

  document.getElementById('modal-qty-plus').addEventListener('click', () => {
    let val = parseInt(modalQtyVal.textContent);
    modalQtyVal.textContent = val + 1;
  });

  document.getElementById('modal-add-to-cart-btn').addEventListener('click', () => {
    if (currentSelectedProduct) {
      const qty = parseInt(modalQtyVal.textContent);
      addToCart(currentSelectedProduct.id, qty);
      closeProductModal();
    }
  });

  const loginWrapper = document.getElementById('login-form-wrapper');
  const registerWrapper = document.getElementById('register-form-wrapper');
  const profileWrapper = document.getElementById('member-profile-wrapper');
  const memberTitle = document.getElementById('member-title');

  document.getElementById('switch-to-register').addEventListener('click', () => {
    loginWrapper.style.display = 'none';
    registerWrapper.style.display = 'block';
    memberTitle.innerHTML = '<i data-lucide="user-plus"></i> สมัครสมาชิก';
    lucide.createIcons();
  });

  document.getElementById('switch-to-login').addEventListener('click', () => {
    registerWrapper.style.display = 'none';
    loginWrapper.style.display = 'block';
    memberTitle.innerHTML = '<i data-lucide="user-check"></i> เข้าสู่ระบบ';
    lucide.createIcons();
  });

  document.getElementById('login-submit-btn').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const loginBtn = document.getElementById('login-submit-btn');

    if (!email || !password) {
      showToast('กรุณากรอกอีเมลและรหัสผ่าน', 'error');
      return;
    }

    setAuthButtonLoading(loginBtn, true, 'เข้าสู่ระบบ');

    try {
      const user = await loginWithEmail({ email, password });
      currentUser = user;
      showMemberProfile(user);
      showToast(`ยินดีต้อนรับกลับมาครับ คุณ ${user.displayName}!`);
      document.getElementById('login-password').value = '';
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setAuthButtonLoading(loginBtn, false, 'เข้าสู่ระบบ');
    }
  });

  document.getElementById('register-submit-btn').addEventListener('click', async () => {
    const displayName = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const registerBtn = document.getElementById('register-submit-btn');
    
    if (!displayName || !email || !password) {
      showToast('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร', 'error');
      return;
    }

    setAuthButtonLoading(registerBtn, true, 'สมัครสมาชิก');

    try {
      const user = await registerWithEmail({ displayName, email, password });
      currentUser = user;
      showMemberProfile(user);
      showToast('สมัครสมาชิกและเข้าสู่ระบบเสร็จสิ้น!');
      document.getElementById('register-password').value = '';
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setAuthButtonLoading(registerBtn, false, 'สมัครสมาชิก');
    }
  });

  document.getElementById('logout-btn').addEventListener('click', async () => {
    try {
      await logout();
      currentUser = null;
      showLoginForm();
      document.getElementById('login-email').value = '';
      document.getElementById('login-password').value = '';
      showToast('ออกจากระบบเรียบร้อยแล้ว', 'info');
    } catch (error) {
      showToast(error.message, 'error');
    }
  });

  document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input');
    const email = input.value.trim();

    try {
      const result = await subscribeNewsletter(email);
      if (result.alreadySubscribed) {
        showToast('อีเมลนี้สมัครรับข่าวสารไว้แล้ว', 'info');
      } else {
        showToast(`ขอบคุณที่สนใจ! เราได้บันทึกอีเมล ${email} เรียบร้อยแล้ว`);
      }
      input.value = '';
    } catch (error) {
      showToast('ไม่สามารถบันทึกอีเมลได้ กรุณาลองใหม่อีกครั้ง', 'error');
    }
  });

  document.getElementById('checkout-btn').addEventListener('click', async () => {
    if (cart.length === 0) return;

    if (!currentUser) {
      showToast('กรุณาเข้าสู่ระบบก่อนดำเนินการสั่งซื้อ', 'error');
      toggleMemberDrawer(true);
      return;
    }

    const checkoutButton = document.getElementById('checkout-btn');
    checkoutButton.disabled = true;
    checkoutButton.textContent = 'กำลังชำระเงิน...';

    try {
      const { orderId, pricing } = await checkoutAndPay({
        user: currentUser,
        cartItems: cart
      });

      cart = [];
      saveCart(cart);
      updateCartUI();
      toggleCartDrawer(false);
      showToast(`ชำระเงินสำเร็จ เลขที่คำสั่งซื้อ: ${orderId} (${pricing.total.toLocaleString()} บาท)`);
    } catch (error) {
      console.error('Checkout failed:', error);
      showToast(error.message || 'ไม่สามารถดำเนินการชำระเงินได้ กรุณาลองใหม่อีกครั้ง', 'error');
    } finally {
      checkoutButton.disabled = false;
      checkoutButton.textContent = 'ดำเนินการสั่งซื้อ';
    }
  });
  
  document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      const filterVal = link.getAttribute('data-filter');
      if (filterVal) {
        e.preventDefault();
        
        document.querySelectorAll('.filter-tag').forEach(t => {
          if (t.getAttribute('data-filter-tag') === filterVal) {
            t.classList.add('active');
          } else {
            t.classList.remove('active');
          }
        });
        
        filterProducts(filterVal);
      }
    });
  });
}
