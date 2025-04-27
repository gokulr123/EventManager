import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RandomPickModal from "../RandomPickModal/RandomPickModal"; 

const EventActionPanel = () => {
  const navigate = useNavigate();

 
    const dummyParticipants = [
        { name: "Alice" },
        { name: "Bob" },
        { name: "Charlie" },
        { name: "Diana" }
      ];
  const [hasJoined, setHasJoined] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleJoin = () => {
    if (!hasJoined) {
      // Call API or set state
      setHasJoined(true);
    }
  };
  const handleDishClick = () => {
    navigate("/dishselection"); // or your route path for EventPage
  };

  return (
    <section>
    <div className="event-action-panel">
      <button
        className={`btn join-btn ${hasJoined ? "disabled" : ""}`}
        onClick={handleJoin}
        disabled={hasJoined}
      >
        {hasJoined ? "Joined" : "Join"}
      </button>

      <button className="btn center-btn" onClick={() => setShowModal(true)}>
        🎲 Random Pick
      </button>

      <button className="btn dish-btn" onClick={handleDishClick}>🍽️ Choose Dishes</button>

      {showModal && (
        <RandomPickModal participants={dummyParticipants} onClose={() => setShowModal(false)} />
      )}

      <style jsx>{`
        .event-action-panel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          border-radius: 10px;
          padding: 20px 30px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 30px auto;
          gap: 20px;
        }

        .btn {
          padding: 10px 18px;
          border: none;
          border-radius: 25px;
          font-weight: bold;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .join-btn {
          background-color: #4caf50;
          color: white;
        }

        .join-btn.disabled {
          background-color: #c8e6c9;
          color: #666;
          cursor: not-allowed;
        }

        .center-btn {
          background-color: #2196f3;
          color: white;
        }

        .dish-btn {
          background-color: #ff9800;
          color: white;
        }

        @media (max-width: 500px) {
          .event-action-panel {
            flex-direction: column;
            border-radius: 10px;
            padding: 15px;
           
          }

          .btn {
            width: 100%;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
    </section>
  );
};

export default EventActionPanel;
