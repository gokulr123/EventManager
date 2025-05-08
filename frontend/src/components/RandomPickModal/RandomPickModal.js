import React, { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import axios from "../../Services/Api";
import confetti from 'canvas-confetti';
import GlobalLoading from '../GlobalModal/GlobalLoading';

const socket = io('http://localhost:5000');

const RandomPickModal = ({ setShowRandomTeaRunners,setShowRandomCleanupCrew,isOpen, socket, setShowModal, participants, eventId }) => {
  const token = localStorage.getItem('token');
  const [numToPick, setNumToPick] = useState(1);
  const [countdown, setCountdown] = useState(-1);
  const [picked, setPicked] = useState([]);
  const [pickedTeaRunners,setPickedTeaRunners] =useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [selectionType, setSelectionType] = useState('teaRunners');

  const canvasRef = useRef();

  // useEffect(() => {
  //   socket.on("reset-random-pick-ui", () => {
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //     setShowRandomNames(true)
  //     setShowModal(false);
  //     setShowResult(false);
  //     setPicked([]);
  //     setCountdown(-1);
  //   });

  //   return () => {
  //     socket.off("reset-random-pick-ui");
  //   };
  // }, []);

  // useEffect(() => {
  //   socket.on("random-pick-result", (data) => {
  //     setLoading(false);
  //     console.log(data)
  //     if(data.type=="teaRunners")
  //     {
  //       setShowRandomTeaRunners(false);
  //       setPickedTeaRunners(data);
  //     }
  //     else{
  //       setShowRandomCleanupCrew(false);
  //     } 
  //     console.log("reached")

  //     setShowModal(true)
  //     setPicked(data);
  //     setCountdown(5);
  //     setShowResult(false);  
  //     const interval = setInterval(() => {
  //       setCountdown((prev) => {
  //         if (prev === 1) {
  //           clearInterval(interval);
  //           triggerConfetti(); // Trigger confetti 1 second before result
  //           setShowResult(true);
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);
    
  //     if(data.type=="teaRunners")
  //       {
  //         setShowRandomTeaRunners(true);
  //       }
  //       else{
  //         setShowRandomCleanupCrew(true);
  //       }
  
  //     return () => {
  //       socket.off("random-pick-result");
  //     };
  //   });
    
  // }, []);
  useEffect(() => {
    const handleRandomPickResult = (data) => {
      setLoading(false);
      if (data.type === "teaRunners") {
        setShowRandomTeaRunners(false);
        setPickedTeaRunners(data);
      } else {
        setShowRandomCleanupCrew(false);
      }
  
      setShowModal(true);
      setPicked(data);
      setCountdown(5);
      setShowResult(false);
  
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            triggerConfetti();
            setShowResult(true);
            if (data.type === "teaRunners") {
              setShowRandomTeaRunners(true);
            } else {
              setShowRandomCleanupCrew(true);
            }
          }
          return prev - 1;
        });
      }, 1000);
  
      
    };
  
    socket.on("random-pick-result", handleRandomPickResult);
  
    return () => {
      socket.off("random-pick-result", handleRandomPickResult);
    };
  }, []);
  
  const onokay=()=>{
      setShowModal(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShowResult(false);
      //setPicked([]);
      setCountdown(-1);
  }
  const handlePick = async () => {
    setLoading(true);
    socket.emit("start-random-pick", { eventId });
    axios.post(`/api/events/select-random`,
      { eventId, count: numToPick, selectionType: selectionType },
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
    <>
    <div className="modal-backdrop">
    {loading && <GlobalLoading />} {/* Loading modal on top */}
      <div className="modal">
        <h3>Random Pick</h3>

        {!showResult && countdown < 0 && (
          <>
          <label className="modal-label">Select Category:</label>
<select
  value={selectionType}
  onChange={(e) => setSelectionType(e.target.value)}
  className="modal-select"
>
  <option value="teaRunners">Tea Runners</option>
  <option value="cleanupCrew" disabled={pickedTeaRunners.length===0}>
    Cleanup Crew
  </option>
</select>


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
              {picked.selected.map((person, idx) => (
                <li key={idx}>{person.userName}</li>
              ))}
            </ul>
            <button onClick={onokay}>OK</button>
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
          .modal-label {
  display: block;
  margin-bottom: 6px;
  margin-top:10px;
  color: #333;
  font-weight: 600;
  text-align: left;
}

.modal-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  outline: none;
}

.modal-select:focus {
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
}

.modal-select:disabled {
  background-color: #e9e9e9;
  color: #999;
  cursor: not-allowed;
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
    </>
  );
};

export default RandomPickModal;
