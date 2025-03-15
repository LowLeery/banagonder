// src/Header.js
import React from "react";

function Header({ user, onSignOut }) {
  return (
    <header className="header">
      <h1>Mesajlaşma Uygulaması</h1>
      {user && (
        <div className="user-info">
          <img src={user.photoURL} alt="Profil" className="avatar" />
          <span>{user.displayName}</span>
          <button onClick={onSignOut}>Çıkış Yap</button>
        </div>
      )}
    </header>
  );
}

export default Header;
