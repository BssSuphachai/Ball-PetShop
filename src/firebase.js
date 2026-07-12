import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC9DUvLcsRK6p4iMM7lsbXjh0L2_a4yzTA',
  authDomain: 'suphachaipetshop.firebaseapp.com',
  projectId: 'suphachaipetshop',
  storageBucket: 'suphachaipetshop.firebasestorage.app',
  messagingSenderId: '450349909331',
  appId: '1:450349909331:web:5f24038df40f7049bdcda6',
  measurementId: 'G-YPGWCJ267W'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics = null;
if (typeof window !== 'undefined') {
  // Analytics is optional. It must never prevent Authentication or Firestore
  // from starting in browsers where analytics is unavailable.
  isAnalyticsSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch((error) => {
      console.warn('Firebase Analytics is unavailable:', error);
    });
}

export { app, auth, db, analytics };
