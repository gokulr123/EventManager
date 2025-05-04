import React, { useState, useEffect } from "react";
import './EventParticipantsList.css';
import ParticipantDishModal from '../ParticipantDishModal/ParticipantDishModal';
import { io } from "socket.io-client";




const EventDetails = ({ eventId, participants}) => {
  const [participantsList, setParticipantsList] = useState(participants || []);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setParticipantsList(participants || []);
  }, [participants]);
  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_API_BASE_URL}`); // Use your actual backend URL

    socket.on('connect', () => {
      console.log("Connected to WebSocket");
    });

    socket.on('new-participant', (data) => { 
      if (data.eventId === eventId) {
        setParticipantsList((prev) => [...prev, data.participant]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [eventId]);

  const handleClick = (participant) => {
    setSelectedParticipant(participant);
    setIsModalOpen(true);
  };

  return (
    <section>
      <div className="event-details">
        <h2>Event Participants</h2>
        <ul className="participants-list">
          {participantsList.map((participant, index) => (
            <li key={index} className="participant-item" onClick={() => handleClick(participant)}>
              <div className="participantsimage">
                <img
                  src="/ProfilePicture.jpg"
                  alt={participant.user.userName}
                  className="profile-picture"
                />
              </div>
              <div className="name">
                <span>{participant.user.userName}</span>
              </div>
              <div
                className={`status-circle ${participant.isDishSelected ? "active" : "inactive"}`}
              ></div>
            </li>
          ))}
        </ul>
      </div>
      

      <ParticipantDishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        participant={selectedParticipant}
      />
    </section>
  );
};

export default EventDetails;
