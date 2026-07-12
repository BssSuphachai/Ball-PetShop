import {
  collection,
  doc,
  runTransaction,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase.js';

const PRODUCTS_COLLECTION = 'products';
const ORDERS_COLLECTION = 'orders';

export class CheckoutError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

export function calculatePricing(items) {
  const subtotal = items.reduce((total, item) => total + item.subtotal, 0);
  const shippingFee = 0;
  const discount = 0;

  return {
    subtotal,
    shippingFee,
    discount,
    total: subtotal + shippingFee - discount,
    currency: 'THB'
  };
}

export async function checkoutAndPay({ user, cartItems }) {
  if (!user?.uid) {
    throw new CheckoutError('unauthenticated', 'กรุณาเข้าสู่ระบบก่อนชำระเงิน');
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    throw new CheckoutError('empty_cart', 'ตะกร้าสินค้าว่างเปล่า');
  }

  const orderRef = doc(collection(db, ORDERS_COLLECTION));
  const paymentRef = doc(collection(orderRef, 'paymentHistory'));

  return runTransaction(db, async (transaction) => {
    const productRefs = cartItems.map(({ product }) => doc(db, PRODUCTS_COLLECTION, product.id));
    const snapshots = await Promise.all(productRefs.map((productRef) => transaction.get(productRef)));
    const orderItems = snapshots.map((snapshot, index) => {
      const quantity = cartItems[index].quantity;

      if (!snapshot.exists()) {
        throw new CheckoutError('product_not_found', 'มีสินค้าบางรายการไม่พร้อมจำหน่าย');
      }

      const product = snapshot.data();
      if (!product.isActive || !Number.isInteger(product.stock) || product.stock < quantity) {
        throw new CheckoutError('insufficient_stock', `สินค้า "${product.name}" มีจำนวนคงเหลือไม่เพียงพอ`);
      }

      if (!Number.isInteger(quantity) || quantity < 1) {
        throw new CheckoutError('invalid_quantity', 'จำนวนสินค้าไม่ถูกต้อง');
      }

      const unitPrice = Number(product.price);
      if (!Number.isFinite(unitPrice) || unitPrice < 0) {
        throw new CheckoutError('invalid_price', 'ราคาสินค้าไม่ถูกต้อง');
      }

      return {
        productId: snapshot.id,
        name: product.name,
        imageUrl: product.image || null,
        unitPrice,
        quantity,
        subtotal: unitPrice * quantity,
        productRef: snapshot.ref,
        remainingStock: product.stock - quantity
      };
    });

    const pricing = calculatePricing(orderItems);
    const transactionId = `MOCK-${orderRef.id}`;

    orderItems.forEach(({ productRef, remainingStock }) => {
      transaction.update(productRef, {
        stock: remainingStock,
        updatedAt: serverTimestamp()
      });
    });

    transaction.set(orderRef, {
      userId: user.uid,
      status: 'paid',
      items: orderItems.map(({ productRef, remainingStock, ...item }) => item),
      pricing,
      shippingAddress: null,
      payment: {
        method: 'mock',
        status: 'paid',
        transactionId,
        paidAt: serverTimestamp()
      },
      stockDeducted: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      orderedAt: serverTimestamp()
    });

    transaction.set(paymentRef, {
      method: 'mock',
      amount: pricing.total,
      currency: pricing.currency,
      status: 'paid',
      transactionId,
      createdAt: serverTimestamp()
    });

    return { orderId: orderRef.id, pricing };
  });
}
