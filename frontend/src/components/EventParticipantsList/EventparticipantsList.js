import React, { useState, useEffect } from "react";
import './EventParticipantsList.css';
import ParticipantDishModal from '../ParticipantDishModal/ParticipantDishModal';
import { io } from "socket.io-client";



const EventDetails = ({ eventId, participants }) => {
  const [participantsList, setParticipantsList] = useState(participants || []);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const socket = io('https://eventmanager-abvk.onrender.com'); // Use your actual backend URL

    socket.on('connect', () => {
      console.log("Connected to WebSocket");
    });

    socket.on('new-participant', (data) => {
      console.log("New participant received:", data); 
      console.log(data.eventId)
      console.log(eventId)
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
                  alt={participant.userName}
                  className="profile-picture"
                />
              </div>
              <div className="name">
                <span>{participant.userName}</span>
              </div>
              <div
                className={`status-circle ${participant.status === "active" ? "active" : "inactive"}`}
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
