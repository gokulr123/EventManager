import React from "react";
import { useNavigate } from "react-router-dom";
import './LiveEvent.css';

function LiveEvent() {
  const navigate = useNavigate();

  const handleBoxClick = () => {
    navigate("/event"); // or your route path for EventPage
  };

  const handleJoinClick = (e) => {
    e.stopPropagation(); // prevents the parent box click
    alert("Joined!"); // replace with actual join logic
  };
  return (
    <section className="features" id="features">
      <h1 className="heading"> Live <span>Event</span> </h1>

      <div className="box-container">
        <div className="box" onClick={handleBoxClick} style={{ cursor: "pointer" }}>
          <img src="TeaPic.png" alt="" />
          <h3>Team Break Connect</h3>
          <p>Take a moment to relax, connect, and recharge with your team over a refreshing cup of tea.</p>
          <div class="event-info">
        <p><strong>Time:</strong> 3:00 PM</p>
        <p><strong>Location:</strong> Conference Room A</p>
        <p><strong>People Who've Joined:</strong> 12 people</p>
      </div>
          <a href="" className="btn" onClick={handleJoinClick}>Join Now</a>
        </div>
      </div>
    </section>
  );
}

export default LiveEvent;
