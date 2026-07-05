// Product Database
const products = [
  // DOGS
  {
    id: 'dog-food-1',
    name: 'อาหารสุนัขเกรดซุปเปอร์พรีเมียม สูตรแกะและข้าวกล้อง (12kg)',
    price: 1890,
    image: 'assets/dog_food.png',
    rating: 4.9,
    reviews: 142,
    sku: 'DOG-FD-01',
    category: 'dog',
    subCategory: 'food',
    description: 'อาหารเม็ดสำหรับสุนัขโตเกรดซุปเปอร์พรีเมียม นำเข้าจากออสเตรเลีย สูตรเนื้อแกะและข้าวกล้อง อุดมไปด้วยโปรตีนคุณภาพสูง ช่วยบำรุงกล้ามเนื้อ มีพรีไบโอติกช่วยระบบย่อยอาหาร และโอเมก้า 3 & 6 บำรุงผิวหนังและเส้นขนให้เงางาม'
  },
  {
    id: 'dog-housing-1',
    name: 'ที่นอนเมมโมรี่โฟม Orthopedic ลายไม้สุดพรีเมียม (Size L)',
    price: 2650,
    image: 'assets/dog_bed.png',
    rating: 4.8,
    reviews: 78,
    sku: 'DOG-HS-01',
    category: 'dog',
    subCategory: 'housing',
    description: 'ที่นอนสำหรับสุนัขเพื่อสุขภาพ บรรเทาอาการปวดข้อและสะโพก ผลิตจาก Memory Foam แท้ความหนาแน่นสูง กระจายน้ำหนักได้ดี ป้องกันน้ำซึมผ่านด้วยซับในกันน้ำ ปลอกนอกเป็นผ้ากำมะหยี่สัมผัสนุ่มสบาย สามารถถอดซักเครื่องได้'
  },
  {
    id: 'dog-toys-1',
    name: 'ชุดของเล่นสุนัขขัดฟัน ยางพาราธรรมชาติและเชือกถัก (3 ชิ้น)',
    price: 450,
    image: 'assets/dog_toy.png',
    rating: 4.7,
    reviews: 215,
    sku: 'DOG-TY-01',
    category: 'dog',
    subCategory: 'toys',
    description: 'เซ็ตของเล่นสำหรับสุนัขสายเคี้ยว ผลิตจากยางพาราธรรมชาติ 100% ปลอดภัย ไร้สารพิษ ช่วยนวดเหงือกและขัดฟันขณะกัดแทะ ลดคราบหินปูน มาพร้อมลูกบอลยางใส่ขนมและเชือกถักฝ้ายแท้เหนียวทนทาน'
  },

  // CATS
  {
    id: 'cat-food-1',
    name: 'อาหารเปียกแมวสูตรเกรนฟรี เนื้อปลาทูน่าและแซลมอนในน้ำเกรวี่ (12 ซอง)',
    price: 480,
    image: 'https://images.unsplash.com/photo-1608454509097-e2522d545ef5?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviews: 320,
    sku: 'CAT-FD-01',
    category: 'cat',
    subCategory: 'food',
    description: 'อาหารเปียกเกรดโฮลิสติก สูตร Grain-Free ปราศจากส่วนผสมของธัญพืช ข้าวโพด และถั่วเหลือง ทำจากเนื้อทูน่าขาวและแซลมอนเกรดมนุษย์บริโภค อุดมไปด้วยทอรีนช่วยบำรุงสายตาและหัวใจ เพิ่มความชุ่มชื้นให้ร่างกายแมวลดความเสี่ยงโรคนิ่ว'
  },
  {
    id: 'cat-housing-1',
    name: 'คอนโดแมวไม้แท้สไตล์นอร์ดิก พร้อมเสาลับเล็บเชือกป่านและเปลญวน',
    price: 3490,
    image: 'assets/cat_tree.png',
    rating: 5.0,
    reviews: 45,
    sku: 'CAT-HS-01',
    category: 'cat',
    subCategory: 'housing',
    description: 'คอนโดแมวดีไซน์หรูหราสไตล์มินิมัลลิสต์ ผลิตจากไม้สนธรรมชาติแข็งแรงทนทาน มีเบาะรองนอนถอดซักได้ เปลญวนนุ่มสบาย เสาลับเล็บพันด้วยเชือกป่านธรรมชาติคุณภาพดี ช่วยให้แมวได้ขีดข่วนออกกำลังกายและผ่อนคลาย'
  },
  {
    id: 'cat-toys-1',
    name: 'ของเล่นแมวรางบอลไม้หมุน 3 ชั้น พร้อมตุ๊กตาแคทนิปติดสปริง',
    price: 320,
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    reviews: 189,
    sku: 'CAT-TY-01',
    category: 'cat',
    subCategory: 'toys',
    description: 'ของเล่นไม้ฝึกทักษะและสัญชาตญาณนักล่า รางบอล 3 ชั้นพร้อมลูกบอลไม้หมุนได้อย่างราบรื่น ด้านบนมีหนูผ้าแคทนิปติดสปริงส่ายไปมา ดึงดูดความสนใจของแมวได้ยาวนาน ปลอดภัย ไร้เสี้ยนไม้'
  },

  // ORNAMENTAL FISH
  {
    id: 'fish-food-1',
    name: 'อาหารปลาคาร์พและปลาทองเม็ดลอย สูตรเร่งสี-เร่งโตอย่างรวดเร็ว (1kg)',
    price: 350,
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviews: 95,
    sku: 'FSH-FD-01',
    category: 'fish',
    subCategory: 'food',
    description: 'อาหารปลาสูตรพิเศษ มีส่วนผสมของสาหร่ายสไปรูลิน่าคุณภาพสูง ช่วยเร่งสีสันของปลาคาร์พและปลาทองให้เข้มสวยงามตามธรรมชาติ มีโปรตีน 42% เร่งการเจริญเติบโต โครงสร้างสวย ไม่ทำให้น้ำขุ่นเสีย'
  },
  {
    id: 'fish-housing-1',
    name: 'ตู้ปลาอัจฉริยะ Aquascaping LED ระบบกรองซ่อนภายในห้องเงียบ',
    price: 5200,
    image: 'assets/aquarium.png',
    rating: 4.9,
    reviews: 32,
    sku: 'FSH-HS-01',
    category: 'fish',
    subCategory: 'housing',
    description: 'ตู้กระจกใสนิรภัยขอบโค้งมนไร้รอยต่อ หนาพิเศษ 6 มม. มาพร้อมไฟ LED ปรับสีและระดับความสว่างผ่านรีโมทได้ ระบบกรองชีวภาพ 3 ขั้นตอนซ่อนอยู่ด้านหลังตู้ ทำงานเงียบสนิท เหมาะสำหรับตั้งโต๊ะทำงานหรือห้องนั่งเล่น'
  },
  {
    id: 'fish-toys-1',
    name: 'ปราสาทหินโบราณสำหรับตกแต่งตู้ปลา ซ่อนตัวและว่ายวนลอดช่อง',
    price: 290,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600',
    rating: 4.5,
    reviews: 64,
    sku: 'FSH-TY-01',
    category: 'fish',
    subCategory: 'toys',
    description: 'แบบจำลองปราสาทหินโบราณ ผลิตจากเรซิ่นสังเคราะห์คุณภาพสูง ปลอดภัยต่อปลาทุกชนิดและไม่เปลี่ยนค่า PH ของน้ำ ดีไซน์สมจริง มีช่องสำหรับให้ปลาขนาดเล็กว่ายน้ำลอดผ่านและหลบซ่อนตัวสร้างความเพลิดเพลิน'
  }
];

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
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  initEventListeners();
  updateCartUI();
  lucide.createIcons();
});

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
  
  // Slide out and remove toast
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
    
    // Convert Category to Thai Label
    let catLabel = 'สุนัข';
    if (product.category === 'cat') catLabel = 'แมว';
    if (product.category === 'fish') catLabel = 'ปลาสวยงาม';
    
    // Convert Subcategory to Thai Label
    let subCatLabel = 'อาหาร';
    if (product.subCategory === 'housing') subCatLabel = 'ที่อยู่อาศัย';
    if (product.subCategory === 'toys') subCatLabel = 'ของเล่น';

    // Generate Stars
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
          <button class="btn-card-cart" data-id="${product.id}" aria-label="ใส่ตะกร้า">
            <i data-lucide="shopping-cart"></i>
          </button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
  
  // Re-run Lucide to render newly added card icons
  lucide.createIcons();
  
  // Attach Event Listeners to Buttons
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
  
  // Close navigation menu on mobile after selection
  navMenu.classList.remove('active');
  menuToggle.innerHTML = '<i data-lucide="menu"></i>';
  lucide.createIcons();
  
  // Scroll smoothly to products section
  const section = document.getElementById('categories-section');
  const yOffset = -100; 
  const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({top: y, behavior: 'smooth'});
}

// Add to Cart
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.product.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  
  updateCartUI();
  showToast(`เพิ่ม "${product.name.substring(0, 25)}..." ลงตะกร้าแล้ว`);
}

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.product.id !== productId);
  updateCartUI();
  showToast('ลบสินค้าออกจากตะกร้าแล้ว', 'info');
}

// Change Quantity in Cart
function updateQuantity(productId, amount) {
  const item = cart.find(item => item.product.id === productId);
  if (!item) return;

  item.quantity += amount;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    updateCartUI();
  }
}

// Update Cart Badge, Totals, and List
function updateCartUI() {
  const cartContent = document.getElementById('cart-content');
  const cartTotalItems = document.getElementById('cart-total-items');
  const cartGrandTotal = document.getElementById('cart-grand-total');
  
  // Badge calculation
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

  // Generate cart items HTML
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

  // Attach event listeners for buttons in cart
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
  
  // Category Label
  let subCatLabel = 'อาหาร';
  if (product.subCategory === 'housing') subCatLabel = 'ที่อยู่อาศัย';
  if (product.subCategory === 'toys') subCatLabel = 'ของเล่น';
  document.getElementById('modal-category').textContent = subCatLabel;
  
  document.getElementById('modal-title').textContent = product.name;
  document.getElementById('modal-price').textContent = `฿${product.price.toLocaleString()}`;
  document.getElementById('modal-desc').textContent = product.description;
  document.getElementById('modal-sku').textContent = product.sku;
  document.getElementById('modal-qty-val').textContent = '1';
  
  // Rating stars inside modal
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
  
  // Show Modal and Overlay
  productModal.classList.add('active');
  overlay.classList.add('active');
}

// Close Modal
function closeProductModal() {
  productModal.classList.remove('active');
  if (!cartDrawer.classList.contains('active') && !memberDrawer.classList.contains('active')) {
    overlay.classList.remove('active');
  }
}

// Toggle Drawers
function toggleCartDrawer(open) {
  if (open) {
    cartDrawer.classList.add('active');
    overlay.classList.add('active');
    memberDrawer.classList.remove('active'); // Close other drawer
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
    cartDrawer.classList.remove('active'); // Close other drawer
  } else {
    memberDrawer.classList.remove('active');
    if (!productModal.classList.contains('active') && !cartDrawer.classList.contains('active')) {
      overlay.classList.remove('active');
    }
  }
}

// Event Listeners
function initEventListeners() {
  // Header scroll shadow effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isActive = navMenu.classList.contains('active');
    menuToggle.innerHTML = isActive ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    lucide.createIcons();
  });

  // Mobile Dropdowns Toggle on Link Click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      // Only do accordion dropdown on mobile screens
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = link.parentElement;
        
        // Toggle active state
        parent.classList.toggle('active');
        
        // Close others
        document.querySelectorAll('.nav-item').forEach(item => {
          if (item !== parent) item.classList.remove('active');
        });
      }
    });
  });

  // Category Quick Filter Tags
  document.querySelectorAll('.filter-tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      
      const filter = tag.getAttribute('data-filter-tag');
      filterProducts(filter);
    });
  });

  // Header Nav Dropdown Links Click
  document.querySelectorAll('.dropdown-item a').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const filterVal = item.getAttribute('data-filter'); // dog-food, dog-housing, etc.
      const parts = filterVal.split('-');
      filterProducts(parts[0], parts[1]);
      
      // Update quick filter buttons active state
      document.querySelectorAll('.filter-tag').forEach(t => {
        if (t.getAttribute('data-filter-tag') === parts[0]) {
          t.classList.add('active');
        } else {
          t.classList.remove('active');
        }
      });
    });
  });

  // Open/Close Drawers
  cartBtn.addEventListener('click', () => toggleCartDrawer(true));
  cartCloseBtn.addEventListener('click', () => toggleCartDrawer(false));
  memberBtn.addEventListener('click', () => toggleMemberDrawer(true));
  memberCloseBtn.addEventListener('click', () => toggleMemberDrawer(false));
  
  // Close everything via Overlay
  overlay.addEventListener('click', () => {
    closeProductModal();
    toggleCartDrawer(false);
    toggleMemberDrawer(false);
  });

  modalCloseBtn.addEventListener('click', closeProductModal);

  // Hero section Shop Now button
  document.getElementById('hero-shop-btn').addEventListener('click', () => {
    filterProducts('all');
  });

  document.getElementById('hero-more-btn').addEventListener('click', () => {
    showToast('Suphachai Pet Shop ยินดีต้อนรับครับ! ร้านเราเปิด 09:00 - 20:00 น. ทุกวัน', 'info');
  });

  // Brand Logo Click to reset filters
  document.getElementById('brand-logo').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
    document.querySelector('[data-filter-tag="all"]').classList.add('active');
    filterProducts('all');
    window.scrollTo({top: 0, behavior: 'smooth'});
  });

  // Modal Qty Selectors
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

  // Modal Add to Cart
  document.getElementById('modal-add-to-cart-btn').addEventListener('click', () => {
    if (currentSelectedProduct) {
      const qty = parseInt(modalQtyVal.textContent);
      addToCart(currentSelectedProduct.id, qty);
      closeProductModal();
    }
  });

  // Mock Login / Register flow
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

  document.getElementById('login-submit-btn').addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    if (!email) {
      showToast('กรุณากรอกอีเมลของคุณ', 'error');
      return;
    }
    
    // Perform mock login
    currentUser = {
      name: email.split('@')[0],
      email: email
    };

    document.getElementById('user-display-name').textContent = `คุณ ${currentUser.name}`;
    document.getElementById('user-display-email').textContent = currentUser.email;

    loginWrapper.style.display = 'none';
    profileWrapper.style.display = 'block';
    memberTitle.innerHTML = '<i data-lucide="shield-check"></i> บัญชีของคุณ';
    lucide.createIcons();
    
    showToast(`ยินดีต้อนรับกลับมาครับ คุณ ${currentUser.name}!`);
  });

  document.getElementById('register-submit-btn').addEventListener('click', () => {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    
    if (!name || !email) {
      showToast('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
      return;
    }

    currentUser = { name, email };
    document.getElementById('user-display-name').textContent = `คุณ ${currentUser.name}`;
    document.getElementById('user-display-email').textContent = currentUser.email;

    registerWrapper.style.display = 'none';
    profileWrapper.style.display = 'block';
    memberTitle.innerHTML = '<i data-lucide="shield-check"></i> บัญชีของคุณ';
    lucide.createIcons();

    showToast('สมัครสมาชิกและเข้าสู่ระบบเสร็จสิ้น!');
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    currentUser = null;
    profileWrapper.style.display = 'none';
    loginWrapper.style.display = 'block';
    memberTitle.innerHTML = '<i data-lucide="user-check"></i> เข้าสู่ระบบ';
    
    // Clear inputs
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
    
    lucide.createIcons();
    showToast('ออกจากระบบเรียบร้อยแล้ว', 'info');
  });

  // Newsletter Submit Mock
  document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input');
    showToast(`ขอบคุณที่สนใจ! เราได้บันทึกอีเมล ${input.value} เรียบร้อยแล้ว`);
    input.value = '';
  });

  // Checkout Button
  document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) return;
    
    if (!currentUser) {
      showToast('กรุณาเข้าสู่ระบบก่อนดำเนินการสั่งซื้อสินค้าครับ', 'error');
      toggleMemberDrawer(true);
      return;
    }

    showToast('สั่งซื้อสำเร็จ! ขอบคุณที่อุดหนุน Suphachai Pet Shop ครับ');
    cart = [];
    updateCartUI();
    toggleCartDrawer(false);
  });
  
  // Footer Links Filter Logic
  document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      const filterVal = link.getAttribute('data-filter');
      if (filterVal) {
        e.preventDefault();
        
        // Update tags selection in UI
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
