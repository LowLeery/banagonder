import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { useAuth } from "./AuthContext"; // Kullanıcının kimliğini almak için

const MessagePage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, []);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        if (!user) {
            alert("Mesaj göndermek için giriş yapmalısınız!");
            return;
        }
        
        await addDoc(collection(db, "messages"), {
            text: newMessage,
            user: user.displayName || "Anonim",
            userId: user.uid,
            timestamp: serverTimestamp(),
        });
        setNewMessage("");
    };

    return (
        <div>
            <h1>Mesajlaşma Sayfası</h1>
            <div>
                {messages.map(msg => (
                    <p key={msg.id}><strong>{msg.user}:</strong> {msg.text}</p>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Mesajınızı yazın..."
            />
            <button onClick={sendMessage}>Gönder</button>
        </div>
    );
};

export default MessagePage;
