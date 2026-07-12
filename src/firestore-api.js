import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase.js';
import { initialProducts } from './products-data.js';

const COLLECTIONS = {
  products: 'products',
  orders: 'orders',
  users: 'users',
  newsletter: 'newsletter'
};

export async function fetchProducts() {
  const snapshot = await getDocs(collection(db, COLLECTIONS.products));

  return snapshot.docs
    .map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
    .filter((product) => product.isActive === true);
}

export async function seedProducts() {
  const writes = initialProducts.map((product) =>
    setDoc(doc(db, COLLECTIONS.products, product.id), {
      ...product,
      stock: product.stock ?? 20,
      isActive: product.isActive ?? true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
  );
  await Promise.all(writes);
}

export async function subscribeNewsletter(email) {
  const existing = await getDocs(
    query(collection(db, COLLECTIONS.newsletter), where('email', '==', email))
  );

  if (!existing.empty) {
    return { alreadySubscribed: true };
  }

  await addDoc(collection(db, COLLECTIONS.newsletter), {
    email,
    subscribedAt: serverTimestamp()
  });

  return { alreadySubscribed: false };
}
