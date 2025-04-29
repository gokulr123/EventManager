import React from 'react';
import './GlobalModal.css';

function GlobalModal({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="global-modal-overlay">
      <div className="global-modal">
        <p>{message}</p>
        <button onClick={onClose} className="close-btn">OK</button>
      </div>
    </div>
  );
}

export default GlobalModal;
