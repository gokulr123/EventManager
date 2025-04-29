import React, { useState }from "react";
import { useNavigate } from "react-router-dom";
import './Header.css';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For user dropdown
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/createevent"); 
  };
  const handleLogout=()=>
  {
    localStorage.removeItem('token'); // If you're saving the JWT token in localStorage
    navigate('/')
  }
   const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
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
        <div className="fas fa-bars" id="menu-btn" onClick={handleClick}></div>
        <div className="fas fa-user" id="login-btn" onClick={toggleDropdown}></div>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      
    </header>
  );
}

export default Header;