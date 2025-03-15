// firebase.js dosyasını şu şekilde güncelleyin:
import { initializeApp } from 'firebase/app';  // Firebase'i başlatmak için
import { getAuth, GoogleAuthProvider } from 'firebase/auth';  // Auth işlemleri için
import { getFirestore } from 'firebase/firestore';  // Firestore işlemleri için

const firebaseConfig = {
  apiKey: "AIzaSyDakJZtVg23I_sQlameN1UBTNB-YIpUnFg",
  authDomain: "banagonder-ef5a3.firebaseapp.com",
  projectId: "banagonder-ef5a3",
  storageBucket: "banagonder-ef5a3.firebasestorage.app",
  messagingSenderId: "68959248586",
  appId: "1:68959248586:web:0ae6bc29b0455dbcfe1433",
  measurementId: "G-V5YLF4SDTX"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth ve Firestore veritabanı işlemlerini al
const auth = getAuth(app);
const db = getFirestore(app);

// Google provider örneği
const provider = new GoogleAuthProvider();

export { auth, db, provider };
