import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

const CartModal = ({ cart, onUpdate, onClose }) => (
  <div className="modal-overlay">
    <div className="modal">
      <h3>Your Selection</h3>
      {Object.values(cart).map(item => (
        <div key={item.id} className="cart-item">
          <span>{item.name}</span>
          <div className="qty-control">
            <button onClick={() => onUpdate(item.id, -1)}><FaMinus /></button>
            <span>{item.quantity}</span>
            <button onClick={() => onUpdate(item.id, 1)}><FaPlus /></button>
          </div>
        </div>
      ))}
      <button className="confirm-btn" onClick={onClose}>
        Confirm
      </button>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
        }
        .modal {
          background: white;
          padding: 20px;
          border-radius: 15px;
          width: 300px;
          max-height: 80vh;
          overflow-y: auto;
        }
        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .qty-control {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .qty-control button {
          background-color: #e0e0e0;
          border: none;
          padding: 5px 8px;
          cursor: pointer;
          border-radius: 5px;
          font-size: 12px;
        }
        .qty-control button:hover {
          background-color: #d5d5d5;
        }
        .confirm-btn {
          margin-top: 20px;
          background-color: #2196f3;
          color: white;
          padding: 10px;
          border: none;
          width: 100%;
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
        }
        .confirm-btn:hover {
          background-color: #1976d2;
        }
      `}</style>
    </div>
  </div>
);

export default CartModal;
