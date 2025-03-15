import firebase from 'firebase/app';
import 'firebase/auth'; // Kullanıcı doğrulama
import 'firebase/firestore'; // Veritabanı işlemleri

const firebaseConfig = {
  apiKey: "AIzaSyDakJZtVg23I_sQlameN1UBTNB-YIpUnFg",
  authDomain: "banagonder-ef5a3.firebaseapp.com",
  projectId: "banagonder-ef5a3",
  storageBucket: "banagonder-ef5a3.firebasestorage.app",
  messagingSenderId: "68959248586",
  appId: "1:68959248586:web:0ae6bc29b0455dbcfe1433",
  measurementId: "G-V5YLF4SDTX"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };

