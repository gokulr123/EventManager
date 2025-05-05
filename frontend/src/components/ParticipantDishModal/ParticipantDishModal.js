import React from "react";

const ParticipantDishModal = ({ isOpen, onClose, participant }) => {
  if (!isOpen || !participant) return null;
  console.log(participant)

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{participant.user.userName}'s Dishes</h3>
        <ul>
          {participant.selectedDishes.map((selectedDishe,index) => (
            <li key={index}><strong>{selectedDishe.dish.name}</strong> — Qty: {selectedDishe.quantity}</li>
          ))}
        </ul>
        <button className="close-btn" onClick={onClose}>OK</button>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 25px 30px;
          border-radius: 10px;
          width: 80%;
          max-width: 400px;
          text-align: center;
          font-size:1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        h3 {
          margin-bottom: 15px;
        }

        ul {
          padding: 0;
          list-style: none;
          margin-bottom: 20px;
        }

        li {
          margin: 8px 0;
          font-weight: 500;
        }

        .close-btn {
          background: #2196f3;
          color: white;
          border: none;
          border-radius: 20px;
          padding: 10px 20px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ParticipantDishModal;
