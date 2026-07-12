const CART_STORAGE_KEY = 'ball-petshop-cart-v1';

function getAvailableStock(product) {
  return Number.isInteger(product.stock) && product.stock > 0 ? product.stock : 0;
}

function readStoredItems() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function loadCart(products) {
  const cart = readStoredItems()
    .map(({ productId, quantity }) => {
      const product = products.find((item) => item.id === productId);
      const validQuantity = Number.isInteger(quantity) ? quantity : 0;

      if (!product || !product.isActive || validQuantity < 1) {
        return null;
      }

      const availableStock = getAvailableStock(product);
      if (availableStock === 0) {
        return null;
      }

      return { product, quantity: Math.min(validQuantity, availableStock) };
    })
    .filter(Boolean);

  saveCart(cart);
  return cart;
}

export function saveCart(cart) {
  const serializableItems = cart.map(({ product, quantity }) => ({
    productId: product.id,
    quantity
  }));

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serializableItems));
}

export function addCartItem(cart, product, quantity = 1) {
  const availableStock = getAvailableStock(product);
  const safeQuantity = Number.isInteger(quantity) && quantity > 0 ? quantity : 1;

  if (!product.isActive || availableStock === 0) {
    return { cart, error: 'out_of_stock' };
  }

  const existingItem = cart.find((item) => item.product.id === product.id);
  const currentQuantity = existingItem?.quantity || 0;

  if (currentQuantity + safeQuantity > availableStock) {
    return { cart, error: 'insufficient_stock' };
  }

  const updatedCart = existingItem
    ? cart.map((item) => item.product.id === product.id
      ? { ...item, quantity: item.quantity + safeQuantity }
      : item)
    : [...cart, { product, quantity: safeQuantity }];

  saveCart(updatedCart);
  return { cart: updatedCart };
}

export function changeCartItemQuantity(cart, productId, amount) {
  const item = cart.find((cartItem) => cartItem.product.id === productId);
  if (!item || !Number.isInteger(amount)) {
    return { cart };
  }

  const nextQuantity = item.quantity + amount;
  if (nextQuantity <= 0) {
    return removeCartItem(cart, productId);
  }

  if (nextQuantity > getAvailableStock(item.product)) {
    return { cart, error: 'insufficient_stock' };
  }

  const updatedCart = cart.map((cartItem) => cartItem.product.id === productId
    ? { ...cartItem, quantity: nextQuantity }
    : cartItem);

  saveCart(updatedCart);
  return { cart: updatedCart };
}

export function removeCartItem(cart, productId) {
  const updatedCart = cart.filter((item) => item.product.id !== productId);
  saveCart(updatedCart);
  return { cart: updatedCart };
}
