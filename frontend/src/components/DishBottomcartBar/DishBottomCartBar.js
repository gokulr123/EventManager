import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const DishBottomCartBar = ({ cartCount,onCartClick }) => (
    <div className="bottom-bar">
    <button className="cart-btn" onClick={onCartClick}>
      <FaShoppingCart /> Cart ({cartCount})
    </button>
    <style jsx>{`
       .bottom-bar {
          position: fixed;
          bottom: 0;
          right: 0;
          left: 0;
          background: white;
          padding: 15px;
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
          text-align: right;
          z-index: 100;
        }

        .cart-btn {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 10px 15px;
          font-size: 14px;
          border-radius: 8px;
          cursor: pointer;
        }

        .cart-btn:hover {
          background-color: #43a047;
        }
    `}</style>
  </div>
);

export default DishBottomCartBar;
