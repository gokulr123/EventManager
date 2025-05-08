import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RandomPickModal from "../RandomPickModal/RandomPickModal"; 
import GlobalModal from "../GlobalModal/GlobalModal";
import axios from '../../Services/Api';
import { getCurrentUser } from '../../utils/getCurrentuser'
import socket from '../../Services/Socket'
import GlobalLoading from '../GlobalModal/GlobalLoading';
//import io from 'socket.io-client';

//const socket = io('http://localhost:5000');

const EventActionPanel = ({eventId,eventData,participants, setShowRandomCleanupCrew,setShowRandomTeaRunners}) => {
  const navigate = useNavigate();
  const [showGlobalModal, setShowGlobalModal] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(false); 
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUserId(user.id);
      const isParticipant = eventData?.participants?.some(
        (p) => p.user?._id === user.id
      );
      setHasJoined(isParticipant);
    }
  }, [eventData]);
  useEffect(() => {
    socket.emit("join-event-room", eventId);

    // socket.on("random-pick-started", () => {
    //   setShowRandomNames(false)
    //   setShowModal(true); // Open modal for all users
    // });

    // return () => {
    //   socket.off("random-pick-started");
    // };
  }, [eventId]);
  

  const handleJoin = async() => {
    if (!hasJoined) {
      setLoading(true);
     
      // Call API or set state
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
  await axios.post(`/api/events/${eventId}/join`, {}, {
    headers: {
      Authorization: `Bearer ${token}` // ✅ This sends the token to your backend
    }
  });
        setHasJoined(true);
        setLoading(false);
      } catch (error) {
        console.error('Join error:', error);
       // setModal({ isOpen: true, message: error.response?.data?.message || 'Something went wrong' });
      }
    }
  };
  const handleDishClick = () => {
    if (!hasJoined) {
      setShowGlobalModal(true);
    } else {
      navigate(`/dishselection/${eventData._id}`);
    }
  };

  return (
    <section>
    {loading && <GlobalLoading />} {/* Loading modal on top */}
    <div className="event-action-panel">
      <button
        className={`btn join-btn ${hasJoined ? "disabled" : ""}`}
        onClick={handleJoin}
        disabled={hasJoined}
      >
        {hasJoined ? "Joined" : "Join"}
      </button>

      <button  className={`btn center-btn ${!hasJoined ? "disabled" : ""}`} disabled={!hasJoined} onClick={() => {setShowModal(true);}}>
        🎲 Random Pick
      </button>

      <button className="btn dish-btn" onClick={handleDishClick}>🍽️ Choose Dishes</button>

      
        <RandomPickModal setShowRandomCleanupCrew={setShowRandomCleanupCrew} setShowRandomTeaRunners={setShowRandomTeaRunners}  participants={participants} setShowModal={setShowModal} eventId={eventId} isOpen={showModal}  socket={socket}/>
      
        <GlobalModal
          isOpen={showGlobalModal}
          message="Please join the event to choose dishes."
          onClose={() => setShowGlobalModal(false)}
        />
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
          .join-btn:hover {
  background-color: #45a049; /* A darker green for hover effect */
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
          .center-btn:hover {
  background-color: #1976d2; /* A richer blue for hover */
}
        .center-btn.disabled {
          background-color: #91c7eb;
          color: #666;
          cursor: not-allowed;
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
