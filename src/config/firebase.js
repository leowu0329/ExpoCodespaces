import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  initializeAuth, 
  getAuth, 
  getReactNativePersistence, 
  browserLocalPersistence 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // 1. 引入 getFirestore
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 從 .env 讀取 Firebase 設定
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

// 避免重複初始化 Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 初始化 Auth
let auth;
if (getApps().length > 1 && getAuth(app)) {
  auth = getAuth(app);
} else {
  if (Platform.OS === 'web') {
    auth = initializeAuth(app, { persistence: browserLocalPersistence });
  } else {
    auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
  }
}

// 2. 初始化並匯出 Firestore 實例 db
const db = getFirestore(app);

export { auth, db };