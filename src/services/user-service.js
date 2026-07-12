import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';

const USERS_COLLECTION = 'users';

export async function createUserProfile({ uid, email, displayName, phone = '' }) {
  const userRef = doc(db, USERS_COLLECTION, uid);

  const profile = {
    uid,
    email,
    displayName,
    phone,
    addresses: [],
    role: 'customer',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  await setDoc(userRef, profile);
  return profile;
}

export async function getUserProfile(uid) {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}

export function toAppUser(profile, authUser) {
  return {
    uid: profile?.uid || authUser.uid,
    email: profile?.email || authUser.email,
    displayName: profile?.displayName || authUser.displayName || authUser.email.split('@')[0],
    phone: profile?.phone || '',
    role: profile?.role || 'customer'
  };
}
