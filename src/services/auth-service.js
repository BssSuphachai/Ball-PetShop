import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  deleteUser
} from 'firebase/auth';
import { auth } from '../firebase.js';
import { getAuthErrorMessage } from '../utils/auth-errors.js';
import { createUserProfile, getUserProfile, toAppUser } from './user-service.js';

export async function registerWithEmail({ displayName, email, password }) {
  let user = null;

  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    user = credential.user;

    await updateProfile(user, { displayName });

    await createUserProfile({
      uid: user.uid,
      email,
      displayName
    });

    return toAppUser({ uid: user.uid, email, displayName, role: 'customer' }, user);
  } catch (error) {
    // Firebase Auth and Firestore cannot share one transaction. Remove the newly
    // created Auth account when creating its matching profile fails.
    if (user) {
      try {
        await deleteUser(user);
      } catch (cleanupError) {
        console.error('Failed to roll back incomplete registration:', cleanupError);
      }
    }

    throw new Error(getAuthErrorMessage(error));
  }
}

export async function loginWithEmail({ email, password }) {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const profile = await getUserProfile(credential.user.uid);

    if (!profile) {
      await createUserProfile({
        uid: credential.user.uid,
        email: credential.user.email,
        displayName: credential.user.displayName || email.split('@')[0]
      });
    }

    const freshProfile = await getUserProfile(credential.user.uid);
    return toAppUser(freshProfile, credential.user);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
}

export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, async (authUser) => {
    if (!authUser) {
      callback(null);
      return;
    }

    try {
      const profile = await getUserProfile(authUser.uid);
      callback(toAppUser(profile, authUser));
    } catch (error) {
      console.error('Failed to load user profile:', error);
      callback(toAppUser(null, authUser));
    }
  });
}

export function getCurrentAuthUser() {
  return auth.currentUser;
}
