import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './LiveEvent.css';

function LiveEvent() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://eventmanager-abvk.onrender.com/api/events") // Update the port if needed
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const handleBoxClick = (eventId) => {
    navigate(`/event/${eventId}`); // Dynamic route to view event detail
  };

  const handleJoinClick = (e, eventId) => {
    e.stopPropagation();
    // You can replace this alert with an actual POST request to /join
    alert(`Joined event with ID: ${eventId}`);
  };

  return (
    <section className="features" id="features">
      <h1 className="heading"> Live <span>Event</span> </h1>

      <div className="box-container">
        {events.map((event) => (
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
            <a href="#" className="btn" onClick={(e) => handleJoinClick(e, event._id)}>Join Now</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LiveEvent;
