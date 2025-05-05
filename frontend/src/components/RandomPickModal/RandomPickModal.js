import React, { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import axios from "../../Services/Api";
import confetti from 'canvas-confetti';

const socket = io('http://localhost:5000');

const RandomPickModal = ({ setShowRandomNames ,isOpen, socket, setShowModal, participants, eventId, onClose }) => {
  const token = localStorage.getItem('token');
  const [numToPick, setNumToPick] = useState(1);
  const [countdown, setCountdown] = useState(-1);
  const [picked, setPicked] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const canvasRef = useRef();

  useEffect(() => {
    socket.on("reset-random-pick-ui", () => {
      setShowRandomNames(true)
      setShowModal(false);
      setShowResult(false);
      setPicked([]);
      setCountdown(-1);
    });

    return () => {
      socket.off("reset-random-pick-ui");
    };
  }, []);

  useEffect(() => {
    socket.on("random-pick-result", (data) => {
      setShowRandomNames(false)
      setShowModal(true)
      setPicked(data.selected);
      setCountdown(3);
      setShowResult(false);

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            triggerConfetti(); // Trigger confetti 1 second before result
            setShowResult(true);
          }
          return prev - 1;
        });
      }, 1000);
    });

    return () => {
      socket.off("random-pick-result");
    };
  }, []);

  const handlePick = () => {
    socket.emit("start-random-pick", { eventId });
    axios.post(`/api/events/select-random`,
      { eventId, count: numToPick },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ).catch((err) => console.error(err));
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 400,
      spread: 200,
      origin: { y: 0.6 },
      zIndex: 9999
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Random Pick</h3>

        {!showResult && countdown < 0 && (
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
          </>
        )}

        {countdown >= 0 && !showResult && (
          <div className="countdown-text">
            <p>Picking in {countdown} seconds...</p>
          </div>
        )}

        {showResult && (
          <>
            <h4>Selected Participants 🎉:</h4>
            <ul>
              {picked.map((person, idx) => (
                <li key={idx}>{person.userName}</li>
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
          font-size: 1.7rem;
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

        .countdown-text {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
          font-size: 2rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default RandomPickModal;
