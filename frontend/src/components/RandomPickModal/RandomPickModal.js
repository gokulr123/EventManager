import React, { useState } from "react";

const RandomPickModal = ({ participants, onClose }) => {
  const [numToPick, setNumToPick] = useState(1);
  const [countdown, setCountdown] = useState(0);
  const [picked, setPicked] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handlePick = () => {
    setCountdown(5);
    setPicked([]);
    setShowResult(false);

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(interval);
          const shuffled = [...participants].sort(() => 0.5 - Math.random());
          setPicked(shuffled.slice(0, numToPick));
          setShowResult(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Random Pick</h3>
        {!showResult ? (
          <>
            <label>Number of people to pick:</label>
            <input
              type="number"
              min="1"
              max={participants.length}
              value={numToPick}
              onChange={(e) => setNumToPick(parseInt(e.target.value))}
            />
            <button onClick={handlePick}>Pick</button>
            {countdown > 0 && <p>Picking in {countdown} seconds...</p>}
          </>
        ) : (
          <>
            <h4>Selected Participants:</h4>
            <ul>
              {picked.map((person, idx) => (
                <li key={idx}>{person.name}</li>
              ))}
            </ul>
            <button onClick={onClose}>OK</button>
          </>
        )}
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal {
          background: #fff;
          padding: 30px;
          border-radius: 8px;
          width: 300px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          text-align: center;
        }

        input {
          width: 60px;
          margin: 10px 0;
          padding: 5px;
        }

        button {
          padding: 6px 12px;
          margin-top: 10px;
          background: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background: #45a049;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          margin: 5px 0;
        }
      `}</style>
    </div>
  );
};

export default RandomPickModal;
