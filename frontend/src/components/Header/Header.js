import React, { useState ,useEffect}from "react";
import { useNavigate } from "react-router-dom";
import './Header.css';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import GlobalModal from '../GlobalModal/GlobalModal'

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For user dropdown
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (!decoded.isAdmin) {
          setModalMessage("You don't have admin access to view this page.");
          setModalOpen(true);
        }
        else{
          navigate("/admin");
        }
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
     
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
    <>
    <header className="header">
      <Link to="/Home" className="logo">
  <i className="fas fa-cocktail"></i> EventLoop
</Link>
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
        <div className="fas fa-user" id="login-btn"onClick={() => setShowLoginForm(!showLoginForm)}></div>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    {showLoginForm && (
  <form className={`login-form ${showLoginForm ? 'active' : ''}`}>
    <h3>Profile</h3>
    {/* <input type="email" placeholder="your email" className="box" />
    <input type="password" placeholder="your password" className="box" /> */}
    <p>forget your password <a href="#">click here</a></p>
    <p>don't have an account <a href="#">create now</a></p>
    <button className="btn" onClick={handleLogout}>Logout</button>
    
  </form>
)}
    </header>
    <GlobalModal
        isOpen={modalOpen}
        message={modalMessage}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </>
  );
}

export default Header;