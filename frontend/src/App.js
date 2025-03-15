// src/App.js
import React, { useState, useEffect } from "react";
import { db, auth, provider } from "./firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import Header from "./Header";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Kullanıcıyı takip et
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });
    return () => unsubscribe();
  }, []);

  // Mesajları Firestore'dan çek
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Google ile giriş yap
  const handleSignIn = async () => {
    await signInWithPopup(auth, provider);
  };

  // Çıkış yap
  const handleSignOut = () => {
    signOut(auth);
  };

  // Mesaj gönder
  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      user: user.displayName,
      timestamp: serverTimestamp(), // ✅ Firestore'un kendi timestamp'ini kullan
    });

    setNewMessage("");
  };

  return (
    <div className="App">
      <Header user={user} onSignOut={handleSignOut} />
      {!user ? (
        <button onClick={handleSignIn}>Google ile Giriş Yap</button>
      ) : (
        <div className="chat-container">
          <div className="messages">
            {messages.map(msg => (
              <div key={msg.id} className="message">
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Mesajınızı yazın..."
            />
            <button type="submit">Gönder</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
