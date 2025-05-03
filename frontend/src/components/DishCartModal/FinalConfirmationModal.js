import React from 'react';
const FinalConfirmModal = ({ onOk, onCancel }) => (
    <div className="modal-overlay">
      <div className="modal">
        <h4>Are you sure you want to confirm your selection?</h4>
  
        <div className="button-row">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="confirm-btn" onClick={onOk}>OK</button>
        </div>
  
        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 300;
          }
          .modal {
            background: white;
            padding: 20px;
            border-radius: 12px;
            width: 280px;
            text-align: center;
          }
          .button-row {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
          }
          .cancel-btn, .confirm-btn {
            width: 45%;
            padding: 10px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
          }
          .cancel-btn {
            background-color: #e0e0e0;
          }
          .cancel-btn:hover {
            background-color: #ccc;
          }
          .confirm-btn {
            background-color: #4caf50;
            color: white;
          }
          .confirm-btn:hover {
            background-color: #388e3c;
          }
        `}</style>
      </div>
    </div>
  );
  export default FinalConfirmModal;
  