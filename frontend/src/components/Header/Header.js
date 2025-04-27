import React from "react";
import './Header.css';

function Header() {
  return (
    <header className="header">
      <a href="#" className="logo">
        <i className="fas fa-cocktail"></i> EventLoop
      </a>
      <nav className="navbar">
        <a href="#home">home</a>
        <a href="#features">features</a>
        <a href="#products">products</a>
        <a href="#categories">categories</a>
        <a href="#review">review</a>
        <a href="#blogs">blogs</a>
      </nav>
      <div className="icons">
        <div className="fas fa-bars" id="menu-btn"></div>
        <div className="fas fa-user" id="login-btn"></div>
      </div>
      
    </header>
  );
}

export default Header;