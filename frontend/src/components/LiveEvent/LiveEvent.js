import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../../Services/Api';
import { jwtDecode } from "jwt-decode";
import './LiveEvent.css';
import GlobalModal from "../GlobalModal/GlobalModal";
import io from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_API_BASE_URL}`);

function LiveEvent() {
  const token = localStorage.getItem('token'); 
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, message: "" });


  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id || decoded.userId); // use the correct field as per your backend token payload
    }
    const fetchEvents = async () => {
     // const token = localStorage.getItem('token'); // get the token
  
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/events`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // attach the token
          },
        });
  
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
  
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
  
    fetchEvents();
  }, [token]);

  const handleBoxClick = (eventId) => {
    navigate(`/event/${eventId}`); // Dynamic route to view event detail
  };

  const handleJoinClick = async (e, eventId) => {
    e.stopPropagation();
    const selectedEvent = events.find(ev => ev._id === eventId);
   
    const alreadyJoined = selectedEvent?.participants?.some(p => p.user === userId);
    if (alreadyJoined) {
      setModal({ isOpen: true, message: "You have already joined this event!" });
      return;
    }
     navigate(`/event/${eventId}`);
    // try {
    //   await axios.post(`/api/events/${eventId}/join`);
    //   socket.emit('join-event-room', eventId);
    //   navigate(`/event/${eventId}`)
    // } catch (error) {
    //   console.error('Join error:', error);
    //   setModal({ isOpen: true, message: error.response?.data?.message || 'Something went wrong' });
    // }
    
  };
  const closeModal = () => setModal({ isOpen: false, message: "" });

  return (
    <section className="features" id="features">
      <h1 className="heading"> Live <span>Event</span> </h1>

      <div className="box-container">
        {events.map((event) => {
          const hasJoined = event?.participants?.some(p => p.user === userId)

          return (
            <div
              key={event._id}
              className="box"
              onClick={() => handleBoxClick(event._id)}
              style={{ cursor: "pointer" }}
            >
              <img src="TeaPic.png" alt="event" />
              <h3>{event.eventName}</h3>
              <p>{event.description}</p>
              <div className="event-info">
                <p><strong>Time:</strong> {new Date(event.time).toLocaleTimeString()}</p>
                <p><strong>Location:</strong> {event.venue}</p>
                <p><strong>People Who've Joined:</strong> {event.participants?.length || 0} people</p>
              </div>
              <button
                className="btn"
                onClick={(e) => handleJoinClick(e, event._id)}
                
              >
                {hasJoined ? "Joined" : "Join Now"}
              </button>
            </div>
          );
        })}
      </div>
      <GlobalModal
        isOpen={modal.isOpen}
        message={modal.message}
        onClose={closeModal}
      />
    </section>
  );
}

export default LiveEvent;
