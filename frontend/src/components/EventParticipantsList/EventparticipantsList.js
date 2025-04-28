import React, { useState } from "react";
import ParticipantDishModal from '../ParticipantDishModal/ParticipantDishModal'

const EventDetails = () => {
  const participants = [
    { name: "John Doe", dishes: ["Tea", "Samosa"],image: "ProfilePicture.jpg", status: "active" },
    { name: "Jane Smith", dishes: ["Coffee", "Biscuits"] , image: "ProfilePicture.jpg", status: "active" },
    { name: "Alex Johnson", dishes: ["Coffee", "Biscuits"] , image: "ProfilePicture.jpg", status: "inactive" },
    { name: "Chris Lee", dishes: ["Coffee", "Biscuits"] , image: "ProfilePicture.jpg", status: "active" }
  ];
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (participant) => {
    setSelectedParticipant(participant);
    setIsModalOpen(true);
  };

  return (
    <section>
    <div className="event-details">
      <h2>Event Participants</h2>
      <ul className="participants-list">
      {participants.map((participant, index) => (
          <li key={index} className="participant-item" onClick={()=>handleClick(participant)}>
            <div className="participantsimage">
              <img
                src="/ProfilePicture.jpg"
                alt={participant.name}
                className="profile-picture"
              />
            </div>
            <div className="name">
              <span>{participant.name}</span>
            </div>
            <div
              className={`status-circle ${participant.status === "active" ? "active" : "inactive"}`}
            ></div>
          </li>
        ))}
      </ul>
      

      <style jsx>{`
        .event-details {
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
         

        .participants-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        .participant-item {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          padding: 10px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: relative;
          justify-content: space-between;
        }

        .participantsimageimage {
          flex-shrink: 0;
          margin-right: 15px;
        }

        .profile-picture {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .name {
          flex-grow: 1;
          text-align: center;
          font-size: 16px;
          font-weight: bold;
        }

        .status-circle {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: green;
        }

        .status-circle.inactive {
          background-color: red;
        }

        /* Responsive Styles */
        @media (max-width: 600px) {
          .participant-item {
            text-align: center;
          }

          .name {
            margin-top: 10px;
          }

          .status-circle {
            margin-top: 10px;
          }
        }

        @media (max-width: 400px) {
          .profile-picture {
            width: 35px;
            height: 35px;
          }

          .name {
            font-size: 14px;
          }

          .status-circle {
            width: 10px;
            height: 10px;
          }
        }
      `}</style>
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
